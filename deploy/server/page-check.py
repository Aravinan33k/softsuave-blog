"""Compare every page Apache sends to the app, live release vs new release.

usage: page-check.py LIVE_BASE NEW_BASE PATHS_FILE OUT_JSON [RELEASE_MAP]

PATHS_FILE is the live Apache map's app pages. RELEASE_MAP is the new release's own
deploy/softsuave-site-pages.map: a page the release no longer lists there is retired
on purpose, so it is reported, not counted as broken, and the Apache map needs the
same change (a manual step). Pages the release lists but Apache does not are reported
as waiting for the Apache map.

Fails (exit 1) when the new release would break something that works live:
  - a page that answers 200 live answers anything else on the new release
  - a page that is indexable live becomes noindex
Reports, without failing: title, description, canonical and H1 changes, which are
normal in a content release and are listed in the pipeline log for the reviewer.
"""
import json
import re
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from html import unescape


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def meta(html, name):
    m = re.search(r'<meta[^>]+name="%s"[^>]+content="([^"]*)"' % name, html, re.I)
    return unescape(m.group(1)) if m else None


def fetch(base, path):
    try:
        r = OPENER.open(urllib.request.Request(base + path, headers={"User-Agent": "ss-deploy-check"}), timeout=60)
        status, html = r.status, r.read().decode("utf8", "replace")
    except urllib.error.HTTPError as e:
        status, html = e.code, ""
    except Exception as e:  # connection refused, timeout
        return {"status": 0, "error": str(e)[:200]}
    title = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    canon = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"', html, re.I)
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S | re.I)
    return {
        "status": status,
        "title": unescape(title.group(1).strip()) if title else None,
        "desc": meta(html, "description"),
        "robots": meta(html, "robots"),
        "canonical": canon.group(1) if canon else None,
        "h1": re.sub(r"<[^>]+>|\s+", " ", unescape(h1.group(1))).strip() if h1 else None,
    }


def noindex(r):
    return "noindex" in (r.get("robots") or "").lower()


def main():
    live_base, new_base, paths_file, out = sys.argv[1:5]
    paths = [p.strip() for p in open(paths_file) if p.strip().startswith("/")]
    declared = None
    if len(sys.argv) > 5:
        declared = {l.split()[0] for l in open(sys.argv[5]) if re.match(r"^/\S*\s+app\s*$", l)}
    with ThreadPoolExecutor(3) as ex:
        live = list(ex.map(lambda p: fetch(live_base, p), paths))
        new = list(ex.map(lambda p: fetch(new_base, p), paths))
    broken, changed, retired = [], [], []
    for p, a, b in zip(paths, live, new):
        if declared is not None and p not in declared:
            retired.append(f"{p}: live {a['status']}, new {b['status']} (no longer in the release's page map)")
        elif a["status"] == 200 and b["status"] != 200:
            broken.append(f"{p}: live 200, new {b['status']} {b.get('error', '')}")
        elif a["status"] == 200 and not noindex(a) and noindex(b):
            broken.append(f"{p}: becomes noindex ({b.get('robots')})")
        elif a["status"] == 200:
            d = {k: (a.get(k), b.get(k)) for k in ("title", "desc", "canonical", "h1", "robots") if a.get(k) != b.get(k)}
            if d:
                changed.append((p, d))
    json.dump({"paths": paths, "live": live, "new": new}, open(out, "w"), indent=1)
    print(f"page-check: {len(paths)} pages, {len(broken)} broken, {len(changed)} with SEO changes")
    for p, d in changed:
        print(f"  changed {p}: " + "; ".join(f"{k}: {v[0]!r} -> {v[1]!r}" for k, v in d.items())[:600])
    for line in retired:
        print("  RETIRED " + line + " -> remove it from the Apache map too")
    for p in sorted((declared or set()) - set(paths)):
        print(f"  NEW PAGE {p}: in the release's page map, not in Apache's yet -> add it to go live")
    for line in broken:
        print("  BROKEN " + line)
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()

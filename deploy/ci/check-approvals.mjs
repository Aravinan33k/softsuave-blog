// Enforce "2 approvals" on GitLab Community Edition, which shows an Approve button but
// cannot require a number of approvals.
//
//   node deploy/ci/check-approvals.mjs mr       in a merge request pipeline: fail until the MR
//                                                has REQUIRED approvals (reviewers re-run this job
//                                                after approving; "Pipelines must succeed" then
//                                                unlocks the Merge button)
//   node deploy/ci/check-approvals.mjs commit   in the main-branch deploy job: refuse to deploy a
//                                                commit that did not arrive through such an MR
//
// Counted: distinct users who approved AFTER the MR's last push, excluding the MR's author.
// CE keeps approvals when new commits are pushed, so the count is rebuilt from the MR's
// system notes ("approved", "unapproved", "added N commits") rather than taken as is.
//
// Env: APPROVAL_TOKEN (project access token, Reporter, read_api), REQUIRED_APPROVALS (default 2),
// and GitLab's own CI_API_V4_URL, CI_PROJECT_ID, CI_MERGE_REQUEST_IID, CI_COMMIT_SHA,
// CI_COMMIT_MESSAGE, CI_DEFAULT_BRANCH.

const mode = process.argv[2];
const {
  CI_API_V4_URL: api,
  CI_PROJECT_ID: project,
  APPROVAL_TOKEN: token,
  REQUIRED_APPROVALS = "2",
  CI_DEFAULT_BRANCH = "main",
} = process.env;
const required = Number(REQUIRED_APPROVALS);

function fail(msg) {
  console.error(`approval check FAILED: ${msg}`);
  process.exit(1);
}
if (!token) fail("APPROVAL_TOKEN is not set (Settings > CI/CD > Variables)");

async function get(path) {
  const res = await fetch(`${api}/projects/${encodeURIComponent(project)}${path}`, {
    headers: { "PRIVATE-TOKEN": token },
  });
  if (!res.ok) fail(`GET ${path} -> ${res.status} ${await res.text()}`);
  return res.json();
}

async function getAll(path) {
  const out = [];
  for (let page = 1; ; page++) {
    const sep = path.includes("?") ? "&" : "?";
    const batch = await get(`${path}${sep}per_page=100&page=${page}`);
    out.push(...batch);
    if (batch.length < 100) return out;
  }
}

async function approvers(iid) {
  const mr = await get(`/merge_requests/${iid}`);
  const notes = (await getAll(`/merge_requests/${iid}/notes?sort=asc&order_by=created_at`)).filter((n) => n.system);
  const current = new Map();
  for (const n of notes) {
    const body = n.body.trim();
    if (/^added \d+ (new )?commits?/.test(body)) current.clear(); // a push resets approvals
    else if (/^approved this merge request/.test(body)) current.set(n.author.id, n.author.username);
    else if (/^unapproved this merge request/.test(body)) current.delete(n.author.id);
  }
  // Cross-check with GitLab's own list, so a removed approval never counts.
  const live = await get(`/merge_requests/${iid}/approvals`);
  const stillApproved = new Set((live.approved_by || []).map((a) => a.user.id));
  for (const id of [...current.keys()]) {
    if (id === mr.author.id || !stillApproved.has(id)) current.delete(id);
  }
  return { mr, names: [...current.values()] };
}

if (mode === "mr") {
  const iid = process.env.CI_MERGE_REQUEST_IID;
  if (!iid) fail("not a merge request pipeline");
  const { mr, names } = await approvers(iid);
  console.log(`!${iid} "${mr.title}" by @${mr.author.username} -> ${mr.target_branch}`);
  console.log(`approvals since the last push (author excluded): ${names.length}/${required} ${names.map((n) => "@" + n).join(" ")}`);
  if (names.length < required) {
    fail(`needs ${required - names.length} more approval(s). After approving, re-run this job (Pipelines > this job > Retry).`);
  }
  console.log("approval check passed");
} else if (mode === "commit") {
  const sha = process.env.CI_COMMIT_SHA;
  let mrs = (await get(`/repository/commits/${sha}/merge_requests`)).filter(
    (m) => m.state === "merged" && m.target_branch === CI_DEFAULT_BRANCH,
  );
  if (!mrs.length) {
    // The merge commit GitLab writes names its MR: "See merge request group/project!123".
    const m = /See merge request \S*!(\d+)/.exec(process.env.CI_COMMIT_MESSAGE || "");
    if (m) mrs = [await get(`/merge_requests/${m[1]}`)].filter((x) => x.state === "merged");
  }
  if (!mrs.length) fail(`commit ${sha} did not arrive on ${CI_DEFAULT_BRANCH} through a merged merge request`);
  const { mr, names } = await approvers(mrs[0].iid);
  console.log(`deploying !${mr.iid} "${mr.title}", approved by ${names.map((n) => "@" + n).join(" ") || "nobody"}`);
  if (names.length < required) fail(`!${mr.iid} has ${names.length}/${required} approvals - not deploying`);
  console.log("approval check passed");
} else {
  fail("usage: check-approvals.mjs mr|commit");
}

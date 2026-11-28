# Deploy pipeline for www.softsuave.com

Code reaches the production server one way only: a merge request into `main` on GitLab
(`softsuave-site/ss-new-pages-2.0`), approved by 2 people, merged. The merge deploys
itself. Nobody can push to `main`, and nobody pastes server keys any more.

```
feature branch ─► merge request ─► check: typecheck, lint, tests, production build
                                └► approvals: 2 approvals since the last push, author excluded
                 merge (button unlocks only when both jobs pass)
                       │
main ─► deploy-production ─► server: ss-deploy <commit>
                               1. fetch the commit from GitLab itself, refuse it if it is not on main
                               2. build a new release folder next to the live one
                               3. start it on :3301, compare every app page with live (page-check)
                               4. switch, restart, check live; switch back automatically on failure
                               5. keep the last few releases, delete older ones
       rollback (manual button) ─► previous release
```

## Day-to-day workflow

1. Branch from `development`, push, open a merge request into `development`. Get it reviewed
   and merged. Nothing deploys.
2. To release: open a merge request from `development` into `main`.
3. Two people other than the author click **Approve**, then one of them re-runs the
   **approvals** job (Pipeline > approvals > Retry). GitLab Community Edition cannot require
   a number of approvals by itself, so this job does it, and it only re-checks when run.
4. When **check** and **approvals** are green, click **Merge** (keep "Merge commit" as the merge
   method). The `main` pipeline deploys. Its log shows the page-check report: every page
   whose title, description, canonical or H1 changed, and any page that would break.
5. If something is wrong after the deploy: open the latest `main` pipeline and click
   **rollback**. Clicking it again switches forward.

A new commit pushed to a merge request removes its approvals (the job counts only
approvals given after the last push).

### What the pipeline does NOT do

Apache stays manual, because a bad Apache config takes down the PHP site and the blog too:
- **New page:** add it to `deploy/softsuave-site-pages.map` in the merge request. After the
  deploy, an admin adds the same line to `/etc/apache2/softsuave-site-pages.map`. The deploy
  log lists such pages as `NEW PAGE`.
- **Removed or renamed page:** remove it from the repo map in the merge request. The deploy
  then reports it as `RETIRED` instead of failing, and an admin updates the Apache map and
  adds the redirect in the vhost (`deploy/apache.softsuave.example.conf` records them).
- A page that is still in the repo map and stops answering 200, or becomes noindex, stops
  the deploy before the live site is touched.

## One-time setup (admin)

Done once, in this order. Nothing here changes the live site.

### 1. GitLab runner
Register a GitLab Runner with the **Docker executor** for this project (Settings > CI/CD >
Runners). It needs about 4 GB RAM for the production build in `check`. Do not run it on the
production server, which already runs short of memory during builds. The runner must reach
`3.229.92.25` on port 22.

### 2. Tokens and keys
- **Deploy token** (Settings > Repository > Deploy tokens): scope `read_repository` only.
  The server uses it to fetch commits.
- **Project access token** (Settings > Access tokens): role Reporter, scope `read_api`.
  Save it as CI/CD variable `APPROVAL_TOKEN` (masked, protected).
- **Pipeline SSH key**: `ssh-keygen -t ed25519 -N "" -f ss-deploy-pipeline`. Private half
  goes into CI/CD variable `DEPLOY_SSH_KEY`, type **File**, protected. The public half goes
  to the server (step 3).
- **Server host key**: `ssh-keyscan -t ed25519 3.229.92.25 > known_hosts`. Check it against
  the server (`ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` on the box), then save it as
  CI/CD variable `DEPLOY_KNOWN_HOSTS`, type **File**.

### 3. Server
As root on 3.229.92.25, with this repo checked out:
```
cp ss-deploy-pipeline.pub /root/ss-deploy-pipeline.pub
printf '%s' 'TOKEN-USERNAME:TOKEN' > /root/ss-gitlab-deploy-token   # deploy token from step 2
sudo bash deploy/server/install.sh
```
It creates the `deploy` user. That user's key can only run `deploy <sha>`, `rollback` and
`status` (`deploy/server/ss-deploy-gate`), and it may sudo only `ss-deploy` and
`ss-rollback`. The token file is shredded after use.

### 4. Branches
- `main` must hold the live code. Today it holds only GitLab's README commit. Bring it in
  without a force push:
  ```
  git checkout -b main-init gitlab/development
  git merge --allow-unrelated-histories -s ours gitlab/main -m "Start main from development"
  git push gitlab main-init:main
  ```
- Settings > Repository > Protected branches:
  - `main`: Allowed to merge **Maintainers**, Allowed to push **No one**, force push off.
  - `development`: Allowed to merge **Developers + Maintainers**, Allowed to push **No one**.
- Settings > Merge requests: **Pipelines must succeed** on, **All threads must be
  resolved** on, merge method **Merge commit**.

### 5. First run
Run the `status` job from a `main` pipeline (it is manual). It should print the live release.
Then do one real release through a merge request.

## On the server

| Path | What |
|---|---|
| `/var/www/softsuave-site/releases/<sha7>` | one folder per release; `current` points at the live one |
| `/var/www/softsuave-site/releases/.previous` | what `rollback` switches to |
| `/var/www/softsuave-site/logs/deploy-<sha7>.log` | full deploy log; `build-`, `check-` and `test-` files beside it |
| `/var/www/softsuave-site/repo.git` | GitLab mirror the server builds from (root-only) |
| `/usr/local/sbin/ss-deploy`, `ss-rollback`, `ss-deploy-gate` | the scripts in `deploy/server/` |

A person with root can run the same thing by hand: `sudo ss-deploy <full sha>`,
`sudo ss-rollback`, `sudo ss-deploy --status`.

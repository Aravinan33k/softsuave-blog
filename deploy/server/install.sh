#!/bin/bash
# One-time setup on the production server (3.229.92.25) for the GitLab pipeline.
# Run as root from a checkout of this repo:   sudo bash deploy/server/install.sh
#
# Needs two values, read from files so they never appear in shell history:
#   /root/ss-deploy-pipeline.pub   public half of the pipeline's SSH key (the private
#                                  half goes into GitLab as the DEPLOY_SSH_KEY variable)
#   /root/ss-gitlab-deploy-token   "username:token" of a GitLab deploy token with only
#                                  read_repository on softsuave-site/ss-new-pages-2.0
#
# Creates:
#   user "deploy"       no password, no shell access: its key can only run ss-deploy-gate
#   sudoers entry       deploy may run ss-deploy and ss-rollback as root, nothing else
#   /usr/local/sbin/ss-deploy, ss-rollback, ss-deploy-gate, /usr/local/lib/ss-deploy/page-check.py
#   /var/www/softsuave-site/repo.git   bare mirror of GitLab (root-only, holds the token)
# Changes nothing that serves traffic. Safe to re-run (updates the scripts).
set -euo pipefail
cd "$(dirname "$0")"
GITLAB=gitlab.zapptor.com/softsuave-site/ss-new-pages-2.0.git
BASE=/var/www/softsuave-site

[ "$(id -u)" = 0 ] || { echo "run as root"; exit 1; }
[ -s /root/ss-deploy-pipeline.pub ] || { echo "missing /root/ss-deploy-pipeline.pub"; exit 1; }
[ -s /root/ss-gitlab-deploy-token ] || { echo "missing /root/ss-gitlab-deploy-token"; exit 1; }

install -m 0755 -o root -g root ss-deploy ss-rollback ss-deploy-gate /usr/local/sbin/
install -d -m 0755 /usr/local/lib/ss-deploy
install -m 0644 -o root -g root page-check.py /usr/local/lib/ss-deploy/

id deploy >/dev/null 2>&1 || useradd --create-home --shell /bin/bash deploy
passwd -l deploy >/dev/null
install -d -m 0700 -o deploy -g deploy /home/deploy/.ssh
# no-pty, no forwarding: the key opens no shell, only the gate.
echo "command=\"/usr/local/sbin/ss-deploy-gate\",no-pty,no-port-forwarding,no-agent-forwarding,no-X11-forwarding $(cat /root/ss-deploy-pipeline.pub)" \
  > /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 0600 /home/deploy/.ssh/authorized_keys

cat > /etc/sudoers.d/ss-deploy <<'EOF'
deploy ALL=(root) NOPASSWD: /usr/local/sbin/ss-deploy, /usr/local/sbin/ss-rollback
EOF
chmod 0440 /etc/sudoers.d/ss-deploy
visudo -cf /etc/sudoers.d/ss-deploy

if [ ! -d $BASE/repo.git ]; then
  git init --bare --quiet $BASE/repo.git
fi
git -C $BASE/repo.git remote remove origin 2>/dev/null || true
git -C $BASE/repo.git remote add origin "https://$(tr -d '\r\n' < /root/ss-gitlab-deploy-token)@$GITLAB"
chmod -R go-rwx $BASE/repo.git
git -C $BASE/repo.git fetch --quiet origin '+refs/heads/main:refs/heads/main'
echo "GitLab main is at $(git -C $BASE/repo.git rev-parse --short main)"
shred -u /root/ss-gitlab-deploy-token

echo "installed. Test from the runner:  ssh deploy@3.229.92.25 status"

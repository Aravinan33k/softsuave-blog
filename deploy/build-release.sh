#!/bin/bash
# Build a new softsuave-site release next to the running one. No traffic change, no restart.
# usage: deploy-release.sh <old-rel> <new-rel> <changed-files.tar.gz>
set -euo pipefail
OLD=$1; NEW=$2; TAR=$3
BASE=/var/www/softsuave-site
R=$BASE/releases/$NEW
export PATH=/opt/node22/bin:/usr/local/bin:/usr/bin:/bin
unset NODE_ENV
[ -e "$R" ] && { echo "release $NEW exists"; exit 1; }
echo "$(date -u +%FT%TZ) copy source from $OLD"
mkdir -p "$R"
tar -C "$BASE/releases/$OLD" --exclude=./.next --exclude=./node_modules -cf - . | tar -C "$R" -xf -
cp -a "$BASE/releases/$OLD/node_modules" "$R/node_modules"
tar -xzf "$TAR" -C "$R"
ln -sfn "$BASE/shared/.env" "$R/.env"
cd "$R"
( while true; do
    echo "$(date -u +%T) $(free -m | awk '/Mem:/{print "used="$3"MB avail="$7"MB"}') $(free -m | awk '/Swap:/{print "swap="$3"MB"}') load=$(cut -d' ' -f1 /proc/loadavg)"
    sleep 5
  done ) > "$BASE/logs/mem-$NEW.log" &
SAMPLER=$!
trap 'kill $SAMPLER 2>/dev/null || true' EXIT
t1=$(date +%s)
echo "$(date -u +%FT%TZ) build"
NEXT_BUILD_CPUS=1 NODE_OPTIONS=--max-old-space-size=2048 nice -n 19 ionice -c3 npm run build
echo "TIMING build=$(( $(date +%s) - t1 ))s"
echo BUILD_OK

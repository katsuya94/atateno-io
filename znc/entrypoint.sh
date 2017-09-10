#!/usr/bin/env sh

set -e

sudo chown app /home/app/.znc/configs/znc.conf

su -c "exec $*" -s /bin/sh app

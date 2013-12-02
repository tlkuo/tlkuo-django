#!/bin/bash
cd $(dirname $0)
git pull
rm -rf static
echo "yes" | python manage.py collectstatic


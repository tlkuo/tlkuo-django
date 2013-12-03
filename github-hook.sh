#!/bin/bash
cd $(dirname $0)
git pull
npm install --production
echo "yes" | python manage.py collectstatic
grunt production


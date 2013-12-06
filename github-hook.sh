#!/bin/bash
cd $(dirname $0)
git pull
npm install --production
jam install
python manage.py collectstatic --noinput --ignore jam --ignore '*.r.js'
grunt production
touch tlkuo/wsgi.py


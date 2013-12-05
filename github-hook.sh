#!/bin/bash
cd $(dirname $0)
git pull
npm install --production
python manage.py collectstatic --noinput -i '*.r.js'
grunt production
touch tlkuo/wsgi.py


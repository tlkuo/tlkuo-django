#!/bin/bash
cd $(dirname $0)
git pull
npm install
jam install
python manage.py collectstatic --noinput --ignore global --ignore jam --ignore about
grunt
touch tlkuo/wsgi.py


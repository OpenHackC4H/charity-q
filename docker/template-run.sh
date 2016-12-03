#!/bin/bash

IMAGE=q/app
NAME=q-app

echo "Starting $NAME"
sudo docker stop $NAME 1>/dev/null 2>&1
sudo docker rm $NAME 1>/dev/null 2>&1

sudo docker run \
    -d \
    -e COUCHDB_URL='http://1.2.3.4:1234' \
    -e OBP_TOKEN='<TOKEN>' \
    -p 3000:3000 \
    --name $NAME $IMAGE 1>/dev/null

sudo docker ps --format="\n  ID: {{.ID}}\n  Name: {{.Names}}\n  Image: {{.Image}}\n  Ports: {{.Ports}}" --filter=name=$NAME

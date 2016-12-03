#!/bin/bash

IMAGE=couchdb:1.6.1
NAME=q-db

sudo docker stop $NAME 1>/dev/null 2>&1
sudo docker rm $NAME 1>/dev/null 2>&1
mkdir data 2>/dev/null 

echo "Starting $NAME"
sudo docker run \
    -d \
    -p 5984:5984 \
    -v $(pwd)/data:/usr/local/var/lib/couchdb \
    --name $NAME $IMAGE 1>/dev/null

sudo docker ps --format="\n  ID: {{.ID}}\n  Name: {{.Names}}\n  Image: {{.Image}}\n  Ports: {{.Ports}}" --filter=name=$NAME

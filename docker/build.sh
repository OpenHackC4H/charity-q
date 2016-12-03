#!/bin/bash

IMAGE=q/app

echo "Building $IMAGE..."
docker build \
    --no-cache \
    -t $IMAGE \
    --build-arg appurl=https://github.com/rymdkraftverk/q \
    .

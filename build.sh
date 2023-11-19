#!/usr/bin/env bash

docker stop incubator-stage-one
docker rm incubator-stage-one
docker rmi incubator-stage-one_image
docker build -t incubator-stage-one_image ~/incubator-stage-one
docker run --restart unless-stopped --name incubator-stage-one -p 5050:3000 -d incubator-stage-one_image

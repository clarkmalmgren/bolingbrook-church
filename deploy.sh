#! /bin/bash

REPO="971947037958.dkr.ecr.us-east-1.amazonaws.com/bolingbrook-church/website"

echo "Starting Deploy Script"

docker --version
docker tag ${REPO}:${TRAVIS_TAG} ${REPO}:latest

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

eval $(aws ecr get-login --region us-east-1 --no-include-email)
docker push ${REPO}

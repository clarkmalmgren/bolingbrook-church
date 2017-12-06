#! /bin/bash

echo "Starting Deploy Script"

docker --version
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

eval $(aws ecr get-login --region us-east-1)
docker push 971947037958.dkr.ecr.us-east-1.amazonaws.com/bolingbrook-church/website

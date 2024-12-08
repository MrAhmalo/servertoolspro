#!/bin/sh

set -e

REPO_URL="https://github.com/MrAhmalo/servertoolspro.git"
ZIP_NAME="servertoolspro.blueprint"
NEW_FOLDER="servertoolspro"

cd /home/ahmalo/docker-compose/blueprint/extensions
rm -rf servertoolspro
rm -rf servertoolspro.blueprint

git clone "$REPO_URL"

cd "$NEW_FOLDER"
rm -rf install.sh
rm -rf readme.md
zip -r "../$ZIP_NAME" ./*
cd ..

rm -rf "$NEW_FOLDER"

echo "Got newest version!"

cd /home/ahmalo/docker-compose/blueprint/
docker-compose exec panel blueprint -i servertoolspro
#!/bin/sh

set -e

cd /home/docker-compose/blueprint/extensions
rm -f servertoolspro.blueprint

NEW_FOLDER="tempfolder"
REPO_URL="https://github.com/MrAhmalo/servertoolspro.git"
ZIP_NAME="servertoolspro.blueprint"

mkdir -p "$NEW_FOLDER"
git clone "$REPO_URL" "$NEW_FOLDER"

cd "$NEW_FOLDER"
rm -rf install.sh
cd ..

zip -r "$ZIP_NAME" "$NEW_FOLDER"

rm -rf "$NEW_FOLDER"

echo "Got newest version!"

docker-compose exec panel sh

blueprint -i servertoolspro
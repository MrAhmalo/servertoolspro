#!/bin/sh

set -e

NEW_FOLDER="tempfolder"
REPO_URL="https://github.com/your_username/your_repo.git"
ZIP_NAME="servertoolspro.blueprint"

mkdir -p "$NEW_FOLDER"

git clone "$REPO_URL" "$NEW_FOLDER"

zip -r "$ZIP_NAME" "$NEW_FOLDER"

rm -rf "$NEW_FOLDER"

echo "Got newest version!"

blueprint -i servertoolspro

#!/usr/bin/env bash

rm -rf dist/
tsc -p ./
cp ./package.json ./dist
cp ./README.md ./dist

npm pub ./dist

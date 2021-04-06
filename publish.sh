#!/usr/bin/env bash

rm -rf build/
npm run build

cp ./package.json ./build/src/
cp ./README.md ./build/src/

# npm pub ./build/src

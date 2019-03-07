#!/usr/bin/env bash


# Symlink our packages to the root node modules.
# This is required for Jest/ESLint.

root=$PWD
scope="$root/node_modules/@airbnb"

rm -rf "$scope"
mkdir -p "$scope"

for pkg in ./packages/*; do
  name=$(basename "$pkg")
  src="$root/packages/$name"
  dst="$scope/lunar-$name"

  if [ "$name" = "core" ]
  then
    dst="$scope/lunar"
  fi

  ln -s -f "$src" "$dst"
done

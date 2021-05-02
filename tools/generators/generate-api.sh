#!/usr/bin/env bash

api=$1

rm -rf libs/data-access/"$api"/src/lib/openapi

./node_modules/.bin/openapi-generator-cli generate \
  -i libs/data-access/"$api"/src/lib/openapi.json \
  -g typescript-angular \
  -o libs/data-access/"$api"/src/lib/openapi \
  -c openapi-codegen-config.json \
  --skip-validate-spec \

sed -i "s/' | }/' }/" libs/data-access/"$api"/src/lib/openapi/**/*.ts
sed -i "s/SetApiModel/Set/" libs/data-access/"$api"/src/lib/openapi/**/*.ts
sed -i "s/import { Set } from '.\/set.api.model'//" libs/data-access/"$api"/src/lib/openapi/**/*.ts

prettier --write "libs/data-access/"$api"/src/lib/$libFolderName/openapi/**/*.ts"

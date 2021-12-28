#!/bin/bash

ls -la ./generated
rm ./generated/*.js*
ls -la ./generated

npm run gen.dao
npm run scan:apis
refresh



#!/bin/bash

rm -r data
scp -r cs\\sz33iz@130.225.57.117:/srv/domOS/* ../nodeJS/data
cd ../nodeJS
node ./WSDBserver.js &
node ./WSserver.js &
cd ..
node ./nodeJS/d1.js &

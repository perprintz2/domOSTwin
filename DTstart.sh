#!/bin/bash

#rm -r data
scp -r cs\\sz33iz@130.225.57.117:/srv/domOS/* .
cd ./WSservers
node ./WSDBserver.js &
node ./WSserver.js &
cd ..
node ./Webserver/d1.js &
Rscript ./Rsrc/simStart.R &
cd ./Matlab
/home/ppm/matlab -nodisplay -nosplach -nodesktop -r "run('/home/ppm/Documents/demos/domOS/DigiTwin/Matlab/mqttDataReciver.m');"

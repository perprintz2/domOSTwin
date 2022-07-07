#!/bin/bash

#rm -r data
scp -r cs\\sz33iz@130.225.57.117:/srv/domOS/* ..
cd ./WSservers
node ./WSDBserver.js &
node ./WSserver.js &
cd ..
node ./Webserver/d1.js &
Rscript ./Rsrc/simStart.R &
cd ./Matlab
google-chrome http://172.25.12.11:8080/DigiTwin/domOSDTsim.html &
google-chrome http://172.25.12.11:8080/DigiTwin/index.html &
/home/ppm/matlab -nodisplay -nosplash -nodesktop -r "run('/home/ppm/Documents/demos/domOS/DigiTwin/Matlab/mqttDataReciver.m');"

#!/bin/bash

#rm -r data
scp -r cs\\sz33iz@130.225.57.117:/srv/domOS/* ..
cd ./WSservers
node ./WSDBserver.js &
node ./WSserver.js &
cd ..
node ./d1.js &
Rscript ./Rsrc/simStart.R &
cd ../WoTDomOS
node ./wotMain.js &
cd ../DigiTwin/Matlab
google-chrome http://localhost:8080/domOSDTsim.html &
google-chrome http://localhost:8080/index.html &
/home/ppm/matlab -nodisplay -nosplash -nodesktop -r "run('/home/ppm/Documents/demos/domOS/DigiTwin/Matlab/mqttDataReciver.m');" 

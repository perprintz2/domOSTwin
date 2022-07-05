%Create Mqtt connection
global iii ...
    Corridorco2 Corridorhumidity Corridortemperature CorridortemperatureNN ...
    Room1co2 Room1humidity Room1temperature Room1temperatureNN ...
    Room2co2 Room2humidity Room2temperature Room2temperatureNN ...
    Room4co2 Room4humidity Room4temperature Room4temperatureNN ...
    Kitchenco2 Kitchenhumidity Kitchentemperature KitchentemperatureNN...
    Room1diT0 Room1diT1 ...
    KitchendiT0 KitchendiT1 ... 
    CorridordiT0 CorridordiT1 ...
    myMQTT ...
    Room1extx Room1exty Room1nn_net ...
    Room2extx Room2exty Room2nn_net ...
    Room4extx Room4exty Room4nn_net ...
    Corridorextx Corridorexty Corridornn_net ...
    Kitchenextx Kitchenexty Kitchennn_net ...
    offset InletFlow DiffTemp OutsideTemp WindSpeed DirectSunPowerVertical

%load('nn.mat')
%load('ext.mat')
%load('nn2.mat')

load('TrainedNet/Room1TempNN.mat')
Room1nn_net=nn_net;

load('TrainedNet/Room2TempNN.mat')
Room2nn_net=nn_net;

load('TrainedNet/Room4TempNN.mat')
Room4nn_net=nn_net;

load('TrainedNet/KitchenTempNN.mat')
Kitchennn_net=nn_net;

load('TrainedNet/CorridorTempNN.mat')
Corridornn_net=nn_net;


load('TrainedNet/Room1ext.mat')
Room1extx=extx;
Room1exty= exty;

load('TrainedNet/Room2ext.mat')
Room2extx=extx;
Room2exty= exty;

load('TrainedNet/Room4ext.mat')
Room4extx=extx;
Room4exty= exty;

load('TrainedNet/Kitchenext.mat')
Kitchenextx=extx;
Kitchenexty= exty;

load('TrainedNet/Corridorext.mat')
Corridorextx=extx;
Corridorexty= exty;



%load('tot.mat')

offset =0;

Corridorco2= ones(1,5)*700;
Corridorhumidity= ones(1,5)*50;
Corridortemperature= ones(1,5)*21;
CorridortemperatureNN= ones(1,5)*21;

Room1co2= ones(1,5)*50;
Room1humidity= ones(1,5)*50;
Room1temperature= ones(1,5)*21;

Room2co2= ones(1,5)*50;
Room2humidity= ones(1,5)*50;
Room2temperature= ones(1,5)*21;
Room1temperatureNN= ones(1,5)*21;
Room2temperatureNN= ones(1,5)*21;

Room4co2= ones(1,5)*50;
Room4humidity= ones(1,5)*50;
Room4temperature= ones(1,5)*21;
Room4temperatureNN= ones(1,5)*21;

Kitchenco2= ones(1,5)*50;
Kitchenhumidity= ones(1,5)*50;
Kitchentemperature= ones(1,5)*21;
KitchentemperatureNN= ones(1,5)*21;


OutsideTemp= ones(1,5)*3;
WindSpeed= ones(1,5)*4;
DirectSunPowerVertical= ones(1,5)*0.4;
iii=5;



myMQTT=mqttclient('tcp://deis-mqtt01.cs.aau.dk');

%Subscribe to a topic
%iii= 5;
mySub = subscribe(myMQTT,'domOS/#', 'callback','showMessage');
%while 1
%    pause(1);
%end

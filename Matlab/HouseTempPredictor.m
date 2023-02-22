global RoomThermData RoomTempData RoomHumiData RoomCO2Data OutsideData DHeatingData
global iii ...
    Corridorco2 Corridorhumidity Corridortemperature CorridortemperatureNN ...
    Room1co2 Room1humidity Room1temperature Room1temperatureNN ...
    Room2co2 Room2humidity Room2temperature Room2temperatureNN ...
    Room4co2 Room4humidity Room4temperature Room4temperatureNN ...
    Kitchenco2 Kitchenhumidity Kitchentemperature KitchentemperatureNN...
    Room1spT0 Room1spT1 ...
    KitchenspT0 KitchenspT1 ...
    CorridorspT0 CorridorspT1 ...
    Room1extx Room1exty Room1nn_net ...
    Room2extx Room2exty Room2nn_net ...
    Room4extx Room4exty Room4nn_net ...
    Corridorextx Corridorexty Corridornn_net ...
    Kitchenextx Kitchenexty Kitchennn_net ...
    offset InletFlow DiffTemp OutsideTemp WindSpeed DirectSunPowerVertical flags...

flags= zeros(1,6);

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

load('TrainedNet/ER2RoomTempNN.mat')
ER2Roomnn_net=nn_net;

load('TrainedNet/ER2KitchenTempNN.mat')
ER2Kitchennn_net=nn_net;


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


load('TrainedNet/ER2Roomext.mat')
ER2Roomextx=extx;
ER2Roomexty= exty;

load('TrainedNet/ER2Kitchenext.mat')
ER2Kitchenextx=extx;
ER2Kitchenexty= exty;






myMQTT=mqttclient('tcp://172.25.12.11');

mySub = subscribe(myMQTT,'domOS/webClient/+', 'callback','MessageHandler');
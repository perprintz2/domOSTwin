load('nn.mat')
load('ext.mat')

x= [cormp(1), cormp(3), cormp(5), corumi(1), corumi(3), corumi(5), coro2]';
    
xn= mapstd('apply',x,extx);
co2N= nn_net(xn);
Co2= mapstd('reverse',co2N,exty);

dat.LocationId= 2495;
dat.Time= floor(posixtime(datetime('now','TimeZone','local'))*1000);
dat.Rooms.Room1.co2= Co2;
jsonencode(dat)
myMQTT=mqtt('tcp://deis-mqtt01.cs.aau.dk');

publish(myMQTT,'domOS/+/+',jsonencode(dat));
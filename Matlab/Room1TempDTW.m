x= [[0, room1Tmp, 0];
    [0, 0, room1Tmp];
    [0, room1Humi, 0];
    [0, 0, room1Humi];
    [0, room1Co2, 0];
    [0, 0, room1Co2];
    [0, corTmp, 0];
    [0, 0, corTmp];
    [0, corHumi, 0];
    [0, 0, corHumi];
    [0, corCo2, 0];
    [0, 0, corCo2];
    [0, windSp, 0];
    [0, 0, windSp];
    [0, outTmp, 0];
    [0, 0, outTmp];
    [0, SunPower, 0];
    [0, 0, SunPower];
    [0, diffInTemp, 0];
    [0, 0, diffInTemp];
    [0, InletF, 0];
    [0, 0, InletF];
    [0, Room1diffT0, 0];
    [0, Room1diffT1, 0]];

y= [room1Tmp, 0, 0];

xc= x(:,3:size(x,2)-2);
yc= y(:,3:size(y,2)-2);

[xcn,extx]= mapstd(xc);
[ycn,exty]= mapstd(yc);

save 'TrainedNet/Room1ext.mat' extx exty

antN= 16;

% Build the network
nn_net = feedforwardnet(antN, 'trainlm'); % learning methode: Levenberg-Marquardt

% nn_net = feedforwardnet(antN, 'traingd');
nn_net.trainParam.epochs = 1000;

% train the network using the default 
nn_net = train(nn_net,xcn,ycn);
save 'TrainedNet/Room1TempNN.mat' nn_net
ynet = nn_net(xcn);
ytmp= mapstd('reverse',ynet,exty);

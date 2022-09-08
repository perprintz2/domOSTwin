x= [[0, ER2roomTmp, 0];
    [0, 0, ER2roomTmp];
    [0, ER2roomHumi, 0];
    [0, 0, ER2roomHumi];
    [0, ER2roomCo2, 0];
    [0, 0, ER2roomCo2];
    [0, ER2KitchenTmp, 0];
    [0, 0, ER2KitchenTmp];
    [0, ER2KitchenHumi, 0];
    [0, 0, ER2KitchenHumi];
    [0, ER2KitchenCo2, 0];
    [0, 0, ER2KitchenCo2];
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
    [0, ER2RoomdiffT0, 0]];

y= [ER2roomTmp, 0, 0];

xc= x(:,3:size(x,2)-2);
yc= y(:,3:size(y,2)-2);

[xcn,extx]= mapstd(xc);
[ycn,exty]= mapstd(yc);

save 'TrainedNet/ER2Roomext.mat' extx exty

antN= 16;

% Build the network
nn_net = feedforwardnet(antN, 'trainlm'); % learning methode: Levenberg-Marquardt

% nn_net = feedforwardnet(antN, 'traingd');
nn_net.trainParam.epochs = 1000;

% train the network using the default 
nn_net = train(nn_net,xcn,ycn);
save 'TrainedNet/ER2RoomTempNN.mat' nn_net
ynet = nn_net(xcn);
ytmp= mapstd('reverse',ynet,exty);

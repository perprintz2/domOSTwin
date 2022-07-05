%% Import data from text file
% Script for importing data from the following text file:
%
%    filename: /home/ppm/Documents/demos/domOS/Matlab/data/Room1temperature.data
%
% Auto-generated by MATLAB on 13-Dec-2021 12:04:09

clear
%% Set up the Import Options and import the data
opts = delimitedTextImportOptions("NumVariables", 2);

% Specify range and delimiter
opts.DataLines = [1, Inf];
opts.Delimiter = ",";

% Specify column names and types
opts.VariableNames = ["time", "data"];
opts.VariableTypes = ["uint64", "double"];

% Specify file level properties
opts.ExtraColumnsRule = "ignore";
opts.EmptyLineRule = "read";

% Specify variable properties
opts = setvaropts(opts, ["time", "data"], "ThousandsSeparator", ",");

% Import the data
Room1temp = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1temperature.data", opts);
Room1humi = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1humidity.data", opts);
Room1co2 = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1co2.data", opts);
Corridortemp = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Corridortemperature.data", opts);
Corridorhumi = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Corridorhumidity.data", opts);
Corridorco2 = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Corridorco2.data", opts);
InletFlow = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/InletFlow.data", opts);
InletTemperature = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/InletTemperature.data", opts);
OutletTemperature = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/OutletTemperature.data", opts);
DirectSunPowerVertical = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/DirectSunPowerVertical.data", opts);
OutTemp = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/OutTemp.data", opts);
WindSpeed = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/WindSpeed.data", opts);
Room1thermostatssetpoint0 = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1thermostatssetpoint0.data", opts);
Room1thermostatssetpoint1 = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1thermostatssetpoint1.data", opts);
Room1thermostatstemperature0 = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1thermostatstemperature0.data", opts);
Room1thermostatstemperature1 = readtable("/home/ppm/Documents/demos/domOS/Matlab/data/Room1thermostatstemperature1.data", opts);

cTime=DirectSunPowerVertical.time(2);

%%

i1=1;
i2=1;
i3=1;
i4=1;
i5=1;
i6=1;
i7=1;
i8=1;
i9=1;
i10=1;
i11=1;
i12=1;
i13=1;
i14=1;
i15=1;
i16=1;
i=1;
    
        corTmp=    zeros(1,12000);
        corHumi=    zeros(1,12000);
        corCo2=    zeros(1,12000);
        room1Humi=    zeros(1,12000);
        room1Co2=    zeros(1,12000);
        room1Tmp=    zeros(1,12000);
        
        
        outTmp=    zeros(1,12000);
        windSp=    zeros(1,12000);
        SunPower=    zeros(1,12000);
        InletTemp=    zeros(1,12000);
        InletF=    zeros(1,12000);
        OutletTemp=    zeros(1,12000);
        Room1tSP0=    zeros(1,12000);
        Room1tSP1=    zeros(1,12000);
        Room1tt0=    zeros(1,12000);
        Room1tt1=    zeros(1,12000);

        


    while (cTime < Corridortemp.time(size(Corridortemp.data,1)))

        [corTmp(i),i1]=    findValue(Corridortemp,uint64(cTime),i1);
        [corHumi(i),i2]=   findValue(Corridorhumi,uint64(cTime),i2);
        [corCo2(i),i3]=    findValue(Corridorco2, uint64(cTime),i3);
        [room1Humi(i),i4]= findValue(Room1humi,   uint64(cTime),i4);
        [room1Co2(i),i5]=  findValue(Room1co2,    uint64(cTime),i5);
        [room1Tmp(i),i6]=  findValue(Room1temp,   uint64(cTime),i6);
        
        
        [outTmp(i),i7]=    findValue(OutTemp,     uint64(cTime),i7);
        [windSp(i),i8]=    findValue(WindSpeed,   uint64(cTime),i8);
        [SunPower(i),i9]=  findValue(DirectSunPowerVertical,uint64(cTime),i9);
        [InletTemp(i),i10]= findValue(InletTemperature,uint64(cTime),i10);
        [OutletTemp(i),i11]=findValue(OutletTemperature,uint64(cTime),i11);
        [InletF(i),i12]=findValue(InletFlow,uint64(cTime),i12);
        [Room1tSP0(i),i13]=findValue(Room1thermostatssetpoint0,uint64(cTime),i13);
        [Room1tSP1(i),i14]=findValue(Room1thermostatssetpoint1,uint64(cTime),i14);
        
         [Room1tt0(i),i15]=findValue(Room1thermostatstemperature0,uint64(cTime),i15);
        [Room1tt1(i),i16]=findValue(Room1thermostatstemperature1,uint64(cTime),i16);
        
        
        cTime= cTime + 1000*60*10;
       
        i=i+1

    end
        
    
    
    diffInTemp= InletTemp- OutletTemp;
    diffT0= Room1tSP0 - Room1tt0;
    diffT1= Room1tSP1 - Room1tt1;
    
x= [[0, corTmp, 0];
    [0, 0, corTmp];
    [0, corHumi, 0];
    [0, 0, corHumi];
    [0, corCo2, 0];
    [0, 0, corCo2];
    [0, room1Tmp, 0];
    [0, 0, room1Tmp];
    [0, room1Humi, 0];
    [0, 0, room1Humi];
    [0, room1Co2, 0];
    [0, 0, room1Co2];
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
    [0, diffT0, 0];
    [0, diffT1, 0]];

y= [room1Tmp, 0, 0];

xc= x(:,3:size(x,2)-2);
yc= y(:,3:size(y,2)-2);

[xcn,extx]= mapstd(xc);
[ycn,exty]= mapstd(yc);

save 'ext.mat' extx exty

antN= 16;

% Build the network
nn_net = feedforwardnet(antN, 'trainlm'); % learning methode: Levenberg-Marquardt

% nn_net = feedforwardnet(antN, 'traingd');
nn_net.trainParam.epochs = 1000;

% train the network using the default 
nn_net = train(nn_net,xcn,ycn);
save 'nn2.mat' nn_net
ynet = nn_net(xcn);
ytmp= mapstd('reverse',ynet,exty);

%% Clear temporary variables
clear opts
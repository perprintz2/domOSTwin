clear

!scp -r cs\\sz33iz@130.225.57.117:/srv/domOS/* /home/ppm/Documents/demos/domOS/DigiTwin

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

Room1temp =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1temperature.data", opts);
Room1humi =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1humidity.data", opts);
Room1co2 =               readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1co2.data", opts);
Room2temp =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1temperature.data", opts);
Room2humi =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1humidity.data", opts);
Room2co2 =               readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1co2.data", opts);
Room4temp =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1temperature.data", opts);
Room4humi =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1humidity.data", opts);
Room4co2 =               readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1co2.data", opts);
Corridortemp =           readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridortemperature.data", opts);
Corridorhumi =           readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridorhumidity.data", opts);
Corridorco2 =            readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridorco2.data", opts);
Kitchentemp =            readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchentemperature.data", opts);
Kitchenhumi =            readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchenhumidity.data", opts);
Kitchenco2 =             readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchenco2.data", opts);

InletFlow =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/InletFlow.data", opts);
InletTemperature =       readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/InletTemperature.data", opts);
OutletTemperature =      readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/OutletTemperature.data", opts);
DirectSunPowerVertical = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/DirectSunPowerVertical.data", opts);
OutTemp =                readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/OutTemp.data", opts);
WindSpeed =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/WindSpeed.data", opts);


Room1thermostatssetpoint0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1thermostatssetpoint0.data", opts);
Room1thermostatssetpoint1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1thermostatssetpoint1.data", opts);
Room1thermostatstemperature0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1thermostatstemperature0.data", opts);
Room1thermostatstemperature1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Room1thermostatstemperature1.data", opts);
Kitchenthermostatssetpoint0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchenthermostatssetpoint0.data", opts);
Kitchenthermostatssetpoint1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchenthermostatssetpoint1.data", opts);
Kitchenthermostatstemperature0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchenthermostatstemperature0.data", opts);
Kitchenthermostatstemperature1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Kitchenthermostatstemperature1.data", opts);
Corridorthermostatssetpoint0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridorthermostatssetpoint0.data", opts);
Corridorthermostatssetpoint1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridorthermostatssetpoint1.data", opts);
Corridorthermostatstemperature0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridorthermostatstemperature0.data", opts);
Corridorthermostatstemperature1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad1/Corridorthermostatstemperature1.data", opts);


cTime=DirectSunPowerVertical.time(2);

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
i17=1;
i18=1;
i19=1;
i20=1;
i21=1;
i22=1;
i23=1;
i24=1;
i25=1;
i26=1;
i27=1;
i28=1;
i29=1;
i30=1;
i31=1;
i32=1;
i33=1;

i=1;
    
        corTmp=    zeros(1,12000);
        corHumi=    zeros(1,12000);
        corCo2=    zeros(1,12000);
        room1Humi=    zeros(1,12000);
        room1Co2=    zeros(1,12000);
        room1Tmp=    zeros(1,12000);
        room2Humi=    zeros(1,12000);
        room2Co2=    zeros(1,12000);
        room2Tmp=    zeros(1,12000);
        room4Humi=    zeros(1,12000);
        room4Co2=    zeros(1,12000);
        room4Tmp=    zeros(1,12000);
        KitchenHumi=    zeros(1,12000);
        KitchenCo2=    zeros(1,12000);
        kitchenTmp=    zeros(1,12000);
        
        
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
        KitchentSP0=    zeros(1,12000);
        KitchentSP1=    zeros(1,12000);
        Kitchentt0=    zeros(1,12000);
        Kitchentt1=    zeros(1,12000);
        CorridortSP0=    zeros(1,12000);
        CorridortSP1=    zeros(1,12000);
        Corridortt0=    zeros(1,12000);
        Corridortt1=    zeros(1,12000);

        


    while (cTime < Corridortemp.time(size(Corridortemp.data,1)))

        [corTmp(i),i1]=      findValue(Corridortemp,uint64(cTime),i1);
        [corHumi(i),i2]=     findValue(Corridorhumi,uint64(cTime),i2);
        [corCo2(i),i3]=      findValue(Corridorco2, uint64(cTime),i3);
        [room1Humi(i),i4]=   findValue(Room1humi,   uint64(cTime),i4);
        [room1Co2(i),i5]=    findValue(Room1co2,    uint64(cTime),i5);
        [room1Tmp(i),i6]=    findValue(Room1temp,   uint64(cTime),i6);
        [room2Humi(i),i7]=   findValue(Room2humi,   uint64(cTime),i7);
        [room2Co2(i),i8]=    findValue(Room2co2,    uint64(cTime),i8);
        [room2Tmp(i),i9]=    findValue(Room2temp,   uint64(cTime),i9);
        [room4Humi(i),i10]=   findValue(Room4humi,   uint64(cTime),i10);
        [room4Co2(i),i11]=    findValue(Room4co2,    uint64(cTime),i11);
        [room4Tmp(i),i12]=    findValue(Room4temp,   uint64(cTime),i12);
        [KitchenHumi(i),i31]=   findValue(Kitchenhumi,   uint64(cTime),i31);
        [KitchenCo2(i),i32]=    findValue(Kitchenco2,    uint64(cTime),i32);
        [KitchenTmp(i),i33]=    findValue(Kitchentemp,   uint64(cTime),i33);
        
        
        
        [outTmp(i),i17]=      findValue(OutTemp,     uint64(cTime),i17);
        [windSp(i),i18]=      findValue(WindSpeed,   uint64(cTime),i18);
        [SunPower(i),i19]=    findValue(DirectSunPowerVertical,uint64(cTime),i19);
        [InletTemp(i),i20]=  findValue(InletTemperature,uint64(cTime),i20);
        [OutletTemp(i),i21]= findValue(OutletTemperature,uint64(cTime),i21);
        [InletF(i),i22]=     findValue(InletFlow,uint64(cTime),i22);
        
        [Room1tSP0(i),i13]=  findValue(Room1thermostatssetpoint0,uint64(cTime),i13);
        [Room1tSP1(i),i14]=  findValue(Room1thermostatssetpoint1,uint64(cTime),i14);
        
        [Room1tt0(i),i15]=   findValue(Room1thermostatstemperature0,uint64(cTime),i15);
        [Room1tt1(i),i16]=   findValue(Room1thermostatstemperature1,uint64(cTime),i16);
        
        [KitchentSP0(i),i23]=  findValue(Kitchenthermostatssetpoint0,uint64(cTime),i23);
        [KitchentSP1(i),i24]=  findValue(Kitchenthermostatssetpoint1,uint64(cTime),i24);
        
        [Kitchentt0(i),i25]=   findValue(Kitchenthermostatstemperature0,uint64(cTime),i25);
        [Kitchentt1(i),i26]=   findValue(Kitchenthermostatstemperature1,uint64(cTime),i26);
        
               
        [CorridortSP0(i),i27]=  findValue(Corridorthermostatssetpoint0,uint64(cTime),i27);
        [CorridortSP1(i),i28]=  findValue(Corridorthermostatssetpoint1,uint64(cTime),i28);
        
        [Corridortt0(i),i29]=   findValue(Corridorthermostatstemperature0,uint64(cTime),i29);
        [Corridortt1(i),i30]=   findValue(Corridorthermostatstemperature1,uint64(cTime),i30);
        
        
        cTime= cTime + 1000*60*10;
       
        i=i+1

    end
        
    
    
    diffInTemp= InletTemp- OutletTemp;
    Room1diffT0= Room1tSP0 - Room1tt0;
    Room1diffT1= Room1tSP1 - Room1tt1;
    
    CorridordiffT0= CorridortSP0 - Corridortt0;
    CorridordiffT1= CorridortSP1 - Corridortt1;
    
    KitchendiffT0= KitchentSP0 - Kitchentt0;
    KitchendiffT1= KitchentSP1 - Kitchentt1;
    
    
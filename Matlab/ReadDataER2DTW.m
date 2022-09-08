

%!scp -r cs\\sz33iz@130.225.57.117:/srv/domOS/* /home/ppm/Documents/demos/domOS/DigiTwin

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

ER2Roomtemp =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Roomtemperature.data", opts);
ER2Roomhumi =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Roomhumidity.data", opts);
ER2Roomco2 =               readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Roomco2.data", opts);
ER2Kitchentemp =            readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchentemperature.data", opts);
ER2Kitchenhumi =            readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenhumidity.data", opts);
ER2Kitchenco2 =             readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenco2.data", opts);

ER2InletFlow =              readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/InletFlow.data", opts);
ER2InletTemperature =       readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/InletTemperature.data", opts);
ER2OutletTemperature =      readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/OutletTemperature.data", opts);


ER2Roomthermostatssetpoint0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Roomthermostatssetpoint0.data", opts);

ER2Roomthermostatstemperature0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Roomthermostatstemperature0.data", opts);

ER2Kitchenthermostatssetpoint0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenthermostatssetpoint0.data", opts);
ER2Kitchenthermostatssetpoint1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenthermostatssetpoint1.data", opts);
ER2Kitchenthermostatssetpoint2 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenthermostatssetpoint2.data", opts);

ER2Kitchenthermostatstemperature0 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenthermostatstemperature0.data", opts);
ER2Kitchenthermostatstemperature1 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenthermostatstemperature1.data", opts);
ER2Kitchenthermostatstemperature2 = readtable("/home/ppm/Documents/demos/domOS/DigiTwin/data/EnergyRoad2/Kitchenthermostatstemperature2.data", opts);


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
    
       
        ER2roomHumi=    zeros(1,12000);
        ER2roomCo2=    zeros(1,12000);
        ER2roomTmp=    zeros(1,12000);
        
        ER2KitchenHumi=    zeros(1,12000);
        ER2KitchenCo2=    zeros(1,12000);
        ER2KitchenTmp=    zeros(1,12000);
        
        
        
        ER2InletTemp=    zeros(1,12000);
        ER2InletF=    zeros(1,12000);
        ER2OutletTemp=    zeros(1,12000);
        
        
        ER2RoomtSP0=    zeros(1,12000);
        ER2Roomtt0=    zeros(1,12000);
        ER2KitchentSP0=    zeros(1,12000);
        ER2KitchentSP1=    zeros(1,12000);
        ER2KitchentSP2=    zeros(1,12000);

        ER2Kitchentt0=    zeros(1,12000);
        ER2Kitchentt1=    zeros(1,12000);
        ER2Kitchentt2=    zeros(1,12000);

     

    while (cTime < ER2Roomtemp.time(size(ER2Roomtemp.data,1)))

        [ER2roomHumi(i),i4]=   findValue(ER2Roomhumi,   uint64(cTime),i4);
        [ER2roomCo2(i),i5]=    findValue(ER2Roomco2,    uint64(cTime),i5);
        [ER2roomTmp(i),i6]=    findValue(ER2Roomtemp,   uint64(cTime),i6);
       
        [ER2KitchenHumi(i),i31]=   findValue(ER2Kitchenhumi,   uint64(cTime),i31);
        [ER2KitchenCo2(i),i32]=    findValue(ER2Kitchenco2,    uint64(cTime),i32);
        [ER2KitchenTmp(i),i33]=    findValue(ER2Kitchentemp,   uint64(cTime),i33);
        
        
        
       
        [ER2InletTemp(i),i20]=  findValue(ER2InletTemperature,uint64(cTime),i20);
        [ER2OutletTemp(i),i21]= findValue(ER2OutletTemperature,uint64(cTime),i21);
        [ER2InletF(i),i22]=     findValue(ER2InletFlow,uint64(cTime),i22);
        
        [ER2RoomtSP0(i),i13]=  findValue(ER2Roomthermostatssetpoint0,uint64(cTime),i13);
        [ER2Roomtt0(i),i15]=   findValue(ER2Roomthermostatstemperature0,uint64(cTime),i15);

     
        
        [ER2KitchentSP0(i),i23]=  findValue(ER2Kitchenthermostatssetpoint0,uint64(cTime),i23);
        [ER2KitchentSP1(i),i24]=  findValue(ER2Kitchenthermostatssetpoint1,uint64(cTime),i24);
        [ER2KitchentSP2(i),i24]=  findValue(ER2Kitchenthermostatssetpoint2,uint64(cTime),i24);

        [ER2Kitchentt0(i),i25]=   findValue(ER2Kitchenthermostatstemperature0,uint64(cTime),i25);
        [ER2Kitchentt1(i),i26]=   findValue(ER2Kitchenthermostatstemperature1,uint64(cTime),i26);
        [ER2Kitchentt2(i),i26]=   findValue(ER2Kitchenthermostatstemperature2,uint64(cTime),i26);

               
        
        
        cTime= cTime + 1000*60*10;
       
        i=i+1

    end
        
    
    
    ER2diffInTemp= ER2InletTemp- ER2OutletTemp;
    ER2RoomdiffT0= ER2RoomtSP0 - ER2Roomtt0;
    
    ER2KitchendiffT0= ER2KitchentSP0 - ER2Kitchentt0;
    ER2KitchendiffT1= ER2KitchentSP1 - ER2Kitchentt1;
    ER2KitchendiffT2= ER2KitchentSP2 - ER2Kitchentt2;

    
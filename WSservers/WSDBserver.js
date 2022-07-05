var WebSocket = require('ws');
var mqtt = require('mqtt')
var fs = require('fs');
//const { text } = require('express');
const lineReader = require('line-reader');
const readLine = require('readline');



function datacv(dataName) {
    switch (dataName) {
        case "Inlet Flow": text = "InletFlow"; break;
        case "Inlet Temperature": text = "InletTemperature"; break;
        case "Outlet Temperature": text = "OutletTemperature"; break;
        case "Power Consumption": text = "PowerConsumption"; break;

        case "LivingRoom Temp": text = "LivingRoomtemperature"; break;
        case "LivingRoom Humi": text = "LivingRoomhumidity"; break;
        case "LivingRoom CO2": text = "LivingRoomco2"; break;

        case "Kitchen Temp": text = "Kitchentemperature"; break;
        case "Kitchen TempNN": text = "KitchentemperatureNN"; break;
        case "Kitchen Humi": text = "Kitchenhumidity"; break;
        case "Kitchen CO2": text = "Kitchenco2"; break;
        case "Kitchen thermSP1": text = "Kitchenthermostatssetpoint0"; break;
        case "Kitchen thermSP2": text = "Kitchenthermostatssetpoint1"; break;
        case "Kitchen thermSP3": text = "Kitchenthermostatssetpoint2"; break;
        case "Kitchen thermMV1": text = "Kitchenthermostatstemperature0"; break;
        case "Kitchen thermMV2": text = "Kitchenthermostatstemperature1"; break;
        case "Kitchen thermMV3": text = "Kitchenthermostatstemperature2"; break;

        case "BedRoom Temp": text = "BedRoomtemperature"; break;
        case "BedRoom Humi": text = "BedRoomhumidity"; break;
        case "BedRoom CO2": text = "BedRoomco2"; break;

        case "Room Temp": text = "Roomtemperature"; break;
        case "Room Humi": text = "Roomhumidity"; break;
        case "Room CO2": text = "Roomco2"; break;
        case "Room thermSP1": text = "Roomthermostatssetpoint0"; break;
        case "Room thermSP2": text = "Roomthermostatssetpoint1"; break;
        case "Room thermMV1": text = "Roomthermostatstemperature0"; break;
        case "Room thermMV2": text = "Roomthermostatstemperature1"; break;

        case "Room1 Temp": text = "Room1temperature"; break;
        case "Room1 TempNN": text = "Room1temperatureNN"; break;
        case "Room1 TempSim": text = "Room1temperatureODE"; break;
        case "Room1 Humi": text = "Room1humidity"; break;
        case "Room1 CO2": text = "Room1co2"; break;
        case "Room1 thermSP1": text = "Room1thermostatssetpoint0"; break;
        case "Room1 thermSP2": text = "Room1thermostatssetpoint1"; break;
        case "Room1 thermMV1": text = "Room1thermostatstemperature0"; break;
        case "Room1 thermMV2": text = "Room1thermostatstemperature1"; break;

        case "Room2 Temp": text = "Room2temperature"; break;
        case "Room2 TempNN": text = "Room2temperatureNN"; break;
        case "Room2 Humi": text = "Room2humidity"; break;
        case "Room2 CO2": text = "Room2co2"; break;

        case "Room3 Temp": text = "Room3temperature"; break;
        case "Room3 Humi": text = "Room3humidity"; break;
        case "Room3 CO2": text = "Room3co2"; break;

        case "Room4 Temp": text = "Room4temperature"; break;
        case "Room4 TempNN": text = "Room4temperatureNN"; break;
        case "Room4 Humi": text = "Room4humidity"; break;
        case "Room4 CO2": text = "Room4co2"; break;

        case "Room5 Temp": text = "Room5temperature"; break;
        case "Room5 Humi": text = "Room5humidity"; break;
        case "Room5 CO2": text = "Room5co2"; break;

        case "Corridor Temp": text = "Corridortemperature"; break;
        case "Corridor TempNN": text = "CorridortemperatureNN"; break;
        case "Corridor Humi": text = "Corridorhumidity"; break;
        case "Corridor CO2": text = "Corridorco2"; break;
        case "Corridor thermSP1": text = "Corridorthermostatssetpoint0"; break;
        case "Corridor thermSP2": text = "Corridorthermostatssetpoint1"; break;
        case "Corridor thermSP3": text = "Corridorthermostatssetpoint2"; break;
        case "Corridor thermMV1": text = "Corridorthermostatstemperature0"; break;
        case "Corridor thermMV2": text = "Corridorthermostatstemperature1"; break;
        case "Corridor thermMV3": text = "Corridorthermostatstemperature2"; break;
        case "OutTemp": text = "OutTemp"; break;
        case "WindSpeed": text = "WindSpeed"; break;
        case "DirectSunPowerVertical": text = "DirectSunPowerVertical"; break;
        case "DirectSunPower": text = "DirectSunPower"; break;
        case "DiffuseSunPower": text = "DiffuseSunPower"; break;
        case "Room1TempSim": text = "Room1TempSim"; break;

        default:
            text = "XXX";
    }
    return text;
}


function getDataFromFile(app, dataName, startTime) {
    let HistData = {
        Address: "",
        DataName: "",
        Time: [],
        Data: []
    }

    HistData.Address = app;
    HistData.DataName = dataName;

    try {
        //console.log("ind: ./data/" + app + "/" + datacv(dataName) + ".data");
        lineReader.eachLine("../data/" + app + "/" + datacv(dataName) + ".data", (line, last) => {
            var split = line.split(",");
            var linecount = 0;
            if (split[0] >= startTime) {
                HistData.Time.push(split[0]);
                HistData.Data.push(split[1]);
                //console.log(split[0] + "   ---   " + split[1] + " - " + HistData.Data.length);   
            }
            if (last) {
                wsss.send(JSON.stringify(HistData));
            }
            
        })
        //wsss.send(JSON.stringify(HistData));
    }
    catch (err) {
        console.log(err);
    }

    console.log("./data/" + app + "/" + datacv(dataName));
    return HistData;
}


const wss = new WebSocket.Server({ port: 8082 });

var wsss;
wss.on("connection", ws => {
    console.log("DB connected");

    wsss = ws;

    ws.on("message", data => {
        console.log('Data reciver: ' + data);
        const reciveData = JSON.parse(data);
        console.log(reciveData["Address"] + reciveData["DataName"] + "StatrTime" + reciveData["startTime"])
        hd = getDataFromFile(reciveData["Address"], reciveData["DataName"], reciveData["startTime"]);
        //ws.send(JSON.stringify(hd));
        //ws.send("fra server");
    });

    ws.on("close", () => {
        console.log("skjdhflsjkhf");
    });

});




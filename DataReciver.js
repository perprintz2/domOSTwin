function WetherDataExtractor(apartmentID,data) {
    if (apartmentID == '2495') {
        apartmentID = 'EnergyRoad1';
    }
    if (apartmentID == '2494') {
        apartmentID = 'EnergyRoad2';
    }
    if (apartmentID == '2496') {
        apartmentID = 'EnergyRoad3';
    }
    console.log("Wether: " + data.nearest.Temperature.value);
    var OutTemp = data.nearest.Temperature.value;
    var WindSpeed = data.nearest.WindSpeed.value;
    var DirectSunPower = data.nearest.DirectSunPower.value;
    var DiffuseSunPower = data.nearest.DiffuseSunPower.value;
    var DirectSunPowerVertical = data.nearest.DirectSunPowerVertical.value;
    //var epochMs = data.nearest.Temperature.epochMs;
    var epochMs = Date.now()
    setDepValueSt(apartmentID, "OutTemp", OutTemp, epochMs);
    setDepValueSt(apartmentID, "WindSpeed", WindSpeed, epochMs);
    setDepValueSt(apartmentID, "DirectSunPowerVertical", DirectSunPowerVertical, epochMs);   
}


function DataExtractor(apartmentID, data) {
    if (apartmentID == '2495') {
        apartmentID = 'EnergyRoad1';
    }
    if (apartmentID == '2494') {
        apartmentID = 'EnergyRoad2';
    }
    if (apartmentID == '2496') {
        apartmentID = 'EnergyRoad3';
    }
    console.log(apartmentID);

    if (data.hasOwnProperty("InletFlow")) {
        //console.log(apartmentID + " has InletFlow");

        setDepValueSt(apartmentID, "Inlet Flow", data.InletFlow, data.Time);
    }
    if (data.hasOwnProperty("InletTemperature")) {
        //console.log(apartmentID + " has InletTemperature");

        setDepValueSt(apartmentID, "Inlet Temperature", data.InletTemperature, data.Time);
    }
    if (data.hasOwnProperty("OutletTemperature")) {
        //console.log(apartmentID + " has OutletTemperature");

        setDepValueSt(apartmentID, "Outlet Temperature", data.OutletTemperature, data.Time);
    }
    if (data.hasOwnProperty("PowerConsumption")) {
        //console.log(apartmentID + " has PowerConsumption");

        setDepValueSt(apartmentID, "Power Consumption", data.PowerConsumption, data.Time);
    }
    else {

        if (data.hasOwnProperty("InletFlow") && data.hasOwnProperty("InletTemperature") && data.hasOwnProperty("OutletTemperature")) {
            setDepValueSt(apartmentID, "Power Consumption", data.InletFlow * (data.InletTemperature - data.OutletTemperature) * 4.1813 * 2.778, data.Time);
            
        }
    }

    if (data.hasOwnProperty("Rooms")) {
        if (apartmentID == 'EnergyRoad1') {
            chechForRoom13(apartmentID, data, 'Room1');
            chechForRoom13(apartmentID, data, 'Kitchen');
            chechForRoom13(apartmentID, data, 'BedRoom');
            var HasCor=  chechForRoom13(apartmentID, data, 'Corridor');
            chechForRoom13(apartmentID, data, 'Room2');
            chechForRoom13(apartmentID, data, 'Room4');

            if (HasCor) EnergyRoad1Room1Tempsim();
            //console.log(apartmentID + " Room1");

        }
        if (apartmentID == 'EnergyRoad2') {
            chechForRoom13(apartmentID, data, 'Kitchen');
            //chechForRoom13(apartmentID, data, 'Bathroom');
            chechForRoom13(apartmentID, data, 'Room');
        }
        if (apartmentID == 'EnergyRoad3') {
            chechForRoom13(apartmentID, data, 'Room1');
            chechForRoom13(apartmentID, data, 'Kitchen');
            chechForRoom13(apartmentID, data, 'Bathroom1');
            chechForRoom13(apartmentID, data, 'Bathroom2');
            chechForRoom13(apartmentID, data, 'Room2');
            chechForRoom13(apartmentID, data, 'Room3');
            chechForRoom13(apartmentID, data, 'Room4');
            chechForRoom13(apartmentID, data, 'Room5');
            chechForRoom13(apartmentID, data, 'Corridor');
        }
    }
}


function chechForRoom13(apartmentID, data, room) {
    //console.log(apartmentID + "-- "+ room);
let simOK= false;
    if (data["Rooms"].hasOwnProperty(room)) {
        console.log("has " + room);
        if (data["Rooms"][room].hasOwnProperty('temperature')) {
            console.log(room + " has temperature");

simOK= true;
            setDepValueSt(apartmentID, room + " Temp", data["Rooms"][room].temperature, data.Time, false);
        } else console.log(room + " has not temperature");

        if (data["Rooms"][room].hasOwnProperty('temperatureNN')) {
            console.log(room + " has temperatureNN");
            setDepValueSt(apartmentID, room + " TempNN", data["Rooms"][room].temperatureNN, data.Time, false);
        } else console.log(room + " has not temperatureNN");
        
        if (data["Rooms"][room].hasOwnProperty('humidity')) {
            console.log(room + " has humidity");
            setDepValueSt(apartmentID, room + " Humi", data["Rooms"][room].humidity, data.Time, false);
        } else console.log(room + " has not humidity");

        if (data["Rooms"][room].hasOwnProperty('thermostatsetpointExternal')) {
            console.log(room + " has thermostatsetpointExternal");
            setDepValueSt(apartmentID, room + " thermSP"+data["Rooms"][room].no+"Ext", data["Rooms"][room].thermostatsetpointExternal, data.Time, false);
        } else console.log(room + " has not thermostatexternal");

        if (data["Rooms"][room].hasOwnProperty('co2')) {
            console.log(room + " has co2");
            if (data["Rooms"][room].hasOwnProperty('estimated')) {
                if (data["Rooms"][room].estimated) {
                    //console.log(room + " co2 is estimated");
                    setDepValueSt(apartmentID, room + " CO2", data["Rooms"][room].co2, data.Time, true);
                }
                else {
                    //console.log(room + " co2 is not estimated");

                    setDepValueSt(apartmentID, room + " CO2", data["Rooms"][room].co2, data.Time, false);
                }
            }
            else {
                console.log(room + " co2 is not estimated");

                setDepValueSt(apartmentID, room + " CO2", data["Rooms"][room].co2, data.Time, false);
            }

        } else console.log(room + " has not co2");

        if (data["Rooms"][room].hasOwnProperty('thermostats')) {


            for (let x in data["Rooms"][room].thermostats) {

                if (x == 0) {
                    if (data["Rooms"][room].thermostats[x].hasOwnProperty('setpoint')) setDepValueSt(apartmentID, room + " thermSP1", data["Rooms"][room].thermostats[x].setpoint, data.Time, false);
                    if (data["Rooms"][room].thermostats[x].hasOwnProperty('temperature')) setDepValueSt(apartmentID, room + " thermMV1", data["Rooms"][room].thermostats[x].temperature, data.Time, false);

                }
                if (x == 1) {
                    if (data["Rooms"][room].thermostats[x].hasOwnProperty('setpoint')) setDepValueSt(apartmentID, room + " thermSP2", data["Rooms"][room].thermostats[x].setpoint, data.Time, false);
                    if (data["Rooms"][room].thermostats[x].hasOwnProperty('temperature')) setDepValueSt(apartmentID, room + " thermMV2", data["Rooms"][room].thermostats[x].temperature, data.Time), false;

                }
                if (x == 2) {
                    if (data["Rooms"][room].thermostats[x].hasOwnProperty('setpoint')) setDepValueSt(apartmentID, room + " thermSP3", data["Rooms"][room].thermostats[x].setpoint, data.Time, false);
                    if (data["Rooms"][room].thermostats[x].hasOwnProperty('temperature')) setDepValueSt(apartmentID, room + " thermMV3", data["Rooms"][room].thermostats[x].temperature, data.Time, false);

                }
            }

        } else console.log(room + " has not thermostats");

        return simOK;
    } else {
        console.log(apartmentID + " has not " + room);
        return false;
    }
}



function chechForRoom(apartmentID, data, room) {

    if (data["Rooms"].hasOwnProperty(room)) {
        //console.log("has " + room);
        if (data["Rooms"][room].hasOwnProperty('temperature')) {
            //console.log(room + " has temperature");
            setDepValueSt(apartmentID, room + " Temp", data["Rooms"][room].temperature, data.Time, false);
        } else console.log(room + " has not temperature");

        if (data["Rooms"][room].hasOwnProperty('humidity')) {
            //console.log(room + " has humidity");
            setDepValueSt(apartmentID, room + " Humi", data["Rooms"][room].humidity, data.Time, false);
        } else console.log(room + " has not humidity");
        if (data["Rooms"][room].hasOwnProperty('co2')) {
            //console.log(room + " has co2");
            setDepValueSt(apartmentID, room + " CO2", data["Rooms"][room].co2, data.Time, false);
        } else console.log(room + " has not co2");
        if (data["Rooms"][room].hasOwnProperty('temperatureSetPoint')) {
            //console.log(room + " has thermostatOpen");
            setDepValueSt(apartmentID, room + " rad1", data["Rooms"][room].temperatureSetPoint, data.Time, false);
            //console.log("rad" + i + ": " + data["Rooms"][room].thermostatOpen[i - 1])

        } else console.log(room + " has not temperatureSetPoint");
    } else console.log(apartmentID + " has not " + room);
}

var wss;

async function getDatafromDB(app, elm, startTime) {
    let pro = new Promise(function (resolve) {
        const HData = {
            "Address": "",
            "DataName": "",
            "startTime": 0,
            "Time": [],
            "Data": []
        }

        const Rdata = {
            "time": [],
            "data": [],
            "esti": []
        }
        let ready = false;
        HData["Address"] = app;
        HData["DataName"] = elm;
        HData["startTime"] = startTime;

        const ws2 = new WebSocket("ws://"+IPadd+":8082");

        ws2.addEventListener("open", () => {
            console.log("connect 1: " + HData["Address"] + " : " + HData["DataName"] + " : " + HData["startTime"]);
            ws2.send(JSON.stringify(HData));
        });

        ws2.addEventListener("message", ({ data }) => {
            //console.log(data);
            if (data[0] == '{') {

                //console.log("JSON parser data: " + data);
                try {
                    const reciveData = JSON.parse(data);

                    console.log("JSON parser: " + reciveData.Address + " : " + reciveData.Data[0]);
                    for (let i = 0; i < reciveData.Data.length; i++) {
                        Rdata.time.push(reciveData.Time[i]);
                        Rdata.data.push(reciveData.Data[i]);
                        Rdata.esti.push(false);
                    }

                    ready = true;
                    //DataExtractor(reciveData.Address, reciveData);
                    //drawAni();
                    resolve(Rdata);
                } catch (ee) {
                    console.log("JSON parser error: " + ee);

                }
            }
            ws2.close();
        });
        //while (!ready) {}

    });
    return await pro;
}

let simolate = true;

function jsonHandler() {

    const ws = new WebSocket("ws://"+IPadd+":8081");

    ws.addEventListener("open", () => {
        console.log("connect 2");
    });

    ws.addEventListener("message", ({ data }) => {
        //console.log(data);
        if (data[0] == '{') {

            console.log(data);
            try {
                const reciveData = JSON.parse(data);
                if (reciveData.hasOwnProperty("LocationId")) {
                    console.log("house data");
                    DataExtractor(reciveData.LocationId, reciveData);
                    drawAni();
                    updataGraph();
                }
                if (reciveData.hasOwnProperty("values")) {
                    console.log("Wether data");

                    WetherDataExtractor(reciveData.apartmentID,reciveData);
                    drawAni();
                    updataGraph();
                }

            } catch (ee) {
                console.log("JSON parser error: " + ee);
            }
        }
    })

}


function EnergyRoad1Room1Tempsim() {
    if (simolate) {
        let t1 = getDepValueSt('EnergyRoad1', "Room1 Temp");
        let t2 = getDepValueSt('EnergyRoad1', "Room2 Temp");
        let t4 = getDepValueSt('EnergyRoad1', "Room4 Temp");
        let tKitchen = getDepValueSt('EnergyRoad1', "Kitchen Temp");;
        let tCorridor = getDepValueSt('EnergyRoad1', "Corridor Temp");
        let fInlet = getDepValueSt('EnergyRoad1', "Inlet Flow");

        let tInlet = getDepValueSt('EnergyRoad1', "Inlet Temperature");
        let tOutlet = getDepValueSt('EnergyRoad1', "Outlet Temperature");
        let outTemp = getDepValueSt('EnergyRoad1', "OutTemp");
        let outRad = getDepValueSt('EnergyRoad1', "DirectSunPowerVertical");

        var url = `http://${IPadd}:8085/EnergyRoad1Sim?t1=${t1}&t2=${t2}&t4=${t4}&tKitchen=${tKitchen}&tCorridor=${tCorridor}&tInlet=${tInlet}&tOutlet=${tOutlet}&fInlet=${fInlet}&outTemp=${outTemp}&outRad=${outRad}`;

        var request = new XMLHttpRequest();
        request.open('GET', url);

        request.send();
        request.onload = () => {
            console.log(a = JSON.parse(request.response));
            var epochMs = Date.now()
            console.log("Number: " + Number(a[0]));

            setDepValueSt('EnergyRoad1', "Room1 TempSim", Number(a[0])-273.15 , epochMs, false);
            drawAni();
            updataGraph();
        }
    }
}






function simTst() {
    if (simolate) {
        let t1 = getDepValueSt('EnergyRoad1', "Room1 Temp");
        let t2 = getDepValueSt('EnergyRoad1', "Room2 Temp");
        let t4 = getDepValueSt('EnergyRoad1', "Room4 Temp");
        let tKitchen = getDepValueSt('EnergyRoad1', "Kitchen Temp");;
        let tCorridor = getDepValueSt('EnergyRoad1', "Corridor Temp");
        let fInlet = getDepValueSt('EnergyRoad1', "Inlet Flow");

        let tInlet = getDepValueSt('EnergyRoad1', "Inlet Temperature");
        let tOutlet = getDepValueSt('EnergyRoad1', "Outlet Temperature");
        let outTemp = getDepValueSt('EnergyRoad1', "OutTemp");
        let outRad = getDepValueSt('EnergyRoad1', "DirectSunPowerVertical");

        var url = `http://${IPadd}:8085/EnergyRoad1Sim?t1=${t1}&t2=${t2}&t4=${t4}&tKitchen=${tKitchen}&tCorridor=${tCorridor}&tInlet=${tInlet}&tOutlet=${tOutlet}&fInlet=${fInlet}&outTemp=${outTemp}&outRad=${outRad}`;

        var request = new XMLHttpRequest();
        request.open('GET', url);

        request.send();
        request.onload = () => {
            console.log(a = JSON.parse(request.response));
            console.log(Number(a[0]["Ti"]) / 5);
            console.log(Number(a[1]["Ti"]) / 5);
        }
    }
}
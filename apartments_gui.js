
function gen_data_R13(id) {}
function gen_data_R63A(id) {}
function gen_data_R77(id) {}

let widgetsR13 = [];
let widgetsR63A = [];
let widgetsR77 = [];
let widgetsSim = [];


function init_Sim(id) {
    //arp = apartmentList.get('EnergyRoad1');
    //addDepDataSt('EnergyRoad1');

    let size = 240;
    
    /*widgetsSim.push(new Thermo('EnergyRoad1', "Room1 Temp",           73,      130,     size, DynColor, 15, 30));
    widgetsSim.push(new NumDisplay('EnergyRoad1',"Room1 Temp",        73 + 60, 130,      42, -10, 40));
    widgetsSim.push(new Thermo('EnergyRoad1', "Room1TempSim",        223,      130,     size, DynColor, 15, 30));
    widgetsSim.push(new NumDisplay('EnergyRoad1',"Room1TempSim",     223 + 60, 130,      42, -10, 40));
    widgetsSim.push(new Thermo('EnergyRoad1', "Room1 TempNN",        373,      130,     size, DynColor, 15, 30));
    widgetsSim.push(new NumDisplay('EnergyRoad1',"Room1 TempNN",     373 + 60, 130,      42, -10, 40));
    */
}


function draw_Sim(ctx, id) {

    //ctx = ctx;

    var imageObj = new Image();
    //var imageMix = new Image();
    arp = apartmentList.get('EnergyRoad1');
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 900, 600);
        //ctx.drawImage(imageObj, 0, 0, 1300, 700);
        //ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id, 15, 27);
        ctx.font = "bold " + 11 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Room1 Temperature", 70,    123,);
        ctx.fillText("Simulated Temperature", 220,    123,);
        ctx.fillText("NeuralNet Temperature", 370,    123,);
        ctx.stroke();

        let wLen = widgetsSim.length;
        for (let i = 0; i < wLen; i++) {
            widgetsSim[i].draw(ctx);
        }
        ani_draw_Sim(id);
    };
    imageObj.src = './images/EnergyRoad1.png';
}


function draw_logo(ctx, id) {

    //ctx = ctx;

    var imageObjNeogrid = new Image();
    var imageObjAau = new Image();
    //var imageMix = new Image();
    //arp = apartmentList.get('EnergyRoad1');
    imageObjNeogrid.onload = function () {
        //ctx.clearRect(0, 0, 900, 600);
        ctx.drawImage(imageObjNeogrid, 730, 400, 100, 100);
    };
    imageObjAau.onload = function () {
        //ctx.clearRect(0, 0, 900, 600);
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        //ctx.fillText(id, 15, 27);
        //ctx.font = "bold " + 11 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("- Click on the individual meter in the top right window", 70,    123,);
        ctx.fillText("to display the graph in the window below.", 85,    153,);
        ctx.fillText("- Click on the houses in the top left window", 70,    223,);
        ctx.fillText("to select the individual house.", 85,    253,);
        ctx.stroke();
        ctx.drawImage(imageObjAau, 690, 520, 200, 50);
    };
    imageObjNeogrid.src = './images/Neogrid-Logo-16d18128.png';
    imageObjAau.src = './images/__AAU_LEFT_RGB_UK.png';
}


function ani_draw_Sim(id) {
    let wLen = widgetsSim.length;
    for (let i = 0; i < wLen; i++) {
        widgetsSim[i].Update();
    }
}


function init_apartment_data_R13(id) {
    arp = apartmentList.get(id);
    addDepDataSt(id);

    let size = 140;
    widgetsR13.push(new TempHumiCo2(id, "Kitchen",   70, 110, size));
    widgetsR13.push(new TempHumiCo2(id, "Room4",    375, 190, size));
    widgetsR13.push(new TempHumiCo2(id, "Corridor", 650,  40, size));
    widgetsR13.push(new TempHumiCo2(id, "Room2",    855, 190, size));
    widgetsR13.push(new TempHumiCo2(id, "Room1",   1025, 210, size));
   widgetsR13.push(new Thermo(id, "Room1TempSim",               1173,      230,     140, DynColor, 15, 30));
    widgetsR13.push(new NumDisplay(id,"Room1TempSim",            1173 + 50, 230,      42, -10, 40));
   /* widgetsR13.push(new Thermo(id, "Room1 TempNN",               1173,      530,     140, DynColor, 15, 30));
    widgetsR13.push(new NumDisplay(id,"Room1 TempNN",            1173 + 50, 530,      42, -10, 40));
*/

    size = 90;
    widgetsR13.push(new Termos(id, "Kitchen thermSP1",  "Kitchen thermMV1",  "Kitchen thermSP1Ext",  150, 445, size, 15, 30, DynColor, "kitchen 1"));
    widgetsR13.push(new Termos(id, "Kitchen thermSP2",  "Kitchen thermMV2",  "Kitchen thermSP2Ext",  200, 355, size, 15, 30, DynColor, "kitchen 2"));
    widgetsR13.push(new Termos(id, "Room4 thermSP1",    "Room4 thermMV1",    "Room4 thermSP1Ext",    445, 445, size, 15, 30, DynColor, "Room 4"));
    widgetsR13.push(new Termos(id, "Corridor thermSP1", "Corridor thermMV1", "Corridor thermSP1Ext", 595, 445, size, 15, 30, DynColor, "Corridor 1"));
    widgetsR13.push(new Termos(id, "Room2 thermSP1",    "Room2 thermMV1",    "Room2 thermSP1Ext",    905, 445, size, 15, 30, DynColor, "Room 2"));
    widgetsR13.push(new Termos(id, "Room1 thermSP1",    "Room1 thermMV1",    "Room1 thermSP1Ext",   1225, 175, size, 15, 30, DynColor, "Room 1.1"));
    widgetsR13.push(new Termos(id, "Room1 thermSP2",    "Room1 thermMV2",    "Room1 thermSP2Ext",    925, 136, size, 15, 30, DynColor, "Room 1.2"));
    widgetsR13.push(new Termos(id, "Corridor thermSP2", "Corridor thermMV2", "Corridor thermSP2Ext", 455, 136, size, 15, 30, DynColor, "Corridor 2"));

    size = 170;
    widgetsR13.push(new Gauge(id, "Inlet Flow",         110, 630, size,  0, 0.5, DynColorStd, 'Inlet Flow', 'L/sec', 2));
    widgetsR13.push(new Gauge(id, "Inlet Temperature",  290, 630, size, 20, 100, DynColorStd, 'Inlet Temperature', 'grC', 1));
    widgetsR13.push(new Gauge(id, "Outlet Temperature", 660, 630, size, 20, 100, DynColorStd, 'Outlet Temperature', 'grC', 1));
    widgetsR13.push(new Gauge(id, "Power Consumption",  850, 630, size,  0,  20, DynColorStd, 'Power Consumption', 'kW', 1));

    widgetsR13.push(new Thermo(id, "OutTemp",               1320,      150,     240, DynColorStd, -5, 30));
    widgetsR13.push(new NumDisplay(id,"OutTemp",            1320 + 50, 150,      42, -10, 40));
    widgetsR13.push(new Gauge(id, "WindSpeed",              1320+98,   150+93,  100, 0, 30, DynColorStd, 'WindSpeed', 'm/s', 1));
    widgetsR13.push(new Gauge(id, "DirectSunPowerVertical", 1320+98,   150+170, 100,  0,  1, DynColorStd, 'Direct Sun Radiation', 'kW/m2', 2));
}

function draw_apartment_gui_R13(ctx, id) {

    //ctx = ctx;

    var imageObj = new Image();
    //var imageMix = new Image();
    arp = apartmentList.get(id);
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 1500, 700);
        ctx.drawImage(imageObj, 0, 0, 1300, 700);
        ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id+": -- Real data --", 15, 27);
        ctx.font = "bold " + 9 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Simulated Temperature", 1170,    223,);
        ctx.fillText("NeuralNet Temperature", 1170,    523,);
        ctx.fillText("Outside Temperature", 1320,    143,);
        ctx.stroke();
        let wLen = widgetsR13.length;
        for (let i = 0; i < wLen; i++) {
            widgetsR13[i].draw(ctx);
        }
        ani_draw_R13(id);
    };
    imageObj.src = './images/EnergyRoad1.png';
}

function ani_draw_R13(id) {
    let wLen = widgetsR13.length;
    for (let i = 0; i < wLen; i++) {
        widgetsR13[i].Update();
    }
}


function init_apartment_data_R63A(id) {
    arp = apartmentList.get(id);
    addDepDataSt(id)

    let size = 140;
    widgetsR63A.push(new TempHumiCo2(id, "Kitchen", 300, 120, size));
    widgetsR63A.push(new TempHumiCo2(id, "Room",    730, 120, size));
   
    size = 90;
    widgetsR63A.push(new Termos(id, "Kitchen thermSP3", "Kitchen thermMV3", "Kitchen thermSP3Ext", 130, 225, size, 15, 30, DynColor, "Living room 3"));
    widgetsR63A.push(new Termos(id, "Kitchen thermSP2", "Kitchen thermMV2", "Kitchen thermSP2Ext", 220, 410, size, 15, 30, DynColor, "Living room 2"));
    widgetsR63A.push(new Termos(id, "Kitchen thermSP1", "Kitchen thermMV1", "Kitchen thermSP1Ext", 500, 410, size, 15, 30, DynColor, "Living room 1"));

    widgetsR63A.push(new Termos(id, "Room thermSP1", "Room thermMV1", "Room thermSP1Ext", 800, 410, size, 15, 30, DynColor, "Room"));
    
    size = 170;
    widgetsR63A.push(new Gauge(id, "Inlet Flow",         110, 630, size,  0, 0.5, DynColorStd, 'Inlet Flow', 'L/sec', 2));
    widgetsR63A.push(new Gauge(id, "Inlet Temperature",  290, 630, size, 20, 100, DynColorStd, 'Inlet Temperature', 'grC', 1));
    widgetsR63A.push(new Gauge(id, "Outlet Temperature", 700, 630, size, 20, 100, DynColorStd, 'Outlet Temperature', 'grC', 1));
    widgetsR63A.push(new Gauge(id, "Power Consumption",  880, 630, size,  0,  20, DynColorStd, 'Power Consumption', 'kW', 1));  

    widgetsR63A.push(new Thermo(id, "OutTemp",                1000,      150,     240, DynColorStd, -5, 30));
    widgetsR63A.push(new NumDisplay(id,"OutTemp",             1000 + 50, 150,      42, -10,40));
    widgetsR63A.push(new Gauge(id, "WindSpeed",               1000+98,   150+93,  100, 0, 30, DynColorStd, 'WindSpeed', 'm/s', 1));
    widgetsR63A.push(new Gauge(id, "DirectSunPowerVertical",  1000+98,   150+170, 100,  0,  1, DynColorStd, 'Direct Sun Radiation', 'kW/m2', 2));
}


function draw_apartment_gui_R63A(ctx, id) {

    ctx = ctx;
    var imageObj = new Image();
    arp = apartmentList.get(id);
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 1500, 700);

        ctx.drawImage(imageObj, 0, 0, 1000, 700);
        ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id+": -- Real data --", 15, 27);
        ctx.font = "bold " + 9 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Outside Temperature", 1000,    143,);
        ctx.stroke();
        let wLen = widgetsR63A.length;
        for (let i = 0; i < wLen; i++) {
            widgetsR63A[i].draw(ctx);
        }
        ani_draw_R63A(id);
    };
    let data = 3;
    imageObj.src = './images/EnergyRoad2.png';
}


function ani_draw_R63A(id) {
    let wLen = widgetsR63A.length;
    for (let i = 0; i < wLen; i++) {
        widgetsR63A[i].Update();
    }
}


function init_apartment_data_R77(id) {
    arp = apartmentList.get(id);
    addDepDataSt(id)

    let size = 140;
    widgetsR77.push(new TempHumiCo2(id, "Room3",     62, 210, size));
    widgetsR77.push(new TempHumiCo2(id, "Room2",    370, 160, size));
    widgetsR77.push(new TempHumiCo2(id, "Room1",    545, 160, size));
    widgetsR77.push(new TempHumiCo2(id, "Kitchen", 1065, 160, size));
    widgetsR77.push(new TempHumiCo2(id, "Room4",   1295, 235, size));
    widgetsR77.push(new TempHumiCo2(id, "Room5",   1250,  30, size));

    size = 90;
    widgetsR77.push(new Termos(id, "Kitchen thermSP1",  "Kitchen thermMV1",  "Kitchen thermSP1Ext", 1150, 410, size, 15, 30, DynColor, "kitchen 1"));
    widgetsR77.push(new Termos(id, "Kitchen thermSP2", "Kitchen thermMV2",  "Kitchen thermSP2Ext", 1000, 135, size, 15, 30, DynColor, "kitchen 2"));
    widgetsR77.push(new Termos(id, "Room1 thermSP1",    "Room1 thermMV1",    "Room1 thermSP1Ext",    720, 410, size, 15, 30, DynColor, "Room 1"));
    widgetsR77.push(new Termos(id, "Corridor thermSP1", "Corridor thermMV1", "Corridor thermSP1Ext", 320, 135, size, 15, 30, DynColor, "Corridor 1"));
    widgetsR77.push(new Termos(id, "Corridor thermSP2", "Corridor thermMV2", "Corridor thermSP2Ext", 500, 135, size, 15, 30, DynColor, "Corridor 2"));
    //widgetsR77.push(new Termos(id, "Corridor thermSP3", "Corridor thermMV3", "Corridor thermSP3Ext", 680, 135, size, 15, 30, DynColor, "Corridor 3"));

    size = 170;
    widgetsR77.push(new Gauge(id, "Inlet Flow",         250, 630, size,  0, 0.5, DynColorStd, 'Inlet Flow', 'L/sec', 2));
    widgetsR77.push(new Gauge(id, "Inlet Temperature",  450, 630, size, 20, 100, DynColorStd, 'Inlet Temperature', 'grC', 1));
    widgetsR77.push(new Gauge(id, "Outlet Temperature", 900, 630, size, 20, 100, DynColorStd, 'Outlet Temperature', 'grC', 1));
    widgetsR77.push(new Gauge(id, "Power Consumption", 1100, 630, size, 0,  20, DynColorStd, 'Power Consumption', 'kW', 1));

    widgetsR77.push(new Thermo(id, "OutTemp",                1300,    485,     200, DynColorStd, -5, 30));
    widgetsR77.push(new NumDisplay(id,"OutTemp",             1300+50, 485,      42, -10,40));
    widgetsR77.push(new Gauge(id, "WindSpeed",               1300+98, 485+93,  100, 0, 30, DynColorStd, 'WindSpeed', 'm/s', 1));
    widgetsR77.push(new Gauge(id, "DirectSunPowerVertical",  1300+98, 485+170, 100, 0,  1, DynColorStd, 'Direct Sun Radiation', 'kW/m2', 2));
}

function draw_apartment_gui_R77(ctx, id) {

    ctx = ctx;

    var imageObj = new Image();
    arp = apartmentList.get(id);
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 1500, 700);
        ctx.drawImage(imageObj, 0, 0, 1500, 700);
        ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id+": -- Real data --", 15, 27);
        ctx.font = "bold " + 9 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Outside Temperature", 1300,    478,);
        ctx.stroke();
        let wLen = widgetsR77.length;
        for (let i = 0; i < wLen; i++) {
            widgetsR77[i].draw(ctx);
        }
        ani_draw_R77(id);
    };
    imageObj.src = './images/EnergyRoad3.png';
}

function ani_draw_R77(id) {
    let wLen = widgetsR77.length;
    for (let i = 0; i < wLen; i++) {
        widgetsR77[i].Update();
    }
}

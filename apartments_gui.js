
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
        ctx.clearRect(0, 0, 900*scale, 600*scale);
        //ctx.drawImage(imageObj, 0, 0, 1300, 700);
        //ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id, 15*scale, 27*scale);
        ctx.font = "bold " + 11 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Room1 Temperature", 70*scale,    123*scale,);
        ctx.fillText("Simulated Temperature", 220*scale,    123*scale,);
        ctx.fillText("NeuralNet Temperature", 370*scale,    123*scale,);
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
        ctx.drawImage(imageObjNeogrid, 730*scale, 400*scale, 100*scale, 100*scale);
    };
    imageObjAau.onload = function () {
        //ctx.clearRect(0, 0, 900, 600);
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        //ctx.fillText(id, 15, 27);
        //ctx.font = "bold " + 11 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("- Click on the individual meter in the top right window", 70*scale,    123*scale,);
        ctx.fillText("to display the graph in the window below.", 85*scale,    153*scale,);
        ctx.fillText("- Click on the houses in the top left window", 70*scale,    223*scale,);
        ctx.fillText("to select the individual house.", 85*scale,    253*scale,);
        ctx.stroke();
        ctx.drawImage(imageObjAau, 690*scale, 520*scale, 200*scale, 50*scale);
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

    let size = 140*scale;
    widgetsR13.push(new TempHumiCo2(id, "Kitchen",   70*scale, 110*scale, size));
    widgetsR13.push(new TempHumiCo2(id, "Room4",    375*scale, 190*scale, size));
    widgetsR13.push(new TempHumiCo2(id, "Corridor", 650*scale,  40*scale, size));
    widgetsR13.push(new TempHumiCo2(id, "Room2",    855*scale, 190*scale, size));
    widgetsR13.push(new TempHumiCo2(id, "Room1",   1025*scale, 210*scale, size));
   widgetsR13.push(new Thermo(id, "Room1 TempSim",               1173*scale,      230*scale,     140*scale, DynColor, 15, 30));
    widgetsR13.push(new NumDisplay(id,"Room1 TempSim",            (1173 + 50)*scale, 230*scale,      42*scale, -10, 40));
   /* widgetsR13.push(new Thermo(id, "Room1 TempNN",               1173,      530,     140, DynColor, 15, 30));
    widgetsR13.push(new NumDisplay(id,"Room1 TempNN",            1173 + 50, 530,      42, -10, 40));
*/

    size = 90*scale;
    widgetsR13.push(new Termos(id, "Kitchen thermSP1",  "Kitchen thermMV1",  "Kitchen thermSP1Ext",  150*scale, 445*scale, size, 15, 30, DynColor, "kitchen 1"));
    widgetsR13.push(new Termos(id, "Kitchen thermSP2",  "Kitchen thermMV2",  "Kitchen thermSP2Ext",  200*scale, 355*scale, size, 15, 30, DynColor, "kitchen 2"));
    widgetsR13.push(new Termos(id, "Room4 thermSP1",    "Room4 thermMV1",    "Room4 thermSP1Ext",    445*scale, 445*scale, size, 15, 30, DynColor, "Room 4"));
    widgetsR13.push(new Termos(id, "Corridor thermSP1", "Corridor thermMV1", "Corridor thermSP1Ext", 595*scale, 445*scale, size, 15, 30, DynColor, "Corridor 1"));
    widgetsR13.push(new Termos(id, "Room2 thermSP1",    "Room2 thermMV1",    "Room2 thermSP1Ext",    905*scale, 445*scale, size, 15, 30, DynColor, "Room 2"));
    widgetsR13.push(new Termos(id, "Room1 thermSP1",    "Room1 thermMV1",    "Room1 thermSP1Ext",   1225*scale, 175*scale, size, 15, 30, DynColor, "Room 1.1"));
    widgetsR13.push(new Termos(id, "Room1 thermSP2",    "Room1 thermMV2",    "Room1 thermSP2Ext",    925*scale, 136*scale, size, 15, 30, DynColor, "Room 1.2"));
    widgetsR13.push(new Termos(id, "Corridor thermSP2", "Corridor thermMV2", "Corridor thermSP2Ext", 455*scale, 136*scale, size, 15, 30, DynColor, "Corridor 2"));

    size = 170*scale;
    widgetsR13.push(new Gauge(id, "Inlet Flow",         110*scale, 630*scale, size,  0, 0.5, DynColorStd, 'Inlet Flow', 'L/sec', 2));
    widgetsR13.push(new Gauge(id, "Inlet Temperature",  290*scale, 630*scale, size, 20, 100, DynColorStd, 'Inlet Temperature', 'grC', 1));
    widgetsR13.push(new Gauge(id, "Outlet Temperature", 660*scale, 630*scale, size, 20, 100, DynColorStd, 'Outlet Temperature', 'grC', 1));
    widgetsR13.push(new Gauge(id, "Power Consumption",  850*scale, 630*scale, size,  0,  20, DynColorStd, 'Power Consumption', 'kW', 1));

    widgetsR13.push(new Thermo(id, "OutTemp",               1320*scale,      150*scale,     240*scale, DynColorStd, -5, 30));
    widgetsR13.push(new NumDisplay(id,"OutTemp",            (1320 + 50)*scale, 150*scale,      42*scale, -10, 40));
    widgetsR13.push(new Gauge(id, "WindSpeed",              (1320+98)*scale,   (150+93)*scale,  100*scale, 0, 30, DynColorStd, 'WindSpeed', 'm/s', 1));
    widgetsR13.push(new Gauge(id, "DirectSunPowerVertical", (1320+98)*scale,   (150+170)*scale, 100*scale,  0,  1, DynColorStd, 'Direct Sun Radiation', 'kW/m2', 2));
}

function draw_apartment_gui_R13(ctx, id) {

    //ctx = ctx;

    var imageObj = new Image();
    //var imageMix = new Image();
    arp = apartmentList.get(id);
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 1500*scale, 700*scale);
        ctx.drawImage(imageObj, 0, 0, 1300*scale, 700*scale);
        ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id+": -- Real data --", 15, 27);
        ctx.font = "bold " + 9 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Simulated Temperature", 1170*scale,    223*scale,);
        ctx.fillText("NeuralNet Temperature", 1170*scale,    523*scale,);
        ctx.fillText("Outside Temperature", 1320*scale,    143*scale,);
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

    let size = 140*scale;
    widgetsR63A.push(new TempHumiCo2(id, "Kitchen", 300*scale, 120*scale, size));
    widgetsR63A.push(new TempHumiCo2(id, "Room",    730*scale, 120*scale, size));
   
    size = 90*scale;
    widgetsR63A.push(new Termos(id, "Kitchen thermSP3", "Kitchen thermMV3", "Kitchen thermSP3Ext", 130*scale, 225*scale, size, 15, 30, DynColor, "Living room 3"));
    widgetsR63A.push(new Termos(id, "Kitchen thermSP2", "Kitchen thermMV2", "Kitchen thermSP2Ext", 220*scale, 410*scale, size, 15, 30, DynColor, "Living room 2"));
    widgetsR63A.push(new Termos(id, "Kitchen thermSP1", "Kitchen thermMV1", "Kitchen thermSP1Ext", 500*scale, 410*scale, size, 15, 30, DynColor, "Living room 1"));

    widgetsR63A.push(new Termos(id, "Room thermSP1", "Room thermMV1", "Room thermSP1Ext", 800*scale, 410*scale, size, 15, 30, DynColor, "Room"));
    
    size = 170*scale;
    widgetsR63A.push(new Gauge(id, "Inlet Flow",         110*scale, 630*scale, size,  0, 0.5, DynColorStd, 'Inlet Flow', 'L/sec', 2));
    widgetsR63A.push(new Gauge(id, "Inlet Temperature",  290*scale, 630*scale, size, 20, 100, DynColorStd, 'Inlet Temperature', 'grC', 1));
    widgetsR63A.push(new Gauge(id, "Outlet Temperature", 700*scale, 630*scale, size, 20, 100, DynColorStd, 'Outlet Temperature', 'grC', 1));
    widgetsR63A.push(new Gauge(id, "Power Consumption",  880*scale, 630*scale, size,  0,  20, DynColorStd, 'Power Consumption', 'kW', 1));  

    widgetsR63A.push(new Thermo(id, "OutTemp",                1000*scale,      150*scale,     240*scale, DynColorStd, -5, 30));
    widgetsR63A.push(new NumDisplay(id,"OutTemp",             (1000 + 50)*scale, 150*scale,      42*scale, -10,40));
    widgetsR63A.push(new Gauge(id, "WindSpeed",               (1000+98)*scale,   (150+93)*scale,  100*scale, 0, 30, DynColorStd, 'WindSpeed', 'm/s', 1));
    widgetsR63A.push(new Gauge(id, "DirectSunPowerVertical",  (1000+98)*scale,   (150+170)*scale, 100*scale,  0,  1, DynColorStd, 'Direct Sun Radiation', 'kW/m2', 2));
}


function draw_apartment_gui_R63A(ctx, id) {

    ctx = ctx;
    var imageObj = new Image();
    arp = apartmentList.get(id);
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 1500*scale, 700*scale);

        ctx.drawImage(imageObj, 0, 0, 1000*scale, 700*scale);
        ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id+": -- Real data --", 15*scale, 27*scale);
        ctx.font = "bold " + 9 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Outside Temperature", 1000*scale,    143*scale,);
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

    let size = 140*scale;
    widgetsR77.push(new TempHumiCo2(id, "Room3",     62*scale, 210*scale, size));
    widgetsR77.push(new TempHumiCo2(id, "Room2",    370*scale, 160*scale, size));
    widgetsR77.push(new TempHumiCo2(id, "Room1",    545*scale, 160*scale, size));
    widgetsR77.push(new TempHumiCo2(id, "Kitchen", 1065*scale, 160*scale, size));
    widgetsR77.push(new TempHumiCo2(id, "Room4",   1295*scale, 235*scale, size));
    widgetsR77.push(new TempHumiCo2(id, "Room5",   1250*scale,  30*scale, size));

    size = 90*scale;
    widgetsR77.push(new Termos(id, "Kitchen thermSP1",  "Kitchen thermMV1",  "Kitchen thermSP1Ext", 1150*scale, 410*scale, size, 15, 30, DynColor, "kitchen 1"));
    widgetsR77.push(new Termos(id, "Kitchen thermSP2", "Kitchen thermMV2",  "Kitchen thermSP2Ext", 1000*scale, 135*scale, size, 15, 30, DynColor, "kitchen 2"));
    widgetsR77.push(new Termos(id, "Room1 thermSP1",    "Room1 thermMV1",    "Room1 thermSP1Ext",    720*scale, 410*scale, size, 15, 30, DynColor, "Room 1"));
    widgetsR77.push(new Termos(id, "Corridor thermSP1", "Corridor thermMV1", "Corridor thermSP1Ext", 320*scale, 135*scale, size, 15, 30, DynColor, "Corridor 1"));
    widgetsR77.push(new Termos(id, "Corridor thermSP2", "Corridor thermMV2", "Corridor thermSP2Ext", 500*scale, 135*scale, size, 15, 30, DynColor, "Corridor 2"));
    //widgetsR77.push(new Termos(id, "Corridor thermSP3", "Corridor thermMV3", "Corridor thermSP3Ext", 680, 135, size, 15, 30, DynColor, "Corridor 3"));

    size = 170*scale;
    widgetsR77.push(new Gauge(id, "Inlet Flow",         250*scale, 630*scale, size,  0, 0.5, DynColorStd, 'Inlet Flow', 'L/sec', 2));
    widgetsR77.push(new Gauge(id, "Inlet Temperature",  450*scale, 630*scale, size, 20, 100, DynColorStd, 'Inlet Temperature', 'grC', 1));
    widgetsR77.push(new Gauge(id, "Outlet Temperature", 900*scale, 630*scale, size, 20, 100, DynColorStd, 'Outlet Temperature', 'grC', 1));
    widgetsR77.push(new Gauge(id, "Power Consumption", 1100*scale, 630*scale, size, 0,  20, DynColorStd, 'Power Consumption', 'kW', 1));

    widgetsR77.push(new Thermo(id, "OutTemp",                1300*scale,    485*scale,     200*scale, DynColorStd, -5, 30));
    widgetsR77.push(new NumDisplay(id,"OutTemp",             (1300+50)*scale, 485*scale,      42*scale, -10,40));
    widgetsR77.push(new Gauge(id, "WindSpeed",               (1300+98)*scale, (485+93)*scale,  100*scale, 0, 30, DynColorStd, 'WindSpeed', 'm/s', 1));
    widgetsR77.push(new Gauge(id, "DirectSunPowerVertical",  (1300+98)*scale, (485+170)*scale, 100*scale, 0,  1, DynColorStd, 'Direct Sun Radiation', 'kW/m2', 2));
}

function draw_apartment_gui_R77(ctx, id) {

    ctx = ctx;

    var imageObj = new Image();
    arp = apartmentList.get(id);
    imageObj.onload = function () {
        ctx.clearRect(0, 0, 1500*scale, 700*scale);
        ctx.drawImage(imageObj, 0, 0, 1500*scale, 700*scale);
        ctx.stroke();
        ctx.font = "24.5px Times New Roman";
        ctx.fillStyle = "#000000";
        ctx.fillText(id+": -- Real data --", 15*scale, 27*scale);
        ctx.font = "bold " + 9 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Outside Temperature", 1300*scale,    478*scale,);
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

var chart;

let plotColor = ['rgb( 255,  0,   0)',
    'rgb(  0, 200,   0)',
    'rgb(  0,   0, 255)',
    'rgb(210, 210,  0)',
    'rgb(  0, 220, 220)',
    'rgb(255,  0,  255)',
    'rgb(170,  170,  170)',
    'rgb(0,  0,  0)',
    'rgb(207,  91,  41)',
    'rgb(104,  168,  85)',

];

function pColor(i) {
    if (i < 10) {
        return plotColor[i];
    }
    return 'rgb(' + Math.round(Math.random() * 255.0) + ',' + Math.round(Math.random() * 255.0) + ',' + Math.round(Math.random() * 255.0) + ')';
}

let showData = [];

function setShowData(apaID, valueID) {
    showData.push([apaID, valueID]);

    setPlotData([apaID, valueID]).then(
        function (v) { },
        function (error) { console.log("Error"); }
    );
}

function rmShowData(apaID, valueID) {
    console.log(showData[showData.length - 1][0] + ' : ' + apaID);
    if ((showData.length >= 1) && (showData[showData.length - 1][0] == apaID) && (showData[showData.length - 1][1] == valueID)) {
        showData.pop();
        chart.data.datasets.pop();
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function setPlotData(item) {
    let pro = new Promise(function (resolve) {
        console.log(chart.data.datasets.length + ' : ' + item[0] + ' : ' + item[1]);

        let color = pColor(chart.data.datasets.length);
        chart.data.datasets.push({
            label: item[0] + ' : ' + item[1],
            backgroundColor: color,
            borderColor: color,
            data: []
        });

        let gww = getGWW();
        let Rdata1;
        let startTime = Date.now() - gww;
        getDatafromDB(item[0], item[1], startTime).then(
            function (Rdata) { setPlotData2(item, Rdata);  resolve(true);},
            function (error) { console.log("Error");}
        );
    });
    return await pro;
}

function setPlotData2(item, Rdata) {
    let gww = getGWW();
    let tid = Date.now() - gww;;
    chart.data.datasets[chart.data.datasets.length - 1].data = [];

    for (let i = 0; i < Rdata.time.length; i++) {
        chart.data.datasets[chart.data.datasets.length - 1].data.push({ x: Number(Rdata.time[i]), y: Number(Rdata.data[i]) });
        tid = Rdata.time[i];
        //console.log(i + " : " +Rdata.time[i] + ", y: " + Rdata.data[i] + " len: " + chart.data.datasets[chart.data.datasets.length - 1].data.length);
    }

    let la = getSupArrayLabelsSt(item[0], item[1], tid);
    let va = getSupArrayDataSt(item[0], item[1], tid);
    for (let k = 0; k < la.length; k++) {
        chart.data.datasets[chart.data.datasets.length - 1].data.push({ x: la[k], y: va[k] });
        //console.log(k);
    }
    chart.update();
}

function clearShowDate() {
    showData = [];
    chart.data.datasets = [];
    chart.update();
}

function draw_graph(ctx, data) {

    const config = {
        type: 'line',
        data,
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            responsive: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 3,
            pointRadius: 0,
            pointHitRadius: 5,
            fill: false,
            lineTension: 0.4,
            scales: {
                x: {
                    ticks: {
                        stepSize: 6,
                        unitStepSize: 5
                    },
                    type: 'time',
                    time: {
                        unit: 'hour',
                        // round: 'day'                                                                                                                                                                            
                        tooltipFormat: 'd/M-yyyy HH:mm',
                        displayFormats: {
                            millisecond: 'HH:mm:ss.SSS',
                            second: 'HH:mm:ss',
                            minute: 'HH:mm',
                            hour: 'd/M-HH:mm'
                        }
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                },
                y: {
                    display: true
                }
            }
        }
    }
    chart = new Chart(ctx, config);
    clearShowDate();
}

var GWW = 24 * 60 * 60 * 1000;

function updataGraphToT() {

    let gww = getGWW();
    let tid = Date.now() - gww;;

    /*for (let x in showData) {
        console.log("x: " + showData[x]);
        
        chart.data.datasets[x].data = [];
    
        for (let i = 0; i < Rdata.time.length; i++) {
            chart.data.datasets[x].data.push({ x: Number(Rdata.time[i]), y: Number(Rdata.data[i]) });
            tid = Rdata.time[i];
            //console.log(i + " : " +Rdata.time[i] + ", y: " + Rdata.data[i] + " len: " + chart.data.datasets[chart.data.datasets.length - 1].data.length);
        }
        let la = getSupArrayLabelsSt(showData[x][0], showData[x][1],tid);
        let va = getSupArrayDataSt(showData[x][0], showData[x][1],tid);
        for (let i = 0; i < la.length; i++)
            chart.data.datasets[x].data.push({ x: la[i], y: va[i] });
    }*/
    chart.update();
}

function TimeSpand(ts) {
    switch (ts) {
        case 1: GWW = 60 * 60 * 1000;
            chart.options.scales.x.time.unit = 'minute';
            break;
        case 2: GWW = 24 * 60 * 60 * 1000;
            chart.options.scales.x.time.unit = 'hour';
            break;
        case 3: GWW = 7 * 24 * 60 * 60 * 1000;
            chart.options.scales.x.time.unit = 'hour';
            break;
        case 4: GWW = 30 * 24 * 60 * 60 * 1000;
            chart.options.scales.x.time.unit = 'hour';
            break;
        case 5: GWW = 365 * 24 * 60 * 60 * 1000;
            chart.options.scales.x.time.unit = 'hour';
            break;
        default: GWW = 24 * 60 * 60 * 1000;
    }
    chart.options.scales.x.time.unit = 'hour';
    console.log("GWW= " + GWW)
    updataGraphToT();
}

function getGWW() {
    return GWW;
}

function chartUpdate() {
    chart.update();
}

function updataGraph() {
    if (showData.length > 0) {
        for (let i = 0; i < showData.length; i++) {
            if (chart.data.datasets[i].data[1]) {
                if (chart.data.datasets[i].data[1].x < (Date.now() - getGWW())) {
                    chart.data.datasets[i].data.shift();
                }
            }
            if (setDepValueUpdated(showData[i][0], showData[i][1])) {
                chart.data.datasets[i].data.push({ x: getDepLabelSt(showData[i][0], showData[i][1]), y: getDepValueSt(showData[i][0], showData[i][1]) });
                console.log("x:" + getDepLabelSt(showData[i][0], showData[i][1]) + ", y: " + getDepValueSt(showData[i][0], showData[i][1]));
            }
        }
    }
    chart.update();
}
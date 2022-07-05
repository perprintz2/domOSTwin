var WebSocket = require('ws');
var mqtt = require('mqtt')

var HistData = {
    "Address": "xx",
    "DataName": "xx",
    "Time": [0],
    "Data": [0]
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

const wss = new WebSocket.Server({ port: 8081 });
//var client= mqtt.connect('mqtt://deis-mqtt01.cs.aau.dk:1883');


wss.on("connection", ws => {
    console.log("connected");
    const client = mqtt.connect('mqtt://deis-mqtt01.cs.aau.dk:1883');

    client.on('connect', function () {
        client.subscribe('domOS/+/+', function (err) {
            if (!err) {
                client.publish('domOS/connect', 'WS server connected')
            }
        })
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(topic.toString());
        console.log(message.toString());
        var st = message.toString();
        if (topic.toString().includes("2494")) var b = "\"apartmentID\" : 2494, ";
        if (topic.toString().includes("2495")) var b = "\"apartmentID\" : 2495, ";
        if (topic.toString().includes("2496")) var b = "\"apartmentID\" : 2496, ";
        var output = [st.slice(0, 1), b, st.slice(1)].join('');

        
        ws.send(output);
        //client.end()
    })


    ws.on("message", data => {
        console.log('Data reciver: ' + data);
        //const reciveData = JSON.parse(data);
        //console.log(reciveData["Address"] + reciveData["DataName"])
        //ws.send(JSON.stringify(getDataFromFile(reciveData["Address"], reciveData["DataName"])));
        //ws.send("fra server");
    });

    ws.on("close", () => {
        console.log("skjdhflsjkhf");
    });

});






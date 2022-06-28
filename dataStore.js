var dataStore = new Map();

function initDataSt() {
    let j = 0;
    gen_data_R13();
    gen_data_R63A();
    gen_data_R77();

}

function addDepDataSt(departmentName) {
    dataStore.set(departmentName, {
        id: departmentName,
        valueList: new Map()
    });
    console.log('add: ' + departmentName);
}

function addDepValueSt(departmentName, valueName) {
    //console.log(`add val start: ${departmentName} : ${valueName}`);
    var current = Date.now();
    if (!dataStore.get(departmentName).valueList.has(valueName)) {
        dataStore.get(departmentName).valueList.set(valueName, {
            id: valueName,
            label: [current],
            data: [0],
            esti: [false],
            updated: false
        });
    }

    //console.log(`add val slut: ${departmentName} : ${valueName}`);
}

function setDepValueSt(departmentName, valueName, value, time, esti) {
    //console.log(`set val start: ${departmentName} : ${valueName}`);

    if (dataStore.get(departmentName).valueList.has(valueName)) {
        let arrv = dataStore.get(departmentName).valueList.get(valueName).data;
        let arrl = dataStore.get(departmentName).valueList.get(valueName).label;

        if (arrl[arrl.length - 1] < time) {
            arrv.push(value);
            //var current = new Date();
            //var time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            arrl.push(time);
            dataStore.get(departmentName).valueList.get(valueName).esti.push(esti);
            dataStore.get(departmentName).valueList.get(valueName).updated = true;
            console.log(`set val slut: ${departmentName} : ${valueName}`);
        }
    }
}

function setDepValueUpdated(departmentName, valueName) {
    if (dataStore.get(departmentName).valueList.get(valueName).updated) {
        dataStore.get(departmentName).valueList.get(valueName).updated = false;
        return true;
    }
    return false;
}

function getDepValueSt(departmentName, valueName) {
    let arr = dataStore.get(departmentName).valueList.get(valueName).data;
    //console.log(`set val: ${departmentName} : ${valueName}`);
    return arr[arr.length - 1];
}

function getDepLabelSt(departmentName, valueName) {
    let arr = dataStore.get(departmentName).valueList.get(valueName).label;
    //console.log(`set val: ${departmentName} : ${valueName}`);
    return arr[arr.length - 1];
}

function getDepEstiSt(departmentName, valueName) {
    let arr = dataStore.get(departmentName).valueList.get(valueName).esti;
    //console.log(`set val: ${departmentName} : ${valueName}`);
    return arr[arr.length - 1];
}

var gw = 200;

function getGW() {
    return gw;
}

function findIndex(arr) {
    let gww = getGWW();

    let startTime = Date.now() - gww;
    //console.log("gww: "+ gww + " now: "+ Date.now()+ " stratTime: "+ startTime);
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < startTime) index = i + 1;
        else break;
        console.log("ar.l: " + arr[i] + " startT: " + startTime);
    }
    return index;
}

function findIndextid(arr, tid) {

    let startTime = tid;
    //console.log("gww: "+ gww + " now: "+ Date.now()+ " stratTime: "+ startTime);
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < startTime) index = i + 1;
        else break;
        console.log("ar.l: " + arr[i] + " startT: " + startTime);
    }
    return index;
}

var startIndex = 0;

function getSupArrayDataSt(departmentName, valueName, tid) {
    let arr = dataStore.get(departmentName).valueList.get(valueName).data;
    //console.log(`set val: ${departmentName} : ${valueName}`);
    //console.log(`getSupArrayDataSt val: ${arr.length} : ${valueName}`);
    //console.log(startIndex);
    if (startIndex == 0) return arr.slice(1, arr.length);
    else return arr.slice(startIndex, arr.length)
}


function getSupArrayLabelsSt(departmentName, valueName, tid) {
    let arr = dataStore.get(departmentName).valueList.get(valueName).label;
    //console.log(`getSupArrayLabelsSt val: ${arr.length} : ${valueName}`);
    let w = getGW();
    startIndex = findIndextid(arr, tid);
    //console.log(startIndex);
    if (startIndex == 0) return arr.slice(1, arr.length);
    else return arr.slice(startIndex, arr.length)
}

function getSupArrayEstisSt(departmentName, valueName, tid) {
    let arr = dataStore.get(departmentName).valueList.get(valueName).esti;
    //console.log(`getSupArrayLabelsSt val: ${arr.length} : ${valueName}`);
    let w = getGW();
    startIndex = findIndextid(arr, tid);
    //console.log(startIndex);
    if (startIndex == 0) return arr.slice(1, arr.length);
    else return arr.slice(startIndex, arr.length)
}


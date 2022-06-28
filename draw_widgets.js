function cCalk(x1, x2, x3, top, x) {
    let cc = 0.0;
    if ((x > x1) && (x < x2)) cc = (top / (x2 - x1)) * (x - x1);
    else if ((x >= x2) && (x < x3)) cc = top - (top / (x3 - x2)) * (x - x2);
    return cc;
}

function cCalk3(x1, x2, x3, min, max, v) {
    let c = 0;
    if (v <= min) return x1;
    if (v >= max) return x3;
    let h = (max - min) / 2;
    if ((min < v) && (v < h)) return ((v - min) * ((x2 - x1) / (h - min)) + x1);
    if ((h <= v) && (v < max)) return ((v - h) * ((x3 - x2) / (max - h)) + x2);
}

function DynColorStd(value, min, max) {
    rc = cCalk3(0, 251, 250, min, max, value);
    gc = cCalk3(240, 251, 5, min, max, value);
    bc = cCalk3(50, 0, 5, min, max, value);
    //console.log(" r: " + rc + " g: " + gc + " b: " + bc)
    return 'rgb(' + Math.round(rc) + ',' + Math.round(gc) + ',' + Math.round(bc) + ')';
}

function DynColorCO(value, min, max) {
    rc = cCalk3(139, 23, 137, min, max, value);
    gc = cCalk3(125, 213, 18, min, max, value);
    bc = cCalk3(132, 27, 1, min, max, value);
    //console.log(" r: " + rc + " g: " + gc + " b: " + bc)
    return 'rgb(' + Math.round(rc) + ',' + Math.round(gc) + ',' + Math.round(bc) + ')';
}

function DynColor(value, min, max) {
    rc = cCalk(15, 28, 40, 255, value);
    gc = cCalk(15, 20, 24, 200, value) + cCalk(22, 26, 32, 155, value);
    bc = cCalk(10, 15, 23, 255, value);
    let shine = 10;
    return 'rgb(' + Math.round(rc + shine) + ',' + Math.round(gc + shine) + ',' + Math.round(bc + shine) + ')';
}

function DynColor2(value, min, max) {
    rc = cCalk(20, 45, 60, 255, value);
    gc = cCalk(-5, 10, 40, 200, value);
    bc = 0;
    let shine = 40;
    return 'rgb(' + Math.round(rc + shine) + ',' + Math.round(gc + shine) + ',' + Math.round(bc + shine) + ')';
}
function DynColorhumi(value, min, max) {
    rc = cCalk(-5, 50, 100, 80, value);
    gc = cCalk(-5, 50, 100, 80, value);
    bc = cCalk(10, 90, 300, 255, value);;
    let shine = 40;
    return 'rgb(' + Math.round(rc + shine) + ',' + Math.round(gc + shine) + ',' + Math.round(bc + shine) + ')';
}

function tempHumCo2(ctx, x, y, size, t, te, h, he, co, coe) {

    draw_temp(ctx, x, y, size * 2, DynColor, t,te);
    print_num(ctx, x + 50, y, size * 0.6, t);
    draw_gauge(ctx, x + 96, y + 93, size * 1.4, DynColorhumi, h, 100, 30, 'Humidity', '% Relativ', 1),he;
    draw_gauge(ctx, x + 96, y + 170, size * 1.4, DynColorCO, co, 2000, 0, 'CO2', 'ppm', 0, coe);
}


function p_temp(ctx, x, y, size, cf, v) {

    draw_temp(ctx, x, y, size * 2, cf, v,false);
    print_num(ctx, x + 50, y, size * 0.6, v);
}

function addKlikTemp(elm, x, y, w, f, id) {
    elm.push({
        colour: '#05EFFF',
        width: 49,
        height: (w * 2) + 9,
        top: y - 2,
        left: x - 2,
        funk: f,
        id: id
    });
}

function addKlikgauge(elm, x, y, w, f, id) {
    elm.push({
        colour: '#05EFFF',
        width: w + (w / 25) + 4,
        height: w / 2 + (w / 5.2) + 4,
        top: y - (w / 2) - (w / 19) - 2,
        left: x - w / 2.2 - (w / 17) - 2,
        funk: f,
        id: id
    });
}


function addKliktherm(elm, x, y, w, f, idsp, idmv) {

    elm.push({
        colour: '#05EFFF',
        width: (w + (w / 25) + 4)/2,
        height: w / 2 + (w / 5.2) + 4,
        top: y - (w / 2) - (w / 19) - 2,
        left: x - w / 2.2 - (w / 17) - 2,
        funk: f,
        id: idsp
    });
    elm.push({
        colour: '#05EFFF',
        width: (w + (w / 25) + 4)/2,
        height: w / 2 + (w / 5.2) + 4,
        top: y - (w / 2) - (w / 19) - 2,
        left: x,
        funk: f,
        id: idmv
    });
}


function draw_temp(ctx, x, y, size, cf, value, esti) {
    let max = 30.0;
    let min = 15.0;
    if (value > max) value = max;
    if (value < min) value = min;

    var colorname = cf(value, min, max);

    var imageObj = new Image();

    imageObj.onload = function () {
        ctx.translate(x, y);
        ctx.lineWidth = 0.5;
        //ctx.strokeStyle = "black"; // Green path
        ctx.setLineDash([]);
        ctx.drawImage(imageObj, 0, 0, 45, size + 5);
        ctx.fillStyle = colorname;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#202020";
        ctx.beginPath();

        //ctx.clearRect(0, 0, 44, size + 2);
        ctx.moveTo(10, size - 20);           // Create a starting point
        ctx.lineTo(10, 10);          // Create a horizontal line
        ctx.arc(15, 10, 5, Math.PI, 0);
        ctx.lineTo(20, size - 20);
        // ctx.lineWidth = 0.5;
        ctx.arc(15, size - 10, 10, 1.7 * Math.PI, 1.3 * Math.PI);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        //ctx.strokeStyle = "black"; // Green path
        ctx.strokeStyle = colorname;
        ctx.arc(15, size - 10, 8, 1.60 * Math.PI, 1.40 * Math.PI);
        // ctx.stroke(); // Draw it
        ctx.lineWidth = 0.01;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.clearRect(12, (size - 20) - (size - 30), 6, size - 30);

        let hight = ((size - 27) / (max - min)) * 0.99 * (value - min);
        // window.alert((size - 20) - hight);
        ctx.fillRect(12, (size - 20) - hight, 6, hight + 5);
        //ctx.stroke();
        ctx.strokeStyle = "black"; // Green path

        ctx.beginPath();

        ctx.lineWidth = 0.5;

        ctx.moveTo(22, 10);
        ctx.lineTo(28, 10);
        let delta = (size - 30) / (max - min)
        for (let i = (10 + delta); i < (size - 20); i += delta) {
            ctx.moveTo(22, i);
            ctx.lineTo(25, i);
        }
        for (let i = (10 + delta * 5); i < (size - 20); i += (delta * 5)) {
            ctx.moveTo(22, i);
            ctx.lineTo(28, i);
        }
        ctx.moveTo(22, size - 20);
        ctx.lineTo(28, size - 20);

        ctx.font = "10px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("30", 30, 12);
        ctx.stroke();
        ctx.fillText("25", 30, 12 + delta * 5);
        ctx.stroke();
        ctx.fillText("20", 30, 12 + delta * 10);
        ctx.stroke();
        ctx.fillText("15", 30, 12 + delta * 15);
        ctx.stroke();
        ctx.translate(-x, -y);
    };
    if (esti) imageObj.src = '../images/tempFrame2.jpg';
    else imageObj.src = '../images/tempFrame1.jpg';

}


function print_num(ctx, x, y, size, value) {
    var imageObj = new Image();

    imageObj.onload = function () {

        ctx.drawImage(imageObj, x, y, size, size / 2);
        ctx.font = size / 2.7 + "px Arial";
        ctx.fillStyle = "#000000";
        wi = ctx.measureText(value.toFixed(1)).width;
        ctx.fillText(value.toFixed(1), x + size - (size / 12) - wi, y + size / 2 - (size / 9));
        ctx.stroke();

    };
    imageObj.src = '../images/numFrame1.jpg';
}

function draw_gauge(ctx, x, y, size, cf, value, max, min, title, unit, numDec, esti) {


    if (value > max) value = max;
    if (value < min) value = min;
    let rot = (Math.PI * (value - min)) / (max - min);
    var imageObj3 = new Image();

    imageObj3.onload = function () {
        ctx.translate(x, y);
        if (!esti) ctx.clearRect(     -size / 2.2 - (size / 17)-1, -(size / 2) - (size / 19)-3, size + (size / 25)+1, size / 2 + (size / 5.2)+3);
        else ctx.drawImage(imageObj3, -size / 2.2 - (size / 17), -(size / 2) - (size / 19)-3, size + (size / 25), size / 2 + (size / 5.2)+3);
        ctx.lineWidth = size / 5;
        ctx.strokeStyle = "#D0D0D0";
        ctx.beginPath();
        ctx.arc(0, 0, size / 3, Math.PI, 2 * Math.PI);
        ctx.stroke();


        ctx.strokeStyle = cf(value, min, max);
        ctx.beginPath();
        ctx.arc(0, 0, size / 3, Math.PI, Math.PI + rot);
        ctx.stroke();


        ctx.rotate(rot);

        ctx.beginPath();
        ctx.strokeStyle = "#a0a0a0";
        ctx.moveTo(-size / 2.3 - (size / 17), 0);           // Create a starting point
        ctx.lineTo(-size / 5.5, - (size / 40));          // Create a horizontal line
        ctx.lineTo(-size / 5.5, (size / 40));
        ctx.lineTo(-size / 2.3 - (size / 17), 0);
        ctx.lineWidth = 0.5;

        //ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
        //ctx.stroke();
        ctx.rotate(-rot);

        ctx.font = (size / 18) + 1 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(min, -size / 3 - size / 30, (size / 12));
        ctx.fillText(max, size / 3 - size / 30, (size / 12));
        ctx.stroke();

        wi = ctx.measureText(value.toFixed(1)).width;
        ctx.font = "bold " + size / 8 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(value.toFixed(numDec), - (wi / 2 + size / 20), 0 - 2);
        ctx.stroke();

        wi = ctx.measureText(unit).width;

        ctx.font = (size / 15) + 1 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(unit, - wi / 3.8, (size / 12));
        ctx.stroke();

        ctx.font = "bold " + size / 11 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(title, -size / 2.2, -size * 0.47);
        ctx.stroke();

        ctx.translate(-x, -y);
    };
    imageObj3.src = '../images/gauFrame2.jpg';

}

function draw_thermo(ctx, x, y, size, cf, sp,  value, max, min, title, unit, numDec) {


    if (value > max) value = max;
    if (value < min) value = min;
    if (sp > max) sp = max;
    if (sp < min) sp = min;
    
    let rot = (Math.PI * (value - min)) / (max - min);  
    let rotSP = (Math.PI * (sp - min)) / (max - min);
    //var imageObj3 = new Image();

    //imageObj3.onload = function () {
        ctx.translate(x, y);
        ctx.clearRect(-size / 2.2 - (size / 17), -(size / 2) - (size / 19), size + (size / 25), size / 2 + (size / 5.2));
        //ctx.drawImage(imageObj3, -size / 2.2 - (size / 17), -(size / 2) - (size / 19), size + (size / 25), size / 2 + (size / 5.2));
        ctx.lineWidth = size / 5;
        ctx.strokeStyle = "#D0D0D0";
        ctx.beginPath();
        ctx.arc(0, 0, size / 3, Math.PI, 2 * Math.PI);
        ctx.stroke();


        ctx.strokeStyle = cf(value, min, max);
        ctx.beginPath();
        ctx.arc(0, 0, size / 3, Math.PI, Math.PI + rot);
        ctx.stroke();


        ctx.rotate(rot);

        ctx.beginPath();
        ctx.strokeStyle = "#a0a0a0";
        ctx.moveTo(-size / 3.3 - (size / 17), 0);           // Create a starting point
        ctx.lineTo(-size / 5.5, - (size / 40));          // Create a horizontal line
        ctx.lineTo(-size / 5.5, (size / 40));
        ctx.lineTo(-size / 3.3 - (size / 17), 0);
        ctx.lineWidth = 0.5;

        //ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
        //ctx.stroke();
        ctx.rotate(-rot);

        ctx.rotate(rotSP);

        ctx.beginPath();
        ctx.strokeStyle = "#f0a0a0";
        ctx.moveTo(-size / 2.5 - (size / 17), - (size / 25));           // Create a starting point
        ctx.lineTo(-size / 3.3- (size / 17), 0);          // Create a horizontal line
        ctx.lineTo(-size / 2.5- (size / 17), (size / 25));
        ctx.lineTo(-size / 2.5 - (size / 17), - (size / 25));
        ctx.lineWidth = 0.5;

        //ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
        //ctx.stroke();
        ctx.rotate(-rotSP);

        ctx.font = (size / 18) + 1 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(min, -size / 3 - size / 30, (size / 12));
        ctx.fillText(max, size / 3 - size / 30, (size / 12));
        ctx.stroke();

        wi = ctx.measureText(value.toFixed(1)).width;
        ctx.font = "bold " + size / 8 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(value.toFixed(numDec), - (wi / 2 + size / 20), 0 - 2);
        ctx.stroke();

        wi = ctx.measureText(unit).width;

        ctx.font = (size / 15) + 1 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(unit, - wi / 3.8, (size / 12));
        ctx.stroke();

        ctx.font = "bold " + size / 11 + "px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(title, -size / 2.2, -size * 0.47);
        ctx.stroke();

        ctx.translate(-x, -y);
   // };
    //imageObj3.src = '../images/gauFrame2.jpg';

}

function draw_valve(ctx, x, y, size, value) {

    ctx.translate(x, y);
    var colorname = DynColor(value, min, max);

    ctx.clearRect(0, 0, size, size);
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.clearRect(0, 0, size, size);

    ctx.moveTo(0, size);           // Create a starting point
    ctx.lineTo(size, size / 3);          // Create a horizontal line
    ctx.lineTo(size, size);
    ctx.lineTo(0, size / 3);
    ctx.closePath();
    ctx.fillStyle = colorname;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();

    ctx.lineWidth = 1;

    ctx.arc(size / 2, size / 3, size / 2, Math.PI, 0);

    ctx.arc(size / 2, size / 3, size / 3, Math.PI, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();

    ctx.lineWidth = 4;
    ctx.arc(size / 2, size / 3, size / 2.5, Math.PI, -1);

    ctx.stroke();

    ctx.translate(-x, -y);
}
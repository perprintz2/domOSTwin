class Thermo {   
    constructor(id, name, x, y, size, cf, min , max) {
        this.min = min;
        this.max = max;
        this.size = size;
        this.name = name;
        this.x = x;
        this.y = y;
        this.cf = cf;
        this.id = id;
        //console.log('this.x: ' + this.x)
        this.arp = apartmentList.get(id);
        addKlikTemp(arp.elm, x, y, size, printGarph, name);
        addDepValueSt(id, name);
    }

    draw(ctx) {
        let value = getDepValueSt(this.id, this.name)
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        let xx = this.x;
        let yy = this.y;
        let ss = this.size;
        let ma = this.max;
        let mi = this.min;
        this.ctx = ctx;
        let colorname = this.cf(value, this.min, this.max);
        let imageObj = new Image();
        let esti = false;
        if (esti) imageObj.src = './images/tempFrame2.jpg';
        else imageObj.src = './images/tempFrame1.jpg';
        this.imageObj = this.imageObj;

        imageObj.onload = function () {
            //ctx.save();

            ctx.translate(xx, yy);
            ctx.lineWidth = 0.5;
            ctx.setLineDash([]);
            ctx.drawImage(imageObj, 0, 0, 45, ss + 5);
            ctx.fillStyle = colorname;
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = "#202020";
            ctx.beginPath();
            ctx.moveTo(10, ss - 20);           // Create a starting point
            ctx.lineTo(10, 10);          // Create a horizontal line
            ctx.arc(15, 10, 5, Math.PI, 0);
            ctx.lineTo(20, ss - 20);
            ctx.arc(15, ss - 10, 10, 1.7 * Math.PI, 1.3 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = colorname;
            ctx.arc(15, ss - 10, 8, 1.60 * Math.PI, 1.40 * Math.PI);
            ctx.lineWidth = 0.01;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            ctx.clearRect(12, (ss - 22) - (ss - 30), 6, ss - 28);

            let hight = ((ss - 27) / (ma - mi)) * 0.99 * (value - mi);
            ctx.fillRect(12, (ss - 20) - hight, 6, hight + 5);
            ctx.strokeStyle = "black"; // Green path

            ctx.beginPath();

            ctx.lineWidth = 0.5;

            ctx.moveTo(22, 10);
            ctx.lineTo(28, 10);
            let delta = (ss - 30) / (ma - mi)
            for (let i = (10 + delta); i < (ss - 20); i += delta) {
                ctx.moveTo(22, i);
                ctx.lineTo(25, i);
            }
            for (let i = (10 + delta * 5); i < (ss - 20); i += (delta * 5)) {
                ctx.moveTo(22, i);
                ctx.lineTo(28, i);
            }
            ctx.moveTo(22, ss - 20);
            ctx.lineTo(28, ss - 20);

            ctx.font = "10px Arial";
            ctx.fillStyle = "#000000";
            let ii=0;
            while (ma >= mi) {
                
                ctx.fillText(ma.toString(), 30, 12 + delta * 5*ii);
                ctx.stroke();
                ma= ma - 5;
                ii++;
            }
            ctx.translate(-xx, -yy);
            //ctx.restore();

        };

    }

    Update() {
        //this.ctx.save();

        let value = getDepValueSt(this.id, this.name)
        this.ctx.translate(this.x, this.y);
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;

        
        //this.ctx.strokeStyle = "black"; // Green path

        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.fillStyle = "white"
        this.ctx.arc(15, this.size - 10, 8.1, 1.60 * Math.PI, 1.40 * Math.PI); 
        this.ctx.lineWidth = 0.0;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.cf(value, this.min, this.max);
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.arc(15, this.size - 10, 8, 1.60 * Math.PI, 1.40 * Math.PI);
        this.ctx.lineWidth = 0.01;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.clearRect(12, (this.size - 22) - (this.size - 30), 6, this.size - 28);
        this.ctx.fillStyle = this.cf(value, this.min, this.max);
        let hight = ((this.size - 27) / (this.max - this.min)) * 0.99 * (value - this.min);
        this.ctx.fillRect(12, (this.size - 20) - hight, 6, hight + 5);


        this.ctx.strokeStyle = "black"; // Green path
        this.ctx.translate(-this.x, -this.y);
        //this.ctx.restore();

    }
}

class ThermoNN {   
   
    constructor(id, name, name2, x, y, size, cf, min , max) {
        this.min = min;
        this.max = max;
        this.size = size;
        this.name = name;
        this.x = x;
        this.y = y;
        this.cf = cf;
        this.id = id;
        //console.log('this.x: ' + this.x)
        this.arp = apartmentList.get(id);
        addKlikTemp(arp.elm, x, y, size/4, printGarph, name2);
        addKlikTemp(arp.elm, x, y+(size/2), size/4, printGarph, name);
        addDepValueSt(id, name);
    }

    draw(ctx) {
        let value = getDepValueSt(this.id, this.name)
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        let xx = this.x;
        let yy = this.y;
        let ss = this.size;
        let ma = this.max;
        let mi = this.min;
        this.ctx = ctx;
        let colorname = this.cf(value, this.min, this.max);
        let imageObj = new Image();
        let esti = false;
        if (esti) imageObj.src = './images/tempFrame2.jpg';
        else imageObj.src = './images/tempFrame1.jpg';
        this.imageObj = this.imageObj;

        imageObj.onload = function () {
            //ctx.save();

            ctx.translate(xx, yy);
            ctx.lineWidth = 0.5;
            ctx.setLineDash([]);
            ctx.drawImage(imageObj, 0, 0, 45, ss + 5);
            ctx.fillStyle = colorname;
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = "#202020";
            ctx.beginPath();
            ctx.moveTo(10, ss - 20);           // Create a starting point
            ctx.lineTo(10, 10);          // Create a horizontal line
            ctx.arc(15, 10, 5, Math.PI, 0);
            ctx.lineTo(20, ss - 20);
            ctx.arc(15, ss - 10, 10, 1.7 * Math.PI, 1.3 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = colorname;
            ctx.arc(15, ss - 10, 8, 1.60 * Math.PI, 1.40 * Math.PI);
            ctx.lineWidth = 0.01;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            ctx.clearRect(12, (ss - 22) - (ss - 30), 6, ss - 28);

            let hight = ((ss - 27) / (ma - mi)) * 0.99 * (value - mi);
            ctx.fillRect(12, (ss - 20) - hight, 6, hight + 5);
            ctx.strokeStyle = "black"; // Green path

            ctx.beginPath();

            ctx.lineWidth = 0.5;

            ctx.moveTo(22, 10);
            ctx.lineTo(28, 10);
            let delta = (ss - 30) / (ma - mi)
            for (let i = (10 + delta); i < (ss - 20); i += delta) {
                ctx.moveTo(22, i);
                ctx.lineTo(25, i);
            }
            for (let i = (10 + delta * 5); i < (ss - 20); i += (delta * 5)) {
                ctx.moveTo(22, i);
                ctx.lineTo(28, i);
            }
            ctx.moveTo(22, ss - 20);
            ctx.lineTo(28, ss - 20);

            ctx.font = "10px Arial";
            ctx.fillStyle = "#000000";
            let ii=0;
            while (ma >= mi) {
                
                ctx.fillText(ma.toString(), 30, 12 + delta * 5*ii);
                ctx.stroke();
                ma= ma - 5;
                ii++;
            }
            ctx.translate(-xx, -yy);
            //ctx.restore();

        };

    }

    Update() {
        //this.ctx.save();

        let value = getDepValueSt(this.id, this.name)
        this.ctx.translate(this.x, this.y);
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;

        
        //this.ctx.strokeStyle = "black"; // Green path

        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.fillStyle = "white"
        this.ctx.arc(15, this.size - 10, 8.1, 1.60 * Math.PI, 1.40 * Math.PI); 
        this.ctx.lineWidth = 0.0;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.cf(value, this.min, this.max);
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.arc(15, this.size - 10, 8, 1.60 * Math.PI, 1.40 * Math.PI);
        this.ctx.lineWidth = 0.01;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.clearRect(12, (this.size - 22) - (this.size - 30), 6, this.size - 28);
        this.ctx.fillStyle = this.cf(value, this.min, this.max);
        let hight = ((this.size - 27) / (this.max - this.min)) * 0.99 * (value - this.min);
        this.ctx.fillRect(12, (this.size - 20) - hight, 6, hight + 5);


        this.ctx.strokeStyle = "black"; // Green path
        this.ctx.translate(-this.x, -this.y);
        //this.ctx.restore();

    }
}


class Gauge {
    constructor(id, name, x, y, size, min, max, cf, title, unit, numDec, esti) {
        this.min = min;
        this.max = max;
        this.size = size;
        this.name = name;
        this.x = x;
        this.y = y;
        this.cf = cf;
        this.id = id;
        this.numDec = numDec;
        this.unit = unit;
        this.title = title;
        this.arp = apartmentList.get(id);
        addKlikgauge(arp.elm, x, y, size, printGarph, name);
        addDepValueSt(id, name);
    }

    draw(ctx) {
        let value = getDepValueSt(this.id, this.name)
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        let xx = this.x;
        let yy = this.y;
        let ss = this.size;
        let ma = this.max;
        let mi = this.min;
        let unt = this.unit;
        let nDec = this.numDec;
        let tit = this.title;
        let esti = getDepEstiSt(this.id, this.name);
        this.ctx = ctx;
        let colorname = this.cf(value, this.min, this.max);
        let rot = (Math.PI * (value - this.min)) / (this.max - this.min);
        var imageObj3 = new Image();

        imageObj3.onload = function () {
            //ctx.save();

            ctx.translate(xx, yy);
            let esti = false;
            if (!esti) ctx.clearRect(-ss / 2.2 - (ss / 17) - 1, -(ss / 2) - (ss / 19) - 3, ss + (ss / 25) + 1, ss / 2 + (ss / 5.2) + 3);
            else ctx.drawImage(imageObj3, -ss / 2.2 - (ss / 17), -(ss / 2) - (ss / 19) - 3, ss + (ss / 25), ss / 2 + (ss / 5.2) + 3);
            ctx.lineWidth = ss / 5;
            ctx.strokeStyle = "#D0D0D0";
            ctx.beginPath();
            ctx.arc(0, 0, ss / 3, Math.PI, 2 * Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = colorname;
            ctx.arc(0, 0, ss / 3, Math.PI, Math.PI + rot);
            ctx.stroke();

            ctx.rotate(rot);

            ctx.beginPath();
            ctx.strokeStyle = "#a0a0a0";
            ctx.moveTo(-ss / 2.3 - (ss / 17), 0);           // Create a starting point
            ctx.lineTo(-ss / 5.5, - (ss / 40));          // Create a horizontal line
            ctx.lineTo(-ss / 5.5, (ss / 40));
            ctx.lineTo(-ss / 2.3 - (ss / 17), 0);
            ctx.lineWidth = 0.5;

            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.rotate(-rot);

            ctx.font = (ss / 18) + 1 + "px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(mi, -ss / 3 - ss / 30, (ss / 12) + 1);
            ctx.fillText(ma, ss / 3 - ss / 30, (ss / 12) + 1);
            ctx.stroke();


            ctx.font = "bold " + ss / 8 + "px Arial";
            let wi = ctx.measureText(value.toFixed(nDec)).width;
            ctx.fillStyle = "#000000";
            ctx.fillText(value.toFixed(nDec), - (wi / 2), 0 - 2);
            ctx.stroke();

            wi = ctx.measureText(unt).width;

            ctx.font = (ss / 15) + 1 + "px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(unt, - wi / 3.8, (ss / 12) + 1);
            ctx.stroke();

            ctx.font = "bold " + ss / 11 + "px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(tit, -ss / 2.2, -ss * 0.47);
            ctx.stroke();

            ctx.translate(-xx, -yy);
            //ctx.restore();

        };
        imageObj3.src = './images/gauFrame2.jpg';
    }

    Update() {

        //this.ctx.save();
        this.ctx.translate(this.x, this.y);
        let value = getDepValueSt(this.id, this.name)
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        let rot = (Math.PI * (value - this.min)) / (this.max - this.min);
        let colorname = this.cf(value, this.min, this.max);

        this.ctx.lineWidth = this.size / 5;
    
        if (this.size < 150)
        this.ctx.clearRect(-this.size / 2.2 - (this.size / 17) - 1, -(this.size / 2) - 4, this.size + (this.size / 25) + 1, this.size / 2 + 5 + this.size / 60);
        else
        this.ctx.clearRect(-this.size / 2.2 - (this.size / 17) - 1, -(this.size / 2) - 4, this.size + (this.size / 25) + 1, this.size / 2 + 7 + this.size / 60);

        this.ctx.strokeStyle = "#D0D0D0";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size / 3, Math.PI, 2 * Math.PI);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = colorname;
        this.ctx.arc(0, 0, this.size / 3, Math.PI, Math.PI + rot);
        this.ctx.stroke();

        this.ctx.rotate(rot);

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#a0a0a0";
        this.ctx.moveTo(-this.size / 2.3 - (this.size / 17), 0);           // Create a starting point
        this.ctx.lineTo(-this.size / 5.5, - (this.size / 40));          // Create a horizontal line
        this.ctx.lineTo(-this.size / 5.5, (this.size / 40));
        this.ctx.lineTo(-this.size / 2.3 - (this.size / 17), 0);
        this.ctx.lineWidth = 0.5;

        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.rotate(-rot);

        this.ctx.font = "bold " + this.size / 8 + "px Arial";
        let wi = ctx.measureText(value.toFixed(this.numDec)).width;
        let hi = this.size / 8;

        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(value.toFixed(this.numDec), - (wi / 2), 0 - 2);
        this.ctx.stroke();
        this.ctx.font = "bold " + this.size / 11 + "px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(this.title, -this.size / 2.2, -this.size * 0.47);
        this.ctx.stroke();

        this.ctx.translate(-this.x, -this.y);
        //this.ctx.resetTranslate();
        //this.ctx.restore();

    }
}

class NumDisplay {
    constructor(id, name, x, y, size, min,max) {
      
        this.min = min;
        this.max = max;
        this.size = size;
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = id;
        this.arp = apartmentList.get(id);
        addDepValueSt(id, name);
    }

    draw(ctx) {
        let value = getDepValueSt(this.id, this.name)
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        let xx = this.x;
        let yy = this.y;
        let ss = this.size;
        let ma = this.max;
        let mi = this.min;
        this.ctx = ctx;
        var imageObj = new Image();

        imageObj.onload = function () {

            ctx.drawImage(imageObj, xx, yy, ss, ss / 2);
            ctx.font = ss / 2.7 + "px Arial";
            ctx.fillStyle = "#000000";
            let wi = ctx.measureText(value.toFixed(1)).width;
            ctx.fillText(value.toFixed(1), xx + ss - (ss / 12) - wi, yy + ss / 2 - (ss / 9));
            ctx.stroke();
            this.img = imageObj;

        };
        imageObj.src = './images/numFrame1.jpg';
    }

    Update() {
        //this.ctx.save();
        
        this.ctx.stroke();
        let value = getDepValueSt(this.id, this.name)
        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        this.ctx.clearRect(this.x + 3, this.y + 3, this.size - 6, (this.size / 2) - 6);
        this.ctx.stroke();
        this.ctx.font = this.size / 2.7 + "px Arial";
        this.ctx.fillStyle = "#000000";
        let wii = ctx.measureText(value.toFixed(1)).width;
        this.ctx.fillText(value.toFixed(1), this.x + this.size - (this.size / 12) - wii, this.y + this.size / 2 - (this.size / 9));
        this.ctx.stroke();
        //this.ctx.restore();

    }
}


class TempHumiCo2 {
    constructor(id, name, x, y, size) {
        this.size = size;
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = id;
        this.arp = apartmentList.get(id);
        addDepValueSt(id, name + " TempNN");
        addDepValueSt(id, name + " Temp");
        addDepValueSt(id, name + " Humi");
        addDepValueSt(id, name + " CO2");
        this.temp = new Thermo(id, name + " Temp", this.x, this.y, this.size, DynColor,15,30);
        this.numDis = new NumDisplay(id, name + " Temp", this.x + 50, this.y, this.size * 0.3,15,30);
        this.humi = new Gauge(id, name + " Humi", this.x + 96, this.y + 93, this.size * 0.7, 30, 100, DynColorhumi, 'Humidity', '% Relativ', 1);
        this.CO2 = new Gauge(id, name + " CO2", this.x + 96, this.y + 170, this.size * 0.7, 0, 2000, DynColorCO, 'CO2', 'ppm', 0);
    }

    draw(ctx) {
        this.temp.draw(ctx);
        this.numDis.draw(ctx);
        this.humi.draw(ctx);
        this.CO2.draw(ctx);
    }

    Update() {
        this.temp.Update();
        this.numDis.Update();
        this.humi.Update();
        this.CO2.Update();
    }
}

class TempHumiCo2NN {
    constructor(id, name, x, y, size) {
        this.size = size;
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = id;
        this.arp = apartmentList.get(id);
        addDepValueSt(id, name + " TempNN");
        addDepValueSt(id, name + " Temp");
        addDepValueSt(id, name + " Humi");
        addDepValueSt(id, name + " CO2");
        this.temp = new ThermoNN(id, name + " TempNN", name + " Temp", this.x, this.y, this.size, DynColor,15,30);
        this.numDis = new NumDisplay(id, name + " TempNN", this.x + 50, this.y, this.size * 0.3,15,30);
        this.humi = new Gauge(id, name + " Humi", this.x + 96, this.y + 93, this.size * 0.7, 30, 100, DynColorhumi, 'Humidity', '% Relativ', 1);
        this.CO2 = new Gauge(id, name + " CO2", this.x + 96, this.y + 170, this.size * 0.7, 0, 2000, DynColorCO, 'CO2', 'ppm', 0);
    }

    draw(ctx) {
        this.temp.draw(ctx);
        this.numDis.draw(ctx);
        this.humi.draw(ctx);
        this.CO2.draw(ctx);
    }

    Update() {
        this.temp.Update();
        this.numDis.Update();
        this.humi.Update();
        this.CO2.Update();
    }
}


class Termos {
    constructor(id, namesp, namemv, namespext, x, y, size, min, max, cf, title) {
        this.min = min;
        this.max = max;
        this.size = size;
        this.namesp = namesp;
        this.namemv = namemv;
        this.namespext = namespext;
        this.x = x;
        this.y = y;
        this.cf = cf;
        this.id = id;
        this.title = title;
        this.arp = apartmentList.get(id);
        addKliktherm(arp.elm, x, y, size, printGarph, namesp, namemv);
        
        addDepValueSt(id, namesp);
        addDepValueSt(id, namemv);
        addDepValueSt(id, namespext);
    }

    draw(ctx) {
        let value = getDepValueSt(this.id, this.namemv)
        let sp = getDepValueSt(this.id, this.namesp)
        let spext = getDepValueSt(this.id, this.namespext)

        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        if (sp > this.max) sp = this.max;
        if (sp < this.min) sp = this.min;
        if (spext > this.max) spext = this.max;
        if (spext < this.min) spext = this.min;
       
        let rot = (Math.PI * (value - this.min)) / (this.max - this.min);  
        let rotSP = (Math.PI * (sp - this.min)) / (this.max - this.min);
        let rotSPext = (Math.PI * (spext - this.min)) / (this.max - this.min);

        let xx = this.x;
        let yy = this.y;
        let ss = this.size;
        let ma = this.max;
        let mi = this.min;
        let unt = this.unit;
        let tit = this.title;
        this.ctx = ctx;
        let colorname = this.cf(value, this.min, this.max);
        var imageObj3 = new Image();

        imageObj3.onload = function () {
            //ctx.save();

            ctx.translate(xx, yy);
            let esti = false;
            if (!esti) ctx.clearRect(-ss / 2.2 - (ss / 17) - 1, -(ss / 2) - (ss / 19) - 4, ss + (ss / 25) + 1, ss / 2 + (ss / 5.2) + 3);
            else ctx.drawImage(imageObj3, -ss / 2.2 - (ss / 17), -(ss / 2) - (ss / 19) - 3, ss + (ss / 25), ss / 2 + (ss / 5.2) + 3);
            ctx.lineWidth = ss / 5;
            ctx.strokeStyle = "#D0D0D0";
            ctx.beginPath();
            ctx.arc(0, 0, ss / 3, Math.PI, 2 * Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = colorname;
            ctx.arc(0, 0, ss / 3, Math.PI, Math.PI + rot);
            ctx.stroke();

            ctx.rotate(rot);

            ctx.beginPath();
            ctx.strokeStyle = "#a0a0a0";
            ctx.moveTo(-ss / 3.3 - (ss / 17), 0);           // Create a starting point
            ctx.lineTo(-ss / 5.5, - (ss / 40));          // Create a horizontal line
            ctx.lineTo(-ss / 5.5, (ss / 40));
            ctx.lineTo(-ss / 3.3 - (ss / 17), 0);
            ctx.lineWidth = 0.5;

            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.rotate(-rot);

            ctx.rotate(rotSP);
    
            ctx.beginPath();
            ctx.strokeStyle = "#f0a0a0";
            ctx.moveTo(-ss / 2.5 - (ss / 17), - (ss / 40));           // Create a starting point
            ctx.lineTo(-ss / 3.3- (ss / 17), 0);          // Create a horizontal line
            ctx.lineTo(-ss / 2.5- (ss / 17), (ss / 40));
            ctx.lineTo(-ss / 2.5 - (ss / 17), - (ss / 40));
            ctx.lineWidth = 0.5;
    
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.rotate(-rotSP);


            ctx.rotate(rotSPext);
    
            ctx.beginPath();
            ctx.strokeStyle = "#0000a0";
            ctx.moveTo(-ss / 2.5 - (ss / 17), - (ss / 40));           // Create a starting point
            ctx.lineTo(-ss / 3.3- (ss / 17), 0);          // Create a horizontal line
            ctx.lineTo(-ss / 2.5- (ss / 17), (ss / 40));
            ctx.lineTo(-ss / 2.5 - (ss / 17), - (ss / 40));
            ctx.lineWidth = 0.5;
    
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.rotate(-rotSPext);






            ctx.font = (ss / 18) + 1 + "px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(mi, -ss / 3 - ss / 30, (ss / 12) + 1);
            ctx.fillText(ma, ss / 3 - ss / 30, (ss / 12) + 1);
            ctx.stroke();

            ctx.font = "bold " + ss / 8 + "px Arial";
            let wi = ctx.measureText(value.toFixed(1)).width;
            ctx.fillStyle = "#000000";
            ctx.fillText(value.toFixed(1), - (wi / 2), 0 - 2);
            ctx.stroke();

            ctx.font = (ss / 15) + 1 + "px Arial";
            wi = ctx.measureText("grC").width;
            ctx.fillStyle = "#000000";
            ctx.fillText("grC", - wi / 2, (ss / 12) + 1);
            ctx.stroke();

            ctx.font = "bold " + ss / 11 + "px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(tit, -ss / 2.2, -ss * 0.47);
            ctx.stroke();

            ctx.translate(-xx, -yy);
            //ctx.restore();

        };
        imageObj3.src = './images/gauFrame2.jpg';
    }

    Update() {
        //this.ctx.save();

        this.ctx.translate(this.x, this.y);

        let value = getDepValueSt(this.id, this.namemv)
        let sp = getDepValueSt(this.id, this.namesp)
        let spext = getDepValueSt(this.id, this.namespext)

        if (value > this.max) value = this.max;
        if (value < this.min) value = this.min;
        if (sp > this.max) sp = this.max;
        if (sp < this.min) sp = this.min;
        if (spext > this.max) spext = this.max;
        if (spext < this.min) spext = this.min;
       
        let rot = (Math.PI * (value - this.min)) / (this.max - this.min);  
        let rotSP = (Math.PI * (sp - this.min)) / (this.max - this.min);
        let rotSPext = (Math.PI * (spext - this.min)) / (this.max - this.min);


        let colorname = this.cf(value, this.min, this.max);

        this.ctx.lineWidth = this.size / 5;
        this.ctx.clearRect(-this.size / 2.2 - (this.size / 17) - 1, -(this.size / 2) - 4, this.size + (this.size / 25) + 1, this.size / 2 + 5 + this.size / 60);
        this.ctx.strokeStyle = "#D0D0D0";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size / 3, Math.PI, 2 * Math.PI);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = colorname;
        this.ctx.arc(0, 0, this.size / 3, Math.PI, Math.PI + rot);
        this.ctx.stroke();

        this.ctx.rotate(rot);

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#a0a0a0";
        this.ctx.moveTo(-this.size / 3.3 - (this.size / 17), 0);           // Create a starting point
        this.ctx.lineTo(-this.size / 5.5, - (this.size / 40));          // Create a horizontal line
        this.ctx.lineTo(-this.size / 5.5, (this.size / 40));
        this.ctx.lineTo(-this.size / 3.3 - (this.size / 17), 0);
        this.ctx.lineWidth = 0.5;

        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.rotate(-rot);

        this.ctx.rotate(rotSP);

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#f0a0a0";
        this.ctx.moveTo(-this.size / 2.5 - (this.size / 17), - (this.size / 40));           // Create a starting point
        this.ctx.lineTo(-this.size / 3.3- (this.size / 17), 0);          // Create a horizontal line
        this.ctx.lineTo(-this.size / 2.5- (this.size / 17), (this.size / 40));
        this.ctx.lineTo(-this.size / 2.5 - (this.size / 17), - (this.size / 40));
        this.ctx.lineWidth = 0.5;

        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.rotate(-rotSP);


        this.ctx.rotate(rotSPext);
    
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#f0a0a0";
        this.ctx.moveTo(-this.size / 2.5 - (this.size / 17), - (this.size / 40));           // Create a starting point
        this.ctx.lineTo(-this.size / 3.3- (this.size / 17), 0);          // Create a horizontal line
        this.ctx.lineTo(-this.size / 2.5- (this.size / 17), (this.size / 40));
        this.ctx.lineTo(-this.size / 2.5 - (this.size / 17), - (this.size / 40));
        this.ctx.lineWidth = 0.5;

        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.rotate(-rotSPext);




        this.ctx.font = "bold " + this.size / 8 + "px Arial";
        let wi = ctx.measureText(value.toFixed(1)).width;
        let hi = this.size / 8;

        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(value.toFixed(1), - (wi / 2), 0 - 2);
        this.ctx.stroke();
        this.ctx.font = "bold " + this.size / 11 + "px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(this.title, -this.size / 2.2, -this.size * 0.47);
        this.ctx.stroke();

        this.ctx.translate(-this.x, -this.y);
        //this.ctx.restore();

    }
}


 function scdAn(text) {
    //console.log(text)
    setdomOSStreet60_64();
    apa = setCurrentDB(text)
}

function setdomOSStreet60_64() {
    var c = document.getElementById("NaviCanvas");
    c.width = screen.width*0.35;
    c.height = screen.height*0.452;


    var elm = [];
    addKlikArc(elm, 80, 183, 60, scd, 'domOSStreet 60-64');
    addKlikArc(elm, 80, 430, 60, scd, 'domOSStreet 120-124');
    var ctx2 = c.getContext("2d");

    elLeft = c.offsetLeft + c.clientLeft,
        elTop = c.offsetTop + c.clientTop,

        // Add event listener for `click` events.
        c.addEventListener('click', function (event) {
            pos = getMousePos(c, event);
            elm.forEach(function (element) {
                if (element.r > Math.sqrt((element.x - pos.x) * (element.x - pos.x) + (element.y - pos.y) * (element.y - pos.y))) {
                    element.f(element.id);

                }
            });

        }, false);


    var imageObj2 = new Image();

    imageObj2.onload = function () {

        ctx2.drawImage(imageObj2, 0, 0, c.width, c.height);
        ctx2.stroke();
        drawTextBG(ctx2, "domOSStreet", "24px Times New Roman", 15, 27)
        elm.forEach(function (element) {
            ctx2.lineWidth = 5;
            ctx2.strokeStyle = "#FF0000";
            ctx2.setLineDash([5, 6]);

            ctx2.beginPath();
            ctx2.arc(element.x, element.y, element.r, 0, 2 * Math.PI);
            ctx2.stroke();
        });

    };
    imageObj2.src = './images/domOSStreet60-64.png';
}

function setdomOSStreet() {
    var c = document.getElementById("NaviCanvas");
    c.width = screen.width*0.35;
    c.height = screen.height*0.452;

    var elm = [];
    addKlikArc(elm, 435, 173, 80, scdAn, 'domOSStreet 60-64');
    addKlikArc(elm, 390, 505, 80, scdAn, 'domOSStreet 120-124');
    var ctx2 = c.getContext("2d");

    elLeft = c.offsetLeft + c.clientLeft,
        elTop = c.offsetTop + c.clientTop,

        // Add event listener for `click` events.
        c.addEventListener('click', function (event) {
            pos = getMousePos(c, event);
            elm.forEach(function (element) {
                if (element.r > Math.sqrt((element.x - pos.x) * (element.x - pos.x) + (element.y - pos.y) * (element.y - pos.y))) {
                    element.f(element.id);

                }
            });

        }, false);


    var imageObj2 = new Image();

    imageObj2.onload = function () {

        ctx2.drawImage(imageObj2, 0, 0, c.width, c.height);
        ctx2.stroke();
        drawTextBG(ctx2, "domOSStreet", "24px Times New Roman", 15, 27)
        elm.forEach(function (element) {
            ctx2.lineWidth = 5;
            ctx2.strokeStyle = "#FF0000";
            ctx2.setLineDash([5, 6]);

            ctx2.beginPath();
            ctx2.arc(element.x, element.y, element.r, 0, 2 * Math.PI);
            ctx2.stroke();
        });

    };
    imageObj2.src = './images/domOSStreet.jpg';
}

function setEnergyRoad() {
    var c = document.getElementById("NaviCanvas");
    c.width = screen.width*0.35;
    c.height = screen.height*0.452;

    var elm = [];
    addKlikArc(elm, 160, 200, 80, scd, 'EnergyRoad2');
    addKlikArc(elm, 437, 550, 80, scd, 'EnergyRoad1');
    addKlikArc(elm, 638, 256, 80, scd, 'EnergyRoad3');
    var ctx2 = c.getContext("2d");

    elLeft = c.offsetLeft + c.clientLeft,
        elTop = c.offsetTop + c.clientTop,

        // Add event listener for `click` events.
        c.addEventListener('click', function (event) {
            pos = getMousePos(c, event);
            elm.forEach(function (element) {
                if (element.r > Math.sqrt((element.x - pos.x) * (element.x - pos.x) + (element.y - pos.y) * (element.y - pos.y))) {
                    element.f(element.id);

                }
            });

        }, false);


    var imageObj2 = new Image();

    imageObj2.onload = function () {

        ctx2.drawImage(imageObj2, 0, 0, c.width, c.height);
        ctx2.stroke();
        drawTextBG(ctx2, "EnergyRoad", "24px Times New Roman", 15, 27)
        elm.forEach(function (element) {
            ctx2.lineWidth = 5;
            ctx2.strokeStyle = "#FF0000";
            ctx2.setLineDash([5, 6]);

            ctx2.beginPath();
            ctx2.arc(element.x, element.y, element.r, 0, 2 * Math.PI);
            ctx2.stroke();
            drawTextBG(ctx2, element.id, "14px Times New Roman", element.x-element.r, element.y-element.r-25)
        });

    };
    imageObj2.src = './images/EnergyRoadSketch2.jpg';
}
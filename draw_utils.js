
function printGarph(apaid, elmid,v) {
    //setCurrentDB('EnergyRoad 1');
    if (v) setShowData(apaid, elmid);
    else rmShowData(apaid, elmid);

  // window.alert(apaid+ ' : ' + elmid + '\n\nClicked printGraph()');

}


function addKlikArc(elm, x, y, r, f,id) {
    elm.push({
        colour: '#FF0000',
        x: x,
        y: y,
        r: r,
        f: f,
        id: id
    });
}


const apartmentList = new Map();

function addDashBoard(apID, ctx, drawFunk, ani, init, data) {
    apartmentList.set(apID, {
        id: apID,
        ctx: ctx,
        dFunk: drawFunk,
        data: data,
        ani, ani,
        elm: []
    });
    init(apID);
}

let currentArp = '';

function setCurrentDB(apID) {
    currentArp = apID;
    arp = apartmentList.get(apID);
    arp.dFunk(arp.ctx, apID, arp.elm);
    console.log(" id: " + apID);
    return arp;
}

function drawAni() {
    gen_data_R13();
    gen_data_R63A();
    gen_data_R77();
    arp = apartmentList.get(currentArp);
    arp.ani(arp.id);
    ani_draw_Sim("Sim")
    //updataGraph();
}

function drawTextBG(ctx, txt, font, x, y) {

    ctx.save();
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    var width = ctx.measureText(txt).width+8;
    ctx.fillRect(x, y, width, parseInt(font, 10)+5);
    ctx.fillStyle = '#000';
    ctx.fillText(txt, x+4, y+4);
    ctx.restore();
}
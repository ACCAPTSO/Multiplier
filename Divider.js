/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// right side jumps right after last digit entered fixit not with showBorrows checked why is that?
// how many of the hidden inputs might as well be global javascript variables? fixit
// blanks for zeros looks wierd whn you're subtracting especially if you're borrowing from it fixit
var errBx = null;
var whatBoxBx = null;
//var whatbox = 0;
var posRecorded = false;
var leftPos = 0;
var rightPos = 0;
var barPosition = null;
//var boxHeight = 0;
//var boxWidth = 0;
var rightside = 0;
var bottomside = 0;
var tolerance = 15;
//var canvas = null;
//var ctx = null;
//var prevX = 0;
//var currX = 0;
//var prevY = 0;
//var currY = 0;
window.onload = function() { // does this save any time fixit
    var doc = document;
    errBx = doc.getElementById("msg");
    whatBoxBx = doc.getElementById("whatbox");
}
function mouseCoords(ev){
    var doc = document;
    var Num = Number;
    if(ev.pageX || ev.pageY){ 
	return {x:ev.pageX, y:ev.pageY}; 
    } 
    return { 
        x:Num(ev.clientX) + Num(doc.body.scrollLeft) - Num(doc.body.clientLeft), 
        y:Num(ev.clientY) + Num(doc.body.scrollTop)  - Num(doc.body.clientTop)
    }; 
}
function getPosition(e){ 
    var left = 0; 
    var top  = 0;
    var Num = Number;
    while (e.offsetParent){ 
        left += e.offsetLeft; 
        top  += e.offsetTop; 
        e     = e.offsetParent; 
    } 
    left += e.offsetLeft; 
    top  += e.offsetTop; 
    return {x:Num(left), y:Num(top)}; 
}
//function draw( e ) {
//    e = e || window.event; 
//    prevX = currX;
//    prevY = currY;
//    var mousePos = mouseCoords(e);
//    currX = mousePos.x - canvas.offsetLeft;
//    currY = mousePos.y - canvas.offsetTop;
//    ctx.beginPath();
//    ctx.moveTo(prevX, prevY);
//    ctx.lineTo(currX, currY);
//    ctx.strokeStyle = "pink";
//    ctx.lineWidth = 2;
//    ctx.stroke();
//    ctx.closePath();
//}
function recDownPos( ev ) {
    //var x = 0;
    ev = ev || window.event; 
    var mousePos = mouseCoords(ev);
    var Num = Number;
    //for( var j = 0; j < 10; j++ ) {
        //document.getElementById("statusBox" + j).innerHTML = "";
    //}
    var overbar = document.getElementById("overbar");
    var barPos = getPosition( overbar );
    var getComputedStyl = getComputedStyle;
    var tol = tolerance;
    //var lastPosition = getPosition( overbar[overbar.length-1] );
    var boxHeight = Num(getComputedStyl(overbar).height.match(/[0-9]+/));
    var boxWidth = Num(getComputedStyl(overbar).width.match(/[0-9]+/));
    rightside = barPos.x + boxWidth;
    bottomside = barPos.y + boxHeight;
    //document.getElementById("statusBox" + x).innerHTML = "in recDownPos x position = " + mousePos.x + " y position = " + mousePos.y;
    //x = x + 1;
    //document.getElementById("statusBox" + x).innerHTML = "posRecorded = " + posRecorded;
    //x = x + 1;
    //document.getElementById("statusBox" + x).innerHTML = " left side = " + barPos.x + " right side = " + rightside + " top = " + barPos.y;
    //x = x + 1;
    //alert("overbar height = " + getComputedStyle(overbar).height );
    //alert("x position = " + mousePos.x + " y position = " + mousePos.y + " left bar = " + barPos.x + " right bar = " + rightside + " top bar = " + barPos.y + " bottom bar = " + bottomside);
    if( barPos.x - tol < mousePos.x && mousePos.x < rightside + tol && barPos.y - tol < mousePos.y && mousePos.y < barPos.y + tol ) {
        if( mousePos.x < barPos.x + tol ) {
            posRecorded = true;
            leftPos = mousePos.x;
            //ctx = canvas.getContext("2d");
            //canvas.addEventListener("mousemove", function(e) { draw( e) }, false );
            //document.getElementById("statusBox" + x).innerHTML = "posRecorded = " + posRecorded + " left side = " + leftPos;
            //x = x + 1;
        } else if( rightside - tol < mousePos.x ) {
            posRecorded = true;
            rightPos = mousePos.x;
            //ctx = canvas.getContext("2d");
            //canvas.addEventListener("mousemove", function(e) { draw( e) }, false );
            //document.getElementById("statusBox" + x).innerHTML = "posRecorded = " + posRecorded + " right side = " + rightPos;
            //x = x + 1;
        //} else {
           //document.getElementById("statusBox" + x).innerHTML = "mousedown at neither right nor left end";
           //x = x + 1; 
        }
    }
    barPosition = barPos;
}
function checkEnds( ev ) {
    //var x = 10;
    ev = ev || window.event; 
    var mousePos = mouseCoords(ev);
    var doc = document;
    var barPos = barPosition;
    var tol = tolerance;
    //for( var j = 10; j < 20; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //doc.getElementById("statusBox" + x).innerHTML = "in checkEnds x position = " + mousePos.x + " y position = " + mousePos.y;
    //x = x + 1;
    //doc.getElementById("statusBox" + x).innerHTML = "posRecorded = " + posRecorded;
    //x = x + 1;
    //doc.getElementById("statusBox" + x).innerHTML = " left side = " + barPos.x + " right side = " + rightside + " top = " + barPos.y;
    //x = x + 1;
    if( posRecorded &&
            barPos.x - tol < mousePos.x && mousePos.x < rightside + tol && 
            barPos.y - tol < mousePos.y && mousePos.y < barPos.y + tol ) {
        //doc.getElementById("statusBox" + x).innerHTML = "mouseup inside bar leftPos = " + leftPos + " rightPos = " + rightPos;
        //x = x + 1;
        if(( leftPos > 0 && rightside - tol < mousePos.x ) ||
                ( rightPos > 0 && mousePos.x < barPos.x + tol )) {
            doc.getElementById("overbar").style.backgroundColor = "black";
            var displayRec = doc.getElementById("dispRec");
            displayRec.style.color = getComputedStyle(displayRec).backgroundColor;
            var quotDigs = Number(doc.getElementById("quotDigs").value);
            for (var i = quotDigs - 1; i >= 0; --i) {
                doc.getElementById("qt" + i).style.color = "black";
            }
        }
    }
    posRecorded = false;
}
//window.onload = readSettings;
function enableBar() {
    var doc = document;
    var difflvl = null;
    if (doc.getElementById("Recurring Decimals").checked) {
        difflvl = doc.getElementById("Recurring Decimals").value;
        if( difflvl === "Recurring Decimals" ) { 
            doc.onmousedown = recDownPos;
            doc.onmouseup   = checkEnds;
            doc.getElementById("dispRec").style.color = "red";
        }       
    }
}
function checkRemainder(col, expectedRemainder) {
    var doc = document;
    //for( var j = 0; j < 18; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;

    var ansBx = doc.getElementById("r" + col);
    var ans = Num(ansBx.value);

    var whatRow = Num(doc.getElementById("rowNo").value) - 1;
    var bdBxs = doc.getElementsByName("bd" + whatRow);
    var bdlength = Num(doc.getElementById("bringdown" + whatRow).value);
    var subBxs = doc.getElementsByName("op" + whatRow + "_1");
    var subBxsLength = subBxs.length;
    var whatIdx = 0;
    var hintBx = null;
    if (bdlength > 0) {
        if (col < bdlength) {
            whatIdx = bdlength - 1 - col;
            hintBx = bdBxs[whatIdx];
            //doc.getElementById("statusBox" + x).innerHTML = "bringdown box col = " + col + " bdlength = " + bdlength + " whatIdx = " + whatIdx;
            //x = x + 1;
        } else {
            whatIdx = subBxsLength + bdlength - 1 - col;
            hintBx = subBxs[whatIdx];
            //doc.getElementById("statusBox" + x).innerHTML = "subtraction box col = " + col + " bdlength = " + bdlength + " subBxsLength = " + subBxsLength + " whatIdx = " + whatIdx;
            //x = x + 1;
        }
    } else {
        whatIdx = subBxsLength - 1 - col;
        hintBx = subBxs[whatIdx];
        //doc.getElementById("statusBox" + x).innerHTML = "subtraction boxes only col = " + col + " bdlength = " + bdlength + " whatIdx = " + whatIdx;
        //x = x + 1;
    }
    if (ans === expectedRemainder) {
        hintBx.style.color = "black";
        ansBx.style.color = "black";
        errBx.innerHTML = "";
        var nextbox = 0;
        if (col > 0) {
            var bdx = Num(doc.getElementById("bdx").value) + 1;
            doc.getElementById("bdx").value = bdx;
            nextbox = Num(whatBoxBx.value) + 1;
        } else {
            //var whatRow = Num(doc.getElementById("rowNo").value) - 1;
            //doc.getElementById("statusBox0").innerHTML = "lastBoxOfCurrRow = " + doc.getElementById("lastBoxOfCurrRow").value + " whatRow = " + whatRow + " whatRow.length = " + doc.getElementsByName("bd" + whatRow).length;
            var bdlength = doc.getElementsByName("bd" + whatRow).length;
            var offTheTable = bdlength > 0 ? bdlength : 1;
            nextbox =
                    Num(doc.getElementById("lastBoxOfCurrRow").value) +
                    offTheTable;            
        }
        whatBoxBx.value = nextbox;
        var quotDigs = Num(doc.getElementById("quotDigs").value);
        for (var i = quotDigs - 1; i >= 0; --i) {
            doc.getElementById("qt" + i).style.color = "black";
        }
    } else {
        hintBx.style.color = "red";
        ansBx.style.color = "red";
        //errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}
function showQuotDigs( ev ) {
    ev = ev || window.event;
    //ev.stopPropagation();
    var evTarg = ev.target;
    if( evTarg.toString().match( /HTMLSpanElement/ ) ) {
        evTarg = evTarg.offsetParent;
    }
    var id = evTarg.getAttribute("id");
    if( id ) {
        var doc = document;
        //for( var j = 0; j < 18; j++ ) {
            //doc.getElementById("statusBox" + j).innerHTML = "";
        //}
        //var x = 0;
        //var errBx = doc.getElementById("msg");
        var Num = Number;
        var clickmsg = "quotient doesn't start there, click somewhere else";
        var decsNotSettled = 0;
        var whatDecs = doc.getElementsByName("decsettled");
        var whatDecsLength = whatDecs.length;
        //doc.getElementById("statusBox" + x).innerHTML = "event target = " + ev.target;
        //x = x + 1;

        var idlen = id.length;
        var col = Num((id.substring(2,idlen)));

    
        //doc.getElementById("statusBox" + x).innerHTML = "id = " + id + " idlen = " + idlen + " col = " + col;
        //x = x + 1;

        if (whatDecsLength > 0) {
            for (var i = 0; i < whatDecsLength; ++i) {
                if (whatDecs[i].value === "false") {
                    decsNotSettled += 1;
                }
            }
        }
        //doc.getElementById("statusBox" + x).innerHTML = "in showQuotDigs decsNotSettled = " + decsNotSettled;
        //x = x + 1;
        if (decsNotSettled === 0) {

            var quotDigs = Num(doc.getElementById("quotDigs").value);
            var lastcol = quotDigs - 1;
            //doc.getElementById("statusBox" + x).innerHTML = "in showQuotDigs col = " + col + " lastcol = " + lastcol + " target = " + ev.target + " value = " + ev.target.getAttribute("value");
            //x = x + 1;
            if (col === lastcol) {
                var i = quotDigs - 1;
                doc.getElementById("qt" + i).type = "text";
                //var errBx = doc.getElementById("msg");
                errBx.innerHTML = "";
                var quotTd = doc.getElementsByName("quotTd");
                var length = quotTd.length;
                for( var i = 0; i < length; i++ ) {
                    //quotdigs[i].removeEventListener("click", showQuotDigs, false );
                    quotTd[i].onclick = setFocus;
                }
                var notQuotDigits = doc.getElementsByName("notthestartdig");
                var length = notQuotDigits.length;
                for (var i = 0; i < length; ++i) {
                    if (notQuotDigits[i].nodeType === 1) {
                        //notQuotDigits[i].removeEventListener("click", sayNotThere, true );
                        notQuotDigits[i].onclick = setFocus;
                    }
                }
                // make all the decimal points run setFocus as well           
                var Dp = doc.getElementsByName("quotDp");
                length = Dp.length;
                for( var i = 0; i < length; ++i ) {
                    Dp[i].onclick = setFocus;
                }
                var Dp = doc.getElementsByName("dvsrDp");
                length = Dp.length;
                for( var i = 0; i < length; ++i ) {
                    Dp[i].onclick = setFocus;

                }
                var Dp = doc.getElementsByName("dvdDp");
                length = Dp.length;
                for( var i = 0; i < length; ++i ) {
                    Dp[i].onclick = setFocus;
                }
                var dvdDigs = doc.getElementsByName("dvddigs");
                length = dvdDigs.length;
                for (var i = 0; i < length; ++i) {
                    dvdDigs[i].onclick = promptDivBorrow;
                }
                var dispRnd = doc.getElementById("dispRnd");
                if( dispRnd ) {
                    dispRnd.style.color = "black";
                }
                //doc.getElementById("statusBox" + x).innerHTML = "about to setFocus";
                //x = x + 1;
                setFocus();
            } else {
                errBx.innerHTML = clickmsg;
                //errBx.innerHTML = "col = " + col + " lastcol = " + lastcol;
                //doc.getElementById("statusBox" + x).innerHTML = "about to upDateErrCount";
                //x = x + 1;
                upDateErrCount();
            }
        }
    }
}
function checkMcarry(col, sbx) {
    var doc = document;
    //for( var j = 0; j < 18; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;
    var ansBx = doc.getElementById("cm" + col + "_" + sbx);
    var prevBx = null;
    var nextbox = Num(whatBoxBx.value);
    if (col > 0) {
        var prevCol = col - 1;
        prevBx = doc.getElementById("cm" + prevCol + "_" + sbx);
    }
    var ans = ansBx.value;
    //var errBx = doc.getElementById("msg");
    var mcarry = 0;
    var quotDigs = Num(doc.getElementById("quotDigs").value);
    var qLength = doc.getElementsByName("quotdigs").length;

    var qdigit = new Array();
    var possBx = new Array();
    // find the quotient digits that will generate carries
    for (var i = quotDigs - 1, j = 0; i >= 0; i--, j++) {
        possBx[j] = doc.getElementById("qt" + i);
        if( possBx[j] ) {
            qdigit[j] = Num(possBx[j].value);
        }
    }

    var dvsrdigs = doc.getElementsByName("dvsrdigs");
    for (var i = 0; i <= col; i++) {
        var whatdvsrDig = dvsrdigs.length - 1 - i;
        var dvsrDig = dvsrdigs[whatdvsrDig].childNodes[0].nodeValue;
        mcarry += Num(dvsrDig) * qdigit[sbx];
        mcarry = Math.floor(mcarry / 10);
    }
    if (ans == mcarry) {
        ansBx.style.color = "black";
        dvsrdigs[dvsrdigs.length - 1 - col].style.color = "black";
        if (prevBx) {
            prevBx.style.color = "black";
        }
        possBx[sbx].style.color = "black";
        errBx.innerHTML = "";
        nextbox = doc.getElementsByClassName("c2").length;
        //doc.getElementById("statusBox" + x).innerHTML = "skip mcarry boxes nextbox = " + nextbox;
        //x = x + 1;
        // skip quotient boxes
        nextbox += qLength;
        //doc.getElementById("statusBox" + x).innerHTML = "skip quotient boxes nextbox = " + nextbox;
        //x = x + 1;
        // skip remainder boxes
        nextbox += doc.getElementsByName("rmdr").length;
        //doc.getElementById("statusBox" + x).innerHTML = "skip remainder boxes nextbox = " + nextbox;
        //x = x + 1;
        // skip borrow and carry boxes for original dividend
        nextbox += doc.getElementsByName("boca0").length;
        //doc.getElementById("statusBox" + x).innerHTML = "skip orig dividend borrow and carry boxes nextbox = " + nextbox;
        //x = x + 1;
        // needs every row of operands, borrows and carries
        var whatRow = Num(doc.getElementById("rowNo").value);
        for (var i = 0; i < whatRow; i++) {
            var cid = doc.getElementsByName("op" + i + "_0").length;
            nextbox += cid; // product digit boxes
            //doc.getElementById("statusBox" + x).innerHTML = "skip row " + i + " prod nextbox = " + nextbox;
            //x = x + 1;
            var nexti = i + 1;
            nextbox += doc.getElementsByName("boca" + nexti).length; // borrows and carries
            //doc.getElementById("statusBox" + x).innerHTML = "skip row " + nexti + " borrows and carries nextbox = " + nextbox;
            //x = x + 1;
            cid = doc.getElementsByName("op" + i + "_1").length;
            cid += doc.getElementsByName("bd" + i).length;
            nextbox += cid; // dividend boxes
            //doc.getElementById("statusBox" + x).innerHTML = "skip row " + i + " dividend nextbox = " + nextbox;
            //x = x + 1;
        }
        nextbox += doc.getElementsByName("op" + i + "_0").length;
        //doc.getElementById("statusBox" + x).innerHTML = "skip row " + i + " prod nextbox = " + nextbox;
        //x = x + 1;
        nextbox -= col + 2;
        //doc.getElementById("statusBox" + x).innerHTML = "back off prod digits already done nextbox = " + whatBoxBx.value;
        //x = x + 1;
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;

        //whatbox = nextbox;
        whatBoxBx.value = nextbox;

    } else {
        dvsrdigs[dvsrdigs.length - 1 - col].style.color = "red";
        if (prevBx) {
            prevBx.style.color = "red";
        }
        possBx[sbx].style.color = "red";
        //errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}

function divide(immFeedBkCk, col, qtDig) {
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;
    if (col === 0) {
        doc.getElementById("noMorQuotDigs").value = "true";
    }
    var whatRow = Num(doc.getElementById("rowNo").value);
    var prevRow = whatRow - 1;
    //var errBx = doc.getElementById("msg");
    errBx.innerHTML = "";
    var divisor = Num(doc.getElementById("divisor").value);
    var ansBx = doc.getElementById("qt" + col);
    var ansTxt = "";
    ansTxt = ansBx.value;
    //doc.getElementById("statusBox" + x).innerHTML = "ansTxt = " + ansTxt + " id = " + event.target.id;
    //x = x + 1;
    
    if( isNaN( ansTxt ) ) {
        //errBx.innerHTML = "not " + ansTxt;
        upDateErrCount();
        setFocus();
        return;
    }
    var ans = Num(ansTxt);
    // calculate and store the product  and of this quotient digit and divisor
    // as well as the max digit of that product
    var prod = 0;
    var dvsrdigs = doc.getElementsByName("dvsrdigs");
    var dvsrdigslength = dvsrdigs.length;
    for (var i = 0; i < dvsrdigslength; ++i) {
        dvsrdigs[i].style.color = "black";
    }

    var qLength = doc.getElementsByName("quotdigs").length;
    var quotDigs = Number(doc.getElementById("quotDigs").value);
    var nextQuotBox = doc.getElementsByClassName("c2").length + qLength - col;
    doc.getElementById("nextQuotBox").value = nextQuotBox;
    
    var rmdrDigs = doc.getElementsByName("rmdr").length;
    var mcarry = 0;
    var i = 0;
    var carryRow = quotDigs - 1 - col;
    var Mat = Math;
    for (; i < dvsrdigslength; i++) {
        var dbx = dvsrdigslength - 1 - i;
        var addProd = Num(dvsrdigs[dbx].childNodes[0].nodeValue) * ans + mcarry;
        mcarry = Mat.floor(addProd / 10);
        var mDig = addProd % 10;
        if( dbx > 0 && i < dvsrdigslength - 1 ) {
            var whatMcarry = doc.getElementById("hcm" + i + "_" + carryRow);
            if( whatMcarry ) {
                whatMcarry.value = mcarry;
            }
        }
        prod += Mat.pow(10, i) * mDig;
        //alert("i = " + i + " prodBxs[" + pbx + "] = " + prodBxs[pbx].value + " prod = " + prod );
    }
    prod += Mat.pow(10, i) * mcarry;
    var prodMxIdx = prod > 0 ? Mat.floor(Mat.log10(prod)) : 1;
    doc.getElementById("calcDig" + whatRow + "_0").value = prodMxIdx;
    doc.getElementById("operand" + whatRow + "_0").value = prod;

    var dvdnd = 0;
    var dvdBxs = doc.getElementsByName("dvddigs");
    for (var i = 0; i < dvdBxs.length; ++i) {
        if (dvdBxs[i].style.color === "red") {
            dvdBxs[i].style.color = "black";
        }
    }
    var restQAreZero = true;
    // this may not work in some cases where user has entered wrong qdigit fixit
    var quotient = Num(doc.getElementById("quotient").value);
    for (var i = 0; i < col; i++) {
        var ten2i = Mat.pow(10, i);
        var discard = quotient % ten2i;
        var qdigI = (quotient % Mat.pow(10, i + 1) - discard) / ten2i;
        //doc.getElementById("statusBox" + x).innerHTML = "qDig[" + i + "] = " + qdigI;
        //x = x + 1;
        if (qdigI !== 0) {
            restQAreZero = false;
        }
    }

    var pow = 0;
    var dvdDigVal = 0;
    var prodDigVal = 0;
    var discard = 0;
    var mainpart = 0;
    var caCol = 0;
    var whatCarry = "";
    var caBx = null;
    var borCol = 0;
    var whatBorBx = "";
    var borBx = null;

    //var carries = new Array();
    //var borrows = new Array();
    if (whatRow === 0) {
        var i = dvdBxs.length - qLength;
        var leadzeros = 0;
        // add leading zeros
        for (var msQdig = qLength - 1; msQdig > col; --msQdig) {
            var qBx = doc.getElementById("qt" + msQdig);
            if ( qBx && Num(qBx.value) === 0 ) {
                ++i;
                ++leadzeros;
            } else if ( !qBx ) {
                ++i;
            } else {
                break;
            }
        }
        //doc.getElementById("statusBox" + x).innerHTML = "dvdBxs.length = " + dvdBxs.length + " quotDigs = " + quotDigs + " i = " + i;
        //x = x + 1;
        //var quotient = Num(doc.getElementById("quotient").value);
        //var intQuotDigs = 1 + Mat.floor(Mat.log10(quotient));
        //var leadzeros = quotDigs - intQuotDigs;
       //doc.getElementById("statusBox" + x).innerHTML = "quotient = " + quotient + " intQuotDigs = " + intQuotDigs + " leadzeros = " + leadzeros;
        //x = x + 1;
        while (i >= 0) {
            dvdDigVal = Num(dvdBxs[i].childNodes[0].nodeValue);
            var ten2pow = Mat.pow(10, pow);
            dvdnd += ten2pow * dvdDigVal;
            //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", i = " + i + ", dvdnd = " + dvdnd;
            //x = x + 1;
            // if there was a borrow, decrement dvdDigVal
            if (pow > 0) {
                caCol = pow + quotDigs - 2 - leadzeros;
                whatCarry = "hca" + caCol + "_" + whatRow;
                //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1;
                caBx = doc.getElementById(whatCarry);
                borCol = caCol + 1;
                whatBorBx = "hbo" + borCol + "_" + whatRow;
                borBx = doc.getElementById(whatBorBx);
                if (borBx && caBx) {
                    if (Num(caBx.value) === 1) {
                        --dvdDigVal;
                        // store the new borrowed value
                        borBx.value = dvdDigVal;
                        //doc.getElementById("statusBox" + x).innerHTML = "storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        borBx.value = "-2";
                    }
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Mat.pow(10, pow + 1);
            prodDigVal = (mainpart - discard) / ten2pow;
            //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + " dvdDigVal = " + dvdDigVal + " prodDigVal = " + prodDigVal;
            //x = x + 1;
            caCol = pow + quotDigs - 1 - leadzeros;
            whatCarry = "hca" + caCol + "_" + whatRow;
            caBx = doc.getElementById(whatCarry);
            if (caBx) {
                if (dvdDigVal < prodDigVal) { // this digit has a carry
                    caBx.value = 1;
                    //doc.getElementById("statusBox" + x).innerHTML = "storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    caBx.value = 0;
                }
            }
            --i;
            ++pow;
        }
    } else {
        var whatDvdBxs = "op" + prevRow + "_1";
        dvdBxs = doc.getElementsByName(whatDvdBxs);
        for (var i = 0; i < dvdBxs.length; ++i) {
            dvdBxs[i].style.color = "black";
        }
        var bdBxs = doc.getElementsByName("bd" + prevRow);
        for (var i = 0; i < bdBxs.length; ++i) {
            bdBxs[i].style.color = "black";
        }
        var whatCalcDig = "calcDig" + prevRow + "_1";
        var calcDig = Num(doc.getElementById(whatCalcDig).value);
        var whatBringDown = "bringdown" + prevRow;
        var bringdown = Num(doc.getElementById(whatBringDown).value);

        //var maxp = 1 + dvdBxs.length + bringdown;
        var maxp = dvdBxs.length + bringdown;
        //doc.getElementById("statusBox" + x).innerHTML = "whatDvdBxs = " + whatDvdBxs + " dvdBxs.length = " + dvdBxs.length + " whatRow = " + whatRow + ", pow = " + pow + " maxp = "  + maxp + " calcDig = " + calcDig + " bringdown = " + bringdown + " whatCalcDig = " + whatCalcDig + " whatBringDown = " + whatBringDown;
        //x = x + 1;
        while (pow < maxp) {
            if (pow < bringdown) {
                dvdDigVal = Num(bdBxs[bringdown - 1 - pow].value);
                //doc.getElementById("statusBox" + x).innerHTML = "pow = " + pow + "bringdown = " + bringdown + " dvdDigVal = " + dvdDigVal;
                //x = x + 1;
            } else {
                var dvdidx = maxp - 1 - pow;
                var whatDvdBx = dvdBxs[dvdidx];
                //doc.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " dvdidx = " + dvdidx + " whatDvdBx = " + whatDvdBx;
                //x = x + 1;
                if (whatDvdBx != null) {
                    dvdDigVal = Num(whatDvdBx.value);
                }
            }

            var ten2pow = Mat.pow(10, pow);
            dvdnd += ten2pow * dvdDigVal;
            //doc.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " dvdDigVal = " + dvdDigVal + " dividend = " + dvdnd;
            //x = x + 1;
            // if there was a borrow, decrement dvdDigVal
            if (pow > 0) {
                caCol = pow + doc.getElementsByName('boca' + whatRow).length / 2 - dvdBxs.length - bringdown;
                whatCarry = "hca" + caCol + "_" + whatRow;
                caBx = doc.getElementById(whatCarry);
                //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1
                borCol = caCol + 1;
                whatBorBx = "hbo" + borCol + "_" + whatRow;
                borBx = doc.getElementById(whatBorBx);
                if (borBx && caBx) {
                    if (Num(caBx.value) === 1) {
                        --dvdDigVal;
                        // store the new borrowed value
                        borBx.value = dvdDigVal;
                        //doc.getElementById("statusBox" + x).innerHTML = " pow = " + pow + " storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        borBx.value = "-2";
                    }
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Mat.pow(10, pow + 1);
            prodDigVal = (mainpart - discard) / ten2pow;
            //doc.getElementById("statusBox" + x).innerHTML = "mainpart = " + mainpart + " discard = " + discard + " prodDigVal = " + prodDigVal;
            //x = x + 1;
            caCol = pow + 1;
            //doc.getElementById("statusBox" + x).innerHTML = " pow = " + pow + " caCol = " + caCol;
            //x = x + 1;
            caCol += doc.getElementsByName("boca" + whatRow).length / 2;
            //doc.getElementById("statusBox" + x).innerHTML = "plus boca length/2 caCol = " + caCol;
            //x = x + 1;
            caCol -= dvdBxs.length;
            //doc.getElementById("statusBox" + x).innerHTML = "minus DvdBxs.length caCol = " + caCol;
            //x = x + 1;
            caCol -= bringdown;
            //doc.getElementById("statusBox" + x).innerHTML = "minus bringdown caCol = " + caCol;
            //x = x + 1;
            whatCarry = "hca" + caCol + "_" + whatRow;
            caBx = doc.getElementById(whatCarry);
            //doc.getElementById("statusBox" + x).innerHTML = "whatCarry " + whatCarry + " caBx = " + caBx;
            //x = x + 1;
            if (caBx) {
                if (dvdDigVal < prodDigVal) {// this digit has a carry
                    caBx.value = 1;
                    //doc.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    caBx.value = 0;
                }
            }
            ++pow;
        }
    }
    if (dvdnd < divisor && ans !== 0) {
        errBx.innerHTML = divisor + " does not go into " + dvdnd;
        upDateErrCount();
        setFocus();
        return;
    } else if (dvdnd >= divisor && ans === 0) {
        errBx.innerHTML = divisor + " goes into " + dvdnd + " at least once";
        upDateErrCount();
        setFocus();
        return;
    }

    var diff = dvdnd - prod;
    var diffMxIdx = diff > 0 ? Mat.floor(Mat.log10(diff)) : 0;
    doc.getElementById("calcDig" + whatRow + "_1").value = diffMxIdx;
    doc.getElementById("operand" + whatRow + "_1").value = diff;

    var origDvdDigs = doc.getElementsByName("dvddigs");
    var bddigs = null
    var bddigsLength = 0;
    if (whatRow == 0) {
        dvddigs = origDvdDigs;
    } else {
        prevRow = whatRow - 1;
        dvddigs = doc.getElementsByName("op" + prevRow + '_1');
        bddigs = doc.getElementsByName("bd" + prevRow);
        bddigsLength = bddigs.length;
    }
    var stop = dvddigs.length;
    if (whatRow == 0) {
        stop = stop + 1 - quotDigs;
    }
    var time2increment = true;
    if (immFeedBkCk) {
        var dvddigs;
        var prevRow = null;
        if (whatRow > 0) {
            var prevRow = whatRow - 1;
        }
        if (ans === qtDig) {
            //alert("correct answer is " + ans );
            ansBx.style.color = "black";
            // turn divisor and either dividend or most recent difference black
            for (var i = 0; i < dvddigs.length; i++) {
                dvddigs[i].style.color = "black";
            }
            if (bddigs) {
                for (var i = 0; i < bddigsLength; i++) {
                    bddigs[i].style.color = "black";
                    //alert("bddigs[" + i + "].type = " + bddigs[i].type);
                    if (bddigs[i].type === "hidden") {
                        //alert("bddigs[" + i + "].type = " + bddigs[i].type + " now I'm going to break");
                        break;
                    }
                }
            }
            for (var i = 0; i < dvsrdigs.length; i++) {
                dvsrdigs[i].style.color = "black";
            }
        } else {
            // make divisor and either dividend or most recent difference red
            for (var i = 0; i < stop; i++) {
                dvddigs[i].style.color = "red";
            }
            if (bddigs) {
                for (var i = 0; i < bddigsLength; i++) {
                    bddigs[i].style.color = "red";
                }
            }
            for (var i = 0; i < dvsrdigs.length; i++) {
                dvsrdigs[i].style.color = "red";
            }
            //errBx.innerHTML = "not " + ans;
            time2increment = false;
        }

    }
    if (time2increment) {
        var nextbox = Num(whatBoxBx.value);
        if (ans === 0) {
            ansBx.style.color = "black"; // it's already been checked
            if (doc.getElementById("Round Off").checked) {
                ansBx.onclick = roundOff;
                ansBx.onkeyup = checkRoundOff;
            }
            var isRemainder = doc.getElementById("r0");
            // find the last opX_1 in the page
            var nextrow = doc.getElementsByName("op" + 0 + "_1");
            var lastrow = null;
            var lastRowNum = 0;
            for (var j = 1; ; ++j) {
                var lastrow = nextrow;
                nextrow = doc.getElementsByName("op" + j + "_1");
                lastRowNum = j;
                if (nextrow.length === 0) {
                    break;
                }
            }
            var lastRowLength = lastrow.length;
            var lastRowValue = lastrow[lastRowLength - 1].value
            //doc.getElementById("statusBox" + x).innerHTML =  "lastRowNum = " + lastRowNum + " lastRowLength = " + lastRowLength + " last row least sig dig = " + lastRowValue;
            //x = x + 1;
            var remainder = Num.MAX_SAFE_INTEGER;
            if( lastRowValue ) {
                remainder = 0;
                var bdNum = lastRowNum - 1;
                var bringDownDigits = doc.getElementsByName("bd" + bdNum);
                var bdLength = bringDownDigits.length;
                //doc.getElementById("statusBox" + x).innerHTML =  "bringDownDigits = " + bringDownDigits + " bdLength = " + bdLength;
                //x = x + 1;
                var j = 0;
                for( var i = 0; i < bdLength; ++i ) {
                    var bdValue = bringDownDigits[bdLength-1-i].value;
                    if( bdValue ) { // don't count it unless it's filled in 
                        remainder += Num(bdValue)*Mat.pow(10,j);
                        ++j;
                    }
                    //doc.getElementById("statusBox" + x).innerHTML =  " bringdown i = " + i + " remainder = " + remainder;
                    //x = x + 1;
                }
                //doc.getElementById("statusBox" + x).innerHTML =  "between loops lastRowNum = " + lastRowNum + " lastRowLength = " + lastRowLength + " last row least sig dig = " + lastRowValue;
                //x = x + 1;
                for( var i = 0; i < lastRowLength; ++i ) {
                    remainder += Num(lastrow[lastRowLength-1-i].value)*Mat.pow(10,j);
                    ++j;
                    //doc.getElementById("statusBox" + x).innerHTML =  "diff i = " + i + " remainder = " + remainder;
                    //x = x + 1;
                }
            }
            if (col == 0 && isRemainder) { 
            //if (restQAreZero && remainder !== 0) {
                doc.getElementById("dispR").style.color = "black";
                nextbox = nextbox + 1;
            // whatRow === 0 => 0.x
            //} else if ((restQAreZero && !isRemainder) || whatRow === 0) { 
            } else if ((restQAreZero && remainder === 0) || whatRow === 0) { 
                ansBx.style.color = "black";
                if (col > 0) {
                    // skip multiplicative carries
                    nextbox = doc.getElementsByClassName("c2").length;
                    //doc.getElementById("statusBox" + x).innerHTML = "multiplicative carries nextbox = " + nextbox;
                    //x = x + 1;
                    var i = qLength - col;
                    nextbox += i;
                    //doc.getElementById("statusBox" + x).innerHTML = "quotient digit nextbox = " + nextbox;
                    //x = x + 1;

                } else {
                    var bdlength = doc.getElementsByName("bd" + whatRow).length;
                    var offTheTable = bdlength > 0 ? bdlength : 1;
                    nextbox =
                        Num(doc.getElementById("lastBoxOfCurrRow").value) +
                            offTheTable;
                }
            } else {
                nextbox = Num(doc.getElementById("lastBoxOfCurrRow").value);
                //doc.getElementById("statusBox" + x).innerHTML = "last Box Of Current row nextbox = " + nextbox;
                //x = x + 1;
                if (nextbox === 0) {
                    // skip multiplicative carries
                    nextbox = doc.getElementsByClassName("c2").length - 1;
                    // skip quotient boxes
                    nextbox += qLength;
                    //doc.getElementById("statusBox" + x).innerHTML = "skip quotdigs and mcarries nextbox = " + nextbox;
                    //x = x + 1;
                    // skip remainder boxes
                    nextbox += rmdrDigs;
                    //doc.getElementById("statusBox" + x).innerHTML =  "remainder boxes nextbox = " + nextbox;
                    //x = x + 1; 
                    // skip borrow and carry boxes for original dividend
                    nextbox += doc.getElementsByName("boca0").length;
                    //doc.getElementById("statusBox" + x).innerHTML =  "skip borrows and carries nextbox = " + nextbox;
                    //x = x + 1;                
                }
                nextbox += 1;
                //doc.getElementById("statusBox" + x).innerHTML = "ans = 0, restQAreZero = false or col = 0, nextbox = " + nextbox;
                //x = x + 1;
            }
        } else { // start multiplying
            // clear out any previous guesses
            var name = 'op' + whatRow + '_0';
            var visibleMrow = doc.getElementsByName(name);
            for (var i = 0; i < visibleMrow.length; i++) {
                visibleMrow[i].value = "";
            }
            name = 'op' + whatRow + '_1';
            var Drow = doc.getElementsByName(name);
            for (var i = 0; i < Drow.length; i++) {
                Drow[i].value = "";
            }
            name = 'boca' + whatRow;
            var BoCaRow = doc.getElementsByName(name);
            for (var i = 0; i < BoCaRow.length; i++) {
                BoCaRow[i].value = "";
                BoCaRow[i].style.removeProperty("text-decoration");
            }
            if (whatRow === 0) {
                var prevDrow = doc.getElementsByName("dvddigs");
                var leadzeros = true;
                for (var i = 0; i < prevDrow.length; i++) {
                    if( !(leadzeros && Num(prevDrow[i].childNodes[0].nodeValue) === 0) ) {
                        prevDrow[i].style.removeProperty("text-decoration");
                        leadzeros = false;
                    }
                }
            } else {
                name = 'op' + prevRow + '_1';
                var prevDrow = doc.getElementsByName(name);
                for (var i = 0; i < prevDrow.length; i++) {
                    prevDrow[i].style.removeProperty("text-decoration");
                }
            }
            var allcarries = doc.getElementsByClassName("c2");
            var allcarriesLength = allcarries.length;
            for (var i = 0; i < allcarriesLength; ++i) {
                if (Num(allcarries[i].name.substring(4, 5)) === carryRow &&
                        allcarries[i].name.substring(0, 2) === "cm") {
                    allcarries[i].value = "";
                }
            }
            nextbox = Num(doc.getElementById("lastBoxOfCurrRow").value);
            //doc.getElementById("statusBox" + x).innerHTML = "ans != 0, lastBoxOfCurrentRow, nextbox = " + nextbox + " whatvisibleMrow = " + name + " visibleMrow.length = " + visibleMrow.length;
            //x = x + 1;
            if (nextbox === 0) {
                // skip multiplicative carries
                nextbox = doc.getElementsByClassName("c2").length - 1;
                //doc.getElementById("statusBox" + x).innerHTML = "multiplicative carries nextbox = " + nextbox;
                //x = x + 1;
                // skip quotient boxes
                nextbox += qLength;
                //doc.getElementById("statusBox" + x).innerHTML = "skip quotdigs and mcarries nextbox = " + nextbox;
                //x = x + 1;
                // skip remainder boxes
                nextbox += rmdrDigs;
                // skip borrow and carry boxes for original dividend
                nextbox += doc.getElementsByName("boca" + whatRow).length;
                //doc.getElementById("statusBox" + x).innerHTML = "skip qd, mc and borrows and carries nextbox = " + nextbox;
                //x = x + 1;
            } else {
                while (doc.getElementById("th-id2").elements[nextbox].name.substring(0, 2) === 'bd') {
                    nextbox += 1;
                    //doc.getElementById("statusBox" + x).innerHTML = "bringdown box nextbox = " + nextbox;
                    //x = x + 1;
                }
                nextbox -= 1;
            }
            // skip current product
            //nextbox += prodMxIdx + 1;
            nextbox += visibleMrow.length;
            //doc.getElementById("statusBox" + x).innerHTML = "skip current prod nextbox = " + nextbox;
            //x = x + 1;

            doc.getElementById("lastBoxOfCurrRow").value = nextbox;
            //doc.getElementById("statusBox" + x).innerHTML = "ans != 0, nextbox = " + nextbox;
            //x = x + 1;
        }
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;

        //doc.getElementById("statusBox" + x).innerHTML = "final nextbox = " + nextbox;
        whatBoxBx.value = nextbox;
    }
    if( Num(doc.getElementById("quotDp").value) - 2 ===  col ) {
        enableBar();
    }
    //alert("done with divide");
    setFocus();
}

function multiply( col, whatRow ) {
    // if msd of divisor is 0, don't go to mcarry box fixit
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;
    var ansBxs = doc.getElementsByName("op" + whatRow + "_0");
    var ansLength = ansBxs.length;
    var bxNo = ansLength - 1 - col;
    //doc.getElementById("statusBox" + x).innerHTML = "in multiply, bxNo = " + bxNo;
    //x = x + 1;
    var ans = Num(ansBxs[bxNo].value);
    //var errBx = doc.getElementById("msg");
    // how many quotient digits
    var quotDigs = Num(doc.getElementById("quotDigs").value);
    var dec = whatRow;

    var nextRow = whatRow + 1;
    //doc.getElementById("statusBox" + x).innerHTML = "in multiply whatRow = " + whatRow;
    //x = x + 1;
    for (var prevrow = whatRow - 1; prevrow >= 0; prevrow--) {
        var whatBringDowns = "bringdown" + prevrow;
        var bringDowns = Num(doc.getElementById(whatBringDowns).value);
        //doc.getElementById("statusBox" + x).innerHTML = "prevrow = " + prevrow + " whatBringDowns = " + whatBringDowns + " bringDowns = " + bringDowns;
        //x = x + 1;
        if (bringDowns > 0) {
            dec += bringDowns - 1;
            //doc.getElementById("statusBox" + x).innerHTML = "prevrow = " + prevrow + " bringDowns = " + bringDowns + " dec = " + dec;
            //x = x + 1;
        }
    }
    // actual quotient digits do we need both quotDigs and quotdigs? fixit
    // if number has trailing 0s q index needs to be offset by more
    var quotdigs = doc.getElementsByName("quotdigs");
    var qx = 0;
    if( quotdigs[qx].getAttribute("id").substr(0,2) === "xt" ) {
        ++qx;
    }
    var qLength = quotdigs.length;
    while( Num(quotdigs[qx].value) === 0 && qx < qLength ) {
        dec += 1;
        qx += 1;
    }
    var qdx = quotDigs - 1 - dec; // not neccessarily whatRow if there was more than 1 bringdowns
    var qBx = doc.getElementById("qt" + qdx);
    //var qtDig = Num(qBx.value);
    var dvsrdigs = doc.getElementsByName("dvsrdigs");
    var dvsrLength = dvsrdigs.length;
    var whatDvsrDg = dvsrLength - 1 - col;
    if (whatDvsrDg < 0) { // most significant 2 digits of product may both
        whatDvsrDg = 0;   // depend on the most significant digit of divisor
    }

    var prod = Num(doc.getElementById("operand" + whatRow + "_0").value);
    var Mat = Math;
    var ten2col = Mat.pow(10, col);
    var discard = prod % ten2col;
    var mainpart = prod % Mat.pow(10, col + 1);

    //doc.getElementById("statusBox2").innerHTML = "prod = " + prod + " mainpart = " + mainpart + " discard = " + discard;
    var expAns = (mainpart - discard) / ten2col;

    var prevcaBx = null;
    var cmx = 0;
    var startquot = quotDigs - 1;

    for (var i = startquot; i > qdx; i--) {
        cmx = cmx + 1;
    }

    var showMcarriesChkd = doc.getElementsByName("showmcarries")[0].checked;
    var isLastMult = (col === Num(doc.getElementById("calcDig" + whatRow + "_0").value));
    //doc.getElementById('statusBox2').innerHTML = "col = " + col + " whatRow = " + whatRow + " isLastMult = " + isLastMult;
    if (isLastMult && col > 1) {
        var prevCol = dvsrLength - 2;
        var whatBx = "hcm" + prevCol + "_" + cmx;
        if (showMcarriesChkd) {
            whatBx = "cm" + prevCol + "_" + cmx;
        }
        prevcaBx = doc.getElementById(whatBx);

        //doc.getElementById("statusBox" + x).innerHTML = "prevCaBx = " + whatBx;
        //x = x + 1;
    } else if (col > 0) {
        var prevCol = col - 1;
        var whatBx = "hcm" + prevCol + "_" + cmx;
        if (showMcarriesChkd) {
            whatBx = "cm" + prevCol + "_" + cmx;
        }
        prevcaBx = doc.getElementById(whatBx);

        //doc.getElementById("statusBox" + x).innerHTML = "showMcarriesChkd = " + showMcarriesChkd + " whatBx = " + whatBx + " prevCaBx = " + prevcaBx;
        //x = x + 1;
    }
    if (ans === expAns) {
        var nextbox = Num(whatBoxBx.value);
        if (prevcaBx) {
            if (showMcarriesChkd) {
                prevcaBx.style.color = "black";
            } else {
                prevcaBx.type = "hidden";
            }
        }

        dvsrdigs[whatDvsrDg].style.color = "black";
        ansBxs[bxNo].style.color = "black";
        errBx.innerHTML = "";
        //var whatBox = Num(whatBoxBx.value);
        //var nextBox = null;
        if (isLastMult) {
            // check if user guessed too big
            var dividend = 0;
            if (whatRow == 0) {
                var dvdcol = quotDigs - 1;
                // find the most significant non-zero column of quotient
                // which is the column of the least significant digit of first 
                // dividend
                for (; dvdcol > 0; --dvdcol) {
                    if (Num(doc.getElementById("qt" + dvdcol).value) !== 0) {
                        break;
                    }
                }
                dividend = Num(doc.getElementById("dividend").value);
                var discard = dividend % Mat.pow(10, dvdcol);
                dividend = (dividend - discard) / Mat.pow(10, dvdcol);
                    //doc.getElementById("statusBox" + x).innerHTML = "lastMult, whatRow = " + whatRow + " dvdcol = " + dvdcol + " dividend = " + dividend + " prod = " + prod;
                    //x = x + 1;
            } else {
                var prevRow = whatRow - 1;
                var dvdBxs = doc.getElementById("operand" + prevRow + "_1");
                dividend = Num(dvdBxs.value);
                //doc.getElementById("statusBox" + x).innerHTML = "lastMult, whatRow = " + whatRow + " dividend = " + dividend + " prod = " + prod;
                //x = x + 1;
            }
            doc.getElementById("currDividend").value = dividend;
            if (prod > dividend) {
                var lastqtval = prod / Num(doc.getElementById("divisor").value);
                errBx.innerHTML = prod + " is too big, try a quotient digit value smaller than " + lastqtval;
                nextbox = Num(doc.getElementById("nextQuotBox").value) - 1;
                //whatbox = nextbox;
                whatBoxBx.value = nextbox;
                doc.getElementById("bdx").value = doc.getElementById("quotBoxIndex").value;
                if (whatRow == 0) {
                    doc.getElementById("lastBoxOfCurrRow").value = 0;
                } else { // back up to just after last subtraction box
                    var lastBox = doc.getElementById("lastBoxOfCurrRow").value;
                    lastBox -= ansLength;
                    while (doc.getElementById("th-id2").elements[lastBox].name.substring(0, 2) === 'bd') {
                        lastBox -= 1;
                    }
                    doc.getElementById("lastBoxOfCurrRow").value = lastBox + 1;
                }
                for (var i = 0; i < ansLength; ++i) {
                    ansBxs[i].style.color = "red";
                }
                for (var i = 0; i < dvsrLength; ++i) {
                    dvsrdigs[i].style.color = "red";
                }
                setFocus();
                return;
            }

            var visibleDrows = doc.getElementsByName("op" + whatRow + '_1');
            var visibleDrowsLength = visibleDrows.length;
            var name = "cspan" + whatRow;
            var visibleBar = doc.getElementById(name);
            if (visibleBar) {
                visibleBar.className = "th-id3";
            }
            var visibleMinus = doc.getElementById("minus" + whatRow);
            if (visibleMinus) {
                visibleMinus.className = "t1";
            }
            var showBrowsChkd = doc.getElementsByName("showborrows")[0].checked;
            if (showBrowsChkd) {
                var whatBorCaBxs = 'boca' + whatRow;
                var visibleBorCaBxs = doc.getElementsByName(whatBorCaBxs);
                var isCarry = false;
                var visibleBorCaLength = visibleBorCaBxs.length;
                for (var i = 0; i < visibleBorCaLength; ++i) {
                    var hiddenCaBx = null;
                    var whatCaBx = "hca" + i + "_" + whatRow;
                    if( whatRow === 0 ) {
                        var j = i + qdx;
                        whatCaBx = "hca" + j + "_" + whatRow;
                    }
                    hiddenCaBx = doc.getElementById( whatCaBx );
                    //doc.getElementById("statusBox" + x).innerHTML = "whatCaBx = " + whatCaBx + " hiddenCaBx= " + hiddenCaBx;
                    //x = x + 1;

                    if (hiddenCaBx && Num(hiddenCaBx.value) !== 0) {
                        isCarry = true;
                    }
                    //if( hiddenCaBx ) {
                        //doc.getElementById("statusBox" + x).innerHTML = "hiddenCaBx.value = " + hiddenCaBx.value + " isCarry = " + isCarry;
                        //x = x + 1;
                    //}
                }
                //var origColor = "";
                if (isCarry) {
                    doc.getElementById("dispBo").style.color = "#600301";
                    //origColor = getComputedStyle(visibleBorCaBxs[0].parentNode).backgroundColor;
                }
                for (var j = 0; j < visibleBorCaLength; j++) {
                    visibleBorCaBxs[j].type = "text";
                    //isibleBorCaBxs[j].style.height = "1.7em";
                    visibleBorCaBxs[j].style.height = "1em";
                    //visibleBorCaBxs[0].style.backgroundColor = origColor;
                }
            }
            nextbox = Num(doc.getElementById("lastBoxOfCurrRow").value);
            //doc.getElementById("statusBox" + x).innerHTML = "with product boxes, nextbox = " + nextbox;
            //x = x + 1;
            if (visibleDrowsLength > 1) {
                nextbox += doc.getElementsByName("boca" + nextRow).length; // borrow, carry
                //doc.getElementById("statusBox1").innerHTML = "with borrow and carry boxes, nextbox = " + nextbox;
                nextbox += visibleDrowsLength; // dividend boxes
            } else {
                nextbox += 1;
            }
            whatRow = nextRow;
            doc.getElementById("rowNo").value = whatRow;
            doc.getElementById("lastBoxOfCurrRow").value = nextbox;
        } else {
            //var whatBox = Num(whatBoxBx.value);
            // = nextbox;
            //doc.getElementById("statusBox" + x).innerHTML = "in multiply col = " + col + " dvsrdigs.length = " + dvsrLength;
            //x = x + 1;
            if (col < dvsrLength - 1) {
                var whatCm = "hcm" + col + "_" + dec;
                //doc.getElementById("statusBox" + x).innerHTML = "in multiply whatCm = " + whatCm ;
                //x = x + 1;
                //var hasCarry = Num(doc.getElementById(whatCm).value) > 0;
                if (showMcarriesChkd &&
                        Num(doc.getElementById(whatCm).value) > 0) {
                    var allCmBoxes = doc.getElementsByClassName("c2");
                    nextbox = allCmBoxes.length - 1 - 2 * dec * (dvsrLength - 1) - 2 * col - 1;
                } else {
                    nextbox -= 1;
                }
            } else {
                nextbox -= 1;
            }
        }   
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;
        //whatbox = nextbox;
        whatBoxBx.value = nextbox;
    } else {
        //errBx.innerHTML = expAns + " not " + ans;
        //errBx.innerHTML = "not " + ans;
        qBx.style.color = "red";
        dvsrdigs[whatDvsrDg].style.color = "red";
        if (prevcaBx) {
            prevcaBx.type = "text";
            prevcaBx.style.color = "red";
        }
        upDateErrCount();
    }
    setFocus();
}

function subtract(col, sbx) {
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;
    var ansBxs = doc.getElementsByName("op" + sbx + "_1");
    var bxNo = ansBxs.length - 1 - col;
    //doc.getElementById("statusBox" + x ).innerHTML = "col = " + col + " ansBxs = " + ansBxs + " length = " + ansBxs.length + " bxNo = " + bxNo;
    //x = x + 1;
    var ans = Num(ansBxs[bxNo].value);
    //var errBx = doc.getElementById("msg");
    var whatprodboxes = "op" + sbx + "_0";
    var prodBxs = doc.getElementsByName(whatprodboxes);
    //var prod = Num(doc.getElementById("operand" + sbx + "_0").value);
    var subBxs;
    //var pbx;
    var dvdidx = 0;
    var prodidx = prodBxs.length - 1 - col;
    var prodBx = prodBxs[prodidx];
    var dvdBx;
    //var dvdVal = 0;
    var borCol = col;
    //doc.getElementById("statusBox" + x).innerHTML = "col = borCol = " + borCol;
    //x = x + 1;
    var prevRow = 0;
    var subBxsLength = 0;

    if (sbx == 0) {
        
        subBxs = doc.getElementsByName("dvddigs");
        subBxsLength = subBxs.length;
        var quotDigs = doc.getElementById("quotDigs").value;
        
        
        var quotdigs = doc.getElementsByName("quotdigs"); // actual digits
        var quotdigsLength = quotdigs.length;
        dvdidx = subBxsLength - quotdigsLength - col;
        var qdx = 0;
        //doc.getElementById("statusBox" + x).innerHTML = "quotdigs[" + qdx + "] = " + quotdigs[qdx].value + " dvdidx = " + dvdidx + " length = " + quotdigsLength;
        //x = x + 1;
        while( Num(quotdigs[qdx].value) === 0 && qdx < quotdigsLength ) {
            dvdidx += 1;
            qdx += 1;
            //doc.getElementById("statusBox" + x).innerHTML = "quotdigs[" + qdx + "] = " + quotdigs[qdx].value + " dvdidx = " + dvdidx;
            //x = x + 1
        }
        //doc.getElementById("statusBox" + x).innerHTML = "subBxsLength = " + subBxsLength + " quotDigs = " + quotDigs + " col = " + col + " dididx = " + dvdidx;
        //x = x + 1
        dvdBx = subBxs[dvdidx];
        //dvdVal = Num(dvdBx.childNodes[0].nodeValue);
        //doc.getElementById("statusBox" + x).innerHTML = "whatprodboxes = " + whatprodboxes + " prodidx = " + prodidx + " dvddigs idx = " + dvdidx;
        //x = x + 


        borCol = borCol + quotdigsLength - 1;
        var qx = 0;
        while( Num(quotdigs[qx].value) === 0 && qx < quotdigsLength ) {
            borCol -= 1;
            qx += 1;
        }
    } else {
        prevRow = sbx - 1;
        var whatboca = 'boca' + sbx;
        var bocaLength = doc.getElementsByName(whatboca).length;
        subBxs = doc.getElementsByName("op" + prevRow + "_1");
        subBxsLength = subBxs.length;
        var bdBxs = doc.getElementsByName("bd" + prevRow);
        //doc.getElementById("statusBox" + x).innerHTML = "col = " + col +   " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol + bocaLength / 2;
        //doc.getElementById("statusBox" + x).innerHTML = "whatboca = " + whatboca + " bocaLength/2 =  " + (bocaLength/2)  + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol - subBxsLength;
        //doc.getElementById("statusBox" + x).innerHTML = "subBxsLength = " + subBxsLength + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol - Num(doc.getElementById("bringdown" + prevRow).value);
        //doc.getElementById("statusBox" + x).innerHTML = "bdBxs.length = " + Num(doc.getElementById("bringdown" + prevRow).value) + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol + 1;
        //doc.getElementById("statusBox" + x).innerHTML = "plus 1 borCol = " + borCol;
        //x = x + 1;
        

        var inc = Num(doc.getElementById("bringdown" + prevRow).value) - 1;
        dvdidx = inc - col;
        //doc.getElementById("statusBox" + x).innerHTML = " inc = " + inc + " col = " + col + " dididx = " + dvdidx;
        //x = x + 1;
        if (col > inc) {
            //var calcDig = Num(doc.getElementById("calcDig" + prevRow + "_1").value) + 1;
            dvdidx = dvdidx + subBxsLength;
            //doc.getElementById("statusBox" + x).innerHTML = "inc = " + inc + " col = " + col + " calcDig = " + calcDig + " dvdidx = " + dvdidx;
            //x = x + 1;
            dvdBx = subBxs[dvdidx];
        } else {
            dvdBx = bdBxs[dvdidx];
        }
        //doc.getElementById("statusBox" + x).innerHTML = "dvdidx = " + dvdidx;
        //x = x + 1;
        //dvdVal = dvdBx.value;
    }
    var diff = Num(doc.getElementById("operand" + sbx + "_1").value);
    var whatBorBx = "bo" + borCol + "_" + sbx;
    //doc.getElementById("statusBox" + x).innerHTML = "993 whatBorBx = " + whatBorBx;
    //x = x + 1;
    var borBx = null;
    borBx = doc.getElementById(whatBorBx);
    var hiddenBorBx = null;
    hiddenBorBx = doc.getElementById("hbo" + borCol + "_" + sbx);
    var whatCarry = "ca" + borCol + "_" + sbx;
    var caBx = null;
    caBx = doc.getElementById(whatCarry);
    var hiddenCaBx = null;
    hiddenCaBx = doc.getElementById("hca" + borCol + "_" + sbx);
    //doc.getElementById("statusBox" + x).innerHTML = "sbx = " + sbx + " col = " + col + " whatBorBx = " + whatBorBx + " whatCarry = " + whatCarry;
    //x = x + 1;
    var Mat = Math;
    var ten2col = Mat.pow(10, col);
    var discard = diff % ten2col;
    var mainpart = diff % Mat.pow(10, col + 1);

    var expAns = (mainpart - discard) / ten2col;
    var lastDig = diff > 0 ? Mat.floor(Mat.log10(diff)) : 0;
    var isLastSub = (col === lastDig);
    //doc.getElementById("statusBox" + x).innerHTML = "diff " + diff + " lastDig = " + lastDig + " col = " + col + " isLastSub = " + isLastSub;
    //x = x + 1;
    if (ans === expAns) {
        var nextbox = 0;
        ansBxs[bxNo].style.color = "black";
        var whatHelp = doc.getElementsByName("showborrows");
        var showBrowsChkd = false;
        showBrowsChkd = whatHelp[0].checked;
        if (borBx) {
            borBx.style.color = "black";
            if (!showBrowsChkd) {
                borBx.type = "hidden";
                dvdBx.style.removeProperty("text-decoration");
            }
        }

        if (caBx) {
            caBx.style.color = "black";
            if (!showBrowsChkd) {
                caBx.type = "hidden";
                dvdBx.style.removeProperty("text-decoration");
            }
        }
        dvdBx.style.color = "black";
        prodBx.style.color = "black";
        errBx.innerHTML = "";

        if (isLastSub) {
            // hide the "Click on a digit to borrow from it" message
            var displayBorrow = doc.getElementById("dispBo");
            if( displayBorrow ) {
                displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
            }
            var divisor = Num(doc.getElementById("divisor").value);
            //var quotDigs = Num(doc.getElementById("quotDigs").value);
            var quotDigs = doc.getElementsByName("quotdigs").length;
            var lastqcol = quotDigs - 1;
            if (diff >= divisor) { // quotient digit was guessed too small, back up
                var prod = Num(doc.getElementById("operand" + sbx + "_0").value);
                //doc.getElementById("statusBox" + x).innerHTML = "prod = " + prod + " divisor = " + divisor;
                //x = x + 1;
                var qtDigVal = prod / divisor;
                var dividend = doc.getElementById("currDividend").value;
                errBx.innerHTML = diff + " is too big, " + divisor + " goes into " + dividend + " more than " + qtDigVal + " times";
                nextbox = Num(doc.getElementById("nextQuotBox").value) - 1;
                whatBoxBx.value = nextbox;
                doc.getElementById("bdx").value = doc.getElementById("quotBoxIndex").value;
                doc.getElementById("rowNo").value = Num(doc.getElementById("rowNo").value) - 1;
                var diffdigs = doc.getElementsByName("op" + sbx + "_1");
                var diffdigsLength = diffdigs.length;
                if (sbx == 0) {
                    doc.getElementById("lastBoxOfCurrRow").value = 0;
                } else { // back up to just after last subtraction box
                    var lastBox = doc.getElementById("lastBoxOfCurrRow").value;
                    //doc.getElementById("statusBox" + x).innerHTML = "in subtract, sbx > 0, lastBox = " + lastBox;
                    //x = x + 1;
                    lastBox -= diffdigsLength;
                    //doc.getElementById("statusBox" + x).innerHTML = "back off subtract boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    var nextRow = sbx + 1;
                    lastBox -= doc.getElementsByName("boca" + nextRow).length;
                    //doc.getElementById("statusBox" + x).innerHTML = "back off borrow and carry boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    lastBox -= doc.getElementsByName("op" + sbx + "_0").length;
                    //doc.getElementById("statusBox" + x).innerHTML = "back off product boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    while (doc.getElementById("th-id2").elements[lastBox].name.substring(0, 2) === 'bd') {
                        lastBox -= 1;
                    }
                    //doc.getElementById("statusBox" + x).innerHTML = "back off bring down boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    doc.getElementById("lastBoxOfCurrRow").value = lastBox + 1;
                }
                var dvsrdigs = doc.getElementsByName("dvsrdigs");
                var dvsrdigsLength = dvsrdigs.length;
                for (var i = 0; i < dvsrdigsLength; ++i) {
                    dvsrdigs[i].style.color = "red";
                }
                for (var i = 0; i < diffdigsLength; ++i) {
                    diffdigs[i].style.color = "red";
                }
                var dvddigs = doc.getElementsByName("op" + prevRow + "_1");
                var dvdlen = dvddigs.length;
                if (sbx === 0) {
                    dvddigs = doc.getElementsByName("dvddigs");
                    dvdlen = dvddigs.length - quotDigs + 1;
                    //var quotdigs = doc.getElementsByName("quotdigs");
                    var quotmx = quotdigsLength - 1;
                    var qx = 0;
                    while( qx < quotmx && Num(quotdigs[qx].value) == 0 ) {
                        dvdlen++;
                        qx++;
                    }
                }
                for (var i = 0; i < dvdlen; ++i) {
                    dvddigs[i].style.color = "red";
                }

                var bddigs = doc.getElementsByName("bd" + prevRow);
                var bddigsLength = bddigs.length;
                for (var i = 0; i < bddigsLength; ++i) {
                    bddigs[i].style.color = "red";
                }
                setFocus();
                return;
            }
            
            var restAreZero = true;
            var origdividend = Num(doc.getElementById("dividend").value);
            // start with the most significant digit of quotient, find where
            // the user left off typing in numbers, calculate what the rest of 
            // the quotient digits will be. If they are not all zero, then
            // restAreZero is false
            var lastFilledBx = null;
            for (var i = lastqcol; i >= 0; i--) {
                var quotBx = doc.getElementById("qt" + i);
                if ( quotBx && quotBx.value === "") {
                    var ten2i = Mat.pow(10, i);
                    //var discard = quotient % ten2i;
                    var discard = origdividend % ten2i;
                    //var qdigI = (quotient % Mat.pow(10, i+1) - discard)/ten2i;
                    var qdigI = (origdividend % Mat.pow(10, i + 1) - discard) / ten2i;
                    //alert("qDig[" + i + "] = " + qdigI);
                    if (qdigI !== 0) {
                        restAreZero = false;
                        break;
                    }
                } else {
                    lastFilledBx = quotBx;
                    lastqcol = i; // at the end of the loop, this will have the
                    // last quotient column that has a value typed
                    // in it
                }
            }
            lastFilledBx.style.color = "black";
            //doc.getElementById("statusBox" + x).innerHTML = "isLastSub restAreZero = " + restAreZero + " lastqcol = " + lastqcol + " whatbox = " + whatBoxBx.value;
            //doc.getElementById("statusBox" + x).innerHTML = "isLastSub lastqcol = " + lastqcol + " whatbox = " + whatBoxBx.value;
            //x = x + 1;

            if (lastqcol === 0) { // done calculating this quotient
                // if there is a remainder
                var dispR = doc.getElementById("dispR");
                if (Num(doc.getElementById("operand" + sbx + "_1").value) !== 0 &&
                       dispR ) {
                    dispR.style.color = "black";
                    nextbox = doc.getElementsByClassName("c2").length + quotDigs - lastqcol;
                } else { // nextbox is ID=nextbox 
                    nextbox = Num(doc.getElementById("lastBoxOfCurrRow").value) + 1;
                    //doc.getElementById("statusBox" + x).innerHTML = "isLastSub restAreZero = " + restAreZero + " lastqcol = " + lastqcol + " nextbox = " + nextbox;
                    //doc.getElementById("statusBox" + x).innerHTML = "isLastSub lastqcol = " + lastqcol + " nextbox = " + nextbox;
                    //x = x + 1;
                }
            } else if (ans === 0 && restAreZero) {// nextbox is quotient box
                nextbox = doc.getElementsByClassName("c2").length + quotDigs - lastqcol;
            } else { // nextbox is bringdown box

                // make bringdown box visible
                var visibleBrows = doc.getElementsByName("bd" + sbx);
                if (visibleBrows.length > 0) {
                    visibleBrows[0].type = "text";
                }
                nextbox = Num(doc.getElementById("lastBoxOfCurrRow").value) + 1;
            }
            if (doc.getElementById("Round Off").checked) {
                var prevQtDg = doc.getElementById("qt" + lastqcol);
                prevQtDg.onclick = roundOff;
                prevQtDg.onkeyup = checkRoundOff;
            }
        } else { // not last subtraction, nextbox is another subtraction box
            nextbox = Num(whatBoxBx.value) - 1;
        }
        //doc.getElementById("statusBox" + x).innerHTML = "final nextbox = " + nextbox;
        whatBoxBx.value = nextbox;
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;
    } else {
        // show borrows  or carries in case of error
        var caValue = 0;
        if (hiddenCaBx !== null) {
            caValue = Num(hiddenCaBx.value);
            if (caValue === 1) {
                caBx.style.height = "1em";
                caBx.type = "text";
                caBx.style.color = "red";
                caBx.value = caValue;
            }
        }
        if (hiddenBorBx !== null && Num(hiddenBorBx.value) >= -1) {
            borBx.style.height = "1.7em";
            borBx.type = "text";
            borBx.style.color = "red";
            var borVal = Num(hiddenBorBx.value);
            //doc.getElementById("statusBox" + x).innerHTML = "hiddenBorBx.value = " + hiddenBorBx.value; 
            //x = x + 1;
            if (borVal < 0) {
                borVal += 10;
                caBx.style.setProperty("text-decoration", "line-through");
                caBx.style.color = "black";
            }
            borBx.value = borVal;
            dvdBx.style.setProperty("text-decoration", "line-through");
        } else {
            dvdBx.style.color = "red";
        }
        //alert("hiddenCaBx.value = " + hiddenCaBx.value + " hiddenBorBx.value = " + hiddenBorBx.value );
        //alert("whatBorCol = " + borCol + " whatBorrow = " + whatBorBx + " whatCarry = " + whatCarry );
        prodBx.style.color = "red";
        //errBx.innerHTML = expAns + " not " + ans;
        //errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    //alert("done with subtract");
    setFocus();
}

function bringdown(sbx) {
    var doc = document;
    var Num = Number;
    var ansBxs = doc.getElementsByName("bd" + sbx);
    var thisRowsBdDigs = doc.getElementById("bringdown" + sbx).value
    var thisRowsBdDigsVal = (thisRowsBdDigs) ? Num(thisRowsBdDigs) : 0;
    var bxNo = thisRowsBdDigsVal; // + 1; //ansBxs.length - 1 - col
    //doc.getElementById("statusBox1").innerHTML =   " thisRowBdDigs = " + thisRowsBdDigs + " bxNo = " + bxNo;
    var ans = Num(ansBxs[bxNo].value);
    //var errBx = doc.getElementById("msg");
    var dvddigs = doc.getElementsByName("dvddigs");
    var dvdcol = Num(doc.getElementById("quotDigs").value) - 1;
    // find the most significant non-zero column of quotient
    // which is the column of the least significant digit of first 
    // dividend
    for (; dvdcol > 0; --dvdcol) {
        if (Num(doc.getElementById("qt" + dvdcol).value) !== 0) {
            break;
        }
    }
    dvdcol = dvdcol - 1;
    for (var idx = 0; idx < sbx; idx++) {
        dvdcol -= Num(doc.getElementById("bringdown" + idx).value); //doc.getElementsByName("bd" + idx ).length;
        //alert("idx = " + idx + " dvdidx = " + dvdidx );
    }
    //var thisRowsBdDigs = Num(doc.getElementsByName("bringdown" + sbx ).value);
    dvdcol -= thisRowsBdDigsVal;// - col;
    var whatDig = dvddigs.length - 1 - dvdcol;
    //doc.getElementById("statusBox2").innerHTML = " final dvdcol = " + dvdcol + " whatDig = " + whatDig;
    var dividend = Num(doc.getElementById("dividend").value);
    var Mat = Math;
    var discard = dividend % Mat.pow(10, dvdcol);
    var expAns = (dividend % Mat.pow(10, dvdcol + 1) - discard) / Mat.pow(10, dvdcol);
    if (ans == expAns) {
        ansBxs[bxNo].style.color = "black";
        if (dvddigs[whatDig].style.color === "red") {
            dvddigs[whatDig].style.color = "black";
        }
        errBx.innerHTML = "";
        var prevDividend = Num(doc.getElementById("operand" + sbx + "_1").value);
        var newDividend = 10 * prevDividend + ans;
        doc.getElementById("operand" + sbx + "_1").value = newDividend;
        var newval = thisRowsBdDigsVal + 1;
        //alert("thisRowsBdDigsval = " + thisRowsBdDigsVal + " newval = " + newval);
        doc.getElementById("bringdown" + sbx).value = newval;
        var lastBoxOfRow = Num(doc.getElementById("lastBoxOfCurrRow").value) + 1;
        doc.getElementById("lastBoxOfCurrRow").value = lastBoxOfRow;
        var nextQuotBox = doc.getElementById("nextQuotBox");
        var nextbox = nextQuotBox.value;
        whatBoxBx.value = nextbox;

        var bdx = Num(doc.getElementById('bdx').value) + 1;
        doc.getElementById('bdx').value = bdx;
        doc.getElementById("quotBoxIndex").value = bdx;
        //incrementbox();
    } else {
        dvddigs[whatDig].style.color = "red";
        //errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}
function checkDivBorrow(col, sbx) {
    var ciBx = document.getElementById("ca" + col + "_" + sbx);
    var ans = ciBx.value;

    if (ans == 1) {
        errBx.innerHTML = "";
        ciBx.style.color = "black";
        setFocus();
    } else {
        upDateErrCount();
        ciBx.style.color = "red";
        ciBx.value = "";
        errBx.innerHTML = "";
        errBx.innerHTML = "not " + ans;
    }
}
function checkNewDivVal(col, sbx) {
    var doc = document;
    //doc.getElementById('statusBox2').innerHTML = "col = " + col + " sbx = " + sbx;
    //var errBx = doc.getElementById("msg");
    var borFrmBxs;
    var whatBorFrm;
    var borFrmValue;
    var borFrmBx;
    if (sbx == 0) {
        borFrmBxs = doc.getElementsByName("dvddigs");
        whatBorFrm = borFrmBxs.length - 1 - col;
        borFrmBx = borFrmBxs[whatBorFrm];
        borFrmValue = Number(borFrmBx.childNodes[0].nodeValue); // read fixed node value
    } else {
        var ddx = sbx - 1;
        borFrmBxs = doc.getElementsByName("op" + ddx + "_1");
        var bdBxs = doc.getElementsByName("bd" + ddx);
        if (col < bdBxs.length) {
            whatBorFrm = bdBxs.length - 1 - col;
            borFrmBx = bdBxs[whatBorFrm];
        } else {
            whatBorFrm = borFrmBxs.length + bdBxs.length - 1 - col;
            borFrmBx = borFrmBxs[whatBorFrm];
        }
        borFrmValue = Number(borFrmBx.value); // read from input
    }
    var coBx = doc.getElementById("ca" + col + "_" + sbx);
    var co = 0;
    if (coBx) {
        co = 10 * Number(coBx.value);
    }
    var newBx = doc.getElementById("bo" + col + "_" + sbx);

    var prevCol = col - 1;
    var ciBx = doc.getElementById("ca" + prevCol + "_" + sbx);
    var ans = newBx.value;
    var corrAns = co + borFrmValue - 1;

    if (corrAns > 9) {
        corrAns = corrAns - co;
    }
    if (ans == corrAns) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        borFrmBx.style.color = "black";
        if (coBx) {
            coBx.style.color = "black";
        }
        ciBx.focus();
        ciBx.style.backgroundColor = "white";
        ciBx.style.color = "red";
        ciBx.style.border = "1px solid black";
        ciBx.style.height = "1em";
        ciBx.value = "";
    } else {
        upDateErrCount();
        newBx.style.color = "red";
        newBx.value = "";
        borFrmBx.style.color = "red";
        if (coBx && borFrmValue === 0) {
            coBx.style.color = "red";
        }
        errBx.innerHTML = "";
        errBx.innerHTML = "not " + ans;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
//function promptDivBorrow(col, sbx) {
function promptDivBorrow( ev) {
    ev = ev || window.event;
    var doc = document;
    //for (var j = 0; j < 18; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var evTarg = ev.target;
    var id = evTarg.getAttribute("id");
    if( id ) {
        var idlen = id.length;
        var col = id.substring(2,idlen);
        var startpt = col.indexOf("_") + 1;
        var sbx = col.substring( startpt, idlen );
        col = col.match(/[^_]*/);
        //doc.getElementById("statusBox" + x).innerHTML = "in promptDivBorrow col = " + col + ", sbx = " + sbx;
        //x = x + 1;
        var borFrmBxs;
        var whatBorFrm;
        var borFrmValue;
        var borFrmBx;
        var hiddenCaBx;
        var prevCol = col - 1;
        if (col > 0) {
            if (sbx == 0) {
                borFrmBxs = doc.getElementsByName("dvddigs");
                whatBorFrm = borFrmBxs.length - 1 - col;
                //doc.getElementById("statusBox" + x).innerHTML = "sbx = " + sbx + " col = " + col + " whatBorFrm = " + whatBorFrm;
                //x = x + 1;
                borFrmBx = borFrmBxs[whatBorFrm];
                borFrmValue = Number(borFrmBx.childNodes[0].nodeValue); // read fixed node value
                var whatHca = "hca" + prevCol + "_" + 0;
                hiddenCaBx = doc.getElementById(whatHca);
                //doc.getElementById("statusBox" + x).innerHTML = "sbx = 0 checking hidden carry " + whatHca;
                //x = x + 1;
            } else {
                var ddx = sbx - 1;
                borFrmBxs = doc.getElementsByName("op" + ddx + "_1");
                var bdlength;
                var bdBxs = doc.getElementsByName("bd" + ddx);
                bdlength = bdBxs.length;
                if (col < bdlength) {
                    whatBorFrm = bdBxs.length - 1 - col;
                    //doc.getElementById("statusBox" + x).innerHTML = "bdBxs.length = " + bdBxs.length + " col = " + col + " whatBorFrm = " + whatBorFrm;
                    //x = x + 1;
                    borFrmBx = bdBxs[whatBorFrm];
                } else {
                    whatBorFrm = borFrmBxs.length + bdBxs.length - 1 - col;
                    //doc.getElementById("statusBox" + x).innerHTML = "borFrmBxs.length = " + borFrmBxs.length + " bdBxs.length = " + bdBxs.length + " col = " + col + " whatBorFrm = " + whatBorFrm;
                    //x = x + 1;
                    borFrmBx = borFrmBxs[whatBorFrm];
                }
                borFrmValue = Number(borFrmBx.value); // read from input
                var whatHca = "hca" + prevCol + "_" + sbx;
                hiddenCaBx = doc.getElementById(whatHca);
                //doc.getElementById("statusBox" + x).innerHTML = "checking hidden carry " + whatHca + " col = " + col + " bdlength = " + bdlength;
                //x = x + 1;
            }
            var whatcoBx = "ca" + col + "_" + sbx;
            var coBx = doc.getElementById(whatcoBx);
            var whatNewBx = "bo" + col + "_" + sbx;
            var newBx = doc.getElementById(whatNewBx);
            //doc.getElementById("statusBox" + x).innerHTML = "whatcoBx = " + whatcoBx + " whatNewBx = " + whatNewBx;
            //x = x + 1;
            // turn any red numbers for a subtraction error black
            var allT1s = doc.getElementsByClassName("t1");
            var length = allT1s.length;
            for (var i = 0; i < length; i++) {
                allT1s[i].style.color = "black";
            }
            var allF1s = doc.getElementsByClassName("f1");
            length = allF1s.length;
            for (var i = 0; i < length; i++) {
                allF1s[i].style.color = "black";
            }
            var allF2s = doc.getElementsByClassName("f2");
            length = allF2s.length;
            for (var i = 0; i < length; i++) {
                allF2s[i].style.color = "black";
            }

            //make sure it's really a column that should be borrowed from 
            // or do nothing
            if ( hiddenCaBx &&
                    Number(hiddenCaBx.value) !== 0 &&
                    doc.getElementsByName("showborrows")[0].checked ) {
                //var errBx = doc.getElementById("msg");
                errBx.innerHTML = "";
                //doc.getElementById("statusBox" + x).innerHTML = "col = " + col + " sbx = " + sbx + " newBx = " + newBx;
                //x = x + 1;
                if (borFrmValue === 0) {
                    // if 0 then cross off the carry in as well
                    // if it's 0 & no carry in, there is nothing to borrow so do nothing
                    if (coBx && Number(coBx.value) === 1) {
                        borFrmBx.style.setProperty("text-decoration", "line-through");
                        coBx.style.textDecoration = "line-through";
                        newBx.focus();
                        newBx.style.backgroundColor = "white";
                        newBx.style.color = "red";
                        newBx.style.border = "1px solid black";
                        //newBx.style.height = "1.7em";
                        newBx.value = "";
                    }
                } else {
                    borFrmBx.style.setProperty("text-decoration", "line-through");
                    newBx.focus();
                    newBx.style.backgroundColor = "white";
                    newBx.style.color = "red";
                    newBx.style.border = "1px solid black";
                    //newBx.style.height = "1.7em";
                    newBx.value = "";
                }

                var nCols = doc.getElementsByName("dvddigs");
                var mtBoxes = 0;
                //alert("nCols.length = " + nCols.length);
                for (var idx = 0; idx < nCols.length; idx++) {
                    //var quotDigs = Num(doc.getElementById("quotDigs").value);
                    var whatBorrow = "bo" + idx + "_" + sbx;
                    //alert("checking if whatBorrow " + whatBorrow + " is empty");
                    newBx = doc.getElementById(whatBorrow);
                    if (newBx) {
                        if (newBx.value === "") {
                            mtBoxes += 1;
                        }
                    }
                    //}
                }
                if (mtBoxes < 2) { // one empty box is allowed because it's above the
                    // digit that you just clicked on
                    var displayBorrow = doc.getElementById("dispBo");
                    displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
                }
            } else {
                setFocus();
            }
        }
    }
}

function zeroDivCounts() {
    var doc = document;

    // update problem counts
    doc.getElementById("numAttmptd").value = -1;
    doc.getElementById("errs").value = 1;
    doc.getElementById("numWoErr").value = 0;
    doc.getElementById("consWoErr").value = 0;
    doc.getElementById("strtTime").value = Number(Date.now());
    startDivAgain();
}
// start again button code
function startDivAgain() {
    var doc = document;

    var Num = Number;
    var errCt = Num(doc.getElementById("errs").value);
    var errMsg = doc.getElementById("msg").innerHTML;
    var numAttmptd = Num(doc.getElementById("numAttmptd").value);
    var numWoErr = Num(doc.getElementById("numWoErr").value);
    var consWoErr = Num(doc.getElementById("consWoErr").value);
    var noMorQDigs = doc.getElementById("nextQuotBox").value;

    // find the last opX_1 in the page
    var nextrow = doc.getElementsByName("op" + 0 + "_1");
    var lastrow = null;
    var lastRowNum = 0;
    for (var j = 1; ; ++j) {
        var lastrow = nextrow;
        nextrow = doc.getElementsByName("op" + j + "_1");
        lastRowNum = j;
        if (nextrow.length === 0) {
            break;
        }
    }
    var quotdigs = doc.getElementsByName("quotdigs");
    var qlength = quotdigs.length;
    var difflvl = "not set";
    var allCorrect = true;
    if (doc.getElementById("Round Off").checked) {
        difflvl = doc.getElementById("Round Off").value;
        allCorrect = false;
        for( var i = 0; i < qlength; ++i ) {
            if( quotdigs[i].style.getPropertyValue("text-decoration") === "line-through") {
                allCorrect = true;
                //alert("line through detected");
                break;
            }
        }
    }
    var barDrawn = false;
    var dispRmdr = 0;
    if (doc.getElementById("Remainders").checked) {
        difflvl = doc.getElementById("Remainders").value;
        var rmdrBoxes = doc.getElementsByName("rmdr");
        var rmdrLength = rmdrBoxes.length;
        for( var i = 0; i < rmdrLength; ++i ) {
            dispRmdr += Num(rmdrBoxes[rmdrLength-1-i].value)*Math.pow(10,i);
        }
    }
    var lastRowLength = lastrow.length;
    var lastRowValue = lastrow[lastRowLength - 1].value
    var remainder = Num.MAX_SAFE_INTEGER;
    var Mat = Math;
    if( lastRowValue ) {
        remainder = 0;
        var bdNum = lastRowNum - 1;
        var bringDownDigits = doc.getElementsByName("bd" + bdNum);
        var bdLength = bringDownDigits.length;
        //doc.getElementById("statusBox" + x).innerHTML =  "bringDownDigits = " + bringDownDigits + " bdLength = " + bdLength;
        //x = x + 1;
        var j = 0;
        for( var i = 0; i < bdLength; ++i ) {
            var bdValue = bringDownDigits[bdLength-1-i].value;
            if( bdValue ) { // don't count it unless it's filled in
                remainder += Num(bdValue)*Mat.pow(10,j);
                ++j;
            }
            //doc.getElementById("statusBox" + x).innerHTML =  "i = " + i + " remainder = " + remainder;
            //x = x + 1;
        }
        for( var i = 0; i < lastRowLength; ++i ) {
            remainder += Num(lastrow[lastRowLength-1-i].value)*Mat.pow(10,j);
            ++j;
            //doc.getElementById("statusBox" + x).innerHTML =  "i = " + i + " remainder = " + remainder + " dispRmdr = " + dispRmdr;
            //x = x + 1;
        }
    }


    if (doc.getElementById("Recurring Decimals").checked) {
        difflvl = doc.getElementById("Recurring Decimals").value;
        var overbar = doc.getElementById("overbar");
        if( overbar ) {
            var barlength = (Num(overbar.getAttribute("colspan")) + 1)/2;
            var quotient = Num(doc.getElementById("quotient").value);
            var quotDp = Num(doc.getElementById("quotDp").value);
            var ndiscard = quotDp - 1 - barlength;
            var decimalpart = quotient % (Mat.pow(10, quotDp - 1));
            var minpattern = Mat.floor( decimalpart / Mat.pow(10, ndiscard) );
            //doc.getElementById("statusBox" + x).innerHTML = "quotient = " + quotient + " quotDp = " + quotDp + " decimalpart = " + decimalpart + " ndiscard = " + ndiscard + " minpattern = " + minpattern;
            //x = x + 1;
            for( var i = 0; i < barlength; ++i ) {
                var whatQuotDig = qlength - 1 - ndiscard - i;
                var qDigit = quotdigs[whatQuotDig].value;
                var expDigit = minpattern % 10;
                //doc.getElementById("statusBox" + x).innerHTML = "minpattern = " + minpattern + " i = " + i + " whatQuotDig = " + whatQuotDig + " qDigit = " + qDigit + " expDigit = " + expDigit;
                //x = x + 1;
                // if qDigit is blank or has wrong number
                if( !qDigit || Num(qDigit) !== expDigit ) {
                    allCorrect = false;
                }
                minpattern = Mat.floor( minpattern / 10 );
            }
            var barColor = getComputedStyle(overbar).backgroundColor;
            //doc.getElementById("statusBox" + x).innerHTML = "barColor = " + barColor + " allCorrect = " + allCorrect;
            //x = x + 1;
            //alert("barColor = " + barColor + " allCorrect = " + allCorrect);
            barDrawn = barColor === "rgb(0, 0, 0)";
       }
    } else if( difflvl !== "Round Off" ) { // check all quotient digits are filled 
                                           // if not recurring decimal or
                                           // round off
        for( var i = 0; i < qlength; ++i ) {
            var qDigit = quotdigs[i].value;
            if( !qDigit ) {
                allCorrect = false;
            }
        }
    }

    var remainderZero = allCorrect && ((difflvl !== "Recurring Decimals" && remainder === 0) ||
            (difflvl === "Remainders" &&
                    remainder < Num(doc.getElementById("divisor").value) &&
                    remainder === dispRmdr) ||
            (difflvl === "Recurring Decimals" && barDrawn) ||
            (difflvl === "Round Off"));
    //alert("boxNo = " + boxNo + " max = " + max + " errCt = " + errCt + " errMsg = " + errMsg);
    //alert("click when you're ready barDrawn = " + barDrawn);
    // update problem counts
    doc.getElementById("numAttmptd").value = numAttmptd + 1;
    if (errCt === 0 && errMsg === "" &&
            noMorQDigs && remainderZero) {
        doc.getElementById("numWoErr").value = numWoErr + 1;
        doc.getElementById("consWoErr").value = consWoErr + 1;
    } else {
        doc.getElementById("consWoErr").value = '0';
    }

    var jstime = Num(Date.now());
    var jatime = Num(doc.getElementById("strtTime").value);
    var timediff = jstime - jatime;
    if (timediff === 0) {
        doc.getElementById("corrPerHr").value = 0;
    } else {
        doc.getElementById("corrPerHr").value =
                Mat.floor(3600000 * Num(doc.getElementById("numWoErr").value) / timediff);
    }
    doc.getElementById('th-id2').submit();
    if (doc.getElementById("msg").value === "") {
        setFocus();
    }
}
// imitate radio buttons, selecting only one decimal point at a time
function chooseDivThis( event, which_one, which_type) {
    var doc = document;
    //for (var j = 0; j < 18; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
   
    var Num = Number;
   
    // if you muck up the decimal points when they were good to begin with, you may not be able to correct it after 
    // Click where the first quotient digit should be is displayed fixit
    //doc.getElementById("statusBox" + x).innerHTML = "in chooseDivThis which_one = " + which_one + " which_type = " + which_type;
    //x = x + 1;
    var decsNotSettled = 0;
    var whatDecs = doc.getElementsByName("decsettled");
    var whatDecsLength = whatDecs.length;
    var dvsrSettled = doc.getElementById("dvs").value;
    var dvdSettled = doc.getElementById("dvd").value;
    var quotSettled = doc.getElementById("quo").value;
    var turnOnNextMsg = true;
    var msgBx = doc.getElementById("msg");

    if (whatDecsLength > 0) {
        for (var i = 0; i < whatDecsLength; ++i) {
            if (whatDecs[i].value === "false") {
                decsNotSettled += 1;
            }
        }
    }

    // if any indicator says not settled
    // light up the decimal point otherwise skip this entire routine 
    if (decsNotSettled > 0) {
        turnOnNextMsg = false;
        var btns = doc.getElementsByName(which_type);
        var nbtns = btns.length;
        
        // expected value of decimal point
        var totDec = Num(doc.getElementById(which_type).value);
        for (var i = 0; i < nbtns; ++i) {
            //var att = "andsp" + i;
            //doc.getElementById("statusBox" + x).innerHTML = "i = " + i + " which_one = " + which_one + " nbts = " + nbtns;
            //x = x + 1;
            if (i === which_one) {
                btns[i].childNodes[0].nodeValue = ".";
                //btns[i].setAttribute(att, '.');
                var markedDec = nbtns - i; // reverse the index
                if (totDec === markedDec) {
                    btns[i].style.color = "black";
                    // don't let user muck it up again
                    for( var j = 0; j < nbtns; ++j ) {
                        btns[j].onclick = null;
                    }
                        //doc.getElementById("statusBox" + x).innerHTML = "which_type = " + which_type + " btns[0].onclick = " + btns[0].onclick;
                        //x = x + 1;
                    var markwhat = which_type.substring(0, 3);
                    var markBx = doc.getElementById(markwhat);
                    if (markBx) {
                        markBx.value = "true";
                    }
                    if (dvsrSettled.localeCompare("false") === 0 &&
                            !(markwhat.localeCompare("dvs") === 0)) {
                        msgBx.innerHTML = "Count how many places the decimal point needs to move to make the divisor an integer and click there";
                    } else if (dvdSettled.localeCompare("false") === 0 &&
                            !(markwhat.localeCompare("dvd") === 0)) {
                        msgBx.innerHTML = "Move the dividend decimal point the same number of places that you moved the divisor";
                    } else if (quotSettled.localeCompare("false") === 0 &&
                            !(markwhat.localeCompare("quo") === 0)) {
                        msgBx.innerHTML = "Click directly above the dividend decimal point to place the quotient decimal point";
                    } else {
                        turnOnNextMsg = true;
                    }
                } else {
                    // turn it back off if it's already on
                    if (btns[i].style.color == "red") {
                        btns[i].childNodes[0].nodeValue = "_";
                        //btns[i].setAttribute(att, '');
                        // hide "_" with background color
                        btns[i].style.color = btns[i].style.backgroundColor;
                    } else {
                        btns[i].style.color = "red";
                        upDateErrCount();
                    }
                }
            } else { // unmark every button that is not which_one
                if (btns[i].className === "ep") {  // fade the original decimal
                    btns[i].style.color = "#C6BABA"; // but don't make it disappear
                } else {
                    btns[i].childNodes[0].nodeValue = "_";
                    //btns[i].setAttribute(att, '');
                    btns[i].style.color = "#FAF3E4"; // hide "_" with background color
                }
            }
        }
        event.stopPropagation();
    }
    if (turnOnNextMsg) { // this has to be done outside last loop for some reason
        // or it terminates the loop prematurely without
        // turning off the unused decimal points
        
        var quotTd = doc.getElementsByName("quotTd");
        var length = quotTd.length;
        for( var i = 0; i < length; i++ ) {
            //quotTd[i].addEventListener("click", showQuotDigs, false );
            quotTd[i].onclick = showQuotDigs;
            //doc.getElementById("statusBox" + x).innerHTML = "added onclick = showQuotDigs to " + quotTd[i].getAttribute("id");
            //x = x + 1;
        }
        var notQuotDigits = doc.getElementsByName("notthestartdig");
        length = notQuotDigits.length;
        for (var i = 0; i < length; ++i) {
            if (notQuotDigits[i].nodeType === 1) {
                //notQuotDigits[i].addEventListener("click", sayNotThere, true);
                notQuotDigits[i].onclick = showQuotDigs;
                //doc.getElementById("statusBox" + x).innerHTML = "added onclick to " + notQuotDigits[i].getAttribute("id"); //  + " = " + notQuotDigits[i].onclick;
                //x = x + 1;
            }
        }      
        var dvdDigs = doc.getElementsByName("dvddigs");
        var expDvdDp = Num(doc.getElementById("dvdDp").value);
        length = dvdDigs.length;
        //alert("dvdDigs length = " + length + " espDvdDp = " + expDvdDp);
        var leadzeros = true;
        for (var i = 0; i < length; ++i) {
            var whichDig = dvdDigs[i];
            if (length - i >= expDvdDp) {
                //dvdDigs[i].className = "t1";
                whichDig.style.color = "black";
                if (leadzeros && length - i !== expDvdDp &&
                        Num(whichDig.childNodes[0].nodeValue) === 0) {
                    whichDig.style.setProperty("text-decoration", "line-through");
                } else {
                    leadzeros = false;
                }
            }
        }
        var dvsrDigs = doc.getElementsByName("dvsrdigs");
        var expDvsrDp = Num(doc.getElementById("dvsrDp").value);
        length = dvsrDigs.length;
        //alert("dvdDigs length = " + length + " espDvdDp = " + expDvdDp);
        leadzeros = true;
        for (var i = 0; i < length; ++i) {
            if (length - i >= expDvsrDp) {
                if (leadzeros && length - i !== expDvsrDp &&
                        Num(dvsrDigs[i].childNodes[0].nodeValue) === 0) {
                    dvsrDigs[i].style.setProperty("text-decoration", "line-through");
                } else {
                    leadzeros = false;
                }
            }
        }
        msgBx.innerHTML = "Click where first quotient digit should be";
    }
}
function test( ev ) {
    var evTarg = ev.target;
    if( evTarg.toString().match( /HTMLSpanElement/ ) ) {
        evTarg = evTarg.offsetParent;
    }
    alert("you clicked " + evTarg + " with id " + evTarg.getAttribute("id"));
}
function roundOff( ev ) {
    ev = ev || window.event;
    var evTarg = ev.target;
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;
    var quotdigs = doc.getElementsByName("quotdigs");
    var quotLength = quotdigs.length;
    var startnow = false;
    var whatPlace = Num(doc.getElementById("whatPlace").value);
    var quotDp = Number(doc.getElementById("quotDp").value);
    //var errBx = doc.getElementById("msg");
    for( var i = 0; i < quotLength; ++i ) {
        if( !startnow ) {
            if( quotdigs[i].isEqualNode(evTarg ) ) {
                var dispRnd = doc.getElementById("dispRnd");
                var clickedPlace = quotLength - 1 - i;
                if( clickedPlace === whatPlace ) {
                    errBx.innerHTML = "";
                    dispRnd.style.color = "red";
                    dispRnd.innerHTML = "Enter rounded value";
                    if( whatPlace < quotDp - 1 ) {
                        evTarg.style.setProperty("text-decoration", "line-through");
                        startnow = true;
                        //doc.getElementById("statusBox" + x).innerHTML = "whatPlace = " + whatPlace +" quotDp = " + quotDp;
                        //x = x + 1;
                    }
                    var all = doc.getElementById("th-id2");
                    var length = all.length;
                    for( var j = 0; j < length; ++j ) { 
                        if( all.elements[j].isEqualNode(evTarg) ) {  
                            var nextbox = j - 1;
                            if( Num(evTarg.value) >= 5 ) {
                                while( all.elements[nextbox].value === "9") {
                                    --nextbox;
                                }
                                // if rounding goes into new digit, either 0 or blank
                                if( Number(all.elements[nextbox].value) === 0 ) {
                                    // find out if it is most dignificant digit of quotient
                                    if( all.ellements[nextbox].isEqualNode(quotdigs[0]) ) {
                                        var newPlace = whatPlace + 1;
                                        if( newPlace < quotDp - 1 ) {
                                            quotdigs[quotLength - 1 - newPlace].style.setProperty("text-decoration", "line-through");
                                        }
                                        //doc.getElementById("statusBox" + x).innerHTML = "newPlace = " + newPlace +" quotDp = " + quotDp;
                                        //x = x + 1;
                                        doc.getElementById("whatPlace").value = newPlace;
                                    }
                                }
                            }
                            //doc.getElementById("statusBox" + x).innerHTML = "evTarg = " + evTarg.getAttribute("id") + " j = " + j + " nextbox = " + nextbox;
                            //x = x + 1;
                            whatBoxBx.value = nextbox;
                        }
                    }
                } else {
                    var rndMsg = dispRnd.innerHTML;
                    var length = rndMsg.length;
                    rndMsg = rndMsg.substring(19, length); // strip out the first part
                    rndMsg = rndMsg.match(/[^,]*/); // keep everything up to the first comma
                    errBx.innerHTML = rndMsg + " is not there, finish the calculations if needed and click somewhere else";
                    //errBx.innerHTML = "whatPlace = " + whatPlace + " clickedPlace = " + clickedPlace;
                    upDateErrCount();
                    break;
                }
            } else if( whatPlace >= quotDp - 1 && quotLength - 1 - i < quotDp  - 1 ) {
                startnow = true;
                //doc.getElementById("statusBox" + x).innerHTML = "start at decimal point whatPlace = " + whatPlace +" quotDp = " + quotDp + " quotLength = " + quotLength;
                //x = x + 1;
            }
        }
        if( startnow ) {
            var hasContent = quotdigs[i].value;
            if( hasContent ) {
                quotdigs[i].style.setProperty("text-decoration", "line-through");
            } else {
                break;
            }
        }
    }
    //doc.getElementById("statusBox" + x).innerHTML = "in roundOff about to setfocus nextbox = " + doc.getElementById("whatbox").value;
    setFocus();
}
function checkRoundOff( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var Num = Number;
    //var errBx = doc.getElementById("msg")
    var id = ansBx.getAttribute("id");
    var idlen = id.length;
    var col = Num((id.substring(2,idlen)));
    var quotient = Num(doc.getElementById("quotient").value);
    var Mat = Math;
    var roundedQuot = Mat.floor((quotient + 5*Mat.pow(10,col-1))/Mat.pow(10,col));

    var header = doc.getElementById("F1")                    
    var significant = header.innerHTML;
    //var nDig = Num(significant.match(/[0-9]*/)); // parse out the number
    significant = significant.match(/significant/);
    var whatPlace = Num(doc.getElementById("whatPlace").value) + 1;
    var quotDigs = doc.getElementsByName("quotdigs");
    var qLength = quotDigs.length;
    if( significant && whatPlace > col ) {
        roundedQuot = Mat.floor((quotient + 5*Mat.pow(10,whatPlace-1))/Mat.pow(10,whatPlace));
        //document.getElementById("statusBox" + x).innerHTML = "roundedQuot = " + roundedQuot;
        //x = x + 1;
        var j = whatPlace - 1;
        while( j >= col ) {
            roundedQuot = 10*roundedQuot;
            //document.getElementById("statusBox" + x).innerHTML = "j = " + j + " roundedQuot = " + roundedQuot;
            //x = x + 1;
            j = j - 1;
        }
    }
    var enteredQuot = 0;
    //doc.getElementById("statusBox" + x).innerHTML = "quotDigs.length = " + qLength + " quotDigs[0] = " + quotDigs[0].value;
    //x = x + 1;
    var powOf10 = 1;
    for( var i = col; i < qLength; ++i ) {
        var idx = qLength - 1 - i;
        enteredQuot = powOf10*Num(quotDigs[idx].value) + enteredQuot;
        powOf10 *= 10;
        //doc.getElementById("statusBox" + x).innerHTML = "in checkROundOff idx = " + idx + " quotDig = " +  quotDigs[idx].value + " enteredQuot = " + enteredQuot;
        //x = x + 1;
    }
    if( roundedQuot === enteredQuot ) {
        errBx.innerHTML = "";
        ansBx.style.color = "black";
        var dispRnd = doc.getElementById("dispRnd");
        
        var nextbox = Num(whatBoxBx.value);
        
        var quotDp = Num(doc.getElementById("quotDp").value);
        //var actQuotDigs = 1 + Mat.log10(quotient);
        //doc.getElementById("statusBox" + x).innerHTML = "col = " + col + " whatPlace = " + whatPlace + " quotDp = " + quotDp;
        if( col > whatPlace ||  col >= quotDp ) {         
            nextbox = nextbox + 1;
        } else { // only one place to round
            if( dispRnd ) {
                dispRnd.style.color = getComputedStyle(dispRnd).backgroundColor;
            }
            // push whatbox outside the table
            var all = doc.getElementById("th-id2");
            var length = all.length;
            for( var i = 0; i < length; ++i ) {
                if( all.elements[i].isEqualNode(whatBoxBx) ) {
                    nextbox = i;
                }
            }
        }
        whatBoxBx.value = nextbox;
    } else {
        var entireNum = Mat.floor(quotient/Mat.pow(10,col-1));
        errBx.innerHTML = entireNum + " does not round to " + enteredQuot + "0, should be " + roundedQuot;
        upDateErrCount();
        //doc.getElementById("statusBox" + x).innerHTML = "in checkROundOff enteredQuot = " + enteredQuot + " != roundedQuot = " + roundedQuot;
        //x = x + 1;
    }
    //alert("ok?");
    setFocus();
}
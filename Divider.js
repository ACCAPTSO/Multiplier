/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var x = 0;
//var whatBoxBx = null;
"use strict";
var whatbox = -1;
var posRecorded = false;
var leftPos = 0;
var rightPos = 0;
var barPosition = null;
//var boxHeight = 0;
//var boxWidth = 0;
var rightside = 0;
var bottomside = 0;
var tolerance = 15;
var lastBoxOfCurrRow = 0;
var nextQuotBox = 0;
var rowNo = 0;
var calcDig = 0;
var gDividend = 0;
var gProd = 0;
var gDiff = 0;
// 15 rows of bringdowns is more than it will ever use as code is currently
var gBringDownDigs = [ 0, 0, 0, 0, 0,
                       0, 0, 0, 0, 0, 
                       0, 0, 0, 0, 0 ];
var gCarries = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    ];
var gBorrows = [
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ],
    [ -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2 ]
    ];
var gMcarries = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    ];
//var canvas = null;
//var ctx = null;
//var prevX = 0;
//var currX = 0;
//var prevY = 0;
//var currY = 0;

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
    
    if( barPos.x - tol < mousePos.x && mousePos.x < rightside + tol && barPos.y - tol < mousePos.y && mousePos.y < barPos.y + tol ) {
        if( mousePos.x < barPos.x + tol ) {
            posRecorded = true;
            leftPos = mousePos.x;
            document.getElementById("tbl").onmouseup = checkEnds;
            barPosition = barPos;
        } else if( rightside - tol < mousePos.x ) {
            posRecorded = true;
            rightPos = mousePos.x;
            document.getElementById("tbl").onmouseup = checkEnds;
            barPosition = barPos;
        }
    } 
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

    if( posRecorded &&
            barPos.x - tol < mousePos.x && mousePos.x < rightside + tol && 
            barPos.y - tol < mousePos.y && mousePos.y < barPos.y + tol ) {
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
function enableBar() {
    var doc = document;
    var difflvl = null;
    if (doc.getElementById("Recurring Decimals").checked) {
        difflvl = doc.getElementById("Recurring Decimals").value;
        if( difflvl === "Recurring Decimals" ) { 
            doc.getElementById("tbl").onmousedown = recDownPos;  
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

    var whatRow = rowNo - 1;
    var bdBxs = doc.getElementsByName("bd" + whatRow);
    var bdlength = gBringDownDigs[whatRow];
    var subBxs = doc.getElementsByName("op" + whatRow + "_1");
    var subBxsLength = subBxs.length;
    var whatIdx = 0;
    var hintBx = null;
    if (bdlength > 0) {
        if (col < bdlength) {
            whatIdx = bdlength - 1 - col;
            hintBx = bdBxs[whatIdx];
        } else {
            whatIdx = subBxsLength + bdlength - 1 - col;
            hintBx = subBxs[whatIdx];
        }
    } else {
        whatIdx = subBxsLength - 1 - col;
        hintBx = subBxs[whatIdx];
    }
    if (ans === expectedRemainder) {
        hintBx.style.color = "black";
        ansBx.style.color = "black";
        doc.getElementById("msg").innerHTML = "";
        var nextbox = 0;
        if (col > 0) {
            nextbox = whatbox + 1;
        } else {
            var bdlength = doc.getElementsByName("bd" + whatRow).length;
            var offTheTable = bdlength > 0 ? bdlength : 1;
            //offTheTable = 0;
            nextbox = lastBoxOfCurrRow + offTheTable;            
        }
        whatbox = nextbox;
        var quotDigs = Num(doc.getElementById("quotDigs").value);
        for (var i = quotDigs - 1; i >= 0; --i) {
            doc.getElementById("qt" + i).style.color = "black";
        }
    } else {
        hintBx.style.color = "red";
        ansBx.style.color = "red";
        //doc.getElementById("msg").innerHTML = "not " + ans;
        upDateErrCount();
    }
    setDivFocus();
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
        //var doc.getElementById("msg") = doc.getElementById("msg");
        var Num = Number;
        var clickmsg = "quotient doesn't start there, click somewhere else";
        var decsNotSettled = 0;
        var whatDecs = doc.getElementsByName("decsettled");
        var whatDecsLength = whatDecs.length;
        //doc.getElementById("statusBox" + x).innerHTML = "event target = " + ev.target;
        //x = x + 1;

        var idlen = id.length;
        var col = Num((id.substring(2,idlen)));

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
                //var doc.getElementById("msg") = doc.getElementById("msg");
                doc.getElementById("msg").innerHTML = "";
                var quotTd = doc.getElementsByName("quotTd");
                var length = quotTd.length;
                for( var i = 0; i < length; i++ ) {
                    quotTd[i].onclick = setDivFocus;
                }
                var notQuotDigits = doc.getElementsByName("notthestartdig");
                var length = notQuotDigits.length;
                for (var i = 0; i < length; ++i) {
                    if (notQuotDigits[i].nodeType === 1) {
                        notQuotDigits[i].onclick = setDivFocus;
                    }
                }
                // make all the decimal points run setDivFocus as well           
                var Dp = doc.getElementsByName("quotDp");
                length = Dp.length;
                for( var i = 0; i < length; ++i ) {
                    Dp[i].onclick = setDivFocus;
                }
                var Dp = doc.getElementsByName("dvsrDp");
                length = Dp.length;
                for( var i = 0; i < length; ++i ) {
                    Dp[i].onclick = setDivFocus;

                }
                var Dp = doc.getElementsByName("dvdDp");
                length = Dp.length;
                for( var i = 0; i < length; ++i ) {
                    Dp[i].onclick = setDivFocus;
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
                //doc.getElementById("statusBox" + x).innerHTML = "about to setDivFocus";
                //x = x + 1;
                setDivFocus();
            } else {
                doc.getElementById("msg").innerHTML = clickmsg;
                //doc.getElementById("msg").innerHTML = "col = " + col + " lastcol = " + lastcol;
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
    var nextbox = whatbox;
    if (col > 0) {
        var prevCol = col - 1;
        prevBx = doc.getElementById("cm" + prevCol + "_" + sbx);
    }
    var ans = Num(ansBx.value);
    //var doc.getElementById("msg") = doc.getElementById("msg");
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
    mcarry = gMcarries[col][sbx];
    if (ans === mcarry) {
        ansBx.style.color = "black";
        dvsrdigs[dvsrdigs.length - 1 - col].style.color = "black";
        if (prevBx) {
            prevBx.style.color = "black";
        }
        possBx[sbx].style.color = "#b53f25";
        doc.getElementById("msg").innerHTML = "";
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
        var whatRow = rowNo;
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
        //doc.getElementById("statusBox" + x).innerHTML = "back off prod digits already done nextbox = " + whatbox;
        //x = x + 1;
        whatbox = nextbox;

    } else {
        dvsrdigs[dvsrdigs.length - 1 - col].style.color = "red";
        if (prevBx) {
            prevBx.style.color = "red";
        }
        possBx[sbx].style.color = "red";
        //doc.getElementById("msg").innerHTML = mcarry + " not " + ans;
        upDateErrCount();
    }
    setDivFocus();
}

function divide(immFeedBkCk, col, qtDig) {
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    //doc.getElementById("statusBox" + x).innerHTML = "in divide";
    //x = x + 1;
    var Num = Number;
    var whatRow = rowNo;
    var prevRow = whatRow - 1;
    //var doc.getElementById("msg") = doc.getElementById("msg");
    doc.getElementById("msg").innerHTML = "";
    var divisor = Num(doc.getElementById("divisor").value);
    var ansBx = doc.getElementById("qt" + col);
    var ansTxt = "";
    ansTxt = ansBx.value;
    //doc.getElementById("statusBox" + x).innerHTML = "ansTxt = " + ansTxt + " id = " + event.target.id;
    //x = x + 1;
    
    if( isNaN( ansTxt ) ) {
        //doc.getElementById("msg").innerHTML = "not " + ansTxt;
        upDateErrCount();
        setDivFocus();
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
    nextQuotBox = doc.getElementsByClassName("c2").length + qLength - col;
    
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
            //var whatMcarry = doc.getElementById("hcm" + i + "_" + carryRow);
            var whatMcarry = doc.getElementById("cm" + i + "_" + carryRow);
            if( whatMcarry ) {
                gMcarries[i][carryRow] = mcarry;
            }
        }
        prod += Mat.pow(10, i) * mDig;
    }
    prod += Mat.pow(10, i) * mcarry;
    var prodMxIdx = prod > 0 ? Mat.floor(Mat.log10(prod)) : 1;
    calcDig = prodMxIdx;
    gProd = prod;

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
        while (i >= 0) {
            dvdDigVal = Num(dvdBxs[i].childNodes[0].nodeValue);
            var ten2pow = Mat.pow(10, pow);
            dvdnd += ten2pow * dvdDigVal;
            //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", i = " + i + ", dvdnd = " + dvdnd;
            //x = x + 1;
            // if there was a borrow, decrement dvdDigVal
            if (pow > 0) {
                caCol = pow + quotDigs - 2 - leadzeros;
                //whatCarry = "hca" + caCol + "_" + whatRow;
                whatCarry = "ca" + caCol + "_" + whatRow;
                //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1;
                caBx = doc.getElementById(whatCarry);
                borCol = caCol + 1;
                //whatBorBx = "hbo" + borCol + "_" + whatRow;
                whatBorBx = "bo" + borCol + "_" + whatRow;
                borBx = doc.getElementById(whatBorBx);
                if (borBx && caBx) {
                    //if (Num(caBx.value) === 1) {
                    if( gCarries[caCol][whatRow] === 1 ) {
                        --dvdDigVal;
                        // store the new borrowed value
                        //borBx.value = dvdDigVal;
                        gBorrows[borCol][whatRow] = dvdDigVal;
                        //doc.getElementById("statusBox" + x).innerHTML = "storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        //borBx.value = "-2";
                        gBorrows[borCol][whatRow] = -2;
                    }
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Mat.pow(10, pow + 1);
            prodDigVal = (mainpart - discard) / ten2pow;
            //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + " dvdDigVal = " + dvdDigVal + " prodDigVal = " + prodDigVal;
            //x = x + 1;
            caCol = pow + quotDigs - 1 - leadzeros;
            //whatCarry = "hca" + caCol + "_" + whatRow;
            whatCarry = "ca" + caCol + "_" + whatRow;
            caBx = doc.getElementById(whatCarry);
            if (caBx) {
                if (dvdDigVal < prodDigVal) { // this digit has a carry
                    //caBx.value = 1;
                    gCarries[caCol][whatRow] = 1;
                    //doc.getElementById("statusBox" + x).innerHTML = "storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    //caBx.value = 0;
                    gCarries[caCol][whatRow] = 0;
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
        var bringdown = gBringDownDigs[prevRow];

        var maxp = dvdBxs.length + bringdown;
        //doc.getElementById("statusBox" + x).innerHTML = "whatDvdBxs = " + whatDvdBxs + " dvdBxs.length = " + dvdBxs.length + " whatRow = " + whatRow + ", pow = " + pow + " maxp = "  + maxp + " bringdown = " + bringdown + " prevRow = " + prevRow;
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
                if (whatDvdBx !== null) {
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
                //whatCarry = "hca" + caCol + "_" + whatRow;
                whatCarry = "ca" + caCol + "_" + whatRow;
                caBx = doc.getElementById(whatCarry);
                //doc.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1
                borCol = caCol + 1;
                //whatBorBx = "hbo" + borCol + "_" + whatRow;
                whatBorBx = "bo" + borCol + "_" + whatRow;
                borBx = doc.getElementById(whatBorBx);
                if (borBx && caBx) {
                    if( gCarries[caCol][whatRow] === 1 ) {
                        --dvdDigVal;
                        // store the new borrowed value
                        //borBx.value = dvdDigVal;
                        gBorrows[borCol][whatRow] = dvdDigVal;
                        //doc.getElementById("statusBox" + x).innerHTML = " pow = " + pow + " storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        //borBx.value = "-2";
                        gBorrows[borCol][whatRow] = -2;
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
            //whatCarry = "hca" + caCol + "_" + whatRow;
            whatCarry = "ca" + caCol + "_" + whatRow;
            caBx = doc.getElementById(whatCarry);
            //doc.getElementById("statusBox" + x).innerHTML = "whatCarry " + whatCarry + " caBx = " + caBx;
            //x = x + 1;
            if (caBx) {
                if (dvdDigVal < prodDigVal) {// this digit has a carry
                    gCarries[caCol][whatRow] = 1;
                    //doc.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    gCarries[caCol][whatRow] = 0;
                }
            }
            ++pow;
        }
    }
    if (dvdnd < divisor && ans !== 0) {
        doc.getElementById("msg").innerHTML = divisor + " does not go into " + dvdnd;
        upDateErrCount();
        setDivFocus();
        return;
    } else if (dvdnd >= divisor && ans === 0) {
        doc.getElementById("msg").innerHTML = divisor + " goes into " + dvdnd + " at least once";
        upDateErrCount();
        setDivFocus();
        return;
    }

    gDividend = dvdnd;
    gDiff = dvdnd - prod;

    var origDvdDigs = doc.getElementsByName("dvddigs");
    var bddigs = null;
    var bddigsLength = 0;
    var dvddigs;
    if (whatRow === 0) {
        dvddigs = origDvdDigs;
    } else {
        prevRow = whatRow - 1;
        dvddigs = doc.getElementsByName("op" + prevRow + '_1');
        bddigs = doc.getElementsByName("bd" + prevRow);
        bddigsLength = bddigs.length;
    }
    var stop = dvddigs.length;
    if (whatRow === 0) {
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
            ansBx.style.color = "black";
            // turn divisor and either dividend or most recent difference black
            for (var i = 0; i < dvddigs.length; i++) {
                dvddigs[i].style.color = "black";
            }
            if (bddigs) {
                for (var i = 0; i < bddigsLength; i++) {
                    bddigs[i].style.color = "black";;
                    if (bddigs[i].type === "hidden") {
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
            //doc.getElementById("msg").innerHTML = "not " + ans;
            time2increment = false;
        }

    }
    if (time2increment) {
        var nextbox = whatbox;
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
            var lastRowValue = lastrow[lastRowLength - 1].value;
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
            if (col === 0 && isRemainder) { 
                doc.getElementById("dispR").style.color = "black";
                nextbox = nextbox + 1;
            // whatRow === 0 => 0.x
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
                    //offTheTable = 0;
                    nextbox = lastBoxOfCurrRow + offTheTable;
                }
            } else {
                nextbox = lastBoxOfCurrRow;
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
            ansBx.style.color = "#b53f25";
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
                name = 'bd' + prevRow + '_1';
                var prevDrow = doc.getElementsByName(name);
                for (var i = 0; i < prevDrow.length; i++) {
                    prevDrow[i].style.removeProperty("text-decoration");
                }
            }
            var allcarries = doc.getElementsByClassName("c2");
            var allcarriesLength = allcarries.length;
            for (var i = 0; i < allcarriesLength; ++i) {
                var id = allcarries[i].getAttribute("id");
                //doc.getElementById("statusBox" + x).innerHTML = "carryRow = " + carryRow + " allcarries[" + i + "].id = " + id;
                //x = x + 1;
                if (Num(id.substring(4, 5)) === carryRow &&
                        id.substring(0, 2) === "cm") {
                    allcarries[i].value = "";
                }
            }
            nextbox = lastBoxOfCurrRow;
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

            lastBoxOfCurrRow = nextbox;
            //doc.getElementById("statusBox" + x).innerHTML = "ans != 0, nextbox = " + nextbox;
            //x = x + 1;
        }

        //doc.getElementById("statusBox" + x).innerHTML = "final nextbox = " + nextbox;
        whatbox = nextbox;
    }
    if( Num(doc.getElementById("quotDp").value) - 2 ===  col ) {
        enableBar();
    }
    //alert("done with divide");
    setDivFocus();
}

function multiply( col, whatRow ) {
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
    //var doc.getElementById("msg") = doc.getElementById("msg");
    // how many quotient digits
    var quotDigs = Num(doc.getElementById("quotDigs").value);
    var dec = whatRow;

    var nextRow = whatRow + 1;
    //doc.getElementById("statusBox" + x).innerHTML = "in multiply whatRow = " + whatRow;
    //x = x + 1;
    for (var prevrow = whatRow - 1; prevrow >= 0; prevrow--) {
        var bringDowns = gBringDownDigs[prevrow];
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

    var prod = gProd; // Num(doc.getElementById("operand" + whatRow + "_0").value);
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
    var isLastMult = ( col === calcDig );

    if (isLastMult && col > 1) {
        var prevCol = dvsrLength - 2;
        //var whatBx = "hcm" + prevCol + "_" + cmx;
        var whatBx = "cm" + prevCol + "_" + cmx;
        //if (showMcarriesChkd) {
        //    whatBx = "cm" + prevCol + "_" + cmx;
        //}
        prevcaBx = doc.getElementById(whatBx);

        //doc.getElementById("statusBox" + x).innerHTML = "prevCaBx = " + whatBx;
        //x = x + 1;
    } else if (col > 0) {
        var prevCol = col - 1;
        //var whatBx = "hcm" + prevCol + "_" + cmx;
        var whatBx = "cm" + prevCol + "_" + cmx;
        //if (showMcarriesChkd) {
        //    whatBx = "cm" + prevCol + "_" + cmx;
        //}
        prevcaBx = doc.getElementById(whatBx);

        //doc.getElementById("statusBox" + x).innerHTML = "showMcarriesChkd = " + showMcarriesChkd + " whatBx = " + whatBx + " prevCaBx = " + prevcaBx;
        //x = x + 1;
    }
    if (ans === expAns) {
        qBx.style.color = "#b53f25";
        var nextbox = whatbox;
        if (prevcaBx) {
            if (showMcarriesChkd) {
                prevcaBx.style.color = "black";
            } else {
                prevcaBx.type = "hidden";
            }
        }

        dvsrdigs[whatDvsrDg].style.color = "black";
        ansBxs[bxNo].style.color = "black";
        doc.getElementById("msg").innerHTML = "";
        if (isLastMult) {
            // check if user guessed too big
            if( prod > gDividend ) {
                var lastqtval = prod / Num(doc.getElementById("divisor").value);
                doc.getElementById("msg").innerHTML = prod + " is too big, try a quotient digit value smaller than " + lastqtval;
                nextbox = nextQuotBox - 1;
                whatbox = nextbox;
                if (whatRow === 0) {
                    lastBoxOfCurrRow = 0;
                } else { // back up to just after last subtraction box
                    var lastBox = lastBoxOfCurrRow;
                    lastBox -= ansLength;
                    while (doc.getElementById("th-id2").elements[lastBox].name.substring(0, 2) === 'bd') {
                        lastBox -= 1;
                    }
                    lastBoxOfCurrRow = lastBox + 1;
                }
                qBx.style.color = "red";
                for (var i = 0; i < ansLength; ++i) {
                    ansBxs[i].style.color = "red";
                }
                for (var i = 0; i < dvsrLength; ++i) {
                    dvsrdigs[i].style.color = "red";
                }
                setDivFocus();
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
                var dvdBx = null;
                var visibleBorCaLength = visibleBorCaBxs.length;
                for (var i = 0; i < visibleBorCaLength; ++i) {
                    var caBx = null;
                    //var whatCaBx = "hca" + i + "_" + whatRow;
                    var whatCaBx = "ca" + i + "_" + whatRow;
                    var caCol = i;
                    if( whatRow === 0 ) {
                        var j = i + qdx;
                        //whatCaBx = "hca" + j + "_0";
                        whatCaBx = "ca" + j + "_0";
                        caCol = j;
                        dvdBx = doc.getElementById("dd" + j + "_0");
                    }
                    caBx = doc.getElementById( whatCaBx );
                    //doc.getElementById("statusBox" + x).innerHTML = "whatCaBx = " + whatCaBx + " hiddenCaBx= " + hiddenCaBx;
                    //x = x + 1;

                    if (caBx && gCarries[caCol][whatRow] !== 0) {
                        isCarry = true;
                        if( dvdBx ) {
                            dvdBx.style.color = "black";
                        }
                    }
                }
                if (isCarry) {
                    doc.getElementById("dispBo").style.color = "#600301";
                    //origColor = getComputedStyle(visibleBorCaBxs[0].parentNode).backgroundColor;
                }
                for (var j = 0; j < visibleBorCaLength; j++) {
                    visibleBorCaBxs[j].type = "text";
                    visibleBorCaBxs[j].style.height = "1em";
                }
            }
            nextbox = lastBoxOfCurrRow;
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
            rowNo = whatRow;
            lastBoxOfCurrRow = nextbox;
        } else {
            if( col < dvsrLength - 2 ||
                    ( col === dvsrLength - 2 && Num(dvsrdigs[0].childNodes[0].nodeValue) !== 0 ) ) {
                //var whatCm = "hcm" + col + "_" + dec;
                //doc.getElementById("statusBox" + x).innerHTML = "in multiply whatCm = " + whatCm + " dvsdigs[0] = " + dvsrdigs[0].childNodes[0].nodeValue;
                //x = x + 1;
                if (showMcarriesChkd &&
                        gMcarries[col][dec] > 0) {
                    var allCmBoxes = doc.getElementsByClassName("c2");
                    //nextbox = allCmBoxes.length - 1 - 2 * dec * (dvsrLength - 1) - 2 * col - 1;
                    nextbox = allCmBoxes.length - 1 - dec * (dvsrLength - 1) - col;
                    //doc.getElementById("statusBox" + x).innerHTML = "in multiply allCmBoxes.length = " + allCmBoxes.length + " dec = " + dec + " dvsrLength = " + dvsrLength + " col = " + col;
                    //x = x + 1;
                } else {
                    nextbox -= 1;
                }
            } else {
                nextbox -= 1;
            }
        }   
        whatbox = nextbox;
    } else {
        //doc.getElementById("msg").innerHTML = expAns + " not " + ans;
        //doc.getElementById("msg").innerHTML = "not " + ans;
        qBx.style.color = "red";
        dvsrdigs[whatDvsrDg].style.color = "red";
        if( prevcaBx ) {
            prevcaBx.value = gMcarries[prevCol][cmx];
            prevcaBx.type = "text";
            prevcaBx.style.color = "red";
        }
        upDateErrCount();
    }
    setDivFocus();
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
    //var doc.getElementById("msg") = doc.getElementById("msg");
    var whatprodboxes = "op" + sbx + "_0";
    var prodBxs = doc.getElementsByName(whatprodboxes);
    var subBxs;
    var dvdidx = 0;
    var prodidx = prodBxs.length - 1 - col;
    var prodBx = prodBxs[prodidx];
    var dvdBx;
    var borCol = col;
    //doc.getElementById("statusBox" + x).innerHTML = "col = borCol = " + borCol;
    //x = x + 1;
    var prevRow = 0;
    var subBxsLength = 0;

    if (sbx === 0) {
        
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
        //borCol = borCol - Num(doc.getElementById("bringdown" + prevRow).value);
        var prevBringDownDigs = gBringDownDigs[prevRow];
        borCol = borCol - prevBringDownDigs;
        //doc.getElementById("statusBox" + x).innerHTML = "bdBxs.length = " + prevBringDownDigs + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol + 1;
        //doc.getElementById("statusBox" + x).innerHTML = "plus 1 borCol = " + borCol;
        //x = x + 1;

        var inc = prevBringDownDigs - 1;
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
    }
    var diff = gDiff; // Num(doc.getElementById("operand" + sbx + "_1").value);
    var whatBorBx = "bo" + borCol + "_" + sbx;
    //doc.getElementById("statusBox" + x).innerHTML = "993 whatBorBx = " + whatBorBx;
    //x = x + 1;
    var borBx = null;
    borBx = doc.getElementById(whatBorBx);
    //var hiddenBorBx = null;
    //hiddenBorBx = doc.getElementById("hbo" + borCol + "_" + sbx);
    var whatCarry = "ca" + borCol + "_" + sbx;
    var caBx = null;
    caBx = doc.getElementById(whatCarry);
    //var hiddenCaBx = null;
    //hiddenCaBx = doc.getElementById("hca" + borCol + "_" + sbx);
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
        doc.getElementById("msg").innerHTML = "";

        if (isLastSub) {
            // hide the "Click on a digit to borrow from it" message
            var displayBorrow = doc.getElementById("dispBo");
            if( displayBorrow ) {
                displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
            }
            var divisor = Num(doc.getElementById("divisor").value);
            var quotDigs = doc.getElementsByName("quotdigs").length;
            var lastqcol = quotDigs - 1;
            if (diff >= divisor) { // quotient digit was guessed too small, back up
                //var prod = Num(doc.getElementById("operand" + sbx + "_0").value);
                //doc.getElementById("statusBox" + x).innerHTML = "prod = " + prod + " divisor = " + divisor;
                //x = x + 1;
                nextbox = nextQuotBox - 1;
                whatbox = nextbox;
                --rowNo;
                var all = doc.getElementById("th-id2");
                var qtDigVal = all.elements[nextbox].value;
                //doc.getElementById("msg").innerHTML = diff + " is too big, " + divisor + " goes into " + currDividend + " more than " + qtDigVal + " times";
                doc.getElementById("msg").innerHTML = diff + " is too big, " + divisor + " goes into " + gDividend + " more than " + qtDigVal + " times";

                var diffdigs = doc.getElementsByName("op" + sbx + "_1");
                var diffdigsLength = diffdigs.length;
                if (sbx === 0) {
                    lastBoxOfCurrRow = 0;
                } else { // back up to just after last subtraction box
                    var lastBox = lastBoxOfCurrRow;
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
                    while (all.elements[lastBox].name.substring(0, 2) === 'bd') {
                        lastBox -= 1;
                    }
                    //doc.getElementById("statusBox" + x).innerHTML = "back off bring down boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    lastBoxOfCurrRow = lastBox + 1;
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
                    var quotmx = quotdigsLength - 1;
                    var qx = 0;
                    while( qx < quotmx && Num(quotdigs[qx].value) === 0 ) {
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
                setDivFocus();
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
                    var discard = origdividend % ten2i;
                    var qdigI = (origdividend % Mat.pow(10, i + 1) - discard) / ten2i;
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
            //doc.getElementById("statusBox" + x).innerHTML = "isLastSub restAreZero = " + restAreZero + " lastqcol = " + lastqcol + " whatbox = " + whatbox;
            //doc.getElementById("statusBox" + x).innerHTML = "isLastSub lastqcol = " + lastqcol + " whatbox = " + whatbox;
            //x = x + 1;

            if( lastqcol === 0 ) { // done calculating this quotient
                // if there is a remainder
                var dispR = doc.getElementById("dispR");
                // if (Num(doc.getElementById("operand" + sbx + "_1").value) !== 0 && dispR ) {
                if( diff !== 0 && dispR ) {
                    dispR.style.color = "black";
                    nextbox = doc.getElementsByClassName("c2").length + quotDigs - lastqcol;
                } else { // nextbox is ID=nextbox 
                    nextbox = lastBoxOfCurrRow + 1;
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
                nextbox = lastBoxOfCurrRow + 1;
            }
            if (doc.getElementById("Round Off").checked) {
                var prevQtDg = doc.getElementById("qt" + lastqcol);
                prevQtDg.onclick = roundOff;
                prevQtDg.onkeyup = checkRoundOff;
            }
        } else { // not last subtraction, nextbox is another subtraction box
            nextbox = whatbox - 1;
        }
        //doc.getElementById("statusBox" + x).innerHTML = "final nextbox = " + nextbox;
        whatbox = nextbox;
    } else {
        // show borrows  or carries in case of error
        var caValue = 0;
        //doc.getElementById("statusBox" + x).inneerHTML = "caBx = " + caBx;
        //x = x + 1;
        if (caBx !== null) {
            caValue = gCarries[borCol][sbx];
            //doc.getElementById("statusBox" + x).innerHTML = "caValue[" + borCol + "][" + sbx + "] = " + caValue;
            //x = x + 1;
            if (caValue === 1) {
                caBx.style.height = "1em";
                caBx.type = "text";
                caBx.style.color = "red";
                caBx.value = caValue;
            }
        }
        //if (hiddenBorBx !== null && Num(hiddenBorBx.value) >= -1) {
        if( borBx !== null && gBorrows[borCol][sbx] >= -1 ) {
            borBx.style.height = "1em";
            borBx.type = "text";
            borBx.style.color = "red";
            //var borVal = Num(hiddenBorBx.value);
            var borVal = gBorrows[borCol][sbx];
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
        prodBx.style.color = "red";
        //doc.getElementById("msg").innerHTML = expAns + " not " + ans;
        //doc.getElementById("msg").innerHTML = "not " + ans;
        upDateErrCount();
    }
    //alert("done with subtract");
    setDivFocus();
}

function bringdown(sbx) {
    var doc = document;
    var Num = Number;
    var ansBxs = doc.getElementsByName("bd" + sbx);
    var thisRowsBdDigs = gBringDownDigs[sbx];
    var thisRowsBdDigsVal = (thisRowsBdDigs) ? Num(thisRowsBdDigs) : 0;
    var bxNo = thisRowsBdDigsVal;
    var ans = Num(ansBxs[bxNo].value);
    //var doc.getElementById("msg") = doc.getElementById("msg");
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
        dvdcol -= gBringDownDigs[idx];
    }
    dvdcol -= thisRowsBdDigsVal;
    var whatDig = dvddigs.length - 1 - dvdcol;
    var dividend = Num(doc.getElementById("dividend").value);
    var Mat = Math;
    var discard = dividend % Mat.pow(10, dvdcol);
    var expAns = (dividend % Mat.pow(10, dvdcol + 1) - discard) / Mat.pow(10, dvdcol);
    if (ans === expAns) {
        ansBxs[bxNo].style.color = "black";
        if (dvddigs[whatDig].style.color === "red") {
            dvddigs[whatDig].style.color = "black";
        }
        doc.getElementById("msg").innerHTML = "";
        var newval = thisRowsBdDigsVal + 1;;
        gBringDownDigs[sbx] = newval;
        ++lastBoxOfCurrRow;
        var nextbox = nextQuotBox;
        whatbox = nextbox;
    } else {
        dvddigs[whatDig].style.color = "red";
        //doc.getElementById("msg").innerHTML = "not " + ans;
        upDateErrCount();
    }
    setDivFocus();
}
function checkDivBorrow(col, sbx) {
    var ciBx = document.getElementById("ca" + col + "_" + sbx);
    var ans = Number(ciBx.value);

    if (ans === 1) {
        //document.getElementById("msg").innerHTML = "";
        ciBx.style.color = "black";
        setDivFocus();
    } else {
        upDateErrCount();
        ciBx.style.color = "red";
        ciBx.value = "";
        //doc.getElementById("msg").innerHTML = "";
        //doc.getElementById("msg").innerHTML = "not " + ans;
    }
}
function checkNewDivVal(col, sbx) {
    var doc = document;
    //doc.getElementById('statusBox2').innerHTML = "col = " + col + " sbx = " + sbx;
    //var doc.getElementById("msg") = doc.getElementById("msg");
    var borFrmBxs;
    var whatBorFrm;
    var borFrmValue;
    var borFrmBx;
    var Num = Number;
    if (sbx === 0) {
        borFrmBxs = doc.getElementsByName("dvddigs");
        whatBorFrm = borFrmBxs.length - 1 - col;
        borFrmBx = borFrmBxs[whatBorFrm];
        borFrmValue = Num(borFrmBx.childNodes[0].nodeValue); // read fixed node value
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
        borFrmValue = Num(borFrmBx.value); // read from input
    }
    var coBx = doc.getElementById("ca" + col + "_" + sbx);
    var co = 0;
    if (coBx) {
        co = 10 * Num(coBx.value);
    }
    var newBx = doc.getElementById("bo" + col + "_" + sbx);

    var prevCol = col - 1;
    var ciBx = doc.getElementById("ca" + prevCol + "_" + sbx);
    var ans = Num(newBx.value);
    var corrAns = co + borFrmValue - 1;

    if (corrAns > 9) {
        corrAns = corrAns - co;
    }
    if (ans === corrAns) {
        doc.getElementById("msg").innerHTML = "";
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
        doc.getElementById("msg").innerHTML = "";
        doc.getElementById("msg").innerHTML = "not " + ans;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
//function promptDivBorrow(col, sbx) {
function promptDivBorrow( ev ) {
    ev = ev || window.event;
    var doc = document;
    //for (var j = 0; j < 18; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    var evTarg = ev.target;
    var id = evTarg.getAttribute("id");
    if( id ) {
        var Num = Number;
        var idlen = id.length;
        var col = id.substring(2,idlen);
        var startpt = col.indexOf("_") + 1;
        var sbx = Num(col.substring( startpt, idlen ));
        col = Num(col.match(/[^_]*/));
        //doc.getElementById("statusBox" + x).innerHTML = "in promptDivBorrow col = " + col + ", sbx = " + sbx;
        //x = x + 1;
        var borFrmBxs;
        var whatBorFrm;
        var borFrmValue;
        var borFrmBx;
        var caBx;
        var prevCol = col - 1;
        if (col > 0) {
            if (sbx === 0) {
                borFrmBxs = doc.getElementsByName("dvddigs");
                whatBorFrm = borFrmBxs.length - 1 - col;
                //doc.getElementById("statusBox" + x).innerHTML = "sbx = " + sbx + " col = " + col + " whatBorFrm = " + whatBorFrm;
                //x = x + 1;
                borFrmBx = borFrmBxs[whatBorFrm];
                borFrmValue = Num(borFrmBx.childNodes[0].nodeValue); // read fixed node value
                //var whatHca = "hca" + prevCol + "_" + 0;
                var whatHca = "ca" + prevCol + "_" + 0;
                caBx = doc.getElementById(whatHca);
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
                borFrmValue = Num(borFrmBx.value); // read from input
                //var whatHca = "hca" + prevCol + "_" + sbx;
                var whatHca = "ca" + prevCol + "_" + sbx;
                caBx = doc.getElementById(whatHca);
                //doc.getElementById("statusBox" + x).innerHTML = "checking hidden carry " + whatHca + " col = " + col + " bdlength = " + bdlength;
                //x = x + 1;
            }
            var caValue = gCarries[prevCol][sbx];
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
            if ( caBx &&
                    caValue !== 0 &&
                    doc.getElementsByName("showborrows")[0].checked ) {
                //var doc.getElementById("msg") = doc.getElementById("msg");
                doc.getElementById("msg").innerHTML = "";
                //doc.getElementById("statusBox" + x).innerHTML = "col = " + col + " sbx = " + sbx + " newBx = " + newBx;
                //x = x + 1;
                if (borFrmValue === 0) {
                    // if 0 then cross off the carry in as well
                    // if it's 0 & no carry in, there is nothing to borrow so do nothing
                    if (coBx && Num(coBx.value) === 1) {
                        borFrmBx.style.setProperty("text-decoration", "line-through");
                        borFrmBx.onclick = null;
                        coBx.style.textDecoration = "line-through";
                        newBx.focus();
                        newBx.style.backgroundColor = "white";
                        newBx.style.color = "red";
                        newBx.style.border = "1px solid black";
                        newBx.value = "";
                    }
                } else {
                    borFrmBx.style.setProperty("text-decoration", "line-through");
                    borFrmBx.onclick = null;
                    newBx.focus();
                    newBx.style.backgroundColor = "white";
                    newBx.style.color = "red";
                    newBx.style.border = "1px solid black";
                    newBx.value = "";
                }

                var nCols = doc.getElementsByName("dvddigs");
                var mtBoxes = 0;
                for (var idx = 0; idx < nCols.length; idx++) {
                    var whatBorrow = "bo" + idx + "_" + sbx;
                    newBx = doc.getElementById(whatBorrow);
                    if (newBx) {
                        if (newBx.value === "") {
                            mtBoxes += 1;
                        }
                    }
                }
                if (mtBoxes < 2) { // one empty box is allowed because it's above the
                    // digit that you just clicked on
                    var displayBorrow = doc.getElementById("dispBo");
                    displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
                }
            } else {
                setDivFocus();
            }
        }
    }
}

function zeroDivCounts() {
    var doc = document;

    // update problem counts
    doc.getElementById("numAttmptd").value = 0;
    doc.getElementById("errs").value = 0;
    doc.getElementById("numWoErr").value = 0;
    doc.getElementById("consWoErr").value = 0;
    doc.getElementById("strtTime").value = Number(Date.now());
    doc.getElementById("corrPerHr").value = 0;
    //startDivAgain();
    //doc.getElementById("startAgain").value = "yes";
    doc.getElementById('th-id2').submit();
    // what if it's not blank? fixit why would it not be blank?
    if (doc.getElementById("msg").value === "") {
        setDivFocus();
    }
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
    var noMorQDigs = nextQuotBox;

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
    var quotDp = Num(doc.getElementById("quotDp").value);
    var difflvl = "not set";
    var allCorrect = true;
    var Mat = Math;
    var barDrawn = false;
    var dispRmdr = 0;
    if (doc.getElementById("Remainders").checked) {
        difflvl = doc.getElementById("Remainders").value;
        var rmdrBoxes = doc.getElementsByName("rmdr");
        var rmdrLength = rmdrBoxes.length;
        for( var i = 0; i < rmdrLength; ++i ) {
            dispRmdr += Num(rmdrBoxes[rmdrLength-1-i].value)*Mat.pow(10,i);
        }
    }
    var lastRowLength = lastrow.length;
    var lastRowValue = lastrow[lastRowLength - 1].value;
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
    } else if (doc.getElementById("Round Off").checked) {
        difflvl = doc.getElementById("Round Off").value;
        var nSigDig = Num(doc.getElementById("nSigDig").value);
        var dispRnd = doc.getElementById("dispRnd");
        // make sure all the round off instruction messages are gone 
        // and all the significant digits are filled in. If so, everything
        // has already been checked and found correct
        if( dispRnd.innerHTML === "" ) {
            var maxi = qlength - 1 - nSigDig;
            for( var i = 0; i < maxi; ++i ) {
                if( !quotdigs[i].value ) {
                    allCorrect = false;
                    //doc.getElementById("statusBox" + x).innerHTML = "quotDigs[" + i + "] = " + quotdigs[i] + " value =>" + quotdigs[i].value + "<";
                    //x = x + 1;
                }
            }
        } else {
            allCorrect = false;
            //doc.getElementById("statusBox" + x).innerHTML = "dispRnd not blank";
            //x = x + 1; // dbfxt
        }
    } else {    // check all quotient digits are filled 
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
    //doc.getElementById("startAgain").value = "yes";
    //alert("ok?");
    doc.getElementById('th-id2').submit();
    if (doc.getElementById("msg").value === "") {
        setDivFocus();
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
            //doc.getElementById("statusBox" + x).innerHTML = "i = " + i + " which_one = " + which_one + " nbts = " + nbtns;
            //x = x + 1;
            if (i === which_one) {
                btns[i].childNodes[0].nodeValue = ".";
                var markedDec = nbtns - i; // reverse the index
                if (totDec === markedDec) {
                    btns[i].style.color = "black";
                    // don't let user muck it up again
                    for( var j = 0; j < nbtns; ++j ) {
                        btns[j].onclick = null;
                    }
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
                    if (btns[i].style.color === "red") {
                        btns[i].childNodes[0].nodeValue = "_";
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
            quotTd[i].onclick = showQuotDigs;
            //doc.getElementById("statusBox" + x).innerHTML = "added onclick = showQuotDigs to " + quotTd[i].getAttribute("id");
            //x = x + 1;
        }
        var notQuotDigits = doc.getElementsByName("notthestartdig");
        length = notQuotDigits.length;
        for (var i = 0; i < length; ++i) {
            if (notQuotDigits[i].nodeType === 1) {
                notQuotDigits[i].onclick = showQuotDigs;
                //doc.getElementById("statusBox" + x).innerHTML = "added onclick to " + notQuotDigits[i].getAttribute("id"); //  + " = " + notQuotDigits[i].onclick;
                //x = x + 1;
            }
        }      
        var dvdDigs = doc.getElementsByName("dvddigs");
        var expDvdDp = Num(doc.getElementById("dvdDp").value);
        length = dvdDigs.length;
        var leadzeros = true;
        for (var i = 0; i < length; ++i) {
            var whichDig = dvdDigs[i];
            if (length - i >= expDvdDp) {
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
    var crossrest = false;
    var nSigDig = Num(doc.getElementById("nSigDig").value);
    var quotDp = Number(doc.getElementById("quotDp").value);
    var willBzeros = nSigDig >= quotDp - 1;
    //var doc.getElementById("msg") = doc.getElementById("msg");
    for( var i = 0; i < quotLength; ++i ) {
        var whatCol = quotLength - 1 - i;
        var whatQuotBx = quotdigs[i];

        if( !crossrest ) {
            if( whatQuotBx.isEqualNode(evTarg ) ) {
                var dispRnd = doc.getElementById("dispRnd");
                var clickedPlace = whatCol;
                if( clickedPlace === nSigDig ) {
                    startnow = true;
                    doc.getElementById("msg").innerHTML = "";
                    dispRnd.style.color = "red";
                    dispRnd.innerHTML = "Enter rounded value";
                    // insignificant digits start after the decimal point, 
                    // even if this is a significant digits problem, not a 
                    // decimal places problem, this digit will never be changed 
                    // to zero
                    if( nSigDig < quotDp - 1 ) {
                        
                        crossrest = true;
                        //doc.getElementById("statusBox" + x).innerHTML = "nSigDig = " + nSigDig +" quotDp = " + quotDp;
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
                                    // find out if it is new most dignificant digit of quotient
                                    if( all.elements[nextbox].getAttribute("id").substring(0,2) === "xt" ) {
                                        var newPlace = nSigDig + 1;
                                        if( newPlace < quotDp - 1 ) {
                                            quotdigs[quotLength - 1 - newPlace].style.setProperty("text-decoration", "line-through");
                                        }
                                        //doc.getElementById("statusBox" + x).innerHTML = "newPlace = " + newPlace +" quotDp = " + quotDp;
                                        //x = x + 1;
                                        doc.getElementById("nSigDig").value = newPlace;
                                    }
                                }
                            }
                            //doc.getElementById("statusBox" + x).innerHTML = "evTarg = " + evTarg.getAttribute("id") + " j = " + j + " nextbox = " + nextbox;
                            //x = x + 1;
                            whatbox = nextbox;
                        }
                    }
                } else {
                    var rndMsg = dispRnd.innerHTML;
                    var length = rndMsg.length;
                    rndMsg = rndMsg.substring(19, length); // strip out the first part
                    rndMsg = rndMsg.match(/[^,]*/); // keep everything up to the first comma
                    doc.getElementById("msg").innerHTML = rndMsg + " is not there, finish the calculations if needed and click somewhere else";
                    upDateErrCount();
                    break;
                }
            // reached the decimal point    
            } else if( willBzeros && whatCol < quotDp  - 1 ) {
                crossrest = true;
            }
        }
        if( startnow ) {
            whatQuotBx.onkeyup = checkRoundOff;
            var hasContent = whatQuotBx.value;
            if( hasContent && crossrest ) {
                whatQuotBx.style.setProperty("text-decoration", "line-through");
            }
        }
    }
    //doc.getElementById("statusBox" + x).innerHTML = "in roundOff about to setfocus nextbox = " + doc.getElementById("whatbox").value;
    setDivFocus();
}
function checkRoundOff( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    var doc = document;
    //for (var j = 0; j < 30; j++) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    //doc.getElementById("statusBox" + x).innerHTML = "in checkRoundOff";
    //x = x + 1;
    var Num = Number;
    //var doc.getElementById("msg") = doc.getElementById("msg")
    var id = ansBx.getAttribute("id");
    var idlen = id.length;
    var col = Num((id.substring(2,idlen)));
    var quotient = Num(doc.getElementById("quotient").value);
    var Mat = Math;
    var roundedQuot = Mat.floor((quotient + 5*Mat.pow(10,col-1))/Mat.pow(10,col));

    var header = doc.getElementById("F1");                   
    var significant = header.innerHTML;
    significant = significant.match(/significant/);
    var nSigDig = Num(doc.getElementById("nSigDig").value) + 1;
    var quotDigs = doc.getElementsByName("quotdigs");
    var qLength = quotDigs.length;
    if( significant && nSigDig > col ) {
        roundedQuot = Mat.floor((quotient + 5*Mat.pow(10,nSigDig-1))/Mat.pow(10,nSigDig));
        //document.getElementById("statusBox" + x).innerHTML = "roundedQuot = " + roundedQuot;
        //x = x + 1;
        var j = nSigDig - 1;
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
        doc.getElementById("msg").innerHTML = "";
        ansBx.style.color = "black";
        var dispRnd = doc.getElementById("dispRnd");
        
        var nextbox = whatbox;
        
        var quotDp = Num(doc.getElementById("quotDp").value);
        if( col > nSigDig ||  col >= quotDp ) {         
            nextbox = nextbox + 1;
        } else { // only one place to round
            if( dispRnd ) {
                dispRnd.innerHTML = "";
            }
            // push whatbox outside the table
            var all = doc.getElementById("th-id2");
            var length = all.length;
            for( var i = 0; i < length; ++i ) {
                if( all.elements[i].isEqualNode(doc.getElementById("whatbox")) ) {
                    nextbox = i;
                }
            }
        }
        whatbox = nextbox;
    } else {
        var entireNum = Mat.floor(quotient/Mat.pow(10,col-1));
        doc.getElementById("msg").innerHTML = entireNum + " does not round to " + enteredQuot + "0, should be " + roundedQuot;
        upDateErrCount();
        //doc.getElementById("statusBox" + x).innerHTML = "in checkROundOff enteredQuot = " + enteredQuot + " != roundedQuot = " + roundedQuot;
        //x = x + 1;
    }
    setDivFocus();
}
// set the default input focus
function setDivFocus() {
    var x = document.getElementById("th-id2");
    var i = whatbox;
    var j = document.getElementById("whatbox");
    var i =  whatbox < 0 ? Number(j.value) : whatbox;
    if( !x.elements[i].isEqualNode(j) ) {
        x.elements[i].style.backgroundColor = "white";
        x.elements[i].style.color = "red";
        x.elements[i].type = "text";
        //x.elements[i].value="";
        x.elements[i].onkeydown = clearthis;
        x.elements[i].focus(); // set focus to whatbox
    } else {
        x.elements[i].focus();
        x.elements[i].blur();
    }
}
function clearthis( ev ) {
    ev = ev || window.ev;
    var evTarg = ev.target;
    evTarg.value = "";
}
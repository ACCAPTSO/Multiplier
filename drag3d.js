/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// iMouseDown represents the current mouse button state: up or down 
	/*
	lMouseState represents the previous mouse button state so that we can
	check for button clicks and button releases:
	if(iMouseDown && !lMouseState) // button just clicked!
	if(!iMouseDown && lMouseState) // button just released!
	*/ 
var x = 0;
var dragHelper  = new Array();
var redTarg = false;
var greenTarg = false;
var blueTarg = false;
var yellowTarg = false;
var cyanTarg = false;
var magentaTarg = false;
var whiteTarg = false;
var operands = new Array();
var dragging = false;
var dragBox = null; // this is the dragHelper clicked on
var boxHeight = 0;
var boxWidth = 0;
var yClick = null;
var xOffs = 0;
var cStrtY = 0;
var cHgtY =  0;
var targPos = 0;
var whatTarg = 0;
var catRed = 0;
var catMagenta = 0;
var catWhite = 0;
var catYellow = 0;
var catBlue = 0;
var catCyan = 0;
var catGreen = 0;

        
var mouseOffset = null; 
var iMouseDown  = false; 
var lMouseState = false; 
var curTarget   = null;


function getMouseOffset(target, ev){ 
    ev = ev || window.event; 
    var docPosX    = target.style.left.match(/[0-9]+/); // left of target
    var docPosY    = target.style.top.match(/[0-9]+/); // top of target
    var mousePos  = mouseCoords(ev);
    return {x:mousePos.x - docPosX, y:mousePos.y - docPosY}; 
} 
function getPosition(e){ 
    var left = 0; 
    var top  = 0; 
    while (e.offsetParent){ 
        left += e.offsetLeft; 
	top  += e.offsetTop; 
        e     = e.offsetParent; 
    } 
    left += e.offsetLeft; 
    top  += e.offsetTop; 
    return {x:left, y:top}; 
}
function mouseCoords(ev){ 
    var doc = document;
    if(ev.pageX || ev.pageY){ 
	return {x:ev.pageX, y:ev.pageY}; 
    } 
    return { 
	x:ev.clientX + doc.body.scrollLeft - doc.body.clientLeft, 
	y:ev.clientY + doc.body.scrollTop  - doc.body.clientTop
    }; 
} 	
function mouseMove(ev){ 
    ev         = ev || window.event; 
    var mousePos = mouseCoords(ev);
    var dBox = dragBox;
            
    if( dragging ){ 
	// if the user is just starting to drag the element 
	if(iMouseDown && !lMouseState){ 
            mouseOffset   = getMouseOffset(dBox, ev); 
	} 
        var leftH = mousePos.x - mouseOffset.x; 
        var topH = mousePos.y - mouseOffset.y;
	dBox.style.left = leftH + "px";
        dBox.style.top = topH + "px";
        
    } 
    // track the current mouse state so we can compare against it next time 
    lMouseState = iMouseDown; 
    // this helps prevent items on the page from being highlighted while dragging 
    return false; 
} 
function mouseUp(ev){ 
    //var mousePos = mouseCoords(ev);   
    if( dragBox ){ 
        //alert("mouse up at x, y: " + mousePos.x + ", " + mousePos.y);
        checklineup();
    } 
    iMouseDown = false; 
    dragging = false;
    xOffs = 0;
} 
function mouseDown(ev){ 
    ev = ev || window.event; 
    iMouseDown = true;
    var doc = document;
    //checkLineup();
    //if( doc.getElementById("linedUp").value === "true" ){ 
    //    checkLineup();
	//return false; 
    //} 

    var mousePos = mouseCoords(ev);
    var dHelper = dragHelper;
    var dhlength = dHelper.length;
    var bxHgt = boxHeight;
    var bxWid = boxWidth;

    for( var i = 0; i < dhlength; ++i ) {
        var dHelp = dHelper[i];
        var hPos = getPosition( dHelp);
        var top = hPos.y; // Num(dHelper[i].style.marginTop.match(/[0-9]+/)); 
        var bottom = top + bxHgt;
        var left = hPos.x; // Num(dHelper[i].style.marginLeft.match(/[0-9]+/));
        var right = left + bxWid;
        var alreadyMoved = dHelp.getAttribute("moved");
        //document.getElementById("statusBox" + x).innerHTML = "i: " +i + " top: " + top + " bottom: " + bottom + " left: " + left + " right: " + right;
        //x = (x + 1)%10;
        if( alreadyMoved === "false" &&
                top < mousePos.y && mousePos.y < bottom &&
                   left < mousePos.x && mousePos.x < right ) {
            var val = dHelp.value;
            var id = dHelp.id;
            //document.getElementById("statusBox" + x).innerHTML = "mousedown at target " + i + " value: " + val + " id: " + id;
            //x = (x + 1)%10;
            // find all possible targets   
            var cats = doc.getElementsByClassName("cat");
            var len = cats.length;
            for( var j = 0; j < len; ++j ){
                if( val === cats[j].value ) {
                    var id = cats[j].id;
                    var idlen = id.length;
                    var idnum = id.substr(1,idlen);
                    redTarg = doc.getElementById("nRed" + idnum).value !== "0";
                    greenTarg = doc.getElementById("nGreen" + idnum).value !== "0";
                    blueTarg = doc.getElementById("nBlue" + idnum).value !== "0";
                    yellowTarg = doc.getElementById("nYellow" + idnum).value !== "0";
                    cyanTarg = doc.getElementById("nCyan" + idnum).value !== "0";
                    magentaTarg = doc.getElementById("nMagenta" + idnum).value !== "0";
                    whiteTarg = doc.getElementById("nWhite" + idnum).value !== "0";
                }
            }
            dragBox = dHelp;
            dragging = true;
        }
    }
} 
function checklineup() {
    var doc = document;
    var num = Number;
    var mat = Math;

    if( doc.getElementById("linedUp").value === "false") {
        var allLinedUp = true;
        // for every distinct prime factor
        // for every venn section
        // count the dhelpers that have been dragged there
        var cats = doc.getElementsByClassName("cat");
        var ncats = cats.length;
        //var sections = new Array( " white", " magenta", " yellow", 
        //                                " cyan", " blue", " red", " green" );
        for( var kdx = 0; kdx < ncats; ++kdx ) {
            var whatCat = cats[kdx];        
            var dHelperIdx = dragBox;
            var dVal = num(dHelperIdx.value);
            if( num(whatCat.value) === dVal ) {
                var bxHgt = boxHeight;
                var bxWid = boxWidth;
                var rad = radius;
                var rCentX = redCenterX;
                var rCentY = redCenterY;
                var gCentX = greenCenterX;
                var gCentY = greenCenterY;
                var bCentX = blueCenterX;
                var bCentY = blueCenterY;
                var w = window;
                var e = doc.documentElement;
                var g = doc.getElementsByTagName('body')[0];
                var y = w.innerHeight|| e.clientHeight|| g.clientHeight;
                var hid = dHelperIdx.id;
                var hidlen = hid.length;
                var pos = hid.indexOf("_");
                var col = num(hid.substr(pos+1, hidlen));
                var origRed = col === 3;
                var origGreen = col === 6;
                var origBlue = col === 0;
                var catid = whatCat.id;
                var catidlen = catid.length;
                var idnum = catid.substr(1,catidlen);
                //doc.getElementById("statusBox" + x).innerHTML = "dVal, catid, idnum:  " + dVal + ", " + catid + ", " + idnum;
                //x = (x + 1)%10;
                var roccurs = num(doc.getElementById("roccurs" + idnum).value);
                var goccurs = num(doc.getElementById("goccurs" + idnum).value);
                var boccurs = num(doc.getElementById("boccurs" + idnum).value);
		var redWasPoss = false;
		var magentaWasPoss = false;
		var whiteWasPoss = false;
		var yellowWasPoss = false;
		var blueWasPoss = false;
		var cyanWasPoss = false;
		var greenWasPoss = false;
                var possPlaces = 0;
                //doc.getElementById("statusBox" + x).innerHTML = "roccurs, goccurs, boccurs:  " + roccurs + ", " + goccurs + ", " + boccurs;
                //x = (x + 1)%10;
                //doc.getElementById("statusBox" + x).innerHTML = "origRed, origGreen, origBlue:  " + origRed + ", " + origGreen + ", " + origBlue;
                //x = (x + 1)%10;
		if( origRed ) {
                    if( roccurs > goccurs && roccurs > boccurs ) {
                        redWasPoss = true;
                        possPlaces += 1;
                    }
                    if( goccurs > boccurs && roccurs > boccurs) {
                        yellowWasPoss = true;
                        possPlaces += 1;
                    } else if( boccurs > goccurs && roccurs > goccurs ) {
                        magentaWasPoss = true;
                        possPlaces += 1;
                    }
                    if( goccurs >= roccurs && boccurs >= roccurs ||
                            roccurs >= goccurs && roccurs >= boccurs &&
                            goccurs > 0 && boccurs > 0) {
                        whiteWasPoss = true;
                        possPlaces += 1;
                    }
		} else if( origBlue ) {
                    if( boccurs > roccurs && boccurs > goccurs ) {
                        blueWasPoss = true;
                        possPlaces += 1;
                    }
                    if( roccurs > goccurs && boccurs > goccurs) {
                        magentaWasPoss = true;
                        possPlaces += 1;
                    } else if( goccurs > roccurs && boccurs > roccurs) {
                        cyanWasPoss = true;
                        possPlaces += 1;
                    }
                    if( roccurs >= boccurs && goccurs >= boccurs ||
                            boccurs >= roccurs && boccurs >= goccurs &&
                            roccurs > 0 && goccurs > 0) {
                        whiteWasPoss = true;
                        possPlaces += 1;
                    }
		} else if( origGreen ) {
                    if( goccurs > roccurs && goccurs > boccurs ) {
                        greenWasPoss = true;
                        possPlaces += 1;
                    }
                    if( roccurs > boccurs && goccurs > boccurs) {
                        yellowWasPoss = true;
                        possPlaces += 1;
                    } else if( boccurs > roccurs && goccurs > roccurs) {
                        cyanWasPoss = true;
                        possPlaces += 1;
                    }
                    if( roccurs >= goccurs && boccurs >= goccurs ||
                            goccurs >= roccurs && goccurs >= boccurs &&
                            roccurs > 0 && boccurs > 0 ) {
                        whiteWasPoss = true;
                        possPlaces += 1;
                    }
		} else {
                    //alert( dVal + " didn't originate anywhere");
		}
                    
                var whiteBx = doc.getElementById("nWhite" + idnum);
                var nWhite = num(whiteBx.value);
                var whitePoss = nWhite > 0;

                var magentaBx = doc.getElementById("nMagenta" + idnum);
                var nMagenta = num(magentaBx.value);
                var magentaPoss = nMagenta > 0 && (origRed || origBlue);

                var yellowBx = doc.getElementById("nYellow" + idnum);
                var nYellow = num(yellowBx.value);
                var yellowPoss = nYellow > 0 && (origRed || origGreen); 

                var cyanBx = doc.getElementById("nCyan" + idnum);
                var nCyan = num(cyanBx.value);
                var cyanPoss = nCyan > 0 && (origBlue || origGreen);

                var blueBx = doc.getElementById("nBlue" + idnum);
                var nBlue = num(blueBx.value);
                var bluePoss = nBlue > 0 && origBlue;

                var redBx = doc.getElementById("nRed" + idnum);
                var nRed = num(redBx.value);
                var redPoss = nRed > 0 && origRed;

                var greenBx = doc.getElementById("nGreen" + idnum);
                var nGreen = num(greenBx.value);
                var greenPoss = nGreen > 0 &&  origGreen;

                var dPosX = getPosition( dHelperIdx ).x + bxWid/2;
                var dPosY = getPosition( dHelperIdx ).y + bxHgt/2;
                var distFromRed = mat.sqrt(mat.pow(dPosX-rCentX, 2) + mat.pow(dPosY-rCentY, 2));
                var distFromGreen = mat.sqrt(mat.pow(dPosX-gCentX, 2) + mat.pow(dPosY-gCentY, 2));
                var distFromBlue = mat.sqrt(mat.pow(dPosX-bCentX, 2) + mat.pow(dPosY-bCentY, 2));
                //doc.getElementById("statusBox" + x).innerHTML = "nWhite: " + nWhite + " distFromRed: " + distFromRed + " distFromGreen: " + distFromGreen + " distFromBlue: " + distFromBlue + " radius: " + rad;
                //x = (x + 1)%10;
                //alert("nWhite: " + nWhite + " distFromRed: " + distFromRed + " distFromGreen: " + distFromGreen + " distFromBlue: " + distFromBlue + " radius: " + rad );
                if( whitePoss && 
                        distFromRed < rad && 
                        distFromBlue < rad && 
                        distFromGreen < rad ) {
                    var cW = catWhite;
                    var leftPos = whiteXpos;
                    var topPos = whiteYpos + cW*0.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos );
                    dHelperIdx.setAttribute("name", "white");
                    dHelperIdx.setAttribute("position", topPos);
                    dHelperIdx.setAttribute("moved", "true");
                    //alert("about to copy cols leftPos: " + leftPos + " topPos: " + topPos);
                    copyCols( dVal, col === 0, col === 3, col === 6, leftPos, topPos, "white" );
                    nWhite = nWhite - 1;
                    whiteBx.value = nWhite;
                    catWhite = cW + 1;
                } else if( magentaPoss && 
                    distFromRed < rad && 
                    distFromBlue < rad &&
                    distFromGreen > rad ) {
                    var cM = catMagenta;
                    var leftPos = magentaXpos;
                    var topPos = magentaYpos + cM*0.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos ); 
                    dHelperIdx.setAttribute("name", "magenta");
                    dHelperIdx.setAttribute("position", topPos);
                    dHelperIdx.setAttribute("moved", "true");
                    copyCols( dVal, col === 0, col === 3, true, leftPos, topPos, "magenta" );
                    nMagenta = nMagenta - 1;
                    magentaBx.value = nMagenta;
                    catMagenta = cM + 1;
                } else if( yellowPoss && 
                    distFromRed < rad && 
                    distFromGreen < rad &&
                    distFromBlue > rad ) {
                    var cY = catYellow;
                    var leftPos = yellowXpos;
                    var topPos = yellowYpos + cY*.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos );
                    dHelperIdx.setAttribute("name", "yellow");
                    dHelperIdx.setAttribute("position", topPos);
                    dHelperIdx.setAttribute("moved", "true");
                    copyCols( dVal, true, col === 3, col === 6, leftPos, topPos, "yellow" );
                    nYellow = nYellow - 1;
                    yellowBx.value = nYellow;
                    catYellow = cY + 1;
                } else if( cyanPoss && 
                    distFromBlue < rad && 
                    distFromGreen < rad &&
                    distFromRed > rad ) {
                    var cC = catCyan;
                    var leftPos = cyanXpos;
                    var topPos = cyanYpos + cC*.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos ); 
                    dHelperIdx.setAttribute("name", "cyan");
                    dHelperIdx.setAttribute("position", topPos);
                    dHelperIdx.setAttribute("moved", "true");
                    copyCols( dVal, col === 0, true, col === 6, leftPos, topPos, "cyan" );
                    nCyan = nCyan - 1;
                    cyanBx.value = nCyan;
                    catCyan = cC + 1;
                } else if( bluePoss && 
                    distFromBlue < rad && 
                    distFromGreen > rad &&
                    distFromRed > rad ) {
                    var cB = catBlue;
                    var topPos = blueYpos + cB*.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, blueXpos, topPos );  
                    dHelperIdx.setAttribute("name", "blue");
                    dHelperIdx.setAttribute("position", topPos);
                    nBlue = nBlue - 1;
                    blueBx.value = nBlue;
                    catBlue = cB + 1;
                    var instr0 = doc.getElementById("instr0");
                    var instr1 = doc.getElementById("instr1");
                    instr0.style.color = "#e2eeeb";
                    instr1.style.color = "#e2eeeb";
                    instr0.innerHTML = "Drag each prime factor to the section";
                    instr1.innerHTML = "of the Venn diagram where it belongs.";
                    var mx = doc.getElementsByClassName("instrs").length;
                    for( var instIdx = 2; instIdx < mx; ++instIdx) {
                        var whatInstr = doc.getElementById("instr" + instIdx);
                        whatInstr.style.color = "#3961a2";
                    }
                } else if( redPoss && 
                    distFromBlue > rad && 
                    distFromGreen > rad &&
                    distFromRed < rad ) {
                    var cR = catRed;
                    var topPos = redYpos + cR*.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, redXpos, topPos );  
                    dHelperIdx.setAttribute("name", "red");
                    dHelperIdx.setAttribute("position", topPos);
                    nRed = nRed - 1;
                    redBx.value = nRed;
                    catRed = cR + 1;
                    var instr0 = doc.getElementById("instr0");
                    var instr1 = doc.getElementById("instr1");
                    instr0.style.color = "#e2eeeb";
                    instr1.style.color = "#e2eeeb";
                    instr0.innerHTML = "Drag each prime factor to the section";
                    instr1.innerHTML = "of the Venn diagram where it belongs.";
                    var mx = doc.getElementsByClassName("instrs").length;
                    for( var instIdx = 2; instIdx < mx; ++instIdx) {
                        var whatInstr = doc.getElementById("instr" + instIdx);
                        whatInstr.style.color = "#3961a2";
                    }
                } else if( greenPoss && 
                    distFromBlue > rad && 
                    distFromGreen < rad &&
                    distFromRed > rad ) {
                    var cG = catGreen;
                    var topPos = greenYpos + cG*.03*y;
                    setBox( dHelperIdx, dPosX, dPosY, greenXpos, topPos ); 
                    dHelperIdx.setAttribute("name", "green");
                    dHelperIdx.setAttribute("position", topPos);
                    nGreen = nGreen - 1;
                    greenBx.value = nGreen;
                    catGreen = cG + 1;
                    var instr0 = doc.getElementById("instr0");
                    var instr1 = doc.getElementById("instr1");
                    instr0.style.color = "#e2eeeb";
                    instr1.style.color = "#e2eeeb";
                    instr0.innerHTML = "Drag each prime factor to the section";
                    instr1.innerHTML = "of the Venn diagram where it belongs.";
                    var mx = doc.getElementsByClassName("instrs").length;
                    for( var instIdx = 2; instIdx < mx; ++instIdx) {
                        var whatInstr = doc.getElementById("instr" + instIdx);
                        whatInstr.style.color = "#3961a2";
                    }
                } else {
                    var instrs = new Array(5);
                    var instIdx = 0;
                    dHelperIdx.style.color = "red";
                    var nextCol = col + 1;
                    var origOp = doc.getElementById("g0_" + nextCol).value;
                    instrs[instIdx] = "This " + dVal + " factor originated from " + origOp;
                    var whatInstr = doc.getElementById("instr" + instIdx);
                    whatInstr.innerHTML = instrs[instIdx];
                    whatInstr.style.color = "#e2eeeb";
                    ++instIdx;
                    // explain about where it originated and what places are taken already fixit
                    /*
                    doc.getElementById("statusBox" + x).innerHTML = "possPlaces: " + possPlaces + " takenPlaces: " + takenPlaces;
                    x = (x + 1)%10;
                    doc.getElementById("statusBox" + x).innerHTML = "whiteWasPoss:  " + whiteWasPoss + " magentaWasPoss: " + magentaWasPoss + " yellowWasPoss: " + yellowWasPoss;
                    x = (x + 1)%10;
                    doc.getElementById("statusBox" + x).innerHTML =  " cyanWasPoss: " + cyanWasPoss + " blueWasPoss:   " + blueWasPoss + " redWasPoss: " + redWasPoss + " greenWasPoss:  " + greenWasPoss;
                    x = (x + 1)%10;
                    doc.getElementById("statusBox" + x).innerHTML = "whitePoss:  " + whitePoss + " magentaPoss: " + magentaPoss + " yellowPoss: " + yellowPoss;
                    x = (x + 1)%10;
                    doc.getElementById("statusBox" + x).innerHTML =  " cyanPoss: " + cyanPoss + " bluePoss:   " + bluePoss + " redPoss: " + redPoss + " greenPoss:  " + greenPoss;
                    x = (x + 1)%10;
                    */
                    // don't allow inputs to be moved once placed. Create another 
                    // drag box for moving it to the white graph paper and erase 
                    // that drag box once the problem is done
                                        
                    if( possPlaces === 1 ) {
                        if( origRed && boccurs === 0 && goccurs === 0 ||
                                origBlue && goccurs === 0 && roccurs === 0 ||
                                origGreen && roccurs === 0 && boccurs === 0) {
                            var onlyPlace = redWasPoss? "red" : greenWasPoss? "green" : "blue";
                            instrs[instIdx] = "Only " + origOp + " has a factor of " + dVal + ", so " + dVal + " goes in " + onlyPlace + ".";
                        } else if( whiteWasPoss ) {
                            var otherCol1 = (col + 3)%9 + 1;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = (col + 6)%9 + 1;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = otherOp1 + " & " + otherOp2 + " have >= number of " + dVal + "s than " + origOp + ", so " + dVal + " goes in white.";
                        } else if( magentaWasPoss ) {
                            var otherCol1 = col === 0? 4 : 1;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = 7;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] =  otherOp1 + " has >= # " + dVal + "s than " + origOp + ", " + otherOp2 + " has none, so " + dVal + " goes in magenta.";
                        } else if( yellowWasPoss ) {
                            var otherCol1 = col === 3? 7 : 4;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = 1;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = otherOp1 + " has >= # " + dVal + "s than " + origOp + ", " + otherOp2 + " has none, so " + dVal + " goes in yellow.";
                        } else if( cyanWasPoss ) {
                            var otherCol1 = col === 0? 7 : 1;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = 4;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = otherOp1 + " has >=  # " + dVal + "s than " + origOp + ", " + otherOp2 + " has none, so " + dVal + " goes in cyan.";
                        }
                        whatInstr = doc.getElementById("instr" + instIdx);
                        whatInstr.innerHTML = instrs[instIdx];
                        whatInstr.style.color = "#e2eeeb";
                        ++instIdx;
                    } else {
                        if( whiteWasPoss ) {
                            var otherCol1 = (col + 3)%9 + 1;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = (col + 6)%9 + 1;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = otherOp1 + " & " + otherOp2 + " have one or more " + dVal + "s also, so " + dVal + " can go in white.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        }
                        if( magentaWasPoss ) {
                            var otherCol1 = col === 0? 4 : 1;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = 7;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = origOp + " & " + otherOp1 + " have >= # " + dVal + "s than " + otherOp2 + ", so " + dVal + " can go in magenta.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        } else if( yellowWasPoss ) {
                            var otherCol1 = col === 3? 7 : 4;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = 1;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = origOp + " & " + otherOp1 + " have >= # " + dVal + "s than " + otherOp2 + ", so " + dVal + " can go in yellow.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        } else if( cyanWasPoss ) {
                            var otherCol1 = col === 0? 7 : 1;
                            var otherOp1 = doc.getElementById("g0_" + otherCol1).value;
                            var otherCol2 = 4;
                            var otherOp2 = doc.getElementById("g0_" + otherCol2).value;
                            instrs[instIdx] = origOp + " & " + otherOp1 + " have >= # " + dVal + "s than " + otherOp2 + ", so " + dVal + " can go in cyan.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        }
                        if( redWasPoss ) {
                            var otherOp1 = doc.getElementById("g0_1").value;
                            var otherOp2 = doc.getElementById("g0_7").value;
                            instrs[instIdx] = origOp + " has >= # " + dVal + "s than " + otherOp1 + " or "+ otherOp2 + ", so " + dVal + " can go in red.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        } else if( blueWasPoss ) {
                            var otherOp1 = doc.getElementById("g0_4").value;
                            var otherOp2 = doc.getElementById("g0_7").value;
                            instrs[instIdx] = origOp + " has >= # " + dVal + "s than " + otherOp1 + " or "+ otherOp2 + ", so " + dVal + " can go in blue.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        } else if( greenWasPoss ) {
                            var otherOp1 = doc.getElementById("g0_1").value;
                            var otherOp2 = doc.getElementById("g0_4").value;
                            instrs[instIdx] = origOp + " has >= # " + dVal + "s than " + otherOp1 + " or "+ otherOp2 + ", so " + dVal + " can go in green.";
                            whatInstr = doc.getElementById("instr" + instIdx);
                            whatInstr.innerHTML = instrs[instIdx];
                            whatInstr.style.color = "#e2eeeb";
                            ++instIdx;
                        }
                    }
                    var idx = instIdx;
                    var wasPoss = new Array( whiteWasPoss, magentaWasPoss, 
			    		yellowWasPoss, cyanWasPoss, 
			    blueWasPoss, redWasPoss, greenWasPoss );
                    var poss = new Array( whitePoss, magentaPoss, yellowPoss, 
                                        cyanPoss, bluePoss, redPoss, greenPoss );
                    var sections = new Array( "white", "magenta", "yellow", 
                                        "cyan", "blue", "red", "green" );
                                        
                    var raylen = wasPoss.length;
                    
                    for( var i = 0; i < raylen; ++i ) {
                        if( wasPoss[i] && !poss[i] ) {
                                instrs[instIdx++] = "The " + dVal + "s in the " + sections[i] + " section are accounted for, so don't put it there."; 
                            }
                    }
                    
                    for( ; idx < instIdx; ++idx ) {
                        whatInstr = doc.getElementById("instr" + idx);
                        whatInstr.innerHTML = instrs[idx];
                        whatInstr.style.color = "#e2eeeb";
                    }
                    var mx = doc.getElementsByClassName("instrs").length;
                    while( instIdx < mx ) {
                        whatInstr = doc.getElementById("instr" + instIdx);
                        whatInstr.style.color = "#3961a2";
                        ++instIdx;
                    }
                }
                break;
            }
            //doc.getElementById("statusBox2").innerHTML = "after kdx loop";
        }
        var allboxes = doc.getElementsByClassName("dragBox");
        var len = allboxes.length;
        //doc.getElementById("statusBox0").innerHTML = "len: " + len;
        for( var i = 0; i < len; ++i ) {
            if( allboxes[i].getAttribute("moved") === "false" ) {
                allLinedUp = false;
                break;
            }
        }
        if( allLinedUp ) {
            //alert("it's all lined up");
            doc.getElementById("instr0").innerHTML = "Multiply the factors in each section";
            var mx = doc.getElementsByClassName("instrs").length;
            for( var instIdx = 1; instIdx < mx; ++instIdx) {
                var whatInstr = doc.getElementById("instr" + instIdx);
                whatInstr.style.color = "#3961a2";
            }
            dragBox  = null;
            //cdx = 0;
            //gprod = 1;
            getMultiplying();
        }
    }
    dragBox  = null;
}

function setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos ){
    if( dPosX !== leftPos ) { // line them up if not exact        
        dHelperIdx.style.left = leftPos + "px";
    }
    if( dPosY !== topPos ) {   
        dHelperIdx.style.top = topPos + "px";
    }
    dHelperIdx.style.color = "#3961a2";
    dHelperIdx.setAttribute("moved", "true");
}
function copyCols( val, col0Moved, col3Moved, col6Moved, leftPos, topPos, boxName ) {
    var doc = document;
    var num = Number;
    var allBoxes = doc.getElementsByClassName("dragBox");
    var allBxLen = allBoxes.length;
    x = 0;
    //for( var j = 0; j < 14; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    for( var i = 0; i < allBxLen; ++i ) {
        var whatBx = allBoxes[i];  
        if( whatBx ) {
            var bxid = whatBx.id;
            var bxVal = num(whatBx.value);
            //doc.getElementById("statusBox" + x).innerHTML = "i: " + i + " val: " + val + " id: " + bxid;
            //x = (x + 1)%14;
            if( bxVal === val ) {
                var notMovedYet = whatBx.getAttribute("moved") === "false";
                //doc.getElementById("statusBox" + x).innerHTML = "i: " + i + " allBxLen: " + allBxLen + " notMovedYet: " + notMovedYet;
                //x = (x + 1)%14;
                //alert("notMovedYet: " + notMovedYet + " id: " + (whatBx.id));
                if( notMovedYet ) {
                    var bxidlen = bxid.length;
                    var pos = bxid.indexOf("_");
                    var bxCol = num(bxid.substr(pos+1, bxidlen));
                    //doc.getElementById("statusBox" + x).innerHTML = "i: " + i + " bxid" + bxid + " col036Moved: " + col0Moved + col3Moved + col6Moved;
                    //x = (x + 1)%14;
                    if( bxCol === 0 && !col0Moved ||
                        bxCol === 3 && !col3Moved ||
                        bxCol === 6 && !col6Moved    ) {
                        whatBx.style.left = leftPos + "px";
                        whatBx.style.top = topPos + "px";
                        whatBx.style.color = "#3961a2";
                        whatBx.setAttribute("moved", "true");
                        whatBx.setAttribute("name", boxName);
                        whatBx.setAttribute("position", topPos);
                        col0Moved = col0Moved || bxCol === 0;
                        col3Moved = col3Moved || bxCol === 3;
                        col6Moved = col6Moved || bxCol === 6;
                        if( col0Moved && col3Moved && col6Moved ) {
                            break;
                        }
                    }
                }
            }
        }
    }
    var instr0 = doc.getElementById("instr0");
    var instr1 = doc.getElementById("instr1");
    instr0.style.color = "#e2eeeb";
    instr1.style.color = "#e2eeeb";
    instr0.innerHTML = "Drag each prime factor to the section";
    instr1.innerHTML = "of the Venn diagram where it belongs.";
    var mx = doc.getElementsByClassName("instrs").length;
    for( var instIdx = 2; instIdx < mx; ++instIdx) {
        var whatInstr = doc.getElementById("instr" + instIdx);
        whatInstr.style.color = "#3961a2";
    }
}
       
document.onmousemove = mouseMove; 
document.onmousedown = mouseDown;
document.onmouseup   = mouseUp; 
function draggerSetup(){ 
    var doc = document;

    //for( var j = 0; j < 18; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    
    if( doc.getElementById("linedUp").value !== "true" ) {
        var num = Number;
        var getstyle = getComputedStyle;
	var ghostBoxes = doc.getElementsByClassName("ghost");
	var glen = ghostBoxes.length;
	for( var i = 0; i < glen; ++i ) {
            var whatGhost = ghostBoxes[i];
            var whatId = whatGhost.id;
            var idlen = whatId.length;
            var unPos = whatId.indexOf("_");
            var row = whatId.substr(1,unPos);
            var col = whatId.substr(unPos+1,idlen);
            var whatValue = whatGhost.value;
            if( row === "0" || (num(col)%3 === 0 && whatValue !== "" ) ) {
                whatGhost.style.background = "#4270b1"; // midrange
                whatGhost.style.color = "#11397a";
                var testInput = doc.createElement("input");
		var newId = "d" + whatId.substring(1, idlen);
                var pos = getPosition(whatGhost);
		var xcoord = pos.x;
		var ycoord = pos.y;
                //alert("row: " + row + " col: " + col + " xcoord: " + xcoord + " ycoord: " + ycoord);
                testInput.id = newId;
                testInput.type="text";
                testInput.setAttribute("value",whatValue);
                testInput.setAttribute("class","dragBox");
                testInput.style.position = "absolute";
                testInput.setAttribute("moved","false"); 
                testInput.style.background = "#e2eeeb";
                testInput.style.color = "#3961a2";
                testInput.style.left = xcoord + "px";
                testInput.style.top = ycoord + "px";
            	doc.body.appendChild(testInput);
                
            }
	}
        var dHelper  = doc.getElementsByClassName("dragBox");
        var instr0 = doc.getElementById("instr0");
        var instr1 = doc.getElementById("instr1");
        instr0.style.color = "#e2eeeb";
        instr1.style.color = "#e2eeeb";
        instr0.innerHTML = "Drag each prime factor to the section";
        instr1.innerHTML = "of the Venn diagram where it belongs.";
        var mx = doc.getElementsByClassName("instrs").length;
        for( var instIdx = 2; instIdx < mx; ++instIdx) {
            var whatInstr = doc.getElementById("instr" + instIdx);
            whatInstr.style.color = "#3961a2";
        }
        boxHeight = num(getstyle(dHelper[0]).height.match(/[0-9]+/));
        boxWidth = num(getstyle(dHelper[0]).width.match(/[0-9]+/));
        dragHelper = dHelper;
    }
}

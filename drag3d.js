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
//var x = 0;
// if you drag a box after it has been placed, you can never put it back. fixit
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
var mId = 0;
        
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
    if( dragBox ){ 
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
    if( doc.getElementById("linedUp").value === "true" ){ 
	return false; 
    } 

    var mousePos = mouseCoords(ev);
    var dHelper = dragHelper;
    var dhlength = dHelper.length;
    var bxHgt = boxHeight;
    var bxWid = boxWidth;
    //document.getElementById("statusBox" + x).innerHTML = "mousedown at " + mousePos.x + ", " + mousePos.y;
    //x = x + 1;
    for( var i = 0; i < dhlength; ++i ) {
        var dHelp = dHelper[i];
        var hPos = getPosition( dHelp);
        var top = hPos.y; // Num(dHelper[i].style.marginTop.match(/[0-9]+/)); 
        var bottom = top + bxHgt;
        var left = hPos.x; // Num(dHelper[i].style.marginLeft.match(/[0-9]+/));
        var right = left + bxWid;
        
        //document.getElementById("statusBox" + x).innerHTML = "i: " +i + " top: " + top + " bottom: " + bottom + " left: " + left + " right: " + right;
        //x = x + 1;
        if( top < mousePos.y && mousePos.y < bottom &&
                   left < mousePos.x && mousePos.x < right ) {
            // find all possible targets
            var val = dHelp.value;
            var hid = dHelp.id;
            //doc.getElementById("statusBox3").innerHTML = "in MouseDown value: " + val + " id: " + hid;
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
        
        for( var kdx = 0; kdx < ncats; ++kdx ) {
            var whatCat = cats[kdx];        
            var dHelperIdx = dragBox;
            var dVal = dHelperIdx.value;
            if( whatCat.value === dVal ) {
                var instString = "Drag each prime factor to the section";
                var instString2 = "of the Venn diagram where it belongs.";
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
                //var roccurs = num(doc.getElementById("roccurs" + idnum));
                //var goccurs = num(doc.getElementById("goccurs" + idnum));
                //var boccurs = num(doc.getElementById("boccurs" + idnum));
                    
                var possPlaces = 0;
                var whiteBx = doc.getElementById("nWhite" + idnum);
                var nWhite = num(whiteBx.value);
                var whitePoss = nWhite > 0;
                if( whitePoss ) {
                    possPlaces += 1;
                }
                var magentaBx = doc.getElementById("nMagenta" + idnum);
                var nMagenta = num(magentaBx.value);
                var magentaPoss = nMagenta > 0 && (origRed || origBlue);
                if( magentaPoss ) {
                    possPlaces += 1;
                }
                var yellowBx = doc.getElementById("nYellow" + idnum);
                var nYellow = num(yellowBx.value);
                var yellowPoss = nYellow > 0 && (origRed || origGreen); 
                if( yellowPoss ) {
                    possPlaces += 1;
                }
                var cyanBx = doc.getElementById("nCyan" + idnum);
                var nCyan = num(cyanBx.value);
                var cyanPoss = nCyan > 0 && (origBlue || origGreen);
                if( cyanPoss ) {
                    possPlaces += 1;
                }
                var blueBx = doc.getElementById("nBlue" + idnum);
                var nBlue = num(blueBx.value);
                var bluePoss = nBlue > 0 && origBlue;
                if( bluePoss ) {
                    possPlaces += 1;
                }
                var redBx = doc.getElementById("nRed" + idnum);
                var nRed = num(redBx.value);
                var redPoss = nRed > 0 && origRed;
                if( redPoss ) {
                    possPlaces += 1;
                }
                var greenBx = doc.getElementById("nGreen" + idnum);
                var nGreen = num(greenBx.value);
                var greenPoss = nGreen > 0 &&  origGreen;
                if( greenPoss ) {
                    possPlaces += 1;
                }

                var takenPlaces = possPlaces;
                var dPosX = getPosition( dHelperIdx ).x + bxWid/2;
                var dPosY = getPosition( dHelperIdx ).y + bxHgt/2;
                var distFromRed = mat.sqrt(mat.pow(dPosX-rCentX, 2) + mat.pow(dPosY-rCentY, 2));
                var distFromGreen = mat.sqrt(mat.pow(dPosX-gCentX, 2) + mat.pow(dPosY-gCentY, 2));
                var distFromBlue = mat.sqrt(mat.pow(dPosX-bCentX, 2) + mat.pow(dPosY-bCentY, 2));
                //alert("nWhite: " + nWhite + " distFromRed: " + distFromRed + " distFromGreen: " + distFromGreen + " distFromBlue: " + distFromBlue + " radius: " + rad );
                if( whitePoss && 
                        distFromRed < rad && 
                        distFromBlue < rad && 
                        distFromGreen < rad ) {
                    var leftPos = whiteXpos;
                    var topPos = whiteYpos;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos );
                    copyCols( dVal, col === 0, col === 3, col === 6, leftPos, topPos);
                    whiteYpos = topPos + 0.03*y;
                    //alert("nWhite: " + nWhite);
                    nWhite = nWhite - 1;
                    whiteBx.value = nWhite;
                } else if( magentaPoss && 
                    distFromRed < rad && 
                    distFromBlue < rad &&
                    distFromGreen > rad ) {
                    var leftPos = magentaXpos;
                    var topPos = magentaYpos;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos );  
                    copyCols( dVal, col === 0, col === 3, true, leftPos, topPos );
                    magentaYpos = topPos + 0.03*y;
                    //alert("nMagenta: " + nMagenta);
                    nMagenta = nMagenta - 1;
                    magentaBx.value = nMagenta;
                } else if( yellowPoss && 
                    distFromRed < rad && 
                    distFromGreen < rad &&
                    distFromBlue > rad ) {
                    var leftPos = yellowXpos;
                    var topPos = yellowYpos;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos );
                    copyCols( dVal, true, col === 3, col === 6, leftPos, topPos );
                    yellowYpos = topPos + 0.03*y;
                    //alert("nYellow: " + nYellow);
                    nYellow = nYellow - 1;
                    yellowBx.value = nYellow;
                } else if( cyanPoss && 
                    distFromBlue < rad && 
                    distFromGreen < rad &&
                    distFromRed > rad ) {
                    var leftPos = cyanXpos;
                    var topPos = cyanYpos;
                    setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos ); 
                    copyCols( dVal, col === 0, true, col === 6, leftPos, topPos );
                    cyanYpos = topPos + 0.03*y;
                    //alert("nCyan: " + nCyan);
                    nCyan = nCyan - 1;
                    cyanBx.value = nCyan;
                } else if( bluePoss && 
                    distFromBlue < rad && 
                    distFromGreen > rad &&
                    distFromRed > rad ) {
                    var topPos = blueYpos;
                    setBox( dHelperIdx, dPosX, dPosY, blueXpos, topPos );  
                    blueYpos = topPos + 0.03*y;
                    //alert("nBlue: " + nBlue);
                    nBlue = nBlue - 1;
                    blueBx.value = nBlue;
                } else if( redPoss && 
                    distFromBlue > rad && 
                    distFromGreen > rad &&
                    distFromRed < rad ) {
                    var topPos = redYpos;
                    setBox( dHelperIdx, dPosX, dPosY, redXpos, topPos );  
                    redYpos = topPos + 0.03*y;
                    //alert("nRed: " + nRed);
                    nRed = nRed - 1;
                    redBx.value = nRed;
                    dHelperIdx.style.color = "#3961a2";
                } else if( greenPoss && 
                    distFromBlue > rad && 
                    distFromGreen < rad &&
                    distFromRed > rad ) {
                    var topPos = greenYpos;
                    setBox( dHelperIdx, dPosX, dPosY, greenXpos, topPos ); 
                    greenYpos = topPos + 0.03*y;
                    //alert("nGreen: " + nGreen);
                    nGreen = nGreen - 1;
                    greenBx.value = nGreen;
                } else {
                    dHelperIdx.style.color = "red";
                    instString = dVal + " is a factor of ";
                    var blueVal = num(doc.getElementById("g0_1").value);
                    var redVal = num(doc.getElementById("g0_4").value);
                    var greenVal = num(doc.getElementById("g0_7").value);
                    var divByBlue = blueVal%dVal === 0;
                    var divByRed = redVal%dVal === 0;
                    var divByGreen = greenVal%dVal === 0;
                    var divCount = 0;
                    if( divByBlue ) {
                        divCount += 1;
                    }
                    if( divByRed ) {
                        divCount += 1;
                    }
                    if( divByGreen ) {
                        divCount += 1;
                    }
                    if( divCount < 2 ) {
                        if( divByBlue ) {
                            instString = instString + blueVal + ".";
                        } else if( divByRed ) {
                            instString = instString + redVal + ".";
                        } else if( divByGreen ) {
                            instString = instString + greenVal + ".";
                        }
                    } else if( divCount < 3 ) {
                        if( divByBlue ) {
                            instString = instString + blueVal + " and ";
                            if( divByRed ) {
                                instString = instString + redVal;
                            } else {
                                instString = instString + greenVal;
                            }
                        } else {
                            instString = instString + redVal + " and " + greenVal;
                        }
                    } else {
                        instString = instString + blueVal + ", " + redVal + " and " + greenVal;
                    }
                    
                    // explain about where it originated and what places are taken already fixit
                    //doc.getElementById("statusBox" + x).innerHTML = "possPlaces: " + possPlaces + " takenPlaces: " + takenPlaces;
                    //++x;
                    //doc.getElementById("statusBox" + x).innerHTML = "whitePoss:  " + whitePoss + " magentaPoss: " + magentaPoss;
                    //++x;
                    //doc.getElementById("statusBox" + x).innerHTML = "yellowPoss: " + yellowPoss + " cyanPoss: " + cyanPoss;
                    //++x;
                    //doc.getElementById("statusBox" + x).innerHTML = "bluePoss:   " + bluePoss + " redPoss: " + redPoss;
                    //++x;
                    //doc.getElementById("statusBox" + x).innerHTML = "greenPoss:  " + greenPoss;
                    //++x;
                    // if you move a factor out again the error message is meaningless fixit
                    // plus you can't put it anywhere
                    instString2 = "It can go in the ";
                    var poss = new Array( whitePoss, magentaPoss, yellowPoss, 
                                        cyanPoss, bluePoss, redPoss, greenPoss );
                    var sections = new Array( " white", " magenta", " yellow", 
                                        " cyan", " blue", " red", " green" );
                    var raylen = poss.length;
                    for( var i = 0; i < raylen; ++i ) {
                        if( poss[i] ) {
                            instString2 = instString2 + sections[i];
                            if( takenPlaces > 2 ) {
                                instString2 = instString2 + ", ";
                            } else if( takenPlaces > 1 ) {
                                instString2 = instString2 + " or";
                            } else {
                                break;
                            }
                            takenPlaces -= 1;
                        }
                    }
                    instString2 = instString2  + " section";
                    if( possPlaces > 1 ) {
                        instString2 = instString2  + "s.";
                    } else {
                        instString2 = instString2  + ".";
                    }
                }
                doc.getElementById("instr").innerHTML = instString;
                doc.getElementById("instr2").innerHTML = instString2;
                break;
            }
            //doc.getElementById("statusBox2").innerHTML = "after kdx loop";
        }
        var allboxes = doc.getElementsByClassName("dragBox");
        var len = allboxes.length;
        //var pNode = allboxes[0].parentNode;
        //var nName = pNode.nodeName;
        //alert("parent node of dragBox is " + pNode + " name is " + nName);
        //doc.getElementById("statusBox0").innerHTML = "len: " + len;
        for( var i = 0; i < len; ++i ) {
            var boxI = allboxes[i];
            var isMoved = boxI.getAttribute("moved");
            var val = boxI.value;
            //doc.getElementById("statusBox3").innerHTML = "i: " + i + " isMoved: " + isMoved + " val: " + val;
            //alert("go yet?");
            if( isMoved === "false" && val != "" ) {
                var bxid = boxI.id;
                var bxidlen = bxid.length;
                var pos = bxid.indexOf("_");
                var bxCol = num(bxid.substr(pos+1, bxidlen));
                if( bxCol%3 == 0 ) {
                    allLinedUp = false;
                    break;
                }
            }
        }
        //doc.getElementById("statusBox1").innerHTML = "before all lined up check";
        if( allLinedUp ) {
            //doc.getElementById("linedUp").value = "true"; 
            //doc.getElementById("statusBox1").innerHTML = "all lined up";
            var instr = "Answer the questions on";
            var instr2 = "the white graph paper";
            var totreds = doc.getElementById("totreds").value;
            if( num(totreds) > 1 ) {
                //alert("reds are greater than 1");
                setBar( redXpos, redYpos, "white", "red" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }
            var totmagentas = doc.getElementById("totmagentas").value;
            if( num(totmagentas) > 1 ) {
                //alert("magentas are greater than 1");
                setBar( magentaXpos, magentaYpos, "white", "magenta" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }
            var totwhites = doc.getElementById("totwhites").value;
            if( num(totwhites) > 1 ) {
                //alert("whites are greater than 1");
                setBar( whiteXpos, whiteYpos, "black", "white" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }
            var totyellows = doc.getElementById("totyellows").value;
            if( num(totyellows) > 1 ) {
                //alert("yellows are greater than 1");
                setBar( yellowXpos, yellowYpos, "black", "yellow" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }
            var totblues = doc.getElementById("totblues").value;
            if( num(totblues) > 1 ) {
                //alert("blues are greater than 1");
                setBar( blueXpos, blueYpos, "white", "blue" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }
            var totcyans = doc.getElementById("totcyans").value;
            if( num(totcyans) > 1 ) {
                //alert("cyans are greater than 1");
                setBar( cyanXpos, cyanYpos, "black", "cyan" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }
            var totgreens = doc.getElementById("totgreens").value;
            if( num(totgreens) > 1 ) {
                //alert("greens are greater than 1");
                setBar( greenXpos, greenYpos, "black", "green" );
                instr = "Multiply out the prime factors in";
                instr2 = "each section";
            }        
            var products = doc.getElementsByName("prod");
            var plen = products.length;
            if( plen > 0 ) {
                products[0].focus();
            }
            doc.getElementById("instr").innerHTML = instr;
            doc.getElementById("instr2").innerHTML = instr2;
        } else {
            //doc.getElementById("statusBox1").innerHTML = "not lined up yet";
            //doc.getElementById("instr").innerHTML = "Drag factors";
        }
        //doc.getElementById("statusBox2").innerHTML = "after all lined up check";
    }
    dragBox  = null;
}
function setBar( xPos, yPos, txtColor, secColor ){
    var doc = document;
    var num = Number;
    var getstyle = getComputedStyle;
    // add an input
    // draw a bar
    // draw an "X"    
    var newInput = doc.createElement("input");
    var bar = doc.createElement("div");
    var ex = doc.createElement("label");
    var newId = secColor + "_prod";
    newInput.setAttribute("type", "text"); 
    newInput.setAttribute("value", ""); 
    newInput.setAttribute("id", newId);
    newInput.setAttribute("onkeyup", "checkM( event )");
    newInput.setAttribute("onkeydown","erase( event )");
    newInput.setAttribute("class", "dragBox");
    newInput.setAttribute("moved", "false");
    newInput.setAttribute("name", "prod");
    ex.innerHTML = "X";
    ex.style.color = txtColor;
    newInput.style.left = xPos + "px";
    xPos = xPos - 20;
    bar.style.left = xPos + "px";
    bar.style.top = yPos + "px";
    ex.style.left = xPos + "px";
    yPos = yPos + 5;
    newInput.style.top = yPos + "px";
    yPos = yPos - 25;
    ex.style.top = yPos + "px";
    ex.style.position = "absolute";
    bar.style.border = "1px solid " + txtColor;
    //bar.style.backgroud = "black";
    var inputWidth = num(getstyle(newInput).width.match(/[0-9]+/));
    var inputHeight = num(getstyle(newInput).lineHeight.match(/[0-9]+/));
    ex.style.height = inputHeight + "px";
    ex.style.width = "20px";
    //alert("input height: " + inputHeight);
    bar.style.width = (20 + inputWidth) + "px";
    bar.style.height = "0px";
    bar.style.visible = "true";
    bar.style.position = "absolute";
    var parent = doc.getElementById("thisbody");
    parent.appendChild( bar );
    parent.appendChild( newInput );
    parent.appendChild( ex );
}
function setBox( dHelperIdx, dPosX, dPosY, leftPos, topPos ){
    if( dPosX !== leftPos ) { // line them up if not exact        
        dHelperIdx.style.left = leftPos + "px";
    }
    if( dPosY !== topPos ) {   
        dHelperIdx.style.top = topPos + "px";
    }
    var val = dHelperIdx.value;
    var hid = dHelperIdx.id;
    //document.getElementById("statusBox4").innerHTML = "in setBox value: " + val + " id: " + hid;
    dHelperIdx.style.color = "#3961a2";
    dHelperIdx.setAttribute("moved", "true");
    //alert("go yet?"); // this happens before attributes are set. proves nothing
}
function copyCols( val, col0Moved, col3Moved, col6Moved, leftPos, topPos ) {
    var doc = document;
    var num = Number;
    var allBoxes = doc.getElementsByClassName("dragBox");
    var allBxLen = allBoxes.length;
    for( var i = 0; i < allBxLen; ++i ) {
        var whatBx = allBoxes[i];
        var bxVal = whatBx.value;
        if( bxVal === val ) {
            var notMovedYet = whatBx.getAttribute("moved") === "false";
            //alert("notMovedYet: " + notMovedYet + " id: " + (whatBx.id));
            if( notMovedYet ) {
                var bxid = whatBx.id;
                var bxidlen = bxid.length;
                var pos = bxid.indexOf("_");
                var bxCol = num(bxid.substr(pos+1, bxidlen));
                if( bxCol === 0 && !col0Moved ||
                    bxCol === 3 && !col3Moved ||
                    bxCol === 6 && !col6Moved    ) {
                    whatBx.style.left = leftPos + "px";
                    whatBx.style.top = topPos + "px";
                    whatBx.setAttribute("moved", "true");
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
       
document.onmousemove = mouseMove; 
document.onmousedown = mouseDown;
document.onmouseup   = mouseUp; 
function draggerSetup(){ 
    var doc = document;
    var num = Number;
    var getstyle = getComputedStyle;
    //for( var j = 0; j < 18; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    

    if( doc.getElementById("linedUp").value !== "true") {
        var dHelper  = doc.getElementsByClassName("dragBox");
        //doc.getElementById("statusBox" + x).innerHTML = "dHelper: " + dHelper + " length: " + (dHelper.length) + " first id: " + dHelper[0].id;
        //x = x + 1;
        boxHeight = num(getstyle(dHelper[0]).height.match(/[0-9]+/));
        boxWidth = num(getstyle(dHelper[0]).width.match(/[0-9]+/));
        dragHelper = dHelper;
    }
}













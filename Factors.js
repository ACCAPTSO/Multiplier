/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var allprimes = [    2,  3,  5,  7, 11, 
                    13, 17, 19, 23, 29, 
                    31, 37, 41, 43, 47, 
                    53, 59, 61, 67, 71, 
                    73, 79, 83, 89, 97 ];
var redXpos;
var redYpos;
var magentaXpos;
var magentaYpos;
var whiteXpos;
var whiteYpos;
var yellowXpos;
var yellowYPos;
var blueXpos;
var blueYpos;
var cyanXpos;
var cyanYpos;
var greenXpos;
var greenYpos;
var redCenterX;
var redCenterY;
var blueCenterX;
var blueCenterY;
var greenCenterX;
var greenCenterY;
var radius;
var prevTop = 0;
var prevLeft = 0;

function erase( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    if( ansBx.style.color === "red") {
        ansBx.style.color = "#11397a";
        var answer = ansBx.value;
        var len = answer.length;
        ansBx.value = answer.substring(len, len);
    }
}
function check( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    var x = 0;
    if (ev.which === 13 || ev.keyCode === 13) {
        var doc = document;
        var num = Number;
        var id = ansBx.id.toString();
        var pos = id.indexOf("_");
        var col = num(id.substr(pos+1, id.length));
        var row = num(id.substr(1,pos-1));
        //alert("row: " + row + " col: " + col);
        var checkingPrime = col%3 === 0;
        var answer = num(ansBx.value);
        if( checkingPrime ) {
            //alert("checking prime");
            var opCol = col + 1;
            var whatOp = num(doc.getElementById("g" + row + "_" + opCol ).value);
            //var test = whatOp%potentialFact;
            //alert("whatOp: " + whatOp + " whatOp mod potentialfact: " + test);
            if( whatOp%answer === 0 ) {
                //alert(potentialFact + " is a factor of " + whatOp);
                var len = allprimes.length;
                var isPrime = false;
                for( var i = 0; i < len; ++ i ) {
                    if(answer === allprimes[i] ) {
                        isPrime = true;
                        //alert(answer + " is prime");
                        break;
                    }
                }
                if( isPrime ) {
                    ansBx.style.color = "#11397a";
                    /* shadow 103, 104, 99     #676863 */
                    /* midrange 66, 112, 177   #4270b1 */
                    /* mountain 180, 197, 226  #b4c5e2 */
                    /* rock 226, 181, 161 pink #e2b5a1 */
                    /* snow 226, 238, 235      #e2eeeb */
                    /* water 57, 97, 162       #3961a2 */
                    ansBx.style.backgroundColor = "#b4c5e2";
                    //var ghost = doc.getElementById( "g" + row + "_" + col );
                    //ghost.type = "text";
                    //ghost.value = answer;
                    //ghost.style.backgroundColor = "#4270b1";
                    col = col + 1;
                    row = row + 1;
                    //alert("next row: " + row + " next col: " + col);
                    var nextIn = doc.getElementById( "g" + row + "_" + col );
                    nextIn.type = "text";
                    nextIn.focus();
                    doc.getElementById("instr").innerHTML = 
                            "What is " + whatOp + " divided by " + answer + "? (Enter)";
                    var notDone = answer !== whatOp; 
                    if( notDone ) {
                        var nextTd = nextIn.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                    }
                } else {
                    ansBx.style.color = "red";    
                    doc.getElementById("instr").innerHTML = answer + " is not prime.";
                }
            } else {
                ansBx.style.color = "red";   
                doc.getElementById("instr").innerHTML = answer + " does not divide " + whatOp + " evenly.";
            }
        } else {
            //alert("checking division");
            var prevRow = row - 1;
            var prevCol = col - 1;
            var colPlus2;
            var prevOp = num(doc.getElementById("g" + prevRow + "_" + col).value);
            var prevPrime = num(doc.getElementById("g" + prevRow + "_" + prevCol).value);
            if( prevPrime*answer === prevOp ) {
                //var ghost = doc.getElementById( "g" + row + "_" + col );
                //ghost.type = "text";
                //ghost.value = answer;
                if( answer === 1 ) {
                    col = col + 2;
                    colPlus2 = col + 1;
                    row = 0;
                    var nextOp = doc.getElementById( "g" + row + "_" + colPlus2 );
                    if( nextOp ) {
                        nextOp.type = "text";
                        var nextVal = nextOp.value;
                        doc.getElementById("instr").innerHTML = 
                            "What is a prime number that evenly divides " + nextVal + "? (Enter)";
                        var nextTd = nextOp.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                    } else {
                        //alert("adding image, labels and testInput");
                        var snow = "#e2eeeb";
                        var water = "#3961a2"; //"#3f66a1";
                        doc.body.style.backgroundColor = "#3961a2";
                        var win = window;
                        var hgt = num(win.innerHeight);
                        var wid = num(win.innerWidth);
                        var minDim = hgt < wid ? hgt : wid;
                        var frame = doc.getElementById("circles");                               	 
                        var img = doc.createElement("img");
                        img.style.position = "absolute";
                        var imgHgt = 0.75*minDim;
                        img.style.height = imgHgt + "px";
			frame.style.height = imgHgt + "px";
                        var topPos = hgt - imgHgt;
                        var imgWid = 1.05*imgHgt;
                        img.style.width = imgWid + "px";
                        var leftPos = wid - imgWid;
                        //alert("wid: " + wid + " imgWid: " + imgWid);
                        frame.style.left = leftPos + "px";  
                        frame.style.top = topPos + "px";
                        //var firstlabel = frame.getElements[0];
                        //frame.appendChild(img);
                        frame.insertBefore(img, frame.childNodes[0]);
                        //doc.body.appendChild(frame);
                        img.src = 'Images/factors2.png'; // "url('Images/factors.png')";
                        doc.getElementById("instr").style.color = "#3961a2";
                        doc.getElementById("instr2").style.color = "#3961a2";
                        movelabels();
                        var redValue = doc.getElementById("g0_4").value;
                        var blueValue = doc.getElementById("g0_1").value;
                        var greenValue = doc.getElementById("g0_7").value;
                        var redLabel = doc.getElementById("redLabel");
                        redLabel.style.color = "white";
                        redLabel.innerHTML = "Factors of ";
                        var redLabel2 = doc.getElementById("redLabel2");
                        redLabel2.style.color = "white";
                        redLabel2.innerHTML = redValue + " only";
                        var magentaLabel = doc.getElementById("magentaLabel");
                        magentaLabel.style.color = "white";
                        magentaLabel.innerHTML = "Factors of"; 
                        var magentaLabel2 = doc.getElementById("magentaLabel2");
                        magentaLabel2.style.color = "white";
                        magentaLabel2.innerHTML = redValue;
                        var magentaLabel3 = doc.getElementById("magentaLabel3");
                        magentaLabel3.style.color = "white";
                        magentaLabel3.innerHTML = "and";
                        var magentaLabel4 = doc.getElementById("magentaLabel4");
                        magentaLabel4.style.color = "white";
                        magentaLabel4.innerHTML = blueValue;
                        var yellowLabel = doc.getElementById("yellowLabel");
                        yellowLabel.style.color = "black";
                        yellowLabel.innerHTML = "Factors of";
                        var yellowLabel2 = doc.getElementById("yellowLabel2");
                        yellowLabel2.style.color = "black";    
                        yellowLabel2.innerHTML = redValue;
                        var yellowLabel3 = doc.getElementById("yellowLabel3");
                        yellowLabel3.style.color = "black";    
                        yellowLabel3.innerHTML = "and";
                        var yellowLabel4 = doc.getElementById("yellowLabel4");
                        yellowLabel4.style.color = "black";    
                        yellowLabel4.innerHTML = greenValue;
                        var whiteLabel = doc.getElementById("whiteLabel");
                        whiteLabel.style.color = "black";
                        whiteLabel.innerHTML = "Factors of all three";
                        var blueLabel = doc.getElementById("blueLabel");
                        blueLabel.style.color = "white";
                        blueLabel.innerHTML = "Factors of " + blueValue + " only";
                        var greenLabel = doc.getElementById("greenLabel");
                        greenLabel.style.color = "black";
                        greenLabel.innerHTML = "Factors of " + greenValue + " only";
                        var cyanLabel = doc.getElementById("cyanLabel");
                        cyanLabel.style.color = "black";
                        cyanLabel.innerHTML = "Factors of";
                        var cyanLabel2 = doc.getElementById("cyanLabel2");
                        cyanLabel2.style.color = "black";
                        cyanLabel2.innerHTML =  blueValue;
                        var cyanLabel3 = doc.getElementById("cyanLabel3");
                        cyanLabel3.style.color = "black";
                        cyanLabel3.innerHTML = "and";
                        var cyanLabel4 = doc.getElementById("cyanLabel4");
                        cyanLabel4.style.color = "black";
                        cyanLabel4.innerHTML = greenValue;
                        
                        var stillBoxes = doc.getElementsByClassName("stillBox");
                        var len = stillBoxes.length;
                        for( var i = 0; i < len; ++i ) {
                            stillBoxes[i].style.backgroundColor = water;
                            stillBoxes[i].style.color = snow;
                        }
                        var tds = doc.getElementsByTagName("td");
                        len = tds.length;
                        for( var i = 0; i < len; ++i ) {
                            tds[i].style.borderColor = water; // "#3961a2"; 
                            var hasChild = tds[i].childNodes[1];
                            if( hasChild ) {
                                var id = hasChild.id;
                                if( id ) {                              
                                    var pos = id.indexOf("_");
                                    var col = num(id.substr(pos+1, id.length));                            
                                    //doc.getElementById("statusBox" + x).innerHTML = "child id is " + id + " column is " + col;
                                    //++x;
                                    if( (col+2)%3 === 0 ) { 
                                        hasChild.style.backgroundColor = water; // #3961a2"; 
                                        hasChild.style.color = snow; /* snow colored text  */
                                        /* tds[i].style.backgroundColor = "#3961a2"; /* water colored background */
                                        /* tds[i].style.color = "#e2eeeb"; /* snow colored divider text  */
                                        var val = num(hasChild.value);
                                        if( val > 1 ) {
                                            //doc.getElementById("statusBox" + x).innerHTML = "value is " + hasChild.value;
                                            //++x;
                                            tds[i].style.borderLeftColor =  snow;
                                            tds[i].style.borderBottomColor =  snow;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    col = prevCol;
                    doc.getElementById("instr").innerHTML = 
                       "What is a prime number that evenly divides " + answer + "? (Enter)";
                }
                var nextIn = doc.getElementById( "g" + row + "_" + col );
                if( nextIn ) {
                    nextIn.type = "text";
                    nextIn.focus();
                }
            } else {
                ansBx.style.color = "red";
                doc.getElementById("instr").innerHTML = prevOp + " divided by " + prevPrime + " is not " + answer + ".";
            }
        }
        return false;
    }
};
function getPos(e){ 
    var left = 0; 
    var top  = 0; 
    while (e.offsetParent){ 
        left += e.offsetLeft; 
	top  += e.offsetTop; 
        e     = e.offsetParent; 
    } 
    left += e.offsetLeft; 
    top  += e.offsetTop; 
    //left += 2;
    //top += 2;
    return {x:left, y:top}; 
}
function movelabels() {
    // move any previously moved drag boxes fixit
    // don't allow any movement until window is maximized
    var w = window;
    var doc = document;
    var mat = Math;
    var num = Number;
    var hgt = num(w.innerHeight);
    var wid = num(w.innerWidth);
    var minDim = hgt < wid ? hgt : wid;        
    var frame = doc.getElementById("circles");
    if( frame ) {
        var imgHgt = 0.75*minDim;
        var topPos = hgt - imgHgt;
        var imgWid = 1.05*imgHgt;
        var leftPos = wid - imgWid;
        var img = frame.getElementsByTagName("img")[0];
        if( img ) {   
            img.style.height = imgHgt + "px";
            img.style.width = imgWid + "px";
            //alert("window hgt, wid: " + hgt + ", " + wid + " imgHgt, imgWid: " + imgHgt + ", " + imgWid + " topPos, leftPos: " + topPos  + ", " + leftPos );
        }
        frame.style.left = leftPos + "px";  
        frame.style.top = topPos + "px";
        var prevX = prevLeft;
        var prevY = prevTop;
        //
        //alert("prevX: " + prevX + " prevY: " + prevY);
        redCenterX = leftPos + mat.round(0.5*imgWid);
        redCenterY = topPos + mat.round(0.349*imgHgt);
        blueCenterX = leftPos + mat.round(0.3*imgWid);
        blueCenterY = topPos + mat.round(0.6*imgHgt);
        greenCenterX = leftPos + mat.round(0.7*imgWid);
        greenCenterY = topPos + mat.round(0.6*imgHgt);
        radius = mat.round(0.333*imgWid);  
        redXpos = leftPos + mat.round(0.51*imgWid);
        magentaXpos = leftPos + mat.round(0.21*imgWid);
        yellowXpos = leftPos + mat.round(0.68*imgWid);
        whiteXpos = leftPos + mat.round(0.44*imgWid);
        blueXpos = leftPos + mat.round(0.08*imgWid);
        greenXpos = leftPos + mat.round(0.8*imgWid);
        cyanXpos = leftPos + mat.round(0.51*imgWid);
        //if( prevY === 0 ) {
            redYpos = topPos + mat.round(0.06*imgHgt);
            magentaYpos = topPos + mat.round(0.34*imgHgt);
            yellowYpos = topPos + mat.round(0.34*imgHgt);
            whiteYpos = topPos + mat.round(0.41*imgHgt);
            blueYpos = topPos  + mat.round(0.53*imgHgt);
            greenYpos = topPos  + mat.round(0.53*imgHgt);
            cyanYpos = topPos + mat.round(0.71*imgHgt);
        /* } else {
            redYpos = redYpos + topPos - prevY;
            magentaYpos = magentaYpos + topPos - prevY;
            yellowYpos = yellowYpos + topPos - prevY;
            whiteYpos = whiteYpos + topPos - prevY;
            blueYpos = blueYpos + topPos - prevY;
            greenYpos = greenYpos + topPos - prevY;
            cyanYpos = cyanYpos + topPos - prevY; 
        } */
        var allDragBoxes = doc.getElementsByClassName("dragBox");
        var dboxLen = allDragBoxes.length;   
        for( var i = 0; i < dboxLen; ++i ) {
            var whatBx = allDragBoxes[i];
            if( whatBx.getAttribute("moved") === "true") {
                var pos = getPos( whatBx );
                var xPos = pos.x + leftPos - prevX;
                var yPos = pos.y + topPos - prevY;
                whatBx.style.left = xPos + "px";
                whatBx.style.top = yPos + "px";
            }
        }
        prevTop = topPos;
        prevLeft = leftPos;
    }
    var home = doc.getElementById("home");
    var homepos = mat.round(hgt*0.87);
    home.style.marginTop = homepos + "px";
    var index = doc.getElementById("index");
    var indexpos = mat.round(hgt*0.91);
    index.style.marginTop = indexpos + "px";
    //alert("window size x: " + x + " y: " + y); // 1090, 742 // 1078, 727 // 1124, 758
    //if( 1000  < x && x < 1200 && 740 < y && y < 760 ) {
    var fullscr = w.fullScreen;
    var s = screen;
    var swid = num(s.width);
    var shgt = num(s.height);
    hgt = num(w.outerHeight);
    //alert("w.fullscreen: " + fullscr + " screen.width: " + swid + " screen.height: " + shgt + " w.width: " + wid + " w.height: " + hgt );
    if( fullscr ||
        ( wid === swid && shgt - 15 <= hgt && hgt <= shgt )) {
        doc.getElementById("instr0").style.color = "#3961a2";
        var dragExists = doc.getElementsByClassName("dragBox");
        if( !dragExists[0] ) {
            draggerSetup();
        }
    } else {
        doc.getElementById("instr0").style.color = "#d2edf9";
    }


    var redLabel = doc.getElementById("redLabel");                    
    redLabel.style.marginTop = (mat.round(0.14*imgHgt)) + "px";
    redLabel.style.marginLeft = (mat.round(0.25*imgWid)) + "px";
    var redLabel2 = doc.getElementById("redLabel2");                    
    redLabel2.style.marginTop = (mat.round(0.17*imgHgt)) + "px";
    redLabel2.style.marginLeft = (mat.round(0.25*imgWid)) + "px";
    var magentaLabel = doc.getElementById("magentaLabel");
    magentaLabel.style.marginTop = (mat.round(0.33*imgHgt)) + "px";
    magentaLabel.style.marginLeft = (mat.round(0.34*imgWid)) + "px";
    var magentaLabel2 = doc.getElementById("magentaLabel2");
    magentaLabel2.style.marginTop = (mat.round(0.36*imgHgt)) + "px";
    magentaLabel2.style.marginLeft = (mat.round(0.34*imgWid)) + "px";
    var magentaLabel3 = doc.getElementById("magentaLabel3");
    magentaLabel3.style.marginTop = (mat.round(0.39*imgHgt)) + "px";
    magentaLabel3.style.marginLeft = (mat.round(0.34*imgWid)) + "px";
    var magentaLabel4 = doc.getElementById("magentaLabel4");
    magentaLabel4.style.marginTop = (mat.round(0.42*imgHgt)) + "px";
    magentaLabel4.style.marginLeft = (mat.round(0.34*imgWid)) + "px";
    var yellowLabel = doc.getElementById("yellowLabel");   
    yellowLabel.style.marginTop = (mat.round(0.33*imgHgt)) + "px";
    yellowLabel.style.marginLeft = (mat.round(0.54*imgWid)) + "px";
    var yellowLabel2 = doc.getElementById("yellowLabel2");
    yellowLabel2.style.marginTop = (mat.round(0.36*imgHgt)) + "px";
    yellowLabel2.style.marginLeft = (mat.round(0.56*imgWid)) + "px";
    var yellowLabel3 = doc.getElementById("yellowLabel3");
    yellowLabel3.style.marginTop = (mat.round(0.39*imgHgt)) + "px";
    yellowLabel3.style.marginLeft = (mat.round(0.59*imgWid)) + "px";
    var yellowLabel4 = doc.getElementById("yellowLabel4");
    yellowLabel4.style.marginTop = (mat.round(0.42*imgHgt)) + "px";
    yellowLabel4.style.marginLeft = (mat.round(0.61*imgWid)) + "px";
    var whiteLabel = doc.getElementById("whiteLabel");
    whiteLabel.style.marginTop = (mat.round(0.62*imgHgt)) + "px";
    whiteLabel.style.marginLeft = (mat.round(0.39*imgWid)) + "px";
    var blueLabel = doc.getElementById("blueLabel");
    blueLabel.style.marginTop = (mat.round(0.92*imgHgt)) + "px";
    blueLabel.style.marginLeft = (mat.round(0.18*imgWid)) + "px";
    var greenLabel = doc.getElementById("greenLabel");
    greenLabel.style.marginTop = (mat.round(0.92*imgHgt)) + "px";
    greenLabel.style.marginLeft = (mat.round(0.55*imgWid)) + "px";
    var cyanLabel = doc.getElementById("cyanLabel");
    cyanLabel.style.marginTop = (mat.round(0.7*imgHgt)) + "px";
    cyanLabel.style.marginLeft = (mat.round(0.35*imgWid)) + "px";
    var cyanLabel2 = doc.getElementById("cyanLabel2");
    cyanLabel2.style.marginTop = (mat.round(0.73*imgHgt)) + "px";
    cyanLabel2.style.marginLeft = (mat.round(0.36*imgWid)) + "px";
    var cyanLabel3 = doc.getElementById("cyanLabel3");
    cyanLabel3.style.marginTop = (mat.round(0.76*imgHgt)) + "px";
    cyanLabel3.style.marginLeft = (mat.round(0.37*imgWid)) + "px";
    var cyanLabel4 = doc.getElementById("cyanLabel4");
    cyanLabel4.style.marginTop = (mat.round(0.79*imgHgt)) + "px";
    cyanLabel4.style.marginLeft = (mat.round(0.38*imgWid)) + "px";
}
window.onload = function(){
    var doc = document;
    var win = window;
    var num = Number;
    var mat = Math;
    var hgt = num(win.innerHeight);
    var wid = num(win.innerWidth);
    minDim = hgt < wid ? hgt : wid;
    var el = doc.getElementById("g0_0");
    el.focus();
    //draggerSetup();
    /* make 'ems' a consistent unit by setting all fonts the same */  
    var style = window.getComputedStyle(el, null).getPropertyValue("font");
    var ths = doc.getElementsByTagName("th");
    var len = ths.length;
    for( var i = 0; i < len; ++i ) {
        ths[i].style.font = style;
    }
    var tds = doc.getElementsByTagName("td");
    len = tds.length;
    for( var i = 0; i < len; ++i ) {
        tds[i].style.font = style;
    }
    
    /* position the draggable values over the ghosts */
    var ghosts = doc.getElementById("ghosts"); 
    ghosts.style.marginTop  = "14px"; 
    ghosts.style.marginLeft  = "11px";
    var home = doc.getElementById("home");
    var homepos = mat.round(hgt*0.87);
    home.style.marginTop = homepos + "px";
    var index = doc.getElementById("index");
    var indexpos = mat.round(hgt*0.91);
    index.style.marginTop = indexpos + "px";
};
window.onresize = function() {
    //window.settimout( 
    movelabels(); //, 1000 );
};

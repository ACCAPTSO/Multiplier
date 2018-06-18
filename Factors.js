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
                    /* var nextGhost = doc.getElementById( "g" + row + "_" + col );
                    nextGhost.type = "text";
                    var ghostPos = getPos( nextGhost );
                    var leftPos = ghostPos.x + "px";
                    var topPos = ghostPos.y + "px"; */
                    //alert("leftPos: " + leftPos + " topPos: " + topPos);
                    //nextIn.style.left = leftPos;
                    //nextIn.style.top = topPos;
                    nextIn.focus();
                    doc.getElementById("instr").innerHTML = 
                            "What is " + whatOp + " divided by " + answer + "? (Enter)";
                    var notDone = answer !== whatOp; 
                    if( notDone ) {
                        var nextTd = nextIn.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                        //var nextGhost = doc.getElementById( "g" + row + "_" + col );
                        //nextTd = nextGhost.parentNode;
                        //nextTd.style.borderLeftColor = "#11397a";
                        //nextTd.style.borderBottomColor = "#11397a";
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
                        //var nextGhost = doc.getElementById( "g" + row + "_" + colPlus2 );
                        //nextGhost.value = nextVal;
                        //nextGhost.type = "text";
                        //var ghostPos = getPos( nextGhost );
                        //var leftPos = ghostPos.x + "px";
                        //var topPos = ghostPos.y + "px";
                        //alert("leftPos: " + leftPos + " topPos: " + topPos);
                        //nextOp.style.left = leftPos;
                        //nextOp.style.top = topPos;
                        //nextTd = nextGhost.parentNode;
                        //nextTd.style.borderLeftColor = "#11397a";
                        //nextTd.style.borderBottomColor = "#11397a";
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
                        //img.id = "circles";
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
                        /*var testInput = doc.createElement("input");
                        testInput.id = "testInput";
                        testInput.type="text";
                        testInput.setAttribute("value","9999");
                        testInput.setAttribute("class","dragBox");
                        testInput.setAttribute("position", "absolute");
                        testInput.onkeyup="check( event )";
                        testInput.onkeydown="erase( event )";
                        testInput.setAttribute("moved","false"); 
                        testInput.style.background = "pink";
                        testInput.style.topPos = "300px";
                        testInput.style.leftPos = "400px";
                        doc.body.appendChild(testInput); */
                        draggerSetup();
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
                        var instr = doc.getElementById("instr");
                        var instr2 = doc.getElementById("instr2");
                        instr.style.color = snow;
                        instr2.style.color = snow;
                        instr.innerHTML = "Drag each prime factor to the section";
                        instr2.innerHTML = "of the Venn diagram where it belongs.";
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
                    var nextGhost = doc.getElementById( "g" + row + "_" + col );
                    nextGhost.type = "text";
                    var ghostPos = getPos( nextGhost );
                    var leftPos = ghostPos.x + "px";
                    var topPos = ghostPos.y + "px";
                    //alert("leftPos: " + leftPos + " topPos: " + topPos);
                    nextIn.style.left = leftPos;
                    nextIn.style.top = topPos;
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
    left += 2;
    top += 2;
    return {x:left, y:top}; 
}
function movelabels() {
    // move any previously moved drag boxes fixit
    var w = window;
    var doc = document;
    var mat = Math;
    var num = Number;
    var e = doc.documentElement;
    var g = doc.getElementsByTagName('body')[0];
    var f = doc.getElementById("circles");
    //var x = f.innerWidth; // || e.clientWidth || body.clientWidth;
    //var y = f.innerHeight; //|| e.clientHeight|| body.clientHeight;
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
        redCenterX = leftPos + mat.floor(0.5*imgWid);
        redCenterY = topPos + mat.floor(0.349*imgHgt);
        blueCenterX = leftPos + mat.floor(0.3*imgWid);
        blueCenterY = topPos + mat.floor(0.6*imgHgt);
        greenCenterX = leftPos + mat.floor(0.7*imgWid);
        greenCenterY = topPos + mat.floor(0.6*imgHgt);
        radius = mat.floor(0.333*imgWid);
        redXpos = leftPos + mat.floor(0.51*imgWid);
        redYpos = topPos + mat.floor(0.06*imgHgt); 
        magentaXpos = leftPos + mat.floor(0.21*imgWid);
        magentaYpos = topPos + mat.floor(0.34*imgHgt);
        yellowXpos = leftPos + mat.floor(0.68*imgWid);
        yellowYpos = topPos + mat.floor(0.34*imgHgt);
        whiteXpos = leftPos + mat.floor(0.44*imgWid);
        whiteYpos = topPos + mat.floor(0.41*imgHgt);
        blueXpos = leftPos + mat.floor(0.08*imgWid);
        blueYpos = topPos + mat.floor(0.53*imgHgt);
        greenXpos = leftPos + mat.floor(0.8*imgWid);
        greenYpos = topPos + mat.floor(0.53*imgHgt);
        cyanXpos = leftPos + mat.floor(0.51*imgWid);
        cyanYpos = topPos + mat.floor(0.71*imgHgt);
    }
    var home = doc.getElementById("home");
    var homepos = mat.floor(hgt*0.87);
    home.style.marginTop = homepos + "px";
    var index = doc.getElementById("index");
    var indexpos = mat.floor(hgt*0.91);
    index.style.marginTop = indexpos + "px";
    //alert("window size x: " + x + " y: " + y); // 1090, 742 // 1078, 727 // 1124, 758
    //if( 1000  < x && x < 1200 && 740 < y && y < 760 ) {
    var fullscr = w.fullScreen;
    var swid = num(screen.width);
    var shgt = num(screen.height);
    hgt = num(w.outerHeight);
    //alert("w.fullscreen: " + fullscr + " screen.width: " + swid + " screen.height: " + shgt + " w.width: " + wid + " w.height: " + hgt );
    if( fullscr ||
        ( wid === swid && shgt - 15 <= hgt && hgt <= shgt )) {
        doc.getElementById("instr0").style.color = "#3961a2";
    } else {
        doc.getElementById("instr0").style.color = "#d2edf9";
    }


    var redLabel = doc.getElementById("redLabel");                    
    redLabel.style.marginTop = (mat.floor(0.14*imgHgt)) + "px";
    redLabel.style.marginLeft = (mat.floor(0.25*imgWid)) + "px";
    var redLabel2 = doc.getElementById("redLabel2");                    
    redLabel2.style.marginTop = (mat.floor(0.17*imgHgt)) + "px";
    redLabel2.style.marginLeft = (mat.floor(0.25*imgWid)) + "px";
    var magentaLabel = doc.getElementById("magentaLabel");
    magentaLabel.style.marginTop = (mat.floor(0.33*imgHgt)) + "px";
    magentaLabel.style.marginLeft = (mat.floor(0.34*imgWid)) + "px";
    var magentaLabel2 = doc.getElementById("magentaLabel2");
    magentaLabel2.style.marginTop = (mat.floor(0.36*imgHgt)) + "px";
    magentaLabel2.style.marginLeft = (mat.floor(0.34*imgWid)) + "px";
    var magentaLabel3 = doc.getElementById("magentaLabel3");
    magentaLabel3.style.marginTop = (mat.floor(0.39*imgHgt)) + "px";
    magentaLabel3.style.marginLeft = (mat.floor(0.34*imgWid)) + "px";
    var magentaLabel4 = doc.getElementById("magentaLabel4");
    magentaLabel4.style.marginTop = (mat.floor(0.42*imgHgt)) + "px";
    magentaLabel4.style.marginLeft = (mat.floor(0.34*imgWid)) + "px";
    var yellowLabel = doc.getElementById("yellowLabel");   
    yellowLabel.style.marginTop = (mat.floor(0.33*imgHgt)) + "px";
    yellowLabel.style.marginLeft = (mat.floor(0.54*imgWid)) + "px";
    var yellowLabel2 = doc.getElementById("yellowLabel2");
    yellowLabel2.style.marginTop = (mat.floor(0.36*imgHgt)) + "px";
    yellowLabel2.style.marginLeft = (mat.floor(0.56*imgWid)) + "px";
    var yellowLabel3 = doc.getElementById("yellowLabel3");
    yellowLabel3.style.marginTop = (mat.floor(0.39*imgHgt)) + "px";
    yellowLabel3.style.marginLeft = (mat.floor(0.59*imgWid)) + "px";
    var yellowLabel4 = doc.getElementById("yellowLabel4");
    yellowLabel4.style.marginTop = (mat.floor(0.42*imgHgt)) + "px";
    yellowLabel4.style.marginLeft = (mat.floor(0.61*imgWid)) + "px";
    var whiteLabel = doc.getElementById("whiteLabel");
    whiteLabel.style.marginTop = (mat.floor(0.62*imgHgt)) + "px";
    whiteLabel.style.marginLeft = (mat.floor(0.39*imgWid)) + "px";
    var blueLabel = doc.getElementById("blueLabel");
    blueLabel.style.marginTop = (mat.floor(0.92*imgHgt)) + "px";
    blueLabel.style.marginLeft = (mat.floor(0.18*imgWid)) + "px";
    var greenLabel = doc.getElementById("greenLabel");
    greenLabel.style.marginTop = (mat.floor(0.92*imgHgt)) + "px";
    greenLabel.style.marginLeft = (mat.floor(0.55*imgWid)) + "px";
    var cyanLabel = doc.getElementById("cyanLabel");
    cyanLabel.style.marginTop = (mat.floor(0.7*imgHgt)) + "px";
    cyanLabel.style.marginLeft = (mat.floor(0.35*imgWid)) + "px";
    var cyanLabel2 = doc.getElementById("cyanLabel2");
    cyanLabel2.style.marginTop = (mat.floor(0.73*imgHgt)) + "px";
    cyanLabel2.style.marginLeft = (mat.floor(0.36*imgWid)) + "px";
    var cyanLabel3 = doc.getElementById("cyanLabel3");
    cyanLabel3.style.marginTop = (mat.floor(0.76*imgHgt)) + "px";
    cyanLabel3.style.marginLeft = (mat.floor(0.37*imgWid)) + "px";
    var cyanLabel4 = doc.getElementById("cyanLabel4");
    cyanLabel4.style.marginTop = (mat.floor(0.79*imgHgt)) + "px";
    cyanLabel4.style.marginLeft = (mat.floor(0.38*imgWid)) + "px";
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
    var homepos = mat.floor(hgt*0.87);
    home.style.marginTop = homepos + "px";
    var index = doc.getElementById("index");
    var indexpos = mat.floor(hgt*0.91);
    index.style.marginTop = indexpos + "px";
    //var ghostArray = doc.getElementsByClassName("ghost");
    //var len = ghostArray.length;
    //for( var i = 0; i < 2; ++i ) {
        //var whatGhost = ghostArray[i];
        //var id = whatGhost.id;
        //var idlen = id.length;
        //var idnum = id.substr(1,idlen);
        //var ghostPos = getPos( whatGhost );
        //var dBox = doc.getElementById("d" + idnum);
        //var leftPos = ghostPos.x + "px";
        //var topPos = ghostPos.y + "px";
        //alert("i: " + i + " id: " + id + " idnum: " + idnum + " leftPos: " + leftPos + " topPos: " + topPos);
        //dBox.style.left = leftPos;
        //dBox.style.top = topPos;
    //}
};
window.onresize = function() { 
    movelabels();
};

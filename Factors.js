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
var pcount = 0;

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
function checkM( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    var x = 0;
    if (ev.which === 13 || ev.keyCode === 13) {
        var doc = document;
        var num = Number;
        var id = ansBx.id.toString();
        var ans = num(ansBx.value);
        var pos = id.indexOf("_");
        var colorSection = id.substr(0,pos);
        var desiredId = colorSection + "factor";
        //alert("looking for " + desiredId);
        var corrAns = num(doc.getElementById(desiredId).value);
        var instr = "Multiply out the prime factors in";
        var instr2 = "each section";
        if( ans === corrAns ) {
            ansBx.style.color = "black";
            var products = doc.getElementsByName("prod");
            var plen = products.length;
            pcount = pcount + 1;
            if( pcount < plen ) {
                products[pcount].focus();
            } else {
                instr = "Answer the questions on";
                instr2 = "the white graph paper";
            }
        } else {
            instr = "Product is";
            instr2 = "not " + ans;
            ansBx.style.color = "red";
        }
        doc.getElementById("instr").innerHTML = instr;
        doc.getElementById("instr2").innerHTML = instr2;
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
            var whatOp = num(doc.getElementById("d" + row + "_" + opCol ).value);
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
                    var ghost = doc.getElementById( "g" + row + "_" + col );
                    ghost.type = "text";
                    ghost.value = answer;
                    ghost.style.backgroundColor = "#4270b1";
                    col = col + 1;
                    row = row + 1;
                    //alert("next row: " + row + " next col: " + col);
                    var nextIn = doc.getElementById( "d" + row + "_" + col );
                    if( nextIn ) {
                        nextIn.type = "text";
                    } else {
                        alert("Factors.js line 94 d" + row + "_" + col + " does not exist");
                    }
                    var nextGhost = doc.getElementById( "g" + row + "_" + col );
                    if( nextGhost ) {
                        nextGhost.type = "text";
                    } else {
                        alert("Factors.js line 100 g" + row + "_" + col + " does not exist");
                    }
                    var ghostPos = getPos( nextGhost );
                    var leftPos = ghostPos.x + "px";
                    var topPos = ghostPos.y + "px";
                    //alert("leftPos: " + leftPos + " topPos: " + topPos);
                    nextIn.style.left = leftPos;
                    nextIn.style.top = topPos;
                    nextIn.focus();
                    doc.getElementById("instr").innerHTML = 
                            "What is " + whatOp + " divided by " + answer + "? (Enter)";
                    var notDone = answer !== whatOp; 
                    if( notDone ) {
                        var nextTd = nextIn.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                        //var nextGhost = doc.getElementById( "g" + row + "_" + col );
                        nextTd = nextGhost.parentNode;
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
            var prevOp = num(doc.getElementById("d" + prevRow + "_" + col).value);
            var prevPrime = num(doc.getElementById("d" + prevRow + "_" + prevCol).value);
            if( prevPrime*answer === prevOp ) {
                var ghost = doc.getElementById( "g" + row + "_" + col );
                ghost.type = "text";
                ghost.value = answer;
                if( answer === 1 ) {
                    col = col + 2;
                    colPlus2 = col + 1;
                    row = 0;
                    var nextOp = doc.getElementById( "d" + row + "_" + colPlus2 );
                    if( nextOp ) {
                        nextOp.type = "text";
                        var nextVal = nextOp.value;
                        doc.getElementById("instr").innerHTML = 
                            "What is a prime number that evenly divides " + nextVal + "? (Enter)";
                        var nextTd = nextOp.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                        var nextGhost = doc.getElementById( "g" + row + "_" + colPlus2 );
                        nextGhost.value = nextVal;
                        nextGhost.type = "text";
                        var ghostPos = getPos( nextGhost );
                        var leftPos = ghostPos.x + "px";
                        var topPos = ghostPos.y + "px";
                        //alert("leftPos: " + leftPos + " topPos: " + topPos);
                        nextOp.style.left = leftPos;
                        nextOp.style.top = topPos;
                        nextTd = nextGhost.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                    } else {
                        var snow = "#e2eeeb";
                        var water = "#3961a2"; //"#3f66a1";
                        doc.body.style.backgroundImage = "url('Images/factors.png')";
                        movelabels();
                        var redLabel = doc.getElementById("redLabel");
                        var redValue = doc.getElementById("d0_4").value;
                        var blueValue = doc.getElementById("d0_1").value;
                        var greenValue = doc.getElementById("d0_7").value;
                        redLabel.style.color = "white";
                        redLabel.innerHTML = "Factors of " + redValue + " only";
                        var magentaLabel = doc.getElementById("magentaLabel");
                        var magentaLabel2 = doc.getElementById("magentaLabel2");
                        magentaLabel.style.color = "white";
                        magentaLabel2.style.color = "white";
                        magentaLabel.innerHTML = "Factors of " + redValue;
                        magentaLabel2.innerHTML = "and " + blueValue;
                        var yellowLabel = doc.getElementById("yellowLabel");
                        var yellowLabel2 = doc.getElementById("yellowLabel2");
                        yellowLabel.style.color = "black";
                        yellowLabel2.style.color = "black";
                        yellowLabel.innerHTML = "Factors of " + redValue;
                        yellowLabel2.innerHTML = "and " + greenValue;
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
                        var cyanLabel2 = doc.getElementById("cyanLabel2");
                        cyanLabel.style.color = "black";
                        cyanLabel2.style.color = "black";
                        cyanLabel.innerHTML = "Factors of " + blueValue;
                        cyanLabel2.innerHTML = "and " + greenValue;
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
                var nextIn = doc.getElementById( "d" + row + "_" + col );
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
    var w = window;
    var doc = document;
    var mat = Math;
    var e = doc.documentElement;
    var g = doc.getElementsByTagName('body')[0];
    var x = w.innerWidth || e.clientWidth || g.clientWidth;
    var y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    //alert("window size x: " + x + " y: " + y); // 1090, 742 // 1078, 727 // 1124, 758
    if( 1000  < x && x < 1200 && 740 < y && y < 760 ) {
        doc.getElementById("instr0").style.color = "#3961a2";
    }
    redCenterX = mat.floor(0.67*x);
    redCenterY = mat.floor(0.42*y);
    blueCenterX = mat.floor(0.57*x);
    blueCenterY = mat.floor(0.67*y);
    greenCenterX = mat.floor(0.77*x);
    greenCenterY = mat.floor(0.67*y);
    radius = mat.floor(0.2*x);
    redXpos = mat.floor(0.67*x);
    redYpos = mat.floor(0.21*y); 
    magentaXpos = mat.floor(0.53*x);
    magentaYpos = mat.floor(0.42*y);
    yellowXpos = mat.floor(0.78*x);
    yellowYpos = mat.floor(0.42*y);
    whiteXpos = mat.floor(0.66*x);
    whiteYpos = mat.floor(0.46*y);
    blueXpos = mat.floor(0.45*x);
    blueYpos = mat.floor(0.62*y);
    greenXpos = mat.floor(0.86*x);
    greenYpos = mat.floor(0.62*y);
    cyanXpos = mat.floor(0.66*x);
    cyanYpos = mat.floor(0.72*y);
    var redLabel = doc.getElementById("redLabel");                    
    redLabel.style.marginTop = (mat.floor(0.28*y)) + "px";
    redLabel.style.marginLeft = (mat.floor(0.6*x)) + "px";
    var magentaLabel = doc.getElementById("magentaLabel");
    var magentaLabel2 = doc.getElementById("magentaLabel2");
    magentaLabel.style.marginTop = (mat.floor(0.42*y)) + "px";
    magentaLabel.style.marginLeft = (mat.floor(0.5*x)) + "px";
    magentaLabel2.style.marginTop = (mat.floor(0.45*y)) + "px";
    magentaLabel2.style.marginLeft = (mat.floor(0.53*x)) + "px";
    var yellowLabel = doc.getElementById("yellowLabel");
    var yellowLabel2 = doc.getElementById("yellowLabel2");
    yellowLabel.style.marginTop = (mat.floor(0.42*y)) + "px";
    yellowLabel.style.marginLeft = (mat.floor(0.72*x)) + "px";
    yellowLabel2.style.marginTop = (mat.floor(0.45*y)) + "px";
    yellowLabel2.style.marginLeft = (mat.floor(0.75*x)) + "px";
    var whiteLabel = doc.getElementById("whiteLabel");
    whiteLabel.style.marginTop = (mat.floor(0.62*y)) + "px";
    whiteLabel.style.marginLeft = (mat.floor(0.61*x)) + "px";
    var blueLabel = doc.getElementById("blueLabel");
    blueLabel.style.marginTop = (mat.floor(0.7*y)) + "px";
    blueLabel.style.marginLeft = (mat.floor(0.4*x)) + "px";
    var greenLabel = doc.getElementById("greenLabel");
    greenLabel.style.marginTop = (mat.floor(0.7*y)) + "px";
    greenLabel.style.marginLeft = (mat.floor(0.8*x)) + "px";
    var cyanLabel = doc.getElementById("cyanLabel");
    var cyanLabel2 = doc.getElementById("cyanLabel2");
    cyanLabel.style.marginTop = (mat.floor(0.74*y)) + "px";
    cyanLabel.style.marginLeft = (mat.floor(0.61*x)) + "px";
    cyanLabel2.style.marginTop = (mat.floor(0.77*y)) + "px";
    cyanLabel2.style.marginLeft = (mat.floor(0.64*x)) + "px";
}
window.onload = function(){
    var doc = document;
    var num = Number;
    var el = doc.getElementById("d0_0");
    el.focus();
    draggerSetup();
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
    home.style.marginTop = "670px";
    var index = doc.getElementById("index");
   index.style.marginTop = "700px";
    var ghostArray = doc.getElementsByClassName("ghost");
    //var len = ghostArray.length;
    for( var i = 0; i < 2; ++i ) {
        var whatGhost = ghostArray[i];
        var id = whatGhost.id;
        var idlen = id.length;
        var idnum = id.substr(1,idlen);
        var ghostPos = getPos( whatGhost );
        var dBox = doc.getElementById("d" + idnum);
        var leftPos = ghostPos.x + "px";
        var topPos = ghostPos.y + "px";
        //alert("i: " + i + " id: " + id + " idnum: " + idnum + " leftPos: " + leftPos + " topPos: " + topPos);
        dBox.style.left = leftPos;
        dBox.style.top = topPos;
    }
};
window.onresize = function() { 
    movelabels();
};

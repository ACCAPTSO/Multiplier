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
// variables for multiplying out factors
var gfactors;
var gindexes = new Array();
var gprod = 1;
var gmdx = 0;
var fmdx = 0;
var cdx = 0;
var glen = 0;
var ginc = 1;
var lastPos = 0;
var doingMults = true;
var gYdiff = 0;
var gImageWidth = 0;
var gImageHeight = 0;
var isTrue = true;
    var indicator = 0;
//  "oc delete all --all" from command line removes entire application
//  so you can upload a new one
//  delete build directory and distribution directory, rebuild practice.was
//  clear the browser cache if you want the openshift version to work
//  
// perhaps change onkeyup or onkeydown to eliminate typing 2 digits in one 
// product box.  fixit
//
// operands need to be draggable but not editable fixit
//
// drag to paper needs to click to position fixit
//
// need bar after dragged factors on paper fixit
//
// add square root questions. make original factors draggable again. fixit
//
// move the ghosts back off the paper once problem is done fixit
//
// focus on onewides least significant digit after numbers are moved fixit
//
// paper needs intermediate boxes and 3 intermediate boxes for 2 digit multiplication fixit
//
// go over askQuestions with a fine toothed comb to make sure there are no duplicates fixit
//
// reduce the number of questions reguardless of duplicates fixit
//

var NQUES = 17; // assumes all three operands are perfect squares
var alreadyasked = new Array(NQUES);

var x = 0;
var nSbxs = 28; 

function askSqrt( val, root ) {
    var doc = document;

    doc.getElementById("finstr0").innerHTML = "What is the square root of " + val + "?";
    doc.getElementById("finstr1").style.color = "white";
    gprod = root;
    doc.getElementById("leasDig").focus();
}
function blank() {
    var allBoxes = document.getElementsByClassName("onewide");
    var l = allBoxes.length;
    for( var i = 0; i < l; ++i ) {
        allBoxes[i].value = "";
        allBoxes[i].style.color = "#11397a";
        allBoxes[i].style.backgroundColor = "#d2edf9";
    }
}
function whiteout() {
    var allBoxes = document.getElementsByClassName("onewide");
    var l = allBoxes.length;
    for( var i = 0; i < l; ++i ) {
        //doc.getElementById("statusBox" + x).innerHTML = "in eraseAll doingMults: " + doingMults + " len: " + l + " allBoxes[" + i + "]: " + allBoxes[i].value;
        //x = (x + 1)%nSbxs;
        allBoxes[i].value = "";
        allBoxes[i].style.backgroundColor = "white"; 
    }
}
function checkTorF( ev ) {
    ev = ev || window.event;
    var ansBtn = ev.target;

    if( ansBtn.id === "True" ) {
	if( isTrue ) {
            alert("Correct. Press 'Enter' to Continue?");
	} else {
            alert("No. Press 'Enter' to Continue?");
	}
    } else {
	if( !isTrue ) {
            alert("Correct. Press 'Enter' to Continue?");
	} else {
            alert("No. Press 'Enter' to Continue?");
	}
    }
    askQuestions();
}
function rmTorF() {
    var doc = document;
    
    var TorF = doc.getElementById("TorF");
    
    //alert("removing TorF: " + TorF );
    if( TorF ) {
        var parent = TorF.parentNode;
	var allKids = TorF.childNodes;
	var len = allKids.length;
        //alert("removing all " + len + " children of TorF");
	for( var i = 0; i < len; ++i ) {
	    var whichKid = allKids[0];
            var whichParent = whichKid.parentNode;
	    whichParent.removeChild( whichKid );
	    var newlen = whichParent.childNodes.length;
            //alert("i: " + i + " new length " + newlen);
	}
        parent.removeChild(TorF);
    }
}
function askTorF( op1, op2 ) {
    var doc = document;
    var mat = Math;
    
    var imgWid = gImageWidth;
    var imgHgt = gImageHeight;
    var bWid = 0.125*imgWid;
    var bHgt = 0.03*Number(window.innerHeight); 
    var bTop = 2*bHgt;
    var bLeft = 0.125*imgWid;

    doc.activeElement.blur();
    var instruction1 = " is a factor of ";
    var whatInstr = 2*mat.random() < 1;
    if( whatInstr ) {
        instruction1 = " is a multiple of ";
    }
    //var op1First = 2*mat.random() < 1;
    //if( op1First ) {
        instruction1 = op1 + instruction1 + op2;
	isTrue = whatInstr? op1%op2 === 0 : op2%op1 === 0;
    //} else {
    //    instruction1 = op2 + instruction1 + op1;
//	isTrue = whatInstr? op2%op1 === 0 : op1%op2 === 0;
 //   }

    doc.getElementById("finstr0").innerHTML = "True or False:";
    doc.getElementById("finstr1").innerHTML = instruction1;
    
    var frame = doc.getElementById("paperFrame");
    var TorFdiv = doc.createElement("div");
    TorFdiv.id = "TorF";
    var styles = "width: " + imgWid + "px;"
	    + "height: " + bHgt + "px;"
	    + "padding: 0px;"
	    + "position: absolute;"
	    + "top: " + bTop + "px;"
	    + "left: " + bLeft + "px;"
	    + "border: none;"
	    + "color: #11397a;";
    TorFdiv.setAttribute("style", styles);

    var tLbl = doc.createElement("label");
    tLbl.innerHTML = "True";
    styles = "color: #11397a;"
	    + "margin: 0px;"
	    + "position: absolute;"
	    + "top: " + bTop + "px;"
	    + "left: " + bLeft + "px;";
    tLbl.setAttribute("style", styles);

    bLeft = bLeft + bWid;
    var tBtn = doc.createElement("input");
    tBtn.setAttribute("type", "radio");
    tBtn.name = "TorF";
    tBtn.value = "True";
    tBtn.id = "True";
    styles = "border: none;"
	    + "margin: 0px;"
	    + "position: absolute;"
	    + "top: " + bTop + "px;"
	    + "left: " + bLeft + "px;";
    tBtn.setAttribute("style", styles);
    tBtn.onclick = checkTorF;
    //alert("T or F op1: " + op1 + ", op2: " + op2 + " styles: " + styles );
	
    bLeft = bLeft + 2*bWid;
    var fLbl = doc.createElement("label");
    fLbl.innerHTML = "False";
    styles = "color: #11397a;"
	    + "margin: 0px;"
	    + "position: absolute;"
	    + "top: " + bTop + "px;"
	    + "left: " + bLeft + "px;";
    fLbl.setAttribute("style", styles);

    bLeft = bLeft + bWid;
    var fBtn = doc.createElement("input");
    fBtn.setAttribute("type", "radio");
    fBtn.setAttribute("name", "TorF");
    fBtn.setAttribute("value", "False");
    fBtn.setAttribute("id", "False");
    styles = "border: none;"
	    + "margin: 0px;"
	    + "position: absolute;"
	    + "top: " + bTop + "px;"
	    + "left: " + bLeft + "px;";
    fBtn.setAttribute("style", styles);
    fBtn.onclick = checkTorF;

    TorFdiv.appendChild( tLbl );
    TorFdiv.appendChild( tBtn );
    TorFdiv.appendChild( fLbl );
    TorFdiv.appendChild( fBtn );
    frame.appendChild( TorFdiv );
}
function askQuestions() {
    var whichQues;
    var validQues = false;
    var allDone = false;
    var udx = 0;
    var lques = NQUES;
    var doc = document;
    
    rmTorF();
    for( udx = 0; udx < lques; udx++ ) {
        if( !alreadyasked[udx] ) {
            break;
        }
    }
    if( udx == lques ) {
        //allDone = true;
        doc.getElementById("finstr0").innerHTML = "All Done";
        doc.getElementById("finstr1").innerHTML = "";
        doc.getElementById("instr0").style.color = "#3961a2";
        doc.getElementById("instr1").style.color = "#3961a2";
        doc.getElementById("instr2").style.color = "#3961a2";
	whiteout();
        doc.activeElement.blur();
	return;
    }
    var mat = Math;
    var num = Number;
    var whitefactor = num(doc.getElementById("whitefactor").value);
    var magentafactor = num(doc.getElementById("magentafactor").value);
    var yellowfactor = num(doc.getElementById("yellowfactor").value);
    var cyanfactor = num(doc.getElementById("cyanfactor").value);
    var bluefactor = num(doc.getElementById("bluefactor").value);
    var redfactor = num(doc.getElementById("redfactor").value);
    var greenfactor = num(doc.getElementById("greenfactor").value);
    var expAns = 0;
    
    doc.getElementById("finstr1").style.color = "#11397a";

    var numAns = false;
    var showTorF = false;

    whichQues = mat.floor(mat.random()*lques);
    while( alreadyasked[whichQues] === true ) {
        whichQues = mat.floor(mat.random()*lques);
    }

    alreadyasked[whichQues] = true;
//    var whichBit = 1 << whichQues;
//    indicator = indicator | whichBit
//    doc.getElementById("statusBox" + x).innerHTML = "whichQues: " + whichQues;
//    x = (x + 1)%nSbxs;
//    doc.getElementById("statusBox" + x).innerHTML = "indicator: " + indicator.toString(16);
//    x = (x + 1)%nSbxs;
    validQues = true;

    if( whichQues < 1 ) {
	blank();
        var inStr0 = "What is the Greatest Common Divisor of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_1").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_4").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        gprod = magentafactor*whitefactor;
	    doc.getElementById("leasDig").focus();
        //askNum( BLUE, RED, expAns );
    } else if( whichQues < 2 ) {
	blank();
        var inStr0 = "What is the Greatest Common Divisor of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_4").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_7").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        gprod = yellowfactor*whitefactor;
	    doc.getElementById("leasDig").focus();
        //askNum( RED, GREEN, expAns );
     } else if( whichQues < 3 ) {
	blank();
        var inStr0 = "What is the Greatest Common Divisor of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_1").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_7").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        gprod = cyanfactor*whitefactor;
	    doc.getElementById("leasDig").focus();
        //askNum( BLUE, GREEN, expAns );
     } else if( whichQues < 4 ) {
	blank();
        var inStr0 = "What is the Greatest Common Divisor of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_1").value;
        inStr1 = inStr1 + ", " + doc.getElementById("g0_4").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_7").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        gprod = whitefactor;
	    doc.getElementById("leasDig").focus();
        //askNum( BLUE, RED, GREEN, expAns );
     } else if( whichQues < 5 ) {
	blank();
        var inStr0 = "What is the Lowest Common Multiple of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_1").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_4").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        expAns = whitefactor*yellowfactor*bluefactor*redfactor;
        gprod = expAns*cyanfactor*magentafactor;
	    doc.getElementById("leasDig").focus();
        //askNum( BLUE, RED, expAns );
     } else if( whichQues < 6 ) {
	blank();
        var inStr0 = "What is the Lowest Common Multiple of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_4").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_7").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        expAns = whitefactor*yellowfactor*greenfactor*redfactor;
        gprod = expAns*cyanfactor*magentafactor;
	    doc.getElementById("leasDig").focus();
        //askNum( RED, GREEN, expAns );
     } else if( whichQues < 7 ) {
	blank();
        var inStr0 = "What is the Lowest Common Multiple of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_1").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_7").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        expAns = whitefactor*cyanfactor*bluefactor*greenfactor;
        gprod = expAns*yellowfactor*magentafactor;
	    doc.getElementById("leasDig").focus();
        //askNum( BLUE, GREEN, expAns );
     } else if( whichQues < 8 ) {
	blank();
        var inStr0 = "What is the Lowest Common Multiple of ";
        //doc.getElementById("instr0").innerHTML = inStr0;
        doc.getElementById("finstr0").innerHTML = inStr0;
        var inStr1 = doc.getElementById("g0_1").value;
        inStr1 = inStr1 + ", " + doc.getElementById("g0_4").value;
        inStr1 = inStr1 + " and " + doc.getElementById("g0_7").value;
        //doc.getElementById("instr1").innerHTML = inStr1;
        doc.getElementById("finstr1").innerHTML = inStr1;
        expAns = whitefactor*yellowfactor*greenfactor*redfactor;
        gprod = expAns*cyanfactor*magentafactor*bluefactor;
	    doc.getElementById("leasDig").focus();
        //askNum( BLUE, RED, GREEN, expAns );
     } else {
	 whiteout();
         if( whichQues < 9 ) {
            validQues = askTorF( doc.getElementById("g0_1").value, doc.getElementById("g0_4").value );
            //validQues = askTorF( BLUE, RED );
         } else if( whichQues < 10 ) {
            validQues = askTorF( doc.getElementById("g0_1").value, doc.getElementById("g0_7").value );
            //validQues = askTorF( BLUE, GREEN );
         } else if( whichQues < 11 ) {
            validQues = askTorF( doc.getElementById("g0_4").value, doc.getElementById("g0_1").value );
            //validQues = askTorF( RED, BLUE );
         } else if( whichQues < 12 ) {
            validQues = askTorF( doc.getElementById("g0_4").value, doc.getElementById("g0_7").value );
            //validQues = askTorF( RED, GREEN );
         } else if( whichQues < 13 ) {
            validQues = askTorF( doc.getElementById("g0_7").value, doc.getElementById("g0_1").value );
            //validQues = askTorF( GREEN, BLUE );
         } else if( whichQues < 14 ) {
            validQues = askTorF( doc.getElementById("g0_7").value, doc.getElementById("g0_4").value );
            //validQues = askTorF( GREEN, RED );
        } else {
	    var sqCount = 0;
	    var col = 1;
	    var inc = 3;
	    var id = "";
	    var val = 0;
	    var root = -1;
            if( whichQues < 15 ) {
	        while( sqCount < 1 ) {
		    id = "g0_" + col;
		    val = num(doc.getElementById( id ).value);
		    root = mat.sqrt( val );
	            if( root === mat.floor( root ) ) {
		        sqCount += 1;
		    }
		    col += inc;
	        }
                validQues = askSqrt( val, root );
            } else if( whichQues < 16 ) {
	        while( sqCount < 2 ) {
		    id = "g0_" + col;
		    val = num(doc.getElementById( id ).value);
		    root = mat.sqrt( val );
	            if( root === mat.floor( root ) ) {
		        sqCount += 1;
		    }
		    col += inc;
	        }
                validQues = askSqrt( val, root );
            } else if( whichQues < 17 ) {
	        while( sqCount < 3 ) {
		    id = "g0_" + col;
		    val = num(doc.getElementById( id ).value);
		    root = mat.sqrt( val );
	            if( root === mat.floor( root ) ) {
		        sqCount += 1;
		    }
		    col += inc;
	        }
                validQues = askSqrt( val, root );
            }
        }
    }
}
function getMultiplying() {
var doc = document;
var num = Number;
var ndx = cdx;

var len = 0;
var inc = 1;
    var factors;
    //alert("get multiplying " + ndx);
    //x = (x + 1)%nSbxs;
    while( len < 2*inc && ndx < 7 ) {
        chooseColor: switch( ndx ) {
            case 0:
                factors = doc.getElementsByName("white");
                //alert("starting white column ndx: " + ndx);
                inc = 3;
                break chooseColor;
            case 1:
                factors = doc.getElementsByName("magenta");
                //alert("starting magenta column ndx: " + ndx);
                inc = 2;
                break chooseColor;
            case 2:
                factors = doc.getElementsByName("yellow");
                //alert("starting yellow column ndx: " + ndx);
                inc = 2;
                break chooseColor;
            case 3:
                factors = doc.getElementsByName("cyan");
                //alert("starting cyan column ndx: " + ndx);
                inc = 2;
                break chooseColor;
            case 4:
                factors = doc.getElementsByName("blue");
                //alert("starting blue column ndx: " + ndx);
                inc = 1;
                break chooseColor;
            case 5:
                factors = doc.getElementsByName("red");
                //alert("starting red column ndx: " + ndx);
                inc = 1;
                break chooseColor;
            case 6:
                factors = doc.getElementsByName("green");
                //alert("starting green column ndx: " + ndx);
                inc = 1;
                break chooseColor;
        }
        //alert("factors[0]: " + factors[0] + " color ndx: " + ndx);
        var pstns = new Array();
        len = factors.length;
        //alert("factors[" + ndx + "] length: " + len );
        if( len > inc ) {
            var instr0 = doc.getElementById("instr0");
            instr0.style.color = "#e2eeeb";
            instr0.innerHTML = "Multiply the factors in each section";
            var indexes = new Array();
            var idx = 0;
            for( idx = 0; idx < len; ++idx ) {
                //var value = factors[idx].value;
                pstns[idx] = num(factors[idx].getAttribute("position"));
                indexes[idx] = idx;
                //doc.getElementById("statusBox" + x).innerHTML = "idx: " + idx + " value: " + value + " original position: " + pstns[idx];
                //x = (x + 1)%28;
            }
            // sort in order of distance from top of screen
            for( idx = 0; idx < len-1; ++idx ) {    
                var min = pstns[idx];
                for( var jdx = idx+1; jdx < len; ++jdx ) {
                    var possMin = (pstns[jdx]);
                    if( possMin < min ) { // switch the two of them
                        var tmp = pstns[idx];
                        pstns[idx] = pstns[jdx];
                        pstns[jdx] = tmp;
                        var tmp2 = indexes[idx]; // index of the larger y positioned box
                        indexes[idx] = indexes[jdx];
                        indexes[jdx] = tmp2;
                        min = possMin;
                    }
                }
            }
            cdx = ndx;
            fmdx = 0;
            gfactors = factors;
            ginc = inc;
            glen = len;
            gmdx = 0;
            gprod = 1;
            gindexes = indexes;
            lastPos = 0;
            multiply();
        } else { // nothing to multiply, go on to next section
            if( len > 0 ) {
		for( var i = 0; i < len; ++i ) {
                    factors[i].setAttribute("moved", "false" );
		}
            }
            ndx = ndx + 1;
        }
    }
    //alert("done with while ndx: " + ndx);
    if( ndx > 6 ) {
	setPaper();
        cdx = 7; // don't come back here
    }
}
function multiply() {
    var ndx = cdx;
    var doc = document;
   
    if( ndx > 6 ) {
        return;
    }
    
    var factors = gfactors;
    var inc = ginc;      
    var len = glen;
    var mdx = gmdx;
    var lprod = gprod;
    var num = Number;
    var kdx;
    var indexes = gindexes;

    // do .. while mdx is less than number of factors in this colored segment and
    // either this is the first factor multi-digot or not or
    // product is still less than 9 or
    // there has been a multiplication box befor this
    var whatFactor;
    var whatColor = factors[0].name;
    var allNames = doc.getElementsByName( whatColor );
    var howManyNames = allNames.length;
    var factVal;
    var factPos;
    
    var last = num(lastPos);
    if( last > 0 ) {        
        //doc.getElementById("statusBox" + x).innerHTML = "howManyNames: " + howManyNames;
        //x = (x + 1)%nSbxs;
        // hide factors that went into any intermediate product
        for( var i = 0; i < howManyNames; ++i  ) {
            var ipos = allNames[i].getAttribute("position");
            //doc.getElementById("statusBox" + x).innerHTML = "ipos: " + ipos + " last: " + last;
            //x = (x + 1)%nSbxs;
            if( num(ipos) <= last ) {
                allNames[i].style.color = "#b4c5e2";
            }
	}
	// hide all but oneprevious intermediate products
	var ntermeds = doc.getElementsByName("ntrmed");
	var howManyNtermeds = ntermeds.length;
        //doc.getElementById("statusBox" + x).innerHTML = "howManyNtermeds: " + howManyNtermeds;
        //x = (x + 1)%nSbxs;
	for( var i = 0; i < howManyNtermeds; ++i ) {
            var ipos = ntermeds[i].getAttribute("position");
            //doc.getElementById("statusBox" + x).innerHTML = "ipos: " + ipos + " last: " + last;
            //x = (x + 1)%nSbxs;
            if( num(ipos) <= last ) {
                var children = ntermeds[i].childNodes;
        	var nChilds = children.length;
                //doc.getElementById("statusBox" + x).innerHTML = "type: " + ntermeds[i].type + " nodes of ntermediate box: " + nChilds;
                //x = (x + 1)%nSbxs;
	        for( var j = 0; j < nChilds; ++j ) {
                    var grandkids = children[j].childNodes;
                    var nGrandKids = grandkids.length;
                    //doc.getElementById("statusBox" + x).innerHTML = "type: " + children[j].type + " nGrandKids: " + nGrandKids;
                    //x = (x + 1)%nSbxs;
                    for( var k = 0; k < nGrandKids; ++k ) {
                        //doc.getElementById("statusBox" + x).innerHTML = "type: " + grandkids[k].type + " value: " + grandkids[k].value;
                        //x = (x + 1)%nSbxs;
		        grandkids[k].style.color = "#b4c5e2";
                    }
		}
            }
	}
    }
    do {
        kdx = indexes[mdx];
        whatFactor = factors[kdx];  
        factVal = whatFactor.value;
        lprod = lprod*num(factVal);
        mdx = mdx + inc;     
    } while( mdx  < len &&( mdx <= inc || lprod <= 9 ) );
    
    factPos = whatFactor.getAttribute("position"); // getPos may have roundoff
    var valueLen = factVal.length;
    var spaces = 6 - valueLen;
    for( var i = 0; i < spaces; ++i ) {
        factVal = " " + factVal;
    }
    factVal = "X" + factVal;
    
    // put an "X" in all the copies as it is probably
    // a copy that lands on  top    
    for( var i = 0; i < howManyNames; ++i  ) {
        if( allNames[i].getAttribute("position") === factPos ) {
            allNames[i].value = factVal;
        }
    }
        
    // if prod has 2+ digits, 
    // if it is indeed a product of two or more factors
    // but you still have more factors to go
    // make a box and multiply it out
    if( lprod > 9 && mdx > 0 && mdx < len ) {

                            
    	lastPos = factPos;      // save it for blanking first
                                // factors out and later restoring 
                                // factors, removing intermediate products and X's
                   
        // add a times "X" symbol to last factor
        var pos = getPos(whatFactor);
        var xcoord = pos.x;
        var ycoord = pos.y;

        var ydiff = 0.03*num(window.innerHeight);
	gYdiff = ydiff;
        ycoord = ycoord + ydiff;
        var bar = doc.createElement("div");
        doc.body.appendChild( bar );
        var more2left = xcoord - 2;
        var styles = "border: 1px solid black;"
	    + "width: 58px;"
	    + "height: 0px;"
	    + "position: absolute;"
	    + "top: " + ycoord + "px;"
	    + "left: " + more2left + "px;";
        if( whatColor === "red" |
            whatColor === "magenta" |
            whatColor === "blue" ) {
            styles = styles +  "border: 1px solid white";
        } else {
            styles = styles +  "border: 1px solid black";
        }
	bar.setAttribute("style", styles);
        bar.setAttribute("name", "intermediateBar");
            
        // set up box
        var dBox = doc.createElement("tr");
	dBox.setAttribute("name", "ntrmed");
        cdx = ndx;
        if( fmdx === 0 ) {
            fmdx = mdx;
        }     
        gmdx = mdx;
        gprod = lprod;
        dBox.style.padding = 0;
        dBox.style.margin = 0;
        doc.body.appendChild(dBox);
        var nBxs = 7;
        var leasDig = 6;
	for( var i = 0; i < nBxs; ++i ) {
            var td = doc.createElement("td");
            td.style.margin = 0;
            td.style.border = 0;
            td.style.padding = 0;
            var nput = doc.createElement("input");
            nput.style.margin = 0;
            nput.style.padding = 0;
            nput.style.width = "0.6em";
            nput.onkeyup=passFocus;
            td.appendChild(nput);
            dBox.appendChild(td);
            if( i === leasDig ) {
                doc.activeElement.blur();
                nput.focus();
                nput.onkeydown=eraseAll;
            }
	}
        ycoord = ycoord + 1;
        dBox.style.top = ycoord + "px";
        dBox.style.left = xcoord + "px";
        var relPos = factPos + 1; // position needs to be relative to original
                                  // positions of factors, not actual position
                                  // actual positions keep changing
        dBox.setAttribute("position", relPos);

        // move the rest of the factors 
        for( var i = mdx; i < len; ++i ) {
            var m = indexes[i];
            var whatId = factors[m].id;
            var whatBx = doc.getElementById(whatId);
            if( i%inc === 0 ) {
                ycoord = ycoord + ydiff;
            }
            whatBx.style.top = ycoord + "px";          
        }
        dBox.style.position = "absolute";
        //dBox.setAttribute("moved","false"); 
        //dBox.setAttribute("class","dragBox");
    } else if( inc < len && len <= mdx ) { // last multiplication
        cdx = ndx + 1;   
        gmdx = mdx;
        gprod = lprod;
        // set up final answer box
        var dBox = doc.createElement("tr");
	dBox.setAttribute("name", "final");
        dBox.style.padding = 0;
        dBox.style.margin = 0;
        doc.body.appendChild(dBox);
        var nBxs = 7;
        var leasDig = 6;
	for( var i = 0; i < nBxs; ++i ) {
            var td = doc.createElement("td");
            td.style.margin = 0;
            td.style.border = 0;
            td.style.padding = 0;
            var nput = doc.createElement("input");
            nput.style.margin = 0;
            nput.style.padding = 0;
            nput.style.width = "0.6em";
            nput.onkeyup=passFocus;
            td.appendChild(nput);
            dBox.appendChild(td);
            if( i === leasDig ) {
                doc.activeElement.blur();
                nput.focus();
                nput.onkeydown=eraseAll;
            }
	}
        var pos = getPos(whatFactor);
        var xcoord = pos.x;
        var ycoord = pos.y;
        var ydiff = 0.03*num(window.innerHeight);
        
        ycoord = ycoord + ydiff;
        dBox.style.top = ycoord + "px";
        dBox.style.left = xcoord + "px";
        dBox.style.position = "absolute";
        dBox.setAttribute("moved","false"); 
        dBox.type="text";
        dBox.setAttribute("class","dragBox");
        dBox.setAttribute("id", whatColor);
        ycoord = ycoord + 1;
        var bar = doc.createElement("div");
        doc.body.appendChild( bar );
        var more2left = xcoord - 2;
        var styles = "border: 1px solid black;"
	    + "width: 58px;"
	    + "height: 0px;"
	    + "position: absolute;"
	    + "top: " + ycoord + "px;"
	    + "left: " + more2left + "px;";
        var needWhite = ( whatColor === "red" |
                          whatColor === "magenta" |
                          whatColor === "blue" );
        if( needWhite ) {
            styles = styles +  "border: 1px solid white";
        } else {
            styles = styles +  "border: 1px solid black";
        }
	bar.setAttribute("style", styles);
        bar.id = whatColor + "Bar";
    } else { 
        alert("why are you here? inc: " + inc + " len: " + len + " mdx: " + mdx + " lprod: " + lprod);
        gmdx = 0;
        gprod = 1;
        getMultiplying(); // start multiplying a new column
    }
}
function eraseAll( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    var doc = document;
    //for( x = 0; x < nSbxs; ++x ) {
     //doc.getElementById("statusBox" + x).innerHTML = "";
    //}
    //x = 0;

    ansBx.style.color = "#11397a";
    var answer = ansBx.value;
    var len = answer.length;
    //doc.getElementById("statusBox" + x).innerHTML = "IN eraseAll! doingMults: " + doingMults;
    //x = (x + 1)%nSbxs;
    if( doingMults ) {
        var parent = ansBx.parentNode;
        var grandparent = parent.parentNode;
        var parents = grandparent.childNodes;
        var parentNode = parents[0];
        var len = parents.length;
        for( var i = 0; i < len; ++i ) {
            if( ( parentNode = parents[i]).NodeType !== 1 ) {
                var allBoxes = parentNode.childNodes;
                allBoxes[0].value = "";
                allBoxes[0].style.color = "#11397a";
            }
        }
    } else {
            var allBoxes = document.getElementsByClassName("onewide");
            var l = allBoxes.length;
            for( var i = 0; i < l; ++i ) {
                //doc.getElementById("statusBox" + x).innerHTML = "in eraseAll doingMults: " + doingMults + " len: " + l + " allBoxes[" + i + "]: " + allBoxes[i].value;
                //x = (x + 1)%nSbxs;
                allBoxes[i].value = "";
                allBoxes[i].style.color = "#11397a";
                
            }
    }
    ansBx.value = answer.substring(len, len);
}
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
function passFocus( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    var doc = document;
    
    if (ev.which === 8 || ev.keyCode === 8) { // backspace
        // find previous box
        // blank out previous box
        // focus on previous box
        var parent = ansBx.parentNode;
	var grandparent = parent.parentNode;
	var i = 0;
	var parents = grandparent.childNodes;
	var thisBox = null;
        var parentNode = parents[i];
        var foundCurrentBx = false;
	while( ( parentNode = parents[i]).NodeType !== 1 ) {
		if( parentNode.tagName === "TD" ) {
            var children = parentNode.childNodes;
            thisBox = children[0];
            if( foundCurrentBx ) {
                thisBox.value = "";
                thisBox.focus();
                break;
            }
            if( thisBox === ansBx ) {
		foundCurrentBx = true;
            }
		}
            ++i;
	}
    } else if (ev.which === 13 || ev.keyCode === 13) { // return
        checkBackM(ev);
    } else {
        var parent = ansBx.parentNode;
	var grandparent = parent.parentNode;
	var i = 0;
	var parents = grandparent.childNodes;
	var nextBox = null;
	var thisBox = null;
        var parentNode = parents[i];
        // not quite right probably won't work for larger numbers fixit
	while( ( parentNode = parents[i]).NodeType !== 1 ) {
		if( parentNode.tagName === "TD" ) {
            nextBox = thisBox;
            var children = parentNode.childNodes;
            //doc.getElementById("statusBox" + x).innerHTML = "parent tag: " + parent.tagName + " grandparent tag: " + grandparent.tagName + " parentNode tag: " + parentNode.tagName;
            //x = (x + 1)%nSbxs;
            thisBox = children[0];
            if( thisBox === ansBx ) {
		break;
            }
		}
            ++i;
	}
	nextBox.focus();
    }
}
function setPaper() {
    var doc = document;
    var num = Number;
    var win = window;
    var mat = Math;
    var instr0 = doc.getElementById("instr0");
    var instr1 = doc.getElementById("instr1");
    var instr2 = doc.getElementById("instr2");
    instr0.style.color = "#e2eeeb";
    instr1.style.color = "#e2eeeb";
    instr2.style.color = "#e2eeeb";
    instr0.innerHTML = "Work the problems on the white graph paper";
    instr1.innerHTML = "Drag any numbers you need for your calculations";
    instr2.innerHTML = "Enter your answers least significant digits first";
    var frame = doc.getElementById("paperFrame");
    var fans = doc.getElementById("fans");
    var graphP = doc.createElement("img");
    graphP.style.position = "absolute";
    
    var hgt = num(win.innerHeight);
    var wid = num(win.innerWidth);
    var imgHgt = 0.45*hgt;
    graphP.style.height = imgHgt + "px";
    frame.style.height = imgHgt + "px";
    var topPos = hgt - imgHgt - 4;
    var imgWid = 1.1*imgHgt;
    graphP.style.width = imgWid + "px";
    var leftPos = 0.12*wid;
	leftPos = 0.38*wid;
    frame.style.left = leftPos + "px";  
    frame.style.top = topPos + "px";
    var fansleft = 0.35*imgWid;
    var fleftStr = fansleft + "px";
    fans.style.left = fleftStr;
    var finalIns0 = doc.getElementById("finstr0");
    var finalIns1 = doc.getElementById("finstr1");
    finalIns0.style.color = "#11397a";
    finalIns1.style.color = "#11397a";
    topPos = 20;
    finalIns0.style.top = topPos + "px";
    finalIns0.style.width = imgWid + "px";
    topPos = topPos + 20;
    finalIns1.style.top = topPos + "px";
    finalIns1.style.width = imgWid + "px";
    frame.insertBefore(graphP, frame.childNodes[0]);
    graphP.src = 'Images/allwhite.png';

    var ansBx = doc.getElementsByClassName("onewide");
    var nBxs = ansBx.length;
    var leasDig = nBxs - 1;
    for( var i = 0; i < nBxs; ++i ) {
        var nput = ansBx[i];
        if( nput ) {
            nput.onkeyup=passFocus;
            nput.disabled = false;
            nput.style.backgroundColor = "#d2edf9";
            if( i === leasDig ) {
                doc.activeElement.blur();
                //nput.style.background = "pink";
                nput.focus();
                nput.onkeydown=eraseAll;
		nput.id = "leasDig";
            }
        }
    }
    gImageWidth = imgWid;
    gImageHeight = imgHgt;
    doingMults = false;
    var howManySquares = 0;
    var blueRoot = mat.sqrt(num(doc.getElementById("g0_1").value));
    var redRoot = mat.sqrt(num(doc.getElementById("g0_4").value));
    var greenRoot = mat.sqrt(num(doc.getElementById("g0_7").value));

    if( blueRoot === mat.floor( blueRoot ) ) {
	howManySquares += 1;
    }
    if( redRoot === mat.floor( redRoot ) ) {
	howManySquares += 1;
    }
    if( greenRoot === mat.floor( greenRoot ) ) {
	howManySquares += 1;
    }
    var lques = NQUES - 3 + howManySquares;
    NQUES = lques;
    askQuestions();
}
function checkBackM( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    if (ev.which === 13 || ev.keyCode === 13) {
        var doc = document;
        var num = Number;
	var parent = ansBx.parentNode;
	var grandparent = parent.parentNode;
	var parents = grandparent.childNodes;
        var parentNode = parents[0];
        var boxLen = 0;
        var boxes = new Array();
        var len = parents.length;
		// is all this really necessary? fixit
        for( var i = 0; i < len; ++i ) {
            if( ( parentNode = parents[i]).tagName === "TD" ) {
                var allBoxes = parentNode.childNodes;
		var ansBx = allBoxes[0];
                boxes[boxLen] = num(ansBx.value);
                //doc.getElementById("statusBox" + x).innerHTML = "doingMults: " + doingMults + " len: " + len + " boxes[" + boxLen + "]: " + boxes[boxLen];
                //x = (x + 1)%nSbxs;
                if( typeof( boxes[boxLen] ) === "number" ) { 
                    ++boxLen;
                }
            }
	}
        var answer = 0;
	var ten2pow = 1;
	for( var i = boxLen-1; i >= 0; --i ) {
	    answer = answer + ten2pow*boxes[i];
	    ten2pow = ten2pow*10;
	}
        
	if( answer === gprod ) {
            var bxName = grandparent.getAttribute("name");
            //doc.getElementById("statusBox" + x).innerHTML = "bxName: " + bxName;
            //x = (x + 1)%nSbxs;
            if( bxName === "final" ) {
                // remove previous intermediate boxes
                var intermediates = doc.getElementsByName("ntrmed");
                var iLen = intermediates.length;
                if( iLen > 0 ) { 
                    //doc.getElementById("statusBox" + x).innerHTML = "finding position of intermediates[0]";
                    //x = (x + 1)%nSbxs;
                    var pos = getPos(intermediates[0]);
                    for( var i = 0; i < iLen; ++i ) {
                        var whichInt = intermediates[0]; // always delete index 0
                                                         // because it's the last
                                                         // one remaining
                        var whichParent = whichInt.parentNode;
                        whichParent.removeChild( whichInt );  
                    }
                    var ydiff = 0.03*num(window.innerHeight);
                    var ycoord = pos.y;
                     
                    var factors = gfactors;
                    var inc = ginc;
                    var indexes = gindexes;
		    var len = indexes.length;
                    // what was mdx when the first intermediate box was placed
                    var mdx = fmdx;
                    var lastFact = num(lastPos);
                    
                    for( var i = 0; i < len; ++i ) {
                        var m = indexes[i];
                        var factor = factors[m];
                        // remove all but the last "X"
                        var factPos = factor.getAttribute( "position" );
                        //doc.getElementById("statusBox" + x).innerHTML = "last: " + last + " factPos: " + factPos;
                        //x = (x + 1)%nSbxs;
                        if( num(factPos) <= lastFact ) {
                            var factVal = factor.value;
                            var factLen = factVal.length;
                            while( isNaN(factVal) ) {
                                factVal = factVal.substr(1, factLen);
                                factLen = factLen - 1;
                                //doc.getElementById("statusBox" + x).innerHTML = "factVal: " + factVal;
                                //x = (x + 1)%nSbxs;
                            }
                            factor.value = factVal;
                        }
                        // move the the factors after the first intermrediate
                        // product back
                        if( i >= mdx ) {
                            if( i > mdx && i%inc === 0 ) {
                                ycoord = ycoord + ydiff;
                            }    
                            factor.style.top = ycoord + "px"; 
                        }
                    }
                    ycoord = ycoord + ydiff;
                    var whatColor = grandparent.getAttribute("id");
                    var barName = whatColor + "Bar";
                    
                    var whatBar = doc.getElementById(barName);
                    whatBar.style.top = ycoord + "px";
                    ycoord = ycoord + 2;
                    grandparent.style.top = ycoord + "px";
                }
                var bars = doc.getElementsByName("intermediateBar");
                var bLen = bars.length;
                for( var i = 0; i < bLen; ++i ) {
                    var whichBar = bars[0];
                    var whichParent = whichBar.parentNode;
                    whichParent.removeChild( whichBar ); 
                }
                // unhide all factors
                var allfactors = doc.getElementsByName(whatColor);
                var fLen = allfactors.length;
                for( var i = 0; i < fLen; ++i ) {
                    allfactors[i].style.color = "#11397a";
                }
            }
            if( cdx < 7 ) {
                if( gmdx >= glen ) { // finished one col. go on to next
                    getMultiplying();
                } else {
                    multiply();
                }
            } else if( doingMults ) {
		setPaper();
            } else { 
		    alert("Correct. Press 'Enter' to continue.");
		     var inBxs = doc.getElementsByClassName("onewide");
		    var last = inBxs.length - 1;
		    inBxs[last].focus();
                askQuestions();
	    }
	} else {
            alert("entered: " + answer + " should be: " + gprod + ". Press 'Enter' to continue.");
            var leasDig = -1;
            if( doingMults ) {
		leasDig = len - 1;
                for( var i = 0; i < len; ++i ) {
                    if( ( parentNode = parents[i]).tagName === "TD" ) {
                        var allBoxes = parentNode.childNodes;
                        allBoxes[0].style.color = "red";
                        if( i === leasDig ) {
                            allBoxes[0].focus();
                        }
                    }
                }   
            } else {
                var allBoxes = doc.getElementsByClassName("onewide");
		len = allBoxes.length;
                leasDig = len - 1;
                for( var i = 0; i < len; ++i ) {
                    //doc.getElementById("statusBox" + x).innerHTML = "doingMults: " + doingMults + " len: " + len + " leasDig: " + leasDig + " parents[" + i + "].tagName: " + parents[i].tagName;
                    //x = (x + 1)%nSbxs;
                    allBoxes[i].style.color = "red";
                    if( i === leasDig ) {
                        allBoxes[i].focus();
                    }
                }
            }   
	}
    }
}
function check( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    //var x = 0;
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
                    ansBx.disabled = true;
                    //var ghost = doc.getElementById( "g" + row + "_" + col );
                    //ghost.type = "text";
                    //ghost.value = answer;
                    //ghost.style.backgroundColor = "#4270b1";
                    col = col + 1;
                    row = row + 1;
                    //alert("next row: " + row + " next col: " + col);
                    var nextIn = doc.getElementById( "g" + row + "_" + col );
                    nextIn.type = "text";
                    //doc.getElementById("statusBox" + x).innerHTML = "foc line 438";
                    //x = (x + 1)%nSbxs;
                    nextIn.focus();
                    doc.getElementById("instr1").innerHTML = 
                            "What is " + whatOp + " divided by " + answer + "? (Enter)";
                    var notDone = answer !== whatOp; 
                    if( notDone ) {
                        var nextTd = nextIn.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                    }
                } else {
                    ansBx.style.color = "red";    
                    doc.getElementById("instr1").innerHTML = answer + " is not prime.";
                }
            } else {
                ansBx.style.color = "red";   
                doc.getElementById("instr1").innerHTML = answer + " does not divide " + whatOp + " evenly.";
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
                ansBx.disabled = true;
                if( answer === 1 ) {
                    col = col + 2;
                    colPlus2 = col + 1;
                    row = 0;
                    var nextOp = doc.getElementById( "g" + row + "_" + colPlus2 );
                    if( nextOp ) {
                        nextOp.type = "text";
                        var nextVal = nextOp.value;
                        doc.getElementById("instr1").innerHTML = 
                            "What is a prime number that evenly divides " + nextVal + "? (Enter)";
                        var nextTd = nextOp.parentNode;
                        nextTd.style.borderLeftColor = "#11397a";
                        nextTd.style.borderBottomColor = "#11397a";
                    } else {
                        //alert("adding image, labels and testInput");
                        var snow = "#e2eeeb";
                        var water = "#3961a2"; //"#3f66a1";
                        doc.body.style.backgroundColor = "#3961a2";
			var onewides = doc.getElementsByClassName("onewide");
			var len = onewides.length;
			for( var i = 0; i < len; ++i ) {
                            onewides[i].style.backgroundColor = "#3961a2";
			}
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
                        frame.style.width = imgWid + "px";
                        var leftPos = wid - imgWid;
                        //alert("wid: " + wid + " imgWid: " + imgWid);
                        frame.style.left = leftPos + "px";  
                        frame.style.top = topPos + "px";
                        //var firstlabel = frame.getElements[0];
                        //frame.appendChild(img);
                        frame.insertBefore(img, frame.childNodes[0]);
                        //doc.body.appendChild(frame);
                        img.src = 'Images/factors2.png'; // "url('Images/factors.png')";
                        doc.getElementById("instr1").style.color = "#3961a2";
                        doc.getElementById("instr2").style.color = "#3961a2";
                        var links = document.getElementsByTagName("a");
			len = links.length;
                        for(var i=0;i<links.length;i++) {
                            if(links[i].href) {
                                links[i].style.color = "black";//"#11397a"; 
                            }
                        }  
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
                        len = stillBoxes.length;
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
                    doc.getElementById("instr1").innerHTML = 
                       "What is a prime number that evenly divides " + answer + "? (Enter)";
                }
                var nextIn = doc.getElementById( "g" + row + "_" + col );
                if( nextIn && !(!nextOp && answer === 1)) {
                    //doc.getElementById("statusBox" + x).innerHTML = "foc line 615";
                    //x = (x + 1)%nSbxs;
                    nextIn.type = "text";
                    nextIn.focus();
                } else {
                    ansBx.blur();
                }
            } else {
                ansBx.style.color = "red";
                doc.getElementById("instr1").innerHTML = prevOp + " divided by " + prevPrime + " is not " + answer + ".";
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
    // move any previously moved drag boxes
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
            var fullscr = w.fullScreen;
            var s = screen;
            var swid = num(s.width);
            var shgt = num(s.height);
            hgt = num(w.outerHeight);
            //alert("w.fullscreen: " + fullscr + " screen.width: " + swid + " screen.height: " + shgt + " w.width: " + wid + " w.height: " + hgt );
            if( fullscr ||
                ( wid === swid && shgt - 15 <= hgt && hgt <= shgt )) {
                //doc.getElementById("instr0").style.color = "#3961a2";
                var dragExists = doc.getElementsByClassName("dragBox");
                if( !dragExists[0] ) {
                    draggerSetup();
                }
            } else {
                var instr0 = doc.getElementById("instr0");
                instr0.style.color = "red";
                instr0.innerHTML = "Maximize your browser window";
                var mx = doc.getElementsByClassName("instrs").length;
                for( var instIdx = 1; instIdx < mx; ++instIdx) {
                    var whatInstr = doc.getElementById("instr" + instIdx);
                    whatInstr.style.color = "#3961a2";
                }
            }
        }
        frame.style.left = leftPos + "px";  
        frame.style.top = topPos + "px";
        var prevX = prevLeft;
        var prevY = prevTop;
        redCenterX = leftPos + mat.round(0.5*imgWid);
        redCenterY = topPos + mat.round(0.349*imgHgt);
        blueCenterX = leftPos + mat.round(0.3*imgWid);
        blueCenterY = topPos + mat.round(0.6*imgHgt);
        greenCenterX = leftPos + mat.round(0.7*imgWid);
        greenCenterY = topPos + mat.round(0.6*imgHgt);
        radius = mat.round(0.333*imgWid);  
        redXpos = leftPos + mat.round(0.51*imgWid);
        magentaXpos = leftPos + mat.round(0.2*imgWid);
        yellowXpos = leftPos + mat.round(0.68*imgWid);
        whiteXpos = leftPos + mat.round(0.44*imgWid);
        blueXpos = leftPos + mat.round(0.08*imgWid);
        greenXpos = leftPos + mat.round(0.8*imgWid);
        cyanXpos = leftPos + mat.round(0.51*imgWid);
        redYpos = topPos + mat.round(0.06*imgHgt);
        magentaYpos = topPos + mat.round(0.34*imgHgt);
        yellowYpos = topPos + mat.round(0.34*imgHgt);
        whiteYpos = topPos + mat.round(0.41*imgHgt);
        blueYpos = topPos  + mat.round(0.53*imgHgt);
        greenYpos = topPos  + mat.round(0.53*imgHgt);
        cyanYpos = topPos + mat.round(0.71*imgHgt);
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
    var homepos = mat.round(hgt*0.76);
    home.style.marginTop = homepos + "px";
    var index = doc.getElementById("index");
    var indexpos = mat.round(hgt*0.80);
    index.style.marginTop = indexpos + "px";
    //alert("window size x: " + x + " y: " + y); // 1090, 742 // 1078, 727 // 1124, 758
    //if( 1000  < x && x < 1200 && 740 < y && y < 760 ) {
    

    var redLabel = doc.getElementById("redLabel");                    
    redLabel.style.marginTop = (mat.round(0.14*imgHgt)) + "px";
    redLabel.style.marginLeft = (mat.round(0.25*imgWid)) + "px";
    var redLabel2 = doc.getElementById("redLabel2");                    
    redLabel2.style.marginTop = (mat.round(0.17*imgHgt)) + "px";
    redLabel2.style.marginLeft = (mat.round(0.25*imgWid)) + "px";
    var magentaLabel = doc.getElementById("magentaLabel");
    magentaLabel.style.marginTop = (mat.round(0.33*imgHgt)) + "px";
    magentaLabel.style.marginLeft = (mat.round(0.32*imgWid)) + "px";
    var magentaLabel2 = doc.getElementById("magentaLabel2");
    magentaLabel2.style.marginTop = (mat.round(0.36*imgHgt)) + "px";
    magentaLabel2.style.marginLeft = (mat.round(0.32*imgWid)) + "px";
    var magentaLabel3 = doc.getElementById("magentaLabel3");
    magentaLabel3.style.marginTop = (mat.round(0.39*imgHgt)) + "px";
    magentaLabel3.style.marginLeft = (mat.round(0.32*imgWid)) + "px";
    var magentaLabel4 = doc.getElementById("magentaLabel4");
    magentaLabel4.style.marginTop = (mat.round(0.42*imgHgt)) + "px";
    magentaLabel4.style.marginLeft = (mat.round(0.32*imgWid)) + "px";
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
    //doc.getElementById("statusBox" + x).innerHTML = "foc line 794";
    //x = (x + 1)%nSbxs;
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

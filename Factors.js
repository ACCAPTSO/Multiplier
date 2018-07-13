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
// variables for multiplying out factors
var factors;
var indexes = new Array();
var gprod = 1;
var gmdx = 0;
var fmdx = 0;
var cdx = 0;
var glen = 0;
var ginc = 1;

// doesn't always have the correct product, sometimes lists the last
// factor as the correct answer fixit

// 11x11x7x7
// stops and puts intermediate box at 121, not at 847, fixit

// doesn't always advance to the next product 2646 1323 54 fixit

// perhaps change onkeyup or onkeydown to eliminate typing 2 digits in one product box fixit

// make intermediate boxes disappear once the final product is entered correctly fixit

// change input focus outline to something more appealing than orange. make it red when a box is misplaced fixit

// when number is entered too fast, neither the input boxes nor the alert show the correct entry fixit

// table rows need a backup fixit

var x = 0;
var nSbxs = 28;
function callmymethod(){
    //here I want to prevent default
    return false;
}
function getMultiplying() {
    var doc = document;
    var num = Number;
    var ndx = cdx;
    
    //for( var j = 0; j < 28; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //x = 0;
    switch( ndx ) {
        case 0:
            factors = doc.getElementsByName("white");
            //alert("starting white column ndx: " + ndx);
            fmdx = 0;
            ginc = 3;
            indexes = new Array();
            break;
        case 1:
            factors = doc.getElementsByName("magenta");
            //alert("starting magenta column ndx: " + ndx);
            fmdx = 0;
            ginc = 2;
            indexes = new Array();
            break;
        case 2:
            factors = doc.getElementsByName("yellow");
            //alert("starting yellow column ndx: " + ndx);
            fmdx = 0;
            ginc = 2;
            indexes = new Array();
            break;
        case 3:
            factors = doc.getElementsByName("cyan");
            //alert("starting cyan column ndx: " + ndx);
            fmdx = 0;
            ginc = 2;
            indexes = new Array();
            break;
        case 4:
            factors = doc.getElementsByName("blue");
            //alert("starting blue column ndx: " + ndx);
            fmdx = 0;
            ginc = 1;
            indexes = new Array();
            break;
        case 5:
            factors = doc.getElementsByName("red");
            //alert("starting red column ndx: " + ndx);
            fmdx = 0;
            ginc = 1;
            indexes = new Array();
            break;
        case 6:
            factors = doc.getElementsByName("green");
            //alert("starting green column ndx: " + ndx);
            fmdx = 0;
            ginc = 1;
            indexes = new Array();
            break;
    }
    //alert(" got this name: " + whatName + " factors: " + factors );
    //alert("factors[0]: " + factors[0] + " color ndx: " + ndx);
    var pstns = new Array();
    
    if( factors ) {
        var len = factors.length;
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
                if( possMin < min ) {
                    //alert("idx: " + idx + " jdx: " + jdx + " switching min " + min + " possMin " + possMin );
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
        glen = len;
        //gindexes = indexes; // does having a local "copy" work with arrays? fixit
        multiply();
    } else {
        //doc.getElementById("statusBox" + x).innerHTML = "There were no factors in col " + cdx;
        //x = (x + 1)%nSbxs;
        cdx = cdx + 1;
    }
}
function multiply() {
    var mdx = gmdx;
    var len = glen;
    var ndx = cdx;
    var doc = document;
    
   //alert("starting multiply row index: " + mdx + " col height: " + len + " column index: " + ndx + " prod: " + gprod);
    if(  ndx < 7 ) {
        if( len === 0 ) {
            //doc.getElementById("statusBox" + x).innerHTML = "factors " + ndx + " has length 0";
            //x = (x + 1)%nSbxs;
            cdx = ndx + 1;
            getMultiplying(); // start multiplying a new column
            return;
        } else if( mdx >= len ) { // finished one col. go on to next
            gmdx = 0;
            gprod = 1;
            getMultiplying(); // start multiplying a new column
            return;
        }    
    } else {
       //alert("done multiplying");
        return;
    }
    var inc = ginc;
    var lprod = gprod;
    var num = Number;
    var kdx;
    // while mdx is less than number of factors in this colored segment and
    // either this is the first factor multi-digot or not or
    // product is still less than 9 or
    // there has been a multiplication box befor this
    do {
        kdx = indexes[mdx];
        var factor = num(factors[kdx].value);
        lprod = lprod*factor;
        //doc.getElementById("statusBox" + x).innerHTML = "iterating col: " + ndx + " row mdx: " + mdx + " factor kdx: " + kdx + " prod: " + lprod;
        //x = (x + 1)%nSbxs;
       //alert("iterating col: " + ndx + " row mdx: " + mdx + " factor kdx: " + kdx + " prod: " + lprod);
        mdx = mdx + inc;     
    } while( mdx  < len &&( mdx <= inc || lprod <= 9 ) );
    // if prod has 2+ digits, 
    // if it is indeed a product of two or more factors
    // but you still have more factors to go
    // make a box and multiply it out
    if( lprod > 9 && mdx > 0 && mdx < len ) {
       //alert("stop and multply " + lprod);
        cdx = ndx;
        gprod = lprod;
        gmdx = mdx;
        //if( factors[kdx] ) {
          //  doc.getElementById("statusBox" + x).innerHTML = "finding position of factors[" + kdx + "] with value " + factors[kdx].value;
            //x = (x + 1)%nSbxs;
        //} else {
          //  doc.getElementById("statusBox" + x).innerHTML = "factors[" + kdx + "] doesn't exist";
            //x = (x + 1)%nSbxs;
        //}
        var pos = getPos(factors[kdx]);
        var xcoord = pos.x;
        var ydiff = 0.03*num(window.innerHeight);
        var ycoord = pos.y + ydiff;
        // set up box
        var dBox = doc.createElement("tr");
	dBox.setAttribute("name", "ntrmed");
        if( fmdx === 0 ) {
            fmdx = mdx;
        }
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
        dBox.style.top = ycoord + "px";
        //doc.getElementById("statusBox" + x).innerHTML = "placing intermediate box at " + ycoord;
        //x = (x + 1)%nSbxs;
        dBox.style.left = xcoord + "px";
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
        dBox.setAttribute("moved","false"); 
        dBox.setAttribute("class","dragBox");
    } else if( inc < len && len <= mdx ) { // last multiplication
        //doc.getElementById("statusBox" + x).innerHTML = "last multiplication";
        //x = (x + 1)%nSbxs;
        cdx = ndx + 1;
        gprod = lprod;
        gmdx = mdx;
        // set up box
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
        //if( factors[kdx] ) {
          //  doc.getElementById("statusBox" + x).innerHTML = "finding position of factors[" + kdx + "] with value " + factors[kdx].value;
            //x = (x + 1)%nSbxs;
        //} else {
          //  doc.getElementById("statusBox" + x).innerHTML = "factors[" + kdx + "] doesn't exist";
            //x = (x + 1)%nSbxs;
        //}
        var pos = getPos(factors[kdx]);
        var xcoord = pos.x;
        var ydiff = 0.03*num(window.innerHeight);
        var ycoord = pos.y + ydiff;
        dBox.style.top = ycoord + "px";
        dBox.style.left = xcoord + "px";
        dBox.style.position = "absolute";
        dBox.setAttribute("moved","false"); 
        dBox.type="text";
        dBox.setAttribute("class","dragBox");
    } else {
        gmdx = mdx;
        //doc.getElementById("statusBox" + x).innerHTML = "There was only one factor in col " + cdx;
        //x = (x + 1)%nSbxs;
        cdx = ndx + 1;
       //alert("nothing to multiply, storing row index: " + mdx + " starting column: " + cdx);
        multiply(); // there is nothing to multiply, just start over with next col
    }
}
function eraseAll( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    if( ansBx.style.color === "red") {
        ansBx.style.color = "#11397a";
        var answer = ansBx.value;
        var len = answer.length;    
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
        ansBx.value = answer.substring(len, len);
    }
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
    //var doc = document;
    //doc.getElementById("statusBox" + x).innerHTML = "passing focus ansBx.value: " + ansBx.value;
    //x = (x + 1)%14;
    if (ev.which === 13 || ev.keyCode === 13) {
        checkBackM(ev);
    } else {
        var parent = ansBx.parentNode;
	var grandparent = parent.parentNode;
	var i = 0;
	var parents = grandparent.childNodes;
	var prevBox = null;
	var thisBox = null;
        var parentNode = parents[i];
        // not quite right probably won't work for larger numbers fixit
	while( ( parentNode = parents[i]).NodeType !== 1 ) {
            prevBox = thisBox;
            var children = parentNode.childNodes;
            thisBox = children[0];
            //doc.getElementById("statusBox" + x).innerHTML = "grandparent tag name: " + grandparent.tagName + " parentNode tag name" + parentNode.tagName + " this box tag name " + thisBox.tagName;
            //x = (x + 1)%14;
            ++i;
            if( thisBox === ansBx ) {
		break;
            }
	}
        //prevBox.style.background = "magenta";
        //document.getElementById("statusBox" + x).innerHTML = "foc line 314";
        //x = (x + 1)%nSbxs;
	prevBox.focus();
    }
}
function checkBackM( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    //alert("backwards checking multiplication");
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
        for( var i = 0; i < len; ++i ) {
            if( ( parentNode = parents[i]).NodeType !== 1 ) {
                var allBoxes = parentNode.childNodes;
                boxes[boxLen] = num(allBoxes[0].value);
                //doc.getElementById("statusBox" + x).innerHTML = "grandparent tag name: " + grandparent.tagName + " parentNode tag name" + parentNode.tagName + "  typeof( boxes[boxLen] ): " +  typeof( boxes[boxLen] )
                //x = (x + 1)%14;
                if( typeof( boxes[boxLen] ) === "number" ) {
                    //doc.getElementById("statusBox" + x).innerHTML = "allBoxes[0].tagName " + allBoxes[0].tagName + " boxes[" + boxLen + "]: " + boxes[boxLen];
                    //x = (x + 1)%14;
                    ++boxLen;
                }
            }
	}
        var answer = 0;
	var ten2pow = 1;
	for( var i = boxLen-1; i >= 0; --i ) {
            //doc.getElementById("statusBox" + x).innerHTML = "answer: " + answer + " ten2pow: " + ten2pow + " boxes[" + i + "]: " + boxes[i];
            //x = (x + 1)%14;
	    answer = answer + ten2pow*boxes[i];
	    ten2pow = ten2pow*10;
	}
        //alert("entered: " + answer + " should be: " + gprod);
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
                    //for( var i = 0; i < iLen; ++i ) {
                        //doc.getElementById("statusBox" + x).innerHTML = "intermediates[" + i + "]: " + intermediates[i];
                        //x = (x + 1)%nSbxs;
                    //}
                    for( var i = 0; i < iLen; ++i ) {
                        var whichInt = intermediates[0];
                        var whichParent = whichInt.parentNode;
                        whichParent.removeChild( whichInt );  
                    }
                    var ydiff = 0.03*num(window.innerHeight);
                    var ycoord = pos.y;
                     
                    // what was mdx when the first intermediate box was placed
                    var mdx = fmdx;
		    var len = indexes.length;
                    var inc = ginc;
                    // move the rest of the factors
                    for( var i = mdx; i < len; ++i ) {
                        var m = indexes[i];
                        //doc.getElementById("statusBox" + x).innerHTML = "i: " + i + " inc: " + inc + " len: " + len + " m: " + m;
                        //x = (x + 1)%nSbxs;
                        var whatId = factors[m].id;

                        // is this step necessary? fixit
                        var whatBx = doc.getElementById(whatId);
                        if( i > mdx && i%inc === 0 ) {
                            ycoord = ycoord + ydiff;
                        }
                        //doc.getElementById("statusBox" + x).innerHTML = "factors[m].value: " + factors[m].value + " pos: " + ycoord;
                        //x = (x + 1)%nSbxs;
                        whatBx.style.top = ycoord + "px";          
                    }
                    ycoord = ycoord + ydiff;
                    //doc.getElementById("statusBox" + x).innerHTML = "placing final at " + ycoord;
                    //x = (x + 1)%nSbxs;
                    grandparent.style.top = ycoord + "px";
                }
            }
            multiply();
	} else {
            for( var i = 0; i < len; ++i ) {
                if( ( parentNode = parents[i]).NodeType !== 1 ) {
                    var allBoxes = parentNode.childNodes;
                    allBoxes[0].style.color = "red";
                    if( i === len-1 ) {
                        allBoxes[0].focus();
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
                        doc.getElementById("instr1").style.color = "#3961a2";
                        doc.getElementById("instr2").style.color = "#3961a2";
                        var links = document.getElementsByTagName("a");
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
    //var allInputs = doc.getElementsByTagName("input");
    //var len = allInputs.length;
    //for( var i = 0; i < len; ++i ) {
    //    allInputs[i].onclick="return callmymethod()";
    //}
};
window.onresize = function() {
    //window.settimout( 
    movelabels(); //, 1000 );
};

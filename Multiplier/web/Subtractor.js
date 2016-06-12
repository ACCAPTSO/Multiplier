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

// checks if most significant digits are 0. or 0.0 or 0.000 etc.
// this affects how the last digit of addition is handled
// (is it an add or a carry
/*
function checkZeroPoint( opBx ) {
    var parent = opBx.parentNode;
    var nodeNum = 0;
    var allZeros = 1;
    var isDp = 1; // assume is decimal point until proven false
   
    for( nodeNum = 0; nodeNum < parent.childNodes.length; nodeNum++ ) {
        if( parent.childNodes[nodeNum].nodeType == 1 ) {
            if( parent.childNodes[nodeNum].childNodes[0] ) {
                var whatValue = parent.childNodes[nodeNum].childNodes[0].nodeValue;
                if( whatValue > "0" && whatValue <= "9" ) { 
                    allZeros = 0;
                }
            }    
        }
        if( parent.childNodes[nodeNum].isEqualNode(opBx) ) {
            break;
        }
    }
    if( !allZeros ) {
        isDp = 0;
    } 
    return isDp;
}  */          

function subtract( col ) {
    var doc = document;
    var Num = Number;
    var ansBx = doc.getElementsByName("an" + col)[0];
    var ans = Num(ansBx.value);
    var nOps = doc.getElementsByClassName("oprand").length;
    var ops = new Array(nOps);
    var opBx = new Array();
    var borBx = null;
    var whatBorbx = "bo" + col;
    borBx = doc.getElementsByName(whatBorbx);
    //var whichStatus = "statusBox";

    for( var i = 0; i < nOps; i++ ) {
        var noOpYet = true;
        //whichStatus = "statusBox" + i;
        ops[i] = 0;
        if( i === 1 ) { // look for subtrahend
            opBx[i] = borBx;
                //doc.getElementById(whichStatus).innerHTML = "borbox = " + opBx[i] + " borBoxlength = " + opBx[i].length + " ansBx = " + ansBx + " ans = " + ans; 
                //alert("borrow opBx[" + i + "] = " + opBx[i]);
            if( opBx[i].length !== 0 ) {
                noOpYet = false;
                var opval = opBx[i][0].value;
                if( opval ) {
                    ops[i] = Num(opval);
                    //doc.getElementById(whichStatus).innerHTML = "borrowed col = " + col + " opBx[" + i + "][0].value = " + opBx[i][0].value;
                } else { // there should be a borrow but there isn't so calculate itt
                    opBx[i] = doc.getElementsByName("dH" + i + col);
                    if( opBx[i].length !== 0 ) {
                        ops[i] = Num(opBx[i][0].childNodes[0].nodeValue) - 1;
                        //doc.getElementById(whichStatus).innerHTML = "calc from helper col = " + col + " opBx[" + i + "[0].childNodes[0].nodeValue -1 = " + ops[i];
                    } else {
                        opBx[i] = doc.getElementsByName("op" + i + col);
                        //alert("operand opBx[" + i + "] = " + opBx[i]);
                        if( opBx[i].length !== 0 ) {
                            ops[i] = Num(opBx[i][0].childNodes[0].nodeValue) - 1;
                            //doc.getElementById(whichStatus).innerHTML = "calc from actual col = " + col + " opBx[" + i + "].childNodes[0].nodeValue -1 = " + ops[i];
                        } else {
                            opBx[i] = doc.getElementsByName("ze" + i + col);
                                //alert("operand opBx[" + i + "] = " + opBx[i]);
                            if( opBx[i].length !== 0 ) {
                                ops[i] = Num(opBx[i][0].childNodes[0].nodeValue) - 1;
                                //doc.getElementById(whichStatus).innerHTML = "calc from zero col = " + col + " opBx[" + i + "].childNodes[0].nodeValue -1 = " + ops[i];
                            }
                        }
                    }
                }
            }
        }
        //alert("after first loop i = " + i + " noOpYet = " + noOpYet);
        if( i === 0 || noOpYet ) {
            opBx[i] = doc.getElementsByName("dH" + i + col);
            if( opBx[i].length !== 0 ) {
                noOpYet = false;
                //doc.getElementById(whichStatus).innerHTML ="helper col = " + col + " opBx[" + i + "][0].childNodes[0].nodeValue= " + opBx[i][0].childNodes[0].nodeValue;
                ops[i] = Num(opBx[i][0].childNodes[0].nodeValue);
            }
        }
        //alert("after second loop i = " + i + " noOpYet = " + noOpYet);
        if( noOpYet ) {
            opBx[i] = doc.getElementsByName("op" + i + col);
            //alert("operand opBx[" + i + "] = " + opBx[i]);
            if( opBx[i].length !== 0 ) {
                noOpYet = false;
                //doc.getElementById(whichStatus).innerHTML = "actual col = " + col + " opBx[" + i + "][0].childNodes[0].nodeValue = " + opBx[i][0].childNodes[0].nodeValue;
                ops[i] = Num(opBx[i][0].childNodes[0].nodeValue);
            }
        }
        if( noOpYet ) {
            opBx[i] = doc.getElementsByName("ze" + i + col);
            //alert("operand opBx[" + i + "] = " + opBx[i]);
            if( opBx[i].length !== 0 ) {
                //doc.getElementById(whichStatus).innerHTML = "zero col = " + col + " opBx[" + i + "][0].childNodes[0].nodeValue = " + opBx[i][0].childNodes[0].nodeValue;
                ops[i] = Num(opBx[i][0].childNodes[0].nodeValue);
            }
        }
    }
    var carry = 0;
    var cBx = null;
    var whatCbx = "ca" + col;
    cBx = doc.getElementsByName(whatCbx);
    if( cBx.length > 0 ) {
        var cval = cBx[0].value;
        if( cval ) {
            carry = Num(cval);
        } else {
            carry = 1;
        }
    }

    var corrAns = -1;
    corrAns = (carry*10+ops[1]-ops[0])%10;
   
    var errBx = doc.getElementById("msg");
    if( ans === corrAns ) {
        errBx.innerHTML = "";
        for( var i = 0; i < nOps; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "black";
            }
        }
        if( cBx && cBx.length > 0 ) {
            cBx[0].style.color = "black";
        }
        if( borBx && borBx.length > 0 ) {
            borBx[0].style.color = "black";
        }
        //ansBx.style.backgroundColor =  "#f7f5fb";
        ansBx.style.backgroundColor =  "white";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;
        var nextbox = doc.getElementsByName("nextbox")[bdx].value;
        doc.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {  
        upDateErrCount();
        if( opBx[0].length !== 0 ) {
            opBx[0][0].style.color = "red";
        }
        if( cBx && cBx.length > 0 ) {
            if( cBx[0].style.textDecoration !== "line-through" ) {
                cBx[0].style.color = "red";
            }
            cBx[0].value = carry; // just in case it wasn't typed in
        }
        if( borBx && borBx.length > 0 ) {
            borBx[0].style.color = "red";
            var decVal = borBx[0].value;
            if( !decVal ) {
                opBx[1][0].style.setProperty("text-decoration", "line-through");
                opBx[1][0].style.color = "black";
                if( ops[1] < 0 ) {
                    borBx[0].value = carry*10 + ops[1]; // borBx value is 9
                    cBx[0].style.setProperty("text-decoration", "line-through");
                    cBx[0].style.color = "black";
                } else {
                    borBx[0].value = ops[1];
                }
            }
        } else if( opBx[1].length !== 0 ) {
            opBx[1][0].style.color = "red";
        }
        ansBx.style.color = "red";
        // make "click on a digit to borrow from it" message disappear if all the 
        // borrows have been made     
        var nCols = doc.getElementsByClassName("dp");
        var mtBoxes = 0;
        var objLen = nCols.length;
        for( var i = 0; i < objLen; i++ ) {
            var caBx = doc.getElementsByName("ca" + i)[0];
            if( caBx && caBx.value === "" ) {
                    mtBoxes += 1;
                    break;
            }
        }
        if( mtBoxes < 1 ) {
            var displayBorrow = doc.getElementById("dispBo");
            displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
        }
    }
    setFocus();
}
function checkBorrow( col ) {
    var doc = document;
    var errBx = doc.getElementById("msg");
    var ciBx = doc.getElementsByName("ca" + col)[0];
    var ans = Number(ciBx.value);
    
    if( ans === 1 ) {
        var linedUpBx = doc.getElementById("linedUp");
        if( !linedUpBx || linedUpBx.value === "true" ) {
            errBx.innerHTML = "";
        } else {
            errBx.innerHTML = "Drag red box(es) to line up decimal points";
        }
        ciBx.style.color = "black";
        // keep "click on a digit to borrow from it" message up until all the 
        // borrows have been made
        var displayBorrow = doc.getElementById("dispBo");
        var nCols = doc.getElementsByClassName("dp");
        var mtBoxes = 0;
        var objLen = nCols.length;
        for( var i = 0; i < objLen; i++ ) {
            var newBx = doc.getElementsByName("bo" + i)[0];
            if( newBx ) {
                if( newBx.value === "" ) {
                    mtBoxes += 1;
                    break;
                }
            }

        }
        if( mtBoxes < 1 ) {
            displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
        } else {
            displayBorrow.innerHTML = "Click on a digit to borrow from it";
        }
        setFocus();
    } else {
        upDateErrCount();
        ciBx.style.color = "red";
        ciBx.value="";
        var errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
function checkNewVal( col ) {
    var doc = document;
    var Num = Number;
    var errBx = doc.getElementById("msg");
    var borBx = doc.getElementsByName("dH1" + col)[0];
    if( !borBx ) {
        borBx = doc.getElementsByName("op1" + col)[0];
    }
    if( !borBx ) {
        borBx = doc.getElementsByName("ze1" + col)[0];
    }
    var coBx = doc.getElementsByName("ca" + col);
    var co = 0;
    var coBxIsValid = false;
    if( coBx.length > 0 ) {
        co = 10*Num(coBx[0].value);
        coBxIsValid = true;
    }
    var newBx = doc.getElementsByName("bo" + col)[0];

    var prevCol = col - 1;
    var ciBx = doc.getElementsByName("ca" + prevCol)[0];
    var ans = Num(newBx.value);
    var corrAns = co + Num(borBx.childNodes[0].nodeValue) - 1;

    if( corrAns > 9 ) {
        corrAns = corrAns - co;
    }
    if(ans === corrAns ) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        borBx.style.color = "black";
        if( coBxIsValid ) {
            coBx[0].style.color = "black";
        }
        ciBx.focus();
        ciBx.style.backgroundColor = "white";
        ciBx.style.color = "red";
        ciBx.style.border = "1px solid black";
        ciBx.value="";
        var displayBorrow = doc.getElementById("dispBo");
        displayBorrow.innerHTML = "Enter carry value";
    } else {
        upDateErrCount();
        newBx.style.color = "red";
        newBx.value = "";
        borBx.style.color = "red";
        if( coBxIsValid ) {
            coBx[0].style.color = "red";
        }
        var errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
function promptBorrow( col ) {
    var doc = document;
    var linedUpBx = doc.getElementById("linedUp");
    if( !linedUpBx || linedUpBx.value === "true" ) { // don't try to borrow
                                                     // unless decimal points 
                                                     // are lined up
        var borBx = doc.getElementsByName("dH1" + col)[0];
        if( !borBx ) {
            borBx = doc.getElementsByName("op1" + col)[0];
        }
        if( !borBx ) {
            borBx = doc.getElementsByName("ze1" + col)[0];
        }
        var coBx = doc.getElementsByName("ca" + col);
        var newBx = doc.getElementsByName("bo" + col)[0];

        // turn any red numbers for a subtraction error black
        var allT1s = doc.getElementsByClassName("t1");
        var objLen = allT1s.length;
        for( var i = 0; i < objLen; i++ ) {
            allT1s[i].style.color = "black";
        }  
        var allF1s = doc.getElementsByClassName("f1");
        objLen = allF1s.length;
        for( var i = 0; i < objLen; i++ ) {
            allF1s[i].style.color = "black";
        } 
        var allF2s = doc.getElementsByClassName("f2");
        objLen = allF2s.length;
        for( var i = 0; i < objLen; i++ ) {
            allF2s[i].style.color = "black";
        } 
        var errBx = doc.getElementById("msg");
        if( doc.getElementById("linedUp").value === "true") {
            errBx.innerHTML = "";
        }

        if( newBx ) { // make sure it's really a column that should be borrowed from 
                      // or do nothing
            var Num = Number;
            if( Num(borBx.childNodes[0].nodeValue) === 0 ) {
                // if 0 then cross off the carry in as well
                // if it's 0 & no carry in, there is nothing to borrow so do nothing
                if( coBx.length > 0 && Num(coBx[0].value) === 1 ) {
                    borBx.style.setProperty("text-decoration", "line-through");
                    borBx.onclick = null;
                    coBx[0].style.textDecoration = "line-through";
                    newBx.focus();
                    newBx.style.backgroundColor = "white";
                    newBx.style.color = "red";
                    newBx.style.border = "1px solid black";
                    newBx.value="";
                }
            } else {
                borBx.style.setProperty("text-decoration", "line-through");
                borBx.onclick = null;
                newBx.focus();
                newBx.style.backgroundColor = "white";
                newBx.style.color = "red";
                newBx.style.border = "1px solid black";
                newBx.value="";
            }

            var displayBorrow = doc.getElementById("dispBo");
            displayBorrow.innerHTML = "Enter new value after borrowing";

        }
    }
}
   
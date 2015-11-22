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
    var ansBx = document.getElementsByName("an" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var len = document.getElementsByClassName('oprand').length;
    var ops = new Array(len);
    var opBx = new Array();
    var whichStatus = "statusBox";
    for( var i = 0; i < len; i++ ) {
        whichStatus = "statusBox" + i;
        ops[i] = 0;
        if( i === 1 ) {
            opBx[i] = document.getElementsByName("bo" + col);
            if( opBx[i] ) {
                //document.getElementById(whichStatus).innerHTML = "borbox = " + opBx[i] + " borBoxlength = " + opBx[i].length + " ansBx = " + ansBx + " ans = " + ans; 
                //alert("borrow opBx[" + i + "] = " + opBx[i]);
                if( opBx[i].length !== 0 ) {
                    //alert("borrow opBx[" + i + "].length = " + opBx[i].length);
                    //alert(" opBx[" + i + "].childNodes[0]" + opBx[i].childNodes[0]);
                    ops[i] = Number(opBx[i][0].value);
                }
            }
        }
        if( i === 0 || opBx[i].length === 0 ) {
            opBx[i] = document.getElementsByName("dH" + i + col);
            if( opBx[i] ) {
                //document.getElementById(whichStatus).innerHTML = "dHbox = " + opBx[i] + " dHBoxlength = " + opBx[i].length + " ansBx = " + ansBx + " ans = " + ans; 
                //alert("helper opBx[" + i + "] = " + opBx[i]);
                if( opBx[i].length !== 0 ) {
                    ops[i] = Number(opBx[i][0].childNodes[0].nodeValue);
                }
            }
        }
        if( opBx[i].length === 0 ) {
            opBx[i] = document.getElementsByName("op" + i + col);
            //alert("operand opBx[" + i + "] = " + opBx[i]);
            if( opBx[i] ) {
                if( opBx[i].length !== 0 ) {
                    ops[i] = Number(opBx[i][0].childNodes[0].nodeValue);
                }
            }
        }
    }
    var carry = 0;
    var cBx;
    
    cBx = document.getElementsByName("ca" + col);
    if( cBx.length > 0 ) {
        carry = Number(cBx[0].value);
    }
    var corrAns = -1;
    
    corrAns = (carry*10+ops[1]-ops[0])%10;
    //document.getElementById(whichStatus).innerHTML = "ans = " + ans + " corrAns = " + corrAns + " carry = " + carry + " ops[1] = " + ops[1] + " ops[0] = " + ops[0];
    
    var errBx = document.getElementById("msg");
    if(ans == corrAns ){
        errBx.innerHTML = "";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "black";
            }
        }
        if( cBx != null && cBx.length > 0 ) {
            cBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor =  "#f7f5fb";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {  
        upDateErrCount();
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "red";
            }
        }
        if( cBx != null ) {
            if( cBx.length > 0 && cBx[0].style.textDecoration != "line-through" ) {
                cBx[0].style.color = "red";
            }
        }
        ansBx.style.color = "red";
        ansBx.value = "";
    }
    setFocus();
}
function checkBorrow( col ) {
    var errBx = document.getElementById("msg");
    var ciBx = document.getElementsByName("ca" + col)[0];
    var ans = ciBx.value;
    
    if(ans == 1 ) {
        errBx.innerHTML = "";
        ciBx.style.color = "black";
        setFocus();
    } else {
        upDateErrCount();
        ciBx.style.color = "red";
        ciBx.value="";
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
function checkNewVal( col ) {
    var errBx = document.getElementById("msg");
    var borBx = document.getElementsByName("op1" + col)[0];
    if( !borBx ) {
        borBx = document.getElementsByName("ze1" + col)[0];
    }
    var coBx = document.getElementsByName("ca" + col);
    var co = 0;
    if( coBx.length > 0 ) {
        co = 10*Number(coBx[0].value);
    }
    var newBx = document.getElementsByName("bo" + col)[0];

    var prevCol = col - 1;
    var ciBx = document.getElementsByName("ca" + prevCol)[0];
    var ans = newBx.value;
    var corrAns = co + Number(borBx.childNodes[0].nodeValue) - 1;

    if( corrAns > 9 ) {
        corrAns = corrAns - co;
    }
    if(ans == corrAns ) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        borBx.style.color = "black";
        if( coBx.length > 0 ) {
            coBx[0].style.color = "black";
        }
        ciBx.focus();
        ciBx.style.backgroundColor = "white";
        ciBx.style.color = "red";
        ciBx.style.border = "1px solid black";
        ciBx.value="";
    } else {
        upDateErrCount();
        newBx.style.color = "red";
        newBx.value = "";
        borBx.style.color = "red";
        if( coBx.length > 0 ) {
            coBx[0].style.color = "red";
        }
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
// allows borrows when there shouldn't be one fixit
function promptBorrow( col ) {
    var borBx = document.getElementsByName("op1" + col)[0];
    if( !borBx ) {
        borBx = document.getElementsByName("ze1" + col)[0];
    }
    var coBx = document.getElementsByName("ca" + col);
    var newBx = document.getElementsByName("bo" + col)[0];
    
    // turn any red numbers for a subtraction error black
    var allT1s = document.getElementsByClassName("t1");
    for( var i = 0; i < allT1s.length; i++ ) {
        allT1s[i].style.color = "black";
    }  
    var allF1s = document.getElementsByClassName("f1");
    for( var i = 0; i < allF1s.length; i++ ) {
        allF1s[i].style.color = "black";
    } 
    var allF2s = document.getElementsByClassName("f2");
    for( var i = 0; i < allF2s.length; i++ ) {
        allF2s[i].style.color = "black";
    } 
    var errBx = document.getElementById("msg");
    errBx.innerHTML = "";
    
    if( newBx ) { // make sure it's really a column that should be borrowed from 
                  // or do nothing
    
        if( Number(borBx.childNodes[0].nodeValue) === 0 ) {
            // if 0 then cross off the carry in as well
            // if it's 0 & no carry in, there is nothing to borrow so do nothing
            if( coBx.length > 0 && Number(coBx[0].value) === 1 ) {
                borBx.style.setProperty("text-decoration", "line-through");
                coBx[0].style.textDecoration = "line-through";
                newBx.focus();
                newBx.style.backgroundColor = "white";
                newBx.style.color = "red";
                newBx.style.border = "1px solid black";
                newBx.value="";
            }
        } else {
            borBx.style.setProperty("text-decoration", "line-through");
            newBx.focus();
            newBx.style.backgroundColor = "white";
            newBx.style.color = "red";
            newBx.style.border = "1px solid black";
            newBx.value="";
        }
    
    // if it's the last digit, shouldn't have to borrow 
    // just for 1xxx or for any last digit? fixit
    
    // should they actually have to do the borrows or do I calculate using
    // real numbers, not box entries? fixit
    
        // keep "click on a digit to borrow from it" message up until all the 
        // borrows have been made
        var displayBorrow = document.getElementById('dispBo');
        var nCols = document.getElementsByClassName('dp');
        var mtBoxes = 0;
        for( var idx = 0; idx < nCols.length; idx++ ) {
            newBx = document.getElementsByName("bo" + idx)[0];
            if( newBx ) {
                if( newBx.value === "" ) {
                    mtBoxes += 1;
                }
            }

        }
        if( mtBoxes < 2 ) {
            displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
        }
    }
}
   
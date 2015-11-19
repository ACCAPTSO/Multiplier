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
        //errBx.style.color = "red";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "red";
            }
        }
        if( cBx != null ) {
            if( cBx.length > 0 ) {
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
    //var borBx = document.getElementsByName("op1" + col)[0];
    //var coBx = document.getElementsByName("ca" + col);
    //var co = 0;
    //if( coBx.length > 0 ) {
    //    co = 10*Number(coBx[0].value);
    //}
    //var newBx = document.getElementsByName("bo" + col)[0];

    //var prevCol = col - 1;
    var ciBx = document.getElementsByName("ca" + col)[0];
    //var biBx = document.getElementsByName("bo" + prevCol)[0];
    //alert("col = " + col + " borBx = " + borBx);
        //if( newVal > 9 ) {
    //    newVal = newVal - co;
    //} else if( coBx[0] ) {
    //    coBx[0].value = "";
    //}
    //newBx.value = newVal;
    //borBx.style.setProperty("text-decoration", "line-through");
    //var biValue = 0;

    var ans = ciBx.value;
    var corrAns = 1;
    //if( biBx ) {
    //    biValue = Number(biBx.value);
    //}
    //if( biValue < 0 ) {
    //    biBx.value = biValue + 10;
    //} else {
    //    ciBx.value = 1;
    //}
    if(ans == corrAns ) {
        errBx.innerHTML = "";
        ciBx.style.color = "black";
        setFocus();
    } else {
        upDateErrCount
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
    //if( corrAns < 0 ) {
        
    //} else 
    if( corrAns > 9 ) {
        corrAns = corrAns - co;
    } else if( coBx[0] ) {
        coBx[0].value = "";
    }
    // red highlight newBx fixit
    if(ans == corrAns ) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        ciBx.focus();
        ciBx.style.backgroundColor = "white";
        ciBx.style.color = "red";
        ciBx.style.border = "1px solid black";
        ciBx.value="";
    } else {
        upDateErrCount
        newBx.style.color = "red";
        newBx.value = "";
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
function promptBorrow( col ) {
    var borBx = document.getElementsByName("op1" + col)[0];
    //var coBx = document.getElementsByName("ca" + col);
    //var co = 0;
    //if( coBx.length > 0 ) {
    //    co = 10*Number(coBx[0].value);
    //}
    var newBx = document.getElementsByName("bo" + col)[0];
    newBx.focus();
    newBx.style.backgroundColor = "white";
    newBx.style.color = "red";
    newBx.style.border = "1px solid black";
    newBx.value="";
    //var prevCol = col - 1;
    //var ciBx = document.getElementsByName("ca" + prevCol)[0];
    //var biBx = document.getElementsByName("bo" + prevCol)[0];
    //alert("col = " + col + " borBx = " + borBx);
    //var newVal = co + Number(borBx.childNodes[0].nodeValue) - 1;
    //if( newVal > 9 ) {
    //    newVal = newVal - co;
    //} else if( coBx[0] ) {
    //    coBx[0].value = "";
    //}
    //newBx.value = newVal;
    
    // if 0 then cross off the carry in as well fixit
    // perhaps cross off both on clicking carry in as well fixit
    borBx.style.setProperty("text-decoration", "line-through");
    
    // if it's the last digit, shouldn't have to borrow 
    // just for 1xxx or for any last digit? fixit
    
    // if it's 0 and no carry in, there is nothing to borrow turn it red or
    // do nothing or something fixit
    
    // should they actually have to do the borrows or do I calculate using
    // real numbers, not box entries? fixit
    
    // keep "click on a digit to borrow from it" message up until all the borrows
    // have been made java String defaultMsg? how would you clear it? fixit
    // perhaps you need two message boxes after all
    
    // don't make the 1 disappear if you're cancelling a 10 to make it 9, if
    // you don't get the 9 in the first try, it will never calculate correctly
    // fixit
    
    //var biValue = 0;
    //if( biBx ) {
    //    biValue = Number(biBx.value);
    //}
    //if( biValue < 0 ) {
    //    biBx.value = biValue + 10;
    //} else {
    //    ciBx.value = 1;
    //}
}
    /*
    var ansBx = document.getElementsByName("ca" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var len = document.getElementsByClassName('oprand').length;
    var ops = new Array(len);
    var txt = new Array(len);
    var opBx = new Array(len);
    var sum = 0;
    var prevCarry = 0;
     var pcBx;

    for( var i = 0; i < len; i++ ) {
        ops[i] = 0;
        opBx[i] = document.getElementsByName("dH" + i + col);
        if( opBx[i].length === 0 ) {
            opBx[i] = document.getElementsByName("op" + i + col);
        }
        if( opBx[i].length !== 0 ) {
            ops[i] = Number(opBx[i][0].childNodes[0].nodeValue);
        }
        sum += ops[i];
        //alert("allBlank = " + allBlank + " isZeroPointX = " + isZeroPointX + " ops[" + i + "] = " + ops[i] + " sum =" + sum);
    }
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    var corrAns = Math.floor((sum+prevCarry)/10);

    var errBx = document.getElementById("msg");
    if(ans == corrAns ){
        //errBx.style.color = "#FAF3E4";
        errBx.innerHTML = "";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "black";
            }
        }
        if( pcBx != null && pcBx.length > 0 ) {
            pcBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor =  "white";
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
        //errBx.style.color = "red";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "red";
            }
        }
        if( pcBx != null ) {
            if( pcBx.length > 0 ) {
                pcBx[0].style.color = "red";
            }
        }
        ansBx.style.color = "red";
        ansBx.value = "";
    }
    setFocus();
}*/


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}*/

function origJustAddCarry( col ) {
    //var aicol = col + 1;
    var ansBx = document.getElementsByName("ca" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var ai0 = 0;
    var ai1 = 0;
    var ai2 = 0;
    var ai3 = 0;
    var prevCarry = 0;
    var ai0Bx = document.getElementsByName("op0" + col);
    var ai1Bx = document.getElementsByName("op1" + col);
    var ai2Bx = document.getElementsByName("op2" + col);
    var ai3Bx = document.getElementsByName("op3" + col);
    var dH0Bx = document.getElementsByName("dH0" + col);
    var dH1Bx = document.getElementsByName("dH1" + col);
    var dH2Bx = document.getElementsByName("dH2" + col);
    var dH3Bx = document.getElementsByName("dH3" + col);
    var dragBoxes = document.getElementsByClassName("DragBox");
    var pcBx;
    if( dH0Bx.length !== 0 ) {
        ai0 = Number(dH0Bx[0].childNodes[0].nodeValue);
    } else if( ai0Bx.length !== 0 ) {
        ai0 = Number(ai0Bx[0].childNodes[0].nodeValue);
    }
    if( dH1Bx.length !== 0 ) {
        ai1 = Number(dH1Bx[0].childNodes[0].nodeValue);
    } else if( ai1Bx.length !== 0 ) {
        ai1 = Number(ai1Bx[0].childNodes[0].nodeValue);
    }
    if( dH2Bx.length !== 0 ) {
        ai2 = Number(dH2Bx[0].childNodes[0].nodeValue);
    } else if( ai2Bx.length !== 0 ) {
        ai2 = Number(ai2Bx[0].childNodes[0].nodeValue);
    }
    if( dH3Bx.length !== 0 ) {
        ai3 = Number(dH3Bx[0].childNodes[0].nodeValue);
    } else if( ai3Bx.length !== 0 ) {
        ai3 = Number(ai3Bx[0].childNodes[0].nodeValue);
    }

    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol);
        prevCarry = Number(pcBx[0].value);
    }
    var errBx = document.getElementById("wrongans");
    var corrAns = Math.floor((ai0+ai1+ai2+ai3+prevCarry)/10); 
    //alert(ai1 + " + " + ai2 + " + " + ai3 + " + " + prevCarry );
    if(ans == corrAns ){
        errBx.style.color = "#FAF3E4";
        if( dH0Bx.length !== 0 ) {
            dH0Bx[0].style.color = "black";
        } else if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "black";
        }
        if( dH1Bx.length !== 0 ) {
            dH1Bx[0].style.color = "black";
        } else if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "black";
        }
        if( dH2Bx.length !== 0 ) {
            dH2Bx[0].style.color = "black";
        } else if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "black";
        }
        if( dH3Bx.length !== 0 ) {
            dH3Bx[0].style.color = "black";
        } else if( ai3Bx.length !== 0 ) {
            ai3Bx[0].style.color = "black";
        }
        if( pcBx != null ) {
            if( pcBx.length > 0 ) {
                pcBx[0].style.color = "black"
            }
        }
        ansBx.style.backgroundColor =  "white";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {  
        upDateErrCount();
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
        errBx.style.color = "red";
        if( dH0Bx.length !== 0 ) {
            dH0Bx[0].style.color = "red";
        } else if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "red";
        }
        if( dH1Bx.length !== 0 ) {
            dH1Bx[0].style.color = "red";
        } else if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "red";
        }
        if( dH2Bx.length !== 0 ) {
            dH2Bx[0].style.color = "red";
        } else if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "red";
        }
        if( dH3Bx.length !== 0 ) {
            dH3Bx[0].style.color = "red";
        } else if( ai3Bx.length !== 0 ) {
            ai3Bx[0].style.color = "red";
        }
        if( pcBx != null ) {
            if( pcBx.length > 0 ) {
                pcBx[0].style.color = "red"
            }
        }
        ansBx.style.color = "red";
        ansBx.value = "";
    }
    setFocus();
}

// checks if most significant digits are 0. or 0.0 or 0.000 etc.
// this affects how the last digit of addition is handled
// (is it an add or a carry
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
}            
            
function origJustAdd( col ) {
    var ansBx = document.getElementsByName("an" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var ai0 = 0;
    var ai1 = 0;
    var ai2 = 0;
    var ai3 = 0;
    var txt0 = "blank";
    var txt1 = "blank";
    var txt2 = "blank";
    var txt3 = "blank";
    var prevCarry = 0;
    var isZeroPointX = 0; // zero is false in javascript
    var ai0Bx = document.getElementsByName("op0" + col);
    var ai1Bx = document.getElementsByName("op1" + col);
    var ai2Bx = document.getElementsByName("op2" + col);
    var ai3Bx = document.getElementsByName("op3" + col);
    var pcBx;
    if( ai0Bx.length !== 0 ) {
        txt0 = ai0Bx[0].childNodes[0].nodeValue;
        if( txt0 === "0") {
            isZeroPointX = checkZeroPoint( ai0Bx[0] );
        }
        ai0 = Number(txt0);
        //alert("txt0 = " + txt0 + " ai0 = " + ai0);
    }
    if( ai1Bx.length !== 0 ) {
        txt1 = ai1Bx[0].childNodes[0].nodeValue;
        if( txt1 === "0" ) {
            if( isZeroPointX ) {
                isZeroPointX = checkZeroPoint( ai1Bx[0] );
            }
        } else {
            isZeroPointX = 0;
        }
        ai1 = Number(txt1);
        //alert("txt1 = " + txt1 + " ai1 = " + ai1);
    }
    if( ai2Bx.length !== 0 ) {
        txt2 = ai2Bx[0].childNodes[0].nodeValue;
        if( txt2 === "0" ) {
            if( isZeroPointX ) {
                isZeroPointX = checkZeroPoint( ai2Bx[0] );
            }
        } else {
            isZeroPointX = 0;
        }
        ai2 = Number(txt2);
        //alert("txt2 = " + txt2 + " ai2 = " + ai2);
    }
    if( ai3Bx.length !== 0 ) {
        txt3 = ai3Bx[0].childNodes[0].nodeValue;
        if( txt3 === "0" ) {
            if( isZeroPointX ) {
                isZeroPointX = checkZeroPoint( ai3Bx[0] );
            }
        } else {
            isZeroPointX = 0;
        }
        ai3 = Number(txt3);
        //alert("txt3 = " + txt3 + " ai3 = " + ai3);
    }
    //alert("isZeroPointX = " + isZeroPointX );
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    var corrAns = -1;
    // if this is not an add at all but a carry to the last digit...
    if( ai3Bx.length === 0 && ai2Bx.length === 0 && ai1Bx.length === 0 &&
        ai0Bx.length === 0 || isZeroPointX ) {
        col = col - 1;
        ai0Bx = document.getElementsByName("op0" + col);
        ai1Bx = document.getElementsByName("op1" + col);
        ai2Bx = document.getElementsByName("op2" + col);
        ai3Bx = document.getElementsByName("op3" + col);
        if( ai0Bx.length !== 0 ) {
            ai0 = Number(ai0Bx[0].childNodes[0].nodeValue);
        }
        if( ai1Bx.length !== 0 ) {
            ai1 = Number(ai1Bx[0].childNodes[0].nodeValue);
        }
        if( ai2Bx.length !== 0 ) {
            ai2 = Number(ai2Bx[0].childNodes[0].nodeValue);
        }
        if( ai3Bx.length !== 0 ) {
            ai3 = Number(ai3Bx[0].childNodes[0].nodeValue);
        }
        if( prevCol > 0 ) {
            prevCol = prevCol - 1;
            pcBx = document.getElementsByName("ca" + prevCol);
            if( pcBx.length > 0 ) {
                prevCarry = Number(pcBx[0].value);
            }
        }
        corrAns = Math.floor((ai0+ai1+ai2+ai3+prevCarry)/10);
        errString = "most significant digit of " + errString;
    } else {
        //alert(ai1 + " + " + ai2 + " + " + ai3 + " + " + prevCarry );
        corrAns = (ai0+ai1+ai2+ai3+prevCarry)%10;
        errString = "least significant digit of " + errString;
    }
    var errBx = document.getElementById("wrongans");
    if(ans == corrAns ){
        errBx.style.color = "#FAF3E4";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "black";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "black";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "black";
        }
        if( ai3Bx.length !== 0 ) {
            ai3Bx[0].style.color = "black";
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
        errBx.style.color = "red";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "red";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "red";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "red";
        }
        if( ai3Bx.length !== 0 ) {
            ai3Bx[0].style.color = "red";
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
}
function justAdd( col ) {
    var ansBx = document.getElementsByName("an" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var len = 4;
    var ops = new Array(len);
    var txt = new Array(len);
    var opBx = new Array();
    var allBlank = 1;
    var isZeroPointX = 0; // zero is false in javascript
    var sum = 0;
    //var whichStatus = "statusBox";
    for( var i = 0; i < len; i++ ) {
        //whichStatus = "statusBox" + i;
        ops[i] = 0;
        txt[i] = "blank";
        opBx[i] = document.getElementsByName("dH" + i + col);
        //document.getElementById(whichStatus).innerHTML = "dHbox = " + opBx[i] + " dHBoxlength = " + opBx[i].length + " ansBx = " + ansBx + " ans = " + ans; 
        if( opBx[i].length === 0 ) {
            opBx[i] = document.getElementsByName("op" + i + col);
        }
        if( opBx[i].length !== 0 ) {
            allBlank = 0;
            txt[i] = opBx[i][0].childNodes[0].nodeValue;
            if( txt[i] === "0") {
                if( i === 0 || isZeroPointX ) {
                    isZeroPointX = checkZeroPoint( opBx[i][0] );
                }
            } else {
                isZeroPointX = 0;
            }
            ops[i] = Number(txt[i]);
            sum += ops[i];
            //alert("ops[" + i + "] = " + ops[i] + " sum =" + sum + " allBlank = " + allBlank );
        }
    }
    var prevCarry = 0;
    var pcBx;
    
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    var corrAns = -1;
    // if this is not an add at all but a carry to the last digit...
    if( allBlank || isZeroPointX ) {
        col = col - 1;
        sum = 0;
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
            //document.getElementById(whichStatus).innerHTML = "allBlank = " + allBlank + " isZeroPointX = " + isZeroPointX + " ops[" + i + "] = " + ops[i] + " sum =" + sum+ " ansBx = " + ansBx + " ans = " + ans;
        }
        if( prevCol > 0 ) {
            prevCol = prevCol - 1;
            pcBx = document.getElementsByName("ca" + prevCol);
            if( pcBx.length > 0 ) {
                prevCarry = Number(pcBx[0].value);
            }
        }
        corrAns = Math.floor((sum+prevCarry)/10);
        
        errString = "most significant digit of " + errString;
    } else {
        //alert(ai1 + " + " + ai2 + " + " + ai3 + " + " + prevCarry );
        corrAns = (sum+prevCarry)%10;
        errString = "least significant digit of " + errString;
    }
    var errBx = document.getElementById("wrongans");
    if(ans == corrAns ){
        errBx.style.color = "#FAF3E4";
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
        errBx.style.color = "red";
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
}

function justAddCarry( col ) {
    var ansBx = document.getElementsByName("ca" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var len = 4;
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

    var errBx = document.getElementById("wrongans");
    if(ans == corrAns ){
        errBx.style.color = "#FAF3E4";
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
        errBx.style.color = "red";
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
}

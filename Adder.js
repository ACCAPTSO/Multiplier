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

function justAddCarry( col ) {
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
    var pcBx;
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
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol)[0];
        prevCarry = Number(pcBx.value);
    }
    var errBx = document.getElementById("wrongans");
    var corrAns = Math.floor((ai0+ai1+ai2+ai3+prevCarry)/10); 
    //alert(ai1 + " + " + ai2 + " + " + ai3 + " + " + prevCarry );
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
        errBx.innerText = errString;
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
    //alert("opBx.childNodes[0].nodeValue = " + opBx.childNodes[0].nodeValue + " opBx.childNodes[0].nodeType = " + opBx.childNodes[0].nodeType + " opBx.nodeType = " + opBx.nodeType);
    //alert("parent length is " + parent.childNodes.length ); //HTMLTableRowElement.length is undefined
    /*for( nodeNum = 0; nodeNum < parent.childNodes.length; nodeNum++ ) {
            /*alert("nodeNum = " + nodeNum + " is " + parent.childNodes[nodeNum] + " length is " + parent.childNodes[nodeNum].length + " nodeType is " + parent.childNodes[nodeNum].nodeType );
            /*if( parent.childNodes[nodeNum].nodeType == 3 ) {
                alert("parent.childNodes[nodeNum].nodeType is text");
            }
            if( parent.childNodes[nodeNum].nodeType == 1 ) {
                if( parent.childNodes[nodeNum].childNodes[0] ) {
                    alert("parent.childNodes[" + nodeNum + "].childNodes[0].nodeValue is " + parent.childNodes[nodeNum].childNodes[0].nodeValue );
                }
            }
    }*/
    for( nodeNum = 0; nodeNum < parent.childNodes.length; nodeNum++ ) {
        if( parent.childNodes[nodeNum].nodeType == 1 ) {
            if( parent.childNodes[nodeNum].childNodes[0] ) {
                var whatValue = parent.childNodes[nodeNum].childNodes[0].nodeValue;
                if( whatValue > "0" && whatValue <= "9" ) { 
                    allZeros = 0;
                }
                //alert("whatValue = '" + parent.childNodes[nodeNum].childNodes[0].nodeValue + "'" + " allZeros = " + allZeros );
            }    
        }
        if( parent.childNodes[nodeNum].isEqualNode(opBx) ) {
            //alert("opBx nodeNum is " + nodeNum );
            break;
        }
    }
    //nodeNum = nodeNum + 2;
    //var possDp = parent.childNodes[nodeNum];
    //alert("possDp = " + possDp + " possDp.childNodes[0].nodeValue = " + possDp.childNodes[0].nodeValue );
    if( !allZeros ) {
        isDp = 0;
    } /* else if( !possDp.childNodes[0] ) {
        isDp = 0;
    } else if( possDp.childNodes[0].nodeValue != "." ) {
        isDp = 0;
    } */
    return isDp;
}            
            
function justAdd( col ) {
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

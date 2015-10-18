/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
}

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

function justAdd( col ) {
    var ansBx = document.getElementsByName("an" + col)[0];
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
        pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    var corrAns = -1;
    // if this is not an add at all but a carry to the last digit...
    if( ai3Bx.length === 0 && ai2Bx.length === 0 && ai1Bx.length === 0 &&
        ai0Bx.length == 0 ) {
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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function checkZero( row, col ) {
    var ansBx = document.getElementsByName("ai" + row + col)[0];
    var ans = ansBx.value;
    var errString = "";  
        var errBx = document.getElementById("wrongans");
    if( ans == "0" ) {
        errBx.style.color = "#FAF3E4";
        //op1Bx.style.color = "black";
        //op2Bx.style.color = "black";
        //if( cinBx.length > 0 ) {
        //    cinBx[0].style.color = "black";
        //}
        ansBx.style.backgroundColor =  "#E6EAE8";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {
        upDateErrCount();
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
        errBx.style.color = "red";
        //op1Bx.style.color = "red";
        //op2Bx.style.color = "red";
        //if( cinBx.length > 0 ) {
        //    cinBx[0].style.color = "red";
        //}
        ansBx.style.color = "red";
        ansBx.value = "";
    }
    setFocus();
}

function checkMult( row, col ) {
    var opcol = col - row;
    var crcol = opcol - 1;
    var isEnd = document.getElementsByName("op1" + opcol); 
    var cinBx = document.getElementsByName("cr" + row + crcol); 
    //alert("isEnd = " + isEnd.length + " cinBx = " + cinBx.length );
    var cin = "0";
    var op2Bx;
    var op2 = "0";
    var op1Bx = document.getElementsByName("op0" + row )[0];
    var op1 = op1Bx.childNodes[0].nodeValue;
    var ansBx = document.getElementsByName("ai" + row + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var corrAns;
    // are you at the very end where you need to write a carry from the prev col
    if( cinBx.length === 0 && isEnd.length === 0 ) {
        opcol = opcol - 1;
        crcol = crcol - 1;
        //alert("previous col is " + opcol);
        op2Bx =  document.getElementsByName("op1" + opcol)[0]; 
        op2 =  op2Bx.childNodes[0].nodeValue; 
        cinBx = document.getElementsByName("cr" + row + crcol);
        cin = cinBx[0].value;
        // use math.floor to do integer division - doesn't work for negative numbers
        corrAns = Math.floor((Number(op1)*Number(op2) + Number(cin))/10);
        //alert( "checking msd ans = " + ans + " corrAns = " + corrAns );
    } else {
        if( cinBx.length !== 0 ) {
            cin = cinBx[0].value;
        }
        op2Bx =  document.getElementsByName("op1" + opcol)[0]; 
        op2 =  op2Bx.childNodes[0].nodeValue; 
        //op2 =  document.getElementsByName("op1" + opcol)[0].childNodes[0].nodeValue; 
        //alert("in checkmult answer is " + ans + " op1 is " + op1 + " op2 is " + op2 + " cin is " + cin);
        corrAns = (Number(op1)*Number(op2) + Number(cin))%10;
        //alert( "checking ans = " + ans + " corrAns = " + corrAns );
    }
    var errBx = document.getElementById("wrongans");
    if( ans == corrAns ) {
        errBx.style.color = "#FAF3E4";
        op1Bx.style.color = "black";
        op2Bx.style.color = "black";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor =  "#E6EAE8";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {
        upDateErrCount();
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
        errBx.style.color = "red";
        op1Bx.style.color = "red";
        op2Bx.style.color = "red";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "red";
        }
        ansBx.style.color = "red";
        ansBx.value = "";
    }
    setFocus();
}

function checkCarry( row, col ) {
    var ansBx = document.getElementsByName("cr" + row + col)[0];
    var ans = ansBx.value;
    var cin = 0;
    var op1Bx = document.getElementsByName("op0" + row )[0];
    var op1 = op1Bx.childNodes[0].nodeValue;
    //alert("in checkCarry opcol for top is " + col);
    var op2Bx =  document.getElementsByName("op1" + col)[0]; 
    var op2 =  op2Bx.childNodes[0].nodeValue;
    var crcol = col - 1;
    var cinBx = document.getElementsByName("cr" + row + crcol);
    if( cinBx.length > 0 ) {
        cin = cinBx[0].value;
    }
    var errBx = document.getElementById("wrongans");
    corrAns = Math.floor((Number(op1)*Number(op2) + Number(cin))/10);
    //alert( "checking carry = " + ans + " corrAns = " + corrAns );
    if( ans == corrAns ) {
        errBx.style.color = "#FAF3E4";
        op1Bx.style.color = "black";
        op2Bx.style.color = "black";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor =  "#E6EAE8";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {
        upDateErrCount();
        var errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
        errBx.style.color = "red";
        op1Bx.style.color = "red";
        op2Bx.style.color = "red";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "red";
        }
        ansBx.style.color = "red";
        ansBx.value = "";
    }
    setFocus();
}

function checkAddCarry( col ) {
    var aicol = col + 1;
    var ansBx = document.getElementsByName("ca" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var ai1 = 0;
    var ai2 = 0;
    var ai3 = 0;
    var prevCarry = 0;
    var ai1Bx = document.getElementsByName("ai0" + aicol);
    var ai2Bx = document.getElementsByName("ai1" + aicol);
    var ai3Bx = document.getElementsByName("ai2" + aicol);
    var pcBx;
    if( ai1Bx.length !== 0 ) {
        ai1 = Number(ai1Bx[0].value);
    }
    if( ai2Bx.length !== 0 ) {
        ai2 = Number(ai2Bx[0].value);
    }
    if( ai3Bx.length !== 0 ) {
        ai3 = Number(ai3Bx[0].value);
    }
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol)[0];
        prevCarry = Number(pcBx.value);
    }
    var errBx = document.getElementById("wrongans");
    var corrAns = Math.floor((ai1+ai2+ai3+prevCarry)/10); 
    //alert( "checking additive carry = " + ans + " corrAns = " + corrAns );
    if(ans == corrAns ){
        errBx.style.color = "#FAF3E4";
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
        ansBx.style.backgroundColor =  "#E6EAE8";
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

function checkAdd( col ) {
    var ansBx = document.getElementsByName("an" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var ai1 = 0;
    var ai2 = 0;
    var ai3 = 0;
    var prevCarry = 0;
    var ai1Bx = document.getElementsByName("ai0" + col);
    var ai2Bx = document.getElementsByName("ai1" + col);
    var ai3Bx = document.getElementsByName("ai2" + col);
    var pcBx;
    if( ai1Bx.length !== 0 ) {
        ai1 = Number(ai1Bx[0].value);
    }
    if( ai2Bx.length !== 0 ) {
        ai2 = Number(ai2Bx[0].value);
    }
    if( ai3Bx.length !== 0 ) {
        ai3 = Number(ai3Bx[0].value);
    }
    if( col > 1 ) {
        var prevCol = col - 2;
        pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    //alert("in checkAdd ai1 = " + ai1 + " 
    var corrAns = -1;
    // if this is not an add at all but a carry to the last digit...
    if( ai3Bx.length === 0 && ai2Bx.length === 0 && ai1Bx.length === 0 ) {
        col = col - 1;
        ai1Bx = document.getElementsByName("ai0" + col);
        ai2Bx = document.getElementsByName("ai1" + col);
        ai3Bx = document.getElementsByName("ai2" + col);
        if( ai1Bx.length !== 0 ) {
            ai1 = Number(ai1Bx[0].value);
        }
        if( ai2Bx.length !== 0 ) {
            ai2 = Number(ai2Bx[0].value);
        }
        if( ai3Bx.length !== 0 ) {
            ai3 = Number(ai3Bx[0].value);
        }
        if( prevCol > 0 ) {
            prevCol = prevCol - 1;
            pcBx = document.getElementsByName("ca" + prevCol);
            if( pcBx.length > 0 ) {
                prevCarry = Number(pcBx[0].value);
            }
        }
        //alert( "checking add ans = " + ans + " ai1 = " + ai1 + " ai2 = " + ai2 + " ai3 = " + ai3 + " prevcarry = " + prevCarry);
        corrAns = Math.floor((ai1+ai2+ai3+prevCarry)/10);
        errString = "most significant digit of " + errString;
    } else {
        corrAns = (ai1+ai2+ai3+prevCarry)%10;
        errString = "least significant digit of " + errString;
    }
    var errBx = document.getElementById("wrongans");
    if(ans == corrAns ){
        errBx.style.color = "#FAF3E4";
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
        ansBx.style.backgroundColor =  "#E6EAE8";
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

function promptForDp( bdx ) {
    var btns = document.getElementsByName('dec-pt');
    var isSetAlready = 0;
    for( i = 0; i < btns.length; i++ ) {
        if( btns[i].style.color === "black") {
            isSetAlready = 1;
        }
    }
    if( Number(document.getElementById("btmDec").value) + 
        Number(document.getElementById("topDec").value) === 0 || 
        bdx < Number(document.getElementById("lastbox").value - 1 ) ||
        isSetAlready )  { 
        //alert("in promptForDp btmDec = " + document.getElementById("btmDec").value + " topDec = " + document.getElementById("topDec").value + " lastbox = " + Number(document.getElementById("lastbox").value - 1 ));
        document.getElementById("decRmdr").style.color="#FAF3E4";
    } else {
        document.getElementById("decRmdr").style.color = "red";
    }
}

function upDateErrCount() {
    if( document.getElementById("errs").value == "" ) {
        document.getElementById("errs").value = '1';
    } else {
        document.getElementById("errs").value =
                Number(document.getElementById("errs").value) + 1;
    }
}

// imitate radio buttons, selecting only one decimal point at a time
function chooseThis( which_one ) { 
    var btns = document.getElementsByName('dec-pt');
    var totDec = Number(document.getElementById("btmDec").value) + Number(document.getElementById("topDec").value);
    for( i = 0; i < btns.length; i++ ) {
        var att = "andsp" + i;
        if( i === which_one ) {
            btns[i].childNodes[0].nodeValue=".";
            btns[i].setAttribute( att,'.');
            var markedDec = 7 - i;
            if( totDec === markedDec ) {
                btns[i].style.color="black";
            } else {
                btns[i].style.color="red";
                upDateErrCount();
            }
            document.getElementById("dpPos").setAttribute('value', i );
        } else {
            btns[i].childNodes[0].nodeValue="_";
            btns[i].setAttribute( att,'');
            btns[i].style.color="#FAF3E4"; // hide "_" with background color
        }
    }

    if( totDec === 0 || ( which_one !== 7 && btns[which_one].style.color === "black") ||
        Number(document.getElementById("bdx").value) < Number(document.getElementById("lastbox").value - 1 ))  { 
        document.getElementById("decRmdr").style.color="#FAF3E4";
    } else {
        document.getElementById("decRmdr").style.color = "red";
    }
}

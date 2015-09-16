/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function checkMult( row, col ) {
    var opcol = col - row;
    var crcol = opcol - 1;
    var isEnd = document.getElementsByName("op1" + opcol); 
    var isStart = document.getElementsByName("cr" + row + crcol); 
    //alert("isEnd = " + isEnd.length + " isStart = " + isStart.length );
    var cin = "0";
    var op2 = "0";
    var op1 = document.getElementsByName("op0" + row )[0].childNodes[0].nodeValue;
    var ansBx = document.getElementsByName("ai" + row + col)[0];
    var ans = ansBx.value;
    var corrAns;
    if( isStart.length === 0 && isEnd.length === 0 ) {
        opcol = opcol - 1;
        crcol = crcol - 1;
        //alert("previous col is " + opcol);
        op2 =  document.getElementsByName("op1" + opcol)[0].childNodes[0].nodeValue; 
        cin = document.getElementsByName("cr" + row + crcol)[0].value;
        // use math.floor to do integer division - doesn't work for negative numbers
        corrAns = Math.floor((Number(op1)*Number(op2) + Number(cin))/10);
        //alert( "checking msd ans = " + ans + " corrAns = " + corrAns );
    } else {
        if( isStart.length !== 0 ) {
            cin = isStart[0].value;
        }
        op2 =  document.getElementsByName("op1" + opcol)[0].childNodes[0].nodeValue; 
        //alert("in checkmult answer is " + ans + " op1 is " + op1 + " op2 is " + op2 + " cin is " + cin);
        corrAns = (Number(op1)*Number(op2) + Number(cin))%10;
        //alert( "checking ans = " + ans + " corrAns = " + corrAns );
    }
    if( ans == corrAns ) {
        ansBx.style.color = "blue";
        // advance the box
        var bdx = Number(document.getElementById('bdx').value) + 1;
        //alert("in checkMult new box number is " + bdx);
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        //alert("in checkMult nextbox is " + nextbox);
        document.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {
        ansBx.style.color = "orange";
        ansBx.value = "";
    }
    setFocus();
}

function checkCarry( row, col ) {
    var ansBx = document.getElementsByName("cr" + row + col)[0];
    var ans = ansBx.value;
    var cin = 0;
    var op1 = document.getElementsByName("op0" + row )[0].childNodes[0].nodeValue;
    //alert("in checkCarry opcol for top is " + col);
    var op2 =  document.getElementsByName("op1" + col)[0].childNodes[0].nodeValue; 
    var crcol = col - 1;
    var cinBx = document.getElementsByName("cr" + row + crcol);
    if( cinBx.length > 0 ) {
        cin = cinBx[0].value;
    }
    corrAns = Math.floor((Number(op1)*Number(op2) + Number(cin))/10);
    //alert( "checking carry = " + ans + " corrAns = " + corrAns );
    if( ans == corrAns ) {
        ansBx.style.color = "blue";
        // advance the box
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {
        ansBx.style.color = "orange";
        ansBx.value = "";
    }
    setFocus();
}

function checkAddCarry( col ) {
    var aicol = col + 1;
    var ansBx = document.getElementsByName("ca" + col)[0];
    var ans = ansBx.value;
    var ai1 = 0;
    var ai2 = 0;
    var ai3 = 0;
    var prevCarry = 0;
    var ai1Bx = document.getElementsByName("ai0" + aicol);
    var ai2Bx = document.getElementsByName("ai1" + aicol);
    var ai3Bx = document.getElementsByName("ai2" + aicol);
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
        prevCarry = Number(document.getElementsByName("ca" + prevCol)[0].value);

    }
    var corrAns = Math.floor((ai1+ai2+ai3+prevCarry)/10); 
    //alert( "checking additive carry = " + ans + " corrAns = " + corrAns );
    if(ans == corrAns ){
            ansBx.style.color = "blue";
                    // advance the box
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {           
        ansBx.style.color = "orange";
        ansBx.value = "";
    }
    setFocus();
}
function checkAdd( col ) {
    var ansBx = document.getElementsByName("an" + col)[0];
    var ans = ansBx.value;
    var ai1 = 0;
    var ai2 = 0;
    var ai3 = 0;
    var prevCarry = 0;
    var ai1Bx = document.getElementsByName("ai0" + col);
    var ai2Bx = document.getElementsByName("ai1" + col);
    var ai3Bx = document.getElementsByName("ai2" + col);
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
        var pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    //alert("in checkAdd ai1 = " + ai1 + " 
    var corrAns = -1;
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
            var pcBx = document.getElementsByName("ca" + prevCol);
            if( pcBx.length > 0 ) {
                prevCarry = Number(pcBx[0].value);
            }
        }
        //alert( "checking add ans = " + ans + " ai1 = " + ai1 + " ai2 = " + ai2 + " ai3 = " + ai3 + " prevcarry = " + prevCarry);
        corrAns = Math.floor((ai1+ai2+ai3+prevCarry)/10);
    } else {
        corrAns = (ai1+ai2+ai3+prevCarry)%10;
    }
    if(ans == corrAns ){
        ansBx.style.color = "blue";
        // advance the box
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox
        promptForDp( bdx );
    } else {           
        ansBx.style.color = "orange";
        ansBx.value = "";
    }
    setFocus();
}

function promptForDp( bdx ) {
    if( Number(document.getElementById("btmDec").value) + 
        Number(document.getElementById("topDec").value) === 0 || 
        bdx < Number(document.getElementById("lastbox").value - 1 ))  { 
        //alert("in promptForDp btmDec = " + document.getElementById("btmDec").value + " topDec = " + document.getElementById("topDec").value + " lastbox = " + Number(document.getElementById("lastbox").value - 1 ));
        document.getElementById("decRmdr").style.color="#FAF3E4";
    } else {
        document.getElementById("decRmdr").style.color = "red";
    }
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
            

function justAdd( col ) {
    var ansBx = document.getElementsByName("an" + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var len = document.getElementsByClassName('oprand').length;
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
    }
    var errBx = document.getElementById("msg");
    if(ans == corrAns ){
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
}

function justAddCarry( col ) {
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
}

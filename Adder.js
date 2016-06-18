/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// checks if most significant digits are 0. or 0.0 or 0.000 etc.
// this affects how the last digit of addition is handled
// (is it an add or a carry
"use strict";
                     
function justAdd( col ) {
    var doc = document;
    var Num = Number;
    var ansBx = doc.getElementById("an" + col);
    var ans = Num(ansBx.value);
    var corrAns = Num(doc.getElementById("exAn" + col).value);
    //var errString = "";
    var len = doc.getElementsByClassName('oprand').length;
    var opBx = new Array();
    
    //var whichStatus = "statusBox";
    for( var i = 0; i < len; i++ ) {
        // change these to id's not names fixit
        opBx[i] = doc.getElementsByName("dH" + i + col);
        //doc.getElementById(whichStatus).innerHTML = "dHbox = " + opBx[i] + " dHBoxlength = " + opBx[i].length + " ansBx = " + ansBx + " ans = " + ans; 
        if( opBx[i].length === 0 ) {
            opBx[i] = doc.getElementsByName("op" + i + col);
            if( opBx[i].length === 0 ) {
                opBx[i] = doc.getElementsByName("ze" + i + col);
            }
        }    
    }
    var pcBx = null;
    var prevCol = 0;
    if( col > 0 ) {
        prevCol = col - 1;
        pcBx = doc.getElementById("ca" + prevCol);
    }
    //var errBx = doc.getElementById("msg");
    if(ans === corrAns ){
        //errBx.innerHTML = "";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "black";
            }
        }
        if( pcBx ) {
            pcBx.style.color = "black";
        }
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
        //errString = "not " + ans;
        //errBx.innerHTML = "";
        //errBx.innerHTML = errString;
        //errBx.style.color = "red";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "red";
            }
        }
        if( pcBx ) {
            pcBx.style.color = "red";
            pcBx.style.backgroundColor = "white";
            pcBx.type = "text";
            pcBx.value = doc.getElementById("exCa" + prevCol).value;
        }
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

function justAddCarry( col ) {
    var doc = document;
    var Num = Number;
    var ansBx = doc.getElementById("ca" + col);
    var ans = Num(ansBx.value);
    var corrAns = Num(doc.getElementById("exCa" + col).value);
    //var errString = "";
    var len = doc.getElementsByClassName('oprand').length;
    var opBx = new Array(len);
    var pcBx = null;
    var prevCol = 0;
    for( var i = 0; i < len; i++ ) {
        opBx[i] = doc.getElementsByName("dH" + i + col);
        if( opBx[i].length === 0 ) {
            opBx[i] = doc.getElementsByName("op" + i + col);
            if( opBx[i].length === 0 ) {
                opBx[i] = doc.getElementsByName("ze" + i + col);
            }
        }
        //alert("allBlank = " + allBlank + " isZeroPointX = " + isZeroPointX + " ops[" + i + "] = " + ops[i] + " sum =" + sum);
    }
    if( col > 0 ) {
        prevCol = col - 1;
        pcBx = doc.getElementById("ca" + prevCol);   
    }
    //var corrAns = Math.floor((sum+prevCarry)/10);

    //var errBx = doc.getElementById("msg");
    if(ans === corrAns ){
        //errBx.style.color = "#FAF3E4";
        //errBx.innerHTML = "";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "black";
            }
        }
        if( pcBx ) {
            pcBx.style.color = "black";
        }
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
        //errString = "not " + ans;
        //errBx.innerHTML = "";
        //errBx.innerHTML = errString;
        //errBx.style.color = "red";
        for( var i = 0; i < len; i++ ) {
            if( opBx[i].length !== 0 ) {
                opBx[i][0].style.color = "red";
            }
        }
        if( pcBx ) {
            pcBx.style.color = "red";
            pcBx.style.backgroundColor = "white";
            pcBx.type = "text";
            pcBx.value = doc.getElementById("exCa" + prevCol).value;
        }
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

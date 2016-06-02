/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// set the default input 
"use strict";
function setFocus() {
    var doc = document;
    var x = doc.getElementById("th-id2");
    var j = doc.getElementById("whatbox");
    var i = Number(j.value);
    //var name = x.elements[i].getAttribute("name");
    //doc.getElementById("statusBox0").innerHTML = "name = " + name;
    //var id = x.elements[i].getAttribute("id");
    //doc.getElementById("statusBox1").innerHTML = "id = " + id;
    //if( name !== null && !x.elements[i].isEqualNode(j) ) {
    if( !x.elements[i].isEqualNode(j) ) {
        x.elements[i].style.backgroundColor = "white";
        x.elements[i].style.borderColor = "black";
        x.elements[i].style.borderWidth = "1px";
        x.elements[i].style.color = "red";
        x.elements[i].type = "text";
        //x.elements[i].value="";
        x.elements[i].onkeydown = clearthis;
        x.elements[i].focus(); // set focus to whatbox
    }
}

function clearthis( ev ) {
    ev = ev || window.ev;
    var evTarg = ev.target;
    evTarg.value = "";
}


function zeroCounts() {
    var doc = document;    
    // update problem counts
    doc.getElementById("numAttmptd").value = -1;
    doc.getElementById("errs").value = 1;
    doc.getElementById("numWoErr").value = 0;   
    doc.getElementById("consWoErr").value = 0;
    doc.getElementById("strtTime").value = Number(Date.now());
    startAgain();
}
// start again button code
function startAgain() {
    var doc = document;
    var Num = Number;
    var max = Num(doc.getElementById('lastbox').value);
    var errCt = Num(doc.getElementById("errs").value);
    var boxNo = Num(doc.getElementById("bdx").value);
    var errMsg = doc.getElementById("msg").innerHTML;
    var numAttmptd = Num(doc.getElementById("numAttmptd").value);
    var numWoErr = Num(doc.getElementById("numWoErr").value);
    var consWoErr = Num(doc.getElementById("consWoErr").value);
    //alert("boxNo = " + boxNo + " max = " + max + " errCt = " + errCt + " errMsg = " + errMsg);

    // update problem counts
    doc.getElementById("numAttmptd").value = numAttmptd + 1;
    if( errCt === 0 && boxNo === max && errMsg === "" ) {
            doc.getElementById("numWoErr").value = numWoErr + 1;    
            doc.getElementById("consWoErr").value = consWoErr + 1;
    } else {
        doc.getElementById("consWoErr").value = '0';
    }
    
    var jstime = Num(Date.now());
    var jatime = Num(doc.getElementById("strtTime").value);
    var timediff = jstime - jatime;
    if( timediff === 0 ) {
        doc.getElementById("corrPerHr").value = 0;
    } else {
        doc.getElementById("corrPerHr").value = 
        Math.floor(3600000*Num(doc.getElementById("numWoErr").value)/timediff);
    }
    doc.getElementById('th-id2').submit();
    if( doc.getElementById("msg").value === "" ) {
        setFocus();
    }
}

function checkZero( row, col ) {
    var doc = document;
    var Num = Number;
    var op0Bx = doc.getElementsByName("op0" + col )[0];
    var ansBx = doc.getElementsByName("ai" + row + col)[0];
    var ans = Num(ansBx.value);
    //var errString = "";  
        //var errBx = doc.getElementById("msg");
    if( ans === 0 ) {
        //errBx.style.color = "#FAF3E4";
        //errBx.innerHTML = "";
        op0Bx.style.color = "black";
        ansBx.style.backgroundColor = "#f0f4f9";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Num(doc.getElementById('bdx').value) + 1;
        doc.getElementById('bdx').value = bdx;
        var nextbox = doc.getElementsByName("nextbox")[bdx].value;
        doc.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {
        upDateErrCount();
        //errString = "not " + ans;
        //errBx.innerHTML = "";
        //errBx.innerHTML = errString;
        //errBx.style.color = "red";
        op0Bx.style.color = "red";
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

function checkMult( row, col ) {
    var doc = document;
    var Num = Number;
    var opcol = col - row;
    var crcol = opcol - 1;
    var isEnd = doc.getElementsByName("op1" + opcol); 
    var cinBx = doc.getElementsByName("cr" + row + crcol); 
    //alert("isEnd = " + isEnd.length + " cinBx = " + cinBx.length );
    var cin = "0";
    var op1Bx;
    var op1 = "0";
    var op0Bx = doc.getElementsByName("op0" + row )[0];
    var op0 = op0Bx.childNodes[0].nodeValue;
    var ansBx = doc.getElementsByName("ai" + row + col)[0];
    var ans = Num(ansBx.value);
    //var errString = "";
    var corrAns;
    // are you at the very end where you need to write a carry from the prev col
    if( cinBx.length === 0 && isEnd.length === 0 ) {
        opcol = opcol - 1;
        crcol = crcol - 1;
        op1Bx =  doc.getElementsByName("op1" + opcol)[0]; 
        op1 =  op1Bx.childNodes[0].nodeValue; 
        cinBx = doc.getElementsByName("cr" + row + crcol);
        cin = cinBx[0].value;
        // use math.floor to do integer division - doesn't work for negative numbers
        corrAns = Math.floor((Num(op0)*Num(op1) + Num(cin))/10);
    } else {
        if( cinBx.length !== 0 ) {
            cin = cinBx[0].value;
        }
        op1Bx =  doc.getElementsByName("op1" + opcol)[0]; 
        op1 =  op1Bx.childNodes[0].nodeValue; 
        corrAns = (Num(op0)*Num(op1) + Num(cin))%10;
    }
    //var errBx = doc.getElementById("msg");
    if( ans === corrAns ) {
        //errBx.style.color = "#FAF3E4";
        //errBx.innerHTML = "";
        op0Bx.style.color = "black";
        op1Bx.style.color = "black";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor = "#f0f4f9";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Num(doc.getElementById('bdx').value) + 1;
        doc.getElementById('bdx').value = bdx;
        var nextbox = doc.getElementsByName("nextbox")[bdx].value;
        doc.getElementById("whatbox").value = nextbox;
        promptForDp( bdx );
    } else {
        upDateErrCount();
        //errString = "not " + ans;
        //errString = corrAns + " not " + ans;
        //errBx.innerHTML = "";
        //errBx.innerHTML = errString;
        //errBx.style.color = "red";
        op0Bx.style.color = "red";
        op1Bx.style.color = "red";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "red";
        }
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

function checkCarry( row, col ) {
    var doc = document;
    var Num = Number;
    var ansBx = doc.getElementsByName("cr" + row + col)[0];
    var ans = Num(ansBx.value);
    var cin = 0;
    var op0Bx = doc.getElementsByName("op0" + row )[0];
    var op0 = op0Bx.childNodes[0].nodeValue;
    //alert("in checkCarry opcol for top is " + col);
    var op1Bx =  doc.getElementsByName("op1" + col)[0]; 
    var op1 =  op1Bx.childNodes[0].nodeValue;
    var crcol = col - 1;
    var cinBx = doc.getElementsByName("cr" + row + crcol);
    if( cinBx.length > 0 ) {
        cin = cinBx[0].value;
    }
    //var errBx = doc.getElementById("msg");
    var corrAns = Math.floor((Num(op0)*Num(op1) + Num(cin))/10);
    if( ans === corrAns ) {
        //errBx.style.color = "#FAF3E4
        //errBx.innerHTML = "";
        op0Bx.style.color = "black";
        op1Bx.style.color = "black";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor = "#f0f4f9";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;
        var nextbox = doc.getElementsByName("nextbox")[bdx].value;
        doc.getElementById("whatbox").value = nextbox;
    } else {
        upDateErrCount();
        //var errString = "not " + ans;
        //errBx.innerHTML = "";
        //errBx.innerHTML = errString;
        //errBx.style.color = "red";
        op0Bx.style.color = "red";
        op1Bx.style.color = "red";
        if( cinBx.length > 0 ) {
            cinBx[0].style.color = "red";
        }
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

function checkAddCarry( col ) {
    var doc = document;
    var Num = Number;
    var aicol = col + 1;
    var ansBx = doc.getElementsByName("ca" + col)[0];
    var ans = Num(ansBx.value);
    //var errString = "";
    var ai0 = 0;
    var ai1 = 0;
    var ai2 = 0;
    var prevCarry = 0;
    var ai0Bx = doc.getElementsByName("ai0" + aicol);
    var ai1Bx = doc.getElementsByName("ai1" + aicol);
    var ai2Bx = doc.getElementsByName("ai2" + aicol);
    var pcBx = null;
    if( ai0Bx.length !== 0 ) {
        ai0 = Num(ai0Bx[0].value);
    }
    if( ai1Bx.length !== 0 ) {
        ai1 = Num(ai1Bx[0].value);
    }
    if( ai2Bx.length !== 0 ) {
        ai2 = Num(ai2Bx[0].value);
    }
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = doc.getElementsByName("ca" + prevCol)[0];
        prevCarry = Num(pcBx.value);
        //pcBx.style.backgroundColor = "pink";
    }
    //var errBx = doc.getElementById("msg");
    var corrAns = Math.floor((ai0+ai1+ai2+prevCarry)/10); 
    if( ans === corrAns ) {
        //errBx.style.color = "#FAF3E4";
        //errBx.innerHTML = "";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "black";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "black";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "black";
        }
        if( pcBx ) {
            pcBx.style.color = "black";
        }
        ansBx.style.backgroundColor = "#f0f4f9";
        ansBx.style.color = "black";
        // advance the box
        var bdx = Num(doc.getElementById("bdx").value) + 1;
        doc.getElementById("bdx").value = bdx;
        var nextbox = doc.getElementsByName("nextbox")[bdx].value;
        doc.getElementById("whatbox").value = nextbox;
    } else {  
        upDateErrCount();
        //errString = "not " + ans;
        //errBx.innerHTML = "";
        //errBx.innerText = errString;
        //errBx.style.color = "red";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "red";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "red";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "red";
        }
        if( pcBx ) {
            pcBx.style.color = "red";
        }
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

function checkAdd( col ) {
    var doc = document;
    var Num = Number;
    var ansBx = doc.getElementsByName("an" + col)[0];
    var ans = Num(ansBx.value);
    //var errString = "";
    var ai0 = 0;
    var ai1 = 0;
    var ai2 = 0;
    var prevCarry = 0;
    var ai0Bx = doc.getElementsByName("ai0" + col);
    var ai1Bx = doc.getElementsByName("ai1" + col);
    var ai2Bx = doc.getElementsByName("ai2" + col);
    var pcBx = null;
    if( ai0Bx.length !== 0 ) {
        ai0 = Num(ai0Bx[0].value);
    }
    if( ai1Bx.length !== 0 ) {
        ai1 = Num(ai1Bx[0].value);
    }
    if( ai2Bx.length !== 0 ) {
        ai2 = Num(ai2Bx[0].value);
    }
    if( col > 1 ) {
        var prevCol = col - 2;
        pcBx = doc.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Num(pcBx[0].value);
        }
    }
    var corrAns = -1;
    // if this is not an add at all but a carry to the last digit...
    if( ai2Bx.length === 0 && ai1Bx.length === 0 && ai0Bx.length === 0 ) {
        col = col - 1;
        ai0Bx = doc.getElementsByName("ai0" + col);
        ai1Bx = doc.getElementsByName("ai1" + col);
        ai2Bx = doc.getElementsByName("ai2" + col);
        if( ai0Bx.length !== 0 ) {
            ai0 = Num(ai0Bx[0].value);
        }
        if( ai1Bx.length !== 0 ) {
            ai1 = Num(ai1Bx[0].value);
        }
        if( ai2Bx.length !== 0 ) {
            ai2 = Num(ai2Bx[0].value);
        }
        if( prevCol > 0 ) {
            prevCol = prevCol - 1;
            pcBx = doc.getElementsByName("ca" + prevCol);
            if( pcBx.length > 0 ) {
                prevCarry = Num(pcBx[0].value);
            }
        }
        corrAns = Math.floor((ai0+ai1+ai2+prevCarry)/10);
    } else {
        corrAns = (ai0+ai1+ai2+prevCarry)%10;
    }
    //var errBx = doc.getElementById("msg");
    if(ans === corrAns ){
        //errBx.style.color = "#FAF3E4";
        //errBx.innerHTML = "";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "black";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "black";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "black";
        }
        if( pcBx && pcBx.length > 0 ) {
            pcBx[0].style.color = "black";
        }
        ansBx.style.backgroundColor = "#f0f4f9";
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
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "red";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "red";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "red";
        }
        if( pcBx && pcBx.length > 0 ) {
            pcBx[0].style.color = "red";
        }
        ansBx.style.color = "red";
        //ansBx.value = "";
    }
    setFocus();
}

function promptForDp( bdx ) {
    var doc = document;
    var Num = Number;
    var btns = doc.getElementsByName('dec-pt');
    var isSetAlready = 0;
    for( var i = 0; i < btns.length; i++ ) {
        if( btns[i].style.color === "black") {
            isSetAlready = 1;
        }
    }
    // hide the decimal point reminder by making the text the same as the background
    // color if:
    // the answer doesn't have a decimal point, 
    // there are still numbers to fill in or
    // the decimal point is already set correctly
    if( Num(doc.getElementById("ansDp").value) === 0 ||
        bdx < Num(doc.getElementById("lastbox").value ) ||
        isSetAlready )  { 
        //doc.getElementById("decRmdr").style.color="#FAF3E4";
        doc.getElementById("msg").innerHTML = "";
    } else {
        doc.getElementById("msg").innerHTML = "Click where decimal point should be";
    }
}

function upDateErrCount() {
    var errCntBx = document.getElementById("errs");
    var errCnt = errCntBx.value;
    if( errCnt === "" ) {
        errCntBx.value = "1";
    } else {
        errCntBx.value = Number(errCnt) + 1;
    }
}

// imitate radio buttons, selecting only one decimal point at a time
function chooseThis( which_one ) { 
    var doc = document;
    var Num = Number;
    var btns = doc.getElementsByName('dec-pt');
    var totDec = Num(doc.getElementById("ansDp").value);
    var nbtns= btns.length;
    for( var i = 0; i < nbtns; i++ ) {
        var att = "andsp" + i;
        if( i === which_one ) {
            btns[i].childNodes[0].nodeValue=".";
            btns[i].setAttribute( att,'.');
            var markedDec = nbtns - i;
            if( totDec === markedDec ) {
                btns[i].style.color = "black";
                var leadZeros = doc.getElementsByName("yesThis");
                var max = leadZeros.length;
                for( var j = 0; j < max; j++ ) {
                    leadZeros[j].style.color = "black";
                }
            } else {
                // turn it back off if it's already on
                if( btns[i].style.color === "red") { 
                    btns[i].childNodes[0].nodeValue="_";
                    btns[i].setAttribute( att,'');
                    //btns[i].style.color="#FAF3E4"; // hide "_" with background color
                    // hide "_" with background color
                    btns[i].style.color=btns[i].style.backgroundColor; 
                } else {
                    btns[i].style.color="red";
                    upDateErrCount();
                }
            }
        } else {
            btns[i].childNodes[0].nodeValue="_";
            btns[i].setAttribute( att,'');
            btns[i].style.color="#FAF3E4"; // hide "_" with background color
        }
    }

    if( totDec === 0 || ( which_one !== 7 && btns[which_one].style.color === "black") ||
        Num(doc.getElementById("bdx").value) < Num(doc.getElementById("lastbox").value - 1 ))  { 
        //doc.getElementById("decRmdr").style.color=doc.getElementById("decRmdr").style.backgroundColor;
        doc.getElementById("msg").innerHTML = "";
    } else {
        //doc.getElementById("decRmdr").style.color = "red";
        doc.getElementById("msg").innerHTML = "Click where decimal point should be";
    }
}
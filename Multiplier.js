/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// set the default input focus
function setFocus() { // this part is javascript
    var x = document.getElementById("th-id2");
    var j = document.getElementById("whatbox").value;
    var i = Number(j);
    x.elements[i].focus(); // set focus to whatbox
    x.elements[i].style.backgroundColor = "white";
    x.elements[i].style.color = "red";
    x.elements[i].value="";
}


function zeroCounts() {
    var max = Number(document.getElementById('lastbox').value);
        
    // update problem counts
    document.getElementById("numAttmptd").value = -1;
    document.getElementById("errs").value = 1;
    document.getElementById("numWoErr").value = 0;   
    document.getElementById("consWoErr").value = 0;
    document.getElementById("strtTime").value = Number(Date.now());
    startAgain();
}
// start again button code
function startAgain() {
    var max = Number(document.getElementById('lastbox').value);
    var errCt = Number(document.getElementById("errs").value);
    var boxNo = Number(document.getElementById("bdx").value);
    var errMsg = document.getElementById("msg").innerHTML;
    var numAttmptd = Number(document.getElementById("numAttmptd").value);
    var numWoErr = Number(document.getElementById("numWoErr").value);
    var consWoErr = Number(document.getElementById("consWoErr").value);
    //alert("boxNo = " + boxNo + " max = " + max + " errCt = " + errCt + " errMsg = " + errMsg);

    // update problem counts
    document.getElementById("numAttmptd").value = numAttmptd + 1;
    if( errCt === 0 && boxNo + 1 === max && errMsg === "" ) {
            document.getElementById("numWoErr").value = numWoErr + 1;    
            document.getElementById("consWoErr").value = consWoErr + 1;
    } else {
        document.getElementById("consWoErr").value = '0';
    }
    
    var jstime = Number(Date.now());
    var jatime = Number(document.getElementById("strtTime").value);
    var timediff = jstime - jatime;
    if( timediff === 0 ) {
        document.getElementById("corrPerHr").value = 0;
    } else {
        document.getElementById("corrPerHr").value = 
        Math.floor(3600000*Number(document.getElementById("numWoErr").value)/timediff);
    }
    document.getElementById('th-id2').submit();
    setFocus();
}

function checkZero( row, col ) {
    var op0Bx = document.getElementsByName("op0" + col )[0];
    var ansBx = document.getElementsByName("ai" + row + col)[0];
    var ans = ansBx.value;
    var errString = "";  
        var errBx = document.getElementById("msg");
    if( ans == "0" ) {
        //errBx.style.color = "#FAF3E4";
        errBx.innerHTML = "";
        op0Bx.style.color = "black";
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
        //errBx.style.color = "red";
        op0Bx.style.color = "red";
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
    var op1Bx;
    var op1 = "0";
    var op0Bx = document.getElementsByName("op0" + row )[0];
    var op0 = op0Bx.childNodes[0].nodeValue;
    var ansBx = document.getElementsByName("ai" + row + col)[0];
    var ans = ansBx.value;
    var errString = "";
    var corrAns;
    // are you at the very end where you need to write a carry from the prev col
    if( cinBx.length === 0 && isEnd.length === 0 ) {
        opcol = opcol - 1;
        crcol = crcol - 1;
        op1Bx =  document.getElementsByName("op1" + opcol)[0]; 
        op1 =  op1Bx.childNodes[0].nodeValue; 
        cinBx = document.getElementsByName("cr" + row + crcol);
        cin = cinBx[0].value;
        // use math.floor to do integer division - doesn't work for negative numbers
        corrAns = Math.floor((Number(op0)*Number(op1) + Number(cin))/10);
    } else {
        if( cinBx.length !== 0 ) {
            cin = cinBx[0].value;
        }
        op1Bx =  document.getElementsByName("op1" + opcol)[0]; 
        op1 =  op1Bx.childNodes[0].nodeValue; 
        corrAns = (Number(op0)*Number(op1) + Number(cin))%10;
    }
    var errBx = document.getElementById("msg");
    if( ans == corrAns ) {
        //errBx.style.color = "#FAF3E4";
        errBx.innerHTML = "";
        op0Bx.style.color = "black";
        op1Bx.style.color = "black";
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
        //errBx.style.color = "red";
        op0Bx.style.color = "red";
        op1Bx.style.color = "red";
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
    var op0Bx = document.getElementsByName("op0" + row )[0];
    var op0 = op0Bx.childNodes[0].nodeValue;
    //alert("in checkCarry opcol for top is " + col);
    var op1Bx =  document.getElementsByName("op1" + col)[0]; 
    var op1 =  op1Bx.childNodes[0].nodeValue;
    var crcol = col - 1;
    var cinBx = document.getElementsByName("cr" + row + crcol);
    if( cinBx.length > 0 ) {
        cin = cinBx[0].value;
    }
    var errBx = document.getElementById("msg");
    corrAns = Math.floor((Number(op0)*Number(op1) + Number(cin))/10);
    if( ans == corrAns ) {
        //errBx.style.color = "#FAF3E4
        errBx.innerHTML = "";
        op0Bx.style.color = "black";
        op1Bx.style.color = "black";
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
        //errBx.style.color = "red";
        op0Bx.style.color = "red";
        op1Bx.style.color = "red";
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
    var ai0 = 0;
    var ai1 = 0;
    var ai2 = 0;
    var prevCarry = 0;
    var ai0Bx = document.getElementsByName("ai0" + aicol);
    var ai1Bx = document.getElementsByName("ai1" + aicol);
    var ai2Bx = document.getElementsByName("ai2" + aicol);
    var pcBx;
    if( ai0Bx.length !== 0 ) {
        ai0 = Number(ai0Bx[0].value);
    }
    if( ai1Bx.length !== 0 ) {
        ai1 = Number(ai1Bx[0].value);
    }
    if( ai2Bx.length !== 0 ) {
        ai2 = Number(ai2Bx[0].value);
    }
    if( col > 0 ) {
        var prevCol = col - 1;
        pcBx = document.getElementsByName("ca" + prevCol)[0];
        prevCarry = Number(pcBx.value);
    }
    var errBx = document.getElementById("msg");
    var corrAns = Math.floor((ai0+ai1+ai2+prevCarry)/10); 
    if(ans == corrAns ){
        //errBx.style.color = "#FAF3E4";
        errBx.innerHTML = "";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "black";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "black";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "black";
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
    var ai0 = 0;
    var ai1 = 0;
    var ai2 = 0;
    var prevCarry = 0;
    var ai0Bx = document.getElementsByName("ai0" + col);
    var ai1Bx = document.getElementsByName("ai1" + col);
    var ai2Bx = document.getElementsByName("ai2" + col);
    var pcBx;
    if( ai0Bx.length !== 0 ) {
        ai0 = Number(ai0Bx[0].value);
    }
    if( ai1Bx.length !== 0 ) {
        ai1 = Number(ai1Bx[0].value);
    }
    if( ai2Bx.length !== 0 ) {
        ai2 = Number(ai2Bx[0].value);
    }
    if( col > 1 ) {
        var prevCol = col - 2;
        pcBx = document.getElementsByName("ca" + prevCol);
        if( pcBx.length > 0 ) {
            prevCarry = Number(pcBx[0].value);
        }
    }
    var corrAns = -1;
    // if this is not an add at all but a carry to the last digit...
    if( ai2Bx.length === 0 && ai1Bx.length === 0 && ai0Bx.length === 0 ) {
        col = col - 1;
        ai0Bx = document.getElementsByName("ai0" + col);
        ai1Bx = document.getElementsByName("ai1" + col);
        ai2Bx = document.getElementsByName("ai2" + col);
        if( ai0Bx.length !== 0 ) {
            ai0 = Number(ai0Bx[0].value);
        }
        if( ai1Bx.length !== 0 ) {
            ai1 = Number(ai1Bx[0].value);
        }
        if( ai2Bx.length !== 0 ) {
            ai2 = Number(ai2Bx[0].value);
        }
        if( prevCol > 0 ) {
            prevCol = prevCol - 1;
            pcBx = document.getElementsByName("ca" + prevCol);
            if( pcBx.length > 0 ) {
                prevCarry = Number(pcBx[0].value);
            }
        }
        corrAns = Math.floor((ai0+ai1+ai2+prevCarry)/10);
        errString = "most significant digit of " + errString;
    } else {
        corrAns = (ai0+ai1+ai2+prevCarry)%10;
        errString = "least significant digit of " + errString;
    }
    var errBx = document.getElementById("msg");
    if(ans == corrAns ){
        //errBx.style.color = "#FAF3E4";
        errBx.innerHTML = "";
        if( ai0Bx.length !== 0 ) {
            ai0Bx[0].style.color = "black";
        }
        if( ai1Bx.length !== 0 ) {
            ai1Bx[0].style.color = "black";
        }
        if( ai2Bx.length !== 0 ) {
            ai2Bx[0].style.color = "black";
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
    // hide the decimal point reminder by making the text the same as the background
    // color if:
    // the answer doesn't have a decimal point, 
    // there are still numbers to fill in or
    // the decimal point is already set correctly
    if( Number(document.getElementById("ansDp").value) === 0 ||
        bdx < Number(document.getElementById("lastbox").value - 1 ) ||
        isSetAlready )  { 
        //document.getElementById("decRmdr").style.color="#FAF3E4";
        document.getElementById("msg").innerHTML = "";
    } else {
        document.getElementById("msg").innerHTML = "Click where decimal point should be";
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
    var totDec = Number(document.getElementById("ansDp").value);
    var nbtns= btns.length;
    for( i = 0; i < nbtns; i++ ) {
        var att = "andsp" + i;
        if( i === which_one ) {
            btns[i].childNodes[0].nodeValue=".";
            btns[i].setAttribute( att,'.');
            var markedDec = nbtns - i;
            if( totDec === markedDec ) {
                btns[i].style.color="black";
                var leadZeros = document.getElementsByName("yesThis");
                var max = leadZeros.length;
                for( j = 0; j < max; j++ ) {
                    leadZeros[j].style.color = "black";
                }
            } else {
                // turn it back off if it's already on
                if( btns[i].style.color == "red") { 
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
        Number(document.getElementById("bdx").value) < Number(document.getElementById("lastbox").value - 1 ))  { 
        //document.getElementById("decRmdr").style.color=document.getElementById("decRmdr").style.backgroundColor;
        document.getElementById("msg").innerHTML = "";
    } else {
        //document.getElementById("decRmdr").style.color = "red";
        document.getElementById("msg").innerHTML = "Click where decimal point should be";
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function incrementbox(){
    var bdx = Number(document.getElementById('bdx').value) + 1;
    document.getElementById('bdx').value = bdx;
    var nextbox = document.getElementsByName("nextbox")[bdx].value;
    document.getElementById("whatbox").value = nextbox;
}
function checkMcarry( col, sbx ){
    //var ansBxname = "cm" + col + "_" + sbx;
    var ansBx = document.getElementsByName("cm" + col + "_" + sbx)[0];
    var prevBx;
    if( col > 0 ){
        var prevCol = col - 1;
        prevBx = document.getElementsByName("cm" + prevCol + "_" + sbx)[0];
    }
    //alert("ansBxname = " + ansBxname);
    var ans = ansBx.value;
    var errBx = document.getElementById("msg");
    var mcarry = 0;
    //var qdx = Number(document.getElementById('quotDigs').value) - 1 - sbx;
    var quotDigs = Number(document.getElementById('quotDigs').value);

    var qdigit = new Array();
    var possBx = new Array();
    // find the quotient digits that will generate carries
    for( var i = quotDigs-1, j = 0; i >= 0; i-- ) {
        possBx[j] = document.getElementsByName('qt' + i)[0];
        var possdigit = Number(possBx[j].value);
        if( possdigit > 1 ){
            qdigit[j] = possdigit;
            j++;
        }
    }
    //alert(" qdigit[" + sbx + "] = " + qdigit[sbx] + "  col = " + col);
    var dvsrdigs = document.getElementsByName("dvsrdigs");
    for( var i = 0; i <= col; i++ ){
        var whatdvsrDig = dvsrdigs.length-1-i;
        var dvsrDig = dvsrdigs[whatdvsrDig].childNodes[0].nodeValue;
        mcarry += Number(dvsrDig)*qdigit[sbx];
        mcarry = Math.floor(mcarry/10);
        //alert("dvsr index = " + whatdvsrDig + " divisor digit = " + dvsrDig + " mcarry = " + mcarry);
    }
    if( ans == mcarry ){
        ansBx.style.color = "black";
        dvsrdigs[dvsrdigs.length-1-col].style.color = "black";
        if( prevBx ){
            prevBx.style.color = "black";
        }
        possBx[sbx].style.color = "black";
        errBx.innerHTML = "";
        incrementbox();
    } else {
        dvsrdigs[dvsrdigs.length-1-col].style.color = "red";
        if( prevBx ){
            prevBx.style.color = "red";
        }
        possBx[sbx].style.color = "red";
        errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}

function divide( immFeedBkCk, col, qtDig ){
    //make the bringdowns appear one at a time fixit
    //alert("immFeedBkCk = " + immFeedBkCk + " col = " + col + " qtDig = " + qtDig );
    if( immFeedBkCk ) {
        var ansBx = document.getElementsByName("qt" + col)[0];
        var ans = ansBx.value;
        var errBx = document.getElementById("msg");
        var whatRow = Number(document.getElementById('rowNo').value);
        var dvddigs;
        var bddigs;
        if( whatRow == 0 ) {
            dvddigs = document.getElementsByName("dvddigs");
        } else {
            var prevRow = whatRow - 1;
            dvddigs = document.getElementsByName('op' + prevRow + '_1');
            bddigs = document.getElementsByName('bd' + prevRow);
        }
        var dvsrdigs = document.getElementsByName("dvsrdigs");
        if( ans == qtDig ) {
            //alert("correct answer is " + ans );
            ansBx.style.color = "black";
            // turn divisor and either dividend or most recent difference black
            for( var i = 0; i < dvddigs.length; i++ ){
                    dvddigs[i].style.color = "black";
            }
            if( bddigs ){
                for( var i = 0; i < bddigs.length; i++ ){
                        bddigs[i].style.color = "black";
                }
            }
            for( var i = 0; i < dvsrdigs.length; i++ ){
                    dvsrdigs[i].style.color = "black";
            }
            errBx.innerHTML = "";
            if( ans != 0 ){ // otherwise you will need to bring down more digits
                            // before you can start another row  
                var name = 'op' + whatRow + '_0';
                var visibleMrows = document.getElementsByName(name);
                //alert("name = " + name + " visible multiplication rows = " + visibleMrows + " length = " + visibleMrows.length);
                for( var i = 0; i < visibleMrows.length; i++ ) {
                    visibleMrows[i].type = "text";
                }
                var visibleDrows = document.getElementsByName('op' + whatRow + '_1');
                for( var i = 0; i < visibleDrows.length; i++ ) {
                    visibleDrows[i].type = "text";
                }
                var visibleBrows = document.getElementsByName('bd' + whatRow);
                for( var i = 0; i < visibleBrows.length; i++ ) {
                    visibleBrows[i].type = "text";
                }
                name = "cspan" + whatRow;
                var visibleBar = document.getElementById(name);
                //alert("name = " + name + " visible bar = " + visibleBar + " length = " + visibleBar.length);
                if( visibleBar ) {
                   visibleBar.className="th-id3";
                }
                var visibleMinus = document.getElementById('minus' + whatRow);
                if( visibleMinus ) {
                    visibleMinus.className="t1";
                }
                whatRow = whatRow + 1;
                document.getElementById('rowNo').value = whatRow;
            }
            incrementbox();
        } else {
            // make divisor and either dividend or most recent difference red
            var stop = dvddigs.length;
            if( whatRow == 0 ){
                stop = stop + 1 - document.getElementById('quotDigs').value;
            }
            for( var i = 0; i < stop; i++ ){
                    dvddigs[i].style.color = "red";
            }
            if( bddigs ){
                for( var i = 0; i < bddigs.length; i++ ){
                        bddigs[i].style.color = "red";
                }
            }
            for( var i = 0; i < dvsrdigs.length; i++ ){
                    dvsrdigs[i].style.color = "red";
            }
            errBx.innerHTML = "not " + ans;
        }
        setFocus();
    }
}

function multiply( col, sbx ){
    var ansBxs = document.getElementsByName("op" + sbx + "_0");
    var bxNo = ansBxs.length - 1 - col;
    //alert("ansBxs = " + ansBxs + " length = " + ansBxs.length + " bxNo = " + bxNo );
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var quotDigs = Number(document.getElementById("quotDigs").value);
    var dec = sbx;
    for( var prevrow = sbx - 1; prevrow >= 0; prevrow-- ) {
        var bringDowns = document.getElementsByName("bd" + prevrow ).length;
        if( bringDowns > 1 ) {
            dec += bringDowns - 1;
        }
    }
    var qdx = quotDigs - 1 - dec; // not neccessarily sbx if there was more than 1 bringdowns
    var qBx = document.getElementsByName("qt" + qdx)[0];
    var qtDig = Number(qBx.value);
    // do we need both? fixit
    var divisor = Number(document.getElementById("divisor").value);
    var dvsrdigs = document.getElementsByName("dvsrdigs");
    var whatDig = dvsrdigs.length - 1 - col;
    if( whatDig < 0 ) {
        whatDig = 0;
    }
    var carry = 0;
    var prod = 0;
    var expDig = 0;
    var prevcaBx;
    if( col == ansBxs.length-1 && col > 1 ){
        var prevCol = col - 2;
        prevcaBx = document.getElementsByName("cm" + prevCol + "_" + sbx)[0];
    } else if( col > 0 ){
        var prevCol = col - 1;
        prevcaBx = document.getElementsByName("cm" + prevCol + "_" + sbx)[0];
    }
    // starting with least significant digit, multiply each digit and 
    // calculate the carry
    // if carries were displayed, you would not have to calculate them fixit
    for( var i = 0; i <= col; i++ ) {
        prod = (divisor % 10)*qtDig + carry; // new least significant digit
                                             // times quotient digit 
                                             // plus previous carry
        expDig = prod % 10; // least significant digit of prod
        carry = (prod - expDig)/ 10; // most significant digit of prod
        //alert("qBx = " + qBx + " qtDig = " + qtDig + " divisor = " + divisor + " carry = " + carry + " expDig = " + expDig );
        divisor = Math.floor(divisor / 10); // remove least significant digit

    }
    if( ans == expDig ) {
        //alert("correct, answer is " + ans);
        qBx.style.color = "black";
        dvsrdigs[whatDig].style.color = "black";
        ansBxs[bxNo].style.color = "black";
        if( prevcaBx ){
            prevcaBx.style.color = "black";
        }
        errBx.innerHTML = "";
        incrementbox();
    } else { 
        // carries not always red fixit
        errBx.innerHTML = "not " + ans;
        qBx.style.color = "red";
        dvsrdigs[whatDig].style.color = "red";
        if( prevcaBx ){
            prevcaBx.style.color = "red";
        }
        upDateErrCount();
    }
    setFocus();
}

function subtract( col, sbx ){
    var ansBxs = document.getElementsByName("op" + sbx + "_1");
    var bxNo = ansBxs.length - 1 - col;
    //alert("ansBxs = " + ansBxs + " length = " + ansBxs.length + " bxNo = " + bxNo );
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var prodBxs = document.getElementsByName("op" + sbx + "_0");
    var prod = 0;
    var dvdBxs;
    for( var i = 0; i < prodBxs.length; i++ ) {
        var pbx = prodBxs.length - 1 - i;
        prod += Math.pow(10, i)*Number(prodBxs[pbx].value);
    }
    var dividend = 0;
    var dvdidx;
    var prodidx = prodBxs.length - 1 - col;
    var prodBx = prodBxs[prodidx];
    var dvdBx;
    if( sbx == 0 ) {
        dvdBxs = document.getElementsByName("dvddigs");
        dvdidx = dvdBxs.length - document.getElementById('quotDigs').value - col;
        //alert("actual dividend, dvdidx = " + dvdidx);
        dvdBx = dvdBxs[dvdidx];
        dividend = Number(document.getElementById("dividend").value);
        var lastDig = 0;
        // will this work with a wrong answer? fixit
        while( dividend >= prod ) {
            lastDig = dividend % 10;
            dividend = (dividend - lastDig)/10;
        }
        dividend = 10*dividend + lastDig;
    } else {
        var ddx = sbx - 1;
        var bdBxs = document.getElementsByName("bd" + ddx );
        dvdBxs = document.getElementsByName("op" + ddx + "_1");
        var inc = bdBxs.length;
        dvdidx = inc - 1 - col;
        //alert(" bring down boxes length is " + inc );
        for( var i = 0; i < inc; i++ ) {
            var dd = inc - 1 - i;
            dividend += Math.pow(10, i)*Number(bdBxs[dd].value);
            //alert("i = " + i + " dividend = " + dividend );
        }
        if( col >= inc ){
            //alert("adding " + dvdBxs.length + " to dvdidx " + dvdidx );
            dvdidx = dvdidx + dvdBxs.length;
            //alert("sbx = " + sbx + " difference dvdidx = " + dvdidx);
            dvdBx = dvdBxs[dvdidx];
        } else {
            //alert("sbx = " + sbx + " bringdown dvdidx = " + dvdidx);
            dvdBx = bdBxs[dvdidx];
        }

        for( var i = 0; i < dvdBxs.length; i++ ) {
            var dd = dvdBxs.length - 1 - i;
            dividend += Math.pow(10, i+inc)*Number(dvdBxs[dd].value);
            //alert("prod = " + prod + " i = " + i + " dividend = " + dividend );
        }
    }
    var diff = dividend - prod;
    //alert("dividend = " + dividend + " prod = " + prod + " diff = " + diff );
    var discard = diff % Math.pow(10, col);
    var expAns = (diff % Math.pow(10,col+1) - discard)/Math.pow(10, col);
    //alert("expAns = " + expAns);

    if( ans == expAns ) {
        //alert("correct, answer is " + ans);
        ansBxs[bxNo].style.color = "black";
        dvdBx.style.color = "black";
        prodBx.style.color = "black";
        errBx.innerHTML = "";
        incrementbox();
    } else {
        // show borrows only in case of error fixit
        dvdBx.style.color = "red";
        prodBx.style.color = "red";
        errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}

function bringdown( col, sbx ) {
    var ansBxs = document.getElementsByName("bd" + sbx );
    var bxNo = ansBxs.length - 1 - col;
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var dvddigs = document.getElementsByName("dvddigs");
    var dvdcol = Number(document.getElementById("quotDigs").value) - 1;
    //alert("quotDigs - 1 dvdidx = " + dvdidx );
    for( var idx = 0; idx < sbx; idx++ ) {
        dvdcol -= document.getElementsByName("bd" + idx ).length;
        //alert("idx = " + idx + " dvdidx = " + dvdidx );
    }
    dvdcol -= document.getElementsByName("bd" + sbx ).length - col
    var whatDig = dvddigs.length - 1 - dvdcol;
    //alert(" final dvdcol = " + dvdcol + " whatDig = " + whatDig);
    var dividend = Number(document.getElementById("dividend").value);
    var discard = dividend % Math.pow(10, dvdcol);
    var expAns = (dividend % Math.pow(10,dvdcol+1) - discard)/Math.pow(10, dvdcol);
    if( ans == expAns ) {
        //alert("correct, answer is " + ans);
        ansBxs[bxNo].style.color = "black";
        dvddigs[whatDig].style.color = "black";
        errBx.innerHTML = "";
        incrementbox();
    } else {
        dvddigs[whatDig].style.color = "red";
        errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}
function checkDivBorrow( col, sbx ) {
    document.getElementById('statusBox2').innerHTML = "col = " + col + " sbx = " + sbx;
    var errBx = document.getElementById("msg");
    var ciBx = document.getElementsByName("ca" + col + "_" + sbx)[0];
    var ans = ciBx.value;
    
    if(ans == 1 ) {
        errBx.innerHTML = "";
        ciBx.style.color = "black";
        setFocus();
    } else {
        upDateErrCount();
        ciBx.style.color = "red";
        ciBx.value="";
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
function checkNewDivVal( col, sbx ) {
    document.getElementById('statusBox2').innerHTML = "col = " + col + " sbx = " + sbx;
    var errBx = document.getElementById("msg");
    var borBxs;
    var whatBorBx;
    var borValue;
    var borBx;
    if( sbx == 0 ) {
        borBxs = document.getElementsByName("dvddigs");
        whatBorBx = borBxs.length - 1 - col;
        borBx = borBxs[whatBorBx];
        borValue = Number(borBx.childNodes[0].nodeValue); // read fixed node value
    } else {
        var ddx = sbx - 1;
        borBxs = document.getElementsByName("op" + ddx + "_1");
        var bdBxs = document.getElementsByName("bd" + ddx);
        if( col < bdBxs.length ) {
            whatBorBx = bdBxs.length - 1 - col;
            borBx = bdBxs[whatBorBx];
        } else {
            whatBorBx = borBxs.length + bdBxs.length - 1 - col;
            borBx = borBxs[whatBorBx];
        }
        borValue = Number(borBx.value); // read from input
    }
    var coBx = document.getElementsByName("ca" + col + "_" + sbx);
    var co = 0;
    if( coBx.length > 0 ) {
        co = 10*Number(coBx[0].value);
    }
    var newBx = document.getElementsByName("bo" + col + "_" + sbx)[0];

    var prevCol = col - 1;
    var ciBx = document.getElementsByName("ca" + prevCol + "_" + sbx)[0];
    var ans = newBx.value;
    var corrAns = co + borValue - 1;

    if( corrAns > 9 ) {
        corrAns = corrAns - co;
    }
    if(ans == corrAns ) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        borBx.style.color = "black";
        if( coBx.length > 0 ) {
            coBx[0].style.color = "black";
        }
        ciBx.focus();
        ciBx.style.backgroundColor = "white";
        ciBx.style.color = "red";
        ciBx.style.border = "1px solid black";
        ciBx.value="";
    } else {
        upDateErrCount();
        newBx.style.color = "red";
        newBx.value = "";
        borBx.style.color = "red";
        if( coBx.length > 0 ) {
            coBx[0].style.color = "red";
        }
        errString = "not " + ans;
        errBx.innerHTML = "";
        errBx.innerHTML = errString;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
function promptDivBorrow( col, sbx ) {
    document.getElementById('statusBox0').innerHTML = "col = " + col + " sbx = " + sbx;
    var borBxs;
    var whatBorBx;
    var borValue;
    var borBx;
    if( sbx == 0 ) {
        borBxs = document.getElementsByName("dvddigs");
        whatBorBx = borBxs.length - 1 - col;
        borBx = borBxs[whatBorBx];
        borValue = Number(borBx.childNodes[0].nodeValue); // read fixed node value
    } else {
        var ddx = sbx - 1;
        borBxs = document.getElementsByName("op" + ddx + "_1");
        var bdBxs = document.getElementsByName("bd" + ddx);
        if( col < bdBxs.length ) {
            whatBorBx = bdBxs.length - 1 - col;
            borBx = bdBxs[whatBorBx];
        } else {
            whatBorBx = borBxs.length + bdBxs.length - 1 - col;
            borBx = borBxs[whatBorBx];
        }
        borValue = Number(borBx.value); // read from input
    }

    var coBx = document.getElementsByName("ca" + col + "_" + sbx);
    var newBx = document.getElementsByName("bo" + col + "_" + sbx)[0];
    
    // turn any red numbers for a subtraction error black
    var allT1s = document.getElementsByClassName("t1");
    for( var i = 0; i < allT1s.length; i++ ) {
        allT1s[i].style.color = "black";
    }  
    var allF1s = document.getElementsByClassName("f1");
    for( var i = 0; i < allF1s.length; i++ ) {
        allF1s[i].style.color = "black";
    } 
    var allF2s = document.getElementsByClassName("f2");
    for( var i = 0; i < allF2s.length; i++ ) {
        allF2s[i].style.color = "black";
    } 
    var errBx = document.getElementById("msg");
    errBx.innerHTML = "";
    
    if( newBx ) { // make sure it's really a column that should be borrowed from 
                  // or do nothing
    
        if( borValue === 0 ) {
            // if 0 then cross off the carry in as well
            // if it's 0 & no carry in, there is nothing to borrow so do nothing
            if( coBx.length > 0 && Number(coBx[0].value) === 1 ) {
                borBx.style.setProperty("text-decoration", "line-through");
                coBx[0].style.textDecoration = "line-through";
                newBx.focus();
                newBx.style.backgroundColor = "white";
                newBx.style.color = "red";
                newBx.style.border = "1px solid black";
                newBx.value="";
            }
        } else {
            borBx.style.setProperty("text-decoration", "line-through");
            newBx.focus();
            newBx.style.backgroundColor = "white";
            newBx.style.color = "red";
            newBx.style.border = "1px solid black";
            newBx.value="";
        }
    
        // keep "click on a digit to borrow from it" message up until all the 
        // borrows have been made
        var displayBorrow = document.getElementById('dispBo');
        var nCols = document.getElementsByClassName('dp');
        var mtBoxes = 0;
        for( var idx = 0; idx < nCols.length; idx++ ) {
            newBx = document.getElementsByName("bo" + idx)[0];
            if( newBx ) {
                if( newBx.value === "" ) {
                    mtBoxes += 1;
                }
            }

        }
        if( mtBoxes < 2 ) {
            displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
        }
    }
}
   
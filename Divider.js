/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// need borrows and carries calculated in javascript so that you can show the user 
// where they made a mistake in subtracting and so that the user can estimate
// answers and try again fixit

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
    if( immFeedBkCk ) {
        var ansBx = document.getElementsByName("qt" + col)[0];
        var ans = ansBx.value;
        var errBx = document.getElementById("msg");
        var whatRow = Number(document.getElementById('rowNo').value);
        var dvddigs;
        var bddigs;
        var prevRow;
        if( whatRow == 0 ) {
            dvddigs = document.getElementsByName("dvddigs");
        } else {
            prevRow = whatRow - 1;
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
            // need to take 0.87 into account fixit
            if( ans == 0 ){  // you will need to bring down more digits
                             // before you can start another row  
                var visibleBrows = document.getElementsByName('bd' + prevRow);
                    for( var i = 0; i < visibleBrows.length; i++ ) {
                        if( visibleBrows[i].type == "hidden") {
                            visibleBrows[i].type = "text";
                            break;
                        }
                    }
            } else { // make multiplication boxes visible
                var name = 'op' + whatRow + '_0';
                var visibleMrow = document.getElementsByName(name);
                for( var i = 0; i < visibleMrow.length; i++ ) {
                    visibleMrow[i].type = "text";
                }

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
    //document.getElementById('statusBox3').innerHTML = "col = " + col + " sbx = " + sbx;

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
    var cmx = 0;
    var startquot = quotDigs - 1;
    //document.getElementById('statusBox0').innerHTML = "startquot = " + startquot + " qdx = " + qdx;
    for( var i = startquot; i > qdx; i-- ) {
        if( Number(document.getElementsByName("qt" + i)[0].value) > 1 ) {
            cmx = cmx + 1;
        }
        //alert(" i = " + i + " cmx = " + cmx);
    }
    var isLastMult = false;
    // this needs to be changed to allow for estimation fixit
    if( col == ansBxs.length-1 ){
        isLastMult = true;
        if( col > 1 ) {
            var prevCol = dvsrdigs.length - 2;
            prevcaBx = document.getElementsByName("cm" + prevCol + "_" + cmx)[0];
        }
    } else if( col > 0 ){
        var prevCol = col - 1;
        prevcaBx = document.getElementsByName("cm" + prevCol + "_" + cmx)[0];
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
        qBx.style.color = "black";
        dvsrdigs[whatDig].style.color = "black";
        ansBxs[bxNo].style.color = "black";
        if( prevcaBx ){
            prevcaBx.style.color = "black";
        }
        errBx.innerHTML = "";
        if( isLastMult ) {
            var whatRow = Number(document.getElementById('rowNo').value);
            var visibleDrows = document.getElementsByName('op' + whatRow + '_1');
            for( var i = 0; i < visibleDrows.length; i++ ) {
                visibleDrows[i].type = "text";
            }

            var name = "cspan" + whatRow;
            var visibleBar = document.getElementById(name);
            if( visibleBar ) {
                visibleBar.className="th-id3";
            }
            var visibleMinus = document.getElementById('minus' + whatRow);
            if( visibleMinus ) {
                visibleMinus.className="t1";
            }
            var whatHelp = document.getElementsByName('showhelp');
            var showBrowsChkd = false;
            for( var i = 0; i < whatHelp.length; i++ ) {
                if( whatHelp[i].checked ) { // need to check actual value fixit
                    showBrowsChkd = true;
                    break;
                }
            }
            if( showBrowsChkd ) {
                var dvddigs = document.getElementsByName("dvddigs");
                var bddigs;
                if( whatRow > 0 ) {
                    var prevRow = whatRow - 1;
                    dvddigs = document.getElementsByName('op' + prevRow + '_1');
                    bddigs = document.getElementsByName('bd' + prevRow);
                }
                var jstop = dvddigs.length;
                if( bddigs ) {
                        jstop += bddigs.length
                }
                for( var j = 0; j < jstop; j++ ) {
                    var whatBorrow = 'bo' + j + "_" + whatRow;
                    var visibleBorrow = document.getElementsByName( whatBorrow );
                    if( visibleBorrow.length > 0 ) {
                        document.getElementById("dispBo").style.color = "#600301";
                        visibleBorrow[0].type = "text";
                        visibleBorrow[0].style.height = "1.7em";
                    }
                    var whatCarry = 'ca' + j + "_" + whatRow;
                    var visibleCarry = document.getElementsByName( whatCarry );
                    if( visibleCarry.length > 0 ) {
                        visibleCarry[0].type = "text";
                        visibleCarry[0].style.height = "1em";
                    }
                }
            }
            whatRow = whatRow + 1;
            document.getElementById('rowNo').value = whatRow;
        }
        incrementbox();
    } else { 
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

function subtract( col, sbx ) {
    var ansBxs = document.getElementsByName("op" + sbx + "_1");
    var isLastSub = ( col == ansBxs.length - 1 ); // won't work for estimates fixit
    var bxNo = ansBxs.length - 1 - col;
    //alert("col = " + col + " ansBxs = " + ansBxs + " length = " + ansBxs.length + " bxNo = " + bxNo );
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var prodBxs = document.getElementsByName("op" + sbx + "_0");
    var prod = 0;
    var dvdBxs;
    var pbx;
    //for( var i = 0; i < prodBxs.length; i++ ) {
    for( var i = 0; i <= col; i++ ) {
        pbx = prodBxs.length - 1 - i;
        prod += Math.pow(10, i)*Number(prodBxs[pbx].value);
        //alert("i = " + i + " prodBxs[" + pbx + "] = " + prodBxs[pbx].value + " prod = " + prod );
    }
    var dividend = 0;
    var dvdidx;
    var prodidx = prodBxs.length - 1 - col;
    var prodBx = prodBxs[prodidx];
    var dvdBx;
    var dvdVal = 0;
    var borCol = Number(col);
    if( sbx == 0 ) {
        borCol = borCol + Number(document.getElementById('quotDigs').value) - 1;

        dvdBxs = document.getElementsByName("dvddigs");
        dvdidx = dvdBxs.length - document.getElementById('quotDigs').value - col;
        
        //alert("actual dividend, dvdidx = " + dvdidx);
        dvdBx = dvdBxs[dvdidx];
        dvdVal = Number(dvdBx.childNodes[0].nodeValue);
        var lasti = dvdidx - 1;
        //for( var pow = 0, i = dvdBxs.length - document.getElementById('quotDigs').value;
        //    i >= lasti ; 
        //    --i, ++pow ) {
        var pow = 0;
        var i = dvdBxs.length - document.getElementById('quotDigs').value;
        while( dividend < prod || i >= dvdidx ) {     
            dividend += Math.pow( 10, pow)*Number(dvdBxs[i].childNodes[0].nodeValue);
            --i;
            if( i < 0 ) {
                break;
            }
            ++pow;
        }
        /*
        dividend = Number(document.getElementById("dividend").value);
        var lastDig = 0;
        // will this work with a wrong answer? fixit
        // could probably work with dvdBxs. do we need dividend id at all?
        // remove least significant digits
        while( dividend >= prod ) {
            lastDig = dividend % 10;
            dividend = (dividend - lastDig)/10;
        }
        dividend = 10*dividend + lastDig; // back off last removal
        */
    } else {
        var ddx = sbx - 1;
        var bdBxs = document.getElementsByName("bd" + ddx );
        dvdBxs = document.getElementsByName("op" + ddx + "_1");
        var inc = bdBxs.length;
        dvdidx = inc - 1 - col;
        //alert(" bring down boxes length is " + inc );
        for( var i = 0; i < inc; i++ ) {
            var dd = inc - 1 - i;
            dvdVal = Number(bdBxs[dd].value);
            dividend += Math.pow(10, i)*dvdVal;
            //alert("bringdown i = " + i + " dividend = " + dividend );
        }
        var mindd;
        if( col >= inc ){
            //alert("adding " + dvdBxs.length + " to dvdidx " + dvdidx );
            dvdidx = dvdidx + dvdBxs.length;
            //alert("sbx = " + sbx + " difference dvdidx = " + dvdidx);
            dvdBx = dvdBxs[dvdidx];
            mindd = dvdidx;
        } else {
            //alert("sbx = " + sbx + " bringdown dvdidx = " + dvdidx);
            dvdBx = bdBxs[dvdidx];
            mindd = dvdBxs.length-1;
        }
        dvdVal = dvdBx.value;
        //for( var i = 0; i < dvdBxs.length; i++ ) {
        //for( var i = 0; i <= col-inc+1; i++ ) {
        i = 0;
        var dd = dvdBxs.length - 1 - i;
        while( dividend < prod || dd >= mindd ) {
            if( dd < 0 ) { 
                break;
            }
            dividend += Math.pow(10, i+inc)*Number(dvdBxs[dd].value);
            i++;
            dd--;
            //alert("i = " + i + " dividend = " + dividend );
        }
        var ddx = sbx - 1;
    }
    var diff = dividend - prod;
    var whatBorBx = "bo" + borCol + "_" + sbx;
    var borBx = document.getElementsByName(whatBorBx);
    var whatCarry = "ca" + borCol + "_" + sbx;
    var caBx = document.getElementsByName( whatCarry );

    var discard = diff % Math.pow(10, col);
    //var mainpart = diff % Math.pow(10,col+1);
    //var ten2col = Math.pow(10, col);
    //var ten2colPlus1 = Math.pow(10,col+1);
    //document.getElementById('statusBox1').innerHTML = "dividend = " + dividend + " prod = " + prod + " diff = " + diff + " mainpart = " + mainpart + " discard = " + discard;
    var expAns = (diff % Math.pow(10,col+1) - discard)/Math.pow(10, col);

    if( ans == expAns ) {
        //alert("correct, answer is " + ans);
        ansBxs[bxNo].style.color = "black";
        var whatHelp = document.getElementsByName('showhelp');
        var showBrowsChkd = false;
        for( var i = 0; i < whatHelp.length; i++ ) {
            if( whatHelp[i].checked ) { // need to check actual value fixit
                showBrowsChkd = true;
                break;
            }
        }
        if( !showBrowsChkd && borBx.length > 0 ) {
            borBx[0].type = "hidden";
        }

        if( !showBrowsChkd && caBx.length > 0 ) {
            caBx[0].type = "hidden";
        }
        dvdBx.style.color = "black";
        dvdBx.style.removeProperty("text-decoration");
        prodBx.style.color = "black";
        errBx.innerHTML = "";
        if( isLastSub ) {
            var displayBorrow = document.getElementById('dispBo');
            displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
            var visibleBrows = document.getElementsByName('bd' + sbx);
            if( visibleBrows.length > 0 ) {
                visibleBrows[0].type = "text";
            }
        }
        incrementbox();
    } else {
        // show borrows  or carries in case of error
        var caValue = 0;
        if( caBx.length > 0 ) { // won't work for estimate fixit
            caBx[0].style.height = "1em";
            caBx[0].type = "text";
            caBx[0].style.color = "red";
            caValue = 1;
            caBx[0].value = caValue;
        }
        
        if( borBx.length > 0 ) { // won't work for estimate fixit
            borBx[0].style.height = "1.7em";
            borBx[0].type = "text";
            borBx[0].style.color = "red";
            //alert("dvdVal = " + dvdVal);
            var borVal = dvdVal - 1;
            if( borVal < 0 ) {
                borVal += 10;
                caBx[0].style.setProperty("text-decoration", "line-through");
                caBx[0].style.color = "black";
            }
            borBx[0].value = borVal;
            dvdBx.style.setProperty("text-decoration", "line-through");
        } else {
            dvdBx.style.color = "red";
        }
        //alert("whatBorCol = " + borCol + " whatBorrow = " + whatBorBx + " whatCarry = " + whatCarry );
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
    //document.getElementById('statusBox2').innerHTML = "col = " + col + " sbx = " + sbx;
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
        errBx.innerHTML = "";
        errBx.innerHTML = "not " + ans;
    }
}
function checkNewDivVal( col, sbx ) {
    //document.getElementById('statusBox2').innerHTML = "col = " + col + " sbx = " + sbx;
    var errBx = document.getElementById("msg");
    var borFrmBxs;
    var whatBorFrm;
    var borFrmValue;
    var borFrmBx;
    if( sbx == 0 ) {
        borFrmBxs = document.getElementsByName("dvddigs");
        whatBorFrm = borFrmBxs.length - 1 - col;
        borFrmBx = borFrmBxs[whatBorFrm];
        borFrmValue = Number(borFrmBx.childNodes[0].nodeValue); // read fixed node value
    } else {
        var ddx = sbx - 1;
        borFrmBxs = document.getElementsByName("op" + ddx + "_1");
        var bdBxs = document.getElementsByName("bd" + ddx);
        if( col < bdBxs.length ) {
            whatBorFrm = bdBxs.length - 1 - col;
            borFrmBx = bdBxs[whatBorFrm];
        } else {
            whatBorFrm = borFrmBxs.length + bdBxs.length - 1 - col;
            borFrmBx = borFrmBxs[whatBorFrm];
        }
        borFrmValue = Number(borFrmBx.value); // read from input
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
    var corrAns = co + borFrmValue - 1;

    if( corrAns > 9 ) {
        corrAns = corrAns - co;
    }
    if(ans == corrAns ) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        borFrmBx.style.color = "black";
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
        borFrmBx.style.color = "red";
        // test to make sure carry shows red only when cancelling 10 to make 9
        // fixit
        if( coBx.length > 0 && borFrmValue === 0 ) {
            coBx[0].style.color = "red";
        }
        errBx.innerHTML = "";
        errBx.innerHTML = "not " + ans;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
function promptDivBorrow( col, sbx ) {
    //document.getElementById('statusBox0').innerHTML = "col = " + col + " sbx = " + sbx;
    var borFrmBxs;
    var whatBorFrm;
    var borFrmValue;
    var borFrmBx;
    if( sbx == 0 ) {
        borFrmBxs = document.getElementsByName("dvddigs");
        whatBorFrm = borFrmBxs.length - 1 - col;
        borFrmBx = borFrmBxs[whatBorFrm];
        borFrmValue = Number(borFrmBx.childNodes[0].nodeValue); // read fixed node value
    } else {
        var ddx = sbx - 1;
        borFrmBxs = document.getElementsByName("op" + ddx + "_1");
        var bdBxs = document.getElementsByName("bd" + ddx);
        if( col < bdBxs.length ) {
            whatBorFrm = bdBxs.length - 1 - col;
            borFrmBx = bdBxs[whatBorFrm];
        } else {
            whatBorFrm = borFrmBxs.length + bdBxs.length - 1 - col;
            borFrmBx = borFrmBxs[whatBorFrm];
        }
        borFrmValue = Number(borFrmBx.value); // read from input
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

    //make sure it's really a column that should be borrowed from 
    // or do nothing
    if( newBx && document.getElementsByName('showhelp')[0].checked ) { 
    
        if( borFrmValue === 0 ) {
            // if 0 then cross off the carry in as well
            // if it's 0 & no carry in, there is nothing to borrow so do nothing
            if( coBx.length > 0 && Number(coBx[0].value) === 1 ) {
                borFrmBx.style.setProperty("text-decoration", "line-through");
                coBx[0].style.textDecoration = "line-through";
                newBx.focus();
                newBx.style.backgroundColor = "white";
                newBx.style.color = "red";
                newBx.style.border = "1px solid black";
                newBx.value="";
            }
        } else {
            borFrmBx.style.setProperty("text-decoration", "line-through");
            newBx.focus();
            newBx.style.backgroundColor = "white";
            newBx.style.color = "red";
            newBx.style.borFrmder = "1px solid black";
            newBx.value="";
        }
        
        var nCols = document.getElementsByName('dvddigs');
        var mtBoxes = 0;
        //alert("nCols.length = " + nCols.length);
        for( var idx = 0; idx < nCols.length; idx++ ) {
            var quotDigs = Number(document.getElementById('quotDigs').value);
            //alert("quotDigs = " + quotDigs);
            //for( var jdx = 0; jdx < quotDigs; jdx++ ) {
                //var whatBorrow = "bo" + idx + "_" + jdx;
                var whatBorrow = "bo" + idx + "_" + sbx;
                //alert("checking if whatBorrow " + whatBorrow + " is empty");
                newBx = document.getElementsByName( whatBorrow )[0];
                if( newBx ) {
                    if( newBx.value === "" ) {
                        mtBoxes += 1;
                    }
                }
            //}
        }
        if( mtBoxes < 2 ) { // one empty box is allowed because it's above the
                            // digit that you just clicked on
            var displayBorrow = document.getElementById('dispBo');
            displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
        }
    }
}
   
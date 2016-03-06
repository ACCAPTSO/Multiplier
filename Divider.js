/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function showQuotDigs( col ) {
    var quotDigs = Number(document.getElementById("quotDigs").value);
    var lastcol =  quotDigs - 1;
    if( col === lastcol ) {
        for( var i = 0; i < quotDigs; i++ ) {
            document.getElementById("qt" + i ).type = "text";
        }
        var errBx = document.getElementById("msg");
        errBx.innerHTML = "";
        setFocus();
    } else {
        upDateErrCount();
    }
}
function checkMcarry( col, sbx ){
    var ansBx = document.getElementsByName("cm" + col + "_" + sbx)[0];
    var prevBx;
    if( col > 0 ){
        var prevCol = col - 1;
        prevBx = document.getElementsByName("cm" + prevCol + "_" + sbx)[0];
    }
    var ans = ansBx.value;
    var errBx = document.getElementById("msg");
    var mcarry = 0;
    var quotDigs = Number(document.getElementById("quotDigs").value);

    var qdigit = new Array();
    var possBx = new Array();
    // find the quotient digits that will generate carries
    for( var i = quotDigs-1, j = 0; i >= 0; i--, j++ ) {
        possBx[j] = document.getElementById("qt" + i);
        qdigit[j] = Number(possBx[j].value);
    }

    var dvsrdigs = document.getElementsByName("dvsrdigs");
    for( var i = 0; i <= col; i++ ){
        var whatdvsrDig = dvsrdigs.length-1-i;
        var dvsrDig = dvsrdigs[whatdvsrDig].childNodes[0].nodeValue;
        mcarry += Number(dvsrDig)*qdigit[sbx];
        mcarry = Math.floor(mcarry/10);
    }
    if( ans == mcarry ){
        ansBx.style.color = "black";
        dvsrdigs[dvsrdigs.length-1-col].style.color = "black";
        if( prevBx ){
            prevBx.style.color = "black";
        }
        possBx[sbx].style.color = "black";
        errBx.innerHTML = "";
        //var x = 0;
        var nextbox = document.getElementsByClassName("c2").length;
        // skip quotient boxes
        nextbox += quotDigs;
        //document.getElementById("statusBox" + x).innerHTML = "skip mcarry and quotient boxes nextbox = " + nextbox;
        //x = x + 1;
        // skip borrow and carry boxes for original dividend
        nextbox += 2*(document.getElementsByName("dvddigs").length - quotDigs);
        //document.getElementById("statusBox" + x).innerHTML = "skip orig dividend borrow and carry boxes nextbox = " + nextbox;
        //x = x + 1;
        // needs every row of operands, borrows and carries
        var whatRow = Number(document.getElementById('rowNo').value);
        for( var i = 0; i < whatRow; i++ ) {
            var cid = document.getElementsByName("op" + i + "_0").length;
            nextbox += cid; // product digit boxes
            //document.getElementById("statusBox" + x).innerHTML = "skip row " + i + " prod nextbox = " + nextbox;
            //x = x + 1;
            var nexti = i + 1;
            nextbox += document.getElementsByName("boca" + nexti).length; // borrows and carries
            //document.getElementById("statusBox" + x).innerHTML = "skip row " + nexti + " borrows and carries nextbox = " + nextbox;
            //x = x + 1;
            cid = document.getElementsByName("op" + i + "_1").length;
            cid += document.getElementsByName("bd" + i).length;
            nextbox += cid; // dividend boxes
            //document.getElementById("statusBox" + x).innerHTML = "skip row " + i + " dividend nextbox = " + nextbox;
            //x = x + 1;
        } 
        nextbox += document.getElementsByName("op" + i + "_0").length;
        //document.getElementById("statusBox" + x).innerHTML = "skip row " + i + " prod nextbox = " + nextbox;
        //x = x + 1;
        nextbox -= col + 2;
        //document.getElementById("statusBox" + x).innerHTML = "back off prod digits already done nextbox = " + nextbox;
        //x = x + 1;
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;

        //alert("final nextbox = " + nextbox);
        document.getElementById("whatbox").value = nextbox;
        //incrementbox();
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

function divide( immFeedBkCk, col, qtDig ) { 
    for( var j = 0; j < 18; j++ ) {
        document.getElementById("statusBox" + j).innerHTML = "";
    }
    if( col === 0 ) {
        document.getElementById("noMorQuotDigs").value = "true";
    }
    var whatRow = Number(document.getElementById("rowNo").value);
    var prevRow = whatRow - 1;
    var errBx = document.getElementById("msg");
    errBx.innerHTML = "";
    var divisor = Number(document.getElementById("divisor").value);
    var ansBx = document.getElementById("qt" + col);
    var ans = Number(ansBx.value);

    // calculate and store the product  and of this quotient digit and divisor
    // as well as the max digit of that product
    var prod = 0;
    var dvsrdigs = document.getElementsByName("dvsrdigs");
    for( var i = 0; i < dvsrdigs.length; ++i ) {
       dvsrdigs[i].style.color = "black";
    }
    var quotDigs = Number(document.getElementById("quotDigs").value);
    document.getElementById("nextQuotBox").value = 
        document.getElementsByClassName("c2").length + quotDigs - col;
    var mcarry = 0;
    var i = 0;
    var carryRow = quotDigs - 1 - col;
    for( ; i < dvsrdigs.length; i++ ) {
        var dbx = dvsrdigs.length - 1 - i;
        var addProd = Number(dvsrdigs[dbx].childNodes[0].nodeValue)*ans + mcarry;
        mcarry = Math.floor(addProd/10);
        var mDig = addProd % 10;
        if( dbx > 0 ) {
            var whatMcarry = "hcm" + i + "_" + carryRow;
            //alert("whatMcarry = " + whatMcarry);
            document.getElementById(whatMcarry).value = mcarry;
        }
        prod += Math.pow(10, i)*mDig;
        //alert("i = " + i + " prodBxs[" + pbx + "] = " + prodBxs[pbx].value + " prod = " + prod );
    }
    prod += Math.pow(10, i)*mcarry;
    var prodMxIdx = prod > 0? Math.floor(Math.log10(prod)) : 1;
    document.getElementById("calcDig" + whatRow + "_0").value = prodMxIdx;
    document.getElementById("operand" + whatRow + "_0").value = prod;
    
    var x = 0;
    var dvdnd = 0;
    var dvdBxs = document.getElementsByName("dvddigs");
    for( var i = 0; i < dvdBxs.length; ++i ) {
        dvdBxs[i].style.color = "black";
    }
    var restAreZero = true;
    // this may not work in some cases where user has entered wrong qdigit fixit
    var quotient = Number(document.getElementById("quotient").value);
    //alert("quotDigs = " + quotDigs + " col = " + col);
    for( var i = 0; i < col; i++ ) {
        var ten2i = Math.pow(10,i);
        var discard = quotient % ten2i;
        var qdigI = (quotient % Math.pow(10, i+1) - discard)/ten2i;
        //document.getElementById("statusBox" + x).innerHTML = "qDig[" + i + "] = " + qdigI;
        //x = x + 1;
        if( qdigI !== 0 ){
            restAreZero = false;
        }
    }
    
    var pow = 0;
    var dvdDigVal = 0;
    var prodDigVal = 0;
    var discard = 0;
    var mainpart = 0;
    var caCol = 0;
    var whatCarry = "";
    var caBx = null;
    var borCol = 0;
    var whatBorBx = "";
    var borBx = null;

    var carries = new Array();
    var borrows = new Array();
    if( whatRow === 0 ) {
        var i = dvdBxs.length - quotDigs;
        //document.getElementById("statusBox" + x).innerHTML = "dvdBxs.length = " + dvdBxs.length + " quotDigs = " + quotDigs;
        //x = x + 1;
        while( i >= 0 ) {
            dvdDigVal = Number(dvdBxs[i].childNodes[0].nodeValue);
            var ten2pow = Math.pow( 10, pow);
            dvdnd += ten2pow*dvdDigVal;
            //document.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", i = " + i + ", dvdnd = " + dvdnd;
            //x = x + 1;
            // if there was a borrow, decrement dvdDigVal
            if( pow > 0 ) {
                caCol = pow + quotDigs - 2;
                whatCarry = "hca" + caCol + "_" + whatRow;
                //document.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1;
                caBx = document.getElementById( whatCarry );
                borCol = caCol + 1;
                whatBorBx = "hbo" + borCol + "_" + whatRow;
                borBx = document.getElementById(whatBorBx);
                if( borBx && caBx ) {
                    if( Number(caBx.value) === 1 ) {
                        --dvdDigVal;
                        // store the new borrowed value
                        borBx.value = dvdDigVal;
                        //document.getElementById("statusBox" + x).innerHTML = "storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        borBx.value = "-2";
                    }
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Math.pow( 10, pow+1);
            prodDigVal = (mainpart - discard)/ten2pow;
            //document.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + " dvdDigVal = " + dvdDigVal + " prodDigVal = " + prodDigVal;
            //x = x + 1;
            caCol = pow + quotDigs - 1;
            whatCarry = "hca" + caCol + "_" + whatRow;
            caBx = document.getElementById( whatCarry );
            if( caBx ) {
                if( dvdDigVal < prodDigVal ) { // this digit has a carry
                    caBx.value = 1;
                    //document.getElementById("statusBox" + x).innerHTML = "storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    caBx.value = 0;
                }
            }
            --i;
            ++pow;
        }  
    } else {
        var whatDvdBxs = "op" + prevRow + "_1";
        dvdBxs = document.getElementsByName(whatDvdBxs);
        for( var i = 0; i < dvdBxs.length; ++i ) {
            dvdBxs[i].style.color = "black";
        }
        var bdBxs = document.getElementsByName("bd" + prevRow);
        for( var i = 0; i < bdBxs.length; ++i ) {
            bdBxs[i].style.color = "black";
        }
        var whatCalcDig = "calcDig" + prevRow + "_1";
        var calcDig = Number(document.getElementById(whatCalcDig).value);
        var whatBringDown = "bringdown" + prevRow;
        var bringdown = Number(document.getElementById(whatBringDown).value);
        
        //var maxp = 1 + dvdBxs.length + bringdown;
        var maxp = dvdBxs.length + bringdown;
        //document.getElementById("statusBox" + x).innerHTML = "whatDvdBxs = " + whatDvdBxs + " dvdBxs.length = " + dvdBxs.length + " whatRow = " + whatRow + ", pow = " + pow + " maxp = "  + maxp + " calcDig = " + calcDig + " bringdown = " + bringdown + " whatCalcDig = " + whatCalcDig + " whatBringDown = " + whatBringDown;
        //x = x + 1;
        while( pow < maxp ) {
            if( pow < bringdown ) {
                dvdDigVal = Number(bdBxs[bringdown - 1 - pow].value);
                //document.getElementById("statusBox" + x).innerHTML = "pow = " + pow + "bringdown = " + bringdown + " dvdDigVal = " + dvdDigVal;
                //x = x + 1;
            } else {
                var dvdidx = maxp-1-pow;
                var whatDvdBx = dvdBxs[dvdidx];
                //document.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " dvdidx = " + dvdidx + " whatDvdBx = " + whatDvdBx;
                //x = x + 1;
                if( whatDvdBx != null ) {
                    dvdDigVal = Number(whatDvdBx.value);
                }
            }
        
            var ten2pow = Math.pow( 10, pow);
            dvdnd += ten2pow*dvdDigVal;
            //document.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " dvdDigVal = " + dvdDigVal + " dividend = " + dvdnd;
            //x = x + 1;
            // if there was a borrow, decrement dvdDigVal
            if( pow > 0 ) {
                caCol = pow + document.getElementsByName('boca' + whatRow).length/2 - dvdBxs.length - bringdown;
                whatCarry = "hca" + caCol + "_" + whatRow;
                caBx = document.getElementById( whatCarry );
                //document.getElementById("statusBox" + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1
                borCol = caCol + 1;
                whatBorBx = "hbo" + borCol + "_" + whatRow;
                borBx = document.getElementById(whatBorBx);
                if( borBx && caBx ) {
                    if( Number(caBx.value) === 1 ) {
                        --dvdDigVal;
                        // store the new borrowed value
                        borBx.value = dvdDigVal;
                        //document.getElementById("statusBox" + x).innerHTML = " pow = " + pow + " storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        borBx.value = "-2";
                    }
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Math.pow( 10, pow+1);
            prodDigVal = (mainpart - discard)/ten2pow;
            caCol = pow + 1;
            //document.getElementById("statusBox" + x).innerHTML = " pow = " + pow + " caCol = " + caCol;
            //x = x + 1;
            caCol += document.getElementsByName("boca" + whatRow).length/2;
            //document.getElementById("statusBox" + x).innerHTML = "plus boca length/2 caCol = " + caCol;
            //x = x + 1;
            caCol -= dvdBxs.length;
            //document.getElementById("statusBox" + x).innerHTML = "minus DvdBxs.length caCol = " + caCol;
            //x = x + 1;
            caCol -= bringdown;
            //document.getElementById("statusBox" + x).innerHTML = "minus bringdown caCol = " + caCol;
            //x = x + 1;
            whatCarry = "hca" + caCol + "_" + whatRow;
            caBx = document.getElementById( whatCarry );
            if( caBx ) {               
                if( dvdDigVal < prodDigVal ) {// this digit has a carry
                    caBx.value = 1;
                    //document.getElementById("statusBox" + x).innerHTML = "pow = " + pow + " storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    caBx.value = 0;
                }           
            }
            ++pow;
        }
    }
    if( dvdnd < divisor && ans !== 0 ) {
        errBx.innerHTML = divisor + " does not go into " + dvdnd;
        upDateErrCount();
        setFocus();
        return;
    } else if( dvdnd >= divisor && ans === 0 ) {
        errBx.innerHTML = divisor + " goes into " + dvdnd + " at least once";
        upDateErrCount();
        setFocus();
        return;
    }

    var diff = dvdnd - prod;
    var diffMxIdx = diff > 0? Math.floor(Math.log10(diff)) : 0;
    document.getElementById("calcDig" + whatRow + "_1").value = diffMxIdx;
    document.getElementById("operand" + whatRow + "_1").value = diff;
    
    var origDvdDigs = document.getElementsByName("dvddigs");
    var bddigs = null;
    if( whatRow == 0 ) {
        dvddigs = origDvdDigs;
    } else {
        prevRow = whatRow - 1;
        dvddigs = document.getElementsByName("op" + prevRow + '_1');
        bddigs = document.getElementsByName("bd" + prevRow);
    }
    var stop = dvddigs.length;
    if( whatRow == 0 ){
        stop = stop + 1 - quotDigs;
    }
    var time2increment = true;
    if( immFeedBkCk ) {       
        var dvddigs;
        var prevRow = null;
        if( whatRow > 0 ) {
            var prevRow = whatRow - 1;
        }
        if( ans === qtDig ) {
            //alert("correct answer is " + ans );
            ansBx.style.color = "black";
            // turn divisor and either dividend or most recent difference black
            for( var i = 0; i < dvddigs.length; i++ ){
                    dvddigs[i].style.color = "black";
            }
            if( bddigs ){
                for( var i = 0; i < bddigs.length; i++ ){
                    bddigs[i].style.color = "black";
                    //alert("bddigs[" + i + "].type = " + bddigs[i].type);
                    if( bddigs[i].type === "hidden") {
                        //alert("bddigs[" + i + "].type = " + bddigs[i].type + " now I'm going to break");
                        break;
                    }
                }
            }
            for( var i = 0; i < dvsrdigs.length; i++ ){
                    dvsrdigs[i].style.color = "black";
            }
            //errBx.innerHTML = "";
            // need to take 0.87 into account fixit
            //if( ans !== 0 ){ // make next row of multiplication boxes visible
            //    var name = 'op' + whatRow + '_0';
            //    var visibleMrow = document.getElementsByName(name);
            //    for( var i = 0; i < visibleMrow.length; i++ ) {
            //        visibleMrow[i].type = "text";
            //    }
            //}
        } else {
            // make divisor and either dividend or most recent difference red
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
            time2increment = false;
        }
        
    }
    if( time2increment ) {
        var nextbox;
        // need to take 0.87 into account fixit
        if( ans === 0 ) {  // you will need to bring down more digits
                         // before you can start another row  
            // make next bringdown box visible
            for( var i = 0; i < bddigs.length; i++ ) {
                if( bddigs[i].type === "hidden") {
                    bddigs[i].type = "text";
                    break;
                }
            }
            // skip multiplicative carries
            nextbox = document.getElementsByClassName("c2").length;
            //alert("skip mcarries nextbox = " + nextbox);
            //document.getElementById("statusBox" + x).innerHTML = "in divide restAreZero = " + restAreZero + " col = " + col;
            //x = x + 1;
            if( restAreZero ) {
                if( ans === 0 ) {
                    ansBx.style.color = "black";
                }
                if( col > 0 ) {
                    nextbox += quotDigs - col;
                } else {
                    return;
                }
            } else {
                nextbox = Number(document.getElementById("lastBoxOfCurrRow").value);
                //document.getElementById("statusBox" + x).innerHTML = "last Box Of Current row nextbox = " + nextbox;
                //x = x + 1;
                if( nextbox === 0 ) {
                    // skip multiplicative carries
                    nextbox = document.getElementsByClassName('c2').length - 1;
                    // skip quotient boxes
                    nextbox += quotDigs;
                    //document.getElementById("statusBox" + x).innerHTML = "skip quotdigs and mcarries nextbox = " + nextbox;
                    //x = x + 1;
                    // skip borrow and carry boxes for original dividend
                    nextbox += 2*(origDvdDigs.length - quotDigs);
                    //document.getElementById("statusBox" + x).innerHTML =  "skip borrows and carries nextbox = " + nextbox;
                    //x = x + 1;                
                }
                nextbox += 1;
                //document.getElementById("statusBox" + x).innerHTML = "ans = 0, restAreZero = false or col = 0, nextbox = " + nextbox;
                //x = x + 1;
            }
        } else { // start multiplying
            // clear out any previous guesses
            var name = 'op' + whatRow + '_0';
            var visibleMrow = document.getElementsByName(name);
            for( var i = 0; i < visibleMrow.length; i++ ) {
                visibleMrow[i].value = "";
            }
            name = 'op' + whatRow + '_1';
            var Drow = document.getElementsByName(name);
            for( var i = 0; i < Drow.length; i++ ) {
                Drow[i].value = "";
            }
            name = 'boca' + whatRow;
            var BoCaRow = document.getElementsByName(name);
            for( var i = 0; i < BoCaRow.length; i++ ) {
                BoCaRow[i].value = "";
                BoCaRow[i].style.removeProperty("text-decoration");
            }
            if( whatRow === 0 ) {
                var prevDrow = document.getElementsByName("dvddigs");
                for( var i = 0; i < prevDrow.length; i++ ) {
                    prevDrow[i].style.removeProperty("text-decoration");
                }
            } else {
                name = 'op' + prevRow + '_1';
                var prevDrow = document.getElementsByName(name);
                for( var i = 0; i < prevDrow.length; i++ ) {
                    prevDrow[i].style.removeProperty("text-decoration");
                }
            }
            var allcarries = document.getElementsByClassName("c2");
            for( var i = 0; i < allcarries.length; ++i ) {
                if( Number(allcarries[i].name.substring(4,5)) === carryRow &&
                        allcarries[i].name.substring(0,2) === "cm" ) {
                    allcarries[i].value = "";
                }
            }
            nextbox = Number(document.getElementById("lastBoxOfCurrRow").value);
            //document.getElementById("statusBox" + x).innerHTML = "ans != 0, lastBoxOfCurrentRow, nextbox = " + nextbox + " whatvisibleMrow = " + name + " visibleMrow.length = " + visibleMrow.length;
            //x = x + 1;
            if( nextbox === 0 ) {
                // skip multiplicative carries
                nextbox = document.getElementsByClassName("c2").length - 1;
                // skip quotient boxes
                nextbox += quotDigs;
                //document.getElementById("statusBox" + x).innerHTML = "skip quotdigs and mcarries nextbox = " + nextbox;
                //x = x + 1;
                // skip borrow and carry boxes for original dividend
                //nextbox += 2*(origDvdDigs.length - quotDigs);
                nextbox += document.getElementsByName("boca" + whatRow).length;
                //document.getElementById("statusBox" + x).innerHTML = "skip qd, mc and borrows and carries nextbox = " + nextbox;
                //x = x + 1;
            } else {
                while( document.getElementById("th-id2").elements[nextbox].name.substring(0,2) === 'bd' ) {
                    nextbox += 1;
                    //document.getElementById("statusBox" + x).innerHTML = "bringdown box nextbox = " + nextbox;
                    //x = x + 1;
                }
                nextbox -= 1;
            }
            // skip current product
            //nextbox += prodMxIdx + 1;
            nextbox += visibleMrow.length;
            //document.getElementById("statusBox" + x).innerHTML = "skip current prod nextbox = " + nextbox;
            //x = x + 1;

            document.getElementById("lastBoxOfCurrRow").value = nextbox;
            //document.getElementById("statusBox" + x).innerHTML = "ans != 0, nextbox = " + nextbox;
            //x = x + 1;
        }
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;

        //document.getElementById("statusBox" + x).innerHTML = "final nextbox = " + nextbox;
        document.getElementById("whatbox").value = nextbox;
    }

    //alert("done with divide");
    setFocus();
}

function multiply( col ) { // may want to pass sbx instead of reading whatRow after all fixit
    for( var j = 0; j < 18; j++ ) {
        document.getElementById("statusBox" + j).innerHTML = "";
    }
    var x = 0;
    var whatRow = Number(document.getElementById("rowNo").value);
    var ansBxs = document.getElementsByName("op" + whatRow + "_0");
    var bxNo = ansBxs.length - 1 - col;
    //document.getElementById("statusBox" + x).innerHTML = "in multiply, bxNo = " + bxNo;
    //x = x + 1;
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var quotDigs = Number(document.getElementById("quotDigs").value);
    var dec = whatRow;
    var nextRow = whatRow + 1;
    //var nextbox = null;
    //document.getElementById("statusBox" + x).innerHTML = "in multiply whatRow = " + whatRow;
    //x = x + 1;
    for( var prevrow = whatRow - 1; prevrow >= 0; prevrow-- ) {
        var whatBringDowns = "bringdown" + prevrow;
        var bringDowns = Number(document.getElementById(whatBringDowns).value);
        //document.getElementById("statusBox" + x).innerHTML = "prevrow = " + prevrow + " whatBringDowns = " + whatBringDowns + " bringDowns = " + bringDowns;
        //x = x + 1;
        if( bringDowns > 0 ) {
            dec += bringDowns - 1;
            //document.getElementById("statusBox" + x).innerHTML = "prevrow = " + prevrow + " bringDowns = " + bringDowns + " dec = " + dec;
            //x = x + 1;
        }
    }
    var qdx = quotDigs - 1 - dec; // not neccessarily whatRow if there was more than 1 bringdowns
    var qBx = document.getElementById("qt" + qdx);
    //var qtDig = Number(qBx.value);
    var dvsrdigs = document.getElementsByName("dvsrdigs");
    var whatDig = dvsrdigs.length - 1 - col;
    if( whatDig < 0 ) { // should this ever happen? fixit
        whatDig = 0;
    }

    var prod = Number(document.getElementById("operand" + whatRow + "_0").value);
    var ten2col = Math.pow(10, col);
    var discard = prod % ten2col;
    var mainpart = prod % Math.pow(10,col+1);

    //document.getElementById("statusBox2").innerHTML = "prod = " + prod + " mainpart = " + mainpart + " discard = " + discard;
    var expAns = (mainpart - discard)/ten2col;

    var prevcaBx = null;
    var cmx = 0;
    var startquot = quotDigs - 1;
    
    for( var i = startquot; i > qdx; i-- ) {
            cmx = cmx + 1;
    }
    
    var showMcarriesChkd = document.getElementsByName("showmcarries")[0].checked;
    var isLastMult = (col === Number(document.getElementById("calcDig" + whatRow + "_0").value));
    //document.getElementById('statusBox2').innerHTML = "col = " + col + " whatRow = " + whatRow + " isLastMult = " + isLastMult;
    if( isLastMult && col > 1 ) {
        //if( col > 1 ) {
            var prevCol = dvsrdigs.length - 2;
            var whatBx = "hcm" + prevCol + "_" + cmx;
            if( showMcarriesChkd ) {
                whatBx = "cm" + prevCol + "_" + cmx;
                prevcaBx = document.getElementsByName(whatBx)[0]; // fixit
            } else {
                prevcaBx = document.getElementById(whatBx);
            }
            //document.getElementById("statusBox" + x).innerHTML = "prevCaBx = " + whatBx;
            //x = x + 1;
        //}
    } else if( col > 0 ){
        var prevCol = col - 1;
        var whatBx = "hcm" + prevCol + "_" + cmx;     
        if( showMcarriesChkd ) {
            whatBx = "cm" + prevCol + "_" + cmx;
            prevcaBx = document.getElementsByName(whatBx)[0];
        } else {
            prevcaBx = document.getElementById(whatBx);
        }
        

        //document.getElementById("statusBox" + x).innerHTML = "showMcarriesChkd = " + showMcarriesChkd + " whatBx = " + whatBx + " prevCaBx = " + prevcaBx;
        //x = x + 1;
    }
    if( ans === expAns ) {
        if( prevcaBx ) {
            if( showMcarriesChkd ) {
                prevcaBx.style.color = "black";
            } else {
                prevcaBx.type = "hidden";
            }
        }
        for( var i = quotDigs - 1; i >= qdx; --i ) {    
            document.getElementById("qt" + i).style.color = "black";
        }
        //qBx.style.color = "black";
        dvsrdigs[whatDig].style.color = "black";
        ansBxs[bxNo].style.color = "black";
        errBx.innerHTML = "";
        var whatBox = Number(document.getElementById("whatbox").value);
        var nextBox = null;
        if( isLastMult ) {
            // check if user guessed too big
            var dividend = 0;
            var dvdcol = quotDigs - 1;
            if( whatRow == 0 ) {
                dividend = Number(document.getElementById("dividend").value);
                var discard = dividend % Math.pow(10, dvdcol);
                dividend = (dividend - discard)/Math.pow(10, dvdcol);
                //document.getElementById("statusBox" + x).innerHTML = "lastMult, whatRow = " + whatRow + " dividend = " + dividend + " prod = " + prod;
                //x = x + 1;
            } else {
                prevRow = whatRow - 1;
                var dvdBxs = document.getElementById("operand" + prevRow + "_1");
                dividend = Number(dvdBxs.value);
                //document.getElementById("statusBox" + x).innerHTML = "lastMult, whatRow = " + whatRow + " dividend = " + dividend + " prod = " + prod;
                //x = x + 1;
            }
            document.getElementById("currDividend").value = dividend;
            if( prod > dividend ){
                var lastqtval = prod/Number(document.getElementById("divisor").value);
                errBx.innerHTML = prod + " is too big, try a quotient digit value smaller than " + lastqtval;
                document.getElementById("whatbox").value = Number(document.getElementById("nextQuotBox").value) - 1;
                document.getElementById("bdx").value = document.getElementById("quotBoxIndex").value;
                if( whatRow == 0 ) {
                    document.getElementById("lastBoxOfCurrRow").value = 0;
                } else { // back up to just after last subtraction box
                    var lastBox = document.getElementById("lastBoxOfCurrRow").value;
                    lastBox -= ansBxs.length;
                    while( document.getElementById("th-id2").elements[lastBox].name.substring(0,2) === 'bd' ) {
                        lastBox -= 1;
                    }
                    document.getElementById("lastBoxOfCurrRow").value = lastBox + 1;
                }
                for( var i = 0; i < ansBxs.length; ++i ) {
                    ansBxs[i].style.color = "red";
                }
                for( var i = 0; i < dvsrdigs.length; ++i ) {
                    dvsrdigs[i].style.color = "red";
                }
                setFocus();
                return;
            }
            
            var visibleDrows = document.getElementsByName("op" + whatRow + '_1');
            var name = "cspan" + whatRow;
            var visibleBar = document.getElementById(name);
            if( visibleBar ) {
                visibleBar.className="th-id3";
            }
            var visibleMinus = document.getElementById("minus" + whatRow);
            if( visibleMinus ) {
                visibleMinus.className="t1";
            }
            var showBrowsChkd = 
                    document.getElementsByName("showborrows")[0].checked;
            if( showBrowsChkd ) {
                var whatBorCaBxs = 'boca' + whatRow;
                var visibleBorCaBxs = document.getElementsByName( whatBorCaBxs );
                var isCarry = false;
                for( var i = 0; i < visibleBorCaBxs.length; ++i ) {
                    var hiddenCaBx = null;
                    hiddenCaBx = document.getElementById( "hca" + i + "_" + whatRow );
                    if( hiddenCaBx && Number(hiddenCaBx.value) !== 0 ) {
                        isCarry = true;
                    }
                }
                var origColor = "";
                if( isCarry ) {
                    document.getElementById("dispBo").style.color = "#600301";
                    origColor = getComputedStyle(visibleBorCaBxs[0].parentNode).backgroundColor;
                }
                for( var j = 0; j <  visibleBorCaBxs.length; j++ ) {
                    visibleBorCaBxs[j].type = "text";
                    visibleBorCaBxs[j].style.height = "1.7em";
                    //visibleBorCaBxs[0].style.backgroundColor = origColor;
                }
            }
            nextBox = Number(document.getElementById("lastBoxOfCurrRow").value);
            //document.getElementById('statusBox0').innerHTML = "with product boxes, nextBox = " + nextBox;
            if( visibleDrows.length > 1 ) {
                nextBox += document.getElementsByName("boca" + nextRow ).length; // borrow, carry
                //document.getElementById("statusBox1").innerHTML = "with borrow and carry boxes, nextBox = " + nextBox;
                nextBox += visibleDrows.length; // dividend boxes
            } else {
                nextBox += 1;
            }
            whatRow = nextRow;
            document.getElementById("rowNo").value = whatRow;
            document.getElementById("lastBoxOfCurrRow").value = nextBox;
        } else {
            var whatBox = Number(document.getElementById("whatbox").value);
            nextBox = whatBox;
            //document.getElementById("statusBox" + x).innerHTML = "in multiply col = " + col + " dvsrdigs.length = " + dvsrdigs.length;
            //x = x + 1;
            if( col < dvsrdigs.length - 1) {
                var whatCm = "hcm" + col + "_" + dec;
                //document.getElementById("statusBox" + x).innerHTML = "in multiply whatCm = " + whatCm ;
                //x = x + 1;
                //var hasCarry = Number(document.getElementById(whatCm).value) > 0;
                if( showMcarriesChkd &&
                        Number(document.getElementById(whatCm).value) > 0 ) {
                    var allCmBoxes = document.getElementsByClassName("c2");
                    nextBox = allCmBoxes.length - 1 - 2*dec*(dvsrdigs.length - 1) - 2*col - 1;
                } else {
                    nextBox -= 1;
                }
            } else {
                 nextBox -= 1;
            }
        }
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
        document.getElementById("whatbox").value = nextBox;
        //incrementbox();
    } else { 
        //errBx.innerHTML = expAns + " not " + ans;
        errBx.innerHTML = "not " + ans;
        qBx.style.color = "red";
        dvsrdigs[whatDig].style.color = "red";
        if( prevcaBx ){
            prevcaBx.type = "text";
            prevcaBx.style.color = "red";
        }
        upDateErrCount();
    }
    setFocus();
}

function subtract( col, sbx ) {
    for( var j = 0; j < 18; j++ ) {
        document.getElementById("statusBox" + j).innerHTML = "";
    }
    var x = 0;
    var nextbox = null;
    var ansBxs = document.getElementsByName("op" + sbx + "_1");
    var bxNo = ansBxs.length - 1 - col;
    //document.getElementById("statusBox" + x ).innerHTML = "col = " + col + " ansBxs = " + ansBxs + " length = " + ansBxs.length + " bxNo = " + bxNo;
    //x = x + 1;
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var whatprodboxes = "op" + sbx + "_0";
    var prodBxs = document.getElementsByName(whatprodboxes);
    //var prod = Number(document.getElementById("operand" + sbx + "_0").value);
    var subBxs;
    var pbx;
    var dvdidx = 0;
    var prodidx = prodBxs.length - 1 - col;
    var prodBx = prodBxs[prodidx];
    var dvdBx;
    //var dvdVal = 0;
    var borCol = col;
    var prevRow = 0;

    if( sbx == 0 ) {
        borCol = borCol + Number(document.getElementById("quotDigs").value) - 1;
        subBxs = document.getElementsByName("dvddigs");
        dvdidx = subBxs.length -  Number(document.getElementById("quotDigs").value) - col;
        dvdBx = subBxs[dvdidx];
        //dvdVal = Number(dvdBx.childNodes[0].nodeValue);
        //document.getElementById("statusBox" + x).innerHTML = "whatprodboxes = " + whatprodboxes + " prodidx = " + prodidx + " dvddigs idx = " + dvdidx;
        //x = x + 1
    } else {
        prevRow = sbx - 1;
        var whatboca = 'boca' + sbx;
        var bocalength = document.getElementsByName(whatboca).length;
        subBxs = document.getElementsByName("op" + prevRow + "_1");
        var bdBxs = document.getElementsByName("bd" + prevRow );
        //document.getElementById("statusBox" + x).innerHTML = "col = " + col +   " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol + bocalength/2;
        //document.getElementById("statusBox" + x).innerHTML = "whatboca = " + whatboca + " bocalength/2 =  " + (bocalength/2)  + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol - subBxs.length;
        //document.getElementById("statusBox" + x).innerHTML = "subBxs.length = " + subBxs.length + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol - Number(document.getElementById("bringdown" + prevRow).value);
        //document.getElementById("statusBox" + x).innerHTML = "bdBxs.length = " + Number(document.getElementById("bringdown" + prevRow).value) + " borCol = " + borCol;
        //x = x + 1;
        borCol = borCol + 1; 
        //document.getElementById("statusBox" + x).innerHTML = "plus 1 borCol = " + borCol;
        //x = x + 1;
       
        var inc = Number(document.getElementById("bringdown" + prevRow ).value) - 1;      
        dvdidx = inc - col;
        //document.getElementById("statusBox" + x).innerHTML = " inc = " + inc + " col = " + col + " dididx = " + dvdidx;
        //x = x + 1;
        if( col > inc ){
            var calcDig = Number(document.getElementById("calcDig" + prevRow + "_1").value) + 1;
            dvdidx = dvdidx + subBxs.length;
            //document.getElementById('statusBox2').innerHTML = "inc = " + inc + " col = " + col + " calcDig = " + calcDig + " dvdidx = " + dvdidx;
            dvdBx = subBxs[dvdidx];
        } else {         
            dvdBx = bdBxs[dvdidx];
        }
        //document.getElementById('statusBox1').innerHTML = "dvdidx = " + dvdidx;
        //dvdVal = dvdBx.value;
    }
    var diff = Number(document.getElementById("operand" + sbx + "_1").value);
    var whatBorBx = "bo" + borCol + "_" + sbx;
    //document.getElementById('statusBox19').innerHTML = "659 whatBorBx = " + whatBorBx;
    var borBx = null;
    borBx = document.getElementById(whatBorBx);
    var hiddenBorBx = null;
    hiddenBorBx = document.getElementById("hbo" + borCol + "_" + sbx);
    var whatCarry = "ca" + borCol + "_" + sbx;
    var caBx = null;
    caBx = document.getElementById( whatCarry );
    var hiddenCaBx = null;
    hiddenCaBx = document.getElementById( "hca" + borCol + "_" + sbx );
    //document.getElementById("statusBox" + x).innerHTML = "sbx = " + sbx + " col = " + col + " whatBorBx = " + whatBorBx + " whatCarry = " + whatCarry;
    //x = x + 1;

    var ten2col = Math.pow(10, col);
    var discard = diff % ten2col;
    var mainpart = diff % Math.pow(10,col+1);

    var expAns = (mainpart - discard)/ten2col;
    var lastDig = diff > 0 ? Math.floor(Math.log10(diff)) : 0;
    var isLastSub = ( col ===  lastDig );
    //document.getElementById("statusBox" + x).innerHTML = "diff " + diff + " lastDig = " + lastDig + " col = " + col + " isLastSub = " + isLastSub;
    //x = x + 1;
    if( ans === expAns ) {
        ansBxs[bxNo].style.color = "black";
        var whatHelp = document.getElementsByName("showborrows");
        var showBrowsChkd = false;
        for( var i = 0; i < whatHelp.length; i++ ) {
            if( whatHelp[i].checked ) {
                showBrowsChkd = true;
                break;
            }
        }
        if( borBx ) {
            borBx.style.color = "black";
            if( !showBrowsChkd ) {
                borBx.type = "hidden";
                dvdBx.style.removeProperty("text-decoration");
            }
        }

        if( caBx ) {
            caBx.style.color = "black";
            if( !showBrowsChkd ) {
                caBx.type = "hidden";
                dvdBx.style.removeProperty("text-decoration");
            }
        }
        dvdBx.style.color = "black"; 
        prodBx.style.color = "black";
        errBx.innerHTML = "";

        if( isLastSub ) {
            var divisor = Number(document.getElementById("divisor").value);
            var quotDigs = Number(document.getElementById("quotDigs").value);
            var lastqcol = quotDigs-1;
            if( diff >= divisor ) {
                var prod = Number(document.getElementById("operand" + sbx + "_0").value);
                //document.getElementById("statusBox" + x).innerHTML = "prod = " + prod + " divisor = " + divisor;
                //x = x + 1;
                var qtDigVal = prod/divisor;
                var dividend = document.getElementById("currDividend").value;
                errBx.innerHTML = diff + " is too big, " + divisor + " goes into " + dividend + " more than " + qtDigVal + " times";
                                document.getElementById("whatbox").value = Number(document.getElementById("nextQuotBox").value) - 1;
                document.getElementById("bdx").value = document.getElementById("quotBoxIndex").value;
                document.getElementById("rowNo").value = Number(document.getElementById("rowNo").value) - 1;
                var diffdigs = document.getElementsByName("op" + sbx + "_1");
                if( sbx == 0 ) {
                    document.getElementById("lastBoxOfCurrRow").value = 0;     
                } else { // back up to just after last subtraction box
                    var lastBox = document.getElementById("lastBoxOfCurrRow").value;
                    //document.getElementById("statusBox" + x).innerHTML = "in subtract, sbx > 0, lastBox = " + lastBox;
                    //x = x + 1;
                    lastBox -= diffdigs.length;
                    //document.getElementById("statusBox" + x).innerHTML = "back off subtract boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    var nextRow = sbx + 1;
                    lastBox -= document.getElementsByName("boca" + nextRow).length;
                    //document.getElementById("statusBox" + x).innerHTML = "back off borrow and carry boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    lastBox -= document.getElementsByName("op" + sbx + "_0").length;
                    //document.getElementById("statusBox" + x).innerHTML = "back off product boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    while( document.getElementById("th-id2").elements[lastBox].name.substring(0,2) === 'bd' ) {
                        lastBox -= 1;
                    }
                    //document.getElementById("statusBox" + x).innerHTML = "back off bring down boxes, lastBox = " + lastBox;
                    //x = x + 1;
                    document.getElementById("lastBoxOfCurrRow").value = lastBox + 1;
                }
                var dvsrdigs = document.getElementsByName("dvsrdigs");
                for( var i = 0; i < dvsrdigs.length; ++i ) {
                    dvsrdigs[i].style.color = "red";
                }
                for( var i = 0; i < diffdigs.length; ++i ) {
                    diffdigs[i].style.color = "red";
                }   
                var dvddigs = document.getElementsByName("op" + prevRow + "_1");
                var dvdlen = dvddigs.length;
                if( sbx === 0 ) {
                    dvddigs = document.getElementsByName("dvddigs");
                    dvdlen = dvddigs.length - quotDigs + 1;
                }
                for( var i = 0; i < dvdlen; ++i ) {
                    dvddigs[i].style.color = "red";
                }

                var bddigs = document.getElementsByName("bd" + prevRow);
                for( var i = 0; i < bddigs.length; ++i ) {
                    bddigs[i].style.color = "red";
                }
                setFocus();
                return;
            }
            var restAreZero = true;
            // this may not work in some cases where user has entered wrong qdigit fixit
            var quotient = Number(document.getElementById("quotient").value);
            for( var i = lastqcol; i >= 0; i-- ) {
                var quotBx = document.getElementById("qt" + i);
                if( quotBx.value === "" ) {
                    var ten2i = Math.pow(10,i);
                    var discard = quotient % ten2i;
                    var qdigI = (quotient % Math.pow(10, i+1) - discard)/ten2i;
                    //alert("qDig[" + i + "] = " + qdigI);
                    if( qdigI !== 0 ){
                        restAreZero = false;
                    }
                } else {
                    lastqcol = i;
                }
            }
            //document.getElementById("statusBox" + x).innerHTML = "isLastSub restAreZero = " + restAreZero + " lastqcol = " + lastqcol;
            //x = x + 1;
            if( restAreZero ) {
                if( lastqcol === 0 ) {
                    nextbox = Number(document.getElementById("lastBoxOfCurrRow").value) + 1;
                } else {
                    nextbox = document.getElementsByClassName("c2").length + quotDigs - lastqcol;
                }
            } else {
                var displayBorrow = document.getElementById("dispBo");
                displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
                var visibleBrows = document.getElementsByName("bd" + sbx);
                if( visibleBrows.length > 0 ) {
                    visibleBrows[0].type = "text";
                }
                //document.getElementById("statusBox1").innerHTML = "sbx = " + sbx + " visibleBrows = " + visibleBrows;
                nextbox = Number(document.getElementById("lastBoxOfCurrRow").value) + 1;
                //document.getElementById("lastBoxOfCurrRow").value = nextbox;
            }

        } else {
            nextbox = Number(document.getElementById("whatbox").value) - 1;
            //incrementbox();
        }
        //alert("final nextbox = " + nextbox);
        document.getElementById("whatbox").value = nextbox;
        var bdx = Number(document.getElementById("bdx").value) + 1;
        document.getElementById("bdx").value = bdx;
    } else {
        // show borrows  or carries in case of error
        var caValue = 0;
        if( hiddenCaBx !== null ) {
            caValue = Number(hiddenCaBx.value);
            if( caValue === 1 ) {
                caBx.style.height = "1em";
                caBx.type = "text";
                caBx.style.color = "red";
                caBx.value = caValue;
            }
        }
        if( hiddenBorBx !== null && Number(hiddenBorBx.value) >= -1 ) {
            borBx.style.height = "1.7em";
            borBx.type = "text";
            borBx.style.color = "red";
            var borVal = Number(hiddenBorBx.value);
            //document.getElementById("statusBox" + x).innerHTML = "hiddenBorBx.value = " + hiddenBorBx.value; 
            //x = x + 1;
            if( borVal < 0 ) {
                borVal += 10;
                caBx.style.setProperty("text-decoration", "line-through");
                caBx.style.color = "black";
            }
            borBx.value = borVal;
            dvdBx.style.setProperty("text-decoration", "line-through");
        } else {
            dvdBx.style.color = "red";
        }
        //alert("hiddenCaBx.value = " + hiddenCaBx.value + " hiddenBorBx.value = " + hiddenBorBx.value );
        //alert("whatBorCol = " + borCol + " whatBorrow = " + whatBorBx + " whatCarry = " + whatCarry );
        prodBx.style.color = "red";
        //errBx.innerHTML = expAns + " not " + ans;
        errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    //alert("done with subtract");
    setFocus();
}
                            
function bringdown( sbx ) {
    var ansBxs = document.getElementsByName("bd" + sbx );
    var thisRowsBdDigs = document.getElementById("bringdown" + sbx ).value
    var thisRowsBdDigsVal = (thisRowsBdDigs ) ? Number(thisRowsBdDigs) : 0;
    var bxNo = thisRowsBdDigsVal; // + 1; //ansBxs.length - 1 - col
    //document.getElementById("statusBox1").innerHTML =   " thisRowBdDigs = " + thisRowsBdDigs + " bxNo = " + bxNo;
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var dvddigs = document.getElementsByName("dvddigs");
    var dvdcol = Number(document.getElementById("quotDigs").value) - 2;
    for( var idx = 0; idx < sbx; idx++ ) {
        dvdcol -= Number(document.getElementById("bringdown" + idx).value); //document.getElementsByName("bd" + idx ).length;
        //alert("idx = " + idx + " dvdidx = " + dvdidx );
    }
    //var thisRowsBdDigs = Number(document.getElementsByName("bringdown" + sbx ).value);
    dvdcol -= thisRowsBdDigsVal;// - col;
    var whatDig = dvddigs.length - 1 - dvdcol;
    //document.getElementById("statusBox2").innerHTML = " final dvdcol = " + dvdcol + " whatDig = " + whatDig;
    var dividend = Number(document.getElementById("dividend").value);
    var discard = dividend % Math.pow(10, dvdcol);
    var expAns = (dividend % Math.pow(10,dvdcol+1) - discard)/Math.pow(10, dvdcol);
    if( ans == expAns ) {
        ansBxs[bxNo].style.color = "black";
        dvddigs[whatDig].style.color = "black";
        errBx.innerHTML = "";
        var prevDividend = Number(document.getElementById("operand" + sbx + "_1").value);
        document.getElementById("operand" + sbx + "_1").value = 10*prevDividend + ans;
        var newval = thisRowsBdDigsVal + 1;
        //alert("thisRowsBdDigsval = " + thisRowsBdDigsVal + " newval = " + newval);
        document.getElementById("bringdown" + sbx).value = newval;
        document.getElementById("lastBoxOfCurrRow").value = Number(document.getElementById("lastBoxOfCurrRow").value) + 1;
        document.getElementById("whatbox").value = document.getElementById("nextQuotBox").value;
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        document.getElementById("quotBoxIndex").value = bdx;
        //incrementbox();
    } else {
        dvddigs[whatDig].style.color = "red";
        errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}
function checkDivBorrow( col, sbx ) {
    //document.getElementById("statusBox2").innerHTML = "col = " + col + " sbx = " + sbx;
    var errBx = document.getElementById("msg");
    var ciBx = document.getElementById("ca" + col + "_" + sbx);
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
    var coBx = document.getElementById("ca" + col + "_" + sbx);
    var co = 0;
    if( coBx ) {
        co = 10*Number(coBx.value);
    }
    var newBx = document.getElementById("bo" + col + "_" + sbx);

    var prevCol = col - 1;
    var ciBx = document.getElementById("ca" + prevCol + "_" + sbx);
    var ans = newBx.value;
    var corrAns = co + borFrmValue - 1;

    if( corrAns > 9 ) {
        corrAns = corrAns - co;
    }
    if(ans == corrAns ) {
        errBx.innerHTML = "";
        newBx.style.color = "black";
        borFrmBx.style.color = "black";
        if( coBx ) {
            coBx.style.color = "black";
        }
        ciBx.focus();
        ciBx.style.backgroundColor = "white";
        ciBx.style.color = "red";
        ciBx.style.border = "1px solid black";
        ciBx.style.height = "1em";
        ciBx.value="";
    } else {
        upDateErrCount();
        newBx.style.color = "red";
        newBx.value = "";
        borFrmBx.style.color = "red";
        if( coBx && borFrmValue === 0 ) {
            coBx.style.color = "red";
        }
        errBx.innerHTML = "";
        errBx.innerHTML = "not " + ans;
    }
}
// cross off the digit being borrowed from, make new box visible for the
// new operand digit and set the focus to the new box
function promptDivBorrow( col, sbx ) {
    for( var j = 0; j < 18; j++ ) {
        document.getElementById("statusBox" + j).innerHTML = "";
    }
    var x = 0;      
    //document.getElementById("statusBox" + x).innerHTML = "in promptDivBorrow col = " + col + ", sbx = " + sbx;
    //x = x + 1;
    var borFrmBxs;
    var whatBorFrm;
    var borFrmValue;
    var borFrmBx;
    var hiddenCaBx;
    var prevCol = col - 1;
    // doesn't safeguard borrowing from least significant digit of first dividend fixit
    if( col > 0 ) {
        if( sbx == 0 ) {
            borFrmBxs = document.getElementsByName("dvddigs");
            whatBorFrm = borFrmBxs.length - 1 - col;
            //document.getElementById("statusBox" + x).innerHTML = "sbx = " + sbx + " col = " + col + " whatBorFrm = " + whatBorFrm;
            //x = x + 1;
            borFrmBx = borFrmBxs[whatBorFrm];
            borFrmValue = Number(borFrmBx.childNodes[0].nodeValue); // read fixed node value
            var whatHca = "hca" + prevCol + "_" + 0;
            hiddenCaBx = document.getElementById( whatHca );
            //document.getElementById("statusBox" + x).innerHTML = "sbx = 0 checking hidden carry " + whatHca;
            //x = x + 1;
        } else {
            var ddx = sbx - 1;
            borFrmBxs = document.getElementsByName("op" + ddx + "_1");
            var bdlength; // = Number(document.getElementById("bringdown" + ddx).value);
            var bdBxs = document.getElementsByName("bd" + ddx);
            bdlength = bdBxs.length;
            if( col < bdlength ) {
                whatBorFrm = bdBxs.length - 1 - col;
                //document.getElementById("statusBox" + x).innerHTML = "bdBxs.length = " + bdBxs.length + " col = " + col + " whatBorFrm = " + whatBorFrm;
                //x = x + 1;
                borFrmBx = bdBxs[whatBorFrm];
            } else {
                whatBorFrm = borFrmBxs.length + bdBxs.length - 1 - col;
                //document.getElementById("statusBox" + x).innerHTML = "borFrmBxs.length = " + borFrmBxs.length + " bdBxs.length = " + bdBxs.length + " col = " + col + " whatBorFrm = " + whatBorFrm;
                //x = x + 1;
                borFrmBx = borFrmBxs[whatBorFrm];
            }
            borFrmValue = Number(borFrmBx.value); // read from input
            var whatHca = "hca" + prevCol + "_" + sbx;
            hiddenCaBx = document.getElementById( whatHca );
            //document.getElementById("statusBox" + x).innerHTML = "checking hidden carry " + whatHca + " col = " + col + " bdlength = " + bdlength;
            //x = x + 1;
        }
        var whatcoBx = "ca" + col + "_" + sbx;
        var coBx = document.getElementById(whatcoBx);
        var whatNewBx = "bo" + col + "_" + sbx;
        var newBx = document.getElementById(whatNewBx);
        //document.getElementById("statusBox" + x).innerHTML = "whatcoBx = " + whatcoBx + " whatNewBx = " + whatNewBx;
        //x = x + 1;
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
        
        //make sure it's really a column that should be borrowed from 
        // or do nothing
        if( Number(hiddenCaBx.value) !== 0 &&
                document.getElementsByName("showborrows")[0].checked ) { 
            var errBx = document.getElementById("msg");
            errBx.innerHTML = "";
            //document.getElementById("statusBox0").innerHTML = "col = " + col + " sbx = " + sbx + " newBx = " + newBx;
            if( borFrmValue === 0 ) {
                // if 0 then cross off the carry in as well
                // if it's 0 & no carry in, there is nothing to borrow so do nothing
                if( coBx && Number(coBx.value) === 1 ) {
                    borFrmBx.style.setProperty("text-decoration", "line-through");
                    coBx.style.textDecoration = "line-through";
                    newBx.focus();
                    newBx.style.backgroundColor = "white";
                    newBx.style.color = "red";
                    newBx.style.border = "1px solid black";
                    newBx.style.height = "1.7em";
                    newBx.value="";
                }
            } else {
                borFrmBx.style.setProperty("text-decoration", "line-through");
                newBx.focus();
                newBx.style.backgroundColor = "white";
                newBx.style.color = "red";
                newBx.style.border = "1px solid black";
                newBx.style.height = "1.7em";
                newBx.value="";
            }

            var nCols = document.getElementsByName("dvddigs");
            var mtBoxes = 0;
            //alert("nCols.length = " + nCols.length);
            for( var idx = 0; idx < nCols.length; idx++ ) {
                var quotDigs = Number(document.getElementById("quotDigs").value);
                //alert("quotDigs = " + quotDigs);
                //for( var jdx = 0; jdx < quotDigs; jdx++ ) {
                    //var whatBorrow = "bo" + idx + "_" + jdx;
                    var whatBorrow = "bo" + idx + "_" + sbx;
                    //alert("checking if whatBorrow " + whatBorrow + " is empty");
                    newBx = document.getElementById( whatBorrow );
                    if( newBx ) {
                        if( newBx.value === "" ) {
                            mtBoxes += 1;
                        }
                    }
                //}
            }
            if( mtBoxes < 2 ) { // one empty box is allowed because it's above the
                                // digit that you just clicked on
                var displayBorrow = document.getElementById("dispBo");
                displayBorrow.style.color = getComputedStyle(displayBorrow).backgroundColor;
            }
        } else {
            setFocus();
        }
    }
}
   
function zeroDivCounts() {
    var max = Number(document.getElementById('lastbox').value);
        
    // update problem counts
    document.getElementById("numAttmptd").value = -1;
    document.getElementById("errs").value = 1;
    document.getElementById("numWoErr").value = 0;   
    document.getElementById("consWoErr").value = 0;
    document.getElementById("strtTime").value = Number(Date.now());
    startDivAgain();
}
// start again button code
function startDivAgain() {
    //var max = Number(document.getElementById('lastbox').value);
    var errCt = Number(document.getElementById("errs").value);
    //var boxNo = Number(document.getElementById("bdx").value);
    var errMsg = document.getElementById("msg").innerHTML;
    var numAttmptd = Number(document.getElementById("numAttmptd").value);
    var numWoErr = Number(document.getElementById("numWoErr").value);
    var consWoErr = Number(document.getElementById("consWoErr").value);
    var noMorQDigs = document.getElementById("nextQuotBox").value;

    // find the last opX_1 in the page
    var nextrow = document.getElementsByName("op" + 0 + "_1");;
    var lastrow = null;
    for( var j = 1; ; ++j ) {
        var lastrow = nextrow;
        nextrow = document.getElementsByName("op" + j + "_1");
        if( nextrow.length === 0 ) {
            break;
        }
    }
    var remainderZero = Number(lastrow[lastrow.length-1].value) === 0;
    //alert("boxNo = " + boxNo + " max = " + max + " errCt = " + errCt + " errMsg = " + errMsg);

    // update problem counts
    document.getElementById("numAttmptd").value = numAttmptd + 1;
    if( errCt === 0 && errMsg === "" &&
            noMorQDigs && remainderZero ) {
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
    if( document.getElementById("msg").value === "" ) {
        setFocus();
    }
}
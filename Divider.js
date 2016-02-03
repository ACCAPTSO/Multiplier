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
    //alert("nextbox is " + nextbox);
    document.getElementById("whatbox").value = nextbox;
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
    var quotDigs = Number(document.getElementById('quotDigs').value);

    var qdigit = new Array();
    var possBx = new Array();
    // with estimation allowed, there is no way to predict what user will put
    // in quotient boxes, therefore no way to predict carries fixit in jsp and here
    // find the quotient digits that will generate carries
    for( var i = quotDigs-1, j = 0; i >= 0; i--, j++ ) {
        possBx[j] = document.getElementsByName('qt' + i)[0];
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
        //document.getElementById('statusBox' + x).innerHTML = "skip mcarry and quotient boxes nextbox = " + nextbox;
        //x = x + 1;
        // skip borrow and carry boxes for original dividend
        nextbox += 2*(document.getElementsByName("dvddigs").length - quotDigs);
        //document.getElementById('statusBox' + x).innerHTML = "skip orig dividend borrow and carry boxes nextbox = " + nextbox;
        //x = x + 1;
        // needs every row of operands, borrows and carries
        //var maxi = sbx - 1
        var whatRow = Number(document.getElementById('rowNo').value);
        for( var i = 0; i < whatRow; i++ ) {
            var cid = document.getElementsByName("op" + i + "_0").length;
            nextbox += cid; // product digit boxes
            //document.getElementById('statusBox' + x).innerHTML = "skip row " + i + " prod nextbox = " + nextbox;
            //x = x + 1;
            var nexti = i + 1;
            nextbox += document.getElementsByName("boca" + nexti).length; // borrows and carries
            //document.getElementById('statusBox' + x).innerHTML = "skip row " + nexti + " borrows and carries nextbox = " + nextbox;
            //x = x + 1;
            cid = document.getElementsByName("op" + i + "_1").length;
            cid += document.getElementsByName("bd" + i).length;
            nextbox += cid; // dividend boxes
            //document.getElementById('statusBox' + x).innerHTML = "skip row " + i + " dividend nextbox = " + nextbox;
            //x = x + 1;
        } 
        nextbox += document.getElementsByName("op" + i + "_0").length;
        //document.getElementById('statusBox' + x).innerHTML = "skip row " + i + " prod nextbox = " + nextbox;
        //x = x + 1;
        nextbox -= col + 2;
        //document.getElementById('statusBox' + x).innerHTML = "back off prod digits already done nextbox = " + nextbox;
        //x = x + 1;
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;

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
    var whatRow = Number(document.getElementById('rowNo').value);
    var prevRow = whatRow - 1;
    // calculate and store the product  and of this quotient digit and divisor
    // as well as the max digit of that product
    var prod = 0;
    var dvsrdigs = document.getElementsByName("dvsrdigs");
    var ansBx = document.getElementsByName("qt" + col)[0];
    var ans = ansBx.value;
    var quotDigs = Number(document.getElementById('quotDigs').value);
    var mcarry = 0;
    var i = 0;
    for( ; i < dvsrdigs.length; i++ ) {
        var dbx = dvsrdigs.length - 1 - i;
        var addProd = Number(dvsrdigs[dbx].childNodes[0].nodeValue)*ans + mcarry;
        mcarry = Math.floor(addProd/10);
        var mDig = addProd % 10;
        if( dbx > 0 ) {
            var carryRow = quotDigs - 1 - col;
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
    
    var dvdnd = 0;
    var dvdBxs = document.getElementsByName("dvddigs");
    var restAreZero = true;
    for( var i = dvdBxs.length - col; i < dvdBxs.length; i++ ) {
        if( Number(dvdBxs[i].childNodes[0].nodeValue) !== 0 ){
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
    var x = 0;
    for( var j = 0; j < 20; j++ ) {
        document.getElementById('statusBox' + j).innerHTML = "";
    }
    var carries = new Array();
    var borrows = new Array();
    if( whatRow === 0 ) {
        var i = dvdBxs.length - quotDigs;
        while( i >= 0 ) {
            dvdDigVal = Number(dvdBxs[i].childNodes[0].nodeValue);
            var ten2pow = Math.pow( 10, pow);
            dvdnd += ten2pow*dvdDigVal;
            // if there was a borrow, decrement dvdDigVal
            if( pow > 0 ) {
                caCol = pow + quotDigs - 2;
                whatCarry = "hca" + caCol + "_" + whatRow;
                //document.getElementById('statusBox' + x).innerHTML = "whatRow = " + whatRow + ", pow = " + pow + ", checking whatCarry = " + whatCarry;
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
                        //document.getElementById('statusBox' + x).innerHTML = "storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        borBx.value = "-2";
                    }
                //} else {
                    //alert("borBx " + whatBorBx + " or caBx " + caBx + " does not exist");
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Math.pow( 10, pow+1);
            prodDigVal = (mainpart - discard)/ten2pow;
            //document.getElementById('statusBox' + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + " dvdDigVal = " + dvdDigVal + " prodDigVal = " + prodDigVal;
            //x = x + 1;
            caCol = pow + quotDigs - 1;
            whatCarry = "hca" + caCol + "_" + whatRow;
            caBx = document.getElementById( whatCarry );
            if( caBx ) {
                if( dvdDigVal < prodDigVal ) { // this digit has a carry
                    caBx.value = 1;
                    //document.getElementById('statusBox' + x).innerHTML = "storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    caBx.value = 0;
                }
            }
            --i;
                        //if( i < 0 ) { // if you put too large a quotient digit
                        //    break;      // prod may be bigger than dividend
                        //}               // then what? fixit
            ++pow;
        }  
    } else {   
        dvdBxs = document.getElementsByName("op" + prevRow + "_1");
        var bdBxs = document.getElementsByName("bd" + prevRow);
        var whatCalcDig = "calcDig" + prevRow + "_1";
        var calcDig = Number(document.getElementById(whatCalcDig).value);
        var whatBringDown = "bringdown" + prevRow;
        var bringdown = Number(document.getElementById(whatBringDown).value);
        var maxp = 1 + calcDig + bringdown;
        //alert("whatRow > 0, pow = " + pow + " maxp = "  + maxp + " calcDig = " + calcDig + " bringdown = " + bringdown + " whatCalcDig = " + whatCalcDig + " whatBringDown = " + whatBringDown );
        while( pow < maxp ) {
            if( pow < bringdown ) {
                dvdDigVal = Number(bdBxs[bringdown - 1 - pow].value);
            } else {
                var dvdidx = maxp-1-pow;
                var whatDvdBx = dvdBxs[dvdidx];
                //document.getElementById('statusBox18').innerHTML = "pow = " + pow + " dvdidx = " + dvdidx + " whatDvdBx = " + whatDvdBx;
                if( whatDvdBx != null ) {
                    dvdDigVal = Number(whatDvdBx.value);
                }
            }
        
            var ten2pow = Math.pow( 10, pow);
            dvdnd += ten2pow*dvdDigVal;
            //alert("pow = " + pow + " dvdDigVal = " + dvdDigVal + " dividend = " + dvdnd);
            // if there was a borrow, decrement dvdDigVal
            if( pow > 0 ) {
                caCol = pow - 1;
                whatCarry = "hca" + caCol + "_" + whatRow;
                caBx = document.getElementById( whatCarry );
                //document.getElementById('statusBox' + x).innerHTML = "whatRow = " + whatRow + " pow = " + pow + ", checking whatCarry = " + whatCarry;
                //x = x + 1
                borCol = caCol + 1;
                whatBorBx = "hbo" + borCol + "_" + whatRow;
                borBx = document.getElementById(whatBorBx);
                if( borBx && caBx ) {
                    if( Number(caBx.value) === 1 ) {
                        --dvdDigVal;
                        // store the new borrowed value
                        borBx.value = dvdDigVal;
                        //document.getElementById('statusBox' + x).innerHTML = " pow = " + pow + " storing new value: " + dvdDigVal + " at " + whatBorBx;
                        //x = x + 1;
                    } else {
                        borBx.value = "-2";
                    }
                //} else {
                    //alert("borBx " + whatBorBx + " or caBx " + caBx + " does not exist");
                }
            }
            discard = prod % ten2pow;
            mainpart = prod % Math.pow( 10, pow+1);
            prodDigVal = (mainpart - discard)/ten2pow;
            caCol = pow;
            whatCarry = "hca" + caCol + "_" + whatRow;
            caBx = document.getElementById( whatCarry );
            if( caBx ) {               
                if( dvdDigVal < prodDigVal ) {// this digit has a carry
                    caBx.value = 1;
                    //document.getElementById('statusBox' + x).innerHTML = "pow = " + pow + " storing carry at " + whatCarry;
                    //x = x + 1;
                } else {
                    caBx.value = 0;
                }           
            }
            ++pow;
        }
    }

    var diff = dvdnd - prod;       // if you put too small a quotient digit, diff may
                                              // be bigger than divisor fixit    
    //alert("in divide function, predicting: prev dividend = " + dvdnd + " prod = " + prod + " diff = " + diff );
    var diffMxIdx = diff > 0? Math.floor(Math.log10(diff)) : 0;
    document.getElementById("calcDig" + whatRow + "_1").value = diffMxIdx;
    document.getElementById("operand" + whatRow + "_1").value = diff;
    
    var origDvdDigs = document.getElementsByName("dvddigs");
    if( whatRow == 0 ) {
        dvddigs = origDvdDigs;
    } else {
        prevRow = whatRow - 1;
        dvddigs = document.getElementsByName('op' + prevRow + '_1');
        bddigs = document.getElementsByName('bd' + prevRow);
    }
    var stop = dvddigs.length;
    if( whatRow == 0 ){
        stop = stop + 1 - quotDigs;
    }
    if( immFeedBkCk ) {

        var errBx = document.getElementById("msg");
        var dvddigs;
        var bddigs;
        var prevRow;


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
            } else { // make next row of multiplication boxes visible
                var name = 'op' + whatRow + '_0';
                var visibleMrow = document.getElementsByName(name);
                for( var i = 0; i < visibleMrow.length; i++ ) {
                    visibleMrow[i].type = "text";
                }
            }
            incrementbox();
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
        }
        
    } else {
        var nextbox;
        // skip multiplicative carries
        nextbox = document.getElementsByClassName('c2').length;
        //alert("skip mcarries nextbox = " + nextbox);
        // need to take 0.87 into account fixit
        if( ans == 0 ) {  // you will need to bring down more digits
                         // before you can start another row  
            var visibleBrows = document.getElementsByName('bd' + prevRow);
            // make next bringdown box visible
            for( var i = 0; i < visibleBrows.length; i++ ) {
                if( visibleBrows[i].type == "hidden") {
                    visibleBrows[i].type = "text";
                    break;
                }
            }
            if( restAreZero ) {
                nextbox += quotDigs - col;
            } else {
                // skip quotient boxes
                nextbox += quotDigs;
                // skip borrow and carry boxes for original dividend
                nextbox += 2*(origDvdDigs.length - quotDigs);
                //nextbox += 2*(origDvdDigs.length - quotDigs);
                // needs every row of operands, borrows and carries
                for( var i = 0; i < whatRow; i++ ) {
                    //var cid = Number(document.getElementById("calcDig" + i + "_0").value) + 1;
                    var cid = document.getElementsByName("op" + i + "_0").length;
                    nextbox += cid; // product digit boxes
                    //alert("skip row " + i + " prod nextbox = " + nextbox);
                    //cid = Number(document.getElementById("calcDig" + i + "_1").value) + 1;
                    cid = document.getElementsByName("op" + i + "_1").length;
                    // there are going to be an entire rest of the row that are bringdowns fixit
                    //cid += Number(document.getElementById("bringdown" + i).value);
                    cid += document.getElementsByName("bd" + i).length;
                    nextbox += 2*(cid-1); // borrows and carries // count actual boxes, not calculated boxes fixit
                    //nextbox += 2*(cid-1); // borrows and carries
                    //alert("skip row " + i + " borrows and carries nextbox = " + nextbox);
                    nextbox += cid; // dividend boxes
                    //alert("skip row " + i + " dividend nextbox = " + nextbox);
                } 
            }
        } else { // make next row of multiplication boxes visible
            var name = 'op' + whatRow + '_0';
            var visibleMrow = document.getElementsByName(name);
            for( var i = 0; i < visibleMrow.length; i++ ) {
                visibleMrow[i].type = "text";
            }

            // skip quotient boxes
            nextbox += quotDigs;
            //alert("skip quotdigs and mcarries nextbox = " + nextbox);
            // skip borrow and carry boxes for original dividend
            nextbox += 2*(origDvdDigs.length - quotDigs);
            //nextbox += 2*(origDvdDigs.length - quotDigs);
            //alert("skip qd, mc and borrows and carries nextbox = " + nextbox);

            // needs every row of operands, borrows and carries
            for( var i = 0; i < whatRow; i++ ) {
                //var cid = Number(document.getElementById("calcDig" + i + "_0").value) + 1;  // need to actually add worst case boxes fixit
                var cid = document.getElementsByName("op" + i + "_0").length;  // need to actually add worst case boxes fixit
                nextbox += cid; // product digit boxes
                //alert("skip row " + i + " prod nextbox = " + nextbox);
                //cid = Number(document.getElementById("calcDig" + i + "_1").value) + 1;
                cid = document.getElementsByName("op" + i + "_1").length;
                //cid += Number(document.getElementById("bringdown" + i).value);
                cid += document.getElementsByName("bd" + i).length;
                nextbox += 2*(cid-1); // borrows and carries // count actual boxes, not calculated index/length fixit
                //nextbox += 2*(cid-1); // borrows and carries
                //alert("skip row " + i + " nextboxborrows and carries nextbox = " + nextbox);
                nextbox += cid; // dividend boxes
                //alert("skip row " + i + " dividend nextbox = " + nextbox);         
            } 
            // skip current product
            nextbox += prodMxIdx;
            //alert("skip current prod nextbox = " + nextbox);
        }
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;

        //alert("final nextbox = " + nextbox);
        document.getElementById("whatbox").value = nextbox;
    }

    setFocus();
}

function multiply( col ) { // may want to pass sbx instead of reading whatRow after all fixit
    var whatRow = Number(document.getElementById('rowNo').value);
    var ansBxs = document.getElementsByName("op" + whatRow + "_0");
    var bxNo = ansBxs.length - 1 - col;
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var quotDigs = Number(document.getElementById("quotDigs").value);
    var dec = whatRow;
    for( var prevrow = whatRow - 1; prevrow >= 0; prevrow-- ) {
        var bringDowns = document.getElementsByName("bd" + prevrow ).length;
        if( bringDowns > 1 ) {
            dec += bringDowns - 1;
        }
    }
    var qdx = quotDigs - 1 - dec; // not neccessarily whatRow if there was more than 1 bringdowns
    var qBx = document.getElementsByName("qt" + qdx)[0];
    var qtDig = Number(qBx.value);
    var dvsrdigs = document.getElementsByName("dvsrdigs");
    var whatDig = dvsrdigs.length - 1 - col;
    if( whatDig < 0 ) { // should this ever happen? fixit
        whatDig = 0;
    }

    var prod = Number(document.getElementById("operand" + whatRow + "_0").value);
    var ten2col = Math.pow(10, col);
    var discard = prod % ten2col;
    var mainpart = prod % Math.pow(10,col+1);

    //document.getElementById('statusBox2').innerHTML = "prod = " + prod + " mainpart = " + mainpart + " discard = " + discard;
    var expAns = (mainpart - discard)/ten2col;

    var prevcaBx;
    var cmx = 0;
    var startquot = quotDigs - 1;
    
    for( var i = startquot; i > qdx; i-- ) {
        if( Number(document.getElementsByName("qt" + i)[0].value) > 1 ) {
            cmx = cmx + 1;
        }
        //alert(" i = " + i + " cmx = " + cmx);
    }
    
    var isLastMult = (col === Number(document.getElementById("calcDig" + whatRow + "_0").value));
    //document.getElementById('statusBox2').innerHTML = "col = " + col + " whatRow = " + whatRow + " isLastMult = " + isLastMult;
    if( isLastMult ) {
        if( col > 1 ) {
            var prevCol = dvsrdigs.length - 2;
            prevcaBx = document.getElementsByName("cm" + prevCol + "_" + cmx)[0];
        }
    } else if( col > 0 ){
        var prevCol = col - 1;
        prevcaBx = document.getElementsByName("cm" + prevCol + "_" + cmx)[0];
    }
    if( ans == expAns ) {
        qBx.style.color = "black";
        dvsrdigs[whatDig].style.color = "black";
        ansBxs[bxNo].style.color = "black";
        if( prevcaBx ){
            prevcaBx.style.color = "black";
        }
        errBx.innerHTML = "";
        var whatBox = Number(document.getElementById("whatbox").value);
        var nextBox = whatBox;
        if( isLastMult ) {
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
                var bddigs = null;
                if( whatRow > 0 ) {
                    var prevRow = whatRow - 1;
                    dvddigs = document.getElementsByName('op' + prevRow + '_1');
                    //bddigs = document.getElementsByName('bd' + prevRow);
                    bddigs = document.getElementsByName('bringdown' + prevRow);
                }
                var jstop = document.getElementById("calcDig" + whatRow + "_0").value;
                //if( bddigs !== null ) {
                //        jstop += Number(bddigs.value);
                //}
                var whatBorCaBxs = 'boca' + whatRow;
                var visibleBorCaBxs = document.getElementsByName( whatBorCaBxs );
                var origColor = "";
                if( visibleBorCaBxs ) {
                    document.getElementById("dispBo").style.color = "#600301";
                    origColor = getComputedStyle(visibleBorCaBxs[0].parentNode).backgroundColor;
                }
                for( var j = 0; j <  visibleBorCaBxs.length; j++ ) {
                    visibleBorCaBxs[j].type = "text";
                    visibleBorCaBxs[j].style.height = "1.7em";
                    //visibleBorCaBxs[0].style.backgroundColor = origColor;
                }
            }
            nextBox += Number(document.getElementById("calcDig" + whatRow + "_0").value); // product boxes
            //document.getElementById('statusBox0').innerHTML = "with product boxes, nextBox = " + nextBox;
            var bringDownDigs = document.getElementsByName('bd' + whatRow).length;
            if( visibleDrows.length > 1 ) {
                nextBox += 2*(visibleDrows.length + bringDownDigs - 1); // borrow, carry
                //document.getElementById('statusBox1').innerHTML = "with borrow and carry boxes, nextBox = " + nextBox;
                nextBox += visibleDrows.length; // dividend boxes
            } else {
                nextBox += 1;
            }
            whatRow = whatRow + 1;
            document.getElementById('rowNo').value = whatRow;
        } else {  
            if( col < dvsrdigs.length - 1) {
                var whatCm = "hcm" + col + "_" + dec;
                //alert("whatCm = " + whatCm );
                var hasCarry = Number(document.getElementById(whatCm).value) > 0;
                if( hasCarry ) {
                    var allCmBoxes = document.getElementsByClassName('c2');
                    nextBox = allCmBoxes.length - 1 - dec*(dvsrdigs.length - 1) - col;
                } else {
                    nextBox -= 1;
                }
            } else {
                 nextBox -= 1;
            }
        }
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        document.getElementById("whatbox").value = nextBox;
        //incrementbox();
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
    var bxNo = ansBxs.length - 1 - col;
    //alert("col = " + col + " ansBxs = " + ansBxs + " length = " + ansBxs.length + " bxNo = " + bxNo );
    var ans = Number(ansBxs[bxNo].value);
    var errBx = document.getElementById("msg");
    var prodBxs = document.getElementsByName("op" + sbx + "_0");
    //var prod = Number(document.getElementById("operand" + sbx + "_0").value);
    var subBxs;
    var pbx;

    //var dividend = 0;
    var dvdidx = 0;
    var prodidx = prodBxs.length - 1 - col;
    var prodBx = prodBxs[prodidx];
    var dvdBx;
    var dvdVal = 0;
    var borCol = Number(col);
    if( sbx == 0 ) {
        borCol = borCol + Number(document.getElementById('quotDigs').value) - 1;
        subBxs = document.getElementsByName("dvddigs");
        dvdidx = subBxs.length -  Number(document.getElementById('quotDigs').value) - col;
        dvdBx = subBxs[dvdidx];
        dvdVal = Number(dvdBx.childNodes[0].nodeValue);
    } else {
        var prevRow = sbx - 1;
        // dividend = Number(document.getElementById("operand" + prevRow + "_1").value); 
        var bdBxs = document.getElementsByName("bd" + prevRow );
        subBxs = document.getElementsByName("op" + prevRow + "_1");
        
        var inc = Number(document.getElementById("bringdown" + prevRow ).value) - 1;
        
        dvdidx = inc - col;
        //document.getElementById('statusBox0').innerHTML = " inc = " + inc + " col = " + col + " dididx = " + dvdidx;
        if( col > inc ){
            var calcDig = Number(document.getElementById("calcDig" + prevRow + "_1").value) + 1;
            dvdidx = dvdidx + calcDig;
            //document.getElementById('statusBox2').innerHTML = "inc = " + inc + " col = " + col + " calcDig = " + calcDig + " dvdidx = " + dvdidx;
            dvdBx = subBxs[dvdidx];
        } else {
            
            dvdBx = bdBxs[dvdidx];
        }
        //document.getElementById('statusBox1').innerHTML = "dvdidx = " + dvdidx;
        dvdVal = dvdBx.value;
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
    //document.getElementById('statusBox3').innerHTML = "whatBorBx = " + whatBorBx + " whatCarry = " + whatCarry;

    var ten2col = Math.pow(10, col);
    var discard = diff % ten2col;
    var mainpart = diff % Math.pow(10,col+1);

    var expAns = (mainpart - discard)/ten2col;
    var lastDig = diff > 0 ? Math.floor(Math.log10(diff)) : 0;
    var isLastSub = ( col ===  lastDig );
    //document.getElementById('statusBox19').innerHTML = "diff " + diff + " lastDig = " + lastDig + " col = " + col + " isLastSub = " + isLastSub;
    if( ans == expAns ) {
        ansBxs[bxNo].style.color = "black";
        var whatHelp = document.getElementsByName('showhelp');
        var showBrowsChkd = false;
        for( var i = 0; i < whatHelp.length; i++ ) {
            if( whatHelp[i].checked ) { // need to check actual value fixit
                showBrowsChkd = true;
                break;
            }
        }
        if( borBx ) {
            borBx.style.color = "black";
            if( !showBrowsChkd ) {
                borBx.type = "hidden";
            }
        }

        if( caBx ) {
            caBx.style.color = "black";
            if( !showBrowsChkd ) {
                caBx.type = "hidden";
            }
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
            //document.getElementById('statusBox1').innerHTML = "sbx = " + sbx + " visibleBrows = " + visibleBrows;
        }
        incrementbox();
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
            //alert("dvdVal = " + dvdVal);
            var borVal = Number(hiddenBorBx.value);
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
        errBx.innerHTML = expAns + " not " + ans;
        upDateErrCount();
    }
    setFocus();
}
                            
function bringdown( sbx ) {
    var ansBxs = document.getElementsByName("bd" + sbx );
    var thisRowsBdDigs = document.getElementById("bringdown" + sbx ).value
    var thisRowsBdDigsVal = (thisRowsBdDigs ) ? Number(thisRowsBdDigs) : 0;
    var bxNo = thisRowsBdDigsVal; // + 1; //ansBxs.length - 1 - col
    //document.getElementById('statusBox1').innerHTML =   " thisRowBdDigs = " + thisRowsBdDigs + " bxNo = " + bxNo;
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
    //document.getElementById('statusBox2').innerHTML = " final dvdcol = " + dvdcol + " whatDig = " + whatDig;
    var dividend = Number(document.getElementById("dividend").value);
    var discard = dividend % Math.pow(10, dvdcol);
    var expAns = (dividend % Math.pow(10,dvdcol+1) - discard)/Math.pow(10, dvdcol);
    if( ans == expAns ) {
        //alert("correct, answer is " + ans);
        ansBxs[bxNo].style.color = "black";
        dvddigs[whatDig].style.color = "black";
        errBx.innerHTML = "";
        var prevDividend = Number(document.getElementById("operand" + sbx + "_1").value);
        document.getElementById("operand" + sbx + "_1").value = 10*prevDividend + ans;
        var newval = thisRowsBdDigsVal + 1;
        //alert("thisRowsBdDigsval = " + thisRowsBdDigsVal + " newval = " + newval);
        document.getElementById("bringdown" + sbx).value = newval;
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
    var newBx = document.getElementById("bo" + col + "_" + sbx)[0];

    var prevCol = col - 1;
    var ciBx = document.getElementById("ca" + prevCol + "_" + sbx)[0];
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
        ciBx.style.height = "1em";
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
    var newBx = document.getElementById("bo" + col + "_" + sbx)[0];
    
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
    //if( newBx &&
    if( document.getElementsByName('showhelp')[0].checked ) { 
        //document.getElementById('statusBox0').innerHTML = "col = " + col + " sbx = " + sbx + " newBx = " + newBx;
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
                newBx = document.getElementById( whatBorrow )[0];
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
   
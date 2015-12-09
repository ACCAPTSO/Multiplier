/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function divide( immFeedBkCk, col, qtDig ){
    //alert("immFeedBkCk = " + immFeedBkCk + " col = " + col + " qtDig = " + qtDig );
    if( immFeedBkCk ) {
        var ansBx = document.getElementsByName("qt" + col)[0];
        var ans = ansBx.value;
        var errBx = document.getElementById("msg");
        if( ans == qtDig ) {
            //alert("correct answer is " + ans );
            ansBx.style.color = "black";
            errBx.innerHTML = "";
            var bdx = Number(document.getElementById('bdx').value) + 1;
            document.getElementById('bdx').value = bdx;
            var nextbox = document.getElementsByName("nextbox")[bdx].value;
            document.getElementById("whatbox").value = nextbox;
        } else {
            errBx.innerHTML = "not " + ans;
            upDateErrCount();
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
    var divisor = Number(document.getElementById("divisor").value);
    var carry = 0;
    var prod = 0;
    var expDig = 0;
    for( var i = 0; i <= col; i++ ) {
        prod = (divisor % 10)*qtDig + carry;
        expDig = prod % 10;
        carry = (prod - expDig)/ 10;
        //alert("qBx = " + qBx + " qtDig = " + qtDig + " divisor = " + divisor + " carry = " + carry + " expDig = " + expDig );
        divisor = Math.floor(divisor / 10);
    }
    if( ans == expDig ) {
        //alert("correct, answer is " + ans);
        ansBxs[bxNo].style.color = "black";
        errBx.innerHTML = "";
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {       
        errBx.innerHTML = "not " + ans;
        upDateErrCount(); // should not count as error but should not advance the
        // box either fixit
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
    var pdx = 0;
    for( var i = 0; i < prodBxs.length; i++ ) {
        var pbx = prodBxs.length - 1 - i;
        prod += Math.pow(10, i)*Number(prodBxs[pbx].value);
    }
    var dividend = 0;
    if( sbx == 0 ) {
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
        var dvdBxs = document.getElementsByName("bd" + ddx );
        var inc = dvdBxs.length;
        //alert(" bring down boxes length is " + inc );
        for( var i = 0; i < inc; i++ ) {
            var dd = inc - 1 - i;
            dividend += Math.pow(10, i)*Number(dvdBxs[dd].value);
            //alert("i = " + i + " dividend = " + dividend );
        }
        dvdBxs = document.getElementsByName("op" + ddx + "_1");
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
        errBx.innerHTML = "";
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {
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
    var dvdidx = Number(document.getElementById("quotDigs").value) - 1;
    //alert("dvdidx = " + dvdidx );
    for( var idx = 0; idx < sbx; idx++ ) {
        dvdidx -= document.getElementsByName("bd" + idx ).length;
        //alert("idx = " + idx + " dvdidx = " + dvdidx );
    }
    dvdidx -= document.getElementsByName("bd" + sbx ).length - col;
    //alert("dvdidx = " + dvdidx );
    var dividend = Number(document.getElementById("dividend").value);
    var discard = dividend % Math.pow(10, dvdidx);
    var expAns = (dividend % Math.pow(10,dvdidx+1) - discard)/Math.pow(10, dvdidx);
    // fixit -how do you figure out what quotient digit to compare to?
                      // count up all the bringdown boxes?
    if( ans == expAns ) {
        //alert("correct, answer is " + ans);
        ansBxs[bxNo].style.color = "black";
        errBx.innerHTML = "";
        var bdx = Number(document.getElementById('bdx').value) + 1;
        document.getElementById('bdx').value = bdx;
        var nextbox = document.getElementsByName("nextbox")[bdx].value;
        document.getElementById("whatbox").value = nextbox;
    } else {
        errBx.innerHTML = "not " + ans;
        upDateErrCount();
    }
    setFocus();
}

    


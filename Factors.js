/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var allprimes = [    2,  3,  5,  7, 11, 
                    13, 17, 19, 23, 29, 
                    31, 37, 41, 43, 47, 
                    53, 59, 61, 67, 71, 
                    73, 79, 83, 89, 97 ];
var charArray = "";
function erase( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    if( ansBx.style.color === "red") {
        charArray = "";
        ansBx.style.color = "black";
        var len = ansBx.value.length;
        ansBx.value = ansBx.value.substring(len, len);
    }
}
function check( ev ) {
    ev = ev || window.event;
    var ansBx = ev.target;
    if (ev.which === 13 || ev.keyCode === 13) {
        var doc = document;
        var num = Number;
        var id = ansBx.id.toString();
        var pos = id.indexOf("_");
        var col = num(id.substr(pos+1, id.length));
        var row = num(id.substr(0,pos));
        //alert("row: " + row + " col: " + col);
        var checkingPrime = col%2 === 0;
        //var potentialFact = num(charArray);
        var potentialFact = num(ansBx.value);
        if( checkingPrime ) {
            //alert("checking prime");
            var opCol = col + 1;
            var whatOp = num(doc.getElementById(row + "_" + opCol ).value);
            var test = whatOp%potentialFact;
            //alert("whatOp: " + whatOp + " whatOp mod potentialfact: " + test);
            if( whatOp%potentialFact === 0 ) {
                //alert(potentialFact + " is a factor of " + whatOp);
                var len = allprimes.length;
                var isPrime = false;
                for( var i = 0; i < len; ++ i ) {
                    if( potentialFact === allprimes[i] ) {
                        isPrime = true;
                        //alert(potentialFact + " is prime");
                        break;
                    }
                }
                if( isPrime ) {
                    ansBx.style.color = "black";
                    col = col + 1;
                    row = row + 1;
                    //alert("next row: " + row + " next col: " + col);
                    var nextIn = doc.getElementById( row + "_" + col );
                    nextIn.type = "text";
                    nextIn.focus();
                } else {
                    ansBx.style.color = "red";                
                }
            } else {
                ansBx.style.color = "red";                
            }
        } else {
            //alert("checking division");
            var prevRow = row - 1;
            prevCol = col - 1;
            var prevOp = num(doc.getElementById(prevRow + "_" + col).value);
            var prevPrime = num(doc.getElementById(prevRow + "_" + prevCol).value);
            if( prevPrime*num(ansBx.value) === prevOp ) {
                if( num(ansBx.value) === 1 ) {
                    col = col + 1;
                    colPlus2 = col + 1;
                    row = 0;
                    var nextOp = doc.getElementById( row + "_" + colPlus2 );
                    nextOp.type = "text";
                } else {
                    col = prevCol;
                }
                var nextIn = doc.getElementById( row + "_" + col );
                nextIn.type = "text";
                nextIn.focus();
            } else {
                ansBx.style.color = "red";
            }
        }
        return false;
    }
};
window.onload = function(){
    document.getElementById("0_0").focus();
};

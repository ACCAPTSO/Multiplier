/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function checkOne() {
    var doc = document;
    var pLables = doc.getElementsByName("pLables");
    var len = pLables.length;

    var somethingClicked = false;
    if( doc.getElementById("addition").checked ) {
        somethingClicked = true;
    } else if( doc.getElementById("subtraction").checked ) {
        somethingClicked = true;
    } else if( doc.getElementById("multiplication").checked ) {
        somethingClicked = true;
    } else if( doc.getElementById("division").checked ) {
        somethingClicked = true;
    }
    if( somethingClicked ) {
        for( var i = 0; i < len; ++i ) {
            pLables[i].style.color = "black";
            //doc.getElementById("checkOne").style.color = "#fff4a3";
            doc.getElementById("checkOne").style.visibility = "hidden";
        }
        zeroCounts();
    } else {
        for( var i = 0; i < len; ++i ) {
            pLables[i].style.color = "red";
            doc.getElementById("checkOne").style.visibility = "visible";
        }
    }
}
function enableCheck() {
    var doc = document;
    var allchecked = true;
    for( var i = 0; i < 4; ++i ) {
        var radioBtns = doc.getElementsByName("q" + i);
        var len = radioBtns.length;
        var ichecked = false;
        for( var j = 0; j < len; ++j ) {
            if( radioBtns[j].checked ) {
                ichecked = true;
                break;
            }
        }

        if( !ichecked ) {
            allchecked = false;
        }
    }
    var somethingClicked = false;
    if( doc.getElementById("addition").checked ) {
        somethingClicked = true;
    } else if( doc.getElementById("subtraction").checked ) {
        somethingClicked = true;
    } else if( doc.getElementById("multiplication").checked ) {
        somethingClicked = true;
    } else if( doc.getElementById("division").checked ) {
        somethingClicked = true;
    }
    if( allchecked  && somethingClicked) {
        var chkBtn = doc.getElementById("Check");
        chkBtn.disabled = false;
        chkBtn.style.color = "black";
    }
}

function checkTF() {
    var doc = document;
    //var visibletxt = "#194e80";
    var chkBtn = doc.getElementById("Check");
    if( chkBtn.value === "Check" ) {
        for( var j = 0; j < 10; j++ ) {
            doc.getElementById("statusBox" + j).innerHTML = "";
        }
        var x = 0;
        var blanks = doc.getElementsByClassName("blank");
        var len = blanks.length;
        for( var i = 0; i < len; ++i ) {
            //blanks[i].style.color = visibletxt;
            blanks[i].style.visibility = "visible";
        }
        // this is a kludge to make sure the user checks before starting again
        doc.getElementById("bdx").value = 12;
        doc.getElementById("lastbox").value = 12;
        for( var i = 0; i < 4; ++i ) {
            var qi = doc.getElementById("q" + i);
            if( qi ) {
                var expAns = doc.getElementById("a" + i).innerHTML;
                var altAns = doc.getElementById("l" + i).innerHTML;
                var radioBtns = doc.getElementsByName("q" + i);
                var len = radioBtns.length;
                var checkedTrue = radioBtns[0].checked;
                var checkedPoss = len === 3 && radioBtns[1].checked;
                var checkedFalse = radioBtns[len-1].checked;
                var notExpTrue = !(expAns.localeCompare("true") === 0 ||
                        (altAns && altAns.localeCompare("true") === 0));
                var notExpFalse = !(expAns.localeCompare("false") === 0 ||
                         (altAns && altAns.localeCompare("false") === 0));
                var notExpPoss = !(expAns.localeCompare("possible") === 0 ||
                        (altAns && altAns.localeCompare("possible") === 0));
                //doc.getElementById("statusBox" + x).innerHTML = "q" + i + " exists notExpTrue = " + notExpTrue + " notExpFalse = " + notExpFalse + " notExp Poss = " + notExpPoss + " checkedTrue = " + checkedTrue + " checkedPoss = " + checkedPoss + " checkedFalse = " + checkedFalse;
                //x = x + 1;
                if( !(checkedTrue || checkedPoss || checkedFalse) ) {
                    qi.style.color = "red";
                    upDateErrCount();
                } else if( checkedFalse && notExpFalse ) {  
                    qi.style.color = "red";
                    upDateErrCount();
                } else if( checkedTrue && notExpTrue ) { 
                    qi.style.color = "red";
                    upDateErrCount();
                } else if( checkedPoss && notExpPoss ) {
                    qi.style.color = "red";
                    upDateErrCount();
                }
            }
        }
        chkBtn.value = "Next Problem";
    } else {
        startAgain();
    }
}
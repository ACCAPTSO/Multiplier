/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// iMouseDown represents the current mouse button state: up or down 
	/*
	lMouseState represents the previous mouse button state so that we can
	check for button clicks and button releases:
	if(iMouseDown && !lMouseState) // button just clicked!
	if(!iMouseDown && lMouseState) // button just released!
	*/ 
var dragHelper  = new Array();
var operands = new Array();
var dragging = false;
var dragBox = null; // this is the dragHelper clicked on
var dBoxWidth = 0;
var boxHeight = 0;
var yClick = null;
var xOffs = 0;
var cStrtY = 0;
var cHgtY =  0;
var targPos = 0;
var whatTarg = 0;
        
var mouseOffset = null; 
var iMouseDown  = false; 
var lMouseState = false; 
var curTarget   = null; 
var lastTarget  = null; 
var activeCont = null; 
var x = 0;
function getMouseOffset(target, ev){ 
    ev = ev || window.event; 
    var docPosX    = target.style.left.match(/[0-9]+/); // left of target
    var docPosY    = target.style.top.match(/[0-9]+/); // top of target
    var mousePos  = mouseCoords(ev);
    return {x:mousePos.x - docPosX, y:mousePos.y - docPosY}; 
} 
function getPosition(e){ 
    var left = 0; 
    var top  = 0; 
    while (e.offsetParent){ 
        left += e.offsetLeft; 
	top  += e.offsetTop; 
        e     = e.offsetParent; 
    } 
    left += e.offsetLeft; 
    top  += e.offsetTop; 
    return {x:Number(left), y:Number(top)}; 
}
function mouseCoords(ev){ 
    var doc = document;
    if(ev.pageX || ev.pageY){ 
	return {x:ev.pageX, y:ev.pageY}; 
    } 
    return { 
	x:Number(ev.clientX) + Number(doc.body.scrollLeft) - Number(doc.body.clientLeft), 
	y:Number(ev.clientY) + Number(doc.body.scrollTop)  - Number(doc.body.clientTop)
    }; 
} 
        /*
	function getPosition(e){ 
            var rect = e.getBoundingClientRect();
	    var left = rect.left; 
	    var top  = rect.top; 
	    return {x:Number(left), y:Number(top)}; 
	} */
function mouseCoords(ev){ 
    var doc = document;
    if(ev.pageX || ev.pageY){ 
	return {x:ev.pageX, y:ev.pageY}; 
    } 
    return { 
	x:Number(ev.clientX) + Number(doc.body.scrollLeft) - Number(doc.body.clientLeft), 
	y:Number(ev.clientY) + Number(doc.body.scrollTop)  - Number(doc.body.clientTop)
    }; 
}  	
function mouseMove(ev){ 
    ev         = ev || window.event; 
    var mousePos = mouseCoords(ev);
            
    if( dragging ){ 
        //var doc = document;
        //for( var j = 0; j < 18; j++ ) {
            //doc.getElementById("statusBox" + j).innerHTML = "";
        //}
        //var x = 0;
        var dBox = dragBox;        
        var tPos = targPos;
        var yCk = yClick;
        var strtY = cStrtY;
	// if the user is just starting to drag the element 
	if(iMouseDown && !lMouseState){ 
            mouseOffset   = getMouseOffset(dBox, ev); 
            var squares = dBox.childNodes;
            for( var i = 0; i < squares.length; i++ ) {
                if( squares[i].nodeType === 1 ) {
                    squares[i].style.color = "red";
                }
            }
	} 
        var leftH = mousePos.x - mouseOffset.x; 
        var xPos = leftH + xOffs;
	dBox.style.left = leftH + "px";
        
        //doc.getElementById("statusBox" + x).innerHTML = "tPos = " + tPos + " xPos = " + xPos + " strtY = " + strtY + " cHgtY = " + cHgtY + " yCk = " + yCk;
        //x = x + 1;
	if(((tPos - 10) < xPos) && (strtY < yCk) && ((tPos + 10)  > xPos) && ((strtY + cHgtY) > yCk)){ 
            var squares = dBox.childNodes;
            dBox.style.backgroundColor = "black";
            for( var i = 0; i < squares.length; i++ ) {
                if( squares[i].nodeType === 1 ) {
                    squares[i].style.color = "black";
                }
            }
	    activeCont = operands[whatTarg];  
        } else {
            var squares = dBox.childNodes;
            dBox.style.backgroundColor = "red";
            for( var i = 0; i < squares.length; i++ ) {
                if( squares[i].nodeType === 1 ) {
                    squares[i].style.color = "red";
                }
            }
	    activeCont = null;
        }
    } 
    // track the current mouse state so we can compare against it next time 
    lMouseState = iMouseDown; 
    // this helps prevent items on the page from being highlighted while dragging 
    return false; 
} 
function mouseUp(ev){ 
    var dBox = dragBox;
    if(dBox){ 
        //var mousePos = mouseCoords(ev);
        // Our target object is in one of our containers.  Check to see where our div belongs 
	if(activeCont){ 
            //document.getElementById("statusBox" + x).innerHTML = "mouse is up targPos = " + targPos + " xOffs = " + xOffs;
            //x = x + 1;
            var leftPos = targPos - Number(dBox.getAttribute('dpOffs')); ;
	    dBox.style.left = leftPos + "px";
            checklineup();
        } 
    } 
    dragBox  = null; 
    iMouseDown = false; 
    dragging = false;
    xOffs = 0;
} 
function mouseDown(ev){ 
    ev = ev || window.event; 
    iMouseDown = true; 
    if( ( document.getElementById('linedUp').value === "true") || lastTarget){ 
	return false; 
    } 

    var mousePos = mouseCoords(ev);
    var dHelper = dragHelper;
    for( var i = 0; i < dHelper.length; ++i ) {
        var top = Number(dHelper[i].style.top.match(/[0-9]+/)); 
        var bottom = top + boxHeight;
        var left = Number(dHelper[i].style.left.match(/[0-9]+/));
        var right = left + 
                    Number(getComputedStyle(dHelper[i]).width.match(/[0-9]+/));
        if( top < mousePos.y && mousePos.y < bottom &&
                   left < mousePos.x && mousePos.x < right ) {
            dragBox = dHelper[i];
            dragging = true;
            var yCk = top + 1;
            yClick = yCk;
            xOffs = Number(dHelper[i].getAttribute('dpOffs')); 
            var ops = operands;
            var opslength = ops.length;
            for(var i=0; i < opslength; ++i){ 
                var o = ops[i];
                var strtY = Number(o.getAttribute('startTop'));
                var hgtY =  Number(o.getAttribute('startHeight'));
                if( (strtY < yCk) && ((strtY + hgtY) > yCk)){ 
                    targPos = Number(o.getAttribute('targPos'));
                    whatTarg = i;
                    cStrtY = strtY;
                    cHgtY = hgtY;
                    //document.getElementById("statusBox" + x).innerHTML = "mouse down on target " + i;
                    //x = x + 1;
                    break;
                }    
            }
            break;
        }
    }
} 
function checklineup() {
    var doc = document;
    if( doc.getElementById('linedUp').value === "false") {
        var ops = operands;
        var opslength = ops.length;
        var opDpPos = Number(ops[0].getAttribute('targPos')); // same for all operands
        var allLinedUp = true;
        var dHelper = dragHelper;
        // there may be more helpers than operands, only check the ones that
        // have corresponding operands
        for( var idx = 0; idx < opslength; idx++ ) { 
            var dHelperIdx = dHelper[idx];
            var dhOffs = Number(dHelperIdx.getAttribute('dpOffs'));
            var hpDpPos = getPosition(dHelperIdx).x + dhOffs; 
            var squares = dHelperIdx.childNodes;
            var tol = 3;
            if( opDpPos - tol < hpDpPos && hpDpPos < opDpPos + tol ) {
                if( opDpPos !== hpDpPos ) { // line them up if not exact
                    var leftPos = opDpPos - dhOffs;
                    dHelperIdx.style.left = leftPos + "px";
                }
                dHelperIdx.style.backgroundColor = "#bcbebe";
                for( var i = 0; i < squares.length; i++ ) {
                    if( squares[i].nodeType === 1 ) {
                        squares[i].style.color = "black";
                    }
                }
            } else {
                dHelperIdx.style.backgroundColor = "red";
                allLinedUp = false;
                for( var i = 0; i < squares.length; i++ ) {
                    if( squares[i].nodeType === 1 ) {
                        squares[i].style.color = "red";
                    }
                }
            }
        }
        if( allLinedUp ) {
            doc.getElementById('linedUp').value = "true";
            doc.getElementById('msg').innerHTML = "";
            setFocus();
        } else {
            doc.getElementById("msg").innerHTML = 
                                   "Drag red box(es) to line up decimal points";
        }
    }
}
       
document.onmousemove = mouseMove; 
document.onmousedown = mouseDown;
document.onmouseup   = mouseUp; 
window.onload = function(){ 
    var doc = document;
    //for( var j = 0; j < 18; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    if( doc.getElementById('linedUp').value === "true") {
        setFocus();
    } else {
        // hide the original operands
        var opBoxes = doc.getElementsByClassName('t1');
        var getStyle = getComputedStyle;
        for( var idx = 0; idx < opBoxes.length; idx++ ) {
            opBoxes[idx].style.color = getStyle(opBoxes[idx]).backgroundColor;
        }
        var dpBoxes = doc.getElementsByClassName('t2');
        for( var idx = 0; idx < dpBoxes.length; idx++ ) {
            dpBoxes[idx].style.color = getStyle(dpBoxes[idx]).backgroundColor;
        }
        var ops = doc.getElementsByClassName('oprand');
        var opslength = ops.length;
        var dHelper  = doc.getElementsByClassName('DragBox');
        dBoxWidth = getPosition(dpBoxes[1]).x - getPosition(opBoxes[0]).x;
        boxHeight = Number(getStyle(opBoxes[0]).height.match(/[0-9]+/));
        for( var idx = 0; idx < opslength; idx++ ) {
            var dHelperIdx = dHelper[idx];
            var opsIdx = ops[idx];
            //allLinedup = false;
            var nodeNum = 0;
            var length = 0;
            var name = "";
            var number = 0;
            var numSquares = 0;
            var whatValue = new Array();
            var whatName = new Array();
            var whatFun = new Array();
            for( nodeNum = 0; nodeNum < opsIdx.childNodes.length; nodeNum++ ) { 
                var opNode = opsIdx.childNodes[nodeNum];
                if( opNode.nodeType === 1 ) {
                    // count table squares
                    numSquares += 1;  
                    // copy the operand values into array 'whatValue'
                    if( opNode.childNodes[0] ) {
                        whatValue[length] = opNode.childNodes[0].nodeValue;
                        name = opNode.getAttribute('name');
                        // node with copy of op13 will be named dH13
                        if( name ) {
                            var nameMatch = name.match(/op/);
                            // for some javascript reason this can't
                            // be done in the outer if
                            if( nameMatch ) { 
                                number = name.match(/[0-9]+/);
                                whatName[length] = "dH" + number;
                                whatFun[length] =
                                    opNode.getAttribute('onclick');
                                    length += 1;
                            }
                        }
                        // take note of the location of the decimal point
                        // of the original operand so you can match it up
                        // with the helper
                        if( whatValue[length] === "." ) {
                            var targPos = getPosition(opNode).x;
                            opsIdx.setAttribute('targPos', targPos);
                            length += 1;
                        }
                    }    
                }
            }
            var dragNum = 0;
            var blankNum = 0;
            var noDpYet = true;
            var lsbNode = null;
            for( nodeNum = 0; nodeNum < dHelperIdx.childNodes.length;  nodeNum++ ) {
                var hNode = dHelperIdx.childNodes[nodeNum];
                if( hNode.nodeType === 1 ) {
                    // mark leading blanks for deletion
                    if( blankNum < numSquares - 2*(length-1) + 1 ) {
                        hNode.setAttribute('marked', 1 );
                            
                    // copy over digits and decimal point
                    } else {
                        var digVal = whatValue[dragNum];
                        var className = hNode.className;
                        if( className === "t2" ) {
                            if( digVal === "." ) {
                                hNode.childNodes[0].nodeValue = digVal;
                                //dpNode = hNode;
                                dragNum += 1;
                                noDpYet = false;
                            } else {
                                hNode.childNodes[0].nodeValue = "";
                            }
                        } else if( className === "t1" ) {
                            hNode.childNodes[0].nodeValue = digVal;
                            hNode.setAttribute('name',whatName[dragNum]);
                            hNode.setAttribute('onclick',whatFun[dragNum]);
                            dragNum += 1;
                            if( noDpYet ) {
                                lsbNode = hNode;
                            }
                        }   
                    }
                    blankNum += 1;
                }
            }
            for( nodeNum = 0; nodeNum < dHelperIdx.childNodes.length; ) {
                var hNode = dHelperIdx.childNodes[nodeNum];
                if( hNode.nodeType === 1 ) {
                    var deleteThis = hNode.getAttribute('marked');
                    if( deleteThis ) {
                        dHelperIdx.removeChild(hNode);
                    } else {
                        nodeNum++;
                    }
                } else {
                    nodeNum++;
                }
            }
            dpOffs = getPosition(lsbNode).x + dBoxWidth - getPosition(dHelperIdx).x;
            //doc.getElementById("statusBox" + x).innerHTML = "got positions of lsbNode and dragHelper[" + idx + "]";
            //x = x + 1;
            var pos = getPosition( opsIdx );
            //doc.getElementById("statusBox" + x).innerHTML = "got positions of operands[" + idx + "]";
            //x = x + 1;
            dHelperIdx.style.top  = pos.y + "px"; 
            var leftPos = pos.x;
            leftPos = leftPos + Number(getStyle(ops[0]).width.match(/[0-9]+/));
            leftPos = leftPos - Number(getStyle(dHelperIdx).width.match(/[0-9]+/));
            dHelperIdx.style.left = leftPos + "px";
            dHelperIdx.style.height = boxHeight + "px";
            dHelperIdx.setAttribute('dpOffs', dpOffs); 

            // since drop targets don't move or expand, this only needs to be done once
            var strtHght = parseInt(opsIdx.offsetHeight);
	    opsIdx.setAttribute('startHeight', strtHght);  
	    opsIdx.setAttribute('startTop',    pos.y);
        }
        operands = ops;
        dragHelper = dHelper;
    }
    checklineup();
};













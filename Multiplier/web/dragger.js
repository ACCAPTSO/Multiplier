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
    return {x:left, y:top}; 
}
function mouseCoords(ev){ 
    var doc = document;
    if(ev.pageX || ev.pageY){ 
	return {x:ev.pageX, y:ev.pageY}; 
    } 
    return { 
	x:ev.clientX + doc.body.scrollLeft - doc.body.clientLeft, 
	y:ev.clientY + doc.body.scrollTop  - doc.body.clientTop
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
            var slength = squares.length;
            for( var i = 0; i < slength; i++ ) {
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
            slength = squares.length;
            for( var i = 0; i < slength; i++ ) {
                if( squares[i].nodeType === 1 ) {
                    squares[i].style.color = "black";
                }
            }
	    activeCont = operands[whatTarg];  
        } else {
            var squares = dBox.childNodes;
            dBox.style.backgroundColor = "red";
            slength = squares.length;
            for( var i = 0; i < slength; i++ ) {
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
            var leftPos = targPos - Number(dBox.getAttribute("dpOffs")); ;
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
    var Num = Number;
    if( document.getElementById("linedUp").value === "true" ){ 
	return false; 
    } 

    var mousePos = mouseCoords(ev);
    var dHelper = dragHelper;
    var dhlength = dHelper.length;
    for( var i = 0; i < dhlength; ++i ) {
        var top = Num(dHelper[i].style.top.match(/[0-9]+/)); 
        var bottom = top + boxHeight;
        var left = Num(dHelper[i].style.left.match(/[0-9]+/));
        var right = left + 
                    Num(getComputedStyle(dHelper[i]).width.match(/[0-9]+/));
        if( top < mousePos.y && mousePos.y < bottom &&
                   left < mousePos.x && mousePos.x < right ) {
            dragBox = dHelper[i];
            dragging = true;
            var yCk = top + 1;
            yClick = yCk;
            xOffs = Num(dHelper[i].getAttribute("dpOffs")); 
            var ops = operands;
            var opslength = ops.length;
            for(var i=0; i < opslength; ++i){ 
                var o = ops[i];
                var strtY = Num(o.getAttribute("startTop"));
                var hgtY =  Num(o.getAttribute("startHeight"));
                if( (strtY < yCk) && ((strtY + hgtY) > yCk)){ 
                    targPos = Num(o.getAttribute("targPos"));
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
    var Num = Number;
    if( doc.getElementById("linedUp").value === "false") {
        var ops = operands;
        var opslength = ops.length;
        var opDpPos = Num(ops[0].getAttribute("targPos")); // same for all operands
        var allLinedUp = true;
        var dHelper = dragHelper;
        // there may be more helpers than operands, only check the ones that
        // have corresponding operands
        for( var idx = 0; idx < opslength; idx++ ) { 
            var dHelperIdx = dHelper[idx];
            var dhOffs = Num(dHelperIdx.getAttribute("dpOffs"));
            var hpDpPos = getPosition(dHelperIdx).x + dhOffs; 
            var squares = dHelperIdx.childNodes;
            var slength = squares.length;
            var tol = 3;
            if( opDpPos - tol < hpDpPos && hpDpPos < opDpPos + tol ) {
                if( opDpPos !== hpDpPos ) { // line them up if not exact
                    var leftPos = opDpPos - dhOffs;
                    dHelperIdx.style.left = leftPos + "px";
                }
                dHelperIdx.style.backgroundColor = "#bcbebe";
                for( var i = 0; i < slength; i++ ) {
                    if( squares[i].nodeType === 1 ) {
                        squares[i].style.color = "black";
                    }
                }
            } else {
                dHelperIdx.style.backgroundColor = "red";
                allLinedUp = false;
                for( var i = 0; i < slength; i++ ) {
                    if( squares[i].nodeType === 1 ) {
                        squares[i].style.color = "red";
                    }
                }
            }
        }
        if( allLinedUp ) {
            doc.getElementById("linedUp").value = "true";
            var dispBo = doc.getElementById("dispBo");
            if( dispBo ) {
                dispBo.style.color = getComputedStyle(doc.getElementsByTagName("th")[0]).backgroundColor;
            }  
            doc.getElementById("msg").innerHTML = "";
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
      
    var Num = Number;
    var getStyle = getComputedStyle;
    //for( var j = 0; j < 18; j++ ) {
        //doc.getElementById("statusBox" + j).innerHTML = "";
    //}
    //var x = 0;
    if( doc.getElementById("linedUp").value === "true") {
        var dispBo = doc.getElementById("dispBo");
        if( dispBo ) {
            var header = doc.getElementsByTagName("th")[0];
            dispBo.style.color = getStyle(header).backgroundColor;
        }        
        setFocus();
    } else {
        // hide the original operands
        var opBoxes = doc.getElementsByClassName("t1");
        
        var maxIdx = opBoxes.length;
        for( var idx = 0; idx < maxIdx; idx++ ) {
            opBoxes[idx].style.color = getStyle(opBoxes[idx]).backgroundColor;
        }
        var dpBoxes = doc.getElementsByClassName("t2");
        maxIdx = dpBoxes.length;
        for( var idx = 0; idx < maxIdx; idx++ ) {
            dpBoxes[idx].style.color = getStyle(dpBoxes[idx]).backgroundColor;
        }
        var ops = doc.getElementsByClassName("oprand");
        var opslength = ops.length;
        var dHelper  = doc.getElementsByClassName("DragBox");
        var dBxWd = getPosition(dpBoxes[1]).x - getPosition(opBoxes[0]).x;
        var bxHgt = Num(getStyle(opBoxes[0]).height.match(/[0-9]+/));
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
            var maxNodeNum = opsIdx.childNodes.length;
            for( nodeNum = 0; nodeNum < maxNodeNum; nodeNum++ ) { 
                var opNode = opsIdx.childNodes[nodeNum];
                if( opNode.nodeType === 1 ) {
                    // count table squares
                    numSquares += 1;  
                    // copy the operand values into array 'whatValue'
                    if( opNode.childNodes[0] ) {
                        whatValue[length] = opNode.childNodes[0].nodeValue;
                        name = opNode.getAttribute("name");
                        // node with copy of op13 will be named dH13
                        if( name ) {
                            var nameMatch = name.match(/op/);
                            // for some javascript reason this can't
                            // be done in the outer if
                            if( nameMatch ) { 
                                number = name.match(/[0-9]+/);
                                whatName[length] = "dH" + number;
                                whatFun[length] =
                                    opNode.getAttribute("onclick");
                                    length += 1;
                            }
                        }
                        // take note of the location of the decimal point
                        // of the original operand so you can match it up
                        // with the helper
                        if( whatValue[length] === "." ) {
                            var targPos = getPosition(opNode).x;
                            opsIdx.setAttribute("targPos", targPos);
                            length += 1;
                        }
                    }    
                }
            }
            var dragNum = 0;
            var blankNum = 0;
            var noDpYet = true;
            var lsbNode = null;
            maxNodeNum = dHelperIdx.childNodes.length;
            for( nodeNum = 0; nodeNum < dHelperIdx.childNodes.length;  nodeNum++ ) {
                var hNode = dHelperIdx.childNodes[nodeNum];
                if( hNode.nodeType === 1 ) {
                    // mark leading blanks for deletion
                    if( blankNum < numSquares - 2*(length-1) + 1 ) {
                        hNode.setAttribute("marked", 1 );
                            
                    // copy over digits and decimal point
                    } else {
                        var digVal = whatValue[dragNum];
                        var className = hNode.className;
                        if( className === "t2" ) {
                            if( digVal === "." ) {
                                hNode.childNodes[0].nodeValue = digVal;
                                dragNum += 1;
                                noDpYet = false;
                            } else {
                                hNode.childNodes[0].nodeValue = "";
                            }
                        } else if( className === "t1" ) {
                            hNode.childNodes[0].nodeValue = digVal;
                            hNode.setAttribute("name",whatName[dragNum]);
                            hNode.setAttribute("onclick",whatFun[dragNum]);
                            dragNum += 1;
                            if( noDpYet ) {
                                lsbNode = hNode;
                            }
                        }   
                    }
                    blankNum += 1;
                }
            }
            // length changes in this loop so you can't compare to a copy of the 
            // original length to terminate the loop
            for( nodeNum = 0; nodeNum < dHelperIdx.childNodes.length; ) {
                var hNode = dHelperIdx.childNodes[nodeNum];
                if( hNode.nodeType === 1 ) {
                    var deleteThis = hNode.getAttribute("marked");
                    if( deleteThis ) {
                        dHelperIdx.removeChild(hNode);
                    } else {
                        nodeNum++;
                    }
                } else {
                    nodeNum++;
                }
            }
            var dpOffs = getPosition(lsbNode).x + dBxWd - getPosition(dHelperIdx).x;
            //doc.getElementById("statusBox" + x).innerHTML = "got positions of lsbNode and dragHelper[" + idx + "]";
            //x = x + 1;
            var pos = getPosition( opsIdx );
            //doc.getElementById("statusBox" + x).innerHTML = "got positions of operands[" + idx + "]";
            //x = x + 1;
            dHelperIdx.style.top  = pos.y + "px"; 
            var leftPos = pos.x;
            leftPos = leftPos + Num(getStyle(ops[0]).width.match(/[0-9]+/));
            leftPos = leftPos - Num(getStyle(dHelperIdx).width.match(/[0-9]+/));
            dHelperIdx.style.left = leftPos + "px";
            dHelperIdx.style.height = bxHgt + "px";
            dHelperIdx.setAttribute("dpOffs", dpOffs); 

            // since drop targets don't move or expand, this only needs to be done once
            var strtHght = parseInt(opsIdx.offsetHeight);
	    opsIdx.setAttribute("startHeight", strtHght);  
	    opsIdx.setAttribute("startTop",    pos.y);
        }
        operands = ops;
        dragHelper = dHelper;
        boxHeight = bxHgt;
    }
    checklineup();
};













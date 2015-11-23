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
        //var boxWidth = 0;
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
	function getMouseOffset(target, ev){ 
	    ev = ev || window.event; 
            var docPosX    = target.style.left.match(/[0-9]+/); // left of target
            var docPosY    = target.style.top.match(/[0-9]+/); // top of target
	    var mousePos  = mouseCoords(ev);
            //document.getElementById('statusBox1').innerHTML = "docPos.x = " + docPosX + " mousePos.x = " + mousePos.x + " docPos.y = " + docPosY + " mousePos.y = " + mousePos.y;
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
	    if(ev.pageX || ev.pageY){ 
	        return {x:ev.pageX, y:ev.pageY}; 
	    } 
	    return { 
	        x:Number(ev.clientX) + Number(document.body.scrollLeft) - Number(document.body.clientLeft), 
	        y:Number(ev.clientY) + Number(document.body.scrollTop)  - Number(document.body.clientTop)
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
	    if(ev.pageX || ev.pageY){ 
	        return {x:ev.pageX, y:ev.pageY}; 
	    } 
	    return { 
	        x:Number(ev.clientX) + Number(document.body.scrollLeft) - Number(document.body.clientLeft), 
	        y:Number(ev.clientY) + Number(document.body.scrollTop)  - Number(document.body.clientTop)
	    }; 
	} 
	
        function mouseMove(ev){ 
	    ev         = ev || window.event; 
            var mousePos = mouseCoords(ev);
            
            if( dragging ){ 
                
                //document.getElementById('statusBox2').innerHTML = "in mouseMove dragBox = " + dragBox;
                
	        // if the user is just starting to drag the element 
	        if(iMouseDown && !lMouseState){ 
                    mouseOffset   = getMouseOffset(dragBox, ev); 
 
                    var squares = dragBox.childNodes;
                    for( var i = 0; i < squares.length; i++ ) {
                        if( squares[i].nodeType == 1 ) {
                            squares[i].style.color = "red";
                        }
                    }
	        } 
                var leftH = mousePos.x - mouseOffset.x; 
                var xPos = leftH + xOffs;
	        dragBox.style.left = leftH + "px";

	        if(((targPos - 10) < xPos) && (cStrtY < yClick) && ((targPos + 10)  > xPos) && ((cStrtY + cHgtY) > yClick)){ 
                    var squares = dragBox.childNodes;
                    dragBox.style.backgroundColor = "black";
                    for( var i = 0; i < squares.length; i++ ) {
                        if( squares[i].nodeType == 1 ) {
                            squares[i].style.color = "black";
                        }
                    }
	            activeCont = operands[whatTarg];  
                } else {
                    var squares = dragBox.childNodes;
                    dragBox.style.backgroundColor = "red";
                    for( var i = 0; i < squares.length; i++ ) {
                        if( squares[i].nodeType == 1 ) {
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

            if(dragBox){ 
                var mousePos = mouseCoords(ev);
            	var xPos = mousePos.x - mouseOffset.x + (parseInt(dragBox.getAttribute('startWidth')) /2); 
	        var yPos = mousePos.y - mouseOffset.y + (parseInt(dragBox.getAttribute('startHeight'))/2);
            	// Our target object is in one of our containers.  Check to see where our div belongs 
	        if(activeCont){ 
                    //document.getElementById('statusBox1').innerHTML = "mouse is up targPos = " + targPos + " xOffs = " + xOffs;
                    var leftPos = targPos - Number(dragBox.getAttribute('dpOffs')); ;
	            dragBox.style.left = leftPos + "px";
	        } 
	    } 
	    dragBox  = null; 
	    iMouseDown = false; 
            dragging = false;
            xOffs = 0;
            checklineup();
	} 
	function mouseDown(ev){ 
            ev = ev || window.event; 
	    iMouseDown = true; 
	    if( ( document.getElementById('linedUp').value == "true")
                    || lastTarget){ 
	        return false; 
	    } 

            var mousePos = mouseCoords(ev);
            for( var i = 0; i < dragHelper.length; i++ ) {
                var targetI = dragHelper[i]; 
                var top = Number(dragHelper[i].style.top.match(/[0-9]+/)); 
                var bottom = top + boxHeight;
                var left = Number(dragHelper[i].style.left.match(/[0-9]+/));
                var right = left + 
                    Number(getComputedStyle(dragHelper[i]).width.match(/[0-9]+/));
                if( top < mousePos.y && mousePos.y < bottom &&
                   left < mousePos.x && mousePos.x < right ) {
                    dragBox = dragHelper[i];
                    dragging = true;
                    yClick = top + 1;
                    xOffs = Number(dragHelper[i].getAttribute('dpOffs')); 
                    for(var i=0; i<operands.length; i++){ 
                        o = operands[i];
                        cStrtY = Number(o.getAttribute('startTop'));
                        cHgtY =  Number(o.getAttribute('startHeight'));
                        if( (cStrtY < yClick) && ((cStrtY + cHgtY) > yClick)){ 
                            targPos = Number(o.getAttribute('targPos'));
                            whatTarg = i;
                            //document.getElementById('statusBox3').innerHTML = "i = " + i + " cStrtY = " + cStrtY + " cHgtY = " + cHgtY + " yClick = " + yClick + " targPos = " + targPos;
                            break;
                        }    
                    }
                    break;
                }
            }
	} 
        function checklineup() {
            if( document.getElementById('linedUp').value == "false") {
                var opDpPos = Number(operands[0].getAttribute('targPos')); // same for all operands
                var allLinedUp = true;
                // there may be more helpers than operands, only check the ones that
                // have corresponding operands
                for( idx = 0; idx < operands.length; idx++ ) { 
                    xOffs = Number(dragHelper[idx].getAttribute('dpOffs')); 
                    var hpDpPos = getPosition(dragHelper[idx]).x + xOffs;
                    //alert( "idx = " + idx + " opDpPos = " + opDpPos + " hpDpPos = " + hpDpPos);
                    var squares = dragHelper[idx].childNodes;
                    var tol = 3;
                    if( opDpPos - tol < hpDpPos && hpDpPos < opDpPos + tol ) {
                        if( opDpPos !== hpDpPos ) { // line them up if not exact
                            var leftPos = opDpPos - xOffs;
                            dragHelper[idx].style.left = leftPos + "px";
                        }
                        dragHelper[idx].style.backgroundColor = "#bcbebe";
                        for( var i = 0; i < squares.length; i++ ) {
                            if( squares[i].nodeType == 1 ) {
                                squares[i].style.color = "black";
                            }
                        }
                    } else {
                        dragHelper[idx].style.backgroundColor = "red";
                        allLinedUp = false;
                        for( var i = 0; i < squares.length; i++ ) {
                            if( squares[i].nodeType == 1 ) {
                                squares[i].style.color = "red";
                            }
                        }
                    }
                }
                if( allLinedUp ) {
                    document.getElementById('linedUp').value = "true";
                    document.getElementById('msg').innerHTML = "";
                    setFocus();
                } else {
                    document.getElementById("msg").innerHTML = 
                            "Drag red box(es) to line up decimal points";
                }
            }
        }
       
	document.onmousemove = mouseMove; 
	document.onmousedown = mouseDown;
	document.onmouseup   = mouseUp; 
	window.onload = function(){ 
            if( document.getElementById('linedUp').value == "true") {
                // if decimal points are lined up by default, get rid of the 
                // dragHelpers, you don't need them and they will get in the way
                dragHelper  = document.getElementsByClassName('DragBox');
                for( idx = 0; idx < dragHelper.length; idx++ ) {
                    for( nodeNum = 0; nodeNum < dragHelper[idx].childNodes.length; nodeNum++ ) {
                        dragHelper[idx].removeChild(dragHelper[idx].childNodes[nodeNum]);
                    }
                }
                setFocus();
            } else {
                //document.getElementById('statusBox1').innerHTML = "in onload";
                // hide the original operands
                var opBoxes = document.getElementsByClassName('t1');
                for( var idx = 0; idx < opBoxes.length; idx++ ) {
                    opBoxes[idx].style.color = getComputedStyle(opBoxes[idx]).backgroundColor;
                }
                var dpBoxes = document.getElementsByClassName('t2');
                for( var idx = 0; idx < dpBoxes.length; idx++ ) {
                    dpBoxes[idx].style.color = getComputedStyle(dpBoxes[idx]).backgroundColor;
                }
                operands = document.getElementsByClassName('oprand');
                dragHelper  = document.getElementsByClassName('DragBox');
                dBoxWidth = getPosition(dpBoxes[1]).x - getPosition(opBoxes[0]).x;
                boxHeight = Number(getComputedStyle(opBoxes[0]).height.match(/[0-9]+/));
                for( var idx = 0; idx < operands.length; idx++ ) {
                    allLinedup = false;
                    var nodeNum = 0;
                    var length = 0;
                    var name = "";
                    var number = 0;
                    var numSquares = 0;
                    var whatValue = new Array();
                    var whatName = new Array();
                    var whatFun = new Array();
                    var dpTarg = 0;
                    for( nodeNum = 0; nodeNum < operands[idx].childNodes.length; nodeNum++ ) {
                        
                        if( operands[idx].childNodes[nodeNum].nodeType == 1 ) {
                            // count table squares
                            numSquares += 1;  
                            // copy the operand values into array 'whatValue'
                            if( operands[idx].childNodes[nodeNum].childNodes[0] ) {
                                whatValue[length] = operands[idx].childNodes[nodeNum].childNodes[0].nodeValue;
                                name = operands[idx].childNodes[nodeNum].getAttribute('name');
                                // node with copy of op13 will be named dH13
                                if( name ) {
                                    var nameMatch = name.match(/op/);
                                    // for some javascript reason this can't
                                    // be done in the outer if
                                    if( nameMatch ) { 
                                        number = name.match(/[0-9]+/);
                                        whatName[length] = "dH" + number;
                                        whatFun[length] =
                                            operands[idx].childNodes[nodeNum].getAttribute('onclick');
                                        length += 1;
                                    }
                                }
                                // take note of the location of the decimal point
                                // of the original operand so you can match it up
                                // with the helper
                                if( whatValue[length] == "." ) {
                                    var targPos = getPosition(operands[idx].childNodes[nodeNum]).x;
                                    operands[idx].setAttribute('targPos', targPos);
                                    length += 1;
                                }
                            }    
                        }
                    }
                    var dragNum = 0;
                    var blankNum = 0;
                    var noDpYet = true;
                    var lsbNode = null;
                    for( nodeNum = 0; nodeNum < dragHelper[idx].childNodes.length;  nodeNum++ ) {
                        if( dragHelper[idx].childNodes[nodeNum].nodeType == 1 ) {
                            // mark leading blanks for deletion
                            if( blankNum < numSquares - 2*(length-1) + 1 ) {
                                dragHelper[idx].childNodes[nodeNum].setAttribute('marked', 1 );
                            
                            // copy over digits and decimal point
                            } else {
                                var digVal = whatValue[dragNum];
                                var className = dragHelper[idx].childNodes[nodeNum].className;
                                if( className == "t2" ) {
                                    if( digVal == "." ) {
                                        dragHelper[idx].childNodes[nodeNum].childNodes[0].nodeValue = digVal;
                                        dpNode = dragHelper[idx].childNodes[nodeNum];
                                        dragNum += 1;
                                        noDpYet = false;
                                    } else {
                                            dragHelper[idx].childNodes[nodeNum].childNodes[0].nodeValue = "";
                                    }
                                } else if( className == "t1" ) {
                                    dragHelper[idx].childNodes[nodeNum].childNodes[0].nodeValue = digVal;
                                    dragHelper[idx].childNodes[nodeNum].setAttribute('name',whatName[dragNum]);
                                    dragHelper[idx].childNodes[nodeNum].setAttribute('onclick',whatFun[dragNum]);
                                    dragNum += 1;
                                    if( noDpYet ) {
                                        lsbNode = dragHelper[idx].childNodes[nodeNum];
                                    }
                                }   
                            }
                            blankNum += 1;
                        }
                    }
                    for( nodeNum = 0; nodeNum < dragHelper[idx].childNodes.length; ) {
                        if( dragHelper[idx].childNodes[nodeNum].nodeType == 1 ) {
                            var deleteThis = dragHelper[idx].childNodes[nodeNum].getAttribute('marked');
                            if( deleteThis ) {
                                dragHelper[idx].removeChild(dragHelper[idx].childNodes[nodeNum]);
                            } else {
                                nodeNum++;
                            }
                        } else {
                            nodeNum++;
                        }
                    }
                    dpOffs = getPosition(lsbNode).x + dBoxWidth - getPosition(dragHelper[idx]).x
                    var pos = getPosition( operands[idx] ); 
                    dragHelper[idx].style.top  = pos.y + "px"; 
                    var leftPos = pos.x;
                    leftPos = leftPos + Number(getComputedStyle(operands[0]).width.match(/[0-9]+/));
                    leftPos = leftPos - Number(getComputedStyle(dragHelper[idx]).width.match(/[0-9]+/));
                    dragHelper[idx].style.left = leftPos + "px";
                    dragHelper[idx].style.height = boxHeight + "px";
                    dragHelper[idx].setAttribute('dpOffs', dpOffs); 

                    // since drop targets don't move or expand, this only needs to be done once
                    var pos = getPosition(operands[idx]);
                    var strtHght = parseInt(operands[idx].offsetHeight);
	            operands[idx].setAttribute('startHeight', strtHght);  
	            operands[idx].setAttribute('startTop',    pos.y);
                }
            }
            checklineup();
	} 













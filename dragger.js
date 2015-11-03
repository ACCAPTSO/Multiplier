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
        var boxWidth = 0;
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
	//var dragObject  = null; 
	// Demo 0 variables 
	//var DragDrops   = []; 
	var curTarget   = null; 
	var lastTarget  = null; 
	//var dragHelper  = null; 
	//var tempDiv     = null; 
	//var rootParent  = null; 
	//var rootSibling = null; 
        //var offsetWidth = "1120";
        //var offsetHeight = "10";
        var activeCont = null; 
	//Number.prototype.NaN0=function(){return isNaN(this)?0:this;}  
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
	
        function mouseMove(ev){ 
	    ev         = ev || window.event; 
            var mousePos = mouseCoords(ev);
            
            if( dragging ){ 
                
                //document.getElementById('statusBox2').innerHTML = "in mouseMove dragBox = " + dragBox;
                
	        // if the user is just starting to drag the element 
	        if(iMouseDown && !lMouseState){ 
                    mouseOffset   = getMouseOffset(dragBox, ev); 

	            // set the class on our helper DIV if necessary 
	            //var dragClass = dragBox.getAttribute('dragClass'); 
	            /*
	            Record the current position of all drag/drop targets related
	            to the element.  We do this here so that we do not have to do
	            it on the general mouse move event which fires when the mouse
	            moves even 1 pixel.  If we don't do this here the script
	            would run much slower.
	            */ 
	            //var dragConts = DragDrops[dragObj]; 
	            /*
	            first record the width/height of our drag item.  Then hide it since
	            it is going to (potentially) be moved out of its parent.
	            */ 
	            //dragBox.setAttribute('startWidth',  parseInt(dragBox.offsetWidth)); 
	            //dragBox.setAttribute('startHeight', parseInt(dragBox.offsetHeight)); 
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
	        //var dragConts  = DragDrops[dragBox.getAttribute('DragObj')]; 

                //document.getElementById('statusBox2').innerHTML = "i = " + i + " cStrtY = " + cStrtY + " cHgtY = " + cHgtY + " yClick = " + yClick + " xPos = " + xPos + " targPos = " + targPos;
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
                    //document.getElementById('statusBox1').innerHTML = "mouse is up dragBox = " + " targPos = " + targPos + " dpOffs = " + dpOffs;
                    var leftPos = targPos - xOffs;
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
                if( top < mousePos.y && mousePos.y < bottom ) {
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
                var opDpPos = operands[0].getAttribute('targPos'); // same for all operands
                var allLinedUp = true;
                // there may be more helpers than operands, only check the ones that
                // have corresponding operands
                for( idx = 0; idx < operands.length; idx++ ) { 
                    var hpDpPos = getPosition(dragHelper[idx]).x + Number(dragHelper[idx].getAttribute('dpOffs'));
                    //alert( "idx = " + idx + " opDpPos = " + opDpPos + " hpDpPos = " + hpDpPos);
                    var squares = dragHelper[idx].childNodes;
                    if( hpDpPos != opDpPos ) {
                        dragHelper[idx].style.backgroundColor = "red";
                        allLinedUp = false;
                        for( var i = 0; i < squares.length; i++ ) {
                            if( squares[i].nodeType == 1 ) {
                                squares[i].style.color = "red";
                            }
                        }
                    } else {
                        dragHelper[idx].style.backgroundColor = "#bcbebe";
                        for( var i = 0; i < squares.length; i++ ) {
                            if( squares[i].nodeType == 1 ) {
                                squares[i].style.color = "black";
                            }
                        }
                    }
                }
                if( allLinedUp ) {
                    document.getElementById('linedUp').value = "true";
                    document.getElementById("lineRmdr").style.color=getComputedStyle(document.getElementById("lineRmdr")).backgroundColor;
                    setFocus();
                } else {
                    document.getElementById("lineRmdr").style.color = "red";
                }
            }
        }
       
	document.onmousemove = mouseMove; 
	document.onmousedown = mouseDown;
	document.onmouseup   = mouseUp; 
	window.onload = function(){ 
            if( document.getElementById('linedUp').value == "true") {
                setFocus();
            } else {
                //document.getElementById('statusBox1').innerHTML = "in onload";
                // hide the original operands
                var opBoxes = document.getElementsByClassName('t1');
                for( var idx = 0; idx < opBoxes.length; idx++ ) {
                    opBoxes[idx].style.color = getComputedStyle(opBoxes[idx]).backgroundColor;
                    //opBoxes[idx].style.color = "blue";
                }
                var dpBoxes = document.getElementsByClassName('t2');
                for( var idx = 0; idx < dpBoxes.length; idx++ ) {
                    dpBoxes[idx].style.color = getComputedStyle(dpBoxes[idx]).backgroundColor;
                    //dpBoxes[idx].style.color = "blue";
                }
                operands = document.getElementsByClassName('oprand');
                dragHelper  = document.getElementsByClassName('DragBox');
                dBoxWidth = getPosition(dpBoxes[1]).x - getPosition(opBoxes[0]).x;
                boxWidth = (getPosition(dpBoxes[1]).x - getPosition(dpBoxes[0]).x)/2;
                boxHeight = Number(getComputedStyle(opBoxes[0]).height.match(/[0-9]+/));
                for( var idx = 0; idx < operands.length; idx++ ) {
                    allLinedup = false;
                    var nodeNum = 0;
                    var length = 0;
                    var name = "";
                    var numSquares = 0;
                    var whatValue = new Array();
                    var dpTarg = 0;
                    for( nodeNum = 0; nodeNum < operands[idx].childNodes.length; nodeNum++ ) {
                        
                        if( operands[idx].childNodes[nodeNum].nodeType == 1 ) {
                            // count table squares
                            numSquares += 1;  
                            if( operands[idx].childNodes[nodeNum].childNodes[0] ) {
                                whatValue[length] = operands[idx].childNodes[nodeNum].childNodes[0].nodeValue;
                                name = operands[idx].childNodes[nodeNum].getAttribute('name');                             
                                if( whatValue[length] == "." ) {
                                    var targPos = getPosition(operands[idx].childNodes[nodeNum]).x;
                                    operands[idx].setAttribute('targPos', targPos);
                                }
                                // only count the decimal points and the digits with a name
                                if( name || whatValue[length] != "Y" ) { 
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
                            if( blankNum < numSquares - 2*(length-1) + 1 ) {
                                dragHelper[idx].childNodes[nodeNum].setAttribute('marked', 1 );
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
	            dragHelper[idx].setAttribute('DragObj', 1); 
                    // this is cut and pasted, probably needs to be dropped
                    //var cDrag        = DragDrops.length; 
                    //DragDrops[cDrag] = []; 

                    var cObj = operands[idx];
                    //DragDrops[cDrag].push(cObj); 
                    //cObj.setAttribute('DropObj', cDrag); 
                    // since containers don't move or expand, this only needs to be done once
                    var pos = getPosition(cObj);
                    var strtHght = parseInt(cObj.offsetHeight);
	            cObj.setAttribute('startHeight', strtHght);  
	            cObj.setAttribute('startTop',    pos.y);
                    checklineup();
                }
            }
	} 













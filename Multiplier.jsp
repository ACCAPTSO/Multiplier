<%-- 
    Document   : Multiplier
    Created on : Oct 15, 2014, 7:22:00 AM<%-- 

    Author     : irene
--%>

<%@page import="process.*,javax.servlet.http.*, java.io.*,java.util.*" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--
this is a comment -the // is for javascript
//-->
<!-- Document Type Definition -don't muck with it //-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="EN">
    
<!-- This is the HEAD section //-->
<head>
<meta http-equiv="Content-type" content="test/html;charset=utf-8">
<title>MULTIPLIER</title>

<!-- the following tells where to get style information to specify how to
     format a table, a body a header etc. and define a class or id //-->
<link rel="stylesheet" href="Multiplier.css" type="text/css">


<script>
function startAgain() {
    document.getElementById("dpPos").setAttribute('value', 7 );
    chooseThis( 7 );
    var x = document.getElementsByTagName("input");
    //alert("in startAgain number of inputs is " + x.length)
    // set every box but the rst box blank
    var max = Number(document.getElementById('lastbox').value);
    for( i = 0; i < max; i++ ) {
        if(x[i].getAttribute('type')==='text')  {
            //alert("i = " + i); 
            //x[i].nodeValue="";
            //x[i].setAttribute('value','');
            x[i].value = '';
        }
    }
    var elem = document.getElementById("rst"); // set hidden button for server
    elem.setAttribute('value','Restart Now');  // to read in java
    //document.getElementById('whatbox').value = 0;
    //alert("ready?");
    document.getElementById('th-id2').submit();
    setFocus();
}
</script>
<script src="check_boxes.js"></script>
<script> 
// this script should imitate radio buttons, selecting only one at a time
function chooseThis( which_one ) { 
    var btns = document.getElementsByName('dec-pt');
    var totDec = Number(document.getElementById("btmDec").value) + Number(document.getElementById("topDec").value);
    //alert("in chooseThis btns.length = " + btns.length + " which_one = " + which_one);
    for( i = 0; i < btns.length; i++ ) {
        var att = "andsp" + i;
        //alert("attribute is " + att + " i = " + i + " innerHTML = " + btns[i].innerHTML + " name = " + btns[i].getAttribute("name") + " class = " + btns[i].getAttribute("class") + " nodeValue = " + btns[i].childNodes[0].nodeValue);
        if( i === which_one ) {
            btns[i].childNodes[0].nodeValue=".";
            btns[i].setAttribute( att,'.');
            var markedDec = 7 - i;
            //alert("totDec = " + totDec + " markedDec = " + markedDec);
            if( totDec === markedDec ) { 
                btns[i].style.color="black";
            } else {
                btns[i].style.color="red";
            }
            document.getElementById("dpPos").setAttribute('value', i );
        } else {
            btns[i].childNodes[0].nodeValue="_"; // can't click on a , perhaps you can hide it with color ? is there a min-width property?
            btns[i].setAttribute( att,'');
            btns[i].style.color="#FAF3E4";
        }
    }
            //alert("bdx = " + document.getElementById("bdx").value + " lastbox = " + document.getElementById("lastbox").value );

    if( totDec === 0 || ( which_one !== 7 && btns[which_one].style.color === "black") ||
        Number(document.getElementById("bdx").value) < Number(document.getElementById("lastbox").value - 1 ))  { 
        document.getElementById("decRmdr").style.color="#FAF3E4";
    } else {
        document.getElementById("decRmdr").style.color = "red";
    }
}
</script>
<!-- code to set the default input focus //-->
<script>
function setFocus() { // this part is javascript
    var x = document.getElementById("th-id2");
    var i = 10;
    var j = document.getElementById("whatbox").value;
    // alert("whatbox is "+j);
    i = Number(j);
    x.elements[i].focus(); // set focus to whatbox
    if( x !== document.getElementById("rst") ) {
        x.elements[i].value=""; // blank it out unless it is "restarted" box
    }
    //var w = document.getElementById("dpPos").value;
    //chooseThis( w );
}
</script>
<script type="text/javascript">
// this should disable the user being able to click and select textboxes
/* This script and many more are available free online at
The JavaScript Source :: http://www.javascriptsource.com
Created by: James Nisbet (morBandit) :: http://www.bandit.co.nz/ */      
//window.onload = function() {
//  document.onselectstart = function() {return false;} // ie
//  document.onmousedown = function() {return false;} // mozilla
//}
</script>
</head>
<!-- tell me button, set difficulty slider, random distribution, decimal points
is there anything to be done about blanks where user accidentally hits enter 
without entering anything? 
tie to database and track #consecutive right (days without accident)
#problems without help, problems per minute, difficulty level, cleanup 
add timed multiple choice questions, put error checking in javascript? try is on
a simpler program first, if you click the decimal point early it still prompts fixit,
clean out java error checking -->
<!-- This is what actually gets displayed on the page //-->
<body onload="setFocus();" onmousedown="javascript:return false;"
      onselctstart="javascript:return false;">

<!-- multi-checker.jsp (or  should it be a java class?) remains to be written
and is what will take the user's input and display it red if incorrect
//-->
<%
    // would be nice if I could just check what has just been entered
    // might operate faster
    // if i have mouse selection turned off, if someone accidently hits enter
    // it assumes 0 for that blank space and throws the rest of the calculations
    // off
    // if I use the actual values instead of what people entered, it will back
    // up when a subsequent wrong answer is entered, but it won't let me 
    // back up to the original blank
    // sometimes people want to carry in their head. is there a way to let them?
    // i would have to compare to actual values
    // i would have to check whatBx[bdx] and only ignore blanks if they are
    // carries
    String restarted = "Restart Now";
    String tmp = "";        // temporary storage for newly gotten 
                            // session attribute or request parameter
    final int SZ2_MX = 6;   // maximum answer size
    int colspan = 2*(SZ2_MX + 1);
    int[][] op;             // operands first index is what operand
                            // second index is what digit of that operand
    
    //String isChecked[];
    //isChecked = new String[SZ2_MX+1];
    
    int operand0 = 0;
    int operand1 = 0;

    int topOpDgts = 0; //SZ2_MX + 1 - 3;      // how many digits dows the top operand have  
    int btmOpDgts = 0; //SZ2_MX - topOpDgts;  // how many digits does the bottom operand have
    int topDp = 0;
    int btmDp = 0;
    //String dotclr = "green";
    
    int nmcarries = 0; //topOpDgts - 1;
    
    //int maxAndig = topOpDgts + 2;
    
    String att;             // temporary storage for an attribute name that you
                            // are about to get or set
    int kdx;
    int ldx;
    int mdx;
    
    int bdx = 0;            // box index used to track what box is selected
                            // if you leave a box blank and hit enter it 
                            // continues to the next fixit? doesn't track what
                            // what the answer should be
                            // can you pick up what the person selected?
                            // since I know what box it's on, can I skip
                            // checking the boxes that haven't changed?
    
    // array with input box order for a 3 digit number times a 2 digit number
    int[] whatBx = { 10,  3,  9,  2, 8,  7, 
                        14,  1, 13, 0, 12, 11, 
                        19, 18, 6, 17,  5, 16, 4, 15, 20, 20, 20, 20, 20, 
                        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                        20, 20, 20, 20, 20, 20 };
    
    int maxBx = 20;
                      
    String lastans = "";
    
    int[][] cmn;   // numeric version of multiplicative carry
    String[][] cms; //string version of multiplicative carry
    String[][] cmclr; // text color (red = wrong, 
                    // black = right) of multiplicative carry
    int cin = 0;    // temporary storage for carry in
    int ca_in = 0;  // previous cin (for adds)
    int max = 0;    // loop counter maximum
    
    // thought I was having threading issues so I gave up on oo
    // probably not the case, but this is faster  
    int[][] ain;        // intermediate answer numeric
    String[][] ais;     // intermediate answer string
    String[][] aiclr;   // intermediate answer text color
    
    int[] ann;      // final answer numeric
    String[] ans;   // final answer string
    String[] anclr; // final answer text color
    
    int[] can;      // additive carry numeric
    String[] cas;   // additive carry string
    String[] caclr; // additive color text  color
    
    int dpPos = SZ2_MX + 1; // has to be initiallized or gives compile error
    
    if(( tmp = request.getParameter("rstind")) != null) {
        restarted = tmp.toString();
    }
    
    if(( tmp = request.getParameter("dpPos")) != null ) {
        dpPos = (new Integer( tmp.toString() )).intValue();
    }
    //System.out.println("restarted = " + restarted );
    
    if( restarted.equals("Restart Now") ) {   
        
        
        // Math.random() generates x, 0<=x<1
        topOpDgts = (new Double(2+(SZ2_MX-3)*Math.random())).intValue();
        topDp = (new Double(topOpDgts*Math.random())).intValue();
        //topOpDgts = 3; // fixit 9.710 x 11 != 006.810
        //topDp = 0; // fixit 
        //System.out.println("topDp = " + topDp );
        //System.out.println("topOpDgts = " + topOpDgts );
        nmcarries = topOpDgts - 1;
        int maxBtmDgts = SZ2_MX-topOpDgts;
        if( topOpDgts < maxBtmDgts ) {
            maxBtmDgts = topOpDgts;
        }
        // don't want to overflow final answer fixit
        //btmOpDgts = (new Double((SZ2_MX-topOpDgts)*Math.random())).intValue();
        // don't want bottom op to be bigger than top op
        //btmOpDgts = (new  Double(1+(topOpDgts)*Math.random())).intValue();
        btmOpDgts = (new Double(1+(maxBtmDgts)*Math.random())).intValue();
        btmDp = (new Double(btmOpDgts*Math.random())).intValue();
        //btmOpDgts = 2;
        //btmDp = 0; // fixit
        //System.out.println("btmDp = " + btmDp );
        //System.out.println("generated btmOpDgts = " + btmOpDgts );
        op = new int[2][SZ2_MX];
        cms = new String[btmOpDgts][SZ2_MX];
        cmn = new int[btmOpDgts][SZ2_MX];
        cmclr = new String[btmOpDgts][SZ2_MX];
        can = new int[SZ2_MX];
        cas = new String[SZ2_MX];
        caclr = new String[SZ2_MX];
    
        //ain = new int[btmOpDgts][SZ2_MX+2];
        //ais = new String[btmOpDgts][SZ2_MX+2];
        //aiclr = new String[btmOpDgts][SZ2_MX+2];
        ain = new int[3][SZ2_MX+2];
        ais = new String[3][SZ2_MX+2];
        aiclr = new String[3][SZ2_MX+2];
        ann = new int[SZ2_MX+2];
        ans = new String[SZ2_MX+2];
        anclr = new String[SZ2_MX+2];

        restarted = "no";
        bdx = 0;
        
        //for( int idx = 0; idx <= SZ2_MX; idx++ ) {
        //    isChecked[idx] = "S";
        //}

        for( int idx = 0; idx < SZ2_MX; idx++ ) {
            op[0][idx] = 9;
            op[1][idx] = 9;   
            for( int jdx = 0; jdx < btmOpDgts; jdx++ ) { 
                cms[jdx][idx] = "";
                cmn[jdx][idx] = 0;
                cmclr[jdx][idx] = "red";
            }
            can[idx] = 0;
            cas[idx] = "";
            caclr[idx] = "red";
        }
        max = SZ2_MX + 2;
        for ( int idx = 0; idx < max; idx++ ) {
            ann[idx] = 0;
            ans[idx] = "";
            anclr[idx] = "red";
            for ( int jdx = 0; jdx < 3; jdx++ ) {
                ain[jdx][idx] = 0;
                ais[jdx][idx] = "";
                aiclr[jdx][idx] = "red";
            }
        }

        // Math.random() generates x, 0<=x<1
        //topOpDgts = (new Double(1+SZ2_MX*Math.random())).intValue() - 3;
        //btmOpDgts = (new Double((SZ2_MX-topOpDgts)*Math.random())).intValue();
        session.setAttribute("topOpDgts", topOpDgts);
        for (kdx = 0; kdx < topOpDgts - 1; kdx++){
            op[1][kdx] = (new Double(10*Math.random())).intValue();
            operand1 = operand1 + op[1][kdx]*(int)(Math.pow(10.,(double)kdx));
            att = new String("op2" + kdx);
            session.setAttribute(att, op[1][kdx]);
        }
        // msb cannot be 0
        op[1][kdx] = (new Double(1+9*Math.random())).intValue();
        //op[1][kdx] = 1;
        operand1 = operand1 + op[1][kdx]*(int)(Math.pow(10.,(double)kdx));

        att = new String("op2" + kdx);
        session.setAttribute(att, op[1][kdx]);
        session.setAttribute("topDp", topDp);
        //[1][3] = 9; // fixit
        //op[1][2] = 4;
        //op[1][1] = 5;
        //op[1][0] = 4;
        //operand1 = 454; // fixit
        //session.setAttribute("op23", op[1][3]);
        //session.setAttribute("op22", op[1][2]);
        //session.setAttribute("op21", op[1][1]);
        //session.setAttribute("op20", op[1][0]); // fixit
        session.setAttribute("btmOpDgts", btmOpDgts);
        //op[0][0] = 0;
        //session.setAttribute("op10", op[0][0]);
        //for (kdx = 1; kdx < btmOpDgts - 1; kdx++){
        for( kdx = 0; kdx < SZ2_MX; kdx++ ) {
            if( kdx < btmOpDgts - 1 ) {
                op[0][kdx] = (new Double(10*Math.random())).intValue();
                operand0 = operand0 + op[0][kdx]*(int)(Math.pow(10.,(double)kdx));
                att = new String("op1" + kdx);
                session.setAttribute(att, op[0][kdx]);
            } else if( kdx == btmOpDgts - 1 ) {
                // msb cannot be 0
                op[0][kdx] = (new Double(1+9*Math.random())).intValue();
                //op[0][kdx] = 1;
                operand0 = operand0 + op[0][kdx]*(int)(Math.pow(10.,(double)kdx));
                att = new String("op1" + kdx);
                session.setAttribute(att, op[0][kdx]);
            } else {
                op[0][kdx] = 0;
            }
        }

        //op[0][1] = 6; // fixit
        //op[0][0] = 1;
        //operand0 = 61; // fixit
        //session.setAttribute("op11", op[0][1]);
        //session.setAttribute("op10", op[0][0]); // fixit
        session.setAttribute("btmDp", btmDp);
        
    } else {
        maxBx = (new Integer(session.getAttribute("maxBx").toString())).intValue();
        bdx = (new Integer(session.getAttribute("bdx").toString())).intValue();
        if( bdx < maxBx )
            bdx = bdx + 1;
        
        topOpDgts = (new Integer(session.getAttribute("topOpDgts").toString())).intValue();
        //System.out.println("retrieved topOpDgts = " + topOpDgts );
        btmOpDgts = (new Integer(session.getAttribute("btmOpDgts").toString())).intValue();
        //System.out.println("retrieved btmOpDgts = " + btmOpDgts );
        topDp = (new Integer(session.getAttribute("topDp").toString())).intValue();
        btmDp = (new Integer(session.getAttribute("btmDp").toString())).intValue();
        op = new int[2][SZ2_MX];
        cms = new String[btmOpDgts][SZ2_MX];
        cmn = new int[btmOpDgts][SZ2_MX];
        cmclr = new String[btmOpDgts][SZ2_MX];
        can = new int[SZ2_MX];
        cas = new String[SZ2_MX];
        caclr = new String[SZ2_MX];
    
        ain = new int[3][SZ2_MX+2];
        ais = new String[3][SZ2_MX+2];
        aiclr = new String[3][SZ2_MX+2];
        ann = new int[SZ2_MX+2];
        ans = new String[SZ2_MX+2];
        anclr = new String[SZ2_MX+2];
        for( int idx = 0; idx < topOpDgts; idx++ ){
            att = new String("op2" + idx);
            op[1][idx] = (new Integer(session.getAttribute(att).toString())).intValue(); 
            operand1 = operand1 + op[1][idx]*(int)(Math.pow(10.,(double)idx));
        }
        
        for( int idx = 0; idx < SZ2_MX; idx++ ){
            if( idx < btmOpDgts ) {
                att = new String("op1" + idx);
                op[0][idx] = (new Integer(session.getAttribute(att).toString())).intValue(); 
                operand0 = operand0 + op[0][idx]*(int)(Math.pow(10.,(double)idx));
            } else {
                op[0][idx] = 0;
            }
        }
        nmcarries = topOpDgts - 1;
    }
    session.setAttribute("bdx", bdx);
    
    int maxAdig[] = { 0, 0, 0 };
    boolean no1st = op[0][0] == 0;
    // maximum digits in top/first intermediate answer
    if( op[0][0] != 0 && operand1 != 0 ) {
        maxAdig[0] = 1 + (int)(Math.log10((double)(op[0][0]*operand1)));
    }
    // maximum digits in bottom/second intermediate answer
    if( op[0][1] != 0 && operand1 != 0 ) {
        maxAdig[1] = 1 + (int)(Math.log10((double)(op[0][1]*operand1)));
    }
    if( op[0][2] != 0 && operand1 != 0 ) {
        maxAdig[2] = 1 + (int)(Math.log10((double)(op[0][2]*operand1)));
    }
    // maximum digits in final answer
    int maxAndig = 1 + (int)(Math.log10((double)(operand0*operand1)));
    //int nacarries = no1st? 0 : maxAdig[1] - 1;
    int nacarries = 0;
    
    // if there are at least two intermediate numbers to add
    if( maxAdig[0] != 0 && maxAdig[1] != 0 || maxAdig[0] != 0 && maxAdig[2] != 0
            || maxAdig[1] != 0 && maxAdig[2] != 0 ) {
        nacarries += (maxAdig[2] + 1 > maxAdig[1]?  maxAdig[2]: 
                maxAdig[1] + 1 > maxAdig[0]? maxAdig[1]-1: maxAdig[0] - 2 );
        //nacarries = maxAndig - 2;
    }
    
    int spacesb4cm = SZ2_MX + 1 - topOpDgts;
    int spacesb4btmOp = SZ2_MX - btmOpDgts; // "x" takes up one space
    // if they are both 2 less than SZ2_MX + 1, there is a space
    //int spacesb4ca = 0;
    int spacesb4ca = SZ2_MX - 1 - nacarries;
    int te = op[0][2] <= 1? 0 : nmcarries;
    int pe = te;
    pe += (op[0][1] <= 1? 0 : nmcarries);  // box after first multiplicative carry box for 2nd intermediate answer
    int em = pe;
    em += (op[0][0] <= 1? 0 : nmcarries); 
    //System.out.println("t, p, m = " + te + " " + pe + " " + em );
        
    int el = em + nacarries + maxAdig[0] - 1; // lsb of first/top intermediate answer
    int en = el + maxAdig[1]; // lsb of 2nd intermediate answer
    int es = en + maxAdig[2]; // lsb of 3rd intermediate answer
    int qu = es + maxAndig; // lsb of final answer
    int ar = em + nacarries + 1;  // box after first additive carry - no carries for first two digits added
    ldx = 0;
    //System.out.println("op1 = " + operand1 + " op0 = " + operand0);
    //System.out.println("nacarries = " + nacarries);
    //System.out.println("l,m,n,p,q, r, s, t = " + el + " " + em + " " + en + " " + pe + " " + qu + " " + ar + " " + es + " " + te);
    for( int idx = 0; idx < maxAdig[0]; idx++ ) {
        if( idx > 0 && idx < topOpDgts && op[0][0] > 1 ) {
            whatBx[ldx] = em - idx; // first multiplicative carry boxes
            ldx++;
        }
        whatBx[ldx] = el - idx; // first intermediate answer boxes
        ldx++;
    }
    if( btmOpDgts > 1 ) {
        for( int idx = 0; idx < maxAdig[1]; idx++ ) {
            if( idx > 0 && idx < topOpDgts && op[0][1] > 1 ) {
                whatBx[ldx] = pe - idx;
                ldx++;
            }
            whatBx[ldx] = en - idx;
            ldx++;
        }
        if( btmOpDgts > 2 ) {
            for( int idx = 0; idx < maxAdig[2]; idx++ ) {
                if( idx > 0 && idx < topOpDgts && op[0][2] > 1 ) {
                    whatBx[ldx] = te - idx;
                    ldx++;
                }
                whatBx[ldx] = es - idx;
                ldx++;
            }
        }
    }
    // make it skip carry if adding 454 + 27240 fixit -no good way to do this 999 + 99900 has carries all the way 
    if( btmOpDgts > 1 ) {
        for( int idx = 0; idx < maxAndig; idx++ ) {
            if( idx > 1 && (btmOpDgts == 2 && idx <= maxAdig[1] && maxAdig[0] != 0
                || btmOpDgts == 3 && idx <= maxAdig[2]+1 && (maxAdig[1] != 0 || maxAdig[0] != 0) )) {
                whatBx[ldx] = ar - idx; // additive carry
                ldx++;
            }
            whatBx[ldx] = qu - idx; // final answer
            ldx++;
        }
        whatBx[ldx] = qu + 1;
    } else {
        whatBx[ldx] = el + 1;
    }
    maxBx = ldx + 1;
    session.setAttribute("maxBx", maxBx);
    //System.out.print("whatBxes ");
    //for( int idx = 0; idx < maxBx; idx++ ) {
    //    System.out.print(whatBx[idx] + " ");
    //}
    //System.out.println("line 196 bdx = " + bdx ); // need printLN or it never outputs previous prints
    // it's checking every single box whether it has an entry or not. If the box is blank, 
    // it's counted as a zero and if it's not supposed to be zero, it turns lastclr red
    
    // need to assume actual carry, not zero for carry not entered so that
    // checking the final answer gives valid result
    // check multiplicative carries j= 0 => first row, j = 1 => second row
    for( int jdx = 0; jdx < btmOpDgts; jdx++ ) {
        //System.out.println("jdx = " + jdx + " op[0][jdx] = " + op[0][jdx] );
        if( op[0][jdx] > 1 ) {
            for( int idx = 0; idx < nmcarries; idx++ ) {
                att = new String("cr" + jdx + "" + idx);
                if((tmp = request.getParameter(att)) != null ) {
                    cms[jdx][idx] = tmp;
            
                    cmn[jdx][idx] = ProcessAns.string2int( cms[jdx][idx] );
                    cin = 0;
                    if( idx > 0 ) {
                        cin = cmn[jdx][idx-1]; // this was input and checked prev
                    }
                    //System.out.println("checking carries cmn[" + jdx + "][" + idx + "] = " + cmn[jdx][idx]);
                    if( (cmclr[jdx][idx] =
                        ProcessAns.checkCarry( cmn[jdx][idx], op[0][jdx],
                                            op[1][idx], cin )).equals("red") ) {
                        if(!cms[jdx][idx].equals("")) { // Don't set the box back
                            // unless there actually was an entry that was wrong.
                            // Every box is checked every enter and it assumes 0
                            // if there is no entry which is not necessarily the
                            // right answer
                            bdx = bdx - 1;
                            session.setAttribute("bdx", bdx);
                            lastans = cms[jdx][idx];                       
                        }
                    }
                // do i need this? try commenting out
                // if i do need it, i need it for ai's as well
                // session.setAttribute(att, cms[jdx][idx]); // row, column
                // it checks all of them, whether there was anything new typed
                // or not. do i need a separate form for every digit?
                // if there is nothing typed in there is nothing to display in
                // red. I don't know where the 0's are coming from, I would have
                // thought the getParameter would return null and not do any
                // processing. Do I even need to check if getParameter is null?
                }
            }
        }
    }

    // need to check in the actual order that people do them  (interspersed 
    // multiplication and carries) or i need to compare answers with the real
    // answers, not necessarily what is computed from what the person typed in.
    // which is easier?
    // probably comparing to actual answer
    // which is more ?relevant probably compare with what is calculated from
    // what is previously typed in but
    // if someone doesn't enter a carry and screws up their answer, it needs
    // to be marked red
    // also if they don't enter a carry but get a correct final answer it 
    // should be marked black
    // so checkAdd at least needs to use actual carry if none is entered
    // checkMult as well and perhaps a modified checkLast needs to be used
    // instead of checkCarry for the most significant digit of ai's
    
    for( int jdx = 0; jdx < btmOpDgts; jdx++ ) {
        // kdx refers to the placement on the page of intermediate answers
        // mdx refers to the digit of operand or carry
        for ( kdx = jdx, mdx = 0; mdx < topOpDgts; kdx ++, mdx++ ) {
            att = new String("ai" + jdx + "" + kdx);
            if((tmp = request.getParameter(att)) != null ) {
                ais[jdx][kdx] = tmp;
                ain[jdx][kdx] = ProcessAns.string2int( ais[jdx][kdx] );
                cin = 0;
                if( mdx > 0 ) {
                    cin = cmn[jdx][mdx-1];
                }
                //System.out.println("1st row kdx = " + kdx);
                if( (aiclr[jdx][kdx] =
                    ProcessAns.checkMult( ain[jdx][kdx], op[0][jdx],
                                        op[1][mdx], cin )).equals("red") ) {
                    if(!ais[jdx][kdx].equals("")) {
                        lastans = ais[jdx][kdx];
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                        //System.out.println("line 275 bdx = " + bdx );
                    }
                }
            }
        }
        att = new String("ai" + jdx + "" + kdx);
        if((tmp = request.getParameter(att)) != null ) {
            ais[jdx][kdx] = tmp;    
            ain[jdx][kdx] = ProcessAns.string2int( ais[jdx][kdx] );
            // checking the carry now, so keep the cin & op[1][arg] same as        
            // in last iteration of previous loop
            cin = 0;
            if( mdx > 1 ) {
                cin = cmn[jdx][mdx-2];   
            }
            if( (aiclr[jdx][kdx] =
                ProcessAns.checkCarry( ain[jdx][kdx], op[0][jdx],
                                        op[1][mdx-1], cin )).equals("red") ) {
                if(!ais[jdx][kdx].equals("")) {
                    lastans = ais[jdx][kdx];
                    bdx = bdx - 1;
                    session.setAttribute("bdx", bdx);
                    //System.out.println("line 295 bdx = " + bdx );
                }
            }
        }
    }

    for( int idx = 0; idx < maxAndig; idx++ ) {
        int jdx = 0;
        att = new String("an" + idx);
        if((tmp = request.getParameter(att)) != null ) {
            ans[idx] = tmp;
            ann[idx] = ProcessAns.string2int( ans[idx] );
            
            cin = 0;
            if( idx > 1 ) {
                jdx = idx - 2;
                ca_in = 0;
                if( jdx > 0 ) {
                    ca_in = can[jdx-1];
                }
                cas[jdx] = "";
                att = new String("ca" + jdx);
                if((tmp = request.getParameter(att)) != null ) {
                     cas[jdx] = tmp;
                     can[jdx] = ProcessAns.string2int( cas[jdx] );
                }
                //System.out.println("checking additive carry");
                // check cin before you check addition
                if( (caclr[jdx] = 
                    ProcessAns.checkAddCarry( can[jdx], ain[0][idx-1], 
                                ain[1][idx-1], ain[2][idx-1], ca_in)).equals("red") ) {
                    if(!cas[jdx].equals("")) {
                        lastans = cas[jdx];  
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                    }
                }
                cin = can[jdx];    
            }
            // last digit, what would normally be a carry
            if( idx == maxAndig - 1 && (maxAndig > nacarries + 2) && nacarries > 0 ){
                ca_in = 0;
                if( jdx > 0 ) {
                    ca_in = can[jdx-1];
                }
                System.out.println("checking last digit");
                if( (anclr[idx] = 
                        ProcessAns.checkAddCarry( ann[idx], ain[0][idx-1], 
                                        ain[1][idx-1], ain[2][idx-1], ca_in)).equals("red") ) {
                    if(!ans[idx].equals("")) {
                        lastans = ans[idx];  
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                    }
                }
            } else {
                if( (anclr[idx] = 
                    ProcessAns.checkAdd( ann[idx], ain[0][idx],
                                ain[1][idx], ain[2][idx],cin )).equals("red") ) {
                    if(!ans[idx].equals("")) {
                        lastans = ans[idx]; 
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                    }
                }
            }
        }
    }
    //for( int idx = 0; idx <= SZ2_MX; idx++  ) {
        //att = new String("andsp" + idx);
        // = new String("dpPos");
        //<String> pnames = request.getParameterNames();
        //while ( pnames.hasMoreElements() ) {
        //    System.out.println( "one name is " + pnames.nextElement());
        //}
        //System.out.println("checking parameter " + att);
        //if((tmp = request.getParameter(att)) != null ) {
        //    System.out.println("tmp = " + tmp);
        //    int ntmp = ProcessAns.string2int(tmp);
            //isChecked[SZ2_MX - ntmp] = "Y";
        //    System.out.println("ansdp is " + tmp);
        //    if( !(btmDp + topDp == SZ2_MX + 1 - ntmp)) {
        //        dotclr = "red";
        //        System.out.println("decimal point is wrong");
        //    }
        //}
    //}
%>
<div class="d1" >
<form id="th-id2" method="get" action="Multiplier.jsp">

<table class="t1">

<tr><th id="F1" colspan="<%=colspan%>">Multiplication Problem</th></tr>
<%  for( int ndx = 0; ndx < btmOpDgts; ndx++ ) { 
        int row = btmOpDgts - 1 - ndx; 
        if( op[0][row] > 1 ) { %>
            <tr class="r1">
<%          for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                if( idx < spacesb4cm || idx == SZ2_MX ) { %>
                    <td class="s2"></td>
<%              } else { 
                    int col = SZ2_MX - 1 - idx;
                    String name = "cr" + row + "" + col; 
                    //System.out.print("cm row = " + row + " cm col = " + col);
                    
                    if( col < 0 || col >= SZ2_MX ) {
                        System.out.println("cm col = " + col + "being set to 0");
                        col = 0;
                    } 
                    //System.out.println(" cm = " + cms[row][col]); %>
                    <td><input type="text" name="<%=name%>" class="c2" 
                            style="color:<%=cmclr[row][col]%>" 
                            value="<%=cms[row][col]%>"
                            onkeyup="checkCarry( <%=row%>, <%=col%> )"></td>
<%              } %>
                <td class="b1"></td>
<%          }%>
            </tr>
<%      } 
    } %>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {  
        String possDp = (SZ2_MX - idx + 1 == topDp && topDp > 0)? ".":""; %>
        <td class="s2"><%=possDp%></td>
<%      if( idx < spacesb4cm ) { %>
            <td class="n1"></td>
<%      } else { 
            int col = topOpDgts - idx + spacesb4cm - 1;
            String name = "op1" + col;
            switch(col) {
                case 0: //System.out.println("case 0"); %>
                    <td class="n1" name="<%=name%>"><%=op[1][0]%></td>
                    <% break;
                case 1: //System.out.println("case 1"); %>
                    <td class="n1" name="<%=name%>"><%=op[1][1]%></td>
                    <% break;
                case 2: //System.out.println("case 2");  %>
                    <td class="n1" name="<%=name%>"><%=op[1][2]%></td>
                    <% break;
                case 3: //System.out.println("case 2"); %>
                    <td class="n1" name="<%=name%>"><%=op[1][3]%></td>
                    <% break;
                default: //System.out.println("case default");%>
                    <td class="n1">Y</td>
                    <% break;
            }       
        }
    } %>
</tr>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        String possDp = (SZ2_MX - idx + 1 == btmDp && btmDp > 0)? ".":"";
%>
        <td class="s2"><%=possDp%></td>
<%      if( idx < spacesb4btmOp ) { %>            
            <td class="n1"></td>
<%      } else if ( idx == spacesb4btmOp ){ %>
            <td class="n1"> x </td>
<%      } else {
            int col = btmOpDgts - idx + spacesb4btmOp; 
            String name = "op0" + col;
            switch(col) {
                case 0: //System.out.println("case 0");%>
                    <td class="n1" name="<%=name%>"><%=op[0][0]%></td>
                    <% break; 
                case 1: //System.out.println("case 1");%>
                    <td class="n1" name="<%=name%>"><%=op[0][1]%></td>
                    <% break;
                case 2: //System.out.println("case 2"); %>
                    <td class="n1" name="<%=name%>"><%=op[0][2]%></td>
                    <% break;
                default: //System.out.println("case default");%>
                    <td class="n1">Y</td>
                    <% break;
            }
        }
    } %>
</tr> 

<!-- cleaner if whatBx, ca boxes and ai boxes took into account that not all boxes are always used
and should not be displayed //-->
<tr><th class="th-id1" colspan="<%=colspan%>"></th></tr>
<tr class="r1">
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {
        if( idx >= spacesb4ca && idx < nacarries + spacesb4ca && nacarries > 0 ) { 
            //int col = SZ2_MX - 2 - idx + spacesb4ca;
            int col = SZ2_MX - 2 - idx;
            String name = "ca" + col; 
            //System.out.println("ca col = " + col);
            if( col < 0 || col >= SZ2_MX ) {
                 System.out.println("ca col = " + col + "being reduced to 0");
                 col = 0;
            } %>
            <td><input type="text" name="<%=name%>" class="c2"
                style="color:<%=caclr[col]%>" value="<%=cas[col]%>"
                onkeyup="checkAddCarry(<%=col%>)"></td>
<%      } else { %>
            <td class="s2"></td>
<%      } %>
    <td class="b1"></td>
<%  } %>
</tr>

<%  for( int row = 0; row < btmOpDgts; row++ ) { %>
        <tr>
<%      int spacesb4ai = SZ2_MX - maxAdig[row] + 1 - row;
        int aispaces = spacesb4ai + maxAdig[row];
        for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
            if( btmOpDgts == 1 ) { %>
                <td class="p2"><span name="dec-pt" onclick="chooseThis( <%=idx%> )" class="dp" >_</span></td>
<%          } else { %>
                <td class="s2"></td>
<%          }
            if( idx >= spacesb4ai && idx < aispaces ) { 
                int col = SZ2_MX - idx; 
                String name = "ai" + row + "" + col; 
                //System.out.println( "row = " + row + " col = " + col ); %>
                <td><input type="text" name="<%=name%>" class="a1" size="1"
               style="color:<%=aiclr[row][col]%>" value="<%=ais[row][col]%>" 
               onkeyup="checkMult( <%=row%>, <%=col%> )"></td>
<%          } else { %>
                <td class="n1"></td>
<%          } 
        } %>        
        </tr>
<%   }
if( btmOpDgts > 1 ) { %>
    <tr><th class="th-id1" colspan="<%=colspan%>"></th></tr>
    <tr>
<%  
    int spacesb4an = SZ2_MX + 1 - maxAndig;
    for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        //String whatBtn = "andsp" + idx;%>
        <td class="p2"><span name="dec-pt" onclick="chooseThis( <%=idx%> )" class="dp" >_</span></td>
<%      if( idx >= spacesb4an ) { 
            int col = SZ2_MX - idx; 
            String name = "an" + col;  %>
            <td><input type="text" name="<%=name%>" class="a1" size="1" 
                       style="color:<%=anclr[col]%>" value="<%=ans[col]%>"
                       onkeyup="checkAdd(<%=col%>)"></td>
<%      } else { %>
            <td class="n1"></td>
<%      } 
    } 
}   %>  
    </tr>

</table>

<div class="d2">
    <label id="decRmdr">Click where the decimal point should be</label>
</div>
<div class="d2">
<!--<label>What Box </label>//-->
<input type="hidden" id="whatbox" value="<%=whatBx[bdx]%>" class="shortbox"><!--<label>whatBx[bdx]</label>//-->
<br>
<% for( int idx = 0; idx <= maxBx; idx++ ) { %>
    <input type="hidden" name="nextbox" value="<%=whatBx[idx]%>" class="shortbox">
<% } %>
<br>
<input type="hidden" id="bdx" value="<%=bdx%>" class="shortbox"><!--<label>box index bdx</label>//-->
<br>
<input type="hidden" id="lastbox" value="<%=maxBx%>" class="shortbox"><!--<label>lastbox</label>//-->
<br>
</div>
<div class="d2">
<% if (lastans != "" ) { %>
<input  type="text" value="<%=lastans%>" class="shortbox">
<label> was a wrong answer </label>
<% } %>
<br>
</div>
<div class="d2">
<button type="reset" value="Reset" onclick="startAgain()" >Start again</button>
<!--<input type="text" id="rst" name="rstind" value="<%=restarted%>" class="shortbox">//-->
<input type="hidden" id="rst" name="rstind" value="<%=restarted%>" class="shortbox">
<input type="hidden" id="dpPos" name="dpPos" value="<%=dpPos%>" class="shortbox">
<input type="hidden" id="topDec" value="<%=topDp%>" class="shortbox">
<input type="hidden" id="btmDec" value="<%=btmDp%>" class="shortbox">
<input type="submit" style="visibility: hidden;">
</div>
</form>
</div>
</body>
</html>


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

<!-- code to set the default input focus //-->
<script>
function setFocus() { // this part is javascript
    var x = document.getElementById("th-id2");
    //document.getElementById("test").innerHTML = x.length;
    var i = 10;
    var j = document.getElementById("whatbox").value;
    i = Number(j);
    x.elements[i].focus();
    if( i < x.length-1 ) {
        x.elements[i].value="";
    }
}
</script>
<script>
function startAgain() {
    
    var x = document.getElementById("th-id2");
     x.elements[0].value="";
     x.elements[1].value="";
     x.elements[2].value="";
     x.elements[9].setAttribute('value','');
    for( i = 0; i < x.length-1; i++ ) {
        x.elements[i].value="";
        x.elements[i].setAttribute('value','');
    }
    var elem = document.getElementById("rst");
    elem.setAttribute('value','Click Enter ->'); // client changes value
    //x.submit();
}
</script>
</head>
<!-- need to think through how to make it expandable before I put too much
    detail in -->
<!-- This is what actually gets displayed on the page //-->
<body onload="setFocus();">

<!-- multi-checker.jsp (or  should it be a java class?) remains to be written
and is what will take the user's input and display it red if incorrect
//-->
<%
    String restarted = "Click Enter ->";
    String tmp = "";        // temporary storage for newly gotten 
                            // session attribute or request parameter
    final int SZ2_MX = 4;   // maximum operand size
    int[][] op;             // operands first index is what operand
                            // second index is what digit of that operand
    
    int operand0 = 0;
    int operand1 = 0;

    int btmOpDgts = 2;        // how many digits does the bottom operand have
    int topOpDgts = 3;        // how many digits dows the top operand have
    int nmcarries = topOpDgts - 1;
    
    //int maxAndig = topOpDgts + 2;
    
    String att;             // temporary storage for an attribute name that you
                            // are about to get or set
    int kdx;
    int ldx;
    
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
                        19, 18, 6, 17,  5, 16, 4, 15, 20, 20, 20, 20, 20, 20 };
    
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
    // probably not the case, but this is faster anyway
    int[][] ain;        // intermediate answer numeric
    String[][] ais;     // intermediate answer string
    String[][] aiclr;   // intermediate answer text color
    
    int[] ann;      // final answer numeric
    String[] ans;   // final answer string
    String[] anclr; // final answer text color
    
    int[] can;      // additive carry numeric
    String[] cas;   // additive carry string
    String[] caclr; // additive color text  color
    
    
    op = new int[2][SZ2_MX];
    cms = new String[2][SZ2_MX];
    cmn = new int[2][SZ2_MX];
    cmclr = new String[2][SZ2_MX];
    can = new int[SZ2_MX];
    cas = new String[SZ2_MX];
    caclr = new String[SZ2_MX];
    
    ain = new int[2][SZ2_MX+2];
    ais = new String[2][SZ2_MX+2];
    aiclr = new String[2][SZ2_MX+2];
    ann = new int[SZ2_MX+2];
    ans = new String[SZ2_MX+2];
    anclr = new String[SZ2_MX+2];
    
    
    if(( tmp = request.getParameter("rstind")) != null) {
        restarted = tmp.toString();
    }
    //System.out.println("restarted = " + restarted );
    
    if( restarted.equals("Click Enter ->") ) {
        restarted = "no";
        bdx = 0;

        for (int idx = 0; idx < SZ2_MX; idx++ ) {
            op[0][idx] = 9;
            op[1][idx] = 9;
            cms[0][idx] = "";
            cms[1][idx] = "";
            cmn[0][idx] = 0;
            cmn[1][idx] = 0;
            cmclr[0][idx] = "red";
            cmclr[1][idx] = "red";
            can[idx] = 0;
            cas[idx] = "";
            caclr[idx] = "red";
        }
        max = SZ2_MX + 2;
        for ( int idx = 0; idx < max; idx++ ) {
            ann[idx] = 0;
            ans[idx] = "";
            anclr[idx] = "red";
            for ( int jdx = 0; jdx < 2; jdx++ ) {
                ain[jdx][idx] = 0;
                ais[jdx][idx] = "";
                aiclr[jdx][idx] = "red";
            }
        }

        // Math.random() generates x, 0<=x<1
        //topOpDgts = (new Double(1+SZ1_MX*Math.random())).intValue();
        //btmOpDgts = (new Double(1+topOpDgts*Math.random())).intValue();
        session.setAttribute("topOpDgts", topOpDgts);
        for (kdx = 0; kdx < topOpDgts - 1; kdx++){
            op[1][kdx] = (new Double(10*Math.random())).intValue();
            operand1 = operand1 + op[1][kdx]*(int)(Math.pow(10.,(double)kdx));
            att = new String("op2" + kdx);
            session.setAttribute(att, op[1][kdx]);
        }
        // msb cannot be 0
        op[1][kdx] = (new Double(1+9*Math.random())).intValue();
        //op[1][kdx] = 3;
        operand1 = operand1 + op[1][kdx]*(int)(Math.pow(10.,(double)kdx));
        att = new String("op2" + kdx);
        session.setAttribute(att, op[1][kdx]);
        
        session.setAttribute("btmOpDgts", btmOpDgts);
        //op[0][0] = 0;
        //session.setAttribute("op10", op[0][0]);
        //for (kdx = 1; kdx < btmOpDgts - 1; kdx++){
        for (kdx = 0; kdx < btmOpDgts - 1; kdx++){
            op[0][kdx] = (new Double(10*Math.random())).intValue();
            operand0 = operand0 + op[0][kdx]*(int)(Math.pow(10.,(double)kdx));
            att = new String("op1" + kdx);
            session.setAttribute(att, op[0][kdx]);
        }
        // msb cannot be 0
        op[0][kdx] = (new Double(1+9*Math.random())).intValue();
        //op[0][kdx] = 3;
        operand0 = operand0 + op[0][kdx]*(int)(Math.pow(10.,(double)kdx));
        att = new String("op1" + kdx);
        session.setAttribute(att, op[0][kdx]);
    } else {
        maxBx = (new Integer(session.getAttribute("maxBx").toString())).intValue();
        bdx = (new Integer(session.getAttribute("bdx").toString())).intValue();
        if( bdx < maxBx )
            bdx = bdx + 1;
        
        topOpDgts = (new Integer(session.getAttribute("topOpDgts").toString())).intValue();
        for( int idx = 0; idx < topOpDgts; idx++ ){
            att = new String("op2" + idx);
            op[1][idx] = (new Integer(session.getAttribute(att).toString())).intValue(); 
            operand1 = operand1 + op[1][idx]*(int)(Math.pow(10.,(double)idx));
        }
        btmOpDgts = (new Integer(session.getAttribute("btmOpDgts").toString())).intValue();
        for( int idx = 0; idx < btmOpDgts; idx++ ){
            att = new String("op1" + idx);
            op[0][idx] = (new Integer(session.getAttribute(att).toString())).intValue(); 
            operand0 = operand0 + op[0][idx]*(int)(Math.pow(10.,(double)idx));
        }
        nmcarries = topOpDgts - 1;
    }
    session.setAttribute("bdx", bdx);
    
    int maxAdig[] = { 0, 0 };
    boolean nocarries = op[0][0] <= 1;
    boolean no1st = op[0][0] == 0;
    // maximum digits in top/first intermediate answer
    maxAdig[0] = no1st? 0 : 1 + (int)(Math.log10((double)(op[0][0]*operand1)));
    // maximum digits in bottom/second intermediate answer
    maxAdig[1] = 1 + (int)(Math.log10((double)(op[0][1]*operand1)));
    // maximum digits in final answer
    int maxAndig = 1 + (int)(Math.log10((double)(operand0*operand1)));
    int nacarries = no1st? 0 : maxAdig[1] - 1;
    int spacesb4cm = SZ2_MX + 1 - topOpDgts;
    int spacesb4btmOp = SZ2_MX - btmOpDgts; // "x" takes up one space
    // if they are both 2 less than SZ2_MX + 1, there is a space
    int spacesb4ca = 0;
    if( maxAdig[1] < SZ2_MX ) {
        //if( maxAdig[0] > maxAdig[1] - 1 ) {
            spacesb4ca = SZ2_MX - maxAdig[1];
        //} else {
          //  spacesb4ca = SZ2_MX - maxAdig[0];
        //}
    } 
    //System.out.println("A0: " + maxAdig[0] + " A1: " + maxAdig[1] +
    //        " An: " + maxAndig );
    // calculated for 19 boxes, 3 digit times 2 digit biggest case
    //int em = 4;  // box after first multiplicative carry box for first intermediate answer
    int em = nmcarries + (nocarries? 0 : nmcarries); // after first multiplicative carry box for first intermediate answer
    //int el = 10; // lsb of first/top intermediate answer
    int el = em + nacarries + maxAdig[0] - 1; // lsb of first/top intermediate answer
    //int en = 14; // lsb of 2nd/bottom intermediate answer
    int en = el + maxAdig[1]; // lsb of 2nd/bottom intermediate answer
    //int pe = 2;  // box after first multiplicative carry box for 2nd intermediate answer
    int pe = nmcarries;  // box after first multiplicative carry box for 2nd intermediate answer
    int qu = en + maxAndig; // lsb of final answer
    //int qu = 24; // lsb of final answer
    //int ar = 8;  // 2nd box after first additive carry - no carries for first two digits added
    int ar = em + nacarries + 1;  // box after first additive carry - no carries for first two digits added
    ldx = 0;
    //System.out.println("nacarries = " + nacarries);
    //System.out.println("l,m,n,p,q, r = " + el + " " + em + " " + en + " " + pe + " " + qu + " " + ar);
    for( int idx = 0; idx < maxAdig[0]; idx++ ) {
        if( idx > 0 && idx < topOpDgts && op[0][0] > 1 ) {
            whatBx[ldx] = em - idx; // first multiplicative carry boxes
            ldx++;
        }
        whatBx[ldx] = el - idx; // first intermediate answer boxes
        ldx++;
    }
    for( int idx = 0; idx < maxAdig[1]; idx++ ) {
        if( idx > 0 && idx < topOpDgts && op[0][1] > 1 ) {
            whatBx[ldx] = pe - idx;
            ldx++;
        }
        whatBx[ldx] = en - idx;
        ldx++;
    }
    // make it skip carry if adding 454 + 27240 fixit
    for( int idx = 0; idx < maxAndig; idx++ ) {
        if( idx > 1 && idx <= maxAdig[1] && maxAdig[0] != 0 ) {
            whatBx[ldx] = ar - idx; // additive carry
            ldx++;
        }
        whatBx[ldx] = qu - idx; // final answer
        ldx++;
    }
    whatBx[ldx] = 20;
    maxBx = ldx + 1;
    session.setAttribute("maxBx", maxBx);
    //for( int idx = 0; idx < maxBx; idx++ ) {
        //System.out.print(whatBx[idx] + " ");
    //}
    //System.out.println("line 196 bdx = " + bdx );
    // it's checking every single box whether it has an entry or not. If the box is blank, 
    // it's counted as a zero and if it's not supposed to be zero, it turns lastclr red
    
    // need to assume actual carry, not zero for carry not entered so that
    // checking the final answer gives valid result
    // check multiplicative carries j= 0 => first row, j = 1 => second row
    for( int jdx = 0; jdx < nmcarries; jdx++ ){
        for( int idx = 0; idx < btmOpDgts; idx++ ) {
            att = new String("cr" + jdx + "" + idx);
            if((tmp = request.getParameter(att)) != null ) {
                cms[jdx][idx] = tmp;
            
                cmn[jdx][idx] = ProcessAns.string2int( cms[jdx][idx] );
                cin = 0;
                if( idx > 0 ) {
                    cin = cmn[jdx][idx-1]; // this was input and checked prev
                }
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
    
    // check first row of intermediate answers
    for ( kdx = 0; kdx < topOpDgts; kdx ++ ) {
        att = new String("ai0" + kdx);
        if((tmp = request.getParameter(att)) != null ) {
            ais[0][kdx] = tmp;
            ain[0][kdx] = ProcessAns.string2int( ais[0][kdx] );
            cin = 0;
            if( kdx > 0 ) {
                cin = cmn[0][kdx-1];
            }
            //System.out.println("1st row kdx = " + kdx);
            if( (aiclr[0][kdx] =
                ProcessAns.checkMult( ain[0][kdx], op[0][0],
                                        op[1][kdx], cin )).equals("red") ) {
                if(!ais[0][kdx].equals("")) {
                    lastans = ais[0][kdx];
                    bdx = bdx - 1;
                    session.setAttribute("bdx", bdx);
                        //System.out.println("line 275 bdx = " + bdx );
                }
            }
        }
    }
    att = new String("ai0" + kdx);
    if((tmp = request.getParameter(att)) != null ) {
        ais[0][kdx] = tmp;    
        ain[0][kdx] = ProcessAns.string2int( ais[0][kdx] );
        // checking the carry now, so keep the cin & op[1][arg] same as        
        // in last iteration of previous loop

        cin = cmn[0][kdx-2];
        if( (aiclr[0][kdx] =
            ProcessAns.checkCarry( ain[0][kdx], op[0][0],
                                        op[1][kdx-1], cin )).equals("red") ) {
            if(!ais[0][kdx].equals("")) {
                lastans = ais[0][kdx];
                bdx = bdx - 1;
                session.setAttribute("bdx", bdx);
                    //System.out.println("line 295 bdx = " + bdx );
            }
        }
    }

    // check second row of intermediate answers
    max = topOpDgts + 1;
    for ( kdx = 1; kdx < max; kdx ++ ) {
        att = new String("ai1" + kdx);
        if((tmp = request.getParameter(att)) != null ) {
            ais[1][kdx] = tmp;

            ain[1][kdx] = ProcessAns.string2int( ais[1][kdx] );
            cin = 0;
            if( kdx > 1 ) {
                cin = cmn[1][kdx-2];
            }
            if( (aiclr[1][kdx] = 
                ProcessAns.checkMult( ain[1][kdx], op[0][1],
                                        op[1][kdx-1], cin )).equals("red") ) { 
                if(!ais[1][kdx].equals("")) {
//                    session.setAttribute("lastclr", "red");
                    lastans = ais[1][kdx];
                                 bdx = bdx - 1;
                session.setAttribute("bdx", bdx);
                    //System.out.println("line 320 bdx = " + bdx );
                }
            }
        }
    }
    att = new String("ai1" + kdx);
    if((tmp = request.getParameter(att)) != null ) {
        ais[1][kdx] = tmp;

        ain[1][kdx] = ProcessAns.string2int( ais[1][kdx] );
        // checking the carry now, so keep the cin & op[1][arg] same as in last 
        // last iteration of previous loop
        cin = cmn[1][kdx-3];
        if( (aiclr[1][kdx] =
            ProcessAns.checkCarry( ain[1][kdx], op[0][1],
                                        op[1][kdx-2], cin )).equals("red") ) {
            if(!ais[1][kdx].equals("")) {
                lastans = ais[1][kdx];
                bdx = bdx - 1;
                session.setAttribute("bdx", bdx);
                    //System.out.println("line 340 bdx = " + bdx );
            }
        }
    }
    
    // check final adds and carries
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
                // check cin before you check addition
                if( (caclr[jdx] = 
                    ProcessAns.checkAddCarry( can[jdx], ain[0][idx-1], 
                                ain[1][idx-1], ca_in)).equals("red") ) {
                    if(!cas[jdx].equals("")) {
                        lastans = cas[jdx];  
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                        //System.out.println("line 372 bdx = " + bdx );
                    }
                }
                cin = can[jdx];    
            }
            if( idx == maxAndig - 1 && (maxAndig > maxAdig[1] + 1) ){
                if( (anclr[idx] = 
                        ProcessAns.checkAddCarry( ann[idx], ain[0][idx-1], 
                                        ain[1][idx-1], can[idx-3])).equals("red") ) {
                    if(!ans[idx].equals("")) {
                        lastans = ans[idx];  
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                        //System.out.println("line 457 bdx = " + bdx +
                        //        " idx = " + idx );
                    }
                }
            } else {
                if( (anclr[idx] = 
                    ProcessAns.checkAdd( ann[idx], ain[0][idx],
                                ain[1][idx],cin )).equals("red") ) {
                    if(!ans[idx].equals("")) {
                        lastans = ans[idx]; 
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                        //System.out.println("line 468  whichBx[" + bdx + "] = " +
                        //            whatBx[bdx] );
                    }
                }
            }
        }
    }
 
%>
<div class="d1" >
<form id="th-id2" method="get" action="Multiplier.jsp">

<table class="t1">

<!-- colspan="10" is worst case for 3 digit x 2 digit with carries //-->
<tr><th id="F1" colspan="10">Multiplication Problem</th></tr>
<!--<tr class="r1">
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td><input type="text" name="cr11" class="c2" 
               style="color:<%=cmclr[1][1]%>" value="<%=cms[1][1]%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="cr10" class="c2" 
               style="color:<%=cmclr[1][0]%>" value="<%=cms[1][0]%>"></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td
<tr class="r1">
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td><input type="text" name="cr01" class="c2" 
               style="color:<%=cmclr[0][1]%>" value="<%=cms[0][1]%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="cr00" class="c2" 
               style="color:<%=cmclr[0][0]%>" value="<%=cms[0][0]%>" ></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>
</tr> //-->
<%  for( int ndx = 0; ndx < btmOpDgts; ndx++ ) { 
        int row = btmOpDgts - 1 - ndx; 
        if( ndx == 0 || op[0][0] > 1 ) { %>
            <tr class="r1">
<%          for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                if( idx < spacesb4cm || idx == SZ2_MX ) { %>
                    <td class="s2"></td>
<%              } else { 
                    int col = 3 - idx;
                    String name = "cr" + row + "" + col; %>
                    <td><input type="text" name="<%=name%>" class="c2" 
                            style="color:<%=cmclr[row][col]%>" 
                            value="<%=cms[row][col]%>"></td>
<%              } %>
                <td class="b1"></td>
<%          }%>
            </tr>
<%      } 
    } %>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="s2"></td>
<%      if( idx < spacesb4cm ) { %>
            <td class="n1"></td>
<%      } else { 
            int col = topOpDgts - idx + spacesb4cm - 1;
            switch(col) {
                case 0: //System.out.println("case 0");%>
                    <td class="n1"><%=op[1][0]%></td>
                    <% break;
                case 1: //System.out.println("case 1");%>
                    <td class="n1"><%=op[1][1]%></td>
                    <% break;
                case 2: //System.out.println("case 2"); %>
                    <td class="n1"><%=op[1][2]%></td>
                    <% break;
                default: //System.out.println("case default");%>
                    <td class="n1">Y</td>
                    <% break;
            }       
        }
    } %>
</tr>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="s2"></td>
<%      if( idx < spacesb4btmOp ) { %>
            <td class="n1"></td>
<%      } else if ( idx == spacesb4btmOp ){ %>
            <td class="n1"> x </td>
<%      } else {
            int col = btmOpDgts - idx + spacesb4btmOp; 
            switch(col) {
                case 0: //System.out.println("case 0");%>
                    <td class="n1"><%=op[0][0]%></td>
                    <% break; 
                case 1: //System.out.println("case 1");%>
                    <td class="n1"><%=op[0][1]%></td>
                    <% break;
                case 2: //System.out.println("case 2"); %>
                    <td class="n1"><%=op[0][2]%></td>
                    <% break;
                default: //System.out.println("case default");%>
                    <td class="n1">Y</td>
                    <% break;
            }       
        }
    } %>
</tr> 
<!--
 <tr>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"><%=op[1][2]%></td>
    <td class="s2"></td><td class="n1"><%=op[1][1]%></td>
    <td class="s2"></td><td class="n1"><%=op[1][0]%></td>
</tr> 
<tr>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"> x </td>
    <td class="s2"></td><td class="n1"><%=op[0][1]%></td>
    <td class="s2"></td><td class="n1"><%=op[0][0]%></td>
</tr> 
//-->
<!-- cleaner if whatBx, ca boxes and ai boxes took into account that not all boxes are always used
and should not be displayed -->
<tr><th class="th-id1" colspan="10"></th></tr>
<tr class="r1">
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {
        if( idx >= spacesb4ca && idx < nacarries + spacesb4ca && !no1st ) { 
            //int col = SZ2_MX - 2 - idx + spacesb4ca;
            int col = SZ2_MX - 2 - idx;
            //System.out.println("ca col = " + col);
            String name = "ca" + col; %>
            <td><input type="text" name="<%=name%>" class="c2"
                style="color:<%=caclr[col]%>" value="<%=cas[col]%>"></td>
<%      } else { %>
            <td class="s2"></td>
<%      } %>
    <td class="b1"></td>
<%  } %>
</tr>
<!--
<tr><th class="th-id1" colspan="10"></th></tr>
<tr class="r1">
    <td><input type="text" name="ca2" class="c2"
               style="color:<%=caclr[2]%>" value="<%=cas[2]%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="ca1" class="c2"
                style="color:<%=caclr[1]%>" value="<%=cas[1]%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="ca0" class="c2"
                style="color:<%=caclr[0]%>" value="<%=cas[0]%>"></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>

<tr>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td>
    <td><input type="text" name="ai03" class="a1"
               style="color:<%=aiclr[0][3]%>" value="<%=ais[0][3]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="ai02" class="a1"
               style="color:<%=aiclr[0][2]%>" value="<%=ais[0][2]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="ai01" class="a1"
               style="color:<%=aiclr[0][1]%>" value="<%=ais[0][1]%>"></td>
    <td class="s2"></td>
    <td><input type="text" id="A1" name="ai00" class="a1"
               style="color:<%=aiclr[0][0]%>" value="<%=ais[0][0]%>"></td>
        
</tr>
<tr>
    <td class="s2"></td>
    <td><input type="text" name="ai14" class="a1"
               style="color:<%=aiclr[1][4]%>" value="<%=ais[1][4]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="ai13" class="a1"
               style="color:<%=aiclr[1][3]%>" value="<%=ais[1][3]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="ai12" class="a1"
               style="color:<%=aiclr[1][2]%>" value="<%=ais[1][2]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="ai11" class="a1"
               style="color:<%=aiclr[1][1]%>" value="<%=ais[1][1]%>"></td>
    <td class="s2"></td><td class="n1"></td>
</tr>
//-->
<%  for( int row = 0; row < btmOpDgts; row++ ) { %>
        <tr>
<%      int spacesb4ai = SZ2_MX - maxAdig[row] + 1 - row;
        int aispaces = spacesb4ai + maxAdig[row];
        for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="s2"></td>
<%          if( idx >= spacesb4ai && idx < aispaces ) { 
                int col = SZ2_MX - idx; 
                String name = "ai" + row + "" + col; 
                //System.out.println( "row = " + row + " col = " + col ); %>
                <td><input type="text" name="<%=name%>" class="a1"
               style="color:<%=aiclr[row][col]%>" value="<%=ais[row][col]%>"></td>
<%          } else { %>
                <td class="n1"></td>
<%          } 
        } %>        
        </tr>
<%   } %>
<tr><th class="th-id1" colspan="10"></th></tr>
<tr>
<%  int spacesb4an = SZ2_MX + 1 - maxAndig;
    for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="s2"></td>
<%      if( idx >= spacesb4an ) { 
            int col = SZ2_MX - idx; 
            String name = "an" + col; 
            //System.out.println( "col = " + col ); %>
            <td><input type="text" name="<%=name%>" class="a1"
            style="color:<%=anclr[col]%>" value="<%=ans[col]%>"></td>
<%      } else { %>
            <td class="n1"></td>
<%      } 
    } %>  
</tr>
<!-- <tr>
    <td class="s2"></td>
    <td><input type="text" name="an4" class="a1"
               style="color:<%=anclr[4]%>" value="<%=ans[4]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="an3" class="a1"
               style="color:<%=anclr[3]%>" value="<%=ans[3]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="an2" class="a1"
               style="color:<%=anclr[2]%>" value="<%=ans[2]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="an1" class="a1"
               style="color:<%=anclr[1]%>" value="<%=ans[1]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="an0" class="a1"
               style="color:<%=anclr[0]%>" value="<%=ans[0]%>"></td>
</tr> //-->

</table>



<div class="d2">
<label>What Box </label>
<input id="whatbox" type="text" value="<%=whatBx[bdx]%>" class="shortbox">
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
<button type="reset" value="Reset" onclick="startAgain()">Start again</button>
<input type="text" id="rst" name="rstind" value="<%=restarted%>" class="shortbox">
<input type="submit" value="Enter">
</div>
</form>
</div>
</body>
</html>


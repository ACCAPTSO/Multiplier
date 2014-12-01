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
<!--
this entire page may be changed to a java servlet or .jsp at a later date
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

<!-- snippet code goes here -->
<!-- code to set the default input focus -->
<!-- 
//-->
<script>
function setFocus() { // this part is javascript
    var x = document.getElementById("th-id2");
    //document.getElementById("test").innerHTML = x.length;
    var i = 10;
    var j = document.getElementById("test").value;
    i = Number(j);
    x.elements[i].focus();
    if( i < 20 ) {
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

    int digits1 = 2;        // how many digits does the bottom operand have
    int digits2 = 3;        // how many digits dows the top operand have
    
    String att;             // temporary storage for an attribute name that you
                            // are about to get or set
    int idx;
    int jdx;
    
    int bdx = 0;            // box index used to track what box is selected
                            // if you leave a box blank and hit enter it 
                            // continues to the next fixit? doesn't track what
                            // what the answer should be
                            // can you pick up what the person selected?
    
    // array with input box order for a 3 digit number times a 2 digit number
    int[] whatBx = { 10,  3,  9,  2, 8,  7, 14,  1, 13, 0,
                     12, 11, 19, 18, 6, 17,  5, 16, 4, 15, 20 };

    String lastans = "";
    
    int[][] num;   // numeric version of multiplicative carry
    String[][] cm; //string version of multiplicative carry
    String[][] clr; // text color (red = wrong, 
                    // black = right) of multiplicative carry
    int cin = 0;    // temporary storage for carry in
    int ca_in = 0;  // previous cin (for adds)
    int max = 0;    // loop counter maximum
    
    // thought I was having threading issues so I gave up on oo
    // probably not the case, but this is faster anyway
    int[][] a1n;        // intermediate answer numeric
    String[][] a1s;     // intermediate answer string
    String[][] a1clr;   // intermediate answer text color
    
    int[] ann;      // final answer numeric
    String[] ans;   // final answer string
    String[] anclr; // final answer text color
    
    int[] can;      // additive carry numeric
    String[] cas;   // additive carry string
    String[] caclr; // additive color text  color
    
    
    op = new int[2][SZ2_MX];
    cm = new String[2][SZ2_MX];
    num = new int[2][SZ2_MX];
    clr = new String[2][SZ2_MX];
    can = new int[SZ2_MX];
    cas = new String[SZ2_MX];
    caclr = new String[SZ2_MX];
    
    a1n = new int[2][SZ2_MX+2];
    a1s = new String[2][SZ2_MX+2];
    a1clr = new String[2][SZ2_MX+2];
    ann = new int[SZ2_MX+2];
    ans = new String[SZ2_MX+2];
    anclr = new String[SZ2_MX+2];
    
    
    if(( tmp = request.getParameter("rstind")) != null) {
        restarted = tmp.toString();
    }
    System.out.println("restarted = " + restarted );
    
    if( restarted.equals("Click Enter ->") ) {
        restarted = "no";
        bdx = 0;

        for (idx = 0; idx < SZ2_MX; idx++ ) {
            op[0][idx] = 9;
            op[1][idx] = 9;
            cm[0][idx] = "";
            cm[1][idx] = "";
            num[0][idx] = 0;
            num[1][idx] = 0;
            clr[0][idx] = "red";
            clr[1][idx] = "red";
            can[idx] = 0;
            cas[idx] = "";
            caclr[idx] = "red";
        }
        max = SZ2_MX + 2;
        for ( idx = 0; idx < max; idx++ ) {
            ann[idx] = 0;
            ans[idx] = "";
            anclr[idx] = "red";
            for ( jdx = 0; jdx < 2; jdx++ ) {
                a1n[jdx][idx] = 0;
                a1s[jdx][idx] = "";
                a1clr[jdx][idx] = "red";
            }
        }

        // Math.random() generates x, 0<=x<1
        //digits2 = (new Double(1+SZ1_MX*Math.random())).intValue();
        //digits1 = (new Double(1+digits2*Math.random())).intValue();
        session.setAttribute("digits2", digits2);
        for (idx = 0; idx < digits2 - 1; idx++){
            op[1][idx] = (new Double(10*Math.random())).intValue();
            att = new String("op2" + idx);
            session.setAttribute(att, op[1][idx]);
        }
        op[1][idx] = (new Double(1+9*Math.random())).intValue();
        att = new String("op2" + idx);
        session.setAttribute(att, op[1][idx]);
        
        session.setAttribute("digits1", digits1);
        for (idx = 0; idx < digits1 - 1; idx++){
            op[0][idx] = (new Double(10*Math.random())).intValue();
            att = new String("op1" + idx);
            session.setAttribute(att, op[0][idx]);
        }
        op[0][idx] = (new Double(1+9*Math.random())).intValue();
        att = new String("op1" + idx);
        session.setAttribute(att, op[0][idx]);
    } else {
        bdx = (new Integer(session.getAttribute("bdx").toString())).intValue();
        if( bdx < 20 ) { 
            bdx = bdx + 1;

        }
        digits2 = (new Integer(session.getAttribute("digits2").toString())).intValue();
        for( idx = 0; idx < digits2; idx++ ){
            att = new String("op2" + idx);
            op[1][idx] = (new Integer(session.getAttribute(att).toString())).intValue();  
        }
        digits1 = (new Integer(session.getAttribute("digits1").toString())).intValue();
        for( idx = 0; idx < digits1; idx++ ){
            att = new String("op1" + idx);
            op[0][idx] = (new Integer(session.getAttribute(att).toString())).intValue();  
        }
    }
    session.setAttribute("bdx", bdx);
    System.out.println("line 196 bdx = " + bdx );
    // it's checking every single box whether it has an entry or not. If the box is blank, 
    // it's counted as a zero and if it's not supposed to be zero, it turns lastclr red
    
    // need to assume actual carry, not zero for carry not entered so that
    // checking the final answer gives valid result
    // check multiplicative carries j= 0 => first row, j = 1 => second row
    for( jdx = 0; jdx < 2; jdx++ ){
        for( idx = 0; idx < digits1; idx++ ) {
            att = new String("cr" + jdx + "" + idx);
            if((tmp = request.getParameter(att)) != null ) {
                cm[jdx][idx] = tmp;
            
                num[jdx][idx] = ProcessAns.string2int( cm[jdx][idx] );
                cin = 0;
                if( idx > 0 ) {
                    cin = num[jdx][idx-1]; // this was input and checked prev
                }
                if( (clr[jdx][idx] =
                    ProcessAns.checkCarry( num[jdx][idx], op[0][jdx],
                                        op[1][idx], cin )).equals("red") ) {
                    if(!cm[jdx][idx].equals("")) { // Don't set the box back
                        // unless there actually was an entry that was wrong.
                        // Every box is checked every enter and it assumes 0
                        // if there is no entry which is not necessarily the
                        // right answer
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                        lastans = cm[jdx][idx];                       
                    }
                }
                // do i need this? try commenting out
                // if i do need it, i need it for a1's as well
                // session.setAttribute(att, cm[jdx][idx]); // row, column
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
    // which is more relevant? probably compare with what is calculated from
    // what is previously typed in but
    // if someone doesn't enter a carry and screws up their answer, it needs
    // to be marked red
    // also if they don't enter a carry but get a correct final answer it 
    // should be marked black
    // so checkAdd at least needs to use actual carry if none is entered
    // checkMult as well and perhaps a modified checkLast needs to be used
    // instead of checkCarry for the most significant digit of a1's
    
    // check first row of intermediate answers
    for ( idx = 0; idx < digits2; idx ++ ) {
        att = new String("a10" + idx);
        if((tmp = request.getParameter(att)) != null ) {
            a1s[0][idx] = tmp;
            a1n[0][idx] = ProcessAns.string2int( a1s[0][idx] );
            cin = 0;
            if( idx > 0 ) {
                cin = num[0][idx-1];
            }
            if( (a1clr[0][idx] =
                ProcessAns.checkMult( a1n[0][idx], op[0][0],
                                        op[1][idx], cin )).equals("red") ) {
                if(!a1s[0][idx].equals("")) {
                    lastans = a1s[0][idx];
                    bdx = bdx - 1;
                    session.setAttribute("bdx", bdx);
                        System.out.println("line 275 bdx = " + bdx );
                }
            }
        }
    }
    att = new String("a10" + idx);
    if((tmp = request.getParameter(att)) != null ) {
        a1s[0][idx] = tmp;    
        a1n[0][idx] = ProcessAns.string2int( a1s[0][idx] );
        // checking the carry now, so keep the cin & op[1][arg] same as
        // in last iteration of previous loop
        cin = num[0][idx-2];
        if( (a1clr[0][idx] =
            ProcessAns.checkCarry( a1n[0][idx], op[0][0],
                                        op[1][idx-1], cin )).equals("red") ) {
            if(!a1s[0][idx].equals("")) {
                lastans = a1s[0][idx];
                bdx = bdx - 1;
                session.setAttribute("bdx", bdx);
                    System.out.println("line 295 bdx = " + bdx );
            }
        }
    }

    // check second row of intermediate answers
    max = digits2 + 1;
    for ( idx = 1; idx < max; idx ++ ) {
        att = new String("a11" + idx);
        if((tmp = request.getParameter(att)) != null ) {
            a1s[1][idx] = tmp;

            a1n[1][idx] = ProcessAns.string2int( a1s[1][idx] );
            cin = 0;
            if( idx > 1 ) {
                cin = num[1][idx-2];
            }
            if( (a1clr[1][idx] = 
                ProcessAns.checkMult( a1n[1][idx], op[0][1],
                                        op[1][idx-1], cin )).equals("red") ) { 
                if(!a1s[1][idx].equals("")) {
//                    session.setAttribute("lastclr", "red");
                    lastans = a1s[1][idx];
                                 bdx = bdx - 1;
                session.setAttribute("bdx", bdx);
                    System.out.println("line 320 bdx = " + bdx );
                }
            }
        }
    }
    att = new String("a11" + idx);
    if((tmp = request.getParameter(att)) != null ) {
        a1s[1][idx] = tmp;

        a1n[1][idx] = ProcessAns.string2int( a1s[1][idx] );
        // checking the carry now, so keep the cin & op[1][arg] same as in last 
        // last iteration of previous loop
        cin = num[1][idx-3];
        if( (a1clr[1][idx] =
            ProcessAns.checkCarry( a1n[1][idx], op[0][1],
                                        op[1][idx-2], cin )).equals("red") ) {
            if(!a1s[1][idx].equals("")) {
                lastans = a1s[1][idx];
                bdx = bdx - 1;
                session.setAttribute("bdx", bdx);
                    System.out.println("line 340 bdx = " + bdx );
            }
        }
    }
    
    // check final adds and carries
    max = digits2 + 2;
    for( idx = 0; idx < max; idx++ ) {
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
                att = new String("ca" + jdx);
                if((tmp = request.getParameter(att)) != null ) {
                     cas[jdx] = tmp;
                     can[jdx] = ProcessAns.string2int( cas[jdx] );
                }
                // check cin before you check addition
                if( (caclr[jdx] = 
                        ProcessAns.checkAddCarry( can[jdx], a1n[0][idx-1], 
                                        a1n[1][idx-1], ca_in)).equals("red") ) {
                    if(!cas[jdx].equals("")) {
                        lastans = cas[jdx];  
                        bdx = bdx - 1;
                        session.setAttribute("bdx", bdx);
                            System.out.println("line 372 bdx = " + bdx );
                    }
                }
                cin = can[jdx];
            }
            if( (anclr[idx] = 
                ProcessAns.checkAdd( ann[idx], a1n[0][idx],
                        a1n[1][idx],cin )).equals("red") ) {
                if(!ans[idx].equals("")) {
                    lastans = ans[idx]; 
                    bdx = bdx - 1;
                    session.setAttribute("bdx", bdx);
                        System.out.println("line 384 bdx = " + bdx );
                }
            }
        }
    }
 
%>
<div class="d1">
<form id="th-id2" method="get" action="Multiplier.jsp">

<table class="t1">

<!-- colspan="10" is worst case for 3 digit x 2 digit with carries //-->
<tr><th id="F1" colspan="10">Multiplication Problem</th></tr>
<tr class="r1">
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td><input type="text" name="cr11" class="c2" 
               style="color:<%=clr[1][1]%>" value="<%=cm[1][1]%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="cr10" class="c2" 
               style="color:<%=clr[1][0]%>" value="<%=cm[1][0]%>"></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>
<tr class="r1">
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td><input type="text" name="cr01" class="c2" 
               style="color:<%=clr[0][1]%>" value="<%=cm[0][1]%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="cr00" class="c2" 
               style="color:<%=clr[0][0]%>" value="<%=cm[0][0]%>" ></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>
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
    <td><input type="text" name="a103" class="a1"
               style="color:<%=a1clr[0][3]%>" value="<%=a1s[0][3]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="a102" class="a1"
               style="color:<%=a1clr[0][2]%>" value="<%=a1s[0][2]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="a101" class="a1"
               style="color:<%=a1clr[0][1]%>" value="<%=a1s[0][1]%>"></td>
    <td class="s2"></td>
    <td><input type="text" id="A1" name="a100" class="a1"
               style="color:<%=a1clr[0][0]%>" value="<%=a1s[0][0]%>"></td>
        
</tr>
<tr>
    <td class="s2"></td>
    <td><input type="text" name="a114" class="a1"
               style="color:<%=a1clr[1][4]%>" value="<%=a1s[1][4]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="a113" class="a1"
               style="color:<%=a1clr[1][3]%>" value="<%=a1s[1][3]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="a112" class="a1"
               style="color:<%=a1clr[1][2]%>" value="<%=a1s[1][2]%>"></td>
    <td class="s2"></td>
    <td><input type="text" name="a111" class="a1"
               style="color:<%=a1clr[1][1]%>" value="<%=a1s[1][1]%>"></td>
    <td class="s2"></td><td class="n1"></td>
</tr>
<tr><th class="th-id1" colspan="10"></th></tr>
<tr>
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
</tr>

</table>



<div class="d2">
<label>What Box </label>
<input id="test" type="text" value="<%=whatBx[bdx]%>" class="shortbox">
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


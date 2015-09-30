<%-- 
    Document   : Multiplier
    Created on : Oct 15, 2014, 7:22:00 AM<%-- 

    Author     : irene
--%>

<%@page import="javax.servlet.http.*, java.io.*,java.util.*" %>
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

<script src="Multiplier.js"></script>

</head>
<!-- to do: tie to database, add timed multiple choice questions -->

<!-- body is what actually gets displayed on the page //-->
<!-- set focus to correct box and dis-allow user selection of boxes //-->
<body onload="setFocus();" onmousedown="javascript:return false;"
      onselctstart="javascript:return false;">

<!-- Multiplier.jsp is what will take the user's input and display it red if 
incorrect //-->
<%
    
    String tmp = "";      // temporary storage for newly gotten 
                          // request parameter
    
    final int SZ2_MX = 6; // maximum answer size
    int colspan = 2*(SZ2_MX + 1);
    int[][] op;           // operand's first index is what operand (top/bottom)
                          // second index is what digit of that operand
    
    int operand0 = 0;
    int operand1 = 0;

    int topOpDgts = 0; // how many digits dows the top operand have  
    int btmOpDgts = 0; // how many digits does the bottom operand have
    int topDp = 0;     // top decimal point position - initiallized to far right
    int btmDp = 0;     // bottom decimal point position
    int ansDp = 0;
    
    int nmcarries = 0; // multiplication carries
    
    int kdx;
    int ldx;
    
    int bdx = 0;            // box index used to track what box is selected
    
    // array with input box order for a 3 digit number times a 2 digit number
    int[] whatBx = { 10,  3,  9,  2, 8,  7, 
                     14,  1, 13, 0, 12, 11, 
                     19, 18, 6, 17,  5, 16, 4, 15, 20, 20, 20, 20, 20, 
                     20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                     20, 20, 20, 20, 20, 20 };
    
    int maxBx = 20;
                      
    String lastans = "";
        
    int max = 0;    // loop counter maximum
    String[][] cms; //string version of multiplicative carry
    String[][] ais; // intermediate answer string
    String[] ans;   // final answer string   
    String[] cas;   // additive carry string
    
    int nonZeros = 0;
    int msDigit = 0;
    int strtRow = 0;
    int maxAndig = 0;
    
    final double EXP = 2.4;
    boolean singlCk = false;
    boolean tenshCk = false;
    boolean triplsCk = false;
    boolean decsCk = false;
    String isSingl = "";
    String isTensh = "";
    String isTripl = "";
    String isDecs = "";
    String whatlvl = "";
    if(( tmp = request.getParameter("difflvl")) != null ) {
        whatlvl = tmp;
        if( whatlvl.equals("Single Digits") ) {
            singlCk = true;
            isSingl = "checked";
        } else if( whatlvl.equals("Tens and Hundreds")) {
            tenshCk = true;
            isTensh = "checked";
        } else if( whatlvl.equals("Double and Triple Digits")) {
            triplsCk = true;
            isTripl = "checked";
        } else if( whatlvl.equals("Decimals")) {
            decsCk = true;
            isDecs = "checked";
        }
    }

    String numAttmptdV = "0";
    String numWoErr = "0";
    String consWoErr = "0";
    String corrPerHr = "0";
    String strtTime = String.valueOf(System.currentTimeMillis());
    String errs = "0";


    //retrieves the value of the DOM object with name="numAttmptdP"
    if(( tmp = request.getParameter("numAttmptdP")) != null) {
        numAttmptdV = tmp.toString();
    }
    
    if(( tmp = request.getParameter("numWoErrP")) != null) {
        numWoErr = tmp.toString();
    } 
    
    if(( tmp = request.getParameter("consWoErrP")) != null) {
        consWoErr = tmp.toString();
    } 
    
    if(( tmp = request.getParameter("corrPerHrP")) != null) {
        corrPerHr = tmp.toString();
    } 
    
    if(( tmp = request.getParameter("strtTimeP")) != null) {
        strtTime = tmp.toString();
    } 

    // Math.random() generates x, 0<=x<1
    topOpDgts = (new Double(2+(SZ2_MX-3)*Math.random())).intValue();
    nmcarries = topOpDgts - 1; // number of multiplicative carries
        
    // don't want to overflow final answer 
    int maxBtmDgts = SZ2_MX-topOpDgts;
        
    // don't want bottom op to be bigger than top op
    if( topOpDgts < maxBtmDgts ) {
        maxBtmDgts = topOpDgts;
    }
    
    if( singlCk ) {
        btmOpDgts = 1;
    } else { // more likely to have more digits than less
        btmOpDgts = (new Double(1+(maxBtmDgts)*(1 - Math.pow(Math.random(),EXP)))).intValue();
    }
    
    // generate decimal places for operands and answer
    if( decsCk ) { // decimal points more likely to be to the left than the right
        topDp = (new Double(topOpDgts*(1-Math.pow(Math.random(), EXP)))).intValue();
        btmDp = (new Double(btmOpDgts*(1-Math.pow(Math.random(), EXP)))).intValue();
        ansDp = topDp + btmDp;
    }

    op = new int[2][SZ2_MX];
    cms = new String[btmOpDgts][SZ2_MX];
    cas = new String[SZ2_MX];
    ais = new String[3][SZ2_MX+2];
    ans = new String[SZ2_MX+2];

    bdx = 0;

    for( int idx = 0; idx < SZ2_MX; idx++ ) {
        op[0][idx] = 0;
        op[1][idx] = 0;   
        for( int jdx = 0; jdx < btmOpDgts; jdx++ ) { 
            cms[jdx][idx] = "";
        }
        cas[idx] = "";
    }
    max = SZ2_MX + 2;
    for ( int idx = 0; idx < max; idx++ ) {
        ans[idx] = "";
        for ( int jdx = 0; jdx < 3; jdx++ ) {
            ais[jdx][idx] = "";
        }
    }

    for (kdx = 0; kdx < topOpDgts - 1; kdx++){
        if( decsCk ) { // generate more small digit decimals
            op[1][kdx] = (new Double(10*(Math.pow(Math.random(),EXP)))).intValue();
        } else if( triplsCk ) { // generate more large digit 2 and 3 digit numbers
            op[1][kdx] = (new Double(10*(1-Math.pow(Math.random(),EXP)))).intValue();
        } else { // generate uniform distribution of digits
            op[1][kdx] = (new Double(10*Math.random())).intValue();
        }
        operand1 = operand1 + op[1][kdx]*(int)(Math.pow(10.,(double)kdx));
    }
    // msb cannot be 0
    op[1][kdx] = (new Double(1+9*Math.random())).intValue();
    operand1 = operand1 + op[1][kdx]*(int)(Math.pow(10.,(double)kdx));

    for( kdx = 0; kdx < SZ2_MX; kdx++ ) {
        if( kdx < btmOpDgts - 1 || 
                (kdx == btmDp && nonZeros > 0 ) ) { // possible leading zero 
                                       // visible in front of a decimal point
            if( !tenshCk ) { // not tens or hundreds => generate random lower digits
                if( decsCk ) { // generate more small digit decimals
                    op[0][kdx] = (new Double(10*(Math.pow(Math.random(),EXP)))).intValue();
                } else if ( triplsCk ) { // generate more large digit 2 and 3 digit numbers
                    op[0][kdx] = (new Double(10*(1-Math.pow(Math.random(),EXP)))).intValue();
                } else { // generate a uniform distribution of single digit, tens and hundreds
                    op[0][kdx] = (new Double(10*Math.random())).intValue();
                }
            }
            operand0 = operand0 + op[0][kdx]*(int)(Math.pow(10.,(double)kdx));
            strtRow = (op[0][kdx] == 0 && strtRow == kdx)? kdx + 1 : strtRow;
        } else if( kdx == btmOpDgts - 1 ) {
            // msb cannot be 0
            op[0][kdx] = (new Double(1+9*Math.random())).intValue();
            operand0 = operand0 + op[0][kdx]*(int)(Math.pow(10.,(double)kdx));
        } else {
            op[0][kdx] = 0; // leading zeros will not be visible
        }
        if( op[0][kdx] > 0 ) {
            nonZeros += 1;
            msDigit = kdx + 1;
        }
    }
    
    int maxAdig[] = { 0, 0, 0 };
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
    maxAndig = 1 + (int)(Math.log10((double)(operand0*operand1)));
    
    int nacarries = 0;
    // if there are at least two intermediate numbers to add
    if( maxAdig[0] != 0 && maxAdig[1] != 0 || maxAdig[0] != 0 && maxAdig[2] != 0
            || maxAdig[1] != 0 && maxAdig[2] != 0 ) {
        nacarries += (maxAdig[2] + 1 > maxAdig[1]?  maxAdig[2]: 
                maxAdig[1] + 1 > maxAdig[0]? maxAdig[1]-1: maxAdig[0] - 2 );
    }
    
    if( nonZeros == 1 ) {
        maxAdig[strtRow] += strtRow; // add boxes for the trailing zeros
    }
    int spacesb4cm = SZ2_MX + 1 - topOpDgts;
    int spacesb4btmOp = SZ2_MX - btmOpDgts; // "x" takes up one space
    int spacesb4ca = SZ2_MX - 1 - nacarries;
    int te = op[0][2] <= 1? 0 : nmcarries;
    int pe = te;
    pe += (op[0][1] <= 1? 0 : nmcarries);  // box after first multiplicative carry box for 2nd intermediate answer
    int em = pe;
    em += (op[0][0] <= 1? 0 : nmcarries); 
        
    int el = em + nacarries + maxAdig[0] - 1; // lsb of first/top intermediate answer box
    int en = el + maxAdig[1]; // lsb of 2nd intermediate answer box
    int es = en + maxAdig[2]; // lsb of 3rd intermediate answer box
    int qu = es + maxAndig; // lsb of final answer box
    int ar = em + nacarries + 1;  // box after first additive carry - no carries for first two digits added
    ldx = 0;
    //System.out.println("op1 = " + operand1 + " op0 = " + operand0);
    //System.out.println("nacarries = " + nacarries);
    //System.out.println("l,m,n,p,q, r, s, t = " + el + " " + em + " " + en + " " + pe + " " + qu + " " + ar + " " + es + " " + te);
    int idxmax = nonZeros > 1? topOpDgts : topOpDgts + strtRow;
    int idxmin = nonZeros > 1? 0 : strtRow;
    int inc = nonZeros > 1? 0 : strtRow;
    for( int idx = 0; idx < maxAdig[0]; idx++ ) {
        if( idx > idxmin && idx < idxmax && op[0][0] > 1 ) {
            whatBx[ldx] = em - idx + inc; // first multiplicative carry boxes
            ldx++;
        }
        whatBx[ldx] = el - idx; // first intermediate answer boxes
        ldx++;
    }
    if( btmOpDgts > 1 ) {
        for( int idx = 0; idx < maxAdig[1]; idx++ ) {
            if( idx > idxmin && idx < idxmax && op[0][1] > 1 ) {
                whatBx[ldx] = pe - idx + inc;
                ldx++;
            }
            whatBx[ldx] = en - idx;
            ldx++;
        }
        if( btmOpDgts > 2 ) {
            for( int idx = 0; idx < maxAdig[2]; idx++ ) {
                if( idx > idxmin && idx < idxmax && op[0][2] > 1 ) {
                    whatBx[ldx] = te - idx + inc;
                    ldx++;
                }
                whatBx[ldx] = es - idx;
                ldx++;
            }
        }
    }
 
    if( nonZeros > 1 ) {
        for( int idx = 0; idx < maxAndig; idx++ ) {
            if( idx > 1 && (msDigit == 2 && idx <= maxAdig[1] && maxAdig[0] != 0
                || msDigit == 3 && idx <= maxAdig[2]+1 && (maxAdig[1] != 0 || maxAdig[0] != 0) )) {
                whatBx[ldx] = ar - idx + inc; // additive carry boxes
                ldx++;
            }
            whatBx[ldx] = qu - idx; // final answer boxes
            ldx++;
        }
        whatBx[ldx] = qu + 1;
    } else { // one row of intermediate answers which in this case is the final answer
        // last box depends on whether second operand was even multiple of 10 or 100
        // it won't be a multiple of 1000 unless this program is expanded
        whatBx[ldx] = strtRow == 0? el + 1 : strtRow == 1? en + 1 : es + 1; 
    }
    maxBx = ldx + 1;

%>
<div class="d1" >
<form id="th-id2" method="get" action="Multiplier.jsp">
<div class="d3">
<table class="tbl">

<tr><th id="F1" colspan="<%=colspan%>">Multiplication Problem</th></tr>
<%  for( int ndx = 0; ndx < btmOpDgts; ndx++ ) { 
        int row = btmOpDgts - 1 - ndx; 
        if( op[0][row] > 1 ) { %>
            <tr class="r1">
<%          for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                if( idx < spacesb4cm || idx == SZ2_MX ) { %>
                    <td class="t2"></td>
<%              } else { 
                    int col = SZ2_MX - 1 - idx;
                    String name = "cr" + row + "" + col; 
                    
                    if( col < 0 || col >= SZ2_MX ) {
                        System.out.println("cm col = " + col + "being set to 0");
                        col = 0;
                    }  %>
                    <td class="t2"><input type="text" name="<%=name%>" class="c2" 
                            value="<%=cms[row][col]%>"
                            onkeyup="checkCarry( <%=row%>, <%=col%> )"></td>
<%              } %>
                <td class="t1"></td>
<%          }%>
            </tr>
<%      } 
    } %>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {  
        String possDp = (SZ2_MX - idx + 1 == topDp && topDp > 0)? ".":""; %>
        <td class="t2"><%=possDp%></td>
<%      if( idx < spacesb4cm ) { %>
            <td class="t1"></td>
<%      } else { 
            int col = topOpDgts - idx + spacesb4cm - 1;
            String name = "op1" + col;
            switch(col) {
                case 0: %>
                    <td class="t1" name="<%=name%>"><%=op[1][0]%></td>
                    <% break;
                case 1: %>
                    <td class="t1" name="<%=name%>"><%=op[1][1]%></td>
                    <% break;
                case 2: %>
                    <td class="t1" name="<%=name%>"><%=op[1][2]%></td>
                    <% break;
                case 3: %>
                    <td class="t1" name="<%=name%>"><%=op[1][3]%></td>
                    <% break;
                default: %>
                    <td class="t1">Y</td>
                    <% break;
            }       
        }
    } %>
</tr>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        String possDp = (SZ2_MX - idx + 1 == btmDp && btmDp > 0)? ".":"";
%>
        <td class="t2"><%=possDp%></td>
<%      if( idx < spacesb4btmOp ) { %>            
            <td class="t1"></td>
<%      } else if ( idx == spacesb4btmOp ){ %>
            <td class="t1"> x </td>
<%      } else {
            int col = btmOpDgts - idx + spacesb4btmOp; 
            String name = "op0" + col;
            switch(col) {
                case 0: %>
                    <td class="t1" name="<%=name%>"><%=op[0][0]%></td>
                    <% break; 
                case 1: %>
                    <td class="t1" name="<%=name%>"><%=op[0][1]%></td>
                    <% break;
                case 2:  %>
                    <td class="t1" name="<%=name%>"><%=op[0][2]%></td>
                    <% break;
                default: %>
                    <td class="t1">Y</td>
                    <% break;
            }
        }
    } %>
</tr> 

<tr><th class="th-id1" colspan="<%=colspan%>"></th></tr>
<tr class="r1">
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {
        if( idx >= spacesb4ca && idx < nacarries + spacesb4ca && nacarries > 0 ) { 
            int col = SZ2_MX - 2 - idx;
            String name = "ca" + col; 
            if( col < 0 || col >= SZ2_MX ) {
                 System.out.println("ca col = " + col + "being reduced to 0");
                 col = 0;
            } %>
            <td class="t2"><input type="text" name="<%=name%>" class="c2" 
                 value="<%=cas[col]%>"
                 onkeyup="checkAddCarry(<%=col%>)"></td>
<%      } else { %>
            <td class="t2"></td>
<%      } %>
    <td class="t1"></td>
<%  } %>
</tr>

<%  for( int row = strtRow; row < msDigit; row++ ) { %>
        <tr>
<%      int spacesb4ai = SZ2_MX + 1; // start with entire width of table
        spacesb4ai = spacesb4ai - maxAdig[row]; // subtract off width of
                                                // intermediate answer
        spacesb4ai = spacesb4ai - row;  // subtract off offset for x10 or x100
        
        int aispaces = spacesb4ai + maxAdig[row]; // combined spaces before and 
                                                  // answer spaces
        
        if( nonZeros == 1 ) {                  // maxAdig is padded with
            spacesb4ai = spacesb4ai + strtRow; // zeros, you subtracted them
                                               // off, so add them back in
        }

        for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            if( nonZeros == 1 ) { // this -is- the final answer %>
                <td class="t2">
                <span name="dec-pt"
                onclick="chooseThis( <%=idx%> )" class="dp" >_</span></td>
<%          } else { %>
                <td class="t2"></td>
<%          }
            int col = SZ2_MX - idx; 
            String name = "ai" + row + "" + col; 
            if( idx >= spacesb4ai && idx < aispaces ) {  %>
                <td class="t1"><input type="text" name="<%=name%>" class="a1" size="1"
                    value="<%=ais[row][col]%>" 
                    onkeyup="checkMult( <%=row%>, <%=col%> )"></td>
<%          } else if( idx >= spacesb4ai && nonZeros == 1 ) { %>
                <td class="t1"><input type="text" name="<%=name%>" class="a1" size="1"
                    value="<%=ais[row][col]%>" 
                    onkeyup="checkZero( <%=row%>, <%=col%> )"></td>
<%          } else { 
                String possZero; 
                if( nonZeros == 1 && ansDp >= maxAdig[row] && idx > SZ2_MX - ansDp -1 ) {
                    possZero = "yesThis";
                } else {
                    possZero = "notThis";
                } %>
            <td class="t1"><label class="b1" name="<%=possZero%>">0</label></td>
<%          } 
        } %>        
        </tr>
<%   }
if( nonZeros > 1 ) { // more than one intermediate answer => need to add%>
    <tr><th class="th-id1" colspan="<%=colspan%>"></th></tr>
    <tr>
<%  
    int spacesb4an = SZ2_MX + 1 - maxAndig; // entire width of table minus 
                                            // answer spaces
    for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="t2">
        <span name="dec-pt" onclick="chooseThis( <%=idx%> )" class="dp" >_</span>
        </td>
<%      if( idx >= spacesb4an ) { 
            int col = SZ2_MX - idx; 
            String name = "an" + col;  %>
            <td class="t1"><input type="text" name="<%=name%>" class="a1" size="1" 
            value="<%=ans[col]%>"
            onkeyup="checkAdd(<%=col%>)"></td>
<%      } else { 
            String possZero; 
            if( ansDp >= maxAndig && idx > SZ2_MX - ansDp - 1 ) {
                possZero = "yesThis";
            } else {
                possZero = "notThis";
            }%>
            <td class="t1"><label class="b1" name="<%=possZero%>">0</label></td>
<%      } 
    } 
}   %>  
    </tr>

</table>
</div>
    
<div class="d3">
<label id="decRmdr" class="msg">Click where the decimal point should be</label>
</div>

<div class="d4">
<!--this is where error messages get displayed//-->
<label id="wrongans" class="msg"></label>
</div>
<input type="hidden" id="whatbox" value="<%=whatBx[bdx]%>" class="shortbox">   
<table class="dff">
    <tr><th colspan="1">Highest Difficulty Level</th></tr>
    <tr><td>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Single Digits" <%=isSingl%>>
        <label>Single Digits</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Tens and Hundreds" <%=isTensh%>>
        <label>Tens and Hundreds</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Double and Triple Digits" <%=isTripl%>> 
        <label>Double and Triple Digits</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Decimals" <%=isDecs%>>
        <label>Decimals</label>
    </td></tr>
</table>

<div class="d2">
<table>
<tr>    
    <td><label>Problems Attempted</label></td>
    <td>
    <input type="text" id="numAttmptd" name="numAttmptdP" value="<%=numAttmptdV%>"
           class="blackbox">
    </td>
</tr>
<tr>
    <td><label>Completed Without Error</label></td>   
    <td>
    <input type="text" id="numWoErr" name="numWoErrP" value="<%=numWoErr%>"
           class="blackbox">
    </td>
</tr>
<tr>
    <td><label>Consecutive Without Error</label></td>   
    <td>
    <input type="text" id="consWoErr" name="consWoErrP" value="<%=consWoErr%>"
           class="blackbox">
    </td>
</tr>
<tr>
    <td><label>Correct Per Hour</label></td>   
    <td>
    <input type="text" id="corrPerHr" name="corrPerHrP" value="<%=corrPerHr%>"
           class="blackbox">
    </td>
</tr>
<tr>
    <td><label>Errors This Problem</label></td>
    <td><input type="text" id="errs" name="errs" value="<%=errs%>"
               class="blackbox"></td>
</tr>
<tr>
    <td></td>
    <td>
<button type="reset" value="Reset" onclick="startAgain()" >Start again</button>
</td>
</tr>
</table>
</div>

<input type="hidden" id="strtTime" name="strtTimeP" value="<%=strtTime%>" class="shortbox">
<input type="hidden" id="ansDp" value="<%=ansDp%>" class="shortbox">
<% for( int idx = 0; idx <= maxBx; idx++ ) { %>
    <input type="hidden" name="nextbox" value="<%=whatBx[idx]%>" class="shortbox">
<% } %>
<input type="hidden" id="bdx" value="<%=bdx%>" class="shortbox">
<input type="hidden" id="lastbox" value="<%=maxBx%>" class="shortbox">

</form>
</div>
</body>
</html>


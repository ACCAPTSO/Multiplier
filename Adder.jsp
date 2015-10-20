<%-- 
    Document   : Adder
    Created on : Oct 12, 2015, 5:03:24 PM
    Author     : irene
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<style>
#div1 {width:350px;height:70px;padding:10px;border:1px solid #aaaaaa;}
</style>

<link rel="stylesheet" href="Adder.css" type="text/css">
<script src="Multiplier.js"></script>
<script src="Adder.js"></script>
</head>
<body onload="setFocus();" onmousedown="javascript:return false;"
      onselctstart="javascript:return false;">



<%  final int SZ2_MX = 6; // maximum answer size
    final int maxOps = 4;
    int numOps = (int)(2*Math.random()) + maxOps - 1; // 2 -3 operands
    int colspan = 2*(SZ2_MX + 1);
    int[][] op;           // operand's first index is what operand (top/bottom)
                          // second index is what digit of that operand
    
    int operand[] = new int[maxOps];
    for( int idx = 0; idx < maxOps; idx++ ) {
        operand[idx] = 0;
    }

    int opDp[] = new int[maxOps]; // operand decimal point positions
    int maxDp = (int)(SZ2_MX*Math.random()); // max decimal point 
    int ansDp = 0;
    int numDig[] = new int[maxOps]; // how many digits do operands have
    for( int idx = 0; idx < numOps; idx++ ) {
        opDp[idx] = (int)((maxDp+1)*Math.random());
        if( opDp[idx] > ansDp ) {
            ansDp = opDp[idx];
        }
        numDig[idx] = 0;
    }
    
    op = new int[maxOps][SZ2_MX];
    String[] ans;   // final answer string   
    String[] cas;   // additive carry string 
    cas = new String[SZ2_MX];
    ans = new String[SZ2_MX];
    int jdx;
    int kdx;
    int ldx = 0;
    
    int bdx = 0;            // box index used to track what box is selected
    
    int[] whatBx;
    whatBx = new int[maxOps*SZ2_MX];
    int maxBx = 20;
    
    for( int idx = 0; idx < SZ2_MX; idx++ ) {
        op[0][idx] = 0;
        op[1][idx] = 0;   
        cas[idx] = "";
        ans[idx] = "";
    }
    
    String numAttmptdV = "0";
    String numWoErr = "0";
    String consWoErr = "0";
    String corrPerHr = "0";
    String strtTime = String.valueOf(System.currentTimeMillis());
    String errs = "0";
    String tmp = "";      // temporary storage for newly gotten 
                          // request parameter
    
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
    
    for( jdx = numOps-1; jdx >= 0; jdx-- ) {
        // limit the size so it fits the table
        int maxDig = SZ2_MX - 1 - ansDp + opDp[jdx]; 
        numDig[jdx] = (int)(maxDig*Math.random()) + 1;
        for (kdx = 0; kdx < numDig[jdx]-1; kdx++){
            // generate uniform distribution of digits
            op[jdx][kdx] = (new Double(10*Math.random())).intValue();
            operand[jdx] = operand[jdx] + op[jdx][kdx]*(int)(Math.pow(10.,(double)kdx));
            //System.out.println("op[" + jdx + "][" + kdx + "] = " + op[jdx][kdx]);
            
        }
    
        // msb cannot be 0
        op[jdx][kdx] = (new Double(1+9*Math.random())).intValue();
        operand[jdx] = operand[jdx] + op[jdx][kdx]*(int)(Math.pow(10.,(double)kdx));
        //System.out.println("op[" + jdx + "][" + kdx + "] = " + op[jdx][kdx]);
        //System.out.println("operand[" + jdx + "] = " + operand[jdx]);
    }

    double maxAns = 0;
    // more to it than this when there is a decimal point fixit
    for( int idx = 0; idx < numOps; idx++ ) {
        maxAns += operand[idx]/Math.pow(10,opDp[idx]);
        //System.out.println("partial answer is " + maxAns);
    }
    //maxAns *= Math.pow(10,ansDp);
    //System.out.print("answer is " + maxAns);
    
    int maxAnDig = 0;
    if( maxAns > 0 ) {
        maxAnDig = 1 + (int)Math.log10(maxAns );
    }
    maxAnDig += ansDp;
    //System.out.print("digits in answer is " + maxAnDig);

    int nacarries = 0;
    int trailingZeros = 0;
    int possCarries = 0;
    int spacesb4Op[] = new int[maxOps];
    // all the decimal points need to be lined up
    for( int idx = numOps-1; idx >= 0; idx-- ) {
        if( numDig[idx] > opDp[idx] ) {
            // digits in front of the decimal point
            int digsInFront =  numDig[idx] - opDp[idx];
            //System.out.println("idx = " + idx + " digsInFront = " + digsInFront );
            spacesb4Op[idx] = SZ2_MX + 1 - ansDp - digsInFront;
        } else {
            spacesb4Op[idx] = SZ2_MX - ansDp;
        }
        trailingZeros = ansDp - opDp[idx];
        possCarries = numDig[idx] - 1;
        if( trailingZeros > 0 ) {
            possCarries += trailingZeros;
        }
        if( possCarries > nacarries ) {
            nacarries = possCarries; 
        }  
        //System.out.println("numDig[" + idx + "] = " + numDig[idx] + " opDp[" + idx + "] = " + opDp[idx] + " spacesb4Op[" + idx + "] = " + spacesb4Op[idx]);
    }
    //int spacesb4btmOp = SZ2_MX - numDig[0]; // "+" takes up one space
    int spacesb4ca = SZ2_MX - nacarries;

    int ar = nacarries;  // first additive carry 
    int qu = ar + maxAnDig - 1; // lsb of final answer box

    for( int idx = 0; idx < maxAnDig; idx++ ) {
        if( nacarries > 0 && idx > 0 && ar >= idx ) {
            whatBx[ldx] = ar - idx; // additive carry 
            //System.out.println("whatBx[" + ldx + "] = " + whatBx[ldx]);
            ldx++;
        }
        whatBx[ldx] = qu - idx; // final answer boxes
        //System.out.println("whatBx[" + ldx + "] = " + whatBx[ldx]);
        ldx++;
    }
    whatBx[ldx] = qu + 1;

    maxBx = ldx + 1; %>
<div class="d1" >
<form id="th-id2" method="get" action="Adder.jsp">
<div class="d3">
<table class="tbl">
<tr><th id="F1" colspan="<%=colspan%>">Addition Problem</th></tr>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {
        if( idx >= spacesb4ca && idx < nacarries + spacesb4ca && nacarries > 0 ) { 
            int col = SZ2_MX - 1 - idx;
            String name = "ca" + col; 
            if( col < 0 || col >= SZ2_MX ) {
                 System.out.println("ca col = " + col + "being reduced to 0");
                 col = 0;
            } %>
            <td class="t2"><input type="text" name="<%=name%>" class="c2" 
                 value="<%=cas[col]%>"
                 onkeyup="justAddCarry(<%=col%>)"></td>
<%      } else { %>
            <td class="t2"></td>
<%      } %>
    <td class="t1"></td>
<%  } %>
</tr>
<%  if( numOps > 3 ) { %>
<tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {  
            String possDp = (SZ2_MX - idx + 1 == ansDp && ansDp > 0 )? ".":""; %>
            <td class="t2"><%=possDp%></td>
<%          if( idx < spacesb4Op[3] ) { %>
                <td class="t1"></td>
<%          } else { 
                //int col = numDig[3] - idx + spacesb4Op[3] - 1;
                int col = SZ2_MX - idx;
                String name = "op3" + col;
                col = col + opDp[3] - ansDp;
                switch(col) {
                    case 0: %>
                        <td class="t1" name="<%=name%>"><%=op[3][0]%></td>
                        <% break;
                    case 1: %>
                        <td class="t1" name="<%=name%>"><%=op[3][1]%></td>
                        <% break;
                    case 2: %>
                        <td class="t1" name="<%=name%>"><%=op[3][2]%></td>
                        <% break;
                    case 3: %>
                        <td class="t1" name="<%=name%>"><%=op[3][3]%></td>
                        <% break;
                    case 4: %>
                        <td class="t1" name="<%=name%>"><%=op[3][4]%></td>
                        <% break;
                    case 5: %>
                        <td class="t1" name="<%=name%>"><%=op[3][5]%></td>
                        <% break;
                    case 6: %>
                        <td class="t1" name="<%=name%>"><%=op[3][6]%></td>
                        <% break;
                    default: %>
                        <td class="t1">0</td>
                        <% break;
                }       
            }
        } %>
</tr>
<%  }    %>
<%  if( numOps > 2 ) { %>
<tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {  
            String possDp = (SZ2_MX - idx + 1 == ansDp && ansDp > 0 )? ".":""; %>
            <td class="t2"><%=possDp%></td>
<%          if( idx < spacesb4Op[2] ) { %>
                <td class="t1"></td>
<%          } else { 
                //int col = numDig[2] - idx + spacesb4Op[2] - 1;
                int col = SZ2_MX - idx;
                String name = "op2" + col;
                col = col + opDp[2] - ansDp;
                switch(col) {
                    case 0: %>
                        <td class="t1" name="<%=name%>"><%=op[2][0]%></td>
                        <% break;
                    case 1: %>
                        <td class="t1" name="<%=name%>"><%=op[2][1]%></td>
                        <% break;
                    case 2: %>
                        <td class="t1" name="<%=name%>"><%=op[2][2]%></td>
                        <% break;
                    case 3: %>
                        <td class="t1" name="<%=name%>"><%=op[2][3]%></td>
                        <% break;
                    case 4: %>
                        <td class="t1" name="<%=name%>"><%=op[2][4]%></td>
                        <% break;
                    case 5: %>
                        <td class="t1" name="<%=name%>"><%=op[2][5]%></td>
                        <% break;
                    case 6: %>
                        <td class="t1" name="<%=name%>"><%=op[2][6]%></td>
                        <% break;
                    default: %>
                        <td class="t1">0</td>
                        <% break;
                }       
            }
        } %>
</tr>
<%  }    %>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {  
        String possDp = (SZ2_MX - idx + 1 == ansDp && ansDp > 0 )? ".":""; %>
        <td class="t2"><%=possDp%></td>
<%      if( idx < spacesb4Op[1] ) { %>
            <td class="t1"></td>
<%      } else { 
            //int col = numDig[1] - idx + spacesb4Op[1] - 1;
            int col = SZ2_MX - idx;
            String name = "op1" + col;
            col = col + opDp[1] - ansDp;
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
                case 4: %>
                    <td class="t1" name="<%=name%>"><%=op[1][4]%></td>
                    <% break;
                case 5: %>
                    <td class="t1" name="<%=name%>"><%=op[1][5]%></td>
                    <% break;
                case 6: %>
                    <td class="t1" name="<%=name%>"><%=op[1][6]%></td>
                    <% break;
                default: %>
                    <td class="t1">0</td>
                    <% break;
            }       
        }
    } %>
</tr>

<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        String possDp = (SZ2_MX - idx + 1 == ansDp && ansDp > 0 )? ".":"";
%>
        <td class="t2"><%=possDp%></td>
<%      if( idx < spacesb4Op[0] - 1 ) { %>            
            <td class="t1"></td>
<%      } else if ( idx == spacesb4Op[0] - 1 ){ %>
            <td class="t1"> + </td>
<%      } else {
            //int col = numDig[0] - idx + spacesb4Op[0]; 
            int col = SZ2_MX - idx;
            String name = "op0" + col;
            col = col + opDp[0] - ansDp;
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
                case 3: %>
                    <td class="t1" name="<%=name%>"><%=op[0][3]%></td>
                    <% break; 
                case 4: %>
                    <td class="t1" name="<%=name%>"><%=op[0][4]%></td>
                    <% break;
                case 5:  %>
                    <td class="t1" name="<%=name%>"><%=op[0][5]%></td>
                    <% break;
                case 6:  %>
                    <td class="t1" name="<%=name%>"><%=op[0][6]%></td>
                    <% break;
                default: %>
                    <td class="t1">0</td>
                    <% break;
            }
        }
    } %>
</tr> 



    <tr><th class="th-id1" colspan="<%=colspan%>"></th></tr>
    <tr>
<%  int spacesb4an = SZ2_MX + 1 - maxAnDig; // entire width of table minus 
                                            // answer spaces
    for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="t2">
        <span name="dec-pt" onclick="chooseThis( <%=idx%> )" class="dp" >_</span>
        </td>
<%      if( idx >= spacesb4an ) { 
            int col = SZ2_MX - idx;
            if( col < 0 || col > SZ2_MX-1 ) {
                System.out.print("reducing ans col from " + col );
                col = 0;
                System.out.println(" to " + col);
            }
            String name = "an" + col;  %>
            <td class="t1"><input type="text" name="<%=name%>" class="a1" size="1" 
            value="<%=ans[col]%>"
            onkeyup="justAdd(<%=col%>)"></td>
<%      } else { 
            String possZero; 
            if( ansDp >= maxAnDig && idx > SZ2_MX - ansDp - 1 ) {
                possZero = "yesThis";
            } else {
                possZero = "notThis";
            }%>
            <td class="t1"><label class="b1" name="<%=possZero%>">0</label></td>
<%      } 
    }  %>  
    </tr>


<table>
</div>
<div class="d4">
<!--this is where error messages get displayed//-->
<label id="wrongans" class="msg"></label>
</div>
<div class="d3">
<label id="decRmdr" class="msg">Click where the decimal point should be</label>
</div>
    <input type="hidden" id="whatbox" value="<%=whatBx[bdx]%>" class="shortbox"> 
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

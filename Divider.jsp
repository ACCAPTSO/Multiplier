<%-- 
    Document   : Divider
    Created on : Dec 3, 2015, 12:23:00 PM
    Author     : irene
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="Divider.css" type="text/css">
<script src="Multiplier.js"></script>
<script src="Subtractor.js"></script>
<script src="dragger.js"></script>
</head>
<body>
   
<%  final int SZ2_MX = 12; // maximum dividend + divisor + 1 size
    final int maxOps = 2;
    final double NEXP = 2.6; // used to generate # of digits 
    final double DEXP = 1.4; // used to generate digits themselves or # operands
    boolean noBorrowsCk = true;
    boolean borrowsCk = false;
    boolean fxDecPtCk = false;
    boolean varDecPtCk = false;
    String isNoBorrows = "checked";
    String isBorrows = "";
    String isFixedDp = "";
    String isVarDp = "";
    String tmp = "";      // temporary storage for newly gotten 
                          // request parameter
    String whatlvl = "";
    double justLessThn1 = 1 - 1/Double.MAX_VALUE;
    
    int dsMaxDg = 4; //2 + (int)((SZ2_MX - 3)*Math.random());
    int dsMax = (int)(Math.pow(10, dsMaxDg)) - 1;
    int divisor = 1 + (int)(dsMax*Math.random());
    //System.out.println("dsMaxDg = " + dsMaxDg + " dsMax = " + dsMax + " divisor = " + divisor);

    int dvsrDigs = (int)Math.log10(divisor) + 1;
    int qtMaxDg = 7 - dvsrDigs; //(SZ2_MX - dvsrDigs)/dvsrDigs;
    int qtMax = (int)(Math.pow(10, qtMaxDg)) - 1;
    int quotient = 1 + (int)(qtMax*Math.random());
    //System.out.println("dvsrDigs = " + dvsrDigs + " qtMaxDg = " + qtMaxDg + " qtMax = " + qtMax + " quotient = " + quotient);

    //int quotient = 5321;
    //int divisor = 321;
    //int quotient = 21;
    //int divisor = 321;
    int dividend = quotient*divisor;
    int quotDigs = (int)Math.log10(quotient) + 1;
    
    int dvdDigs = (int)Math.log10(dividend) + 1;
    int [] qt;
    int [] ds;
    int [] dd;
    int [] cspan;
    int [] bspan;
    int [] dspan;
    
    qt = new int[quotDigs];
    ds = new int[dvsrDigs];
    dd = new int[dvdDigs];
    cspan = new int[quotDigs];
    bspan = new int[quotDigs];
    dspan = new int[quotDigs];
    int bqspan = 2*dvsrDigs + 1;
    int cqspan = 2*dvdDigs + 1;
    int dqspan = 2*(SZ2_MX + 1) - bqspan - cqspan;
    
    int tmpint = quotient;
    for( int idx = 0; idx < quotDigs; ++idx ) {
        qt[idx] = tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("quotient = " + quotient + " qt[" + idx + "] = " + qt[idx]);
    }

    tmpint = divisor;
    for( int idx = 0; idx < dvsrDigs; ++idx ) {
        ds[idx] = tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("divisor = " + divisor + " ds[" + idx + "] = " + ds[idx]);
    }
    tmpint = dividend;
    for( int idx = 0; idx < dvdDigs; ++idx ) {
        dd[idx] = tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("dividend = " + dividend + " dd[" + idx + "] = " + dd[idx]);
    }
    
    int spacesb4quot = dvsrDigs + 1 + dvdDigs - quotDigs;
    
    if(( tmp = request.getParameter("difflvl")) != null ) {
        noBorrowsCk = false;
        isNoBorrows = "";
        whatlvl = tmp;
        if( whatlvl.equals("No Borrows") ) {
            noBorrowsCk = true;
            isNoBorrows = "checked";
        } else if( whatlvl.equals("Borrows")) {
            borrowsCk = true;
            isBorrows = "checked";
        } else if( whatlvl.equals("Fixed Decimal Point")) {
            fxDecPtCk = true;
            isFixedDp = "checked";
        } else if( whatlvl.equals("Variable Decimal Point")) {
            varDecPtCk = true;
            isVarDp = "checked";
        }
    }
    
    int numOps = 2;
    int colspan = 2*(SZ2_MX + 1);
    int[][][] op;       // operand's first index is what subtraction   
                        // second index is what operand (top/bottom)
                        // third index is what digit of that operand
    int [] borrows;
    int [] carries;
    
    int operand[] = new int[quotDigs*maxOps];
    op = new int[quotDigs][maxOps][SZ2_MX+1];
    int [][] numDig = new int[quotDigs][maxOps]; // how many digits do operands have
    int [][] spacesb4Op = new int[quotDigs
            ][maxOps];
    tmpint = dividend;
    // use only the first few digits
    int lastDig = 0;
    while( tmpint > qt[quotDigs-1]*divisor ) {
        lastDig = tmpint % 10;
        tmpint = tmpint / 10;
    }
    // back off the last digit removed
    if( tmpint != qt[quotDigs-1]*divisor ) {
        tmpint = tmpint*10 + lastDig;
    }
    int s = quotDigs-1; // there may be more quotient digits than subtractions
    int f = 0; // actual subtractions
    while( s >= 0 ) {
        //System.out.println("f = " + f + " s = " + s );
        operand[f*maxOps+0] = qt[s]*divisor;
        operand[f*maxOps+1] = tmpint - operand[f*maxOps+0];

        numDig[f][0] = operand[f*maxOps+0] > 0? 
                (int)Math.log10(operand[f*maxOps+0]) + 1: 1;
        numDig[f][1] = operand[f*maxOps+1] > 0? 
                (int)Math.log10(operand[f*maxOps+1]) + 1: 1;       
        // need to bring down more digits in some cases fixit
        // bring down next 
        
        //System.out.println("f = " + f + " prod = " + operand[f*maxOps+0]);
        //System.out.println("diff = " + operand[f*maxOps+1]);
        if( operand[f*maxOps+1] < 0 ) {
            System.out.println("diff = " + operand[f*maxOps+1] + " that's messed up");
            break;
        }
        //System.out.println("tmpint = " + tmpint);

        spacesb4Op[f][0] = spacesb4quot + quotDigs - s - numDig[f][0] - 1;
        //System.out.println("spacesb4Op[" + s + "][0] = " + spacesb4Op[s][0]);
        //System.out.println("numDig[" + s + "][0] = " + numDig[s][0]);
        int tmpint2 = operand[f*maxOps+0];
        for( int idx = 0; idx < numDig[f][0]; ++idx ) {
            op[f][0][idx] = tmpint2 % 10;
            tmpint2 = tmpint2 / 10;
            //System.out.println("op[" + s + "][0][" + idx + "] = " + op[s][0][idx]);
        }
        spacesb4Op[f][1] = spacesb4quot + quotDigs - s - numDig[f][1] - 1;
        //System.out.println("spacesb4Op[" + s + "][1] = " + spacesb4Op[s][1]);
        //System.out.println("numDig[" + s + "][1] = " + numDig[s][1]);
        tmpint2 = operand[f*maxOps+1];
        for( int idx = 0; idx < numDig[f][1]; ++idx ) {
            op[f][1][idx] = tmpint2 % 10;
            tmpint2 = tmpint2 / 10;
            //System.out.println("op[" + s + "][1][" + idx + "] = " + op[s][1][idx]);
        }
        cspan[f] = 2*numDig[f][0] + 1;
        bspan[f] = 2*spacesb4Op[f][0] + 1;
        dspan[f] = 2*(SZ2_MX + 1) - bspan[f] - cspan[f];
        if( s == 0 ) {
            break; // don't need to generate tmpint for the next loop, you're 
        }          // done
        boolean restAreZero = false;
        if( operand[f*maxOps+1] == 0 ) {            // if difference is zero
            restAreZero = true;                     // check if there is 
            for( int idx = s-1; idx >= 0; --idx ) { // anything but zeros left
                if( dd[idx] != 0 ) {
                    restAreZero = false;
                    break; // rest are not zero, stop checking
                }
            }
        }
        if( restAreZero ) {  
            break; // all checked to be zero, break out of outer loop
        }

        // bring down as many new digits as needed to get something divisor
        // will go into
        tmpint = operand[f*maxOps+1];
        while( tmpint < divisor ) {
            tmpint = 10*tmpint + dd[s-1];
            //System.out.println("tmpint = " + tmpint + " divisor = " + divisor + " f = " + f + " s = " + s );
            s = s - 1;
        }
        f = f + 1;
    } 
    //int opDp[] = new int[maxOps]; // operand decimal point positions
    int maxDp = 0; // max decimal point 
    if( fxDecPtCk || varDecPtCk ) {
        maxDp = (int)(SZ2_MX*Math.random());
    }
    int ansDp = 0;

    String isLinedUp = "true";
    
    int digMax = 10;
    int minDp = 0;

    borrows = new int[quotDigs*(SZ2_MX+1)];
    carries = new int[quotDigs*(SZ2_MX+1)];
    String[] ans;   // final answer string   
    String[] cas;   // additive carry string 
    cas = new String[SZ2_MX+1];
    ans = new String[SZ2_MX+1];
    int jdx;
    int kdx;
    int ldx = 0;
    int bdx = 0;            // box index used to track what box is selected
    
    int[] whatBx;
    whatBx = new int[maxOps*SZ2_MX];
    int maxBx = 20;
    
    for( int sbx = 0; sbx < quotDigs; ++sbx ) {
        for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            cas[idx] = "";
            ans[idx] = "";
            borrows[sbx*SZ2_MX + idx] = 0;
            carries[sbx*SZ2_MX + idx] = 0;
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
    
    int dec = 0;
    int [] nacarries;
    nacarries = new int[quotDigs];
    
    for( int sbx = 0; sbx < quotDigs; ++ sbx ) {
        //int diff = opDp[1] - opDp[0];
        int kdxmax = numDig[sbx][1];
        for (kdx = 0; kdx < kdxmax; kdx++) {
            boolean needsCarry = true;
            //int oneidx = kdx+diff;

                //System.out.println("op[1][" + oneidx + "] = " + op[1][oneidx] + " dec = " + dec + " op[0][" + kdx + "] = " + op[0][kdx]);
            if( op[sbx][0][kdx] <= op[sbx][1][kdx] - dec ) {
                needsCarry = false;
            }

            if( needsCarry ) {
                borrows[kdx+1] = (0 < kdx+1 && kdx+1 < SZ2_MX)? op[sbx][1][kdx+1] - 1: -1;
                carries[kdx] = 1;
                dec = 1;
                nacarries[sbx] += 1;          
            } else {
                dec = 0;
            }
            nacarries[sbx] = 0; // fixit
            //System.out.println("carries[" + kdx + "] = " + carries[kdx]);
        }
    }
    double maxAns = operand[1] - operand[0];
    
    int maxAnDig = 0;
    if( maxAns > 0 ) {
        maxAnDig = 1 + (int)Math.log10(maxAns );
    }
    maxAnDig += ansDp;
   
    int ar = 2*nacarries[0];  // first additive carry 
    int qu = ar + maxAnDig - 1; // lsb of final answer box

    for( int idx = 0; idx < maxAnDig; idx++ ) {
        whatBx[ldx] = qu - idx; // final answer boxes
        ldx++;
    }
    whatBx[ldx] = qu + 1;

    maxBx = ldx + 1; %>
<div >
<form id="th-id2" method="get" action="Divider.jsp">
<div class="d2">
<table class="tbl">
<tr><th id="F1" colspan="<%=colspan%>">Division Problem</th></tr>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="t2"></td>
<%      if( idx < spacesb4quot || spacesb4quot + quotDigs <= idx ) { %>
            <td class="t1"></td>
<%        } else {
            int col = SZ2_MX - idx;
            String name = "qt" + col;  %>
            <td class="t1"><input type="text" name="<%=name%>" class="a1" size="1" 
            onkeyup="subtract(<%=col%>)"></td>
<%        }
    } %>
</tr>
<tr><th class="th-id1" colspan="<%=bqspan%>"></th>
    <th colspan="<%=cqspan%>"></th>
    <th class="th-id1" colspan="<%=dqspan%>"></th>
</tr>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="t2"></td>
<%      if( idx < dvsrDigs ) { 
            int col = dvsrDigs - 1 - idx; %>
            <td class="t1" ><%=ds[col]%></td>
<%      } else if( idx == dvsrDigs ) { %>
            <td class="t1" >)</td>
<%      } else if( idx <= dvsrDigs + dvdDigs ) { 
            int col = dvsrDigs +  dvdDigs - idx;
            //System.out.println("dividend col = " + col); %>
            <td class="t1" ><%=dd[col]%></td>
<%      } else { %>
            <td class="t1" ></td>
<%      }
    } %>
</tr>
<%  for( int sbx = 0; sbx <= f; ++sbx ) {
    //System.out.println( "now sbx is " + sbx );
    if( nacarries[0] > 0 ) { %>
        <tr>
    <%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                int col = SZ2_MX - idx;
                if( carries[col] != 0 ) { 
                    String name = "ca" + col; 
                    if( col < 0 || col >= SZ2_MX ) {
                         System.out.println("ca col = " + col + "being reduced to 0");
                         col = 0;
                    } %>
                    <td class="t2">
                        <input type="text" name="<%=name%>" class="f2" 
                         value="<%=cas[col]%>" onkeyup="checkBorrow(<%=col%>)"
                         onclick="promptBorrow(<%=col%>)">
                    </td>
    <%          } else { %>
                    <td class="t2"></td>
    <%          } 
                if( col > 0 && carries[col-1] != 0 ) { 
                    String name = "bo" + col; 
                    if( col < 0 || col > SZ2_MX ) {
                         System.out.println("bo col = " + col + "being reduced to 0");
                         col = 0;
                    } %>
                    <td class="t1">
                        <input type="text" name="<%=name%>" class="f1"
                               onkeyup="checkNewVal(<%=col%>)">
                    </td>
    <%          } else { %>
                    <td class="t1"></td>
    <%          } 
            } %>
        </tr>
<% } %>
    <tr class="oprand">
    <%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="t2"></td>
    <%      if( idx < spacesb4Op[sbx][0] ) { %>
                <td class="t1"></td>
<%          } else if ( idx == spacesb4Op[sbx][0] ){ %>
                <td class="t1"> - </td>
    <%      } else if( idx <= spacesb4Op[sbx][0] + numDig[sbx][0] ) {          
                //int col = numDig[0] - idx + spacesb4Op[0]; 
                int col = spacesb4Op[sbx][0] + numDig[sbx][0] - idx;
                String name = "op0" + col;
                if( 0 <= col && col < numDig[sbx][0] ) {
                    //System.out.print("op[" + sbx + "][0][" + col + "] = " + op[sbx][0][col] );
                } else {
                    //System.out.print("col out of range");
                }
                //System.out.println(" product sbx =  " + sbx + " idx = " + idx + " col = " + col);
                switch(col) {
                    case 0: %>
                        <td class="t1" name="<%=name%>"><%=op[sbx][0][0]%></td>
                        <% break; 
                    case 1: %>
                        <td class="t1" name="<%=name%>"><%=op[sbx][0][1]%></td>
                        <% break;
                    case 2:  %>
                        <td class="t1" name="<%=name%>"><%=op[sbx][0][2]%></td>
                        <% break;
                    case 3:  %>
                        <td class="t1" name="<%=name%>"><%=op[sbx][0][3]%></td>
                        <% break;
                    case 4:  %>
                        <td class="t1" name="<%=name%>"><%=op[sbx][0][4]%></td>
                        <% break;
                    default: %>
                        <td class="t1">0</td>
                        <% break;
                }
            } else { %>
                <td class="t1"></td>
<%          }
        } %>
    <tr><th class="th-id1" colspan="<%=bspan[sbx]%>"></th>
        <th colspan="<%=cspan[sbx]%>"></th>
        <th class="th-id1" colspan="<%=dspan[sbx]%>"></th>
    </tr>
        <tr class="oprand">
    <%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {  %>
            <td class="t2"></td>
    <%      if( idx <= spacesb4Op[sbx][1] ) { %>
                <td class="t1"></td>
    <%      } else if( idx <= spacesb4Op[sbx][1] + numDig[sbx][1] ) { 
                //int col = numDig[1] - idx + spacesb4Op[1] - 1;
                int col = spacesb4Op[sbx][1] + numDig[sbx][1] - idx;
                String name = "op1" + col;
                if( 0 <= col && col < numDig[sbx][1] ) {
                    //System.out.print("op[" + sbx + "][1][" + col + "] = " + op[sbx][1][col] );
                } else {
                    //System.out.print("col out of range");
                }
                //System.out.println(" difference sbx =  " + sbx + " idx = " + idx + " col = " + col);

                switch(col) {
                    case 0: %>
                        <td class="t1" name="<%=name%>" onclick="promptBorrow(<%=col%>)">
                            <%=op[sbx][1][0]%>
                        </td>
                        <% break;
                    case 1: %>
                        <td class="t1" name="<%=name%>" onclick="promptBorrow(<%=col%>)">
                            <%=op[sbx][1][1]%>
                        </td>
                        <% break;
                    case 2: %>
                        <td class="t1" name="<%=name%>" onclick="promptBorrow(<%=col%>)">
                            <%=op[sbx][1][2]%>
                        </td>
                        <% break;
                    case 3: %>
                        <td class="t1" name="<%=name%>" onclick="promptBorrow(<%=col%>)">
                            <%=op[sbx][1][3]%>
                        </td>
                        <% break;
                     case 4: %>
                        <td class="t1" name="<%=name%>" onclick="promptBorrow(<%=col%>)">
                            <%=op[sbx][1][4]%>
                        </td>
                        <% break;
                    default: name = "ze1" + col; %>
                        <td class="t1" name="<%=name%>" onclick="promptBorrow(<%=col%>)">
                            0
                        </td>
                        <% break;
                }       
            } else { %>
                <td class="t1"></td>
<%          }
        } %>
    </tr>
<% } %>
</table>
</div>
<div id="statusBox0" class="d2"></div>
<div id="statusBox1"></div>
<div id="statusBox2"></div>
<div id="statusBox3"></div>

<% if( isLinedUp == "false" ) { %>
<table>
    <% for( int i = 0; i < numOps; i++ ) { %>
    <tr class="DragBox">
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="t2" style="color:purple">_</td><td class="t1" name="bob" style="color:purple">o</td>
<%      }   %>
    </tr>

<%  }   %>
</table>
    <% } %>
<div class="d3">
<!--this is where error messages get displayed//-->
<label id="msg"></label>
</div>
<div class="d3">
<label id="dispBo">
<%  if( nacarries[0] > 0) { %>
            Click on a digit to borrow from it
<%  } %>
</label>
</div>
<input type="hidden" id="whatbox" value="<%=whatBx[bdx]%>" class="shortbox"> 
<div class ="d1">
<div class="d4">  
<table>
    <tr><th colspan="1">Highest Difficulty Level</th></tr>
    <tr><td>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="No Borrows" 
            <%=isNoBorrows%> onclick="zeroCounts()">
        <label>No Borrows</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Borrows"
            <%=isBorrows%> onclick="zeroCounts()">
        <label>Borrows</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Fixed Decimal Point" 
            <%=isFixedDp%> onclick="zeroCounts()"> 
        <label>Fixed Decimal Point</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Variable Decimal Point" 
            <%=isVarDp%> onclick="zeroCounts()">
        <label>Variable Decimal Point</label>
    </td></tr>
</table>
</div>

<div class="d5">
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
</div>                  

<input type="hidden" id="strtTime" name="strtTimeP" value="<%=strtTime%>" class="shortbox">
<input type="hidden" id="ansDp" value="<%=ansDp%>" class="shortbox">
<% for( int idx = 0; idx <= maxBx; idx++ ) { %>
    <input type="hidden" name="nextbox" value="<%=whatBx[idx]%>" class="shortbox">
<% } %>
<input type="hidden" id="bdx" value="<%=bdx%>" class="shortbox">
<input type="hidden" id="lastbox" value="<%=maxBx%>" class="shortbox">
<input type="hidden" id="linedUp" value="<%=isLinedUp%>" class="shortbox">


</form>

</div>
</body>
</html>


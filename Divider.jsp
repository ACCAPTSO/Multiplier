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
<script src="Divider.js"></script>
</head>
<body>
   
<%  // make the user click on the original box fixit
    // 2nd divisor dig around 5 is harder to estimate fixit
    // count it wrong if the user gueses a quotient digit 3 times fixit
    // don't show individual multiplier boxes until you need them fixit
    // need worst case number of borrow and carry boxes in jsp  fixit
    final int SZ2_MX = 12; // maximum dividend + divisor + 1 size
    final int maxOps = 2;
    final double NEXP = 2.6; // used to generate # of digits    
    final double DEXP = 1.4; // used to generate digits themselves or # operands

    boolean immFeedBkCk = true;
    boolean estRequiredCk = false;
    boolean remaindersCk = false;
    boolean exDpCk = false;
    boolean recDpCk = false;
    String isImmFeedBk = "checked";
    String isEstRequired = "";
    String isRemainders = "";
    String isExDp = "";
    String isRecDp = "";
    String tmp = "";      // temporary storage for newly gotten 
                          // request parameter
    String whatlvl = "";
    double justLessThn1 = 1 - 1/Double.MAX_VALUE;

    int dsMaxDg = 2 + (int)(3*Math.random()); // 2-4 digits
    //int dsMaxDg = 3 + (int)(2*Math.random()); // 3-5 digits
    //dsMaxDg = 3;
    int dsMax = (int)(Math.pow(10, dsMaxDg)) - 1;
    int divisor = 1 + (int)(dsMax*Math.random());
    //divisor = 51; // last line of product boxes skipping lsd
    //divisor = 6495; // had issue with restAreZero fixit
    //divisor = 94 // sometimes gives wrong box after mcarry fixit
    //divisor = 3717;
    //divisor = 57; // whatborbx or cabx does not exist does it matter? fixit
    //divisor = 4975;

    //divisor = 497; // bringdowns not being counted for nextbox fixit

    //divisor = 77;
    //divisor = 6851;
    //divisor = 28;
    //System.out.println("dsMaxDg = " + dsMaxDg + " dsMax = " + dsMax + " divisor = " + divisor);

    int dvsrDigs = (int)Math.log10(divisor) + 1;
    int qtMaxDg = 7 - dvsrDigs; //(SZ2_MX - dvsrDigs)/dvsrDigs;
    int qtMax = (int)(Math.pow(10, qtMaxDg)) - 1;
    int quotient = 1 + (int)(qtMax*Math.random());
    //quotient = 56205; // last line of product boxes skipping lsd 
    //quotient = 302; // had issue with restAreZero fixit
    //quotient = 27793; // sometimes gives wrong box after mcarry fixit
    //quotient = 137;
    //quotient = 65241;// whatborbx or cabx does not exist does it matter? fixit
    //quotient = 160;
    //quotient = 5007; // bringdowns not being counted for nextbox fixit
    //quotient = 53094;
    //quotient = 237;
    //quotient = 3100904; // combination with divisor = 28 gives leading 0 in one of the arguments. is that a problem? fixit
    //System.out.println("dvsrDigs = " + dvsrDigs + " qtMaxDg = " + qtMaxDg + " qtMax = " + qtMax + " quotient = " + quotient);

    //int quotient = 5321;
    //int divisor = 321;
    //int quotient = 21;
    //int divisor = 321;
    int dividnd = quotient*divisor;
    int quotDigs = (int)Math.log10(quotient) + 1;
    
    int dvdDigs = (int)Math.log10(dividnd) + 1;
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
    
    int [] numBringDn = new int[quotDigs];
    int tmpint = quotient;
    for( int idx = 0; idx < quotDigs; ++idx ) {
        qt[idx] = tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("quotient = " + quotient + " qt[" + idx + "] = " + qt[idx]);
        numBringDn[idx] = 0;
    }

    tmpint = divisor;
    for( int idx = 0; idx < dvsrDigs; ++idx ) {
        ds[idx] = tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("divisor = " + divisor + " ds[" + idx + "] = " + ds[idx]);
    }
    tmpint = dividnd;
    for( int idx = 0; idx < dvdDigs; ++idx ) {
        dd[idx] = tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("dividend = " + dividnd + " dd[" + idx + "] = " + dd[idx]);
    }
    
    int spacesb4quot = dvsrDigs + 1 + dvdDigs - quotDigs;

    if(( tmp = request.getParameter("difflvl")) != null ) {
        immFeedBkCk = false;
        isImmFeedBk = "";
        whatlvl = tmp;
        if( whatlvl.equals("Immediate Feedback") ) {
            immFeedBkCk = true;
            isImmFeedBk = "checked";
        } else if( whatlvl.equals("Estimation Required")) {
            estRequiredCk = true;
            isEstRequired = "checked";
        } else if( whatlvl.equals("Remainders")) {
            remaindersCk = true;
            isRemainders = "checked";
        } else if( whatlvl.equals("Exact Decimals")) {
            exDpCk = true;
            isExDp = "checked";
        } else if( whatlvl.equals("Recurring Decimals")) {
            recDpCk = true;
            isRecDp = "checked";
        }
    }
    
    boolean showBrowsCk = false;
    String isShowBrows = "";
    String helplist[] = request.getParameterValues("showhelp");
    if( helplist  != null ) {
        for( int idx = 0; idx < helplist.length; idx++ ) {
            if( helplist[idx].equals("Show Borrows") ) {
                showBrowsCk = true;
                isShowBrows = "checked";
            }
        }
    }
    int numOps = 2;
    int colspan = 2*(SZ2_MX + 1);
    int[][][] op;       // operand's first index is what subtraction   
                        // second index is what operand (top/bottom)
                        // third index is what digit of that operand
    int [][] borrows;
    int [][] ncarries; // tracks if carry is needed
    
    int [][] mcarries; // multiplicative carries
    
    int [][] operand = new int[quotDigs][maxOps];
    int [][] calcOp = new int[quotDigs][maxOps];
    op = new int[quotDigs][maxOps][SZ2_MX+1];
    int [][] actDig = new int[quotDigs][maxOps];
    int [][] wcDig = new int[quotDigs][maxOps];
    int [][] calcDig = new int[quotDigs][maxOps];
    int [] calcBdDig = new int[quotDigs];
    int [][] spacesb4Op = new int[quotDigs][maxOps];
    int ansDp = 0;
    
    tmpint = dividnd;
    // use only the first few digits
    int lastDig = 0;
    int worstCaseQdig = 9;
    while( tmpint > qt[quotDigs-1]*divisor ) {
    //while( tmpint > worstCaseQdig*divisor ) { // worst case, biggest quotient digit
        lastDig = tmpint % 10;
        tmpint = tmpint / 10;
    }
    // back off the last digit removed
    if( tmpint != qt[quotDigs-1]*divisor ) {
   //if( tmpint != worstCaseQdig*divisor ) {
        tmpint = tmpint*10 + lastDig;
    }
    int whatquotDig = quotDigs-1; // there may be more quotient digits than subtractions
    int nsubs = 0; // actual subtractions
    System.out.println("divisor = " + divisor + " quotient = " + quotient + " dividnd = " + dividnd );
    while( whatquotDig >= 0 ) {
        operand[nsubs][0] = qt[whatquotDig]*divisor;
        int WCoperand0 = worstCaseQdig*divisor; // worst case, biggest operand
        operand[nsubs][1] = tmpint - operand[nsubs][0];
        int WCoperand1 = tmpint - divisor; 

        actDig[nsubs][0] = operand[nsubs][0] > 0? 
                (int)Math.log10(operand[nsubs][0]) + 1: 1;
        actDig[nsubs][1] = operand[nsubs][1] > 0? 
                (int)Math.log10(operand[nsubs][1]) + 1: 1;
        wcDig[nsubs][0] = WCoperand0 > 0? 
                (int)Math.log10(WCoperand0) + 1: 1;
        wcDig[nsubs][1] = WCoperand1 > 0? 
                (int)Math.log10(WCoperand1) + 1: 1;
        
        if( operand[nsubs][1] < 0 ) {
            System.out.println("diff = " + operand[nsubs*maxOps+1] + " that's messed up");
            break;
        }

        //spacesb4Op[nsubs][0] = spacesb4quot + quotDigs - whatquotDig - numDig[nsubs][0] - 1;
        int mostPossProdDig = (int)Math.log10(9*divisor) + 1;
        spacesb4Op[nsubs][0] = spacesb4quot + quotDigs - whatquotDig - mostPossProdDig - 1;
        System.out.println("spacesb4quot = " + spacesb4quot + "+ quotDigs = " + quotDigs + "- whatQuotDig = " + whatquotDig + " - mostPossProdDig = " + mostPossProdDig + " - 1 = " + " spacesb4Op[" + nsubs + "][0] = " + spacesb4Op[nsubs][0]);
        int tmpint2 = operand[nsubs][0];
        for( int idx = 0; idx < actDig[nsubs][0]; ++idx ) {
            op[nsubs][0][idx] = tmpint2 % 10; // what are these even used for? fixit
            tmpint2 = tmpint2 / 10;
        }
        spacesb4Op[nsubs][1] = spacesb4quot + quotDigs - whatquotDig - wcDig[nsubs][1] - 1;
        tmpint2 = operand[nsubs][1];
        for( int idx = 0; idx < actDig[nsubs][1]; ++idx ) {
            op[nsubs][1][idx] = tmpint2 % 10;
            tmpint2 = tmpint2 / 10;
        }
        cspan[nsubs] = 2*wcDig[nsubs][0] + 1;
        bspan[nsubs] = 2*spacesb4Op[nsubs][0] + 1;
        dspan[nsubs] = 2*(SZ2_MX + 1) - bspan[nsubs] - cspan[nsubs];
        if( whatquotDig == 0 ) {
            break; // don't need to generate tmpint nsubsor the next loop, you're 
        }          // done
        boolean restAreZero = false;
        if( operand[nsubs][1] == 0 ) {            // if difference is zero
            restAreZero = true;                     // check if there is 
            for( int idx = whatquotDig-1; idx >= 0; --idx ) { // anything but zeros left
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
        tmpint = operand[nsubs][1];
        numBringDn[nsubs] = 0;
        while( tmpint < divisor ) {
            tmpint = 10*tmpint + dd[whatquotDig-1];
            whatquotDig = whatquotDig - 1;
            numBringDn[nsubs] += 1;
        }
        //System.out.println("operand[" + nsubs + "][1] = " + operand[nsubs][1] + " numDig[" + nsubs + "][1] = " + numDig[nsubs][1] + " numBringDn[" + nsubs + "] = " + numBringDn[nsubs]);
        nsubs = nsubs + 1;
    } 

    String isLinedUp = "true";
    
    int digMax = 10;
    int minDp = 0;

    borrows = new int[quotDigs][(SZ2_MX+1)];
    ncarries = new int[quotDigs+1][(SZ2_MX+1)];
    
    mcarries = new int[quotDigs][SZ2_MX+1];
    for( int idx = 0; idx < quotDigs; idx++ ){
        for( int jdx = 0; jdx < dvsrDigs-1; jdx++ ){
            mcarries[idx][jdx] = qt[idx]*ds[jdx];
            if( jdx > 0 ){
                mcarries[idx][jdx] = mcarries[idx][jdx] + mcarries[idx][jdx-1];
            }    
            mcarries[idx][jdx] = mcarries[idx][jdx]/10;
            //System.out.print(" mcarries[" + idx + "][" + jdx + "] = " + mcarries[idx][jdx]);
        }
    }
    String[] ans;   // final answer string   
    String[] cas;   // additive carry string 
    cas = new String[SZ2_MX+1];
    ans = new String[SZ2_MX+1];
    //int jdx;
    int kdx;
    int ldx = 0;
    int bdx = 0;            // box index used to track what box is selected
    
    int[] whatBx;
    whatBx = new int[SZ2_MX*maxOps*SZ2_MX]; // enough for quotient and
                                            // all the multiplications and
                                            // subtractions
    int maxBx = 20;                      
    
    for( int sbx = 0; sbx < quotDigs; ++sbx ) {
        for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            cas[idx] = "";
            ans[idx] = "";
            borrows[sbx][idx] = 0;
            ncarries[sbx][idx] = 0;
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
    
    //if( showBrowsCk ) {
        int bdidx = quotDigs - 1;
        for( int sbx = 0; sbx < quotDigs; ++ sbx ) {
            nacarries[sbx] = 0;
            int kdxmax = sbx == 0? dvdDigs - quotDigs + 1 : wcDig[sbx-1][1] + numBringDn[sbx-1]; //numBringDn[sbx-1];
            if( sbx > 0  ) {
                bdidx -= numBringDn[sbx-1];
            }
            for (kdx = 0; kdx < kdxmax; kdx++) { // kdx goes 1 too big fixit
                boolean needsCarry = true;
                //System.out.println("sbx = " + sbx + " kdx = " + kdx + " kdxmax = " + kdxmax + " numDig[" + sbx + "][1] = " + numDig[sbx][1]);
                //System.out.println("bring down dividend index " + bdidx);
                int minuend;
                if( sbx == 0 ) {
                        //System.out.println("straight dividend minuend");
                    minuend = dd[kdx+quotDigs-1];
                } else if( kdx < numBringDn[sbx-1] ) {
                        //System.out.println("bring down minuend");
                    minuend = dd[bdidx];
                } else {
                        //System.out.println("previous diff minuend");
                    minuend = op[sbx-1][1][kdx-numBringDn[sbx-1]];
                }
                //if( op[sbx][0][kdx] <= minuend - dec ) {
                //    needsCarry = false;
                //}
                if( kdx >= kdxmax-1 || (sbx > 0 && wcDig[sbx-1][1] < 2 ) ) {
                    needsCarry = false;
                }
                    //System.out.println("sbx = " + sbx + " kdx = " + kdx + " dec = " + dec + " minuend = " + minuend +  " op[sbx][0][" + kdx + "] = " + op[sbx][0][kdx]);
                if( needsCarry ) {
                    borrows[sbx][kdx+1] = (0 < kdx+1 && kdx+1 < SZ2_MX)? minuend - 1: -1;
                    ncarries[sbx][kdx] = 1;
                    dec = 1;
                    nacarries[sbx] += 1;          
                } else {
                    dec = 0;
                }
                    //System.out.println("nacarries[" + sbx + "] = " + nacarries[sbx]);
                if( sbx > 0 && kdx <  numBringDn[sbx-1] ) {
                    bdidx += 1;
                }
            }
            if( sbx > 0  ) {
                bdidx -= numBringDn[sbx-1]; // back off the single increments
            }
        }
    //}

    int [] em;
    int [] en;
    int [] oh;
    int [] pe;
    
    em = new int[quotDigs]; // least significant digit of each multiplication
    en = new int[quotDigs]; // least significant digit of each subtraction
    oh = new int[quotDigs]; // least significant digit on new dividend
    pe = new int[quotDigs]; // first used of the multiplicative carries
    
    int nmcars = 0;
    int crows = 0;
    for( int idx = quotDigs - 1; idx >= 0; --idx ) {
        
        //if( qt[idx] > 1 ) { // worst case everything has a carry
            nmcars += (dvsrDigs - 1);
            crows += 1;
        //}
        //System.out.println("qt[" + idx + "] = " + qt[idx] + " nmcars = " + nmcars + " crows = " + crows );
    }
    em[0] = nmcars + 2*nacarries[0] + quotDigs - 1;
    //em[0] = nmcars + 4*nacarries[0] + quotDigs - 1; // with hidden borrows anc carries in same table
    for( int idx = 0; idx <= nsubs; ++idx ) {
        if( idx > 0 ) {
            em[idx] = oh[idx-1];
        }
        em[idx] += actDig[idx][0];
        //System.out.println("em[" + idx + "] = " + em[idx] + " numDig[" + idx + "][1] = " + numDig[idx][1]);
        en[idx] = em[idx] + actDig[idx][1];
        if( idx < nsubs ) {
            //System.out.println("nacarries = " + nacarries[idx+1]);
            en[idx] += 2*nacarries[idx+1];
            //en[idx] += 4*nacarries[idx+1]; // with hidden borrows and carries in same table
        }
        oh[idx] = en[idx] + numBringDn[idx];
        pe[idx] = nmcars - 1 - (dvsrDigs - 1)*idx;
        //System.out.println("em[" + idx + "] = " + em[idx] + " en[" + idx + "] = " + en[idx] + " oh[" + idx + "] = " + oh[idx] + " pe[" + idx + "] = " + pe[idx]);
    }
    int lastbox = 0;
    for( int idx = 0, mdx = 0, ndx = 0, pdx = 0, qdx = nmcars, rdx = 1; qdx < nmcars + quotDigs; ++qdx ) {
        whatBx[ldx] = qdx; // quotient box indexes
        if( whatBx[ldx] > lastbox ) {
            lastbox = whatBx[ldx];
        }
        //System.out.println("quotient whatBx[" + ldx + "] = " + whatBx[ldx] );
        ++ldx;
        //int lastcarry = numDig[idx][0] - 2;
        for( ; mdx < actDig[idx][0]; ++mdx  ) { // product box indexes
            whatBx[ldx] = em[idx] - mdx;
            //System.out.println("product whatBx[" + ldx + "] = " + whatBx[ldx] );
            ++ldx;
            if( mcarries[quotDigs-1-qdx+nmcars][mdx] > 0 ) {
                whatBx[ldx] = pe[pdx] - mdx;
                //System.out.println("mcarry whatBx[" + ldx + "] = " + whatBx[ldx]);
                ++ldx;
            }
        }
        for( ; ndx < actDig[idx][1]; ++ndx  ) { // difference box indexes
            whatBx[ldx] = en[idx] - ndx;
            if( whatBx[ldx] > lastbox ) {
                lastbox = whatBx[ldx];
            }
            //System.out.println("difference whatBx[" + ldx + "] = " + whatBx[ldx] );
            ++ldx;
        }
        //System.out.println("pdx = " + pdx + " numBringDn[" + idx + "] = " + numBringDn[idx] );
        if( rdx <= numBringDn[idx] ) { // bringdown box indexes
            whatBx[ldx] = en[idx] + rdx;
            //System.out.println("bringdown whatBx[" + ldx + "] = " + whatBx[ldx] + " pdx = " + pdx + " oh[" + idx + "] = " + oh[idx]);
            ++ldx;
            ++rdx;
            if( rdx > numBringDn[idx] ) { // reset for next row of products
                ++idx;                    // and differences
                rdx = 1;
                mdx = 0;
                ndx = 0;
                
            }
        }
        if( qt[quotDigs-1-qdx+nmcars] > 1 ){
            ++pdx;
        }
    }

    whatBx[ldx] = lastbox + 1;
    maxBx = ldx; // + 1; 
    String browType = "hidden";    
    if( showBrowsCk ) {
        browType = "text";
    }%>
<div >
<form id="th-id2" method="get" action="Divider.jsp">
<div class="d2">
<table class="tbl">
<tr><th id="F1" colspan="<%=colspan%>">Division Problem</th></tr>
<%  for( int sbx = crows - 1; sbx > 0; --sbx ) { %>
        <tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
            if( idx < dvsrDigs - 1 ) { 
                int col = dvsrDigs - 2 - idx;
                String cname = "cm" + col + "_" + sbx; %>
                <td class="t2"><input type="hidden" name="<%=cname%>" class="c2" 
                                      onkeyup="checkMcarry(<%=col%>,<%=sbx%>)" ></td>
<%          } else {  %>
                <td class="t2"></td>
<%          } %>
            <td class="t1"></td>
<%      } %>
        </tr>
<%  } %>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        if( idx < dvsrDigs - 1 && crows > 0 ) { 
            int col = dvsrDigs - 2 - idx;
            String cname = "cm" + col + "_0"; %>
            <td class="t2"><input type="hidden" name="<%=cname%>" class="c2" 
                                  onkeyup="checkMcarry(<%=col%>,0)"></td>
<%      } else {  %>
            <td class="t2"></td>
<%      }
        if( idx < spacesb4quot || spacesb4quot + quotDigs <= idx ) { %>
            <td class="t1"></td>
<%      } else {
            int col = spacesb4quot + quotDigs - 1 - idx;
            String qid = "qt" + col;  %>
            <td class="t1"><input type="text" id="<%=qid%>" class="a1" size="1" 
            onkeyup="divide(<%=immFeedBkCk%>, <%=col%>, <%=qt[col]%> )"></td>
<%      }
    } %>
</tr>
<tr><th class="th-id1" colspan="<%=bqspan%>"></th>
    <th colspan="<%=cqspan%>"></th>
    <th class="th-id1" colspan="<%=dqspan%>"></th>
</tr>
<%    if( nacarries[0] > 0 ) { %>
        <tr>
    <%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                int ocol = dvsrDigs + dvdDigs - idx;
                int col = dvsrDigs + dvdDigs - quotDigs + 1 - idx;
                String name = "boca0"; 
                if( dvsrDigs < idx && idx < dvsrDigs + dvdDigs - quotDigs + 2
                        && ncarries[0][col] != 0 ) { 
                    String cid = "ca" + ocol + "_0"; 
                    if( ocol < 0 || ocol >= SZ2_MX ) {
                         System.out.println("ca ocol = " + ocol + "being reduced to 0");
                         ocol = 0;
                    } %>
                    <td class="s2">
                        <input type="<%=browType%>" name="<%=name%>" id="<%=cid%>"
                        class="f2" onkeyup="checkDivBorrow(<%=ocol%>, 0)"
                        onclick="promptDivBorrow(<%=ocol%>, 0)">
                    </td>
    <%          } else { %>
                    <td class="s2"></td>
    <%          } 
                if( col > 0 && ncarries[0][col-1] != 0 ) { 
                    String bid = "bo" + ocol + "_0" ; 
                    if( ocol < 0 || ocol > SZ2_MX ) {
                         System.out.println("bo ocol = " + ocol + "being reduced to 0");
                         ocol = 0;
                    } %>
                    <td class="s1">
                        <input type="<%=browType%>" name="<%=name%>" id="<%=bid%>"
                        class="f1" onkeyup="checkNewDivVal(<%=ocol%>, 0 )">
                    </td>
    <%          } else { %>
                    <td class="s1"></td>
    <%          } 
            } %>
        </tr>
<% } %>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
        <td class="t2"></td>
<%      if( idx < dvsrDigs ) { 
            int col = dvsrDigs - 1 - idx; %>
            <td class="t1" name="dvsrdigs" ><%=ds[col]%></td>
<%      } else if( idx == dvsrDigs ) { %>
            <td class="t1" >)</td>
<%      } else if( idx <= dvsrDigs + dvdDigs ) { 
            int col = dvsrDigs +  dvdDigs - idx;
            //System.out.println("dividend col = " + col); %>
            <td class="t1" name="dvddigs" onclick="promptDivBorrow(<%=col%>, 0)">
                <%=dd[col]%>
            </td>
<%      } else { %>
            <td class="t1" ></td>
<%      }
    } %>
</tr>
<%  for( int sbx = 0; sbx <= nsubs; ++sbx ) {
    int rdx = sbx + 1; %>

    <tr class="oprand">
    <%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="t2"></td>
    <%      if( idx < spacesb4Op[sbx][0] ) { %>
                <td class="t1"></td>
<%          } else if ( idx == spacesb4Op[sbx][0] ){ 
                String minusName="minus" + sbx; %>
                <td class="t3" id="<%=minusName%>" > - </td>
    <%      } else if( idx <= spacesb4Op[sbx][0] + wcDig[sbx][0]) {          
                //int col = numDig[0] - idx + spacesb4Op[0]; 
                int col = spacesb4Op[sbx][0] + wcDig[sbx][0] - idx;
                String name = "op" + sbx + "_0";
                String whattype = "hidden";
                if( 0 <= col && col < wcDig[sbx][0] ) {
                    //System.out.print("op[" + sbx + "][0][" + col + "] = " + op[sbx][0][col] );
                } else {
                    //System.out.print("col out of range");
                }
                //System.out.println(" product sbx =  " + sbx + " idx = " + idx + " col = " + col);
                %>
                <td class="t1">
                <input type="<%=whattype%>" name="<%=name%>" class="a1" size="1" 
                onkeyup="multiply( <%=col%> )">
                </td>
 <%           } else { %>
                <td class="t1"></td>
<%          }
        } 
        String barName = "cspan" + sbx; %>
    </tr>
    <tr><th class="th-id1" colspan="<%=bspan[sbx]%>"></th>
        <th id="<%=barName%>" class="th-id1" colspan="<%=cspan[sbx]%>"></th>
        <th class="th-id1" colspan="<%=dspan[sbx]%>"></th>
    </tr>
<%  if( rdx <= nsubs && nacarries[rdx] > 0 ) {  %>
        <tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            //int col = spacesb4Op[sbx][0] + numDig[sbx][0] - idx;
            int col = spacesb4Op[sbx][0] + wcDig[sbx][0] + numBringDn[sbx] - idx;
            if( col < 0 ) {
                col = SZ2_MX;
            }
            String name = "boca" + rdx; 
            if( spacesb4Op[sbx][0] < idx && 
                    idx <= spacesb4Op[sbx][0] + wcDig[sbx][0] + numBringDn[sbx] && 
                    ncarries[rdx][col] != 0 ) {  

                String cid = "ca" + col + "_" + rdx; 
                if( col < 0 || col >= SZ2_MX ) {
                    System.out.println("ca col = " + col + "being reduced to 0");
                    col = 0;
                } %>
                <td class="s2">
                        <input type="<%=browType%>" name="<%=name%>" id="<%=cid%>"
                        class="f2" onkeyup="checkDivBorrow(<%=col%>, <%=rdx%>)"
                        onclick="promptDivBorrow(<%=col%>, <%=rdx%>)">
                </td>
<%          } else { %>
                <td class="s2"></td>
<%          } 
            if( col > 0 && ncarries[rdx][col-1] != 0 ) { 
                String bid = "bo" + col + "_" + rdx; 
                if( col < 0 || col > SZ2_MX ) {
                         System.out.println("bo col = " + col + "being reduced to 0");
                         col = 0;
                } %>
                <td class="s1">
                    <input type="<%=browType%>" name="<%=name%>" id="<%=bid%>" 
                    class="f1" onkeyup="checkNewDivVal(<%=col%>, <%=rdx%>)">
                </td>
<%          } else { %>
                    <td class="s1"></td>
<%          } 
         } %>
        </tr>
<% } %>
        <tr class="oprand">
    <%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
            String whattype = "hidden"; %>
            <td class="t2"></td>
    <%      if( idx <= spacesb4Op[sbx][1] ) { %>
                <td class="t1"></td>
<%      } else if( idx <= spacesb4Op[sbx][1] + wcDig[sbx][1] ) { 
                //int col = numDig[1] - idx + spacesb4Op[1] - 1;
                int col = spacesb4Op[sbx][1] + wcDig[sbx][1] - idx;
                int ocol = spacesb4Op[sbx][1] + wcDig[sbx][1] + numBringDn[sbx] - idx;
                String name = "op" + sbx + "_1"; 
                 %>
                <td class="t1">
                <input type="<%=whattype%>" name="<%=name%>" class="a1" size="1" 
                onkeyup="subtract( <%=col%>, <%=sbx%> )" 
                onclick="promptDivBorrow(<%=ocol%>, <%=rdx%>)">
                </td>
    <%      } else if( idx <= spacesb4Op[sbx][1] + wcDig[sbx][1]  + numBringDn[sbx] ) { 
                //int col = numDig[1] - idx + spacesb4Op[1] - 1;
                int col = spacesb4Op[sbx][1] + wcDig[sbx][1] + numBringDn[sbx] - idx;
                int ocol = spacesb4Op[sbx][1] + wcDig[sbx][1] + numBringDn[sbx] - idx;
                String name = "bd" + sbx;
                if( 0 <= col && col < wcDig[sbx][1] ) {
                    //System.out.print("op[" + sbx + "][1][" + col + "] = " + op[sbx][1][col] );
                } else {
                    //System.out.print("col out of range");
                }
                //System.out.println(" difference sbx =  " + sbx + " idx = " + idx + " col = " + col);

%>
                <td class="t1">
                <input type="<%=whattype%>" name="<%=name%>" class="a1" size="1" 
                onkeyup="bringdown( <%=sbx%> )"
                onclick="promptDivBorrow(<%=ocol%>, <%=rdx%>)">
                </td>
 <%                 
            } else { %>
                <td class="t1"></td>
<%          }
        } %>
    </tr>
<% } %>
</table>
<input type="hidden" id="whatbox" value="<%=whatBx[bdx]%>" class="shortbox">
<input type="hidden" id="lastBoxOfCurrRow">
<table>
<%  //for( int sbx = crows - 1; sbx > 0; --sbx ) { 
    for( int sbx = crows - 1; sbx > 0; --sbx ) {%>
        <tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
            if( idx < dvsrDigs - 1 ) { 
                int col = dvsrDigs - 2 - idx;
                String cid = "hcm" + col + "_" + sbx; %>
                <td><input type="hidden" id="<%=cid%>" ></td>
<%          }
        } %>
        <tr>
<%  } %>
<tr>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        if( idx < dvsrDigs - 1 && crows > 0 ) { 
            int col = dvsrDigs - 2 - idx;
            String cid = "hcm" + col + "_0"; %>
            <td><input type="hidden" id="<%=cid%>"></td>
<%      }
    } %>
</tr>
</table>
<table>
    <tr>
<%    if( nacarries[0] > 0 ) {
    for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                int ocol = dvsrDigs + dvdDigs - idx;
                int col = dvsrDigs + dvdDigs - quotDigs + 1 - idx;
                if( dvsrDigs < idx && idx < dvsrDigs + dvdDigs - quotDigs + 2
                        && ncarries[0][col] != 0 ) { 
                    String hid = "hca" + ocol + "_0"; 
                    if( ocol < 0 || ocol >= SZ2_MX ) {
                         System.out.println("ca col = " + ocol + "being reduced to 0");
                         ocol = 0;
                    } %>
                    <td><input type="hidden" id="<%=hid%>" value="0"></td>
    <%          } 
                if( col > 0 && ncarries[0][col-1] != 0 ) { 
                    String hid = "hbo" + ocol + "_0" ; 
                    if( ocol < 0 || ocol > SZ2_MX ) {
                         System.out.println("bo col = " + ocol + "being reduced to 0");
                         ocol = 0;
                    } %>
                    <td><input type="hidden" id="<%=hid%>" value="-2"></td>
    <%          } 
            } 
} %>
</tr>
<%  for( int sbx = 0; sbx <= nsubs; ++sbx ) {
    int rdx = sbx + 1; 

    if( rdx <= nsubs && nacarries[rdx] > 0 ) {  %>
    <tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            //int col = spacesb4Op[sbx][0] + numDig[sbx][0] - idx;
            int col = spacesb4Op[sbx][0] + wcDig[sbx][0] + numBringDn[sbx] - idx;
            if( col < 0 ) {
                col = SZ2_MX;
            }
            if( spacesb4Op[sbx][0] < idx && 
                    idx <= spacesb4Op[sbx][0] + wcDig[sbx][0] + numBringDn[sbx] && 
                    ncarries[rdx][col] != 0 ) {  
                String hid = "hca" + col + "_" + rdx; 
                if( col < 0 || col >= SZ2_MX ) {
                    System.out.println("ca col = " + col + "being reduced to 0");
                    col = 0;
                } %>
                <td><input type="hidden" id="<%=hid%>" value="0"></td>
<%          } 
            if( col > 0 && ncarries[rdx][col-1] != 0 ) { 
                String hid = "hbo" + col + "_" + rdx; 
                if( col < 0 || col > SZ2_MX ) {
                         System.out.println("bo col = " + col + "being reduced to 0");
                         col = 0;
                } %>
                <td><input type="hidden" id="<%=hid%>" value="-2"></td>
<%          } 
         } %>
         </tr>
<%   }
} %>
</table>
<div id="statusBox0"></div>
<div id="statusBox1"></div>
<div id="statusBox2"></div>
<div id="statusBox3"></div>
<div id="statusBox4"></div>
<div id="statusBox5"></div>
<div id="statusBox6"></div>
<div id="statusBox7"></div>
<div id="statusBox8"></div>
<div id="statusBox9"></div>
<div id="statusBox10"></div>
<div id="statusBox11"></div>
<div id="statusBox12"></div>
<div id="statusBox13"></div>
<div id="statusBox14"></div>
<div id="statusBox15"></div>
<div id="statusBox16"></div>
<div id="statusBox17"></div>
<div id="statusBox18"></div>
<div id="statusBox19"></div>

</div>
<div class="d3">
<!--this is where error messages get displayed//-->
<label id="msg"></label>
</div>
<div class="d3">
<label id="dispBo">
<% boolean thereAreCarries = false;
for( int idx = 0; idx < nsubs; ++ idx ) { 
    if( nacarries[idx] > 0 ) {
        thereAreCarries = true;
        break;
    }
}
if( thereAreCarries && showBrowsCk ) { %>
            Click on a digit to borrow from it
<%  } %>
</label>
</div>


<div class ="d1">
<div class="d4">  
<table>
    <tr><td><input type="checkbox" value="Show Borrows" name="showhelp" 
                   <%=isShowBrows%> onclick="zeroCounts()">
            <label>Show Borrows</label>
        </td></tr>
    <tr><th colspan="1">Highest Difficulty Level</th></tr>
    <tr><td>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Immediate Feedback" 
            <%=isImmFeedBk%> onclick="zeroCounts()">
        <label>Immediate Feedback</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Estimation Required"
            <%=isEstRequired%> onclick="zeroCounts()">
        <label>Estimation Required</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Remainders" 
            <%=isRemainders%> onclick="zeroCounts()"> 
        <label>Remainders</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Exact Decimals" 
            <%=isExDp%> onclick="zeroCounts()">
        <label>Exact Decimals</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Recurring Decimals" 
            <%=isRecDp%> onclick="zeroCounts()">
        <label>Recurring Decimals</label>
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
<% 
for( int idx = 0; idx < quotDigs; idx++ ) {
    for( int jdx = 0; jdx < maxOps; jdx++ ) { 
        String cid = "calcDig" + idx + "_" + jdx;
        String oid = "operand" + idx + "_" + jdx;  %>
        <input type="hidden" id="<%=cid%>" value="<%=calcDig[idx][jdx]%>" class="shortbox">
        <input type="hidden" id="<%=oid%>" value="<%=calcOp[idx][jdx]%>" class="shortbox">
<%  }
     String bid = "bringdown" + idx; %>
     <input type="hidden" id="<%=bid%>" value="<%=calcBdDig[idx]%>" class="shortbox">
<% } %>
<input type="hidden" id="bdx" value="<%=bdx%>">
<input type="hidden" id="lastbox" value="<%=maxBx%>" class="shortbox">
<input type="hidden" id="linedUp" value="<%=isLinedUp%>" class="shortbox">
<input type="hidden" id="divisor" value="<%=divisor%>" >
<input type="hidden" id="quotDigs" value="<%=quotDigs%>" >
<input type="hidden" id="quotient" value="<%=quotient%>" >
<input type="hidden" id="nextQuotBox" >
<input type="hidden" id="rowNo" value="0" >
<input type="hidden" id="dividend" value="<%=dividnd%>" >
</form>

</div>
</body>
</html>


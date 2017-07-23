<%-- 
    Document   : Estimation
    Created on : Jun 22, 2016, 11:14:06 AM
    Author     : frieda
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <%@ page import="java.util.regex.Pattern,javax.ejb.EJB,java.util.TreeMap" %>
    <%@ page import="com.frieda.Question,com.frieda.Format" %>
    <link rel="stylesheet" href="Estimation.css" type="text/css">
    <title>Estimation</title>
    <script src="Estimation.js"></script>
    <script src="Multiplier.js"></script>
    <script src="Open.js"></script>
</head>
<body>
    
<% 
    //sometimes the upper or lower bound is equal the answer fixit
    // subtraction upper and lower ranges uses different # decimal places fixit
    // if you highlight where the answers are hidden they show up fixit
    // divide by one occurs too frequently distribution wrong? fixit
    // with negatives doesn't work for addition, multiplication, division fixit

    final int N_OPERATORS = 4;
    final double DEXP = 2.6;
    final double EXP = 1.4;
    //final double EXP = 1.8;
    //final double EXP = 2.8;
    System.out.println("XOXOXOXOXOXOXOX   starting estimation problem    XOXOXOXOXOXOXOXOXOXOX");
    int nOperators = 0;
    String[] operators = new String[N_OPERATORS];
    /*  operators and numbers */
    String[][] alt = {{ "", "1", "2", ".", "00" },
                      { "", "4", "5", "2", ".", "0", "11" },
                      { "", "5", "6", "3", ".", "0", "1", "4", "22" },
                      { "", "6", "*", "-", "+", ".", "2", "5", "33" },
                      { "", "7", "8", "5", "2", "1", "44" }, 
                      { "", "8", "9", "6", "3", "2", "1", "4", "7", "55" },
                      { "", "9", "/", "*", "-", "3", "2", "5", "8", "66" },
                      { "", "8", "5", "4", "77" },
                      { "", "9", "6", "5", "4", "7", "88" },
                      { "", "/", "*", "6", "5", "8", "99" }
    }; 
 
    /* operators only     }; 
    
    String[][] alt = {{ "", "1", "2", ".", "00" },
                      { "", "4", "5", "2", ".", "0", "11" },
                      { "", "5", "6", "3", ".", "0", "1", "4", "22" },
                      { "*", "-", "+" },
                      { "", "7", "8", "5", "2", "1", "44" }, 
                      { "", "8", "9", "6", "3", "2", "1", "4", "7", "55" },
                      { "/", "*", "-" },
                      { "", "8", "5", "4", "77" },
                      { "", "9", "6", "5", "4", "7", "88" },
                      { "/", "*" }
    };
*/
    // how do you code "=" as in problem prematurely terminated? fixit
    // backspace? fixit
    // E? as in *10^ fixit
    // +/- fixit
    // sqrt fixit
    // % fixit
    // 1/x fixit
    // . fixit
    String[][] altOp = {{"", "-", "3", "*", "." },
                        { "", "*", "+", "3", "6", "/" },
                        { "", "/", "-", "3", "6", "9", "+" },
                        { "", "*", "6", "9" }};
    // numbers only, no operands or decimal points
    /*
    String[][] alt = {{ "", "1", "2", "00" },
                      { "", "4", "5", "2", "0", "11" },
                      { "", "5", "6", "3", "0", "1", "4", "22" },
                      { "", "6", "2", "5", "33" },
                      { "", "7", "8", "5", "2", "1", "44" }, 
                      { "", "8", "9", "6", "3", "2", "1", "4", "7", "55" },
                      { "", "9", "3", "2", "5", "8", "66" },
                      { "", "8", "5", "4", "77" },
                      { "", "9", "6", "5", "4", "7", "88" },
                      { "", "6", "5", "8", "99" }
    };
*/
    boolean additionCk = true;
    boolean multiplicationCk = true;
    boolean subtractionCk = true;
    boolean divisionCk = true;
    boolean decimalsCk = true;
    boolean negativesCk = true;
    String isAddition = "checked";
    String isMultiplication = "checked";
    String isSubtraction = "checked";
    String isDivision = "checked";
    String isDecimals = "checked";
    String isNegatives = "checked";
    int plusCase = -1;
    int multCase = -1;
    int subCase = -1;
    int divCase = -1;

    if( request.getParameter("started") == null ) {
        // Default at startup
        additionCk = true;
        isAddition = "checked";
        operators[nOperators] = "+";
        plusCase = nOperators;
        nOperators += 1;
        multiplicationCk = true;
        isMultiplication = "checked";
        operators[nOperators] = "*";
        multCase = nOperators;
        nOperators += 1;
        subtractionCk = true;
        isSubtraction = "checked";
        operators[nOperators] = "-";
        subCase = nOperators;
        nOperators += 1;
        divisionCk = true;
        isDivision = "checked";
        operators[nOperators] = "/";
        divCase = nOperators;
        nOperators += 1;
        decimalsCk = true;
        isDecimals = "checked";
        negativesCk = false;
        isNegatives = "";
    } else {
        //System.out.println("starting again parameter = >" + request.getParameter("started") + "<" );
        String addlist[] = request.getParameterValues("addition");
        if( addlist  == null ) {
            additionCk = false;
            isAddition = "";
        } else {
            additionCk = true;
            isAddition = "checked";
            operators[nOperators] = "+";
            plusCase = nOperators;
            nOperators += 1;
        }
        String multlist[] = request.getParameterValues("multiplication");
        if( multlist  == null ) {
            multiplicationCk = false;
            isMultiplication = "";
        } else {
            multiplicationCk = true;
            isMultiplication = "checked";
            operators[nOperators] = "*";
            multCase = nOperators;
            nOperators += 1;
        }
        String sublist[] = request.getParameterValues("subtraction");
        if( sublist  == null ) {
            subtractionCk = false;
            isSubtraction = "";
        } else {
            subtractionCk = true;
            isSubtraction = "checked";
            operators[nOperators] = "-";
            subCase = nOperators;
            nOperators += 1;
        }
        String divlist[] = request.getParameterValues("division");
        if( divlist  == null ) {
            divisionCk = false;
            isDivision = "";
        } else {
            divisionCk = true;
            isDivision = "checked";
            operators[nOperators] = "/";
            divCase = nOperators;
            nOperators += 1;
        }
        String declist[] = request.getParameterValues("decimals");
        if( declist  == null ) {
            decimalsCk = false;
            isDecimals = "";
        } else {
            decimalsCk = true;
            isDecimals = "checked";
        }
        String neglist[] = request.getParameterValues("negatives");
        if( neglist  == null ) {
            negativesCk = false;
            isNegatives = "";
        } else {
            negativesCk = true;
            isNegatives = "checked";
        }
    }
    String numAttmptdV = "0";
    String numWoErr = "0";
    String consWoErr = "0";
    String corrPerHr = "0";
    String strtTime = String.valueOf(System.currentTimeMillis());
    String errs = "0";

    String tmp = "";
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
    final int MAX_DGTS = 4;
    final int TWO_XDGTS = 8;
    int maxOpPlus1 = (int)Math.pow(10, MAX_DGTS);
    int nOps = 2;
    int whatOp = (int)(nOperators*Math.random());
    System.out.println("nOperators = " + nOperators + " whatOp = " + whatOp);
    final int maxQstns = 4;
    final int nMucked = maxQstns - 1;
    String operator[] = new String[nMucked];
    operator[0] = operators[whatOp];

    int operand1 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
    int operand2 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();

    if( !negativesCk && operand2 > operand1 && operator[0].compareTo("-") == 0 ) {
        while( operand1 == 0 ) {
            operand1 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
        }
        operand2 = (int)(operand1*Math.random());
    }
    if( operator[0].compareTo("/") == 0 ) {
        // make sure operand2 divides operand1 evenly
        if( !decimalsCk && (operand2 == 0 || operand1 % operand2 != 0 )) {
            System.out.println("operand1 = " + operand1 + " divided by operand2 = " + operand2 + " is not even");
            while( operand2 == 0 || Math.log(operand2) >= MAX_DGTS - 1 ) {
                operand2 = (new Double(1+(maxOpPlus1)*(1 - Math.pow(Math.random(),DEXP)))).intValue();
                //operand2 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
            }
            int finalAns = 
                    (new Double((maxOpPlus1/operand2)*(Math.pow(Math.random(),EXP)))).intValue();;
            
            operand1 = finalAns*operand2;
            System.out.println("operand1 = " + operand1 + " operand2 = " + operand2 + " finalAns = " + finalAns);
        } else {
            while( operand2 == 0 ) {
                operand2 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
            } 
        }
    }
    int decPt1 = 0;
    int decPt2 = 0;  
    int nDgts1 = operand1 > 0 ? 1 + (int)Math.log10(operand1) : 1;
    int nDgts2 = operand2 > 0 ? 1 + (int)Math.log10(operand2) : 1;
    
    if( decimalsCk ) {
        decPt1 = (int)((MAX_DGTS+1)*Math.random());
        decPt2 = (int)((MAX_DGTS+1)*Math.random());
        // make sure answer is positive
        if( !negativesCk && 
                operand2*(int)(Math.pow( 10, decPt1 )) > operand1*(int)(Math.pow(10, decPt2)) && 
                        operator[0].compareTo("-") == 0 ) {
            int dp2Mn = 1 + (int)(Math.log10(operand2*Math.pow(10, decPt1)/operand1));
            decPt2 = dp2Mn + (int)((MAX_DGTS+1-dp2Mn)*Math.random());
            //System.out.println("operand2 = " + operand2 + " decPt1 = " + decPt1 + " operand1 = " + operand1 + " dp2Mn = " + dp2Mn);
        }
        // make sure there are significant digits showing in answer
        if( 1 + nDgts2 - decPt2 - (nDgts1 - decPt1) >= MAX_DGTS &&
                operator[0].compareTo("/") == 0 ) {
            int dp2Mn = 1 + nDgts2 - (nDgts1 - decPt1) - MAX_DGTS;
            decPt2 = dp2Mn + (int)((MAX_DGTS+1-dp2Mn)*Math.random());
            System.out.println("dp2Mn = " + dp2Mn + " decPt2 = " + decPt2);
        }
    } 
    
    int decPtAct = decPt1; // for addition or subtraction assuming decPt1 >= decPt

    String[][] opDgts1 = new String[TWO_XDGTS][]; 
    String[][] opDgts2 = new String[TWO_XDGTS][];
    for( int idx = 0; idx < TWO_XDGTS; ++idx ) {
        opDgts1[idx] = new String[nMucked];
        opDgts2[idx] = new String[nMucked];
    }
    int tmp1 = operand1;
    int tmp2 = operand2;

    for( int i = 0; i < TWO_XDGTS; ++i ) {
        opDgts1[i][0] = String.valueOf(tmp1 % 10);
        opDgts2[i][0] = String.valueOf(tmp2 % 10);
        //System.out.println("opDgts1[" + i + "][0] = " + opDgts1[i][0] + " opDgts2[" + i + "][0] = " + opDgts2[i][0]);
        for(int idx = 0; idx < nMucked; ++idx ) {
            opDgts1[i][idx] = opDgts1[i][0];
            opDgts2[i][idx] = opDgts2[i][0];
        }
        tmp1 /= 10;
        tmp2 /= 10;
    }
    int leastDig = 0; 
    int mostDig = 9;
    int ten2pow = (int)Math.pow(10, nDgts1 - 1);
    long[] actualInt = {Integer.MAX_VALUE, 0, 0 };
    System.out.println("decPt1 = " + decPt1 + " decPt2 = " + decPt2 + " operator = " + operator[0]);

    //int thisMuchBigger = nDgts1 - decPt1 - (nDgts2 - decPt2);
    String [] expl = new String[3];
    /*decPtAct = Operate.op( operator[0], MAX_DGTS, decimalsCk,
            operand1, decPt1, operand2, decPt2, 
            actualInt, expl ); */
    decPtAct = op( operator[0], MAX_DGTS, decimalsCk,
            operand1, decPt1, operand2, decPt2, 
            actualInt, expl );
    double doubleAct = actualInt[1]*Math.pow(10,-decPtAct);
    double doubleMin = actualInt[0]*Math.pow(10,-decPtAct);
    double doubleMax = actualInt[2]*Math.pow(10,-decPtAct);
    leastDig = 0;
    int actpow = 10;
    if( actualInt[1] != 0 ) {
        while( leastDig == 0 ) {
            leastDig = (int)(10*Math.abs(actualInt[1] % actpow))/actpow;
            System.out.println("actpow = " + actpow + " actualInt = " + actualInt[1] + " leastDig = " + leastDig);
            actpow = actpow*10;
        }
    }
    
    String[] actual = new String[3];
    int[] nDigsAct = new int[3];
    for( int i = 0; i < 3; ++i ) {
        nDigsAct[i] = Format.getDigs( actualInt[i] );
        actual[i] = Format.getFormat( actualInt[i], decPtAct, nDigsAct[i] );
        System.out.println("actual[" + i + "] = " + actual[i]);
    }
    
    mostDig = (int)(actualInt[1]/((int)Math.pow(10,nDigsAct[1]-1)));
    System.out.println("operand1 = " + operand1 + " nDgts1 = " + nDgts1);
    System.out.println("operand2 = " + operand2 + " nDgts2 = " + nDgts2);
    System.out.println("actualInt = " + actualInt[1] + " nDigsAct = " + nDigsAct[1] + " decPtAct = " + decPtAct);
    System.out.println("doubleMin = " + doubleMin + " doubleAct = " + doubleAct + " doubleMax = " + doubleMax + " mostDig = " + mostDig );

    StringBuffer entireProb = new StringBuffer();
    entireProb.append( Format.getFormat( operand1, decPt1 ) );
    entireProb.append(" ");
    entireProb.append(operator[0]);
    entireProb.append(" ");
    entireProb.append( Format.getFormat( operand2, decPt2 ) );
    

    long [] finalMucked = new long[nMucked];
    double [] doubleMucked = new double[nMucked];
    String [] muckedString = new String[nMucked];
    int [] muckedDp = new int[nMucked];
    int origOp = -1;
    if( operator[0].compareTo("+") == 0 ) {
        origOp = 0;
    } else if( operator[0].compareTo("-") == 0 ) {
        origOp = 1;
    }else if( operator[0].compareTo("*") == 0 ) {
        origOp = 2;
    } else if( operator[0].compareTo("/") == 0 ) {
        origOp = 3;
    }
    for( int idx = 1; idx < nMucked; ++idx ) {
        operator[idx] = operator[0];
        int whichOpIsMucked = (int)((3*nOps*(nOps-1))*Math.random());
        if( whichOpIsMucked < 4 ) {
            int whichDigIsMucked = (int)(nDgts1*Math.random());
            while( whichDigIsMucked < 0 ) {
                //System.out.println("operand1 = " + operand1 + " nDgts1 = " + nDgts1 + " why is whichDigIsMucked " + whichDigIsMucked + "?");
                whichDigIsMucked = (int)(nDgts1*Math.random());
            }
            int origDig = Integer.parseInt(opDgts1[whichDigIsMucked][0]);
            //origDig = 3*(1+(int)(3*Math.random())); // gives only 3, 6 or 9 debug
            //System.out.println("should be 3, 6 or 9: " + origDig);
            //System.out.println("whichOp = " + whichOpIsMucked +  " whichDig = " + whichDigIsMucked + " origDig  = " + origDig );
            int whichAlt = (int)(alt[origDig].length*Math.random());
            String altDig = alt[origDig][whichAlt];
            opDgts1[whichDigIsMucked][idx] = altDig;
            //System.out.println("whichAlt = " + whichAlt + " altDig = " + altDig);
        } else if( whichOpIsMucked < 5 ) {

            if( 0 <= origOp && origOp < 4 ) {
                int whichAlt = (int)(altOp[origOp].length*Math.random());
                String altDig = altOp[origOp][whichAlt];
                operator[idx] = altDig;
                //System.out.println("whichOp = " + whichOpIsMucked + " whichAlt = " + whichAlt + " altDig = " + altDig);
            } else { 
                // System.out.println("Error: operator = " + operator[idx] + " origOp = " + origOp);
            }
        } else {
            int whichDigIsMucked = (int)(nDgts2*Math.random());
            while( whichDigIsMucked < 0 ) {
                //System.out.println("operand2 = " + operand2 + " nDgts2 = " + nDgts2 + " why is whichDigIsMucked " + whichDigIsMucked + "?");
                whichDigIsMucked = (int)(nDgts2*Math.random());
            }
            int origDig = Integer.parseInt(opDgts2[whichDigIsMucked][0]);
            //origDig = 3*(1+(int)(3*Math.random())); // gives only 3, 6 or 9 debug
            //System.out.println("should be 3, 6 or 9: " + origDig);
            int whichAlt = (int)(alt[origDig].length*Math.random());
            String altDig = alt[origDig][whichAlt];
            opDgts2[whichDigIsMucked][idx] = altDig;
            //System.out.println("whichOp = " + whichOpIsMucked +  " whichDig = " + whichDigIsMucked + " whichAlt = " + whichAlt + " altDig = " + altDig);
        }

        StringBuffer muckedProb = new StringBuffer();
        if( decPt1 >= nDgts1 ) {
            muckedProb.append("0.");
        }
        int tmp4 = decPt1 - 1;
        while( tmp4 >= nDgts1 ) {
            muckedProb.append("0");
            tmp4 = tmp4 - 1;
        }
        for( int i = nDgts1 - 1; i >= 0; --i ) {
            muckedProb.append(opDgts1[i][idx]); 
            if( i == decPt1 ) {
                muckedProb.append(".");
            }
        }
        //muckedProb.append(" ");
        muckedProb.append(operator[idx]);
        //muckedProb.append(" ");
       if( decPt2 >= nDgts2 ) {
            muckedProb.append("0.");
        }
        tmp4 = decPt2 - 1;
        while( tmp4 >= nDgts2 ) {
            muckedProb.append("0");
            tmp4 = tmp4 - 1;
        }
        for( int i = nDgts2 - 1; i >= 0; --i ) {
            muckedProb.append(opDgts2[i][idx]);
            if( i == decPt2 ) {
                muckedProb.append(".");
            }
        }

        StringBuffer tmp5 = new StringBuffer();
        tmp5.append(muckedProb);
        Pattern n = Pattern.compile("[0-9]*");
        Pattern md = Pattern.compile("[/\\*]");
        Pattern pm = Pattern.compile("[+-]");
        Pattern b = Pattern.compile("^\\s");

        int mdx = 0;
        int pdx = 0;
        int qdx = 0;
        int[] dofirst = { -1, -1, -1, -1 };
        int[] dolast = { -1, -1, -1, -1 };
        long[] num = new long[4];
        int[] dp = new int[4];
        String[] muckedOp = new String[4];
        //boolean stillGoing = true;
        boolean countingDp = false;
        //System.out.println("mucked Problem: " + muckedProb);
        // do two consecutive operators imply a "0" between them or is one or the other operators ignored? 
        // nothing followed by operator implies 0 fixit
        // two operators in a row: hp only sees first operator fixit
        // windows only sees second operator fixit
        // last operand blank hp displays previous operand
        // last operand blank 5*3+ = = = counts by 15 in windows standard  or scientific calculator
        // 4+5* = = = 9, 81, 729, 6591 = 9, 9^2, 9^3, 9^4 windows standard calculator
        // 4+5* = = = 29, 54, 79 = 4+5^2, 4+2*5^2, 4+3*5^2 windows scientific calculator
        // 4 + 5 * 2 = 18 in windows basic calculator
        // = 14 in windows scientific calculator
        
        // parse out mucked (mis-typed) problem
        while( tmp5.length() > 0 ) {
            int ndx = 1;
            // find digits
            while( ndx <= tmp5.length() &&
                    n.matcher( tmp5.substring( 0, ndx )).matches() ) {
                //String junk = tmp5.substring( 0, ndx );
                //System.out.println("substring[" + ndx + "] = " + junk );
                ++ndx;
                if( countingDp ) { // count decimal places
                    dp[mdx] = dp[mdx] + 1;
                }
            }
            int current = 0;
            if( ndx-1 > 0 ) {
                try{ // convert digits you have found to an integer
                    current = Integer.valueOf( tmp5.substring( 0, ndx-1 ));
                } catch( NumberFormatException e ) {
                    System.err.println( "System error: " + e.toString() );
                }
            }
            // combine whole and decimal parts
            num[mdx] = (int)Math.pow(10, ndx-1)*num[mdx] + current;
            //System.out.println("current = " + current + " num[" + mdx + "] = " + num[mdx]);
            if( 0 < ndx && ndx <= tmp5.length() && tmp5.charAt(ndx-1) == '.' ) {
                //System.out.println("char at prev ndx = " + tmp5.charAt(ndx-1) );
                countingDp = true;
                tmp5.delete( 0, ndx);
                //System.out.println("remaining mucked equation = " + tmp5 );
            } else {
                countingDp = false;
                while( ndx <= tmp5.length() ){
                    // look for operand
                    if( pm.matcher( tmp5.substring( ndx-1, ndx )).matches() ) {
                        muckedOp[mdx] = tmp5.substring(ndx-1, ndx);
                        dolast[mdx] = mdx;
                        qdx = qdx + 1;
                        mdx = mdx + 1;
                        break;
                    } else if( md.matcher( tmp5.substring( ndx-1, ndx )).matches() ) {
                        muckedOp[mdx] = tmp5.substring(ndx-1, ndx);
                        dofirst[mdx] = mdx;
                        pdx = pdx + 1;
                        mdx = mdx + 1;
                        break;
                    }
                    //System.out.println("not operator substring = >" + tmp5.substring( ndx-1, ndx ) + "<");
                    ++ndx;
                }
                tmp5.delete( 0, ndx);
                //System.out.println("mucked equation without operand = >" + tmp5 + "<");
                // skip over whitespace, if any
                while( tmp5.length() > 0 && b.matcher( tmp5.substring( 0, 1 )).matches()) {
                    //System.out.println("substring = >" + tmp5.substring( 0, 1 ) + "<");
                    tmp5.delete( 0, 1);
                }
                //System.out.println("mucked equation without whitespace = >" + tmp5 + "<");
            }
        }
        for( int i = 0; i <= mdx; ++i ) {
            if( muckedOp[i] != null ) {
                //System.out.println(num[i] + " times 10 to the negative " + dp[i] + " " + muckedOp[i] + " ");
            } else {
                //System.out.println(num[i] + " times 10 to the negative " + dp[i]);
            }
        }

        long[][] prelimAns = new long[4][];
        int [] prelimDp = new int[4];
        for( int i = 0; i < 4; ++i ) {
            prelimAns[i] = new long[3];
            prelimAns[i][1] = num[i];
            prelimDp[i] = dp[i];
        }

        finalMucked[idx] = num[0];
        muckedDp[idx] = dp[0];
        String [] junk = new String[3];

        for( int y = 0; y < mdx; ++y ) {
            int z = dofirst[y];
            if( z >= 0 ) {
                //System.out.println("num[" + y + "] = " + prelimAns[y][1] +  " dp[" + y + "] = " + prelimDp[y] + " muckedOp[" + y + "] = " + muckedOp[y] + " numyplus1 = " + prelimAns[y+1][1] +  " dpyplus1 = " + prelimDp[y+1] + " = ");
                prelimDp[y] = op( muckedOp[y], MAX_DGTS, decimalsCk,
                prelimAns[y][1], prelimDp[y], prelimAns[y+1][1], prelimDp[y+1], 
                prelimAns[y], junk );
                //System.out.println(prelimAns[y][1] + " dp " + prelimDp[y]);
                prelimAns[y+1][1] = prelimAns[y][1];
                finalMucked[idx] = prelimAns[y][1]; // just in case there is no addidion or subtraction
                prelimDp[y+1] = prelimDp[y];
                muckedDp[idx] = prelimDp[y];
            }
        }

        for( int y = 0; y < mdx; ++y ) {
            int z = dolast[y];
            if( z >= 0 ) {
                //System.out.println("prelimAns[" + y + "] = " + prelimAns[y][1] +  " dp[" + y + "] = " + prelimDp[y] + " muckedOp[" + y + "] = " + muckedOp[y] + " prelimAnsyplus1 = " + prelimAns[y+1][1] +  " dpyplus1 = " + prelimDp[y+1] + " = ");
                prelimDp[y] = op( muckedOp[y], MAX_DGTS, decimalsCk,
                prelimAns[y][1], prelimDp[y], prelimAns[y+1][1], prelimDp[y+1], 
                prelimAns[y], junk );
                finalMucked[idx] = prelimAns[y][1];
                muckedDp[idx] = prelimDp[y];
                //System.out.println(finalMucked[idx] + " mucked dp " + muckedDp[idx]);
                prelimAns[y+1][1] = prelimAns[y][1];
                prelimDp[y+1] = prelimDp[y]; 
            }
        }
        doubleMucked[idx] = finalMucked[idx]*Math.pow(10, -muckedDp[idx]);
        muckedString[idx] = Format.getFormat( finalMucked[idx], muckedDp[idx] );
        System.out.println("finalMucked[" + idx + "] = " + finalMucked[idx] + " muckedDp = " + muckedDp[idx] + " string version = " + muckedString[idx]);
        
        // eliminate any duplicate
        for( int i = 1; i < idx; ++i ) {
            if( muckedString[idx].equals(muckedString[i]) ) {
                //System.out.println("duplicate to " + i );
                for( int j = 0; j < TWO_XDGTS; ++j ) { // reset all digits
                    opDgts1[j][idx] = opDgts1[j][0];
                    opDgts2[j][idx] = opDgts2[j][0];
                }
                idx = idx - 1;
                break;
            }
        }
        if( muckedString[idx].equals(actual[1]) ) {
            //System.out.println("duplicate to actualInt" );
            for( int j = 0; j < TWO_XDGTS; ++j ) { // reset all digits
                opDgts1[j][idx] = opDgts1[j][0];
                opDgts2[j][idx] = opDgts2[j][0];
            }
            idx = idx - 1;
        }
    }
    
    Question[] questions = new Question[maxQstns];
    for( int i = 0; i < maxQstns; ++i ) {
        questions[i] = new Question();
    }

    int firstMucked = 0;
    int minQstn = doubleMin < doubleAct ? 0 : 2;
    int maxQstn = doubleAct < doubleMax ? 6 : 4;
    int whichOtherQuestion = (int)(minQstn + (maxQstn-minQstn)*Math.random());

    System.out.println("whichQuestion = " + whichOtherQuestion );
    if( whichOtherQuestion < 2 ) {
        if( whichOtherQuestion == 0 ) {
            questions[firstMucked].setQuesText("Is less than    " + actual[0]);
            questions[firstMucked].setQuesAns( "false" );
        } else {
            questions[firstMucked].setQuesText(  "Is greater than " + actual[0]);
            questions[firstMucked].setQuesAns( "true" );          
        }
        String txt = questions[firstMucked].getQuesText();
        System.out.println("question[" + firstMucked + "] = " + txt );
        firstMucked = firstMucked + 1;
    } else if( whichOtherQuestion > 3 ) {     
        if( whichOtherQuestion == 4 ) {
            questions[firstMucked].setQuesText("Is greater than " + actual[2]);
            questions[firstMucked].setQuesAns( "false" );
        } else {
            questions[firstMucked].setQuesText(  "Is less than    " + actual[2]);
            questions[firstMucked].setQuesAns( "true" );
        }
        String txt = questions[firstMucked].getQuesText();
        System.out.println("question[" + firstMucked + "] = " + txt );
        firstMucked = firstMucked + 1;
    }

    if( origOp == 3 ) { // division
        if( whichOtherQuestion == 2 ) {
            questions[firstMucked].setQuesText("The most significant digit is " + mostDig);
            questions[firstMucked].setQuesAns( "true" );
            String txt = questions[firstMucked].getQuesText();
            System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        } else if( whichOtherQuestion == 3 ) {
            int notMostDig = (7 + mostDig) % 10;
            questions[firstMucked].setQuesText("The most significant digit is " + notMostDig);
            questions[firstMucked].setQuesAns( "false" );
            String txt = questions[firstMucked].getQuesText();
            System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        ten2pow = (int)Math.pow(10,nDigsAct[1]-1);
        for( int idx = firstMucked; idx < nMucked; ++ idx ) {
            //int x = idx;
            questions[idx].setQuesText("Answer equals     " + muckedString[idx] );
            long junk3 = finalMucked[idx]/ten2pow;
            System.out.println("doubleMucked[" + idx + "] = " + doubleMucked[idx] + " mucked msd = " + junk3);       
            // if it's in range and has correct msd, possible
            if( doubleMin <= doubleMucked[idx] && doubleMucked[idx] <= doubleMax && 
                    finalMucked[idx] / ten2pow == mostDig ) {
                questions[idx].setQuesAns( "possible" );
                // if it's equal, true
                if( muckedString[idx].equals(actual[1]) ) {
                    questions[idx].setAltAns( "true" );
                    System.out.println("in fact true");
                } else { // if it's not equal false
                    questions[idx].setAltAns( "false" );
                }
            } else { // if it's not equal false
                questions[idx].setQuesAns( "false" );
            }
            String txt = questions[idx].getQuesText();
            System.out.println("question[" + idx + "] = " + txt );
        }
    } else {
        // is this going to give an "Equals null"? fixit
        if( whichOtherQuestion == 2 && actualInt[1] != 0 ) {
            questions[firstMucked].setQuesText("The least significant digit is " + leastDig);
            questions[firstMucked].setQuesAns( "true" );
            String txt = questions[firstMucked].getQuesText();
            System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        if( whichOtherQuestion == 3 ) {
            int notLeastDig = (7 + leastDig) % 10;
            questions[firstMucked].setQuesText("The least significant digit is " + notLeastDig);
            questions[firstMucked].setQuesAns( "false" );
            String txt = questions[firstMucked].getQuesText();
            System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        for( int idx = firstMucked; idx < nMucked; ++ idx ) {
            int x = idx;
            System.out.println("about to format finalMucked[" + x + "] = " + finalMucked[x]);
            questions[idx].setQuesText("Answer equals     " + muckedString[x] );
            int leastDigx = 0;
            ten2pow = 10;
            if( finalMucked[x] != 0 ) {
                while( leastDigx == 0 ) {
                    leastDigx = (int)(10*Math.abs(finalMucked[x] % ten2pow))/ten2pow;
                    System.out.println("ten2pow = " + ten2pow + " actualInt = " + actualInt[1] + " leastDig = " + leastDig);
                    ten2pow = ten2pow*10;
                }
            }
            System.out.println("doubleMucked[" + x + "] = " + doubleMucked[x] + " leastDigx = " + leastDigx);
            // if it's in range and has correct lsd in correct digit, possible
            if( doubleMin <= doubleMucked[x] && doubleMucked[x] <= doubleMax && 
                    leastDigx == leastDig && actpow == ten2pow ) {
                questions[idx].setQuesAns( "possible" );
                // if it's equal, true
                if( muckedString[x].equals(actual[1]) ) {
                    questions[idx].setAltAns( "true" );
                    System.out.println("in fact true");
                } else { // if it's not equal false
                    questions[idx].setAltAns( "false" );
                }
            } else {     // if it's not equal false
                questions[idx].setQuesAns( "false" );
            }
            String txt = questions[idx].getQuesText();
            System.out.println("question[" + idx + "] = " + txt );
        }
    }
    questions[nMucked].setQuesText("Answer equals     " + actual[1] );
    questions[nMucked].setQuesAns( "possible" );
    questions[nMucked].setAltAns( "true" );
    String txt = questions[nMucked].getQuesText();  
    System.out.println("question[" + nMucked + "] = " + txt );

    // add wrong operand, wrong decimal point, fixit


    // LFSR to scramble questions
    TreeMap<Integer, Question> scramble = new TreeMap();
    int shiftReg = 1 + (int)(0xFFFF*Math.random());
    for( int i = 0; i < maxQstns; ++i ) {
        questions[i].setOrderIndex( i );
        scramble.put( shiftReg, questions[i] );
        int bit15 = (0x8000 & shiftReg) > 0? 1 : 0;
        int bit13 = (0x2000 & shiftReg) > 0? 1 : 0;
        int bit12 = (0x1000 & shiftReg) > 0? 1 : 0;
        int bit10 = (0x0400 & shiftReg) > 0? 1 : 0;
        shiftReg = (( shiftReg << 1 ) & 0xFFFF ) | (((bit15^bit13)^bit12)^bit10);
        //System.out.format("shiftReg = %05X", shiftReg );
    }

   

   



%>
<form id="th-id2" class="offs">
    <a href="javaScript:{openNewWindow( 'EstimationDirections.html' );}">Click Here for Directions</a>
    <table>
    <tr class="hdrRow">
    <th colspan=3 id="checkOne">Check One
    </th>
    <th colspan=6 class="hdr">Estimate Answers to These Types of Problems
    </th>
    <th colspan=3>
    </th>
    </tr>
    <tr>
        <td><input type="checkbox" value="Addition" name="addition" 
                   id="addition"
                   <%=isAddition%> onclick="checkOne()">
        </td>
        <td name="pLables">Addition</td>
        <td><input type="checkbox" value="Multiplication" name="multiplication" 
                   id="multiplication"
                   <%=isMultiplication%> onclick="checkOne()">
        </td>
        <td name="pLables">Multiplication</td>
        <td><input type="checkbox" value="Subtraction" name="subtraction" 
                   id="subtraction"
                   <%=isSubtraction%> onclick="checkOne()">
        </td>
        <td name="pLables">Subtraction</td>
        <td><input type="checkbox" value="Division" name="division" 
                   id="division"
                   <%=isDivision%> onclick="checkOne()">
        </td>
        <td name="pLables">Division</td>
        <td><input type="checkbox" value="Decimals" name="decimals" 
                   <%=isDecimals%> onclick="checkOne()">
        </td>
        <td><label>With Decimals</label></td>
        <td><input type="checkbox" value="Negatives" name="negatives" 
                   <%=isNegatives%> onclick="checkOne()">
        </td>
        <td><label>With Negative Numbers</label></td>
    </tr>
</table>
<table class="problem">
    <tr class="blank"><td class="hdr">Upper Range</td><td class="hdr"><%=expl[2]%></td><td>= <%=actual[2]%></tr>
    <tr class="hdrRow"><td class="hdr">Problem:</td><td class="hdr">  <%=entireProb%></td><td class="blank">= <%=actual[1]%></td></tr>
    <tr class="blank"><td class="hdr">Lower Range</td><td class="hdr"><%=expl[0]%></td><td>= <%=actual[0]%></td></tr>
</table>
<table>
<tr>
<td>                        
<table>
    
    <tr class="hdrRow">
    <td></td>
    <td></td>
    <th colspan=1 class="hdr">True</th>
    <th colspan=1 class="hdr">Possible</th>
    <th colspan=1 class="hdr">False</th>
    <th colspan=2 class="blank">Acceptable Answers</td> 
    </tr>
    
<%      for( int i = 0; i < 4; ++i ) { 
            Integer k = scramble.firstKey();
            Question q = scramble.remove( k );
            String quesText = q.getQuesText();
            String quesAns = q.getQuesAns();
            String altAns = q.getAltAns();
            int x = q.getOrderIndex(); 
            String name = "q" + i;
            String qid = "q" + i;
            String aid = "a" + i;  
            String lid = "l" + i; %>
        <tr>
            <td class="blank">
                <div class="xc"><%=x%></div>
            </td>
            <td>
                <!--can't specify min-width of a td -->
                <div id="<%=qid%>" class="firstbox">
                <%=quesText%>
                </div>
            </td>
            <td class="rad">
                <input type="radio" name="<%=name%>" value="true" onclick="enableCheck()">
            </td>
            <td class="rad">
                <% if( x > 0 ) { %>
                    <input type="radio" name="<%=name%>" value="possible" onclick="enableCheck()">
                <% } %>
            </td>
            <td class="rad">
                <input type="radio" name="<%=name%>" value="false" onclick="enableCheck()" checked="checked">
            </td>
            <td class="blank" >
                <!-- this needs to be all one line or localeCompare s don't work  -->
                <div id="<%=aid%>" class="ansbox"><%=quesAns%></div>
            </td>
            <td class="blank" >
                <!-- this needs to be all one line or localeCompare s don't work  -->
                <div id="<%=lid%>" class="ansbox"><%=altAns%></div>
            </td>
        </tr>
<%      } %>
<tr>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <input type="button" disabled id="Check" value="Check" onclick="checkTF()">
    </td>
    <td></td>
    <td>

    </td>
    <td></td>
</tr>
</table>
</td>
<td>
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
    <td></td>
</tr>
</table>  
</td>
</tr>
</table>


    <div class="offs">
        <a href="/" class="ndx">Home</a>
    </div>
    <div class="offs">
        <a href="index.html" class="ndx">Back to Practice Index</a>
    </div>
<% for( int i = 0; i < 30; ++i ) {
    String sid = "statusBox" + i; %>
    <div id="<%=sid%>"></div>
<% } %>
<input type="hidden" name="started">
<input type="hidden" id="strtTime" name="strtTimeP" value="<%=strtTime%>" class="shortbox">
<input type="hidden" id="bdx" value="3">
<input type="hidden" id="lastbox" value ="no">
</form>
<%!
     static int op( String operator, int MAX_DGTS, boolean decimalsCk,
            long operand1, int decPt1, long operand2, int decPt2, 
            long [] actualInt, String [] expl ) {
        int nDgts1 = operand1 > 0 ? 1 + (int)Math.log10(operand1) : 1;
        int nDgts2 = operand2 > 0 ? 1 + (int)Math.log10(operand2) : 1;
        int thisMuchBigger = nDgts1 - decPt1 - (nDgts2 - decPt2);
        long round1down = operand1; // default is not rounded
        long round1up = operand1;
        long round2down = operand2;
        long round2up = operand2;
        int decPtAct = decPt1;

        int ten2pow = (int)Math.pow(10, nDgts1 - 1);
        if( ten2pow != 0 ) {
            // round to one significant digit
            round1up = ten2pow*((ten2pow + operand1)/ten2pow);
            round1down = ten2pow*(operand1/ten2pow);
        } else {
            // not sure how this would happen
            System.out.println("nDgts1 = " + nDgts1 + " ten2pow = " + ten2pow);
        }

        ten2pow = (int)Math.pow(10, nDgts2 - 1);
        if( ten2pow != 0 ) {
            // round to one significant digit
            round2up = ten2pow*((ten2pow + operand2)/ten2pow);
            round2down = ten2pow*(operand2/ten2pow);
        } else {
            // not sure how this would happen
            System.out.println("nDgts2 = " + nDgts1 + " ten2pow = " + ten2pow);
        }


        if( operator.compareTo("+") == 0 ||
            operator.compareTo("-") == 0 ) {   
            int factor1 = 1;
            int factor2 = 1;

            // line up the decimal points
            if( decPt1 < decPt2 ) {
                factor1 = (int)Math.pow(10,decPt2-decPt1);
                decPtAct = decPt2;
            } else if( decPt1 > decPt2 ) {
                factor2 = (int)Math.pow(10,decPt1-decPt2);
            }
            // If one operand is an order of magnitude bigger than the other,
            // round off to the same decimal place as the smaller number
            if( thisMuchBigger > 0 ) {
                // if there is no overlap
                int lsd = decPt1;
                int copy = (int)operand1;
                while( 10*(copy/10) == copy ) {
                    lsd = lsd + 1;
                    copy = copy/10;
                }
                if( decPt2 - nDgts2 >= lsd ) {
                    round1up = operand1;
                    round1down = operand1;
                } else {
                    ten2pow = (int)Math.pow(10, nDgts1 - thisMuchBigger - 1);
                    if( ten2pow != 0 ) {
                        round1up = ten2pow*((ten2pow+operand1)/ten2pow);
                        round1down = ten2pow*(operand1/ten2pow);
                    }
                }
            } else if( thisMuchBigger < 0 ) {
                // if there is no overlap
                int lsd = decPt2;
                int copy = (int)operand2;
                while( 10*(copy/10) == copy ) {
                    lsd = lsd + 1;
                    copy = copy/10;
                }
                if( decPt1 - nDgts1 >= decPt2 ) {
                    round2up = operand2;
                    round2down = operand2;
                } else {
                    ten2pow = (int)Math.pow(10, nDgts2 + thisMuchBigger - 1);
                    if( ten2pow != 0 ) {
                        round2up = ten2pow*((ten2pow+operand2)/ten2pow);
                        round2down = ten2pow*(operand2/ten2pow);
                    }
                }
            }
            System.out.println("op nDgts1 = " + nDgts1 + " decPt1 = " + decPt1 );
            System.out.println("op nDgts2 = " + nDgts2 + " decPt2 = " + decPt2 );
            System.out.println("op thisMuchBigger = " + thisMuchBigger + " ten2pow = " + ten2pow);
            ten2pow = factor1 > factor2? factor1 : factor2; //(int)Math.pow(10,decPtAct);
            if( operator.compareTo("+") == 0 ) {
                actualInt[2] = (factor1*round1up + factor2*round2up);
                actualInt[1] = factor1*operand1 + factor2*operand2;
                actualInt[0] = (factor1*round1down + factor2*round2down); 
                expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2up, decPt2 );
                expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2down, decPt2 );
            } else {
                // if real answer is positive, don't let lower range be negative
                if( operand1*Math.pow(10,-decPt1) >= operand2*Math.pow(10, -decPt2) && 
                        round2up*Math.pow(10, -decPt2) > round1down*Math.pow(10, -decPt1) ) {
                    round2up = factor1*round1down/factor2;
                // if real answer is negative, don't let upper range be positive
                } else if( operand1*Math.pow(10,-decPt1) < operand2*Math.pow(10, -decPt2) && 
                        round2down*Math.pow(10, -decPt2) < round1up*Math.pow(10, -decPt1) ) {
                    round2down = factor1*round1up/factor2;
                }
                actualInt[2] = (factor1*round1up - factor2*round2down);
                actualInt[1] = factor1*operand1 - factor2*operand2;
                actualInt[0] = factor1*round1down - factor2*round2up;
                expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2down, decPt2 );
                expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2up, decPt2 );
            }
            
        } else if(  operator.compareTo("*") == 0  ) {
            decPtAct = decPt1 + decPt2;
            ten2pow = (int)Math.pow(10,decPtAct);
            actualInt[2] = round1up * round2up;
            actualInt[1] = operand1 * operand2;
            actualInt[0] = round1down * round2down;
            expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator +
                    " " + Format.getFormat( round2down, decPt2);
            expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2up, decPt2 );

        // two might be a better lower bound than 1 fixit
        } else if(  operator.compareTo("/") == 0  ) {
            round2down = ten2pow;
            round2up = 10*ten2pow;
            if( decimalsCk ) {
                ten2pow = (int)Math.pow(10, MAX_DGTS + decPt2 - decPt1);
                decPtAct = MAX_DGTS;
            } else {
                ten2pow = 1;
                decPtAct = 0;
            }
            if( round2down != 0 ) {
                actualInt[2] = ten2pow*operand1 / round2down;
            }
            if( operand2 != 0 ) { // else error or maxint
                /* 
                System.out.println("op ten2pow = " + ten2pow + " operand1 = " + operand1);
                actualInt[1] = (long)ten2pow*operand1;
                System.out.println("op actualInt[1] = " + actualInt[1]);
                actualInt[1] = 10*actualInt[1];
                System.out.println("actualInt[1] = " + actualInt[1]);
                System.out.println("operand2 = " + operand2);
                actualInt[1] = actualInt[1]  / operand2;
                System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = actualInt[1] + 5;
                System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = actualInt[1]/10;
                System.out.println("op actualInt[1] = " + actualInt[1]);
                */
                actualInt[1] = (10*ten2pow*operand1  / operand2 + 5)/10;
            } else { // not sure if this will work when it's not in the jsp page fixit
                System.err.println("tried to divide by zero");
                System.exit(1);
            }
            if( round2up != 0 ) {
                actualInt[0] = ten2pow*operand1 / round2up;
            }
            expl[0] = Format.getFormat( operand1, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2up, decPt2 );
            expl[2] =  Format.getFormat( operand1, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2down, decPt2 );
        }
        if( actualInt[1] == 0 ) {
            decPtAct = 0;
        }
        return decPtAct;
    }

%>
</body>
</html>

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
    // needs mistyped signs fixit
    // needs mistyped decimal points fixit
    // should I figure out why (duplicate to actualInt) or try to prevent it? fixit
    // is there a way to generate a random number that is anything but the correct lsd or msd? fixit
    // doesn't make sense to ask about decimal places when it's always 0 fixit
    // may have another infinite loop fixit

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

    // neither of these should ever be zero. No point. problem is too easy
    // and how do you calculate a range?
    int operand1 = (new Double(1+(maxOpPlus1)*(1 - Math.pow(Math.random(),DEXP)))).intValue();;
    int operand2 = (new Double(1+(maxOpPlus1)*(1 - Math.pow(Math.random(),DEXP)))).intValue();

    boolean isNeg1 = false;
    boolean isNeg2 = false;

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
                    (new Double(1+(maxOpPlus1/operand2)*(1 - Math.pow(Math.random(),DEXP)))).intValue();
  
            operand1 = finalAns*operand2;
            System.out.println("operand1 = " + operand1 + " operand2 = " + operand2 + " finalAns = " + finalAns);
        } else {
            while( operand2 == 0 ) {
                operand2 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
                System.out.println("operand2 was zero, now it is " + operand2);
            } 
        }
    }
    
    int nDgts1 = operand1 > 0 ? 1 + (int)Math.log10(operand1) : 1;
    int nDgts2 = operand2 > 0 ? 1 + (int)Math.log10(operand2) : 1;
    
    if( negativesCk ) {
        boolean changeSign = Math.random() > 0.5;
        if( changeSign ) {
            operand1 = -operand1;
            isNeg1 = true;
        }
        changeSign = Math.random() > 0.5;
        if( changeSign ) {
            operand2 = -operand2;
            isNeg2 = true;
        }
    }
        
    int decPt1 = 0;
    int decPt2 = 0;  

    
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
        if( 2 + nDgts2 - decPt2 - (nDgts1 - decPt1) >= MAX_DGTS &&
            operator[0].compareTo("/") == 0 ) {
            int dp2Mn = 2 + nDgts2 - (nDgts1 - decPt1) - MAX_DGTS;
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
    int tmp1 = Math.abs(operand1);
    int tmp2 = Math.abs(operand2);

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
            nDgts1, nDgts2, isNeg1, isNeg2,
            actualInt, expl );
    
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
    double doubleAct = actualInt[1]*Math.pow(10,-decPtAct);
    double doubleMin = actualInt[0]*Math.pow(10,-decPtAct);
    double doubleMax = actualInt[2]*Math.pow(10,-decPtAct);
    leastDig = 0;
    int actpow = 10;
    int rightDp = decPtAct;//origOp == 2? 
            // decPt1 + decPt2 : decPt1 > decPt2 ? decPt1 : decPt2;
    System.out.println("operator = " + operator[0] + " decPt1 = " + decPt1 + " decpt2 = " + decPt2 + " rightDp = " + rightDp);

    if( actualInt[1] != 0 ) {
        long absActual = Math.abs(actualInt[1]);
        while( leastDig == 0 ) {
            //leastDig = (int)(10*Math.abs(actualInt[1] % actpow))/actpow;
            leastDig = (int)(10*(absActual % actpow))/actpow;
            System.out.println("actpow = " + actpow + " actualInt = " + actualInt[1] + " leastDig = " + leastDig);
            actpow = actpow*10;
            if( rightDp > 0 && leastDig == 0 ) {
                rightDp = rightDp - 1;
                System.out.println("rightDp = " + rightDp);
            }
        }
    }
    
    String[] actual = new String[3];
    int[] nDigsAct = new int[3];
    for( int i = 0; i < 3; ++i ) {
        nDigsAct[i] = Format.getDigs( actualInt[i] );
        actual[i] = Format.getFormat( actualInt[i], decPtAct, nDigsAct[i] );
        System.out.println("actualInt = " + actualInt[i] + " actual[" + i + "] = " + actual[i] + " decPtAct = " + decPtAct + " nDigsAct[" + i + "] = " + nDigsAct[i]);
    }
    
    mostDig = (int)(Math.abs(actualInt[1])/((int)Math.pow(10,nDigsAct[1]-1)));
    System.out.println("operand1 = " + operand1 + " nDgts1 = " + nDgts1);
    System.out.println("operand2 = " + operand2 + " nDgts2 = " + nDgts2);
    System.out.println("actualInt = " + actualInt[1] + " nDigsAct = " + nDigsAct[1] + " decPtAct = " + decPtAct);
    System.out.println("doubleMin = " + doubleMin + " doubleAct = " + doubleAct + " doubleMax = " + doubleMax + " mostDig = " + mostDig );

    StringBuffer entireProb = new StringBuffer();
    entireProb.append( Format.getFormat( operand1, decPt1 ) );
    entireProb.append(" ");
    entireProb.append(operator[0]);
    entireProb.append(" ");
    if( isNeg2 ) {
        entireProb.append("(");
    }
    entireProb.append( Format.getFormat( operand2, decPt2 ) );
    if( isNeg2 ) {
        entireProb.append(")");
    }
    System.out.println("qrs entireProb = " + entireProb);

    long [] finalMucked = new long[nMucked];
    double [] doubleMucked = new double[nMucked];
    String [] muckedString = new String[nMucked];
    int [] muckedDp = new int[nMucked];

    for( int idx = 1; idx < nMucked; ++idx ) {
        operator[idx] = operator[0];
        // 0 - 5 ? how does operand2 get mucked? fixit
        // mucking with operand2 throws division problems way off and
        // it's obvious which answers are not correct. Perhaps
        // you don't want to muck with operand2 as often
        //int whichOpIsMucked = (int)((3*nOps*(nOps-1))*Math.random()); // gives too many Answer = 0 for division
        int whichOpIsMucked = (int)(9*Math.random());
        if( whichOpIsMucked < 4 ) { // 0, 1, 2, 3:  muck with operand1
            int whichDigIsMucked = (int)(nDgts1*Math.random());
            while( whichDigIsMucked < 0 ) {
                //System.out.println("operand1 = " + operand1 + " nDgts1 = " + nDgts1 + " why is whichDigIsMucked " + whichDigIsMucked + "?");
                whichDigIsMucked = (int)(nDgts1*Math.random());
            }
            if( 0 <= whichDigIsMucked && whichDigIsMucked < TWO_XDGTS ) {
                int origDig = Integer.parseInt(opDgts1[whichDigIsMucked][0]);
                boolean isNeg = origDig < 0;
                origDig = Math.abs(origDig);
                if( 0 <= origDig && origDig <= 9 ) {
                    //origDig = 3*(1+(int)(3*Math.random())); // gives only 3, 6 or 9 debug
                    //System.out.println("should be 3, 6 or 9: " + origDig);
                    //System.out.println("whichOp = " + whichOpIsMucked +  " whichDig = " + whichDigIsMucked + " origDig  = " + origDig );
                    int whichAlt = (int)(alt[origDig].length*Math.random());
                    StringBuffer altDig = new StringBuffer(alt[origDig][whichAlt]);
                    if( isNeg && whichDigIsMucked == 0 && 
                        altDig.toString().matches("\\d*")) {
                        altDig.insert(0, "-");
                    }
                    opDgts1[whichDigIsMucked][idx] = altDig.toString();
                    //System.out.println("whichAlt = " + whichAlt + " altDig = " + altDig);
                } else {
                    System.err.println("Error origDig = " + origDig + " should be between 0 and 9 ");
                }
            } else {
                System.err.println( "Error: whichDigIsMucked = " + whichDigIsMucked + " TWO_XDGTS = " + TWO_XDGTS);
            }
        } else if( whichOpIsMucked < 5 ) { // 4: muck with operator

            if( 0 <= origOp && origOp < 4 ) {
                int whichAlt = (int)(altOp[origOp].length*Math.random());
                String altDig = altOp[origOp][whichAlt];
                operator[idx] = altDig;

                System.out.println("whichOp = " + whichOpIsMucked + " whichAlt = " + whichAlt + " altDig = " + altDig);
            } else { 
                System.out.println("Error: operator = " + operator[idx] + " origOp = " + origOp);
            }
        } else { // 5, 6, 7, 8: muck with operand2
            int whichDigIsMucked = (int)(nDgts2*Math.random());

            while( whichDigIsMucked < 0 ) {
                System.out.println("operand2 = " + operand2 + " nDgts2 = " + nDgts2 + " why is whichDigIsMucked " + whichDigIsMucked + "?");
                whichDigIsMucked = (int)(nDgts2*Math.random());
            }
            if( 0 <= whichDigIsMucked && whichDigIsMucked < TWO_XDGTS ) {
                int origDig = Math.abs(Integer.parseInt(opDgts2[whichDigIsMucked][0]));
                System.out.print("whichOp = " + whichOpIsMucked +  " whichDig = " + whichDigIsMucked + " origDig  = " + origDig );
                boolean isNeg = origDig < 0;
                origDig = Math.abs(origDig);
                //origDig = 3*(1+(int)(3*Math.random())); // gives only 3, 6 or 9
                //System.out.println("should be 3, 6 or 9: " + origDig);
                if( 0 <= origDig && origDig <= 9 ) {
                    int whichAlt = (int)(alt[origDig].length*Math.random());
                    StringBuffer altDig = new StringBuffer(alt[origDig][whichAlt]);
                    if( isNeg && altDig.toString().matches("\\d*")) {
                        altDig.insert(0, "-");
                    }
                    opDgts2[whichDigIsMucked][idx] = altDig.toString();
                    System.out.println(" whichAlt = " + whichAlt + " altDig = " + altDig);
                } else { 
                    System.out.println("Error: operator = " + operator[idx] + " origOp = " + origOp);
                }
            } else {
                System.err.println( "Error: whichDigIsMucked = " + whichDigIsMucked + " TWO_XDGTS = " + TWO_XDGTS);
            }
        }

        StringBuffer muckedProb = new StringBuffer();
        if( isNeg1 ) {
            muckedProb.append("-");
        }
        if( decPt1 >= nDgts1 ) {
            muckedProb.append("0.");
            //System.out.println("op1 0. muckedProb = " + muckedProb);
        }
        int tmp4 = decPt1 - 1;
        while( tmp4 >= nDgts1 ) {
            muckedProb.append("0");
            //System.out.println("op1 other 0s muckedProb = " + muckedProb);
            tmp4 = tmp4 - 1;
        }
        for( int i = nDgts1 - 1; i >= 0; --i ) {
            muckedProb.append(opDgts1[i][idx]); 
            //System.out.println("op1 digits muckedProb = " + muckedProb);
            if( i == decPt1 ) {
                muckedProb.append(".");
                //System.out.println("op1 dp muckedProb = " + muckedProb);
            }
        }
        //muckedProb.append(" ");
        muckedProb.append(operator[idx]);
        //System.out.println("operator muckedProb = " + muckedProb);
        //muckedProb.append(" ");
       if( decPt2 >= nDgts2 ) {
            muckedProb.append("0.");
            //System.out.println("op2 0. muckedProb = " + muckedProb);
        }
        if( isNeg2 ) {
            muckedProb.append("-");
        }
        tmp4 = decPt2 - 1;
        while( tmp4 >= nDgts2 ) {
            muckedProb.append("0");
            //System.out.println("op2 other 0s uckedProb = " + muckedProb);
            tmp4 = tmp4 - 1;
        }
        for( int i = nDgts2 - 1; i >= 0; --i ) {
            muckedProb.append(opDgts2[i][idx]);
            //System.out.println("op2 digits muckedProb = " + muckedProb);
            if( i == decPt2 ) {
                muckedProb.append(".");
                //System.out.println("op2 dp muckedProb = " + muckedProb);
            }
        }

        StringBuffer tmp5 = new StringBuffer();
        tmp5.append(muckedProb);
        Pattern s = Pattern.compile("[-]");
        Pattern n = Pattern.compile("[0-9]*");
        Pattern md = Pattern.compile("[/\\*]");
        Pattern pm = Pattern.compile("[+-]");
        Pattern b = Pattern.compile("^\\s");

        int mdx = 0;
        //int pdx = 0;
        //int qdx = 0;
        int[] dofirst = { -1, -1, -1, -1 };
        int[] dolast = { -1, -1, -1, -1 };
        long[] num = new long[4];
        long[] snum = new long[4];
        int[] dp = new int[4];
        String[] muckedOp = new String[4];
        //boolean stillGoing = true;
        boolean countingDp = false;
        int sign = 1;
        System.out.println("about to parse mucked Problem: " + muckedProb);
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
            
            // find sign, if any
            if( !countingDp && s.matcher( tmp5.substring( 0, 1 )).matches() ) {
                sign = -1;
                tmp5.delete( 0, 1);
                //System.out.println("negative");
            }
            int ndx = 1;
            // find digits
            while( ndx <= tmp5.length() &&
                    n.matcher( tmp5.substring( 0, ndx )).matches() ) {
                String junk = tmp5.substring( 0, ndx );
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
            int prevNdx = ndx - 1;
            if( 0 < ndx && ndx <= tmp5.length() && tmp5.charAt(ndx-1) == '.' ) {
                System.out.println("char at " + prevNdx + " = " + tmp5.charAt(prevNdx) );
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
                        // last chance to take sign into account
                        snum[mdx] = sign*num[mdx];
                        sign  = 1;
                        System.out.println("signed number " + num[mdx] + " operator " + muckedOp[mdx]);
                        //qdx = qdx + 1;
                        mdx = mdx + 1;
                        break;
                    } else if( md.matcher( tmp5.substring( ndx-1, ndx )).matches() ) {
                        muckedOp[mdx] = tmp5.substring(ndx-1, ndx);
                        dofirst[mdx] = mdx;
                        // last chance to take sign into account
                        snum[mdx] = sign*num[mdx];
                        sign  = 1;
                        System.out.println("signed number " + num[mdx] + " operator " + muckedOp[mdx]);
                        //pdx = pdx + 1;
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
        // last chance to take sign into account
        snum[mdx] = sign*num[mdx];
        System.out.println("signed number " + snum[mdx] );
        for( int i = 0; i <= mdx; ++i ) {
            if( muckedOp[i] != null ) {
                //System.out.println(num[i] + " times 10 to the negative " + dp[i] + " " + muckedOp[i] + " ");
            } else {
                //System.out.println(num[i] + " times 10 to the negative " + dp[i]);
            }
        }

        long[][] prelimAns = new long[4][];
        int [] prelimDp = new int[4];
        int [] prelimDgts = new int[4];
        for( int i = 0; i < 4; ++i ) {
            prelimAns[i] = new long[3];
            prelimAns[i][1] = snum[i];
            prelimDgts[i] = num[i] > 0 ? 1 + (int)Math.log10(num[i]) : 1;
            prelimDp[i] = dp[i];
            System.out.println("prelimAns[" + i + "][1] = " + prelimAns[i][1] + " prelimDp[" + i + "] = " + prelimDp[i]);
        }

        finalMucked[idx] = num[0];
        muckedDp[idx] = dp[0];
        String [] junk = new String[3];

        for( int y = 0; y < mdx; ++y ) {
            int z = dofirst[y];
            if( z >= 0 ) {
                System.out.print("num[" + y + "] = " + prelimAns[y][1] +  " dp[" + y + "] = " + prelimDp[y] + " muckedOp[" + y + "] = " + muckedOp[y] + " numyplus1 = " + prelimAns[y+1][1] +  " dpyplus1 = " + prelimDp[y+1] + " = ");
                //prelimDp[y] = op( muckedOp[y], MAX_DGTS, decimalsCk,
                prelimDp[y] = op( muckedOp[y], MAX_DGTS, true,
                prelimAns[y][1], prelimDp[y], prelimAns[y+1][1], prelimDp[y+1], 
                prelimDgts[y], prelimDgts[y+1], prelimAns[y][1] < 0, prelimAns[y+1][1] < 0,
                prelimAns[y], junk );
                System.out.println(prelimAns[y][1] + " dp " + prelimDp[y]);
                prelimAns[y+1][1] = prelimAns[y][1];
                finalMucked[idx] = prelimAns[y][1]; // just in case there is no addidion or subtraction
                prelimDp[y+1] = prelimDp[y];
                muckedDp[idx] = prelimDp[y];
            }
        }

        for( int y = 0; y < mdx; ++y ) {
            int z = dolast[y];
            if( z >= 0 ) {
                System.out.print("prelimAns[" + y + "] = " + prelimAns[y][1] +  " dp[" + y + "] = " + prelimDp[y] + " muckedOp[" + y + "] = " + muckedOp[y] + " prelimAnsyplus1 = " + prelimAns[y+1][1] +  " dpyplus1 = " + prelimDp[y+1] + " = ");
               //prelimDp[y] = op( muckedOp[y], MAX_DGTS, decimalsCk,
                prelimDp[y] = op( muckedOp[y], MAX_DGTS, true,
                prelimAns[y][1], prelimDp[y], prelimAns[y+1][1], prelimDp[y+1], 
                prelimDgts[y], prelimDgts[y+1], prelimAns[y][1] < 0, prelimAns[y+1][1] < 0,
                prelimAns[y], junk );
                finalMucked[idx] = prelimAns[y][1];
                muckedDp[idx] = prelimDp[y];
                System.out.println(finalMucked[idx] + " mucked dp " + muckedDp[idx]);
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
                System.out.println("duplicate to " + i );
                for( int j = 0; j < TWO_XDGTS; ++j ) { // reset all digits
                    opDgts1[j][idx] = opDgts1[j][0];
                    opDgts2[j][idx] = opDgts2[j][0];
                }
                idx = idx - 1;
                break;
            }
        }
        if( muckedString[idx].equals(actual[1]) ) {
            System.out.println("duplicate to actualInt" );
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
    // if actual answer is equal to the lower bound, don't ask if it's
    // greater or less than that lower bound. First two posential "other"
    // questions are about lower bound
    int minQstn = doubleMin < doubleAct ? 0 : 2;
    // if actual answer is equal to the upper bound, don't ask if it's
    // greater or less than that upper bound. Last two potential "other"
    // questions are about upper bound. Middle questions can be asked
    // about any problem.
    int askUbndQstn = 8;
    int uBndQstn = 6;
    int maxQstn = doubleAct < doubleMax ? askUbndQstn : uBndQstn;
    int whichOtherQuestion = (int)(minQstn + (maxQstn-minQstn)*Math.random());
    //whichOtherQuestion = 4 + (int)(2*Math.random()); // debug

    //System.out.println("whichQuestion = " + whichOtherQuestion );
    if( whichOtherQuestion < 2 ) {
        if( whichOtherQuestion == 0 ) {
            questions[firstMucked].setQuesText("Is less than    " + actual[0]);
            questions[firstMucked].setQuesAns( "false" );
        } else {
            questions[firstMucked].setQuesText(  "Is greater than " + actual[0]);
            questions[firstMucked].setQuesAns( "true" );          
        }
        String txt = questions[firstMucked].getQuesText();
        //System.out.println("question[" + firstMucked + "] = " + txt );
        firstMucked = firstMucked + 1;
    } else if( whichOtherQuestion >= uBndQstn ) {     
        if( whichOtherQuestion == uBndQstn ) {
            questions[firstMucked].setQuesText("Is greater than " + actual[2]);
            questions[firstMucked].setQuesAns( "false" );
        } else {
            questions[firstMucked].setQuesText(  "Is less than    " + actual[2]);
            questions[firstMucked].setQuesAns( "true" );
        }
        String txt = questions[firstMucked].getQuesText();
        //System.out.println("question[" + firstMucked + "] = " + txt );
        firstMucked = firstMucked + 1;
    }

    if( origOp == 3 ) { // division
        // there are only two possible "other" questions for division
        // besides the upper and lower bound questions
        if( whichOtherQuestion > 1 && whichOtherQuestion < uBndQstn
                && whichOtherQuestion%2 == 0 ) {
            questions[firstMucked].setQuesText("The most significant digit is " + mostDig);
            questions[firstMucked].setQuesAns( "true" );
            String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        } else if( whichOtherQuestion > 1 && whichOtherQuestion < uBndQstn &&
                whichOtherQuestion%2 == 1 ) {
            //int notMostDig = (7 + mostDig) % 10;
            // any digit 0 - 9 except mostDig, mostDig - 1 or mostDig + 1
            int notMostDig = ((int)(7*Math.random()) + mostDig + 2 ) % 10;
            questions[firstMucked].setQuesText("The most significant digit is " + notMostDig);
            questions[firstMucked].setQuesAns( "false" );
            String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        
        for( int idx = firstMucked; idx < nMucked; ++ idx ) {
            //ten2pow = (int)Math.pow(10,nDigsAct[1]-1); //+muckedDp[idx]);
            //int x = idx;
            questions[idx].setQuesText("Answer equals     " + muckedString[idx] );
            //long junk3 = finalMucked[idx]/ten2pow;
            //System.out.println("doubleMucked[" + idx + "] = " + doubleMucked[idx] + " mucked msd = " + junk3);       
            // if it's in range and has correct msd, possible
            long absMucked = Math.abs(finalMucked[idx]);
            int digsMuckedM1 = absMucked > 0 ? (int)(Math.log10(absMucked)) : 1 ;
            int muckedMostDig = (int)(absMucked/((int)Math.pow(10,digsMuckedM1)));
            System.out.println("absMucked = " + absMucked + " digsMuckedM1 = " + digsMuckedM1 + " muckedMostDig = " + muckedMostDig);
            System.out.println("doubleMin = " + doubleMin + " doubleMucked[" + idx + "] = " + doubleMucked[idx] + " doubleMax = " + doubleMax);
            System.out.println("finalMucked[" + idx + "] = " + finalMucked[idx] + " muckedMostDig = " + muckedMostDig + " mostDig = " + mostDig);
            if( doubleMin <= doubleMucked[idx] && doubleMucked[idx] <= doubleMax && 
                    muckedMostDig == mostDig ) {
                questions[idx].setQuesAns( "possible" );
                // if it's equal, true
                if( muckedString[idx].equals(actual[1]) ) {
                    questions[idx].setAltAns( "true" );
                    //System.out.println("in fact true");
                } else { // if it's not equal false
                    questions[idx].setAltAns( "false" );
                }
            } else { // if it's not equal false
                questions[idx].setQuesAns( "false" );
            }
            //String txt = questions[idx].getQuesText();
            //System.out.println("question[" + idx + "] = " + txt );
        }
    } else { // multiplication, addition and subtraction
        if( whichOtherQuestion == 2 && actualInt[1] != 0 ) {
            questions[firstMucked].setQuesText("The least significant digit is " + leastDig);
            questions[firstMucked].setQuesAns( "true" );
            //String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        if( whichOtherQuestion == 2 && actualInt[1] == 0 ) {
            questions[firstMucked].setQuesText("The least significant digit is not defined. However did this happen? Now what?");
            questions[firstMucked].setQuesAns( "true" );
            //String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        if( whichOtherQuestion == 3 ) {
            //int notLeastDig = (7 + leastDig) % 10;
            // any digit 0 - 9 but leastDig, leastDig - 1 or leastDig + 1
            int notLeastDig = ((int)(7*Math.random()) + leastDig + 2 ) % 10;
            questions[firstMucked].setQuesText("The least significant digit is " + notLeastDig);
            questions[firstMucked].setQuesAns( "false" );
            //String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        if( whichOtherQuestion == 4 ) {
            if( rightDp == 1 ) {
                questions[firstMucked].setQuesText("Answer has " + rightDp + " decimal place.");
            } else {
                questions[firstMucked].setQuesText("Answer has " + rightDp + " decimal places.");
            }
            questions[firstMucked].setQuesAns( "true" );
            //String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        if( whichOtherQuestion == 5 ) {
            // a multiplication problem can have more decimal places in the answer
            int maxDgts = origOp == 2 ? TWO_XDGTS : MAX_DGTS;
            // anything between 0 and maxDgts but rightDp
            int notRightDp = ((int)(maxDgts*Math.random()) + rightDp + 1 ) % (maxDgts+1);
            if( notRightDp == 1 ) {
                questions[firstMucked].setQuesText("Answer has " + notRightDp + " decimal place.");
            } else {
                questions[firstMucked].setQuesText("Answer has " + notRightDp + " decimal places.");
            }
            questions[firstMucked].setQuesAns( "false" );
            //String txt = questions[firstMucked].getQuesText();
            //System.out.println("question[" + firstMucked + "] = " + txt );
            firstMucked = firstMucked + 1;
        }
        for( int idx = firstMucked; idx < nMucked; ++ idx ) {
            int x = idx;
            //System.out.println("about to format finalMucked[" + x + "] = " + finalMucked[x]);
            questions[idx].setQuesText("Answer equals     " + muckedString[x] );
            int leastDigx = 0;
            ten2pow = 10;
            if( finalMucked[x] != 0 ) {
                while( leastDigx == 0 ) {
                    leastDigx = (int)(10*Math.abs(finalMucked[x] % ten2pow))/ten2pow;
                    //System.out.println("ten2pow = " + ten2pow + " actualInt = " + actualInt[1] + " leastDig = " + leastDig);
                    ten2pow = ten2pow*10;
                }
            }
            //System.out.println("doubleMucked[" + x + "] = " + doubleMucked[x] + " leastDigx = " + leastDigx);
           // boolean rightNumDecPlaces = origOp == 2? (muckedDp[idx] <= decPt1 + decPt2) :
            //        (muckedDp[idx] <= decPt1 || muckedDp[idx] <= decPt2);
            // if it's in range, has correct lsd in correct digit, had correct
            // number of decimal places: mark it "possible"
            int mDpCopy = muckedDp[x];


            if( finalMucked[x] != 0 ) {
                long fmCopy = finalMucked[x];
                while( 10*(fmCopy/10) == fmCopy ) {
                    fmCopy = fmCopy/10;
                    mDpCopy = mDpCopy - 1;
                }
            }
            if( doubleMin <= doubleMucked[x] && doubleMucked[x] <= doubleMax && 
                    leastDigx == leastDig && actpow == ten2pow &&
                    mDpCopy == rightDp ) {
                questions[idx].setQuesAns( "possible" );
                // if it's equal, true
                if( muckedString[x].equals(actual[1]) ) {
                    questions[idx].setAltAns( "true" );
                    //System.out.println("in fact true");
                } else { // if it's not equal false
                    questions[idx].setAltAns( "false" );
                }
            } else {     // if it's no where close: false
                System.out.print("doubleMin !< doubleMucked !< doubleMax " + doubleMin + " " + doubleMucked[x] + " " + doubleMax);
                System.out.print(" or leastDigx != leastDig " + leastDigx + " " + leastDig);
                System.out.print(" or place of least signigicant digits " + ten2pow + " != " +  actpow);
                System.out.println("or muckedDp[" + x + "] != rightDp " + mDpCopy + " " + rightDp);
                questions[idx].setQuesAns( "false" );
            }
            //String txt = questions[idx].getQuesText();
            //System.out.println("question[" + idx + "] = " + txt );
        }
    }
    questions[nMucked].setQuesText("Answer equals     " + actual[1] );
    questions[nMucked].setQuesAns( "possible" );
    questions[nMucked].setAltAns( "true" );
    //String txt = questions[nMucked].getQuesText();  
    //System.out.println("question[" + nMucked + "] = " + txt );

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
        <th colspan=3><div id="checkOne">Check One</div>
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
<tr>
    <td class="hdr"><div class="blank">Upper Range</td>
    <td class="hdr"><div class="blank"><%=expl[2]%></td>
    <td><div class="blank">= <%=actual[2]%></div></td>
</tr>
<tr class="hdrRow">
    <td class="hdr">Problem:</td>
    <td class="hdr">  <%=entireProb%></td>
    <td><div class="blank">= <%=actual[1]%></div></td>
</tr>
<tr>
    <td class="hdr"><div class="blank">Lower Range    </div></td>
    <td class="hdr"><div class="blank"><%=expl[0]%>    </div></td>
    <td><div class="blank">= <%=actual[0]%>    </div></td>
</tr>
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
    <th colspan=2><div class="blank">Acceptable Answers</div></th> 
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
            <td>
                <div class="xc blank"><%=x%></div>
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
            <td>
                <!-- this needs to be all one line or localeCompare s don't work  -->
                <div id="<%=aid%>" class="ansbox blank"><%=quesAns%></div>
            </td>
            <td>
                <!-- this needs to be all one line or localeCompare s don't work  -->
                <div id="<%=lid%>" class="ansbox blank"><%=altAns%></div>
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
            int nDgts1, int nDgts2, boolean isNeg1, boolean isNeg2,
            long [] actualInt, String [] expl ) { 
        System.out.println("op just starting operator = " + operator + " decimalsCK = " + decimalsCk + "operand1 = " + operand1 );
        System.out.println("decPt1 = " + decPt1 + " operand2 = " + operand2 + " decPt2 = " + decPt2 + " nDgts1 = " + nDgts1 + " nDgts2 = " + nDgts2);
        System.out.println(" isNeg1 = " + isNeg1 + " isNeg2 = " + isNeg2);
        long absOp1 = Math.abs(operand1);
        long absOp2= Math.abs(operand2);
        //boolean isNeg1 = operand1 < 0;
        //boolean isNeg2 = operand2 < 0;
        //int nDgts1 = absOp1 > 0 ? 1 + (int)Math.log10(absOp1) : 1;
        //int nDgts2 = absOp2 > 0 ? 1 + (int)Math.log10(absOp2) : 1;
        int thisMuchBigger = nDgts1 - decPt1 - (nDgts2 - decPt2);
        long round1down = operand1; // default is not rounded
        long round1up = operand1;
        long round2down = operand2;
        long round2up = operand2;
        int decPtAct = decPt1;

        int ten2pow = (int)Math.pow(10, nDgts1 - 1);
        // round to one significant digit
        if( ten2pow != 0 ) {            
            if( isNeg1 ) {
                round1up = ten2pow*(operand1/ten2pow);
                round1down = -ten2pow*((ten2pow + absOp1)/ten2pow);
            } else {
                round1up = ten2pow*((ten2pow + absOp1)/ten2pow);
                round1down = ten2pow*(operand1/ten2pow);
            }
        } else {
            // not sure how this would happen
            System.out.println("nDgts1 = " + nDgts1 + " ten2pow = " + ten2pow);
        }

        ten2pow = (int)Math.pow(10, nDgts2 - 1);
        // round to one significant digit
        if( ten2pow != 0 ) {         
            if( isNeg2 ) {
                round2up = ten2pow*(operand2/ten2pow);
                round2down = -ten2pow*((ten2pow + absOp2)/ten2pow);
            } else {
                round2up = ten2pow*((ten2pow + absOp2)/ten2pow);
                round2down = ten2pow*(operand2/ten2pow);
            }
        } else {
            // not sure how this would happen
            System.out.println("nDgts2 = " + nDgts2 + " ten2pow = " + ten2pow);
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
                if( absOp1 > 0 ) {
                    int copy = (int)absOp1;
                    while( 10*(copy/10) == copy ) {
                        lsd = lsd + 1;
                        copy = copy/10;
                    }
                }
                if( decPt2 - nDgts2 >= lsd ) {
                    round1up = operand1;
                    round1down = operand1;
                } else {
                    ten2pow = (int)Math.pow(10, nDgts1 - thisMuchBigger - 1);
                    if( ten2pow != 0 ) {
                        if( isNeg1 ) {
                            round1up = ten2pow*(operand1/ten2pow);
                            round1down = -ten2pow*((ten2pow + absOp1)/ten2pow);
                        } else {
                            round1up = ten2pow*((ten2pow + absOp1)/ten2pow);
                            round1down = ten2pow*(operand1/ten2pow);
                        }
                    }
                }
            } else if( thisMuchBigger < 0 ) {
                // if there is no overlap
                int lsd = decPt2;
                if( absOp2 > 0 ) {
                    int copy = (int)absOp2;
                    while( 10*(copy/10) == copy ) {
                        lsd = lsd + 1;
                        copy = copy/10;
                    }
                }
                if( decPt1 - nDgts1 >= decPt2 ) {
                    round2up = operand2;
                    round2down = operand2;
                } else {
                    ten2pow = (int)Math.pow(10, nDgts2 + thisMuchBigger - 1);
                    if( ten2pow != 0 ) {
                        if( isNeg2 ) {
                            round2up = ten2pow*(operand2/ten2pow);
                            round2down = -ten2pow*((ten2pow + absOp2)/ten2pow);
                        } else {
                            round2up = ten2pow*((ten2pow + absOp2)/ten2pow);
                            round2down = ten2pow*(operand2/ten2pow);
                        }
                    }
                }
            }
            /*
            System.out.println("op nDgts1 = " + nDgts1 + " decPt1 = " + decPt1 );
            System.out.println("op nDgts2 = " + nDgts2 + " decPt2 = " + decPt2 );
            System.out.println("op thisMuchBigger = " + thisMuchBigger + " ten2pow = " + ten2pow);
            */
            ten2pow = factor1 > factor2? factor1 : factor2; //(int)Math.pow(10,decPtAct);
            if( operator.compareTo("+") == 0 ) {
                // if real answer is positive, don't let lower range be negative
                if( operand1*Math.pow(10,-decPt1) + operand2*Math.pow(10, -decPt2) > 0 && 
                        round2down*Math.pow(10, -decPt2) + round1down*Math.pow(10, -decPt1) < 0 ) {
                    round1down = 0;
                    round2down = 0;
                // if real answer is negative, don't let upper range be positive
                } else if( operand1*Math.pow(10,-decPt1) + operand2*Math.pow(10, -decPt2)  < 0 && 
                        round2up*Math.pow(10, -decPt2) + round1up*Math.pow(10, -decPt1) > 0 ) {
                    round1up = 0;
                    round2up = 0;
                }
                actualInt[2] = (factor1*round1up + factor2*round2up);
                actualInt[1] = factor1*operand1 + factor2*operand2;
                actualInt[0] = (factor1*round1down + factor2*round2down); 
                if( isNeg2 ) {
                    expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                            " ( "  + Format.getFormat( round2up, decPt2 )  + " ) ";
                    expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                            " ( " + Format.getFormat( round2down, decPt2 ) + " ) ";
                } else {
                    expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                            " " + Format.getFormat( round2up, decPt2 );
                    expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                            " " + Format.getFormat( round2down, decPt2 );
                }
            } else {
                // if real answer is positive, don't let lower range be negative
                if( operand1*Math.pow(10,-decPt1) >= operand2*Math.pow(10, -decPt2) && 
                        round2up*Math.pow(10, -decPt2) > round1down*Math.pow(10, -decPt1) ) {
                    round1down = 0;
                    round2up = 0;
                // if real answer is negative, don't let upper range be positive
                } else if( operand1*Math.pow(10,-decPt1) < operand2*Math.pow(10, -decPt2) && 
                        round2down*Math.pow(10, -decPt2) < round1up*Math.pow(10, -decPt1) ) {
                    round1up = 0;
                    round2down = 0;
                }
                actualInt[2] = (factor1*round1up - factor2*round2down);
                actualInt[1] = factor1*operand1 - factor2*operand2;
                actualInt[0] = factor1*round1down - factor2*round2up;
                if( isNeg2 ) {
                    operator = "+";
                    round2down = -round2down;
                    round2up = -round2up;
                }
                expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2down, decPt2 );
                expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2up, decPt2 );
            }
            
        } else if(  operator.compareTo("*") == 0  ) {
            decPtAct = decPt1 + decPt2;
            //ten2pow = (int)Math.pow(10,decPtAct);
            if( isNeg1 && isNeg1 == isNeg2 ) {
                long tmp = round1up;
                round1up = round1down;
                round1down = tmp;
                tmp = round2up;
                round2up = round2down;
                round2down = tmp;
            } else if( isNeg1 ) {
                long tmp = round2up;
                round2up = round2down;
                round2down = tmp;  
            } else if( isNeg2 ) {
                long tmp = round1up;
                round1up = round1down;
                round1down = tmp;
            }

            actualInt[2] = round1up * round2up;
            actualInt[1] = operand1 * operand2;
            actualInt[0] = round1down * round2down;
            if( isNeg2 ) {
                expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                        " ( "  + Format.getFormat( round2up, decPt2 )  + " ) ";
                expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                        " ( " + Format.getFormat( round2down, decPt2 ) + " ) ";
            } else {
                expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2up, decPt2 );
                expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2down, decPt2 );
            }
            //System.out.println("op decPt1 " + decPt1 + " decPt2 " + decPt2 + " decPtAct " + decPtAct);
            //System.out.println("op " + operator + " round1up " + round1up + " round2up " + round2up + " actualInt[2] " + actualInt[2]);
            //System.out.println("op " + operator + " round1down " + round1down + " round2down " + round2down + " actualInt[2] " + actualInt[0]);
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
                actualInt[1] = (10*ten2pow*absOp1  / absOp2 + 5)/10;
            } else { // not sure if this will work when it's not in the jsp page fixit
                System.err.println("tried to divide by zero");
                System.err.println("operator = " + operator);
                System.err.println("MAX_DGTS " + MAX_DGTS);
                System.err.println("decimalsCk = " + decimalsCk);
                System.err.println("operand1 " + operand1);
                System.err.println("decPt1 " + decPt1);
                System.err.println("operand2 " + operand2);
                System.err.println("decPt2 " + decPt2);
                actualInt[1] = 999999;
                //System.exit(1);
            }
            if( isNeg2 != isNeg1 ) {
                long tmp = round2down;
                round2down = round2up;
                round2up = tmp; 
                actualInt[1] = -actualInt[1];
            }

            if( round2up != 0 ) {
                actualInt[0] = (10*ten2pow*absOp1  / round2up + 5)/10; // ten2pow*operand1 / round2up;
            }
            if( round2down != 0 ) {
                actualInt[2] = (10*ten2pow*absOp1  / round2down + 5)/10; // ten2pow*operand1 / round2down;
            }
            if( isNeg2 != isNeg1 ) {
                actualInt[0] = -actualInt[0];
                actualInt[2] = -actualInt[2];
            }
            if( isNeg2 ) {
                round2down = -round2down;
                round2up = -round2up;
            } 
            if( isNeg2 ) {
                expl[0] = Format.getFormat( operand1, decPt1 ) + " " + operator + 
                        " ( " + Format.getFormat( round2up, decPt2 ) + " ) ";
                expl[2] =  Format.getFormat( operand1, decPt1 ) + " " + operator + 
                        " ( " + Format.getFormat( round2down, decPt2 ) + " ) ";
            } else {
                expl[0] = Format.getFormat( operand1, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2up, decPt2 );
                expl[2] =  Format.getFormat( operand1, decPt1 ) + " " + operator + 
                        " " + Format.getFormat( round2down, decPt2 );
            }
        }
        //if( actualInt[1] == 0 ) {
        //    decPtAct = 0;
        //}

        //System.out.println("op finishing operator = " + operator + " decimalsCK = " + decimalsCk + "operand1 = " + operand1 );
        //System.out.println("decPt1 = " + decPt1 + " operand2 = " + operand2 + " decPt2 = " + decPt2 + " nDgts1 = " + nDgts1 + " nDgts2 = " + nDgts2);
        //System.out.println(" isNeg1 = " + isNeg1 + " isNeg2 = " + isNeg2);
        for( int q = 0; q < 3; q++ ){
            //System.out.println("actualIn[" + q + "] = " + actualInt[q] + " expl[" + q + "] = " + expl[q] );
        }
        //System.out.println("op finishing");
        return decPtAct;
    }

%>
</body>
</html>

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
</head>
<body>
<% // upper range of 5217 - 5710 is 1000 fixit
    // least significant digit is sometimes 0 fixit
    // some of the Can't be's need to have possibles fixit
    //sometimes the upper or lower bound is equal the answer fixit
    // crashes when you uncheck every type of prolem fixit
    // division problems are too hard. make the round2ups and round2downs only
    // multiples of 2 and 5? fixit
    // make them smaller numbers?
    // make no decimals really no decimals?
    final int N_OPERATORS = 4;
    final double EXP = 2.4;
    System.out.println("XOXOXOXOXOXOXOX   starting estimation problem    XOXOXOXOXOXOXOXOXOXOX");
    int nOperators = 0;
    String[] operators = new String[N_OPERATORS];
    /*
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
    */
    // numbers only, no operands or decimal points
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
        additionCk = false;
        isAddition = "";
        multiplicationCk = false;
        isMultiplication = "";
        subtractionCk = false;
        isSubtraction = "";
        divisionCk = true;
        isDivision = "checked";
        operators[nOperators] = "/";
        divCase = nOperators;
        nOperators += 1;
        decimalsCk = false;
        isDecimals = "";
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
    String operator = operators[whatOp];
    int operand1 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
    int operand2 = (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
    if( !negativesCk && operand2 > operand1 && operator.compareTo("-") == 0 ) {
        operand2 = (int)(operand1*Math.random());
    }
    if( operator.compareTo("/") == 0 ) {
        if( operand2 == 0 ) {
            operand2 = 1;
        }
        if( !decimalsCk && operand1 % operand2 != 0 ) {
            int finalAns = 
                    (new Double(maxOpPlus1*(Math.pow(Math.random(),EXP)))).intValue();
            operand1 = finalAns*operand2;
        }
    }
    int decPt1 = 0;
    int decPt2 = 0;
    if( decimalsCk ) {
        decPt1 = (int)((MAX_DGTS+1)*Math.random());
        decPt2 = (int)((MAX_DGTS+1)*Math.random());
    }
    
    // factorx's line up the decimal points
    int factor1 = 1;
    int factor2 = 1;
    int decPtAct = decPt1; // for addition or subtraction assuming decPt1 >= decPt2
    
    if( decPt1 < decPt2 ) {
        factor1 = (int)Math.pow(10,decPt2-decPt1);
        decPtAct = decPt2; // for addition or subtraction
    } else if( decPt1 > decPt2 ) {
        factor2 = (int)Math.pow(10,decPt1-decPt2);
    }

    int nDgts1 = operand1 > 0 ? 1 + (int)Math.log10(operand1) : 1;
    int nDgts2 = operand2 > 0 ? 1 + (int)Math.log10(operand2) : 1;
    
    String[] opDgts1 = new String[TWO_XDGTS]; // java initiallizes integer array
    String[] opDgts2 = new String[TWO_XDGTS]; // elements to zero by default
    
    int tmp1 = operand1;
    int tmp2 = operand2;
    for( int i = 0; i < TWO_XDGTS; ++i ) {
        opDgts1[i] = String.valueOf(tmp1 % 10);
        opDgts2[i] = String.valueOf(tmp2 % 10);
        tmp1 /= 10;
        tmp2 /= 10;
    }
    int leastDig = 0; 
    int mostDig = 9;
    int ten2pow = (int)Math.pow(10, nDgts1 - 1);
    long round1up = operand1;
    long round1down = operand1;
    int round2up = operand2;
    int round2down = operand2;
    if( ten2pow != 0 ) {
        round1up = ten2pow*((ten2pow + operand1)/ten2pow);
        round1down = ten2pow*(operand1/ten2pow);
    } else {
        System.out.println("nDgts1 = " + nDgts1 + " ten2pow = " + ten2pow);
    }
    ten2pow = (int)Math.pow(10, nDgts2 - 1);
    if( ten2pow != 0 ) {
        round2up = ten2pow*((ten2pow + operand2)/ten2pow);
        round2down = ten2pow*(operand2/ten2pow);
    } else {
        System.out.println("nDgts2 = " + nDgts1 + " ten2pow = " + ten2pow);
    }
    long[] actualInt = {Integer.MAX_VALUE, 0, 0 };
    System.out.println("decPt1 = " + decPt1 + " decPt2 = " + decPt2 + " factor1 = " + factor1 + " factor2 = " + factor2 + " operator = " + operator);

    int thisMuchBigger = nDgts1 - decPt1 - (nDgts2 - decPt2);
    if( whatOp == plusCase) {   
        if( thisMuchBigger > 0 ) {
            ten2pow = (int)Math.pow(10, nDgts1 - thisMuchBigger - 1);
            if( ten2pow == 0 ) {
                System.out.println("nDgts1 = " + nDgts1 + " thisMuchBigger = " + thisMuchBigger);
                ten2pow = 1;
            }
            round1up = ten2pow*((ten2pow+operand1)/ten2pow);
            round1down = ten2pow*(operand1/ten2pow);
        } else if( thisMuchBigger < 0 ) {
            ten2pow = (int)Math.pow(10, nDgts2 + thisMuchBigger - 1);
            if( ten2pow == 0 ) {
                System.out.println("nDgts2 = " + nDgts2 + " thisMuchBigger = " + thisMuchBigger);
                ten2pow = 1;
            }
            round2up = ten2pow*((ten2pow+operand2)/ten2pow);
            round2down = ten2pow*(operand2/ten2pow);
        }
        ten2pow = factor1 > factor2? factor1 : factor2; //(int)Math.pow(10,decPtAct);
        actualInt[2] = (factor1*round1up + factor2*round2up);
        actualInt[1] = factor1*operand1 + factor2*operand2;
        actualInt[0] = (factor1*round1down + factor2*round2down);
    } else if( whatOp == subCase ) {     
        if( thisMuchBigger > 0 ) {
            ten2pow = (int)Math.pow(10, nDgts1 - thisMuchBigger - 1);
            if( ten2pow == 0 ) {
                System.out.println("nDgts1 = " + nDgts1 + " thisMuchBigger = " + thisMuchBigger);
                ten2pow = 1;
            }
            round1up = ten2pow*((ten2pow+operand1)/ten2pow);
            round1down = ten2pow*(operand1/ten2pow);
        } else if( thisMuchBigger < 0 ) {
            ten2pow = (int)Math.pow(10, nDgts2 + thisMuchBigger - 1);
            if( ten2pow == 0 ) {
                System.out.println("nDgts1 = " + nDgts1 + " thisMuchBigger = " + thisMuchBigger);
                ten2pow = 1;
            }
            round2up = ten2pow*((ten2pow+operand2)/ten2pow);
            round2down = ten2pow*(operand2/ten2pow);
        }
        ten2pow = factor1 > factor2? factor1 : factor2;
        actualInt[2] = (factor1*round1up - factor2*round2down);
        actualInt[1] = factor1*operand1 - factor2*operand2;
        actualInt[0] = (factor1*round1down - factor2*round2up); 
    } else if( whatOp == multCase ) {
        decPtAct = decPt1 + decPt2;
        ten2pow = (int)Math.pow(10,decPtAct);
        actualInt[2] = round1up * round2up;
        actualInt[1] = operand1 * operand2;
        actualInt[0] = round1down * round2down;
    } else if( whatOp == divCase ) {
        // actualInt is way off fixit
        decPtAct = MAX_DGTS + decPt1 - decPt2;
        ten2pow = (int)Math.pow(10, MAX_DGTS);
        if( round2down != 0 ) {
            actualInt[2] = ten2pow*round1up / round2down;
        }
        if( operand2 != 0 ) {
            System.out.println("ten2pow = " + ten2pow + " operand1 = " + operand1);
            actualInt[1] = (long)ten2pow*operand1;
            System.out.println("actualInt[1] = " + actualInt[1]);
            actualInt[1] = 10*actualInt[1];
            System.out.println("actualInt[1] = " + actualInt[1]);
            System.out.println("operand2 = " + operand2);
            actualInt[1] = actualInt[1]  / operand2;
            System.out.println("actualInt[1] = " + actualInt[1]);
            actualInt[1] = actualInt[1] + 5;
            System.out.println("actualInt[1] = " + actualInt[1]);
            actualInt[1] = actualInt[1]/10;
            System.out.println("actualInt[1] = " + actualInt[1]);
            //actualInt[1] = (10*ten2pow*operand1  / operand2 + 5)/10;
        }
        if( round2up != 0 ) {
            actualInt[0] = ten2pow*round1down / round2up;
        }
    }
    leastDig = (int)(Math.abs(actualInt[1] % 10));
    
    String[] actual = new String[3];
    int[] nDigsAct = new int[3];
    for( int i = 0; i < 3; ++i ) {
        nDigsAct[i] = Format.getDigs( actualInt[i] );
        actual[i] = Format.getFormat( actualInt[i], decPtAct, nDigsAct[i] ); 
    }
    
    mostDig = (int)(actualInt[1]/((int)Math.pow(10,nDigsAct[1]-1)));
    System.out.println("operand1 = " + operand1 + " round1up = " + round1up + " round1down = "  + round1down + " nDgts1 = " + nDgts1);
    System.out.println("operand2 = " + operand2 + " round2up = " + round2up + " round2down = "  + round2down + " nDgts2 = " + nDgts2);
    System.out.println("actualInt = " + actualInt[1] + " nDigsAct = " + nDigsAct[1] + " decPtAct = " + decPtAct);

    StringBuffer entireProb = new StringBuffer();
    entireProb.append( Format.getFormat( operand1, decPt1 ) );
    entireProb.append(" ");
    entireProb.append(operator);
    entireProb.append(" ");
    entireProb.append( Format.getFormat( operand2, decPt2 ) );
    
    int whichOpIsMucked = (int)(nOps*Math.random());
    if( whichOpIsMucked == 0 ) {
        int whichDigIsMucked = (int)(nDgts1*Math.random());
        while( whichDigIsMucked < 0 ) {
            System.out.println("operand1 = " + operand1 + " nDgts1 = " + nDgts1 + " why is whichDigIsMucked " + whichDigIsMucked + "?");
            whichDigIsMucked = (int)(nDgts1*Math.random());
        }
        int origDig = Integer.parseInt(opDgts1[whichDigIsMucked]);
        String altDig = alt[origDig][(int)(alt[origDig].length*Math.random())];
        opDgts1[whichDigIsMucked] = altDig;
    } else {
        int whichDigIsMucked = (int)(nDgts2*Math.random());
        while( whichDigIsMucked < 0 ) {
            System.out.println("operand2 = " + operand2 + " nDgts2 = " + nDgts2 + " why is whichDigIsMucked " + whichDigIsMucked + "?");
            whichDigIsMucked = (int)(nDgts2*Math.random());
        }
        int origDig = Integer.parseInt(opDgts2[whichDigIsMucked]);
        String altDig = alt[origDig][(int)(alt[origDig].length*Math.random())];
        opDgts2[whichDigIsMucked] = altDig;
    }
  
    StringBuffer muckedProb = new StringBuffer();
    if( decPt1 == nDgts1 ) {
        muckedProb.append("0.");
    }
    for( int i = nDgts1 - 1; i >= 0; --i ) {
        muckedProb.append(opDgts1[i]); 
        if( i == decPt1 ) {
            muckedProb.append(".");
        }
    }
    muckedProb.append(" ");
    muckedProb.append(operator);
    muckedProb.append(" ");
   if( decPt2 == nDgts2 ) {
        muckedProb.append("0.");
    }
    for( int i = nDgts2 - 1; i >= 0; --i ) {
        muckedProb.append(opDgts2[i]);
        if( i == decPt2 ) {
            muckedProb.append(".");
        }
    }
    
    StringBuffer tmp5 = new StringBuffer();
    tmp5.append(muckedProb);
    Pattern n = Pattern.compile("[0-9]*");
    Pattern o = Pattern.compile("[+-/\\*]");
    Pattern b = Pattern.compile("^\\s");

    int mdx = 0;
    int[] num = new int[4];
    int[] dp = new int[4];
    String[] muckedOp = new String[4];
    //boolean stillGoing = true;
    boolean countingDp = false;
    while( tmp5.length() > 0 ) {
        int ndx = 1;
        while( ndx <= tmp5.length() &&
                n.matcher( tmp5.substring( 0, ndx )).matches() ) {
            //String junk = tmp5.substring( 0, ndx );
            //System.out.println("substring[" + ndx + "] = " + junk );
            ++ndx;
            if( countingDp ) {
                dp[mdx] = dp[mdx] + 1;
            }
        }
        int current = 0;
        try{
            current = Integer.valueOf( tmp5.substring( 0, ndx-1 ));
        } catch( NumberFormatException e ) {
            System.err.println( e.toString() );
        }
        //int numdigs = current == 0 ? 1 : 1 + (int)Math.log10(current);
        num[mdx] = (int)Math.pow(10, ndx-1)*num[mdx] + current;
        System.out.println("current = " + current + " num[" + mdx + "] = " + num[mdx]);
        if( 0 < ndx && ndx <= tmp5.length() && tmp5.charAt(ndx-1) == '.' ) {
            System.out.println("char at prev ndx = " + tmp5.charAt(ndx-1) );
            countingDp = true;
            tmp5.delete( 0, ndx);
            System.out.println("remaining mucked equation = " + tmp5 );
        } else {
            countingDp = false;
            while( ndx <= tmp5.length() ){
                if( o.matcher( tmp5.substring( ndx-1, ndx )).matches()) {
                    muckedOp[mdx] = tmp5.substring(ndx-1, ndx);
                    mdx = mdx + 1;
                    break;
                }
                System.out.println("not operator substring = >" + tmp5.substring( ndx-1, ndx ) + "<");
                ++ndx;
            }
            tmp5.delete( 0, ndx);
            System.out.println("mucked equation without operand = >" + tmp5 + "<");
            while( tmp5.length() > 0 && b.matcher( tmp5.substring( 0, 1 )).matches()) {
                System.out.println("substring = >" + tmp5.substring( 0, 1 ) + "<");
                tmp5.delete( 0, 1);
            }

            System.out.println("mucked equation without whitespace = >" + tmp5 + "<");
        }
    }
    System.out.println("done");
    
    Question[] questions = new Question[16];
    for( int i = 0; i < 16; ++i ) {
        questions[i] = new Question();
        if( i % 2 == 0 ) {
            questions[i].setQuesAns( "true" );
        } else {
            questions[i].setQuesAns( "false" );
        }
    }
    long notPossible = 0;
    String notPoss = "";
    String poss = "";
    // need up to two acceptable answers fixit
    // if it's in range and has correct lsd, possible
    // if it's equal, true
    // if it's not equal false
    if( operator.compareTo("/") == 0 ) {
        questions[0].setQuesText("The most significant digit is " + mostDig);
        int notMostDig = (7 + mostDig) % 10;
        questions[1].setQuesText("The most significant digit is " + notMostDig);
        ten2pow = (int)Math.pow(10,nDigsAct[1]-1);
        long somethingInRange = actualInt[0] + (int)((actualInt[2]-actualInt[0])*Math.random());
        long possible = mostDig*ten2pow + somethingInRange - ten2pow*(somethingInRange/ten2pow);
        poss = Format.getFormat( possible, decPtAct );
        questions[6].setQuesText("Equals     " + poss);
        questions[6].setQuesAns( "possible" );
        if( possible == actualInt[1]) {
            questions[6].setAltAns( "true" );
        } else {
            questions[6].setAltAns( "false" );
        }
        somethingInRange = actualInt[0] + (int)((actualInt[2]-actualInt[0])*Math.random());
        long withMostDigZeroed = somethingInRange - ten2pow*(somethingInRange/ten2pow);
        possible = mostDig*ten2pow + withMostDigZeroed;
        System.out.println("somethingInRange = " + somethingInRange + " withMostDigZeroed = " + withMostDigZeroed + " possible = " + possible);
        poss = Format.getFormat( possible, decPtAct );
        questions[7].setQuesText("Equals " + poss);
        questions[7].setQuesAns( "possible" );
        if( possible == actualInt[1]) {
            questions[7].setAltAns( "true" );
        } else {
            questions[7].setAltAns( "false" );       
        }
        somethingInRange = actualInt[0] + (int)((actualInt[2]-actualInt[0])*Math.random());
        possible = mostDig*ten2pow + somethingInRange - ten2pow*(somethingInRange/ten2pow);
        poss = Format.getFormat( possible, decPtAct );
        questions[12].setQuesText("Equals   " + poss);
        questions[12].setQuesAns( "possible" );
        if( possible == actualInt[1]) {
            questions[12].setAltAns( "true" );
        } else {
            questions[12].setAltAns( "false" );
        }
        notPossible = notMostDig*(int)Math.pow(10,nDigsAct[1]) + actualInt[1] - actualInt[1]/(int)Math.pow(10,nDigsAct[1]);
        notPoss = Format.getFormat( notPossible, decPtAct );
        questions[13].setQuesText("Equals     " + notPoss);
    } else {
        questions[0].setQuesText("The least significant digit is " + leastDig);
        int notLeastDig = (7 + leastDig) % 10;
        questions[1].setQuesText("The least significant digit is " + notLeastDig);
        long somethingInRange = actualInt[0] + (int)((actualInt[2]-actualInt[0])*Math.random());
        long withLeastDigZeroed = 10*(somethingInRange/10);
        long possible = leastDig + withLeastDigZeroed;
        System.out.println("somethingInRange = " + somethingInRange + " withLeastDigZeroed = " + withLeastDigZeroed + " possible = " + possible);
        poss = Format.getFormat( possible, decPtAct );
        questions[6].setQuesText("Equals    " + poss);
        questions[6].setQuesAns("possible");
        if( possible == actualInt[1] ) {
            questions[6].setAltAns("true");
        } else {
             questions[6].setAltAns("false");
        }
        somethingInRange = actualInt[0] + (int)((actualInt[2]-actualInt[0])*Math.random());
        withLeastDigZeroed = 10*(somethingInRange/10);
        possible = leastDig + withLeastDigZeroed;
        System.out.println("somethingInRange = " + somethingInRange + " withLeastDigZeroed = " + withLeastDigZeroed + " possible = " + possible);
        poss = Format.getFormat( possible, decPtAct );
        questions[7].setQuesText("Equals " + poss);
        questions[7].setQuesAns( "possible" );
        if( possible == actualInt[1]) {
            questions[7].setAltAns( "true" );
        } else {
            questions[7].setAltAns( "false" );       
        }
        somethingInRange = actualInt[0] + (int)((actualInt[2]-actualInt[0])*Math.random());
        withLeastDigZeroed = 10*(somethingInRange/10);
        possible = leastDig + withLeastDigZeroed;
        System.out.println("somethingInRange = " + somethingInRange + " withLeastDigZeroed = " + withLeastDigZeroed + " possible = " + possible);
        poss = Format.getFormat( possible, decPtAct );
        questions[12].setQuesText("Equals " + poss);
        questions[12].setQuesAns( "possible" );
        if( possible == actualInt[1]) {
            questions[12].setAltAns( "true" );
        } else {
            questions[12].setAltAns( "false" );
        }
        notPossible = notLeastDig + 10*(actualInt[1]/10);
        notPoss = Format.getFormat( notPossible, decPtAct );
        questions[13].setQuesText("Equals     " + notPoss);
    }
    questions[2].setQuesText("Is greater than " + actual[0]);
    questions[3].setQuesText("Is less than    " + actual[0]);
    questions[4].setQuesText("Is less than    " + actual[2]);
    questions[5].setQuesText("Is greater than " + actual[2]);
    notPossible = (int)(actualInt[0]*Math.random());
    notPoss = Format.getFormat( notPossible, decPtAct );
    questions[8].setQuesText("Can't be " + notPoss);
    questions[9].setQuesText("Equals     " + notPoss);
    notPossible = actualInt[2] + (int)(actualInt[0]*Math.random());
    notPoss = Format.getFormat( notPossible, decPtAct );
    questions[10].setQuesText("Can't be " + notPoss);
    questions[11].setQuesText("Equals     " + notPoss);
    // add wrong operand, wrong decimal point, fixit
    TreeMap<Integer, Question> scramble = new TreeMap();
    int shiftReg = 1 + (int)(0xFFFF*Math.random());
    for( int i = 0; i < 14; ++i ) {
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
<form id="th-id2">
        <div>
        <span><label class="blank">lower range     </label><label class="blank"><%=actual[0]%></label></span>
        </div>
        <div>
        <span><label class="blank">actual result   </label><label class="blank"><%=actual[1]%></label></span>
        </div>
        <div>
        <span><label class="blank">upper range     </label><label class="blank"><%=actual[2]%></label></span>
        </div>
        <div>
        <span class="offs"><label>Original Problem </label><label><%=entireProb%></label></span>
        </div>
<table>
<tr>
<td>                        
<table>
    <tr><td></td><td></td><td>True</td><td>Possible</td><td>False</td><td></td>
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
                <input type="radio" name="<%=name%>" value="true">
            </td>
            <td class="rad">
                <input type="radio" name="<%=name%>" value="possible">
            </td>
            <td class="rad">
                <input type="radio" name="<%=name%>" value="false">
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
</table>  
</td>
</tr>
</table>
<table>
    <th colspan=12>Estimate Answers to These Types of Problems
    </th>
    <tr>
        <td><input type="checkbox" value="Addition" name="addition" 
                   <%=isAddition%> onclick="zeroCounts()">
        </td>
        <td><label>Addition</label></td>
        <td><input type="checkbox" value="Multiplication" name="multiplication" 
                   <%=isMultiplication%> onclick="zeroCounts()">
        </td>
        <td><label>Multiplication</label></td>
        <td><input type="checkbox" value="Subtraction" name="subtraction" 
                   <%=isSubtraction%> onclick="zeroCounts()">
        </td>
        <td><label>Subtraction</label></td>
        <td><input type="checkbox" value="Division" name="division" 
                   <%=isDivision%> onclick="zeroCounts()">
        </td>
        <td><label>Division</label></td>
        <td><input type="checkbox" value="Decimals" name="decimals" 
                   <%=isDecimals%> onclick="zeroCounts()">
        </td>
        <td><label>With Decimals</label></td>
        <td><input type="checkbox" value="Negatives" name="negatives" 
                   <%=isNegatives%> onclick="zeroCounts()">
        </td>
        <td><label>With Negative Numbers</label></td>
    </tr>
</table>
<span class="offs">
<input type="button" value="Check" onclick="checkTF()">
<button type="reset" value="Reset" onclick="startAgain()">Start Again</button>
</span>
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
</body>
</html>

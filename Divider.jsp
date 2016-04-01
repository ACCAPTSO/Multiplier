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
<script src="Divider.js"></script>
</head>
<body>
   
<%
    // 2nd divisor dig around 5 is harder to estimate fixit
    // count it wrong if the user gueses a quotient digit 3 times fixit
    // make the table size constant so it doesn't give hints and the buttons don't 
    // jump around fixit
    // find why some preset settings don't work at all or stick permanently 
    System.out.println("------------------------Start Anew!-------------------------");
    final int SZ2_MX = 12; // maximum dividend + divisor + 1 size
    final int maxOps = 2;
    final double NEXP = 2.6; // used to generate # of digits    
    final double DEXP = 1.4; // used to generate digits themselves or # operands
    final boolean cmdebug = false;
    final boolean debugcarries = false;
    final boolean lastboxdebug = false;
    
    boolean immFeedBkCk = false;
    boolean estRequiredCk = false;
    boolean remaindersCk = false;
    boolean exDpCk = false;
    boolean recDpCk = true;
    String isImmFeedBk = "";
    String isEstRequired = "";
    String isRemainders = "";
    String isExDp = "";
    String isRecDp = "checked";
    String tmp = "";      // temporary storage for newly gotten 
                          // request parameter
    String whatlvl = "";
    double justLessThn1 = 1 - 1/Double.MAX_VALUE;
    if(( tmp = request.getParameter("difflvl")) != null ) {
        recDpCk = false;
        isRecDp = "";
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
   
    
    int quotDp = 1; // 1 corresponds to integer with no decimal part
    int dvsrDp = 1;
    int dvdDp = 1;
    int nTwos = 0;
    int nFives = 0;

    if( exDpCk ) {
        //dvsrDp = 2 + (int)(3*Math.random()); // 2-4
        //dvsrDp = 1 + (int)(4*Math.random()); // 1-4
        nTwos = (int)(5*Math.random());
        nFives = (int)(5*Math.random());
        //dvsrDp = 4; // leading 0 in quotient having issues
    }
        
    int dsMaxDg = 2 + (int)(3*Math.random()); // 2-4 digits
    if( remaindersCk || exDpCk ) {
        dsMaxDg = 1 + (int)(3*Math.random()); // 1-3 digits
    //} else if( exDpCk ) {
        //dsMaxDg = 1 + (int)(2*Math.random()); // 1-2 digits
    } else if( recDpCk ) {
        dsMaxDg = 1; // + (int)(2*Math.random()); // 1-2 digits
    }
    //int dsMaxDg = 3 + (int)(2*Math.random()); // 3-5 digits
    //dsMaxDg = 3;
    int dsMax = (int)(Math.pow(10, dsMaxDg)) - 2;
    int divisor = 2 + (int)(dsMax*Math.random());
    //int increase = (int)(Math.pow(5.0,nTwos)*Math.pow(2.0,nFives));
    
    //divisor = 8720; // leading 0 in quotient having issues
    //divisor = 29; // remainder is a bringdown
    // divisor = 7; // gives remainder 0
    //divisor = 35;
    //divisor = 18; // remainder whatbox and lastbox issues
    //divisor = 98;
    //divisor = 1591; // second subtraction not reading the 3 // think i was hitting the key too fast
    //ivisor = 7739; // bdx never reaches lastbox
    //divisor = 516; // enter 167x and 5005 - 3612 2nd significant digis has carry crossed off from previous error
    //divisor = 4172;
    //divisor = 874; // 2 bringdowns, borrow carry hints one to the left
    //divisor = 90; // enter low then high for 2nd qdigit, divide function nextbox gets lost
    //divisor = 186; // last row borrow hint not in the right column
    //divisor = 74; // 2 bringdowns issues with promptDivBorrow
    //divisor = 69; // issues with promptDivBorrow not checking right carry
    //divisor = 51; // last line of product boxes skipping lsd
    //divisor = 6495; // had issue with restAreZero 
    //divisor = 94 // sometimes gives wrong box after mcarry 
    //divisor = 3717;
    //divisor = 57; // whatborbx or cabx does not exist does it matter? 
    //divisor = 4975;

    //divisor = 497; // bringdowns not being counted for nextbox

    //divisor = 77;
    //divisor = 6851;
    //divisor = 28;
    //System.out.println("dsMaxDg = " + dsMaxDg + " dsMax = " + dsMax + " divisor = " + divisor);

    int dvsrDigs = (int)Math.log10(divisor) + 1;

    int qtMaxDg = 7 - dvsrDigs;
    qtMaxDg = 6 - dvsrDigs;
    if( remaindersCk  ) {
        qtMaxDg = 6 - dvsrDigs;
    } else if( exDpCk ) {
        qtMaxDg = 5 - dvsrDigs;
    } else if( recDpCk ) {
        qtMaxDg = 1;//2 - dvsrDigs;
    }

    int qtMax = (int)(Math.pow(10, qtMaxDg)) - 1;
    
    //if( exDpCk || recDpCk ) {
        //quotDp = 1 + (int)(qtMaxDg*Math.random());
        //quotDp = (new Double((1+qtMax)*(1 - Math.pow(Math.random(),DEXP)))).intValue();
        //quotDp = 3; // leading 0 in quotient having issues
   //}
    long quotient = 1 + (int)(qtMax*Math.random());
    //dvdDp = 1 + (dvsrDp - 1) + (quotDp - 1);
    int dvdDigs = 0;
    //System.out.println("quotient = " + quotient + " nTwos = " + nTwos + " nFives = " + nFives + " divisor = " + divisor);
    if( exDpCk ) {
        int t = 0;
        int f = 0;
        int totWidth = 1 + (int)Math.log10(divisor) + 1 + (int)Math.log10(quotient*divisor);
        long prevQuot = quotient;
        int prevDiv = divisor;
        int prevT = t;
        int prevF = f;
        while( totWidth < SZ2_MX - 2 && (t < nTwos && f < nFives)) {
            prevQuot = quotient;
            prevDiv = divisor;
            prevT = t;
            prevF = f;
            boolean heads = (Math.random() < 0.5);
            //heads = true; // fixit
            //System.out.println("quotient = " + quotient + " divisor = " + divisor + " ntwos = " + t + " nfives = " + f + " totWidth = " + totWidth);   
            if( t < nTwos && heads ) {
                t++;
                quotient = quotient*2;
                divisor = divisor*5;
            } else if( f < nFives) {
                f++;
                quotient = quotient*5;
                divisor = divisor*2;
            }
            dvsrDigs = 1 + (int)Math.log10(divisor);
            dvdDigs = 1 + (int)Math.log10(quotient*divisor);
            //totWidth = (dvsrDp > dvsrWidth? dvsrDp : dvsrWidth) + 
            //        (dvdDp > dvdWidth? dvdDp : dvdWidth);
            totWidth = dvsrDigs + dvdDigs;
        }
        if( totWidth >= SZ2_MX - 2 ) {
            //System.out.println("totWidth = " + totWidth + " quotient = " + quotient + " prevQuot = " + prevQuot + " divisor = " + divisor + "prevDiv = " + prevDiv);
            quotient = prevQuot;
            divisor = prevDiv;
            t = prevT;
            f = prevF;
            dvsrDigs = 1 + (int)Math.log10(divisor);
            dvdDigs = 1 + (int)Math.log10(quotient*divisor);
            totWidth = dvsrDigs + dvdDigs;
            //totWidth = (dvsrDp > dvsrWidth? dvsrDp : dvsrWidth) + 
                    //(dvdDp > dvdWidth? dvdDp : dvdWidth);
        }
        //System.out.println(" after loop quotient = " + quotient + " divisor = " + divisor + " ntwos = " + t + " nfives = " + f + " totWidth = " + totWidth);   
    }
    /* dbfixit 
    quotient = 3365;
    divisor = 30;
    dvsrDigs = 2;
    quotient = 98;
    divisor = 650;
    dvsrDigs = 3;
    quotient = 4600;
    divisor = 108;
    dvsrDigs = 3;
    quotient = 4765;
    divisor = 58;
    dvsrDigs = 2;
    quotient = 34;
    divisor = 434;
    dvsrDigs = 3;
    quotient = 1790;
    divisor = 425;
    dvsrDigs = 3;
    quotient = 25;
    divisor = 1972;
    dvsrDigs = 4;
    quotient = 5225;
    divisor = 4;
    dvsrDigs = 1;
    quotient = 13898;
    divisor = 25;
    dvsrDigs = 2;
    quotient = 90037;
    divisor = 3;
    dvsrDigs = 1;
    /* fixit */
    int quotDigs = (int)Math.log10(quotient) + 1;
    /* fixit
    quotient = 600;
    divisor = 4000;
    dvsrDigs = 4; // 5?
    dvsrDp = 4;
    quotDp = 3;
    quotient = 6;
    divisor = 46840;
    dvsrDigs = 5;
    dvsrDp = 4;
    quotDp = 1;
    quotient = 500; 
    divisor = 51;
    dvsrDigs = 4;
    dvsrDp = 4;
    quotDp = 3;
    //quotient = 906;
    //divisor = 4;
    //dvsrDigs = 4;
    //dvsrDp = 4;
    //quotDp = 4;
    quotient = 540; 
    divisor = 5390;
    dvsrDigs = 4;
    dvsrDp = 1;
    quotDp = 1;
    
    quotient = 10;
    divisor = 511;
    dvsrDigs = 3;
    dvsrDp = 1;
    quotDp = 2;
        
    quotient = 197580;
    divisor = 300;
    dvsrDigs = 3;
    dvsrDp = 1;
    quotDp = 3;         
    //quotient = 1010;
    //divisor = 310;
    //dvsrDigs = 3;
    //dvsrDp = 1;
    //quotDp = 3;
    quotient = 480;
    divisor = 325;
    dvsrDigs = 3;
    dvsrDp = 3;
    quotDp = 1;
    
    quotient = 1300;
    divisor = 440;
    dvsrDigs = 4;
    dvsrDp = 4;
    quotDp = 2;
    
        quotient = 28390;
    divisor = 10;
    dvsrDigs = 3;
    dvsrDp = 3;
    quotDp = 5;
    /* fixit */

    //uotient = 42; // leading 0 in quotient having issues
    //quotient = 69140; // remainder is a bringdown

    //quotient = 49970; // gives remainder 0
    //quotient = 79419;
    //quotient = 53340; // remainder whatbox and lastbox issues
    //quotient = 32;
    //quotient = 754; // second subtraction not reading the 3
    //quotient = 330; // bdx never reaches lastbox
    //quotient = 1697; // enter 167x and 5005 - 3612 2nd significant digis has carry crossed off
    //quotient = 422;
    //quotient = 1019; // 2 bringdowns, borrow carry hints one to the left
    //quotient = 58745; // enter low then high for 2nd qdigit, divide function nextbox gets lost
    //quotient = 8130; // last row borrow hint not in the right column
    //quotient = 7024; // 2 bringdowns issues with promptDivBorrow
    //quotient = 9276; // issues with promptDivBorrow not checking right carry

    //quotient = 56205; // last line of product boxes skipping lsd 
    //quotient = 302; // had issue with restAreZero 
    //quotient = 27793; // sometimes gives wrong box after mcarry
    //quotient = 137;
    //quotient = 65241;// whatborbx or cabx does not exist does it matter? 
    //quotient = 160;
    //quotient = 5007; // bringdowns not being counted for nextbox 
    //quotient = 53094;
    //quotient = 237;
    //quotient = 3100904; // combination with divisor = 28 gives leading 0 in one of the arguments. is that a problem? 
    //System.out.println("dvsrDigs = " + dvsrDigs + " qtMaxDg = " + qtMaxDg + " qtMax = " + qtMax + " quotient = " + quotient);

    //int quotient = 5321;
    //int divisor = 321;
    //int quotient = 21;
    //int divisor = 321;
    
    if( recDpCk ) {
        dvsrDp = 1; // + (int)(2*Math.random()); // making it more is tricky - overflows page
        if( dvsrDp > dvsrDigs ) {
            dvsrDigs = dvsrDp;
        }
        //int maxQtDp = SZ2_MX + 1 - 2*dvsrDigs;
        int maxQtDp = 4; //SZ2_MX - 2 - 2*dvsrDigs; // making it more is tricky - overflows page
        quotDp = 1 + (int)(maxQtDp*Math.random());
    }
    if( exDpCk ) {
        dvsrDp = 1 + (int)(dsMaxDg*Math.random()); 
        //dvsrDp = 2;
        //dvsrDp = 1;
        //dvsrDp = 1;
        //dvsrDp = 2;
        //dvsrDp = 2;
        //dvsrDp = 1;
        //dvsrDp = 2;
        //dvsrDp = 1;
        //dvsrDp = 2;
        //dvsrDp = 1; // dbfixit
        if( dvsrDp > dvsrDigs ) {
            dvsrDigs = dvsrDp;
        }
        //int maxQtDp = SZ2_MX + 1 - 2*dvsrDigs;
        int maxQtDp = SZ2_MX - 2*dvsrDigs;
        quotDp = 1 + (int)(maxQtDp*Math.random());
        //quotDp = 3;
        //quotDp = 7;
        //quotDp = 7;
        //quotDp = 4;
        //quotDp = 6;
        //quotDp = 4;
        //quotDp = 9;
        //quotDp = 3;
        //quotDp = 5;
        //quotDp = 7; // dbfixit
        
    }

    
    
    long dividnd = quotient*divisor;
    //System.out.println("before adding recurring factor quotient = " + quotient + " quotDp = " + quotDp + " divisor = " + divisor + " dvsrDp = " + dvsrDp + " dividend =  " + dividnd );
    if( recDpCk ) {
        int diceRoll = 1 + (int)(7*Math.random());
        int denominator = 1;
        int multiplier = 10000000;
        dsMax = 7;

        int minQdp = 8;
        if( diceRoll == 7 ) {
            denominator = 13; // repeats every six digits
            minQdp = 8;
            multiplier = 10000000;
            //dsMax = 7;
        } else if( diceRoll == 6 ) {
            denominator = 7; // repeats every six digits
            minQdp = 8;
            multiplier = 10000000;
            //dsMax = 14; 
        } else if( diceRoll == 5 ) {
            denominator = 41; // repeats every five digits
            minQdp = 7;
            multiplier = 1000000;
            //dsMax = 24;            
        } else if( diceRoll == 4 ) {
            denominator = 37; // repeats every three digits
            minQdp = 5; // need at least 4 decimal places in case 0.2702 = 100 / 37
            multiplier = 10000;
            //dsMax = 27;   // 27 = 1000/37
        } else if( diceRoll == 3 ) {
            denominator = 11; // repeats every two digits
            minQdp = 4; // need at least 3 decimal places in case 0.909 = 100 / 11
            multiplier = 1000;
            //dsMax = 90;   // 90 = 1000/11
        } else if( diceRoll == 2 ) {
            denominator = 9; // repeats every digit
            minQdp = 2;
            multiplier = 100;
            //dsMax = 111; // = 1000/9
        } else if( diceRoll == 1 ) {
            denominator = 3; // repeats every digit
            minQdp = 2;
            multiplier = 100;
            //dsMax = 333; // = 1000/3
        }
        dsMaxDg = (SZ2_MX - minQdp)/2;
        // mAKE MORE LIKELY TO BE SMALL FIXIT
        dvsrDp = 1 + (int)(dsMaxDg*Math.random());
        System.out.println("denominator = " + denominator + " minQdp = " + minQdp + " dsMaxDg = " + dsMaxDg + " dvsrDp = " + dvsrDp);
        dsMaxDg = dsMaxDg - 1 - (int)(Math.log10(denominator));
        dsMax = (int)(Math.pow(10, dsMaxDg)) - 1;
        divisor = 1 + (int)(dsMax*Math.random());
        
        int origDvsr = divisor;
        divisor = divisor*denominator; 
        dvsrDigs = (int)Math.log10(divisor) + 1;     
        if( dvsrDp > dvsrDigs ) {
            dvsrDigs = dvsrDp;
        }
        qtMaxDg = SZ2_MX - 2*dvsrDigs - (int)(Math.log10(multiplier/denominator));
        // make more likely to be small fixit
        quotDp = 1 + (int)(qtMaxDg*Math.random());
        while( quotient % denominator == 0 ) { // make sure division is not exact
            quotient = 1 + (int)(qtMax*Math.random());
        }
        dividnd = quotient*origDvsr*multiplier; // calculate without denominator it cancels algebraically but may have round off error
        System.out.println("dsMaxDg = " + dsMaxDg + " initial divisor = " + origDvsr + " qtMaxDg = " + qtMaxDg + " initial quotient = " + quotient+ " dividend = " + dividnd);

        quotient = quotient*multiplier;
        int dvMaxDg = SZ2_MX - dvsrDigs;
        System.out.println("quotient = " + quotient + " dvMaxDg = " + dvMaxDg );
        dvdDigs = (int)Math.log10(dividnd) + 1;
        while( dvdDigs < dvMaxDg ) {
            quotient = quotient*10;
            dividnd = dividnd*10;
            dvdDigs = (int)Math.log10(dividnd) + 1;
            System.out.println("quotient = " + quotient/denominator + " dividend = " + dividnd);
        }
        quotient = quotient / denominator;
        quotDigs = (int)Math.log10(quotient) + 1;
        if( quotDp < minQdp ) {
            quotDp = minQdp;
        }
        /* divisor = 7; // (int)tmplong op something corrupting last digit should be (int)(tmplong op something)
        quotient = 11428571428L;
        quotDp = 8;
        dvsrDp = 1;
        quotDigs = 11;
        dvsrDigs = 1;
        dividnd = 80000000000L;
        dvdDigs = 11;
        dvdDp = 8; */
        System.out.println("after: quotient = " + quotient + " quotDp = " + quotDp + " divisor = " + divisor + " dvsrDp = " + dvsrDp + " dividend =  " + dividnd );
    }
    
    //System.out.println("before removing zeros quotDp = " + quotDp);
    // remove trailing zeros after the decimal point
    //boolean allzeros = true; // assume no digits after the decimal point
    int tmpint = quotDp - 1;
    //System.out.println("line 423 quotient = " + quotient + " quotDp - 1 = " + tmpint );
    for( int i = 0; i < tmpint; i++ ) {       
        if( quotient % 10 == 0 ) {
            quotient = quotient / 10;
            dividnd = dividnd / 10;
            quotDigs -= 1;
            quotDp -= 1;
        } else {
            //allzeros = false;
            break;
        }
        //System.out.println("line 432 quotient = " + quotient + " quotient[" + i + "] = " + quotient % 10 + " quotDigs = " + quotDigs + " quotDp = " + quotDp ); // + " allzeros = " + allzeros );
    }
    //if( allzeros ) { // this quotient is an integer
    //    quotDp = 1;
    //}
    dvdDp = 1 + (dvsrDp - 1) + (quotDp - 1);
    
    
    System.out.println("quotDp = " + quotDp + " dvsrDp = " + dvsrDp + " dvdDp = " + dvdDp );

    int leadzeros = 0; 
            
    if( quotDp > quotDigs ) {
        leadzeros = quotDp - quotDigs;
        quotDigs = quotDp;
    }
    dvdDigs = (int)Math.log10(dividnd) + 1;
    
    int expDvdDp = 1 + (dvdDp - 1) - (dvsrDp - 1);
 
    int expQuotDp = expDvdDp;
    
    boolean dsdpsettled = 1 == dvsrDp;
    boolean dddpsettled = expDvdDp == dvdDp;
    boolean qtdpsettled = (dsdpsettled && dddpsettled && quotDp == 1 ) ||
            !( exDpCk || recDpCk );
    
    if( dvdDp > dvdDigs ) {
        dvdDigs = dvdDp;
    }
    //System.out.println("divisor = " + divisor + " quotient = " + quotient + " dividnd = " + dividnd );
    System.out.println("dvsrDigs = " + dvsrDigs + " dvsrDp = " + dvsrDp + " quotDigs = " + quotDigs + " quotDp = " + quotDp + " dvdDigs = " + dvdDigs + " dvdDp = " + dvdDp);
    //System.out.println("expQuotDp = " + expQuotDp + " expDvdDp = " + expDvdDp + " leadzeros = " + leadzeros);
    int rmdrMxDg = SZ2_MX - dvsrDigs - 1 - dvdDigs - 1;
    int rmdrMax = 0;
    int remainder = 0;
    int rmdrDigs = 0;

    if( remaindersCk ) {
        rmdrMax = (int)(Math.pow(10, rmdrMxDg)) - 1;
        if( rmdrMax >= divisor ) {
            rmdrMax = divisor - 1;
        }
        //remainder = (int)(rmdrMax*Math.random());
        //remainder = rmdrMax*(int)(1 - Math.pow(Math.random(),DEXP));
        remainder = (new Double((1+rmdrMax)*(1 - Math.pow(Math.random(),DEXP)))).intValue();
        //remainder = 21;     // remainder is a bringdown
        // remainder = 0;
        //System.out.println("rmdrMxDg = " + rmdrMxDg + " rmdrMax = " + rmdrMax + " remainder = " + remainder);
        //remainder = 5;
        //remainder = 17;
        //remainder = 0; // remainder whatbox and lastbox issues
        rmdrDigs = remainder > 0? (1 + (int)Math.log10(remainder)) : 1;
        dividnd += remainder;
    }
    int [] qt;
    int [] ds;
    int [] dd;
    boolean [] visible;
    int [] rm;
    int [] cspan;
    int [] bspan;
    int [] dspan;
    
    qt = new int[SZ2_MX];
    ds = new int[SZ2_MX];
    dd = new int[SZ2_MX];
    visible = new boolean[SZ2_MX];
    rm = new int[rmdrDigs];
    cspan = new int[quotDigs];
    bspan = new int[quotDigs];
    dspan = new int[quotDigs];
    int bqspan = 2*dvsrDigs + 1;
    int cqspan = 2*dvdDigs + 1;
    
    
    int [] numBringDn = new int[quotDigs];
    int [] actBringDn = new int[quotDigs];
    long tmplong = quotient;
    for( int idx = 0; idx < quotDigs; ++idx ) {
        qt[idx] = (int)(tmplong % 10);
        tmplong = tmplong / 10;
        
        numBringDn[idx] = 0;
        actBringDn[idx] = 0;
    }
    //System.out.println("quotient = " + quotient);// + " qt[" + idx + "] = " + qt[idx]);
    tmplong = divisor;
    for( int idx = 0; idx < dvsrDigs; ++idx ) {
        ds[idx] = (int)(tmplong % 10);
        tmplong = tmplong / 10;
        
    }
    //System.out.println("divisor = " + divisor);// + " ds[" + idx + "] = " + ds[idx]);
    tmplong = dividnd;
    boolean inVisibleSoFar = dvdDp > 1;
    for( int idx = 0; idx < dvdDigs; ++idx ) {
        dd[idx] = (int)(tmplong % 10);
        //System.out.println("dividend = " + tmplong + " dd[" + idx + "] = " + dd[idx]);
        tmplong = tmplong / 10;
        if( inVisibleSoFar && idx < dvdDp - 1 && dd[idx] == 0 ) {
            visible[idx] = false;
            cqspan -= 2;
        } else {
            visible[idx] = true;
            inVisibleSoFar = false;
        }
    }
    int dqspan = 1 + 2*(SZ2_MX + 1) - bqspan - cqspan;
    
    tmpint = remainder;
    for( int idx = 0; idx < rmdrDigs; ++idx ) {
        rm[idx] = (int)tmpint % 10;
        tmpint = tmpint / 10;
        //System.out.println("divisor = " + divisor + " dividend = " + dividnd + " remainder = " + remainder + " rm[" + idx + "] = " + rm[idx]);
    }
    
    int spacesb4quot = dvsrDigs + 1;
    tmpint = dd[dvdDigs-1];
    // add as many dividend digits as needed to form a number that the
    // divisor goes into at least once
    for( int idx = dvdDigs-2; idx >= 0 && tmpint < divisor; --idx ) {
        tmpint = 10*tmpint + dd[idx];
        spacesb4quot += 1;
        //System.out.println("line 605 dividend = " + tmpint + " spacesb4quot = " + spacesb4quot);
    }
    int qd = quotDigs - 1;
    // back off leading zeros
    //System.out.println("line 609 quotDigs = " + quotDigs + " qt[" + qd + "] = " + qt[qd] + " spacesb4quot = " + spacesb4quot);
    while( qt[qd] == 0 && qd > 0 ) {
        spacesb4quot -= 1;
        qd -= 1;
        //System.out.println("line 613 quotDigs = " + quotDigs + " qt[" + qd + "] = " + qt[qd] + " spacesb4quot = " + spacesb4quot);
    }

    boolean showBrowsCk = false;
    String isShowBrows = "";
    String helplist[] = request.getParameterValues("showborrows");
    if( helplist  != null ) {
        for( int idx = 0; idx < helplist.length; idx++ ) {
            if( helplist[idx].equals("Show Borrows") ) {
                showBrowsCk = true;
                isShowBrows = "checked";
            }
        }
    }
    boolean showMcarriesCk = false;
    String isShowMcarries = "";
    String mcarrylist[] = request.getParameterValues("showmcarries");
    if( mcarrylist  != null ) {
        for( int idx = 0; idx < mcarrylist.length; idx++ ) {
            if( mcarrylist[idx].equals("Show Multiplication Carries") ) {
                showMcarriesCk = true;
                isShowMcarries = "checked";
            }
        }
    }
    int numOps = 2;
    int colspan = 2*(SZ2_MX + 1) + 1;
    //int[][][] op;       // operand's first index is what subtraction   
                        // second index is what operand (top/bottom)
                        // third index is what digit of that operand
    int [][] borrows;
    int [][] ncarries; // tracks if carry is needed
    
    int [][] mcarries; // multiplicative carries
    
    int [][] operand = new int[quotDigs][maxOps];
    int [][] calcOp = new int[quotDigs][maxOps];
    //op = new int[quotDigs][maxOps][SZ2_MX+1];
    int [][] actDig = new int[quotDigs][maxOps];
    int [][] wcDig = new int[quotDigs][maxOps];
    int [][] calcDig = new int[quotDigs][maxOps];
    int [] calcBdDig = new int[quotDigs];
    int [][] spacesb4Op = new int[quotDigs][maxOps];


    int whatquotDig = quotDigs-1; // there may be more quotient digits than subtractions
    while( qt[whatquotDig] == 0 ) {
        //System.out.println("line 330 qt[" + whatquotDig + "] = " + qt[whatquotDig]);
        whatquotDig -= 1;
    }
    //System.out.println("line 333 qt[" + whatquotDig + "] = " + qt[whatquotDig]);
    tmplong = dividnd;
    // use only the first few digits
    long lastDig = 0;
    int worstCaseQdig = 9;
    while( tmplong > qt[whatquotDig]*divisor ) {
        lastDig = tmplong % 10;
        tmplong = tmplong / 10;
    }
    // back off the last digit removed
    if( tmplong != qt[whatquotDig]*divisor ) {
        tmplong = tmplong*10 + lastDig;
    }
    int nsubs = 0; // actual subtractions
    while( whatquotDig >= 0 ) {
        if( nsubs > quotDigs || whatquotDig > SZ2_MX ){
            System.out.println("nsubs = " + nsubs + " is greater than quotDigs = " + quotDigs + " or whatQuotDig = " + whatquotDig + " is greater than SZ2_MX = " + SZ2_MX);
            break;
        }
        operand[nsubs][0] = qt[whatquotDig]*divisor;
        int WCoperand0 = worstCaseQdig*divisor; // worst case, biggest operand
        operand[nsubs][1] = (int)(tmplong - operand[nsubs][0]);
        //System.out.println("nsubs = " + nsubs + " qt[" + whatquotDig + "] = " + qt[whatquotDig] + " last dividend = " + tmplong + " product = " + operand[nsubs][0] );
        int WCoperand1 = (int)(tmplong - divisor); 

        actDig[nsubs][0] = operand[nsubs][0] > 0? 
                (int)Math.log10(operand[nsubs][0]) + 1: 1;
        actDig[nsubs][1] = operand[nsubs][1] > 0? 
                (int)Math.log10(operand[nsubs][1]) + 1: 1;
        wcDig[nsubs][0] = WCoperand0 > 0? 
                (int)Math.log10(WCoperand0) + 1: 1;
        //wcDig[nsubs][1] = WCoperand1 > 0? 
        //        (int)Math.log10(WCoperand1) + 1: 1;
        wcDig[nsubs][1] = WCoperand1 > 0? 
                (int)Math.log10(WCoperand1) + 2: 2;
        //System.out.println("whatQuotDig = " + whatquotDig + " operand[" + nsubs + "][0] = " + operand[nsubs][0] + "  WCoperand0 = " + WCoperand0 + " WCoperand1 = " + WCoperand1 );       
        if( operand[nsubs][1] < 0 ) {
            System.out.println("tmplong = " + tmplong + " operand[" + nsubs + "][0] = " + operand[nsubs][0] + " diff = " + operand[nsubs][1] + " that's messed up");
            break;
        }

        int mostPossProdDig = (int)Math.log10(9*divisor) + 1;
        spacesb4Op[nsubs][0] = spacesb4quot + quotDigs - whatquotDig - mostPossProdDig - 1;
        //System.out.println("nsubs = " + nsubs + " spacesb4quot = " + spacesb4quot + "+ quotDigs = " + quotDigs + "- whatQuotDig = " + whatquotDig + " - mostPossProdDig = " + mostPossProdDig + " - 1 = " + " spacesb4Op[" + nsubs + "][0] = " + spacesb4Op[nsubs][0]);

        spacesb4Op[nsubs][1] = spacesb4quot + quotDigs - whatquotDig - wcDig[nsubs][1] - 1;
        cspan[nsubs] = 2*wcDig[nsubs][0] + 1;
        bspan[nsubs] = 2*(spacesb4Op[nsubs][0] + 1);
        dspan[nsubs] = 1 + 2*(SZ2_MX + 1) - bspan[nsubs] - cspan[nsubs];
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
        tmplong = operand[nsubs][1];
        actBringDn[nsubs] = 0;
        numBringDn[nsubs] = SZ2_MX + 1 - spacesb4Op[nsubs][1] - wcDig[nsubs][1];
        //actBringDn[nsubs] = SZ2_MX + 1 - spacesb4Op[nsubs][1] - actDig[nsubs][1];
        boolean breakout = false;
        while( tmplong < divisor ) {
            if( whatquotDig < 1 ) {
                //System.out.println("no more quote digits tmpint = " + tmpint + " actBringDn[" + nsubs + "] = " + actBringDn[nsubs]);
                breakout = true;
                break;
            }
            tmplong = 10*tmplong + dd[whatquotDig-1];
            whatquotDig = whatquotDig - 1;
            actBringDn[nsubs] += 1;
        }
        if( breakout ) {
            break;
        }
        //System.out.println("operand[" + nsubs + "][1] = " + operand[nsubs][1] + " actDig[" + nsubs + "][1] = " + actDig[nsubs][1] + " actBringDn[" + nsubs + "] = " + actBringDn[nsubs]);
        //System.out.println("spacesb4Op[" + nsubs + "][1] = " + spacesb4Op[nsubs][1] + " wcDig[" + nsubs + "][1] = " + wcDig[nsubs][1] + " numBringDn[" + nsubs + "] = " + numBringDn[nsubs]);
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
    int sbx;
    for( sbx = 0; sbx < quotDigs; ++sbx ) {
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
    
    int [] nacarries;
    nacarries = new int[quotDigs];
    
    for( sbx = 0; sbx < quotDigs; ++ sbx ) {
        nacarries[sbx] = 0;
        int sbxminus1 = sbx - 1;
        int kdxmax = sbx == 0? 
                dvdDigs - quotDigs + 1 + leadzeros : 
                wcDig[sbxminus1][1] + numBringDn[sbxminus1] - 1;
        if( sbx > 0 ) {
            //System.out.println("wcDig[" + sbxminus1 + "][1] = " + wcDig[sbxminus1][1] + " numBringDn[" + sbxminus1 + "] = " + numBringDn[sbxminus1]);
        }
        for (kdx = 0; kdx < kdxmax; kdx++) {
            boolean needsCarry = true;
            if( kdx >= kdxmax-1 || (sbx > 0 && wcDig[sbxminus1][1] < 2 ) ) {
                needsCarry = false;
            }
            if( needsCarry ) {
                ncarries[sbx][kdx] = 1;
                nacarries[sbx] += 1;          
            }
            //System.out.println("ncarries[" + sbx + "][" + kdx + "] = " + ncarries[sbx][kdx] + " nacarries[" + sbx + "] = " + nacarries[sbx]);
        }
    }

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
        nmcars += (dvsrDigs - 1);
        if( showMcarriesCk ) {
            nmcars += (dvsrDigs - 1);
        }
        crows += 1;
        //System.out.println("qt[" + idx + "] = " + qt[idx] + " nmcars = " + nmcars + " crows = " + crows );
    }
    em[0] = nmcars + 2*nacarries[0] + quotDigs - 1;
    //em[0] = nmcars + 4*nacarries[0] + quotDigs - 1; // with hidden borrows anc carries in same table
    for( int idx = 0; idx <= nsubs; ++idx ) {
        if( idx > 0 ) {
            em[idx] = oh[idx-1];
        }
        em[idx] += wcDig[idx][0];
        //System.out.println("em[" + idx + "] = " + em[idx] + " numDig[" + idx + "][1] = " + numDig[idx][1]);
        en[idx] = em[idx] + wcDig[idx][1];
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
    // all you need is the first whatBx fixit
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
        //System.out.println("pdx = " + pdx + " actBringDn[" + idx + "] = " + actBringDn[idx] );
        if( rdx <= actBringDn[idx] ) { // bringdown box indexes
            whatBx[ldx] = en[idx] + rdx;
            //System.out.println("bringdown whatBx[" + ldx + "] = " + whatBx[ldx] + " pdx = " + pdx + " oh[" + idx + "] = " + oh[idx]);
            ++ldx;
            ++rdx;
            if( rdx > actBringDn[idx] ) { // reset for next row of products
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
    }
    String cmtype = cmdebug? "text" : "hidden";
    String lbtype = lastboxdebug? "text" : "hidden";%>
<div >
<form id="th-id2" method="get" action="Divider.jsp">
<table class="d1">
<tbody>
<tr>
<td class="d2">
<table class="tbl">
<tr><th id="F1" colspan="<%=colspan%>">Division Problem</th></tr>
<%  // these are filler    
    for( sbx = SZ2_MX - 3; sbx >= crows; --sbx ) { 
        String rid = "r" + sbx; %>
        <tr>
        <td class="t2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            String cid = "c" + idx; %>            
                <td class="t1"></td>
                <td class="t2"></td>            
<%      } %>
        </tr>
<%  }
    for( sbx = crows - 1; sbx > 0; --sbx ) { %>
        <tr>
<%      int mcol = dvsrDigs - 2;
        String cname = "cm" + mcol + "_" + sbx;
        String cid = "hcm" + mcol + "_" + sbx; %>
        <td class="t2">
<%      if( showMcarriesCk ) { %>
            <input type="<%=cmtype%>" name="<%=cname%>" class="c2" 
                onkeyup="checkMcarry(<%=mcol%>,<%=sbx%>)" >
<%      }  %>
        <input type="hidden" id="<%=cid%>" class="c2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="t1"></td>
<%          if( idx < dvsrDigs - 2 ) { 
                mcol = dvsrDigs - 3 - idx;
                cname = "cm" + mcol + "_" + sbx;
                cid = "hcm" + mcol + "_" + sbx; %>
                <td class="t2">
<%              if( showMcarriesCk ) { %>
                    <input type="<%=cmtype%>" name="<%=cname%>" class="c2" 
                            onkeyup="checkMcarry(<%=mcol%>,<%=sbx%>)" >
<%              }  %>
                <input type="hidden" id="<%=cid%>" class="c2"></td>
<%          } else {  %>
                <td class="t2"></td>
<%          } %>

<%      } %>
        </tr>
<%  } %>
<tr>
<%  int mcol = dvsrDigs - 2;
    String cname = "cm" + mcol + "_0"; 
    String cid = "hcm" + mcol + "_0"; %>
    <td class="t2" name="notthestartdig">
<%  if( showMcarriesCk ) { %>
        <input type="<%=cmtype%>" name="<%=cname%>" class="c2" 
            onkeyup="checkMcarry(<%=mcol%>,0)">
<%  } %>
            <input type="hidden" id="<%=cid%>" class="c2"></td>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) {       
        if( idx < spacesb4quot || spacesb4quot + quotDigs + rmdrDigs < idx ) { %>
            <td class="t1" name="notthestartdig"></td>
<%      } else if( spacesb4quot <= idx && idx < spacesb4quot + quotDigs ) {
            int col = spacesb4quot + quotDigs - 1 - idx;
            String qid = "qt" + col;  %>
            <td class="t1" onclick="showQuotDigs(<%=col%>)">
                <input type="<%=cmtype%>" id="<%=qid%>" class="a1" size="1" 
                       name="quotdigs"
            onkeyup="divide(<%=immFeedBkCk%>, <%=col%>, <%=qt[col]%> )"
            ></td>
<%      } else if( remaindersCk && idx == spacesb4quot + quotDigs ) { %>
            <td class="t1" name="notthestartdig"><label id="dispR">
                R
            </label>
            </td>
<%      } else if( remaindersCk && remainder > 0 ) { 
            int col = spacesb4quot + quotDigs + rmdrDigs - idx;
            String rid = "r" + col; 
            String rname = "rmdr"; %>
            <td class="t1" name="notthestartdig">
                <input type="<%=cmtype%>" id="<%=rid%>" name="<%=rname%>" 
                    class="a1" size="1" 
                    onkeyup="checkRemainder( <%=col%>, <%=rm[col]%> )"
            ></td>
<%      } else { %>
            <td class="t1" name="notthestartdig"></td>
<%      }
        if( idx < dvsrDigs - 2 && crows > 0 ) { 
            int col = dvsrDigs - 3 - idx;
            cname = "cm" + col + "_0"; 
            cid = "hcm" + col + "_0"; %>
            <td class="t2" name="notthestartdig">
<%          if( showMcarriesCk ) { %>
                <input type="<%=cmtype%>" name="<%=cname%>" class="c2" 
                                  onkeyup="checkMcarry(<%=col%>,0)">
<%          } %>
            <input type="hidden" id="<%=cid%>" class="c2"></td>
<%      } else if( spacesb4quot <= idx && idx < spacesb4quot + quotDigs ) {  
            int jdx = idx - spacesb4quot; %>
            <td class="t2" name="notthestartdig">
                <span name="quotDp" onclick="chooseDivThis( <%=jdx%>, 'quotDp' )" class="dp" >_</span>
            </td>
<%      } else { %>
            <td class="t2" name="notthestartdig">
            </td>
<%      }
    } %>
</tr>
<tr><th class="th-id1" colspan="<%=bqspan%>"></th>
    <th colspan="<%=cqspan%>"></th>
    <th class="th-id1" colspan="<%=dqspan%>"></th>
</tr>
<%    if( nacarries[0] > 0 ) { %>
        <tr>
            <td class="s2"></td>
    <%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                int ocol = dvsrDigs + dvdDigs - idx;
                int ccol = ocol - 1;
                int col = dvsrDigs + dvdDigs - quotDigs - idx + leadzeros;
                //System.out.println("idx = " + idx + " col = " + col + " ocol = " + ocol);
                String name = "boca0"; 
                if( col >= 0 && ncarries[0][col] != 0 ) { 
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
                if( col >= 0 && ncarries[0][col] != 0 ) { 
                    cid = "ca" + ccol + "_0"; 
                    if( ccol < 0 || ccol >= SZ2_MX ) {
                         System.out.println("ca ocol = " + ocol + "being reduced to 0");
                         ocol = 0;
                    } %>
                    <td class="s2">
                        <input type="<%=browType%>" name="<%=name%>" id="<%=cid%>"
                        class="f2" onkeyup="checkDivBorrow(<%=ccol%>, 0)"
                        onclick="promptDivBorrow(<%=ccol%>, 0)">
                    </td>
    <%          } else { %>
                    <td class="s2"></td>
    <%          } 
                
            } %>
        </tr>
<% } %>
<tr>
    <td class="t2"></td>
<%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
        if( idx < dvsrDigs ) { 
            int col = dvsrDigs - 1 - idx; %>
            <td class="t1" name="dvsrdigs" ><%=ds[col]%></td>
<%      } else if( idx == dvsrDigs ) { %>
            <td class="t1" >)</td>
<%      } else if( idx <= dvsrDigs + dvdDigs ) { 
            int col = dvsrDigs +  dvdDigs - idx;
            //System.out.println("dividend col = " + col); 
            String vclass = visible[col]? "t1" : "t3"; %>
            <td class="<%=vclass%>" name="dvddigs" onclick="promptDivBorrow(<%=col%>, 0)">
            <%=dd[col]%>
            </td>
<%      } else { %>
            <td class="t1" ></td>
<%      }
        if( dvsrDigs - idx == dvsrDp  && (exDpCk || recDpCk) ) { 
            int jdx = idx; // - 1; 
            // fp = black, dp = invisible, ep = red
            String dclass = dsdpsettled ? dvsrDp > 1 ? "fp" : "dp" : "ep"; %>
            <td class="t2">
                <span name="dvsrDp" onclick="chooseDivThis( <%=jdx%>, 'dvsrDp' )" class="<%=dclass%>" >.</span>
            </td>
<%      } else if( dvdDigs - (idx - dvsrDigs - 1) == dvdDp  && (exDpCk || recDpCk) ) { 
            int jdx = idx - dvsrDigs - 1; 
            String dclass = dsdpsettled ? dvdDp > 1? "fp" : "dp" : "ep"; %>
            <td class="t2">
                <span name="dvdDp" onclick="chooseDivThis( <%=jdx%>, 'dvdDp' )" class="<%=dclass%>" >.</span>
            </td>
<%      } else if( 0 <= idx && idx < dvsrDigs ) { 
            int jdx = idx; // - 1; %>
            <td class="t2">
                <span name="dvsrDp" onclick="chooseDivThis( <%=jdx%>, 'dvsrDp' )" class="dp" >_</span>
            </td>
 
<%      } else if( dvsrDigs < idx && idx < dvsrDigs + dvdDigs + 1 ) { 
            int jdx = idx - dvsrDigs - 1; %>
            <td class="t2">
                <span name="dvdDp" onclick="chooseDivThis( <%=jdx%>, 'dvdDp' )" class="dp" >_</span>
            </td>
<%      } else { %>
            <td class="t2"></td>
<%      }

    } %>
</tr>
<%  
    for( sbx = 0; sbx <= nsubs; ++sbx ) {
    int rdx = sbx + 1; %>

    <tr class="oprand">
        <td class="t2"></td>
    <%  for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
            if( idx < spacesb4Op[sbx][0] ) { %>
                <td class="t1"></td>
<%          } else if ( idx == spacesb4Op[sbx][0] ){ 
                String minusName="minus" + sbx; %>
                <td class="t3" id="<%=minusName%>" > - </td>
    <%      } else if( idx <= spacesb4Op[sbx][0] + wcDig[sbx][0]) {          
                int col = spacesb4Op[sbx][0] + wcDig[sbx][0] - idx;
                String name = "op" + sbx + "_0";
                String whattype = cmtype;
                //System.out.println(" product sbx =  " + sbx + " idx = " + idx + " col = " + col);
                %>
                <td class="t1">
                <input type="<%=whattype%>" name="<%=name%>" class="a1" size="1" 
                onkeyup="multiply( <%=col%> )">
                </td>
 <%         } else { %>
                <td class="t1"></td>
<%          } %>
            <td class="t2"></td>
    <%      } 
        String barName = "cspan" + sbx; %>
    </tr>
    <tr><th class="th-id1" colspan="<%=bspan[sbx]%>"></th>
        <th id="<%=barName%>" class="th-id1" colspan="<%=cspan[sbx]%>"></th>
        <th class="th-id1" colspan="<%=dspan[sbx]%>"></th>
    </tr>
<%  if( rdx <= nsubs && nacarries[rdx] > 0 ) {  %>
        <tr>
        <td class="s2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            int col = spacesb4Op[sbx][1] + wcDig[sbx][1]  + numBringDn[sbx] - idx - 2;
            int ocol = col + 1;
            String name = "boca" + rdx; 
            if( col >= 0 && ncarries[rdx][col] != 0 ) { 
                String bid = "bo" + ocol + "_" + rdx; 
                if( ocol < 0 || ocol > SZ2_MX ) {
                         System.out.println("bo col = " + col + "being reduced to 0");
                         col = 0;
                } %>
                <td class="s1">
                    <input type="<%=browType%>" name="<%=name%>" id="<%=bid%>" 
                    class="f1" onkeyup="checkNewDivVal(<%=ocol%>, <%=rdx%>)">
                </td>
<%          } else { %>
                    <td class="s1"></td>
<%          } 
            if( col >= 0 &&
                    spacesb4Op[sbx][1] < idx && 
                    col < wcDig[sbx][1] + numBringDn[sbx] && 
                    ncarries[rdx][col] != 0 ) {  

                cid = "ca" + col + "_" + rdx; %>
                <td class="s2">
                        <input type="<%=browType%>" name="<%=name%>" id="<%=cid%>"
                        class="f2" onkeyup="checkDivBorrow(<%=col%>, <%=rdx%>)"
                        onclick="promptDivBorrow(<%=col%>, <%=rdx%>)">
                </td>
<%          } else { %>
                <td class="s2"></td>
<%          } 

         } %>
        </tr>
<%  } else { %>
    
        <td class="s2"></td>
<%      // these are fake to fill space
        String filler = "boca" + rdx;
        for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="s1"><input type="<%=browType%>" class="f1" name="<%=filler%>"></td>
            <td class="s2"><input type="<%=browType%>" class="f2" name="<%=filler%>"></td>
<%      } %>
    </tr>  
<%  } %>
        <tr class="oprand">
        <td class="t2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) { 
            String whattype = cmtype; 
            int col = spacesb4Op[sbx][1] + wcDig[sbx][1] - idx;
            int ocol = spacesb4Op[sbx][1] + wcDig[sbx][1] + numBringDn[sbx] - idx - 1;
            int maxBDcol = wcDig[sbx][1] + numBringDn[sbx];
            if( idx <= spacesb4Op[sbx][1] ) { %>
                <td class="t1"></td>
<%          } else if( idx <= spacesb4Op[sbx][1] + wcDig[sbx][1] ) { 
                String name = "op" + sbx + "_1";  %>
                <td class="t1">
                <input type="<%=whattype%>" name="<%=name%>" class="a1" size="1" 
                onkeyup="subtract( <%=col%>, <%=sbx%> )" 
                onclick="promptDivBorrow(<%=ocol%>, <%=rdx%>)">
                </td>
    <%      } else if( 0 <= ocol && ocol <  maxBDcol ) { 
                String name = "bd" + sbx; %>
                <td class="t1">
                <input type="<%=whattype%>" name="<%=name%>" class="a1" size="1" 
                onkeyup="bringdown( <%=sbx%> )"
                onclick="promptDivBorrow(<%=ocol%>, <%=rdx%>)">
                </td>
 <%         } else { %>
                <td class="t1"></td>
<%          } %>
            <td class="t2"></td>
<%      } %>
    </tr>
<% } 
    // these are filler
    for( ; sbx < SZ2_MX - 2; ++sbx ) { 
        String rid = "r" + sbx; %>
        <tr>
        <td class="t2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            cid = "c" + idx; %>
            
                <td class="t1"></td>
                <td class="t2"></td>   
<%      } %>
        </tr>
        <tr>
            <th class="th-id1" colspan="<%=colspan%>"></th>
        </tr>
        <tr>
        <td class="s2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) { %>
            <td class="s1">
                <input type="<%=browType%>" class="f1" >
            </td>
            <td class="s2">
                <input type="<%=browType%>" class="f2" >
            </td>
<%      } %>
        </tr>
        <tr>
        <td class="t2"></td>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            cid = "c" + idx; %>
            <td class="t1"></td>
            <td class="t2"></td>   
<%      } %>
        </tr>
<%  } %>
</table>
</td>
<td class="d7">
<% if( cmdebug ) { %>
<label>whatbox</label>
<% } %>
<input type="<%=cmtype%>" id="whatbox" value="<%=whatBx[bdx]%>" class="shortbox">
<% if( cmdebug ) { %>
<label>lastBoxOfCurrRow</label>
<% } %>
<input type="<%=cmtype%>" id="lastBoxOfCurrRow">
<table>
    <tr>
<%    if( nacarries[0] > 0 ) {
    for( int idx = 0; idx <= SZ2_MX; idx++ ) {
                int ocol = dvsrDigs + dvdDigs - idx;
                int col = dvsrDigs + dvdDigs - quotDigs + 1 - idx + leadzeros;
                if( col >= 0 && ncarries[0][col] != 0 ) { 
                    String hid = "hca" + ocol + "_0"; 
                    if( ocol < 0 || ocol >= SZ2_MX ) {
                         System.out.println("ca col = " + ocol + "being reduced to 0");
                         ocol = 0;
                    } 
                    String ctype = "hidden";
                    if( debugcarries ) { 
                        ctype = "text"; %>
                        <td><label><%=hid%></label></td>
                    <% } %>
                    <td><input type="<%=ctype%>" id="<%=hid%>" value="0" class="shortbox"></td>
    <%          } 
                if( col > 0 && ncarries[0][col-1] != 0 ) { 
                    String hid = "hbo" + ocol + "_0" ; 
                    if( ocol < 0 || ocol > SZ2_MX ) {
                         System.out.println("bo col = " + ocol + "being reduced to 0");
                         ocol = 0;
                    }                     
                    String ctype = "hidden";
                    if( debugcarries ) { 
                        ctype = "text"; %>
                        <td><label><%=hid%></label></td>
                    <% } %>
                    <td><input type="<%=ctype%>" id="<%=hid%>" value="-2" class="shortbox"></td>
    <%          } 
            } 
} %>
</tr>
<%  for( sbx = 0; sbx <= nsubs; ++sbx ) {
    int rdx = sbx + 1; 
    if( rdx <= nsubs && nacarries[rdx] > 0 ) {  %>
    <tr>
<%      for( int idx = 0; idx <= SZ2_MX; idx++ ) {
            int col = spacesb4Op[sbx][0] + wcDig[sbx][0] + numBringDn[sbx] - 1 - idx; 
            //System.out.println("rdx = " + rdx + " col = " + col + " spacesb4Op[" + sbx + "][0] = " + spacesb4Op[sbx][0] + " wcDig[" + sbx + "][0] = " + wcDig[sbx][0] + " numBringDn[" + sbx + "] = " + numBringDn[sbx]);
            if( 0 <= col && 
                    col <  wcDig[sbx][0] + numBringDn[sbx] && 
                    ncarries[rdx][col] != 0 ) {
                String hid = "hca" + col + "_" + rdx; 
                if( col < 0 || col >= SZ2_MX ) {
                    System.out.println("ca col = " + col + "being reduced to 0");
                    col = 0;
                } 
                String ctype = "hidden";
                if( debugcarries ) { 
                    ctype = "text"; %>
                    <td><label><%=hid%></label></td>
             <% } %>
                <td><input type="<%=ctype%>" id="<%=hid%>" value="0" class="shortbox"></td>
<%          } 
            //System.out.println("second rdx = " + rdx + " col = " + col );
            if( 0 < col  && col < SZ2_MX + 1 && ncarries[rdx][col-1] != 0 ) { 
                String hid = "hbo" + col + "_" + rdx; 
                if( col < 0 || col > SZ2_MX ) {
                         System.out.println("bo col = " + col + "being reduced to 0");
                         col = 0;
                }                     
                String ctype = "hidden";
                if( debugcarries ) { 
                    ctype = "text"; %>
                    <td><label><%=hid%></label></td>
             <% } %>
                <td><input type="<%=ctype%>" id="<%=hid%>" value="-2" class="shortbox"></td>
<%          } 
         } %>
         </tr>
<%   }
} %>
</table>
<% for( int i = 0; i < 30; ++i ) {
    String sid = "statusBox" + i; %>
    <div id="<%=sid%>"></div>
<% } %>

<div class="d3">
<label id="dispBo">
<% boolean thereAreCarries = false;
for( int idx = 0; idx < nsubs; ++ idx ) { 
    if( nacarries[idx] > 0 ) {
        thereAreCarries = true;
        break;
    }
}
// Recurring decimals overlaps next table fixit
if( thereAreCarries && showBrowsCk ) { %>
            Click on a digit to borrow from it
<%  } %>
</label>
</div>
<div class="d6">
<!--this is where error messages get displayed//-->
<%  if( exDpCk || recDpCk) {
        if( !dsdpsettled ) { %>
            <label id="msg">Count how many places the decimal point needs to move to make the divisor an integer and click there</label>
<%      } else if( !qtdpsettled ) { %>
            <label id="msg">Click the place in the quotient directly above the dividend decimal point</label>
<%      } else { %>
            <label id="msg">Click where first quotient digit should be</label>
<%      }
    } else { %>
        <label id="msg">Click where first quotient digit should be</label>
<% } %>
</div>

<div class="d5">
<table>
<tr>    
    <td>
    <button type="reset" value="Reset" onclick="startDivAgain()" >Start again</button>
    </td>
    <td></td>
</tr>
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
</div>  
<div class="d3">
    <table>
    <tr><td><input type="checkbox" value="Show Borrows" name="showborrows" 
                   <%=isShowBrows%> onclick="zeroDivCounts()">
            <label>Show Borrows</label>
        </td>
    </tr>
    <tr>
        <td><input type="checkbox" value="Show Multiplication Carries" name="showmcarries" 
                   <%=isShowMcarries%> onclick="zeroDivCounts()">
            <label>Show Multiplication Carries</label>
        </td></tr>
    </table>
</div>

<div class="d4">  
<table>
    <tr><th colspan="1">Highest Difficulty Level</th></tr>
    <tr><td>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Immediate Feedback" 
            <%=isImmFeedBk%> onclick="zeroDivCounts()">
        <label>Immediate Feedback</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Estimation Required"
            <%=isEstRequired%> onclick="zeroDivCounts()">
        <label>Estimation Required</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Remainders" 
               id="Remainders"
            <%=isRemainders%> onclick="zeroDivCounts()"> 
        <label>Remainders</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Exact Decimals" 
            <%=isExDp%> onclick="zeroDivCounts()">
        <label>Exact Decimals</label>
    </td></tr>
    <tr><td>
        <input type="radio" name="difflvl" value="Recurring Decimals" 
            <%=isRecDp%> onclick="zeroDivCounts()">
        <label>Recurring Decimals</label>
    </td></tr>
</table>
</div>

              

<input type="hidden" id="strtTime" name="strtTimeP" value="<%=strtTime%>" class="shortbox">
<input type="hidden" id="quotDp" value="<%=expQuotDp%>" class="shortbox">
<input type="hidden" id="dvsrDp" value="1" class="shortbox">
<input type="hidden" id="dvdDp" value="<%=expDvdDp%>" class="shortbox"> 
<input type="hidden" id="dvs" name="decsettled" value="<%=dsdpsettled%>" class="shortbox">
<input type="hidden" id="dvd" name="decsettled" value="<%=dddpsettled%>" class="shortbox">
<input type="hidden" id="quo" name="decsettled" value="<%=qtdpsettled%>" class="shortbox">
<% 
for( int idx = 0; idx < quotDigs; idx++ ) {
    for( int jdx = 0; jdx < maxOps; jdx++ ) { 
        cid = "calcDig" + idx + "_" + jdx;
        String oid = "operand" + idx + "_" + jdx;
        if( cmdebug ) { %>
            <label><%=cid%></label>
        <% } %>
        <input type="<%=cmtype%>" id="<%=cid%>" value="<%=calcDig[idx][jdx]%>" class="shortbox">
        <% if( cmdebug ) { %>
            <label><%=oid%></label>
        <% } %>
        <input type="<%=cmtype%>" id="<%=oid%>" value="<%=calcOp[idx][jdx]%>" class="shortbox">
<%  }
    String bid = "bringdown" + idx; %>
    <% if( cmdebug ) { %>
        <label><%=bid%></label>
    <% } %>

     <input type="<%=cmtype%>" id="<%=bid%>" value="<%=calcBdDig[idx]%>" class="shortbox">
<% }
if( lastboxdebug ) { %>
    <label>bdx</label>
 <% } %>
<input type="<%=lbtype%>" id="bdx" value="<%=bdx%>">
<%    if( lastboxdebug ) { %>
    <label>lastbox</label>
 <% } %>
<input type="<%=lbtype%>" id="lastbox" value="<%=maxBx%>" class="shortbox">
<input type="hidden" id="linedUp" value="<%=isLinedUp%>" class="shortbox">
<input type="hidden" id="divisor" value="<%=divisor%>" >
<input type="hidden" id="quotDigs" value="<%=quotDigs%>" >
<input type="hidden" id="quotient" value="<%=quotient%>" >
<input type="hidden" id="nextQuotBox" >
<input type="hidden" id="noMorQuotDigs" value="false" >
<% if( cmdebug ) { %>
    <label>quotBoxIndex</label>
<% } %>
<input type="<%=cmtype%>" id="quotBoxIndex" value="<%=bdx%>">
<% if( cmdebug ) { %>
    <label>rowNo</label>
<% } %>
<input type="<%=cmtype%>" id="rowNo" value="0" >
<input type="hidden" id="dividend" value="<%=dividnd%>" >
<input type="hidden" id="currDividend" >
</td>
</tr>
</tbody>
</table>
</form>

</div>
</body>
</html>


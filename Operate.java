/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frieda;

/**
 *
 * @author frieda
 */
public class Operate {
    // this one not used? can delete? fixit
    /*
    public static int op( String operator, int MAX_DGTS, boolean decimalsCk,
            int operand1, int decPt1, int operand2, int decPt2, 
            long [] actualInt, String [] expl ) {
        int nDgts1 = operand1 > 0 ? 1 + (int)Math.log10(operand1) : 1;
        int nDgts2 = operand2 > 0 ? 1 + (int)Math.log10(operand2) : 1;
        int thisMuchBigger = nDgts1 - decPt1 - (nDgts2 - decPt2);
        int round1down = operand1;
        int round1up = operand1;
        int round2down = operand2;
        int round2up = operand2;
        int ten2pow = (int)Math.pow(10, nDgts1 - 1);
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
        int factor1 = 1;
        int factor2 = 1;
        int decPtAct = decPt1;
        if( decPt1 < decPt2 ) {
            factor1 = (int)Math.pow(10,decPt2-decPt1);
            decPtAct = decPt2; // for addition or subtraction
        } else if( decPt1 > decPt2 ) {
            factor2 = (int)Math.pow(10,decPt1-decPt2);
        }
        if( operator.compareTo("+") == 0 ) {   
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
                    ten2pow = 1;
                }
                round2up = ten2pow*((ten2pow+operand2)/ten2pow);
                round2down = ten2pow*(operand2/ten2pow);
            }
            ten2pow = factor1 > factor2? factor1 : factor2; //(int)Math.pow(10,decPtAct);
            actualInt[2] = (factor1*round1up + factor2*round2up);
            actualInt[1] = factor1*operand1 + factor2*operand2;
            actualInt[0] = (factor1*round1down + factor2*round2down);
            expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2down, decPt2 );
            expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2up, decPt2 );
        } else if(  operator.compareTo("-") == 0  ) {     
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
            if( operand1 >= operand2 && round2up > round1down ) {
                round2up = round1down;
            } 
            ten2pow = factor1 > factor2? factor1 : factor2;
            actualInt[2] = (factor1*round1up - factor2*round2down);
            actualInt[1] = factor1*operand1 - factor2*operand2;
            actualInt[0] = factor1*round1down - factor2*round2up;
            expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator +
                    " " + Format.getFormat( round2up, decPt2 );
            expl[2] =  Format.getFormat( round1up, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2down, decPt2 );
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
        } else if(  operator.compareTo("/") == 0  ) {
            if( decPt1 != decPt2 ) {
                decPtAct = MAX_DGTS + decPt1 - decPt2;
            } else {
                decPtAct = 0;
            }
            round2down = ten2pow;
            round2up = 10*ten2pow;
            if( decimalsCk && decPt1 != decPt2 ) {
                ten2pow = (int)Math.pow(10, MAX_DGTS);
            } else {
                ten2pow = 1;
            }
            if( round2down != 0 ) {
                actualInt[2] = ten2pow*operand1 / round2down;
            }
            if( operand2 != 0 ) { // else error or maxint fixit
                //System.out.println("ten2pow = " + ten2pow + " operand1 = " + operand1);
                actualInt[1] = (long)ten2pow*operand1;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = 10*actualInt[1];
                //System.out.println("actualInt[1] = " + actualInt[1]);
                //System.out.println("operand2 = " + operand2);
                actualInt[1] = actualInt[1]  / operand2;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = actualInt[1] + 5;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = actualInt[1]/10;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                //actualInt[1] = (10*ten2pow*operand1  / operand2 + 5)/10;
            }
            if( round2up != 0 ) {
                actualInt[0] = ten2pow*operand1 / round2up;
            }
            expl[0] = Format.getFormat( operand1, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2up, decPt2 );
            expl[2] =  Format.getFormat( operand1, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2down, decPt2 );
        }
        return decPtAct;
    }
*/
    // least significant digit not always correct fixit
    // 7.1 / 243.7 = .2913 fixit
    public static int op( String operator, int MAX_DGTS, boolean decimalsCk,
            long operand1, int decPt1, long operand2, int decPt2, 
            long [] actualInt, String [] expl ) {
        int nDgts1 = operand1 > 0 ? 1 + (int)Math.log10(operand1) : 1;
        int nDgts2 = operand2 > 0 ? 1 + (int)Math.log10(operand2) : 1;
        int thisMuchBigger = nDgts1 - decPt1 - (nDgts2 - decPt2);
        long round1down = operand1;
        long round1up = operand1;
        long round2down = operand2;
        long round2up = operand2;
        int ten2pow = (int)Math.pow(10, nDgts1 - 1);

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
        int factor1 = 1;
        int factor2 = 1;
        int decPtAct = decPt1;
        if( decPt1 < decPt2 ) {
            factor1 = (int)Math.pow(10,decPt2-decPt1);
            decPtAct = decPt2; // for addition or subtraction
        } else if( decPt1 > decPt2 ) {
            factor2 = (int)Math.pow(10,decPt1-decPt2);
        }
        if( operator.compareTo("+") == 0 ) {   
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
                    ten2pow = 1;
                }
                round2up = ten2pow*((ten2pow+operand2)/ten2pow);
                round2down = ten2pow*(operand2/ten2pow);
            }
            ten2pow = factor1 > factor2? factor1 : factor2; //(int)Math.pow(10,decPtAct);
            actualInt[2] = (factor1*round1up + factor2*round2up);
            actualInt[1] = factor1*operand1 + factor2*operand2;
            actualInt[0] = (factor1*round1down + factor2*round2down);
            expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2down, decPt2 );
            expl[2] = Format.getFormat( round1up, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2up, decPt2 );
        } else if(  operator.compareTo("-") == 0  ) {   
            ten2pow = (int)Math.pow(10, nDgts1 - 2); // debug
            ten2pow = (int)Math.pow(10, nDgts2 - 2); // debug
            if( thisMuchBigger > 0 ) {
                ten2pow = (int)Math.pow(10, nDgts1 - thisMuchBigger - 1);
                //ten2pow = (int)Math.pow(10, nDgts1 - thisMuchBigger - 2); // fixit
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
            if( operand1*Math.pow(10,-decPt1) >= operand2*Math.pow(10, -decPt2) && 
                    round2up*Math.pow(10, -decPt2) > round1down*Math.pow(10, -decPt1) ) {
                round2up = round1down;
            } 
            ten2pow = factor1 > factor2? factor1 : factor2;
            actualInt[2] = (factor1*round1up - factor2*round2down);
            actualInt[1] = factor1*operand1 - factor2*operand2;
            actualInt[0] = factor1*round1down - factor2*round2up;
            expl[0] = Format.getFormat( round1down, decPt1 ) + " " + operator +
                    " " + Format.getFormat( round2up, decPt2 );
            expl[2] =  Format.getFormat( round1up, decPt1 ) + " " + operator + 
                    " " + Format.getFormat( round2down, decPt2 );
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
            /* 2 / .1888 = 11 fixit */
        } else if(  operator.compareTo("/") == 0  ) {
            //if( decPt1 != decPt2 ) {
            //    decPtAct = MAX_DGTS + decPt1;
            //} else {

            //}
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
            if( operand2 != 0 ) { // else error or maxint fixit
                //System.out.println("ten2pow = " + ten2pow + " operand1 = " + operand1);
                actualInt[1] = (long)ten2pow*operand1;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = 10*actualInt[1];
                //System.out.println("actualInt[1] = " + actualInt[1]);
                //System.out.println("operand2 = " + operand2);
                actualInt[1] = actualInt[1]  / operand2;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = actualInt[1] + 5;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                actualInt[1] = actualInt[1]/10;
                //System.out.println("actualInt[1] = " + actualInt[1]);
                //actualInt[1] = (10*ten2pow*operand1  / operand2 + 5)/10;
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
}

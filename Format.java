/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frieda;

import javax.ejb.Stateless;

/**
 *
 * @author frieda
 */

@Stateless
public class Format {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    public static int getDigs( int num ) {
        int absNum = Math.abs( num );
        int digs = absNum > 0? 1 + (int)Math.log10(absNum) : 1;
        return digs;
    }
    public static String getFormat( int num, int dp ) {
        StringBuffer actual = new StringBuffer();
        int absActual = num;
        if( num < 0 ) {
            absActual = -num;
            actual.append("-");
        }
        int digs = absActual > 0? 1 + (int)Math.log10(absActual) : 1;
        int tmp3 = absActual;
        int ten2pow = (int)Math.pow(10, digs-1);
        if( dp >= digs ) {
            actual.append("0.");
        }
        int tmp4 = dp - 1;
        while( tmp4 >= digs ) {
            actual.append("0");
            tmp4 = tmp4 - 1;
        }
        for(  int j = digs - 1; j >= 0; --j ) {
            int actDig = tmp3/ten2pow;
            actual.append(String.valueOf(actDig));
            if( j == dp && j > 0 ) {
                actual.append(".");
            } else if( ( j - dp ) % 3 == 0 && j > dp ) {
                actual.append(",");
            }
            tmp3 = tmp3 - ten2pow*actDig;
            ten2pow /= 10;
            //System.out.println("j = " + j + " actDig = " + actDig + " tmp3 = " + tmp3);
        }
        return new String( actual );
    }
    public static String getFormat( int num, int dp, int digs ) {
        StringBuffer actual = new StringBuffer();
        int absActual = num;
        if( num < 0 ) {
            absActual = -num;
            actual.append("-");
        }
        int tmp3 = absActual;
        int ten2pow = (int)Math.pow(10, digs-1);
        if( dp >= digs ) {
            actual.append("0.");
        }
        int tmp4 = dp - 1;
        while( tmp4 >= digs ) {
            actual.append("0");
            tmp4 = tmp4 - 1;
        }
        for(  int j = digs - 1; j >= 0; --j ) {
            int actDig = tmp3/ten2pow;
            actual.append(String.valueOf(actDig));
            if( j == dp && j > 0 ) {
                actual.append(".");
            } else if( ( j - dp ) % 3 == 0 && j > dp ) {
                actual.append(",");
            }
            tmp3 = tmp3 - ten2pow*actDig;
            ten2pow /= 10;
            //System.out.println("j = " + j + " actDig = " + actDig + " tmp3 = " + tmp3);
        }
        return new String( actual );
    }

    public static int getDigs( long num ) {
        long absNum = Math.abs( num );
        int digs = absNum > 0? 1 + (int)Math.log10(absNum) : 1;
        return digs;
    }
    public static String getFormat( long num, int dp ) {
        StringBuffer actual = new StringBuffer();
        long absActual = num;
        if( num < 0 ) {
            absActual = -num;
            actual.append("-");
        }
        int digs = absActual > 0? 1 + (int)Math.log10(absActual) : 1;
        long tmp3 = absActual;
        int ten2pow = (int)Math.pow(10, digs-1);
        if( dp >= digs ) {
            actual.append("0.");
        }
        int tmp4 = dp - 1;
        while( tmp4 >= digs ) {
            actual.append("0");
            tmp4 = tmp4 - 1;
        }
        for(  int j = digs - 1; j >= 0; --j ) {
            int actDig = (int)(tmp3/ten2pow);
            actual.append(String.valueOf(actDig));
            if( j == dp && j > 0 ) {
                actual.append(".");
            } else if( ( j - dp ) % 3 == 0 && j > dp ) {
                actual.append(",");
            }
            tmp3 = tmp3 - ten2pow*actDig;
            ten2pow /= 10;
            //System.out.println("j = " + j + " actDig = " + actDig + " tmp3 = " + tmp3);
        }
        return new String( actual );
    }
    public static String getFormat( long num, int dp, int digs ) {
        StringBuffer actual = new StringBuffer();
        long absActual = num;
        if( num < 0 ) {
            absActual = -num;
            actual.append("-");
        }
        long tmp3 = absActual;
        int ten2pow = (int)Math.pow(10, digs-1);
        if( dp >= digs ) {
            actual.append("0.");
        }
        int tmp4 = dp - 1;
        while( tmp4 >= digs ) {
            actual.append("0");
            tmp4 = tmp4 - 1;
        }
        for(  int j = digs - 1; j >= 0; --j ) {
            int actDig = (int)(tmp3/ten2pow);
            actual.append(String.valueOf(actDig));
            if( j == dp && j > 0 ) {
                actual.append(".");
            } else if( ( j - dp ) % 3 == 0 && j > dp ) {
                actual.append(",");
            }
            tmp3 = tmp3 - ten2pow*actDig;
            ten2pow /= 10;
            //System.out.println("j = " + j + " actDig = " + actDig + " tmp3 = " + tmp3);
        }
        return new String( actual );
    }
}

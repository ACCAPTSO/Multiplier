/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author irene
 */

package process;
// import javax.servlet.http.*;
// import java.io.*;
// import java.util.*;
public class ProcessAns {
    //public static void checkrow( HttpServletRequest req, Vector<Boxentry> c,
    //        Vector<Boxentry> firstOp, Vector<Boxentry> secndOp, int whatcarry ){
    //    HttpSession ses = req.getSession();
    //    int sz = c.size();
    //    String n;
    //    Boxentry b;
    //    int d;
    //    int op1;
    //    int op2;
    //    int cin;
    //    for( int idx = 0; idx < sz; idx++ ){
            //b = new Boxentry(c.elementAt(idx));
            //n = b.getNme();
            //b.setParm(ses.getAttribute(n));
            // this should have returned true or false and the rest should
            // only execute if there is a new parameter
            //b.setPrm(req.getParameter(n));
            //d = b.getInt();
            // was o11 and o12, hardcoding constants for now
            //if( idx == 0 ) {
            //    cin = 0;
            //} else {
            //    cin = (c.elementAt(idx-1)).getInt();
            //}
            //op1 = firstOp.elementAt(whatcarry).getInt();
            //op2 = secndOp.elementAt(idx).getInt();
            //b.setClr(checkCarry( d, op1, op2, cin ));
            //System.out.println("From checkrow setting attribute " + n + " to " + d );
            //ses.setAttribute( n, d );
        //}
    //}
    public static String param2string( String parm, String intable ){
        if( parm != null ) {
            if( !parm.matches("[0-9]") ) {
                return parm;
            }
        }
        return intable;
    }
    public static String obj2string( Object cobj ){
        if( cobj != null ) {
            String cstr = cobj.toString();
            if( cstr.matches("[0-9]") ) {
                return cstr;
            }
        }
        return null;
    }
    public static int obj2int( Object cobj ){
        int c1 = 0;
        if( cobj != null ) {
            String cstr = cobj.toString();
            if( cstr.matches("-?\\d+(\\.\\d+)?") ) {
                Integer CInt = new Integer(cstr);
                c1 = CInt;
            }
        }
        return c1;
    }
    public static int string2int( String cstr ){
        int c1 = 0;
        if( cstr.matches("-?\\d+(\\.\\d+)?") ) {
            Integer CInt = new Integer(cstr);
            c1 = CInt;
        }
        return c1;
    }
    public static String checkLast( int p1, int op1, int op2, int pc ) {
        String tclr = "blue";
        int md;
        md = (op1*op2+pc)/10;
        if( p1 != (op1*op2+pc)/10 ) {
             tclr = "red";
        } else {
            tclr = "black";
        } 
        //System.out.println("p1 = " + p1 + " op1 = " + op1 + " op2 = " + op2 + " tclr = " + tclr + " p1shouldbe " + md);
        return tclr;
    }
    public static String checkMult( int p1, int op1, int op2, int pc ) {
        String tclr = "fuschia";
        int md;
        md = (op1*op2+pc)%10;
        if( p1 != (op1*op2+pc)%10 ) {
            tclr = "red";
        } else {
            tclr = "black";
        }
        //System.out.println("checkMult p1 = " + p1 + " op1 = " + op1 + " op2 = " + op2 + " cin = " + pc + " tclr = " + tclr + " p1shouldbe " + md);
        return tclr;
    }
    public static String checkCarry( int c1, int op1, int op2, int pc ) {
        String tclr = "pink";
        int md;
        md = (op1*op2+pc)/10;
        if(c1 != ( op1*op2 + pc)/10) {
            tclr = "red";
        } else {
            tclr = "black";
        }
        //System.out.println("checkCarry c1 = " + c1 + " op1 = " + op1 + " op2 = " + op2 + " cin " + pc + " tclr = " + tclr + " c1 s.b. " + md);
        return tclr;
    }
    // these two methods assume a 2 digit second operand - will need to be
    // modified if number of digits is randomized
    public static String checkAddCarry( int c1, int op1, int op2, int op3, int pc ) {
        String tclr = "pink";
        int md;
        md = (op1+op2+op3+pc)/10;
        if(c1 == md ){
            tclr = "black";
        } else {           
            tclr = "red";
        }
        //System.out.println("checkAddCarry c1 = " + c1 + " op1 = " + op1 + " op2 = " + op2 + " op3 = " + op3 + " cin " + pc + " tclr = " + tclr + " c1 s.b. " + md);
        return tclr;
    }
    public static String checkAdd( int p1, int op1, int op2, int op3, int pc ) {
        String tclr = "pink";
        int md;
        md = (op1+op2+op3+pc)%10;
        if(p1 == md ){
            tclr = "black";
        } else {           
            tclr = "red";
        }
        //System.out.println("p1 = " + p1 + " op1 = " + op1 + " op2 = " + op2 + " op3 = " + op3 +
        //        " cin " + pc + " tclr = " + tclr + " p1 s.b. " + md);
        return tclr;
    }
}


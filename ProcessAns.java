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
// trying to access request from here didn't work
public class ProcessAns {
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
        if( cstr != null ) {
            if( cstr.matches("-?\\d+(\\.\\d+)?") ) {
                Integer CInt = new Integer(cstr);
                c1 = CInt;
                System.out.println("I'm printing from an included package carry is " + c1 );
            }
        }
        return c1;
    }
    public static String checkCarry( int c1, int op1, int op2, int pc ) {
        String tclr = "pink";
        if(c1 != ( op1*op2 + pc)/10) {
            tclr = "red";
        } else {
            tclr = "black";
        }  
        return tclr;
    }
}


import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.net.*;

public class Multiplier extends HttpServlet{
   static final long serialVersionUID = 72L;
  
  public void doGet(HttpServletRequest request, 
                    HttpServletResponse response)
                           throws ServletException, IOException{
    
    //Get the session associated with this request,
    HttpSession session = request.getSession(true);

    response.setContentType("text/html");
    
    PrintWriter out = response.getWriter();
    
    out.println("<!DOCTYPE HTML PUBLIC \"-//W3C/DTD HTML 4.01 Transitional//EN\" \"http://w3.org/TR/html4/loose.dtd\">");

    //Create HTML page header
    out.println("<html lang='EN'>");
    out.println("<head>");
    out.println("<title>MULTIPLIER</title>");
    String cssurl = request.getContextPath() + "/css/Multiplier.css";
    out.println(
      "<link rel=\"stylesheet\" href=" + cssurl + " type=\"text/css\">");
    out.println("</head>");

    out.println("<body>");
    out.println(
      "<form method='get' action='localhost:8080/Multiplier'>");
    // this table has 3 digit first operand and 2 digit second operand - any
    // way to make it variable sized? -probably if this is converted to java
    // servlet or jsp

    //is there any way to select boxes for entry in a particular order, not top
    //down? to be overridden by user if he/she carries in his/her head

    out.println("<table class='c1'>");
    out.println("<tbody>");

    //colspan="10" is worst case for 3 digit x 2 digit with carries
    out.println("<tr>");
    out.println("<th id='th-id1' colspan='10'>Multiplication Problem</th>");
    out.println("</tr>");

    out.println("<tr class='r1'>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("<td><input type='text' name='cr4' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td><input type='text' name='cr3' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("</tr>");

    out.println("<tr class='r1'>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("<td><input type='text' name='cr2' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td><input type='text' name='cr1' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("</tr>");

    out.println("<tr>");
    // the constants 5, 4, and 6 need to be changed to randomly generated
    // variables between 0 and 9
    out.println("<td class='s2'></td><td class='n1'></td>");
    out.println("<td class='s2'></td><td class='n1'></td>");
    out.println("<td class='s2'></td><td class='n1'>5</td>");
    out.println("<td class='s2'></td><td class='n1'>4</td>");
    out.println("<td class='s2'></td><td class='n1'>6</td>");
    out.println("</tr>");

    out.println("<tr>");
    // the constants 2 and 3 need to be changed to randomly generated
    // variables between 0 and 9 
    out.println("<td class='s2'></td><td class='n1'></td>");
    out.println("<td class='s2'></td><td class='n1'></td>");
    out.println("<td class='s2'></td><td class='n1'></td>");
    out.println("<td class='s2'></td><td class='n1'>2</td>");
    out.println("<td class='s2'></td><td class='n1'>3</td>");
    out.println("</tr>");

    out.println("<tr><th id='th-id1' colspan='10'></th></tr>");

    out.println("<tr class='r1'>");
    out.println("<td><input type='text' name='cr8' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td><input type='text' name='cr7' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td><input type='text' name='cr6' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td><input type='text' name='cr5' class='c2'></td>");
    out.println("<td class='b1'></td>");
    out.println("<td class='s2'></td><td class='b1'></td>");
    out.println("</tr>");
    out.println("<tr>");
    out.println("<td class='s2'></td><td class='n1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an4' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an3' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an2' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an1' class='a1'></td>");
    out.println("</tr>");

    out.println("<tr>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an9' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an8' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an7' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an6' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an5' class='a1'></td>");
    out.println("</tr>");

    out.println("<tr><th id='th-id1' colspan='10'></th></tr>");
    out.println("<tr>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an14' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an13' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an12' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an11' class='a1'></td>");
    out.println("<td class='s2'></td>");
    out.println("<td><input type='text' name='an10' class='a1'></td>");
    out.println("</tr>");
    out.println("</tbody>");
    out.println("</table>");
    out.println("</form>");
    out.println("</html>");
  }// end doGet()
}//end class Multiplier
    
//    //Create a hit counter for this servlet 
//    Integer cnt = (Integer)session.getAttribute("counter");
//    if(cnt == null) cnt = new Integer(1);
//    else cnt = new Integer(cnt.intValue() + 1);
//    session.setAttribute("counter",cnt);
//    
//    //Add a new Date object each time the servlet i called
//    Date theDate = new Date();
//    long millis = theDate.getTime();
//    String strMillis = "" + millis;
//    session.setAttribute(strMillis,theDate);
//    
//    //When the hit counter is 1, instantiate a new object of
//    // type MyClass and put it in the session. Pass
//    // a reference to the output stream to the constructor.
//    //Remove the object from the session when the value
//    // of the hit counter is 4.
//    if(cnt.intValue() == 1) 
//               session.setAttribute("MyClassObj", new MyClass(out));
//    if(cnt.intValue() == 4) session.removeAttribute("MyClassObj");
//
//    //Display information about the session.
//    out.println("<p>Session Characteristics:<br/>"); 
//    out.println("New Session: " + session.isNew()+ "<br/>");
//    out.println("Session ID: " + session.getId()+ "<br/>");
////    out.println("Session Context: " 
////                        + session.getSessionContext()+ "<br/>");
//    out.println("Creation Time: " 
//               + new Date(session.getCreationTime()) + "<br/>");
//    out.println("Last Accessed: " 
//            + new Date(session.getLastAccessedTime()) + "</p>");
//
//    //Display information about all of the objects currently in
//    // the session.  Note that the session now contains a
//    // PrintWriter object that was not in the session in the
//    // original version of the servlet named Java4580a.
//    out.println("<p>Session Data:<br/>");
////    String[] names = session.getAttributeNames();
//    for( Enumeration<String> e = session.getAttributeNames(),
//                             f = session.getAttributeNames();
//                             e.hasMoreElements(); ) {
////int i = 0; i < names.length; i++){
//      out.println(e.nextElement() + ": " 
//                        + session.getAttribute(f.nextElement()) + "<br/>");
//    }//end for loop
//
//    //Finish off the HTML page
//    out.println("</p></body></html>");
//  }//end doGet()
//  //==========================================================//
//  
//  //This is an inner class. In the original version, this
//  class MyClass implements HttpSessionBindingListener,
//                                                   Serializable{
//    static final long serialVersionUID = 89L;
//    PrintWriter localOut;//local copy of output stream to client
//    
//    public MyClass(PrintWriter out){//constructor
//      //Save a local copy of the output stream to the client.
//      localOut = out;
//    }//end constructor
//
//    public String toString(){
//      return "This is a MyClass object";
//    }//end toString()
//    
//    //This method is called when the object is put into
//    // the session.
//    public void valueBound(HttpSessionBindingEvent e){
//      localOut.println("<p>Event<br/>");
//      localOut.println("In valueBound method<br/>");
//      //Returns the name of the object as identified when
//      // put into the session
//      localOut.println("Name = " +e.getName() + "</p>");
//    }//end valueBound()
//
//    //This method is called when the object is removed
//    // from the session.
//    public void valueUnbound(HttpSessionBindingEvent e){
//      localOut.println("<p>Event<br/>");
//      localOut.println("In valueUnbound method<br/>");
//      localOut.println("Name = " +e.getName() + "</p>");
//    }//end valueUnbound()
//  }//end inner class named MyClass 
  


//<!--
//this is a comment -the // is for javascript which i don't use anyway
////-->
//<!--
//this entire page may be changed to a java servlet or .jsp at a later date
////-->
//
//<!-- Document Type Definition -don't muck with it //-->
//<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//
//<html lang="EN">
//
//<!-- This is the HEAD section //-->
//<head>
//<meta http-equiv="Content-type" content="test/html;charset=utf-8">
//<title>MULTIPLIER</title>
//
//<!-- the following tells where to get style information to specify how to
//     format a table, a body a header etc. and define a class or id //-->
//<link rel="stylesheet" href="Multiplier.css" type="text/css">
//
//</head>
//
//<!-- This is what actually gets displayed on the page //-->
//<body>
//
//<!-- multi-checker.jsp (or  should it be a java class?) remains to be written
//and is what will take the user's input and display it red if incorrect
////-->
//<!--
//<form method="get" action="mult-checker.jsp">
////-->
//
//<!--
//use this? instead if you decide to use multi-checker.class instead if using
//tomCat or some other local web server
//<form method="get" action="http://machineName:portname/multi-checker">
////-->
//use this? instead if you decide to use multi-checker.class instead if using
//just a browser and local files
//
//</body>
//</html>
//

<%-- 
    Document   : Multiplier
    Created on : Oct 15, 2014, 7:22:00 AM
    Author     : irene
--%>

<%@page import="process.*,javax.servlet.http.*, java.io.*,java.util.*" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--
this is a comment -the // is for javascript which i don't use anyway
//-->
<!--
this entire page may be changed to a java servlet or .jsp at a later date
//-->

<!-- Document Type Definition -don't muck with it //-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="EN">
    
<!-- This is the HEAD section //-->
<head>
<meta http-equiv="Content-type" content="test/html;charset=utf-8">
<title>MULTIPLIER</title>

<!-- the following tells where to get style information to specify how to
     format a table, a body a header etc. and define a class or id //-->
<link rel="stylesheet" href="Multiplier.css" type="text/css">
<script type="text/javascript">
<!-- snippet code goes here -->
<!-- code to set the default input focus -->
<!-- not working -see if you can get help from someone who knows javascript -->
<!-- 
function setFocus() {

document.getElementById('F1:A1').focus();

 document.getElementById('F1').elements[11].select();
 document.getElementById('F1').elements[11].focus(); 

//-->
</script>
</head>
<!-- need to think through how to make it expandable before I put too much
    detail in -->
<!-- This is what actually gets displayed on the page //-->
<body onload="setfocus();">

<!-- multi-checker.jsp (or  should it be a java class?) remains to be written
and is what will take the user's input and display it red if incorrect
//-->
<%
    String c1clr = "lime";
    String c2clr = "lime";
    String c3clr = "lime";
    String c4clr = "lime";
    String c1str = "";
    String c2str = "";
    String c3str = "";
    String c4str = "";
    String tmp = "";
    int o23 = 1;
    int o22 = 2;
    int o21 = 3;
    int o12 = 4;
    int o11 = 5;
    int cr1 = 6;
    int cr2 = 5;
    int cr3 = 4;
    int cr4 = 3;
    // need to check something besides session.isNew, want to generate problem
    // after problem, clear answers session.isNew || what?
    if( session.isNew() ) {
        // Math.random() generates x, 0<=x<1
        o23 = (new Double(1+9*Math.random())).intValue();      
        o22 = (new Double(10*Math.random())).intValue();
        o21 = (new Double(10*Math.random())).intValue();
        o12 = (new Double(1+9*Math.random())).intValue();
        o11 = (new Double(10*Math.random())).intValue();
        session.setAttribute("o23", o23);
        session.setAttribute("o22", o22);
        session.setAttribute("o21", o21);
        session.setAttribute("o12", o12);
        session.setAttribute("o11", o11);
    } else {
    
        // these are previously generated and saved in the session
        o23 = (new Integer(session.getAttribute("o23").toString())).intValue();
        o22 = (new Integer(session.getAttribute("o22").toString())).intValue();
        o21 = (new Integer(session.getAttribute("o21").toString())).intValue();
        o12 = (new Integer(session.getAttribute("o12").toString())).intValue();
        o11 = (new Integer(session.getAttribute("o11").toString())).intValue();
    }
              
    // needs to be a separate method pass request, session, "cr1", clclr
    // things don't seem to be set and got right when you pass request
    // and session

    // is this object oriented? if you can't pass session and request
    // to another class it may well be the best you can do
    if( (tmp = ProcessAns.obj2string(session.getAttribute("cr1"))) != null )
        c1str = tmp;
    if((tmp = request.getParameter("cr1")) != null)   
        c1str = tmp;                 
    cr1= ProcessAns.string2int( c1str );
    // set the color red if it's incorrect
    c1clr = ProcessAns.checkCarry( cr1, o11, o21, 0 );
    session.setAttribute("cr1", cr1);
       
    if( (tmp = ProcessAns.obj2string(session.getAttribute("cr2"))) != null )
        c2str = tmp;
    if((tmp = request.getParameter("cr2")) != null)  
        c2str = tmp;
    cr2= ProcessAns.string2int( c2str );
    c2clr = ProcessAns.checkCarry( cr2, o11, o22, cr1 );
    session.setAttribute("cr2", cr2);
       
    if( (tmp = ProcessAns.obj2string(session.getAttribute("cr3"))) != null )
        c3str = tmp;
    if((tmp = request.getParameter("cr3")) != null)   
        c3str = tmp;
    cr3 = ProcessAns.string2int( c3str );
    c3clr = ProcessAns.checkCarry( cr3, o12, o21, 0 );
    session.setAttribute("cr3", cr3);
        
    if( (tmp = ProcessAns.obj2string(session.getAttribute("cr4"))) != null )
        c4str = tmp;
    if((tmp = request.getParameter("cr4")) != null)   
        c4str = tmp;
    cr4 = ProcessAns.string2int( c4str );
    c4clr = ProcessAns.checkCarry( cr4, o12, o22, cr3 );
    session.setAttribute("cr4", cr4);
        
        // out.println("c4str, c3str, c2str, c1str = " + c4str + ", " + c3str + ", " + c2str + ", " + c1str + "<br>" );
        // need another routine for this
    //    c5str = request.getParameter("cr5");
    //    c5clr = ProcessAns.checkCarry( c5str, session, "cr5", o12, o22 );
      
    //out.println("session ID is" + session.getId() + "<br>" );
%>
<form id="th-id2" method="get" action="Multiplier.jsp">

<table class="c1">
<tbody>

<!-- colspan="10" is worst case for 3 digit x 2 digit with carries //-->
<tr><th id="F1" colspan="10">Multiplication Problem</th></tr>
<tr class="r1">
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td><input type="text" name="cr4" class="c2" style="color:<%=c4clr%>" value="<%=c4str%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="cr3" class="c2" style="color:<%=c3clr%>" value="<%=c3str%>"></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>
<tr class="r1">
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td><input type="text" name="cr2" class="c2" style="color:<%=c2clr%>" value="<%=c2str%>"></td>
    <td class="b1"></td>
    <td><input type="text" name="cr1" class="c2" style="color:<%=c1clr%>" value="<%=c1str%>" ></td>
    <td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>
<tr>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"><%=o23%></td>
    <td class="s2"></td><td class="n1"><%=o22%></td>
    <td class="s2"></td><td class="n1"><%=o21%></td>
</tr>
<tr>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td><td class="n1"><%=o12%></td>
    <td class="s2"></td><td class="n1"><%=o11%></td>
</tr>
<tr><th id="th-id1" colspan="10"></th></tr>
<tr class="r1">
    <td><input type="text" name="cr7" class="c2"></td><td class="b1"></td>
    <td><input type="text" name="cr6" class="c2"></td><td class="b1"></td>
    <td><input type="text" name="cr5" class="c2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
    <td class="s2"></td><td class="b1"></td>
</tr>
<tr>
    <td class="s2"></td><td class="n1"></td>
    <td class="s2"></td>
    <td><input type="text" name="an4" class="a1"></td>
    <td class="s2"></td>
    <td><input type="text" name="an3" class="a1"></td>
    <td class="s2"></td>
    <td><input type="text" name="an2" class="a1"></td>
    <td class="s2"></td><td>
    <input type="text" id="A1" name="an1" class="a1"></td>
        
</tr>
<tr>
    <td class="s2"></td><td><input type="text" name="an9" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an8" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an7" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an6" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an5" class="a1"></td>
</tr>
<tr><th colspan="10"></th></tr>
<tr>
    <td class="s2"></td><td><input type="text" name="an14" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an13" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an12" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an11" class="a1"></td>
    <td class="s2"></td><td><input type="text" name="an10" class="a1"></td>
</tr>
</tbody>
</table>
<input type="submit" value="enter">
</form>

<input type="button" value="start again">
</body>
</html>


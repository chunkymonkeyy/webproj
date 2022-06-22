<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData(); // all fields now set to ""
    String strEmail = request.getParameter("email");
    String strPass = request.getParameter("password"); //parsing email & password

    if (strEmail == null || strPass == null) {
        sd.errorMsg = "Please try again. Input parameter were not supplied."; //email or password must be supplied
    } 
    else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) { 
            System.out.println("*** Ready to call DbMods.newFind");
            sd = DbMods.newFind(dbc, strEmail, strPass);  //No user exists. Please try again - your email or password were not correct
        }
        dbc.close(); 
    }    
    
    session.setAttribute("loggedOnUser", sd); // write object to JSP session object 

    Gson gson = new Gson();
    out.print(gson.toJson(sd));

%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData(); // all fields now set to ""
    sd.errorMsg = "User is now logged off"; 
    
    session.invalidate();

    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>

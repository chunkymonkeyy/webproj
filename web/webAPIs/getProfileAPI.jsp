<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.StringData" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // must pass in the same name you used when you set the object into the session from some other Web API JSP page.
    // Must type cast the plain old object that is extracted from the session.
    StringData sd = (StringData) session.getAttribute("loggedOnUser");

//    if(sd.webUserId == ""){
//        sd = new StringData();
//        sd.errorMsg = "No user logged on";
//    }
    if(sd == null){
        sd = new StringData();
        sd.errorMsg = "No user logged on";
    }
//    else {
//        sd.errorMsg = "Above data was read from the session";
//    }
    
    Gson gson = new Gson();
    out.print(gson.toJson(sd));

%>
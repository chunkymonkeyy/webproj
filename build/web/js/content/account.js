var account = {};

(function () {//IIFE immediately invoking function execution
account.logon = function () {
    //build user interface (a div with labels, text boxes, and logon button which makes an ajax call
    //    var passwordInput = document.createElement("input");
//    passwordInput.setAttribute("type", "password"); 
    var loginDiv = document.createElement("div");
   // loginDiv.classList.add("login");
    loginDiv.classList.add("account");
    
    var userIdSpan = document.createElement('span');
    userIdSpan.innerHTML = "Email Address ";
    loginDiv.appendChild(userIdSpan);

    var userIdInput = document.createElement("input");
    userIdInput.setAttribute("type", "text"); // so it shows dots not characters
    loginDiv.appendChild(userIdInput);

    var userPwSpan = document.createElement('span');
    userPwSpan.innerHTML = "Password ";
    loginDiv.appendChild(userPwSpan);

    var userPwInput = document.createElement("input");
    userPwInput.setAttribute("type", "password"); // so it shows dots not characters
    loginDiv.appendChild(userPwInput);
    //Password 

    var submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    loginDiv.appendChild(submitButton);

    var msgDiv = document.createElement("div");
    loginDiv.appendChild(msgDiv);

    submitButton.onclick = function () {

        // You have to encodeURI user input before putting into a URL for an AJAX call.
        // Otherwise, your URL may be refused (for security reasons) by the web server.
        var url = "webAPIs/logonAPI.jsp?email=" + escape(userIdInput.value) + "&password=" + escape(userPwInput.value); //escape

        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, processLogon, msgDiv);

        function processLogon(obj) {
            //var msg = "";
            console.log("Successfully called the logonAPI. Next line shows the returned object.");
            console.log(obj);
            msgDiv.innerHTML = buildProfile(obj);
        }
    };  // onclick function

    return loginDiv;

};

function buildProfile(obj) {
    var msg = "";
  if (obj.errorMsg.length > 0) {
       msg += "<strong>Error: " + obj.errorMsg + "</strong>";
    } else {
        msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
        msg += "<br/> Birthday: " + obj.birthday;
        msg += "<br/> MembershipFee: " + obj.membershipFee;
        msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
        msg += "<p> <img src ='" + obj.image + "'></p>";
        
    }
    return msg;
};

account.getProfile = function () {
    //create a div, invoke getProfileAPI, fill div with error msg or web user info, return the div
    var profileDiv = document.createElement("div");
    profileDiv.classList.add("account");
    
    var msgDiv = document.createElement("div");
    profileDiv.appendChild(msgDiv);

    ajax("webAPIs/getProfileAPI.jsp", processGetProfile, msgDiv);

    function processGetProfile(obj) {
        
        console.log("Successfully called the getProfileAPI. Next line shows the returned object.");
        console.log(obj);
        msgDiv.innerHTML = buildProfile(obj);

    }
    
    return profileDiv;
};
account.logoff = function () {
    //create a div, invoke logoffAPI
    var logoffDiv = document.createElement("div");
    logoffDiv.classList.add("account");
    
    var msgDiv = document.createElement("div");
    logoffDiv.appendChild(msgDiv);
    
    ajax("webAPIs/logoffAPI.jsp", processLogoff, msgDiv);
    
    function processLogoff(obj) {
        
        console.log("Successfully called the logoffAPI. Next line shows the returned object.");
        console.log(obj);
        msgDiv.innerHTML = buildProfile(obj);

    }

    return logoffDiv;
};
}()); //invoke IIFE


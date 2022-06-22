function liveUserContent() {

    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    ajax("webAPIs/listUsersAPI.jsp", success, contentDOM);
    function success(obj) {

        console.log("listUsersAPI.jsp AJAX successfully returned the following data");
        console.log(obj);

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: contentDOM
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Web User List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = "icons/insert.png";
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/userInsert";
        };


        /* Property names in Web APIs for web_user data: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
        // Add the properties in the order you want them to appear in the HTML table.  
        var userList = [];
        for (var i = 0; i < obj.webUserList.length; i++) {
            userList[i] = {}; // add new empty object to array

            userList[i].User_Id = SortableTableUtils.makeNumber(obj.webUserList[i].webUserId, false);

            userList[i].User_Credentials = SortableTableUtils.makeText(obj.webUserList[i].userEmail +
                    "<span style='font-size:0.7rem'><br/>Test Logon with this PW:<br/></span>" +
                    obj.webUserList[i].userPassword);
            userList[i].User_Credentials.style.textAlign = "center";
            //userList[i].User_Credentials.style.lineHeight = "1.25rem";

            // last parameter true means add shadow to the image
            userList[i]._Image = SortableTableUtils.makeImage(obj.webUserList[i].image, "5rem");
            var img = userList[i]._Image.getElementsByTagName("img")[0];
            //img.classList.add("shadow");

            userList[i].Birthday = SortableTableUtils.makeDate(obj.webUserList[i].birthday);
            userList[i].Membership_Fee = SortableTableUtils.makeNumber(obj.webUserList[i].membershipFee, true);
            userList[i].Role = SortableTableUtils.makeText(obj.webUserList[i].userRoleId + "&nbsp;" +
                    obj.webUserList[i].userRoleType);

            userList[i].Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />",
                    '#/userUpdate/' + obj.webUserList[i].webUserId
                    );//innerHTML of link  // href of link

            userList[i].Delete = SortableTableUtils.makeImage("icons/delete.png", '1rem');

            // freeze the webUserId
            const userId = obj.webUserList[i].webUserId;
            userList[i].Delete.onclick = function () {
                //deleteUser(userId,this);
                var messageDOM = document.createElement("div");
                messageDOM.innerHTML = ""; // blank out any old message
//                var idToDelete = document.getElementById("inputId").value;

                ajax("webAPIs/deleteUserAPI.jsp?deleteId="+ userId, APISuccess, messageDOM);
                // parameter properties needed for ajax call: url, successFn, and errorId
//                ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + idToDelete, APISuccess, messageDOM); //invoke deleteUserAPI
                function APISuccess(obj) { // function is local to callDeleteAPI
                    console.log("successful ajax call");

                    // Empty string means sucessful delete. The HTML coder gets to decide how to 
                    // deliver the good news.
                    if (obj.errorMsg.length === 0) {
//                        var msg = "Record " + idToDelete + " successfully deleted. ";
                        var msg = "Record" + userId + "successfully deleted. ";
                        console.log(msg);
                        messageDOM.innerHTML = msg;
                    } else {
                        console.log("Delete Web API got this error: " + obj.errorMsg);
                        messageDOM.innerHTML = "Web API successfully called, but " +
                                "got this error from the Web API: <br/><br/>" + obj.errorMsg;
                    }
                }

            };//delete.onclick

            // Remove this once you are done debugging...
            userList[i].Error_Msg = SortableTableUtils.makeText(obj.webUserList[i].errorMsg);

        }

        console.log("heading in liveUserContent on next line");
        console.log(heading);

        //function MakeClickSortTable(objList, sortOrderPropName, sortIcon) {
        var webUserTable = MakeClickSortTable(userList, "User_Id", "icons/sortUpDown16.png");

        contentDOM.appendChild(webUserTable);
    } // end of function success

    return contentDOM;
} // liveUserContent
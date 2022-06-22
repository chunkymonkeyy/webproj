function liveProductContent() {

    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    ajax("webAPIs/listProductsAPI.jsp", success, contentDOM);
    function success(obj) {

        console.log("listProductsAPI.jsp AJAX successfully returned the following data");
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
            innerHTML: "Product List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = "icons/insert.png";
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/productInsert";
        };


        /* Property names in Web APIs for web_user data: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */
        
        //Property names in listProductAPI for product data: productId, productName, img, price, stock, webUserId

        // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
        // Add the properties in the order you want them to appear in the HTML table.  
        var productList = [];
        for (var i = 0; i < obj.productList.length; i++) {
            productList[i] = {}; // add new empty object to array

            productList[i].Product_Id = SortableTableUtils.makeNumber(obj.productList[i].productId, false);

            productList[i].Product_Name = SortableTableUtils.makeText(obj.productList[i].productName);
            //productList[i].Product_Name.style.textAlign = "center";
            //userList[i].User_Credentials.style.lineHeight = "1.25rem";

            // last parameter true means add shadow to the image
            productList[i].Image = SortableTableUtils.makeImage(obj.productList[i].image, "5rem");
            var img = productList[i].Image.getElementsByTagName("img")[0];
            //img.classList.add("shadow");

            //productList[i].Birthday = SortableTableUtils.makeDate(obj.productList[i].birthday);
            productList[i].Price = SortableTableUtils.makeNumber(obj.productList[i].price, true);
            productList[i].Stock = SortableTableUtils.makeNumber(obj.productList[i].stock, false);

            productList[i].Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />",
                    '#/productUpdate/' + obj.productList[i].productId
                    );//innerHTML of link  // href of link
            //
            //
            productList[i].Delete = SortableTableUtils.makeImage("icons/delete.png", '1rem');

            // freeze the productId
            const productId = obj.productList[i].productId;
            productList[i].Delete.onclick = function () {
                var messageDOM = document.createElement("div");
                messageDOM.innerHTML = ""; // blank out any old message

                ajax("webAPIs/deleteProductAPI.jsp?deleteId="+ productId, APISuccess, messageDOM);
                // parameter properties needed for ajax call: url, successFn, and errorId
//               
                function APISuccess(obj) { // function is local to callDeleteAPI
                    console.log("successful ajax call");

                    // Empty string means sucessful delete. The HTML coder gets to decide how to 
                    // deliver the good news.
                    if (obj.errorMsg.length === 0) {

                        var msg = "Record"+ productId + " successfully deleted. ";
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
            productList[i].Error_Msg = SortableTableUtils.makeText(obj.productList[i].errorMsg);

        }

        console.log("heading in liveProductContent on next line");
        console.log(heading);

        //function MakeClickSortTable(objList, sortOrderPropName, sortIcon) {
        var productTable = MakeClickSortTable(
             //heading,
            productList,
             "Product_Id",
             "icons/sortUpDown16.png"
        );

        contentDOM.appendChild(productTable);
    } // end of function success

    return contentDOM;
} // liveUserContent
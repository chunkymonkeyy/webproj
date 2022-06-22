package model.product;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringData findById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        StringData sd = new StringData();
        try {
            String sql = "SELECT product_id, product_name, img, price, stock, "
                    + "product.web_user_id "
                    + "FROM web_user, product WHERE web_user.web_user_id = product.web_user_id "
                    + "AND product_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.productId = FormatUtils.plainInteger(results.getObject("product_id"));
                sd.productName = FormatUtils.formatString(results.getObject("product_name"));
                sd.image = FormatUtils.formatString(results.getObject("img"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.stock = FormatUtils.plainInteger(results.getObject("stock"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user.web_user_id"));

            } else {
                sd.errorMsg = "Product Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*   
        public String productId = "";
    public String productName = "";
    public String image = "";
    public String price = "";
    public String stock = "";
    public String webUserId = ""; // Foreign Key
    //fields obtained by joining with table web_user
    //public String userEmail = "";
    
    public String errorMsg = "";
         */
        // Validation
       // errorMsgs.productId = ValidationUtils.integerValidationMsg(inputData.productId, true); //여기바꾸기
        errorMsgs.productName = ValidationUtils.stringValidationMsg(inputData.productName, 45, true);
        //errorMsgs.userPassword = ValidationUtils.stringValidationMsg(inputData.userPassword, 45, true);

//        if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
//            errorMsgs.userPassword2 = "Both passwords must match";
//        }

        errorMsgs.image = ValidationUtils.stringValidationMsg(inputData.image, 300, false);

       // errorMsgs.birthday = ValidationUtils.dateValidationMsg(inputData.birthday, false);
        errorMsgs.price = ValidationUtils.decimalValidationMsg(inputData.price, false);
        errorMsgs.stock = ValidationUtils.integerValidationMsg(inputData.stock, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT product_id, product_name, img, price, stock, web_user_id "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            /*"INSERT INTO web_user (user_email, user_password, image, membership_fee, birthday, user_role_id) "
                    + "values (?,?,?,?,?,?)";*/
            
            // Start preparing SQL statement
            String sql = "INSERT INTO product (product_name, img, price, stock, web_user_id) " //homework에서는 다넣기.product_name, img, price, stock, web_user_id// lab에서는 여기까지만
                    + "values (?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.productName); // string type is simple
            pStatement.setString(2, inputData.image);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.price));
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.stock));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            //pStatement.setString(2, inputData.price);
            //pStatement.setDate(5, ValidationUtils.dateConversion(inputData.birthday));
            

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That product name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

     public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE product SET product_name=?, img= ?, price=?, stock=?, "
                    + "web_user_id=? WHERE product_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.productName); // string type is simple
            pStatement.setString(2, inputData.image);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.price));
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.stock));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.productId));
            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That product name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
     
    // method delete returns "" (empty string) if the delete worked fine. Otherwise, 
    // it returns an error message.
    public static String delete(String productId, DbConn dbc) {

        if (productId == null) {
            return "Error in model.product.DbMods.delete: cannot delete product record because 'productId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM product WHERE product_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, productId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with product_id " + productId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.product.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }//delete
    
} // class

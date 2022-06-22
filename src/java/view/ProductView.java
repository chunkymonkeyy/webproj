package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.product.*;

// classes in my project
import dbUtils.*;

public class ProductView {

    public static StringDataList getAllProducts(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT product_id, product_name, img, price, stock, web_user.web_user_id " + //+user_email, web_user.web_user_id 
                    "FROM web_user, product WHERE web_user.web_user_id = product.web_user_id ORDER BY product_id";
            //+       "WHERE product.web_user_id = web_user.web_user_id";
            
// you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.productId = FormatUtils.plainInteger(results.getObject("product_id"));
                sd.productName = FormatUtils.formatString(results.getObject("product_name"));
                //sd.userPassword = FormatUtils.formatString(results.getObject("user_password"));
                sd.image = FormatUtils.formatString(results.getObject("img"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.stock = FormatUtils.plainInteger(results.getObject("stock"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user.web_user_id"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in ProductView.getAllProducts(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
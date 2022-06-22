function blogContent() {
// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = ` 
        <h4>My Blog</h4>
        <p>
        What I learned about this week HW is when I click on the delete icon, I can invoke the delete API with ajax call and completely remove certain data from my database.
        </p>
<ul>
    <li>
     Click <a target="_blank" href="Kang_database.pdf">here<a/> to see my database document.
    </li>
    <li>
     Click <a href="webAPIs/logonAPI.jsp?email=ttochi0105@naver.com&password=jiyeon">here</a> 
                for my Log On API with VALID credentials as URL parameters.
    </li>
    <li>
     Click <a href="webAPIs/logoffAPI.jsp">here</a> for my Logoff API (takes no URL parameters).
    </li>
    <li>
      Click <a href="webAPIs/getProfileAPI.jsp">here</a> for my Get Profile API (takes no URL parameters). 
    </li>
    <li>
     Click <a href="webAPIs/listUsersAPI.jsp">here</a> for my List Users API (takes no URL parameters). 
    </li>
</ul>
    
    
        <pre>
                This is going to be my database. It has three tables - user_role/web_user/product
    
                1. user_role Table
                -user_role_id int (PRIMARY KEY)
                -user_role_type varchar
    
                2. web_user Table (users will be customers)
                -web_user_id int (PRIMARY KEY)
                -user_email varchar
                -user_password varchar
                -image varchar
                -membership_fee decimal
                -birthday date
                -user_role_id int (FOREIGN KEY)
                
                3. Product Table
                -product_id int (PRIMARY KEY)
                -product_name varchar
                -price decimal
                -img varchar
                -stock int  
                -web_user_id int (FOREIGN KEY)
        </pre>
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
}
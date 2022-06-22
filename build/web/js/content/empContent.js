function empContent() {

var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
                background-color: grey;
            }
            .flexContainer .obj {
                width: 50%; 
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
        </style>
        <h3>This Function Generates Content Using More JS</h3>
        <p>
            In this JS function, several objects are created and then appended into the 
            content area. 
        </p>
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content; // the HTML code specified just above...
        var empContainer = document.createElement("div");
        empContainer.classList.add('flexContainer'); // see styling in this file, above...
        ele.appendChild(empContainer);
        empContainer.appendChild(MakeEmp("http://cis-linux2.temple.edu/~sallyk/pics_users/jamie.jpg","jamie", "Manager"));
        empContainer.appendChild(MakeEmp("http://cis-linux2.temple.edu/~sallyk/pics_users/karl.jpg","karl", "Director"));

        return ele;
}
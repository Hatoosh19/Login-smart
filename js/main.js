// DOM Elements
var emilLogin = document.getElementById('signinEmail');
var passWordLogin = document.getElementById('signinPassword');
var loginButton = document.getElementById('signinBtn');
var signUpEmail = document.getElementById('signUpEmail');
var signUpName = document.getElementById('signUpName');
var signUpPassword = document.getElementById('signUpPassword');
var signupButton = document.getElementById('signupBtn');
var error = document.getElementById('error');
var found = document.getElementById('found');

// Users Array
// var signUpList = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
var signUpList =[];
// Debugging
console.log(signUpList);

// Sign In Function
function signIn() {
    var email = emilLogin.value.trim();
    var password = passWordLogin.value.trim();

    // Check if fields are empty
    if (email === "" || password === "") {
        error.innerHTML = `<span class="text-danger mt-2">All inputs are required</span>`;
        return;
    }

    // Check if email and password match a user
    var user = signUpList.find(user => user.email === email && user.password === password);

    if (user) {
        error.innerHTML = `<span class="text-success fs-3 mt-2">Login successful</span>`;
        // Save user's name in session storage
        sessionStorage.setItem('loggedInUser', user.name);
        // Redirect to home page
        window.location.href = "home.html";
    } else {
        error.innerHTML = `<span class="text-danger fs-3 mt-2">Invalid email or password</span>`;
    }
}

// Sign Up Function
// function signUp() {
//     var name = signUpName.value.trim();
//     var email = signUpEmail.value.trim();
//     var password = signUpPassword.value.trim();

//     // Check if fields are empty
//     if (name === "" || email === "" || password === "") {
//         found.innerHTML = `<span class="text-danger mt-2">All inputs are required</span>`;
//         return;
//     }

//     // Check if email already exists
//     if (signUpList.some(user => user.email === email)) {
//         found.innerHTML = `<span class="text-danger mt-2">Email already exists</span>`;
//         return;
//     }

//     // Add user to the list and save to localStorage
//     var newUser = { name, email, password };
//     signUpList.push(newUser);
//     localStorage.setItem('users', JSON.stringify(signUpList));
    
//     // Show success message
//     found.innerHTML = `<span class="text-success mt-2">Registration successful!</span>`;

//     // Clear form
//     clearForm();
// }
function signUp()
{
    var user={
        name:signUpName.value,
        email:signUpEmail.value,
        password:signUpPassword.value
    }

    if(user.name ==="" || user.email==="" || user.password === "")
    {
        found.innerHTML = `<span class="text-danger fs-3 mt-2">All inputs are required</span>`;
        return;
    }
    signUpList.push(user);
    for(var i =0; i<signUpList.length;i++)
    {
        if(signUpList[i].email===user.email)
        {
            found.innerHTML = `<span class="text-danger fs-3 mt-2">Email already exists</span>`;
            return;
        }
    }
    localStorage.setItem('users', JSON.stringify(signUpList));
    found.innerHTML = `<span class="text-success fs-3 mt-2">Registration successful!</span>`;

}
// Clear Form Function
function clearForm() {
    signUpEmail.value = "";
    signUpName.value = "";
    signUpPassword.value = "";
    found.innerHTML = "";
}


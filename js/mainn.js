
var emilLogin = document.getElementById('signinEmail');
var passWordLogin = document.getElementById('signinPassword');
var loginButton = document.getElementById('signinBtn');
var signUpEmail = document.getElementById('signUpEmail');
var signUpName = document.getElementById('signUpName');
var signUpPassword = document.getElementById('signUpPassword');
var signupButton = document.getElementById('signupBtn');
var error = document.getElementById('error');
var found = document.getElementById('found');
var username=document.getElementById("username");

if(username)
{
    username.innerHTML=`welcome ${sessionStorage.getItem('loggedInUser')}`

}
    // Construct baseURL
    var pathparts = location.pathname.split('/');
    var baseURL = window.location.origin;
    if (pathparts.length > 1) {
        for (var i = 1; i < pathparts.length - 1; i++) {
            baseURL += '/' + pathparts[i];
        }
    }

    console.log(baseURL);

    var signUpList = JSON.parse(localStorage.getItem('users')) || [];
    console.log(signUpList);

    function signUp() {
        var user = {
            name: signUpName.value.trim(),
            email: signUpEmail.value.trim(),
            password: signUpPassword.value.trim()
        };

        if (user.name === "" || user.email === "" || user.password === "") {
            found.innerHTML = `<span class="text-danger fs-3 mt-2">All inputs are required</span>`;
            return;
        }

        for (var i = 0; i < signUpList.length; i++) {
            if (signUpList[i].email === user.email) {
                found.innerHTML = `<span class="text-danger fs-3 mt-2">Email already exists</span>`;
                return;
            }
        }

        signUpList.push(user);
        localStorage.setItem('users', JSON.stringify(signUpList));
        clearForm();
        found.innerHTML = `<span class="text-success fs-3 mt-2">Registration successful!</span>`;
    }

    function signIn() {
        var email = emilLogin.value.trim();
        var password = passWordLogin.value.trim();

        if (email === "" || password === "") {
            error.innerHTML = `<span class="text-danger fs-3 mt-2">All inputs are required</span>`;
            return;
        }

        for (var i = 0; i < signUpList.length; i++) {
            if (signUpList[i].email === email && signUpList[i].password === password) {
                error.innerHTML = `<span class="text-success fs-3 mt-2">Login successful</span>`;
                sessionStorage.setItem('loggedInUser', signUpList[i].name);
                window.location.href = baseURL + "/home.html";
                // username beside the welcome
                return;
            }
        }

        error.innerHTML = `<span class="text-danger fs-3 mt-2">Invalid email or password</span>`;
    }

    function clearForm() {
        signUpEmail.value = "";
        signUpName.value = "";
        signUpPassword.value = "";
        found.innerHTML = "";
    }


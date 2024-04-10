function loadDoc() {
  return
  let xhttp = new XMLHttpRequest();

  // Define the function to handle the response
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      document.getElementById("demo").innerHTML = this.responseText;
      document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
    }
  };

  // Send the request
  xhttp.open("GET", "../api/get_content.php", true);
  xhttp.send();
}

function displayLoginButtons() {
  let userEmail = localStorage.getItem('email');
  let userPassword = localStorage.getItem('password');

  const loginContainer = document.getElementById('login-container');

  if (userEmail && userPassword) {
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout as ' + userEmail;
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      location.reload();
    });
    loginContainer.appendChild(logoutButton);
  } else {
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login/Signup';
    loginButton.addEventListener('click', () => {
      const loginForm = `
        <form id="login-form">
          <input type="text" placeholder="Email" id="email">
          <input type="password" placeholder="Password" id="password">
          <button type="submit">Login</button>
          <button type="button" id="signup">Signup</button>
        </form>
      `;
      loginContainer.innerHTML = loginForm;

      document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        logIn(email, password)
      });

      document.getElementById('signup').addEventListener('click', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signUp(email, password)
      });
    });
    loginContainer.appendChild(loginButton);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  logIn(email, password);
}

function logIn(email, password) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        location.reload();
      } else {
        document.getElementById('log-error').innerText = this.responseText;
      }
    }
  };

  let url = "../api/login.php";
  url += "?email=" + encodeURIComponent(email);
  url += "&password=" + encodeURIComponent(password);

  xhttp.open("GET", url, true);
  xhttp.send();
}


function signUp(email, password) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        location.reload();
      } else {
        document.getElementById('log-error').innerText = this.responseText;
      }
    }
  };

  let url = "../api/signup.php"; // Modify the URL to point to the signup API endpoint
  url += "?email=" + encodeURIComponent(email);
  url += "&password=" + encodeURIComponent(password);

  xhttp.open("GET", url, true);
  xhttp.send();
}

document.addEventListener('DOMContentLoaded', function () {
  displayLoginButtons();
});

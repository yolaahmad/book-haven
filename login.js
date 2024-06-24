// const topCascade = document.querySelector('.top')
// const bottomCascade = document.querySelector('.bottom')
// const loginForm = document.querySelector('.login')
// const signUpForm = document.querySelector('.sign-up')

// topCascade.addEventListener('click', ()=>{
//     topCascade.appendChild(loginForm)
//     loginForm.classList.toggle('cascade')
//     signUpForm.classList.toggle('.login')
//     const pEl = topCascade.childNodes.item(0)
//     pEl.textContent = 'SIGN-UP'
// })

// bottomCascade.addEventListener('click', ()=>{
//     bottomCascade.appendChild(signUpForm)
//     signUpForm.classList.toggle('cascade')
//     loginForm.classList.toggle('.login')
//     const pEl = bottomCascade.childNodes.item(0)
//     pEl.textContent = 'LOGIN'
// })

const logLink = document.getElementById("login-link");
const containerSignUp = document.querySelector(".sign-up");
const containerLogin = document.querySelector(".login");
const signLink = document.getElementById("sign-link");

logLink.addEventListener("click", () => {
  console.log("clicked");
  containerSignUp.classList.toggle("rotate-sign");
  containerLogin.classList.toggle("rotate-log");
});

signLink.addEventListener("click", () => {
  containerLogin.classList.toggle("rotate-log");
  containerSignUp.classList.remove("rotate-sign");
});

function togglePass() {
  var x = document.getElementById("PassInput");
  if (x.type === "password") {
    document.getElementById("eyeIcon").style.display = "none";
    document.getElementById("hidePass").style.display = "block";
    x.type = "text";
  } else {
    document.getElementById("eyeIcon").style.display = "block";
    document.getElementById("hidePass").style.display = "none";
    x.type = "password";
  }
}

//Toggle for login eye-icon

function togglePass2() {
  var x = document.getElementById("PassInput2");
  if (x.type === "password") {
    document.getElementById("eyeIcon2").style.display = "none";
    document.getElementById("hidePass2").style.display = "block";
    x.type = "text";
  } else {
    document.getElementById("eyeIcon2").style.display = "block";
    document.getElementById("hidePass2").style.display = "none";
    x.type = "password";
  }
}

//Toggle for reset password eye-icon

function togglePass3() {
  var x = document.getElementById("new_password");
  if (x.type === "password") {
    document.getElementById("eyeIcon3").style.display = "none";
    document.getElementById("hidePass3").style.display = "block";
    x.type = "text";
  } else {
    document.getElementById("eyeIcon3").style.display = "block";
    document.getElementById("hidePass3").style.display = "none";
    x.type = "password";
  }
}

//reset password modal

function displayReset() {
  document.getElementById("resetPass").style.display = "flex";
  document.getElementById("login").style.display = "none";
  document.getElementById("sign-up").style.display = "none";
}

function closeResetPass() {
  document.getElementById("resetPass").style.display = "none";
  document.getElementById("login").style.display = "flex";
  document.getElementById("sign-up").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const modals = {
    username_format: document.getElementById("usernameFormatModal"),
    email_format: document.getElementById("emailFormatModal"),
    password_length: document.getElementById("passwordLengthModal"),
    username_exists: document.getElementById("usernameExistsModal"),
    empty_fields: document.getElementById("emptyFieldsModal"),
    username_not_found: document.getElementById("usernameNotFoundModal"),
    invalid_password: document.getElementById("invalidPasswordModal"),
    invalid_recovery_key: document.getElementById("invalidRecoveryKeyModal"),
    password_updated: document.getElementById("passwordUpdatedModal"),
  };

  const closeModalElements = document.querySelectorAll(".close");

  // Check URL parameters for errors
  const params = new URLSearchParams(window.location.search);
  const errorType = params.get("error");
  const successType = params.get("success");

  // Function to display the reset password form
  function displayResetPasswordForm() {
    const resetForm = document.getElementById("resetPass");
    const loginForm = document.getElementById("login");
    const signUpForm = document.getElementById("sign-up");

    resetForm.style.display = "flex";
    loginForm.style.display = "none";
    signUpForm.style.display = "none";
  }

  if (errorType && modals[errorType]) {
    modals[errorType].style.display = "block";
    if (errorType === "invalid_recovery_key") {
      displayResetPasswordForm();
    }
  }

  if (successType && modals[successType]) {
    modals[successType].style.display = "block";
    if (successType === "password_updated") {
      displayResetPasswordForm();
    }
  }

  // Close modal on click of close button or outside the modal
  closeModalElements.forEach((closeElement) => {
    closeElement.onclick = function () {
      closeElement.closest(".modal").style.display = "none";
      window.history.replaceState({}, document.title, window.location.pathname); // Remove query parameters
    };
  });

  window.onclick = function (event) {
    for (let modalKey in modals) {
      if (event.target == modals[modalKey]) {
        modals[modalKey].style.display = "none";
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        ); // Remove query parameters
      }
    }
  };
});

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

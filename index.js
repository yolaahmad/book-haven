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

const logLink = document.getElementById('login-link');
const containerSignUp = document.querySelector('.sign-up');
const containerLogin = document.querySelector('.login');
const signLink = document.getElementById('sign-link');

logLink.addEventListener('click', () => {
    console.log('clicked');
    containerSignUp.classList.toggle('rotate-sign');
    containerLogin.classList.toggle('rotate-log'); 
});

signLink.addEventListener('click', () => {
    containerLogin.classList.toggle('rotate-log');
    containerSignUp.classList.remove('rotate-sign');
});
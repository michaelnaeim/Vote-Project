'use strict'
const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  console.log(email)
  console.log(password)

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('registered', user);
      registerForm.reset();
    })
    .catch((error) => {
      registerForm.querySelector('.error').textContent = error.message;
    });
});

// login form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log('logged in', user);
      loginForm.reset();
    })
    .catch(error => {
      loginForm.querySelector('.error').textContent = error.message;
    });
});



// // auth listener
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = 'index2.html'; //After successful login, user will be redirected to home.html
  }else{
    console.log('NOPE');
  }
});

// sign out
signOut.addEventListener('click', (e) => {
  firebase.auth().signOut()
    .then(() => console.log('signed out'));
});
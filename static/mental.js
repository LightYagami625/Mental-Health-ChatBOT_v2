<<<<<<< HEAD
// mental.js — full login/signup behavior (safe, robust)

// ----- Helpers & safe DOM access -----
const el = id => document.getElementById(id);
const safeAddListener = (node, evt, fn) => { if(node) node.addEventListener(evt, fn); };
const validEmail = email => /^\S+@\S+\.\S+$/.test(email);

// ----- Elements (guarded) -----
const loginForm = el('login-form');
const signinBtn = el('signinBtn');
const loginEmail = el('login-email');
const loginPass = el('login-pass');

const signupForm = el('signup-form');
const createAccountBtn = el('createAccountBtn');
const cancelSignupBtn = el('cancel-signup');

const btnLogin = el('btn-login');
const btnSignup = el('btn-signup');
const loginPanel = el('login-panel');
const signupPanel = el('signup-panel');

const forgotBtn = el('forgot');

// ----- Redirect target: change if your chatbot lives elsewhere -----
const APP_TARGET = '../UI/chatbot.html';

// ----- UI: show login or signup panel -----
function showPanel(panelToShow) {
  if(!loginPanel || !signupPanel) return;
  if(panelToShow === 'login') {
    loginPanel.style.display = 'block';
    signupPanel.style.display = 'none';
    btnLogin && btnLogin.classList.add('active');
    btnSignup && btnSignup.classList.remove('active');
  } else {
    signupPanel.style.display = 'block';
    loginPanel.style.display = 'none';
    btnSignup && btnSignup.classList.add('active');
    btnLogin && btnLogin.classList.remove('active');
  }
}

// ----- Demo authentication (replace with server call) -----
async function authenticateDemo(email, password) {
  return new Promise(resolve => {
    setTimeout(() => {
      const ok = validEmail(email) && typeof password === 'string' && password.length >= 6;
      resolve({ ok, message: ok ? 'Authenticated (demo)' : 'Invalid credentials' });
    }, 300);
  });
}

// ----- Login handler -----
async function handleLoginSubmit(e) {
  if(e && e.preventDefault) e.preventDefault();
  if(!loginEmail || !loginPass) { alert('Login form missing.'); return; }

  const email = loginEmail.value.trim();
  const pass = loginPass.value;

  if(!email) { alert('Please enter your email.'); loginEmail.focus(); return; }
  if(!validEmail(email)) { alert('Please enter a valid email.'); loginEmail.focus(); return; }
  if(!pass || pass.length < 6) { alert('Password must be at least 6 characters.'); loginPass.focus(); return; }

  if(signinBtn){ signinBtn.disabled = true; signinBtn.textContent = 'Signing in...'; }

  try {
    const res = await authenticateDemo(email, pass);
    if(res.ok) {
      // on success redirect to your app/chat page
      window.location.href = APP_TARGET;
    } else {
      alert(res.message || 'Login failed.');
    }
  } catch(err) {
    console.error(err);
    alert('An error occurred during login. Check console.');
  } finally {
    if(signinBtn){ signinBtn.disabled = false; signinBtn.textContent = 'Sign in'; }
  }
}

// ----- Signup handler -----
async function handleSignupSubmit(e) {
  if(e && e.preventDefault) e.preventDefault();
  if(!signupForm) return;

  const first = el('first') ? el('first').value.trim() : '';
  const last = el('last') ? el('last').value.trim() : '';
  const email = el('signup-email') ? el('signup-email').value.trim() : '';
  const pass = el('signup-pass') ? el('signup-pass').value : '';

  if(!first || !last) { alert('Please enter your full name.'); return; }
  if(!validEmail(email)) { alert('Please enter a valid email.'); return; }
  if(!pass || pass.length < 6) { alert('Password must be at least 6 characters.'); return; }

  if(createAccountBtn){ createAccountBtn.disabled = true; createAccountBtn.textContent = 'Creating...'; }
  try {
    await new Promise(r => setTimeout(r, 450));
    alert('Account created (demo). Redirecting...');
    window.location.href = APP_TARGET;
  } catch(err) {
    console.error(err);
    alert('Signup failed. See console.');
  } finally {
    if(createAccountBtn){ createAccountBtn.disabled = false; createAccountBtn.textContent = 'Create account'; }
  }
}

// ----- Forgot password demo -----
function handleForgot() {
  if(!loginEmail) { alert('Please enter your email to reset password.'); return; }
  const email = loginEmail.value.trim();
  if(!email || !validEmail(email)){ alert('Enter a valid email to receive a reset link.'); loginEmail.focus(); return; }
  alert('Password reset link would be sent to ' + email + ' (demo).');
}

// ----- Enter key support for forms -----
function initEnterKeySubmit(formEl, submitHandler) {
  if(!formEl) return;
  formEl.addEventListener('keydown', evt => {
    if(evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      submitHandler();
    }
  });
}

// ----- Show / hide password toggles -----
// Buttons with class "pass-toggle" toggle their adjacent input
function initPasswordToggles() {
  document.querySelectorAll('.pass-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      // find preceding input in same input-wrap
      const wrap = btn.closest('.input-wrap');
      if(!wrap) return;
      const input = wrap.querySelector('input[type="password"], input[type="text"]');
      if(!input) return;
      if(input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
        btn.title = 'Hide password';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
        btn.title = 'Show password';
      }
    });
  });
}

// ----- Wire up events safely -----
safeAddListener(btnLogin, 'click', () => showPanel('login'));
safeAddListener(btnSignup, 'click', () => showPanel('signup'));

if(loginForm){
  safeAddListener(loginForm, 'submit', handleLoginSubmit);
  initEnterKeySubmit(loginForm, handleLoginSubmit);
}
safeAddListener(signinBtn, 'click', handleLoginSubmit);

if(signupForm){
  safeAddListener(signupForm, 'submit', handleSignupSubmit);
  initEnterKeySubmit(signupForm, handleSignupSubmit);
}
safeAddListener(createAccountBtn, 'click', handleSignupSubmit);
safeAddListener(cancelSignupBtn, 'click', () => showPanel('login'));
safeAddListener(forgotBtn, 'click', handleForgot);

// init toggles + initial panel
initPasswordToggles();
showPanel('login');

// Optional debug hooks
window._mental = { handleLoginSubmit, handleSignupSubmit, showPanel };
=======
// script.js — behaviour for MentalHealth auth page

// Wrap everything in DOMContentLoaded for safety
window.addEventListener('DOMContentLoaded', () => {
  // Toggle panels
  const btnLogin = document.getElementById('btn-login');
  const btnSignup = document.getElementById('btn-signup');
  const loginPanel = document.getElementById('login-panel');
  const signupPanel = document.getElementById('signup-panel');

  function showLogin() {
    btnLogin.classList.add('active'); btnLogin.setAttribute('aria-selected', 'true');
    btnSignup.classList.remove('active'); btnSignup.setAttribute('aria-selected', 'false');
    loginPanel.style.display = 'block'; signupPanel.style.display = 'none';
  }
  function showSignup() {
    btnSignup.classList.add('active'); btnSignup.setAttribute('aria-selected', 'true');
    btnLogin.classList.remove('active'); btnLogin.setAttribute('aria-selected', 'false');
    loginPanel.style.display = 'none'; signupPanel.style.display = 'block';
  }

  btnLogin.addEventListener('click', showLogin);
  btnSignup.addEventListener('click', showSignup);

  // Password toggle
  function makeToggle(idInput, idToggle) {
    const inp = document.getElementById(idInput);
    const tgl = document.getElementById(idToggle);
    if (!inp || !tgl) return;
    tgl.addEventListener('click', () => {
      if (inp.type === 'password') { inp.type = 'text'; tgl.textContent = '🙈'; tgl.title = 'Hide password' }
      else { inp.type = 'password'; tgl.textContent = '👁️'; tgl.title = 'Show password' }
    })
  }
  makeToggle('login-pass', 'toggle-pass');
  makeToggle('signup-pass', 'toggle-pass-2');

  // Simple client-side validation and demo submit handlers
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email');
    const pass = document.getElementById('login-pass');
    if (!email.value || !pass.value || pass.value.length < 6) {
      alert('Please enter a valid email and a password with at least 6 characters.');
      return;
    }
    alert('Welcome back — login successful (demo).');
    loginForm.reset();
    window.location.href = "/chat";
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = document.getElementById('first');
    const last = document.getElementById('last');
    const email = document.getElementById('signup-email');
    const pass = document.getElementById('signup-pass');
    const helper = document.getElementById('signup-helper');

    if (!first.value || !last.value || !email.value || !pass.value || pass.value.length < 6) {
      helper.classList.add('show');
      setTimeout(() => helper.classList.remove('show'), 4000);
      return;
    }

    alert('Account created — welcome to MentalHealth (demo).');
    signupForm.reset();
    window.location.href = "/chat";
  });

  document.getElementById('cancel-signup').addEventListener('click', () => {
    signupForm.reset();
    showLogin();
  });

  document.getElementById('forgot').addEventListener('click', () => {
    const e = document.getElementById('login-email');
    const email = e.value || '';
    alert('If an account exists for "' + email + '", we\'ve sent a password reset link (demo).');
  });

  // Keyboard accessibility
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      if (ev.key === 'ArrowRight') showSignup(); else showLogin();
    }
  });
});
>>>>>>> 3714a439752ab4cf7ba7a18dbcf37849cfc56998

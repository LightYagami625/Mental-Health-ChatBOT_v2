/* =====================================================
   LIGHT / DARK MODE
===================================================== */
const themeToggle = document.createElement("div");
themeToggle.className = "theme-toggle";
themeToggle.textContent = "🌙 Dark";
document.body.appendChild(themeToggle);

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* =====================================================
   ELEMENT REFERENCES
===================================================== */
const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-signup");

const loginPanel = document.getElementById("login-panel");
const signupPanel = document.getElementById("signup-panel");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");

const signupFirst = document.getElementById("first");
const signupLast = document.getElementById("last");
const signupEmail = document.getElementById("signup-email");
const signupPass = document.getElementById("signup-pass");

const signinBtn = document.getElementById("signinBtn");
const createAccountBtn = document.getElementById("createAccountBtn");
const cancelSignupBtn = document.getElementById("cancel-signup");
const forgotBtn = document.getElementById("forgot");

const togglePass1 = document.getElementById("toggle-pass");
const togglePass2 = document.getElementById("toggle-pass-2");

/* =====================================================
   MESSAGE ELEMENTS
===================================================== */
const loginMsg = document.createElement("div");
loginMsg.className = "msg";
loginForm.appendChild(loginMsg);

const signupMsg = document.createElement("div");
signupMsg.className = "msg";
signupForm.appendChild(signupMsg);

/* =====================================================
   LOGIN / SIGNUP TOGGLE
===================================================== */
btnLogin.addEventListener("click", () => {
  btnLogin.classList.add("active");
  btnSignup.classList.remove("active");

  loginPanel.style.display = "block";
  signupPanel.style.display = "none";
});

btnSignup.addEventListener("click", () => {
  btnSignup.classList.add("active");
  btnLogin.classList.remove("active");

  signupPanel.style.display = "block";
  loginPanel.style.display = "none";
});

/* =====================================================
   PASSWORD VISIBILITY
===================================================== */
togglePass1.addEventListener("click", () => {
  loginPass.type = loginPass.type === "password" ? "text" : "password";
});

togglePass2.addEventListener("click", () => {
  signupPass.type = signupPass.type === "password" ? "text" : "password";
});

/* =====================================================
   SIGNUP LOGIC (SAVE USER)
===================================================== */
createAccountBtn.addEventListener("click", () => {
  const first = signupFirst.value.trim();
  const last = signupLast.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPass.value.trim();

  signupMsg.textContent = "";
  signupMsg.className = "msg";

  if (!first || !last || !email || !password) {
    signupMsg.textContent = "All fields are required.";
    signupMsg.classList.add("error");
    return;
  }

  if (password.length < 6) {
    signupMsg.textContent = "Password must be at least 6 characters.";
    signupMsg.classList.add("error");
    return;
  }

  // Save user (demo purpose)
  const user = { email, password };
  localStorage.setItem("user", JSON.stringify(user));

  signupMsg.textContent = "Account created successfully ✔";
  signupMsg.classList.add("success");

  setTimeout(() => {
    signupForm.reset();
    btnLogin.click();
    signupMsg.textContent = "";
  }, 1000);
});

/* =====================================================
   LOGIN VALIDATION (STRICT)
===================================================== */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPass.value.trim();

  loginMsg.textContent = "";
  loginMsg.className = "msg";

  if (!email || !password) {
    loginMsg.textContent = "Please enter both email and password.";
    loginMsg.classList.add("error");
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    loginMsg.textContent = "No account found. Please sign up first.";
    loginMsg.classList.add("error");
    return;
  }

  if (email !== savedUser.email || password !== savedUser.password) {
    loginMsg.textContent = "❌ Invalid email or password.";
    loginMsg.classList.add("error");
    return;
  }

  signinBtn.classList.add("loading");
  signinBtn.textContent = "Signing in…";

  setTimeout(() => {
    signinBtn.classList.remove("loading");
    signinBtn.textContent = "Sign in";

    loginMsg.textContent = "✅ Login successful. Redirecting…";
    loginMsg.classList.add("success");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 900);
  }, 1200);
});

/* =====================================================
   CANCEL SIGNUP
===================================================== */
cancelSignupBtn.addEventListener("click", () => {
  signupForm.reset();
  signupMsg.textContent = "";
  btnLogin.click();
});

/* =====================================================
   FORGOT PASSWORD (DEMO)
===================================================== */
forgotBtn.addEventListener("click", () => {
  loginMsg.textContent = "Password reset link will be sent to your email.";
  loginMsg.className = "msg success";
});

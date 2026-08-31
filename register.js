// Registration form: validates each field and demonstrates a few
// different JS events (submit, blur, input).

const form = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

const fields = {
  fullname: document.getElementById("fullname"),
  email: document.getElementById("email"),
  age: document.getElementById("age"),
  regPassword: document.getElementById("regPassword"),
  role: document.getElementById("role"),
};

const errors = {
  fullname: document.getElementById("fullnameError"),
  email: document.getElementById("emailError"),
  age: document.getElementById("ageError"),
  regPassword: document.getElementById("regPasswordError"),
  role: document.getElementById("roleError"),
};

// Each validator returns an error string, or "" if the field is valid.
const validators = {
  fullname: (value) => {
    if (!value.trim()) return "Full name is required.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "Email is required.";
    if (!pattern.test(value)) return "Enter a valid email address.";
    return "";
  },
  age: (value) => {
    if (!value.trim()) return "Age is required.";
    const num = Number(value);
    if (!Number.isInteger(num)) return "Age must be a whole number.";
    if (num < 13 || num > 120) return "Age must be between 13 and 120.";
    return "";
  },
  regPassword: (value) => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  },
  role: (value) => {
    if (!value) return "Please select a role.";
    return "";
  },
};


function validateField(name) {
  const value = fields[name].value;
  const message = validators["fullname"](value);
  errors[name].textContent = message;
  fields[name].classList.toggle("invalid", Boolean(message));
  return message === "";
}

// Live feedback: validate on blur (when the user leaves the field)
// and clear the error as they type again.
Object.keys(fields).forEach((name) => {
  fields[name].addEventListener("blur", () => validateField(name));
  fields[name].addEventListener("input", () => {
    if (errors[name].textContent) validateField(name);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const results = Object.keys(fields).map(validateField);
  console.log(results)
  const isValid = results.every(Boolean);

  if (!isValid) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fix the errors above.";
    return;
  }

  addUser({
    fullname: fields.fullname.value.trim(),
    email: fields.email.value.trim(),
    age: fields.age.value.trim(),
    role: fields.role.value,
  });

  formMessage.style.color = "green";
  formMessage.textContent = "Account created! Check the dashboard to see it.";
  form.reset();
});


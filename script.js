// Handles the contact form on contact.html.
// Static site - there is no server, so a valid form just shows a confirmation message.

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  // One rule per required field: the message shown if the value is not valid.
  var rules = [
    {
      id: "name",
      message: "Please enter your name (at least 2 characters).",
      isValid: function (value) { return value.length >= 2; }
    },
    {
      id: "email",
      message: "Please enter a valid email address, like name@example.com.",
      isValid: function (value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value); }
    },
    {
      id: "message",
      message: "Please type a message (at least 10 characters).",
      isValid: function (value) { return value.length >= 10; }
    }
  ];

  var confirmMsg = document.getElementById("confirm-msg");

  // Checks one field, shows or clears its error text, and returns true if valid.
  function checkField(rule) {
    var field = document.getElementById(rule.id);
    var error = document.getElementById(rule.id + "-error");
    var valid = rule.isValid(field.value.trim());

    error.textContent = valid ? "" : rule.message;
    if (valid) {
      field.removeAttribute("aria-invalid");
    } else {
      field.setAttribute("aria-invalid", "true");
    }
    return valid;
  }

  rules.forEach(function (rule) {
    var field = document.getElementById(rule.id);

    // Show the error as soon as the user leaves the field, before any submit.
    field.addEventListener("blur", function () { checkField(rule); });

    // Once a field has an error, clear it as soon as the user fixes it.
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") checkField(rule);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    confirmMsg.classList.remove("show");

    var results = rules.map(checkField);
    var firstBad = rules.find(function (rule, i) { return !results[i]; });

    if (firstBad) {
      document.getElementById(firstBad.id).focus();
      return;
    }

    confirmMsg.classList.add("show");
    form.reset();
  });
});

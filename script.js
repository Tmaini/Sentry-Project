// Handles the contact form on contact.html.
// Static site - there is no server, so this just shows a confirmation message.

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var confirmMsg = document.getElementById("confirm-msg");
    confirmMsg.classList.add("show");

    form.reset();
  });
});

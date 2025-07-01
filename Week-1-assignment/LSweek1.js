document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    alert("Please fill out both fields!");
    return;
  }

  const messages = document.getElementById("messages");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${name}:</strong> ${message}`;
  messages.appendChild(msg);

  document.getElementById("messageForm").reset();
});

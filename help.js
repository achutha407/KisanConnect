document.getElementById("helpForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Grab input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Just a demo response for now
  if(name && email && message){
    document.getElementById("responseMsg").textContent = "Thank you! Your message has been submitted.";
    this.reset();
  } else {
    document.getElementById("responseMsg").textContent = "Please fill out all fields.";
  }
});

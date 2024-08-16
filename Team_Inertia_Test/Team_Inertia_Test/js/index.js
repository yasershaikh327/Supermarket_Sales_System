// Extract the 'res' parameter from the current URL
const urlParams = new URLSearchParams(window.location.search);
const resParam = urlParams.get('res');
if (resParam === 'f') {
   document.getElementById("errorMessageLabel").style.display = "block";
   document.getElementById("errorMessageLabel").innerText = "Invalid Email/Password!";
}
else if (resParam === 's') {
  alert("Login Successful")
}
else{
   document.getElementById("errorMessageLabel").style.display = "none";
}
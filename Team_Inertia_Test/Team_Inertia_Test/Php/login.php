<?php
$password = $_POST['password'];
$email = $_POST['email'];


if ($password === 'fixedpassword' && $email=== 'deltinroyal@gmail.com') {
	header("Location: ../Html/option.html?res=s");
} else {
	header("Location: ../Html/index.html?res=f");
}
?>
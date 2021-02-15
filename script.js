// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
	document.querySelector("#password").value = generatePassword();
}

// Add event listener to generate button
// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
generateBtn.addEventListener("click", writePassword);


// Function to generate password with user input
function generatePassword(length) {
	// THEN I am presented with a series of prompts for password criteria
	// WHEN prompted for password criteria
	// THEN I select which criteria to include in the password

	// WHEN prompted for the length of the password
	if (!length) {
		length = parseInt(prompt("Length?"));

		// THEN I choose a length of at least 8 characters and no more than 128 characters
		if (isNaN(length) || length < 8 || length > 128)
			return generatePassword()
	}

	// WHEN prompted for character types to include in the password
	// THEN I choose lowercase, uppercase, numeric, and/or special characters
	var hasUpper = confirm("Click Ok if your password contains uppercase characters")
	var hasLower = confirm("Click Ok if your password contains lowercase characters")
	var hasNumeric = confirm("Click Ok if your password contains numeric characters")
	var hasSpecial = confirm("Click Ok if your password contains special characters")
	// WHEN I answer each prompt
	// THEN my input should be validated and at least one character type should be selected
	// if(!hasLower && !hasUpper){
	if (!(hasLower || hasUpper))
		return generatePassword(length)

	// WHEN all prompts are answered
	// THEN a password is generated that matches the selected criteria
	var uppChar = ['A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	var lowChar = ['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	var numChar = ['0','1','2','3','4','5','6','7','8','9']
	var speChar = ['!','@','#','$',"%","^","&","*","-","+"]

	var password = []
	var possibleChars = []

	if (hasUpper) {
		password.push(getRandomFromArray(uppChar))
		// [] = [] + ['A', 'B', 'C']
		// ['A', 'B', 'C']
		possibleChars = possibleChars.concat(uppChar)
	}
	if (hasLower) {
		password.push(getRandomFromArray(lowChar))
		// ['A', 'B', 'C'] = ['A', 'B', 'C'] + ['a', 'b', 'c']
		// ['A', 'B', 'C', 'a', 'b', 'c']
		possibleChars = possibleChars.concat(lowChar)
	}
	if (hasNumeric)
		password.push(getRandomFromArray(numChar))
		possibleChars = possibleChars.concat(numChar)

	if (hasSpecial)
		password.push(getRandomFromArray(speChar))
		possibleChars = possibleChars.concat(speChar)

	

	for (var i = password.length; i < length; i++) {
		password.push(getRandomFromArray(possibleChars))
	}

	// ['A', 'B', 'C', 'a', 'b', 'c']
	// i:0, r:4 => ['b', 'B', 'C', 'a', 'A', 'c']
	// i:1, r:2 => ['b', 'C', 'B', 'a', 'A', 'c']
	// i:2, r:2 => ['b', 'C', 'B', 'a', 'A', 'c']
	// i:3, r:1 => ['b', 'a', 'B', 'C', 'A', 'c']
	// i:4, r:5 => ['b', 'a', 'B', 'C', 'c', 'A']
	// i:5, r:0 => ['A', 'a', 'B', 'C', 'c', 'b']
	for (var i = 0; i < password.length; i++) {

		// Math.rand() returns [0 - .9999999]
		// assume length === 6; Math.random() * length === [0 - 5.999999]
		// Math.floor(int) converts int to lowest whole number
		//		5.99999 => 5
		//		-3.99999 !== 3
		//		-3.99999 => 4
		// Math.floor() moves left to first whole number
		// Math.ceiling() moves right to first whole number
		// <(-3) --- (-2) --- (-1) --- 0 --- 1 --- 2 -- 3>

		// randIndex => [0 - 5]
		var randIndex = Math.floor(Math.random() * password.length)

		var temp1 = password[randIndex]
		var temp2 = password[i]

		password[randIndex] = temp2
		password[i] = temp1
	}

	// WHEN the password is generated
	// THEN the password is either displayed in an alert or written to the page
	return password.join("")
}

function getRandomFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}



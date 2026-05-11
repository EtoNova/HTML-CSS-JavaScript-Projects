const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includelowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (
    !includeUppercase &&
    !includelowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("Please select at least one char type.");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    includeUppercase,
    includelowercase,
    includeNumbers,
    includeSymbols,
  );

  passwordInput.value = newPassword;
  updtateStrengthMeter(newPassword);
}

function updtateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

  let strengthScore = 0;

  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUpperCase) strengthScore += 15;
  if (hasLowerCase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  // ensure the width of the strength bar is a valid percentage
  const safeScore = Math.max(5, Math.min(100, strengthScore));
  strengthBar.style.width = safeScore + "%";

  let strengthLabelText = "";
  let barColour = "";

  if (strengthScore < 40) {
    barColour = "#d64054";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    barColour = "#d69a40";
    strengthLabelText = "Medium";
  } else {
    barColour = "#6ad640";
    strengthLabelText = "Strong";
  }

  strengthBar.style.backgroundColor = barColour;
  strengthLabel.textContent = strengthLabelText;
}

function createRandomPassword(
  length,
  includeUppercase,
  includelowercase,
  includeNumbers,
  includeSymbols,
) {
  let allcharacters = "";
  if (includeUppercase) allcharacters += uppercaseLetters;
  if (includelowercase) allcharacters += lowercaseLetters;
  if (includeNumbers) allcharacters += numberCharacters;
  if (includeSymbols) allcharacters += symbolCharacters;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allcharacters.length);
    password += allcharacters[randomIndex];
  }

  return password;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((error) => console.log("Could not copy: ", error));
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#6ad640";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 100);
}

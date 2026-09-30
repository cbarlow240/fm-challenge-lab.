"use strict";

const homeScreen = document.getElementById("home-screen");
const difficultyScreen = document.getElementById("difficulty-screen");
const difficultyTitle = document.getElementById("difficulty-title");

const newChallengeButton = document.getElementById("new-challenge-button");
const backHomeButton = document.getElementById("back-home-button");
const generateButton = document.getElementById("generate-button");
const difficultyStatus = document.getElementById("difficulty-status");

const difficultyInputs = document.querySelectorAll(
  'input[name="difficulty"]'
);

const difficultyNames = {
  rookie: "Rookie",
  professional: "Professional",
  veteran: "Veteran",
  legendary: "Legendary"
};

let selectedDifficulty = null;

function updateDifficultySelection() {
  const selectedInput = document.querySelector(
    'input[name="difficulty"]:checked'
  );

  selectedDifficulty = selectedInput ? selectedInput.value : null;
  generateButton.disabled = selectedDifficulty === null;

  difficultyStatus.textContent = selectedDifficulty
    ? `${difficultyNames[selectedDifficulty]} selected. Ready for your challenge.`
    : "Select a difficulty to continue.";
}

function openDifficultyScreen() {
  homeScreen.hidden = true;
  difficultyScreen.hidden = false;

  updateDifficultySelection();
  difficultyTitle.focus();
}

function openHomeScreen() {
  difficultyScreen.hidden = true;
  homeScreen.hidden = false;

  newChallengeButton.focus();
}

newChallengeButton.addEventListener("click", openDifficultyScreen);
backHomeButton.addEventListener("click", openHomeScreen);

difficultyInputs.forEach((input) => {
  input.addEventListener("change", updateDifficultySelection);
});

generateButton.addEventListener("click", () => {
  if (selectedDifficulty === null) {
    return;
  }

  difficultyStatus.textContent =
    `${difficultyNames[selectedDifficulty]} confirmed. ` +
    "Club generation is the next feature we’re adding.";
});

updateDifficultySelection();

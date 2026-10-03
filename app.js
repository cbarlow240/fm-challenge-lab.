"use strict";

(() => {
  const homeScreen = document.getElementById("home-screen");
  const difficultyScreen = document.getElementById("difficulty-screen");
  const clubScreen = document.getElementById("club-screen");

  const difficultyTitle = document.getElementById("difficulty-title");
  const difficultyStatus = document.getElementById("difficulty-status");
  const clubStatus = document.getElementById("club-status");

  const newChallengeButton = document.getElementById("new-challenge-button");
  const backHomeButton = document.getElementById("back-home-button");
  const generateButton = document.getElementById("generate-button");
  const backSetupButton = document.getElementById("back-setup-button");
  const rerollButton = document.getElementById("reroll-button");
  const viewChallengeButton = document.getElementById("view-challenge-button");

  const clubShuffle = document.getElementById("club-shuffle");
  const clubResult = document.getElementById("club-result");
  const shuffleName = document.getElementById("shuffle-name");

  const clubTitle = document.getElementById("club-title");
  const clubCrest = document.getElementById("club-crest");
  const clubInitials = document.getElementById("club-initials");
  const clubCountry = document.getElementById("club-country");
  const clubLeague = document.getElementById("club-league");
  const clubDifficulty = document.getElementById("club-difficulty");
  const clubIntroduction = document.getElementById("club-introduction");
  const clubHonours = document.getElementById("club-honours");

  const difficultyInputs = document.querySelectorAll(
    'input[name="difficulty"]'
  );

  const difficultyNames = {
    rookie: "Rookie",
    professional: "Professional",
    veteran: "Veteran",
    legendary: "Legendary"
  };

  // Starter data for testing the generator.
  // Leagues and honours reflect the 2023/24 starting point.
  const clubs = [
    {
      id: "sunderland",
      name: "Sunderland",
      initials: "SAFC",
      country: "England",
      league: "Championship",
      colour: "#d33349",
      introduction:
        "A proud footballing past and a fresh chapter to write. " +
        "Can you bring top-flight football back to Wearside, " +
        "then build a team worthy of its history?",
      honours: [
        { count: 6, name: "English league titles", year: "Last won: 1936" },
        { count: 2, name: "FA Cups", year: "Last won: 1973" },
        { count: 1, name: "Charity Shield", year: "Won: 1936" }
      ]
    },
    {
      id: "ipswich",
      name: "Ipswich Town",
      initials: "ITFC",
      country: "England",
      league: "Championship",
      colour: "#3269c0",
      introduction:
        "From European glory to a new Championship chapter. " +
        "Build on a rich history and guide the Tractor Boys " +
        "towards a return to the top flight.",
      honours: [
        { count: 1, name: "English league title", year: "Won: 1962" },
        { count: 1, name: "FA Cup", year: "Won: 1978" },
        { count: 1, name: "UEFA Cup", year: "Won: 1981" }
      ]
    },
    {
      id: "leicester",
      name: "Leicester City",
      initials: "LCFC",
      country: "England",
      league: "Championship",
      colour: "#2453b8",
      introduction:
        "The fairytale champions face a fresh challenge " +
        "in the Championship. Can you lead their recovery " +
        "and write the next remarkable chapter?",
      honours: [
        { count: 1, name: "Premier League title", year: "Won: 2016" },
        { count: 1, name: "FA Cup", year: "Won: 2021" },
        { count: 3, name: "League Cups", year: "Last won: 2000" }
      ]
    }
  ];

  let selectedDifficulty = null;
  let selectedClub = null;
  let lastRevealedClubId = null;

  let revealTimer = null;
  let revealVersion = 0;
  let isRevealing = false;

  function showScreen(screen) {
    homeScreen.hidden = screen !== homeScreen;
    difficultyScreen.hidden = screen !== difficultyScreen;
    clubScreen.hidden = screen !== clubScreen;

    window.scrollTo({ top: 0, behavior: "instant" });
  }

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

  // Gives each eligible index an equal chance.
  function randomIndex(length) {
    if (!Number.isInteger(length) || length < 1) {
      throw new Error("The club pool must contain at least one club.");
    }

    const range = 4294967296;
    const limit = Math.floor(range / length) * length;
    const value = new Uint32Array(1);

    do {
      window.crypto.getRandomValues(value);
    } while (value[0] >= limit);

    return value[0] % length;
  }

  function cancelReveal() {
    revealVersion += 1;
    window.clearTimeout(revealTimer);
    revealTimer = null;
    isRevealing = false;
    clubScreen.removeAttribute("aria-busy");
  }

  function renderClub(club) {
    clubTitle.textContent = club.name;
    clubInitials.textContent = club.initials;
    clubCrest.style.setProperty("--club-colour", club.colour);
    clubCrest.setAttribute(
      "aria-label",
      `${club.name} placeholder badge`
    );

    clubCountry.textContent = club.country;
    clubLeague.textContent = club.league;
    clubDifficulty.textContent = difficultyNames[selectedDifficulty];
    clubIntroduction.textContent = club.introduction;

    clubHonours.replaceChildren();

    club.honours.forEach((honour) => {
      const card = document.createElement("div");
      card.className = "honour-card";

      const count = document.createElement("strong");
      count.className = "honour-count";
      count.textContent = honour.count;

      const name = document.createElement("span");
      name.className = "honour-name";
      name.textContent = honour.name;

      const year = document.createElement("span");
      year.className = "honour-year";
      year.textContent = honour.year;

      card.append(count, name, year);
      clubHonours.append(card);
    });
  }

  function startClubDraw() {
    if (selectedDifficulty === null || isRevealing) {
      return;
    }

    // Exclude the previous revealed club, rather than cycling a list.
    const eligibleClubs = clubs.filter(
      (club) => club.id !== lastRevealedClubId
    );

    if (eligibleClubs.length === 0) {
      clubStatus.textContent =
        "No different club is available. Widen your club filters.";
      return;
    }

    // Choose the result before running the display animation.
    const nextClub = eligibleClubs[randomIndex(eligibleClubs.length)];

    cancelReveal();
    isRevealing = true;

    const thisReveal = revealVersion;
    showScreen(clubScreen);
    clubScreen.setAttribute("aria-busy", "true");

    clubResult.hidden = true;
    clubShuffle.hidden = false;
    clubStatus.textContent = "";

    // Keep keyboard focus on an available control during the shuffle.
    backSetupButton.focus({ preventScroll: true });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const duration = reducedMotion ? 0 : 2800;
    const startedAt = performance.now();

    function finishReveal() {
      selectedClub = nextClub;
      lastRevealedClubId = nextClub.id;

      renderClub(nextClub);

      clubShuffle.hidden = true;
      clubResult.hidden = false;

      isRevealing = false;
      revealTimer = null;
      clubScreen.removeAttribute("aria-busy");

      clubTitle.focus({ preventScroll: true });
    }

    function shuffleTick() {
      if (thisReveal !== revealVersion) {
        return;
      }

      const elapsed = performance.now() - startedAt;

      if (elapsed >= duration) {
        finishReveal();
        return;
      }

      shuffleName.textContent = clubs[randomIndex(clubs.length)].name;

      // The shuffle slows down as it approaches the reveal.
      const progress = elapsed / duration;
      const delay = 80 + Math.pow(progress, 3) * 320;

      revealTimer = window.setTimeout(shuffleTick, delay);
    }

    shuffleTick();
  }

  newChallengeButton.addEventListener("click", () => {
    cancelReveal();
    updateDifficultySelection();
    showScreen(difficultyScreen);
    difficultyTitle.focus({ preventScroll: true });
  });

  backHomeButton.addEventListener("click", () => {
    cancelReveal();
    showScreen(homeScreen);
    newChallengeButton.focus({ preventScroll: true });
  });

  backSetupButton.addEventListener("click", () => {
    cancelReveal();
    updateDifficultySelection();
    showScreen(difficultyScreen);
    difficultyTitle.focus({ preventScroll: true });
  });

  difficultyInputs.forEach((input) => {
    input.addEventListener("change", updateDifficultySelection);
  });

  generateButton.addEventListener("click", startClubDraw);
  rerollButton.addEventListener("click", startClubDraw);

  viewChallengeButton.addEventListener("click", () => {
    if (selectedClub === null || isRevealing) {
      return;
    }

    clubStatus.textContent =
      `${selectedClub.name} selected on ` +
      `${difficultyNames[selectedDifficulty]} difficulty. ` +
      "The full challenge briefing is the next feature we’re adding.";
  });

  updateDifficultySelection();
})();

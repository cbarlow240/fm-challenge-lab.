"use strict";

(() => {
  const byId = (id) => document.getElementById(id);

  const screens = [
    byId("home-screen"),
    byId("difficulty-screen"),
    byId("club-screen"),
    byId("briefing-screen")
  ];

  const difficultyNames = {
    rookie: "Rookie",
    professional: "Professional",
    veteran: "Veteran",
    legendary: "Legendary"
  };

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

  // Demonstration lineups and ratings, not verified FM24 attributes.
  // Order: striker, left/central/right attacking midfielders,
  // two defensive midfielders, four defenders, goalkeeper.
  const starterLineups = {
    sunderland: [
      ["Nazariy Rusyn", "Rusyn", 6.8],
      ["Jack Clarke", "Clarke", 8.1],
      ["Alex Pritchard", "Pritchard", 7.3],
      ["Patrick Roberts", "Roberts", 7.7],
      ["Dan Neil", "Neil", 7.4],
      ["Pierre Ekwah", "Ekwah", 7.1],
      ["Dennis Cirkin", "Cirkin", 7.4],
      ["Luke O’Nien", "O’Nien", 7.0],
      ["Dan Ballard", "Ballard", 7.6],
      ["Trai Hume", "Hume", 7.5],
      ["Anthony Patterson", "Patterson", 7.6]
    ],
    ipswich: [
      ["George Hirst", "Hirst", 7.2],
      ["Nathan Broadhead", "Broadhead", 7.5],
      ["Conor Chaplin", "Chaplin", 7.8],
      ["Wes Burns", "Burns", 7.4],
      ["Massimo Luongo", "Luongo", 7.2],
      ["Sam Morsy", "Morsy", 7.7],
      ["Leif Davis", "Davis", 7.8],
      ["Cameron Burgess", "Burgess", 7.1],
      ["Luke Woolfenden", "Woolfenden", 7.3],
      ["Harry Clarke", "Clarke", 7.0],
      ["Václav Hladký", "Hladký", 7.1]
    ],
    leicester: [
      ["Jamie Vardy", "Vardy", 8.0],
      ["Stephy Mavididi", "Mavididi", 7.8],
      ["Kiernan Dewsbury-Hall", "Dewsbury-Hall", 8.4],
      ["Abdul Fatawu", "Fatawu", 7.5],
      ["Harry Winks", "Winks", 8.0],
      ["Wilfred Ndidi", "Ndidi", 8.2],
      ["James Justin", "Justin", 7.8],
      ["Jannik Vestergaard", "Vestergaard", 7.6],
      ["Wout Faes", "Faes", 7.9],
      ["Ricardo Pereira", "Pereira", 8.2],
      ["Mads Hermansen", "Hermansen", 7.8]
    ]
  };

  // Shared demonstration formation.
  // These assignments will be refined using the squad data.
  const tacticalPositions = [
    ["ST (C)", "Striker", "Advanced Forward", "Attack"],
    ["AM (L)", "Attacking midfielder", "Winger", "Attack"],
    ["AM (C)", "Attacking midfielder", "Attacking Midfielder", "Support"],
    ["AM (R)", "Attacking midfielder", "Inverted Winger", "Support"],
    ["DM (L)", "Defensive midfielder", "Deep-Lying Playmaker", "Support"],
    ["DM (R)", "Defensive midfielder", "Defensive Midfielder", "Defend"],
    ["D (L)", "Defender", "Full-Back", "Support"],
    ["D (CL)", "Defender", "Central Defender", "Defend"],
    ["D (CR)", "Defender", "Central Defender", "Defend"],
    ["D (R)", "Defender", "Wing-Back", "Support"],
    ["GK", "Goalkeeper", "Sweeper Keeper", "Defend"]
  ];

  const formationRows = [
    [0],
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9],
    [10]
  ];

  let selectedDifficulty = null;
  let selectedClub = null;
  let lastRevealedClubId = null;
  let revealTimer = null;
  let revealVersion = 0;
  let isRevealing = false;

  function showScreen(id) {
    screens.forEach((screen) => {
      screen.hidden = screen.id !== id;
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function updateDifficultySelection() {
    const selectedInput = document.querySelector(
      'input[name="difficulty"]:checked'
    );

    selectedDifficulty = selectedInput ? selectedInput.value : null;
    byId("generate-button").disabled = selectedDifficulty === null;

    byId("difficulty-status").textContent = selectedDifficulty
      ? `${difficultyNames[selectedDifficulty]} selected. Ready for your challenge.`
      : "Select a difficulty to continue.";
  }

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
    byId("club-screen").removeAttribute("aria-busy");
  }

  function createTextElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function renderClub(club) {
    byId("club-title").textContent = club.name;
    byId("club-initials").textContent = club.initials;

    byId("club-crest").style.setProperty("--club-colour", club.colour);
    byId("club-crest").setAttribute(
      "aria-label",
      `${club.name} placeholder badge`
    );

    byId("club-country").textContent = club.country;
    byId("club-league").textContent = club.league;
    byId("club-difficulty").textContent =
      difficultyNames[selectedDifficulty];

    byId("club-introduction").textContent = club.introduction;

    const honoursContainer = byId("club-honours");
    honoursContainer.replaceChildren();

    club.honours.forEach((honour) => {
      const card = document.createElement("div");
      card.className = "honour-card";

      card.append(
        createTextElement("strong", "honour-count", honour.count),
        createTextElement("span", "honour-name", honour.name),
        createTextElement("span", "honour-year", honour.year)
      );

      honoursContainer.append(card);
    });
  }

  function startClubDraw() {
    if (selectedDifficulty === null || isRevealing) {
      return;
    }

    const eligibleClubs = clubs.filter(
      (club) => club.id !== lastRevealedClubId
    );

    if (eligibleClubs.length === 0) {
      byId("club-status").textContent =
        "No different club is available. Widen your club filters.";
      return;
    }

    const nextClub = eligibleClubs[randomIndex(eligibleClubs.length)];

    cancelReveal();
    isRevealing = true;

    const thisReveal = revealVersion;

    showScreen("club-screen");
    byId("club-screen").setAttribute("aria-busy", "true");
    byId("club-result").hidden = true;
    byId("club-shuffle").hidden = false;
    byId("club-status").textContent = "";

    byId("back-setup-button").focus({ preventScroll: true });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const duration = reducedMotion ? 0 : 2800;
    const startedAt = performance.now();

    function finishReveal() {
      selectedClub = nextClub;
      lastRevealedClubId = nextClub.id;

      renderClub(nextClub);

      byId("club-shuffle").hidden = true;
      byId("club-result").hidden = false;
      byId("club-screen").removeAttribute("aria-busy");

      isRevealing = false;
      revealTimer = null;

      byId("club-title").focus({ preventScroll: true });
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

      byId("shuffle-name").textContent =
        clubs[randomIndex(clubs.length)].name;

      const progress = elapsed / duration;
      const delay = 80 + Math.pow(progress, 3) * 320;

      revealTimer = window.setTimeout(shuffleTick, delay);
    }

    shuffleTick();
  }

  function getLineup() {
    if (!selectedClub) {
      return [];
    }

    return starterLineups[selectedClub.id].map((player, index) => {
      const assignment = tacticalPositions[index];

      return {
        name: player[0],
        shortName: player[1],
        rating: player[2],
        pitchPosition: assignment[0],
        position: assignment[1],
        role: assignment[2],
        duty: assignment[3]
      };
    });
  }

  function showPlayerDetails(index, announce = true) {
    const player = getLineup()[index];

    if (!player) {
      return;
    }

    byId("selected-player-name").textContent = player.name;
    byId("selected-player-position").textContent = player.position;
    byId("selected-player-rating-value").textContent =
      player.rating.toFixed(1);

    byId("selected-player-rating-caption").textContent =
      "League-relative quality · provisional demonstration rating";

    byId("selected-player-pitch-position").textContent =
      player.pitchPosition;

    byId("selected-player-role").textContent = player.role;
    byId("selected-player-duty").textContent = player.duty;

    byId("selected-player-rating").hidden = false;
    byId("selected-player-rating-caption").hidden = false;
    byId("selected-player-facts").hidden = false;

    byId("tactics-players")
      .querySelectorAll(".tactics-player")
      .forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(Number(button.dataset.playerIndex) === index)
        );
      });

    if (announce) {
      byId("briefing-status").textContent =
        `Demonstration data: ${player.name}, ${player.role}, ` +
        `${player.duty}. Provisional rating: ${player.rating.toFixed(1)} out of 10.`;
    }
  }

  function renderTactics() {
    const lineup = getLineup();
    const container = byId("tactics-players");

    container.replaceChildren();

    byId("briefing-title").textContent = selectedClub.name;
    byId("briefing-league").textContent = selectedClub.league;
    byId("briefing-difficulty").textContent =
      difficultyNames[selectedDifficulty];

    byId("formation-title").textContent = "4-2-3-1";
    byId("tactics-pitch").setAttribute(
      "aria-label",
      `${selectedClub.name} demonstration starting eleven in a 4-2-3-1 formation`
    );

    byId("tactics-pitch").style.setProperty(
      "--club-colour",
      selectedClub.colour
    );

    formationRows.forEach((indexes) => {
      const row = document.createElement("div");
      row.className = "tactics-row";
      row.dataset.count = indexes.length;
      row.style.setProperty("--players", indexes.length);

      indexes.forEach((index) => {
        const player = lineup[index];

        const button = document.createElement("button");
        button.type = "button";
        button.className = "tactics-player";
        button.dataset.playerIndex = index;
        button.setAttribute("aria-pressed", "false");
        button.setAttribute(
          "aria-label",
          `${player.name}, ${player.pitchPosition}, ` +
          `${player.role}, ${player.duty}. View player details.`
        );

        if (player.pitchPosition === "GK") {
          button.classList.add("is-goalkeeper");
        }

        // Position labels avoid inventing squad shirt numbers.
        const shirt = createTextElement(
          "span",
          "player-shirt",
          player.pitchPosition === "GK" ? "GK" : ""
        );
        shirt.setAttribute("aria-hidden", "true");

        button.append(
          shirt,
          createTextElement("span", "player-pitch-name", player.shortName),
          createTextElement("span", "player-pitch-role", player.role),
          createTextElement("span", "player-pitch-duty", player.duty)
        );

        button.addEventListener("click", () => {
          showPlayerDetails(index);
        });

        row.append(button);
      });

      container.append(row);
    });

    showPlayerDetails(4, false);

    byId("briefing-status").textContent =
      "Starter preview: lineups, tactical assignments, and ratings " +
      "are demonstration data pending FM24 verification.";
  }

  byId("new-challenge-button").addEventListener("click", () => {
    cancelReveal();
    updateDifficultySelection();
    showScreen("difficulty-screen");
    byId("difficulty-title").focus({ preventScroll: true });
  });

  byId("back-home-button").addEventListener("click", () => {
    cancelReveal();
    showScreen("home-screen");
    byId("new-challenge-button").focus({ preventScroll: true });
  });

  byId("back-setup-button").addEventListener("click", () => {
    cancelReveal();
    updateDifficultySelection();
    showScreen("difficulty-screen");
    byId("difficulty-title").focus({ preventScroll: true });
  });

  document.querySelectorAll('input[name="difficulty"]').forEach((input) => {
    input.addEventListener("change", updateDifficultySelection);
  });

  byId("generate-button").addEventListener("click", startClubDraw);
  byId("reroll-button").addEventListener("click", startClubDraw);

  byId("view-challenge-button").addEventListener("click", () => {
    if (!selectedClub || isRevealing) {
      return;
    }

    renderTactics();
    showScreen("briefing-screen");
    byId("briefing-title").focus({ preventScroll: true });
  });

  byId("back-club-button").addEventListener("click", () => {
    if (!selectedClub) {
      return;
    }

    showScreen("club-screen");
    byId("view-challenge-button").focus({ preventScroll: true });
  });

  updateDifficultySelection();
})();

"use strict";

(() => {
  const byId = (id) => document.getElementById(id);

    const screenIds = [
    "home-screen",
    "difficulty-screen",
    "club-screen",
    "briefing-screen",
    "careers-screen"
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
        [6, "English league titles", "Last won: 1936"],
        [2, "FA Cups", "Last won: 1973"],
        [1, "Charity Shield", "Won: 1936"]
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
        [1, "English league title", "Won: 1962"],
        [1, "FA Cup", "Won: 1978"],
        [1, "UEFA Cup", "Won: 1981"]
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
        [1, "Premier League title", "Won: 2016"],
        [1, "FA Cup", "Won: 2021"],
        [3, "League Cups", "Last won: 2000"]
      ]
    }
  ];

  // Partial demonstration squads. Ratings are provisional.
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

  const tacticalPositions = [
    ["ST (C)", "Striker", "Advanced Forward", "Attack", "forwards"],
    ["AM (L)", "Attacking midfielder", "Winger", "Attack", "forwards"],
    ["AM (C)", "Attacking midfielder", "Attacking Midfielder", "Support", "midfielders"],
    ["AM (R)", "Attacking midfielder", "Inverted Winger", "Support", "forwards"],
    ["DM (L)", "Defensive midfielder", "Deep-Lying Playmaker", "Support", "midfielders"],
    ["DM (R)", "Defensive midfielder", "Defensive Midfielder", "Defend", "midfielders"],
    ["D (L)", "Defender", "Full-Back", "Support", "defenders"],
    ["D (CL)", "Defender", "Central Defender", "Defend", "defenders"],
    ["D (CR)", "Defender", "Central Defender", "Defend", "defenders"],
    ["D (R)", "Defender", "Wing-Back", "Support", "defenders"],
    ["GK", "Goalkeeper", "Sweeper Keeper", "Defend", "goalkeepers"]
  ];

  const formationRows = [
    [0],
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9],
    [10]
  ];

  const positionGroups = [
    ["goalkeepers", "Goalkeepers"],
    ["defenders", "Defenders"],
    ["midfielders", "Midfielders"],
    ["forwards", "Forwards"]
  ];

  const squads = new Map();

  let selectedDifficulty = null;
  let selectedClub = null;
  let lastRevealedClubId = null;
  let revealTimer = null;
  let revealVersion = 0;
  let isRevealing = false;
  let nextPlayerId = 1;
  let activeTab = "tactics";
  let lastRemoval = null;

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function showScreen(id) {
    screenIds.forEach((screenId) => {
      byId(screenId).hidden = screenId !== id;
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function announce(message) {
    byId("briefing-status").textContent = message;
  }

  function updateDifficultySelection() {
    const input = document.querySelector(
      'input[name="difficulty"]:checked'
    );

    selectedDifficulty = input ? input.value : null;
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

  function renderClub(club) {
    byId("club-title").textContent = club.name;
    byId("club-initials").textContent = club.initials;
    byId("club-country").textContent = club.country;
    byId("club-league").textContent = club.league;
    byId("club-difficulty").textContent =
      difficultyNames[selectedDifficulty];
    byId("club-introduction").textContent = club.introduction;

    byId("club-crest").style.setProperty("--club-colour", club.colour);
    byId("club-crest").setAttribute(
      "aria-label",
      `${club.name} placeholder badge`
    );

    byId("club-honours").replaceChildren();

    club.honours.forEach(([count, name, year]) => {
      const card = document.createElement("div");
      card.className = "honour-card";

      card.append(
        textElement("strong", "honour-count", count),
        textElement("span", "honour-name", name),
        textElement("span", "honour-year", year)
      );

      byId("club-honours").append(card);
    });
  }

  function startClubDraw() {
    if (selectedDifficulty === null || isRevealing) {
      return;
    }

    const eligible = clubs.filter(
      (club) => club.id !== lastRevealedClubId
    );

    if (!eligible.length) {
      byId("club-status").textContent =
        "No different club is available. Widen your club filters.";
      return;
    }

       if (!prepareNewDraft()) {
      return;
    }

    const nextClub = eligible[randomIndex(eligible.length)];
    cancelReveal();
    isRevealing = true;

    const thisReveal = revealVersion;
    const startedAt = performance.now();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = reducedMotion ? 0 : 2800;

    showScreen("club-screen");
    byId("club-screen").setAttribute("aria-busy", "true");
    byId("club-result").hidden = true;
    byId("club-shuffle").hidden = false;
    byId("club-status").textContent = "";
    byId("back-setup-button").focus({ preventScroll: true });

    function tick() {
      if (thisReveal !== revealVersion) {
        return;
      }

      const elapsed = performance.now() - startedAt;

      if (elapsed >= duration) {
        selectedClub = nextClub;
        lastRevealedClubId = nextClub.id;
        renderClub(nextClub);

        byId("club-shuffle").hidden = true;
        byId("club-result").hidden = false;
        byId("club-screen").removeAttribute("aria-busy");

        isRevealing = false;
        revealTimer = null;
        byId("club-title").focus({ preventScroll: true });
        return;
      }

      byId("shuffle-name").textContent =
        clubs[randomIndex(clubs.length)].name;

      const delay = 80 + Math.pow(elapsed / duration, 3) * 320;
      revealTimer = window.setTimeout(tick, delay);
    }

    tick();
  }

  function getSquad() {
    if (!squads.has(selectedClub.id)) {
      const players = starterLineups[selectedClub.id].map(
        ([name, shortName, rating], index) => ({
          id: nextPlayerId++,
          name,
          shortName,
          rating,
          age: null,
          positions: tacticalPositions[index][0],
          group: tacticalPositions[index][4]
        })
      );

      squads.set(selectedClub.id, {
        players,
        startingIds: players.map((player) => player.id)
      });
    }

    return squads.get(selectedClub.id);
  }

  function getLineup() {
    const squad = getSquad();

    return tacticalPositions.map((assignment, index) => {
      const player = squad.players.find(
        (candidate) => candidate.id === squad.startingIds[index]
      );

      return {
        name: player ? player.name : "Vacant position",
        shortName: player ? player.shortName : "Vacant",
        rating: player ? player.rating : null,
        vacant: !player,
        pitchPosition: assignment[0],
        position: assignment[1],
        role: assignment[2],
        duty: assignment[3]
      };
    });
  }

  function clearPlayerDetails() {
    byId("selected-player-name").textContent = "Select a player";
    byId("selected-player-position").textContent = "";
    byId("selected-player-rating").hidden = true;
    byId("selected-player-rating-caption").hidden = true;
    byId("selected-player-facts").hidden = true;
  }

  function showPlayerDetails(index, shouldAnnounce = true) {
    const player = getLineup()[index];

    if (!player || player.vacant) {
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

    if (shouldAnnounce) {
      announce(
        `${player.name}, ${player.role}, ${player.duty}. ` +
        `Provisional rating: ${player.rating.toFixed(1)} out of 10.`
      );
    }
  }

  function renderTactics() {
    const lineup = getLineup();
    const container = byId("tactics-players");
    container.replaceChildren();

    byId("formation-title").textContent = "4-2-3-1";
    byId("tactics-pitch").style.setProperty(
      "--club-colour",
      selectedClub.colour
    );
    byId("tactics-pitch").setAttribute(
      "aria-label",
      `${selectedClub.name} demonstration 4-2-3-1 lineup`
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
        button.disabled = player.vacant;
        button.setAttribute("aria-pressed", "false");
        button.setAttribute(
          "aria-label",
          `${player.name}, ${player.pitchPosition}, ` +
          `${player.role}, ${player.duty}`
        );

        if (player.pitchPosition === "GK") {
          button.classList.add("is-goalkeeper");
        }

        const shirt = textElement(
          "span",
          "player-shirt",
          player.pitchPosition === "GK" ? "GK" : ""
        );
        shirt.setAttribute("aria-hidden", "true");

        button.append(
          shirt,
          textElement("span", "player-pitch-name", player.shortName),
          textElement("span", "player-pitch-role", player.role),
          textElement("span", "player-pitch-duty", player.duty)
        );

        button.addEventListener("click", () => showPlayerDetails(index));
        row.append(button);
      });

      container.append(row);
    });

    clearPlayerDetails();

    const firstAvailable = lineup.findIndex((player) => !player.vacant);
    const preferred = !lineup[4].vacant ? 4 : firstAvailable;

    if (preferred >= 0) {
      showPlayerDetails(preferred, false);
    }
  }

  function updateUndoNotice() {
    const relevant = lastRemoval &&
      lastRemoval.clubId === selectedClub.id;

    byId("squad-undo").hidden = !relevant;

    if (relevant) {
      byId("squad-undo-message").textContent =
        `${lastRemoval.player.name} removed from your squad.`;
    }
  }

  function removePlayer(playerId) {
    const squad = getSquad();
    const index = squad.players.findIndex(
      (player) => player.id === playerId
    );

    if (index < 0) {
      return;
    }

    const player = squad.players[index];

    lastRemoval = {
      clubId: selectedClub.id,
      player,
      index
    };

    squad.players.splice(index, 1);

    renderSquad();
    renderTactics();

    announce(`${player.name} removed. Use Undo to restore them.`);
    byId("undo-remove-button").focus({ preventScroll: true });
  }

  function renderSquad() {
    const squad = getSquad();
    const container = byId("squad-groups");
    const sort = byId("squad-sort").value;

    container.replaceChildren();
    byId("squad-player-count").textContent = squad.players.length;

    positionGroups.forEach(([groupId, groupName]) => {
      const members = squad.players.filter(
        (player) => player.group === groupId
      );

      if (sort === "rating") {
        members.sort(
          (a, b) => b.rating - a.rating || a.name.localeCompare(b.name)
        );
      } else if (sort === "name") {
        members.sort((a, b) => a.name.localeCompare(b.name));
      }

      const section = document.createElement("section");
      section.className = "squad-group";

      const heading = document.createElement("div");
      heading.className = "squad-group-heading";
      heading.append(
        textElement("h4", "", groupName),
        textElement(
          "span",
          "squad-group-count",
          `${members.length} ${members.length === 1 ? "player" : "players"}`
        )
      );
      section.append(heading);

      if (!members.length) {
        section.append(
          textElement("p", "squad-empty", "No players in this group.")
        );
        container.append(section);
        return;
      }

      const table = document.createElement("table");
      table.className = "squad-table";
      table.setAttribute("aria-label", `${groupName} squad list`);

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      [
        ["Player", ""],
        ["Age", "squad-age-column"],
        ["Pos.", "squad-position-column"],
        ["/ 10", "squad-rating-column"],
        ["", "squad-action-column"]
      ].forEach(([label, className]) => {
        const cell = textElement("th", className, label);
        cell.scope = "col";

        if (!label) {
          cell.setAttribute("aria-label", "Remove player");
        }

        headerRow.append(cell);
      });

      thead.append(headerRow);
      table.append(thead);

      const tbody = document.createElement("tbody");

      members.forEach((player) => {
        const row = document.createElement("tr");

        row.append(
          textElement("td", "squad-player-name", player.name),
          textElement("td", "squad-player-age", player.age ?? "—"),
          textElement("td", "squad-player-position", player.positions)
        );

        const ratingCell = document.createElement("td");
        ratingCell.append(
          textElement(
            "span",
            "squad-player-rating",
            player.rating.toFixed(1)
          )
        );
        row.append(ratingCell);

        const actionCell = document.createElement("td");
        const remove = textElement(
          "button",
          "squad-remove-button",
          "×"
        );

        remove.type = "button";
        remove.setAttribute("aria-label", `Remove ${player.name}`);
        remove.addEventListener("click", () => removePlayer(player.id));

        actionCell.append(remove);
        row.append(actionCell);
        tbody.append(row);
      });

      table.append(tbody);
      section.append(table);
      container.append(section);
    });

        updateUndoNotice();
    persistActiveCareer();
  }

    function switchTab(tab) {
    activeTab = tab;

    const panels = {
      tactics: "tactics-panel",
      squad: "squad-panel",
      policies: "policies-panel",
      season: "season-panel"
    };

    Object.entries(panels).forEach(([name, panelId]) => {
      byId(panelId).hidden = name !== tab;

      const button = byId(`${name}-tab-button`);
      const selected = name === tab;

      button.classList.toggle("is-active", selected);

      if (selected) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    if (tab === "squad") {
      renderSquad();

      announce(
        "Partial starter squad with provisional ratings. " +
        "A dash means the player’s age has not been verified. " +
        "Changes are not saved after a page refresh."
      );
    } else if (tab === "policies") {
      renderPolicies();

      announce(
        "Season 1 transfer policies. Follow all rules together; " +
        "existing players are not affected."
      );
    } else if (tab === "season") {
      renderSeasonChallenge();

      announce(
        "Season 1 objectives and provisional prediction. " +
        "Bonus objectives are optional."
      );
    } else {
      renderTactics();

      announce(
        "Demonstration lineup, tactical assignments, and ratings. " +
        "Vacant positions indicate removed starting players."
      );
    }
  }

  function openBriefing() {
    if (!selectedClub || isRevealing) {
      return;
    }

    getSquad();

    byId("briefing-title").textContent = selectedClub.name;
    byId("briefing-league").textContent = selectedClub.league;
    byId("briefing-difficulty").textContent =
      difficultyNames[selectedDifficulty];

    byId("signing-form").hidden = true;
    byId("signing-form").reset();

    switchTab("tactics");
            byId("season-results-form").reset();
    byId("season-results-form").hidden = true;
    byId("season-results-status").textContent = "";

    refreshSeasonLabels();
    showScreen("briefing-screen");
    byId("briefing-title").focus({ preventScroll: true });
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
  byId("view-challenge-button").addEventListener("click", openBriefing);

  byId("back-club-button").addEventListener("click", () => {
    if (!selectedClub) {
      return;
    }

    showScreen("club-screen");
    byId("view-challenge-button").focus({ preventScroll: true });
  });

  byId("squad-tab-button").disabled = false;

  byId("tactics-tab-button").addEventListener("click", () => {
    switchTab("tactics");
  });

  byId("squad-tab-button").addEventListener("click", () => {
    switchTab("squad");
  });

  byId("squad-sort").addEventListener("change", () => {
    renderSquad();
    announce("Squad sorting updated within each position group.");
  });

  byId("add-signing-button").addEventListener("click", () => {
    byId("signing-form").hidden = false;
    byId("signing-form").elements.namedItem("playerName").focus();
  });

  byId("cancel-signing-button").addEventListener("click", () => {
    byId("signing-form").reset();
    byId("signing-form").hidden = true;
    byId("add-signing-button").focus();
  });

  byId("signing-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = byId("signing-form");

    if (!form.reportValidity() || !selectedClub) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("playerName")).trim();
    const positions = String(data.get("positions")).trim();
    const age = Number(data.get("age"));
    const rating = Number(data.get("rating"));
    const group = String(data.get("group"));

    const validGroup = positionGroups.some(
      ([groupId]) => groupId === group
    );

    if (
      !name ||
      !positions ||
      !Number.isInteger(age) ||
      age < 14 ||
      age > 60 ||
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 10 ||
      !validGroup
    ) {
      announce("Enter a valid name, positions, age, group, and rating.");
      return;
    }

    getSquad().players.push({
      id: nextPlayerId++,
      name,
      shortName: name,
      age,
      positions,
      group,
      rating
    });

    form.reset();
    form.hidden = true;
    renderSquad();

    announce(`${name} added to your squad with your entered rating.`);
    byId("add-signing-button").focus();
  });

  byId("undo-remove-button").addEventListener("click", () => {
    if (!lastRemoval || lastRemoval.clubId !== selectedClub.id) {
      return;
    }

    const removal = lastRemoval;
    getSquad().players.splice(removal.index, 0, removal.player);
            lastRemoval = null;
    seasonProgress = career.progress
      ? structuredClone(career.progress)
      : createInitialSeasonProgress();
    seasonProgress = null;

    renderSquad();
    renderTactics();

    announce(`${removal.player.name} restored to your squad.`);
    byId("squad-tab-button").focus({ preventScroll: true });
  });

    /* Season 1 transfer policies */

  const savedPolicySets = new Map();

  const policySettings = {
    rookie: {
      arrivals: [8, 9, 10]
    },
    professional: {
      arrivals: [6, 7],
      budget: [85, 90]
    },
    veteran: {
      arrivals: [4, 5],
      age: [26, 27],
      wages: [100]
    },
    legendary: {
      arrivals: [3, 4],
      age: [23, 24],
      wages: [80, 90],
      budget: [70, 75]
    }
  };

  function choosePolicyLimit(options) {
    return options[randomIndex(options.length)];
  }

  function createArrivalPolicy(limit) {
    return {
      category: "arrivals",
      title: "Make every signing count",
      rule:
        `Bring in no more than ${limit} players during Season 1. ` +
        "Permanent signings and incoming loans both count.",
      reason:
        "A smaller recruitment window encourages you to prioritise " +
        "the positions that need the most attention.",
      example:
        `${limit - 1} permanent signings and one incoming loan ` +
        `would use all ${limit} places.`,
      clarification:
        "Contract renewals, youth promotions, and your own players " +
        "returning from loan do not count as new arrivals."
    };
  }

  function createBudgetPolicy(percent) {
    return {
      category: "budget",
      title: "Keep money in reserve",
      rule:
        `Spend no more than ${percent}% of your Season 1 transfer allowance ` +
        "on guaranteed incoming transfer fees and loan fees.",
      reason:
        "Keeping a reserve gives your club room to manage unexpected " +
        "costs while still strengthening the squad.",
      example:
        `With a £1 million allowance, your combined guaranteed fees ` +
        `must stay at or below £${(percent * 10000).toLocaleString("en-GB")}.`,
      clarification:
        "Record the available transfer budget when you start. Add any " +
        "extra funds the board actually makes available during the season, " +
        "including retained sale proceeds. Count guaranteed instalments " +
        "even if they are payable later. Wages are handled separately."
    };
  }

  function createAgePolicy(ageLimit) {
    return {
      category: "age",
      title: "Build for the future",
      rule:
        `Every new signing must be aged ${ageLimit} or younger ` +
        "on the day they join your club.",
      reason:
        "Recruit players who can develop alongside the club " +
        "over your five-season challenge.",
      example:
        `A ${ageLimit}-year-old arriving now meets this rule. ` +
        `A ${ageLimit + 1}-year-old does not.`,
      clarification:
        "This applies to permanent signings, free agents, and incoming " +
        "loans. Existing players can stay and renew their contracts. " +
        "A signing becoming older later does not break the rule."
    };
  }

  function createWagePolicy(percent) {
    return {
      category: "wages",
      title: "Protect the wage structure",
      rule:
        `Your basic weekly wage contribution for each new signing ` +
        `must not exceed ${percent}% of the highest basic weekly wage ` +
        "already paid by your club when this challenge starts.",
      reason:
        "Recruit within the club’s existing salary structure " +
        "rather than depending on expensive new stars.",
      example:
        `If the starting highest basic wage is £20,000 per week, ` +
        `the limit is £${(20000 * percent / 100).toLocaleString("en-GB")} ` +
        "per week for each arrival.",
      clarification:
        "For a loan, count only the basic wage your club pays. " +
        "Record the starting highest wage once; new signings cannot raise " +
        "this limit. Existing players and their renewals are exempt. " +
        "The board’s overall wage budget still applies."
    };
  }

  function getPolicies() {
    const key = challengeCacheKey();

    if (!savedPolicySets.has(key)) {
            const settings = settingsForCurrentSeason();
      const policies = [];

      policies.push(
        createArrivalPolicy(choosePolicyLimit(settings.arrivals))
      );

      if (settings.age) {
        policies.push(
          createAgePolicy(choosePolicyLimit(settings.age))
        );
      }

      if (settings.wages) {
        policies.push(
          createWagePolicy(choosePolicyLimit(settings.wages))
        );
      }

      if (settings.budget) {
        policies.push(
          createBudgetPolicy(choosePolicyLimit(settings.budget))
        );
      }

      // One rule per category avoids duplicate or opposing requirements.
      // Every rule is a ceiling; none forces a conflicting signing.
            const progress = getSeasonProgress();

      policies.forEach((policy) => {
        policy.rule = policy.rule.replaceAll(
          "Season 1",
          `Season ${progress.season}`
        );

        policy.rule = policy.rule.replaceAll(
          "when this challenge starts",
          "when this season starts"
        );

        policy.clarification = policy.clarification.replaceAll(
          "when you start",
          "when this season starts"
        );

        if (
          policy.category === "budget" &&
          progress.transferBudget !== null
        ) {
          const percentage = Number(
            policy.rule.match(/(\d+)%/)[1]
          );

          const spendingLimit =
            progress.transferBudget * percentage / 100;

          policy.clarification +=
            ` Your recorded starting transfer budget is ` +
            `${formatBudget(progress.transferBudget)}. ` +
            `That gives an initial spending limit of ` +
            `${formatBudget(spendingLimit)} before any additional ` +
            "funds the board makes available.";
        }

        if (
          policy.category === "wages" &&
          progress.highestWeeklyWage !== null
        ) {
          const percentage = Number(
            policy.rule.match(/(\d+)%/)[1]
          );

          const wageLimit =
            progress.highestWeeklyWage * percentage / 100;

          policy.clarification +=
            ` Your recorded starting highest basic wage is ` +
            `${formatBudget(progress.highestWeeklyWage)} per week. ` +
            `The limit for each arrival is therefore ` +
            `${formatBudget(wageLimit)} per week.`;
        }
      });

      const categories = new Set(
        policies.map((policy) => policy.category)
      );

      if (categories.size !== policies.length || policies.length > 4) {
        throw new Error("Invalid transfer policy combination.");
      }

      savedPolicySets.set(key, policies);
    }

    return savedPolicySets.get(key);
  }

  function renderPolicies() {
    const policies = getPolicies();
    const container = byId("policy-list");

    container.replaceChildren();

    byId("policies-count").textContent =
      `${policies.length} ${policies.length === 1 ? "policy" : "policies"}`;

    policies.forEach((policy, index) => {
      const card = document.createElement("article");
      card.className = "policy-card";

      const heading = document.createElement("div");
      heading.className = "policy-card-heading";

      heading.append(
        textElement("span", "policy-number", index + 1),
        textElement("h4", "", policy.title)
      );

      const example = document.createElement("div");
      example.className = "policy-example";

      example.append(
        textElement(
          "span",
          "policy-example-label",
          "Example within this rule"
        ),
        textElement("p", "", policy.example)
      );

      card.append(
        heading,
        textElement("p", "policy-rule", policy.rule),
        textElement("p", "policy-reason", policy.reason),
        example,
        textElement("p", "policy-exception", policy.clarification)
      );

      container.append(card);
    });
  }

  byId("policies-tab-button").disabled = false;

  byId("policies-tab-button").addEventListener("click", () => {
    switchTab("policies");
  });

    /* Season 1 objectives and provisional forecasts */

  const savedSeasonChallenges = new Map();

  // Illustrative starting forecasts, not validated FM24 predictions.
  const clubSeasonProfiles = {
    sunderland: {
      baselineFinish: 10,
      targets: {
        rookie: 16,
        professional: 10,
        veteran: 6,
        legendary: 2
      },
      context:
        "This preview treats Sunderland as a side capable of " +
        "competing in the upper half of the Championship."
    },
    ipswich: {
      baselineFinish: 8,
      targets: {
        rookie: 16,
        professional: 10,
        veteran: 6,
        legendary: 2
      },
      context:
        "This preview gives Ipswich a promising starting position, " +
        "with the potential to challenge in the upper half."
    },
    leicester: {
      baselineFinish: 2,
      targets: {
        rookie: 6,
        professional: 2,
        veteran: 2,
        legendary: 1
      },
      context:
        "This preview treats Leicester as one of the strongest " +
        "squads in the Championship and a promotion contender."
    }
  };

  const seasonBonusSettings = {
    rookie: {
      goals: 55,
      cupTitle: "Reach the FA Cup fourth round",
      cupDescription:
        "Progress to the fourth round of the FA Cup."
    },
    professional: {
      goals: 65,
      cupTitle: "Reach the FA Cup fifth round",
      cupDescription:
        "Progress to the fifth round of the FA Cup."
    },
    veteran: {
      goals: 70,
      cupTitle: "Reach an FA Cup quarter-final",
      cupDescription:
        "Reach the quarter-finals of the FA Cup."
    },
    legendary: {
      goals: 75,
      cupTitle: "Reach an FA Cup semi-final",
      cupDescription:
        "Reach the semi-finals of the FA Cup."
    }
  };

  function ordinal(number) {
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${number}th`;
    }

    const endings = {
      1: "st",
      2: "nd",
      3: "rd"
    };

    return `${number}${endings[number % 10] || "th"}`;
  }

  function createMainObjective(target) {
    if (target === 1) {
      return {
        title: "Win the Championship",
        description:
          "Finish first in the final Championship league table. " +
          "Promotion through the play-offs does not meet this target."
      };
    }

    if (target === 2) {
      return {
        title: "Finish in the top two",
        description:
          "Secure automatic promotion by finishing first or second " +
          "in the final Championship league table."
      };
    }

    if (target === 6) {
      return {
        title: "Finish in the top six",
        description:
          "Finish sixth or higher in the final Championship league " +
          "table to secure at least a play-off place."
      };
    }

    return {
      title: `Finish ${ordinal(target)} or higher`,
      description:
        `Finish ${ordinal(target)} or higher in the final Championship ` +
        "league table. Cup results and bonus objectives are assessed separately."
    };
  }

  function createPrediction(profile, policies, target) {
    let predictedFinish = profile.baselineFinish;
    const restrictions = [];

    // Simple demonstration adjustments.
    // Each category restricts a different route to squad improvement.
    policies.forEach((policy) => {
      if (policy.category === "arrivals") {
        restrictions.push("the limit on incoming players");
      }

      if (policy.category === "age") {
        predictedFinish += 1;
        restrictions.push("the age limit on new signings");
      }

      if (policy.category === "wages") {
        predictedFinish += 1;
        restrictions.push("the wage ceiling for arrivals");
      }

      if (policy.category === "budget") {
        predictedFinish += 1;
        restrictions.push("the transfer spending reserve");
      }
    });

    predictedFinish = Math.max(1, Math.min(24, predictedFinish));

    const restrictionsText = restrictions.join(", ");

    const targetComparison = target < predictedFinish
      ? `Your main objective of ${ordinal(target)} or higher is more ` +
        "ambitious than this forecast."
      : target === predictedFinish
        ? "Your main objective matches this forecast."
        : "Your main objective leaves room to exceed expectations.";

    return {
      finish: predictedFinish,
      beatTarget: predictedFinish === 1
        ? "Title + 90 points"
        : `${ordinal(predictedFinish - 1)} or higher`,
      explanation:
        `${profile.context} The forecast considers ${restrictionsText}. ` +
        "Recruitment limits may reduce your options when strengthening " +
        `the squad. ${targetComparison} ` +
        "This is an illustrative estimate, not a validated simulation."
    };
  }

  function getSeasonChallenge() {
    const key = challengeCacheKey();

    if (!savedSeasonChallenges.has(key)) {
            if (getSeasonProgress().season > 1) {
        savedSeasonChallenges.set(
          key,
          createAdaptiveSeasonChallenge()
        );

        return savedSeasonChallenges.get(key);
      }

      const profile = clubSeasonProfiles[selectedClub.id];
      const target = profile.targets[selectedDifficulty];
      const bonusSettings = seasonBonusSettings[selectedDifficulty];

      const mainObjective = createMainObjective(target);

      const bonuses = [
        {
          title: bonusSettings.cupTitle,
          description: bonusSettings.cupDescription
        },
        {
          title: `Score ${bonusSettings.goals} league goals`,
          description:
            `Score at least ${bonusSettings.goals} goals across the ` +
            "regular Championship league season. Cup matches and " +
            "play-off matches do not count."
        }
      ];

      const prediction = createPrediction(
        profile,
        getPolicies(),
        target
      );

      savedSeasonChallenges.set(key, {
        mainObjective,
        bonuses,
        prediction
      });
    }

    return savedSeasonChallenges.get(key);
  }

  function renderSeasonChallenge() {
    const challenge = getSeasonChallenge();

    byId("main-objective-title").textContent =
      challenge.mainObjective.title;

    byId("main-objective-description").textContent =
      challenge.mainObjective.description;

    const bonusContainer = byId("bonus-objective-list");
    bonusContainer.replaceChildren();

    challenge.bonuses.forEach((bonus, index) => {
      const card = document.createElement("article");
      card.className = "bonus-card";

      card.append(
        textElement("span", "bonus-label", `Optional bonus ${index + 1}`),
        textElement("h5", "", bonus.title),
        textElement("p", "", bonus.description)
      );

      bonusContainer.append(card);
    });

    byId("predicted-finish").textContent =
      ordinal(challenge.prediction.finish);

    byId("prediction-beat-target").textContent =
      challenge.prediction.beatTarget;

    byId("prediction-explanation").textContent =
      challenge.prediction.explanation;
  }

  byId("season-tab-button").disabled = false;

  byId("season-tab-button").addEventListener("click", () => {
    switchTab("season");
  });

    /* Device-based career saving */

  const careerStorageKey = "fm-challenge-lab-careers-v1";

  let savedCareers = [];
  let currentCareerId = null;
  let careersReturnScreen = "home-screen";
  let storageIssue = "";

  function isValidCareer(career) {
    if (!career || typeof career !== "object") {
      return false;
    }

    const validClub = clubs.some((club) => club.id === career.clubId);
    const validDifficulty = Object.hasOwn(
      difficultyNames,
      career.difficulty
    );

    if (
      typeof career.id !== "string" ||
      typeof career.name !== "string" ||
      !career.name.trim() ||
      career.name.length > 60 ||
      !validClub ||
      !validDifficulty ||
      !Number.isFinite(Date.parse(career.createdAt)) ||
      !Number.isFinite(Date.parse(career.updatedAt))
    ) {
      return false;
    }

    const squad = career.squad;

    if (
      !squad ||
      !Array.isArray(squad.players) ||
      !Array.isArray(squad.startingIds) ||
      squad.startingIds.length !== tacticalPositions.length ||
      !squad.startingIds.every(
        (id) => Number.isSafeInteger(id) && id > 0
      ) ||
      new Set(squad.startingIds).size !== squad.startingIds.length
    ) {
      return false;
    }

    const validPlayers = squad.players.every((player) => (
      player &&
      Number.isSafeInteger(player.id) &&
      player.id > 0 &&
      typeof player.name === "string" &&
      player.name.trim().length > 0 &&
      typeof player.shortName === "string" &&
      typeof player.positions === "string" &&
      positionGroups.some(([group]) => group === player.group) &&
      Number.isFinite(player.rating) &&
      player.rating >= 1 &&
      player.rating <= 10 &&
      (
        player.age === null ||
        (
          Number.isInteger(player.age) &&
          player.age >= 14 &&
          player.age <= 60
        )
      )
    ));

    if (
      !validPlayers ||
      new Set(squad.players.map((player) => player.id)).size !==
        squad.players.length
    ) {
      return false;
    }

    const policies = career.policies;
    const allowedCategories = ["arrivals", "age", "wages", "budget"];

    if (
      !Array.isArray(policies) ||
      policies.length < 1 ||
      policies.length > 4 ||
      !policies.every((policy) => (
        policy &&
        allowedCategories.includes(policy.category) &&
        ["title", "rule", "reason", "example", "clarification"].every(
          (field) => typeof policy[field] === "string"
        )
      )) ||
      new Set(policies.map((policy) => policy.category)).size !==
        policies.length
    ) {
      return false;
    }

    const challenge = career.challenge;

    return Boolean(
      challenge &&
      challenge.mainObjective &&
      typeof challenge.mainObjective.title === "string" &&
      typeof challenge.mainObjective.description === "string" &&
      Array.isArray(challenge.bonuses) &&
      challenge.bonuses.length <= 2 &&
      challenge.bonuses.every((bonus) => (
        bonus &&
        typeof bonus.title === "string" &&
        typeof bonus.description === "string"
      )) &&
      challenge.prediction &&
      Number.isInteger(challenge.prediction.finish) &&
      challenge.prediction.finish >= 1 &&
      challenge.prediction.finish <= 24 &&
      typeof challenge.prediction.beatTarget === "string" &&
            typeof challenge.prediction.explanation === "string" &&
      isValidSeasonProgress(career.progress)
    );
  }

  function loadSavedCareers() {
    try {
      const stored = localStorage.getItem(careerStorageKey);

      if (stored === null) {
        return;
      }

      const parsed = JSON.parse(stored);

      if (
        parsed.version !== 1 ||
        !Array.isArray(parsed.careers) ||
        !parsed.careers.every(isValidCareer) ||
        new Set(parsed.careers.map((career) => career.id)).size !==
          parsed.careers.length
      ) {
        throw new Error("Invalid saved career data.");
      }

      savedCareers = parsed.careers;
    } catch (error) {
      storageIssue =
        "Saved careers could not be read. Existing stored data has " +
        "been left untouched. Check that browser storage is available.";
    }
  }

  function writeSavedCareers(nextCareers) {
    if (storageIssue) {
      byId("careers-status").textContent = storageIssue;
      return false;
    }

    try {
      localStorage.setItem(
        careerStorageKey,
        JSON.stringify({
          version: 1,
          careers: nextCareers
        })
      );

      savedCareers = nextCareers;
      return true;
    } catch (error) {
      const message =
        "Your latest changes could not be saved. Browser storage " +
        "may be full or unavailable. Keep this page open and try again.";

      byId("careers-status").textContent = message;
      announce(message);
      byId("save-career-button").textContent = "Retry Save";
      return false;
    }
  }

  function captureCareer(id, name, existing = null) {
    const now = new Date().toISOString();

    return {
      id,
      name,
      clubId: selectedClub.id,
      difficulty: selectedDifficulty,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
      squad: structuredClone(getSquad()),
      policies: structuredClone(getPolicies()),
            challenge: structuredClone(getSeasonChallenge()),
      progress: structuredClone(getSeasonProgress())
    };
  }

  function careerProgress(career) {
    return JSON.stringify({
      name: career.name,
      clubId: career.clubId,
      difficulty: career.difficulty,
      squad: career.squad,
      policies: career.policies,
            challenge: career.challenge,
      progress: career.progress
    });
  }

  function persistActiveCareer() {
    if (!currentCareerId || !selectedClub) {
      return true;
    }

    const existing = savedCareers.find(
      (career) => career.id === currentCareerId
    );

    if (!existing) {
      announce("This career could not be found. Use Save Career again.");
      return false;
    }

    const updated = captureCareer(
      currentCareerId,
      existing.name,
      existing
    );

    // Merely viewing a tab does not change the saved timestamp.
    if (careerProgress(updated) === careerProgress(existing)) {
      return true;
    }

    const nextCareers = savedCareers.map((career) => (
      career.id === currentCareerId ? updated : career
    ));

    const saved = writeSavedCareers(nextCareers);

    if (saved) {
      byId("save-career-button").textContent = "Save Career";
    }

    return saved;
  }

  function prepareNewDraft() {
    if (!persistActiveCareer()) {
      return false;
    }

    currentCareerId = null;
    selectedClub = null;
    lastRemoval = null;

    squads.clear();
    savedPolicySets.clear();
    savedSeasonChallenges.clear();

    byId("signing-form").reset();
    byId("signing-form").hidden = true;
    byId("save-career-button").textContent = "Save Career";

    return true;
  }

  function renderSavedCareers() {
    const container = byId("career-list");
    container.replaceChildren();

    byId("careers-empty").hidden =
      savedCareers.length > 0 || Boolean(storageIssue);

    const ordered = [...savedCareers].sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );

    ordered.forEach((career) => {
      const club = clubs.find((item) => item.id === career.clubId);

      const card = document.createElement("article");
      card.className = "career-card";

      const heading = document.createElement("div");
      heading.className = "career-card-heading";

      heading.append(
        textElement("h3", "", career.name),
        textElement("span", "career-privacy", "Private")
      );

      const date = new Date(career.updatedAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
      });

      const actions = document.createElement("div");
      actions.className = "career-card-actions";

      const resume = textElement(
        "button",
        "button button-primary",
        "Resume Career"
      );

      resume.type = "button";
      resume.addEventListener("click", () => resumeCareer(career.id));

      actions.append(resume);

      card.append(
        heading,
        textElement("p", "career-club-name", club.name),
        textElement(
          "p",
          "career-details",
                    `${difficultyNames[career.difficulty]} · Season ${career.progress?.season || 1} · ` +
          `${career.squad.players.length} players`
        ),
        textElement("p", "career-saved-date", `Last saved: ${date}`),
        actions
      );

      container.append(card);
    });

    if (storageIssue) {
      byId("careers-status").textContent = storageIssue;
    }
  }

  function openCareers(saving = false) {
    if (!persistActiveCareer()) {
      return;
    }

    careersReturnScreen = saving ? "briefing-screen" : "home-screen";
    byId("careers-status").textContent = "";
    byId("career-save-form").hidden = !saving;

    renderSavedCareers();
    showScreen("careers-screen");

    if (saving) {
      const existing = savedCareers.find(
        (career) => career.id === currentCareerId
      );

      byId("career-name").value = existing
        ? existing.name
        : `${selectedClub.name} — ${difficultyNames[selectedDifficulty]}`;

      byId("career-name").focus();
    } else {
      byId("careers-title").focus({ preventScroll: true });
    }
  }

  function resumeCareer(id) {
    if (!persistActiveCareer()) {
      return;
    }

    const career = savedCareers.find((item) => item.id === id);

    if (!career) {
      byId("careers-status").textContent = "This career was not found.";
      return;
    }

    cancelReveal();

    selectedClub = clubs.find((club) => club.id === career.clubId);
    selectedDifficulty = career.difficulty;
    currentCareerId = career.id;
    lastRevealedClubId = career.clubId;
    lastRemoval = null;

    squads.clear();
    savedPolicySets.clear();
    savedSeasonChallenges.clear();

    const squad = structuredClone(career.squad);
    squads.set(selectedClub.id, squad);

    const key = challengeCacheKey();

    savedPolicySets.set(key, structuredClone(career.policies));
    savedSeasonChallenges.set(key, structuredClone(career.challenge));

    const usedIds = [
      ...squad.startingIds,
      ...squad.players.map((player) => player.id)
    ];

    usedIds.forEach((playerId) => {
      nextPlayerId = Math.max(nextPlayerId, playerId + 1);
    });

    document.querySelectorAll('input[name="difficulty"]').forEach(
      (input) => {
        input.checked = input.value === selectedDifficulty;
      }
    );

    updateDifficultySelection();
    renderClub(selectedClub);

    byId("club-shuffle").hidden = true;
    byId("club-result").hidden = false;
    byId("club-status").textContent = "";
    byId("career-save-form").hidden = true;
    byId("save-career-button").textContent = "Save Career";

    openBriefing();
  }

  function returnFromCareers() {
    byId("career-save-form").hidden = true;
    showScreen(careersReturnScreen);

    if (careersReturnScreen === "briefing-screen") {
      byId("save-career-button").focus();
    } else {
      byId("my-careers-button").focus();
    }
  }

  byId("my-careers-button").addEventListener("click", () => {
    openCareers(false);
  });

  byId("save-career-button").disabled = false;

  byId("save-career-button").addEventListener("click", () => {
    if (selectedClub) {
      openCareers(true);
    }
  });

  byId("career-save-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = byId("career-save-form");

    if (!selectedClub || !form.reportValidity()) {
      return;
    }

    const name = byId("career-name").value.trim();

    if (!name || name.length > 60) {
      byId("careers-status").textContent =
        "Enter a career name between 1 and 60 characters.";
      return;
    }

    const existing = savedCareers.find(
      (career) => career.id === currentCareerId
    );

    const id = existing ? existing.id : window.crypto.randomUUID();
    const career = captureCareer(id, name, existing);

    const nextCareers = existing
      ? savedCareers.map((item) => item.id === id ? career : item)
      : [...savedCareers, career];

    if (!writeSavedCareers(nextCareers)) {
      return;
    }

    currentCareerId = id;
    form.hidden = true;
    byId("save-career-button").textContent = "Save Career";

    renderSavedCareers();

    byId("careers-status").textContent =
      `${name} saved privately. Future squad changes save automatically.`;

    byId("careers-title").focus({ preventScroll: true });
  });

  byId("back-careers-button").addEventListener(
    "click",
    returnFromCareers
  );

  byId("cancel-career-save-button").addEventListener(
    "click",
    returnFromCareers
  );

  function startNewCareerFromCareers() {
    if (!prepareNewDraft()) {
      return;
    }

    byId("career-save-form").hidden = true;
    updateDifficultySelection();
    showScreen("difficulty-screen");
    byId("difficulty-title").focus({ preventScroll: true });
  }

  byId("careers-new-challenge-button").addEventListener(
    "click",
    startNewCareerFromCareers
  );

  // Existing handlers open the difficulty screen first.
  // These clear the previous career before a new selection is made.
  byId("new-challenge-button").addEventListener("click", () => {
    if (!prepareNewDraft()) {
      showScreen(selectedClub ? "briefing-screen" : "home-screen");
    }
  });

  byId("back-setup-button").addEventListener("click", () => {
    if (!prepareNewDraft()) {
      showScreen("club-screen");
    }
  });

  byId("careers-screen")
    .querySelector(".careers-storage-note").textContent =
      "Careers are private and saved in this browser on this device. " +
      "After the first save, squad changes save automatically. " +
      "Account access across devices will be added later.";

    /* Season progression */

  let seasonProgress = null;

  function createInitialSeasonProgress() {
    return {
      season: 1,
      league: selectedClub.league,
      leagueSize: 24,
      currency: "GBP",
      transferBudget: null,
      highestWeeklyWage: null,
      history: []
    };
  }

  function getSeasonProgress() {
    if (!seasonProgress) {
      seasonProgress = createInitialSeasonProgress();
    }

    return seasonProgress;
  }

  function challengeCacheKey() {
    return `${selectedClub.id}:${selectedDifficulty}:season-${getSeasonProgress().season}`;
  }

  function isValidSeasonProgress(progress) {
    // Earlier saved careers did not have this field.
    if (progress === undefined) {
      return true;
    }

    if (
      !progress ||
      !Number.isSafeInteger(progress.season) ||
      progress.season < 1 ||
      typeof progress.league !== "string" ||
      !progress.league.trim() ||
      progress.league.length > 80 ||
      !Number.isInteger(progress.leagueSize) ||
      progress.leagueSize < 2 ||
      progress.leagueSize > 60 ||
      !["GBP", "EUR", "USD"].includes(progress.currency) ||
      !Array.isArray(progress.history) ||
      progress.history.length !== progress.season - 1
    ) {
      return false;
    }

    for (const field of ["transferBudget", "highestWeeklyWage"]) {
      const value = progress[field];

      if (
        value !== null &&
        (!Number.isSafeInteger(value) || value < 0)
      ) {
        return false;
      }
    }

    return progress.history.every((entry, index) => (
      entry &&
      entry.season === index + 1 &&
      typeof entry.league === "string" &&
      Number.isInteger(entry.leagueSize) &&
      entry.leagueSize >= 2 &&
      entry.leagueSize <= 60 &&
      Number.isInteger(entry.finish) &&
      entry.finish >= 1 &&
      entry.finish <= entry.leagueSize &&
      Number.isInteger(entry.goals) &&
      entry.goals >= 0 &&
      entry.goals <= 1000 &&
      [0, 3, 4, 5, 6, 7, 8, 9].includes(entry.cupRound) &&
      ["stayed", "promoted", "relegated"].includes(entry.outcome) &&
      typeof entry.mainAchieved === "boolean" &&
      typeof entry.predictionBeaten === "boolean" &&
      typeof entry.objectiveTitle === "string" &&
      Number.isInteger(entry.predictedFinish) &&
      entry.predictedFinish >= 1 &&
      entry.predictedFinish <= entry.leagueSize &&
      Array.isArray(entry.bonusResults) &&
      entry.bonusResults.every((bonus) => (
        bonus &&
        typeof bonus.title === "string" &&
        typeof bonus.achieved === "boolean"
      ))
    ));
  }

  function formatBudget(amount) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: getSeasonProgress().currency,
      maximumFractionDigits: 0
    }).format(amount);
  }

  function settingsForCurrentSeason() {
    const settings = structuredClone(
      policySettings[selectedDifficulty]
    );

    const progress = getSeasonProgress();

    if (progress.season === 1) {
      return settings;
    }

    const previous = progress.history.at(-1);
    const rebuilding = !previous.mainAchieved ||
      previous.outcome === "relegated";

    if (rebuilding || previous.outcome === "promoted") {
      settings.arrivals = settings.arrivals.map(
        (limit) => Math.min(10, limit + 1)
      );
    }

    if (settings.age && rebuilding) {
      settings.age = settings.age.map(
        (limit) => Math.min(30, limit + 2)
      );
    }

    if (settings.wages) {
      if (progress.highestWeeklyWage === 0) {
        // Avoid a wage ceiling that rules out all paid recruitment.
        delete settings.wages;
      } else if (rebuilding || previous.outcome === "promoted") {
        settings.wages = settings.wages.map(
          (limit) => Math.min(100, limit + 10)
        );
      }
    }

    if (settings.budget) {
      if (progress.transferBudget === 0) {
        // The board's zero budget already prevents spending.
        settings.budget = [100];
      } else if (rebuilding) {
        settings.budget = settings.budget.map(
          (limit) => Math.min(95, limit + 10)
        );
      }
    }

    return settings;
  }

  function createAdaptiveSeasonChallenge() {
    const progress = getSeasonProgress();
    const previous = progress.history.at(-1);
    const size = progress.leagueSize;
    const policies = getPolicies();

    let forecast;

    if (previous.outcome === "promoted") {
      forecast = Math.ceil(size * 0.75);
    } else if (previous.outcome === "relegated") {
      forecast = Math.max(2, Math.round(size * 0.3));
    } else {
      forecast = Math.round(
        previous.finish / previous.leagueSize * size
      );
    }

    const recruitmentPressure = policies.filter(
      (policy) => ["age", "wages", "budget"].includes(policy.category)
    ).length;

    forecast += Math.round(recruitmentPressure * 0.5);

    if (progress.transferBudget === 0) {
      forecast += 1;
    } else if (progress.highestWeeklyWage > 0) {
      const recruitmentRoom =
        progress.transferBudget / (progress.highestWeeklyWage * 52);

      if (recruitmentRoom >= 2) {
        forecast -= 1;
      }
    }

    forecast = Math.max(1, Math.min(size, forecast));

    const targetOffsets = {
      rookie: 4,
      professional: 1,
      veteran: -2,
      legendary: -4
    };

    let target = forecast + targetOffsets[selectedDifficulty];

    if (!previous.mainAchieved) {
      target += 1;
    }

    target = Math.max(1, Math.min(size, target));

    const goalIncreases = {
      rookie: 0,
      professional: 4,
      veteran: 7,
      legendary: 10
    };

    const matchAdjustment =
      (size - 1) / (previous.leagueSize - 1);

    let goalTarget = Math.round(
      previous.goals * matchAdjustment +
      goalIncreases[selectedDifficulty]
    );

    if (previous.outcome === "promoted") {
      goalTarget = Math.round(goalTarget * 0.85);
    }

    goalTarget = Math.max(30, Math.min(90, goalTarget));

    const cupTargets = {
      rookie: 4,
      professional: 5,
      veteran: 6,
      legendary: 7
    };

    const cupTarget = Math.max(
      3,
      cupTargets[selectedDifficulty] -
      (previous.mainAchieved ? 0 : 1)
    );

    const cupNames = {
      3: "third round",
      4: "fourth round",
      5: "fifth round",
      6: "quarter-finals",
      7: "semi-finals"
    };

    const outcomeExplanation = {
      stayed:
        "You remain in the same division, so your previous finish " +
        "provides the starting point for this forecast.",
      promoted:
        "Promotion brings a stronger level of opposition, so this " +
        "forecast starts conservatively.",
      relegated:
        "Relegation brings a rebuilding opportunity, so this forecast " +
        "allows for a stronger finish in your new division."
    };

    const forecastExplanation =
      `${outcomeExplanation[previous.outcome]} ` +
      `Your recorded transfer budget is ${formatBudget(progress.transferBudget)}, ` +
      `with a highest existing basic wage of ` +
      `${formatBudget(progress.highestWeeklyWage)} per week. ` +
      "The recruitment policies and your selected difficulty shape " +
      "the challenge. These remain provisional estimates; they are " +
      "not a validated FM24 simulation.";

    return {
      targetFinish: target,
      goalTarget,
      cupRoundTarget: cupTarget,
      mainObjective: {
        title: target === 1
          ? `Win ${progress.league}`
          : `Finish ${ordinal(target)} or higher`,
        description:
          `Finish ${ordinal(target)} or higher in the final regular-season ` +
          `${progress.league} table. Cup results and play-off results ` +
          "are recorded separately."
      },
      bonuses: [
        {
          title: `Reach the FA Cup ${cupNames[cupTarget]}`,
          description:
            `Reach at least the ${cupNames[cupTarget]} of the FA Cup.`
        },
        {
          title: `Score ${goalTarget} league goals`,
          description:
            `Score at least ${goalTarget} goals in the regular league ` +
            "season, excluding cups and play-offs."
        }
      ],
      prediction: {
        finish: forecast,
        beatTarget: forecast === 1
          ? "Match it: win the title"
          : `${ordinal(forecast - 1)} or higher`,
        explanation:
          forecastExplanation +
          (forecast === 1
            ? " First place is already the highest possible finish; " +
              "winning the title would match this forecast."
            : "")
      }
    };
  }

  function renderSeasonHistory() {
    const progress = getSeasonProgress();
    const container = byId("season-history-list");

    container.replaceChildren();
    byId("season-history").hidden = progress.history.length === 0;

    [...progress.history].reverse().forEach((entry) => {
      const card = document.createElement("article");
      card.className = "season-history-card";

      const heading = document.createElement("div");
      heading.className = "season-history-heading";

      heading.append(
        textElement(
          "h5",
          "",
          `Season ${entry.season} · ${entry.league}`
        ),
        textElement(
          "span",
          entry.mainAchieved
            ? "season-result-badge is-success"
            : "season-result-badge",
          entry.mainAchieved ? "Main objective achieved" : "Target missed"
        )
      );

      const outcomes = {
        stayed: "Stayed in the same division",
        promoted: "Promoted",
        relegated: "Relegated"
      };

      const bonusCount = entry.bonusResults.filter(
        (bonus) => bonus.achieved
      ).length;

      const predictionText = entry.predictionBeaten
        ? "Prediction beaten"
        : entry.finish === entry.predictedFinish
          ? "Prediction matched"
          : "Finished below the prediction";

      card.append(
        heading,
        textElement(
          "p",
          "season-history-details",
          `${ordinal(entry.finish)} of ${entry.leagueSize} · ` +
          `${entry.goals} league goals · ${outcomes[entry.outcome]}`
        ),
        textElement(
          "p",
          "season-history-details",
          `Main objective: ${entry.objectiveTitle}`
        ),
        textElement(
          "p",
          "season-history-details",
          `${bonusCount} of ${entry.bonusResults.length} bonuses achieved · ` +
          `${predictionText} (forecast: ${ordinal(entry.predictedFinish)})`
        )
      );

      container.append(card);
    });
  }

  function refreshSeasonLabels() {
    if (!selectedClub) {
      return;
    }

    const progress = getSeasonProgress();

    byId("briefing-season-label").textContent =
      progress.season <= 5
        ? `Season ${progress.season} of 5`
        : `Season ${progress.season} · Five-season milestone completed`;

    byId("briefing-league").textContent = progress.league;
    byId("club-league").textContent = progress.league;

    document.querySelector(
      ".policies-description"
    ).textContent =
      `Build your squad within these rules for Season ${progress.season}. ` +
      "Each policy applies to new transfer activity, not players " +
      "already at the club.";

    document.querySelector(
      ".season-heading .eyebrow"
    ).textContent = `Season ${progress.season}: your next chapter`;

    document.querySelector(
      ".prediction-badge"
    ).textContent = `Season ${progress.season} forecast`;

    byId("season-progress-title").textContent =
      `Finished Season ${progress.season}?`;

    renderSeasonHistory();
  }

  function objectiveTarget(challenge) {
    if (Number.isInteger(challenge.targetFinish)) {
      return challenge.targetFinish;
    }

    // Compatibility with the original Season 1 challenge data.
    const title = challenge.mainObjective.title;

    if (title === "Win the Championship") {
      return 1;
    }

    if (title === "Finish in the top two") {
      return 2;
    }

    if (title === "Finish in the top six") {
      return 6;
    }

    const match = title.match(/Finish (\d+)/);
    return match ? Number(match[1]) : null;
  }

  function bonusTargets(challenge) {
    const cupTargets = {
      rookie: 4,
      professional: 5,
      veteran: 6,
      legendary: 7
    };

    const goalMatch = challenge.bonuses[1]?.title.match(/Score (\d+)/);

    return {
      cup: challenge.cupRoundTarget || cupTargets[selectedDifficulty],
      goals: challenge.goalTarget ||
        (goalMatch ? Number(goalMatch[1]) : null)
    };
  }

  function openSeasonResults() {
    if (!currentCareerId) {
      byId("season-results-status").textContent =
        "Save and name this career before recording season results.";
      return;
    }

    const progress = getSeasonProgress();
    const form = byId("season-results-form");

    form.reset();

    form.elements.namedItem("completedLeagueSize").value =
      progress.leagueSize;

    form.elements.namedItem("completedLeagueSize").readOnly = true;

    form.elements.namedItem("leagueFinish").max =
      progress.leagueSize;

    form.elements.namedItem("nextLeague").value = progress.league;
    form.elements.namedItem("nextLeagueSize").value =
      progress.leagueSize;
    form.elements.namedItem("currency").value = progress.currency;

    byId("season-results-status").textContent = "";
    form.hidden = false;
    form.elements.namedItem("leagueFinish").focus();
  }

  function restoreMap(map, snapshot) {
    map.clear();
    snapshot.forEach((value, key) => map.set(key, value));
  }

  byId("open-season-results-button").addEventListener(
    "click",
    openSeasonResults
  );

  byId("cancel-season-results-button").addEventListener("click", () => {
    byId("season-results-form").hidden = true;
    byId("season-results-status").textContent = "";
    byId("open-season-results-button").focus();
  });

  byId("season-results-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = byId("season-results-form");
    const status = byId("season-results-status");

    if (!form.reportValidity() || !selectedClub || !currentCareerId) {
      status.textContent = "Save this career and complete the result fields.";
      return;
    }

    const data = new FormData(form);
    const progress = getSeasonProgress();

    const finish = Number(data.get("leagueFinish"));
    const leagueSize = Number(data.get("completedLeagueSize"));
    const goals = Number(data.get("leagueGoals"));
    const cupRound = Number(data.get("faCupRound"));
    const outcome = String(data.get("leagueOutcome"));
    const nextLeague = String(data.get("nextLeague")).trim();
    const nextLeagueSize = Number(data.get("nextLeagueSize"));
    const currency = String(data.get("currency"));
    const transferBudget = Number(data.get("transferBudget"));
    const highestWeeklyWage = Number(data.get("highestWeeklyWage"));

    const valid = (
      Number.isInteger(finish) &&
      finish >= 1 &&
      finish <= progress.leagueSize &&
      leagueSize === progress.leagueSize &&
      Number.isInteger(goals) &&
      goals >= 0 &&
      goals <= 1000 &&
      [0, 3, 4, 5, 6, 7, 8, 9].includes(cupRound) &&
      ["stayed", "promoted", "relegated"].includes(outcome) &&
      nextLeague.length > 0 &&
      nextLeague.length <= 80 &&
      Number.isInteger(nextLeagueSize) &&
      nextLeagueSize >= 2 &&
      nextLeagueSize <= 60 &&
      ["GBP", "EUR", "USD"].includes(currency) &&
      Number.isSafeInteger(transferBudget) &&
      transferBudget >= 0 &&
      Number.isSafeInteger(highestWeeklyWage) &&
      highestWeeklyWage >= 0
    );

    if (!valid) {
      status.textContent =
        "Check the league position, league sizes, results, and budget figures.";
      return;
    }

    if (
      outcome === "stayed" &&
      nextLeague.toLowerCase() !== progress.league.toLowerCase()
    ) {
      status.textContent =
        "You selected the same division. Keep its league name, " +
        "or choose promotion or relegation.";
      return;
    }

    const challenge = getSeasonChallenge();
    const target = objectiveTarget(challenge);
    const bonuses = bonusTargets(challenge);

    if (target === null || bonuses.goals === null) {
      status.textContent =
        "The current objectives could not be assessed. No progress was changed.";
      return;
    }

    const completedSeason = {
      season: progress.season,
      league: progress.league,
      leagueSize,
      finish,
      goals,
      cupRound,
      outcome,
      mainAchieved: finish <= target,
      objectiveTitle: challenge.mainObjective.title,
      predictedFinish: challenge.prediction.finish,
      predictionBeaten: finish < challenge.prediction.finish,
      bonusResults: [
        {
          title: challenge.bonuses[0].title,
          achieved: cupRound >= bonuses.cup
        },
        {
          title: challenge.bonuses[1].title,
          achieved: goals >= bonuses.goals
        }
      ],
      policies: structuredClone(getPolicies()),
      challenge: structuredClone(challenge),
      squad: structuredClone(getSquad()),
      formation: "4-2-3-1",
      recordedAt: new Date().toISOString()
    };

    const oldProgress = structuredClone(progress);
    const oldPolicies = new Map(savedPolicySets);
    const oldChallenges = new Map(savedSeasonChallenges);

    seasonProgress = {
      season: progress.season + 1,
      league: nextLeague,
      leagueSize: nextLeagueSize,
      currency,
      transferBudget,
      highestWeeklyWage,
      history: [...progress.history, completedSeason]
    };

    // Generate the new season before saving its snapshot.
    getPolicies();
    getSeasonChallenge();

    if (!persistActiveCareer()) {
      seasonProgress = oldProgress;
      restoreMap(savedPolicySets, oldPolicies);
      restoreMap(savedSeasonChallenges, oldChallenges);

      status.textContent =
        "The new season could not be saved. Your previous season " +
        "remains active. Keep the page open and try again.";
      return;
    }

    form.hidden = true;
    lastRemoval = null;

    renderTactics();
    renderPolicies();
    renderSeasonChallenge();
    refreshSeasonLabels();

    const milestone = seasonProgress.history.length === 5
      ? " Five seasons completed — you can keep the career going."
      : "";

    status.textContent =
      `Season ${completedSeason.season} recorded. ` +
      `Season ${seasonProgress.season} unlocked and saved.${milestone}`;

    announce(status.textContent);
    byId("open-season-results-button").focus({ preventScroll: true });
  });

  // Keep the labels and history current when changing tabs.
  ["tactics", "squad", "policies", "season"].forEach((tab) => {
    byId(`${tab}-tab-button`).addEventListener(
      "click",
      refreshSeasonLabels
    );
  });

  loadSavedCareers();
  updateDifficultySelection();
})();
// FM24 squad export preview. Separate from saved careers.
(() => {
  const attributeFields = [
    ["Acc", "Acceleration"], ["Agi", "Agility"],
    ["Aer", "Aerial Reach"], ["Agg", "Aggression"],
    ["Ant", "Anticipation"], ["Bal", "Balance"],
    ["Bra", "Bravery"], ["Cmd", "Command of Area"],
    ["Com", "Communication"], ["Cmp", "Composure"],
    ["Cnt", "Concentration"], ["Cro", "Crossing"],
    ["Dec", "Decisions"], ["Det", "Determination"],
    ["Dri", "Dribbling"], ["Fin", "Finishing"],
    ["Fir", "First Touch"], ["Fla", "Flair"],
    ["Han", "Handling"], ["Hea", "Heading"],
    ["Jum", "Jumping Reach"], ["Kic", "Kicking"],
    ["Ldr", "Leadership"], ["Lon", "Long Shots"],
    ["Mar", "Marking"], ["Nat", "Natural Fitness"],
    ["OtB", "Off the Ball"], ["1v1", "One on Ones"],
    ["Pac", "Pace"], ["Pas", "Passing"],
    ["Pos", "Positioning"], ["Ref", "Reflexes"],
    ["TRO", "Rushing Out (Tendency)"], ["Sta", "Stamina"],
    ["Str", "Strength"], ["Tck", "Tackling"],
    ["Tea", "Teamwork"], ["Tec", "Technique"],
    ["Thr", "Throwing"], ["Vis", "Vision"],
    ["Wor", "Work Rate"]
  ];

  const clean = (value) => String(value ?? "")
    .replace(/\s+/g, " ").trim();

  const normalise = (value) => clean(value).toLowerCase();

  const validAttribute = (value) =>
    /^\d+$/.test(clean(value)) &&
    Number(value) >= 1 &&
    Number(value) <= 20;

  function readSquadRows(headers, rows) {
    if (!rows.length || rows.length > 2000) {
      throw new Error(
        "The export must contain between 1 and 2,000 players."
      );
    }

    if (rows.some((row) => row.length !== headers.length)) {
      throw new Error(
        "Some rows have missing columns. Please export again."
      );
    }

    const headings = headers.map(normalise);
    const metadata = {};

    [
      "Player", "UID", "Age", "Position",
      "Club", "Wage", "Preferred Foot"
    ].forEach((label) => {
      const index = headings.indexOf(normalise(label));

      if (index < 0) {
        throw new Error(
          `Add the ${label} column to your FM view and export again.`
        );
      }

      metadata[label] = index;
    });

    const missing = [];

    const attributeColumns = attributeFields.map(([short, name]) => {
      const aliases = [short, name].map(normalise);

      if (short === "TRO") {
        aliases.push("rushing out");
      }

      const matches = headings.flatMap((heading, index) =>
        aliases.includes(heading) ? [index] : []
      );

      if (!matches.length) {
        missing.push(name);
      }

      // FM uses "Nat" for nationality AND Natural Fitness.
      const index = matches.find((candidate) =>
        rows.some((row) => validAttribute(row[candidate]))
      ) ?? matches.at(-1);

      return { name, index };
    });

    if (missing.length) {
      throw new Error(
        `Missing attributes: ${missing.join(", ")}. ` +
        "Add these to your FM view and export again."
      );
    }

    const seenIds = new Set();

    return rows.map((row, rowIndex) => {
      const get = (label) => clean(row[metadata[label]]);

      const name = get("Player")
        .replace(/\s+-\s+Pick Player$/i, "")
        .trim();

      const uid = get("UID");
      const ageText = get("Age");
      const age = Number(ageText);

      if (!name || !uid || !get("Position") || !get("Club")) {
        throw new Error(
          `Player row ${rowIndex + 1} is missing a name, ` +
          "ID, position or club."
        );
      }

      if (seenIds.has(uid)) {
        throw new Error(
          `Duplicate player ID for ${name}. ` +
          "Export each player once."
        );
      }

      seenIds.add(uid);

      if (!/^\d+$/.test(ageText) || age < 10 || age > 80) {
        throw new Error(
          `${name} has a missing or invalid age.`
        );
      }

      const attributes = {};

      attributeColumns.forEach(({ name: attribute, index }) => {
        if (!validAttribute(row[index])) {
          throw new Error(
            `${name}: ${attribute} needs a visible value ` +
            "from 1 to 20. Check the FM export view."
          );
        }

        attributes[attribute] = Number(row[index]);
      });

      return {
        uid,
        name,
        age,
        attributes,
        positions: get("Position"),
        club: get("Club"),
        wage: get("Wage"),
        preferredFoot: get("Preferred Foot")
      };
    });
  }

  function parseSquadExport(html) {
    const template = document.createElement("template");
    template.innerHTML = html;

    const table = Array.from(
      template.content.querySelectorAll("table")
    ).find((candidate) => {
      const labels = Array.from(
        candidate.querySelectorAll("th")
      ).map((cell) => normalise(cell.textContent));

      return labels.includes("player") && labels.includes("uid");
    });

    if (!table) {
      throw new Error(
        "No FM squad table found. Choose the HTML squad export, " +
        "not a saved website page."
      );
    }

    const headers = Array.from(
      table.querySelectorAll("th")
    ).map((cell) => clean(cell.textContent));

    const rows = Array.from(table.querySelectorAll("tr"))
      .filter((row) => !row.querySelector("th"))
      .map((row) =>
        Array.from(row.querySelectorAll("td"))
          .map((cell) => clean(cell.textContent))
      )
      .filter((row) => row.length);

    return readSquadRows(headers, rows);
  }

  function makeElement(tag, text, className = "") {
    const element = document.createElement(tag);
    element.textContent = text;
    element.className = className;
    return element;
  }

  function showImportPreview(players) {
    const container = document.getElementById(
      "squad-import-players"
    );

    container.replaceChildren();

    const clubs = [
      ...new Set(players.map((player) => player.club))
    ];

    document.getElementById("squad-import-summary").textContent =
      `${players.length} players · ${clubs.join(", ")}`;

    players.forEach((player) => {
      const card = document.createElement("details");
      card.className = "squad-group";

      card.append(
        makeElement(
          "summary",
          `${player.name} · Age ${player.age} · ${player.positions}`,
          "squad-player-name"
        )
      );

      card.append(
        makeElement(
          "p",
          `${player.club} · ` +
          `${player.preferredFoot || "Foot not supplied"} · ` +
          `${player.wage || "Wage not supplied"}`
        )
      );

      card.append(
        makeElement(
          "p",
          `FM player ID: ${player.uid}`,
          "signing-note"
        )
      );

      const table = document.createElement("table");
      table.className = "squad-table";
      table.setAttribute(
        "aria-label",
        `${player.name} attributes`
      );

      const head = document.createElement("thead");
      const heading = document.createElement("tr");

      ["Attribute", "Out of 20"].forEach((label) => {
        const cell = makeElement("th", label);
        cell.scope = "col";
        heading.append(cell);
      });

      head.append(heading);

      const body = document.createElement("tbody");

      Object.entries(player.attributes).forEach(([name, value]) => {
        const row = document.createElement("tr");

        row.append(
          makeElement("td", name),
          makeElement("td", value)
        );

        body.append(row);
      });

      table.append(head, body);
      card.append(table);
      container.append(card);
    });

    document.getElementById("squad-import-preview").hidden = false;
  }

  const input = document.getElementById("squad-import-file");
  const status = document.getElementById("squad-import-status");
  const clearButton = document.getElementById(
    "clear-squad-import-button"
  );

  if (!input || !status || !clearButton) {
    return;
  }

  let readVersion = 0;

  function clearPreview() {
    document.getElementById("squad-import-preview").hidden = true;

    document.getElementById(
      "squad-import-players"
    ).replaceChildren();

    document.getElementById(
      "squad-import-summary"
    ).textContent = "";
  }

  input.addEventListener("change", async () => {
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const version = ++readVersion;
    clearPreview();
    status.textContent = "Reading your squad export…";

    try {
      if (!/\.html?$/i.test(file.name)) {
        throw new Error(
          "Choose an .html or .htm squad export."
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          "Choose a squad export smaller than 10 MB."
        );
      }

      const html = await file.text();

      if (version !== readVersion) {
        return;
      }

      const players = parseSquadExport(html);
      showImportPreview(players);

      status.textContent =
        `${players.length} players loaded with all 41 attributes. ` +
        "Select a player to view their details. " +
        "The file is read on this device; this preview is not saved.";
    } catch (error) {
      if (version !== readVersion) {
        return;
      }

      clearPreview();

      status.textContent = error instanceof Error
        ? error.message
        : "The export could not be read. Please try again.";

      input.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    readVersion++;
    input.value = "";
    clearPreview();

    status.textContent = "Choose a file to preview your squad.";
    input.focus();
  });
})();

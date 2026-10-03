"use strict";

(() => {
  const byId = (id) => document.getElementById(id);

  const screenIds = [
    "home-screen",
    "difficulty-screen",
    "club-screen",
    "briefing-screen"
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
  }

   function switchTab(tab) {
    activeTab = tab;

    const panels = {
      tactics: "tactics-panel",
      squad: "squad-panel",
      policies: "policies-panel"
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
    const key = `${selectedClub.id}:${selectedDifficulty}:season-1`;

    if (!savedPolicySets.has(key)) {
      const settings = policySettings[selectedDifficulty];
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

  updateDifficultySelection();
})();

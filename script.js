const ZEITFAKTOR = 0.1; // 0.1 = 10x schneller (600s → 60s)

class Leitstelle {
  constructor() {
    this.ANNUAL_INCIDENTS = 175200;
this.HOURS_PER_YEAR   = 365 * 24;
this.RATE_PER_HOUR    = this.ANNUAL_INCIDENTS / this.HOURS_PER_YEAR;
this.WINDOW_MINUTES   = 15;
this.WINDOW_HOURS     = this.WINDOW_MINUTES / 60;
this.MAX_PER_WINDOW   = Math.ceil(this.RATE_PER_HOUR * this.WINDOW_HOURS);
    this.score = 0;
    this.vehicles = [];
    this.incidents = [];
    this.history = [];
    this.incidentId = 0;
    this.einsatzTimestamps = [];
    this.budget = 0;

    this.scoreDisplay = document.getElementById("score");
    this.budgetDisplay = document.getElementById("budget");
    this.vehicleContainer = document.getElementById("vehicle-container");
    this.incidentsContainer = document.getElementById("incidents-container");
    this.historyContainer = document.getElementById("history");

    document.getElementById("vehicleSearch")?.addEventListener("input", () => this.renderVehicles());

    this.initVehicles();
    setInterval(() => this.autoGenerateIncident(), 8000);
  }

  initVehicles() {
    WACHEN.forEach(wache => {
      wache.fahrzeuge.forEach((typ, i) => {
        this.vehicles.push({
          id: `${typ}-${wache.stadt}-${i + 1}`,
          type: typ,
          wache: wache.name,
          stadt: wache.stadt,
          status: "frei",
          busyUntil: 0,
          org: wache.typ,
          alarmiert: false,
          einsatzZaehler: 0,
          wartungFaellig: false
        });
      });
    });
    this.renderVehicles();
  }

  alarmiereFF(vehicle) {
  if (vehicle.alarmiert) return; // bereits alarmiert

  vehicle.alarmiert = true;
  console.log(`🚨 Alarmierung läuft für ${vehicle.id}`);

  // UI aktualisieren
  this.renderVehicles();

  // Nach 2–4 Minuten prüfen, ob Fahrzeug einsatzbereit wird
  const delay = 1000 * (120 + Math.floor(Math.random() * 120)); // 2–4 Minuten
  setTimeout(() => {
    vehicle.alarmiert = false;
    if (this.isPersonnelAvailable(vehicle)) {
      this.updateVehicleStatus(vehicle, "frei");
    }
    this.renderVehicles();
  }, delay);
}

  isPersonnelAvailable(vehicle) {
    if (vehicle.org === "BF") return true;
    const hour = new Date().getHours();
    return hour < 6 || hour >= 17;
  }

  getPriorityColor(priority) {
    if (priority === 1) return "#ff4c4c";
    if (priority === 2) return "#ffa500";
    if (priority === 3) return "#4caf50";
    return "#999";
  }

  autoGenerateIncident() {
  // Maximal 4 parallele Viertelstunden-Fenster im System
  if (this.incidents.filter(i => i.active).length < this.MAX_PER_WINDOW * 4) {
    this.generateIncident();
  }
}

generateIncident() {
  const now = Date.now();

  // 1) Fensterstart für 15-Minuten-Block berechnen
  const windowStart = now - this.WINDOW_MINUTES * 60 * 1000;
  this.einsatzTimestamps = this.einsatzTimestamps.filter(ts => ts > windowStart);

  // 2) Rate-Limit prüfen: max. Einsätze pro Block
  if (this.einsatzTimestamps.length >= this.MAX_PER_WINDOW) {
    console.log(`Maximale Einsätze erreicht (${this.MAX_PER_WINDOW}/${this.WINDOW_MINUTES} Min.)`);
    return;
  }
  this.einsatzTimestamps.push(now);

  // 3) Zufällige Einsatzvorlage & Stadt wählen
  const template = EINSATZARTEN[Math.floor(Math.random() * EINSATZARTEN.length)];
  const stadt    = WACHEN[Math.floor(Math.random() * WACHEN.length)].stadt;

  // 4) Einsatzobjekt anlegen, mit startTime für Countdown
  this.incidents.push({
    id: ++this.incidentId,
    title:    template.title,
    stadt,
    required: [...template.required],
    assigned: [],
    duration: Math.floor((template.duration || 600) * ZEITFAKTOR),
    priority: template.priority,
    active:   true,
    startTime: now,
    arrivalTime: null,
  });
  console.log(`🆕 Neuer Einsatz: ${template.title} (${stadt}) – Dauer: ${template.duration || 600}s`);

  // 5) UI aktualisieren
  this.renderIncidents();
}


assignVehicle(incident) {
  const now = Date.now();

  for (let req of incident.required) {
    if (!incident.assigned.includes(req)) {
      // Fahrzeuge nach Status, Stadt, Besatzung & Technik filtern
      const local = this.vehicles.filter(v =>
        v.type === req &&
        v.status === "frei" &&
        v.stadt === incident.stadt &&
        this.isPersonnelAvailable(v) &&
        !v.wartungFaellig &&
        (v.tankstand ?? 100) > 20
      );

      const remote = this.vehicles.filter(v =>
        v.type === req &&
        v.status === "frei" &&
        v.stadt !== incident.stadt &&
        this.isPersonnelAvailable(v) &&
        !v.wartungFaellig &&
        (v.tankstand ?? 100) > 20
      );

      // Nächstes verfügbares Fahrzeug
      const vehicle = local[0] || remote[0];

      // Falls keine Besatzung: Pager-Alarm für FF
      const unbesetzt = local.concat(remote).find(v => !this.isPersonnelAvailable(v) && !v.alarmiert);
      if (!vehicle && unbesetzt) {
        this.alarmiereFF(unbesetzt);
        alert(`${unbesetzt.id} wurde alarmiert! Personal wird nachalarmiert.`);
        return;
      }

      // Fahrzeug verfügbar und einsatzbereit
      if (vehicle) {
        incident.assigned.push(req);

        let delay = 0;
        if (vehicle.org === "FF") delay += 3000;
        if (vehicle.stadt !== incident.stadt) delay += 4000;

        vehicle.startBusyTime = now;
        this.updateVehicleStatus(vehicle, delay > 0 ? "anfahrend" : "im Einsatz");

        setTimeout(() => {
          this.updateVehicleStatus(vehicle, "im Einsatz");

          vehicle.busyUntil = now + incident.duration * 1000 + delay;
          vehicle.status = "busy";

          // Einsatzende – zurück zur Wache oder Wartung
          setTimeout(() => {
            vehicle.einsatzZaehler = (vehicle.einsatzZaehler || 0) + 1;
            vehicle.tankstand = Math.max(0, (vehicle.tankstand ?? 100) - 10);

            if (vehicle.einsatzZaehler >= 10) {
              vehicle.status = "wartung";
              vehicle.wartungFaellig = true;

              // 🔧 Wartung für 60 Sekunden simulieren
              setTimeout(() => {
                vehicle.status = "frei";
                vehicle.einsatzZaehler = 0;
                vehicle.wartungFaellig = false;
                this.renderVehicles();
              }, 60000);
            } else {
              vehicle.status = "frei";
            }

            this.renderVehicles();
          }, incident.duration * 1000);
        }, delay);

        this.renderVehicles();
        this.renderIncidents();

        if (incident.required.every(r => incident.assigned.includes(r))) {
  incident.arrivalTime = Date.now(); // Startpunkt für Timer

  setTimeout(() => {
    incident.active = false;
    const basePoints = { 1: 15, 2: 10, 3: 5 };
    this.score += basePoints[incident.priority] || 10;
    const einsatzReward = EINSATZARTEN.find(e => e.title === incident.title)?.reward || 0;
    this.budget += einsatzReward;
    this.budgetDisplay.textContent = `Konto: ${this.budget.toLocaleString()} €`;
    this.scoreDisplay.textContent = `Punkte: ${this.score}`;
    this.addToHistory(incident);
    this.renderIncidents();
  }, incident.duration * 1000);
}

        return;
      }
    }
  }

  alert("Keine verfügbaren Fahrzeuge – Einsatz bleibt offen!");
}

  updateVehicleStatus(vehicle, status) {
    vehicle.status = status;
    this.renderVehicles();
  }

  addToHistory(incident) {
const vehicleInfos = incident.assigned.map(type => {
  const v = this.vehicles.find(v =>
    v.type === type && incident.stadt === v.stadt && v.status !== "frei"
  ) || this.vehicles.find(v => v.type === type && v.status !== "frei");

  return v ? `${v.id} (${v.stadt})` : type;
});

this.history.push({
  time: new Date().toLocaleTimeString(),
  title: incident.title,
  stadt: incident.stadt,
  vehicles: vehicleInfos
});

    this.renderHistory();
  }

renderVehicles() {
  const now = Date.now();
  const searchTerm = document.getElementById("vehicleSearch")?.value?.toLowerCase() || "";
  const offeneStädte = new Set();
document.querySelectorAll(".accordion-body.open").forEach(body => {
  const stadt = body.getAttribute("data-stadt");
  if (stadt) offeneStädte.add(stadt);
});
  this.vehicleContainer.innerHTML = "";

  const grouped = {};
  this.vehicles.forEach(v => {
    if (!grouped[v.stadt]) grouped[v.stadt] = [];
    grouped[v.stadt].push(v);
  });

  Object.entries(grouped).forEach(([stadt, fahrzeuge]) => {
    const filtered = fahrzeuge.filter(v =>
      v.id.toLowerCase().includes(searchTerm) ||
      v.wache.toLowerCase().includes(searchTerm)
    );

    const total = filtered.length;
    const available = filtered.filter(v =>
      v.status === "frei" &&
      this.isPersonnelAvailable(v)
    ).length;

    if (total === 0) return;

    const groupDiv = document.createElement("div");
    groupDiv.className = "vehicle-group";

    const header = document.createElement("div");
    header.className = "accordion-header";
    header.textContent = `${stadt} – ${available} / ${total}`;
    groupDiv.appendChild(header);

const body = document.createElement("div");
body.className = "accordion-body";
body.setAttribute("data-stadt", stadt);

if (offeneStädte.has(stadt)) {
  body.classList.add("open");
}

const table = document.createElement("table");
table.className = "vehicle-table";

const thead = document.createElement("thead");
thead.innerHTML = `
  <tr>
    <th>ID</th>
    <th>Typ</th>
    <th>Status</th>
    <th>Tank</th>
    <th>Besatzung</th>
    <th>Aktion</th>
  </tr>`;
table.appendChild(thead);

const tbody = document.createElement("tbody");

filtered.forEach(v => {
  const tank = typeof v.tankstand !== "undefined" ? `${v.tankstand}%` : "-";
  const besatzung = this.isPersonnelAvailable(v)
    ? "👨‍🚒 verfügbar"
    : "<span class='no-personnel'>❌ fehlt</span>";

  const row = document.createElement("tr");
  row.innerHTML = `
    <td><strong>${v.id}</strong></td>
    <td>${v.type} (${v.org})</td>
    <td>${v.status}</td>
    <td>${tank}</td>
    <td>${besatzung}</td>
    <td>
      ${v.status === "frei" ? `
        <button onclick="app.wartungStart('${v.id}')">🧰</button>
        <button onclick="app.tanken('${v.id}')">⛽</button>
      ` : ""}
    </td>
  `;
  tbody.appendChild(row);
});

table.appendChild(tbody);
body.appendChild(table);

    header.addEventListener("click", () => body.classList.toggle("open"));
    groupDiv.appendChild(body);
    this.vehicleContainer.appendChild(groupDiv);
  });

  this.renderStadtStatistik();
}

wartungStart(id) {
  const v = this.vehicles.find(v => v.id === id);
  if (!v || v.status !== "frei") return;

  v.status = "wartung";
  v.wartungFaellig = true;
  this.renderVehicles();

  setTimeout(() => {
    v.status = "frei";
    v.wartungFaellig = false;
    v.einsatzZaehler = 0;
    this.renderVehicles();
  }, 120000); // 120 Sekunden
}

tanken(id) {
  const v = this.vehicles.find(v => v.id === id);
  if (!v || v.status !== "frei") return;

  v.status = "tanken";
  this.renderVehicles();

  setTimeout(() => {
    v.status = "frei";
    v.tankstand = 100;
    this.renderVehicles();
  }, 10000); // 10 Sekunden
}

updateVehicleStatus(vehicle, status) {
  vehicle.status = status;

  // Optional: Blockieren, wenn Wartung oder Tank leer
  if (vehicle.status === "frei") {
    if (vehicle.wartungFaellig) vehicle.status = "wartung";
    else if (vehicle.tankstand <= 0) vehicle.status = "tanken";
  }

  this.renderVehicles();
}

resetMaintenance(vehicle) {
  vehicle.einsatzZaehler = 0;
  vehicle.wartungFaellig = false;
}

renderIncidents() {
  this.incidentsContainer.innerHTML = "";

  this.incidents
    .filter(i => i.active)
    .forEach(incident => {
      const div = document.createElement("div");
      const missing = incident.required.filter(r => !incident.assigned.includes(r));
      const color   = this.getPriorityColor(incident.priority);

      div.className = "incident";
      div.style.borderLeft = `8px solid ${color}`;
      div.innerHTML = `
        <strong>${incident.title}</strong><br>
        Ort: ${incident.stadt}<br>
        <span style="color: ${color}">Priorität: ${incident.priority}</span><br>
        Benötigt: ${incident.required.join(", ")}<br>
        Zugewiesen: ${incident.assigned.join(", ") || "-"}<br>
        <button ${missing.length === 0 ? "disabled" : ""}>Fahrzeug zuweisen</button>
        <div class="incident-timer"></div>
      `;

      div.querySelector("button").onclick = () => this.assignVehicle(incident);
      const timerEl = div.querySelector(".incident-timer");

      if (missing.length === 0 && incident.arrivalTime) {
  const totalMs = incident.duration * 1000;
  const endTime = incident.arrivalTime + totalMs;

  let intervalId;

  const updateTimer = () => {
    const now = Date.now();
    const msLeft = Math.max(0, endTime - now);
    const sec = Math.ceil(msLeft / 1000);
    timerEl.textContent = `⏱ Läuft noch: ${sec}s`;
    if (msLeft <= 0) clearInterval(intervalId);
  };

  updateTimer();
  intervalId = setInterval(updateTimer, 500);

} else {
  timerEl.textContent = `⏱ Warten auf Fahrzeugzuweisung...`;
}

      this.incidentsContainer.appendChild(div);
    });
}

  renderHistory() {
    this.historyContainer.innerHTML = "";
    this.history.slice(-10).reverse().forEach(h => {
      const div = document.createElement("div");
      div.className = "incident";
div.innerHTML = `
  <strong>${h.title}</strong><br>
  Ort: ${h.stadt}<br>
  Fahrzeuge: ${h.vehicles.join(", ")}<br>
  Zeit: ${h.time}
`;
      this.historyContainer.appendChild(div);
    });
  }

  renderStadtStatistik() {
    const ctx = document.getElementById("statistikChart")?.getContext("2d");
    if (!ctx) return;

    const data = {};
    this.vehicles.forEach(v => {
      if (!data[v.stadt]) data[v.stadt] = { total: 0, frei: 0 };
      data[v.stadt].total += 1;
      if (v.status === "frei" && this.isPersonnelAvailable(v)) {
        data[v.stadt].frei += 1;
      }
    });

    const labels = Object.keys(data);
    const freiData = labels.map(stadt => data[stadt].frei);
    const busyData = labels.map(stadt => data[stadt].total - data[stadt].frei);

    if (window.stadtChart) window.stadtChart.destroy();

    window.stadtChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Verfügbar", data: freiData, backgroundColor: "#4caf50" },
          { label: "Belegt", data: busyData, backgroundColor: "#f44336" }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Fahrzeugstatus je Stadt" }
        },
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      }
    });
  }
}

// ▶ Starte Spiel
const app = new Leitstelle();

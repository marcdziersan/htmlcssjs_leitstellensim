class Leitstelle {
  constructor() {
    this.score = 0;
    this.vehicles = [];
    this.incidents = [];
    this.history = [];
    this.incidentId = 0;
    this.einsatzTimestamps = [];

    this.scoreDisplay = document.getElementById("score");
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
          org: wache.typ
        });
      });
    });
    this.renderVehicles();
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
    if (this.incidents.filter(i => i.active).length < 5) {
      this.generateIncident();
    }
  }

  generateIncident() {
    const now = Date.now();
    const fifteenMinAgo = now - (15 * 60 * 1000);
    this.einsatzTimestamps = this.einsatzTimestamps.filter(ts => ts > fifteenMinAgo);

    if (this.einsatzTimestamps.length >= 4) {
      console.log("Maximale Einsätze erreicht (4/15min)");
      return;
    }

    this.einsatzTimestamps.push(now);

    const template = EINSATZARTEN[Math.floor(Math.random() * EINSATZARTEN.length)];
    const stadt = WACHEN[Math.floor(Math.random() * WACHEN.length)].stadt;

    this.incidents.push({
      id: ++this.incidentId,
      title: template.title,
      stadt,
      required: [...template.required],
      assigned: [],
      duration: 10 + Math.floor(Math.random() * 10),
      priority: template.priority,
      active: true
    });

    this.renderIncidents();
  }

  assignVehicle(incident) {
    const now = Date.now();

    for (let req of incident.required) {
      if (!incident.assigned.includes(req)) {
        const local = this.vehicles.filter(v =>
          v.type === req &&
          v.status === "frei" &&
          v.stadt === incident.stadt &&
          this.isPersonnelAvailable(v)
        );

        const remote = this.vehicles.filter(v =>
          v.type === req &&
          v.status === "frei" &&
          v.stadt !== incident.stadt &&
          this.isPersonnelAvailable(v)
        );

        const vehicle = local[0] || remote[0];
        if (vehicle) {
          incident.assigned.push(req);

          let delay = 0;
          if (vehicle.org === "FF") delay += 3000;
          if (vehicle.stadt !== incident.stadt) delay += 4000;

          this.updateVehicleStatus(vehicle, delay > 0 ? "anfahrend" : "im Einsatz");

          setTimeout(() => {
            this.updateVehicleStatus(vehicle, "im Einsatz");
            vehicle.busyUntil = now + incident.duration * 1000;
            vehicle.status = "busy";

            setTimeout(() => {
              vehicle.status = "frei";
              this.renderVehicles();
            }, incident.duration * 1000);
          }, delay);

          this.renderVehicles();
          this.renderIncidents();

          if (incident.required.every(r => incident.assigned.includes(r))) {
            setTimeout(() => {
              incident.active = false;
              const basePoints = { 1: 15, 2: 10, 3: 5 };
              this.score += basePoints[incident.priority] || 10;
              this.scoreDisplay.textContent = `Punkte: ${this.score}`;
              this.addToHistory(incident);
              this.renderIncidents();
            }, (incident.duration + delay / 1000) * 1000);
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
    this.history.push({
      time: new Date().toLocaleTimeString(),
      title: incident.title,
      stadt: incident.stadt,
      vehicles: [...incident.assigned]
    });
    this.renderHistory();
  }

  renderVehicles() {
    const searchTerm = document.getElementById("vehicleSearch")?.value?.toLowerCase() || "";
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
      const available = filtered.filter(v => v.status === "frei" && this.isPersonnelAvailable(v)).length;

      if (total === 0) return;

      const groupDiv = document.createElement("div");
      groupDiv.className = "vehicle-group";

      const header = document.createElement("div");
      header.className = "accordion-header";
      header.textContent = `${stadt} – ${available} von ${total} verfügbar`;
      groupDiv.appendChild(header);

      const body = document.createElement("div");
      body.className = "accordion-body";

      filtered.forEach(v => {
        const div = document.createElement("div");
        div.className = "vehicle" + (v.status !== "frei" ? " busy" : "");
        div.innerHTML = `
          <strong>${v.id}</strong><br>
          Typ: ${v.type} (${v.org})<br>
          Wache: ${v.wache}<br>
          Status: ${v.status}<br>
          ${
            this.isPersonnelAvailable(v)
              ? "👨‍🚒 Personal verfügbar"
              : "<span class='no-personnel'>❌ Keine Besatzung</span>"
          }
        `;
        body.appendChild(div);
      });

      header.addEventListener("click", () => {
        body.classList.toggle("open");
      });

      groupDiv.appendChild(body);
      this.vehicleContainer.appendChild(groupDiv);
    });

    this.renderStadtStatistik();
  }

  renderIncidents() {
    this.incidentsContainer.innerHTML = "";
    this.incidents.filter(i => i.active).forEach(incident => {
      const div = document.createElement("div");
      const missing = incident.required.filter(r => !incident.assigned.includes(r));
      const color = this.getPriorityColor(incident.priority);

      div.className = "incident";
      div.style.borderLeft = `8px solid ${color}`;
      div.innerHTML = `
        <strong>${incident.title}</strong><br>
        Ort: ${incident.stadt}<br>
        <span style="color: ${color}">Priorität: ${incident.priority}</span><br>
        Benötigt: ${incident.required.join(", ")}<br>
        Zugewiesen: ${incident.assigned.join(", ") || "-"}<br>
        <button ${missing.length === 0 ? "disabled" : ""}>Fahrzeug zuweisen</button>
      `;

      div.querySelector("button").onclick = () => this.assignVehicle(incident);
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

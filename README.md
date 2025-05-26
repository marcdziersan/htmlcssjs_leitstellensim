![Wallpaper](wallpaper.png)
# 🚒 Feuerwehr Leitstellenspiel – Kreisleitstelle Mettmann

Ein browserbasiertes Feuerwehr-Leitstellenspiel mit Einsatz- und Fahrzeugmanagement, visualisierten Statistiken und realistischer Schicht- & Alarmierungslogik.

---

## 🔥 Features

- 🚑 Fahrzeuge nach BF / FF (inkl. Personalverfügbarkeit & Dienstzeiten)
- 📟 BOS-Pager-Simulation: FF-Alarmierung außerhalb der Dienstzeit
- 🧠 Realistische Einsatzarten mit Priorität (1–3)
- 🧩 Fahrzeuggruppen nach Stadt (Accordion-UI)
- 🚗 Fahrzeugstatus: frei, anfahrend, im Einsatz, alarmiert
- ⏱ Live-Countdown und Fortschrittsanzeige je Einsatz und Fahrzeug
- 📊 Stadtstatistik (Chart.js)
- 🔍 Fahrzeug-Suchfunktion
- 📱 Responsive Design (Desktop & Mobile)
- ⚠️ Dynamische Einsatzbegrenzung anhand statistischer Werte (16.000 Einsätze/Jahr)
- ⚙️ Vorbereitung auf Wartung & Tankstatus je Fahrzeug

---

## 📚 Was wird hier gelernt? (Lehrplan Fachinformatiker AE)

Dieses Projekt deckt zahlreiche **lehrplanspezifische Inhalte** ab, insbesondere:

### 💻 Technische Umsetzung

- **HTML5, CSS3, JavaScript (Vanilla)**
- Responsive UI mit Flexbox & CSS Grid
- DOM-Manipulation & Event Handling
- Formularvalidierung & Interaktion
- Modularisierung durch OOP (ES6-Klassen)
- Integration externer Bibliothek (Chart.js)

### 🧠 Programmierkonzepte

- Objektorientierte Programmierung (OOP)
- Arrays, Objekte, Filter, Maps
- Zeitgesteuerte Prozesse (`setInterval`, `setTimeout`)
- Status- & Zustandsverwaltung in Echtzeit
- Dynamische UI-Komponenten (Accordion, Suche, Filter)
- Benutzerinteraktion und Systemlogik (z. B. BOS-Alarmierung)
- Einsatzspezifisches Delay je Organisationseinheit (FF/BF)

### 📈 Projektstruktur & Dokumentation

- Klar strukturierte Projektarchitektur
- Verwendung von Markdown-Dateien (`README.md`, `CHANGELOG.md`, `STATS.md`)
- Kommentierter, nachvollziehbarer Quellcode
- Statistisch fundierte Spielmechanik zur Einsatzfrequenz
- Vorbereitete Versionierung (Git) & Deployment-Readiness

---

## 📦 Ordnerstruktur

```bash
leitstelle/
├── index.html
├── script.js
├── style.css
├── logo.png
├── README.md
├── CHANGELOG.md
├── STATS.md
└── data/
    ├── wachen.js
    └── einsatzarten.js
```

---

## 📊 Technikstack

- **HTML, CSS, Vanilla JavaScript**
- OOP (ES6 Class)
- [Chart.js](https://www.chartjs.org/) für Diagramme
- Simulierte Realzeitprozesse (z. B. Alarmierung, Einsatzdauer)
- Konfigurierbare Parameter für Realitätsnähe (FF-Dienstzeiten, Limits etc.)

---

## 🧩 Geplante Erweiterungen

- 🗺️ Kartenintegration (Leaflet.js) für Echtortung
- 📆 Dienstplan-Visualisierung (Tag/Nacht/Wochenplan)
- 🧰 Fahrzeugwartung mit Statusanzeige & Sperrung
- ⛽ Tankfüllstand mit Bedarfssimulation
- 👨‍🚒 Einsatzleiter-Modus mit manueller Disposition
- 🎮 Multiplayer (optional)
- 💾 Savegame & lokale Spielstände (LocalStorage)

---

## 👨‍🚒 Autor

**Marcus**  
Entwicklung im Rahmen der Umschulung zum Fachinformatiker AE.  
Fragen, Anregungen oder Verbesserungsvorschläge? Gerne melden!

---

## 📄 Lizenz

MIT License – frei zur privaten, schulischen & nicht-kommerziellen Nutzung.

---

![Logo](logo.png)

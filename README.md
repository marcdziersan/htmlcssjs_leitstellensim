![Wallpaper](wallpaper.png)
# 🚒 Feuerwehr Leitstellenspiel – Kreisleitstelle Mettmann

Ein browserbasiertes Feuerwehr-Leitstellenspiel mit Einsatz- und Fahrzeugmanagement, visualisierten Statistiken und realistischer Schicht- & Alarmierungslogik.

---

## 🔥 Features

    🚑 Fahrzeuge nach BF / FF (inkl. Personalverfügbarkeit & Dienstzeiten)
    📟 BOS-Pager-Simulation: FF-Alarmierung außerhalb der Dienstzeit
    🧠 Realistische Einsatzarten mit Priorität (1–3) und realer Dauer (z. B. 3–30 Min.)
    🧩 Fahrzeuggruppen nach Stadt (Accordion-UI)
    🚗 Fahrzeugstatus: frei, anfahrend, im Einsatz, alarmiert, in Wartung, tanken
    ⏱ Live-Countdown und Fortschrittsanzeige je Einsatz und Fahrzeug
    ⌛ Einsatztimer startet erst bei Eintreffen aller Fahrzeuge (ab v1.6.0)
    📊 Stadtstatistik (Chart.js) mit Live-Status (verfügbar/belegt)
    🔍 Fahrzeug-Suchfunktion (Filter nach ID und Wache)
    📱 Responsive Design (optimiert für Desktop & Mobile)
    ⚠️ Dynamische Einsatzbegrenzung anhand realer Statistik (16.000+ Einsätze/Jahr)
    🧮 Erweiterte Einsatzfrequenzregelung: 5 Einsätze pro 15 Minuten möglich (v1.6.0)
    ⚙️ Wartungssystem & Tankstatus je Fahrzeug mit visueller Anzeige
    🧾 Einsatzhistorie mit Uhrzeit und Fahrzeugzuordnung
    🧪 Entwickler-Modus: Debug-Ausgabe in der Konsole bei Einsatzgenerierung
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

## 👨‍🚒 Autor

**Marcus**  
Entwicklung im Rahmen der Umschulung zum Fachinformatiker AE.  
Fragen, Anregungen oder Verbesserungsvorschläge? Gerne melden!

---

## 📄 Lizenz

MIT License – frei zur privaten, schulischen & nicht-kommerziellen Nutzung.

---

![Logo](logo.png)

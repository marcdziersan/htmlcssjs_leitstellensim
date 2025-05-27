# Changelog

Alle bedeutenden Änderungen am Feuerwehr-Leitstellenspiel werden in diesem Dokument festgehalten.

## [Unreleased]

* —

# 🧾 Changelog

## 📦 Version 1.9.0 – Tab-UI & Design Update

### ✨ Neue Features
- 🗂 **Tab-Menü** zur klaren Trennung von Spielbereichen:
  - `🏠 Home`: Einführung & Spielbeschreibung
  - `💰 Punkte & Konto`: HUD mit Punktestand & Budget
  - `🚗 Einheiten`: Accordion-Tabellenansicht aller Fahrzeuge
  - `📊 Statistik`: Live-Auswertung mit Chart.js
  - `🚨 Einsätze`: Aktive laufende Einsätze
  - `📜 Einsatzhistorie`: Letzte abgeschlossene Einsätze

- 💡 **Responsive Tab-Steuerung** mit dynamischer Aktivierung per Klick

- 🎨 **Neues Designschema** (Corporate Colors: **Rot**, **Weiß**, **Gelb**) mit:
  - Modernisierten HUD-Boxen
  - Klareren Tabellen
  - Verbesserter Fahrzeugstatus-Farbgebung (z. B. Alarmiert, Wartung, Tank)

- ✅ Alle bisherigen Spielmechaniken bleiben vollständig erhalten
- 💼 Vorbereitung auf Theme-Wechsel & Tag/Nacht-Modi

### 🔧 Verbesserungen
- Keine Änderungen an bestehender Spiellogik notwendig
- Einfach erweiterbar um Badge-Logik (z. B. „neuer Einsatz“ auf Tabs)

---

> Diese Version ist voll kompatibel mit v1.6.x und v1.5.x.
> Der Fokus liegt auf Übersichtlichkeit, Designklarheit und Benutzerfreundlichkeit.

## [v1.8.0] – 2025-05-27

### 🧾 Einsatzhistorie erweitert
- **Stadtanzeige pro Fahrzeug**: In der Einsatzhistorie wird jetzt zu jedem eingesetzten Fahrzeug die zugehörige **Stadt** angezeigt.
  - Beispiel: `HLF-Haan-1 (Haan), ELW-Mettmann-1 (Mettmann)`
  - Unterstützt sowohl stadtinterne als auch überörtliche Einsätze
- Automatische Erkennung der Fahrzeugherkunft bei Einsatzabschluss
- Keine Änderungen an der Benutzeroberfläche notwendig – erfolgt dynamisch

### 📋 Fahrzeugübersicht modernisiert
- 🚗 **Accordion-Inhalte jetzt als responsive Tabelle** statt Einzeldarstellung:
  - Übersichtlichere Darstellung bei großen Fuhrparks
  - Klar strukturierte Spalten: ID, Typ, Status, Tank, Besatzung, Aktionen
- Responsive Design: Tabellen passen sich automatisch an Bildschirmbreite an
- Bisheriger Accordion-Header (`Stadt X – Y / Z verfügbar`) bleibt bestehen
- Geöffnete Accordions bleiben beim Status-Update erhalten (z. B. bei Tanken/Wartung)

### 🧩 Technische Änderungen
- Erweiterung der `incident.assigned`-Verarbeitung um gezielte Fahrzeugzuordnung aus `this.vehicles`
- Mapping der Fahrzeug-IDs auf zugehörige Städte bei `addToHistory()`
- Historienanzeige in `renderHistory()` unverändert, aber inhaltlich erweitert

---

### 🔥 Features seit v1.8.0

- 🧾 Einsatzhistorie zeigt nun:
  - 🚓 Fahrzeugtyp
  - 📍 Herkunftsstadt
- 🧠 Mehr Nachvollziehbarkeit bei interkommunaler Hilfe

---

## 🆕 **Changelog – Version 1.7.0 (27.05.2025)**

### 💰 **Neue Features**

* **Einsatzvergütungssystem** eingeführt: Jeder abgeschlossene Einsatz bringt jetzt zusätzlich zur Punktevergabe auch eine **finanzielle Belohnung** (abhängig von Einsatztyp, Dauer und Priorität).
* **Realitätsnahe Vergütungstabellen** für alle über 60 Einsatzarten implementiert (`reward`-Werte in `einsatzarten.js`).
* **Neues Budgetsystem** (`this.budget`) mit persistenter Verwaltung im Spielablauf.
* **HUD-Anzeige** für Punkte & Kontostand:

  * Kompakte, moderne Statusboxen mit Schatten und Farbabgrenzung
  * Übersichtlich über dem Spiel eingeblendet
  * Automatische Aktualisierung bei jeder Änderung

### 🎨 **UI/UX-Optimierungen**

* Neues flexibles HUD-Layout (`#hud`) ersetzt die bisherigen Einzelanzeigen für Punkte und Konto
* Strukturierung in HUD-Boxen mit Titel und Wert (🧠 klarer ablesbar, 📱 responsiv)

### ⚙️ **Technische Änderungen**

* UI-Elemente `#score` und `#budget` in neue Containerstruktur verschoben (`hud-box`)
* Einsatzabschlusslogik (`assignVehicle()`) um Auszahlungsvorgang erweitert
* Neue CSS-Regeln für HUD-Box (`.hud-box`, `.hud-title`, `.hud-value`) in `style.css` integriert

---

## 🆕 **Changelog – Version 1.6.0 (27.05.2025)**

### ✨ **Neue Funktionen**

* **Realistische Einsatzdauern**: Alle Einsatzarten (`einsatzarten.js`) enthalten jetzt realitätsnahe `duration`-Werte in Sekunden (z. B. 5–30 Minuten).
* **Einsatz-Timer startet erst bei Fahrzeugankunft**: Die Einsatzzeit läuft nun erst, wenn **alle benötigten Fahrzeuge vor Ort sind**, nicht mehr beim Anlegen des Einsatzes.
* **Statusanzeige vor Start**: Solange nicht alle Fahrzeuge zugewiesen sind, wird `⏱ Warten auf Fahrzeugzuweisung...` angezeigt.
* **Erweiterte Einsatzfrequenz**: System angepasst auf **bis zu 5 Einsätze pro 15 Minuten** (über `ANNUAL_INCIDENTS = 175200`).

### ⚙️ **Technische Änderungen**

* Neues Feld `arrivalTime` im Einsatzobjekt eingeführt.
* Timerlogik in `renderIncidents()` auf `arrivalTime` umgestellt.
* Einsatzabschluss (`setTimeout`) basiert nun auf `arrivalTime`.
* Debug-Log hinzugefügt: zeigt Einsatzdauer in der Konsole bei Generierung.

### 🐛 **Fehlerbehebungen**

* Einsatz-Timer läuft nicht mehr leer, wenn Fahrzeuge spät zugewiesen werden.
* „0s Timer“-Fehler nach Inaktivität oder später Alarmierung behoben.

---

## [v1.5.0] - 2025-05-27

### Added
- 🧠 FF-Alarmierung bei Personalmangel außerhalb Dienstzeiten (BOS-Pager-Simulation)
- 📟 Visualisierung: Fahrzeuge mit „Alarmierung läuft…“ erhalten speziellen Status & Styling
- 🕒 Countdown-Overlay für Fahrzeuge im Einsatz mit Fortschrittsanzeige (Progress-Bar)
- 🔧 Wartungs-Feature (Vorbereitung): Fahrzeuge können in Zukunft Wartung benötigen
- 🏷️ Fahrzeugstatus „wartung“ eingeführt (UI-Anzeige integriert, Logik folgt)
- 🔍 Visuelle Markierung von alarmierten Fahrzeugen in der Fahrzeugübersicht
- 🔄 FF-Alarmierungslogik simuliert personelle Verfügbarkeit mit realistischer Verzögerung

### Changed
- 🔁 `assignVehicle()` erkennt nun unbesetzte Fahrzeuge und leitet bei FF eine Alarmierung ein
- 🔁 `renderVehicles()` zeigt jetzt auch Alarmierungsstatus und Wartungshinweise an
- 📊 Fortschrittsanzeige bei `vehicle.status === "busy"` durch `% Done` ergänzt
- ⚙️ Refactoring interner Logik zur besseren Status-Verwaltung (`alarmiert`, `busyUntil`, etc.)

### Fixed
- ✅ Fehler beim Countdown-Timer (`intervalId` vor Initialisierung) wurde behoben
- ✅ Verbesserte Erkennung bei überörtlichem Einsatz von FF mit Alarmierung

---

## [v1.4.0] - 2025-05-26

### Added

* Live-Countdown in Einsatz-Panel (⏱ verbleibende Zeit bis Einsatzende)  
* Progress-Bars für Fahrzeugbindung (🚗 Anfahrts- und Einsatzfortschritt)  
* Console-Logging der tatsächlichen Fahrzeug-Rückgabezeiten  

### Changed

* `renderIncidents()` um Timer-Element und `startTime`-Feld erweitert  
* `renderVehicles()` um Restzeit- und Fortschrittsanzeige ergänzt  

## [v1.3.0] - 2025-05-26

### Added

* Dynamische Einsatzlimitierung basierend auf Jahresstatistik (16.000 Einsätze/Jahr)  
* `MAX_PER_WINDOW` Berechnung für 15-Minuten-Fenster  
* OOP-Refactoring: Klasse `Leitstelle` mit Konfigurationskonstanten  
* Suche nach Fahrzeug-ID und Wache  
* Accordion-UI für Fahrzeuggruppen  
* Chart.js-Statistik der Fahrzeugverfügbarkeit

### Changed

* `autoGenerateIncident()` nutzt jetzt `MAX_PER_WINDOW * 4` als Grenze  
* `generateIncident()` ersetzt starre Limits (15/15 min) durch dynamische Werte  
* `renderVehicles()` gruppiert nach Stadt und zeigt Verfügbarkeit an  

## [v1.2.0] - 2025-05-22

### Added

* Responsive Design mit CSS Grid & Flexbox  
* Max. 4 Einsätze pro 15 Minuten statisch implementiert  
* Fahrzeughistorie: letzte 10 Einsätze  
* Punktevergabe je Einsatz anhand Priorität (1–3)

### Changed

* Farbige Prioritätsanzeige in Incidents  
* Fahrzeugstatus: `frei`, `anfahrend`, `busy`

## [v1.1.0] - 2025-05-18

### Added

* Überörtliche Hilfe: lokale vs. entfernte Fahrzeugzuteilung  
* Verzögerungen für FF und entfernte Wachen  
* Basic `README.md` und Projektstruktur

### Changed

* Einsatzarten auf ca. 50 verschiedene Typen erweitert

## [v1.0.0] - 2025-05-10

### Added

* Grundlegende Leitstellen-Simulation mit HTML/CSS/JS  
* Datenquellen: `wachen.js`, `einsatzarten.js`  
* Grundlegende Fahrzeug-Anzeige und Incident-Generierung

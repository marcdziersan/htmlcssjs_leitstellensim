# Changelog

Alle bedeutenden Änderungen am Feuerwehr-Leitstellenspiel werden in diesem Dokument festgehalten.

## \[Unreleased]

* Live-Countdown in Einsatz-Panel hinzugefügt (⏱ verbleibende Zeit)
* Progress-Bars für Fahrzeugbindung (🚗 anfahrend/im Einsatz)
* Console-Logging der Fahrzeug-Rückgabezeiträume

## \[v1.3.0] - 2025-05-26

### Added

* Dynamische Einsatzlimitierung basierend auf Jahresstatistik (16.000 Einsätze/Jahr)
* `MAX_PER_WINDOW` Berechnung für 15-Minuten-Fenster
* OOP-Refactoring: Klasse `Leitstelle` mit Konfigurationskonstanten
* Suche nach Fahrzeug-ID und Wache
* Accordion-UI für Fahrzeuggruppen
* Chart.js Statistik der Fahrzeugverfügbarkeit

### Changed

* `autoGenerateIncident()` nutzt jetzt `MAX_PER_WINDOW * 4` als Grenze
* `generateIncident()` ersetzt starre Limits (15/15min) durch dynamische Werte
* `renderVehicles()` gruppiert nach Stadt und zeigt Verfügbarkeit an

## \[v1.2.0] - 2025-05-22

### Added

* Responsive Design mit CSS Grid & Flexbox
* Max. 4 Einsätze pro 15 Minuten statisch implementiert
* Fahrzeughistorie: letzte 10 Einsätze
* Punktevergabe je Einsatz anhand Priorität (1–3)

### Changed

* Farbige Prioritätsanzeige in Incidents
* Fahrzeugstatus: `frei`, `anfahrend`, `busy`

## \[v1.1.0] - 2025-05-18

### Added

* Überörtliche Hilfe: lokale vs. entfernte Fahrzeugzuteilung
* Verzögerungen für FF und entfernte Wachen
* Basic `README.md` und Projektstruktur

### Changed

* Einsatzarten auf ca. 50 verschiedene Typen erweitert

## \[v1.0.0] - 2025-05-10

### Added

* Grundlegende Leitstellen-Simulation mit HTML/CSS/JS
* Datenquellen: `wachen.js`, `einsatzarten.js`
* Grundlegende Fahrzeug-Anzeige und Incident-Generierung

---

*Auto-generated CHANGELOG*

# To-Do / Feature Roadmap

## Spielübersicht

Das Feuerwehr-Leitstellenspiel für den Kreis Mettmann ist ein browserbasiertes Management- und Simulationsspiel, das folgende Kernfunktionalitäten bietet:

* **Einsatzgenerierung:** Neue Einsätze werden statistisch basierend auf einer Jahresrate von 16.000 Einsätzen generiert. Ein dynamisches 15‑Minuten-Limit (MAX\_PER\_WINDOW) steuert die maximale Einsatzfrequenz.
* **Fahrzeugmanagement:** Fahrzeuge werden aus realen Wachen des Kreises Mettmann geladen und nach Stadt geclustert. Freiwillige Feuerwehren (FF) haben Schichtbeschränkungen, Berufsfeuerwehren (BF) sind rund um die Uhr einsatzbereit.
* **Zuordnung & Verzögerung:** Lokale Fahrzeuge haben keine Verzögerung, Freiwillige (FF) + überörtliche Fahrzeuge bekommen einen Anfahrts-Delay (3–7s). Nach Einsatzdauer (10–19s) werden sie wieder freigegeben.
* **Einsatzhistorie & Punkte:** Abgeschlossene Einsätze erscheinen in der Historie (max. 10) und bringen Punkte (Priorität 1–3).
* **UI/UX:** Accordion-Ansicht gruppiert Fahrzeuge nach Stadt mit Live-Suche, Chart.js-Statistiken zeigen Verfügbarkeit, Responsive Design, Restzeit-Anzeige & Progress-Bars.

---

## Offene Ideen und Erweiterungen

### 1. Karten-Integration

* **Leaflet.js**: Visualisiere Wachen-Standorte und Einsatzorte auf einer interaktiven Karte.
* **Geokodierung**: Zufällige Einsatzorte innerhalb Stadtgrenzen generieren.

### 2. Dienstplan & Schichtsystem

* **FF-Schichten**: Definiere Personalpläne (Tag/Nacht/Wochenende).
* **Automatische Besetzungsprüfung**: Fahrzeuge nur bei Besetzung verfügbar.

### 3. Einsätze differenzierter nach Tageszeit

* **Tageszeiten-Multiplikatoren**: Mehr Verkehrsunfälle tagsüber, Wohnungsbrände nachts.

### 4. Multiplayer / Koop-Modus

* **WebSockets**: Mehrere Leitstellen synchronisieren Einsätze und Fahrzeuge.

### 5. Persistenz & Speicherung

* **LocalStorage** oder **IndexedDB**: Speichern von Highscore, Historie, Fahrzeugzuständen.
* **Import/Export**: Spielstände exportieren / importieren.

### 6. Dark Mode & Theme-Switcher

* **CSS-Variablen**: Hell/Dunkel-Modus per Toggle umschaltbar.

### 7. Alarmierungs- & Kommunikationssystem

* **In-Game Chat**: Kommunikation zwischen Leitstellen und Einheiten.
* **Funkruf-Nachrichten**: Logische Nachrichten (z.B. ETA, Lageberichte).

### 8. Erweiterte Statistik & Dashboard

* **Heatmaps**: Einsatzhäufigkeit pro Stadtviertel.
* **Zeitraumfilter**: Statistik für letzte Stunde, Tag, Woche.

### 9. Tutorial / Hilfemenü

* **Schritt-für-Schritt-Anleitung**: Onboarding für neue Spieler.
* **Tooltips**: Kurzinfos zu Buttons und Anzeigen.

### 10. Künstliche Verzögerungen & Fehler

* **Fehlerrate**: Chance auf Fahrzeugeausfall oder Pannen.
* **Wetter-Events**: Starkregen, Schnee als Zufallsereignisse beeinflussen Einsätze.

---

*Diese To-Do-Liste kann als Roadmap für kommende Funktionen dienen.*

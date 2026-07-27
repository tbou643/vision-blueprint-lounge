## Was ich in den Daten gefunden habe

**1. Die "2" bei Contact Requests ist kein Anruf und keine Mail.**
Die Kachel zählt Klicks auf Telefon-/Mail-Links, nicht eingegangene Kontakte. In der Datenbank stehen genau zwei `phone_click`-Events, beide am 23.07. auf der About-Seite (Nummer +1 403 819 7834). Jemand hat also die Nummer angetippt - ob danach wirklich gewählt wurde, kann die Website nicht wissen. Das Label "Contact Requests (Mail/Tel)" suggeriert fälschlich echte Anfragen.

**2. Der PDF-Download-Bug ist bestätigt (Zeilenlimit).**
Es gibt genau einen `guide_download` - am 13.07.2026, 20:33. Bei "90 Tage" müsste er also sichtbar sein.
Ursache: Die Auswertungsfunktion lädt alle Events in einem Rutsch. Das Backend liefert pro Anfrage aber maximal 1000 Zeilen aus, sortiert nach neuesten zuerst. Seit dem 13.07. sind bereits 1254 Events aufgelaufen (überwiegend Heartbeat-Events zur Verweildauer-Messung). Der Download fällt damit hinten aus dem Ergebnis heraus - er ist ab ca. 14 Tagen Zeitraum unsichtbar. Dasselbe betrifft still und leise **alle** Kennzahlen für 30d und 90d: Besucher, Pageviews, Quellen, Geo, Vergleich mit Vorperiode - alles rechnet nur auf den letzten ~1000 Events und ist damit zu niedrig.

## Was ich ändern werde

**A. Vollständige Daten laden (Kern-Fix)**
In `supabase/functions/admin-analytics/index.ts` wird das Laden der Events auf seitenweises Abrufen umgestellt: in 1000er-Blöcken so lange nachladen, bis alle Events des Zeitraums (inkl. Vorperiode) geladen sind. Damit stimmen 30d und 90d wieder - der PDF-Download vom 13.07. taucht bei 90d als 1 auf.
Zusätzlich lade ich nur die tatsächlich benötigten Spalten statt `*`, das reduziert die Datenmenge deutlich.

**B. Kontakt-Kennzahl ehrlich benennen**
- Kachel umbenennen zu "Kontakt-Klicks (Tel/Mail)" mit dem Hinweis "Klicks auf Telefon-/Mail-Links - kein Nachweis für ein tatsächliches Gespräch".
- Im Dashboard aufsplitten in Telefon-Klicks und Mail-Klicks, damit du siehst, worüber Leute Kontakt suchen.
- Die Conversion Rate rechnet aktuell diese Klicks als Conversions mit (daher die 4,2 %). Ich stelle sie auf echte Leads um (Formular-Eintragungen) und zeige die Klick-basierte Rate separat als "Kontakt-Intent".

**C. Kleiner Zusatz gegen Datenmüll**
Die Heartbeat-Events (alle 15 Sek. pro Besucher) machen den Großteil der Datenmenge aus. Ich reduziere sie auf ein Intervall von 30 Sek. und deckele sie pro Seitenaufruf, damit das Volumen langfristig handhabbar bleibt. An der Verweildauer-Messung ändert das nichts Wesentliches.

## Technische Details

- `supabase/functions/admin-analytics/index.ts`: Paginierendes Laden per `.range(offset, offset+999)` in einer Schleife (Abbruch bei < 1000 Rückgabezeilen oder Sicherheitsgrenze 50.000); explizite Spaltenauswahl statt `select("*")`; `contactRequests` in `phoneClicks` / `emailClicks` aufgeteilt und `conversionRate` auf Waitlist-Signups umgestellt, `contactIntentRate` neu.
- `src/pages/Admin.tsx`: Kachel-Beschriftungen, Aufteilung Tel/Mail, neue Conversion-Definition inkl. Tooltip-Text.
- `src/lib/analytics.ts`: Heartbeat-Intervall 15s -> 30s, Obergrenze pro Pageview.

Nach den Änderungen wird die Edge Function neu deployt und ich prüfe direkt gegen die echten Daten, dass 90d den einen PDF-Download zeigt.

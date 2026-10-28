# Guadagni sondaggi — web app

Tracker personale di **guadagni**, **prelievi** e **importi in attesa di approvazione** sui portali di sondaggi retribuiti (Sermo, M3 Global Research, AllGlobalCircle, HabCentral, ZoomRx; le piattaforme si aggiungono o rimuovono dall'app).

È una PWA: si apre da un link e si installa sulla schermata Home del telefono come un'app. Funziona anche offline.

## Dati e privacy

I dati restano **solo sul dispositivo** (`localStorage` del browser): nessun server, nessun account. Il codice di questo repository non contiene dati personali.

- Ogni dispositivo ha i suoi dati: telefono e PC non si sincronizzano tra loro.
- Per spostarli usa **Scarica backup** su un dispositivo e **Importa backup** sull'altro.
- Se disinstalli l'app o cancelli i dati del sito in Chrome, i dati si perdono: fai backup periodici.

## Pubblicazione con GitHub Pages

Settings → Pages → *Build and deployment* → Source: **Deploy from a branch**, Branch: `main`, cartella `/ (root)`.
Dopo 1–2 minuti l'app è su `https://<utente>.github.io/<nome-repo>/`.

## Installazione sul telefono (Chrome Android)

Apri il link → menu ⋮ → **Installa app** (o *Aggiungi a schermata Home*).

## Aggiornare l'app

Dopo una modifica ai file, aumenta `VERSION` in `sw.js` (es. `"v2"`) e fai push. Il telefono scarica la nuova versione alla successiva apertura con rete.

## Struttura

| File | Ruolo |
|---|---|
| `index.html`, `styles.css`, `app.js` | Interfaccia e logica |
| `manifest.webmanifest` | Nome, icone e modalità app |
| `sw.js` | Service worker (offline e cache) |
| `fonts/` | Schibsted Grotesk (SIL OFL 1.1, vedi `fonts/OFL.txt`) |
| `icons/` | Icone |

Formato dati (importi in centesimi di euro):

```json
{ "v": 1,
  "sites":   [{ "id": "sermo", "name": "Sermo", "color": "#3E6FD8" }],
  "months":  { "2026-10": { "sermo": { "g": 1250, "p": 0 } } },
  "pending": [{ "id": "w…", "site": "sermo", "amount": 500, "note": "", "date": "2026-10-28" }] }
```

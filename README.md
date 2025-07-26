# 🥗 NutriHouse — Gestionale per nutrizionisti

**NutriHouse** è un'applicazione full-stack pensata per supportare i nutrizionisti nella gestione quotidiana dei pazienti, delle diete e dei piani alimentari.  
La versione 2.0 introduce un importante refactoring del codice e una riorganizzazione strutturale per migliorare scalabilità, manutenibilità e usabilità del progetto.

---

## 🚀 Funzionalità principali

- ✅ Gestione pazienti: creazione, modifica, eliminazione, visualizzazione dettagliata.
- 📅 Gestione diete giornaliere associate ai pazienti.
- 🧮 Planner nutrizionale con visualizzazione settimanale.
- 🍏 Gestione alimenti e informazioni nutrizionali.
- 🔐 Autenticazione utente con token JWT.
- 🌐 Interfaccia moderna in React con Material UI.

---

## 🛠️ Stack Tecnologico

### Frontend
- React
- Vite
- Material UI
- Axios
- React Router

### Backend (modulare, in repo separata)
- Spring Boot
- MySQL
- Spring Security (JWT)
- Maven

---

## 🧠 Architettura (v2.0)

La versione 2.0 introduce:

- 🔄 Refactoring dei componenti React e riorganizzazione in cartelle logiche (`auth`, `pages`, `services`, `context`).
- 📁 Separazione chiara tra logica di presentazione e business logic.
- 📦 Modularità migliorata per scalabilità futura.
- 🧼 Pulizia dei file inutilizzati e semplificazione delle importazioni.

---

## 📂 Struttura del frontend
frontend/
├── src/
│   ├── pages/              # Tutte le pagine divise per sezione (auth, pazienti, diete, ecc.)
│   ├── components/         # Componenti riutilizzabili
│   ├── context/            # Gestione auth context
│   ├── services/           # Chiamate API centralizzate
│   ├── routes/             # Routing protetto
│   ├── utils/              # Utility varie
│   └── App.jsx             # Entry point applicazione

---

## 🧪 Come avviare il progetto

1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-utente/NutriHouse.git

✍️ Autore

Francesco Chifari
📧 francescochifari@email.it
📍 Palermo, Italy
💻 Junior Software Developer




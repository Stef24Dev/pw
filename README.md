# Project work

## Descrizione del Progetto

Questo progetto rappresenta un'applicazione web dockerizzata composta da due container distinti. Il frontend è gestito con React, mentre il backend utilizza il framework Python Flask. Il backend legge dati da due file CSV per fornire le informazioni richieste al frontend.

### Struttura del Progetto

- **Frontend**: Implementato con React, offre un'interfaccia utente interattiva e dinamica.
- **Backend**: Sviluppato con Flask, gestisce le richieste del frontend e legge i dati da due file CSV.

## Requisiti

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installazione e Avvio del Progetto in Locale

Segui questi passaggi per clonare e avviare il progetto sul tuo ambiente locale:

1. **Clona il repository del progetto:**

   ```sh
   git clone https://github.com/Stef24Dev/pw.git

2. **Accedi alla cartella principale del progetto:**

   ```sh
   cd pw

3. **Avvia i container Docker e scegli quanto ridondare l'applicazione utilizzando Docker Compose:**

   ```sh
   docker-compose up --scale app=3

4. **Una volta avviato aprire il browser dal link**

   [progetto_bul](http://localhost)

### Dettagli Tecnici
## Frontend
Il frontend dell'applicazione è stato sviluppato utilizzando React. Questo consente una gestione efficiente dello stato dell'applicazione e offre un'interfaccia utente reattiva.

## Backend
Il backend è implementato con Flask, un microframework Python che facilita lo sviluppo rapido di applicazioni web. Il backend legge dati da due file CSV, fornendo le informazioni richieste al frontend attraverso API RESTful.

# Dockerfile per React
FROM node:14-alpine

# Imposta il working directory all'interno del container
WORKDIR /app/frontend

# Copia il package.json e installa le dipendenze
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install

# Copia il resto del codice dell'applicazione
COPY frontend .

# Comando per buildare l'applicazione React
RUN npm run build

# Esponi la porta su cui React è in ascolto
EXPOSE 3000

# Comando per avviare il server di sviluppo di React
CMD ["yarn", "start"]

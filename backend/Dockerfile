# Dockerfile per il backend Flask

# Usa un'immagine di Python come base
FROM python:3.9-slim

# Imposta il working directory all'interno del container
WORKDIR /app/backend

# Copia il requirements.txt e installa le dipendenze
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il resto del codice dell'applicazione
COPY backend .

# Esponi la porta su cui Flask sta in ascolto (di solito la porta 5000)
EXPOSE 5000

# Comando per avviare l'applicazione Flask
CMD ["python", "server.py", "--host=0.0.0.0"]


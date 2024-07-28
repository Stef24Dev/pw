# Dockerfile Flask
FROM python:3.9-slim

# Imposta il working directory all'interno del container
WORKDIR /app

# Copia il requirements.txt e installa le dipendenze
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il resto del codice dell'applicazione
COPY . .

# Esponi la porta su cui Flask sta in ascolto
EXPOSE 5000

# Comando per avviare l'applicazione Flask
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "server:app"]

from flask import Flask, request
from read_data import *
from flask_cors import CORS

# cantieri_fibra_fwa, cantieri_terminati_fibra_fwa, fibra_fwa_in_italia, readCsvFile, cantieri_italia_fibra


app = Flask(__name__)
cors = CORS(app)

file_name = ['stato_lavori', 'italy_geo']

def get_df_lavori(file_name: str):
    data_frame = readCsvFile(file_name)
    return data_frame

def get_df_italy(file_name: str):
    data_frame = readCsvFile(file_name)
    return data_frame

DF_LAVORI = get_df_lavori(file_name[0])
DF_ITALY = get_df_italy(file_name[1])

@app.route("/")
def simple_endPoint():
    return "Hello world"

@app.route("/nazionale")
def get_nazionale_endPoint():
    return get_nazionale()

@app.route("/regionale")
def get_regionale_endPoint():
    return get_regionale()

@app.route("/cantieri_italia_fibra")
def cantieri_italia_fibra_endPoint():
    return cantieri_italia_fibra(DF_LAVORI)

@app.route("/fibra_fwa_in_italia")
def fibra_fwa_in_italia_endPoint():
    return fibra_fwa_in_italia(DF_LAVORI)

@app.route("/cantieri_fibra_fwa")
def cantieri_fibra_fwa_endPoint():
    return cantieri_fibra_fwa(DF_LAVORI)

@app.route("/cantieri_terminati_fibra_fwa")
def cantieri_terminati_fibra_fwa_endPoint():
    return cantieri_terminati_fibra_fwa(DF_LAVORI)

@app.route("/cantieri_fwa_region", methods=['POST'])
def cantieri_fwa_region_endPoint():
    if request.method == 'POST':
        data = request.get_json()
        region = data.get('region')
    else:
        region = ''

    print(f'la mia regione è: {region}')

    df = regione_specifica(DF_ITALY, region)
    return cantieri_fwa_region(df)

@app.route("/cantieri_fwa_region_anno", methods=['POST'])
def cantieri_fwa_region_anno_endPoint():
    if request.method == 'POST':
        data = request.get_json()
        region = data.get('region')
    else:
        region = ''

    df = regione_specifica(DF_ITALY, region)
    return cantieri_fwa_region_anno(df)

@app.route("/piani_fwa_region", methods=['POST'])
def piani_fwa_region_endPoint():
    if request.method == 'POST':
        data = request.get_json()
        region = data.get('region')
        year = data.get('year')
    else:
        region = ''

    print(f"region {region}, year {year}")

    df = regione_specifica(DF_ITALY, region)
    return piani_fwa_region(df, year)

@app.route("/piani_fibra_region", methods=['POST'])
def piani_fibra_region_endPoint():
    if request.method == 'POST':
        data = request.get_json()
        region = data.get('region')
        year = data.get('year')

    df = regione_specifica(DF_ITALY, region)
    return piani_fibra_region(df, year)

@app.route("/get_year")
def get_year_endPoint():
    return get_year()

@app.route("/get_region")
def get_region_endPoint():
    return get_region()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
import pandas as pd

# Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
stato_lavori = 'stato_lavori'
italy_geo = 'italy_geo'
str_prog = 'in programmazione|in progettazione'
str_esec = 'in esecuzione'
str_term = 'terminato|lavori chiusi|in collaudo'

# Input: name of the file that has to read
# Output: dataframe with the content of the csv file
def readCsvFile(fileName):
    df = pd.read_csv(f'./DatiCSV/{fileName}.csv', sep=';', encoding='UTF-8')
    return df

def get_nazionale():
    return {'cantieri_italia_fibra': 'line', 'fibra_fwa_in_italia': 'pie', 'cantieri_fibra_fwa': 'line', 'cantieri_terminati_fibra_fwa': 'line'}

def get_regionale():
    return {'cantieri_fwa_region': 'line', 'cantieri_fwa_region_anno': 'pie', 'piani_fwa_region': 'line', 'piani_fibra_region': 'line'}

def get_year():
    df = regione_specifica(readCsvFile(italy_geo), 'Lombardia')
    anni_disponibili = sorted(df['Piano fibra (anno)'].unique())
    return anni_disponibili

def get_region():
    df = readCsvFile(stato_lavori)
    regioni = df['Regione'].unique()
    return regioni.tolist()

#Input: dataframe with the content of the csv file
#Output: list of dataframe with the informations to draw the graphic
#    1 cantieri in italia per la fibra (progettazione, esecuzione, terminati)
def cantieri_italia_fibra(df:pd.DataFrame):

    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)
    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')

    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()

    lista = [terminati, in_esecuzione, in_progettazione]
    keys_len = 0
    keys = 0

    for i in range(3):
        if keys_len < len(lista[i]):
            keys_len = len(lista[i])
            keys = lista[i]

    my_obj = []
    for key in keys.keys():
        my_obj.append({'name': key, 'Terminati': int(terminati.get(key, 0)), 'Esecuzione': int(in_esecuzione.get(key, 0)), 'Progettazione': int(in_progettazione.get(key, 0))})

    return my_obj

#    2 percentuale presenze fibra e fwa (nessuna, fibra o fwa, entrambe)
def fibra_fwa_in_italia(df:pd.DataFrame):
    c1_1 = df[(df['Fibra'] == 1) & (df['FWA'] == 1)].shape[0]
    c0_1 = df[(df['Fibra'] == 1) | (df['FWA'] == 1)].shape[0] - c1_1 
    c0_0 = df[(df['Fibra'] == 0) & (df['FWA'] == 0)].shape[0]

    values = {'Entrambe':c1_1, 'Fibra o FWA': c0_1, 'Nessuna': c0_0}
    my_obj = []

    for key in values.keys():
        my_obj.append({'name': key, 'value': values[key]})
    return my_obj

#    3 conteggio cantieri aperti e non per fibra e fwa per ogni regione
def cantieri_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Fibra'] == 1]['Regione'].value_counts()
    fwa = df[df['FWA'] == 1]['Regione'].value_counts()

    my_obj = []
    for key in fwa.keys():
        my_obj.append({'name': key, 'Fibra': int(fibra_cablata[key]), 'FWA': int(fwa[key])})
    return my_obj

#    4 distribuzione lavori finiti per regione di fibra e fwa
def cantieri_terminati_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]['Regione'].value_counts() 
    fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]['Regione'].value_counts()

    my_obj = []
    for key in fwa.keys():
        my_obj.append({'name': key, 'Fibra': int(fibra_cablata[key]), 'FWA': int(fwa[key])})
    return my_obj

def regione_specifica(df_geo:pd.DataFrame, region: str):
    df_geo.info()
    df_geo_citta = df_geo.copy()
    df_geo_citta_filter = df_geo_citta['comune'].isin(readCsvFile(stato_lavori)['Citta'].unique())
    df_geo_citta = df_geo_citta[df_geo_citta_filter]

    df = readCsvFile(stato_lavori)
    df_region = df[df['Regione'] == region]

    return df_region

#    5 cantieri in x regione per fwa
def cantieri_fwa_region(df: pd.DataFrame):
    terminati = df[(df['Stato FWA'].str.contains(str_term, na=False)) & (df['FWA'] != 0)]['Provincia'].value_counts().sort_index()
    in_esecuzione = df[(df['Stato FWA'].str.contains(str_esec, na=False)) & (df['FWA'] != 0)]['Provincia'].value_counts().sort_index()
    in_progettazione = df[(df['Stato FWA'].str.contains(str_prog, na=False)) & (df['FWA'] != 0)]['Provincia'].value_counts().sort_index()

    lista = [terminati, in_esecuzione, in_progettazione]
    keys_len = 0
    keys = 0

    for i in range(3):
        if keys_len < len(lista[i]):
            keys_len = len(lista[i])
            keys = lista[i]

    my_obj = []
    for key in keys.keys():
        my_obj.append({'name': key, 'Terminati': int(terminati.get(key, 0)), 'Esecuzione': int(in_esecuzione.get(key, 0)), 'Progettazione': int(in_progettazione.get(key, 0))})

    return my_obj

#    6 piani decisi in x regione per fwa in anno
def cantieri_fwa_region_anno(df: pd.DataFrame):
    totale = df[df['FWA'] == 1]['Piano FWA (anno)'].value_counts()

    my_obj = []

    for key in totale.keys():
        my_obj.append({'name': key, 'value': int(totale.get(key, 0))})
    return my_obj

#    7 cantieri in x regione per fwa in determinato anno
def piani_fwa_region(df: pd.DataFrame, anno: int):
    terminati = df[(df['Stato FWA'].str.contains(str_term, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()
    in_esecuzione = df[(df['Stato FWA'].str.contains(str_esec, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()
    in_progettazione = df[(df['Stato FWA'].str.contains(str_prog, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()

    lista = [terminati, in_esecuzione, in_progettazione]
    keys_len = 0
    keys = 0

    for i in range(3):
        if keys_len < len(lista[i]):
            keys_len = len(lista[i])
            keys = lista[i]

    my_obj = []
    for key in keys.keys():
        my_obj.append({'name': key, 'Terminati': int(terminati.get(key, 0)), 'Esecuzione': int(in_esecuzione.get(key, 0)), 'Progettazione': int(in_progettazione.get(key, 0))})

    return my_obj

#    8 cantieri in x regione per fibra in determinato anno
def piani_fibra_region(df: pd.DataFrame, anno: int):
    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()

    lista = [terminati, in_esecuzione, in_progettazione]
    keys_len = 0
    keys = 0

    for i in range(3):
        if keys_len < len(lista[i]):
            keys_len = len(lista[i])
            keys = lista[i]

    my_obj = []
    for key in keys.keys():
        my_obj.append({'name': key, 'Terminati': int(terminati.get(key, 0)), 'Esecuzione': int(in_esecuzione.get(key, 0)), 'Progettazione': int(in_progettazione.get(key, 0))})

    return my_obj
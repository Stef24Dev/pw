import pandas as pd

# Per printare risultati se == True
debug_flag = True

# Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
stato_lavori = 'stato_lavori'
italy_geo = 'italy_geo'
str_prog = 'in programmazione|in progettazione'
str_esec = 'in esecuzione'
str_term = 'terminato|lavori chiusi|in collaudo'

# Input: name of the file that has to read
# Output: dataframe with the content of the csv file
def readCsvFile(fileName):
    df = pd.read_csv(f'C:/Users/stefan.muntianu/Stage/pw/DatiCSV/{fileName}.csv', sep=';', encoding='UTF-8')
    return df

#Input: dataframe with the content of the csv file
#Output: list of dataframe with the informations to draw the graphic
#    1 cantieri in italia per la fibra (progettazione, esecuzione, terminati)
def cantieriItaliaFibra(df:pd.DataFrame):

    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)
    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')

    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()

    return {'In proggettazione': in_progettazione.to_dict(), 'In esecuzione': in_esecuzione.to_dict(), 'Terminati': terminati.to_dict()}

#    2 percentuale presenze fibra e fwa (nessuna, fibra o fwa, entrambe)
def fibra_fwa_in_italia(df:pd.DataFrame):
    c1_1 = df[(df['Fibra'] == 1) & (df['FWA'] == 1)].shape[0]
    c0_1 = df[(df['Fibra'] == 1) | (df['FWA'] == 1)].shape[0] - c1_1 
    c0_0 = df[(df['Fibra'] == 0) & (df['FWA'] == 0)].shape[0]

    return {"Entrambe": c1_1, "Fibra o FWA": c0_1, "Nessuna": c0_0}

#    3 conteggio cantieri aperti e non per fibra e fwa per ogni regione
def cantieri_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Fibra'] == 1]['Regione'].value_counts()
    fwa = df[df['FWA'] == 1]['Regione'].value_counts()

    return {'Fibra': fibra_cablata.to_dict(), 'FWA': fwa.to_dict()}

#    4 distribuzione lavori finiti per regione di fibra e fwa
def cantieri_terminati_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]['Regione'].value_counts() 
    fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]['Regione'].value_counts()

    return {'Fibra': fibra_cablata.to_dict(), 'FWA': fwa.to_dict()}

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

    return {'In proggettazione': in_progettazione.to_dict(), 'In esecuzione': in_esecuzione.to_dict(), 'Terminati': terminati.to_dict()}

#    6 piani decisi in x regione per fwa in anno
def cantieri_fwa_region_anno(df: pd.DataFrame):
    totale = df[df['FWA'] == 1]['Piano FWA (anno)'].value_counts()
    return totale.to_dict()

#    7 cantieri in x regione per fwa in determinato anno
def piani_fwa_region(df: pd.DataFrame, anno: int):
    terminati = df[(df['Stato FWA'].str.contains(str_term, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()
    in_esecuzione = df[(df['Stato FWA'].str.contains(str_esec, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()
    in_progettazione = df[(df['Stato FWA'].str.contains(str_prog, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()

    return {'In proggettazione': in_progettazione.to_dict(), 'In esecuzione': in_esecuzione.to_dict(), 'Terminati': terminati.to_dict()}

#    8 cantieri in x regione per fibra in determinato anno
def piani_fibra_region(df: pd.DataFrame, anno: int):
    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()

    return {'In proggettazione': in_progettazione.to_dict(), 'In esecuzione': in_esecuzione.to_dict(), 'Terminati': terminati.to_dict()}

if debug_flag:
    print(f"Cantiere italia fibra = \n\n{cantieriItaliaFibra(readCsvFile(stato_lavori))}")
    print()
    print(f"italia fibrac_fwa = \n\n{fibra_fwa_in_italia(readCsvFile(stato_lavori))}")
    print()
    print(f"Cantiere italia fibra_fwa = \n\n{cantieri_fibra_fwa(readCsvFile(stato_lavori))}")
    print()
    print(f"Cantiere terminati italia fibra = \n\n{cantieri_terminati_fibra_fwa(readCsvFile(stato_lavori))}")
    print()
    print(f"Cantieri JSON = {cantieri_fwa_region(regione_specifica(readCsvFile(italy_geo), 'Lombardia'))}")
    print()
    print(f"Cantieri fwa region anno = {cantieri_fwa_region_anno(regione_specifica(readCsvFile(italy_geo), 'Lombardia'))}")
    print()
    print(f"Piani fwa region = {piani_fwa_region(regione_specifica(readCsvFile(italy_geo), 'Lombardia'), 2022)}")
    print()
    print(f"Piani fibra region = {piani_fibra_region(regione_specifica(readCsvFile(italy_geo), 'Lombardia'), 2022)}")
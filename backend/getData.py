import pandas as pd

#TODO: non outputtare un DataFrame ma un json da poter poi convertire con un metodo e poi mandare al F-end


stato_lavori = 'stato_lavori'
italy_geo = 'italy_geo'
pcn_route = 'pcn_route'
# Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
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
def cantieriItaliaFibra(df:pd.DataFrame):

    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)
    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')

    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()

    return {'In proggettazione': in_progettazione, 'In esecuzione': in_esecuzione, 'Terminati': terminati}


def fibra_fwa_in_italia(df:pd.DataFrame):
    c1_1 = df[(df['Fibra'] == 1) & (df['FWA'] == 1)].shape[0]
    c0_1 = df[(df['Fibra'] == 1) | (df['FWA'] == 1)].shape[0] - c1_1 #df[(df['Fibra'] == 1) & (df['FWA'] == 0)].shape[0] + df[(df['Fibra'] == 0) & (df['FWA'] == 1)].shape[0]
    c0_0 = df[(df['Fibra'] == 0) & (df['FWA'] == 0)].shape[0]
    print(f"1-1: {c1_1}, 0-1: {c0_1}, 0-0: {c0_0}")
    totale = pd.Series([c1_1, c0_1, c0_0], index=['Entrambe', 'Fibra o FWA', 'Nessuna'])

    #TODO da rivedere return
    return totale

def cantieri_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Fibra'] == 1]['Regione'].value_counts() # df.loc[df['Fibra'] == 1, ['Regione', 'Fibra']].groupby(by='Regione').sum()
    fwa = df[df['FWA'] == 1]['Regione'].value_counts()

    conteggio_combinato = pd.DataFrame({'Fibra': fibra_cablata, 'FWA': fwa})

    return {'Fibra': fibra_cablata, 'FWA': fwa}

def cantieri_terminati_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]['Regione'].value_counts() 
    fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]['Regione'].value_counts()

    conteggio_combinato_lavori = pd.DataFrame({'Fibra': fibra_cablata, 'FWA': fwa})

    return {'Fibra': fibra_cablata, 'FWA': fwa}

def regione_specifica(df_geo:pd.DataFrame, region: str):
    df_geo.info()
    df_geo_citta = df_geo.copy()
    df_geo_citta_filter = df_geo_citta['comune'].isin(readCsvFile(stato_lavori)['Citta'].unique())
    df_geo_citta = df_geo_citta[df_geo_citta_filter]

    df = readCsvFile(stato_lavori)

    df_region = df[df['Regione'] == region]

    return df_region

def cantieri_fwa_region(df: pd.DataFrame):
    terminati = df[(df['Stato FWA'].str.contains(str_term, na=False)) & (df['FWA'] != 0)]['Provincia'].value_counts().sort_index()
    in_esecuzione = df[(df['Stato FWA'].str.contains(str_esec, na=False)) & (df['FWA'] != 0)]['Provincia'].value_counts().sort_index()
    in_progettazione = df[(df['Stato FWA'].str.contains(str_prog, na=False)) & (df['FWA'] != 0)]['Provincia'].value_counts().sort_index()

    return {'In proggettazione': in_progettazione, 'In esecuzione': in_esecuzione, 'Terminati': terminati}

def cantieri_fwa_region_anno(df: pd.DataFrame):
    totale = df[df['FWA'] == 1]['Piano FWA (anno)'].value_counts()
    print(f"CIOAONEOINO = \n{totale}")

def piani_fwa_region(df: pd.DataFrame, anno: int):
    terminati = df[(df['Stato FWA'].str.contains(str_term, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()
    in_esecuzione = df[(df['Stato FWA'].str.contains(str_esec, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()
    in_progettazione = df[(df['Stato FWA'].str.contains(str_prog, na=False)) & (df['Piano FWA (anno)'] == anno)]['Provincia'].value_counts()

    return {'In proggettazione': in_progettazione, 'In esecuzione': in_esecuzione, 'Terminati': terminati}

def piani_fibra_region(df: pd.DataFrame, anno: int):
    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Piano fibra (anno)'] == anno)]['Provincia'].value_counts()

    return {'In proggettazione': in_progettazione, 'In esecuzione': in_esecuzione, 'Terminati': terminati}

# print(f"Cantiere italia fibra = \n\n{cantieriItaliaFibra(readCsvFile(stato_lavori))}")
# print()
# print(f"italia fibrac_fwa = \n\n{fibra_fwa_in_italia(readCsvFile(stato_lavori))}")
# print()
# print(f"Cantiere italia fibra_fwa = \n\n{cantieri_fibra_fwa(readCsvFile(stato_lavori))}")
# print()
# print(f"Cantiere terminati italia fibra = \n\n{cantieri_terminati_fibra_fwa(readCsvFile(stato_lavori))}")
# print()
# print(f"Regione = \n\n{regione_specifica(readCsvFile(italy_geo), 'Lombardia')}")

# cantieri_fwa_region_anno(regione_specifica(readCsvFile(italy_geo), 'Lombardia'))
print(piani_fwa_region(regione_specifica(readCsvFile(italy_geo), 'Lombardia'), 2022))
print(piani_fibra_region(regione_specifica(readCsvFile(italy_geo), 'Lombardia'), 2022))

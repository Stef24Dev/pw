```
import pandas as pd

stato_lavori = 'stato_lavori'
italy_geo = 'italy_geo'
pcn_route = 'pcn_route'

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

    # Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
    str_prog = 'in programmazione|in progettazione'
    str_esec = 'in esecuzione'
    str_term = 'terminato|lavori chiusi|in collaudo'

    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()

    return [terminati, in_esecuzione, in_progettazione]


def fibra_fwa_in_italia(df:pd.DataFrame):
    c1_1 = df[(df['Fibra'] == 1) & (df['FWA'] == 1)].shape[0]
    c0_1 = df[(df['Fibra'] == 1) | (df['FWA'] == 1)].shape[0] - c1_1 #df[(df['Fibra'] == 1) & (df['FWA'] == 0)].shape[0] + df[(df['Fibra'] == 0) & (df['FWA'] == 1)].shape[0]
    c0_0 = df[(df['Fibra'] == 0) & (df['FWA'] == 0)].shape[0]
    print(f"1-1: {c1_1}, 0-1: {c0_1}, 0-0: {c0_0}")
    totale = pd.Series([c1_1, c0_1, c0_0], index=['Entrambe', 'Fibra o FWA', 'Nessuna'])

    return totale

def cantieri_fibra_fwa(df:pd.DataFrame):
    fibra_cablata = df[df['Fibra'] == 1]['Regione'].value_counts() # df.loc[df['Fibra'] == 1, ['Regione', 'Fibra']].groupby(by='Regione').sum()
    fwa = df[df['FWA'] == 1]['Regione'].value_counts()

    conteggio_combinato = pd.DataFrame({'Fibra': fibra_cablata, 'FWA': fwa})

    return conteggio_combinato

def cantieri_terminati_fibra_fwa(df:pd.DataFrame):
    str_term = 'terminato|lavori chiusi|in collaudo'

    fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]['Regione'].value_counts() 
    fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]['Regione'].value_counts()

    conteggio_combinato_lavori = pd.DataFrame({'Fibra': fibra_cablata, 'FWA': fwa})

    return conteggio_combinato_lavori

def regione_specifica(df_geo:pd.DataFrame):
    df_geo.info()
    df_geo_citta = df_geo.copy()
    df_geo_citta_filter = df_geo_citta['comune'].isin(readCsvFile(stato_lavori)['Citta'].unique())
    df_geo_citta = df_geo_citta[df_geo_citta_filter]

    print(df_geo_citta)

print(cantieriItaliaFibra(readCsvFile(stato_lavori)))
print()
print(fibra_fwa_in_italia(readCsvFile(stato_lavori)))
print()
print(cantieri_fibra_fwa(readCsvFile(stato_lavori)))
print()
print(cantieri_terminati_fibra_fwa(readCsvFile(stato_lavori)))
print()
print(regione_specifica(readCsvFile(italy_geo)))
```

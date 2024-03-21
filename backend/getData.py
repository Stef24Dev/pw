import pandas as pd

# Input: name of the file that has to read
# Output: dataframe with the content of the csv file
def readCsvFile(fileName):
    df = pd.read_csv(f'D:/Scuola/DevOps_2023-2024/pw/DatiCSV/{fileName}.csv', sep=';', encoding='UTF-8')
    return df

#Input: dataframe with the content of the csv file
#Output: list of dataframe with the informations to draw the graphic
def cantieriItaliaFibra(df):

    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)
    df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
    df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')

    # Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
    str_prog = 'in programmazione|in progettazione' # In progettazione
    str_esec = 'in esecuzione' # In esecuzione
    str_term = 'terminato|lavori chiusi|in collaudo' # Terminato

    terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
    in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()

    return [terminati, in_esecuzione, in_progettazione]

print(cantieriItaliaFibra(readCsvFile('stato_lavori')))
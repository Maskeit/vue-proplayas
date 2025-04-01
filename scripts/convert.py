import pandas as pd

# Cargar el archivo Excel
df = pd.read_excel("./nodos.xlsx", engine='openpyxl')

# Guardar como CSV
df.to_csv("nodos.csv", index=False)

print("Conversión completada.")
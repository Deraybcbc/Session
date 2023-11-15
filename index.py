import matplotlib.pyplot as plt
import pandas as pd
import json
import os

# Datos de ejemplo en formato JSON
with open ('letras.json','r') as archivo:
    datos = pd.read_json(archivo)

# Crear el gráfico
plt.bar(datos['etiquetas'], datos['valores'])
plt.xlabel('Etiquetas')
plt.ylabel('Valores')
plt.title('Gráfico de barras')

# Crear la carpeta si no existe
carpeta_destino = 'graficos'
if not os.path.exists(carpeta_destino):
    os.makedirs(carpeta_destino)

# Guardar el gráfico en la carpeta
ruta_grafico = os.path.join(carpeta_destino, 'grafico.png')
plt.savefig(ruta_grafico)

# Imprimir la ruta del gráfico para que Node.js la pueda utilizar
print(ruta_grafico)
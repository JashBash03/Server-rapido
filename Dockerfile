# Usa la imagen oficial de Node.js como base
FROM node:18

# Directorio donde se copiará el código de la aplicación
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si los tienes)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación estará corriendo (3000 por defecto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
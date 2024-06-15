FROM node:18

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o resto do código da aplicação
COPY . .

# Instalando as definições de tipos do TypeScript
RUN npm install --save-dev @types/node @types/express

# Comando para rodar a aplicação
CMD ["npm", "start"]

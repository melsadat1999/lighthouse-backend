FROM justinribeiro/lighthouse
USER root

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

RUN  npm install -g lighthouse

# RUN npm install -g npm@8.19.2


RUN npm install --force

COPY . .
    
RUN npm run build

CMD ["node","dist/main.js"]

FROM node:20


COPY package*.json ./


RUN npm install 

COPY vite.config.js ./

COPY ./src ./src
# RUN npm install vite -- save-dev
# RUN npm install vite@latest

CMD ["npm", "run", "dev"]

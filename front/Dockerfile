FROM node:20


COPY package*.json ./

COPY vite.config.js ./

RUN npm install -g 

RUN npm install vite --save-dev
CMD ["npm", "run", "dev"]


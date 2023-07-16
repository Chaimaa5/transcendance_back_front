FROM node:20

RUN npm install -g @nestjs/cli

COPY package*.json ./

COPY tsconfig.json ./
# instal dependecies
RUN npm install -g 

COPY passport-42.d.ts ./


RUN npm install --force

RUN yes | npx prisma generate  
RUN yes | npx prisma migrate dev 
CMD   npm run start:dev
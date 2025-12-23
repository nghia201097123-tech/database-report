FROM node:18.13.0

WORKDIR /app

COPY ["package.json","./"]
COPY . .

RUN npm install -f

RUN npm install pm2 -f
RUN npm install moment-timezone


CMD ["npm", "run", "dev"]
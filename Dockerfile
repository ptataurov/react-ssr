FROM node:carbon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY build /app
COPY src /app

EXPOSE 8080
CMD ["start"]
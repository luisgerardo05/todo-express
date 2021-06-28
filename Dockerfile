FROM node:stretch-slim

WORKDIR "/home/todo"

COPY ./package.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "start"]
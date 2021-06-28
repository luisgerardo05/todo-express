FROM node:stretch-slim

WORKDIR "/home/todo"

COPY ./package.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "start"]


FROM python:3.8.3-buster

RUN pip install locust==1.0.1

COPY locustfile.py /locustfile.py
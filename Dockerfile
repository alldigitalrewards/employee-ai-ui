FROM node:20

WORKDIR /app
COPY . /app

RUN npm install -g serve

RUN npm install
RUN npm run build

CMD ["/app/startup.sh"]

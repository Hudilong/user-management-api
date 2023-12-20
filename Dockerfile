FROM node:18.16.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# node server
EXPOSE 3000

CMD ["yarn", "dev"]
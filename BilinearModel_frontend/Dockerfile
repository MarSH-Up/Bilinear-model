FROM node:18-alpine

WORKDIR /app
COPY package*.json yarn.lock /app/

RUN yarn install --silent

COPY . ./

EXPOSE 5173

CMD ["yarn", "dev"]

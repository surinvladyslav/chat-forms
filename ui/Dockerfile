FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR /ui
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
FROM node:14-alpine AS development
ENV NODE_ENV development
RUN apk add chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3080
CMD [ "npm", "start" ]
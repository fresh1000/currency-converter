FROM node:10-alpine as builder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
COPY --chown=node:node . .
RUN npm install
CMD npm run tsc
RUN rm -rf ./node_modules


FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --from=builder --chown=node:node /home/node/app .
RUN npm install --only=production
EXPOSE 4000
CMD ["node", "./build/app.js" ]

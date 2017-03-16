#react 14.4 app

FROM node:4.2.1
MAINTAINER Tiger <qiufh@yonyou.com>

ENV NODE_ENV production

WORKDIR /

COPY package.json package.json
RUN npm install --unsafe-perm  # See https://github.com/npm/npm/issues/2984

COPY . /
RUN rm -rf .git

EXPOSE 3001

CMD ["node", "app_server.js"]

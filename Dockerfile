FROM node:alpine

WORKDIR /srv
COPY package.json ./
RUN npm install
COPY ./ ./
RUN mkdir stats && \
    chown nobody: stats
USER nobody

FROM ubuntu:latest

COPY ./package.json .
COPY ./generate-pact-file.js .

RUN apt-get update \
  && apt-get -y install curl gnupg \
  && curl -sL https://deb.nodesource.com/setup_16.x  | bash - \
  && apt-get -y install nodejs \
  && npm install

ENV PACT_CONSUMER_NAME, PACT_PROVIDER_NAME

CMD ["node", "generate-pact-file.js"]
FROM node:12

COPY . /src
WORKDIR /src

ARG ENVIRONMENT

ENV CLIENT_API_HOST http://localhost
ENV SERVER_API_HOST cms

# Passing build args to environment variables allows us to define them when building and running.
# Just make sure to always use the env variable in the app.
ENV ENVIRONMENT=${ENVIRONMENT}
ENV NODE_ENV=${ENVIRONMENT}
ENV PORT 3000
EXPOSE 3000

RUN npm ci
RUN npm run build

CMD npm start

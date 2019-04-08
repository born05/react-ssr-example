# React SSR example code

Used as supporting code for an article on medium.

## Setup
- Install [docker](https://docs.docker.com/docker-for-mac/) to start the platform.

## Start the machine
Run `docker-compose up` from the project root to start the dev machine (this may take a while on the first run).

## Build
Make a production build:
```
npm run build
```

## App
Localhost port 80, in browser: http://localhost

## CMS
Localhost port 4000, in browser: http://localhost:4000

## Docker container cheatsheet

Log into container:
```
docker exec -it $(docker ps -a --filter name=NAME_OF_FOLDER_cms -q) /bin/bash
docker exec -it $(docker ps -a --filter name=NAME_OF_FOLDER_app -q) /bin/bash
```

Log into container when not running:
```
docker run -it $(docker images --filter reference=NAME_OF_FOLDER_cms -q) /bin/bash
docker run -it $(docker images --filter reference=NAME_OF_FOLDER_app -q) /bin/bash
```

Npm install from container:
```
docker exec -it $(docker ps -a --filter name=NAME_OF_FOLDER_cms -q) npm install
docker exec -it $(docker ps -a --filter name=NAME_OF_FOLDER_app -q) npm install
```

## License

Copyright © 2019 [Born05](https://www.born05.com/)

See [license](https://github.com/born05/react-ssr-example/blob/master/LICENSE.md)

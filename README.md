# Nestjs Typeorm Complite Boiler Plate

 The complete nestjs boiler plate that uses `typeorm` for postgresql mapping.
## Quick start

- Clone the repo
- Make copy of `.env.example` with db configuration credentials.

## Running services

- Run `yarn start:dev` to run dev server
- Run `yarn migration:generate -- <migration name>` to generate new migration
- Run `yarn migration:run` to run migration
- Run `yarn schema:drop` to reset the db schemas
- Run `yarn seed:run` to run seeds

## Running the documentation

The template contains a pre-configured swagger-ui documentation accessed over `localhost:3000/docs`
## Installation

```bash
$ npm install
```

Ensure also that [Docker is installed](https://docs.docker.com/engine/install) on your work station

## Running the app using node server (the normal way)

```bash
# development
$ npm run start:dev
or
nest start

# Debug/watch
$ npm run start:debug

# production
$ npm run build:prod
$ npm start
```

## Using Docker

```sh
# Build the image
$ docker build -t nest-boiler-plate:v1.0 .

# Run the image interactively
$ docker run -it -p 3000:3000 nest-boiler-plate:v1.0
$ docker rmi -f $(docker images -a -q)
```

## Using Docker Compose

```sh
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh
```

## Other useful Docker commands

```sh
# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

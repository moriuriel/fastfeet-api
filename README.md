![Logo](.github/logo.png)

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Running docker container

```bash
# up
$ yarn docker:up

# down
$ yarn docker:down
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Resources

### Users

| Endpoint | HTTP Method |    Description    |
| -------- | :---------: | :---------------: |
| `/users` |    `GET`    | `List all users`  |
| `/users` |   `POST`    | `Create new user` |

### Authentication

| Endpoint          | HTTP Method |      Description      |
| ----------------- | :---------: | :-------------------: |
| `/users/sessions` |   `POST`    | `Authentication user` |

### Deliveries

| Endpoint                             | HTTP Method |            Description            |
| ------------------------------------ | :---------: | :-------------------------------: |
| `/deliveries`                        |    `GET`    |       `List All deliveries`       |
| `/deliveries/customer/{customer_id}` |    `GET`    | `List All deliveries by customer` |
| `/deliveries`                        |   `POST`    |       `Create new delivery`       |
| `/deliveries/accept/{delivery_id}`   |   `PATCH`   |         `Accept delivery`         |

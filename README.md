# Express Validator

## Installation

```sh
## npm
npm i @ajoelp/express-validator

## yarn
yarn add @ajoelp/express-validator
```

## Usage

```ts
import express from 'express';
import {body, query, params, validationResponseMiddleware} from '@ajoelp/express-validator'

const app = express();

app.get(
    '/',
    [
        query({
            'search': ['required', 'string'],
        }),
        params({
            'userId': ['required', 'number'],
        }),
        body({
            'email': ['required', 'email'],
            'password': ['required', 'string'],
        }),
        validationResponseMiddleware,
        (req, res) => res.send()
    ]
)

// express app setup...

```

## Rules

| Rule         | Rule String | Rule Object                                                                                                      |
| ------------ | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| RequiredRule | `required`  | `{ type: 'required', message: 'This is the message'}`                                                            |
| StringRule   | `string`    | `{ type: 'string', message: 'This is the message'}`                                                              |
| NumberRule   | `number`    | `{ type: 'number', message: 'This is the message'}`                                                              |
| MinRule      |             | `{ type: 'min', value: 3, message: 'This is the message'}`                                                       |
| MaxRule      |             | `{ type: 'max', value: 4, message: 'This is the message'}`                                                       |
| BooleanRule  | `boolean`   | `{ type: 'boolean', message: 'This is the message'}`                                                             |
| EmailRule    | `email`     | `{ type: 'email', regex: new RegExp(), message: 'This is the message'}`                                          |
| DateRule     | `date`      | `{ type: 'date', message: 'This is the message'}`                                                                |
| NullableRule | `nullable`  |                                                                                                                  |
| CustomRule   |             | `{ type: 'custom', rule: (value: string, request: Request) => Promise<boolean>, message: 'This is the message'}` |

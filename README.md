# Rövarspråket Translator

Rövarspråket is a language use by kids in Sweden, equivalent to Jeringoso in Argentina.
For more information check [Wikipedia](https://sv.wikipedia.org/wiki/R%C3%B6varspr%C3%A5ket).

## Possible endpoints

### Translate

Translate texts back and forth from Rövarspråket

Possible _language_: _normal_ or _rovarsprak_

`POST /translate/:language`

```json
{
  "text": "string",
  "withHyphen": "boolean?"
}
```

### Jokes

Get jokes in different languages from the service [JOKE API](https://sv443.net/jokeapi/v2/) and translate it

Possible _language_: _normal_ or _rovarsprak_

All query parameters are optional

`GET /jokes/:language?categories=Programming&lang=es&type=single`

#### Possible parmeters

```json
{
  "categories": "Comma separated values of  Programming , Misc, Dark, Pun, Spooky, Christmas, Any",
  "lang": ["cs", "de", "en", "es", "fr", "pt"],
  "type": ["single", "twopart"]
}
```

## Usage

### Install

`yarn install`

### Run

`yarn start`

### Test

`yarn test`

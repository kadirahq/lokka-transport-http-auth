# lokka-transport-http-auth

HTTP Auth Transport Layer for [Lokka](https://github.com/kadirahq/lokka)
(Works only on the server);

---

This is an extended version of [lokka-transport-http](https://github.com/kadirahq/lokka-transport-http) with the basic-auth support.

## Basic Usage

Install the package:

```
npm i --save lokka-transport-http-auth
npm i --save lokka
```

This is how to send request to Facebook's [SWAPI GraphQL Demo](http://graphql-swapi.parseapp.com/).

```js
import HttpTransport from 'lokka-transport-http-auth';
const transport = new HttpTransport('http://user:secret@localhost:8090/path');
transport.send(`
    {
      allFilms {
        films {
          title
        }
      }
    }
`).then(response => {
    console.log(JSON.stringify(response, null, 2));
});
```

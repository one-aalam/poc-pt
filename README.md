# POC-PT (Experimental)

This is experimental project template for a web app written in ES6 and and is supposed to house newer forward thinking, experimental(but cool) that could help this boilerplate grow in unprecedented ways

**Install dependencies:**

```sh
npm install
```

That's it.

## Development Workflow

**Start the live-reload dev server:**

```sh
PORT=8080 npm run dev
```

Open up http://localhost:8080/webpack-dev-server/ to see your app.
The app gets reloaded as files change.

## Deployment Workflow

To deploy your static app, upload the contents of `build/` to a web server.

Or, push this repo to heroku. `http-server` is used to serve the files in `build/`.

## Ambition
Templates wih support for streaming
https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
http://www.ebaytechblog.com/2014/10/02/dont-build-pages-build-modules/

##Core
Back-end: Hapi, Koa, Catberry
Front-end: React, T3, etc
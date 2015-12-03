# POC-PT

This is a basic project template for a web app written in ES6 and using some of mini JS libraries for creating ambitious Javascript applications.

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

##Inspiration

http://www.slideshare.net/PatrickSteeleIdem/rediscovering-progressive-html-rendering-with-marko-templates-and-nodejs
https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
http://www.ebaytechblog.com/2014/10/02/dont-build-pages-build-modules/

## Worth Read

https://gist.github.com/xjamundx/b1c800e9282e16a6a18e
http://blog.player.me/ditching-requirejs-webpack-reasons-lessons-learned/
http://webpack.github.io/docs/code-splitting.html
https://github.com/petehunt/webpack-howto#7-multiple-entrypoints
http://dontkry.com/posts/code/single-page-modules-with-webpack.html
https://github.com/webpack/bundle-loader
# Elm Simple Loader
[npm](https://www.npmjs.com/package/elm-simple-loader)

A simple Webpack loader for Elm sources. Uses your system Elm installation.

## Usage

Add elm-simple-loader to your loaders:

```js
loaders: [
  {
    loader: 'elm-simple-loader',
    test: /\.elm$/,
    exclude: /node_modules/
  }
]
```


And then in your JS...

```js
import Elm from '../elm/App.elm';
Elm.fullscreen(Elm.App); and whatnot
```

Enjoy!

## Note

When you bring in precompiled files (like if `elm.js` contains bits that
have been built by `elm-make`), you'll end up getting warnings about how
you're using precompiled files. To shut this error up, you can add this
to your `module` config:

```js
[...]
  module: {
    loaders: [...],
    noParse: [/.elm$/] // tells webpack to not parse Elm sources
  }
[...]
```

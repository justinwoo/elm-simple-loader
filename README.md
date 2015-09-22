# Elm Simple Loader

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

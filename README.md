![logo](https://raw.githubusercontent.com/gliechtenstein/images/master/logo.png)

# to_json

Turn any data into JSON with a uniform interface!

Just call `to_json()` on any data with its data format as argument to get the parsed JSON.

It's as simple as `str.to_json('html')`, `str.to_json('csv')`, `str.to_json('xml')`, `str.to_json('yaml')`, `str.to_json('markdown')`, etc.

<br>

# why?

Our goal with [Jasonette](https://www.jasonette.com) is to express all kinds of app logic in JSON. But not all existing data is in JSON. Also not everyone likes writing JSON.

What if you could take any data format and simply run `str.to_json("markdown")` to get a parsed JSON?

<br>

# demo

Try it out at [toJSON.co](https://toJSON.co/)

<br>

# features

The goal of this library is to function as a one-stop interface. It does not handle any conversion logic itself but utilizes other popular [conversion libraries as dependency](https://github.com/Jasonette/to_json/blob/master/package.json#L15).

Currently supports:

data type | command
----------|----------------------
atom      | str.to_json('feed')
csv       | str.to_json('csv')
cson      | str.to_json('cson')
hjson     | str.to_json('hjson')
html      | str.to_json('html')
markdown  | str.to_json('markdown')
rdf       | str.to_json('rdf')
rss       | str.to_json('rss')
svg       | str.to_json('svg')
xml       | str.to_json('xml')
yaml      | str.to_json('yaml')

Missing a cool data format? [Contribute!](#contribute)

<br>

# installation

**to_json** is completely modular so you can only include the data types you want to support. To support different types you need to:

1. Install each adapter
2. Attach them using the `use` method

For example let's say we want to support [hjson](https://hjson.org/), [cson](https://github.com/bevry/cson), and [yaml](http://yaml.org/)

## 1. install

```
npm install to_json
npm install hjson.to_json
npm install cson.to_json
npm install yaml.to_json
```

## 2. setup

In your code, attach the adapters

```
require('to_json')
  .use('hjson', require('hjson.to_json'))
  .use('cson', require('cson.to_json'))
  .use('yaml', require('yaml.to_json'))
```

<br>

# usage

There are two types: [synchronous](#1-synchronous) and [asynchronous](#2-asynchronous).

## 1. synchronous

Most `to_json` adapters are synchronous. For these, you simply call `to_json` and use the return value.

```
require('to_json');
var data = "<html><body><h1>hello</h1><p>World</p></body></html>";
var json = data.to_json('html');
console.log(json);
```

## 2. asynchronous

A few adapters (`csv` and `feed`) are asynchronous because the underlying library is asynchronous. For these just call `to_json` and pass a callback which will be triggered with the result.

```
require('to_json');
var data = "age, sex, location\n1,male,home\n20,female,nightclub\n30,male,work";
data.to_json('csv', function(json){
  console.log(json);
});
```

<br>

# example

## Markdown to JSON
```
var json = str.to_json('markdown');
console.log(json);
```

## CSV to JSON
```
str.to_json('csv', function(json){
  console.log(json);
});
```

## CSON to JSON
```
var json = str.to_json('cson');
console.log(json);
```

## HJSON to JSON
```
str.to_json('hjson');
```

## ATOM/RSS to JSON
```
str.to_json('feed');
```

## HTML to JSON
This adapter uses the cheerio library to transform HTML into an object.

```
str.to_json('html');
```

## XML to JSON
```
str.to_json('xml');
```

## SVG to JSON
```
str.to_json('svg');
```

<br>

# contribute
Feel free to send pull requests if you have improvements, bug fixes, or wrote any additional adapters.

If you have a suggestion for a new data type support, here's how to write an adapter:

1. Write an adapter function (Look under [adapters folder](src/adapters) to see how other types work, and just add another there)
2. Add an entry under [src/adapters.js](src/adapters.js) registry.
3. Send a PR!

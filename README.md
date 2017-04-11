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

# installation

**to_json** is completely modular so you can only include the data types you want to support. To support different types you need to:

1. Install each adapter via NPM
2. Attach them using `use` method

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

The `use` method takes 3 arguments:

```
use([name], [module], [options])
```

- `name` is the keyword to trigger an adapter
- `module` points to the module that will handle the conversion
- `options`: Currently only has one key `circular`, which specifies whether the conversion will allow circular structure or not. If circular is false, it will replace all circular subtrees with the string `[Circular]`.

<br>

# usage

There are two types: [synchronous](#1-synchronous) and [asynchronous](#2-asynchronous).

## 1. synchronous

Most `to_json` adapters are synchronous. For these, you simply call `to_json` and use the return value.

```
var data = "<html><body><h1>hello</h1><p>World</p></body></html>";
console.log(data.to_json('html'));
```

## 2. asynchronous

A few adapters (`csv` and `feed`) are asynchronous because the underlying library is asynchronous. For these just call `to_json` and pass a callback which will be triggered with the result.

```
var data = "age, sex, location\n1,male,home\n20,female,nightclub\n30,male,work";
data.to_json('csv', function(json){
  console.log(json);
});
```

<br>

# features

The goal of this library is to function as a one-stop interface. It does not handle any conversion logic itself but utilizes other popular [conversion libraries as dependency](https://github.com/Jasonette/to_json/blob/master/package.json#L15).

Currently supports:

data type | command                           | installation
----------|-----------------------------------|-----------------------------
feed      | str.to_json('feed', callback)     | `npm install feed.to_json`
csv       | str.to_json('csv', callback)      | `npm install csv.to_json`
cson      | str.to_json('cson')               | `npm install cson.to_json`
hjson     | str.to_json('hjson')              | `npm install hjson.to_json`
html      | str.to_json('html')               | `npm install html.to_json`
markdown  | str.to_json('markdown')           | `npm install markdown.to_json`
xml       | str.to_json('xml')                | `npm install xml.to_json`
yaml      | str.to_json('yaml')               | `npm install yaml.to_json`

Missing a cool data format? [Contribute!](#contribute)

<br>


# example

## Markdown to JSON
```
require('to_json').use('md', require('markdown.to_json'));
var json = str.to_json('md');
console.log(json);
```

## CSV to JSON
```
require('to_json').use('csv', require('csv.to_json'));
str.to_json('csv', function(json){
  console.log(json);
});
```

## CSON to JSON
```
require('to_json').use('cson', require('cson.to_json'));
var json = str.to_json('cson');
console.log(json);
```

## HJSON to JSON
```
require('to_json').use('hjson', require('hjson.to_json'));
str.to_json('hjson');
```

## ATOM/RSS to JSON
```
require('to_json')
  .use('feed', require('feed.to_json'));
  .use('rss', require('feed.to_json'));
  .use('atom', require('feed.to_json'));

// All three following lines produce same results
str.to_json('atom');
str.to_json('rss');
str.to_json('feed');

```

## HTML to JSON
This adapter uses the cheerio library to transform HTML into an object.

```
require('to_json').use('html', require('html.to_json'), {circular: false});
str.to_json('html');
```

## XML to JSON
```
require('to_json').use('xml', require('xml.to_json'), {circular: false});
str.to_json('xml');
```

## SVG to JSON
```
require('to_json').use('svg', require('xml.to_json'), {circular: false});

// SVG is an XML, so we can just use the XML converter
str.to_json('svg');
```

<br>

# contribute
Feel free to send pull requests if you have improvements, bug fixes, or wrote any additional adapters.

If you have a suggestion for a new data type support, [open an issue](https://github.com/Jasonette/to_json/issues/new).

I am pretty serious when I say "let's turn everything into JSON", so even if it feels crazy, please feel free to suggest. In fact, the crazy it is the better.

module.exports = {
  svg: require('./adapters/xml'),
  yaml: require('./adapters/yaml'),
  csv: require('./adapters/csv'),
  cson: require('./adapters/cson'),
  hjson: require('./adapters/hjson'),
  rss: require('./adapters/feed'),
  atom: require('./adapters/feed'),
  rdf: require('./adapters/feed'),
  markdown: require('./adapters/markdown'),
  html: require('./adapters/html'),
  xml: require('./adapters/xml')
}

const marked = require('marked');

module.exports = source => {
  const html = marked(source);
  console.log('1111')
  // return `export default ${ JSON.stringify(html) }`;
  return html
}
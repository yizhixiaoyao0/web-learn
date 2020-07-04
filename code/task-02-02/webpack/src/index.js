
import createEditor from './editor.js'


const edit = createEditor;

console.log('index22')


if (module.hot) {
  module.hot.accept('./editor', () => {
  console.log('ddddd')
})
}

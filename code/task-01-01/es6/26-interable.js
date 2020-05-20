const obj= {
  store: ['foo', 'bar'],
  [Symbol.interator]: function() {
    let index = 0;
    const self = this;
    const result = {
      next: function (){
        // InterationResult 接口
        return {
          value: self.store[index],
          done: index >= self.store.length,
        }
      }
    }
    index++;
    return result;
  }
}

for( const item of obj) {
  console.log('循环');
}
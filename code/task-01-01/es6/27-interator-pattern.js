// 迭代器模式

const obj = {
  life: ['吃个饭', '洗澡'],
  learn: ['语文', 's数学'],
  [Symbol.interator]: function() {
    const arr = [...this.life, ...this.learn];
    let index = 0;
    return {
      next: function (){
        // InterationResult 接口
        return {
          value: arr[index],
          done: index++ >= arr.length,
        }
      }
    }
  }
}
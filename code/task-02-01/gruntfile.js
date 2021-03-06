// grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 次函数接受一个Grunt 的形参， 内部提供一些创建任务时可以用到的api

module.exports = grunt => {
  // 任务名字  任务描述 任务函数  yarn grunt foo
  grunt.registerTask('foo', () => {
    console.log('hello grunt ~')
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log('hello grunt ~')
  })

  // 异步
  grunt.registerTask('async-task', function() {
    const done = this.async();
    setTimeout(() => {
      console.log('async task working');
      done();
    }, 1000)
  })

  // 标记任务失败  这个任务失败会导致后续任务不执行
  grunt.registerTask('bad', () => {
    console.log('bad workding')
    return false;
  })

  // 标记任务失败  这个任务失败会导致后续任务不执行
  grunt.registerTask('bad-async', () => {
    const done = this.async();
    setTimeout(() => {
      console.log('async task working');
      done();
    }, 1000)
  })

  // yarn grunt default --force  不管失败与否后续都会强制执行
  grunt.registerTask('default', ['foo', 'bad', 'bar']);
}
# 读取开放变量和属性: 读取变量表达式

## 语法:

- 组件自身属性:    `@(::prop)`
- 组件自身开放变量: `@(#:var)`
- 其他组件开放变量: `@(##comInstID&var)`
- 页面开放变量:    `@(#%var)`
- 系统预制变量:     `@(#@timestamp_now)`


# 设置开放变量:
- `@SET[ ... ]`

- 一个SET内只能设置一个属性或者变量

```
//举例

@SET[ @(#:var) = 3 ]

```


# 表达式书写语法:

## 情形1: 需要有条件判断
- @IF[] 
- @DO[] 
- @ELSEIF[] 
- @EIFDO[]
- @ELSEDO []

## 情形2: 单个条件判断
- @IF[] 
- @DO[] 

## 情形3: 直接执行
- @DO[] 

```
@IF[ @(::myName) == '1001-小明' ] 
@DO[ 
  console.log('111');
  console.log('得到了:' +  @(#@nowDay)); 
] 

@ELSEIF[ 5 > 3 ] 

@EIFDO[ 
  console.log('222'); 
] 

@ELSEDO[ 
  console.log('333');
]
```


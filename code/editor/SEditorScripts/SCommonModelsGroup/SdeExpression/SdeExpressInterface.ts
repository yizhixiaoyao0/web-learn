// 条件判断组表达式:
// - @IF[SdeConditionExpress](BehaviorExpress)
// - @ELSEIF[SdeConditionExpress](BehaviorExpress)
// - @ELSE(BehaviorExpress)

// SDE表达式写法
/*
含有判断条件的:

 @IF[ @(::prop) > 10]
  @DO[]

 @ELSEIF[]
  @EIFDO[]

 @ELSEDO []

*/

/*
含有简单判断条件的:

 @IF[ @(::prop) > 10]
 @DO[]
 @ELSEDO []

*/


/*
不含有判断,直接运行的语句:
  @DO[]
*/


// 表达式基础接口
export interface ISdeExpressBase {
}

// 条件表达式接口
export interface ISdeConditionExpress {
}

// 行为表达式接口
export interface ISdeBehaviorExpress {
}

// 条件表达式解析器
export interface ISdeConditionExpressResolve {
  ResolveConditionExpressRaw(selfComInstId: string, expressRaw: string): boolean ;
}

// 行为表达式解析器
export interface ISdeBehaviorExpressResolve {
}

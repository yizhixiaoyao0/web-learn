import { ISdeExpressBase, ISdeConditionExpress, ISdeBehaviorExpress } from './SdeExpressInterface';

export  namespace SdeExpressSpace {

  // 表达式基类
   abstract class SdeExpressBase implements ISdeExpressBase {
     public type: string = '';
     public rawexp: string = '';
     public exp: string = '';
  }

  // 条件表达式 if / elseif
  // @IF[] @ELSEIF[]
   export class SdeConditionExpress extends SdeExpressBase implements ISdeConditionExpress {
    // type:   if , elseif
    // rawexp:   @IF[ @(##1001&comAge) > @(#@nowDay) ]
    // exp: @(##1001&comAge) > @(#@nowDay)
  }

  // 行为表达式 do / eifdo / elsedo
  // @DO[]  @EIFDO[] @ELSEDO []
   export class SdeBehaviorExpress extends SdeExpressBase implements ISdeBehaviorExpress {
    // type: do, eifdo, elsedo
    // rawexp: @DO[  @(##1001&comAge)  = 100; ]
    // exp:  @(##1001&comAge)  = 100;

  }


   export class SdeExpressContent  {

    // 比如:  @IF[ @(##1001&comAge) > @(#@nowDay)  ] @DO[  @(##1001&comAge)  = 100; ]
    public rawexpress: string = '';

    // [  @IF[] ,  @ELSEIF[]  ]
    public conditionRaws: SdeConditionExpress[] = [];

    // [  @DO[], @ELSEDO[] ]
    public behaviorRaws: SdeBehaviorExpress[] = [];

  }


}

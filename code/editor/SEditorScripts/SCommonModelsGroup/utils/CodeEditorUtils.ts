import CodeMirrorLoader from '../../../core/@types/CodeMirrorLoader';

export default class CodeEditorUtils {
  // https://codemirror.net/2/demo/

  // 初始化
  public static InitCodeEditor(
    myCodeEditor: any,
    textAreaDiv: any,
    mode: string = 'javascript',
    themeName: string = 'darcula',
  ): any {
    if (myCodeEditor == null) {
      myCodeEditor = CodeMirrorLoader.CodeMirrorCfg(textAreaDiv, {
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript',
        // matchBrackets:true,
      });

      myCodeEditor.setOption('theme', 'eclipse');

      // try {
      //   let div = document.querySelector<HTMLElement>(".CodeMirror");
      //   div.style.height = "400px";
      //   let div1 = document.querySelector<HTMLElement>(".el-dialog__body");
      //   div1.style.lineHeight = "19px";


      // } catch (error) {
      //   console.error(error);
      // }
    }

    return myCodeEditor;
  }


  // 全选
  public static SelectAll( myCodeEditor: any) {
    CodeMirrorLoader.GetCodeMirrot().commands['selectAll'](myCodeEditor);
  }

  // 得到选择的文字
  public static GetSelectedString( myCodeEditor: any) {
    return myCodeEditor.getSelection();
  }

  // 替换选择的文字
  public static ReplaceSelectedString( myCodeEditor: any, newText: string) {
    return myCodeEditor.replaceSelection(newText);
  }


  // 得到选择区域
  public static GetSelectedRange( myCodeEditor: any) {
    return { from: myCodeEditor.getCursor(true), to: myCodeEditor.getCursor(false) };
  }

  // 格式化所选
  public static FormatSelection(myCodeEditor: any) {
      let range = this.GetSelectedRange(myCodeEditor);
      console.log(myCodeEditor);

      myCodeEditor.autoFormatRange(range.from, range.to);
  }

  // 自动全选和格式化
  public static FormatAllContent(myCodeEditor: any) {
    this.SelectAll(myCodeEditor);
    this.FormatAllContent(myCodeEditor);
  }

  // 注释所选
  public static CommentSelection(myCodeEditor: any, isComment: boolean) {
    let range = this.GetSelectedRange(myCodeEditor);
    myCodeEditor.commentRange(isComment, range.from, range.to);
  }


  public static InsertToCursorPosition(myCodeEditor: any, text: string) {
    let doc = myCodeEditor.getDoc();
    let cursor = myCodeEditor.getCursor();
    // var line = myCodeEditor.getLine(cursor.line); // get the line contents
    // console.log(line);
    // var pos = { // create a new object to avoid mutation of the original selection
    //   line: cursor.line,
    //   ch: line.length - 1 // set the character position to the end of the line
    //  }
    doc.replaceRange(text, cursor);
  }

  // //搜索查询词
  // static SearchWords(myCodeEditor:any,searchKey:string,lastPos:any= null, lastQuery:any = null,marked:Array<any> = []) {
  //   this.UnMark(marked);
  //   if(searchKey == null || searchKey == "") return;

  //   for (var cursor = myCodeEditor.getSearchCursor(searchKey); cursor.findNext();)
  //      marked.push(myCodeEditor.markText(cursor.from(), cursor.to(), "searched"));

  //   if (lastQuery != searchKey) lastPos = null;
  //   var cursor = myCodeEditor.getSearchCursor(searchKey, lastPos || myCodeEditor.getCursor());
  //   if (!cursor.findNext()) {
  //     cursor = myCodeEditor.getSearchCursor(searchKey);
  //     if (!cursor.findNext()) return;
  //   }
  //   myCodeEditor.setSelection(cursor.from(), cursor.to());
  //   lastQuery = searchKey; lastPos = cursor.to();
  // }

  // static UnMark(marked:Array<any>) {
  //   for (let index = 0; index < marked.length; index++) {
  //     const mark = marked[index];
  //     mark();
  //   }
  //   marked.length = 0;
  // }


}

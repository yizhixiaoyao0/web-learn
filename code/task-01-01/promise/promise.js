let contain = new Set(["abc", "bbb", "xxx"]);
let word = "bbb";

P: for (let i of contain) {
  w: for (let j = 0; j < i.length; j++) {
    if (i.charAt(j) != word.charAt(j) && word.charAt(j) != ".") {
      continue P;
    }
  }
  console.log("ok!");
  return true;
}

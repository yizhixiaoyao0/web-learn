const str = console.log`hello word`;

const name = 'tom';
const gender = true;

function myTagFunc(string, name, gender) {
  // console.log(strings)

  return string[0] + name + string[1] + gender + string[3];
}

const result = myTagFunc`hey, ${name} is gender`;


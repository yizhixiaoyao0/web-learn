// reverse

// 逆序输出 ？ 首尾交换

// 数据结构和算法思维的选择
// 原地交换

function reverse(num) {
  if (num == Number.MAX_SAFE_INTEGER || num == Number.MIN_SAFE_INTEGER) {
    return 0;
  }
  num = (num > 0 ? num : -num).toString().split("");
  let start = 0,
    end = num.length - 1;
  while (start < end) {
    [num[start], num[end]] = [num[end], num[start]];
    start++;
    end++;
  }

  num = Number(num.join(''));
}

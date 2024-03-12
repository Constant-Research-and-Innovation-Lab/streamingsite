let numbers = [2, 4, 8];

let answer = numbers.reduceRight((x, y) => x / y, 1);

console.log(answer);
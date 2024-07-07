export function random(){
    var list = [ 1, 2, 3, 4, 5, 6, 7 ];

while(
  list.findIndex(function(v, i) {
    return v == i + 1 || (i && Math.abs(list[i - 1] - v) == 1);
  }) != -1
) {
  list.sort(function() { return Math.random() - 0.5; });
}
return parseInt(list.join(''));
}

export const formatDate = (time: string) => {
  //时间戳转日期
  let date = new Date(parseInt(time) * 1000);
  let y = date.getFullYear();

  let MM = String(date.getMonth() + 1);
  MM = Number(MM) < 10 ? '0' + MM : MM;
  let d = String(date.getDate());
  d = Number(d) < 10 ? '0' + d : d;
  let h = String(date.getHours());
  h = Number(h) < 10 ? '0' + h : h;
  let m = String(date.getMinutes());
  m = Number(m) < 10 ? '0' + m : m;
  let s = String(date.getSeconds());
  s = Number(s) < 10 ? '0' + s : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
};

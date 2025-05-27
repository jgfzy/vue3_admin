//获取当前小时

export function getTime() {
  let message = "";
  let time = new Date().getHours();
  if (time <= 9) {
    message = "早上";
  } else if (time <= 13) {
    message = "中午";
  } else if (time <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
}

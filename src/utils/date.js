function setNumTwo(num) {
  return String(num).length > 1 ? num : '0' + num
}
/**
 * @params date 日期字符串
 * @params format 需要显示的日期格式
 * return 返回显示的日期的格式
 */

export function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
  // 如果传递了日期 则格式化传入的日期对象
  date = date ? new Date(date) : new Date()
  // 用对象结构描述字符和日期的关系
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  // 如果是MM这种两个字母的时间如果是一个数字，需要前面补0变为两位
  const date_map = {
    YYYY: year,
    MM: setNumTwo(month + 1),
    DD: setNumTwo(day),
    hh: setNumTwo(hour),
    mm: setNumTwo(minutes),
    ss: setNumTwo(seconds),

    YY: String(year).slice(2),
    M: month + 1,
    D: day,
    h: hour,
    m: minutes,
    s: seconds
  }
  // 遍历date_map对象的key，把字符串里面key字符串替换为对应的日期
  Object.keys(date_map).forEach(function (key) {
    format = format.replace(key, date_map[key])
  })
  return format
}

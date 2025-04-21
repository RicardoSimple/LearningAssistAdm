// 二次封装本地存储

// 存储数据
export function setItem(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export function getItem(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

// 删除数据
export function removeItem(key) {
  window.localStorage.removeItem(key)
}

// 清除所有数据
export function clear() {
  window.localStorage.clear()
}

// 封装使用示例
// export function useStorage() {
//   const set = (key, value) => setItem(key, value);
//   const get = (key) => getItem(key);
//   const remove = (key) => removeItem(key);
//   const clear = () => clear();

//   return {
//     set,
//     get,
//     remove,
// }

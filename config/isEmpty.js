//檢查物件是否為空
function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false
  }
  return true
}

module.exports = isEmpty
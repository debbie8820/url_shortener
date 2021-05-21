const Urls = require('../models/Urls')

//Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let randomElement = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = randomElement
  }
  return array
}

const characterString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let characterArray = characterString.split('')


function generateId() {
  let shuffledArray = shuffle(characterArray)
  let selectedId = ''
  while (selectedId.length < 6) {
    let randomIndex = Math.floor(Math.random() * (shuffledArray.length))
    selectedId += shuffledArray[randomIndex]
  }
  const verifyId = checkId(selectedId)
  if (!verifyId) {
    return generateId()
  }
  return selectedId
}


//檢查短網址id是否重複
async function checkId(id) {
  const isRepeated = await Urls.exists({ shortenedUrlId: id })
  return isRepeated
}

module.exports = generateId
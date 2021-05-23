const Urls = require('../models/Urls')
const isEmpty = require('../config/isEmpty')

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


function checkId(id) {
  const result = Urls.exists({ shortenedUrlId: id })
  return result
}

async function generateId() {

  try {
    let shuffledArray = shuffle(characterArray)
    let selectedId = ''
    while (selectedId.length < 6) {
      let randomIndex = Math.floor(Math.random() * (shuffledArray.length))
      selectedId += shuffledArray[randomIndex]
    }

    const isRepeadted = await checkId(selectedId)

    if (isRepeadted) {
      return generateId()
    }

    return selectedId

  } catch (error) {
    console.log(error)
  }

}

module.exports = generateId
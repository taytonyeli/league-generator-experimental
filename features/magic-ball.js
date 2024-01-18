function combine () {
  const available = ['1', '2', '3', '4', '5']
  const anchors = []
  anchors.push(available)

  const swapStart = 0
  for (let index = 1; index < available.length; index++) {
    let currentCombo = available.slice()

    const original = available[swapStart]
    const replacement = available[index]
    currentCombo[swapStart] = replacement
    currentCombo[index] = original
    anchors.push(currentCombo)
  }

  console.log('combos', anchors)
}

function betterCombine () {
  const available = ['1', '2', '3', '4', '5']
  const anchors = []
  anchors.push(available)

  for (let index = 1; index < available.length; index++) {
    let currentCombo = available.slice()

    const firstHalf = currentCombo.slice(0, index)
    const secondHalf = currentCombo.slice(index + 1)
    firstHalf.push(...secondHalf)
    let desiredCombo = [available[index]]

    desiredCombo.push(...firstHalf)
    anchors.push(desiredCombo)
  }

  console.log('combos', anchors)
}

function allCombos () {
  const test = ['1', '2', '3', '4', '5']



  
  console.log('combos', combos)
}

console.time('took')
allCombos()
console.timeEnd('took')

function allCombos () {
  const test = ['1', '2', '3', '4', '5']
  let combos = []

  for (let index = 0; index < test.length; index++) {
    const leftSplit = test.slice(0, index)
    const rightSplit = test.slice(index + 1)
    let newCombo = [test[index]]
    newCombo.push(...leftSplit)
    newCombo.push(...rightSplit)
    combos.push(newCombo)
  }

  let finalCombos = []
  let lastIndex = test.length - 1
  let higherStart = lastIndex - 2
  let lowerStart = lastIndex - 1
  let higherPositionIndex = higherStart - 1

  for (const combo of combos) {
    finalCombos.push(combo)
    const swapped = swap(combo)
    if (swapped) {
      finalCombos.push(swapped)
    }

    let currentOperatingCombo = combo

    for (
      let higherSwap = higherStart;
      higherSwap <= combo.length;
      higherSwap++
    ) {
      let lowerPositionIndex = lowerStart - 1
      for (let lowerSwap = lowerStart; lowerSwap < combo.length; lowerSwap++) {
        const lowerCombo = backwardMoveToPosition(
          currentOperatingCombo,
          lowerSwap,
          lowerPositionIndex
        )
        finalCombos.push(lowerCombo)

        const swappedLowerCombo = swap(lowerCombo)
        finalCombos.push(swappedLowerCombo)
        // console.log(
        //   `move [${lowerSwap}] to [anchorPos${
        //     lowerPositionIndex + 1
        //   }/in${lowerPositionIndex}] lower`
        // )
      }

      //  TODO why do I have to change all variables
      if (higherSwap > lastIndex && higherStart - 1 > 1) {
        higherSwap = higherStart - 1
        higherStart = higherStart - 1
        higherPositionIndex = higherPositionIndex - 1
      }

      if (higherSwap <= lastIndex) {
        // console.log(
        //   `move [${higherSwap}] to [anchorPos${
        //     higherPositionIndex + 1
        //   }/in${higherPositionIndex}] higher`
        // )
        currentOperatingCombo = backwardMoveToPosition(
          combo,
          higherSwap,
          higherPositionIndex
        )
        finalCombos.push(currentOperatingCombo)

        const swappedHigherCombo = swap(currentOperatingCombo)
        finalCombos.push(swappedHigherCombo)
      }
    }
  }
  return finalCombos
}

function swap (combo) {
  if (combo.length <= 2) {
    return
  }
  let swappedCombo = combo.slice()
  swappedCombo[combo.length - 1] = combo[combo.length - 2]
  swappedCombo[combo.length - 2] = combo[combo.length - 1]
  return swappedCombo
}

function backwardMoveToPosition (
  combo,
  indexOfItemToMove,
  indexOfDestinationSpot
) {
  if (indexOfDestinationSpot >= indexOfItemToMove) {
    return 'sorry'
  }
  const firstSubList = combo.slice(0, indexOfDestinationSpot)
  const itemToMove = combo[indexOfItemToMove]
  const secondSubList = combo.slice(indexOfDestinationSpot, indexOfItemToMove)
  const thirdSubList = combo.slice(indexOfItemToMove + 1)

  let updatedCombo = []
  updatedCombo.push(...firstSubList)
  updatedCombo.push(itemToMove)
  updatedCombo.push(...secondSubList)
  updatedCombo.push(...thirdSubList)

  return updatedCombo
}

console.time('took')
const combinations = allCombos()
console.log(combinations.length, 'combos found')
console.log(combinations)
console.timeEnd('took')

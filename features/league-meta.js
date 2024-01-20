const {
  HOME_AND_AWAY,
  ROUNDS_PER_WEEK
} = require('../constants/league-constants')

function getNumberOfMatches (numberOfTeams) {
  let numberOfMatches = 0
  for (let index = numberOfTeams - 1; index >= 1; index--) {
    numberOfMatches = numberOfMatches + index
  }
  if (HOME_AND_AWAY) {
    numberOfMatches = numberOfMatches * 2
  }
  return numberOfMatches
}

function getMatchWeeksData (numberOfTeams) {
  const numberOfMatches = this.getNumberOfMatches(numberOfTeams)
  // match weeks
  const oddNumberOfTeams = numberOfTeams % 2 === 1
  let matchesPerRound = oddNumberOfTeams
    ? (numberOfTeams - 1) / 2
    : numberOfTeams / 2

  const numberOfRounds = numberOfMatches / matchesPerRound
  const matchWeeks = Math.ceil(numberOfRounds / ROUNDS_PER_WEEK)
  console.log('... there will be', matchesPerRound, 'match(es) every round')
  console.log('... there will be', numberOfRounds, 'round(s)')
  console.log(
    '... there will be',
    matchWeeks,
    'match week(s) at',
    ROUNDS_PER_WEEK,
    'round(s) per week'
  )
  return {
    numberOfMatches,
    numberOfRounds,
    matchesPerRound,
    matchWeeks
  }
}

function generateMatches (teams) {
  let matches = []
  let matchesRecord = []

  for (let index = 0; index < teams.length; index++) {
    let currentTeam = teams[index]

    for (let secIndex = index + 1; secIndex < teams.length; secIndex++) {
      let opponent = teams[secIndex]
      matches.push(`${currentTeam} vs ${opponent}`)
      matchesRecord.push({
        home: currentTeam,
        away: opponent
      })
      if (HOME_AND_AWAY) {
        matches.push(`${opponent} vs ${currentTeam}`)
        matchesRecord.push({
          home: opponent,
          away: currentTeam
        })
      }
    }
  }

  return matchesRecord
}

function generatePossibleSchedule (matches) {

}

const LeagueMeta = {
  getNumberOfMatches,
  getMatchWeeksData,
  generateMatches,
  generatePossibleSchedule
}
module.exports = LeagueMeta

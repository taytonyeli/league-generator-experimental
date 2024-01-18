const { random, draw, range } = require('radash')
const { NUMBER_OF_TEAMS, TEAMS } = require('./constants/league-constants')
const LeagueMeta = require('./features/league-meta')

function main () {
  generateLeague()
}

function generateLeague () {
  try {
    console.log('... generating matches for', NUMBER_OF_TEAMS, 'teams')

    const matchWeekData = LeagueMeta.getMatchWeeksData(NUMBER_OF_TEAMS)
    const matches = LeagueMeta.generateMatches(TEAMS)
    const scheduled = LeagueMeta.generatePossibleSchedule(matches)

    console.log(
      '... matches generated:',
      scheduled.length,
      ', matches expected:',
      matchWeekData.numberOfMatches,
      'matches',
      matches,
      'scheduled matches',
      scheduled
    )

    return
  } catch (error) {
    console.error('... caught generate matches', error)
    return
  }
}

main()

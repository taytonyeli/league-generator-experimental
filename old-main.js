function generateRawRounds ({ numberOfRounds, matchesPerRound, matchesRecord }) {
    const rounds = {}
  
    for (let index = 0; index < numberOfRounds; index++) {
      const matchPickSliceStart = index * matchesPerRound
      const matchPickSliceEnd = matchPickSliceStart + matchesPerRound
      rounds[index + 1] = matchesRecord.slice(
        matchPickSliceStart,
        matchPickSliceEnd
      )
    }
    console.log('... rounds are', rounds)
    return rounds
  }
  
  function shuffleUntilNoTeamPlaysTwiceInRound (
    counter,
    rounds,
    numberOfRounds,
    numberOfTeams
  ) {
    const noHomeSameWeek = ['chelsea', 'barca']
  
    let mustPlayAway
    //   let mustPlayAway = {
    //     team: 'madrid',
    //     rounds: [2, 5]
    //   }
    const newRounds = { ...rounds }
    let roundIndices = []
    let stopMatchLoop = false
    for (let i = 0; i < numberOfRounds; i++) {
      roundIndices.push(i)
    }
    const roundMatches = Object.values(rounds)
    const minimumHomeGames = Math.floor((numberOfTeams - 1) / 2)
    const minimumHomeGamesSecondHalf = numberOfTeams - minimumHomeGames - 1
    const halfSeason = Math.floor(roundMatches.length / 2)
    let homeCount = {}
    let homeCountSecondHalf = {}
  
    for (let roundIndex = 0; roundIndex < roundMatches.length; roundIndex++) {
      const round = roundMatches[roundIndex]
  
      let homeSameWeek = []
      let mustPlayAwayFound = mustPlayAway ? false : true
  
      for (let matchIndex = 0; matchIndex < round.length; matchIndex++) {
        const match = round[matchIndex]
        const { home, away } = match
  
        if (roundIndex + 1 <= halfSeason) {
          if (!homeCount[home]) {
            homeCount[home] = 0
          }
          homeCount[home] = homeCount[home] + 1
        }
  
        if (roundIndex + 1 > halfSeason) {
          if (!homeCountSecondHalf[home]) {
            homeCountSecondHalf[home] = 0
          }
          homeCountSecondHalf[home] = homeCountSecondHalf[home] + 1
        }
  
        if (
          mustPlayAway &&
          away === mustPlayAway.team &&
          mustPlayAway.rounds.includes(roundIndex + 1)
        ) {
          mustPlayAwayFound = true
          // console.log(
          //   '... away really',
          //   away,
          //   roundIndex + 1,
          //   mustPlayAwayFound,
          //   mustPlayAway.team
          // )
        }
  
        const swap = function () {
          const currentMatch = match
          const randomList = roundIndices.filter(item => item !== roundIndex)
          const randomRound = draw(randomList)
          const randomMatch = random(0, round.length - 1)
          const newMatch = roundMatches[randomRound][randomMatch]
  
          // swap
          newRounds[roundIndex + 1][matchIndex] = newMatch
          newRounds[randomRound + 1][randomMatch] = currentMatch
        }
  
        for (const compareMatch of round) {
          if (home === compareMatch.home && away === compareMatch.away) {
            continue
          }
          if (
            home === compareMatch.home ||
            home === compareMatch.away ||
            away === compareMatch.home ||
            away === compareMatch.away
          ) {
            //   console.log(
            //     '... team playing twice conflict',
            //     `${home} vs ${away} and ${compareMatch.home} vs ${compareMatch.away}`
            //   )
            swap()
            stopMatchLoop = true
            break
          }
        }
        if (stopMatchLoop) {
          break
        }
  
        //   if (noHomeSameWeek.includes(home)) {
        //     homeSameWeek.push(home)
        //     if (homeSameWeek.length === 2) {
        //       //   console.log('... actual home conflict', home, homeSameWeek)
        //       swap()
        //       stopMatchLoop = true
        //       break
        //     }
        //   }
  
        if (
          mustPlayAway &&
          !mustPlayAwayFound &&
          mustPlayAway.rounds.includes(roundIndex + 1) &&
          matchIndex === round.length - 1
        ) {
          // console.log(
          //   `... no ${mustPlayAway.team} is away in `,
          //   roundIndex + 1,
          //   round,
          //   mustPlayAwayFound,
          //   mustPlayAway
          // )
          swap()
          stopMatchLoop = true
          break
        }
  
        if (roundIndex + 1 === halfSeason && matchIndex === round.length - 1) {
          // console.log(
          //   'first half',
          //   homeCount,
          //   minimumHomeGames,
          //   roundIndex + 1,
          //   matchIndex
          // )
  
          const breach = Object.entries(homeCount).find(function ([
            _team,
            count
          ]) {
            if (count < minimumHomeGames) {
              return true
            }
            if (
              minimumHomeGames === minimumHomeGamesSecondHalf &&
              count > minimumHomeGames
            ) {
              return true
            }
            if (
              minimumHomeGames < minimumHomeGamesSecondHalf &&
              count > minimumHomeGamesSecondHalf
            ) {
              return true
            }
            return false
          })
  
          if (breach) {
            //   console.log(
            //     '... bad number of home games',
            //     breach[0],
            //     'home games',
            //     breach[1],
            //     'current round',
            //     roundIndex + 1,
            //     'want minimum ',
            //     minimumHomeGames,
            //     'want minimu second half',
            //     minimumHomeGamesSecondHalf,
            //     'half season is round',
            //     halfSeason
            //   )
            // swap()
            // stopMatchLoop = true
            // break
          }
        }
  
        if (
          roundIndex === roundMatches.length - 1 &&
          matchIndex === round.length - 1
        ) {
          console.log(
            'round and match',
            roundIndex + 1,
            matchIndex,
            'first half',
            homeCount,
            'second half',
            homeCountSecondHalf,
            'minimum games',
            minimumHomeGames,
            'minimum games',
            minimumHomeGamesSecondHalf
          )
  
          const breach = Object.entries(homeCountSecondHalf).find(function ([
            _team,
            count
          ]) {
            if (count < minimumHomeGamesSecondHalf) {
              return true
            }
            if (count > minimumHomeGamesSecondHalf) {
              return true
            }
            return false
          })
  
          if (breach) {
            console.log(
              '... bad number of second half home games',
              breach[0],
              'home games',
              breach[1],
              'current round',
              roundIndex + 1,
              'want minimum ',
              minimumHomeGames,
              'want minimum second half',
              minimumHomeGamesSecondHalf,
              'half season is round',
              halfSeason
            )
            // swap()
            // stopMatchLoop = true
            // break
          }
        }
      }
      if (stopMatchLoop) {
        break
      }
    }
  
    if (stopMatchLoop && counter > 0) {
      return shuffleUntilNoTeamPlaysTwiceInRound(
        counter - 1,
        newRounds,
        numberOfRounds,
        numberOfTeams
      )
    }
    console.log('... ensuring no team plays twice', newRounds)
    console.log('... attempts remaining:', counter)
    return newRounds
  }
const fs = require('fs')
const path = require('path')

async function aggregateValidatorsScoreboard(statsFolder) {
  const dir = await fs.promises.opendir(statsFolder)

  // Stats are: account_id => { num_produced_blocks, num_expected_blocks }
  const validatorsStats = new Map()

  for await (const statsFile of dir) {
    if (!statsFile.isFile() || !statsFile.name.match(/\d+\.json/)) {
      continue
    }
    const epochValidatorsStats = JSON.parse(fs.readFileSync(path.join(statsFolder, statsFile.name)))
    for (const epochValidatorStats of epochValidatorsStats) {
      const validatorStats = validatorsStats.get(epochValidatorStats.account_id)
      const num_produced_blocks =
        epochValidatorStats.num_produced_blocks + ((validatorStats || {}).num_produced_blocks || 0)
      const num_expected_blocks =
        epochValidatorStats.num_expected_blocks + ((validatorStats || {}).num_expected_blocks || 0)
      validatorsStats.set(epochValidatorStats.account_id, {
        num_produced_blocks,
        num_expected_blocks,
      })
    }
  }

  const validatorsScoreboard = [...validatorsStats.entries()]
  validatorsScoreboard.sort(([_1, validatorStats1], [_2, validatorStats2]) => {
    return validatorStats2.num_produced_blocks - validatorStats1.num_produced_blocks
  })

  fs.writeFileSync(
    path.join(statsFolder, 'validators_scoreboard.json'),
    JSON.stringify(
      validatorsScoreboard.map(([account_id, { num_produced_blocks, num_expected_blocks }]) => {
        return { account_id, num_expected_blocks, num_produced_blocks }
      }),
      null,
      2
    )
  )

  let validatorsScoreboardCsv = 'ACCOUNT_ID,NUM_PRODUCED_BLOCKS,NUM_EXPECTED_BLOCKS,ONLINE\n'
  for (const [account_id, validatorStats] of validatorsScoreboard) {
    validatorsScoreboardCsv += `"${account_id}",${validatorStats.num_produced_blocks},${
      validatorStats.num_expected_blocks
    },${validatorStats.num_produced_blocks / validatorStats.num_expected_blocks * 100}\n`
  }

  fs.writeFileSync(path.join(statsFolder, 'validators_scoreboard.csv'), validatorsScoreboardCsv)
}

aggregateValidatorsScoreboard('./stats').catch(console.error)

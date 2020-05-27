const fs = require('fs')
const path = require('path')

async function aggregateValidatorsScoreboard(statsFolder) {
  const dir = await fs.promises.opendir(statsFolder)
  // Stats are: account_id => { num_produced_blocks, num_expected_blocks }
  const validatorsStats = new Map()
  for await (const statsFile of dir) {
    if (!statsFile.isFile() || !statsFile.name.endsWith('.json')) {
      continue
    }
    const epochValidatorsStats = JSON.parse(fs.readFileSync(path.join(statsFolder, statsFile.name)))
    for (const epochValidatorStats of epochValidatorsStats) {
      const validatorStats = validatorsStats.get(epochValidatorStats.account_id)
      const num_produced_blocks =
        epochValidatorStats.num_produced_blocks + (validatorStats?.num_produced_blocks ?? 0)
      const num_expected_blocks =
        epochValidatorStats.num_expected_blocks + (validatorStats?.num_expected_blocks ?? 0)
      validatorsStats.set(epochValidatorStats.account_id, {
        num_produced_blocks,
        num_expected_blocks,
      })
    }
  }
  let validatorsScoreboardCsv = 'ACCOUNT_ID,NUM_PRODUCED_BLOCKS,NUM_EXPECTED_BLOCKS,ONLINE\n'
  for (const [account_id, validatorStats] of validatorsStats.entries()) {
    validatorsScoreboardCsv += `"${account_id}",${validatorStats.num_produced_blocks},${
      validatorStats.num_expected_blocks
    },${validatorStats.num_produced_blocks / validatorStats.num_expected_blocks}\n`
  }
  fs.writeFileSync(path.join(statsFolder, 'validators_scoreboard.csv'), validatorsScoreboardCsv)
}
aggregateValidatorsScoreboard('./stats').catch(console.error)

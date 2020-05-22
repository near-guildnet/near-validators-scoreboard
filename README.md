# NEAR Validators Scoreboard

This is a simple implementation of a scoreboard for NEAR Validators started during the [Stake Wars Episode II](https://near.org/blog/stake-wars-episode-ii/).

## Data Collection

A script fetching the stats about the validators epoch by epoch (the number of produced blocks and the number of expected blocks).

Deploying it as an hour-interval cron job will produce all the necessary stats.

### Setup

```
$ npm install
```

### Run

Single run produces a JSON file with the stats for the epoch before the current.

```
$ npm run collect:previous-epoch
```

## Data Analysis

A simple script that produces the scoreboard CSV file from the collected epoch stats. The CSV format:

```
ACCOUNT_ID,NUM_PRODUCED_BLOCKS,NUM_EXPECTED_BLOCKS,ONLINE
a.betanet,99,100,99
node0,500,500,100
```

### Setup

```
$ npm install
```

You will also need the collected data in the current folder.

### Run

```
$ npm run build:scoreboard
```

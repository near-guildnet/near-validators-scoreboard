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

## Data Aggregation

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
$ npm run aggregate:scoreboard
```

This will produce a `validators_scoreboard.csv` in the `stats` folder.

### Automated update - Set up using crontab 

- First edit src/scoreboard.py
```
There are 4 paths in the script make them correct..
```

- Second edit src/aggregate-scoreboard.js
```
change the 3rd line to the correct path 
```

You will also need python
```
sudo apt install python3
```

crontab -e
```
# This will run run the collect script every 10 minutes 
*/10 * * * * /usr/bin/node /pathto_root_of_app/npm run collect:previous-epoch
# This will aggregate the stats and generate the html file every hour at the minute 32 
32 * * * * python3 /pathto_root_of_app/src/leaderboard.py
```

### Serve Config
Todo setup serve for /stats/output/



import os
import pandas as pd

# Aggregate the numbers
os.system('/usr/bin/node /path_to-->/src/aggregate-scoreboard.js')

# Remove old html file
os.remove("path_to-->/stats/output/validators_scoreboard.html")

# create variable with csv data (last_epoch)
scoreboard = pd.read_csv("/path_to-->/stats/validators_scoreboard.csv")

# save as html file
scoreboard.to_html("/path_to-->/stats/output/validators_scoreboard.html")

# assign the file to a variable (string)
html_file = scoreboard.to_html()

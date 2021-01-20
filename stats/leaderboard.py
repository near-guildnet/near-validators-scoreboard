import os
import pandas as pd

# Remove old html file
os.remove("/pathto--->>/stats/output/validators_scoreboard.html")

# create variable with csv data (last_epoch)
scoreboard = pd.read_csv("/pathto--->>/scoreboard/stats/validators_scoreboard.csv")

# save as html file
scoreboard.to_html("/pathto--->>/scoreboard/stats/output/validators_scoreboard.html")

# assign the file to a variable (string)
html_file = scoreboard.to_html()

# Add Additional HTML to beginning
add_css = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validator Scoreboard</title>
    <style>
      table {
          width: 50%;
          border-collapse: collapse;
        }

        table, td, tr {
            border: 0px solid black;
          }

        td {
            text-align: center;
            border-bottom: 1px solid #ddd;
          }
        th {
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
      </style>
</head>
<body>
<center>
"""

with open('/pathto--->>/scoreboard/stats/validators_scoreboard.html', 'r+') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if line.startswith('<table'):   # find a pattern so that we can add next to that line
            lines[i] = add_css+lines[i]
    f.truncate()
    f.seek(0)                                           # rewrite into the file
    for line in lines:
        f.write(line)

# Add Additional HTML to end
add_footer =  """
</center>
</body>
"""

with open('/pathto--->>/scoreboard/stats/validators_scoreboard.html', 'r+') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if line.startswith('</table>'):   # find a pattern so that we can add next to that line
            lines[i] = lines[i]+add_footer
    f.truncate()
    f.seek(0)                                           # rewrite into the file
    for line in lines:
        f.write(line)

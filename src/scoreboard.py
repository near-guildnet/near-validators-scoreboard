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

# Add Additional HTML to beginning header and formatting for single page site.
add_css = """ <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validator Scoreboard</title>
    <style>
      /* Style the header with a grey background and some padding */
      .header {
        overflow: hidden;
        background-color: #000000;
        padding: 20px 10px;
      }

      /* Style the header links */
      .header a {
        float: left;
        color: rgb(255, 255, 255);
        text-align: center;
        padding: 12px;
        text-decoration: none;
        font-size: 18px;
        line-height: 25px;
        border-radius: 4px;
      }

      /* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
      .header a.logo {
        font-size: 25px;
        font-weight: bold;
      }

      /* Change the background color on mouse-over */
      .header a:hover {
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
      }

      /* Style the active/current link*/
      .header a.active {
        background-color: dodgerblue;
        color: white;
      }

      /* Float the link section to the right */
      .header-right {
        float: right;
      }

      /* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
      @media screen and (max-width: 500px) {
        .header a {
          float: none;
          display: block;
          text-align: left;
        }
        .header-right {
          float: none;
        }
      }
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
<div class="header">
  <a href="#default" class="logo">NEAR</a>
  <div class="header-right">
    <a class="active" href="#home">Home</a>
    <a href="#contact">Leaderboard</a>
    <a href="#about">About ..</a>
  </div>
</div>
<h1>Validators Leaderboard</h1>
"""

# Add the above code to the html file above the first entry for table
with open('/path_to-->/stats/output/validators_scoreboard.html', 'r+') as f:
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

# Add the footer code to the html file on the line after the table closes
with open('/path_to-->/stats/output/validators_scoreboard.html', 'r+') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if line.startswith('</table>'):   # find a pattern so that we can add next to that line
            lines[i] = lines[i]+add_footer
    f.truncate()
    f.seek(0)                                           # rewrite into the file
    for line in lines:
        f.write(line)

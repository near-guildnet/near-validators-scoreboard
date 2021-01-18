import pandas as pd

# need header

# create variable with csv data
scoreboard = pd.read_csv("validators_scoreboard.csv")

# to save as html file named "validators_scoreboard"
scoreboard.to_html("validators_scoreboard.html")

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
    <script src="css/styles.css">
</head>
<body>
"""

with open('validators_scoreboard.html', 'r+') as f:
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
</script>
</body>
"""

with open('validators_scoreboard.html', 'r+') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if line.startswith('</table>'):   # find a pattern so that we can add next to that line
            lines[i] = lines[i]+add_footer
    f.truncate()
    f.seek(0)                                           # rewrite into the file
    for line in lines:
        f.write(line)

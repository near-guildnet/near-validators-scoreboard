import pandas as pd         

# need header

# create variable with csv data
scoreboard = pd.read_csv("validators_scoreboard.csv") 

# to save as html file named "validators_scoreboard" 
scoreboard.to_html("validators_scoreboard.html") 

# assign the file to a variable (string)  
html_file = scoreboard.to_html()


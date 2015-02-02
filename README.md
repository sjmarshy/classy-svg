# Classy SVG

I came upon a need to give SVG Paths classes based on their fill color. As this
isn't something that can usually be done in graphics packages, especially not
as flexibly as I needed to, I began to do it by hand. Then I had this idea.

This is super early, and in parts broken and hacky.

## Running

in order to run at the moment, you can call the script from within the project directory with

`node index.js -i <your.svg> -p <port[defaults to 8080]>`

this will open a browser window and show you the SVG you've selected and a list of the colors in it. That's all it does right now.

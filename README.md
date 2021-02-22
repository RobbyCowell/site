# 🏗 The Site 🚧
The repository for my personal site, referred to as the 'site', as it's an evolving engineering project resembling that of of a physical construction site.

I'll be writing development logs detailing and explaining the process as the project is built over time. This will be a living project, effectively documenting itself as it's built.

With each commit and log, this repository will evolve from the bare-bones state it's in today, to a finished, fully featured website. This first log outlines the requirements and general plan for the project which can be found [here](./src/dispatches/001-the-brief.md).

## Recent logs
[Log: 001 The Brief](./src/dispatches/001-the-brief.md)

## Current status
The project is in the very early stages of construction. So far a basic Svelte app has been implemented, along with a markdown webpack loader to render the markdown source files to html for rendering in the browser.

I'm currently working on the next log on how to set-up Svelte with Webpack and a few bonus Svelte tips if using VS Code.

## Installation
Note, you must have Node > 10 installed.

1. Clone this repository:
 ```
  git clone git@github.com:RobbyCowell/site.git
``` 
  or 
```
  git clone https://github.com/RobbyCowell/site.git
```
2. Open the directory
```
  cd site
```
3. Install dependencies
```
  npm install
```
4. Run the project
```
  npm run develop
```

5. Visit the site at: [http://localhost:1337/](http://localhost:1337/)
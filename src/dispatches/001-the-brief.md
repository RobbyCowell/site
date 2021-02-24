# Log 001: The Brief
Recently I've felt the desire to create an online home where I can share my engineering discoveries, musings, lessons, and processes. After being a long-time blog lurker, it only recently dawned on me that I could, and probably should, be contributing to the conversation and the excellent pool of software engineering knowledge available online. After all, that’s how I learned and got started 10 years ago.

This is the first of an unknown number of development logs that will document and share the development process of the 'site'. With each commit and log, this repository will evolve from the bare-bones state it's in today, to a finished, fully featured website. This first log outlines the requirements and general plan for the project.

Before we get into it, I want to point out that the choices I make here prioritize engineering exploration and curiosity over getting up and running quickly. If this project was for a company or client, I would definitely take a different, faster, approach. With all the tools available these days I could spin up a Gatsby site in under an hour and be done - but that wouldn’t be very interesting now would it!

## Requirements
### Articles
Inspired by the movement to preserve blogs and their content, I want my blog's content to be an integral part of the source code. If the website that houses the articles goes down, breaks, or vanishes, then the content of that blog is lost - potentially forever. By keeping the source of the content available in a public Git repo or similar, the content is preserved.

That led me to my first technical requirement for the project: all articles should be in a portable, parsable, open format, in this case the choice is clear: markdown.

### Blog system, rendering, and serving
Of course, if I’m building a blogging system, I’m going to want all of the usual suspects: permalinks for articles, tags, dates, authors, and maybe comments. So let’s add them to the list of requirements too.

Talking of links, I need to consider how URLs will work. If all my content lives in a markdown file, then I don’t need a server capable of anything more than blindly serving static pages. I could use a static site generator like Jekyll, throw it on GitHub pages, and call it a day. It would be clean, simple, and easy.

However, this would be a path well traveled for me and not very interesting from an engineering perspective. Additionally, I’m very interested in new approaches such as hybrid static and server side rendering methods used in projects like Next.js. The combination of speed, SEO-friendliness, and reliability are very interesting from a technical perspective, and will create a nice user experience, so I’m going to build a hybrid static and server side rendered application.

### JS library/framework
I work with React all day, every day, and want to take this opportunity to try out some new libraries, tools, and approaches. Yes, I want to try something other than React!

Svelte has been on my radar for a while, I love the idea of writing less code, (as code is tech debt after all), and pre-compiling my application to a fast, lean, and light vanilla JS bundle sounds great. Oh, and did I mention out-of-the-box component CSS scoping? My personal project seems like a great opportunity to kick the tires and get my hands dirty with Svelte. No risks or business impact here, so Svelte it is, for now at least!
Talking of light, I don’t want this project to pull in a mountain of third-party component libraries, widgets, tools etc. Plus, my recent work has been pretty much all hardcore business logic and data handling with tools like Redux Saga and React, barely touching JSX or CSS, and as a result, my CSS chops have somewhat fallen by the wayside. So I want to get as far as possible styling the project myself, with nothing more than Svelte’s built-in style scoping, and old trusty normalize.css.

### Accessibility (a11y) 
I plan to make the site as accessible as possible, and to at least hit everything on the WCAG compliance checklist. Also, if the demand ever existed, I’d want the ability to serve different translations of the site’s content; especially for my Spanish speaking friends and family.

### Summary
So here’s the requirements, as they stand:
 - A hybrid Svelte web app
 - All blog articles to be stored and formatted in Markdown files
 - A blog system that supports slugs, permalinks, tags, dates, and maybe authors
 - No third party CSS or components except for normalize
 - WCAG/a11y compatible
 - System should support translations in time

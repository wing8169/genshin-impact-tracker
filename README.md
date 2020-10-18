# Requirements

1. As a user I need to mark any locations I want.
2. As a user I want the markers to be chests, artifacts, plants.
3. As a user every time I mark a marker, I want it to record my activity log.
4. As a user I want every marker to have a reset time, and notify me if the reset time is over.
5. As a user I want the data to be by google auth user.
6. As a user I don't want any limitations to the maximum number of markers I can mark.

# Figma Design

https://www.figma.com/file/xvFQA1pCAiRk2KKeQgdb4Q/Personal-Projects?node-id=31%3A2

# Why Need This?

This is a just-for-fun project that I created to polish my skills in ReactJS. 
Aside from that, I want to know if this can help in figuring out the "logic" 
behind the respawning time for the chests to save our time walking around the 
world and find for common chests but in vain. It might be a complete RNG, 
but why don't we give it a try? xD

# Prerequisites

You will need a .env file that contains the credentials, request from the author to get the file.

# Run Server

Clone the project.

npm install (first time cloning the project)

npm start

install "prettier" plugin and enable to allow 2-space formatting

# Infrastructure

ReactJS front end with Firebase database, private usage no plan to release yet

# Project Structure

1. Components for UI components, service for backend logic, images for static images.
2. Naming conventions should be lower case with dash, e.g. main-menu.js, tevyat-map.png
3. Component should use functional components instead of class components if possible.
4. Naming convention for components is upper case first letter of every word, e.g. MainMenu
5. Naming convention for functions / services is camelCase.

# Progression

- [ ] Firebase Authentication
- [x] Map Loader
- [ ] On-Click Markers
- [ ] Marker Activity Logging
- [ ] Markers Firebase Integration
- [ ] Respawn Notifier

# Contribution

The project is non-commercial and contributed by Chin Jia Xiong.

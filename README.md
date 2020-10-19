# Demonstration Website

https://genshin-impact-tracker.herokuapp.com/

# Features

- [x] Mark any locations on the world of Teyvat.
- [x] Keep track of all the markers and recent changes.
- [x] Estimate the resources respawn time by calculating the shortest interval.
- [x] Notification when the resources estimated respawn time has passed.

# Why Built This?

This is a just-for-fun project that I created to polish my skills in ReactJS.
Aside from that, I want to know if this can help in figuring out the "logic"
behind the respawning time for the chests to save our time walking around the
world and find for common chests but in vain. It might be a complete RNG,
but why don't we give it a try?

# Prerequisites

Add `.env` file that includes the following information.

```dotenv
# firebase
REACT_APP_API_KEY="Your firebase api key"
REACT_APP_AUTH_DOMAIN="Your firebase auth domain"
REACT_APP_DATABASE_URL="Your firebase database URL"
REACT_APP_PROJECT_ID="Your firebase project ID"
```

# Run Server

Clone the project.

npm install (first time cloning the project)

npm start

install "prettier" plugin and enable to allow 2-space formatting

# Infrastructure

ReactJS front end integrated with Firebase database.

# Project Structure

1. Components for UI components, service for backend logic, images for static images.
2. Naming conventions should be lower case with dash, e.g. main-menu.js, tevyat-map.webp
3. Component should use functional components instead of class components if possible.
4. Naming convention for components is upper case first letter of every word, e.g. MainMenu
5. Naming convention for functions / services is camelCase.

# Progression

- [x] Firebase Authentication
- [x] Map Loader
- [x] Create Marker Form UI
- [x] Side Menu
- [x] On-Click Create Markers UI
- [x] N Hours Since Found Filter
- [x] Logic On Estimating Respawn Time
- [x] Side Menu See Recent Activities
- [x] Side Menu Activities On-Click Navigate Markers
- [x] Markers Notifier
- [ ] Integrate Markers To Firebase

# Contribution

The project is contributed by Chin Jia Xiong and assisted by Eng Tze Qian, final year Degree Software Engineering students.

ALL MEDIA ASSETS ARE OWNED BY THE ORIGINAL CREATORS, although this project is only for personal research purpose,
they have the complete rights to shut down the service at any time.

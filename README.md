# CollabFy - A collaborative synchronised playlist for Spotify

A site where multiple users can propose songs and vote for them, having them played in a synchronised way through Spotify.

![List](https://i.imgur.com/G0KGydl.png)

## Prerequisites

* [Git](https://git-scm.com/) - Git
* [Node.js](https://nodejs.org/en/) - Node.js

## Running

The server can be run locally and also deployed to your own server. You will need to register your own Spotify app and set the credentials in a couple of config files:

````
# Create an Spotify application
Create an application on [Spotify's Developer Site](https://developer.spotify.com/my-applications/).

# Add as redirect uris both
Add as redirect uris both http://localhost:3000/auth/callback (for development) and <production_domain>/auth/callback (if you want to deploy your app somewhere).

# Configure
Set your HOST in `config/app.js`, CLIENT_ID and CLIENT_SECRET in `config/auth.js`.

# Install dependencies
npm install

# Run
npm run dev
````

## Running on production

```
# Run
npm run build && npm run start
```

## App configurations

* HOST = IP or domain of host

## Auth configurations

* CLIENT_ID = Client ID of Spotify application
* CLIENT_SECRET = Client Secret of Spotify application

## Built With

* [Node.js](https://nodejs.org/en/)
* [React](https://reactjs.org/)

## Authors

* **Giovani de Oliveira** - [xxgicoxx](https://github.com/xxgicoxx)

## Acknowledgments

* [FlatIcon](https://www.flaticon.com/) - Icon
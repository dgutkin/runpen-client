# runPen

A digital training journal on the web for recreational or race use. [runpen.ca](www.runpen.ca)

![runPen Landing Page](public/runPen-landing-page.png)

## Tooling

* Vercel for deployment and hosting
* Next.js for the front-end
* Firebase for authentication
* Express.js for the server
* MongoDB for the database

## Installation
The project is hosted for actual use at www.runpen.ca. 

To develop locally, see the following steps.

1. Fork and clone the client and server repos

    `git clone https://github.com/dgutkin/runpen-client.git`

    `git clone https://github.com/dgutkin/runpen-server.git`

2. Install Node

    https://nodejs.org/en/download

3. Install all requisite node packages for the client and server

    `npm install`

4. Install MongoDB Community Edition

    https://www.mongodb.com/docs/manual/administration/install-community/
5. Create the data schema based on runpen-server/models/models.js
6. Sign into Firebase with a Google account and setup Authentication
* Replace the client config at runpen-client/firebase/firebase-config.js
* Replace the server config (service account) at runpen-server/config/firebase-config.js

## License

MIT License

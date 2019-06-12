# Zendesk Ticket Viewer - Backend
Zendesk Ticket Viewer is a web based application which retrieves and presents support tickets from the Zendesk API. This project was for the Zendesk Internship Coding Challenge.

## Features
  - Routes to each of the following API endpoints were implemented using express.js:
    - Fetch total number of tickets from the Zendesk API. This is used by the front-end to determine the page numbers that the user can navigate through.
    - Fetch single ticket with all relevant details.
    - Fetch all tickets given a page id. A page id is which page is currently displayed in the front-end. The front-end will be displaying 25 tickets per page.

## Technology

As a full-stack developer, I decided to split the solution into a front-end and back-end. The reason behind this decision was to seperate concerns and design an architecture to a professional standard.

* [node.js](https://nodejs.org/en/)
* [express.js](https://expressjs.com/)
* [node-mocks-http](https://www.npmjs.com/package/node-mocks-http)
* [nodemon](https://www.npmjs.com/package/nodemon) - _(Optional; reloads express server on file changes)_
* [zendesk-node-api](https://www.npmjs.com/package/zendesk-node-api)
* [jasmine](https://jasmine.github.io/)

### Installation

1. Check out the code by running at a terminal `git clone https://github.com/bbergstrum/zendesk-tickets-backend`.
2. `cd` into the directory.
3. _(Optional) If you haven't installed nodejs and npm locally on your machine, do so now._
4. Set an environment variable with the key `ZENDESK_EMAIL` and the value being your email address corresponding to your Zendesk account.
5. Set an environment variable with the key `ZENDESK_URL` and the value being your URL corresponding to your Zendesk account.
6. Set an environment variable with the key `ZENDESK_TOKEN` and the value being your zendesk token.
7. Run `npm install`
8. Run `npm start`
9. Now the API should be listening on `localhost`, port `3000`.
10. Check that the API can load all of the tickets from the Zendesk API by navigating to `http://localhost:3000/ticketsByPage/1` in Google Chrome.

### Deployment
The back-end is manually deployed by SSHing into the EC2 instance and pulling down the code from the git repository. Run the server by executing `setsid nohup npm start &`. This runs the node.js server and ensures that closing the current SSH session does not terminate it.

**To avoid going through the installation steps, you can find the deployed back-end here:** [Zendesk Ticket Backend](http://ec2-13-210-131-209.ap-southeast-2.compute.amazonaws.com:3000/ticketsByPage/1)

## Testing
Unit testing has been implemented using the Jasmine framework.
1. Open a terminal
2. `cd` into the root of the project directory
3. Run `npm install` (if not done initially)
3. Run `jasmine`

### License
MIT

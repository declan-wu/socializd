# Socializd :whale: :snowflake: :notes:

Socializd is the decision maker that you've been looking for all along.
It lets you create a poll and generate a link to share among your friends, so they can help you make those important (or not so important) decisions. 

This app was developed with Node.js with Express on the back end, and with EJS, Jquery and Ajax to render HTML/CSS page on the front end. 

Here is a demo for Socializd [https://socializd.herokuapp.com/](https://socializd.herokuapp.com/). 

## Getting Started

In order to get started with this project, you need to run `npm install` to install all dependencies for back end (Node.js/Express.

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`
  
Then navigate to `http://localhost:8080` to view the Socializd app. 

#### Prerequisites

What you need to install:

- Express
- PostgreSQL
- Jquery
- Ajax
- Bootstrap
- Sass
- EJS

#### Installing

Clone the project and make sure to install all dependencies with `npm install`. 

#### ERD
- [Links to ERD](https://drive.google.com/file/d/1gZUOXyZZURhFwnGKsJqB_tUAejgiRzZ6/view?usp=sharing)


## Deployment

This app has been deployed on Heroku. You can see a demo [here](https://socializd.herokuapp.com/). 

## Versioning

Socializd 1.0.0

## Ideas for Future Development
* User registration and login
* User dashboard with an instant view of result chart
* Features: delete the poll and send email invites to friends

## Contributors

* [Declan Wu](https://github.com/declan-wu)
* [Annie Kao ](https://github.com/anniekao)
* [Andrew Ting](https://github.com/andrewting112)


## License

This project is licensed under the MIT License

## Acknowledgments

* To all libraries that were used to create this project
* Mentors, friends for their support (coding and otherwise)

# Socializd
__Socializd Logo__
!["logo"]("https://github.com/declan-wu/socializd/blob/master/public/images/Screenshot_2019-08-22_18-25-45.png")

Socializd is developed in Node.js with Express for backend, and using EJS, Jquery and Ajax to render HTML/CSS page for front end. 

## Progress
- [Links to project management](https://trello.com/b/EuCSEUBn/socializd)
- [Links to ERD](https://drive.google.com/file/d/1gZUOXyZZURhFwnGKsJqB_tUAejgiRzZ6/view?usp=sharing)
- `psql -h localhost -p 5432 -U labber midterm` to access database
- this command to push local db to heroku `PGUSER=labber PGPASSWORD=labber heroku pg:push midterm DATABASE_URL --app socializd`

## Getting Started

In order to get started with this project, you need to run `npm install` to install all dependencies for back-end (Node.js/Express). 

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
  
Then navigate to `http://localhost:8080` to view the Socializd app. 

### Prerequisites

What you need to install:

- express,
- body-parser,
- cookie-session,
- ejs,
- moment,
- bootstrap, 
- pg
- axios
- jquery
- ajax
- mocha
- chai

### Installing

Clone the project and make sure to install all dependencies. 

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
- It runs through each of the files, in order, and executes them against the database. 
- Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.


## Testing

- Unit tests: run `npm test` to run unit tests written using mocha and chai. 
Because many of the utility functions are used to encryption, generating random alphanumeric string, only selected utility functions have been tested. 
- Integration tests:  perfomed to ensure the app works with external resources. 
- Regression test: after implementing new features (enable user authentication, enable cookies, etc) or bug fixes, the past code has been re-tested to make sure no new bugs are introduced or fixed if any. 

## App Flow

__Socializd Logo__
!["logo"]("https://github.com/declan-wu/socializd/blob/master/public/images/Screenshot_2019-08-22_18-25-45.png")

## Deployment

This app has't been deployed yet as of now. 

## Versioning

Socializd 1.0.0

## Authors

* Declan Wu:
* Andrew Ting:
* Annie Kao: 

## License

This project is licensed under the MIT License

## Acknowledgments

* To all libraries that were used to create this project
* Mentors, friends for their support (coding and otherwise)


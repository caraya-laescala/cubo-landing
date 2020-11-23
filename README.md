# Notes

## Requirements

* Node.js.
* MongoDB.
* NPM or Yarn.
* .env file.

## Environment Variables

### Keys

* PORT
* MONGO_URI
* SUBJECT_EMAIL
* NAME_TRANSPORTER
* HOST_TRANSPORTER
* PORT_TRANSPORTER
* SECURE_TRANSPORTER
* USER_TRANSPORTER
* PASS_TRANSPORTER

### Configuration

* Create '.env' filename inside root path.
* Insert enviroment variables keys previously mentioned with desired values inside '.env' filename.
* Save changes.
* OPTIONAL in development mode: 'HOST_TRANSPORTER' to 'PASS_TRANSPORTER' environment variables aren't required, because application set automatically these values.

## Steps to run project
 
* Open terminal inside project root path
* Execute 'yarn' or 'npm i' commands to install node_modules (only first time).
* Execute 'yarn start' or 'npm start' to start project.
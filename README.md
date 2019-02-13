# Bob-s-Bananas-Budget

## Getting Started
- This app requires you to have Redis installed and have its server running to work. If you do not have either, please download and/or follow the instructions provided in https://redis.io/download to start the Redis server and load database.

- Fork and Clone this repository
- Open directory
````sh
cd Bob-s-Bananas-Budget
````
- Install dependencies
````sh
npm install
````
- Start server
```sh
npm run server
````
- Open another terminal and start application
````sh
npm start
````

## Instructions
- Input start date
- Input number of days you would like to calculate your budget for
- Click calculate
- Go bananas 🍌

## Extra Comments
API built with Node/Express.

Selected Redis as database to check and store simple key/value pairs with inputs stringified and stored as unique keys and cost stored as values. Redis was the best option for this scenario as using a typical Mongoose or SQL database would take longer in checking if we've made the same request before (as well as other reasons).

Incorporated testing to ensure API doesn't break if any iterations were to be made with it.

Simple UI built with React. For some odd reason, converting date input into a new Date object would set the date back by one day, so I had to account for that. Also incorporated a proxy dev server.



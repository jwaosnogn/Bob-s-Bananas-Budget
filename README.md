# Bob-s-Bananas-Budget

API built with Node/Express.

Selected Redis as database to check and store simple key/value pairs with inputs stringified and stored as unique keys and cost stored as values. Redis was the best option to for this scenario as using a typical Mongoose or SQL database would take longer in checking if we've made the same request before (as well as other reasons).

Incorporated testing to ensure API doesn't break if any iterations were to be made with it.

Simple UI built with React. For some odd reason, converting date input into a new Date object would set the date back by one day, so I had to account for that. Also incorporated a proxy dev server.

# web-crawler
a program to crawl websites and all its pages to store their urls

## Installation
The program is developed on node v12.6.0

* Clone the repository
* Run `npm install` to install all dependencies
* Make sure mongodb is running on localhost or your choice of db url that you can set in config file
* If not then run `mongod` to start mongodb locally
* set config for rootUrl to call and number of concurrent requests, by default it is set to https://medium.com and 5

## Usage
* Run `npm start`
This will start populating data the urls collection in crawler_db or whatever db_name you have set in config

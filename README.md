# Courser - Rest Api / Backend Scaling

## Table of Contents

1. [Overview](#overview)
2. [Scaling](#scaling)
3. [Installation](#installation)
4. [Database](#database)
5. [API](#api)
6. [Testing](#testing)

## Overview

### Background
A team of four working to scale the Backend of a course website similar to udemy. The Service Level agreement required a rate of 500rps with a response time < 300ms and a  < 1% error rate.

### Technologies
- Node with Express
- Postgres
- AWS S3
- AWS EC2
- loader.io
- new relic
- Mocha
- Chai
- Puppeteer
- k6
- artillery
- nginx

### Highlights
- 4x ec2 mediums load balanced with nginx
- Postgres database with over 150M entries
- Achieved over 500rps < 200ms

## Scaling

The goal of the project was to scale this system up to the service level agreement of 500rps < 200ms and < 1% error rate.
throughout the process loader.io, artillery, k6, and new relic were utilized to take a metrics driven approaach to scaling the system.

### Initial Deployment

After database tuning, The server was deployed on AWS ec2 and s3.
The initial setup was a basic setup with 3x t2.micros. one for the proxy, one for the service, and one for the database

![itial](https://github.com/AboutURI/colton-proxy/images/arc-1.png)

This setup had a very slow response time and maxed out at 165rps before failing

```
Mean response/sec: 165.27
  Response time (msec):
    min: 1429
    max: 4102
    median: 2187
    p95: 3762
    p99: 4067
```

### Vertical Scaling


## Installation

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 12.22.1

1. From within the root directory:

`npm install`

2. create a .env file
`see .env-sample for format`

3. build the client bundle with:
`npm build`

4. start the server with:
`npm start`

## Database
  The Database is a Postgres database, it contains 3 tables:
  - Reviews (150M records)
    ```
    {
      courseId,
      reviewerId,
      rating,
      comment,
      helpful,
      reported
    }
    ```
  - Reviewers (10M records)
  ```
  {
    name,
    picture,
    coursesTaken,
    Reviews => int represening number of reviews
  }
  ```
  - Ratings (10M records) aggregation of review data for each course
  ```
  {
    courseId,
    overallRating,
    totalRatings,
    totalStars,
    5,
    4 1/2,
    4,
    3 1/2,
    3,
    2 1/2,
    2,
    1 1/2,
    1
  }
  ```
  -----------------

  - Courses have many reviews
  - Ratings belong to one course,
  - Reviews belong to one reviewer

## API
endpoints:
- /course/{id}/reviews
  * Returns the rating and reviews for a single course
- /review(/{id})
  * crud endpoint for single review
- /reviewer(/{id})
  * crud endpoint for single reviewer
- /rating(/{id})
  * crud endpoint for single rating

## TESTING

`npm run test`
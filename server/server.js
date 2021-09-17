const shrinkRay = require('shrink-ray-current');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

app.use(shrinkRay());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

client.on('connect', () => {
  console.log('Redis Connected!');
});

const cluster = require('cluster');
const CPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < CPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  app.get('/course/:id/reviews', (req, res) => {
    try {
      client.get(req.params.id, (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          res.send(JSON.parse(data));
        } else {
          axios.get(`http://ec2-54-183-120-231.us-west-1.compute.amazonaws.com/course/${req.params.id}/reviews`)
            .then((result) => {
              client.setex(req.params.id, 600, JSON.stringify(result.data));
              res.status(200).json(result.data);
            })
            .catch((err) => {
              throw err;
            });
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.listen(2712, () => {
    console.log(`Server listening at port 2712`);
  });
}

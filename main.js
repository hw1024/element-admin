const config        = require('./libs/config');
// const cors          = require('koa-cors');  //跨域处理
const bodyParser    = require('body-parser');
const express       = require('express');
const handleMethods = require('./server');
const Router        = require('./libs/router');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
app.listen(config.port, () => {
  console.clear();
  console.log(`http://localhost:${config.port}`);
});

app.all('*', function(req, res, next) {
  // console.clear();
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});

for (const item of Router.router) {
  app[item.methods](`${config.serverUrlHeader}${item.path}`, (req, res) => {
    const params = req[item.response];
    handleMethods[item.name](params, req)
      .then(msg => res.send(msg))
      .catch(err => res.send(err));
  });
}
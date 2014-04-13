var express = require('express'),
  swagger = require('swagger-node-express'),
  cors = require('cors'),
  models = require('./models');

var app = express(),
  subpath = express();

app.use(express.urlencoded());
app.use(express.json());
app.use("/content-delivery", subpath);

var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (origin === undefined) {
      callback(null, false);
    } else {
      // var match = origin.match("^(.*)?.wordnik.com(:[0-9]+)?");
      // var allowed = (match !== null && match.length > 0);
      // callback(null, allowed);
      // Allow all for now *
      callback(null, true);
    }
  }
};

app.use(cors(corsOptions));

/** Login **/
app.get('/user', function(req, res){
  setTimeout(function(){
    res.send(
      {
        "isAdmin": true,
        "isLoggedIn": true,
        "studentId": "x3",
        "staffId": "s1",
        "logoutUrl": "/",
        "name": "Chris Coder"
      }
    );
  }, 1000);
});

/** Proper api **/
swagger.setAppHandler(subpath);

var statsResources = require('./statsResources'),
  videosResources = require('./videosResources'),
  problemsResources = require('./problemsResources'),
  topicsResources = require('./topicsResources'),
  coursesResources = require('./coursesResources');

swagger.addModels(models)

  .addGet(statsResources.getStats)

  .addGet(videosResources.findAll)
  .addGet(videosResources.findById)
  .addPost(videosResources.create)
  .addPut(videosResources.attach)
  .addGet(problemsResources.findAll)
  .addGet(problemsResources.findById)
  .addPost(problemsResources.createNewProblem)
  .addPost(problemsResources.addQuestion)
  .addPost(problemsResources.postAnswer)

  .addGet(topicsResources.findAll)
  .addGet(topicsResources.findById)
  .addPost(topicsResources.create)
  .addPut(topicsResources.update)

  .addGet(coursesResources.findAll)
  .addGet(coursesResources.findById)
  .addPost(coursesResources.create)
;


swagger.configureDeclaration('stats', {
  description: 'Operations about Stats',
  authorizations: ['oauth2'],
  produces: ['application/json']
});

swagger.configureDeclaration('videos', {
  description: 'Operations about Videos',
  authorizations: ['oauth2'],
  produces: ['application/json']
});

swagger.configureDeclaration('problems', {
  description: 'Operations about Problems',
  authorizations: ['oauth2'],
  produces: ['application/json']
});

// set api info
swagger.setApiInfo({
  title: 'Angular Education',
  description: 'Angular Education Description',
  termsOfServiceUrl: 'http://example.com/terms/',
  contact: 'apiteam@example.com',
  license: 'N/A',
  licenseUrl: 'http://www.example.com/licenses/xyz.html'
});

swagger.setAuthorizations({
  apiKey: {
    type: 'apiKey',
    passAs: 'header'
  }
});

// Configures the app's base path and api version.
swagger.configureSwaggerPaths('', '/api-docs', '');
// TODO: Make it dynamic
swagger.configure('http://localhost:9090', '1.0.0');

swagger.setHeaders = function setHeaders(res) {
  res.header('Access-Control-Allow-Headers', 'Content-Type, api_key');
  res.header('Content-Type', 'application/json; charset=utf-8');
};

// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    // Check for proxy
    // TODO: Make it dynamic
    if (req.headers.host.indexOf('9090') < 0) {
      res.writeHead(302, { 'Location': 'http://' + req.headers.host + '/api/v1/docs/' });
    }
    else {
      res.writeHead(302, { 'Location': req.url + '/' });
    }
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

// Start the server on port 9090
app.listen(9090);

console.log('Listening on port 9090');

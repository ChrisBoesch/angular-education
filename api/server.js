/*global setTimeout*/
var express = require('express'),
  swagger = require('swagger-node-express'),
  models = require('./models');

var app = express();

app.use(express.urlencoded());
app.use(express.json());

swagger.setAppHandler(app);

var videosResources = require('./videosResources');

swagger.addModels(models)
  .addGet(videosResources.findAll)
  .addGet(videosResources.findById);


swagger.configureDeclaration('videos', {
  description : 'Operations about Videos',
  authorizations : ['oauth2'],
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
swagger.configure('http://localhost:9090', '1.0.0');

// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location': req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

// Start the server on port 9090
app.listen(9090);

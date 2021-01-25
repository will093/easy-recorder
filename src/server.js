/**
 * Used to serve the app when deployed on Heroku
 */
let path = require('path');
let express = require('express'), app = express();
let indexHtmlPath = path.resolve('./www/index.html');

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.get('/*', (req, res) => res.sendFile(indexHtmlPath));

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
const express = require('express');
const { engine } = require('express-handlebars');
const route = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const db = require('./dao/sequelize');
const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(express.static('frontend/build'));
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

route(app);

db.sync()
.then(() => {
  app.listen(port, () => {
    console.log(`My blog app listening on port ${port}`)
  });
})
.catch((error) => {
  console.log('Synch database error ', error);
});
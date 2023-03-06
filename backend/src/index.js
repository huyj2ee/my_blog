const express = require('express');
const { engine } = require('express-handlebars');
const route = require('./routes');
const app = express();
const port = 3000;

app.use(express.static('frontend/build'));
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

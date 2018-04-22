const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/database');

//connect to mongoose
mongoose.connect(db.mongoURI).then(()=>console.log('MongoDB Connected....')).catch(err=>console.log(err));

//Handlebars middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}
));
app.set('view engine','handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));

//Method override middleware
app.use(methodOverride('_method'));

//Express session middleware
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash middleware
app.use(flash());

//Global variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Index Route
app.get('/',(req,res)=>{
  const title = 'Welcome';
  res.render('Index',{
    title:title
  });
});

//about Route
app.get('/about',(req,res)=>{
  res.render('About');
});

//Use routes
app.use('/ideas',ideas);
app.use('/users',users);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});


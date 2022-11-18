
require('./config')(app);

// default value for title local
const projectName = 'lab-express-basic-auth';
const projectName2 = 'Express Basic Auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
const app = express();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;
app.locals.title = `LAB ${capitalized(projectName)}`;

// Configure session
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
)
// End of session configuration

// 👇 Start handling routes here
const index = require('./routes/index.routes');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const protected = require('./routes/protected');
app.use('/', protected);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);
require('dotenv').config();                
const express       = require('express');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const path          = require('path');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // for RESTful services using the terminal
app.use(session({
  secret: 'cargo-secret',
  resave: false,
  saveUninitialized: true
}));

const USERNAME = 'admin';
const PASSWORD = '123456';

app.get('/login', (_, res) => res.render('login', { errorMessage: null }));
app.post('/login', (req, res) => {
  const { nickname, password } = req.body;
  if (nickname === USERNAME && password === PASSWORD) {
    req.session.user = nickname;
    return res.redirect('/');
  }
  res.render('login', { errorMessage: 'Invalid username or password' });
});
app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));

function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

let coll; 
(async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  coll = client.db('S381cargoDB').collection('cargos');
  console.log('✅ MongoDB connected');

  

  app.get('/', requireLogin, (_, res) => res.render('index'));

  app.get('/inbound', requireLogin, (_, res) => res.render('inbound'));
  app.post('/inbound', requireLogin, async (req, res) => {
    const { name, code, quantity, remark } = req.body;
    await coll.insertOne({ name, code, quantity: Number(quantity), remark });
    res.render('inbound', { message: `Added: ${name} (Code: ${code}, Quantity: ${quantity})` });
  });

  app.get('/outbound', requireLogin, (_, res) => res.render('outbound'));
  app.post('/outbound', requireLogin, async (req, res) => {
    const { code } = req.body;
    const { deletedCount } = await coll.deleteOne({ code });
    res.render('outbound', {
      message: deletedCount
        ? `Cargo with code ${code} has been deleted.`
        : `Cargo with code ${code} not found.`
    });
  });

  app.get('/edit', requireLogin, (_, res) => res.render('edit'));
  app.post('/edit', requireLogin, async (req, res) => {
    const { code, newName, newQuantity, newRemark } = req.body;
    const update = {};
    if (newName) update.name = newName;
    if (newQuantity) update.quantity = Number(newQuantity);
    if (newRemark) update.remark = newRemark;

    const { matchedCount } = await coll.updateOne({ code }, { $set: update });
    if (matchedCount) {
      const updated = await coll.findOne({ code }, { projection: { _id: 0 } });
      res.render('edit', {
        message: `Cargo ${code} updated: Name=${updated.name}, Quantity=${updated.quantity}`
      });
    } else {
      res.render('edit', { message: 'Cargo not found.' });
    }
  });

  app.get('/search', requireLogin, (_, res) => res.render('search'));
  app.post('/search', requireLogin, async (req, res) => {
    const { keyword } = req.body;
    const cargo = await coll.findOne({
      $or: [{ name: keyword }, { code: keyword }]
    }, { projection: { _id: 0 } });
    res.render('search', cargo ? { cargo } : { message: 'No cargo found.' });
  });

  app.get('/list', requireLogin, async (_, res) => {
    const cargos = await coll.find({}, { projection: { _id: 0 } }).toArray();
    res.render('list', { cargos });
  });

  /* ---------- RESTful API ---------- */
  app.get('/api/cargo/:code', async (req, res) => {
    const cargo = await coll.findOne({ code: req.params.code }, { projection: { _id: 0 } });
    res.json(cargo || { error: 'Not found' });
  });

  app.post('/api/cargo', async (req, res) => {
    const doc = { ...req.body, quantity: Number(req.body.quantity) };
    await coll.insertOne(doc);
    res.json(doc);
  });

  app.put('/api/cargo/:code', async (req, res) => {
    const update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.quantity) update.quantity = Number(req.body.quantity);
    if (req.body.remark) update.remark = req.body.remark;
    const r = await coll.updateOne({ code: req.params.code }, { $set: update });
    if (r.matchedCount === 0) return res.json({ error: 'Not found' });
    const updated = await coll.findOne({ code: req.params.code }, { projection: { _id: 0 } });
    res.json(updated);
  });

  app.delete('/api/cargo/:code', async (req, res) => {
    const r = await coll.deleteOne({ code: req.params.code });
    res.json(r.deletedCount ? { deleted: true } : { error: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
    console.log('Current mode: MongoDB Atlas');
  });
})().catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});



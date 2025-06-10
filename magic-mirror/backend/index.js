const express = require('express');
const caldav = require('./caldav');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
  try {
    const events = await caldav.getEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = await caldav.addEvent(req.body);
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/events/:uid', async (req, res) => {
  try {
    await caldav.deleteEvent(req.params.uid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static('frontend'));

app.listen(3000, () => {
  console.log('Server gestart op http://localhost:3000');
});

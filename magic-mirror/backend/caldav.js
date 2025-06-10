const dav = require('dav');
require('dotenv').config();

const credentials = new dav.Credentials({
  username: process.env.CALDAV_USERNAME,
  password: process.env.CALDAV_PASSWORD
});

const serverUrl = process.env.CALDAV_URL;

let calendarHomeSet;
let calendar;

async function setup() {
  const account = await dav.createAccount({
    server: serverUrl,
    credentials: credentials,
    loadCollections: true,
    loadObjects: true
  });

  calendarHomeSet = account.calendarHomeSet;
  calendar = account.calendars[0]; // Je eerste kalender
}

async function getEvents() {
  if (!calendar) await setup();

  return calendar.objects.map(obj => ({
    id: obj.data.match(/UID:(.*)/)[1],
    title: obj.data.match(/SUMMARY:(.*)/)[1],
    start: obj.data.match(/DTSTART;TZID=.*?:(.*)/)[1],
    end: obj.data.match(/DTEND;TZID=.*?:(.*)/)[1]
  }));
}

async function addEvent(event) {
  // TODO: CalDAV event toevoegen (VCALENDAR schrijven)
  return {}; // tijdelijk
}

async function deleteEvent(uid) {
  // TODO: CalDAV DELETE voor event met die UID
  return;
}

module.exports = { getEvents, addEvent, deleteEvent };

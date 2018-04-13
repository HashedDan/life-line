import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...

export const doCreateDisaster = (name, date, desc, loc, lng, lat) =>
  db.ref(`disasters/`).push({
    name,
    date,
    desc,
    loc,
    lng,
    lat,
  });

export const onceGetDisasters = () =>
  db.ref('disasters').once('value');

export const doClaimEvent = (disaster, event, userId) => {
  db.ref(`disasters/${disaster}/events/${event}/status`).set("underway");
  db.ref(`users/${userId}/disasters/`).push({
    disaster,
    event,
  });
}
  
export const doCreateEvent = (disasterId, title, date, desc, org, status) =>
  db.ref(`disasters/${disasterId}/events/`).push({
    title,
    date,
    desc,
    org,
    status,
  });

export const doGetUserEvents = (userId) =>
  db.ref(`users/${userId}`).once(`value`);
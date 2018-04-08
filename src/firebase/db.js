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
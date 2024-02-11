// import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getContacts() {
  const querySnapshot = await getDocs(collection(db, "participants"));
  let contacts = [];
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    contacts.push({ ...doc.data(), id: doc.id });
  });
  // await fakeNetwork(`getContacts:${query}`);
  // let contacts = await localforage.getItem("contacts");
  // if (!contacts) contacts = [];
  // if (query) {
  //   contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  // }
  // console.log(contacts);
  return contacts.sort(sortBy("last", "createdAt"));
}

// export async function getContacts(query) {
//   const querySnapshot = await getDocs(collection(db, "participants"));
//   let contacts = [];
//   querySnapshot.forEach((doc) => {
//     // console.log(`${doc.id} => ${doc.data()}`);
//     contacts.push({ ...doc.data(), id: doc.id });
//   });
//   // await fakeNetwork(`getContacts:${query}`);
//   // let contacts = await localforage.getItem("contacts");
//   // if (!contacts) contacts = [];
//   if (query) {
//     contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
//   }
//   // console.log(contacts);
//   return contacts.sort(sortBy("last", "createdAt"));
// }

export async function createContact() {
  // await fakeNetwork();
  // let id = Math.random().toString(36).substring(2, 9);
  let contact;
  let contacts = await getContacts();

  try {
    const docRef = await addDoc(collection(db, "participants"), {
      createdAt: Timestamp.now(),
    });
    // console.log("Document written with ID: ", docRef.id);
    let id = docRef.id;

    contact = { id, createdAt: docRef.createdAt };

    contacts.unshift(contact);
    // await set(contacts);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return contact;
}

export async function getContact(id) {
  // await fakeNetwork(`contact:${id}`);
  // let contacts = await localforage.getItem("contacts");
  // let contact = contacts.find((contact) => contact.id === id);
  let contact;
  const docRef = doc(db, "participants", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    contact = { ...docSnap.data(), id: docSnap.id };
    // console.log(contact);
  } else {
    // docSnap.data() will be undefined in this case
    // console.log("No such document!");
  }
  return contact ?? null;
}

export async function updateContact(id, updates) {
  let contact = getContact(id);
  if (!contact) throw new Error("No contact found for", id);

  const docRef = doc(db, "participants", id);
  await updateDoc(docRef, updates);

  // await fakeNetwork();
  // let contacts = await localforage.getItem("contacts");
  // let contact = contacts.find((contact) => contact.id === id);
  // if (!contact) throw new Error("No contact found for", id);
  // Object.assign(contact, updates);
  // await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  await deleteDoc(doc(db, "participants", id));
  // let contacts = await localforage.getItem("contacts");
  // let index = contacts.findIndex((contact) => contact.id === id);
  // if (index > -1) {
  //   contacts.splice(index, 1);
  //   await set(contacts);
  //   return true;
  // }
  // return false;
}

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

// fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 800);
//   });
// }

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
  // console.log(contacts);
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
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

  return contact;
}

export async function deleteContact(id) {
  await deleteDoc(doc(db, "participants", id));
}

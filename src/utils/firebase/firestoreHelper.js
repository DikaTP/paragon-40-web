import { collection, query, where, addDoc, updateDoc, deleteDoc, getDocs, getDoc, doc, Timestamp } from "firebase/firestore";
import db from "@/utils/firebase/firestore"

/**
 * Adds a document to a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {object} data - The data to add to the document.
 * @returns {string} - The ID of the newly created document.
 * @throws {Error} - If there's an error adding the document.
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    const docSnapshot = await getDoc(doc(db, collectionName, docId));
    if (docSnapshot.exists()) {
      return {id: docId, ...docSnapshot.data()};
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

// ---------- user doc queries ----------
/**
 * Fetch user document by email from Firestore
 * @param {string} email - The email of the user to query
 * @returns {Promise<Object|null>} - The user document if found, otherwise null
 */
export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, 'user');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming email is unique, return the first document
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

/**
 * update user's login timestamp
 * @param {string} docId - The docId of the user to query
 * @returns {boolean} - Always return true for now
 */
export const updateUserLoginTs = async (docId) => {
  try {
    const user = await getDocument('user', docId)
    const nowTs = Timestamp.fromDate(new Date())
    const firstTs = user.firstLoginAt || nowTs
    const docRef = doc(db, 'user', docId)
    await updateDoc(docRef, {
      firstLoginAt: firstTs,
      lastLoginAt: nowTs
    })

    return true
  } catch (error) {
    console.error('Error on updateUserLoginTs');
    throw error;
  }
};
// ---------- user doc queries ----------

// ---------- poll doc queries ----------
/**
 * Fetch poll documents by region from Firestore
 * @param {string} region - The region of the user to query
 * @returns {Promise<[]Object|null>} - The poll documents if found, otherwise null
 */
export const getPollByRegion = async (region) => {
  try {
    const pollRef = collection(db, 'poll');
    const q = query(pollRef, where("regions", "array-contains", region));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching polls by given region', error);
    throw error;
  }
};
// ---------- poll doc queries ----------
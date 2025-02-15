import { collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  documentId,
  query,
  where,
  Timestamp
} from "firebase/firestore";
import db from "@/utils/firebase/firestore"

/**
 * Adds a document to a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {object} data - The data to add to the document.
 * @returns {Promise<string>} - The ID of the newly created document.
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

const setDocument = async (collectionName, data, docId) => {
  try {
    // Add a new document with a predefined id
    const docCollection = firestore.collection(db, collectionName);
    const docRef = firestore.doc(docCollection, docId);
    await firestore.setDoc(docRef, data)

    console.log("Document written with ID: ", docId);
    return docId;
  } catch (error) {
    console.error("Error adding document: ", error);
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

export const getDocRef = (collectionName, docId) => {
  return doc(db, collectionName, docId)
}

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

export const getWeeklyPoll = async () => {
  try {
    const col = collection(db, 'poll');
    const q = query(col, where(documentId(), 'in', ['weekly-p40-w1','weekly-p40-w2','weekly-p40-w3']))
    const snap = await getDocs(q)
    if (!snap.empty) {
      return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
    } else {
      console.log('Empty result fetching weekly polls');
      return null;
    }
  } catch (error) {
    console.error('Error fetching weekly polls', error);
    throw error;
  }
}

export const getOpeningSpeechPoll = async (user) => {
  try {
    const docId = 'openingspeech-p40-' + user.region
    const poll = await getDocument('poll', docId)
    return poll
  } catch (error) {
    console.log(error)
    return null
  }
}
// ---------- poll doc queries ----------

export const submitVote = async (user, pollId, choiceId) => {
  try {
    // Add a new document with a predefined id
    const docCollection = collection(db, 'vote');
    const docId = `${pollId}-${user.id}`
    const docRef = doc(docCollection, docId);
    await setDoc(docRef, {
      choiceId,
      pollId: doc(db, 'poll', pollId),
      userId: doc(db, 'user', user.id),
      region: user.region,
      votedAt: Timestamp.now()
    })

    return docId
  } catch (error) {
    console.error('Error submitting vote', error);
    throw error;
  }
}

export const getUserVotes = async (user) => {
  try {
    const col = collection(db, 'vote');
    const q = query(col, where('userId', '==', doc(db, 'user', user.id)))
    const snap = await getDocs(q)
    if (!snap.empty) {
      return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
    } else {
      console.log('Empty result fetching user votes');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user votes', error);
    throw error;
  }
}
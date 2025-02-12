import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/utils/firebase/firestore"

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
      console.log('No user found with the given email.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};
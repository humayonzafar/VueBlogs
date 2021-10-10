import firebase from "firebase/app";
import "firebase/firestore";
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export {timestamp};
export default firebase.firestore();
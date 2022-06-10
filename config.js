const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyBIaen19kHvT5GXssL4JNz0U8iGoFy0FwQ",
  authDomain: "cc-project-35383.firebaseapp.com",
  projectId: "cc-project-35383",
  storageBucket: "cc-project-35383.appspot.com",
  messagingSenderId: "355346661148",
  appId: "1:355346661148:web:ce1546a58b3116f6c7c4d9",
  measurementId: "G-59VCJP6GK4"
};
admin.initializeApp({
  credential: admin.credential.cert(require('./keys/cc-project-35383-firebase-adminsdk-7n836-9602ac4d64.json'))
});
const db = admin.firestore();
const User = db.collection("Users");
module.exports = User;
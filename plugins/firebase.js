import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCED2ko33YAXZ4C_J6z1ARoRv273cCnpb8",
        authDomain: "splabbs-1460e.firebaseapp.com",
        databaseURL: "https://splabbs-1460e.firebaseio.com",
        projectId: "splabbs-1460e",
        storageBucket: "",
        messagingSenderId: "48748620062",
        appId: "1:48748620062:web:b73d28faecab9fbc62810f"
    })
}
export default firebase

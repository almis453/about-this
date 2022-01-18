        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyA9fx1y13A1O2dBo4xNEuxug4ixwOkthRk",
          authDomain: "firetest-818d1.firebaseapp.com",
          databaseURL: "https://firetest-818d1-default-rtdb.firebaseio.com",
          projectId: "firetest-818d1",
          storageBucket: "firetest-818d1.appspot.com",
          messagingSenderId: "330170996226",
          appId: "1:330170996226:web:17677073f0c63be049791b",
          measurementId: "G-R3RKQ0SKCT"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        // Get a list of cities from your database
async function getCities(analytics) {
    const citiesCol = collection(analytics,'booking');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;

  }
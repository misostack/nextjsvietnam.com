---
title: "Sử dụng Firebase Realtime Database để gửi thông báo cho người dùng trong web app"
type: "post"
date: 2022-07-12T17:09:16+07:00
description: "Hướng dẫn setup và code sample sử dụng ReactJS"
keywords: ["firebase", "notifications"]
categories: ["cheatsheet"]
tags: []
image: "https://user-images.githubusercontent.com/31009750/178468844-4ee1f036-78cc-44fd-8185-5092b5863494.png"
---

# Firebase Realtime Database

## Create new project

- https://console.firebase.google.com/u/0/

> Step 1

![image](https://user-images.githubusercontent.com/31009750/178453011-1da71561-f7bd-48b3-a1a8-6d7be34cfbce.png)

> Step 2

![image](https://user-images.githubusercontent.com/31009750/178453101-e9996701-2501-44b7-9b7a-78f147dff2e6.png)

> Step 3

![image](https://user-images.githubusercontent.com/31009750/178453680-40f3be23-7617-421c-96a4-026645a209cb.png)

## Add new firebase realtime database

![image](https://user-images.githubusercontent.com/31009750/178453976-2a3cb1b9-a29c-4388-821d-6d5c3332eb37.png)

![image](https://user-images.githubusercontent.com/31009750/178454046-0ededf24-8b2d-49cd-aacc-28fe3afda63c.png)

> Select your database region

![image](https://user-images.githubusercontent.com/31009750/178454178-27d15fe7-ce37-4877-9b52-9c6731873014.png)

> Test Mode Enable

![image](https://user-images.githubusercontent.com/31009750/178454308-bc61aeaf-b33b-4967-900f-95b185b6fba1.png)

> Finally, you will have this new database with the generated URI

![image](https://user-images.githubusercontent.com/31009750/178454580-f47f1d29-a68a-4a8a-80e2-589d0551881b.png)

## Let’s design a simple notification database

```json
"notifications": {
  "$userId": {
        "notificationId": 1,
        "content": "hello",
        "notificationType": 1,
        "isRead": false,
        "isSent": false
   },
}
{
  "notifications": {
    "1": [
      {
        "userId": 1,
        "notificationId": 1,
        "content": "hello",
        "notificationType": 1,
        "isRead": false,
        "isSent": false
      },
      {
        "userId": 1,
        "notificationId": 2,
        "content": "hey",
        "notificationType": 2,
        "isRead": false,
        "isSent": false
      }
    ],
    "2": [
      {
        "userId": 2,
        "notificationId": 3,
        "content": "heyo",
        "notificationType": 1,
        "isRead": false,
        "isSent": false
      }
    ]
  }
}

```

> Import

![image](https://user-images.githubusercontent.com/31009750/178457594-8e3aaa23-07fe-40d5-92d5-a5538fd44eb9.png)

> After imported

![image](https://user-images.githubusercontent.com/31009750/178465807-7e534b24-a9de-4a1f-b2ea-75ad9a599e76.png)

> Connect and get DB instance

```js
/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export default {
  getInstance: (databaseURL) => {
    const firebaseConfig = {
      // ...
      // The value of `databaseURL` depends on the location of the database
      databaseURL,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    return getDatabase(app);
  },
};
```

> Subscribe for changes

- [Ref](https://firebase.google.com/docs/database/web/read-and-write#write_data)

```jsx
function App() {
  const [notifications, setNotifications] = useState([]);
  const subcribeOnNotification = () => {
    const db = firebaseService.getInstance(FIREBASE_DATABASE_URL);
    const userId = 1;
    const dbRef = ref(db, "/notifications/" + userId);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.val()) {
          setNotifications([...notifications, ...snapshot.val()]);
        }
      },
      {
        onlyOnce: false,
      }
    );
  };
  // init
  useEffect(() => {
    subcribeOnNotification();
  }, []);
  return (
    <>
      <h1>Firebase Realtime Database Notififcation Sample</h1>
      <ul>
        {notifications.map((n) => (
          <li key={n.notificationId}>{JSON.stringify(n)}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Secure your firebase database

1. Security rules

- Ref : [https://firebase.google.com/docs/database/security/rules-conditions](https://firebase.google.com/docs/database/security/rules-conditions)
  > Sample: User can only read his records

```json
"notifications": {
  "$userId": {
        "notificationId": 1,
        "content": "hello",
        "notificationType": 1,
        "isRead": false,
        "isSent": false
   },
}
```

![image](https://user-images.githubusercontent.com/31009750/178636656-630eabe3-aa8f-409a-8e21-c17d98838bc5.png)

2. In this case user must login with firebase to allow they can access their record

There are several ways to authenticate a user with firebase. In this case we will use custom token through our API server to shared the same user id of our system with firebase

3. Enable Authentication on Firebase

Access your firebase console and enable authentication product

![image](https://user-images.githubusercontent.com/31009750/178676036-3b230928-da97-4fd0-91d1-8cc6c2c9643e.png)

- https://github.com/firebase/quickstart-js/issues/534

4. Create custom Auth

![image](https://user-images.githubusercontent.com/31009750/178677118-2509e26f-309b-4d99-9b29-3597c95c74a6.png)

5. Get configuration

5.1. Generate admin service account to use in your API Server

![image](https://user-images.githubusercontent.com/31009750/178679263-4e47fc33-e568-407d-b25d-92cd58ae48a7.png)

5.2. Generate app configuration

Add app -> select web app

![image](https://user-images.githubusercontent.com/31009750/178679464-2b8a352f-f3a9-434d-b3cf-d54be05049fd.png)

![image](https://user-images.githubusercontent.com/31009750/178679832-9e64e091-02a5-4244-b64a-380adda7b56f.png)

```js
// Initialize Firebase connection
import { onValue, ref } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
// login
signInWithCustomToken(auth, customToken)
  .then((userCredential) => {
    console.log(userCredential);
  })
  .catch((error) => {
    console.error(error);
  });
// listen on login state
onAuthStateChanged(auth, (user) => {
  // user = null | Object
  if (user) {
    // do anything you want
  }
});
// db manipulation : listen on change
const userId = 1;
const dbRef = ref(db, "/notifications/" + userId);
onValue(
  dbRef,
  (snapshot) => {
    if (snapshot.val()) {
      setNotifications([...notifications, ...snapshot.val()]);
    }
  },
  {
    onlyOnce: false,
  }
);
```

6. Samples
   > Backend API

```js
const admin = require("firebase-admin");

const serviceAccount = require("./jsguru-firebase-admin-sdk.json");
var auth = null;
// connect Firebase
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
auth = admin.auth(app);

const getAuth = () => {
  return auth;
};

app.post("/generate-firebase-token", async (req, res) => {
  const userId = "1";
  const additionalClaims = {
    premiumAccount: false,
  };
  // Custom auth without generate your custom JWT
  await new Promise((resolve) => {
    getAuth()
      .createCustomToken(userId, additionalClaims)
      .then((customToken) => {
        // Send token back to client
        resolve(customToken);
        res.send({
          customToken,
        });
      })
      .catch((error) => {
        res.send({
          customToken: "",
        });
        console.log("Error creating custom token:", error);
      });
  });
});
```

> Application

```js
// firebase.service.js
/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export default {
  getInstance: () => {
    const firebaseConfig = {
      // ...
      // The value of `databaseURL` depends on the location of the database
      apiKey: `${process.env.REACT_APP_apiKey}`,
      authDomain: `${process.env.REACT_APP_authDomain}`,
      databaseURL: `${process.env.REACT_APP_databaseURL}`,
      projectId: `${process.env.REACT_APP_projectId}`,
      messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
      appId: `${process.env.REACT_APP_appId}`,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    return {
      app,
      db: getDatabase(app),
    };
  },
};

// App.jsx

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const getFirebaseToken = () => {
  return postData("http://localhost:1337/login");
};

const { app, db } = firebaseService.getInstance();
const auth = getAuth(app);

function App() {
  const [notifications, setNotifications] = useState([]);
  const doLogin = async () => {
    const res = await getFirebaseToken();
    console.log(auth);
    console.log(app);
    signInWithCustomToken(auth, res.customToken)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const subcribeOnNotification = () => {
    const userId = 1;
    const dbRef = ref(db, "/notifications/" + userId);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.val()) {
          setNotifications([...notifications, ...snapshot.val()]);
        }
      },
      {
        onlyOnce: false,
      }
    );
  };

  // init
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        // do something with realtime database
        subcribeOnNotification();
      }
    });
  }, []);

  return (
    <>
      <h1>Firebase Realtime Database Notififcation Sample</h1>
      <ul>
        {notifications.map((n) => (
          <li key={n.notificationId}>{JSON.stringify(n)}</li>
        ))}
      </ul>
      <button onClick={() => doLogin()}>Login</button>
    </>
  );
}
```

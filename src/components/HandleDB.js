// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  where,
  updateDoc,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { useAuth } from "./AuthContext";

const firebaseConfig = {
  apiKey: "AIzaSyARM7hd7DpaD1F3QHnEp5iiA77_SvWqGgY",
  authDomain: "task3shop.firebaseapp.com",
  projectId: "task3shop",
  storageBucket: "task3shop.firebasestorage.app",
  messagingSenderId: "128266362924",
  appId: "1:128266362924:web:869e998761eb5453813189",
  measurementId: "G-816SWHK9N6"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore(app);

let collectionName = 'task3store';
const collectionOfRegisteredPeople = 'RegisteredPeople';
const collectionOfPurchasedProductsHistory = 'PurchasedProductsHistory';
const collectionOfProductsFeedback = 'ProductsFeedback';

const HandleDB = () => {
  const { username } = useAuth();
  collectionName = username;

  return <div className="hidden" />;
};



const AddItemToDB = async (image, title, price, category, brand) => {
    const q = query(
        collection(db, collectionName),
        where('title', '==', title)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docRef = docSnapshot.ref;
        const data = {
            count: docSnapshot.data().count + 1
        }
        await updateDoc(docRef, data);
        return;
    }
    await addDoc(collection(db, collectionName), {
        image,
        title,
        price,
        category,
        brand,
        count: 1
    })
}

const GetItems = async () => {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return items;
}


const SavePurchasedItemsToHistory = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const addPromises = querySnapshot.docs.map(doc => AddPurchasedItemToHistory(doc.data()));
    await Promise.all(addPromises);
}

const AddPurchasedItemToHistory = async (doc) => {
    const q = query(
        collection(db, collectionOfPurchasedProductsHistory),
        where('title', '==', doc.title)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docRef = docSnapshot.ref;
        const data = {
            count: docSnapshot.data().count + doc.count
        }
        await updateDoc(docRef, data);
        return;
    }
    await addDoc(collection(db, collectionOfPurchasedProductsHistory), {
        image: doc.image,
        title: doc.title,
        price: doc.price,
        category: doc.category,
        brand: doc.brand,
        count: 1
    });
}

const GetItemsOfHistory = async () => {
    const q = query(collection(db, collectionOfPurchasedProductsHistory));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return items;
}

const AddFeedbackOnProduct = async (image, title, price, category, brand, isLike) => {
    const q = query(
        collection(db, collectionOfProductsFeedback),
        where('title', '==', title)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docRef = docSnapshot.ref;

        let data = {}
        if (isLike) {
            data = {
                likesCounter: increment(1)
            }
        } else {
            data = {
                dislikesCounter: increment(1)
            }
        }
        await updateDoc(docRef, data);
    } else {
        console.warn('Product not found for feedback update');
    }
}

const GetItemsOfFeedbackProducts = async () => {
    const q = query(collection(db, collectionOfProductsFeedback));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return items;
}


const ClearCollection = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
}

const DeletingSingleProduct = async (itemId) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let docSnapshot = null;
    querySnapshot.forEach((doc) => {
        if (doc.id === itemId) {
            docSnapshot = doc;
        }
    });

    if(docSnapshot.exists()){
        if (docSnapshot.data().count > 1) {
            await updateDoc(docSnapshot.ref, {
                count: docSnapshot.data().count - 1
            });
        }else {
            await deleteDoc(docSnapshot.ref);
        }
    }
}


const AddRegistered = async (username,password,moneyAmount) => {
    const q = query(
        collection(db, collectionOfRegisteredPeople),
        where('username', '==', username)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        return "registration-warning-username";
    }
    await addDoc(collection(db, collectionOfRegisteredPeople), {
        username: username,
        password: password,
        moneyAmount: moneyAmount,
        createdAt: serverTimestamp()
    })

    return "registration-success";
}

const GetRegisteredPeople = async () => {
    const q = query(collection(db, collectionOfRegisteredPeople));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return items;
}

const CheckLogin = async (username, password) => {
    const q = query(
        collection(db, collectionOfRegisteredPeople),
        where('username', '==', username)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        return "login-danger-username";

    }else {
        const q1 = query(
            collection(db, collectionOfRegisteredPeople),
            where('username', '==', username),
            where('password', '==', password)
        )
        const querySnapshot1 = await getDocs(q1)
        if (querySnapshot1.empty) {
            return "login-danger-password";

        } else {
            const docSnapshot = querySnapshot.docs[0];
            collectionName = docSnapshot.data().username;
            //collectionName = getUsername();
            //await ChangeCollectionName(docSnapshot.data().username);
            return "login-success";
        }
    }
}


const GetMoneyAmount = async () => {
    const q = query(
        collection(db, collectionOfRegisteredPeople),
        where('username', '==', collectionName)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().moneyAmount;
    }

    return null;
};

const SetMoneyAmount = async (amountToAdd) => {
    const q = query(
        collection(db, collectionOfRegisteredPeople),
        where('username', '==', collectionName)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const currentMoneyAmount = querySnapshot.docs[0].data().moneyAmount || 0;

        await updateDoc(docRef, {
            moneyAmount: Number(currentMoneyAmount) + Number(amountToAdd)
        });

        return "updateMoneyAmount-success"
    }
};

const ReduceMoneyAmount = async (amountToReduce) => {
    const q = query(
        collection(db, collectionOfRegisteredPeople),
        where('username', '==', collectionName)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const currentMoneyAmount = querySnapshot.docs[0].data().moneyAmount || 0;

        await updateDoc(docRef, {
            moneyAmount: Number(currentMoneyAmount) - Number(amountToReduce)
        });

    }
};


export {
    AddItemToDB, GetItems, ClearCollection, DeletingSingleProduct, AddRegistered,
    CheckLogin, HandleDB, GetMoneyAmount, SetMoneyAmount, ReduceMoneyAmount,
    SavePurchasedItemsToHistory,AddPurchasedItemToHistory,GetItemsOfHistory,GetRegisteredPeople,AddFeedbackOnProduct,
    GetItemsOfFeedbackProducts
};











/*
const q1 = query(collection(db, collectionOfProductsFeedback));
    const querySnapshot1 = await getDocs(q1);
    const deletePromises = querySnapshot1.docs
        .filter(doc => doc.data().likesCounter === 0)
        .map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

const ChangeCollectionName = async (name) => {
    const querySnapshot = await getDocs(collection(db, currentUserOnTheWebsite));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    await addDoc(collection(db, currentUserOnTheWebsite), {
        name
    })
}

const GetCollectionName = async () => {
    const q = query(collection(db, currentUserOnTheWebsite));
    const querySnapshot = await getDocs(q);
    const docSnapshot = querySnapshot.docs[0];
    return docSnapshot;
}

const ChangeCollectionName1 = async (name) => {
    collectionName = name;
}*/
/*const DeletingSingleProduct = async (itemId) => {
    const docRef = doc(db, collectionName, itemId);
    const docSnapshot = await getDoc(docRef);

    if(docSnapshot.exists()){
        if (docSnapshot.data().count > 1) {
            await updateDoc(docRef, {
                count: docSnapshot.data().count - 1
            });
        }else {
            await deleteDoc(docRef);
        }
    }
}*/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

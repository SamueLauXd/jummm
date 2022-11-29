var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, doc, query, getDocs, addDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAVUXywVQkdQvdUzzePlP5LR2L7TCDVZZs",
    authDomain: "dcatest-a9d15.firebaseapp.com",
    projectId: "dcatest-a9d15",
    storageBucket: "dcatest-a9d15.appspot.com",
    messagingSenderId: "206737488420",
    appId: "1:206737488420:web:e6626c49031c08ae6576b1",
    measurementId: "G-WCSQ82CL7M"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsRefs = collection(db, 'products');
export const addProduct = ({ productTitle, price, description, image }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield addDoc(collection(db, 'products'), {
            productTitle,
            price,
            description,
            image
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
export const listenProducts = (cb) => {
    try {
        onSnapshot(collection(db, 'products'), (docus) => {
            const products = docus.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            cb(products);
        });
    }
    catch (error) {
    }
};
export const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Create Array
        const products = [];
        //Ask data to the data base 
        const q = query(productsRefs);
        const querySnapshot = yield getDocs(q);
        //Desglosamos
        querySnapshot.forEach(doc => {
            products.push({ id: doc.id, data: doc.data() });
        });
        // return products;
        return products;
    }
    catch (error) {
    }
});
export const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteDoc(doc(db, 'products', id));
    }
    catch (error) {
    }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, doc, query, where, getDocs, addDoc, deleteDoc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

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


export const addProduct = async ({productTitle,price,description,image}:{productTitle: string;price: string;description: string;image: string;}) => {
  try {
      const docRef = await addDoc(collection(db,'products'),{
          productTitle,
          price,
          description,
          image
      });
      return true;
  } catch (error) {
      return false;
  }
}

export const listenProducts = (cb: (products:any) => void) =>{
  try {
    onSnapshot(collection(db, 'products'), (docus) =>{
      const products = docus.docs.map((doc:any) => ({id: doc.id, data: doc.data()}));
      cb(products);
    })
  } catch (error) {
    
  }
}

export const getProducts = async () =>{
  try {
    //Create Array
    const products = [];
    //Ask data to the data base 
    const q = query(productsRefs);
    const querySnapshot = await getDocs(q);

    //Desglosamos
    querySnapshot.forEach((doc) => {
      products.push({id: doc.id, data: doc.data()});
    });
    // return products;
    return products;

  } catch (error) {
    
  }
}

export const deleteProduct = async (id) =>{
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    
  }
}
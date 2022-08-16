import firebaseConfig from "../config/firebaseConfig.js";
import { updateDoc, getDoc, doc, addDoc, query, collection, getFirestore, getDocs, deleteDoc, setDoc} from "firebase/firestore"
import { initializeApp } from "firebase/app";

export class Firebase{

    constructor(collection){
        const app = initializeApp(firebaseConfig);
        this.collection = collection;
        this.db = getFirestore(app);
        console.log('Connected to Firebase')
    }

    async create(cart){
        const docRef = await addDoc(collection(this.db, this.collection), cart);
        return {...cart, id: docRef.id};
          
    }

    async getAll(){
        try {
            const q = query(collection(this.db, this.collection))
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
             data.push({ 
                    ...doc.data(),
                    id: doc.id })
                });
                return data;
        } catch (error) {
            console.log(error)
        }
    }


    async getById(id){
        const docRef =  doc(this.db, this.collection, id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }
    

    async updateOne(id, item){
        const ref = doc(this.db, this.collection, id) ;
        await updateDoc(ref, {
          ...item, 
        });
        
    }
    async deleteOne(id){
        const ref = doc(this.db, this.collection, id) ;
        await deleteDoc(ref);
    }
}
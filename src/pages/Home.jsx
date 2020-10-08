import React, {useState, useEffect} from 'react';
import ItemListContainer from '../components/itemList/ItemListContainer';
import Loading from '../components/loading/Loading';
import {getFirestore} from '../firebase';

const Home = (props) => {
    const [items,setItems] = useState([]);
    const [loading,isLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("spells").orderBy("nombre").limit(20)
        itemCollection.get().then((querySnapshot) => {
            if(!querySnapshot.size){
                console.log("No Data");
            }
            setItems(querySnapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            }))
        }).catch(error => {
            console.log("ERROR ",error)
        }).finally(
            () => {isLoading(false);
        });
    },[]);

    return (
        <div className="container-fluid">
            <div style={{textAlign:"center"}}>
                {props.greeting} <label style={{fontWeight:"bolder"}}>{props.nombre}</label>
            </div>
            <div>
                {loading?<Loading/>:<ItemListContainer items={items}/>}
            </div>
        </div>
    );
  }
  
  export default Home;
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {getFirestore} from '../firebase';
import Loading from '../components/loading/Loading';
import ItemListContainer from '../components/itemList/ItemListContainer'

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export default function Search(){
    const [items,setItems] = useState([]);
    const [loading,isLoading] = useState(true);
    const catName = useQuery().get("catName") || "";
    const catFilter = useQuery().get("categoryId") || "";
    const itemName = useQuery().get("itemName") || "";

    const getCategoryRef = (categoryId) => {
        const db = getFirestore();
        const categoryDocRef = db.collection('categories').doc(categoryId);
        return categoryDocRef;
    }

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("spells")
        let itemQuery = itemCollection;
        if(catFilter && catFilter !== "-1" && itemName){
            itemQuery = itemQuery.where("idCategoria","==", getCategoryRef(catFilter)).where("nombre","==", itemName)
        }else if(catFilter && catFilter !== "-1" && !itemName){
            itemQuery = itemQuery.where("idCategoria","==", getCategoryRef(catFilter))
        }else if(itemName)
            itemQuery = itemQuery.where("nombre","==", itemName)
        itemQuery.get().then((querySnapshot) => {
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
    },[catFilter,itemName]);

    return(
        <>
            <div style={{padding:"0.5rem",paddingLeft:"2rem"}}>
                <h2 style={{display:"inline"}}>{catName?(
                    /([aeiou])$/g.test(catName.substring(catName.length-1))?`${catName}s`:`${catName}es`):
                    "Resultados"}</h2>
                {itemName?<h3 style={{display:"inline"}}>&nbsp;para <strong>{itemName}</strong></h3>:""}
            </div>
            {loading?<Loading/>:<ItemListContainer items={items}/>}
        </>
    )
}
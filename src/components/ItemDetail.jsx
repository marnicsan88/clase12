import React, {useEffect, useState,useContext} from 'react';
import ItemCount from './contador/ItemCount';
import {CartContext} from '../context/cartContext';
import AddCartButton from './AddCartButton';
import params from '../constants/counterParam';

const ItemDetail = (props) => {
    const [cantidad,setCantidad] = useState(0)
    const [sePuedeComprar,setSePuedeComprar] = useState(false)
    const {setCart} = useContext(CartContext);
    
    useEffect(() =>{
        (cantidad >= params.min && cantidad <= props.item.stock) ? setSePuedeComprar(true) : setSePuedeComprar(false)
    },[cantidad,props.item.stock])

    const onAdd = (count) => {
        setCantidad(count);
    }

    const agregarCarrito = () => {
        setCart(carrito => [...carrito,{item:props.item,cantidad:cantidad}])
    }

    return(
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"3vh", maxHeight:"15rem"}}>
            <img src={props.item.image} alt={`Imagen de ${props.item.nombre}`} style={{width:"15rem",maxHeight:"100%",margin:"0.5rem"}}/>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",margin:"0.5rem",width:"20rem"}}>
                <h1>{props.item.nombre}</h1>
                <div>{props.item.efecto}</div>
                <div style={{fontWeight:"bold"}}>${props.item.valor.toFixed(2)}</div>
                <ItemCount initial={params.initial} min={params.min} max={props.item.stock} onAdd={onAdd} />
                <AddCartButton agregarCarrito={agregarCarrito} cantidad={cantidad} nombreItem={props.item.nombre} sePuedeComprar={sePuedeComprar}/>
            </div>        
        </div>
    )
}
export default ItemDetail;
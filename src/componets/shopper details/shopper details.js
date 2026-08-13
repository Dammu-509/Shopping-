import { useParams,Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';
export function ShopperDetails(){
    const[product,setProducts]=useState({id:0,title:'',price:0,rating:{rate:0,count:0}})
    const params=useParams();
    useEffect(()=>{
        axios({
            method:'get',
url: `https://fakestoreapi.com/products/${params.id}`,
             })
             .then((res)=>{
      
                setProducts(res.data);
             })
    },[]);
    return(
        <div className="container-fluid"> 
        <h2>Details  item</h2>
        <div className="row">
            <div className="col">
                <img src={product.image} width='300px' height='300px'></img>

            </div>
            <div className="col-9">
               <dl>
                <dt> Title</dt>
                <dd>{product.title}</dd>
                <dt>price</dt>
                <dd>{product.price}</dd>
                <dt> Rating</dt>
                <dd><span className="bi bi-star-fill text-success"></span>{product.rating.rate}[{product.rating.count}]</dd>
                <dt>Description</dt>
                <dd>{product.description}</dd>
               </dl>

            </div>

        </div>
        </div>
    )
}
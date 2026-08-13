import { useParams,Link} from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';
export function ShopperCategory(){
    const params=useParams();
    const[products,setProducts]=useState([]);
     useEffect(()=>{
        axios({
            method:'get',
url: `https://fakestoreapi.com/products/category/${params.catname}`,
             })
             .then((res)=>{
          console.log(res.data);
                setProducts(res.data);
             })
    },[params.catname]);
    return (
     <div className="container-fluid">
        
     <h2>Shopper Category {params.catname}</h2>
      <div className="d-flex flex-wrap">
            {
                 products.map((product)=>
                    <div className='card m-2 p-2' style={{width:'200px'}} key={product.id}> 
                    <img src={product.image} height='150px'className='card-img-top'></img>
                    <div className='card-header'  style={{height:'150px'}}>
                        <p> {product.title}</p>
                         </div>
                         <div className="card-footer">
                        <Link to={'details/'+ product.id} className="btn btn-primary w-100">Details</Link>
                   
                    </div>
                    </div>
                 )
                }   

        </div>
        </div>  
    )
}
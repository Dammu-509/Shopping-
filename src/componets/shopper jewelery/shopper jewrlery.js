import {useState,useEffect} from 'react';
import axios from 'axios';
export function ShopperJewelery(){
    const[products,setProducts]=useState([]); 
    useEffect(()=>{
        axios({
            method:'get',
            url:'https://fakestoreapi.com/products/category/jewelery'
             })
             .then((res)=>{
          console.log(res.data);
                setProducts(res.data);
             })
    },[]);
    return(
        <div className="container-fluid">
        <div className="d-flex flex-wrap">
            {
                 products.map((product)=>
                    <div className='card m-2 p-2' style={{width:'200px'}} key={product.id}> 
                    <img src={product.image} height='150px'className='card-img-top'></img>
                    <div className='card-header'  style={{height:'150px'}}>
                        <p> {product.title}</p>
                    </div>
                    </div>
                 )
                }   

        </div>
        </div>  
    )
}
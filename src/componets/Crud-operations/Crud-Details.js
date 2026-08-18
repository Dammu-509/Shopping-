import { useState, useEffect } from "react";
import axios from "axios";
import{useParams,Link} from "react-router-dom";


export function CrudDetails(){
    const params=useParams();
    const[products,setProducts]=useState({});
    useEffect(()=>{
        axios({
            method:'get',
            url:`http://127.0.0.1:8080/details/${params.id}`
        })
        .then(response=>{
            setProducts(response.data);
        })
    })
    return(
        <div className="container-fluid">
            <h2> Product Details</h2>
            {
                products.length>0 &&
            <dl>
                <dt>Name</dt>
                <dd>{products[0].Name}</dd>
                <dt>Price</dt>
                <dd>{products[0].price}</dd>
                 <dt>Stock</dt>
                <dd>{(products[0].stock==true)?"Available":"out odf stock"}</dd>
            </dl>
}
            <Link to ="/products"> Back to products</Link>
        </div>
    )
}
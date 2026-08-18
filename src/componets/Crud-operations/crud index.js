import axios from "axios";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function CrudIndex() {
   const[cookies]=useCookies(["userid"]);
   const navigate=useNavigate();
   
    const [products, setProducts] = useState([]);
 useEffect(()=>{
        if(!cookies["userid"]){
            navigate("/login");
        }
    },[]);

    function LoadProducts() {

        axios({
            method: "get",
            url: "http://127.0.0.1:8080/products"
        })
        .then(response => {

            console.log("Fresh Products:", response.data);

            setProducts(response.data);

        })
        .catch(error => {

            console.log("Products error:", error);

        });
    }

    useEffect(() => {

        LoadProducts();

    }, []);


    function DeleteClick(e) {

        var flag = window.confirm("Are you sure you want to delete?");

        if (flag === true) {

            var id = parseInt(e.currentTarget.value);

            axios({
                method: "delete",
                url: `http://127.0.0.1:8080/deleteproduct/${id}`
            })
            .then(() => {

                alert("Record Deleted");

                setProducts(
                    products.filter(
                        product => product.productId !== id
                    )
                );

            })
            .catch(error => {

                console.log("Delete error:", error);

                alert("Delete Failed");

            });
        }
    }


    return (

        <div className="container-fluid">

            <h2>Products Grid</h2>

            <div className="mb-3">

                <Link
                    to="/NewProduct"
                    className="btn btn-danger"
                >
                    Add New Product
                </Link>

            </div>


            <table className="table table-hover">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                </thead>


                <tbody>

                    {
                        products.map(product => (

                            <tr key={product.productId}>

                                <td>
                                    {product.Name}
                                </td>


                                <td>

                                    <Link
                                        className="btn btn-info"
                                        to={`/cruddetails/${product.productId}`}
                                    >
                                        <span className="bi bi-eye"></span>
                                    </Link>

                                </td>


                                <td>

                                    <Link
                                        className="btn btn-warning"
                                        to={`/crudedit/${product.productId}`}
                                    >
                                        <span className="bi bi-pen"></span>
                                    </Link>

                                </td>


                                <td>

                                    <button
                                        value={product.productId}
                                        className="btn btn-danger"
                                        onClick={DeleteClick}
                                    >
                                        <span className="bi bi-trash"></span>
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}
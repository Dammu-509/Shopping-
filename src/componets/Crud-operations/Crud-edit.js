import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";

export function CrudEdit() {

    const params = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios({
            method: "get",
            url: `http://127.0.0.1:8080/details/${params.id}`
        })
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.log("Get product error:", error);
        });

    }, [params.id]);


    return (

        <div className="container-fluid">

            <h2>Edit Products</h2>

            {
                products.length > 0 &&

                <Formik

                    initialValues={{
                        productId: products[0].productId ?? "",
                        Name: products[0].Name ?? "",
                        price: products[0].price ?? "",
                        stock: products[0].stock ? "true" : "false"
                    }}

                    enableReinitialize={true}

                    onSubmit={(values) => {

                        console.log("Sending:", values);

                        axios({
                            method: "put",
                            url: "http://127.0.0.1:8080/updateproduct",
                            data: values
                        })

                        .then(response => {

                            console.log(
                                "Update response:",
                                response.data
                            );

                            alert("Product Updated Successfully");

                            navigate("/products");

                        })

                        .catch(error => {

                            console.log(
                                "Update error:",
                                error
                            );

                            /*
                             Backend is using:
                             res.redirect("/products")

                             Axios follows that redirect.
                             /products may return 404 after PUT.

                             But MongoDB record is already updated.
                            */

                            if (
                                error.response &&
                                error.response.status === 404
                            ) {

                                alert("Product Updated Successfully");

                                navigate("/products");

                            }
                            else {

                                alert("Update Failed");

                            }

                        });

                    }}

                >

                    <Form>

                        <dl>

                            {/* Product ID */}

                            <dt>Product ID</dt>

                            <dd>

                                <Field
                                    name="productId"
                                    type="number"
                                    className="form-control"
                                />

                            </dd>


                            {/* Name */}

                            <dt>Name</dt>

                            <dd>

                                <Field
                                    name="Name"
                                    type="text"
                                    className="form-control"
                                />

                            </dd>


                            {/* Price */}

                            <dt>Price</dt>

                            <dd>

                                <Field
                                    name="price"
                                    type="number"
                                    className="form-control"
                                />

                            </dd>


                            {/* Stock */}

                            <dt>Stock</dt>

                            <dd>

                                <Field
                                    as="select"
                                    name="stock"
                                    className="form-select"
                                >

                                    <option value="true">
                                        Available
                                    </option>

                                    <option value="false">
                                        Out of Stock
                                    </option>

                                </Field>

                            </dd>

                        </dl>


                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Update
                        </button>


                        <Link
                            to="/products"
                            className="btn btn-secondary ms-2"
                        >
                            Back to products
                        </Link>

                    </Form>

                </Formik>
            }

        </div>
    );
}
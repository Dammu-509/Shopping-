import { useNavigate } from "react-router-dom";
import { Formik,Field,Form,ErrorMessage } from "formik";
import{Link} from "react-router-dom";
import axios from"axios";

export function CrudCreate(){
    const navigate=useNavigate();
    return(
        <div className="container-fluid">
        <h2>Add New Products</h2>
        <Formik
        initialValues={{
            productId:0,
            Name:'',
            Price:0,
            Stock: false
        }}
            onSubmit={
                (values)=>{
                 axios({
                    method:'post',
                    url:"http://127.0.0.1:8080/addproduct",
                    data:values
                 }).then(()=>{
                    alert("product Registered");
                    navigate("/products");
                 }
                )
                }
            }
>

        <Form>
            <dl>
                <dt> ProducId</dt>
                <dd>< Field name="productId" type ="number"/></dd>
                 <dt> Name</dt>
                <dd>< Field name="Name" type ="text"/></dd>
                 <dt> Price</dt>
                <dd>< Field name="Price" type ="number"/></dd>
                 <dt> Stock</dt>
                <dd className="form-switch">< Field name="Stock" type="checkbox" className="form-check-input"/>Avaliblity</dd>
            </dl>
            <button className="btn btn-primary" > Add Product</button>
            <Link  className="mb-3"to="/products"> view Products
            </Link>
        </Form>

        </Formik>
        </div>
    ) 
}
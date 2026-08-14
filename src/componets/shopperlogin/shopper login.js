import { useState } from "react";
import{Formik,Field,Form} from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ShopperLogin(){
    const navigate = useNavigate();
    return(
        <div>
            <h2>User Login</h2>
            <Formik
            initialValues={{ UserId: "", PassWord: "" }}
            onSubmit={(values) => {
                console.log("Login values:", values);
                axios({
                    method: "get",
                    url: "http://127.0.0.1:5000/users",
                })
                .then(response => {
                    var found =false;
                    for(var user of response.data)
                        if(user.UserId === values.UserId && user.PassWord === values.PassWord){
                            navigate("/home");
                        break;
                        }
                        else{
                           navigate("/invalid");

                        }
                    });
                 }}
                  >
                <Form>
                    <dl>
                        <dt>UserId</dt>
                        <dd><Field type="text" name="UserId" autoComplete="off"></Field></dd>
                        <dt>Password</dt>
                        <dd><Field type="password" name="PassWord" autoComplete="current-password"></Field></dd>
                    </dl>
                    
                                <button
                                    type="submit"
                                    className="btn btn-primary w-15 p-2"
                                >
                                    Login
                                </button>

                </Form>
            </Formik>

        </div>
    );
}
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ShopperRegister() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        UserId: "",
        UserName: "",
        PassWord: "",
        Email: "",
        Age: ""
    });

    function handleChange(e) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        console.log("User data:", user);

        axios.post(
            "http://127.0.0.1:5000/registeruser",
            user
        )
        .then((response) => {

            console.log("Server response:", response.data);

            alert("Registration Successful!");
            navigate("/home");

            // Form clear
            setUser({
                UserId: "",
                UserName: "",
                PassWord: "",
                Email: "",
                Age: ""
            });

        })
        .catch((error) => {

            console.log("Registration error:", error);

            alert("Registration Failed");

        });

    }


    return (

        <div className="container mt-4">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card">

                        <div className="card-header text-center">

                            <h3>Register</h3>

                        </div>


                        <div className="card-body">

                            <form onSubmit={handleSubmit}>


                                {/* User ID */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        User ID
                                    </label>

                                    <input
                                        type="text"
                                        name="UserId"
                                        className="form-control"
                                        value={user.UserId}
                                        onChange={handleChange}
                                        placeholder="Enter User ID"
                                        required
                                    />

                                </div>


                                {/* User Name */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        User Name
                                    </label>

                                    <input
                                        type="text"
                                        name="UserName"
                                        className="form-control"
                                        value={user.UserName}
                                        onChange={handleChange}
                                        placeholder="Enter User Name"
                                        required
                                    />

                                </div>


                                {/* Password */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="PassWord"
                                        className="form-control"
                                        value={user.PassWord}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        required
                                    />

                                </div>


                                {/* Email */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="Email"
                                        className="form-control"
                                        value={user.Email}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        required
                                    />

                                </div>


                                {/* Age */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Age
                                    </label>

                                    <input
                                        type="number"
                                        name="Age"
                                        className="form-control"
                                        value={user.Age}
                                        onChange={handleChange}
                                        placeholder="Enter Age"
                                        required
                                    />

                                </div>


                                {/* Register button */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>


                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}
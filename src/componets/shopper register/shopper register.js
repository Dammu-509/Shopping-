import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function ShopperRegister() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState("");

    const [user, setUser] = useState({
        UserId: "",
        UserName: "",
        PassWord: "",
        Email: "",
        Age: ""
    });

    // Get existing users
    useEffect(() => {

        axios({
            method: "get",
            url: "http://127.0.0.1:8080/users"
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, []);


    // Check User ID
    function VerifyUserId(e) {

        const enteredId = e.target.value;

        if (enteredId === "") {
            setUserError("");
            return;
        }

        let found = false;

        for (var existingUser of users) {

            if (existingUser.UserId === enteredId) {
                found = true;
                break;
            }
        }

        if (found) {
            setUserError("User ID already exists ❌");
        } else {
            setUserError("User ID available ✅");
        }
    }


    // Input changes
    function handleChange(e) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }


    // Form submit
    function handleSubmit(e) {

        e.preventDefault();

        // Check duplicate User ID again
        for (var existingUser of users) {

            if (existingUser.UserId === user.UserId) {

                alert("User ID already exists. Please choose another.");

                return;
            }
        }

        // If User ID is unique, register
        axios.post(
            "http://127.0.0.1:8080/registeruser",
            user
        )
        .then(response => {

            console.log("Server response:", response.data);

            alert("Registration Successful!");

            navigate("/login");

        })
        .catch(error => {

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
                                        onKeyUp={VerifyUserId}
                                        placeholder="Enter User ID"
                                        required
                                    />

                                    <div>
                                        {userError}
                                    </div>

                                </div>


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


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>

                                <div className="mt-3">
                                    <Link to="/login">
                                        Already have an account? Login here
                                    </Link>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
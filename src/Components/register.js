import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [activationCode, setActivationCode] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const activationDocRef = doc(db, "ActivationCodes", activationCode);
            const activationDoc = await getDoc(activationDocRef);

            if (!activationDoc.exists()) {
                throw new Error("Activation code is not valid.");
            }

            const activationData = activationDoc.data();

            if (activationData.used) {
                throw new Error("Activation code has already been used.");
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            const userData = {
                email: user.email,
                firstName: fname,
                lastName: lname,
                mobile: mobilenumber,
                activationCode: activationCode,
            };

            await setDoc(doc(db, "Users", user.uid), userData);

            await updateDoc(activationDocRef, {
                used: true,
                user: userData,
            });

            console.log("User Registered Successfully!!");
            toast.success("User Registered Successfully!!", {
                position: "top-center",
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Error registering user:", error.message);
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };

    return (
        <form className="auth" onSubmit={handleRegister}>
            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => setFname(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Last name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => setLname(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Mobile Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Activation Code</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Activation Code"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    required
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/login">Login</a>
            </p>
        </form>
    );
}

export default Register;

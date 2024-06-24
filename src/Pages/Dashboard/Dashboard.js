// import React from "react";
import Cards from "../../Components/Dashboard/Cards";
import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("No user data found!");
                }
            } else {
                console.log("User is not logged in");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="dashboard">
            {userDetails ? (
                <>
                    <h1 className="hello">Welcome {userDetails.firstName}!</h1>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <div className="cards-container">
                <Cards />
            </div>
        </div>
    );
};
export default Dashboard;

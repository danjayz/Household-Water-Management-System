// import React from "react";
import React, { useEffect, useState }  from 'react'
import Cards from "../../Components/Dashboard/Cards";
import Monthlybill from '../../Components/Dashboard/Monthlybill';
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

     const [billAmount, setBillAmount] = useState(0.00);
  useEffect(() => {
    // Fetch bill amount from the database
    const fetchBillAmount = async () => {
      try {
        const response = await fetch('/api/getMonthlyBill'); // Replace with your actual API endpoint
        const data = await response.json();
        setBillAmount(data.amount); // Assuming the API returns an object with an 'amount' field
      } catch (error) {
        console.error('Failed to fetch bill amount:', error);
      }
    };

    fetchBillAmount();
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
                 <Monthlybill billAmount={billAmount}/>
            </div>
        </div>
    );
};
export default Dashboard;

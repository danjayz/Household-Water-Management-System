// import React from "react";
// import "./Settings.css";
// import Form from "../../Components/Settings/Form";

// const handleSubmit = (formData) => {
//     console.log("Form data Submitted:", formData);
// };

// const Settings = () => {
//     return (
//         <div className="settings-page">
//             <div className="greeting-message">
//                 WELCOME!!
//                 <br />
//             </div>
//             <div className="title">Monthly Activation Plan</div>
//             <Form onSubmit={handleSubmit} />
//         </div>
//     );
// };

// export default Settings;

// import React, { useEffect, useState } from "react";
// import Form from "../../Components/Settings/Form";
// import WaterRatesForm from "../../Components/Settings/WaterRatesForm";
// import { db } from "../../Components/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { onAuthStateChanged, getAuth } from "firebase/auth";
// import "./Settings.css";

// const Settings = () => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setUser(user);
//             } else {
//                 setUser(null);
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     const handleSubmitBillData = async (formData) => {
//         if (!user) {
//             console.error("User not authenticated.");
//             return;
//         }

//         const userId = user.uid; // Get the UID of the current user

//         const { amount, frequency } = formData;
//         const monthlyAmount = frequency === "daily" ? amount * 30 : amount;

//         // const billValuesRef = doc(db, `Users/${userId}/BillValues/default`);
//         const billValuesRef = doc(
//             db,
//             `ActivationCodes/${userId}/BillValues/default`
//         );

//         try {
//             await setDoc(billValuesRef, {
//                 amount: monthlyAmount,
//                 createdAt: new Date(),
//             });
//             console.log("Bill data successfully written!");
//         } catch (error) {
//             console.error("Error writing bill data: ", error);
//         }
//     };

//     const handleSubmitWaterRates = async (formData) => {
//         if (!user) {
//             console.error("User not authenticated.");
//             return;
//         }

//         const userId = user.uid; // Get the UID of the current user

//         const waterRatesRef = doc(db, `Users/${userId}/WaterRates/default`);

//         try {
//             await setDoc(waterRatesRef, {
//                 rates: formData,
//                 createdAt: new Date(),
//             });
//             console.log("Water rates successfully written!");
//         } catch (error) {
//             console.error("Error writing water rates: ", error);
//         }
//     };

//     return (
//         <div className="settings-page">
//             {/* <div className="greeting-message">
//                 WELCOME!!
//                 <br />
//             </div>
//             <div className="title">Monthly Activation Plan</div> */}
//             <div className="form-container">
//                 <Form onSubmit={handleSubmitBillData} />
//                 <WaterRatesForm onSubmit={handleSubmitWaterRates} />
//             </div>
//         </div>
//     );
// };

// export default Settings;

import React, { useEffect, useState } from "react";
import Form from "../../Components/Settings/Form";
import WaterRatesForm from "../../Components/Settings/WaterRatesForm";
import { db } from "../../Components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import "./Settings.css";

const Settings = () => {
    const [user, setUser] = useState(null);
    const [activationCode, setActivationCode] = useState("");

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userId = user.uid;
                const activationCode = await fetchActivationCode(userId);
                setActivationCode(activationCode);
            } else {
                setUser(null);
                setActivationCode("");
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchActivationCode = async (userId) => {
        const userDocRef = doc(db, `Users/${userId}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            return userDocSnap.data().activationCode;
        } else {
            console.error("No such user document!");
            return "";
        }
    };

    // const handleSubmitBillData = async (formData) => {
    //     if (!user || !activationCode) {
    //         console.error(
    //             "User not authenticated or activation code not found."
    //         );
    //         return;
    //     }

    //     const { amount, frequency } = formData;
    //     const monthlyAmount = frequency === "daily" ? amount * 30 : amount;

    //     const billValuesRef = doc(db, `ActivationCodes/${activationCode}`);

    //     try {
    //         await setDoc(billValuesRef, {
    //             amount: monthlyAmount,
    //             createdAt: new Date(),
    //         });
    //         console.log("Bill data successfully written!");
    //     } catch (error) {
    //         console.error("Error writing bill data: ", error);
    //     }
    // };

    const handleSubmitBillData = async (formData) => {
        if (!user || !activationCode) {
            console.error(
                "User not authenticated or activation code not found."
            );
            return;
        }

        const { amount, frequency } = formData;
        const monthlyAmount = frequency === "daily" ? amount * 30 : amount;

        const billValuesRef = doc(db, `ActivationCodes/${activationCode}`);

        try {
            await setDoc(
                billValuesRef,
                {
                    amount: monthlyAmount,
                    createdAt: new Date(),
                },
                { merge: true }
            );
            console.log("Bill data successfully written!");
        } catch (error) {
            console.error("Error writing bill data: ", error);
        }
    };

    // const handleSubmitWaterRates = async (formData) => {
    //     if (!user || !activationCode) {
    //         console.error(
    //             "User not authenticated or activation code not found."
    //         );
    //         return;
    //     }

    //     const waterRatesRef = doc(db, `ActivationCodes/${activationCode}`);

    //     try {
    //         await setDoc(waterRatesRef, {
    //             rates: formData,
    //             createdAt: new Date(),
    //         });
    //         console.log("Water rates successfully written!");
    //     } catch (error) {
    //         console.error("Error writing water rates: ", error);
    //     }
    // };

    const handleSubmitWaterRates = async (formData) => {
        if (!user || !activationCode) {
            console.error(
                "User not authenticated or activation code not found."
            );
            return;
        }

        const waterRatesRef = doc(db, `ActivationCodes/${activationCode}`);

        try {
            await setDoc(
                waterRatesRef,
                {
                    rates: formData,
                    createdAt: new Date(),
                },
                { merge: true }
            );
            console.log("Water rates successfully written!");
        } catch (error) {
            console.error("Error writing water rates: ", error);
        }
    };

    return (
        <div className="settings-page">
            <div className="form-container">
                <Form onSubmit={handleSubmitBillData} />
                <WaterRatesForm onSubmit={handleSubmitWaterRates} />
            </div>
        </div>
    );
};

export default Settings;

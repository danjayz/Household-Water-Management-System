// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { auth, db } from "../firebase";
// import { doc, onSnapshot } from "firebase/firestore";
// import "./cards.css";

// const Card = ({ content, unit, description }) => {
//     let statusClass = "";

//     if (description.includes("TDS Level")) {
//         const tdsValue = parseInt(content, 10);
//         if (tdsValue <= 150) {
//             statusClass = "good";
//         } else if (tdsValue > 150 && tdsValue <= 250) {
//             statusClass = "good";
//         } else if (tdsValue > 250 && tdsValue <= 300) {
//             statusClass = "moderate";
//         } else if (tdsValue > 300) {
//             statusClass = "poor";
//         }
//     }

//     return (
//         <div className="card">
//             <div className="content">
//                 <span className="limit">{content}</span>
//                 <span className="unit">{unit}</span>
//                 {statusClass && (
//                     <span className={`status-circle ${statusClass}`}></span>
//                 )}
//             </div>
//             <div className="description">{description}</div>
//         </div>
//     );
// };

// Card.propTypes = {
//     content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
//         .isRequired,
//     unit: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
// };

// const CardsContainer = () => {
//     const [data, setData] = useState([
//         { content: "...", unit: "Ltr", description: "Daily Usage Limit" },
//         { content: "...", unit: "Ltr", description: "Monthly Usage Limit" },
//         { content: "...", unit: "Ltr", description: "Monthly Consumption" },
//         { content: "...", unit: "ppm", description: "TDS Level" },
//     ]);

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(async (user) => {
//             if (user) {
//                 const docRef = doc(db, "Users", user.uid);
//                 const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
//                     if (docSnap.exists()) {
//                         const userData = docSnap.data();
//                         const monthlyUsageLimit =
//                             userData.monthlyUsageLimit || "Please update";
//                         setData([
//                             {
//                                 content:
//                                     userData.dailyUsageLimit || "Please update",
//                                 unit: "Ltr",
//                                 description: "Daily Usage Limit",
//                             },
//                             {
//                                 content: monthlyUsageLimit,
//                                 unit: "Ltr",
//                                 description: "Monthly Usage Limit",
//                             },
//                             {
//                                 content:
//                                     userData.monthlyConsumption ||
//                                     "Please update",
//                                 unit: "Ltr",
//                                 description: "Monthly Consumption",
//                             },
//                             {
//                                 content: userData.tdsLevel || "Please update",
//                                 unit: "ppm",
//                                 description: "TDS Level",
//                             },
//                         ]);
//                     } else {
//                         console.log("No user data found!");
//                     }
//                 });
//                 return () => unsubscribeSnapshot(); // Unsubscribe from snapshot listener on cleanup
//             } else {
//                 console.log("User is not logged in");
//             }
//         });

//         return () => unsubscribe(); // Unsubscribe from auth state changes on cleanup
//     }, []);

//     return (
//         <div className="card-container">
//             {data.map((item, index) => (
//                 <Card
//                     key={index}
//                     content={item.content}
//                     unit={item.unit}
//                     description={item.description}
//                 />
//             ))}
//         </div>
//     );
// };

// export default CardsContainer;

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { auth, db } from "../firebase";
// import { doc, onSnapshot } from "firebase/firestore";
// import "./cards.css";

// const Card = ({ content, unit, description }) => {
//     let statusClass = "";

//     if (description.includes("TDS Level")) {
//         const tdsValue = parseInt(content, 10);
//         if (tdsValue <= 150) {
//             statusClass = "good";
//         } else if (tdsValue > 150 && tdsValue <= 250) {
//             statusClass = "good";
//         } else if (tdsValue > 250 && tdsValue <= 300) {
//             statusClass = "moderate";
//         } else if (tdsValue > 300) {
//             statusClass = "poor";
//         }
//     }

//     return (
//         <div className="card">
//             <div className="content">
//                 <span className="limit">{content}</span>
//                 <span className="unit">{unit}</span>
//                 {statusClass && (
//                     <span className={`status-circle ${statusClass}`}></span>
//                 )}
//             </div>
//             <div className="description">{description}</div>
//         </div>
//     );
// };

// Card.propTypes = {
//     content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
//         .isRequired,
//     unit: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
// };

// const CardsContainer = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchSensorData = async () => {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const userDocRef = doc(db, "Users", user.uid);
//                     const unsubscribe = onSnapshot(userDocRef, (doc) => {
//                         if (doc.exists()) {
//                             const userData = doc.data();
//                             const sensorData = userData.SensorData; // Assuming SensorData is a field within the Users document
//                             // Update data state based on SensorData
//                             setData([
//                                 {
//                                     content:
//                                         sensorData.dailyUsageLimit ||
//                                         "Please update",
//                                     unit: "Ltr",
//                                     description: "Daily Usage Limit",
//                                 },
//                                 {
//                                     content:
//                                         sensorData.monthlyUsageLimit ||
//                                         "Please update",
//                                     unit: "Ltr",
//                                     description: "Monthly Usage Limit",
//                                 },
//                                 {
//                                     content:
//                                         sensorData.monthlyConsumption ||
//                                         "Please update",
//                                     unit: "Ltr",
//                                     description: "Monthly Consumption",
//                                 },
//                                 {
//                                     content:
//                                         sensorData.tdsLevel || "Please update",
//                                     unit: "ppm",
//                                     description: "TDS Level",
//                                 },
//                             ]);
//                         } else {
//                             console.log("No user data found for the user!");
//                         }
//                     });

//                     // Clean up function to unsubscribe from snapshot listener
//                     return () => unsubscribe();
//                 } else {
//                     console.log("User is not logged in");
//                 }
//             });
//         };

//         fetchSensorData();
//     }, []);

//     return (
//         <div className="card-container">
//             {data.map((item, index) => (
//                 <Card
//                     key={index}
//                     content={item.content}
//                     unit={item.unit}
//                     description={item.description}
//                 />
//             ))}
//         </div>
//     );
// };

// export default CardsContainer;

// // cards.js;
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { auth, db } from "../firebase";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import "./cards.css";

// const Card = ({ content, unit, description }) => {
//     let statusClass = "";

//     if (description.includes("TDS Level")) {
//         const tdsValue = parseInt(content, 10);
//         if (tdsValue <= 150) {
//             statusClass = "good";
//         } else if (tdsValue > 150 && tdsValue <= 250) {
//             statusClass = "good";
//         } else if (tdsValue > 250 && tdsValue <= 300) {
//             statusClass = "moderate";
//         } else if (tdsValue > 300) {
//             statusClass = "poor";
//         }
//     }

//     return (
//         <div className="card">
//             <div className="content">
//                 {description.includes("TDS Level") ? (
//                     <>
//                         <span className="limit">{content}</span>
//                         <span className="unit">{unit}</span>
//                     </>
//                 ) : (
//                     <>
//                         <span className="unit">{unit}</span>
//                         <span className="limit">{content}</span>
//                     </>
//                 )}
//                 {statusClass && (
//                     <span className={`status-circle ${statusClass}`}></span>
//                 )}
//             </div>
//             <div className="description">{description}</div>
//         </div>
//     );
// };

// Card.propTypes = {
//     content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
//         .isRequired,
//     unit: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
// };

// const CardsContainer = () => {
//     const [dailyUsageLimit, setDailyUsageLimit] = useState("-");
//     const [monthlyUsageLimit, setMonthlyUsageLimit] = useState("-");
//     const [monthlyConsumption, setMonthlyConsumption] = useState("-");
//     const [tdsLevel, setTdsLevel] = useState("-");

//     useEffect(() => {
//         const fetchSensorData = async () => {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     try {
//                         const userDocRef = doc(db, "Users", user.uid);
//                         const userDocSnap = await getDoc(userDocRef);

//                         if (userDocSnap.exists()) {
//                             // Fetch daily and monthly usage limits from BillValues collection
//                             const billValuesRef = doc(
//                                 db,
//                                 `Users/${user.uid}/BillValues/default`
//                             );
//                             const billValuesSnap = await getDoc(billValuesRef);

//                             if (billValuesSnap.exists()) {
//                                 const currentDate = new Date();
//                                 const daysInMonth = new Date(
//                                     currentDate.getFullYear(),
//                                     currentDate.getMonth() + 1,
//                                     0
//                                 ).getDate();

//                                 setDailyUsageLimit(
//                                     billValuesSnap.data().amount / daysInMonth
//                                 );
//                                 setMonthlyUsageLimit(
//                                     billValuesSnap.data().amount
//                                 );
//                             } else {
//                                 console.log(
//                                     "No BillValues found for the user!"
//                                 );
//                             }

//                             // Subscribe to real-time updates for SensorData/default
//                             const sensorDataRef = doc(
//                                 db,
//                                 `Users/${user.uid}/SensorData/default`
//                             );
//                             const unsubscribeSensorData = onSnapshot(
//                                 sensorDataRef,
//                                 (doc) => {
//                                     if (doc.exists()) {
//                                         const data = doc.data();
//                                         setTdsLevel(
//                                             data.tdsLevel || "Please update"
//                                         );
//                                         setMonthlyConsumption(
//                                             data.monthlyConsumption ||
//                                                 "Please update"
//                                         );
//                                     } else {
//                                         console.log(
//                                             "No SensorData found for the user!"
//                                         );
//                                     }
//                                 },
//                                 (error) => {
//                                     console.error(
//                                         "Error fetching SensorData: ",
//                                         error
//                                     );
//                                 }
//                             );

//                             return () => {
//                                 unsubscribeSensorData();
//                             };
//                         } else {
//                             console.log("No user data found for the user!");
//                         }
//                     } catch (error) {
//                         console.error("Error fetching data: ", error);
//                     }
//                 } else {
//                     console.log("User is not logged in");
//                 }
//             });
//         };

//         fetchSensorData();
//     }, []);

//     return (
//         <div className="card-container">
//             <Card
//                 content={dailyUsageLimit}
//                 unit="LKR"
//                 description="Daily Usage Limit"
//             />
//             <Card
//                 content={monthlyUsageLimit}
//                 unit="LKR"
//                 description="Monthly Usage Limit"
//             />
//             <Card
//                 content={monthlyConsumption}
//                 unit="LKR"
//                 description="Monthly Consumption"
//             />
//             <Card content={tdsLevel} unit="ppm" description="TDS Level" />
//         </div>
//     );
// };

// export default CardsContainer;

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { auth, db } from "../firebase";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import "./cards.css";

// const Card = ({ content, unit, description }) => {
//     let statusClass = "";

//     if (description.includes("TDS Level")) {
//         const tdsValue = parseInt(content, 10);
//         if (tdsValue <= 150) {
//             statusClass = "good";
//         } else if (tdsValue > 150 && tdsValue <= 250) {
//             statusClass = "good";
//         } else if (tdsValue > 250 && tdsValue <= 300) {
//             statusClass = "moderate";
//         } else if (tdsValue > 300) {
//             statusClass = "poor";
//         }
//     }

//     return (
//         <div className="card">
//             <div className="content">
//                 {description.includes("TDS Level") ? (
//                     <>
//                         <span className="limit">{content}</span>
//                         <span className="unit">{unit}</span>
//                     </>
//                 ) : (
//                     <>
//                         <span className="unit">{unit}</span>
//                         <span className="limit">{content}</span>
//                     </>
//                 )}
//                 {statusClass && (
//                     <span className={`status-circle ${statusClass}`}></span>
//                 )}
//             </div>
//             <div className="description">{description}</div>
//         </div>
//     );
// };

// Card.propTypes = {
//     content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
//         .isRequired,
//     unit: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
// };

// const CardsContainer = () => {
//     const [dailyUsageLimit, setDailyUsageLimit] = useState("-");
//     const [monthlyUsageLimit, setMonthlyUsageLimit] = useState("-");
//     const [monthlyConsumption, setMonthlyConsumption] = useState("-");
//     const [tdsLevel, setTdsLevel] = useState("-");
//     const [userActivationCode, setUserActivationCode] = useState(null); // State to hold user's activation code

//     useEffect(() => {
//         const fetchData = async () => {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     try {
//                         // Fetch user document to get activation code
//                         const userDocRef = doc(db, "Users", user.uid);
//                         const userDocSnap = await getDoc(userDocRef);

//                         if (userDocSnap.exists()) {
//                             const userData = userDocSnap.data();
//                             const activationCode = userData.activationCode; // Assuming activation code field is named 'activationCode'
//                             setUserActivationCode(activationCode);

//                             // Fetch daily and monthly usage limits from BillValues collection
//                             const billValuesRef = doc(
//                                 db,
//                                 `ActivationCodes/${activationCode}/BillValues/default`
//                             );
//                             const unsubscribeBillValues = onSnapshot(
//                                 billValuesRef,
//                                 (doc) => {
//                                     if (doc.exists()) {
//                                         const data = doc.data();
//                                         const currentDate = new Date();
//                                         const daysInMonth = new Date(
//                                             currentDate.getFullYear(),
//                                             currentDate.getMonth() + 1,
//                                             0
//                                         ).getDate();
//                                         setDailyUsageLimit(
//                                             data.amount / daysInMonth
//                                         );
//                                         setMonthlyUsageLimit(data.amount);
//                                     } else {
//                                         console.log(
//                                             "No BillValues found for the user!"
//                                         );
//                                     }
//                                 },
//                                 (error) => {
//                                     console.error(
//                                         "Error fetching BillValues: ",
//                                         error
//                                     );
//                                 }
//                             );

//                             // Subscribe to real-time updates for SensorData/default
//                             const sensorDataRef = doc(
//                                 db,
//                                 `ActivationCodes/${activationCode}`
//                             );
//                             const unsubscribeSensorData = onSnapshot(
//                                 sensorDataRef,
//                                 (doc) => {
//                                     if (doc.exists()) {
//                                         const data = doc.data();
//                                         setTdsLevel(
//                                             data.totalMilliLitres ||
//                                                 "Please update"
//                                         );
//                                         setMonthlyConsumption(
//                                             data.monthlyConsumption ||
//                                                 "Please update"
//                                         );
//                                     } else {
//                                         console.log(
//                                             "No SensorData found for the user!"
//                                         );
//                                     }
//                                 },
//                                 (error) => {
//                                     console.error(
//                                         "Error fetching SensorData: ",
//                                         error
//                                     );
//                                 }
//                             );

//                             return () => {
//                                 unsubscribeBillValues();
//                                 unsubscribeSensorData();
//                             };
//                         } else {
//                             console.log("No user data found for the user!");
//                         }
//                     } catch (error) {
//                         console.error("Error fetching data: ", error);
//                     }
//                 } else {
//                     console.log("User is not logged in");
//                 }
//             });
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="card-container">
//             <Card
//                 content={dailyUsageLimit}
//                 unit="LKR"
//                 description="Daily Usage Limit"
//             />
//             <Card
//                 content={monthlyUsageLimit}
//                 unit="LKR"
//                 description="Monthly Usage Limit"
//             />
//             <Card
//                 content={monthlyConsumption}
//                 unit="LKR"
//                 description="Monthly Consumption"
//             />
//             <Card content={tdsLevel} unit="ppm" description="TDS Level" />
//         </div>
//     );
// };

// export default CardsContainer;

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { auth, db } from "../firebase";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import "./cards.css";

// const Card = ({ content, unit, description }) => {
//     let statusClass = "";

//     if (description.includes("TDS Level")) {
//         const tdsValue = parseInt(content, 10);
//         if (tdsValue <= 150) {
//             statusClass = "good";
//         } else if (tdsValue > 150 && tdsValue <= 250) {
//             statusClass = "good";
//         } else if (tdsValue > 250 && tdsValue <= 300) {
//             statusClass = "moderate";
//         } else if (tdsValue > 300) {
//             statusClass = "poor";
//         }
//     }

//     return (
//         <div className="card">
//             <div className="content">
//                 {description.includes("TDS Level") ? (
//                     <>
//                         <span className="limit">{content}</span>
//                         <span className="unit">{unit}</span>
//                     </>
//                 ) : (
//                     <>
//                         <span className="unit">{unit}</span>
//                         <span className="limit">{content}</span>
//                     </>
//                 )}
//                 {statusClass && (
//                     <span className={`status-circle ${statusClass}`}></span>
//                 )}
//             </div>
//             <div className="description">{description}</div>
//         </div>
//     );
// };

// Card.propTypes = {
//     content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
//         .isRequired,
//     unit: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
// };

// const CardsContainer = () => {
//     const [dailyUsageLimit, setDailyUsageLimit] = useState("-");
//     const [monthlyUsageLimit, setMonthlyUsageLimit] = useState("-");
//     const [monthlyConsumption, setMonthlyConsumption] = useState("-");
//     const [tdsLevel, setTdsLevel] = useState("-");
//     const [userActivationCode, setUserActivationCode] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     try {
//                         const userDocRef = doc(db, "Users", user.uid);
//                         const userDocSnap = await getDoc(userDocRef);

//                         if (userDocSnap.exists()) {
//                             const userData = userDocSnap.data();
//                             const activationCode = userData.activationCode;
//                             setUserActivationCode(activationCode);

//                             // Fetch amount from ActivationCodes collection
//                             const activationCodeRef = doc(
//                                 db,
//                                 `ActivationCodes/${activationCode}`
//                             );
//                             const unsubscribeActivationCode = onSnapshot(
//                                 activationCodeRef,
//                                 (doc) => {
//                                     if (doc.exists()) {
//                                         const data = doc.data();
//                                         const currentDate = new Date();
//                                         const daysInMonth = new Date(
//                                             currentDate.getFullYear(),
//                                             currentDate.getMonth() + 1,
//                                             0
//                                         ).getDate();
//                                         setMonthlyUsageLimit(data.amount);
//                                         setDailyUsageLimit(
//                                             data.amount / daysInMonth
//                                         );
//                                     } else {
//                                         console.log(
//                                             "No data found for the activation code!"
//                                         );
//                                     }
//                                 },
//                                 (error) => {
//                                     console.error(
//                                         "Error fetching activation code data: ",
//                                         error
//                                     );
//                                 }
//                             );

//                             // Subscribe to real-time updates for SensorData/default
//                             const sensorDataRef = doc(
//                                 db,
//                                 `ActivationCodes/${activationCode}/SensorData/default`
//                             );
//                             const unsubscribeSensorData = onSnapshot(
//                                 sensorDataRef,
//                                 (doc) => {
//                                     if (doc.exists()) {
//                                         const data = doc.data();
//                                         setTdsLevel(
//                                             data.totalMilliLitres ||
//                                                 "Please update"
//                                         );
//                                         setMonthlyConsumption(
//                                             data.monthlyConsumption ||
//                                                 "Please update"
//                                         );
//                                     } else {
//                                         console.log(
//                                             "No SensorData found for the user!"
//                                         );
//                                     }
//                                 },
//                                 (error) => {
//                                     console.error(
//                                         "Error fetching SensorData: ",
//                                         error
//                                     );
//                                 }
//                             );

//                             return () => {
//                                 unsubscribeActivationCode();
//                                 unsubscribeSensorData();
//                             };
//                         } else {
//                             console.log("No user data found for the user!");
//                         }
//                     } catch (error) {
//                         console.error("Error fetching data: ", error);
//                     }
//                 } else {
//                     console.log("User is not logged in");
//                 }
//             });
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="card-container">
//             <Card
//                 content={dailyUsageLimit}
//                 unit="LKR"
//                 description="Daily Usage Limit"
//             />
//             <Card
//                 content={monthlyUsageLimit}
//                 unit="LKR"
//                 description="Monthly Usage Limit"
//             />
//             <Card
//                 content={monthlyConsumption}
//                 unit="LKR"
//                 description="Monthly Consumption"
//             />
//             <Card content={tdsLevel} unit="ppm" description="TDS Level" />
//         </div>
//     );
// };

// export default CardsContainer;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import "./cards.css";

const Card = ({ content, unit, description }) => {
    let statusClass = "";

    if (description.includes("TDS Level")) {
        const tdsValue = parseInt(content, 10);
        if (tdsValue <= 150) {
            statusClass = "good";
        } else if (tdsValue > 150 && tdsValue <= 250) {
            statusClass = "good";
        } else if (tdsValue > 250 && tdsValue <= 300) {
            statusClass = "moderate";
        } else if (tdsValue > 300) {
            statusClass = "poor";
        }
    }

    return (
        <div className="card">
            <div className="content">
                {description.includes("TDS Level") ? (
                    <>
                        <span className="limit">{content}</span>
                        <span className="unit">{unit}</span>
                    </>
                ) : (
                    <>
                        <span className="unit">{unit}</span>
                        <span className="limit">{content}</span>
                    </>
                )}
                {statusClass && (
                    <span className={`status-circle ${statusClass}`}></span>
                )}
            </div>
            <div className="description">{description}</div>
        </div>
    );
};

Card.propTypes = {
    content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    unit: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

// const CardsContainer = () => {
//     const [dailyUsageLimit, setDailyUsageLimit] = useState("-");
//     const [monthlyUsageLimit, setMonthlyUsageLimit] = useState("-");
//     const [monthlyConsumption, setMonthlyConsumption] = useState("-");
//     const [tdsLevel, setTdsLevel] = useState("-");
//     const [userActivationCode, setUserActivationCode] = useState(null); // State to hold user's activation code

//     useEffect(() => {
//         const fetchData = async () => {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     try {
//                         // Fetch user document to get activation code
//                         const userDocRef = doc(db, "Users", user.uid);
//                         const userDocSnap = await getDoc(userDocRef);

//                         if (userDocSnap.exists()) {
//                             const userData = userDocSnap.data();
//                             const activationCode = userData.activationCode; // Assuming activation code field is named 'activationCode'
//                             setUserActivationCode(activationCode);

//                             // Fetch daily and monthly usage limits from ActivationCodes collection
//                             const activationCodeRef = doc(
//                                 db,
//                                 `ActivationCodes/${activationCode}`
//                             );
//                             const unsubscribeActivationCode = onSnapshot(
//                                 activationCodeRef,
//                                 (doc) => {
//                                     if (doc.exists()) {
//                                         const data = doc.data();
//                                         const currentDate = new Date();
//                                         const daysInMonth = new Date(
//                                             currentDate.getFullYear(),
//                                             currentDate.getMonth() + 1,
//                                             0
//                                         ).getDate();
//                                         setDailyUsageLimit(
//                                             data.amount / daysInMonth
//                                         );
//                                         setMonthlyUsageLimit(data.amount);
//                                         setTdsLevel(
//                                             data.tdsLevel || "Please update"
//                                         );
//                                         setMonthlyConsumption(
//                                             data.monthlyConsumption ||
//                                                 "Please update"
//                                         );
//                                     } else {
//                                         console.log(
//                                             "No data found for the activation code!"
//                                         );
//                                     }
//                                 },
//                                 (error) => {
//                                     console.error(
//                                         "Error fetching data: ",
//                                         error
//                                     );
//                                 }
//                             );

//                             return () => {
//                                 unsubscribeActivationCode();
//                             };
//                         } else {
//                             console.log("No user data found for the user!");
//                         }
//                     } catch (error) {
//                         console.error("Error fetching data: ", error);
//                     }
//                 } else {
//                     console.log("User is not logged in");
//                 }
//             });
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="card-container">
//             <Card
//                 content={dailyUsageLimit}
//                 unit="LKR"
//                 description="Daily Usage Limit"
//             />
//             <Card
//                 content={monthlyUsageLimit}
//                 unit="LKR"
//                 description="Monthly Usage Limit"
//             />
//             <Card
//                 content={monthlyConsumption}
//                 unit="LKR"
//                 description="Monthly Consumption"
//             />
//             <Card content={tdsLevel} unit="ppm" description="TDS Level" />
//         </div>
//     );
// };

const CardsContainer = () => {
    const [dailyUsageLimit, setDailyUsageLimit] = useState("-");
    const [monthlyUsageLimit, setMonthlyUsageLimit] = useState("-");
    const [monthlyConsumption, setMonthlyConsumption] = useState("-");
    const [tdsLevel, setTdsLevel] = useState("-");
    const [userActivationCode, setUserActivationCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const userDocRef = doc(db, "Users", user.uid);
                        const userDocSnap = await getDoc(userDocRef);

                        if (userDocSnap.exists()) {
                            const userData = userDocSnap.data();
                            const activationCode = userData.activationCode;
                            setUserActivationCode(activationCode);

                            const activationCodeRef = doc(
                                db,
                                `ActivationCodes/${activationCode}`
                            );
                            const unsubscribeActivationCode = onSnapshot(
                                activationCodeRef,
                                (doc) => {
                                    if (doc.exists()) {
                                        const data = doc.data();
                                        const currentDate = new Date();
                                        const daysInMonth = new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth() + 1,
                                            0
                                        ).getDate();

                                        // Set daily usage limit formatted to 2 decimal places
                                        setDailyUsageLimit(
                                            (data.amount / daysInMonth).toFixed(
                                                2
                                            )
                                        );
                                        // Set monthly usage limit formatted to 2 decimal places
                                        setMonthlyUsageLimit(
                                            data.amount.toFixed(2)
                                        );
                                        // Set monthly consumption formatted to 2 decimal places
                                        setMonthlyConsumption(
                                            (
                                                data.monthlyConsumption || 0
                                            ).toFixed(2)
                                        );
                                        setTdsLevel(
                                            data.tdsLevel || "Please update"
                                        );
                                    } else {
                                        console.log(
                                            "No data found for the activation code!"
                                        );
                                    }
                                },
                                (error) => {
                                    console.error(
                                        "Error fetching data: ",
                                        error
                                    );
                                }
                            );

                            return () => {
                                unsubscribeActivationCode();
                            };
                        } else {
                            console.log("No user data found for the user!");
                        }
                    } catch (error) {
                        console.error("Error fetching data: ", error);
                    }
                } else {
                    console.log("User is not logged in");
                }
            });
        };

        fetchData();
    }, []);

    return (
        <div className="card-container">
            <Card
                content={dailyUsageLimit}
                unit="LKR"
                description="Daily Usage Limit"
            />
            <Card
                content={monthlyUsageLimit}
                unit="LKR"
                description="Monthly Usage Limit"
            />
            <Card
                content={monthlyConsumption}
                unit="LKR"
                description="Monthly Consumption"
            />
            <Card content={tdsLevel} unit="ppm" description="TDS Level" />
        </div>
    );
};

export default CardsContainer;

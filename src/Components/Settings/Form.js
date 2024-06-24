// import React, { useState } from "react";
// import "./form.css";
// import { useNavigate } from "react-router-dom";

// const Form = ({ onSubmit }) => {
//     const [month, setMonth] = useState("");
//     const [budget, setBudget] = useState("");
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const navigate = useNavigate();

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         // Validate form data
//         if (!month || !budget) {
//             setError("Please fill in all fields.");
//             return;
//         }
//         // Submit form data
//         try {
//             await onSubmit({ month, budget });
//             setSuccessMessage("Form submitted successfully.");
//             setError("");
//             setTimeout(() => {
//                 navigate("/");
//             }, 2000);
//         } catch (error) {
//             setError("An error occured while submitting the form.");
//             setSuccessMessage("");
//         }
//     };

//     //BudgetInput
//     const handleBudgetChange = (e) => {
//         setError("");
//         setSuccessMessage("");
//         let value = e.target.value.replace(/[^0-9.]/g, "");

//         const parts = value.split(",");
//         if (parts.length > 2) {
//             value = parts[0] + "." + parts.slice(1).join("");
//         }

//         if (parts.length === 2 && parts[1].length > 2) {
//             value = parseFloat(value).toFixed(2);
//         }
//         setBudget(value);
//     };

//     const handleBudgetBlur = () => {
//         if (budget) {
//             const formattedValue = parseFloat(budget).toFixed(2);
//             setBudget(formattedValue);
//         }
//     };

//     //MonthSelect
//     return (
//         <form className="form" onSubmit={handleFormSubmit}>
//             <div className="flex-container">
//                 <label htmlFor="month">Month:</label>
//                 <select
//                     id="month"
//                     value={month}
//                     onChange={(e) => {
//                         setError("");
//                         setSuccessMessage("");
//                         setMonth(e.target.value);
//                     }}
//                 >
//                     <option value="">Select a month</option>
//                     <option value="January">January</option>
//                     <option value="February">February</option>
//                     <option value="March">March</option>
//                     <option value="April">April</option>
//                     <option value="May">May</option>
//                     <option value="June">June</option>
//                     <option value="July">July</option>
//                     <option value="August">August</option>
//                     <option value="September">September</option>
//                     <option value="October">October</option>
//                     <option value="November">November</option>
//                     <option value="December">December</option>
//                 </select>
//             </div>
//             <div className="input-container">
//                 <label htmlFor="budget">Enter the budget:</label>
//                 <input
//                     type="text"
//                     id="budget"
//                     value={budget}
//                     onChange={handleBudgetChange}
//                     onBlur={handleBudgetBlur}
//                 />
//                 <span className="currency-placeholder">LKR</span>
//             </div>
//             {error && <div className="error-message">{error}</div>}
//             {successMessage && (
//                 <div className="success-message">{successMessage}</div>
//             )}
//             <div className="button-container">
//                 <button type="submit">Submit</button>
//             </div>
//         </form>
//     );
// };

// export default Form;

// Form.js

import React, { useState } from "react";
import "./form.css";

const Form = ({ onSubmit }) => {
    const [amount, setAmount] = useState("");
    const [frequency, setFrequency] = useState("monthly");

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const billData = {
            amount: parseFloat(amount), // Convert to float if necessary
            frequency,
        };
        onSubmit(billData);
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>
                    <b>Select Frequency</b>
                </label>
                <select
                    className="form-control"
                    value={frequency}
                    onChange={handleFrequencyChange}
                >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="mb-3">
                <label>
                    <b>Enter Amount (in LKR)</b>
                </label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit Limits
                </button>
            </div>
        </form>
    );
};

export default Form;

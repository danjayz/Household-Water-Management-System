import React, { useState } from "react";
import "./WaterRatesForm.css";

const WaterRatesForm = ({ onSubmit }) => {
    const [waterRates, setWaterRates] = useState({
        "0-5": { usageCharge: "", monthlyServiceCharge: "" },
        "6-10": { usageCharge: "", monthlyServiceCharge: "" },
        "11-15": { usageCharge: "", monthlyServiceCharge: "" },
        "16-20": { usageCharge: "", monthlyServiceCharge: "" },
        "21-25": { usageCharge: "", monthlyServiceCharge: "" },
        "26-30": { usageCharge: "", monthlyServiceCharge: "" },
        "31-40": { usageCharge: "", monthlyServiceCharge: "" },
        "41-50": { usageCharge: "", monthlyServiceCharge: "" },
        "51-75": { usageCharge: "", monthlyServiceCharge: "" },
        "76-100": { usageCharge: "", monthlyServiceCharge: "" },
        "Over 100": { usageCharge: "", monthlyServiceCharge: "" },
    });

    const handleInputChange = (e, range) => {
        const { name, value } = e.target;
        setWaterRates((prevRates) => ({
            ...prevRates,
            [range]: {
                ...prevRates[range],
                [name]: value,
            },
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(waterRates);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedWaterRates = Object.fromEntries(
            Object.entries(waterRates).map(([range, values]) => [
                range,
                {
                    usageCharge: parseFloat(values.usageCharge),
                    monthlyServiceCharge: parseFloat(
                        values.monthlyServiceCharge
                    ),
                },
            ])
        );
        onSubmit(parsedWaterRates);
    };

    return (
        <form onSubmit={handleSubmit} className="water-rates-form">
            <div className="title">Water Bill Rates (to units)</div>
            {Object.entries(waterRates).map(([range, values]) => (
                <div key={range} className="form-group">
                    <label>
                        <b>{`Units ${range}`}</b>
                    </label>
                    <div className="input-group">
                        <label>Usage Charge:</label>
                        <input
                            type="number"
                            name="usageCharge"
                            value={values.usageCharge}
                            onChange={(e) => handleInputChange(e, range)}
                            required
                        />
                        <label>Service Charge:</label>
                        <input
                            type="number"
                            name="monthlyServiceCharge"
                            value={values.monthlyServiceCharge}
                            onChange={(e) => handleInputChange(e, range)}
                            required
                        />
                    </div>
                </div>
            ))}
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit Water Rates
                </button>
            </div>
        </form>
    );
};

export default WaterRatesForm;

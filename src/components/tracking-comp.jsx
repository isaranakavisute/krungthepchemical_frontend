/* eslint-disable no-unused-vars */
// EMSLuxuryTracking.jsx

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Tracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [error, setError] = useState('');

    const handleTrack = async () => {
        if (trackingNumber.length <= 0) {
            setError("Please fill tracking number");
            return;
        }

        try {
            const tokenResponse = await axios.post('https://trackapi.thailandpost.co.th/posthttp://localhost:3000/api/v1/authenticate/token', {}, {
                headers: {
                    Authorization: "Token L:BFF@RSHQPkBQZLMJM3Y@L_PGL.UrI_EoVzIDMXRMAsAnBuGJWiX1ExS5KeHbC_OTUFULFuX;GXMMR#EcJyR?K$FrW6CzVFLtF2",
                    "Content-Type": "application/json"
                }
            });

            const token = tokenResponse.data.token;

            const trackingResponse = await axios.post('https://trackapi.thailandpost.co.th/posthttp://localhost:3000/api/v1/track', {
                status: "all",
                language: "TH",
                barcode: [trackingNumber]
            }, {
                headers: {
                    Authorization: "Token " + token,
                    "Content-Type": "application/json"
                }
            });

            setTrackingResult(trackingResponse.data.response.items[trackingNumber]);

        } catch (err) {
            setError("Something went wrong!");
            console.error(err);
        }
    }

    return (
        <div className="bg-white text-white p-8  sm:mx-4 md:mx-4 lg:mx-30 xl:mx-48 my-8">
        <img src='https://www.thailandpost.co.th//library/template/thailandpost/standard5/theme/images/logo-thailandpost.png' className='h-20 my-2 bg-white py-2 rounded' />
            <h1 className="text-3xl font-bold mb-4">Tracking</h1>
            <Form>
                <Form.Group className="mb-4">
                    <Form.Control 
                        type="text" 
                        value={trackingNumber} 
                        onChange={(e) => setTrackingNumber(e.target.value)} 
                        placeholder="Enter Tracking Number" 
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </Form.Group>
                <Button 
                    onClick={handleTrack}
                    variant="primary"
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300"
                >
                    Track
                </Button>
            </Form>
            {trackingResult && (
    <div className="mt-4 p-4 bg-white text-black rounded-md">
        {trackingResult.map((record, index) => (
            <div key={index} className="border-b pb-2 mb-2">
                <p>Status: {record.status_description}</p>
                <p>Date: {record.status_date}</p>
                <p>Location: {record.location}</p>
                <p>Receiver Name: {record.receiver_name}</p>
                <p>Delivery Officer: {record.delivery_officer_name}</p>
                <p>Office: {record.office_name}</p>
                {record.signature && <img src={record.signature} alt="Signature" />}
            </div>
        ))}
    </div>
)}

        </div>
    );
}

export default Tracking;

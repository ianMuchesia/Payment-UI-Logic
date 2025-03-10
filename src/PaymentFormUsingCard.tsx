import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useGetPackageCardWithIdQuery } from './store/services/paymentService';
import axios from 'axios';
import { useGetPackageByIdQuery } from './store/services/packageService';

const PaymentFormUsingCard = () => {
    const location = useLocation();

    const queryParam = new URLSearchParams(location.search);
    const serviceId = queryParam.get("serviceId");
    const packageCardId = queryParam.get("packageCardId");
  
    const [amount, setAmount] = useState("");
  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  
    //const [paymentHtml, setPaymentHtml] = useState('');
    const [loading, setLoading] = useState(false);
  
    if ( !packageCardId) {
      return <div>PackageID is required</div>;
    }
  
    const { data, isLoading, error } = useGetPackageByIdQuery(packageCardId);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: Something wrong happened</div>;
    }
  
    const service = data?.data ;
    console.log(service)
  
    const initiatePayment = async (e:React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post(
          "http://41.90.106.13:5080/api/v2/payment/initiate-payment",
          {
            amount: 1,
            userID: 27,
  
            email,
            phoneNumber,
          
            packageCardId: packageCardId ?? null,
  
            firstName,
            lastName,
            callBackUrl:"http://localhost:5173/callback"
          }
        );
  
        console.log(response);
  
        // Ensure the URL is correctly accessed
        const paymentUrl = response.data.data;
        //console.log(paymentUrl);
        if (paymentUrl.redirecturl) {
          window.open(paymentUrl.redirecturl, "_blank");
          //window.location.href = paymentUrl;
        } else {
          console.error("Payment URL not found in response");
        }
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error initiating payment:", error);
      }
    };
    return (
<div className="mx-32">
        <div className="mx-32 my-24">
          <h1 className="text-3xl font-bold">Payment Form</h1>
          <div className="bg-white shadow-md rounded-md p-4 mt-4">
            <h2 className="text-xl font-bold">{service?.name}</h2>
            
            <p className="text-gray-500">Price: {service?.price}</p>
            <p className="text-gray-500">
          
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              Pay ${service?.price}
            </button>
          </div>
        </div>
        <div className="mt-4 border-4 p-8 rounded-lg">
          <h1 className="text-lg">
            Payment Form for {service?.name} with price ${service?.price} 
          </h1>
          <form className="mt-4" onSubmit={initiatePayment}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-2 border-black rounded-sm px-2 py-3"
              />
              <input
                type="text"
                placeholder="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-2 border-black rounded-sm px-2 py-3"
              />
              <input
                type="number"
                placeholder="Amount"
                value={service?.price}
                className="border-2 border-black rounded-sm px-2 py-3"
                disabled
              />
  
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-black rounded-sm px-2 py-3"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-2 border-black rounded-sm px-2 py-3"
              />
  
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                {loading ? "Loading..." : "Pay " + service?.price}
              </button>
            </div>
          </form>
        </div>
      </div>

    )
}

export default PaymentFormUsingCard
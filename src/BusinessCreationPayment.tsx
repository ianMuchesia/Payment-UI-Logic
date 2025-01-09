import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "./store/hooks/hooks";
import { useLocation } from "react-router-dom";


const BusinessCreationPayment = () => {
  const location = useLocation();
 

  const queryParam = new URLSearchParams(location.search);

  const businessID = queryParam.get("businessID");
  const businessName = queryParam.get("businessName");


  const user = useAppSelector((state) => state.auth.user);

  const [ userDetails, setUserDetails ] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    userID: user?.id,
    businessID: businessID,
    amount: 1,
  });





 

  //const [amount, setAmount] = useState("");


  //const [paymentHtml, setPaymentHtml] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }




  const initiatePayment = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5088/api/businesspayment/initiate",
        {
         ...userDetails,phoneNumber:userDetails.phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      // Ensure the URL is correctly accessed
      const paymentUrl = response.data.data;
      console.log(paymentUrl);
      if (paymentUrl) {
        window.open(paymentUrl, "_blank");
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
        <h1 className="text-3xl font-bold">Business Payment Form</h1>
        <div className="bg-white shadow-md rounded-md p-4 mt-4">
          <h2 className="text-xl font-bold">{businessName}</h2>
        
         
        
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Pay Ksh. 2500
          </button>
        </div>
      </div>
      <div className="mt-4 border-4 p-8 rounded-lg">
        <h1 className="text-lg">
          Payment Form for {businessName} with price ${userDetails.amount} .
        </h1>
        <form className="mt-4" onSubmit={initiatePayment}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="firstName"
              value={userDetails.name}
              name="name"
              onChange={handleChange}
              className="border-2 border-black rounded-sm px-2 py-3"
            />
          
            <input
              type="number"
              placeholder="Amount"
              value={userDetails.amount}
              name="amount"
              onChange={handleChange}
              className="border-2 border-black rounded-sm px-2 py-3"
              disabled
            />

            <input
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleChange}
              name="email"
              className="border-2 border-black rounded-sm px-2 py-3"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={userDetails.phone || ""}
              name="phone"
              onChange={handleChange}
              className="border-2 border-black rounded-sm px-2 py-3"
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              {loading ? "Loading..." : "Pay " + userDetails.amount}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BusinessCreationPayment
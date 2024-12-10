import { useLocation } from "react-router-dom";
import { useGetPackageServicesByIdQuery } from "./store/services/paymentService";
import { Item } from "./@types";
import { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const serviceId = queryParam.get("serviceId");
  const packageCardId = queryParam.get("packageCardId");

  //const [amount, setAmount] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //const [paymentHtml, setPaymentHtml] = useState('');
  const [loading, setLoading] = useState(false);

  if (!serviceId && !packageCardId) {
    return <div>Service ID or PackageID is required</div>;
  }

  const { data, isLoading, error } = useGetPackageServicesByIdQuery(serviceId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Something wrong happened</div>;
  }

  const service = data?.data as Item;

  const initiatePayment = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5088/api/payment/initiate-payment",
        {
          amount: 1,
          userID: 27,

          email,
          phoneNumber,
          packageServiceId: service.id ??null,
          packageCardId: packageCardId ?? null,

          firstName,
          lastName,
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
        <h1 className="text-3xl font-bold">Payment Form</h1>
        <div className="bg-white shadow-md rounded-md p-4 mt-4">
          <h2 className="text-xl font-bold">{service.name}</h2>
          <p className="text-gray-500">{service.description}</p>
          <p className="text-gray-500">Price: {service.price}</p>
          <p className="text-gray-500">
            Duration: {service.package.durationDays} days
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Pay ${service.price}
          </button>
        </div>
      </div>
      <div className="mt-4 border-4 p-8 rounded-lg">
        <h1 className="text-lg">
          Payment Form for {service.name} with price ${service.price} and
          duration of {service.package.durationDays} days
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
              value={service.price}
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
              {loading ? "Loading..." : "Pay " + service.price}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;

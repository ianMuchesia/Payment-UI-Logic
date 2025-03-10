import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TypePayment } from "./@types";

const PaymentCallback = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<TypePayment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderTrackingId = queryParams.get("OrderTrackingId");
    //@ts-ignore
    const orderMerchantReference = queryParams.get("OrderMerchantReference");

    const fetchTransactionStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5088/api/v2/payment/transaction-status/${orderTrackingId}/user/27`
        );
        console.log(response);
        setStatus(response.data.data as TypePayment);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStatus();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-32 my-4 border-4 rounded-lg p-8 border-blue-200">
      <h1 className="text-3xl font-bold ">Payment Status</h1>
      {status ? (
        <div>
          <p>Payment Method: {status.paymentMethod}</p>
          <p>Amount: {status.amount}</p>
          <p>Status: {status.paymentStatusDescription}</p>
          <p>Description: {status.message}</p>
          <p>Confirmation Code: {status.confirmationCode}</p>

          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={()=>{navigate("/service-bundles")}}>
             Visit Your Service Bundles
            </button>
          </div>
        </div>
      ) : (
        <div>No status available</div>
      )}
    </div>
  );
};

export default PaymentCallback;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServiceBundles from "./ServiceBundles";
import PaymentForm from "./PaymentForm";
import PaymentCallback from "./PaymentCallback";
import AttachBusiness from "./AttachBusiness";
import MyServiceBundles from "./MyServiceBundles";
import PaymentCards from "./PaymentCards";
import PaymentFormUsingCard from "./PaymentFormUsingCard";
import Signin from "./Signin";
import BusinessCreationPayment from "./BusinessCreationPayment";
import MyBusinesses from "./MyBusinesses";
import BusinessPaymentCallback from "./BusinessPaymentCallback";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/payment-form" element={<PaymentForm />} />
      <Route path="/" element={<ServiceBundles />} />
      <Route path="/callback" element={<PaymentCallback />} />
      <Route path="/business-callback" element={<BusinessPaymentCallback />} />
      <Route path="/attach-to-business" element={<AttachBusiness />} />
      <Route path="/service-bundles" element={<MyServiceBundles />} />
      <Route path="/payment-cards" element={<PaymentCards />} />
      <Route path="/payment-form-cards" element={<PaymentFormUsingCard />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/my-business" element={<MyBusinesses />} />
      <Route path="/business-creation-payment" element={<BusinessCreationPayment />} />
    </Routes>
  </BrowserRouter>
  )
}
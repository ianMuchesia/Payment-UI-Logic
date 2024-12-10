import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServiceBundles from "./ServiceBundles";
import PaymentForm from "./PaymentForm";
import PaymentCallback from "./PaymentCallback";
import AttachBusiness from "./AttachBusiness";
import MyServiceBundles from "./MyServiceBundles";
import PaymentCards from "./PaymentCards";
import PaymentFormUsingCard from "./PaymentFormUsingCard";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/payment-form" element={<PaymentForm />} />
      <Route path="/" element={<ServiceBundles />} />
      <Route path="/callback" element={<PaymentCallback />} />
      <Route path="/attach-to-business" element={<AttachBusiness />} />
      <Route path="/service-bundles" element={<MyServiceBundles />} />
      <Route path="/payment-cards" element={<PaymentCards />} />
      <Route path="/payment-form-cards" element={<PaymentFormUsingCard />} />
    </Routes>
  </BrowserRouter>
  )
}
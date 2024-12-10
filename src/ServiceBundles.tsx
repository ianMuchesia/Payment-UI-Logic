import { useNavigate } from "react-router-dom";
import { Item } from "./@types";
import { useGetPackageServicesQuery } from "./store/services/paymentService";

const ServiceBundles = () => {
    const navigate = useNavigate();
  const { data, isLoading, error } = useGetPackageServicesQuery(undefined);
  const services = data?.data as Item[];
  return (
    <div>
      <div className="mx-32 my-24">
        <h1 className="text-3xl font-bold">Service Bundles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {isLoading && <div>Loading...</div>}

          {data &&
            services.map((service) => (
              <div key={service.id} className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-xl font-bold">{service.name}</h2>
                <p className="text-gray-500">{service.description}</p>
                <p className="text-gray-500">Price: {service.price}</p>

                <div className="flex items-center gap-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={() => navigate(`/payment-form?serviceId=${service.id}`)}
                  >
                    Buy {service.name}
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceBundles;

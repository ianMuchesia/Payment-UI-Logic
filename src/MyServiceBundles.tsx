import { useNavigate } from "react-router-dom";
import { useGetUserPackagesQuery } from "./store/services/paymentService"

const MyServiceBundles = () => {
    const navigate = useNavigate();

    const { data,isLoading,error} = useGetUserPackagesQuery(27);
    console.log(data);
  return (
    <div>
    <div className="mx-32 my-24">
      <h1 className="text-3xl font-bold">Service Bundles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading && <div>Loading...</div>}

        {data &&
          data.data.map((service:any) => (
            <div key={service.id} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-bold">{service.service.name}</h2>
              <p className="text-gray-500">{service.service.description}</p>
              <p className="text-gray-500">Price: {service.service.price}</p>
              {
                service.userPackageId !== null &&(
                  <p className="text-gray-500">Package: {service.userPackage.packageCard.name} days</p>
                )
              }

              <div className="flex items-center gap-4">
                {
                    service.isAttachedToBusiness ?
                   <h2 className="text-green-500">Attached to Business:{service.business?.name}</h2>
                    :
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={() => navigate(`/attach-to-business?serviceBundleId=${service.id}&id=${service.id}`)}
                    >
                     Attach to Business
                    </button>
                }

                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => navigate(`/payment-form?serviceId=${service.id}`)}
                >
                  Buy {service.name}
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                  Add to Cart
                </button> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
  )
}

export default MyServiceBundles
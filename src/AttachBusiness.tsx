import { useLocation, useNavigate } from "react-router-dom";
import { useGetBusinessByUserIdQuery } from "./store/services/businessService"
import { useAttachToBusinessMutation, useGetUserPackagesQuery } from "./store/services/paymentService";

const AttachBusiness = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const queryParam = new URLSearchParams(location.search);
    const serviceId = queryParam.get("serviceBundleId");
    const id = queryParam.get("id");

    const { data,isLoading,error} = useGetBusinessByUserIdQuery("27");

    const { refetch} = useGetUserPackagesQuery(27);

    const [ attachBusiness,{isLoading:isAttachingBusiness}] = useAttachToBusinessMutation();


    const handleAttachBusiness = async (businessId:string) => {
        try {
            if(!serviceId){
                return;
            }
            const res =await attachBusiness({
                id:Number(id),
                businessId,
                userId:27,
                packageServiceId:Number(serviceId),
            }).unwrap();

            refetch();

            console.log(res);

            navigate("/service-bundles");
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
    <div className="mx-32 my-24">
      <h1 className="text-3xl font-bold">Attach to Business</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading && <div>Loading...</div>}

        {/* {A TABLE TO DISPLAY BUSINESSES WITH A COLUMN FOR ATTACHING A BUSINESS} */}

      <table>
        <thead>
            <tr>
                <th>Business Name</th>
                
                <th>Attach</th>
            </tr>
        </thead>
        <tbody>
            {data &&
              data.map((business) => (
                <tr key={business.businessID}>
                    <td>{business.name}</td>
                    <td>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={() => handleAttachBusiness(business.businessID)}
                        >
                       {
                            isAttachingBusiness ? "Attaching..." : "Attach"
                       }
                        </button>
                    </td>
                </tr>
              ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  )
}

export default AttachBusiness
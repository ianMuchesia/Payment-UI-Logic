
import {  useNavigate } from 'react-router-dom'
import { useAppSelector } from './store/hooks/hooks';
import { useGetBusinessByUserIdQuery } from './store/services/businessService';

const MyBusinesses = () => {

    

    const navigate = useNavigate();

    

    const user = useAppSelector((state) => state.auth.user);

    const { data,isLoading,error } = useGetBusinessByUserIdQuery(user?.id.toString() ?? "27");

    if(error){
        console.log(error);

        return <div>Error</div>
    }

    const handleChooseBusiness = (businessId:string,businessName:string) => {
        navigate(`/business-creation-payment?businessID=${businessId}&businessName=${businessName}`);
    }
  return (
    <div>
    <div className="mx-32 my-24">
      <h1 className="text-3xl font-bold">Choose Business</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading && <div>Loading...</div>}

        {/* {A TABLE TO DISPLAY BUSINESSES WITH A COLUMN FOR ATTACHING A BUSINESS} */}

      <table>
        <thead>
            <tr>
                <th>Business Name</th>
                
                <th>Select</th>
            </tr>
        </thead>
        <tbody>
            {data &&
              data.map((business) => (
                <tr key={business.businessID}>
                    <td>{business.name}</td>
                    <td>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={() => handleChooseBusiness(business.businessID,business.name)}
                        >
                    Select
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

export default MyBusinesses
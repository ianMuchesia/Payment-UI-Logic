
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetPackagesQuery } from './store/services/packageService';

const PaymentCards = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetPackagesQuery(undefined);

    console.log(data)

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: Something wrong happened</div>
  return (
    <div className='flex items-center justify-center my-32'>
    
    
    <div className="mx-auto">
        <div className="md:flex justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
           {
            data?.data.map((card:any) => (
                <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary" key={card.id}>
                <h3 className="text-xl lg:text-2xl">{card.name}</h3>
                <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                <p className="text-[15px]">For people who are starting out in the water saving business</p>
                <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                    <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">Ksh. {card.price.toLocaleString()}</strong> Total 
                </div>
                <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                   {card.cardServices.map((service:any) => (
                     <li className="flex justify-center items-center" key={service.id}>
                     <FaArrowLeft/>
                     {service.service.name} - {service.service.price.toLocaleString()} Ksh for {service.service.durationDays} days
                 </li>
                   ))}
                 
                </ul>
                <button
                    type="button"
                    className="btn text-black shadow-md border-2 p-3 group-hover:text-primary group-hover:border-black group-hover:bg-primary/10  w-full"
                    onClick={() => navigate("/payment-form-cards?packageCardId=" + card.id)}

                >
                    Buy Now
                </button>
            </div>
            ))

           }
           
        </div>
    </div></div>
  )
}

export default PaymentCards
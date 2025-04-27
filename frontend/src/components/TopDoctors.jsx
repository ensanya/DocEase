// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import {AppContext} from '../context/AppContext'



// const TopDoctors = () => {
//     const navigate= useNavigate();
//     const {doctors}=useContext(AppContext);

//   return (
//     <div  className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'> 
//        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//       <p className='sm:w-1/3 text-center text-sm text-gray-600'>
//         Simply browse through our extensive list of trusted doctors and book your appointment hassle-free.
//       </p>
//       <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//         {doctors.slice(0, 10).map((item, index) => (
          
//           <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
//             key={index}
//             className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-transform duration-500'
//           >
//          <img className='bg-blue-50' src={item.image} alt={item.name} />
//                 <div className='p-4'>
//                   <div className='flex items-center gap-2 text-sm text-center text-green-500'>
//                     <p className={`w-2 h-2 ${item.available? 'bg-green-500': 'bg-gray-500'}  rounded-full`}></p><p>{item.available?'Available':'Not Available'}</p>
//                   </div>
                  
  
//                   <p className='font-medium text-gray-900 text-lg'>{item.name}</p>
//                   <p className='text-gray-600 text-sm'>{item.speciality}</p>
//                 </div>
//               </div>
//         ))}
//       </div>

//       <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='mt-10 bg-blue-500 text-white px-12 py-3 rounded-full hover:bg-blue-600 transition'>
//         More
//       </button>

//     </div>
//   )
// }

// export default TopDoctors

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors and book your appointment hassle-free.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
          >
            <img className="bg-blue-50 w-full h-48 object-cover" src={item.image} alt={item.name} />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.available === true ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <p className={`font-medium ${item.available === true ? 'text-green-600' : 'text-red-500'}`}>
                  {item.available === true ? 'Available' : 'Unavailable'}
                </p>
              </div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="mt-10 bg-blue-500 text-white px-12 py-3 rounded-full hover:bg-blue-600 transition"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;

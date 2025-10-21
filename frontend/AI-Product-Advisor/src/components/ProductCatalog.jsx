import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

const API_URL = import.meta.env.VITE_API_URL;

import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ProductCatalog = () => {

  const navigate = useNavigate();
  // console.log(API_URL)

  const [productCatalog, setProductCatalog] = useState([]);
  const [displayRawData, setDisplayRawData] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      const response = await fetch(`${API_URL}/get_product_catalog`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({data: "example"})
      })
      const data = await response.json();
      if(data.success){
        setProductCatalog(data.product_catalog);
      }
      else{
        console.log("ERROR IN FETCHING PRODUCT CATALOG")
      }
    }
    fetchCatalog();
  }, []);

  const handleBackButton = () => {
    navigate(-1);
  }
  const handleDisplay = () => {
    setDisplayRawData(!displayRawData);
  }

  return (
    <div className='pt-20'>
      <div className='fixed z-100 top-4 left-10 p-2 flex items-center gap-3'>
        <div className='' onClick={handleBackButton}>
            <div className='bg-red-400 p-3 text-white rounded-full'><MdOutlineArrowBack size={20}/></div>
        </div>
        <div>
          <div onClick={handleDisplay} className='cursor-pointer bg-black border-black p-3 text-white rounded-full'>{displayRawData ? "SHOW CARD FORMAT" : "SHOW RAW FORMAT"}</div>
        </div>
      </div>

      {displayRawData ? (
        <div className="md:w-[90%] mx-auto p-4 bg-white">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(productCatalog, null, 2)}
          </pre>
        </div>
      ) : (
        <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 md:w-[90%] mx-auto min-h-screen bg-white'>
          {productCatalog.map((card, index) => {
            return (
              <div key={index}>
                <ProductCard product={card}/>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductCatalog
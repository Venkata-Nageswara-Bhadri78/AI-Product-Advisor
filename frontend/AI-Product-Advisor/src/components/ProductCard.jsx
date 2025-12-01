import * as React from 'react';
import { FaRegHeart, FaShareAlt } from 'react-icons/fa';
import image from '../assets/prod_default_image.png';

export default function ProductCard({ product }) {

  const profileIcon = product.brand.substring(0, 1).toUpperCase();
  const avatarColor = colorMap[profileIcon] || 'bg-gray-500';

  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 
                hover:scale-[1.02] border border-blue-400"
    >      
      <div className='flex items-center px-3 py-1.5 bg-blue-200 border-b border-gray-100'>        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 shadow-md ${avatarColor}`}>
          {profileIcon}
        </div>        
        <div className='flex-grow'>
          <h3 className='text-lg font-semibold text-gray-800 leading-tight'>
            {product.brand.toUpperCase()}
          </h3>
          <p className='text-sm font-semibold text-green-600 leading-none'>
            ${product.price}
          </p>
        </div>
      </div>
      
      {/* <div className='h-50 overflow-hidden'>
        <img
          src={image}
          alt={product.product_name}
          className="w-full h-full object-cover"
        />
      </div> */}
      
      <div className='p-3'>
        <div className='mb-2'>
          <span className='inline-flex text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300'>
            {product.category}
          </span>
        </div>

        <p className='text-sm text-gray-600 text-justify min-h-25 max-h-24 overflow-hidden'>{product.description}</p>
      </div>
      
      <div className='flex justify-between items-center py-1.5 px-3 border-t border-gray-400'>
        <div>
          <button aria-label="add to favorites" className='p-2 text-gray-500 hover:text-red-500 transition-colors'>
            <FaRegHeart size={18} />
          </button>
          
          <button aria-label="share" className='p-2 text-gray-500 hover:text-blue-500 transition-colors'>
            <FaShareAlt size={18} />
          </button>
        </div>
        
        <div className='bg-blue-600 p-1 px-2 text-white rounded-md cursor-pointer'>
          <div>SHOW MORE</div>
        </div>
      </div>
    </div>
  );
}

const colorMap = {
  "A": "bg-red-500", "B": "bg-green-500", "C": "bg-blue-500", "D": "bg-orange-500",
  "E": "bg-purple-500", "F": "bg-pink-500", "G": "bg-cyan-500", "H": "bg-yellow-600",
  "I": "bg-fuchsia-500", "J": "bg-teal-500", "K": "bg-yellow-400", "L": "bg-sky-500",
  "M": "bg-amber-600", "N": "bg-indigo-500", "O": "bg-rose-400", "P": "bg-emerald-500",
  "Q": "bg-blue-700", "R": "bg-red-600", "S": "bg-violet-600", "T": "bg-lime-500",
  "U": "bg-sky-400", "V": "bg-pink-600", "W": "bg-yellow-500", "X": "bg-indigo-400",
  "Y": "bg-teal-400", "Z": "bg-rose-600"
};

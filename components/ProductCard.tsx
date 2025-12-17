
import React from 'react';
import { Product } from '../types';
import { Star, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-[#161618] border border-gray-800 hover:border-[#fa1e4e] transition-all duration-300 overflow-hidden relative">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-[#fa1e4e] text-white text-[10px] font-bold px-2 py-1 rounded-sm font-orbitron uppercase">
            New Gear
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4 flex flex-col h-40">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] text-[#fa1e4e] font-orbitron uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-white font-bold group-hover:text-[#fa1e4e] transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-xs line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-orbitron font-bold text-white">KSh {product.price.toLocaleString()}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 bg-[#252528] group-hover:bg-[#fa1e4e] flex items-center justify-center transition-all duration-300 rounded-sm"
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Corner RGB accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-transparent border-l-transparent group-hover:border-t-[#fa1e4e] transition-all duration-300 opacity-20" />
    </div>
  );
};

export default ProductCard;

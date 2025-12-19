
import React from 'react';
import { Product } from '../types';
import { Star, Plus, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="group theme-bg-secondary border theme-border hover-border-accent transition-all duration-300 overflow-hidden relative shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isWishlisted ? 'bg-accent text-white' : 'bg-black/40 text-gray-200 hover:text-white'
          }`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {product.isNew && (
          <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm font-orbitron uppercase">
            New Gear
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4 flex flex-col h-40">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] text-accent font-orbitron uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="theme-text-primary font-bold group-hover:text-accent transition-colors line-clamp-1 mb-2 font-orbitron text-sm">
          {product.name}
        </h3>
        
        <p className="theme-text-secondary text-xs line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-orbitron font-bold theme-text-primary">KSh {product.price.toLocaleString()}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 theme-bg-tertiary group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all duration-300 rounded-sm"
          >
            <Plus size={20} className="theme-text-primary group-hover:text-white" />
          </button>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-transparent border-l-transparent group-hover:border-t-accent transition-all duration-300 opacity-20" />
    </div>
  );
};

export default ProductCard;

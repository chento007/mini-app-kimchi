import { Button } from "@telegram-apps/telegram-ui";
import { Product } from "../../../lib/api";


interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.imgUrl ? (
        <img 
          src={product.imgUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        
        <Button 
          className="w-full" 
          disabled={product.stock === 0}
          onClick={() => onAddToCart?.(product)}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../../hooks/use-products';
import { Button, Input } from '@telegram-apps/telegram-ui';
import { ProductCard } from './ProductCard';

export default function ListCardProduct() {
  const { products, loading, error, refetch } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <div className="text-red-500 text-lg">Error: {error}</div>
        <Button onClick={refetch}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        
        <div className="flex gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={refetch}>
            Refresh
          </Button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm ? 'No products match your search.' : 'No products found.'}
          </div>
          {searchTerm && (
            <Button 
              onClick={() => setSearchTerm('')} 
              className="mt-4"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-500 mb-4">
            Showing {filteredProducts.length} of {products.length} products
            {searchTerm && ` for "${searchTerm}"`}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
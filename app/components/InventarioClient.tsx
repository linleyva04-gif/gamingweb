"use client";
import { useCart } from '../src/context/CarContext';
import ProductCard from './ProductCard';
import CartSidebar from './CartSidebar';

export default function InventarioClient({ productos, isAdmin }: { productos: any[], isAdmin: boolean }) {
  const { cart } = useCart();
  const tieneItems = cart.length > 0;

  return (
    <div className="relative">
      <CartSidebar />
      
      <div className={`transition-all duration-500 ${tieneItems ? "pr-80" : "pr-0"}`}> 
        <header className="mb-12 border-l-4 border-[#ff4655] pl-6">
          <h1 className="text-4xl font-black uppercase italic text-white">Inventario de Suministros</h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            // {tieneItems ? "Modo Venta Activo" : "Mostrando los artículos en venta"}
          </p>
        </header>

        <div className={`grid gap-8 transition-all duration-500 grid-cols-1 md:grid-cols-2 ${
          tieneItems ? "lg:grid-cols-3" : "lg:grid-cols-4"
        }`}>
          {productos.map((prod) => (
            <ProductCard 
              key={prod.id} 
              {...prod}
              isAdmin={isAdmin} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
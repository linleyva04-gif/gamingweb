"use client";
import Link from 'next/link';
import { useCart } from '../src/context/CarContext';
import { agregarStock } from '../src/app/actions';


export default function ProductCard({ id, nombre, precio, isAdmin, imagenUrl, stock }: any) {
  const { addToCart } = useCart();

  
  const handleAddStock = async () => {
      const res = await agregarStock(id);
      if (!res.success) {
        alert("Error al actualizar el stock en la base de datos");
      }
      else{
        alert("Datos actualizados en la base de datos");
      }
    };

  return (
    <div className="bg-[#1a252e] border-l-4 border-[#ff4655] relative group p-4 shadow-xl overflow-hidden flex flex-col h-full">
      
      {isAdmin && (
       <button 
          onClick={handleAddStock} 
          className="absolute top-0 right-0 bg-[#ff4655] text-white text-[10px] px-2 py-1 font-bold z-20 hover:bg-white hover:text-black transition-colors"
        >
          + STOCK
        </button>
      )}

      <div className="w-full h-40 bg-[#2a3a47] mb-4 flex items-center justify-center relative">
        {imagenUrl ? (
          <img 
            src={imagenUrl} 
            alt={nombre} 
            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300" 
          />
        ) : (
          <span className="text-white/10 font-black text-2xl italic">ITEM</span>
        )}
      </div>

      <div className="grow">
        <h3 className="text-lg font-black italic uppercase text-white truncate">{nombre}</h3>
        <div className="mt-1">
          <p className="text-[#ff4655] font-bold text-xl">${precio}</p>
          <p className="text-gray-500 text-[10px] uppercase font-mono">
            Disponibles: <span className={stock > 0 ? "text-green-500" : "text-red-500"}>{stock}</span>
          </p>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col gap-2 mt-4">
        <button 
          onClick={() => {
    console.log("Clic en:", nombre); 
    addToCart({ 
      id, 
      nombre, 
      precio: Number(precio), 
      stock: Number(stock) 
    });
  }}
          disabled={stock <= 0}
          className={`w-full py-2 text-[10px] font-black uppercase tracking-widest transition ${
            stock > 0 
            ? "bg-[#ff4655] text-white hover:bg-white hover:text-black" 
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          {stock > 0 ? "Añadir Carrito" : "Agotado"}
        </button>
        
      </div>
    </div>
  );
}
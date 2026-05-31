"use client";
import { useCart } from '../src/context/CarContext';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const { cart, addToCart, removeFromCart } = useCart();
  const router = useRouter(); 

  const total = cart.reduce((acc: number, item: any) => acc + (item.precio * item.quantity), 0);

  const handleIrACompra = () => {
    router.push('/compras'); 
  };

  if (cart.length === 0) return null; 

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-[#0f1923] border-l-2 border-[#ff4655] shadow-2xl z-50 p-6 flex flex-col">
      <h2 className="text-2xl font-black italic uppercase text-white mb-6 border-b border-white/10 pb-2">
        Resumen de Venta
      </h2>

      <div className="grow overflow-y-auto space-y-4 custom-scrollbar">
        {cart.map((item: any) => (
          <div key={item.id} className="bg-[#1a252e] p-3 border-l-2 border-white/20">
            <div className="flex justify-between items-start">
              <span className="text-white font-bold text-xs uppercase truncate w-40">
                {item.nombre}
              </span>
              <span className="text-[#ff4655] font-mono text-xs">
                ${item.precio * item.quantity}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-[10px] font-mono uppercase">
                CANTIDAD: {item.quantity}
              </span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-[10px] bg-white/5 hover:bg-white hover:text-black text-white px-3 py-1 transition font-bold"
                >
                  -1
                </button>
                
                <button 
                  onClick={() => addToCart(item)}
                  className="text-[10px] bg-white/5 hover:bg-[#ff4655] text-white px-3 py-1 transition font-bold"
                >
                  +1
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 uppercase text-xs font-bold">Total a pagar:</span>
          <span className="text-2xl font-black text-white italic">${total}</span>
        </div>
        <button onClick={handleIrACompra} className="w-full py-3 bg-[#ff4655] text-white font-black uppercase italic tracking-tighter hover:bg-white hover:text-black transition shadow-[0_0_15px_rgba(255,70,85,0.4)]">
          Ir a la compra
        </button>
      </div>
    </div>
  );
}
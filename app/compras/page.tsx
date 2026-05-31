'use client'
import { useState } from 'react';
import { finalizarCompra } from '../src/app/actions/checkout';
import { useCart } from '../src/context/CarContext'; 
import { useRouter } from 'next/navigation';

export default function RealizarCompraPage() {
  const { cart, clearCart } = useCart(); 
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("El carrito está vacío");

    setCargando(true);
    const res = await finalizarCompra(cart);
    setCargando(false);
    
    if (res.success) {
      setMensaje("¡Gracias por tu compra!");
    } else {
      alert("Error en la compra: " + res.message);
    }
  };

const total = cart.reduce((acc: number, item: any) => acc + (item.precio * item.quantity), 0);

 return (
    <div className="min-h-screen bg-[#0b0e14] bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-[#1a252e] via-[#0b0e14] to-[#0b0e14] py-12 px-4 flex justify-center items-center font-sans">
      
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="bg-[#ff4655] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-black italic select-none">ORDER</div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white relative z-10">
            Finalizar Compra
          </h1>
          <p className="text-white/80 text-xs font-mono mt-1 relative z-10">ESTADO: ESPERANDO CONFIRMACIÓN</p>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item: any) => (
              <div key={item._id || item.id} className="group bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-xl p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[#ff4655] text-[10px] font-bold tracking-widest uppercase mb-1">Producto</span>
                  <span className="text-lg font-bold text-white group-hover:text-[#ff4655] transition-colors">{item.nombre}</span>
                  <span className="text-gray-400 text-xs mt-1 italic">Cantidad: {item.quantity}</span>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-white font-mono">${item.precio * item.quantity}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono">${item.precio} c/u</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 mt-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-gray-500 uppercase text-xs font-black tracking-widest block mb-1">Total a transferir</span>
                <div className="h-1 w-12 bg-[#ff4655]"></div>
              </div>
              <span className="text-5xl font-black text-white italic tracking-tighter">
                ${total}<span className="text-[#ff4655] text-xl">.00</span>
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cargando || cart.length === 0}
              className={`relative w-full py-5 rounded-xl font-black uppercase italic text-xl tracking-widest transition-all duration-300 transform active:scale-95 group
                ${cargando 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-[#ff4655] hover:text-white shadow-[0_10px_20px_rgba(255,70,85,0.2)] hover:shadow-[0_0_30px_rgba(255,70,85,0.4)]'
                }`}
            >
              <span className="relative z-10">{cargando ? 'Procesando Vuelo...' : 'Confirmar Pedido'}</span>
            </button>

            {mensaje && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-center font-bold text-sm animate-pulse">
                 {mensaje}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client'
import React, { useState, useEffect, useRef } from 'react'

export default function ProductCarousel({ productos }: { productos: any[] }) {
  // Dividimos los productos en columnas de dos
  const columnasBase = [];
  for (let i = 0; i < productos.length; i += 2) {
    columnasBase.push(productos.slice(i, i + 2));
  }

  // Clonamos las columnas para crear el efecto infinito
  const columnas = [...columnasBase, ...columnasBase, ...columnasBase];
  
  // Iniciamos en el primer set real (el segundo grupo de clones)
  const [currentIndex, setCurrentIndex] = useState(columnasBase.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Manejo del "salto" invisible para el loop infinito
  useEffect(() => {
    if (currentIndex >= columnasBase.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(columnasBase.length);
      }, 700); // Debe coincidir con la duración de la transición
    }
    if (currentIndex <= columnasBase.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(columnasBase.length * 2 - 1);
      }, 700);
    }
  }, [currentIndex, columnasBase.length]);

  // Auto-scroll
  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [currentIndex]);

  return (
    <div className="relative w-full px-16 group select-none">
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-[#ff4655] p-4 skew-x-[-15deg] opacity-0 group-hover:opacity-100 transition-all">
        <span className="inline-block skew-x-15deg font-black text-white">{"<"}</span>
      </button>

      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-[#ff4655] p-4 skew-x-[-15deg] opacity-0 group-hover:opacity-100 transition-all">
        <span className="inline-block skew-x-15deg font-black text-white">{">"}</span>
      </button>

      <div className="overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentIndex * 320}px)` }} 
        >
          {columnas.map((par, idx) => (
            <div key={idx} className="flex-none w-72 mr-8 flex flex-col gap-6">
              {par.map((producto: any, pIdx: number) => (
                <div 
                  key={`${idx}-${pIdx}`} 
                  className="bg-[#1a252e] border border-white/5 p-4 hover:border-[#ff4655] transition-all group/card relative"
                >
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff4655] opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                  
                  <div className="h-36 w-full flex items-center justify-center bg-[#0f1923] mb-4 overflow-hidden rounded-sm">
                    <img 
                      src={producto.imagenUrl} 
                      alt={producto.nombre} 
                      className="max-h-[90%] object-contain transform group-hover/card:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-white font-black italic uppercase text-xs truncate">{producto.nombre}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-mono text-white font-bold">${producto.precio}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
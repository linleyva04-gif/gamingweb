import Link from 'next/link';
import ProductCarousel from './components/ProductCarousel'; 
import { MongoClient } from 'mongodb';

async function getProductos() {
  const uri = "mongodb+srv://kiosco:kiosco1234@rentacarrillos.jlesrxb.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('GamingStore');
    const productos = await db.collection('Productos').find().toArray();
    return JSON.parse(JSON.stringify(productos));
  } finally {
    await client.close();
  }
}

export default async function Home() {
    const listaProductos = await getProductos();


  return (
    <div className="bg-[#0b0e14] min-h-screen text-[#ece8e1] font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 bg-[url('/space-dots.png')] bg-repeat"></div>
      
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#ff4655]/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#468eff]/5 rounded-full blur-[120px]"></div>

      <section className="h-[75vh] flex flex-col items-center justify-center text-center px-6 relative z-10 border-b border-white/5">
        
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-200] h-200 border border-white/5 rounded-full opacity-30 select-none"></div>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-225 h-225 border border-white/5 rounded-full opacity-20 select-none"></div>

        <h2 className="text-[#ff4655] font-bold tracking-[0.5em] text-[10px] mb-5 uppercase relative z-10 flex items-center gap-3">
          <span className="w-1 h-1 bg-[#ff4655] rounded-full"></span>
          // PAGINA PRINCIPAL
          <span className="w-1 h-1 bg-[#ff4655] rounded-full"></span>
        </h2>
        
        <h1 className="text-8xl font-black italic uppercase leading-none tracking-tighter relative z-10 transform scale-y-105">
          Catálogo<span className="text-[#ff4655] text-5xl relative -top-8 -left-3">*</span> <br /> 
          <span className="text-white">Principal</span>
        </h1>
        
        <p className="mt-8 text-gray-500 max-w-lg relative z-10 text-sm font-mono tracking-wide">
          Gaming Store
        </p>
        
        <Link href="/inventario" className="mt-10 group relative px-10 py-4 font-black uppercase italic tracking-widest text-lg overflow-hidden rounded-sm transition-all duration-300">
          <div className="absolute inset-0 bg-[#0f1923]/90 border border-[#ff4655]/50 group-hover:border-[#ff4655] group-hover:bg-[#ff4655]/10 backdrop-blur-sm transition-all duration-300"></div>
          <span className="relative z-10 text-[#ff4655] group-hover:text-white group-hover:drop-shadow-[0_0_8px_#ff4655] transition-colors duration-300">
            Ir al Catalogo
          </span>
          <div className="absolute -inset-1 bg-linear-to-r from-transparent via-[#ff4655]/20 to-transparent transform -skew-x-12 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"></div>
        </Link>
        
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ff4655]/20 rounded-full blur-[60px] opacity-70"></div>
      </section>

      <section className="p-10 relative z-10 bg-[#0f1923]/50 backdrop-blur-md">
        
        <div className="mb-10 px-6">
          <h3 className="text-xs font-bold flex items-center gap-3 text-white tracking-[0.3em] uppercase">
            <span className="w-10 h-0.5 bg-[#ff4655]"></span> 
            Nuestros <span className="text-[#ff4655]">Productos</span>
            <span className="w-3 h-3 border border-[#ff4655]/50 rounded-full"></span>
          </h3>
        </div>
        
        <div className="w-full">
          <ProductCarousel productos={listaProductos} />
        </div>
      </section>

      <div className="absolute bottom-5 left-5 opacity-20 text-xs font-mono">
        // Gaming Store v1.0
      </div>
    </div>

  );
}
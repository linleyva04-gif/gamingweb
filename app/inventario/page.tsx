import { MongoClient } from 'mongodb';
import InventarioClient from '../components/InventarioClient';
import { headers } from 'next/headers';


export default async function InventarioPage() {
  const headerList = await headers();
  
  const ipCiente = headerList.get('x-forwarded-for') || 
                   headerList.get('x-real-ip') || 
                   '127.0.0.1';

  const IP_DEL_ADMIN = '192.168.0.110'; 

const isAdmin = ipCiente === '::1' || ipCiente === '127.0.0.1' || ipCiente === IP_DEL_ADMIN;
  const uri = "mongodb+srv://kiosco:kiosco1234@rentacarrillos.jlesrxb.mongodb.net/"; 
  const client = new MongoClient(uri);
  let productos: any[] = [];

  try {
    await client.connect();
    const database = client.db('GamingStore'); 
    const collection = database.collection('Productos');
    const docs = await collection.find({}).toArray();
    
    productos = docs.map(doc => ({
      id: doc._id.toString(), 
      nombre: doc.nombre,
      precio: doc.precio,
      imagenUrl: doc.imagenUrl || null,
      stock: doc.stock
    }));
  } catch (e) {
    console.error("Error cargando productos:", e);
  } finally {
    await client.close();
  }

  return (
    <div className="bg-[#0f1923] min-h-screen p-10">
          <InventarioClient productos={productos} isAdmin={isAdmin} />
    </div>
  );
}
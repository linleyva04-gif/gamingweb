"use server";
import { MongoClient, ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export async function agregarStock(productoId: string) {
  const uri = "mongodb+srv://kiosco:kiosco1234@rentacarrillos.jlesrxb.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('GamingStore');
    const collection = database.collection('Productos');

    const producto = await collection.findOne({ _id: new ObjectId(productoId) });

    if (!producto) return { success: false, error: "No existe" };

    const nuevoStock = Number(producto.stock) + 1;

    await collection.updateOne(
      { _id: new ObjectId(productoId) },
      { $set: { stock: nuevoStock } } 
    );

    revalidatePath('/inventario');
    return { success: true };
  } catch (e) {
    console.error("Error detallado:", e);
    return { success: false };
  } finally {
    await client.close();
  }
}
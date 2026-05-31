'use server'
import { MongoClient, ObjectId } from 'mongodb';

export async function finalizarCompra(carrito: any[]) {
  const uri = "mongodb+srv://kiosco:kiosco1234@rentacarrillos.jlesrxb.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('GamingStore');
    const collection = database.collection('Productos');

    for (const item of carrito) {
      const idReal = item._id || item.id;
      const cantidadComprada = Number(item.quantity || item.cantidad || 0);

      const productoDB = await collection.findOne({ _id: new ObjectId(idReal) });

      if (!productoDB) {
        throw new Error(`El producto ${item.nombre} no existe en la base de datos.`);
      }

      const stockActual = Number(productoDB.stock);

      if (stockActual < cantidadComprada) {
        throw new Error(`Stock insuficiente para ${item.nombre}. Disponible: ${stockActual}`);
      }
    }

    const promesasUpdate = carrito.map(item => {
      const idReal = item._id || item.id;
      const cantidadComprada = Number(item.quantity || item.cantidad || 0);

      return collection.updateOne(
        { _id: new ObjectId(idReal) },
        { 
          $inc: { 
            stock: -Math.floor(cantidadComprada) 
          } 
        }
      );
    });

    await Promise.all(promesasUpdate);

    return { success: true, message: "¡Compra realizada con éxito!" };
  } catch (error: any) {
    console.error("Error en servidor:", error.message);
    return { success: false, message: error.message };
  } finally {
    await client.close();
  }
}
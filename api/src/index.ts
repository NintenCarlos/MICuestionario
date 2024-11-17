import app from "./app";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/QUTMA");
    console.log('Aplicación conectada con la base de datos.')
    app.listen(4000, () => {
      console.log("Aplicación corriendo con éxito");
    });
  } catch (error) {
    console.log("Algo salió mal :/", error);
  }
}

main();
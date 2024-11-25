import express, { Application, Request, Response } from "express";
import cors from "cors";
import { RegisterUsers, signIn } from "./Controllers/UserController";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hola desde mi servidor con TS");
});

//Registrar usuarios
app.post("/users/create", RegisterUsers);

//Verificar si el correo está disponible
app.get("/users/get", signIn);

export default app;

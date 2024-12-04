import express, { Application, Request, Response } from "express";
import cors from "cors";
import { RegisterUsers, signIn } from "./Controllers/UserController";
import { createQuizz } from "./Controllers/QuestionnaireController";


const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//Usuarios
app.post("/users/create", RegisterUsers)
app.post("/users/sign-in", signIn)

app.post("/questionnaire/create", createQuizz)

export default app;
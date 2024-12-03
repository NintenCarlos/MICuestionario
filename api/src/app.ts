import express, { Application, Request, Response } from "express";
import cors from "cors";
import { RegisterUsers, signIn } from "./Controllers/UserController";
import {
  createQuestionnarie,
  deleteQuestionnarie,
  updateQuestionnaire,
} from "./Controllers/QuestionnaireController";
import {
  createQuestions,
  deleteQuestion,
  updateQuestion,
} from "./Controllers/QuestionsController";
import { createOption, deleteOption, updateOption } from "./Controllers/OptionsController";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hola desde mi servidor con TS");
});

//Usuarios
app.post("/users/create", RegisterUsers);
app.post("/users/get", signIn);

//Cuestionarios
app.post("/questionnarie/create", createQuestionnarie);
app.put("/questionnaire/update", updateQuestionnaire);
app.delete("/questionnaire/delete", deleteQuestionnarie);

//Preguntas
app.post("/questions/create", createQuestions);
app.put("/questions/update", updateQuestion);
app.delete("/questions/delete", deleteQuestion);

//Opciones
app.post("/options/create", createOption);
app.put("/options/update", updateOption)
app.delete("/options/delete", deleteOption)

export default app;

import { Request, Response } from "express";
import mongoose from "mongoose";
import { QuestionnariesModel } from "../Models/QuestionnariesModel";
import { UserModel } from "../Models/UsersModel";
import jwt from "jsonwebtoken";

export const createQuestionnarie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, userId } = req.body;

    //Verificar que los datos estén
    if (!title || !description || !userId) {
      res.status(400).json({
        msg: "Faltan datos para crear el cuestionario.",
      });
      return;
    }

    
    //Verifica que el usuario si exista:
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        msg: "El ID no es válido.",
      });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(400).json({
        msg: "El usuario no existe.",
      });
      return;
    }

    const questionnarie = await QuestionnariesModel.create({
      title,
      description,
      userId,
    });

    const token = jwt.sign(JSON.stringify(questionnarie), "Chino Huerta");

    res.status(200).json({
      msg: "El cuestionario fue creado con éxito.",
      token,
    });

    //Error
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal. El programador no le sabe al chispop",
    });
  }
};

export const updateQuestionnaire = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { questionnaireId, title, description } = req.body;

    if (!questionnaireId || !title || !description) {
      res.status(400).json({
        msg: "Completa todos los campos antes de actualizar.",
      });
    }

    //Verifica que el cuestionario si exista:
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(questionnaireId)) {
      res.status(400).json({
        msg: "El cuestionario no existe.",
      });
      return;
    }

    //Lo actualiza.
    const updatedQuestionnarie = await QuestionnariesModel.findByIdAndUpdate(
      questionnaireId,
      { title, description }
    );

    const token = jwt.sign(
      JSON.stringify(updatedQuestionnarie),
      "Chino Huerta"
    );

    res.status(200).json({
      msg: "El cuestionario fue actualizado",
      token,
    });

    //Error
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al actualizar el cuestionario.",
    });
  }
};

export const deleteQuestionnarie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { questionnaireId } = req.body;

    if (!questionnaireId) {
      res.status(400).json({
        msg: "Ingresa el id del cuestionario para poderlo borrar.",
      });
    }

    //Valida si es un ObjectId.
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(questionnaireId)) {
      res.status(400).json({
        msg: "Hay un error con el id del cuestionario.",
      });
      return;
    }

    const deleteQuestionnarie = await QuestionnariesModel.findByIdAndDelete(
      questionnaireId
    );

    //Si el cuestionario no existe.
    if (!deleteQuestionnarie) {
      res.status(400).json({
        msg: "El cuestionario no existe.",
      });
      return;
    }

    const token = jwt.sign(JSON.stringify(deleteQuestionnarie), "Mazapán");

    res.status(200).json({
      msg: "El cuestionario ha sido eliminado.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al momento de eliminar el cuestionario.",
    });
  }
};

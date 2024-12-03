import { Request, Response } from "express";
import mongoose from "mongoose";
import { QuestionnariesModel } from "../Models/QuestionnariesModel";
import { QuestionsModel } from "../Models/QuestionsModel";
import jwt from "jsonwebtoken";

export const createQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, type, isMandatory, questionnaireId } = req.body;

    if (
      !title ||
      !type ||
      typeof isMandatory !== "boolean" ||
      !questionnaireId
    ) {
      res.status(400).json({
        msg: "Complete los campos para crear la pregunta.",
      });
      return;
    }

    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(questionnaireId)) {
      res.status(400).json({
        msg: "El cuestionario no es válido.",
      });
      return;
    }

    const questionnaire = await QuestionnariesModel.findById(questionnaireId);
    if (!questionnaire) {
      res.status(400).json({
        msg: "El cuestionario no existe",
      });
      return;
    }

    const question = await QuestionsModel.create({
      title,
      type,
      isMandatory,
      questionnaireId,
    });

    const token = jwt.sign(JSON.stringify(question), "Ubuntu");

    res.status(200).json({
      msg: "La pregunta ha sido creada.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal con la creación de la pregunta.",
    });
  }
};

export const updateQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { questionId, title, type, isMandatory } = req.body;

    if (
      !questionId ||
      !title ||
      !type ||
      typeof isMandatory !== "boolean"
    ) {
      res.status(400).json({
        msg: "Complete los campos para actualizar la pregunta.",
      });
      return;
    }
    

    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(questionId)) {
      res.status(400).json({
        msg: "La pregunta no es válida.",
      });
      return;
    }

    const updateQuestion = await QuestionsModel.findByIdAndUpdate(questionId, {
      title,
      type,
      isMandatory,
    });

    if(!questionId) {
      res.status(400).json({
        msg: "La pregunta no existe"
      })
    }

    const token = jwt.sign(JSON.stringify(updateQuestion), "Fritos de Chorizo");

    res.status(200).json({
      msg: "La pregunta fue actualizada",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al momento de actualizar la pregunta.",
    });
  }
};

export const deleteQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { questionId } = req.body;
    const ObjectId = mongoose.Types.ObjectId;

    if(!questionId) {
      res.status(400).json({
        msg: "Ingresa la pregunta a eliminar."
      })
    }

    if (!ObjectId.isValid(questionId)) {
      res.status(400).json({
        msg: "Hay un error con el id de la pregunta.",
      });
      return;
    }

    const deleteQuestion = await QuestionsModel.findByIdAndDelete(questionId);

    if (!deleteQuestion) {
      res.status(400).json({
        msg: "La pregunta no existe",
      });
      return;
    }

    const token = jwt.sign(JSON.stringify(deleteQuestion), "Edson Puch");

    res.status(200).json({
      msg: "La pregunta ha sido borrada.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al eliminar la pregunta.",
    });
  }
};

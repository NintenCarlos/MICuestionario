import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { QuestionsModel } from "../Models/QuestionsModel";
import { OptionsModel } from "../Models/OptionsModel";

export const createOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, questionId } = req.body;

    if (!title || !questionId) {
      res.status(400).json({
        msg: "Completa todos los campos.",
      });
      return;
    }

    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(questionId)) {
      res.status(400).json({
        msg: "El id de la pregunta no es válido.",
      });
      return;
    }

    const question = await QuestionsModel.findById(questionId);

    if (!question) {
      res.status(400).json({
        msg: "La pregunta no existe.",
      });
      return;
    }

    const option = await OptionsModel.create({
      title,
      questionId,
    });

    const token = jwt.sign(JSON.stringify(option), "Yoshi :D");

    res.status(200).json({
      msg: "La opción fue creada",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al momento de crear la opción.",
    });
  }
};

export const updateOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, optionId } = req.body;

    if (!title || !optionId) {
      res.status(400).json({
        msg: "Completa los datos para actualizar las opciones.",
      });
      return
    }

    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(optionId)) {
      res.status(400).json({
        msg: "La opción no es válida.",
      });
      return
    }

    const updateOption = await OptionsModel.findByIdAndUpdate(optionId, {
      title,
    });

    if (!updateOption) {
      res.status(400).json({
        msg: "La opción no existe",
      });
      return
    }

    const token = jwt.sign(JSON.stringify(updateOption), "Pescuezos de Pollo");

    res.status(200).json({
      msg: "La opción ha sido actualizada.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al actualizar la opción.",
    });
  }
};

export const deleteOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { optionId } = req.body;

    if (!optionId) {
      res.status(400).json({
        msg: "Ingresa la opción a borrar.",
      });
    }

    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(optionId)) {
      res.status(400).json({
        msg: "La opción no es válida.",
      });
    }

    const deleteOption = await OptionsModel.findByIdAndDelete(optionId);

    if (!deleteOption) {
      res.status(400).json({
        msg: "La opción no existe.",
      });
    }

    const token = jwt.sign(JSON.stringify(deleteOption), "Rieleros");

    res.status(200).json({
      msg: "La opción se ha eliminado.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al eliminar la opción.",
    });
  }
};

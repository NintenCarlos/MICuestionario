import { Request, Response } from "express";
import { IQuestionnarie } from "../GlobalTypes";
import { QuestionsModel } from "../Models/QuestionsModel";
import { OptionsModel } from "../Models/OptionsModel";
import { QuestionnairesModel } from "../Models/QuestionnariesModel";


export const createQuizz = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (!body.description || !body.title || !body.userId) {
            res.status(400).json({ msg: "Faltan datos para crear un cuestionario" })
        }
        const questionnaire: IQuestionnarie = {
            description: body.description,
            title: body.title,
            userId: body.userId
        }

        let isInvalidQuestion = false;
        for (const question of body.questions) {
            if (!question.title || !question.type || typeof question.isMandatory == "undefined") {
                isInvalidQuestion = true;
            }
            if (question.options.length <= 0 || !question.options[0] || question.options[0].length <= 0) {
                isInvalidQuestion = true
            }
        }

        if (isInvalidQuestion) {
            res.status(400).json({ msg: "Faltan datos para crear un cuestionario (en preguntas)" })
            return
        }
        const createdQuestionnaire = await QuestionnairesModel.create(questionnaire);
        for (const question of body.questions) {
            const objQuestion = {
                title: question.title,
                type: question.type,
                isMandatory: question.isMandatory,
                questionnaireId: createdQuestionnaire._id
            };
            const createdQuestion = await QuestionsModel.create(objQuestion);
            for (const option of question.options) {
                const objOption = {
                    title: option,
                    questionId: createdQuestion._id
                }
                await OptionsModel.create(objOption);
            }
        }
        res.status(200).json({ msg: "Cuestionario creado con exito" })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error al crear el cuestionario" })
        return
    }
}
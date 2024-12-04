import { Schema, model } from "mongoose";
import { IQuestionnarie } from "../GlobalTypes";

const QuestionnarieSchema = new Schema<IQuestionnarie>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

export const QuestionnairesModel = model('questionnaries', QuestionnarieSchema)
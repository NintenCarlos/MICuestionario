import { Schema, model } from "mongoose";

interface IQuestionnarie {
  title: string;
  description: string;
  userId: Schema.Types.ObjectId;
}

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

export const QuestionnariesModel = model('questionnaries', QuestionnarieSchema)

import { Schema, model } from "mongoose";
import { IAnswer } from "../GlobalTypes";


const AnswerSchema = new Schema<IAnswer>({
  questionnarieId: {
    type: Schema.Types.ObjectId,
    ref: "questionnaries",
    required: true,
  },

  questionId: {
    type: Schema.Types.ObjectId,
    ref: "questions",
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
});

export const AnswerModel = model("answers", AnswerSchema);

import { Schema, model } from "mongoose";
import { IQuestion } from "../GlobalTypes";

const QuestionsSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["radio", "checkbox", "select", "text"],
    required: true,
  },

  isMandatory: {
    type: Boolean,
    required: true,
  },
  questionnarieId: {
    type: Schema.Types.ObjectId,
    ref: "questionnaries",
    required: true,
  },
});

export const QuestionsModel = model("questions", QuestionsSchema);

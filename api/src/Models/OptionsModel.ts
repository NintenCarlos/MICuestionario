import { Schema, model } from "mongoose";

interface IOptions {
  title: string;
  questionId: Schema.Types.ObjectId
}

const OptionsSchema = new Schema<IOptions>({
  title: {
    type: String,
    required: true,
  },

  questionId: {
    type: Schema.Types.ObjectId,
    ref: "questions",
    required: true,
  },
});

export const OptionsModel = model('options', OptionsSchema)
import { Schema } from "mongoose";

export interface IAnswer {
    questionnarieId: Schema.Types.ObjectId | string;
    questionId: Schema.Types.ObjectId | string;
    answer: string;
  }

export interface IOptions {
    title: string
    questionId: Schema.Types.ObjectId | string
  }

export interface IQuestion {
    title: string;
    type: "radio" | "checkbox" | "select" | "text";
    isMandatory: boolean;
    questionnaireId: Schema.Types.ObjectId;
  }

export interface IUsers {
    name: string;
    email: string;
    lastNames: string;
    password: string;
    rol: "administrator" | "client";
  }

export interface IQuestionnarie {
    title: string;
    description: string;
    userId: Schema.Types.ObjectId;
  }

  export interface Request{
    user?: {
        _id: string
    }
}
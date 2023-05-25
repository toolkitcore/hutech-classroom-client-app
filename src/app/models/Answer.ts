import Entity, { Auditable } from "../common/models/Entity";
import Profile from "../common/models/Profile";
import { Exercise } from "./Exercise";

export interface Answer extends Entity, Auditable {
    id: string;
    createDate: Date;
    description: string;
    link: string;
    score: number;
    user?: Profile;
    exercise?: Exercise;
}

export class Answer implements Answer {
    id = "";
    createDate = new Date();
    description = "";
    link = "";
    score = 0;
    user?: Profile = undefined;
    exercise?: Exercise = undefined;

    constructor(init?: AnswerFormValues) {
        Object.assign(this, init);
    }
}

export class AnswerFormValues {
    id?: string;
    description: string = "";
    link: string = "";
    score: number = 0;
    userName?: string;
    exerciseId?: string;
    createDate: Date = new Date();

    constructor(answer?: Answer) {
        if (answer) {
            const { user, exercise, ...rest } = answer;
            Object.assign(this, { ...rest });
        }
    }
}
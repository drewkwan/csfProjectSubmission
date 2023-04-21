export interface Category {
    value: string;
    viewValue: string;
}

export interface Question {
    category: string;
    correctAnswer: string;
    difficulty: string;
    id: string;
    incorrectAnswers: string[];
    question: string;
}

export interface CustomQuestion {
    correctAnswer: string;
    incorrectAnswers: string[];
    question: string;
}

export interface CustomQuiz {
    id: string;
    questions: CustomQuestion[];
}

export interface UserData {
    username: string;
    password: string;
    arcadeHighscore: number;
    triviaHighscore: number;
    trivialHighscoreCategory: string;

}
export interface LoginData {
    username: string;
    password:string;
}

export interface UserToken {
    accessToken: string;
}

export interface User {
    exp: number;
    iat: number;
    sub: string;
    token?: string;
}

export interface Score {
    username: string;
    category: string;
    score: number;
    ranking: number;
}
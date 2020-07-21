export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export interface Question  {
    category: string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}

export type QuestionState = Question &  { answers: string[] }



export const fetchQUizQuestions = async (amount:number, difficulty:Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`;

    const res = await fetch(endpoint);
    const data = await res.json();
    return data.results.map((question:Question) => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answers]
    }));
    
}
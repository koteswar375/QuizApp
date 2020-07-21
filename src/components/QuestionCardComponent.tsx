import React from 'react';
import {AnswerObject} from '../App';

type Props = {
    question:string,
    answers:string[],
    callback:(e:React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer:AnswerObject | undefined,
    questionNr:number,
    totalQuestions:number
}

const QuestionCard:React.FC<Props> = ({question,answers,callback,userAnswer,questionNr,totalQuestions}) => (
<div>
    <p className="questionno">
        Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html:question}}></p>
    <div>
        {answers && answers.map((answer) => (
            <div key={answer}>
                <button disabled={!!userAnswer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html:answer}}></span>
                </button>
            </div>
        ))}
    </div>
</div>
);

export default QuestionCard;

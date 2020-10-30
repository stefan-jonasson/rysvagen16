import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { QuestionResult } from "./From";
import { useQuizzStorage } from "./localstorage";
import Router from 'next/router'

export interface QuestionFromProps {
  id: string;
  number: number;
  text: string;
  questions: {
    "1": string;
    x: string;
    "2": string;
  };
}

export const QuestionFrom: React.FC<QuestionFromProps> = (props) => {
  const [formInfo, submitForm] = useQuizzStorage("quiz");
  const [answer, setAnswer] = useState(undefined);
  const currentAnswer = formInfo.results.find((r) => r.number === props.number);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitForm((oldQuizz) => {
        const newAnswer: QuestionResult = { number: props.number, answer, submitted: true };
        const results = !currentAnswer
          ? oldQuizz.results.concat([newAnswer])
          : oldQuizz.results.map((res) => {
              if (res.number === props.number) {
                return { number: props.number, answer, submitted: true };
              }
              return res;
            });
        return {
          ...oldQuizz,
          finished: results.every((ans) => ans.submitted),
          results,
        };
      });
    },
    [answer, currentAnswer]
  );
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAnswer(event.target.value as any);
    },
    [setAnswer]
  );
    
  const finished = formInfo.finished; 

    useEffect(() => {
      if (finished) {
        Router.push("/finish")
      }
    }, [finished, Router])
  if (currentAnswer?.submitted) {
    return (
      <>
        <p>Du har svarat alternativ {answer}.</p>
        <p>{!formInfo.finished ? "Leta upp nästa QR fråga!" : "Rundan är slut!"}</p>        
      </>
    );
  }
  return (
    <form className={styles.signup} onSubmit={handleSubmit}>
      <p>{props.text}</p>
      <pre>{JSON.stringify(formInfo, null, 2)}</pre>
      <div className={styles.check}>
        <label>
          <input type="radio" name="answer" value="1" checked={answer === "1"} onChange={handleChange} />
          {props.questions["1"]}
        </label>
      </div>

      <div className={styles.check}>
        <label>
          <input type="radio" name="answer" value="x" checked={answer === "x"} onChange={handleChange} />
          {props.questions["x"]}
        </label>
      </div>

      <div className={styles.check}>
        <label>
          <input type="radio" name="answer" value="2" checked={answer === "2"} onChange={handleChange} />
          {props.questions["2"]}
        </label>
      </div>
      <button type="submit">Spara</button>
      
    </form>
  );
};

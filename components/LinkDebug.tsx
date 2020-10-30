import { questions } from "../questions";
import { useQuizzStorage } from "./localstorage";

export const LinkDebug = () => {
  const [formInfo, submitForm] = useQuizzStorage("quiz");

  return (
    <ul>
      {questions
        .filter((q) => !formInfo.results.find((r) => r.number == q.number).submitted)
        .map((q) => (
          <li>
            <a href={`https://rysvagen16.vercel.app/question/${q.id}`}>{`https://rysvagen16.vercel.app/question/${q.id}`}</a>
          </li>
        ))}
    </ul>
  );
};

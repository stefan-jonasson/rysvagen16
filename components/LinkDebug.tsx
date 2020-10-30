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
            <a href={`http://localhost:3000/question/${q.id}`}>{`http://localhost:3000/question/${q.id}`}</a>
          </li>
        ))}
    </ul>
  );
};

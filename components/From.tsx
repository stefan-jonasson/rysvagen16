import { FormEvent, useCallback, useState } from "react";
import styles from "../styles/Home.module.css";
import { useQuizzStorage } from "./localstorage";
import { Scanner } from "./Scanner";

export interface QuestionResult {
  number: number;
  answer?: "1" | "x" | "2";
  submitted?: boolean;
}

export interface QuizResult {
  finished: boolean;
  registered: boolean;
  name: string;
  email: string;
  phone: string;
  results: QuestionResult[];
}

export const From: React.FC = () => {
  const [formInfo, submitForm] = useQuizzStorage("quiz");
  const [name, setName] = useState(formInfo.name);
  const [email, setEmail] = useState(formInfo.email);
  const [phone, setPhone] = useState(formInfo.phone);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitForm((oldVal) => ({ ...oldVal, registered: true, name, email }));
    },
    [name, email, submitForm]
  );
  const handleLogout = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitForm(undefined);
    },
    [submitForm]
  );
  if (formInfo.registered) {
    return (
      <form className={styles.signup} onSubmit={handleLogout}>
        <p>
          Inloggad som {name}!
        </p>
        <p>Rundan börjar vid kistlocket!</p>
        <p>Sätt igång att scanna QR-koder! </p>
        <Scanner />
        <button className={styles.button} type="submit">Logga ut<br/>(Nollställer alla frågor)</button>
      </form>
    );
  }
  return (
    <form className={styles.signup} onSubmit={handleSubmit}>
      <p>Börja genom att ange ditt namn (eller lagets nanm om ni är flera).</p>

      <p>
        <label htmlFor="name">Namn</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </p>
      <p>
        <label htmlFor="email">E-post</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      </p>
      <p>
        <label htmlFor="phone">Telefon</label>
        <input id="phone" type="phone" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} />
      </p>
      <button className={styles.button} type="submit">Spara</button>
    </form>
  );
};

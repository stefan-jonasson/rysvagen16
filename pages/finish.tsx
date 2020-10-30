import Head from "next/head";
import React, { useEffect, useState } from "react";
import { From, QuizResult } from "../components/From";
import Link from "next/link";
import { useQuizzStorage } from "../components/localstorage";
import styles from "../styles/Home.module.css";

const SendResult = (result: QuizResult) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return fetch("https://13399f4919ce11030d177b56cf8f7f60.m.pipedream.net", {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(result),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error("[error] " + err.message);
    });
};

export default function Finish() {
  const [quizz, setState] = useQuizzStorage("quiz");
  const [state, setPostState] = useState<"idle" | "posting" | "done" | "error">("idle");
  const [errorState, setErrorState] = useState<Error | undefined>();

  useEffect(() => {
    if (quizz.finished) {
      setPostState("posting");
      // Send quizz result and reset state!
      SendResult(quizz)
        .then(() => {
          setState(undefined);
          setPostState("done");
        })
        .catch((err) => {
          setPostState("error");
          setErrorState(err);
        });
    }
  }, [quizz]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rysvägen 16 - Spökrunda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Välkommen till RYSVÄGEN 16</h1>
        <div className={styles.block}>
          <p>Du har nu slutfört spökrundan!!</p>
          {errorState && <div className={styles.error}>{errorState.message}</div>}
          <p> Bra jobbat!</p>
          <Link href="/">
            <button className={styles.button}>Börja om!</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

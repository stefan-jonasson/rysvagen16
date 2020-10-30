import Head from "next/head";
import React from "react";
import { QuestionFrom } from "../../../components/QuestionFrom";
import styles from "../../../styles/Home.module.css";
import { questions } from "../../../questions";
import { useRouter } from "next/router";

export default function QuestionPage() {
  const router = useRouter();
  const { key } = router.query;
  const question = questions.find((q) => q.id === (key as string));

  if (!question) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Fel!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Fel!</h1>
          <div className={styles.container}>Felaktig nyckel! Skanna en QR-kod för att fortsätta!</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fråga {question.number}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fråga {question.number}</h1>

        <div className={styles.block}>
          <QuestionFrom {...question} key={question.number} />
        </div>
        
      </main>
    </div>
  );
}

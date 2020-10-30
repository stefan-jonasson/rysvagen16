import { Dispatch, SetStateAction, useState } from "react";
import { QuizResult } from "./From";
import { questions } from "../questions";

export function useQuizzStorage(key: string): [QuizResult, Dispatch<SetStateAction<QuizResult | undefined>>] {
  const initialValue = {
    finished: false,
    registered: false,
    name: "",
    email: "",
    phone: "",
    results: questions.map((q) => ({ number: q.number, submitted: false })),
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<QuizResult>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<QuizResult | undefined>> = (
    value: QuizResult | undefined | ((val: QuizResult) => QuizResult)
  ) => {
    try {
      // Allow value to be a function so we have same API as useState
      if (value === undefined) {
        setStoredValue(initialValue);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      } else if (value instanceof Function) {
        const valueToStore = value(storedValue);
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        setStoredValue(value);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {}
  };

  return [storedValue, setValue];
}

import React, { SyntheticEvent, useCallback, useState } from "react";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useTourch } from "./tourch";

const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

export const Scanner: React.FC = () => {
  const [error, setError] = useState("");
  const [supported, enabled, tourch] = useTourch();
  const handleScan = useCallback(
    (info: string) => {
      if (info) {
        if (info === document.location.href) {
          setError("Du är redan på denna fråga, skanna en annan kod!")
        } else {
          Router.push(info);
        }
      }
    },
    [Router]
  );
  const handleTourch = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      tourch(!enabled);
    },
    [tourch, enabled]
  );
  

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <QrReader delay={500} onError={(err) => setError(err)} onScan={handleScan} style={{ width: "100%" }} />
      {supported && <button className={styles.button} onClick={handleTourch}>{enabled ? "Stäng av ":"Sätt på "}Lampa</button>}
    </>
  );
};

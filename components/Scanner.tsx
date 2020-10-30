import React, { useCallback, useState } from "react";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useTourch } from "./tourch";

const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

export const Scanner: React.FC = () => {
  const handleScan = useCallback(
    (info: string) => {
      if (info) {
        Router.push(info);
      }
    },
    [Router]
  );
  const [error, setstate] = useState("");
  const [supported, enabled, tourch] = useTourch();

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      {}
      <QrReader delay={500} onError={(err) => setstate(err)} onScan={handleScan} style={{ width: "100%" }} />
      {supported && <button onClick={() => tourch(!enabled)}>{enabled ? "Stäng av ":"Sätt på "}Lampa</button>}
    </>
  );
};

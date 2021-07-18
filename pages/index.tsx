import { select as d3Select } from "d3-selection";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { generateRandomWalkData } from "../utils/generateRandomWalkData";
import { LineChart } from "../components/LineChart/LineChart";

const width = 500;
const height = 400;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };

export default function Home() {
  const randomWalkData = React.useMemo(() => generateRandomWalkData(), []);
  const [renderCharts, setRenderCharts] = React.useState(false);

  React.useEffect(() => {
    if (!randomWalkData.length) return;
  }, [randomWalkData]);

  React.useEffect(() => {
    setRenderCharts(true);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Temporal Scaling</title>
        <meta name="description" content="Temporal Scaling Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Temporal Scaling</h1>
        {renderCharts ? <LineChart data={randomWalkData} /> : null}
      </main>
    </div>
  );
}

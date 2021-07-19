import { select as d3Select } from "d3-selection";
import Head from "next/head";
import React, { ChangeEvent } from "react";
import styles from "../styles/Home.module.css";
import { generateRandomWalkData } from "../utils/generateRandomWalkData";
import { LineChart } from "../components/LineChart/LineChart";

type MeasurementOption = "1" | "2" | "5" | "10" | "20" | "50" | "100" | "200";

const width = 500;
const height = 400;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const measurementOptions: MeasurementOption[] = [
  "1",
  "2",
  "5",
  "10",
  "20",
  "50",
  "100",
  "200",
];

export default function Home() {
  const [randomWalkData, setRandomWalkData] = React.useState(() =>
    generateRandomWalkData()
  );
  const [selectedMeasurementOption, setSelectedMeasurementOption] =
    React.useState<MeasurementOption>(measurementOptions[0]);
  const [logTenData, setlogTenData] = React.useState(new Map());

  const logTenGraphData = React.useMemo(() => {
    let graphData: { x: number; y: number }[] = [];
    logTenData.forEach(({ logTenRate, logTenDuration }, key) =>
      graphData.push({
        x: logTenDuration,
        y: logTenRate,
      })
    );
    return graphData.sort((a, b) => a.x - b.x);
  }, [logTenData]);

  console.log(logTenGraphData);

  const regenerateData = () => {
    const newData = generateRandomWalkData();
    setRandomWalkData(newData);
    setlogTenData(new Map());
  };

  const handleMeasurementOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMeasurementOption(e.target.value as MeasurementOption);
  };

  React.useEffect(() => {
    if (!logTenData.has(selectedMeasurementOption)) {
      let rates = [];
      for (
        let i = Number(selectedMeasurementOption);
        i < randomWalkData.length;
        i += Number(selectedMeasurementOption)
      ) {
        const prevPointIndex = i - Number(selectedMeasurementOption);
        const prevPoint = randomWalkData[prevPointIndex];
        const currPoint = randomWalkData[i];
        const rate =
          Math.abs(currPoint.y - prevPoint.y) /
          Math.abs(currPoint.x - prevPoint.x);
        rates.push(rate);
      }

      const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;
      const logTenDuration = Math.log10(Number(selectedMeasurementOption));
      const logTenRate = Math.log10(avgRate);

      const newDataPoint = { logTenRate, logTenDuration };
      const newLogTenData = new Map(logTenData);
      newLogTenData.set(selectedMeasurementOption, newDataPoint);
      setlogTenData(newLogTenData);
    }
  }, [selectedMeasurementOption, randomWalkData, logTenData]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Temporal Scaling</title>
        <meta name="description" content="Temporal Scaling Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Temporal Scaling</h1>
        <div className={styles.chartControlContainer}>
          <h2>Chart Controls</h2>
          <div className={styles.chartControlContent}>
            <button onClick={regenerateData}>Generate New Dataset</button>
            <div className={styles.dropdownContainer}>
              <label htmlFor="measurement-options">Ruler length</label>
              <select
                id="measurement-options"
                onChange={handleMeasurementOptionChange}
              >
                {measurementOptions.map((measurementOption) => (
                  <option key={measurementOption}>{measurementOption}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <LineChart data={randomWalkData} />
        <LineChart data={logTenGraphData} />
      </main>
    </div>
  );
}

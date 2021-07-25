import Head from "next/head";
import Image from "next/image";
import React from "react";
import coarseCoastline from "../public/fractal-coastline-100km.png";
import fineCoastline from "../public/fractal-coastline-50km.png";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import ChartSection from "../components/Chart/ChartSection";

// const DynamicChartSection = dynamic(
//   () => import("../components/Chart/ChartSection"),
//   {
//     ssr: false,
//   }
// );

export default function Home() {
  return (
    <>
      <Head>
        <title>Temporal Scaling</title>
        <meta name="description" content="Temporal Scaling Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <article className={styles.article}>
          <h1 className={styles.title}>Temporal Scaling</h1>
          <p>
            Rates are not, in general, independent of the durations over which
            they are measured. In fact, rates are only independent of the
            durations over which they are measured for constant rates, i.e.,
            rates that do not change over time. If I am driving on the highway
            at a particular, constant speed, then we can measure that speed by
            taking any distance that I cover and the time it takes me to cover
            that distance and dividing the distance by the time; in this case,
            it won’t matter which distance, or which time we use, the calculated
            rate will be the same.
          </p>
          <p>
            However, many processes, especially natural processes, do not change
            at a constant rate. For processes with “ups and downs,” the rates at
            which those processes occur will depend on the durations over which
            those rates are measured. This dependence of rates on durations is
            especially important in the historical sciences (like paleontology
            and geology), where processes happen over very long periods of time
            and the data we have on these processes are only at a relatively low
            temporal resolution.
          </p>
          <p>
            In fact, there is a precise relationship between rates and durations
            for non-constant processes: longer durations produce lower rates,
            and shorter durations produce higher rates. To see why this might be
            the case, consider a spatial analogy: the length of a coastline.
            Mandelbrot (1982) famously posed the “coastline paradox” as follows:
            as the “measuring stick” we use to measure a shape like a coastline
            gets smaller, the measured length of the coastline gets bigger. The
            paradox is that this implies that the coastline is infinitely long
            for an infinitesimally small measuring stick!
          </p>
          <p>
            This apparent paradox arises because shapes like coastlines have a
            so-called “fractal dimension” greater than 1 (straight lines have a
            fractal dimension of 1). The length of lines with a fractal
            dimension greater than 1 depend on the length of the “stick” we use
            to measure them, because small “back and forths” on these lines are
            not captured by longer measuring sticks. These “back and forths” are
            analogous to the “ups and downs” of processes like sedimentation;
            the lengths of the lines are analogous to the rates of the
            processes.
          </p>
          <div className={styles.imageContainer}>
            <Image
              src={coarseCoastline}
              alt="A map of the coastline of Great Britain, with measuring sticks of 62 miles in length
            overlaid on the coastline resulting in a coarse (and therefore smaller)
            measurement and leaving out finer details."
              loading="lazy"
              height={347}
              width={180}
            />
            <Image
              src={fineCoastline}
              alt="A second map of the coastline of Great Britain,
             with measuring sticks of 31 miles in length overlaid on the coastline,
             resulting in a more precise (and longer) measurement of the overall length."
              loading="lazy"
              height={347}
              width={180}
            />
          </div>
          <p>
            Two consequences follow from the observation that there is a
            systematic relationship between rates and the durations over which
            they are measured. First, this systematic relationship can be used
            to extrapolate from rates over durations which were used to measure
            the rates to what the rates would have been had we measured them
            over different durations. For example, if we only have rate data at
            1,000-year resolution for some time period in the past, we can
            extrapolate to what the rate would have been if we had data at
            10-year or even 1-year resolution. (The rates over 1-year durations
            will be significantly higher than the rates over 1,000-year
            durations.) This extrapolation procedure is called “temporal
            scaling.”
          </p>
          <p>
            Second, we can use temporal scaling to compare rate data collected
            over different durations. For example, if we have contemporary data
            collected over short durations (annual, decadal, etc.), and
            paleodata collected over longer durations, we can extrapolate from
            the paleodata to get what the rates would have been over the same
            time durations used for the contemporary data.
          </p>
          <p>
            Philip Gingerich (1983, 1984, 1985, 1993, 2001) used the dependence
            of rates on durations to argue against Eldredge and Gould (1972)’s
            theory of punctuated equilibria; Gingerich thought that the patterns
            of stasis interrupted by episodes of rapid change was a consequence
            not of actual biological evolution occurring in that way, but of the
            durations used to measure the rates of evolutionary change. Similar
            insights have been applied to sedimentation (Sadler 1981, 1993),
            mass extinctions (Foote 1994), cultural evolution (Perreault 2012),
            and carbon emissions (Kemp et al. 2015, Gingerich 2019).
          </p>
          <ChartSection />
        </article>
      </main>
    </>
  );
}

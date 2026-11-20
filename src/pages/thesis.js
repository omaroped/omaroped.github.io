import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

// Project showcase for the bachelor thesis. Every number here is taken from the
// submitted thesis (chapters 5 and 6), the evaluation files of the simulation
// batches, or the hardware calibration register. Nothing is estimated.
// The three-cube photos taken by hand after the last mission are deliberately
// NOT used here: only robot results are shown.

const text = { color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem' };
const muted = { color: '#94a3b8', fontSize: '0.92rem' };
const h3 = { fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 12px' };
const grid2 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  alignItems: 'start',
};

function SectionHeader({ pill, title, desc }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionPill}>{pill}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {desc && <p className={styles.sectionDesc}>{desc}</p>}
    </div>
  );
}

function Tags({ items }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <span key={item} className={styles.techTag}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Figure({ src, alt, caption }) {
  const url = useBaseUrl(`/img/thesis/${src}`);
  return (
    <figure style={{ margin: 0 }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={url}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#0f172a',
            display: 'block',
          }}
        />
      </a>
      <figcaption style={{ ...muted, marginTop: '8px', textAlign: 'center' }}>{caption}</figcaption>
    </figure>
  );
}

function Block({ id, alt, pill, title, desc, children }) {
  return (
    <section id={id} className={alt ? styles.sectionAlt : styles.section}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionHeader pill={pill} title={title} desc={desc} />
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <header className={styles.heroBanner} style={{ minHeight: '60vh' }}>
      <div className={styles.glowSpotlight} />
      <div className={styles.heroContent}>
        <div className={styles.statusBadge}>
          <span className={styles.pulseDot} />
          B.Sc. thesis · Hochschule Rhein-Waal, Kleve · submitted October 2026
        </div>
        <h1 className={styles.heroTitle}>A mobile robot that stacks cubes on its own</h1>
        <p className={styles.heroSubtitle}>
          A small tracked base with a 280&nbsp;mm arm drives to a table, finds a cube with its depth camera,
          picks it up, carries it to a second table and stacks it &mdash; three times, without a person in the
          loop. I built the whole pipeline in ROS&nbsp;2, evaluated it in Gazebo, and then moved it onto the
          real robot and measured what the simulation had got wrong.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primaryBtn} href="#pipeline">
            How it works
          </a>
          <a className={styles.secondaryBtn} href="#results">
            Results
          </a>
          <Link className={styles.secondaryBtn} to="/">
            Back to portfolio
          </Link>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>20 / 20</div>
            <div className={styles.statLabel}>simulation runs that stacked all three cubes, with the true pose</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>8.5 mm</div>
            <div className={styles.statLabel}>worst offset of any cube from the one below, over those 20 runs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>7 of 10</div>
            <div className={styles.statLabel}>of the last real-robot missions built a full stack in one start</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Task() {
  return (
    <Block id="task" pill="The task" title="Three cubes, two tables, no help">
      <div style={grid2}>
        <div className={styles.card}>
          <p style={{ ...text, marginTop: 0 }}>
            The robot is an AgileX LIMO PRO tracked base carrying a myCobot 280 six-axis arm, an Orbbec DaBai
            depth camera and a laser scanner, all on an NVIDIA Jetson Orin Nano. It starts in a known map with
            three cubes on one table and nothing on the other.
          </p>
          <p style={text}>
            One mission is: drive to the pick table, find a cube, pick it up, drive to the place table, put the
            cube down &mdash; then do it twice more, each time on top of the last cube. Three cubes, 24.7&nbsp;mm
            each, stacked on a table 130&nbsp;mm high.
          </p>
          <p style={{ ...text, marginBottom: '20px' }}>
            The point of the work was not the stack itself. It was to build the pipeline as separate, measurable
            stages, find out how much error each stage adds, and then see how much of that survives the move
            from simulation to the real robot.
          </p>
          <Tags items={['ROS 2 Humble', 'Nav2', 'MoveIt 2', 'Gazebo Classic', 'OpenCV', 'AprilTag', 'TF2', 'URDF / SRDF', 'Python']} />
        </div>
        <Figure
          src="pick-full-view.jpg"
          alt="The robot at the pick table with its arm reaching down for a cube"
          caption="The whole machine: tracked base, 6-DoF arm, depth camera and compute, all onboard"
        />
      </div>
    </Block>
  );
}

function Constraint() {
  return (
    <Block
      id="constraint"
      alt
      pill="The constraint"
      title="The camera and the arm never see the same place"
      desc="One measurement decided the shape of the whole pipeline."
    >
      <div style={grid2}>
        <div className={styles.card}>
          <p style={{ ...text, marginTop: 0 }}>
            The depth camera returns nothing useful closer than about <strong>0.30&nbsp;m</strong>. The arm,
            measured at grasp height, reaches about <strong>0.24&nbsp;m</strong> in front of the base. Those two
            ranges do not overlap at all.
          </p>
          <p style={text}>
            So the robot can never watch the cube while it grasps it. Visual servoing into the grasp, the obvious
            solution, is physically impossible on this machine. The pipeline has to:
          </p>
          <ul style={{ ...text, paddingLeft: '20px', marginBottom: '20px' }}>
            <li>see the cube from far away and <strong>latch</strong> its position,</li>
            <li>drive the last stretch <strong>blind</strong>, on wheel odometry alone,</li>
            <li>and use the <strong>laser scanner</strong> to check where it actually stopped.</li>
          </ul>
          <p style={{ ...muted, margin: 0 }}>
            Because the arm&apos;s reach sets the limit, only a window of stop distances about 60&nbsp;mm wide
            allows a grasp at all &mdash; and that window gets narrower as the stack gets taller.
          </p>
        </div>
        <Figure
          src="dock-gap.jpg"
          alt="Top view of the robot stopped square against the table with a small gap"
          caption="Docked: the base stops square to the table with roughly 15&ndash;20 mm between bumper and table edge"
        />
      </div>
    </Block>
  );
}

const STAGES = [
  {
    n: '1',
    title: 'Drive to the station',
    body:
      'Nav2 brings the base to a waypoint in front of the table. It got there every time, in simulation and on the robot, but often more than 10° off the station heading — nowhere near good enough for a grasp.',
  },
  {
    n: '2',
    title: 'Turn, centre, square',
    body:
      'Three short corrections after Nav2 fix that: turn to the station heading, shift sideways until the cube is centred, then square the base to the table edge using the laser scan. In the main simulation batch this left the base less than 1° from the station heading on average.',
  },
  {
    n: '3',
    title: 'Find the cube twice',
    body:
      'An HSV colour filter plus the depth image gives the cube pose. The far reading is only used to drive closer, because the real camera’s range error grows with distance; a second reading from close range sets the actual grasp.',
  },
  {
    n: '4',
    title: 'Dock blind',
    body:
      'The last stretch runs on wheel odometry with the camera out of range. A bumper guard built from the laser scan stops the base if anything comes within 72 mm ahead — it fired 4–6 mm before contact in the first trial series.',
  },
  {
    n: '5',
    title: 'Grasp and check',
    body:
      'A top-down grasp planned with MoveIt 2. The gripper has no force sensor, so the grip is verified from the motor readback: 0 means it closed on air, 37 means it is holding a 24.7 mm cube. The value is only read after a 50 mm lift, because it drifts between 39 and 65 while the fingers are still settling.',
  },
  {
    n: '6',
    title: 'Carry and dock on the tag',
    body:
      'The arm folds up and the base drives to the place table, where an AprilTag on the table front gives a dock pose that does not depend on how well the map is localised.',
  },
  {
    n: '7',
    title: 'Hover, then place',
    body:
      'The arm moves to a hover pose above the target first, so the alignment can be checked before the fingers open, then lowers the cube onto the stack and releases.',
  },
];

function Pipeline() {
  return (
    <Block
      id="pipeline"
      pill="Pipeline"
      title="Seven stages, each one measurable"
      desc="Built as separate stages on purpose, so the error of each could be measured against ground truth."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {STAGES.map((s) => (
          <div key={s.n} className={styles.card} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: '999px',
                  padding: '2px 9px',
                  flexShrink: 0,
                }}
              >
                {s.n}
              </span>
              <span style={{ fontWeight: 600, color: '#f8fafc' }}>{s.title}</span>
            </div>
            <p style={{ ...muted, margin: 0, lineHeight: '1.65' }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div style={{ ...grid2, marginBottom: '24px' }}>
        <Figure
          src="dock-table-a.jpg"
          alt="Top view of the robot squared to the pick table with two cubes on it"
          caption="Stage 2: squared to the pick table, before the arm comes down"
        />
        <Figure
          src="pick-centred.jpg"
          alt="The gripper closed on a cube at the pick table"
          caption="Stage 5: the cube sits centred between the fingers"
        />
      </div>
      <div style={grid2}>
        <Figure
          src="carry.jpg"
          alt="The robot driving between the tables with the arm folded up"
          caption="Stage 6: arm folded up, carrying the cube to the place table"
        />
        <Figure
          src="apriltag.jpg"
          alt="The AprilTag on the front of the place table, with cubes stacked on top"
          caption="The AprilTag on the place table, which the robot docks on"
        />
        <Figure
          src="table-b-two-cubes.jpg"
          alt="The arm hovering over the place table before releasing a cube"
          caption="Stage 7: the hover pose above the target, where the alignment is checked before the fingers open"
        />
      </div>
    </Block>
  );
}

const CALIBRATIONS = [
  ['Wheel odometry', 'Over-reported distance by 5.26 %', 'Rubber tracks add about 4.7 mm of rolling radius over the bare 90 mm wheels the firmware assumes. Fixed with a 0.950 command multiplier.'],
  ['Chassis length', 'Collision mesh 28 mm too long', 'The real bumper sits at 0.161 m, not 0.189 m. Correcting it widened the usable docking window from 18 mm to 35 mm.'],
  ['Arm height', 'About 8 mm of droop', 'The arm under-tracks its commanded height at full extension, so every height command carries a +8 mm compensation.'],
  ['Gripper frame', 'Fingertips 52.5 mm below the reported frame', 'The driver reports the wrist flange, not the fingers. Everything downstream was off until this was measured.'],
  ['Camera mount', 'Vendor value 0.180 m, measured 0.112 m', 'Calibrated against tape at a known distance; the remaining error grows with range, so only close readings are trusted for the grasp.'],
  ['Self-collision', 'Joint 2 folded onto the camera', 'Cartesian moves have no collision checking, so a hard limit of J2 > −85° was added. The camera has been clear ever since.'],
  ['Nav2 parameters', 'Vendor file written for ROS 2 Foxy', 'Five breaking changes between versions, and the goal checker was missing entirely. Rewritten for Humble and verified against the live parameters.'],
];

function Calibration() {
  return (
    <Block
      id="calibration"
      alt
      pill="Sim to real"
      title="What the simulation got wrong"
      desc="Every one of these was found by measuring the real robot with a tape measure and a caliper, not by reading code."
    >
      <div className={styles.card} style={{ padding: '8px', overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', margin: 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', color: '#f8fafc', padding: '12px', whiteSpace: 'nowrap' }}>What</th>
              <th style={{ textAlign: 'left', color: '#f8fafc', padding: '12px' }}>The gap</th>
              <th style={{ textAlign: 'left', color: '#f8fafc', padding: '12px' }}>What it took to find and fix</th>
            </tr>
          </thead>
          <tbody>
            {CALIBRATIONS.map(([what, gap, fix]) => (
              <tr key={what} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <td style={{ padding: '12px', color: '#38bdf8', fontWeight: 600, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                  {what}
                </td>
                <td style={{ padding: '12px', color: '#cbd5e1', verticalAlign: 'top' }}>{gap}</td>
                <td style={{ padding: '12px', color: '#94a3b8', verticalAlign: 'top', lineHeight: '1.6' }}>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.card}>
        <h3 style={h3}>One gap went the other way</h3>
        <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
          In Gazebo the grasp constraint kept breaking while the base moved, and cubes were dropped in transport.
          On the real robot that never happened: the readback held at 37 through the whole carry. The worst failure
          mode in simulation turned out to be an artefact of the simulator, not a problem with the robot &mdash;
          which is exactly the kind of thing you only learn by building both.
        </p>
      </div>
    </Block>
  );
}

const RESULTS = [
  ['Gazebo, true pose from the simulator', '20 of 20 runs', 'Wilson 84–100 %. No cube landed more than 8.5 mm from the one below it.'],
  ['Gazebo, AMCL and wheel odometry', '9 of 10 runs', 'Wilson 60–98 %. The one failure was the simulation program crashing, not the pipeline.'],
  ['Real robot, first eight starts', '4 of 8 missions', 'Wilson 22–78 %. Cubes lost after picks that aimed too far, failures to centre, and a stack out of reach.'],
  ['Real robot, last ten missions', '7 of 10 missions', 'Wilson 40–89 %, after the fixes. 28 of the 30 cubes were stacked, two of them after a restart.'],
];

function Results() {
  return (
    <Block
      id="results"
      pill="Results"
      title="What it actually achieved"
      desc="A full mission counts only when all three cubes end up stacked in a single start, with no help."
    >
      <div className={styles.card} style={{ padding: '8px', overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', margin: 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', color: '#f8fafc', padding: '12px' }}>Setup</th>
              <th style={{ textAlign: 'left', color: '#f8fafc', padding: '12px', whiteSpace: 'nowrap' }}>Full stacks</th>
              <th style={{ textAlign: 'left', color: '#f8fafc', padding: '12px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {RESULTS.map(([setup, score, note]) => (
              <tr key={setup} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <td style={{ padding: '12px', color: '#cbd5e1', verticalAlign: 'top' }}>{setup}</td>
                <td style={{ padding: '12px', color: '#38bdf8', fontWeight: 700, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                  {score}
                </td>
                <td style={{ padding: '12px', color: '#94a3b8', verticalAlign: 'top', lineHeight: '1.6' }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ ...grid2, marginBottom: '24px' }}>
        <div className={styles.card}>
          <h3 style={h3}>Every grasp that was attempted held</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            60 of 60 in simulation and 50 of 50 on the real robot. The simulation figure proves less than it looks,
            because a fixed joint holds the cube there and it cannot slip in the fingers &mdash; so the 50 real
            grasps are the number that counts.
          </p>
        </div>
        <Figure
          src="gripper-holding.jpg"
          alt="The gripper holding a blue cube"
          caption="Holding a 24.7 mm cube — confirmed from the motor readback, not from a sensor in the finger"
        />
      </div>

      <div style={grid2}>
        <Figure
          src="place-cube2.jpg"
          alt="The arm placing the second cube on top of the first on the place table"
          caption="Placing the second cube on the first, about 1 mm back from centre"
        />
        <Figure
          src="sim-stack.jpg"
          alt="Gazebo view of the robot in front of the place table with three cubes stacked"
          caption="The same task in Gazebo, with all three cubes stacked"
        />
      </div>
    </Block>
  );
}

function Failures() {
  return (
    <Block
      id="failures"
      alt
      pill="What went wrong"
      title="The failures, and what caused them"
      desc="Each of these cost a mission, and each one points at a different stage."
    >
      <div style={grid2}>
        <div className={styles.card}>
          <h3 style={h3}>Reach runs out as the stack grows</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            Higher up, the arm only reaches about 0.22&nbsp;m. In two missions a lower cube had been placed
            slightly too far back on the table, which put the top of the stack outside that reach and ended the
            mission. In four others the robot simply drove closer and finished the place.
          </p>
        </div>
        <div className={styles.card}>
          <h3 style={h3}>Daylight broke the colour filter</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            In dim light the dark floor passed the HSV test as well and the detector produced 33 blobs, so the
            robot kept switching targets. With the lights on and a stricter filter, the detection was clean. A
            colour threshold tuned in simulation does not transfer to a room with windows.
          </p>
        </div>
        <div className={styles.card}>
          <h3 style={h3}>Picks that aimed too far</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            Early on, some cubes were gripped near their far edge and two of them fell after being placed. The
            hover check pointed at the camera; after the pick aim was moved toward the robot, the fingers sat
            within 4&nbsp;mm of the cube centre in every check that followed.
          </p>
        </div>
        <div className={styles.card}>
          <h3 style={h3}>The base could not always centre</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            Twice the robot gave up before the grasp because it ran out of allowed correction shifts while
            centring on the cube. Raising that limit fixed it &mdash; a navigation setting that only showed up
            as a manipulation failure.
          </p>
        </div>
      </div>
    </Block>
  );
}

function Method() {
  return (
    <Block id="method" pill="How I worked" title="Writing down every number I could not yet prove">
      <div style={grid2}>
        <div className={styles.card}>
          <p style={{ ...text, marginTop: 0 }}>
            Early in the project I kept hitting constants that nobody, including me, could justify &mdash; a
            threshold someone had tuned by hand, a reach figure copied from a spec sheet, a camera offset from a
            vendor file. So I started a register: every value the pipeline depends on, where it comes from,
            whether it is measured or assumed, and the exact test that would settle it.
          </p>
          <p style={{ ...text, marginBottom: '20px' }}>
            It found real errors. One frame height had been back-derived from a camera reading that was itself
            biased, and was 4&nbsp;mm wrong until it was measured directly. Two of my own documents disagreed
            about which laser scanner was on the robot. The register is the reason the error model in the thesis
            traces to measurements instead of to guesses.
          </p>
          <Tags items={['Measurement first', 'Ground-truth comparison', 'Wilson confidence intervals', 'Error budgeting', 'Honest reporting']} />
        </div>
        <Figure
          src="lab-overview.jpg"
          alt="The lab arena: two tables on a taped floor sheet with the robot at the far table"
          caption="Every run was measured against the tape marks on the floor and the true poses from the simulator"
        />
      </div>
    </Block>
  );
}

function Takeaways() {
  return (
    <Block id="takeaways" alt pill="Takeaways" title="What I took away">
      <div style={grid2}>
        <div className={styles.card}>
          <h3 style={h3}>The main lesson</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            A pipeline that works in simulation is no proof that it works on the robot. Several values in my
            simulation model were simply wrong, and the real sensors had errors the simulation does not contain
            at all. The simulation could never have shown me those &mdash; I only found them by measuring the
            real robot, stage by stage.
          </p>
        </div>
        <div className={styles.card}>
          <h3 style={h3}>Technical</h3>
          <ul style={{ ...text, paddingLeft: '20px', margin: 0 }}>
            <li>A full ROS 2 stack: navigation, perception, motion planning and the glue between them.</li>
            <li>Reading a physical limit out of a datasheet and letting it drive the architecture.</li>
            <li>Writing a second, separate program for the real robot, because the simulation one used ground truth only the simulator has.</li>
            <li>Reporting a 7-of-10 result as 7 of 10, with its confidence interval.</li>
          </ul>
        </div>
      </div>
      <p style={{ ...muted, textAlign: 'center', marginTop: '32px', marginBottom: 0 }}>
        The code is in a private repository: it contains university lab material and vendor code under several
        licences. Happy to walk through it.
      </p>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Link className={styles.primaryBtn} to="/#contact">
          Get in touch
        </Link>
      </div>
    </Block>
  );
}

export default function Thesis() {
  return (
    <Layout
      title="Autonomous mobile manipulation"
      description="Bachelor thesis: an autonomous pick-and-place and stacking pipeline on an AgileX LIMO PRO base with a myCobot 280 arm, built in ROS 2, evaluated in Gazebo and transferred to the real robot."
    >
      <Hero />
      <main>
        <Task />
        <Constraint />
        <Pipeline />
        <Calibration />
        <Results />
        <Failures />
        <Method />
        <Takeaways />
      </main>
    </Layout>
  );
}

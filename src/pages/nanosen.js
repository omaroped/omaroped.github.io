import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

// Project showcase for the NanoSen practical semester. Every statement is
// backed by the internship report, the app documentation or the firmware
// source in ../../../documents/internship_nanosen. No company code is shown.

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
  const url = useBaseUrl(`/img/nanosen/${src}`);
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
            background: '#fff',
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
          Practical semester · NanoSen GmbH, Chemnitz · Sep 2025 – Jan 2026
        </div>
        <h1 className={styles.heroTitle}>Smart insole: from sensor to screen</h1>
        <p className={styles.heroSubtitle}>
          NanoSen builds force-sensing insoles for medical use. Over five months I worked on the whole chain:
          a hand-built wireless prototype, ESP32 firmware in C, and a Python desktop app that shows foot
          pressure live in 2D and 3D.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primaryBtn} href="#hardware">
            See the hardware
          </a>
          <a className={styles.secondaryBtn} href="#app">
            See the app
          </a>
          <Link className={styles.secondaryBtn} to="/#experience">
            Back to portfolio
          </Link>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>10× faster heatmap</div>
            <div className={styles.statLabel}>about 50 ms down to about 5 ms per frame with NumPy</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>Under 50 ms</div>
            <div className={styles.statLabel}>click response after profiling, down from 100–200 ms</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>3 layers</div>
            <div className={styles.statLabel}>hardware, C firmware and Python app, all hands-on</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Overview() {
  return (
    <Block id="overview" pill="Overview" title="How the system fits together">
      <div style={grid2}>
        <div className={styles.card}>
          <p style={{ ...text, marginTop: 0 }}>
            Force sensors in the insole are read by NanoSen&apos;s sensor board. The board sends the values
            over I2C to a small ESP32 microcontroller, which passes them on to a computer by USB cable or
            over Wi-Fi. On the computer, my app turns the numbers into a live picture of where the foot is
            pressing.
          </p>
          <p style={{ ...text, marginBottom: '20px' }}>
            When I started, the team had a set of separate test scripts. I turned them into one modular
            application (version 1.6), packaged as a release with documentation.
          </p>
          <Tags items={['System design', 'Embedded', 'Data pipeline', 'Desktop app']} />
        </div>
        <Figure
          src="system-overview.jpg"
          alt="Block diagram: insole sensors, NanoSen board, ESP32, PC application"
          caption="System overview: sensors → sensor board → ESP32 → PC"
        />
      </div>
    </Block>
  );
}

function Hardware() {
  return (
    <Block
      id="hardware"
      alt
      pill="Hardware"
      title="Building the prototype by hand"
      desc="Sensor placement, wiring and soldering, then making it wireless with a battery."
    >
      <div style={{ ...grid2, marginBottom: '32px' }}>
        <Figure src="insole-sensors.jpg" alt="Insole with force sensors" caption="Insole with the force sensors" />
        <Figure src="insole-placement.jpg" alt="Planning the sensor positions on the insole" caption="Planning where each sensor goes" />
        <Figure src="insole-wiring.jpg" alt="Hand-soldered wiring of the insole" caption="Hand-soldered wiring" />
        <Figure src="prototype-wireless.jpg" alt="Wireless prototype with ESP32 and LiPo battery" caption="Wireless prototype: ESP32 and LiPo battery" />
      </div>
      <div className={styles.card}>
        <h3 style={h3}>Finding the right microcontroller</h3>
        <p style={{ ...text, marginTop: 0 }}>
          The path to a working wireless link was not straight, and I learned the most from it:
        </p>
        <ul style={{ ...text, paddingLeft: '20px', marginBottom: '20px' }}>
          <li>
            <strong>ESP8266, attempt 1 and 2:</strong> one board was lost to a short circuit, the next to a
            5 V / 3.3 V voltage mismatch. Lesson: check logic levels and power rails before connecting
            anything.
          </li>
          <li>
            <strong>Arduino Mega with an ESP8266:</strong> worked only in part.
          </li>
          <li>
            <strong>Seeed XIAO ESP32:</strong> the final choice. Small, with a hardware I2C peripheral and
            Wi-Fi on one chip, running from a LiPo battery.
          </li>
        </ul>
        <Tags items={['Soldering', 'Prototyping', 'Debugging hardware', 'Power and logic levels', 'LiPo battery']} />
      </div>
    </Block>
  );
}

function Firmware() {
  return (
    <Block
      id="firmware"
      pill="Firmware in C"
      title="ESP32 firmware with ESP-IDF"
      desc="Written in C on Espressif's own framework, not the Arduino layer, to get a reliable hardware I2C slave."
    >
      <div style={grid2}>
        <div className={styles.card}>
          <h3 style={h3}>What the firmware does</h3>
          <ul style={{ ...text, paddingLeft: '20px', margin: 0 }}>
            <li>
              Runs as an <strong>I2C slave at address 0x42</strong>. The NanoSen sensor board is the master
              and pushes each new set of readings.
            </li>
            <li>
              Opens its own <strong>Wi-Fi access point</strong> and runs a <strong>TCP server</strong>{' '}
              (lwIP sockets) that streams the data to up to four clients at once.
            </li>
            <li>
              Prints the same data over <strong>USB serial</strong> at the same time, so cable and wireless
              can be used side by side.
            </li>
            <li>
              Built on <strong>FreeRTOS</strong> tasks, with a mutex guarding the shared client list.
            </li>
          </ul>
        </div>
        <div className={styles.card}>
          <h3 style={h3}>Why ESP-IDF</h3>
          <p style={{ ...text, marginTop: 0 }}>
            The sensor board talks I2C as master, so the ESP32 has to listen as a slave. Using the ESP-IDF
            driver directly gave me control over the hardware peripheral, buffers and timing, which the
            first attempts did not have.
          </p>
          <Tags items={['C', 'ESP-IDF', 'FreeRTOS', 'I2C slave', 'Wi-Fi AP', 'TCP / lwIP', 'UART']} />
        </div>
      </div>
    </Block>
  );
}

function Architecture() {
  return (
    <Block
      id="architecture"
      alt
      pill="Software design"
      title="A clean, modular Python app"
      desc="From loose scripts to an event-driven application with separate services."
    >
      <div style={grid2}>
        <Figure
          src="software-architecture.jpg"
          alt="Software architecture diagram of the NanoSen application"
          caption="Software architecture"
        />
        <div className={styles.card}>
          <ul style={{ ...text, paddingLeft: '20px', marginTop: 0, marginBottom: '20px' }}>
            <li>
              Separate services for each job: serial device, Wi-Fi, calibration, data buffer and export.
            </li>
            <li>
              A background thread reads the incoming data and hands it over through callbacks; the GUI is
              updated safely on the main thread.
            </li>
            <li>A fixed-size ring buffer per sensor keeps memory use flat during long recordings.</li>
            <li>Serial and Wi-Fi can run at the same time.</li>
            <li>Data export for later analysis.</li>
          </ul>
          <Tags items={['Python', 'Tkinter', 'Matplotlib', 'NumPy', 'PySerial', 'Threading', 'Event-driven design']} />
        </div>
      </div>
    </Block>
  );
}

function App() {
  return (
    <Block
      id="app"
      pill="The app"
      title="Seeing the pressure live"
      desc="Four views, each solving a different question for the user."
    >
      <div style={{ ...grid2, marginBottom: '32px' }}>
        <div className={styles.card}>
          <h3 style={h3}>Sensor layout editor</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            Drag and drop each sensor onto its real place on the insole, with undo and redo, and save the
            layout as JSON. The insole outline is taken from the image&apos;s transparency, so any insole
            shape can be loaded.
          </p>
        </div>
        <Figure src="app-sensor-layout.jpg" alt="Sensor layout editor in the app" caption="Sensor layout editor" />

        <div className={styles.card}>
          <h3 style={h3}>Force over time</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            Live line plots for every sensor, embedded in the Tkinter window with Matplotlib, so changes in
            load can be followed as they happen.
          </p>
        </div>
        <Figure src="app-force-time.jpg" alt="Live force-over-time plots" caption="Live force-over-time plots" />
      </div>

      <div style={{ ...grid2, marginBottom: '32px' }}>
        <div className={styles.card}>
          <h3 style={h3}>2D pressure heatmap</h3>
          <p style={{ ...text, marginTop: 0 }}>
            The few sensor points are spread into a smooth pressure map with Gaussian radial basis function
            (RBF) interpolation on a 220 × 220 grid, clipped to the insole shape.
          </p>
          <p style={{ ...text, marginBottom: 0 }}>
            The first version was too slow to feel live. Rewriting the maths as vectorised NumPy took it from
            about 50 ms to about 5 ms per frame.
          </p>
        </div>
        <Figure src="app-heatmap.jpg" alt="2D pressure heatmap of the insole" caption="2D pressure heatmap" />

        <div className={styles.card}>
          <h3 style={h3}>3D view</h3>
          <p style={{ ...text, marginTop: 0, marginBottom: 0 }}>
            The insole outline is turned into a triangle mesh (Delaunay triangulation, with triangles outside
            the shape filtered out). Each sensor then pushes the surface down with a Gaussian shape, so you
            can see the foot&apos;s load as a 3D surface that moves in real time.
          </p>
        </div>
        <Figure src="app-3d-mesh.jpg" alt="3D deformation view of the insole" caption="3D deformation view" />
      </div>

      <Tags items={['SciPy', 'NumPy vectorisation', 'RBF interpolation', 'Delaunay triangulation', 'mplot3d', 'Data visualisation']} />
    </Block>
  );
}

function Calibration() {
  return (
    <Block
      id="calibration"
      alt
      pill="Calibration"
      title="From raw values to real force"
      desc="Sensors give raw numbers; calibration turns them into force."
    >
      <div style={grid2}>
        <div className={styles.card}>
          <ul style={{ ...text, paddingLeft: '20px', marginTop: 0, marginBottom: '20px' }}>
            <li>
              Five-parameter logistic (5PL) curve fit with SciPy, a model often used for sensors whose
              response flattens out at high load.
            </li>
            <li>Outliers are removed first with the median absolute deviation (MAD).</li>
            <li>
              The fit starts from several initial guesses with bounded parameters, and falls back to a
              polynomial if the 5PL fit does not converge.
            </li>
          </ul>
          <Tags items={['Curve fitting', 'SciPy optimize', 'Robust statistics', 'Sensor calibration']} />
        </div>
        <Figure src="app-calibration.jpg" alt="Calibration curve fitted to sensor data" caption="Calibration curve" />
      </div>
    </Block>
  );
}

function Performance() {
  return (
    <Block id="performance" pill="Performance" title="Making it feel instant">
      <div className={styles.card}>
        <p style={{ ...text, marginTop: 0 }}>
          I measured before changing anything. Profiling with cProfile showed where the time went, and the
          fixes were targeted:
        </p>
        <ul style={{ ...text, paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Heatmap maths vectorised with NumPy: about 10× faster per frame.</li>
          <li>Click response down from 100–200 ms to under 50 ms.</li>
          <li>About 40 % less CPU use, with an update rate that adapts to the load.</li>
          <li>Data sampled at 30 Hz, screen redrawn at 10 Hz, so the app stays smooth on a normal laptop.</li>
        </ul>
        <Tags items={['Profiling', 'cProfile', 'Optimisation', 'Real-time UI']} />
      </div>
    </Block>
  );
}

function Learned() {
  return (
    <Block id="learned" alt pill="Takeaways" title="What I took away">
      <div style={grid2}>
        <div className={styles.card}>
          <h3 style={h3}>Technical</h3>
          <ul style={{ ...text, paddingLeft: '20px', margin: 0 }}>
            <li>Working across hardware, embedded C and Python in one project.</li>
            <li>Checking voltages and logic levels before wiring.</li>
            <li>Measuring performance first, then optimising.</li>
            <li>Structuring code so others can maintain it.</li>
          </ul>
        </div>
        <div className={styles.card}>
          <h3 style={h3}>Working style</h3>
          <ul style={{ ...text, paddingLeft: '20px', margin: 0 }}>
            <li>Taking a failed attempt apart and finding the real cause.</li>
            <li>Working independently and delivering on time.</li>
            <li>Packaging a release with documentation for the team.</li>
          </ul>
          <p style={{ ...muted, marginTop: '16px', marginBottom: 0 }}>
            Internship certificate: tasks completed &quot;mit gutem Erfolg&quot;.
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link className={styles.primaryBtn} to="/#contact">
          Get in touch
        </Link>
      </div>
    </Block>
  );
}

export default function NanoSen() {
  return (
    <Layout
      title="NanoSen smart insole"
      description="Practical semester at NanoSen GmbH: hand-built wireless insole prototype, ESP32 firmware in C with ESP-IDF, and a Python app with live 2D heatmap and 3D view."
    >
      <Hero />
      <main>
        <Overview />
        <Hardware />
        <Firmware />
        <Architecture />
        <App />
        <Calibration />
        <Performance />
        <Learned />
      </main>
    </Layout>
  );
}

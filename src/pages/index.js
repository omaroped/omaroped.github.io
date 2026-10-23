import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// Every statement on this page is backed by the thesis, the NanoSen
// internship report or the CV in ../../../documents. Keep it that way.

const text = { color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem' };
const muted = { color: '#94a3b8', fontSize: '0.92rem' };
const box = {
  background: 'rgba(2, 6, 23, 0.5)',
  padding: '16px',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
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

function HeroHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Omar Alobaid</h1>
        <p className={styles.heroSubtitle}>
          Final-year Mechatronic Systems Engineering student (B.Sc.) at Hochschule Rhein-Waal, Kleve.
          Bachelor thesis on mobile pick-and-place with ROS 2; practical semester building
          sensor-visualisation software in Python at NanoSen GmbH.
        </p>

        <div className={styles.heroActions}>
          <a className={styles.primaryBtn} href="#thesis">
            Bachelor thesis
          </a>
          <a className={styles.secondaryBtn} href="#experience">
            Experience
          </a>
          <a className={styles.secondaryBtn} href="#contact">
            Contact
          </a>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>11 / 18</div>
            <div className={styles.statLabel}>
              real-robot missions that stacked all three cubes (7 of the last 10, after fixes)
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>29 / 30</div>
            <div className={styles.statLabel}>simulation runs that stacked all three cubes in Gazebo</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>Sep 2025 – Jan 2026</div>
            <div className={styles.statLabel}>practical semester at NanoSen GmbH, Chemnitz</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThesisSection() {
  return (
    <section id="thesis" className={styles.sectionAlt}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader
          pill="Bachelor thesis · submitted October 2026"
          title="Autonomous Mobile Manipulation: Pick-and-Place and Object Stacking on the LIMO Cobot"
          desc="Hochschule Rhein-Waal, Faculty of Technology and Bionics. Supervisors: Prof. Dr. Ronny Hartanto, Thomas Grunenberg, M.Sc."
        />

        <div className={styles.card} style={{ marginBottom: '24px' }}>
          <p style={{ ...text, marginBottom: '16px' }}>
            A myCobot 280 M5 arm is mounted on an AgileX LIMO PRO mobile base. In each mission the robot
            drives to a table, finds a small cube, picks it up, drives to a second table and stacks it,
            three cubes in total. I built the same pipeline in Gazebo simulation and on the real robot
            and compared the two.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={box}>
              <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '6px' }}>Navigation</div>
              <div style={muted}>
                Nav2 brings the base to each table. Laser scans are used to dock against the table; the
                last 0.30 m are driven on wheel odometry.
              </div>
            </div>
            <div style={box}>
              <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '6px' }}>Perception</div>
              <div style={muted}>
                The depth camera with a colour filter locates the cube and gives its position relative to
                the arm.
              </div>
            </div>
            <div style={box}>
              <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '6px' }}>Manipulation</div>
              <div style={muted}>
                MoveIt 2 plans the grasp and place motions. The arm reaches about 0.24 m, which limits
                where the base has to stop.
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <figure style={{ margin: 0 }}>
              <img
                src="/img/limo-side.jpg"
                alt="LIMO PRO with myCobot 280 arm next to the cube table in the lab"
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <figcaption style={{ ...muted, marginTop: '6px' }}>The robot in the HSRW lab.</figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img
                src="/img/limo-stacking.jpg"
                alt="myCobot arm placing a cube on the stacking table"
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <figcaption style={{ ...muted, marginTop: '6px' }}>Placing a cube during a real-robot test.</figcaption>
            </figure>
          </div>

          <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 600 }}>Results</h3>
          <ul style={{ ...text, paddingLeft: '20px' }}>
            <li>
              <strong>Simulation:</strong> 29 of 30 runs stacked all three cubes (20/20 in the main batch,
              9/10 with AMCL localisation). Each cube landed within 8.5 mm of the one below.
            </li>
            <li>
              <strong>Real robot:</strong> 11 of 18 missions stacked all three cubes. Only 4 of the first 8
              worked; after fixing the problems found there, 7 of the last 10 succeeded (28 of 30 cubes
              placed).
            </li>
            <li>
              Every grasp that was attempted held (60/60 in simulation, 50/50 on the robot). Most
              failures came from the arm's reach at the third stack level.
            </li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 600, marginTop: '16px' }}>
            What I learned
          </h3>
          <p style={{ ...text, marginBottom: '20px' }}>
            Near-perfect results in simulation did not carry over directly to the real robot. Position
            errors from the base, small offsets in the camera and the limited reach of a small arm only
            showed up on hardware, and most of the work went into finding and fixing them.
          </p>

          <Tags items={['ROS 2 Humble', 'Nav2', 'MoveIt 2', 'Gazebo', 'Python', 'AgileX LIMO PRO', 'myCobot 280 M5']} />
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader pill="Experience" title="Work and practical experience" />

        <div className={styles.card} style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Practical semester (mandatory internship)
              </h3>
              <div style={{ fontSize: '1.1rem', color: '#38bdf8', fontWeight: 600, marginTop: '2px' }}>
                NanoSen GmbH, Chemnitz
              </div>
            </div>
            <span style={muted}>Sep 2025 – Jan 2026 · full-time</span>
          </div>

          <p style={{ ...text, marginBottom: '12px' }}>
            NanoSen develops force-sensing insoles for medical use. I turned the team's experimental
            Python scripts into a modular desktop application (version 1.6) for viewing the sensor data
            live.
          </p>
          <ul style={{ ...text, paddingLeft: '20px', marginBottom: '20px' }}>
            <li>GUI in Tkinter with embedded Matplotlib plots.</li>
            <li>
              Live 2D pressure heatmap (Gaussian RBF interpolation with SciPy) and a 3D mesh view
              (Delaunay triangulation).
            </li>
            <li>
              Data from ESP32-S3 boards (Seeed XIAO) over serial/UART or Wi-Fi (UDP), with I2C between
              the boards; sampling at 30 Hz, screen updates at 10 Hz.
            </li>
            <li>Sensor calibration with a five-parameter logistic (5PL) curve fit.</li>
            <li>Built an insole prototype by hand, including sensor placement and soldering.</li>
          </ul>
          <p style={{ ...muted, marginBottom: '16px' }}>
            Internship certificate: tasks completed &quot;mit gutem Erfolg&quot;, work done independently and on time.
          </p>
          <Tags items={['Python', 'Tkinter', 'Matplotlib', 'SciPy', 'ESP32', 'I2C / UART']} />
        </div>

        <div className={styles.card}>
          <ul style={{ ...text, paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Peer mentor</strong>, Otto Benecke Stiftung, since July 2024.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Student job</strong>, Jobvally Kleve, 2021 – 2024: logistics, production and office
              work.
            </li>
            <li>
              <strong>Internship</strong>, Engineers for Manufacturing, Hama (Syria), 2017, 4 weeks:
              manufacturing processes and machine maintenance.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: 'Wi-Fi controlled robot',
      desc: 'Raspberry Pi robot controlled from a web page with login. Python for GPIO and the web server.',
    },
    {
      title: 'Timer and data logger (university lab)',
      desc: 'Microcontroller project with 7-segment displays driven over I2C and a logger that stores measurements.',
    },
    {
      title: 'Control systems group project (2024)',
      desc: 'Team of four students: designed and implemented a control system and integrated the components.',
    },
  ];

  return (
    <section className={styles.sectionAlt}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader pill="Projects" title="Smaller university projects" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {projects.map((p) => (
            <div key={p.title} className={styles.card} style={{ padding: '20px' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '6px' }}>{p.title}</div>
              <div style={muted}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skillGroups = [
    { category: 'Programming', skills: ['Python', 'C / C++ (microcontrollers)', 'MATLAB', 'Bash'] },
    { category: 'Robotics', skills: ['ROS 2 Humble', 'Nav2', 'MoveIt 2', 'Gazebo', 'TF2', 'URDF'] },
    { category: 'Embedded & tools', skills: ['ESP32', 'Raspberry Pi', 'I2C / SPI / UART', 'SolidWorks', 'Git', 'Linux'] },
    { category: 'Languages', skills: ['Arabic (native)', 'English (C1)', 'German (B1)'] },
  ];

  return (
    <section id="skills" className={styles.section}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader pill="Skills" title="Tools I have used in projects" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.card} style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 600, marginBottom: '12px' }}>
                {group.category}
              </h3>
              <Tags items={group.skills} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className={styles.sectionAlt}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader pill="Contact" title="Get in touch" desc="Based in Kleve, Germany. CV and certificates on request." />
        <div className={styles.card} style={{ ...text }}>
          <div>
            Email: <a href="mailto:omar.alobaid@hsrw.org">omar.alobaid@hsrw.org</a>
          </div>
          <div>
            GitHub: <a href="https://github.com/omaroped">github.com/omaroped</a>
          </div>
          <div>
            LinkedIn:{' '}
            <a href="https://www.linkedin.com/in/omar-alobaid-28270a185">linkedin.com/in/omar-alobaid-28270a185</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Omar Alobaid | Mechatronic Systems Engineering"
      description="Omar Alobaid: B.Sc. thesis on mobile pick-and-place with ROS 2 (LIMO + myCobot), practical semester at NanoSen GmbH."
    >
      <HeroHeader />
      <main>
        <ThesisSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </Layout>
  );
}

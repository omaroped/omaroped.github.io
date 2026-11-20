import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

// Every statement on this page is backed by the NanoSen
// internship report or the CV in ../../../documents. Keep it that way.

const text = { color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem' };
const muted = { color: '#94a3b8', fontSize: '0.92rem' };

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
          M.Sc. student in Automation, Robotics and Control at TU Chemnitz, with a B.Sc. in Mechatronic
          Systems Engineering from Hochschule Rhein-Waal, Kleve. I build robots and embedded systems and
          then measure whether they actually work: an autonomous mobile manipulator in ROS 2 for my
          bachelor thesis, and a wireless sensing prototype with its own firmware and desktop app at NanoSen.
        </p>

        <div className={styles.heroActions}>
          <Link className={styles.primaryBtn} to="/thesis">
            Bachelor thesis
          </Link>
          <Link className={styles.secondaryBtn} to="/nanosen">
            NanoSen project
          </Link>
          <a className={styles.secondaryBtn} href="#contact">
            Contact
          </a>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>ROS 2 robot</div>
            <div className={styles.statLabel}>navigation, perception and MoveIt 2, on a real mobile manipulator</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>C and Python</div>
            <div className={styles.statLabel}>ESP32 firmware on ESP-IDF and a desktop app for live sensor data</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>Sim to real</div>
            <div className={styles.statLabel}>Gazebo, then the physical robot, measured stage by stage</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThesisSection() {
  const img = useBaseUrl('/img/thesis/carry.jpg');
  return (
    <section id="thesis" className={styles.section}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader
          pill="Bachelor thesis"
          title="Autonomous mobile manipulation"
          desc="Hochschule Rhein-Waal, submitted October 2026. A mobile robot that picks up cubes and stacks them on a second table, on its own."
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <div className={styles.card}>
            <p style={{ ...text, marginTop: 0 }}>
              An AgileX LIMO PRO base with a myCobot 280 arm drives to a table, finds a cube with its depth
              camera, picks it up, carries it to a second table and stacks it &mdash; three times, with nobody
              in the loop. I built the pipeline in ROS 2 with Nav2 and MoveIt 2, evaluated it in Gazebo, then
              moved it onto the real robot.
            </p>
            <p style={{ ...text, marginBottom: '16px' }}>
              The camera sees nothing closer than 0.30 m and the arm reaches only 0.24 m, so the robot can never
              watch the cube while it grasps it. That one measurement shaped the whole design.
            </p>
            <ul style={{ ...muted, paddingLeft: '20px', marginBottom: '20px', lineHeight: '1.8' }}>
              <li>20 of 20 simulation runs stacked all three cubes, none more than 8.5 mm off.</li>
              <li>7 of the last 10 real missions built a full stack in one start.</li>
              <li>Every grasp attempted held: 50 of 50 on the real robot.</li>
            </ul>
            <Tags items={['ROS 2 Humble', 'Nav2', 'MoveIt 2', 'Gazebo', 'OpenCV', 'AprilTag', 'Python']} />
            <div style={{ marginTop: '20px' }}>
              <Link className={styles.primaryBtn} to="/thesis">
                See the full project
              </Link>
            </div>
          </div>
          <Link to="/thesis" style={{ display: 'block' }}>
            <img
              src={img}
              alt="The LIMO PRO robot driving between the tables with a cube held in the myCobot 280 gripper"
              loading="lazy"
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'block',
              }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className={styles.sectionAlt}>
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
              Data from ESP32-S3 boards (Seeed XIAO) over serial/UART or Wi-Fi, with I2C between
              the boards; sampling at 30 Hz, screen updates at 10 Hz.
            </li>
            <li>Sensor calibration with a five-parameter logistic (5PL) curve fit.</li>
            <li>Built an insole prototype by hand, including sensor placement and soldering.</li>
          </ul>
          <p style={{ ...muted, marginBottom: '16px' }}>
            Internship certificate: tasks completed &quot;mit gutem Erfolg&quot;, work done independently and on time.
          </p>
          <Tags items={['Python', 'Tkinter', 'Matplotlib', 'SciPy', 'C / ESP-IDF', 'ESP32', 'I2C / UART']} />
          <div style={{ marginTop: '20px' }}>
            <Link className={styles.primaryBtn} to="/nanosen">
              See the full project
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <ul style={{ ...text, paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Peer mentor</strong>, Otto Benecke Stiftung, since July 2024.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Student job</strong>, Jobvalley Kleve, 2021 – 2024: logistics, production and office
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
    <section id="projects" className={styles.section}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionHeader
          pill="Projects"
          title="Smaller university projects"
          desc="Short course and lab projects alongside the two above. Happy to go into detail on any of them."
        />
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
    <section id="skills" className={styles.sectionAlt}>
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
    <section id="contact" className={styles.section}>
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
      title="Robotics and Embedded Systems"
      description="Omar Alobaid: M.Sc. student in Automation, Robotics and Control at TU Chemnitz. Practical semester at NanoSen GmbH: wireless insole prototype, ESP32 firmware in C, Python app."
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

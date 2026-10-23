import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/**
 * Hero Section - Clean, modern, and human-crafted
 */
function HeroHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className={styles.glowSpotlight}></div>
      <div className={styles.heroContent}>
        {/* Status indicator */}
        <div className={styles.statusBadge}>
          <span className={styles.pulseDot}></span>
          <span>B.Sc. Thesis in Robotics • Available for Engineering Roles</span>
        </div>

        <h1 className={styles.heroTitle}>Omar Mohamed</h1>
        <p className={styles.heroSubtitle}>
          Robotics & Embedded Software Engineer specializing in{' '}
          <strong style={{ color: '#f8fafc', fontWeight: 600 }}>Autonomous Mobile Manipulation</strong>,{' '}
          <strong style={{ color: '#38bdf8', fontWeight: 600 }}>ROS 2</strong>, and high-performance algorithms in C++ and Python.
        </p>

        {/* Action Buttons */}
        <div className={styles.heroActions}>
          <Link className={styles.primaryBtn} to="/docs/intro">
            Read Thesis Research →
          </Link>
          <a className={styles.secondaryBtn} href="#experience">
            Professional Experience
          </a>
          <a className={styles.secondaryBtn} href="#thesis">
            Hardware & Sim Stack
          </a>
        </div>

        {/* Key Highlights */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>AgileX LIMO + myCobot 280</div>
            <div className={styles.statLabel}>
              Mobile pick-and-place & precision cube stacking with AprilTag visual servoing.
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statNumber}>Software Intern @ Nanosen</div>
            <div className={styles.statLabel}>
              Production C++ and Python backend algorithms, optimization, and system testing.
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statNumber}>Sim-to-Real Benchmarking</div>
            <div className={styles.statLabel}>
              Quantitative error comparisons between Gazebo simulation and physical hardware.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Bachelor Thesis Showcase
 */
function ThesisSection() {
  return (
    <section id="thesis" className={styles.sectionAlt}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Bachelor of Science Research</span>
          <h2 className={styles.sectionTitle}>
            Mobile Pick-and-Place & Stacking with AgileX LIMO and myCobot 280
          </h2>
          <p className={styles.sectionDesc}>
            Hochschule Rhein-Waal (2026) • Supervised by Prof. Dr. Ronny Hartanto and M.Sc. Thomas Grunenberg.
          </p>
        </div>

        <div className={styles.card} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                System Overview & Methodology
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0' }}>
                Full autonomous cycle: Navigation, target recognition, grasping, and precision stacking.
              </p>
            </div>
            <span className={styles.techTag}>ROS 2 Humble / Gazebo</span>
          </div>

          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem', marginBottom: '16px' }}>
            The research investigates autonomous mobile manipulation by mounting a 6-DOF <strong>Elephant Robotics myCobot 280 M5</strong> arm onto an <strong>AgileX LIMO PRO</strong> mobile platform. The robot executes an autonomous mission: navigating to Table A, picking three 24.7 mm cubes, transporting them across the workspace to Table B, and stacking them atop an AprilTag landmark.
          </p>

          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem', marginBottom: '24px' }}>
            The pipeline is implemented identically in Gazebo simulation and on physical hardware to rigorously compare stage-by-stage errors across navigation pose accuracy, visual servoing, and arm kinematics.
          </p>

          {/* Sub-cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(2, 6, 23, 0.5)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '6px' }}>Autonomous Navigation</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5' }}>
                Nav2 stack integration for differential drive base, synchronized with custom task management scripts.
              </div>
            </div>

            <div style={{ background: 'rgba(2, 6, 23, 0.5)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '6px' }}>MoveIt 2 Trajectories</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5' }}>
                Configured kinematic solvers and collision avoidance for the 6-DOF myCobot manipulator.
              </div>
            </div>

            <div style={{ background: 'rgba(2, 6, 23, 0.5)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '6px' }}>Perception & Servoing</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5' }}>
                AprilTag pose estimation for Table B alignment paired with table-level cube grasping logic.
              </div>
            </div>
          </div>

          {/* Clean Terminal Box */}
          <div style={{ background: '#020617', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '14px 18px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <div style={{ color: '#64748b', marginBottom: '6px' }}># Launch Gazebo simulation with 3 stacking levels:</div>
            <div style={{ color: '#38bdf8' }}>
              ros2 launch limo_car nav_pick.launch.py place_stack_levels:=3 base_pin_enabled:=false
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Professional Experience Section (Nanosen)
 */
function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Work History</span>
          <h2 className={styles.sectionTitle}>Professional Experience</h2>
          <p className={styles.sectionDesc}>
            Applied software engineering, algorithm implementation, and system-level programming.
          </p>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Software Engineering Intern
              </h3>
              <div style={{ fontSize: '1.15rem', color: '#38bdf8', fontWeight: 600, marginTop: '2px' }}>
                Nanosen
              </div>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 14px', borderRadius: '8px' }}>
              Internship
            </span>
          </div>

          <ul style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '1rem', paddingLeft: '20px', marginBottom: '24px' }}>
            <li style={{ marginBottom: '10px' }}>
              Authored thousands of lines of maintainable, production-ready code in <strong>C++</strong> and <strong>Python</strong> for core software modules.
            </li>
            <li style={{ marginBottom: '10px' }}>
              Implemented and tested complex computational algorithms, solving real engineering challenges with clean mathematical modeling.
            </li>
            <li style={{ marginBottom: '10px' }}>
              Profiled critical code paths, refactored data structures, and reduced computational overhead to optimize system execution speed.
            </li>
            <li>
              Collaborated directly with engineering leads in technical reviews, version control workflows, and structured testing.
            </li>
          </ul>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['C++', 'Python', 'Algorithms', 'Software Architecture', 'Git', 'Linux', 'Code Optimization'].map((item) => (
              <span key={item} className={styles.techTag}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Technical Skills Matrix
 */
function SkillsSection() {
  const skillGroups = [
    {
      category: 'Robotics & Control',
      skills: ['ROS 2 (Humble)', 'MoveIt 2', 'Nav2', 'Gazebo Simulation', 'Kinematics & Planning', 'AprilTag Detection']
    },
    {
      category: 'Software & Languages',
      skills: ['C++ (17/20)', 'Python 3', 'CMake', 'Object-Oriented Design', 'Algorithm Design', 'Data Structures']
    },
    {
      category: 'Hardware & Platforms',
      skills: ['AgileX LIMO PRO', 'myCobot 280 M5', 'Linux (Ubuntu)', 'Docker', 'Git / GitHub', 'Sensor Interfacing']
    }
  ];

  return (
    <section className={styles.sectionAlt}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Capabilities</span>
          <h2 className={styles.sectionTitle}>Technical Expertise</h2>
          <p className={styles.sectionDesc}>
            Tools and engineering domains honed across academic research and professional industry experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {skillGroups.map((group, idx) => (
            <div key={idx} className={styles.card} style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 600, marginBottom: '16px' }}>
                {group.category}
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {group.skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: '#cbd5e1',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Omar Mohamed | Robotics & Embedded Software Engineer"
      description="Portfolio of Omar Mohamed: Autonomous Mobile Manipulation, AgileX LIMO Cobot, ROS 2, and Software Engineering at Nanosen."
    >
      <HeroHeader />
      <ThesisSection />
      <ExperienceSection />
      <SkillsSection />
    </Layout>
  );
}

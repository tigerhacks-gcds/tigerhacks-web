import { useState } from 'react'
import './App.css'

const VIEWS = {
  HOME: 'home',
  REGISTER: 'register',
  RULES: 'rules',
  PRIOR: 'prior',
  RESULTS: 'results',
}

const BASE = import.meta.env.BASE_URL || '/'
const PHOTOS = [
  `${BASE}photos/photo1.jpg`,
  `${BASE}photos/photo2.jpg`,
  `${BASE}photos/photo3.jpg`,
  `${BASE}photos/photo4.jpg`,
  `${BASE}photos/photo5.jpg`,
  `${BASE}photos/photo6.jpg`,
  `${BASE}photos/photo7.jpg`,
  `${BASE}photos/photo8.jpg`,
]

const TIGER_ICON = `${BASE}photos/tiger.png`

const CURRENT_TEAM = [
  'Henry Santangelo',
  'Zachary Bostock',
  'Charlie Moloney',
  'Irhan Iftikar',
  'Katie Benincasa',
  'Julian Toub',
  'Asher Rosen',
]

const ALUMNI_TEAM = [
  'Imran Iftikar',
  'Abraham Milgram',
  'Harrison Servedio',
  'Andy Pauley',
]

const FACULTY_TEAM = [
  'Gordie Campbell',
  'Doug Melilo',
  'Leon Martinez',
  'Dr. Gregory Stein',
  'Regi Parron',
]

function Header({ currentView, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = (view) => {
    onNavigate(view)
    setMobileOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <img className="brand-icon" src={TIGER_ICON} alt="TigerHacks" aria-hidden="true" />
          <span className="brand-title">TigerHacks</span>
          <span className="brand-subtitle">2025</span>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>

        <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
          <button
            className={`nav-link ${currentView === VIEWS.HOME ? 'active' : ''}`}
            onClick={() => go(VIEWS.HOME)}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === VIEWS.PRIOR ? 'active' : ''}`}
            onClick={() => go(VIEWS.PRIOR)}
          >
            Prior Questions
          </button>
          <button
            className={`nav-link ${currentView === VIEWS.RESULTS ? 'active' : ''}`}
            onClick={() => go(VIEWS.RESULTS)}
          >
            Results
          </button>
          <button
            className={`nav-link ${currentView === VIEWS.RULES ? 'active' : ''}`}
            onClick={() => go(VIEWS.RULES)}
          >
            Rules
          </button>
          <button
            className={`nav-link cta-button ${currentView === VIEWS.REGISTER ? 'active' : ''}`}
            onClick={() => go(VIEWS.REGISTER)}
          >
            Registration
          </button>
        </nav>
      </div>
    </header>
  )
}

function HomeView({ onRegister }) {
  return (
    <main className="container main">
      <section className="hero">
        <h1>
          TigerHacks <span className="fun-accent">2025</span>
        </h1>
        <p className="tagline">A high-school coding competition, by high-schoolers.</p>
        <div className="event-meta">
          <div className="meta-item">
            <span className="meta-label">Date</span>
            <span className="meta-value">Saturday, November 15, 2025</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Location</span>
            <span className="meta-value">257 Stanwich Road, Greenwich CT 06830</span>
          </div>
        </div>
        <div className="hero-cta">
          <button className="cta-button large" onClick={onRegister}>Register Now</button>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Having been fortunate to participate in coding competitions locally and
          internationally, we experienced the power of community in code. But we noticed
          something missing: a local platform for schools to engage in computer science
          together. So we built one.
        </p>
        <p style={{ marginTop: 8 }}>
          TigerHacks brings students from multiple schools together to celebrate innovation,
          problem‑solving, and creativity—through a friendly coding competition designed by
          high‑schoolers, for high‑schoolers.
        </p>
      </section>

      <section className="schedule">
        <h2>Schedule</h2>
        <ul className="schedule-list">
          <li><span className="time">10:45 – 11:00</span><span className="desc">Arrival</span></li>
          <li><span className="time">11:05 – 11:30</span><span className="desc">Welcome Presentation + Competition Overview</span></li>
          <li><span className="time">11:35 – 12:00</span><span className="desc">Students Set up + Lunchtime</span></li>
          <li><span className="time">12:00 – 3:00</span><span className="desc">Competition</span></li>
          <li><span className="time">3:15</span><span className="desc">Awards and Dismissal</span></li>
        </ul>
      </section>

      

      <section className="photos">
        <h2>Photos</h2>
        <div className="photo-grid">
          {PHOTOS.map((url, idx) => (
            <div className="photo" key={url}>
              <img src={url} alt={`TigerHacks photo ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Team also appears on Rules page bottom; keeping here unless you prefer otherwise */}
      <section className="team">
        <h2>Team</h2>
        <div className="team-grid">
          <div>
            <h3>Current Members</h3>
            <ul>
              {CURRENT_TEAM.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Alumni</h3>
            <ul>
              {ALUMNI_TEAM.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Faculty</h3>
            <ul>
              {FACULTY_TEAM.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </main>

  )
}

function RegistrationView() {
  return (
    <main className="container main">
      <section className="registration">
        <h1>Registration</h1>
        <p>Fill out the form below to register your team.</p>
        <div className="iframe-wrap">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfBUruucfd9hogd6Vzv8FUIu6RRnWyj11ds0wbiDrE7YtBXAw/viewform?embedded=true"
            width="640"
            height="1250"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="TigerHacks Registration"
          >
          </iframe>
        </div>
      </section>
    </main>
  )
}

function RulesView() {
  return (
    <main className="container main">
      <section className="rules">
        <h1>Rules</h1>
        <ul className="rules-list">
          <li className="no-ai">
            Generative AI is strictly prohibited (e.g., ChatGPT, GitHub Copilot, Cursor, Claude,
            etc.). Any attempt to use AI tools results in immediate disqualification.
          </li>
          <li>
            Submissions and grading are facilitated via HackerRank. Accepted languages:
            C++, Java, and Python.
          </li>
          <li>
            Official language documentation and general tutorial sites are permitted. Q&A
            forums (e.g., StackOverflow) are not permitted.
          </li>
          <li>
            No outside assistance from anyone not authorized to provide help, including
            other teams and chaperones.
          </li>
          <li>
            Example I/O cases are provided, but grading uses hidden tests. Correctness
            requires passing all tests; no partial credit.
          </li>
          <li>
            Output must match exactly (formatting, whitespace, and newline characters).
          </li>
          <li>
            Tie‑breaker: time taken to solve problems. Manage your time carefully.
          </li>
          <li>One laptop per team.</li>
        </ul>

      </section>

    </main>
  )
}

function PriorQuestionsView() {
  return (
    <main className="container main">
      <section>
        <h1>Prior Questions</h1>
        <div className="about" style={{ marginTop: 12 }}>
          <h2>2025 Questions</h2>
          <p>2025 Questions to be released the day of the competition.</p>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2024 Questions</h2>
          <p>2024 Questions to be released the day of the competition.</p>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2023 Questions</h2>
          <p>
            2023 questions can be accessed <a href="https://docs.google.com/document/d/e/2PACX-1vRvXvBmglsL9MWHUd1gYMebHaFZHnOEqQOykwbCblvrCxWxE84gmGHM9YTmlSKzerjCm_XGtop0vijX/pub" target="_blank" rel="noreferrer">here</a>, and Python solutions can be accessed <a href="https://github.com/harrison-servedio/tigerHacks-2023" target="_blank" rel="noreferrer">here</a>. The questions are also embedded below.
          </p>
          <br />
          <iframe src="https://drive.google.com/file/d/1SxTn0NU72eFyxt7D9D_2kufV8prymmUJ/preview" width="100%" height="340" frameBorder="0" allow="autoplay"></iframe>
        </div>
      </section>
    </main>
  )
}

function ResultsView() {
  return (
    <main className="container main">
      <section>
        <h1>Results</h1>
        <div className="about" style={{ marginTop: 12 }}>
          <h2>2024 Results</h2>
          <p>Results from the 2024 contest can be seen below, and also can be accessed <a href="https://drive.google.com/file/d/1gPGqUwBc7DLiN1uHYa7xjU-wHunFae6U/view" target="_blank" rel="noreferrer">here</a>.</p>
          <br />
          <iframe src="https://drive.google.com/file/d/1gPGqUwBc7DLiN1uHYa7xjU-wHunFae6U/preview" width="640" height="480" allow="autoplay"></iframe>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2023 Results</h2>
          <p>Results from the 2023 contest can be seen below, and also can be accessed <a href="https://drive.google.com/file/d/1WLzv5odA55kuEzCtojmYI-fJVrxQ-nxp/view" target="_blank" rel="noreferrer">here</a>.</p>
          <br />
          <iframe src="https://drive.google.com/file/d/1WLzv5odA55kuEzCtojmYI-fJVrxQ-nxp/preview" width="100%" height="340" frameBorder="0" allow="autoplay"></iframe>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} TigerHacks</span>
        <span>
          Built with React + Vite
        </span>
      </div>
    </footer>
  )
}

function App() {
  const [view, setView] = useState(VIEWS.HOME)

  return (
    <div className="app-root">
      <Header currentView={view} onNavigate={setView} />
      {view === VIEWS.HOME && (
        <HomeView onRegister={() => setView(VIEWS.REGISTER)} />
      )}
      {view === VIEWS.RULES && <RulesView />}
      {view === VIEWS.PRIOR && <PriorQuestionsView />}
      {view === VIEWS.RESULTS && <ResultsView />}
      {view === VIEWS.REGISTER && <RegistrationView />}
      <Footer />
    </div>
  )
}

export default App

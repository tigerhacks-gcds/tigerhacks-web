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

const TIGER_ICON = `${BASE}photos/gcdstiger.png`

const CURRENT_TEAM = [
  'Henry Santangelo',
  'Zachry Bostock',
  'Charlie Moloney',
  'Irhan Iftikar',
  'Katie Benincasa',
  'Julian Toub',
  'Asher Rosen',
  'Oliver Servedio',
  'Mary Chickering',
  'Oliver Davis',
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
  'Samantha Marciano',
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
          <li><span className="time">1:00 – 1:15</span><span className="desc">Arrival</span></li>
          <li><span className="time">1:20 – 1:35</span><span className="desc">Welcome Presentation + Competition Overview</span></li>
          <li><span className="time">1:45 – 2:05</span><span className="desc">Students Set up + Lunchtime</span></li>
          <li><span className="time">2:05 – 5:15</span><span className="desc">Competition</span></li>
          <li><span className="time">5:25</span><span className="desc">Awards and Dismissal</span></li>
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
          <p>
            2025 questions can be accessed <a href={`${BASE}pset2025.pdf`} target="_blank" rel="noreferrer">here</a>, and solutions can be accessed <a href="https://github.com/Henry-Santa/tigerhacks" target="_blank" rel="noreferrer">here</a>. The questions are also embedded below.
          </p>
          <br />
          <iframe src={`${BASE}pset2025.pdf`} width="100%" height="500" frameBorder="0" allow="autoplay"></iframe>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2024 Questions</h2>
          <p>
            2024 questions can be accessed <a href={`${BASE}pset2024.pdf`} target="_blank" rel="noreferrer">here</a>, and solutions can be accessed <a href="https://github.com/harrison-servedio/tigerhacks-2024/tree/main" target="_blank" rel="noreferrer">here</a>. The questions are also embedded below.
          </p>
          <br />
          <iframe src={`${BASE}pset2024.pdf`} width="100%" height="500" frameBorder="0" allow="autoplay"></iframe>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2023 Questions</h2>
          <p>
            2023 questions can be accessed <a href={`${BASE}pset2023.pdf`} target="_blank" rel="noreferrer">here</a>, and Python solutions can be accessed <a href="https://github.com/harrison-servedio/tigerHacks-2023" target="_blank" rel="noreferrer">here</a>. The questions are also embedded below.
          </p>
          <br />
          <iframe src={`${BASE}pset2023.pdf`} width="100%" height="500" frameBorder="0" allow="autoplay"></iframe>
        </div>
      </section>
    </main>
  )
}

const RESULTS_2025 = [
  { team: 'HHH eldroW idibikS', username: 'aravchando', score: 9, time: 168 },
  { team: 'HHH One Chip', username: 'c_lamkin37', score: 8, time: 179.33 },
  { team: 'HHH - Los Pollos Hermanos', username: 'joshuadanielshin', score: 8, time: 179.4 },
  { team: 'Dragons A', username: 'enqiao2009', score: 7, time: 140 },
  { team: 'HHH LeTeam', username: 'vihan_bansal', score: 7, time: 160 },
  { team: '⚙️', username: 'julianmkizner', score: 7, time: 173 },
  { team: 'HHH JAC', username: 'justinmoss0803', score: 7, time: 173 },
  { team: 'Westhill Vikings Varsity A', username: 'sakshambehl4', score: 6, time: 115 },
  { team: 'Bruins Ninjas', username: 'ssheppard', score: 6, time: 124 },
  { team: 'Dragons B', username: 'brucea28', score: 6, time: 175.75 },
  { team: 'Westhill Varsity B', username: 'vihaan_goyal1512', score: 5, time: 96 },
  { team: 'HHH Kars 4 Kids', username: 'ajinest6', score: 5, time: 114 },
  { team: 'HHH |\\|@$', username: 'navya27dhanikon1', score: 5, time: 164 },
  { team: "St. Luke's 1", username: 'rothschildw29', score: 5, time: 171 },
  { team: 'WickHack', username: 'mlanson', score: 5, time: 172 },
  { team: "St. Luke's 2", username: 'desantisf26', score: 5, time: 177 },
  { team: 'Westhill Novice B', username: 'marcusajakes', score: 4, time: 97 },
  { team: "St. Luke's 3", username: 'frosth27', score: 4, time: 121 },
  { team: 'Westhill Novice A', username: 'runtherace073', score: 1, time: 73 },
]

const RESULTS_2024 = [
  { team: 'Hack Tuah', member1: 'Jaymin Ding', member2: 'Rhys de Haan', member3: 'Xavier Perkins' },
  { team: 'Brunswick Ninja', member1: 'Vikram Sarkar', member2: 'Jack Whitney-Epstein', member3: 'Jesse Chung' },
  { team: 'Vikings Varsity A', member1: 'Nikita Haitsiukevich', member2: 'Katelin Zhao', member3: 'Charles Bordon' },
  { team: '♻️', member1: 'Julian Kizner', member2: 'Wilson Rothschild', member3: 'N/A' },
  { team: 'The Goon Squad', member1: 'Charles Iwanski', member2: 'Xindi Liu', member3: 'Arav Ramaswamy' },
  { team: 'Heat Hollows', member1: 'Arav Chand', member2: 'Eric Matsuno', member3: 'Aparthib Anubhob' },
  { team: '🏰🐴♗👸🤴♗🐴🏰', member1: 'Arjan Kochar', member2: 'Ephraim Gilrain-Lennon', member3: 'N/A' },
  { team: 'Westhill Varsity C', member1: 'Sahil Salihnur', member2: 'Saksham Behl', member3: 'Kartik Nayyar' },
  { team: '😩', member1: 'Oliver Samardzija', member2: 'Bobby Somaya', member3: 'Felix DeSantis' },
  { team: 'Westhill Varsity B', member1: 'Aidan Mulcahey', member2: 'Daniel Tuma', member3: 'Rachit Jha' },
  { team: 'Los Pollos Hermanos', member1: 'Nicholas Wei', member2: 'Joshua Shin', member3: 'Eric Kim' },
  { team: 'RHS Team B', member1: 'Sebastian Utomo', member2: 'Jayin Palicha', member3: 'Brandon Lebun-Luo' },
  { team: 'RHS Team A', member1: 'Jacob Kalafus', member2: 'Henry Frates', member3: 'Grant Thorburn' },
  { team: 'Crew Coders', member1: 'George Kapp', member2: 'Charlie Sulkowski', member3: 'Justin Guo' },
  { team: 'The Doodlers', member1: 'Kam Wing Lo', member2: 'Masood Khwaja', member3: 'Vihan Bansal' },
  { team: '📎', member1: 'Jack Clavelli', member2: 'Eric Millar', member3: 'Matheo Picon' },
  { team: 'Code Queens', member1: 'Ellie Podoshev', member2: 'Laila Galal', member3: 'Anya Nadel' },
  { team: 'The Hawks', member1: 'Maria Taveras', member2: 'Banghua Pan', member3: 'Siksha Kohar' },
  { team: 'Westhill Varsity D', member1: 'Faisal Naziri', member2: 'Keeran Giritharan', member3: 'Christian Thomas' },
  { team: '💅', member1: 'Lily Rothschild', member2: 'Peikang Hu', member3: 'Matty Shulman' },
  { team: 'The iPad kids', member1: 'Grant Millan', member2: 'William Schaible', member3: 'N/A' },
  { team: 'Tech Divas', member1: 'Ambika Jha', member2: 'Harriet Hedvat', member3: 'Avery Li' },
]

const RESULTS_2023 = [
  { team: 'Rye Country Day School', member1: 'Jaymin Ding', member2: 'Katia Ohmacht', member3: 'Xindi Liu' },
  { team: 'Brunswick School', member1: 'Ajay Bagaria', member2: 'Jack Whitney-Epstein', member3: 'Vikram Sarker' },
  { team: 'Half Hollow Hills High School East', member1: 'Aparthib Anubhob', member2: 'Ethan Shapiro', member3: 'Laura Lerebours' },
  { team: 'Westhill High School Team B', member1: 'Alejandro Alfaro', member2: 'Samir Afsary', member3: 'Yahya Deggouj' },
  { team: 'Rye Country Day School', member1: 'Rhys de Haan', member2: 'Sam Sah-Nixon', member3: 'Davis Clarke' },
  { team: 'Greens Farms Academy', member1: 'Jamie Davis', member2: 'Brian Twitchell', member3: 'Joey Giordano' },
  { team: 'Rye Country Day School', member1: 'Charles Iwanski', member2: 'Xavier Perkins', member3: 'Arav Ramaswamy' },
  { team: 'Westhill High School (Team A)', member1: 'Georgiy Zemlevskiy', member2: 'Adil Oryspayev', member3: 'Rohan Sahu' },
  { team: 'Westhill High School Team C', member1: 'Nikita Haitsiukevich', member2: 'Katelin Zhao', member3: 'Charles Bordon' },
  { team: 'Greenwich High School', member1: 'Lauren Huang', member2: 'Ellie Podoshev', member3: 'N/A' },
  { team: "St. Luke's School", member1: 'Sankalp Ojha', member2: 'Katie Summers', member3: 'Arjan Kochar' },
  { team: 'Westhill High School Team D', member1: 'Ryan Mulcahey', member2: 'Tamara Segal', member3: 'Eliass Amrani' },
  { team: 'Newtown High School', member1: 'David Baghdady', member2: 'Aaron Brown', member3: 'N/A' },
  { team: 'Greenwich High School', member1: 'Katy Wouters', member2: 'Ambika Jha', member3: 'Lottie Falus' },
]

function ResultsView() {
  return (
    <main className="container main">
      <section>
        <h1>Results</h1>
        <div className="about" style={{ marginTop: 12 }}>
          <h2>2025 Results</h2>
          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Username</th>
                  <th>Score</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS_2025.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.team}</td>
                    <td>{result.username}</td>
                    <td>{result.score}</td>
                    <td>{result.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2024 Results</h2>
          <div className="results-table-wrapper">
            <table className="results-table results-table-members">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team Name</th>
                  <th>Member 1 Name</th>
                  <th>Member 2 Name</th>
                  <th>Member 3 Name</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS_2024.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.team}</td>
                    <td>{result.member1}</td>
                    <td>{result.member2}</td>
                    <td>{result.member3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="about" style={{ marginTop: 16 }}>
          <h2>2023 Results</h2>
          <div className="results-table-wrapper">
            <table className="results-table results-table-members">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team Name</th>
                  <th>Member 1 Name</th>
                  <th>Member 2 Name</th>
                  <th>Member 3 Name</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS_2023.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.team}</td>
                    <td>{result.member1}</td>
                    <td>{result.member2}</td>
                    <td>{result.member3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>TigerHacks {new Date().getFullYear()}</span>
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

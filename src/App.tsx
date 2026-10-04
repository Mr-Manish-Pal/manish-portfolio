import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Cpu,
  ExternalLink,
  GitBranch as Github,
  GraduationCap,
  Mail,
  Menu,
  Radio,
  X,
} from 'lucide-react'
import {
  certifications,
  contact,
  education,
  experience,
  navItems,
  profile,
  projects,
  researchTopics,
  skills,
  socialLinks,
  type Project,
  type ProjectFilter,
} from './data/content'
import './App.css'

const roles = ['Embedded Systems Engineer', 'Firmware Developer', 'Edge AI Builder']
const projectFilters: ProjectFilter[] = ['IoT', 'Computer Vision', 'Firmware', 'Linux']

function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
}: {
  id: string
  index: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow"><span>{index}</span>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [roleIndex, setRoleIndex] = useState(0)
  const [projectFilter, setProjectFilter] = useState<ProjectFilter | 'All'>('All')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) return

    document.documentElement.classList.add('has-motion')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    )

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-motion')
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    document.querySelectorAll<HTMLElement>('#home, main section[id]').forEach((section) => {
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, 3000)
    return () => window.clearInterval(interval)
  }, [])

  const visibleProjects =
    projectFilter === 'All'
      ? projects
      : projects.filter((project) => project.filters.includes(projectFilter))

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormStatus('sending')
    setFormMessage('')
    const form = event.currentTarget

    if (!contact.formspreeEndpoint) {
      setFormStatus('error')
      setFormMessage(
        'The contact form is not connected yet. Please use GitHub or add your Formspree endpoint to .env.local.',
      )
      return
    }

    try {
      const response = await fetch(contact.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        setFormStatus('error')
        setFormMessage('Your message could not be sent. Please try again or contact me on GitHub.')
        return
      }

      form.reset()
      setFormStatus('success')
      setFormMessage('Thanks for reaching out. Your message has been sent.')
    } catch {
      setFormStatus('error')
      setFormMessage('A network error prevented your message from sending. Please try again.')
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#home" aria-label="Manish Pal, home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">MP</span>
            <span className="brand-name">MANISH PAL<span> / ECE</span></span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav
            id="primary-navigation"
            className={`navigation${menuOpen ? ' is-open' : ''}`}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : undefined}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {socialLinks.resumeAvailable ? (
              <a className="nav-resume" href={socialLinks.resume} download>Resume <ArrowUpRight size={14} /></a>
            ) : (
              <span className="nav-resume is-placeholder" aria-label="Resume PDF not added yet">Resume <span>soon</span></span>
            )}
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-kicker"><span className="availability-dot" /> AVAILABLE FOR PURPOSEFUL BUILDS <span className="kicker-divider">/</span> MEERUT, INDIA</p>
              <h1 id="hero-title">Manish <em>Pal.</em></h1>
              <p className="hero-role" aria-label={`${roles[roleIndex]}, ${profile.role}`}>
                <span className="role-prefix">I’m a</span>
                <span className="role-rotator" key={roles[roleIndex]}>{roles[roleIndex]}</span>
              </p>
              <p className="hero-description">{profile.value}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">View projects <ArrowRight size={17} /></a>
                <a className="button button-secondary" href="#contact">Contact me <ArrowDown size={16} /></a>
              </div>
              <div className="social-row" aria-label="Social profiles">
                <a className="social-link" href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <Github size={18} /><span>GitHub</span><ExternalLink size={12} />
                </a>
                <span className="social-link is-unavailable" aria-label="LinkedIn profile not provided">
                  <span className="linkedin-icon" aria-hidden="true">in</span><span>LinkedIn</span><small>[add URL]</small>
                </span>
                <span className="social-link is-unavailable" aria-label="Email address not provided">
                  <Mail size={18} /><span>Email</span><small>[add address]</small>
                </span>
              </div>
            </div>

            <HeroArtwork />
            <p className="hero-index" aria-hidden="true">01 <span>—</span> 06</p>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
        </section>

        <section className="content-section about-section" id="about" aria-labelledby="about-title">
          <div className="section-container">
            <SectionHeading id="about-title" index="01" eyebrow="A little about me" title="Curious by nature. Practical by design." description="I enjoy turning a circuit, a sensor, and a clear problem into something useful." />
            <div className="about-layout">
              <div className="about-copy reveal">
                <p>{profile.about}</p>
                <p>{profile.aboutMore}</p>
                <div className="about-note"><span className="note-line" /><span>Build. Debug. Measure. Optimize.</span></div>
              </div>
              <aside className="about-facts reveal" aria-label="Profile details">
                <div className="fact-row"><span>Currently</span><strong>{profile.role}</strong></div>
                <div className="fact-row"><span>Focus</span><strong>Embedded systems &amp; firmware</strong></div>
                <div className="fact-row"><span>Location</span><strong>{profile.location}</strong></div>
                <div className="fact-row"><span>Hands-on experience</span><strong>~ 3.5 years in electronics</strong></div>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-container">
            <SectionHeading id="skills-title" index="02" eyebrow="Tools I work with" title="A toolkit still in progress." description="Working knowledge where I build; exploring where I’m still learning. No inflated scores, just the tools and concepts I use." />
            <div className="skills-grid">
              {skills.map((group, index) => (
                <article className="skill-card reveal" key={group.label} style={{ '--card-index': index } as CSSProperties}>
                  <div className="skill-card-top"><span>0{index + 1}</span><span>{group.level}</span></div>
                  <h3>{group.label}</h3>
                  <ul className="tag-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="research-interests reveal">
              <div><p className="eyebrow"><span>IN PROGRESS</span></p><h3>Questions I’m exploring</h3></div>
              <ul>{researchTopics.map(([topic]) => <li key={topic}>{topic}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-container">
            <div className="projects-heading">
              <SectionHeading id="projects-title" index="03" eyebrow="Selected work" title="Projects built to learn by doing." description="A mix of active builds, explorations, and concepts. Status and next steps are kept explicit." />
              <span className="project-count"><strong>{String(projects.length).padStart(2, '0')}</strong><span>PROJECTS<br />SHARED</span></span>
            </div>

            <div className="filter-row" role="group" aria-label="Filter projects by category">
              <span className="filter-label">FILTER</span>
              {(['All', ...projectFilters] as const).map((filter) => (
                <button
                  key={filter}
                  className={`filter-button${projectFilter === filter ? ' is-active' : ''}`}
                  type="button"
                  aria-pressed={projectFilter === filter}
                  onClick={() => setProjectFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="project-grid" aria-live="polite">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={project.id === 'attendance-system'}
                />
              ))}
              {visibleProjects.length === 0 && (
                <p className="empty-filter">Linux-focused project details will appear here when a project is ready to share.</p>
              )}
            </div>
          </div>
        </section>

        <section className="content-section journey-section" id="journey" aria-labelledby="journey-title">
          <div className="section-container">
            <SectionHeading id="journey-title" index="04" eyebrow="Experience & education" title="Learning happens at the bench." description="A work in progress: hands-on repair experience alongside an engineering education." />
            <div className="journey-grid">
              <div className="timeline">
                <h3 className="subsection-heading">Experience</h3>
                {experience.map((item, index) => (
                  <article className="timeline-item reveal" key={item.title}>
                    <span className={`timeline-marker${index > 0 ? ' is-muted' : ''}`} aria-hidden="true" />
                    <div className="timeline-content">
                      <p className="timeline-date">{item.date}<span>{item.duration}</span></p>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="journey-aside">
                <article className="education-card reveal">
                  <div className="education-icon"><GraduationCap size={21} /></div>
                  <p className="eyebrow"><span>EDUCATION</span></p>
                  <h3>{education.degree}</h3>
                  <p>{education.field}</p>
                  <strong>{education.institution}</strong>
                  <span>{education.location}</span>
                  <small>Currently pursuing</small>
                </article>
                <article className="cert-card reveal">
                  <p className="eyebrow"><span>CERTIFICATIONS</span></p>
                  <h3>Learning, documented.</h3>
                  <ul>
                    {certifications.map((certification) => (
                      <li key={certification}>
                        <span>{certification}</span>
                        <small>[Add issuer and date]</small>
                      </li>
                    ))}
                  </ul>
                  <p className="placeholder-note">Credential IDs: [Add when available]</p>
                </article>
                <p className="missing-details">Workshops &amp; achievements: [Add details when available]</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-container contact-layout">
            <div className="contact-copy reveal">
              <SectionHeading id="contact-title" index="05" eyebrow="Get in touch" title="Have a good problem to solve?" description="I’m interested in thoughtful conversations about embedded systems, firmware, electronics, and useful things to build." />
              <a className="contact-github" href={socialLinks.github} target="_blank" rel="noreferrer">
                <Github size={18} /><span>Reach out on GitHub</span><ArrowUpRight size={16} />
              </a>
              <p className="contact-placeholder">Email: [Add your email] <span>/</span> LinkedIn: [Add your profile URL]</p>
            </div>

            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <p className="form-heading">Send a message</p>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Name" required minLength={2} />
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              <label htmlFor="contact-message">What would you like to discuss?</label>
              <textarea id="contact-message" name="message" rows={4} placeholder="A little about your idea..." required minLength={10} />
              <button className="button button-primary form-submit" type="submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={17} />
              </button>
              <p className={`form-status ${formStatus}`} aria-live="polite" role={formStatus === 'error' ? 'alert' : 'status'}>
                {formMessage || 'Your message is only sent when a form endpoint is configured.'}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand" href="#home" aria-label="Back to top">
            <span className="brand-mark">MP</span>
            <span className="brand-name">MANISH PAL<span> / ECE</span></span>
          </a>
          <p>Building close to the metal.<br /><span>One thoughtful iteration at a time.</span></p>
          <nav className="footer-links" aria-label="Footer navigation">
            {navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
            <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={12} /></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Manish Pal. All rights reserved.</small>
          <a href="#home">Back to top <ArrowUpRight size={14} /></a>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article className={`project-card reveal${featured ? ' featured-project' : ''}`}>
      <div className="project-card-meta">
        <span className="project-number">{project.number} <span>/ {project.category}</span></span>
        <span className={`project-status status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>
          <span />{project.status}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-tags" aria-label="Technologies">{project.technologies.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-summary">
        <div><span>THE PROBLEM</span><p>{project.problem}</p></div>
        <div><span>CURRENT APPROACH</span><p>{project.approach}</p></div>
        <div><span>OUTCOME</span><p className="outcome-placeholder">[Result to be documented after validation]</p></div>
      </div>
      <details className="project-details">
        <summary>More project details <ChevronDown size={15} /></summary>
        <div className="project-detail-content">
          <div><h4>Hardware</h4><ul>{project.hardware.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>Software</h4><ul>{project.software.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>Challenges</h4><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>Next steps</h4><p>{project.future}</p></div>
        </div>
      </details>
      <div className="project-card-footer">
        <span>{featured ? 'FEATURED · IN DEVELOPMENT' : project.status.toUpperCase()}</span>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`}>
            <Github size={17} /> Repository <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  )
}

function HeroArtwork() {
  return (
    <div className="hero-art reveal" aria-hidden="true">
      <div className="art-orbit art-orbit-outer" />
      <div className="art-orbit art-orbit-inner" />
      <div className="art-cross art-cross-one" />
      <div className="art-cross art-cross-two" />
      <div className="art-core"><span>MP</span><small>ECE · EMBEDDED</small></div>
      <div className="art-node art-node-one"><Cpu size={18} /><span>FIRMWARE</span></div>
      <div className="art-node art-node-two"><Radio size={18} /><span>HARDWARE</span></div>
      <div className="art-node art-node-three"><Cpu size={18} /><span>EDGE AI</span></div>
      <span className="art-coordinate coordinate-one">MEERUT / IN</span>
      <span className="art-coordinate coordinate-two">HARDWARE × SOFTWARE</span>
      <svg className="circuit-lines" viewBox="0 0 520 520" fill="none">
        <path d="M260 92v55m0 226v55M92 260h55m226 0h55M141 141l39 39m160 160 39 39m0-238-39 39m-160 160-39 39" />
        <circle cx="260" cy="67" r="4" /><circle cx="260" cy="453" r="4" />
        <circle cx="67" cy="260" r="4" /><circle cx="453" cy="260" r="4" />
      </svg>
    </div>
  )
}

export default App

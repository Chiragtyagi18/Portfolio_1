'use client'

import { FormEvent, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, Link2, Mail, Menu, X } from 'lucide-react'

type Project = { name: string; category: 'Full Stack' | 'AI/ML' | 'Frontend'; year: string; featured?: boolean; github: string; demo: string; image: string; tech: string[]; features: string[]; tone: string }

const projects: Project[] = [
  { name: 'CRM Platform', category: 'Full Stack', year: '2026', featured: true, github: 'https://github.com/Chiragtyagi18/CRM', demo: 'https://crm-eight-dusky.vercel.app/', image: '/projects/crm.png', tech: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'], features: ['Customer relationship management dashboard', 'NextAuth.js authentication', 'MongoDB/Mongoose data layer with Axios API calls'], tone: 'orange' },
  { name: 'AI Image Generator', category: 'AI/ML', year: '2025', featured: true, github: 'https://github.com/Chiragtyagi18/ai_image_generate', demo: 'https://ai-image-generate-tawny.vercel.app/', image: '/projects/ai_image.png', tech: ['Next.js', 'Tailwind CSS', 'Claid.ai', 'shadcn/ui', 'AOS'], features: ['Generates images from text prompts via AI API', 'shadcn/ui component system', 'Scroll-reveal animations'], tone: 'mint' },
  { name: 'YouTube Clone', category: 'Full Stack', year: '2025', featured: true, github: 'https://github.com/Chiragtyagi18/YOUTUBE_CLONE', demo: 'https://youtube-clone-henna-eta.vercel.app/', image: '/projects/utube.png', tech: ['React', 'Node.js', 'MongoDB', 'Cloudinary'], features: ['Full-stack video streaming platform', 'JWT authentication', 'Cloudinary video and profile image uploads'], tone: 'yellow' },
  { name: 'VTON — Virtual Try On', category: 'Full Stack', year: '2026', github: 'https://github.com/Chiragtyagi18/VTON', demo: 'https://vton-nu.vercel.app/', image: '/projects/VTON.png', tech: ['TypeScript', 'Next.js', 'Python', 'FastAPI'], features: ['Virtual garment try-on experience', 'Type-safe Next.js interface', 'FastAPI-powered processing'], tone: 'pink' },
  { name: "Let's Tweet", category: 'Full Stack', year: '2026', github: 'https://github.com/Chiragtyagi18/lets_tweet', demo: 'https://lets-tweet.vercel.app/tweets/', image: '/projects/tweets.png', tech: ['Python', 'Django', 'Bootstrap', 'PostgreSQL'], features: ['Social posting workflow', 'Django backend architecture', 'PostgreSQL persistence'], tone: 'blue' },
  { name: 'Price Tracker', category: 'Frontend', year: '2026', github: 'https://github.com/Chiragtyagi18/Price_tracker', demo: 'https://price-tracker-three-iota.vercel.app/', image: '/projects/drop.png', tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Supabase'], features: ['Product price monitoring dashboard', 'Data visualization with Recharts', 'Supabase-connected data layer'], tone: 'mint' },
  { name: 'Restaurant Page', category: 'Full Stack', year: '2026', github: 'https://github.com/Chiragtyagi18/restaurant_page', demo: 'https://restaurant-page-one-sigma.vercel.app/', image: '/projects/restaurant.png', tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB'], features: ['Restaurant discovery experience', 'Responsive TypeScript UI', 'MongoDB-backed content'], tone: 'orange' },
  { name: 'AQI Report', category: 'AI/ML', year: '2025', github: 'https://github.com/Chiragtyagi18/AQI_Report', demo: 'https://aqi-report.vercel.app/', image: '/projects/aqi.png', tech: ['TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Next.js'], features: ['Air-quality reporting dashboard', 'Python and FastAPI service layer', 'Clear visual data presentation'], tone: 'yellow' },
  { name: 'VideoKit', category: 'Full Stack', year: '2026', github: 'https://github.com/Chiragtyagi18/video_kit01', demo: 'https://video-kit01.vercel.app/', image: '/projects/videokit.png', tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'ImageKit.io'], features: ['Video-focused web experience', 'ImageKit media delivery', 'MongoDB-backed project flow'], tone: 'blue' },
  { name: 'Unknown Messenger', category: 'Full Stack', year: '2026', github: 'https://github.com/Chiragtyagi18/unknown_messanger', demo: 'https://unknown-messanger.vercel.app/', image: '/projects/message.png', tech: ['TypeScript', 'Next.js', 'MongoDB', 'NextAuth'], features: ['Real-time messaging interface', 'NextAuth authentication', 'MongoDB persistence'], tone: 'pink' },
  { name: 'AI Blog Generator', category: 'AI/ML', year: '2026', github: 'https://github.com/Chiragtyagi18/blog_generator', demo: 'https://blog-generator-roan.vercel.app/', image: '/projects/blog.png', tech: ['Python', 'Node.js', 'Groq API', 'React'], features: ['AI-assisted blog generation', 'Groq API integration', 'React authoring interface'], tone: 'mint' },
]

const skillGroups = {
  FOUNDATIONS: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Git', 'GitHub'],
  FRONTEND: ['React.js', 'Next.js', 'Tailwind CSS'],
  BACKEND: ['Node.js', 'Express.js', 'FastAPI (Python)'],
  'DATA & TOOLS': ['MongoDB', 'PostgreSQL', 'Supabase', 'VS Code', 'Vercel', 'Render'],
}

const navItems = ['About', 'Skills', 'Projects', 'Education', 'Contact']

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [skillTab, setSkillTab] = useState<keyof typeof skillGroups>('FOUNDATIONS')
  const [filter, setFilter] = useState('All')
  const [projectIndex, setProjectIndex] = useState(0)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.category === filter), [filter])
  const activeProject = filtered[projectIndex % filtered.length]

  function changeFilter(next: string) { setFilter(next); setProjectIndex(0) }
  function moveProject(direction: number) { setProjectIndex((current) => (current + direction + filtered.length) % filtered.length) }
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name || !email || !subject || !message) return
    setSending(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await response.json()
      if (response.ok) {
        setSent(true)
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Contact submit error:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="portfolio-shell">
      <nav className="navbar" aria-label="Main navigation">
        <a className="logo-mark" href="#home" aria-label="Chirag Tyagi home"><span>CT</span></a>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{item}</a>)}
        </div>
        <a className="button button-orange nav-contact" href="#contact">Contact me <ArrowDownRight data-icon="inline-end" /></a>
        <button className="mobile-menu" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="hud-label">FULL STACK <span>•</span> DEVELOPER</div>
          <h1>Hi, I&apos;m <strong>Chirag</strong><br />Full Stack Dev<br /><span>&amp; AI Builder</span></h1>
          <p className="hero-lede">I build performant, AI-integrated web apps — from React/Next.js frontends to FastAPI and Node backends. I design interfaces with clean UI and delightful micro-interactions.</p>
          <div className="button-row"><a className="button button-orange" href="#projects">View Projects <ArrowDownRight data-icon="inline-end" /></a><a className="button button-light" href="#contact">Hire Me <ArrowDownRight data-icon="inline-end" /></a></div>
          <div className="tag-row">{['React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'Tailwind'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        </div>
        <div className="avatar-zone">
          <div className="avatar-card"><img className="avatar-img" src="/avatar.png" alt="Chirag Tyagi" /></div>
        </div>
      </section>

      <section className="dark-section about-section" id="about">
        <SectionHeading title="ABOUT" subtitle="Full Stack Developer • AI Enthusiast • Problem Solver" dark />
        <div className="about-grid"><div className="mission-card game-card"><div className="card-kicker">ABOUT ME // 001</div><div className="mission-icon">✦</div><h3>BUILD THINGS<br /><span>THAT MATTER.</span></h3><p>I craft fast, reliable full-stack applications with clean UI and thoughtful backend architecture — blending React/Next.js on the frontend with Node.js, Express, FastAPI, and MongoDB/PostgreSQL on the backend, and exploring AI/ML integrations along the way.</p><div className="button-row"><a className="button button-orange" href="#projects">View Projects</a><a className="button button-mint" href="#contact">Contact Me</a></div></div><div className="stats-card game-card"><div className="card-kicker">HIGHLIGHTS // 2026</div><div className="stat-list"><Stat number="11+" label="PROJECTS SHIPPED" /><Stat number="15+" label="TECHNOLOGIES USED" /><Stat number="2+" label="CERTIFICATIONS" /></div><div className="education"><span className="status-dot" /> B.TECH CSE, 2023–2027 <small>KIET GROUP OF INSTITUTIONS, GHAZIABAD</small></div><div className="tag-row"><span className="tag tag-yellow">REACT</span><span className="tag tag-yellow">NODE.JS</span><span className="tag tag-yellow">TAILWIND</span></div></div></div>
      </section>

      <section className="light-section skills-section" id="skills"><SectionHeading title="SKILLS" subtitle="Core technologies I use to design, build, and ship products" /><div className="skills-grid"><div className="skills-main"><div className="tabs">{Object.keys(skillGroups).map((tab) => <button className={skillTab === tab ? 'active' : ''} key={tab} onClick={() => setSkillTab(tab as keyof typeof skillGroups)}>{tab}</button>)}</div><div className="loadout-card game-card"><div className="loadout-top"><span>SKILL EQUIPMENT</span><b>MASTERY</b></div><div className="skill-chips">{skillGroups[skillTab].map((skill) => <span className="skill-chip" key={skill}><Check data-icon="inline-start" /> {skill}</span>)}</div><div className="loadout-footer">CATEGORY: <strong>{skillTab}</strong></div></div></div><div className="progress-panel game-card"><div className="card-kicker">SKILL LEVEL</div>{Object.keys(skillGroups).map((group, index) => <div className="progress-item" key={group}><div><span>{group}</span><b>{[92, 88, 84, 78][index]}%</b></div><div className="progress-bar"><i style={{ width: `${[92, 88, 84, 78][index]}%` }} /></div></div>)}</div></div></section>

      <section className="projects-section" id="projects"><SectionHeading title="PROJECTS" subtitle="Showcasing my work across the stack — from frontends to full-stack and AI builds" dark /><div className="filter-row">{['All', 'Full Stack', 'AI/ML', 'Frontend'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => changeFilter(item)}>{item}</button>)}</div><div className="project-window game-card"><button className="window-arrow arrow-left" onClick={() => moveProject(-1)} aria-label="Previous project"><ArrowLeft /></button><button className="window-arrow arrow-right" onClick={() => moveProject(1)} aria-label="Next project"><ArrowRight /></button><div className="window-bar"><span className="traffic"><i /><i /><i /></span><strong>PROJECT WINDOW</strong><span className="window-hint">USE ARROW KEYS OR SIDE ARROWS</span></div><div className="project-content"><div className={`project-preview tone-${activeProject.tone}`}><div className="browser-bar"><span>●</span><span>●</span><span>●</span><small>project_preview.exe</small></div><div className="preview-shot"><img src={activeProject.image} alt={`${activeProject.name} preview`} /></div><div className="preview-label">BUILD<br />DEPLOY<br />REPEAT.</div></div><div className="project-details"><div className="project-meta">{activeProject.category} <span>•</span> {activeProject.year} {activeProject.featured && <b>FEATURED</b>}</div><h3>{activeProject.name}</h3><p>Ship-ready product architecture with a focused interface and a clear path from idea to useful experience.</p><div className="tag-row">{activeProject.tech.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><ul>{activeProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="button-row"><a className="button button-orange" href={activeProject.demo} target="_blank" rel="noreferrer">View Project <ArrowDownRight data-icon="inline-end" /></a><a className="code-link" href={activeProject.github} target="_blank" rel="noreferrer"><Link2 data-icon="inline-start" /> View Code</a></div></div></div></div></section>

      <section className="light-section experience-section" id="education"><SectionHeading title="EDUCATION" subtitle="My academic background and learning milestones" /><div className="timeline">{[['2022', 'STARTED THE JOURNEY', 'Started web development journey with HTML, CSS, JavaScript'], ['2023', 'WENT FULL STACK', 'React, Node.js, databases — MongoDB and PostgreSQL'], ['2023–2027', 'B.TECH CSE', 'Pursuing B.Tech (CSE), KIET Group of Institutions, Ghaziabad — CGPA 7.9'], ['2025', 'AI/ML INTEGRATION', 'Began integrating AI/ML into projects: image generation, AQI reporting, blog generation'], ['2026', 'CURRENT WORK', 'Shipping full-stack + AI projects, still growing']].map(([year, title, copy], index) => <div className="timeline-item" key={year}><div className="timeline-node">{index + 1}</div><div className="timeline-card game-card"><span className="timeline-year">{year}</span><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="cert-strip"><div className="card-kicker">CERTIFICATIONS</div><div className="cert-list">{[['AWS Certified Cloud Practitioner (CLF-C02)', 'https://drive.google.com/file/d/1OalCTyTJYA8l-JUMJZXDP-GNEQaAgKZp/view?usp=sharing'], ['AWS Certified AI Practitioner', 'https://drive.google.com/file/d/1t6NVFJc2gYknAmrZKU0QEtBnvRHzD5n-/view?usp=sharing'], ['MongoDB University — Introduction to MongoDB', 'https://drive.google.com/file/d/1MFby9R0s_pvFagdfDA-afUWSaLczRxAH/view?usp=drive_link']].map(([cert, url]) => <div className="cert-badge" key={cert}><span>★</span>{cert}<a href={url} target="_blank" rel="noreferrer">VERIFY</a></div>)}</div></div></section>

      <section className="dark-section cta-section" id="build">
        <SectionHeading title="LET&apos;S BUILD TOGETHER" subtitle="Got an idea? Let&apos;s turn it into a product worth shipping." dark />
        <div className="cta-card game-card">
          <img className="cta-img" src="/avatar1.png" alt="Let's build together" />
          <div className="cta-copy">
            <div className="card-kicker">OPEN TO NEW OPPORTUNITIES</div>
            <h3>READY TO CREATE<br /><span>SOMETHING AWESOME?</span></h3>
            <p>I&apos;m open to collabs, internships, freelance work, and full-stack/AI projects. If you have a project in mind, I&apos;d love to hear about it.</p>
            <div className="button-row"><a className="button button-orange" href="#contact">Start a Project <ArrowDownRight data-icon="inline-end" /></a><a className="button button-light" href="https://github.com/Chiragtyagi18" target="_blank" rel="noreferrer">View GitHub</a></div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact"><SectionHeading title="CONTACT" subtitle="Let&apos;s build something great together — I&apos;d love to hear from you." /><div className="contact-grid"><form className="contact-form game-card" onSubmit={submitContact}>{sent ? <div className="sent-state"><span>✓</span><h3>MESSAGE SENT!</h3><p>Thanks for reaching out. Chirag will respond soon.</p><button type="button" className="button button-light" onClick={() => setSent(false)}>Send another</button></div> : <><div className="card-kicker">CONTACT FORM</div><label>YOUR NAME<input value={name} onChange={(event) => setName(event.target.value)} required placeholder="ENTER YOUR NAME" /></label><label>EMAIL<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="YOUR@EMAIL.COM" /></label><label>SUBJECT<input value={subject} onChange={(event) => setSubject(event.target.value)} required placeholder="WHAT IS THIS ABOUT?" /></label><label>MESSAGE<textarea value={message} onChange={(event) => setMessage(event.target.value)} required placeholder="WRITE YOUR MESSAGE..." rows={5} /></label>{error && <p className="form-error">{error}</p>}<button className="button button-orange" type="submit" disabled={sending}>{sending ? 'SENDING...' : <><span>SEND MESSAGE</span><ArrowDownRight data-icon="inline-end" /></>}</button></>}</form><div className="profile-card game-card"><div className="card-kicker">PROFILE CARD</div><div className="profile-avatar">CT</div><h3>CHIRAG TYAGI</h3><span className="role-tag">FULL STACK DEVELOPER • AI ENTHUSIAST</span><p>Open to collabs, internships, freelance work, and full-stack/AI projects. I usually respond quickly.</p><div className="button-row"><a className="button button-light" href="#">Resume</a><a className="button button-mint" href="#">Availability</a></div><div className="connect-panel"><div className="card-kicker">CONNECT</div><a href="https://github.com/chiragtyagi18" target="_blank" rel="noreferrer"><Link2 data-icon="inline-start" /> github.com/chiragtyagi18</a><a href="https://linkedin.com/in/chiragtyagi" target="_blank" rel="noreferrer"><Link2 data-icon="inline-start" /> linkedin.com/in/chiragtyagi</a><a href="mailto:tyagichirag009@gmail.com"><Mail data-icon="inline-start" /> tyagichirag009@gmail.com</a></div><div className="profile-hp"><span>HP</span><div className="bar"><i /></div></div></div></div></section>

      <footer className="footer-bar"><a className="logo-mark" href="#home"><span>CT</span></a><span>© 2026 CHIRAG TYAGI / BUILT WITH INTENTION</span><div><a href="https://github.com/Chiragtyagi18" target="_blank" rel="noreferrer">GITHUB</a><a href="https://linkedin.com/in/chiragtyagi" target="_blank" rel="noreferrer">LINKEDIN</a><a href="mailto:tyagichirag009@gmail.com">EMAIL</a></div></footer>
    </main>
  )
}

function SectionHeading({ title, subtitle, dark = false }: { title: string; subtitle: string; dark?: boolean }) { return <div className={`section-heading ${dark ? 'dark-heading' : ''}`}><h2>{title}</h2><p>{subtitle}</p></div> }
function Stat({ number, label }: { number: string; label: string }) { return <div className="stat"><strong>{number}</strong><span>{label}</span></div> }

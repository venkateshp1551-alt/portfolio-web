import { lazy, Suspense, useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  Github,
  GraduationCap,
  Linkedin,
  Menu,
  Moon,
  Network,
  Send,
  Shield,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react';

const SolarSystemBackdrop = lazy(() => import('./SolarSystemBackdrop'));

const profiles = [
  { name: 'GitHub', handle: 'venkateshp1551-alt', url: 'https://github.com/venkateshp1551-alt', action: 'Explore GitHub', Icon: Github },
  { name: 'LeetCode', handle: 'venkateshp1511', url: 'https://leetcode.com/u/venkateshp1511/', action: 'View coding profile', Icon: Code2 },
  { name: 'HackerRank', handle: 'venkateshp1551', url: 'https://www.hackerrank.com/profile/venkateshp1551', action: 'Explore HackerRank', Icon: Braces },
  { name: 'LinkedIn', handle: 'P Lakshmi Venkatesha', url: 'https://www.linkedin.com/in/venkatesh-p-221882395', action: 'Connect on LinkedIn', Icon: Linkedin },
];

const skills = [
  { title: 'Programming', Icon: Terminal, items: ['Python', 'C', 'C++', 'Java'] },
  { title: 'AI & machine learning', Icon: Cpu, items: ['Artificial intelligence', 'Machine learning', 'YOLO', 'OpenCV'] },
  { title: 'Tools & technologies', Icon: Braces, items: ['Git', 'GitHub', 'VS Code', 'SQL'] },
  { title: 'Development', Icon: Network, items: ['HTML', 'CSS', 'JavaScript', 'Responsive web design'] },
];

const interests = ['Software development', 'Artificial intelligence', 'Machine learning', 'Problem solving'];
const highlights = ['Innovation', 'Artificial intelligence', 'Team collaboration', 'Problem solving', 'Real-world applications'];
const features = [
  'AI-powered object detection',
  'People and vehicle identification',
  'Restricted-zone intrusion detection',
  'CCTV video analysis',
  'Security alert generation',
  'Existing infrastructure integration',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

function SectionHeading({ index, eyebrow, title, note }: { index: string; eyebrow: string; title: string; note?: string }) {
  return (
    <div className="section-heading reveal">
      <div className="section-heading-main">
        <span className="section-index">{index} / 08</span>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('portfolio-theme') !== 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const roles = ['Software developer in progress', 'AI / ML enthusiast', 'Computer science student'];

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 2600);
    const onScroll = () => setShowTop(window.scrollY > 650);
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `From: ${data.get('name')} (${data.get('email')})\nSubject: ${data.get('subject')}\n\n${data.get('message')}`;
    navigator.clipboard.writeText(message).then(
      () => setFormStatus('Message copied. Paste it into a LinkedIn message to send.'),
      () => setFormStatus('Clipboard access is unavailable. Please copy your message manually.'),
    );
  }

  function downloadResume() {
    const resume = [
      'P LAKSHMI VENKATESHA',
      'B.Tech, Computer Science and Engineering | SRN: R25EF173',
      '',
      'PROFILE',
      'Computer Science and Engineering student interested in software development, artificial intelligence, machine learning, and problem-solving.',
      '',
      'SKILLS',
      'Programming: Python, C, C++, Java',
      'AI & machine learning: Artificial Intelligence, Machine Learning, YOLO, OpenCV',
      'Tools & technologies: Git, GitHub, VS Code, SQL',
      'Development: HTML, CSS, JavaScript, Responsive Web Design',
      '',
      'PROJECT EXPERIENCE',
      'Smart India Hackathon 2026: AI-Based Intelligent Video Analytics Platform for Border Surveillance',
      'Exploring video analysis, object detection, restricted-zone intrusion detection, and security alerts using existing CCTV infrastructure.',
      '',
      'EDUCATION',
      'B.Tech, Computer Science and Engineering',
      'Reva University | Academic year: 2026 | SRN: R25EF173',
      '',
      'PROFILES',
      ...profiles.map(({ name, url }) => `${name}: ${url}`),
      '',
      'Email address and project repository were not provided.',
    ].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([resume], { type: 'text/plain' }));
    link.download = 'P-Lakshmi-Venkatesha-Resume.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const navItems = [['About', '#about'], ['Skills', '#skills'], ['Project', '#project'], ['Journey', '#journey'], ['Education', '#education'], ['Learning', '#achievements'], ['Contact', '#contact']];

  return (
    <div className="site-shell">
      <Suspense fallback={null}><SolarSystemBackdrop /></Suspense>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="P Lakshmi Venkatesha, home"><span className="brand-mark">V<span>.</span></span><span className="brand-name">PLV<span> / PORTFOLIO</span></span></a>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" onClick={() => setDark((value) => !value)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title={`Switch to ${dark ? 'light' : 'dark'} theme`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="header-cta" href="#contact">Let’s talk <ArrowDownRight size={15} /></a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <div className="availability"><span className="availability-dot" /> OPEN TO LEARNING & COLLABORATION</div>
              <p className="hero-name">P LAKSHMI<br /><span>VENKATESHA</span></p>
              <div className="role-line"><span className="role-prompt">&gt;</span><AnimatePresence mode="wait"><motion.span key={roleIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>{roles[roleIndex]}</motion.span></AnimatePresence><span className="cursor" /></div>
              <h1>Building intelligent solutions through <span>code, creativity</span> &amp; innovation.</h1>
              <p className="hero-description">I’m a Computer Science Engineering student exploring programming, artificial intelligence, and practical ways to solve real-world problems.</p>
              <div className="hero-buttons">
                <a className="button button-primary hero-work-button" href="#project">Explore my work <ArrowDownRight size={17} /></a>
                <button className="button button-outline" onClick={downloadResume}>Download resume <ArrowDown size={16} /></button>
                <a className="button button-quiet" href="#contact">Contact me <Send size={15} /></a>
              </div>
              <div className="hero-socials">
                <a href={profiles[0].url} target="_blank" rel="noreferrer" aria-label="GitHub profile, opens in a new tab"><Github size={17} /><span>GitHub</span><ExternalLink size={12} /></a>
                <a href={profiles[3].url} target="_blank" rel="noreferrer" aria-label="LinkedIn profile, opens in a new tab"><Linkedin size={17} /><span>LinkedIn</span><ExternalLink size={12} /></a>
                <span className="hero-meta">B.TECH · CSE · SRN R25EF173</span>
              </div>
            </div>
            <div className="hero-art reveal" aria-label="Orbital technology artwork with PLV monogram">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="portrait-frame">
                <div className="portrait-image"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85" alt="Rows of illuminated servers in a data center" fetchPriority="high" /><div className="portrait-overlay" /><span className="portrait-initials">PLV<span>.</span></span></div>
                <span className="frame-corner corner-tl" /><span className="frame-corner corner-tr" /><span className="frame-corner corner-bl" /><span className="frame-corner corner-br" />
              </div>
              <div className="floating-label label-top"><span>01 / FOCUS</span><strong>Intelligent systems</strong></div>
              <div className="floating-label label-bottom"><span>LOCATION</span><strong>India <span className="label-spark">✳</span></strong></div>
              <div className="hero-art-caption"><span className="caption-line" /> BUILDING WHAT’S NEXT</div>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
          <div className="hero-side-note">COMPUTER SCIENCE · 2026</div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-width">
            <SectionHeading index="01" eyebrow="A LITTLE CONTEXT" title="Curiosity, meet code." note="A student of computer science. A builder at heart." />
            <div className="about-grid">
              <div className="about-copy reveal">
                <p className="lead-copy">I’m <span>P Lakshmi Venkatesha</span>, a Computer Science and Engineering student drawn to the intersection of software, AI, and real-world problem-solving.</p>
                <p>I enjoy exploring new technologies, building practical projects, working with others, and steadily getting better at programming. For me, learning happens both in the details of the code and in the questions behind it.</p>
                <p>As part of <span className="text-highlight">Smart India Hackathon 2026</span>, I’m exploring an AI-based video analytics concept for border surveillance, deepening my interest in applied computer vision.</p>
                <div className="about-signoff"><span className="signoff-rule" /> ALWAYS LEARNING. ALWAYS BUILDING.</div>
              </div>
              <div className="identity-panel reveal">
                <div className="panel-topline"><span>STUDENT PROFILE</span><span className="panel-status"><span /> ACTIVE</span></div>
                <div className="identity-name">P Lakshmi<br />Venkatesha</div>
                <div className="identity-rows">
                  <div><span>SRN</span><strong>R25EF173</strong></div>
                  <div><span>DEGREE</span><strong>Bachelor of Technology</strong></div>
                  <div><span>BRANCH</span><strong>Computer Science &amp; Engineering</strong></div>
                </div>
                <div className="interest-area"><span className="data-label">AREAS OF INTEREST</span><div className="tag-list">{interests.map((interest) => <span className="tag" key={interest}>{interest}</span>)}</div></div>
                <span className="panel-watermark">PLV</span>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section section-pad" id="skills">
          <div className="page-width">
            <SectionHeading index="02" eyebrow="THE TOOLKIT" title="Things I work with." note="Tools I’m learning, practicing, and reaching for." />
            <div className="skills-grid">{skills.map(({ title, Icon, items }, index) => <motion.article className="skill-card reveal" key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} transition={{ delay: index * 0.07 }}>
              <div className="skill-card-top"><span className="skill-icon"><Icon size={19} /></span><span className="skill-number">0{index + 1}</span></div>
              <h3>{title}</h3><div className="skill-items">{items.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="skill-card-bottom"><span>IN THE TOOLKIT</span><ArrowDownRight size={15} /></div>
            </motion.article>)}</div>
          </div>
        </section>

        <section className="project-section section-pad" id="project">
          <div className="page-width">
            <SectionHeading index="03" eyebrow="FEATURED PROJECT" title="An idea with impact." note="A hackathon concept currently in exploration." />
            <article className="project-card reveal">
              <div className="project-visual">
                <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=85" alt="Security camera monitoring an outdoor area" loading="lazy" />
                <div className="visual-shade" />
                <div className="visual-grid" />
                <div className="visual-crosshair crosshair-one" /><div className="visual-crosshair crosshair-two" />
                <div className="visual-coordinate"><Eye size={14} /><span>VISION SYSTEM / CONCEPT 01</span></div>
                <div className="visual-readout"><span>AI</span><span>CV</span><span>01</span></div>
                <div className="project-status"><span /> IN DEVELOPMENT / CONCEPT</div>
              </div>
              <div className="project-content">
                <div className="project-kicker"><span className="project-badge"><Sparkles size={13} /> SMART INDIA HACKATHON 2026</span><span className="project-index">PROJECT / 01</span></div>
                <h3>AI-based intelligent video analytics platform for border surveillance</h3>
                <p className="project-description">Exploring an AI-powered platform that analyzes feeds from existing CCTV infrastructure to detect people and vehicles, identify restricted-zone intrusions, and generate security alerts.</p>
                <p className="project-description">The concept brings together Python, YOLO, OpenCV, SQL, and computer vision. It’s a chance to learn how intelligent systems can support real-world security monitoring.</p>
                <div className="project-tech"><span>Python</span><span>YOLO</span><span>OpenCV</span><span>SQL</span><span>Artificial intelligence</span><span>Computer vision</span></div>
                <div className="project-bottom">
                  <div className="project-learning"><span className="data-label">WHAT I’M LEARNING</span><p>Computer vision · teamwork · problem-solving · practical AI</p></div>
                  <div className="project-links"><span>Repository link not provided</span><span>Presentation link not provided</span></div>
                </div>
              </div>
              <div className="project-features"><div className="features-heading"><Shield size={17} /><span>CONCEPT CAPABILITIES</span></div><div className="features-list">{features.map((feature, index) => <div key={feature}><span>0{index + 1}</span>{feature}<Check size={14} /></div>)}</div></div>
            </article>
          </div>
        </section>

        <section className="journey-section section-pad" id="journey">
          <div className="page-width">
            <SectionHeading index="04" eyebrow="THE JOURNEY SO FAR" title="Learning by doing." note="Small steps, shared ideas, meaningful problems." />
            <article className="hackathon-card hackathon-feature reveal">
              <div className="hackathon-art"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85" alt="Electronic components on a computer circuit board" loading="lazy" /><div className="hackathon-art-overlay" /><div className="scan-line" /><div className="hack-art-label"><span>SIH / 2026</span><span>● SYSTEMS THINKING</span></div><div className="hack-art-title">IDEAS INTO<br /><span>INTELLIGENCE.</span></div><div className="hack-art-stamp"><Shield size={21} /><span>AI<br />VISION</span></div></div>
              <div className="hackathon-details"><div className="hackathon-heading"><div><p className="eyebrow">STUDENT HACKATHON PARTICIPANT</p><h3>Smart India Hackathon 2026</h3></div><span className="year-stamp">2026</span></div><p>Excited to be part of the Smart India Hackathon 2026 journey, exploring an AI-based intelligent video analytics platform using existing CCTV infrastructure. This experience is strengthening my technical knowledge, collaborative problem-solving, teamwork, and interest in practical technology solutions.</p><div className="highlight-tags">{highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div></div>
            </article>
          </div>
        </section>

        <section className="education-section section-pad" id="education">
          <div className="page-width">
            <SectionHeading index="05" eyebrow="ACADEMIC JOURNEY" title="Foundations in progress." note="Building a strong base in computer science." />
            <div className="education-timeline reveal"><span className="timeline-rail" /><span className="timeline-marker"><GraduationCap size={18} /></span><article className="education-entry"><div className="education-entry-top"><span className="eyebrow">BACHELOR OF TECHNOLOGY</span><span className="education-entry-number">EDUCATION / 01</span></div><h3>Computer Science<br className="education-break" /> and Engineering</h3><p className="education-degree">B.Tech <span>·</span> CSE</p><div className="education-entry-meta"><div><span>STUDENT REGISTRATION</span><strong>R25EF173</strong></div><div><span>INSTITUTION</span><strong>Reva University</strong></div><div><span>ACADEMIC YEAR</span><strong>2026</strong></div></div></article></div>
          </div>
        </section>

        <section className="achievements-section section-pad" id="achievements">
          <div className="page-width">
            <SectionHeading index="06" eyebrow="ACHIEVEMENTS & LEARNING" title="Progress over podiums." note="A few meaningful ways I’m growing, without invented scores or awards." />
            <div className="achievement-grid">{[
              { title: 'Smart India Hackathon 2026', detail: 'Student participant exploring an AI-based video analytics concept.', Icon: Sparkles, tag: 'PARTICIPATION' },
              { title: 'Competitive programming', detail: 'Practicing problem-solving through coding platforms.', Icon: Code2, tag: 'PRACTICE' },
              { title: 'AI & machine learning', detail: 'Exploring intelligent systems, YOLO, and computer vision.', Icon: Cpu, tag: 'EXPLORATION' },
              { title: 'Technical project development', detail: 'Learning through a real-world surveillance analytics concept.', Icon: Braces, tag: 'PROJECT WORK' },
              { title: 'Continuous learning', detail: 'Growing through collaboration, curiosity, and hands-on practice.', Icon: GraduationCap, tag: 'IN PROGRESS' },
            ].map(({ title, detail, Icon, tag }, index) => <article className="achievement-card reveal" key={title}><div className="achievement-card-top"><span className="achievement-icon"><Icon size={19} /></span><span className="achievement-number">0{index + 1}</span></div><span className="achievement-tag">{tag}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
          </div>
        </section>

        <section className="profiles-section section-pad" id="profiles">
          <div className="page-width">
            <SectionHeading index="07" eyebrow="FIND ME ONLINE" title="Where I show up." note="Code, practice, and conversations." />
            <div className="profiles-grid">{profiles.map(({ name, handle, url, action, Icon }, index) => <motion.a className="profile-card reveal" href={url} key={name} target="_blank" rel="noreferrer" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }}>
              <div className="profile-card-top"><span className="profile-icon"><Icon size={21} /></span><ExternalLink size={16} className="profile-external" /></div><span className="profile-label">{name}</span><span className="profile-handle">{handle}</span><span className="profile-action">{action}<ArrowRight size={15} /></span>
            </motion.a>)}</div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="page-width">
            <div className="contact-header reveal"><div><p className="eyebrow">08 / SAY HELLO</p><h2>Let’s connect and<br /><span>build something</span> innovative.</h2></div><p>I’m always glad to meet fellow developers, explore new technologies, collaborate on ideas, and learn from the tech community.</p></div>
            <div className="contact-grid">
              <div className="contact-details reveal"><div className="contact-invite"><span className="availability-dot" /><span>GOOD CONVERSATIONS START HERE</span></div><a className="contact-link" href={profiles[3].url} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Linkedin size={19} /></span><span><small>CONNECT ON LINKEDIN</small><strong>P Lakshmi Venkatesha</strong></span><ExternalLink size={15} /></a><a className="contact-link" href={profiles[0].url} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Github size={19} /></span><span><small>EXPLORE MY CODE</small><strong>GitHub profile</strong></span><ExternalLink size={15} /></a><div className="contact-link contact-email"><span className="contact-link-icon"><Send size={18} /></span><span><small>EMAIL</small><strong>Email address not provided</strong></span></div></div>
              <form className="contact-form reveal" onSubmit={handleContactSubmit}><div className="form-topline"><span>WRITE A NOTE</span><span>NO EMAIL NEEDED</span></div><div className="form-row"><label>Your name<input name="name" type="text" placeholder="Name" autoComplete="name" required /></label><label>Your email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label></div><label>Subject<input name="subject" type="text" placeholder="What’s on your mind?" required /></label><label>Message<textarea name="message" placeholder="Tell me a little about it..." rows={4} required /></label><div className="form-submit-row"><button className="button button-primary" type="submit">Copy message <ArrowDownRight size={17} /></button><span className="form-hint">Copies your note so you can send it via LinkedIn.</span></div><AnimatePresence>{formStatus && <motion.p className="form-status" role="status" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{formStatus}</motion.p>}</AnimatePresence></form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-width footer-inner"><a className="brand footer-brand" href="#home"><span className="brand-mark">V<span>.</span></span><span className="brand-name">PLV<span> / PORTFOLIO</span></span></a><p>Built with curiosity, code &amp; a little caffeine.</p><a className="back-top" href="#home">BACK TO TOP <ArrowUp size={14} /></a><span className="footer-copy">© {new Date().getFullYear()} P Lakshmi Venkatesha</span></div></footer>
      <AnimatePresence>{showTop && <motion.a className="floating-top" href="#home" aria-label="Back to top" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><ArrowUp size={18} /></motion.a>}</AnimatePresence>
    </div>
  );
}

export default App;
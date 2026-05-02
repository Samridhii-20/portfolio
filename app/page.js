'use client'

import { useEffect, useRef, useState } from 'react'
import { Satellite } from 'lucide-react'

// Animated starfield canvas component with parallax
function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const stars = []
    let mouseX = 0
    let mouseY = 0
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05
    }
    window.addEventListener('mousemove', handleMouseMove)
    for (let i = 0; i < 200; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + 0.3, speed: Math.random() * 0.3 + 0.05, twinkle: Math.random() * Math.PI * 2 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.twinkle += 0.02
        const opacity = 0.3 + Math.sin(s.twinkle) * 0.4
        ctx.beginPath()
        ctx.arc(s.x - mouseX, s.y - mouseY, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 180, 255, ${opacity})`
        ctx.fill()
        s.y += s.speed
        if (s.y > canvas.height + 50) { s.y = -50; s.x = Math.random() * canvas.width }
        if (s.x > canvas.width + 50) { s.x = -50 }
        if (s.x < -50) { s.x = canvas.width + 50 }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// Meteor streak component
function Meteors() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="meteor" style={{ top: `${10 + i * 20}%`, right: `${5 + i * 15}%`, animationDelay: `${i * 2.5}s`, animationDuration: `${3 + i}s` }} />
      ))}
    </div>
  )
}

const projectsData = [
  {
    id: 'system-design',
    title: 'System Design Playground',
    year: 'Currently Working On',
    shortDesc: 'Interactive drag-and-drop system architecture simulator. Build architectures with load balancers, servers, databases, and caches. Simulation engine models request flow and identifies bottlenecks.',
    longDesc: 'A comprehensive, interactive web application that allows users to visualize and simulate complex system architectures. Built with a React Flow frontend and an Express/Node.js backend simulation engine, it models realistic request flows through load balancers, servers, caches, and databases. It dynamically calculates response latencies and visually highlights potential bottlenecks, making it an invaluable tool for system design interview preparation and educational purposes.',
    techStack: ['Next.js', 'React Flow', 'Node.js', 'Express'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'calendly-clone',
    title: 'Calendly Clone',
    year: '2026',
    shortDesc: 'Backend-driven scheduling with concurrency-safe logic to prevent double bookings and dynamic time slot generation.',
    longDesc: 'A robust scheduling application mirroring Calendly\'s core functionality. It features a highly secure backend that handles dynamic time slot generation based on availability and timezone conversions. Critical to the architecture is a concurrency-safe booking logic that utilizes database transactions to absolutely prevent double bookings during high-traffic periods.',
    techStack: ['Node.js', 'Express.js', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'ev-sales',
    title: 'EV Sales Forecasting',
    year: '2025-2026',
    shortDesc: 'Predicted EV adoption using Holt Linear time series models on large-scale datasets. Achieved 17.8% MAPE for reliable forecasts and charging infrastructure planning.',
    longDesc: 'A data science initiative focused on predicting Electric Vehicle market adoption trends. By cleaning and aggregating massive datasets using Pandas and NumPy, and applying advanced time-series forecasting models (Holt Linear) via Scikit-learn, the project achieved a Mean Absolute Percentage Error (MAPE) of 17.8%, providing actionable insights for EV charging infrastructure planning.',
    techStack: ['Python', 'Pandas', 'Scikit-learn'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'evently',
    title: 'Evently',
    year: '2024-2025',
    shortDesc: 'Full stack campus events management platform with role-based authentication and authorization. RESTful APIs for event creation, registration, and real-time countdown features.',
    longDesc: 'A complete end-to-end event management platform designed for campus organizations. It implements a secure dual-registration flow differentiating between attendees and organizers. The system includes a protected admin dashboard for manual organizer approval, comprehensive RESTful APIs for seamless CRUD operations on events, and a highly responsive Next.js frontend featuring dynamic event countdowns and ticketing.',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express.js'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    featured: true
  }
]

export default function Page() {
  const resumeUrl = 'https://drive.google.com/file/d/1p4zKsNfI2zSMq2QeTxU3IFdvhNK2gZEw/view?usp=sharing'
  const linkedinUrl = 'https://www.linkedin.com/in/samridhi-choudhary-188889281/'
  const githubUrl = 'https://github.com/Samridhii-20'
  const codolioUrl = 'https://codolio.com/profile/Samridhi_20'

  const formRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const [selectedProject, setSelectedProject] = useState(null)
  const [typingText, setTypingText] = useState('')
  const fullText = "At the intersection of boundless creativity and technology — building intelligent solutions for real-world challenges."

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 40)
    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSent(false)
    setError(false)

    const formData = new FormData(formRef.current)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name: formData.get('from_name'),
          from_email: formData.get('from_email'),
          message: formData.get('message'),
        }),
      })
      if (!res.ok) throw new Error()
      setSending(false)
      setSent(true)
      formRef.current.reset()
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      console.error('Error sending message:', err)
      setSending(false)
      setError(true)
      setTimeout(() => setError(false), 4000)
    }
  }

  return (
    <>
      <StarField />
      <Meteors />
      <div className="nebula-orb nebula-orb-1" />
      <div className="nebula-orb nebula-orb-2" />
      <div className="nebula-orb nebula-orb-3" />

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#030712]/70 backdrop-blur-xl border-b border-violet-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto font-['Space_Grotesk'] tracking-tight">
          <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">SAMRIDHI.DEV</div>
          <div className="hidden md:flex items-center gap- gutter">
            <a className="text-slate-400 font-medium hover:text-violet-300 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300 px-4" href="#about">About</a>
            <a className="text-slate-400 font-medium hover:text-violet-300 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300 px-4" href="#skills">Skills</a>
            <a className="text-slate-400 font-medium hover:text-violet-300 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300 px-4" href="#projects">Projects</a>
            <a className="text-slate-400 font-medium hover:text-violet-300 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300 px-4" href="#leadership">Leadership</a>
            <a className="text-slate-400 font-medium hover:text-violet-300 hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300 px-4" href="#contact">Contact</a>
          </div>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2 rounded-full font-label-caps text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95 duration-300 tracking-widest text-xs">Resume</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center pt-20 relative overflow-hidden" id="hero">
          <div className="aurora-bg">
            <div className="aurora-gradient"></div>
          </div>

          <Satellite className="floating-shape shape-1" size={180} strokeWidth={1} />
          <Satellite className="floating-shape shape-2" size={120} strokeWidth={1} />
          <Satellite className="floating-shape shape-3" size={150} strokeWidth={1} />
          <Satellite className="floating-shape shape-4" size={200} strokeWidth={1} />


          <div className="space-y-8 relative z-20 animate-fade-in-up">
            <p className="font-label-caps text-violet-400 tracking-[0.4em] uppercase text-sm mb-4">Computer Science Student & Developer</p>

            <h1 className="font-h1 text-[4rem] md:text-[6rem] lg:text-[7rem] font-bold text-white leading-[1.1] glow-text-intense tracking-tight mb-6">
              SAMRIDHI <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent block md:inline">CHOUDHARY</span>
            </h1>

            <div className="h-20 flex items-center justify-center">
              <p className="font-body-lg text-lg md:text-xl text-slate-300 max-w-2xl mx-auto typing-cursor font-light leading-relaxed">
                {typingText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
              <a className="btn-magnetic px-12 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-label-caps text-white shadow-[0_0_40_px_rgba(139,92,246,0.6)] transition-transform hover:-translate-y-2 hover:scale-105 tracking-[0.2em] text-xs font-bold" href="#projects">
                VIEW WORK
              </a>
              <a className="btn-magnetic px-12 py-5 border border-violet-500/40 rounded-full font-label-caps text-violet-300 hover:bg-violet-500/20 hover:border-violet-400 hover:shadow-[0_0_30_px_rgba(139,92,246,0.3)] transition-all transform hover:-translate-y-1 tracking-[0.2em] text-xs font-bold backdrop-blur-sm" href="#contact">
                CONNECT
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-2 text-violet-400/70 z-20">
            <span className="font-label-caps text-[10px] tracking-widest">SCROLL TO EXPLORE</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </section>

        {/* About */}
        <section className="py-stack-lg flex flex-col md:flex-row items-center gap-20" id="about">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition duration-700"></div>
            <div className="relative glass-card rounded-xl overflow-hidden aspect-square">
              <img alt="Samridhi Choudhary" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="/profile.jpg" />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="font-h2 text-h2 text-white">Professional <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Summary</span></h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              B.Tech Computer Science student specializing in Data Science, with a strong foundation in data structures, algorithms, and system design, and a primary focus on software development. Skilled in designing efficient, scalable systems and writing clean, maintainable code to solve complex real-world problems. Experienced in backend engineering, RESTful API design, and database management, with additional hands-on exposure to full-stack web development. Passionate about building reliable, high-impact software and continuously improving problem-solving and engineering skills in collaborative environments.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-5 rounded-xl text-center">
                <div className="text-violet-400 font-h3 text-3xl font-bold">2027</div>
                <div className="font-label-caps text-slate-500 text-[10px] mt-1">Bennett University</div>
              </div>
              <div className="glass-card p-5 rounded-xl text-center">
                <div className="text-fuchsia-400 font-h3 text-3xl font-bold">10+</div>
                <div className="font-label-caps text-slate-500 text-[10px] mt-1">Projects</div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-stack-lg" id="skills">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-h2 text-white">Technical <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Skills</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Languages */}
            <div className="glass-card p-6 rounded-xl glow-border hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-blue-400 text-3xl mb-3">code_blocks</span>
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white mb-2">Languages</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Python, C++, JavaScript (ES6+), HTML5, CSS3, SQL</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-label-caps">Core</span>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-label-caps">Web</span>
              </div>
            </div>
            {/* Core CS Concepts */}
            <div className="glass-card p-6 rounded-xl glow-border hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-emerald-400 text-3xl mb-3">account_tree</span>
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white mb-2">Core CS Concepts</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Data Structures & Algorithms, Object-Oriented Programming, System Design, DBMS</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-label-caps">Architecture</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-label-caps">Logic</span>
              </div>
            </div>
            {/* Data Science */}
            <div className="glass-card p-6 rounded-xl glow-border hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-fuchsia-400 text-3xl mb-3">query_stats</span>
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white mb-2">Data Science</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Pandas, NumPy, Matplotlib, Scikit-learn, Machine Learning</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-label-caps">Analytics</span>
                <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-label-caps">Modeling</span>
              </div>
            </div>
            {/* Tools */}
            <div className="glass-card p-6 rounded-xl glow-border hover:-translate-y-1 transition-all duration-300">
              <span className="material-symbols-outlined text-violet-400 text-3xl mb-3">build</span>
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white mb-2">Tools & Tech</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Git, GitHub, Node.js, Express, React, Next.js, Tailwind CSS, PostgreSQL, Figma, Jira</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-label-caps">Workflow</span>
                <span className="px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-label-caps">Frameworks</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-stack-lg" id="projects">
          <h2 className="font-h2 text-h2 mb-16 text-white">Selected <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Projects</span></h2>

          <div className="flex flex-col gap-10">
            {/* Featured Projects */}
            {projectsData.filter(p => p.featured).map(project => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative glass-card rounded-2xl overflow-hidden border border-violet-500/10 flex flex-col md:flex-row h-auto md:h-[400px] cursor-pointer hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500"
              >
                <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent z-10 md:hidden"></div>
                  <img alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={project.image} />
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-4">
                  <div className="font-label-caps text-violet-400 flex justify-between text-xs tracking-widest"><span>Featured Project</span><span>{project.year}</span></div>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map(t => <span key={t} className="text-[10px] font-label-caps text-violet-300 px-3 py-1 border border-violet-500/30 rounded-full">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}

            {/* Standard Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {projectsData.filter(p => !p.featured).map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group relative glass-card rounded-2xl overflow-hidden border border-violet-500/10 cursor-pointer hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={project.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <span className="material-symbols-outlined text-white">open_in_full</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white group-hover:text-violet-300 transition-colors">{project.title}</h3>
                      <span className="font-label-caps text-slate-500 text-[10px]">{project.year}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map(t => <span key={t} className="text-[10px] font-label-caps text-slate-500 px-2.5 py-1 border border-slate-700 rounded-full">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-stack-lg" id="leadership">
          <h2 className="font-h2 text-h2 mb-16 text-center text-white">Leadership & <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Initiatives</span></h2>
          <div className="relative max-w-4xl mx-auto pl-10 space-y-10">
            <div className="absolute left-[18px] top-0 bottom-0 w-[2px] timeline-glow"></div>
            <div className="relative">
              <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.8)] border-2 border-[#030712]"></div>
              <div className="glass-card p-8 rounded-xl hover:bg-violet-500/5 transition-colors duration-300">
                <span className="font-label-caps text-violet-400 text-xs tracking-widest">Student Initiatives</span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mt-1">Community Leadership</h3>
                <p className="text-slate-500 uppercase text-[10px] font-bold tracking-widest mt-1">NSS · Girls Health Club · Student Cabinet</p>
                <p className="text-slate-400 mt-3 text-sm leading-relaxed">Led social media, PR, and outreach initiatives across multiple organizations. Coordinated with cross-functional teams and streamlined communication workflows to effectively manage large student communities.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-fuchsia-500 shadow-[0_0_15px_rgba(236,72,153,0.8)] border-2 border-[#030712]"></div>
              <div className="glass-card p-8 rounded-xl hover:bg-fuchsia-500/5 transition-colors duration-300">
                <span className="font-label-caps text-fuchsia-400 text-xs tracking-widest">Core Strengths</span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mt-1">Soft Skills</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Effective Communication', 'Problem-Solving', 'Analytical Thinking', 'Teamwork', 'Adaptability', 'Time Management'].map(s => (
                    <span key={s} className="bg-slate-800/60 border border-slate-700/50 px-4 py-2 rounded-full text-sm text-slate-300">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-stack-lg" id="contact">
          <div className="glass-card rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-[120px]"></div>
            <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
              <h2 className="font-h2 text-h2 text-white">Initiate <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Contact</span></h2>
              <p className="text-lg text-slate-400">Ready to collaborate on something amazing? Drop a message into the void.</p>
              <form ref={formRef} className="space-y-6 mt-10 text-left" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-caps text-[10px] text-slate-500 ml-4 tracking-widest">Full Name</label>
                    <input name="from_name" type="text" required placeholder="John Doe" className="w-full bg-[#0a0f1e] border border-violet-500/10 rounded-full px-6 py-4 text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-[10px] text-slate-500 ml-4 tracking-widest">Satellite Email</label>
                    <input name="from_email" type="email" required placeholder="john@example.com" className="w-full bg-[#0a0f1e] border border-violet-500/10 rounded-full px-6 py-4 text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-slate-500 ml-4 tracking-widest">The Mission (Message)</label>
                  <textarea name="message" rows="4" required placeholder="How can we build together?" className="w-full bg-[#0a0f1e] border border-violet-500/10 rounded-3xl px-6 py-4 text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none"></textarea>
                </div>
                <button type="submit" disabled={sending} className="w-full py-5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-400 rounded-full font-label-caps text-white tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                  {sending ? 'TRANSMITTING...' : sent ? '✓ MESSAGE SENT!' : error ? '✕ FAILED – TRY AGAIN' : 'TRANSMIT DATA PACKET'}
                </button>
              </form>
              <div className="flex justify-center gap-6 pt-8">
                <a className="p-4 glass-card rounded-full hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300 flex items-center gap-2" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <span className="font-label-caps text-xs tracking-widest">LinkedIn</span>
                </a>
                <a className="p-4 glass-card rounded-full hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300 flex items-center gap-2" href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <span className="font-label-caps text-xs tracking-widest">GitHub</span>
                </a>
                <a className="p-4 glass-card rounded-full hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300 flex items-center gap-2" href={codolioUrl} target="_blank" rel="noopener noreferrer">
                  <span className="font-label-caps text-xs tracking-widest">Codolio</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-20 bg-[#030712]/90 backdrop-blur-md border-t border-violet-500/10 font-['Space_Grotesk'] text-sm uppercase tracking-widest relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-6 max-w-7xl mx-auto">
          <div className="text-slate-600">© 2026 Samridhi Choudhary</div>
          <div className="flex gap-8">
            <a className="text-slate-600 hover:text-violet-400 transition-all" href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-slate-600 hover:text-violet-400 transition-all" href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-slate-600 hover:text-violet-400 transition-all" href={codolioUrl} target="_blank" rel="noopener noreferrer">Codolio</a>
          </div>
        </div>
      </footer>
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>

          <div className="relative w-full max-w-3xl max-h-full overflow-y-auto glass-card rounded-3xl border border-violet-500/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] animate-[pulse_3s_ease-in-out_infinite]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-[#0a0f1e]/80 hover:bg-violet-600/20 rounded-full backdrop-blur-sm transition-colors group border border-violet-500/20"
            >
              <span className="material-symbols-outlined text-slate-300 group-hover:text-white transition-colors">close</span>
            </button>

            <div className="h-64 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent z-10"></div>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-8 md:p-12 relative z-20 -mt-16">
              <div className="font-label-caps text-violet-400 flex gap-4 text-xs tracking-widest mb-2">
                <span>{selectedProject.featured ? 'Featured Project' : 'Project'}</span>
                <span>•</span>
                <span>{selectedProject.year}</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white mb-6">{selectedProject.title}</h3>

              <div className="prose prose-invert prose-p:text-slate-400 prose-p:leading-relaxed max-w-none mb-8">
                <p className="text-base md:text-lg">{selectedProject.longDesc}</p>
              </div>

              <div>
                <h4 className="font-label-caps text-xs tracking-widest text-slate-500 mb-4">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map(t => (
                    <span key={t} className="text-xs font-medium text-violet-200 px-4 py-2 border border-violet-500/30 bg-violet-500/10 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import React, { useMemo, useState } from 'react';
import {
  Search, Sparkles, LayoutGrid, Compass, Heart, Settings, ArrowUpRight,
  WandSparkles, Code2, Image, AudioLines, FileText, Bot, Copy, Check,
  Menu, X, Plus, Zap, Star
} from 'lucide-react';

const tools = [
  { name: 'ChatGPT', category: 'Writing', desc: 'Write, brainstorm, learn and solve problems with an AI assistant.', icon: Bot, color: 'violet', tag: 'Popular', url: 'https://chatgpt.com' },
  { name: 'Gemini', category: 'Research', desc: 'Explore ideas, summarize information and work across different tasks.', icon: Sparkles, color: 'blue', tag: 'Explore', url: 'https://gemini.google.com' },
  { name: 'Claude', category: 'Writing', desc: 'Draft thoughtful content and work through complex ideas.', icon: FileText, color: 'orange', tag: 'Writing', url: 'https://claude.ai' },
  { name: 'Perplexity', category: 'Research', desc: 'Research questions and discover sources from across the web.', icon: Compass, color: 'cyan', tag: 'Research', url: 'https://perplexity.ai' },
  { name: 'Canva', category: 'Design', desc: 'Create presentations, graphics and social media designs.', icon: Image, color: 'pink', tag: 'Design', url: 'https://canva.com' },
  { name: 'ElevenLabs', category: 'Audio', desc: 'Create natural-sounding AI voice and audio experiences.', icon: AudioLines, color: 'green', tag: 'Audio', url: 'https://elevenlabs.io' },
  { name: 'GitHub Copilot', category: 'Coding', desc: 'Get AI assistance while writing and understanding code.', icon: Code2, color: 'slate', tag: 'Coding', url: 'https://github.com/features/copilot' },
  { name: 'Adobe Firefly', category: 'Design', desc: 'Generate and explore creative visual ideas with AI.', icon: WandSparkles, color: 'yellow', tag: 'Creative', url: 'https://firefly.adobe.com' },
];

const categories = ['All tools', 'Writing', 'Research', 'Design', 'Coding', 'Audio'];

function App() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All tools');
  const [favorites, setFavorites] = useState(['ChatGPT']);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => tools.filter(tool => {
    const matchesCategory = active === 'All tools' || tool.category === active;
    const matchesQuery = `${tool.name} ${tool.desc} ${tool.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesFavorites = !showFavorites || favorites.includes(tool.name);
    return matchesCategory && matchesQuery && matchesFavorites;
  }), [active, query, showFavorites, favorites]);

  const toggleFavorite = (name) => setFavorites(current =>
    current.includes(name) ? current.filter(item => item !== name) : [...current, name]
  );

  const copyPrompt = async () => {
    const prompt = 'Help me compare these AI tools for a beginner project. Explain their best use cases, free options, and limitations in simple language.';
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      alert(prompt);
    }
  };

  const Sidebar = () => (
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Sparkles size={19}/></span><span>orbit<span className="brand-dot">.</span></span></div>
      <div className="workspace-label">WORKSPACE</div>
      <button className={`side-link ${!showFavorites ? 'selected' : ''}`} onClick={() => {setShowFavorites(false);setMobileOpen(false)}}><LayoutGrid size={18}/> Discover</button>
      <button className={`side-link ${showFavorites ? 'selected' : ''}`} onClick={() => {setShowFavorites(true);setMobileOpen(false)}}><Heart size={18}/> Favorites <span className="side-count">{favorites.length}</span></button>
      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon"><Zap size={17}/></div>
          <strong>Your AI space</strong>
          <p>Keep useful tools in one place and explore something new.</p>
          <span className="upgrade-pill">PERSONAL DEMO</span>
        </div>
        <button className="side-link muted"><Settings size={18}/> Settings</button>
        <div className="profile-row"><div className="avatar">A</div><div><strong>My workspace</strong><small>Free plan</small></div><span className="profile-dots">•••</span></div>
      </div>
    </aside>
  );

  return (
    <div className="app-shell">
      <Sidebar />
      {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu/></button>
          <div className="breadcrumb">Workspace <span>/</span> <b>{showFavorites ? 'Favorites' : 'Discover'}</b></div>
          <div className="top-actions"><span className="status-dot"></span><span className="status-text">All systems ready</span><div className="top-avatar">A</div></div>
        </header>

        <div className="content-wrap">
          <section className="hero-grid">
            <div className="hero-card">
              <div className="eyebrow"><span className="eyebrow-star">✦</span> YOUR AI TOOLKIT</div>
              <h1>Find the right AI<br/><span>for your next idea.</span></h1>
              <p>Explore useful AI tools for writing, research, design, coding and more — all in one simple space.</p>
              <div className="hero-meta"><span><span className="tiny-live"></span> Curated collection</span><span className="meta-divider"></span><span>{tools.length} tools to explore</span></div>
            </div>
            <div className="welcome-card">
              <div className="orbit-art"><div className="orbit-ring ring-one"></div><div className="orbit-ring ring-two"></div><div className="orbit-core"><Sparkles size={28}/></div><span className="orbit-spark spark-a">✦</span><span className="orbit-spark spark-b">✧</span></div>
              <div className="welcome-copy"><span>MAKE SOMETHING</span><strong>Brilliant today.</strong><small>Your next idea starts here.</small></div>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card"><div className="stat-icon purple"><LayoutGrid size={18}/></div><div><small>TOOLS IN LIBRARY</small><strong>08</strong></div><span className="stat-note">Explore all</span></div>
            <div className="stat-card"><div className="stat-icon coral"><Heart size={18}/></div><div><small>YOUR FAVORITES</small><strong>{String(favorites.length).padStart(2,'0')}</strong></div><span className="stat-note">Saved tools</span></div>
            <div className="stat-card stat-tip"><div className="tip-icon"><Star size={17}/></div><div><small>QUICK TIP</small><strong>Try one tool at a time.</strong><p>Small experiments help you find what works.</p></div></div>
          </section>

          <section className="tools-section">
            <div className="section-heading"><div><div className="eyebrow dark-eyebrow">THE COLLECTION</div><h2>{showFavorites ? 'Your favorites' : 'Explore AI tools'} <span className="heading-count">{filtered.length}</span></h2><p>Pick a category or search for a tool to get started.</p></div><div className="search-box"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tools..." aria-label="Search tools"/><kbd>⌕</kbd></div></div>
            <div className="category-row">{categories.map(category => <button key={category} className={`category-chip ${active === category ? 'active' : ''}`} onClick={() => setActive(category)}>{category}</button>)}</div>
            <div className="tool-grid">
              {filtered.map((tool, index) => {
                const Icon = tool.icon;
                return <article className={`tool-card card-${index % 4}`} key={tool.name}>
                  <div className="tool-card-top"><div className={`tool-icon ${tool.color}`}><Icon size={21}/></div><button className={`favorite-btn ${favorites.includes(tool.name) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(tool.name)} aria-label={`Toggle ${tool.name} favorite`}><Heart size={17} fill={favorites.includes(tool.name) ? 'currentColor' : 'none'}/></button></div>
                  <div className="tool-info"><div className="tool-title-row"><h3>{tool.name}</h3><span className="tool-tag">{tool.tag}</span></div><p>{tool.desc}</p></div>
                  <a className="open-tool" href={tool.url} target="_blank" rel="noreferrer">Visit tool <ArrowUpRight size={16}/></a>
                </article>
              })}
              {filtered.length === 0 && <div className="empty-state"><Search size={25}/><strong>No tools found</strong><span>Try another search or category.</span><button onClick={() => {setQuery('');setActive('All tools');setShowFavorites(false)}}>Clear filters</button></div>}
            </div>
          </section>

          <section className="prompt-banner">
            <div className="prompt-icon"><Sparkles size={20}/></div><div className="prompt-text"><span>NEED A STARTING POINT?</span><strong>Ask AI to help you choose a tool.</strong><p>Copy this beginner-friendly prompt and try it in your favorite AI assistant.</p></div><button className="copy-btn" onClick={copyPrompt}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Copied!' : 'Copy prompt'}</button>
          </section>
          <footer className="footer"><span>ORBIT <i>•</i> AI TOOL DISCOVERY</span><span>Made for learning & experimenting</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;
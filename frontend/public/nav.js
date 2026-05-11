(function () {
  const path = window.location.pathname;
  const page = path.replace(/^\//, '').replace(/\.html$/, '') || 'index';
  function isActive(href) {
    return page === href.replace(/^\//, '').replace(/\.html$/, '');
  }

  document.head.insertAdjacentHTML('beforeend', `<style>
    #main-nav {
      position:fixed; top:0; left:0; right:0; z-index:1000;
      display:flex; align-items:center; height:58px;
      background:transparent; border-bottom:1px solid transparent;
      font-family:'InterDisplay',sans-serif;
      transition:border-color .35s;
      overflow:visible;
    }

    #main-nav::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(10,18,50,0.98) 0%,
        rgba(15,24,60,0.92) 35%,
        rgba(20,32,72,0.72) 70%,
        rgba(26,40,80,0.35) 100%
      );
      opacity: 0;
      transition: opacity 0.45s ease;
      pointer-events: none;
      z-index: 0;
    }
    #main-nav.scrolled::before { opacity: 1; }
    #main-nav.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,0.18); }

    /* ── HOME LOGO LINK ── */
    #nav-home-logo {
      position: absolute;
      left: 248px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    #nav-home-logo img {
      height: 26px;
      width: auto;
      display: block;
      filter: brightness(0) invert(1);
      opacity: 0.88;
      transition: opacity 0.2s;
    }
    #nav-home-logo:hover img { opacity: 1; }

    /* ── Desktop nav links ── */
    #main-nav .nav-links-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 390px;
      position: relative;
      z-index: 1;
      overflow: visible;
    }
    #main-nav .nav-links {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: visible;
    }
    #main-nav .nav-links>li { position:relative; overflow:visible; }
    #main-nav .nav-links>li>a,
    #main-nav .nav-links>li>span {
      color:rgba(255,255,255,0.82); font-size:13px; font-weight:500;
      letter-spacing:.01em; text-decoration:none; line-height:58px;
      white-space:nowrap; display:block;
      padding:0 20px;
      cursor:pointer;
    }
    #main-nav .nav-links>li>a.active,
    #main-nav .nav-links>li>span.active { color:#fff; font-weight:400; }

    /* Standard dropdown */
    #main-nav .nav-dd {
      position:absolute; top:57px; left:0; min-width:200px;
      background:rgba(8,15,44,0.97); border:1px solid rgba(255,255,255,0.1);
      backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
      padding:8px 0;
      opacity:0; pointer-events:none; transform:translateY(-8px);
      transition:opacity .22s,transform .22s; z-index:200;
    }
    #main-nav .nav-links>li:hover .nav-dd { opacity:1;pointer-events:auto;transform:translateY(0); }
    #main-nav .nav-dd a {
      display:block; padding:9px 20px;
      color:rgba(255,255,255,0.75);
      font-size:12.5px; font-weight:500; text-decoration:none;
      transition:background .18s, padding-left .2s ease; line-height:1.4;
    }
    #main-nav .nav-dd a:hover { background:rgba(255,255,255,0.07); padding-left:28px; }

    /* Right-side controls */
    #main-nav .nav-right {
      display:flex; align-items:center; gap:24px; padding-right:32px;
      flex-shrink:0; position:relative; z-index:1;
    }

    /* Search icon — sits at 200px from the right edge */
    #main-nav .nav-search {
      background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.78);
      display:flex; align-items:center; padding:6px;
      position: absolute;
      right: 200px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }
    #main-nav .nav-search svg{width:18px;height:18px;}
    #main-nav .nav-search:hover { color: #fff; }

    /* GET TICKETS */
    #main-nav .nav-tickets {
      position:relative; overflow:hidden;
      background:#1a2744; color:#fff;
      border:1.5px solid rgba(255,255,255,0.38); border-radius:0;
      cursor:pointer; padding:9px 22px;
      font-size:11.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
      font-family:'InterDisplay',sans-serif; text-decoration:none;
      display:inline-flex; align-items:center; white-space:nowrap;
      transition:background .22s,border-color .22s,transform .15s;
    }
    #main-nav .nav-tickets:hover{background:#0d1b3e;border-color:rgba(255,220,60,.75);transform:translateY(-1px);}
    #main-nav .nav-tickets canvas{position:absolute;inset:0;pointer-events:none;z-index:0;}
    #main-nav .nav-tickets span{position:relative;z-index:1;}

    /* ── SEARCH OVERLAY ── */
    #nav-search-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(5, 10, 30, 0.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 80px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    #nav-search-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    #nav-search-box {
      width: 100%;
      max-width: 680px;
      padding: 0 24px;
      position: relative;
    }
    #nav-search-input {
      width: 100%;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.22);
      border-bottom: 2px solid rgba(255,255,255,0.6);
      color: #fff;
      font-family: 'InterDisplay', sans-serif;
      font-size: 28px;
      font-weight: 400;
      padding: 18px 56px 18px 20px;
      outline: none;
      letter-spacing: 0.01em;
      transition: border-color 0.2s;
    }
    #nav-search-input::placeholder { color: rgba(255,255,255,0.35); }
    #nav-search-input:focus { border-color: rgba(255,255,255,0.85); border-bottom-color: #fff; }
    #nav-search-close {
      position: absolute;
      right: 36px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(255,255,255,0.55);
      font-size: 28px;
      line-height: 1;
      padding: 4px;
      font-family: sans-serif;
      transition: color 0.18s;
    }
    #nav-search-close:hover { color: #fff; }
    #nav-search-hint {
      margin-top: 16px;
      font-size: 11px;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.38);
      text-align: center;
      font-family: 'InterDisplay', sans-serif;
      text-transform: uppercase;
    }
    #nav-search-results {
      width: 100%;
      max-width: 680px;
      padding: 24px 24px 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: calc(100vh - 260px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.15) transparent;
    }
    #nav-search-results::-webkit-scrollbar { width: 4px; }
    #nav-search-results::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
    .search-result-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px 18px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      text-decoration: none;
      cursor: pointer;
      transition: background 0.18s, border-color 0.18s;
    }
    .search-result-item:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
    .search-result-icon {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      min-width: 90px;
      padding-top: 2px;
      flex-shrink: 0;
    }
    .search-result-content { flex: 1; min-width: 0; }
    .search-result-title {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
      font-family: 'InterDisplay', sans-serif;
    }
    .search-result-excerpt {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      line-height: 1.5;
      font-family: 'InterDisplay', sans-serif;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .search-result-item mark {
      background: none;
      color: rgba(255,220,60,0.95);
      font-weight: 600;
    }
    #nav-search-no-results {
      display: none;
      color: rgba(255,255,255,0.45);
      font-size: 14px;
      font-family: 'InterDisplay', sans-serif;
      text-align: center;
      padding: 32px 0;
    }
    #nav-search-categories {
      width: 100%;
      max-width: 680px;
      padding: 32px 24px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .search-category-btn {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.6);
      font-family: 'InterDisplay', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 7px 14px;
      cursor: pointer;
      transition: background 0.18s, color 0.18s;
    }
    .search-category-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

    /* ── HAMBURGER BUTTON (mobile only) ── */
    #nav-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 40px; height: 40px;
      background: none; border: none;
      cursor: pointer;
      position: relative; z-index: 1001;
      padding: 8px;
      margin-right: 12px;
    }
    #nav-hamburger span {
      display: block;
      width: 22px; height: 1.5px;
      background: #fff;
      transition: transform 0.3s ease, opacity 0.3s ease;
      transform-origin: center;
    }
    #nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    #nav-hamburger.open span:nth-child(2) { opacity: 0; }
    #nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    /* ── MOBILE LOGO (left side, mobile only) ── */
    #nav-mobile-logo {
      display: none;
      position: relative; z-index: 1;
      padding-left: 20px;
      flex: 1;
    }
    #nav-mobile-logo img {
      height: 24px; width: auto;
      display: block;
      filter: brightness(0) invert(1);
    }

    /* ── MOBILE MENU OVERLAY ── */
    #nav-mobile-menu {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(10,18,48,0.98);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 999;
      flex-direction: column;
      justify-content: center;
      padding: 80px 28px 48px;
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    #nav-mobile-menu.open {
      display: flex;
      opacity: 1;
      pointer-events: auto;
    }

    #nav-mobile-menu .mob-nav-list {
      list-style: none; margin: 0; padding: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    #nav-mobile-menu .mob-nav-list li {
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    #nav-mobile-menu .mob-nav-list > li > a,
    #nav-mobile-menu .mob-nav-list > li > span {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 0;
      color: #fff; text-decoration: none;
      font-size: 22px; font-weight: 700;
      letter-spacing: -0.01em;
      font-family: 'InterDisplay', sans-serif;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    #nav-mobile-menu .mob-nav-list > li > a:hover,
    #nav-mobile-menu .mob-nav-list > li > span:hover { opacity: 0.65; }
    #nav-mobile-menu .mob-nav-list > li > a.active { opacity: 0.5; }

    /* Mobile sub-menu */
    #nav-mobile-menu .mob-sub {
      list-style: none; margin: 0; padding: 0 0 12px 12px;
      display: none;
    }
    #nav-mobile-menu .mob-sub.open { display: block; }
    #nav-mobile-menu .mob-sub li a {
      display: block; padding: 9px 0;
      color: rgba(255,255,255,0.65);
      font-size: 14px; font-weight: 500;
      font-family: 'InterDisplay', sans-serif;
      text-decoration: none;
      transition: color 0.2s;
    }
    #nav-mobile-menu .mob-sub li a:hover { color: #fff; }

    /* Mobile chevron */
    .mob-chevron {
      display: inline-block;
      width: 20px; height: 20px;
      border-right: 2px solid rgba(255,255,255,0.5);
      border-bottom: 2px solid rgba(255,255,255,0.5);
      transform: rotate(45deg);
      transition: transform 0.25s;
      flex-shrink: 0;
      margin-left: 12px;
      position: relative; top: -3px;
    }
    .mob-chevron.open { transform: rotate(-135deg); top: 3px; }

    /* Mobile GET TICKETS button */
    #nav-mobile-menu .mob-tickets {
      display: block; margin-top: 32px;
      padding: 16px 28px;
      background: transparent;
      border: 1.5px solid rgba(255,255,255,0.4);
      color: #fff;
      font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; text-decoration: none;
      font-family: 'InterDisplay', sans-serif;
      text-align: center;
      transition: background 0.2s, border-color 0.2s;
    }
    #nav-mobile-menu .mob-tickets:hover {
      background: rgba(255,255,255,0.07);
      border-color: rgba(255,220,60,0.6);
    }

    /* Mobile social icons in menu */
    #nav-mobile-menu .mob-socials {
      display: flex; gap: 20px; align-items: center;
      margin-top: 28px;
    }
    #nav-mobile-menu .mob-socials a {
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      display: flex; align-items: center;
      transition: color 0.2s;
    }
    #nav-mobile-menu .mob-socials a:hover { color: #fff; }

    /* ── Global electric button effects ── */
    .btn-primary, .btn-outline-dark, .btn-outline-white,
    .btn-apply, .btn-cta-white, .btn-cta-filled, .btn-learn,
    .hero-cta, .intro-cta, .network-cta, .section-cta,
    .challenge-cta, a.btn-tickets, button.btn-tickets, .btn-get-pass,
    .showcase-cta-btn, .day-card, .more-card,
    [class*="btn-"]:not(.req-btn):not(.faq-q-btn):not(.nav-tickets):not(.nav-search):not(.showcase-detail-back):not(.speaker-detail-back) {
      position:relative !important;
      overflow:hidden !important;
      transition: background 0.28s ease, color 0.22s ease,
                  border-color 0.28s ease, transform 0.18s ease !important;
    }
    .btn-primary:hover { background: #0d1b3e; color: #fff; border-color: rgba(100,160,255,0.65); transform: translateY(-1px); }
    .btn-outline-dark:hover { background: #0d1b3e; color: #fff; border-color: rgba(100,160,255,0.65); transform: translateY(-1px); }
    .btn-outline-white:hover { background: #0d1b3e; color: #fff; border-color: rgba(100,160,255,0.65); transform: translateY(-1px); }
    .btn-primary canvas, .btn-outline-dark canvas, .btn-outline-white canvas,
    .btn-apply canvas, .btn-cta-white canvas, .btn-cta-filled canvas,
    .btn-learn canvas, .hero-cta canvas, .intro-cta canvas,
    .network-cta canvas, .section-cta canvas, .challenge-cta canvas,
    a.btn-tickets canvas, button.btn-tickets canvas, .btn-get-pass canvas,
    .showcase-cta-btn canvas,
    [class*="btn-"] canvas {
      position:absolute !important; inset:0 !important;
      pointer-events:none !important; z-index:0 !important;
    }
    .btn-primary > *, .btn-outline-dark > *, .btn-outline-white > *,
    .btn-apply > *, .btn-cta-white > *, .btn-cta-filled > *,
    .btn-learn > *, .hero-cta > *, .intro-cta > *,
    .network-cta > *, .section-cta > *, .challenge-cta > *,
    a.btn-tickets > *, button.btn-tickets > *, .btn-get-pass > *,
    .showcase-cta-btn > *,
    [class*="btn-"] > * {
      position:relative !important; z-index:1 !important;
    }

    .curatorial-view-link, .showcases-link, .showcase-card-more,
    .showcase-detail-link, .partners-link, .more-card-link,
    .sched-location, .sched-speakers a, .nav-dd a, .ticker-item,
    .carousel-logo-name, .hero-eyebrow, .showcases-header a,
    .curatorial-view-link, .more-card-top span,
    [class*="-link"]:not(#main-nav *):not(.showcase-detail-back):not(.speaker-detail-back) {
      display:inline-block;
      transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                  color 0.2s ease,
                  letter-spacing 0.22s ease !important;
    }
    .curatorial-view-link:hover, .showcases-link:hover, .showcase-card-more:hover,
    .showcase-detail-link:hover, .partners-link:hover, .more-card-link:hover,
    .sched-location:hover, .sched-speakers a:hover, .showcases-header a:hover,
    .more-card-top span:hover,
    [class*="-link"]:not(#main-nav *):not(.showcase-detail-back):not(.speaker-detail-back):hover {
      transform: scale(1.1);
      transform-origin: left center;
      letter-spacing: 0.07em;
    }
    #main-nav .nav-dd a {
      transition: background 0.18s, color 0.18s, padding-left 0.2s ease !important;
    }

    /* ══ RESPONSIVE BREAKPOINTS ══ */

    @media (max-width: 1024px) {
      #nav-home-logo { left: 180px; }
      #main-nav .nav-links-wrap { padding-left: 300px; }
      #main-nav .nav-right { padding-right: 24px; }
      #main-nav .nav-links>li>a,
      #main-nav .nav-links>li>span { font-size: 12px; padding: 0 14px; }
      #main-nav .nav-tickets { padding: 8px 16px; font-size: 10.5px; }
      #main-nav .nav-search { right: 48px; }
    }

    @media (max-width: 768px) {
      #main-nav .nav-links-wrap { display: none; }
      #main-nav .nav-right { display: none; }
      #nav-hamburger { display: flex; }
      #nav-mobile-logo { display: flex; align-items: center; }
      #nav-home-logo { display: none; }
      #main-nav::before { opacity: 1 !important; }
      #main-nav .nav-search { display: none; }
    }
  </style>`);

  const links = [
    { label:'Festival Programme',   href:'/programme.html', dd:[
      { label:'Expo',      href:'/fes-expo.html' },
      { label:'Market',    href:'/fes-market.html' },
      { label:'Schedule',  href:'/fes-schedule.html' },
    ]},
    { label:'Signature Programmes', href:'/sig-awards.html' },
    { label:'Discover', href:'#', dd:[
      { label:'About Us',   href:'/about.html' },
      { label:'Venues',     href:'/discover/venues.html' },
      { label:'Partners',   href:'/discover/partners.html' },
      { label:'Archive',    href:'/discover/archive.html' },
      { label:'Resources',  href:'/discover/resources.html' },
    ]},
  ];

  /* ── Desktop nav items ── */
  const items = links.map((l, i) => {
    const active = isActive(l.href);
    if (l.dd) {
      const ddHTML = `<div class="nav-dd">${l.dd.map(d=>`<a href="${d.href}">${d.label}</a>`).join('')}</div>`;
      return `<li data-i="${i}"><span class="${active ? 'active' : ''}">${l.label} ▾</span>${ddHTML}</li>`;
    }
    return `<li data-i="${i}"><a href="${l.href}"${active ? ' class="active"' : ''}>${l.label}</a></li>`;
  }).join('');

  /* ── Mobile menu items (includes Home) ── */
  const mobileLinks = [{ label:'Home', href:'/index.html' }, ...links];
  const mobItems = mobileLinks.map((l, i) => {
    const active = isActive(l.href);
    if (l.dd) {
      const subItems = l.dd.map(d => `<li><a href="${d.href}">${d.label}</a></li>`).join('');
      return `
        <li>
          <span class="${active ? 'active' : ''}" data-mob-toggle="${i}">
            ${l.label}
            <span class="mob-chevron" id="mob-chev-${i}"></span>
          </span>
          <ul class="mob-sub" id="mob-sub-${i}">${subItems}</ul>
        </li>`;
    }
    return `<li><a href="${l.href}"${active ? ' class="active"' : ''}>${l.label}</a></li>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="main-nav">
      <!-- Home logo (desktop left) -->
      <a href="/index.html" id="nav-home-logo" aria-label="Fak'ugesi Festival Home">
        <img src="/images/logos/fakugesi/logo_fakugesi_light.svg" alt="Fak'ugesi Festival" />
      </a>

      <!-- Mobile logo (left, mobile only) -->
      <div id="nav-mobile-logo">
        <a href="/index.html">
          <img src="/images/logos/fakugesi/logo_fakugesi_light.svg" alt="Fak'ugesi Festival" />
        </a>
      </div>

      <!-- Desktop links -->
      <div class="nav-links-wrap" id="nav-links-wrap">
        <ul class="nav-links" id="nav-list">${items}</ul>
      </div>

      <!-- Search icon — absolutely positioned at 200px from right (aligned with cross icons) -->
      <button class="nav-search" id="nav-search-btn" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>

      <!-- Desktop right: tickets -->
      <div class="nav-right">
        <a class="nav-tickets" id="nav-tickets" href="/tickets.html">
          <canvas id="nav-bolt-canvas"></canvas>
          <span>GET TICKETS</span>
        </a>
      </div>

      <!-- Hamburger (mobile) -->
      <button id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- Mobile full-screen menu -->
    <div id="nav-mobile-menu" role="dialog" aria-label="Navigation menu">
      <ul class="mob-nav-list">${mobItems}</ul>
      <a class="mob-tickets" href="/tickets.html">Get Tickets →</a>
      <div class="mob-socials">
        <a href="https://www.instagram.com/fakugesi/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
        </a>
        <a href="https://x.com/fakugesi" target="_blank" rel="noopener" aria-label="X">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622z"/></svg>
        </a>
        <a href="https://www.facebook.com/fakugesi" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
      </div>
    </div>

    <!-- Search overlay -->
    <div id="nav-search-overlay" role="dialog" aria-label="Search" aria-modal="true">
      <div id="nav-search-box">
        <input
          type="text"
          id="nav-search-input"
          placeholder="Search Fak'ugesi…"
          autocomplete="off"
          spellcheck="false"
          aria-label="Search"
        />
        <button id="nav-search-close" aria-label="Close search">×</button>
      </div>
      <div id="nav-search-hint">Press Esc to close · Enter to go</div>
      <div id="nav-search-categories"></div>
      <div id="nav-search-results"></div>
      <div id="nav-search-no-results">No results found. Try a different search.</div>
    </div>
  `);

  /* ── Scroll behaviour ── */
  window.addEventListener('scroll', () => {
    document.getElementById('main-nav').classList.toggle('scrolled', scrollY > 40);
  }, { passive:true });
  document.getElementById('main-nav').classList.toggle('scrolled', scrollY > 40);

  /* ── Hamburger toggle ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Mobile sub-menu toggles ── */
  mobileMenu.querySelectorAll('[data-mob-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const i = el.dataset.mobToggle;
      const sub = document.getElementById(`mob-sub-${i}`);
      const chev = document.getElementById(`mob-chev-${i}`);
      if (sub) sub.classList.toggle('open');
      if (chev) chev.classList.toggle('open');
    });
  });

  /* Close mobile menu on link click */
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ══════════════════════════════════════
     SEARCH SYSTEM
  ══════════════════════════════════════ */
  const SEARCH_INDEX = [
    /* HOME */
    { title:'Home', section:'Home', url:'/index.html', tags:['home','festival','fakugesi','2026','african','digital','innovation','african imaginaries','theme','johannesburg'] },
    { title:'2026 Theme: African Imaginaries', section:'Home', url:'/index.html', tags:['african imaginaries','2026 theme','afrofuturism','speculative','creative energy','october'] },
    { title:'Get Involved', section:'Home', url:'/index.html', tags:['get involved','investors','funders','volunteers','expo showcases','sponsors'] },
    { title:'Festival Dates', section:'Home', url:'/index.html', tags:['07 october','12 october','2026','dates','when','braamfontein'] },

    /* PROGRAMME */
    { title:'Festival Programme', section:'Programme', url:'/programme.html', tags:['programme','programme 2026','events','what is on','lineup'] },

    /* EXPO */
    { title:'Fak\'ugesi Expo', section:'Expo', url:'/fes-expo.html', tags:['expo','showcases','exhibitions','curatorial frequencies','imagination engines','memory engines','future engines','toor bos','displays','artworks','immersive media','digital art'] },
    { title:'Curatorial Frequencies', section:'Expo', url:'/fes-expo.html', tags:['curatorial','imagination engines','memory engines','future engines','ai','heritage','circuits','planetary'] },
    { title:'Showcases & Exhibitions', section:'Expo', url:'/fes-expo.html', tags:['showcase','exhibition','toor bos','university of johannesburg','UJ'] },
    { title:'Want to Showcase', section:'Expo', url:'/fes-expo.html', tags:['exhibit','showcase your work','apply','show at expo'] },

    /* MARKET */
    { title:'Fak\'ugesi Market', section:'Market', url:'/fes-market.html', tags:['market','marketplace','exhibitors','buy','sell','startup','business','vendors','maputo fast forward','products'] },
    { title:'Market Exhibitors', section:'Market', url:'/fes-market.html', tags:['exhibitors','stalls','creative organisation','maputo fast forward','market stall'] },
    { title:'Get a Market Spot', section:'Market', url:'/fes-market.html', tags:['apply','market spot','vendor','sell','exhibit'] },

    /* SCHEDULE */
    { title:'Festival Schedule', section:'Schedule', url:'/fes-schedule.html', tags:['schedule','timetable','programme','agenda','sessions','panels','keynotes','talks','workshops'] },
    { title:'AI Symposium', section:'Schedule', url:'/fes-schedule.html', tags:['ai symposium','artificial intelligence','tuesday','wednesday','research','adam pantanowitz','pierre saal','vukosi marivate','hannah andrews','avril joffe'] },
    { title:'A Provocation – Keynote', section:'Schedule', url:'/fes-schedule.html', tags:['keynote','adam pantanowitz','provocation','tshimologong'] },
    { title:'Policy by Design', section:'Schedule', url:'/fes-schedule.html', tags:['policy','design','creative futures','ai','panel','avril joffe','zwelakhe gila','kieran jones'] },
    { title:'A Radical Reimagining', section:'Schedule', url:'/fes-schedule.html', tags:['radical reimagining','african ai','artist perspective','hannah andrews','vukosi marivate'] },
    { title:'The AI Workshop', section:'Schedule', url:'/fes-schedule.html', tags:['workshop','ai workshop','pierre saal'] },
    { title:'A Seat at the Table', section:'Schedule', url:'/fes-schedule.html', tags:['seat at the table','power','representation','thobile chittenden','samukelisiwe dube','masentle nzimande'] },
    { title:'Pitchathon Coaching Workshop', section:'Schedule', url:'/fes-schedule.html', tags:['pitchathon','pitch','coaching','wic','startups','wednesday'] },
    { title:'JAMZ Video Game Challenge – Day 1', section:'Schedule', url:'/fes-schedule.html', tags:['jamz','gaming','esports','video game','league','wednesday'] },
    { title:'Awards: Jury Q&A', section:'Schedule', url:'/fes-schedule.html', tags:['awards','jury','qa','all welcome'] },
    { title:'Pitchathon Grand Finale', section:'Schedule', url:'/fes-schedule.html', tags:['pitchathon','finale','grand final','r20000','prize','saturday'] },
    { title:'Dala Khona Speedrun Marathon', section:'Schedule', url:'/fes-schedule.html', tags:['dala khona','gaming','speedrun','arcade','saturday'] },
    { title:'JAMZ Grand Finals', section:'Schedule', url:'/fes-schedule.html', tags:['jamz','finals','animation','video game','sunday'] },
    { title:'Immersive Africa: Closing Screening', section:'Schedule', url:'/fes-schedule.html', tags:['immersive africa','kancica','digital dome','closing','screening'] },

    /* SIGNATURE: AWARDS */
    { title:'Fak\'ugesi Awards', section:'Awards', url:'/sig-awards.html', tags:['awards','celebrating','african digital creativity','application','submit','2026'] },
    { title:'Awards Categories', section:'Awards', url:'/sig-awards.html', tags:['categories','immersive media','digital art','interactive design','game design','motion graphics','sound art','tech innovation','vr','ar','xr'] },
    { title:'Awards Jury 2026', section:'Awards', url:'/sig-awards.html', tags:['jury','judges','mickael newton','ubisoft','amara osei','leila benali','tunde fashola','nadia kamara','marcus dlamini'] },
    { title:'Awards Requirements', section:'Awards', url:'/sig-awards.html', tags:['requirements','eligibility','how to apply','criteria'] },
    { title:'Awards 2025 Winners', section:'Awards', url:'/sig-awards.html', tags:['winners','2025','past winners','unmuted','voices of fire','afroverse','digital griot','ubuntu code','jopee dairo'] },

    /* SIGNATURE: DALA KHONA */
    { title:'Dala Khona – African Gaming Arcade', section:'Dala Khona', url:'/sig-dalakhona.html', tags:['dala khona','gaming','arcade','african games','game developers','indie','joburg games fest','speedrun','tournament','retro'] },
    { title:'Join Dala Khona Developer Network', section:'Dala Khona', url:'/sig-dalakhona.html', tags:['developer network','game dev','get involved','dala khona'] },

    /* SIGNATURE: PRO */
    { title:'Fak\'ugesiPRO', section:'PRO', url:'/sig-fakugesipro.html', tags:['pro','industry platform','professional','intermediaries','policymakers','entrepreneurs','investors','creative organisations','networking','industry'] },
    { title:'Join Industry Network', section:'PRO', url:'/sig-fakugesipro.html', tags:['industry network','pro','join','get involved'] },
    { title:'PRO 2025 Highlights', section:'PRO', url:'/sig-fakugesipro.html', tags:['highlights','2025','panel','a seat at the table','speakers'] },

    /* SIGNATURE: IMMERSIVE AFRICA */
    { title:'Immersive Africa', section:'Immersive Africa', url:'/sig-immersive.html', tags:['immersive africa','afriverse','digital dome','xr','vr','dome','kancica','kwasukasukela','dream feel factory','wits'] },
    { title:'Kancícà – Dome Premiere', section:'Immersive Africa', url:'/sig-immersive.html', tags:['kancica','south african premiere','dream feel factory','mansa','digital dome','screening'] },
    { title:'Kwasukasukela – Dome Screening', section:'Immersive Africa', url:'/sig-immersive.html', tags:['kwasukasukela','dome','ongoing','screening','digital dome'] },

    /* SIGNATURE: JAMZ */
    { title:'JAMZ – Animation & Video Game Hackathon', section:'JAMZ', url:'/sig-jamz.html', tags:['jamz','animation','video game','hackathon','high octane','esports','league','tournament','team sakuga'] },
    { title:'JAMZ Animation Challenge 2026', section:'JAMZ', url:'/sig-jamz.html', tags:['animation challenge','tournament of power','single elimination','apply','jamz 2026'] },
    { title:'JAMZ Video Game Challenge 2026', section:'JAMZ', url:'/sig-jamz.html', tags:['video game challenge','esports league','tournament of power','gaming','apply','jamz'] },
    { title:'JAMZ 2025 Winners', section:'JAMZ', url:'/sig-jamz.html', tags:['jamz winners','2025','team sakuga','thobile chittenden','samukelisiwe dube'] },
    { title:'JAMZ Prizes 2026', section:'JAMZ', url:'/sig-jamz.html', tags:['prizes','jamz prize','r20000','animation winner','video game winner'] },
    { title:'JAMZ Requirements', section:'JAMZ', url:'/sig-jamz.html', tags:['requirements','jamz requirements','eligibility','rules'] },

    /* SIGNATURE: PITCHATHON */
    { title:'Pitchathon', section:'Pitchathon', url:'/sig-pitchathon.html', tags:['pitchathon','pitch','shark tank','startup','entrepreneur','apply','high stakes','business','innovation'] },
    { title:'Pitchathon 2026 Jury', section:'Pitchathon', url:'/sig-pitchathon.html', tags:['jury','judges','adam pantanowitz','wits innovation centre','pitchathon'] },
    { title:'Pitchathon Prizes 2026', section:'Pitchathon', url:'/sig-pitchathon.html', tags:['prizes','r20000','wic pgdip','audience choice','social impact','tech innovation','runner up'] },
    { title:'Pitchathon FAQ', section:'Pitchathon', url:'/sig-pitchathon.html', tags:['faq','questions','who can apply','deadline','submissions','shortlisted','how long is the pitch'] },
    { title:'Pitchathon 2025 Winners', section:'Pitchathon', url:'/sig-pitchathon.html', tags:['winners','2025','neo shingenwana','amara nwosu','studio tshwane','kagiso molefe'] },
    { title:'Apply to Pitchathon', section:'Pitchathon', url:'/sig-pitchathon.html', tags:['apply','application','submit','pitchathon apply','submissions close'] },

    /* DISCOVER: ABOUT */
    { title:'About Fak\'ugesi', section:'About', url:'/about.html', tags:['about','who we are','history','fakugesi','festival','what is fakugesi','south africa','johannesburg','digital innovation'] },
    { title:'Festival Team', section:'About', url:'/about.html', tags:['team','staff','festival director','alby michaels','programme manager','communications'] },
    { title:'Previous Editions', section:'About', url:'/about.html', tags:['previous editions','past','2024','2023','2022','2021','2020','untilunlocked','digital futures','reconnect','african origins','new worlds','history'] },
    { title:'Get in Touch', section:'About', url:'/about.html', tags:['contact','email','phone','address','41 juta street','braamfontein','hello@fakugesi','get in touch'] },

    /* DISCOVER: VENUES */
    { title:'Festival Venues', section:'Venues', url:'/discover/venues.html', tags:['venues','locations','map','where','tshimologong precinct','wits digital dome','braamfontein','johannesburg','directions','getting there'] },
    { title:'Tshimologong Precinct', section:'Venues', url:'/discover/venues.html', tags:['tshimologong','41 juta street','braamfontein','venue','main venue','wits'] },
    { title:'Wits Digital Dome', section:'Venues', url:'/discover/venues.html', tags:['digital dome','wits','yale road','braamfontein','dome','planetarium','immersive'] },

    /* DISCOVER: PARTNERS */
    { title:'Festival Partners', section:'Partners', url:'/discover/partners.html', tags:['partners','sponsors','funders','supporters','tshimologong','wits university','goethe','pro helvetia','eunic','eu delegation','austrian embassy'] },
    { title:'Main Partners', section:'Partners', url:'/discover/partners.html', tags:['main partners','tshimologong','wits','digital dome'] },
    { title:'Expo Partners', section:'Partners', url:'/discover/partners.html', tags:['expo partners','goethe','habitatxr','prohelvetia','eunic','acf','austrian embassy'] },
    { title:'Become a Partner', section:'Partners', url:'/discover/partners.html', tags:['partner','sponsor','collaborate','join as partner'] },

    /* DISCOVER: ARCHIVE */
    { title:'Festival Archive', section:'Archive', url:'/discover/archive.html', tags:['archive','gallery','history','past festivals','photos','trailers','posters','time machine','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'] },
    { title:'2023 – More Flow', section:'Archive', url:'/discover/archive.html', tags:['2023','more flow','eduardo cachucho','archive','festival poster'] },

    /* DISCOVER: RESOURCES */
    { title:'Research & Resources', section:'Resources', url:'/discover/resources.html', tags:['resources','research','reports','download','pdf','intermediaries','tegan bristow','creative economy','knowledge base'] },
    { title:'Intermediaries Research Report', section:'Resources', url:'/discover/resources.html', tags:['intermediaries report','research','2023','dr tegan bristow','creative economy','download pdf'] },

    /* TICKETS */
    { title:'Get Tickets', section:'Tickets', url:'/tickets.html', tags:['tickets','buy tickets','get tickets','attend','passes','pricing','festival pass','industry pass','student'] },
  ];

  const categoryColors = {
    'Home':'#4a90d9', 'Programme':'#7b68ee', 'Expo':'#e05a1e',
    'Market':'#3a8a6a', 'Schedule':'#c46200', 'Awards':'#b8860b',
    'Dala Khona':'#1a7a4a', 'PRO':'#3a5a9a', 'Immersive Africa':'#7a3a8a',
    'JAMZ':'#c43a3a', 'Pitchathon':'#2a6a8a', 'About':'#5a6a7a',
    'Venues':'#4a7a4a', 'Partners':'#6a4a7a', 'Archive':'#7a5a3a',
    'Resources':'#3a6a7a', 'Tickets':'#a03a3a'
  };

  const overlay = document.getElementById('nav-search-overlay');
  const searchInput = document.getElementById('nav-search-input');
  const searchResults = document.getElementById('nav-search-results');
  const searchClose = document.getElementById('nav-search-close');
  const searchNoResults = document.getElementById('nav-search-no-results');
  const searchCategories = document.getElementById('nav-search-categories');
  let activeCategory = null;

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 50);
    showCategories();
    renderResults('');
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    searchInput.value = '';
    activeCategory = null;
    searchResults.innerHTML = '';
    searchNoResults.style.display = 'none';
  }

  function showCategories() {
    const cats = [...new Set(SEARCH_INDEX.map(i => i.section))];
    searchCategories.innerHTML = cats.map(c =>
      `<button class="search-category-btn" data-cat="${c}" style="border-color:${categoryColors[c] || 'rgba(255,255,255,0.15)'}">${c}</button>`
    ).join('');
    searchCategories.querySelectorAll('.search-category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (activeCategory === btn.dataset.cat) {
          activeCategory = null;
          btn.style.background = '';
          btn.style.color = '';
        } else {
          activeCategory = btn.dataset.cat;
          searchCategories.querySelectorAll('.search-category-btn').forEach(b => {
            b.style.background = '';
            b.style.color = '';
          });
          btn.style.background = (categoryColors[btn.dataset.cat] || '#555') + '33';
          btn.style.color = '#fff';
        }
        renderResults(searchInput.value);
      });
    });
  }

  function highlight(text, query) {
    if (!query) return text;
    const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${esc})`, 'gi'), '<mark>$1</mark>');
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    let results = SEARCH_INDEX;

    if (activeCategory) {
      results = results.filter(r => r.section === activeCategory);
    }

    if (q) {
      results = results.filter(r => {
        const combined = (r.title + ' ' + r.section + ' ' + r.tags.join(' ')).toLowerCase();
        return combined.includes(q);
      }).sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(q) ? 0 : 1;
        const bTitle = b.title.toLowerCase().includes(q) ? 0 : 1;
        return aTitle - bTitle;
      });
    }

    if (!q && !activeCategory) {
      results = results.slice(0, 8);
    }

    searchResults.innerHTML = '';
    searchNoResults.style.display = 'none';

    if (results.length === 0) {
      searchNoResults.style.display = 'block';
      return;
    }

    results.slice(0, 12).forEach(r => {
      const el = document.createElement('a');
      el.href = r.url;
      el.className = 'search-result-item';
      const matchedTag = q ? r.tags.find(t => t.toLowerCase().includes(q)) : null;
      el.innerHTML = `
        <div class="search-result-icon" style="color:${categoryColors[r.section] || 'rgba(255,255,255,0.35)'}">${r.section}</div>
        <div class="search-result-content">
          <div class="search-result-title">${highlight(r.title, q)}</div>
          ${matchedTag ? `<div class="search-result-excerpt">${highlight(matchedTag, q)}</div>` : ''}
        </div>
      `;
      el.addEventListener('click', () => closeSearch());
      searchResults.appendChild(el);
    });
  }

  /* Search button click */
  document.getElementById('nav-search-btn').addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);

  /* Keyboard */
  searchInput.addEventListener('input', () => renderResults(searchInput.value));
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'Enter') {
      const first = searchResults.querySelector('.search-result-item');
      if (first) { first.click(); }
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    if ((e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) && !overlay.classList.contains('open')) {
      e.preventDefault();
      openSearch();
    }
  });

  /* Click outside to close */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  /* ── Electric lightning on GET TICKETS ── */
  (function () {
    const btn = document.getElementById('nav-tickets');
    const cv  = document.getElementById('nav-bolt-canvas');
    if (!btn || !cv) return;
    const ctx = cv.getContext('2d');
    let raf = null, on = false, bolts = [], f = 0;
    function rs() { cv.width = btn.offsetWidth; cv.height = btn.offsetHeight; }
    function seg(x1,y1,x2,y2,r,d) {
      if (d <= 0) return [[x1,y1],[x2,y2]];
      const mx = (x1+x2)/2 + (Math.random()-.5)*r, my = (y1+y2)/2 + (Math.random()-.5)*r*.4;
      return [...seg(x1,y1,mx,my,r*.55,d-1), ...seg(mx,my,x2,y2,r*.55,d-1).slice(1)];
    }
    function spawn() {
      const W = cv.width, H = cv.height;
      return { pts:seg(W*(.1+Math.random()*.8),0,W*(.1+Math.random()*.8),H,W*.28,4),
               life:1, decay:.08+Math.random()*.06, w:.7+Math.random()*.9 };
    }
    function draw(b) {
      const a = Math.max(0, b.life);
      [[b.w*5,`rgba(60,120,255,${a*.28})`,'rgba(60,140,255,.7)',12],
       [b.w*.7,`rgba(200,230,255,${a*.8})`,'rgba(180,220,255,.9)',4]]
      .forEach(([lw,sc,sh,sb]) => {
        ctx.save(); ctx.beginPath(); ctx.moveTo(b.pts[0][0],b.pts[0][1]);
        b.pts.slice(1).forEach(p => ctx.lineTo(p[0],p[1]));
        ctx.strokeStyle=sc; ctx.lineWidth=lw; ctx.shadowColor=sh; ctx.shadowBlur=sb;
        ctx.stroke(); ctx.restore();
      });
    }
    function tick() {
      if (!on) return; rs(); ctx.clearRect(0,0,cv.width,cv.height); f++;
      if (f%9 === 0) { bolts.push(spawn()); if (Math.random() > .55) bolts.push(spawn()); }
      bolts = bolts.filter(b => b.life > 0);
      bolts.forEach(b => { draw(b); b.life -= b.decay; });
      raf = requestAnimationFrame(tick);
    }
    btn.addEventListener('mouseenter', () => { on=true; rs(); bolts=[]; f=0; if (!raf) raf=requestAnimationFrame(tick); });
    btn.addEventListener('mouseleave', () => { on=false; if(raf){cancelAnimationFrame(raf);raf=null;} ctx.clearRect(0,0,cv.width,cv.height); });
  })();

  /* ── Apply electric lightning to ALL site buttons ── */
  (function applyGlobalElectric() {
    const BTN_SEL = [
  '.btn-primary', '.btn-outline-dark', '.btn-outline-white',
  '.btn-apply', '.btn-cta-white', '.btn-cta-filled', '.btn-learn',
  '.hero-cta', '.intro-cta', '.network-cta', '.section-cta',
  '.challenge-cta', 'a.btn-tickets', 'button.btn-tickets', '.btn-get-pass',
  '.showcase-cta-btn',
  '[class*="btn-"]:not(.req-btn):not(.faq-q-btn):not(.nav-search):not(.showcase-detail-back):not(.speaker-detail-back)'
].join(',');

    function makeElectric(btn) {
      if (btn.dataset.electricDone) return;
      if (btn.closest('#main-nav')) return;
      btn.dataset.electricDone = '1';
      const cv = document.createElement('canvas');
      cv.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;';
      btn.appendChild(cv);
      const ctx = cv.getContext('2d');
      let raf = null, on = false, bolts = [], f = 0;
      function rs() { cv.width = btn.offsetWidth; cv.height = btn.offsetHeight; }
      function seg(x1,y1,x2,y2,r,d) {
        if (d<=0) return [[x1,y1],[x2,y2]];
        const mx=(x1+x2)/2+(Math.random()-.5)*r, my=(y1+y2)/2+(Math.random()-.5)*r*.4;
        return [...seg(x1,y1,mx,my,r*.55,d-1), ...seg(mx,my,x2,y2,r*.55,d-1).slice(1)];
      }
      function spawn() {
        const W=cv.width, H=cv.height;
        return { pts:seg(W*(.1+Math.random()*.8),0,W*(.1+Math.random()*.8),H,W*.28,4),
                 life:1, decay:.08+Math.random()*.06, w:.7+Math.random()*.9 };
      }
      function draw(b) {
        const a = Math.max(0,b.life);
        [[b.w*5,`rgba(60,120,255,${a*.28})`,'rgba(60,140,255,.7)',12],
         [b.w*.7,`rgba(200,230,255,${a*.8})`,'rgba(180,220,255,.9)',4]]
        .forEach(([lw,sc,sh,sb]) => {
          ctx.save(); ctx.beginPath(); ctx.moveTo(b.pts[0][0],b.pts[0][1]);
          b.pts.slice(1).forEach(p => ctx.lineTo(p[0],p[1]));
          ctx.strokeStyle=sc; ctx.lineWidth=lw; ctx.shadowColor=sh; ctx.shadowBlur=sb;
          ctx.stroke(); ctx.restore();
        });
      }
      function tick() {
        if (!on) return; rs(); ctx.clearRect(0,0,cv.width,cv.height); f++;
        if (f%9===0) { bolts.push(spawn()); if(Math.random()>.55) bolts.push(spawn()); }
        bolts = bolts.filter(b=>b.life>0);
        bolts.forEach(b=>{ draw(b); b.life-=b.decay; });
        raf = requestAnimationFrame(tick);
      }
      btn.addEventListener('mouseenter', ()=>{ on=true; rs(); bolts=[]; f=0; if(!raf) raf=requestAnimationFrame(tick); });
      btn.addEventListener('mouseleave', ()=>{ on=false; if(raf){cancelAnimationFrame(raf);raf=null;} ctx.clearRect(0,0,cv.width,cv.height); });
    }

    function attachAll() {
      try { document.querySelectorAll(BTN_SEL).forEach(makeElectric); } catch(e) {}
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachAll);
    else attachAll();
    setTimeout(attachAll, 600);
    setTimeout(attachAll, 1800);
  })();

})();
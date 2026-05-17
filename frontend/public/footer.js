/**
 * Fak'ugesi Shared Footer
 * Injects consistent footer + social band on every page.
 * Drop <script src="footer.js"></script> before </body> on each page.
 */
(function () {

  const style = document.createElement('style');
  style.textContent = `
    @font-face { font-family:'InterDisplay'; src:url('/fonts/InterDisplay-Regular.otf') format('opentype'); font-weight:400; }
    @font-face { font-family:'InterDisplay'; src:url('/fonts/InterDisplay-Medium.otf') format('opentype'); font-weight:500; }
    @font-face { font-family:'InterDisplay'; src:url('/fonts/InterDisplay-SemiBold.otf') format('opentype'); font-weight:600; }
    @font-face { font-family:'InterDisplay'; src:url('/fonts/InterDisplay-Bold.otf') format('opentype'); font-weight:700; }

    /* ── SOCIAL BAND ── */
    #fug-social-band {
      background: #1a2744;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 200px;
      font-family: 'InterDisplay', sans-serif;
    }
    #fug-social-band p {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      letter-spacing: 0.02em;
      margin: 0;
    }
    #fug-social-band .fsb-icons {
      display: flex;
      gap: 16px;
    }
    #fug-social-band .fsb-icons a {
      color: #fff;
      text-decoration: none;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
    }
    #fug-social-band .fsb-icons a:hover { opacity: 0.5; }

    /* ── FOOTER ── */
    #fug-footer {
      background: #fff;
      border-top: 1px solid rgba(26,39,68,0.1);
      color: #0d1b3e;
      position: relative;
      font-family: 'InterDisplay', sans-serif;
      padding: 0;
    }

    /* Cross icons — 18px, absolutely positioned */
    .fug-footer-cross {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      position: absolute;
      z-index: 2;
    }
    .fug-footer-cross svg { width: 18px; height: 18px; }

    /* Three-column grid aligned to 200px margins */
    #fug-footer .fug-footer-inner {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 64px 200px;
      gap: 0 40px;
      position: relative;
    }

    #fug-footer .fug-footer-col {
      display: flex;
      flex-direction: column;
    }

    /* Col 1 — brand name */
    #fug-footer .fug-footer-brand {
      font-weight: 700;
      font-size: 16px;
      color: #0d1b3e;
      margin: 0 0 10px 0;
      font-family: 'InterDisplay', sans-serif;
      letter-spacing: -0.01em;
    }

    /* Col 1 — address */
    #fug-footer .fug-footer-addr {
      font-size: 14px;
      line-height: 1.8;
      color: #5a6070;
      margin: 0;
      font-family: 'InterDisplay', sans-serif;
    }

    /* Col 2 — "Contact us" label */
    #fug-footer .fug-footer-col-title {
      font-size: 16px;
      font-weight: 700;
      color: #0d1b3e;
      margin: 0 0 12px 0;
      font-family: 'InterDisplay', sans-serif;
      letter-spacing: -0.01em;
      text-transform: none;
    }

    /* Plain links */
    #fug-footer a {
      color: #1a2744;
      font-size: 14px;
      display: block;
      line-height: 2.1;
      text-decoration: none;
      font-family: 'InterDisplay', sans-serif;
    }
    #fug-footer a:hover { text-decoration: underline; }

    /* Third column: logo + copyright side by side */
    #fug-footer .fug-footer-right {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    /* Logo — height matches the 3-line copyright text block:
       font-size 16px × line-height 1.8 × 3 lines ≈ 86px;
       set to 90px so it sits flush top-to-bottom with the text. */
    #fug-footer .fug-footer-logo {
      height: 90px;
      width: auto;
      display: block;
      flex-shrink: 0;
    }

    /* Copyright */
    #fug-footer .fug-footer-copy {
      font-size: 16px;
      font-weight: 700;
      color: #0d1b3e;
      line-height: 1.8;
      margin: 0;
      font-family: 'InterDisplay', sans-serif;
      letter-spacing: -0.01em;
    }

    /* ── TABLET (≤1024px) ── */
    @media (max-width: 1024px) {
      #fug-social-band { padding: 16px 48px; }
      #fug-social-band p { font-size: 13px; }
      #fug-footer .fug-footer-inner { padding: 40px 48px; gap: 0 32px; }
      .fug-footer-cross { display: none; }
    }

    /* ── MOBILE (≤768px) ── */
    @media (max-width: 768px) {
      #fug-social-band {
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        text-align: center;
      }
      #fug-social-band p { font-size: 12px; }
      #fug-social-band .fsb-icons { justify-content: center; gap: 20px; }
      #fug-social-band .fsb-icons a svg { width: 22px; height: 22px; }

      #fug-footer .fug-footer-inner {
        grid-template-columns: 1fr;
        padding: 32px 20px 28px;
        gap: 28px 0;
      }
      #fug-footer .fug-footer-col { width: 100%; }
      #fug-footer .fug-footer-brand { font-size: 15px; }
      #fug-footer .fug-footer-addr { font-size: 13px; }
      #fug-footer .fug-footer-col-title { font-size: 15px; }
      #fug-footer a { font-size: 13px; line-height: 2.1; }
      #fug-footer .fug-footer-right {
        align-items: center;
        padding-top: 8px;
        border-top: 1px solid rgba(26,39,68,0.08);
      }
      #fug-footer .fug-footer-logo { height: 56px; }
      #fug-footer .fug-footer-copy { font-size: 15px; }
      .fug-footer-cross { display: none; }
    }

    /* ── SMALL MOBILE (≤480px) ── */
    @media (max-width: 480px) {
      #fug-social-band p { font-size: 11px; }
    }
  `;
  document.head.appendChild(style);

  /* SVG cross helper — 18px viewBox */
  const crossSVG = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="9" y1="0" x2="9" y2="18" stroke="#1a2744" stroke-width="1.5"/>
    <line x1="0"  y1="9" x2="18" y2="9" stroke="#1a2744" stroke-width="1.5"/>
  </svg>`;

  const html = `
    <div id="fug-social-band">
      <p>Follow us on socials @fakugesi</p>
      <div class="fsb-icons">
        <a href="https://www.instagram.com/fakugesi/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
          </svg>
        </a>
        <a href="https://x.com/fakugesi" target="_blank" rel="noopener" aria-label="X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/fakugesi" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
      </div>
    </div>

    <footer id="fug-footer">

      <!-- TOP ROW crosses — 18px size -->
      <span class="fug-footer-cross" style="top:24px; left:calc(200px - 9px);">${crossSVG}</span>
      <span class="fug-footer-cross" style="top:24px; left:calc(50% - 9px);">${crossSVG}</span>
      <span class="fug-footer-cross" style="top:24px; right:calc(200px - 9px);">${crossSVG}</span>

      <!-- BOTTOM ROW crosses — 18px size -->
      <span class="fug-footer-cross" style="bottom:24px; left:calc(200px - 9px);">${crossSVG}</span>
      <span class="fug-footer-cross" style="bottom:24px; right:calc(200px - 9px);">${crossSVG}</span>

      <div class="fug-footer-inner">

        <!-- Col 1: Brand + Address -->
        <div class="fug-footer-col">
          <p class="fug-footer-brand">Fak'ugesi Festival</p>
          <p class="fug-footer-addr">41 Juta Street, Braamfontein<br>Johannesburg, South Africa</p>
        </div>

        <!-- Col 2: Contact -->
        <div class="fug-footer-col">
          <p class="fug-footer-col-title">Contact us</p>
          <a href="mailto:hello@fakugesi.co.za">hello@fakugesi.co.za</a>
          <a href="tel:+27117178156">+27 11 717 8156</a>
        </div>

        <!-- Col 3: Logo + Copyright -->
        <div class="fug-footer-col">
          <div class="fug-footer-right">
            <img class="fug-footer-logo" src="/images/logos/fakugesi/logo_fakugesi_dark.svg" alt="Fak'ugesi Festival" />
            <p class="fug-footer-copy">© 2026<br>Fak'ugesi Festival<br>All Rights Reserved</p>
          </div>
        </div>

      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

})();
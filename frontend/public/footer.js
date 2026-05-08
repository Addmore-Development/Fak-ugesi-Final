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
      padding: 18px 248px;
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

    /* Cross icons — 22px, dark blue, absolutely positioned */
    .fug-footer-cross {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      position: absolute;
      z-index: 2;
    }
    .fug-footer-cross svg {
      width: 22px;
      height: 22px;
    }

    /*
      Three-column grid:
        Col 1 starts at 248px from left  (left cross)
        Col 2 starts at 50% centre       (middle cross)
        Col 3 ends at 248px from right   (right cross)
      Using padding on the inner to align col 1 & 3, and equal thirds for the grid.
    */
    #fug-footer .fug-footer-inner {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 56px 248px;
      gap: 0 40px;
      position: relative;
    }

    #fug-footer .fug-footer-col {
      display: flex;
      flex-direction: column;
    }

    #fug-footer .fug-footer-brand {
      font-weight: 700;
      font-size: 13px;
      color: #0d1b3e;
      margin: 0 0 6px 0;
      font-family: 'InterDisplay', sans-serif;
    }
    #fug-footer .fug-footer-addr {
      font-size: 12px;
      line-height: 1.7;
      color: #5a6070;
      margin: 0;
      font-family: 'InterDisplay', sans-serif;
    }
    #fug-footer .fug-footer-col-title {
      font-size: 12px;
      font-weight: 600;
      color: #0d1b3e;
      margin: 0 0 10px 0;
      font-family: 'InterDisplay', sans-serif;
    }
    #fug-footer a {
      color: #1a2744;
      font-size: 12px;
      display: block;
      line-height: 2;
      text-decoration: none;
      font-family: 'InterDisplay', sans-serif;
    }
    #fug-footer a:hover { text-decoration: underline; }

    /* Third column: logo + copyright side by side */
    #fug-footer .fug-footer-right {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    #fug-footer .fug-footer-logo {
      height: 52px;
      width: auto;
      display: block;
      flex-shrink: 0;
    }
    #fug-footer .fug-footer-copy {
      font-size: 11px;
      color: #888;
      line-height: 1.7;
      margin: 0;
      font-family: 'InterDisplay', sans-serif;
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
      #fug-footer .fug-footer-brand { font-size: 14px; }
      #fug-footer .fug-footer-addr { font-size: 12px; }
      #fug-footer .fug-footer-col-title { font-size: 11px; letter-spacing: 0.06em; }
      #fug-footer a { font-size: 13px; line-height: 2.1; }
      #fug-footer .fug-footer-right {
        align-items: center;
        padding-top: 8px;
        border-top: 1px solid rgba(26,39,68,0.08);
      }
      #fug-footer .fug-footer-logo { height: 38px; }
      #fug-footer .fug-footer-copy { font-size: 10px; line-height: 1.6; }
      .fug-footer-cross { display: none; }
    }

    /* ── SMALL MOBILE (≤480px) ── */
    @media (max-width: 480px) {
      #fug-social-band p { font-size: 11px; }
    }
  `;
  document.head.appendChild(style);

  /* SVG cross helper */
  const crossSVG = `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="11" y1="0" x2="11" y2="22" stroke="#1a2744" stroke-width="1.5"/>
    <line x1="0"  y1="11" x2="22" y2="11" stroke="#1a2744" stroke-width="1.5"/>
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

      <!--
        Cross placement (centred on their anchor point):
          Left crosses  → centred on the 248px left margin line
          Middle cross  → centred on 50% (midpoint between left & right content)
          Right crosses → centred on the 248px right margin line
        offset by half of 22px (11px) so the centre of the cross sits exactly on the line
      -->

      <!-- TOP ROW crosses -->
      <span class="fug-footer-cross" style="top:24px; left:calc(248px - 11px);">${crossSVG}</span>
      <span class="fug-footer-cross" style="top:24px; left:calc(50% - 11px);">${crossSVG}</span>
      <span class="fug-footer-cross" style="top:24px; right:calc(248px - 11px);">${crossSVG}</span>

      <!-- BOTTOM ROW crosses -->
      <span class="fug-footer-cross" style="bottom:24px; left:calc(248px - 11px);">${crossSVG}</span>
      <span class="fug-footer-cross" style="bottom:24px; right:calc(248px - 11px);">${crossSVG}</span>

      <div class="fug-footer-inner">

        <!-- Col 1: Brand + Address — left edge at 248px -->
        <div class="fug-footer-col">
          <p class="fug-footer-brand">Fak'ugesi Festival</p>
          <p class="fug-footer-addr">41 Juta Street, Braamfontein<br>Johannesburg, South Africa</p>
        </div>

        <!-- Col 2: Contact — starts right after the middle cross at 50% -->
        <div class="fug-footer-col">
          <p class="fug-footer-col-title">Contact us</p>
          <a href="mailto:hello@fakugesi.co.za">hello@fakugesi.co.za</a>
          <a href="tel:+27117178156">+27 11 717 8156</a>
        </div>

        <!-- Col 3: Logo + Copyright — right edge at 248px from right -->
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
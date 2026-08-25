/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { PlaneLockup } from "@plane/propel/icons";
import interVariableWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";

export const BOOT_SHELL_ID = "static-boot-shell";

/**
 * Pre-paint route check: the SPA fallback document is served for every path,
 * but the static shell mirrors the sign-in page, so hide it everywhere else
 * before first paint. Runs inline, ahead of hydration.
 */
export const BOOT_SHELL_ROUTE_SCRIPT = `if(location.pathname!=="/")document.documentElement.setAttribute("data-boot-route","app");`;

/**
 * Everything the shell needs to paint, inlined so first paint does not wait
 * for any stylesheet. Colors are the computed values of the real sign-in
 * page's theme tokens for the light and dark themes.
 */
export const BOOT_SHELL_STYLE = `
@font-face{font-family:"Inter Variable";font-style:normal;font-display:swap;font-weight:100 900;src:url(${interVariableWoff2}) format("woff2-variations");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
html[data-boot-route="app"] #${BOOT_SHELL_ID}{display:none;}
#${BOOT_SHELL_ID}{position:fixed;inset:0;z-index:50;overflow:hidden;background:oklch(1 0 0);font-family:"Inter Variable",ui-sans-serif,system-ui,sans-serif;}
#${BOOT_SHELL_ID} *{box-sizing:border-box;margin:0;padding:0;}
#${BOOT_SHELL_ID} a{text-decoration:none;color:inherit;}
#${BOOT_SHELL_ID} .bs-col{display:flex;height:100vh;width:100vw;flex-direction:column;align-items:center;padding:1.5rem 2rem 2.5rem;}
#${BOOT_SHELL_ID} .bs-header{display:flex;width:100%;flex-shrink:0;align-items:center;justify-content:space-between;gap:1.5rem;color:oklch(0.1689 0.0021 286.18);}
#${BOOT_SHELL_ID} .bs-header-right{display:flex;flex-direction:column;align-items:flex-end;font-size:13px;font-weight:500;color:oklch(0.4176 0.0072 239.98);}
#${BOOT_SHELL_ID} .bs-signup-text{font-size:14px;font-weight:450;line-height:21.56px;}
#${BOOT_SHELL_ID} .bs-signup-link{font-size:14px;font-weight:600;color:oklch(0.4347 0.104093 242.482);}
#${BOOT_SHELL_ID} .bs-main{margin-top:2.5rem;display:flex;width:100%;flex-grow:1;flex-direction:column;align-items:center;justify-content:center;padding:1.5rem 0;}
#${BOOT_SHELL_ID} .bs-card{display:flex;width:100%;max-width:22.5rem;flex-direction:column;gap:1.5rem;}
#${BOOT_SHELL_ID} .bs-titles{display:flex;flex-direction:column;gap:0.25rem;}
#${BOOT_SHELL_ID} .bs-h1{font-size:20px;font-weight:600;line-height:24px;color:oklch(0.1689 0.0021 286.18);}
#${BOOT_SHELL_ID} .bs-h2{font-size:20px;font-weight:600;line-height:24px;color:oklch(0.4928 0.0079 233.77);}
#${BOOT_SHELL_ID} .bs-label{display:block;font-size:13px;font-weight:500;line-height:19.5px;color:oklch(0.4176 0.0072 239.98);margin-bottom:0.25rem;}
#${BOOT_SHELL_ID} .bs-input{display:flex;align-items:center;height:40px;border-radius:6px;border:1px solid oklch(0.8782 0.0035 247.86);background:oklch(1 0 0);padding:0.5rem 0.75rem;font-size:13px;color:oklch(0.4928 0.0079 233.77);}
#${BOOT_SHELL_ID} .bs-btn{margin-top:1rem;display:flex;height:32px;width:100%;align-items:center;justify-content:center;border-radius:6px;background:oklch(0.9396 0.0017 247.84);font-size:14px;font-weight:500;color:oklch(0.1482 0.0034 196.79 / 0.2);white-space:nowrap;}
#${BOOT_SHELL_ID} .bs-terms{display:flex;align-items:center;justify-content:center;}
#${BOOT_SHELL_ID} .bs-terms p{text-align:center;font-size:13px;line-height:19.5px;white-space:pre-line;color:oklch(0.4176 0.0072 239.98);}
#${BOOT_SHELL_ID} .bs-terms a span{font-size:13px;font-weight:500;text-decoration:underline;color:oklch(0.3225 0.0045 219.62);}
#${BOOT_SHELL_ID} .bs-footer{display:flex;flex-direction:column;align-items:center;gap:1.5rem;}
#${BOOT_SHELL_ID} .bs-footer-text{font-size:13px;white-space:nowrap;color:oklch(0.4176 0.0072 239.98);}
#${BOOT_SHELL_ID} .bs-logo-row{height:1.75rem;width:100%;}
@media (min-width:640px){#${BOOT_SHELL_ID} .bs-header-right{flex-direction:row;align-items:center;gap:0.5rem;}}
html[data-theme="dark"] #${BOOT_SHELL_ID}{background:oklch(0.1932 0.002 230.81);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-header{color:oklch(0.9235 0.001733 230.685);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-h1{color:oklch(0.9235 0.001733 230.685);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-h2{color:oklch(0.6835 0.0074 230.81);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-header-right,html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-label,html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-terms p,html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-footer-text{color:oklch(0.7655 0.0054 230.76);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-signup-link{color:oklch(0.6311 0.126281 238.01);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-input{border-color:oklch(0.3415 0.0049 230.86);background:oklch(0.2378 0.0029 230.83);}
html[data-theme="dark"] #${BOOT_SHELL_ID} .bs-terms a span{color:oklch(0.8455 0.0035 230.72);}
`;

/**
 * A static copy of the sign-in page's above-the-fold content, rendered
 * straight from the HTML document so first paint and LCP do not wait for
 * JavaScript or external stylesheets (all of its CSS is inlined above). It
 * sits as a fixed overlay above the app root and is removed by
 * `dismissBootShell()` once the real UI has rendered underneath.
 *
 * Everything here must be deterministic: the same markup is produced by the
 * build-time prerender and by the client's first hydration render.
 */
export function StaticBootShell() {
  return (
    <div id={BOOT_SHELL_ID}>
      <div className="bs-col">
        <div className="bs-header">
          <PlaneLockup width={95} height={20} />
          <div className="bs-header-right">
            <span className="bs-signup-text">New to Plane?</span>
            <a className="bs-signup-link" href="/sign-up/">
              Sign up
            </a>
          </div>
        </div>
        <div className="bs-main">
          <div className="bs-card">
            <div className="bs-titles">
              <span className="bs-h1">Work in all dimensions.</span>
              <span className="bs-h2">Welcome back to Plane.</span>
            </div>
            <div>
              <span className="bs-label">Email</span>
              <div className="bs-input">name@company.com</div>
              <div className="bs-btn">Continue</div>
            </div>
            <div className="bs-terms">
              <p>
                {"By signing in, you understand and agree to \n our "}
                <a rel="noopener noreferrer" href="https://plane.so/legals/terms-and-conditions/" target="_blank">
                  <span>Terms of Service</span>
                </a>
                {" and "}
                <a rel="noopener noreferrer" href="https://plane.so/legals/privacy-policy/" target="_blank">
                  <span>Privacy Policy</span>
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="bs-footer">
          <span className="bs-footer-text">Join 10,000+ teams building with Plane</span>
          {/* placeholder matching the customer-logo row's height so the centered block does not shift when the real page appears */}
          <div className="bs-logo-row" />
        </div>
      </div>
    </div>
  );
}

/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { PlaneLockup } from "@plane/propel/icons";

export const BOOT_SHELL_ID = "static-boot-shell";

/**
 * Pre-paint route check: the SPA fallback document is served for every path,
 * but the static shell mirrors the sign-in page, so hide it everywhere else
 * before first paint. Runs inline, ahead of hydration.
 */
export const BOOT_SHELL_ROUTE_SCRIPT = `if(location.pathname!=="/")document.documentElement.setAttribute("data-boot-route","app");`;

export const BOOT_SHELL_STYLE = `html[data-boot-route="app"] #${BOOT_SHELL_ID}{display:none;}`;

/**
 * A static copy of the sign-in page's above-the-fold content, rendered
 * straight from the HTML document so first paint and LCP do not wait for the
 * JavaScript bundle. It sits as a fixed overlay above the app root and is
 * removed by `dismissBootShell()` once the real UI has rendered underneath.
 *
 * Everything here must be deterministic: the same markup is produced by the
 * build-time prerender and by the client's first hydration render.
 */
export function StaticBootShell() {
  return (
    <div id={BOOT_SHELL_ID} className="fixed inset-0 z-50 h-screen w-full overflow-hidden bg-surface-1">
      <div className="relative z-10 flex h-screen w-screen flex-col items-center overflow-hidden px-8 pt-6 pb-10">
        <div className="flex w-full flex-shrink-0 items-center justify-between gap-6">
          <PlaneLockup width={95} height={20} className="text-primary" />
          <div className="flex flex-col items-end text-center text-13 font-medium text-tertiary sm:flex-row sm:items-center sm:gap-2">
            <span className="text-body-sm-regular text-tertiary">New to Plane?</span>
            <a className="text-body-sm-semibold text-accent-primary hover:underline" href="/sign-up/">
              Sign up
            </a>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-grow flex-col items-center justify-center py-6">
          <div className="relative flex w-full max-w-[22.5rem] flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-h4-semibold text-primary">Work in all dimensions.</span>
              <span className="text-h4-semibold text-placeholder">Welcome back to Plane.</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-13 font-medium text-tertiary">Email</span>
                <div className="relative flex items-center rounded-md border border-strong bg-surface-1">
                  <div className="block h-10 w-full rounded-md border-0 bg-layer-2 px-3 py-2 text-13 text-placeholder">
                    name@company.com
                  </div>
                </div>
              </div>
              <div className="inline-flex h-8 w-full items-center justify-center gap-1 rounded-md bg-layer-disabled px-2 text-body-sm-medium whitespace-nowrap text-on-color-disabled">
                Continue
              </div>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-13 whitespace-pre-line text-tertiary">
                {"By signing in, you understand and agree to \n our "}
                <a
                  className="text-secondary"
                  rel="noopener noreferrer"
                  href="https://plane.so/legals/terms-and-conditions/"
                  target="_blank"
                >
                  <span className="text-13 font-medium underline">Terms of Service</span>
                </a>
                {" and "}
                <a
                  className="text-secondary"
                  rel="noopener noreferrer"
                  href="https://plane.so/legals/privacy-policy/"
                  target="_blank"
                >
                  <span className="text-13 font-medium underline">Privacy Policy</span>
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <span className="text-13 whitespace-nowrap text-tertiary">Join 10,000+ teams building with Plane</span>
          {/* placeholder matching the customer-logo row's height so the centered block does not shift when the real page appears */}
          <div className="h-7 w-full" />
        </div>
      </div>
    </div>
  );
}

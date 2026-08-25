/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { BOOT_SHELL_ID } from "@/app/boot-shell";

/**
 * Remove the static boot shell once real UI has rendered underneath it.
 * Idempotent; safe to call from any screen that takes over the viewport.
 */
export function dismissBootShell() {
  if (typeof document === "undefined") return;
  document.getElementById(BOOT_SHELL_ID)?.remove();
}

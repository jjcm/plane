/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

/**
 * Precompress static build output so the web server can serve compressed
 * responses without spending CPU at request time (nginx `gzip_static` /
 * `brotli_static`). Writes `.gz` and `.br` siblings next to every
 * compressible asset in the given directory.
 *
 * Usage: node scripts/precompress.mjs <dir>
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import zlib from "node:zlib";

const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);

const COMPRESSIBLE = new Set([
  ".js",
  ".mjs",
  ".css",
  ".html",
  ".svg",
  ".json",
  ".webmanifest",
  ".txt",
  ".xml",
  ".map",
  ".ico",
]);

// Skip files too small for compression to pay for the extra stat() calls.
const MIN_SIZE = 1024;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function main() {
  const root = process.argv[2];
  if (!root) {
    console.error("usage: node scripts/precompress.mjs <dir>");
    process.exit(1);
  }
  let files = 0;
  let inBytes = 0;
  let gzBytes = 0;
  const jobs = [];
  for await (const file of walk(root)) {
    const ext = path.extname(file);
    if (!COMPRESSIBLE.has(ext)) continue;
    jobs.push(
      (async () => {
        const buf = await fs.readFile(file);
        if (buf.length < MIN_SIZE) return;
        const [gz, br] = await Promise.all([
          gzip(buf, { level: zlib.constants.Z_BEST_COMPRESSION }),
          brotli(buf, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
              [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
            },
          }),
        ]);
        await Promise.all([fs.writeFile(`${file}.gz`, gz), fs.writeFile(`${file}.br`, br)]);
        files += 1;
        inBytes += buf.length;
        gzBytes += gz.length;
      })()
    );
  }
  await Promise.all(jobs);
  console.log(
    `precompress: ${files} files, ${(inBytes / 1024 / 1024).toFixed(1)}MB -> ${(gzBytes / 1024 / 1024).toFixed(1)}MB gzip`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

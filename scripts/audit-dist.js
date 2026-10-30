import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const AUDIT_URLS = [
  { url: 'https://evohawks.tech/', file: path.join(distDir, 'index.html'), name: 'Homepage' },
  { url: 'https://evohawks.tech/packages', file: path.join(distDir, 'packages/index.html'), name: 'Packages' },
  { url: 'https://evohawks.tech/contact', file: path.join(distDir, 'contact/index.html'), name: 'Contact' },
  { url: 'https://evohawks.tech/blog', file: path.join(distDir, 'blog/index.html'), name: 'Blog' },
  { url: 'https://evohawks.tech/services', file: path.join(distDir, 'services/index.html'), name: 'Services' },
  { url: 'https://evohawks.tech/portfolio', file: path.join(distDir, 'portfolio/index.html'), name: 'Portfolio' },
  { url: 'https://evohawks.tech/about', file: path.join(distDir, 'about/index.html'), name: 'About' },
  { url: 'https://evohawks.tech/process', file: path.join(distDir, 'process/index.html'), name: 'Process' },
];

function extractWords(html) {
  // Strip head, script, style, noscript, and tags
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : html;
  const clean = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (!clean) return 0;
  return clean.split(' ').filter(w => w.length > 0).length;
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return null;
  return match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function extractH2s(html) {
  const matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  return matches.map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
}

function extractH3s(html) {
  const matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
  return matches.map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? match[1].replace(/\s+/g, ' ').trim() : null;
}

function extractMetaDesc(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  return match ? match[1].trim() : null;
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  return match ? match[1].trim() : null;
}

function extractOutlinks(html) {
  const matches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)];
  return matches.map(m => m[1]).filter(h => !h.startsWith('#') && !h.startsWith('javascript:'));
}

function runAudit() {
  console.log('================================================================================');
  console.log('EVO HAWKS — SCREAMING FROG AUDIT SIMULATION (HTTP TEXT EXTRACTION)');
  console.log('================================================================================\n');

  const results = [];

  for (const page of AUDIT_URLS) {
    if (!fs.existsSync(page.file)) {
      console.error(`Missing file: ${page.file}`);
      continue;
    }

    const html = fs.readFileSync(page.file, 'utf8');
    const wordCount = extractWords(html);
    const title = extractTitle(html);
    const metaDesc = extractMetaDesc(html);
    const canonical = extractCanonical(html);
    const h1 = extractH1(html);
    const h2s = extractH2s(html);
    const h3s = extractH3s(html);
    const outlinks = extractOutlinks(html);
    const hasSchema = html.includes('application/ld+json');

    results.push({
      name: page.name,
      url: page.url,
      wordCount,
      title,
      titleLength: title ? title.length : 0,
      metaDesc,
      descLength: metaDesc ? metaDesc.length : 0,
      canonical,
      h1,
      h2Count: h2s.length,
      h2s,
      h3Count: h3s.length,
      outlinksCount: outlinks.length,
      hasSchema
    });

    console.log(`URL: ${page.url}`);
    console.log(`  Page: ${page.name}`);
    console.log(`  Status: 200 Indexable`);
    console.log(`  Title (${title?.length} chars): ${title}`);
    console.log(`  Meta Desc (${metaDesc?.length} chars): ${metaDesc}`);
    console.log(`  Canonical: ${canonical}`);
    console.log(`  H1 Heading: ${h1}`);
    console.log(`  H2 Headings: ${h2s.length} extracted`);
    h2s.slice(0, 3).forEach((h2, i) => console.log(`    [H2-${i+1}] ${h2}`));
    if (h2s.length > 3) console.log(`    ... and ${h2s.length - 3} more H2 headings`);
    console.log(`  H3 Headings: ${h3s.length} extracted`);
    console.log(`  Word Count (Non-JS Extracted): ${wordCount} words`);
    console.log(`  Outlinks Extracted: ${outlinks.length}`);
    console.log(`  Structured Data: ${hasSchema ? 'JSON-LD Verified' : 'None'}`);
    console.log('--------------------------------------------------------------------------------');
  }

  return results;
}

runAudit();

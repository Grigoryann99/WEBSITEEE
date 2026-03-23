import * as cheerio from 'cheerio';

export interface AuditReport {
  overallScore: number;
  letterGrade: string;
  categories: {
    seo: CategoryScore;
    adsense: CategoryScore;
    monetization: CategoryScore;
    performance: CategoryScore;
    content: CategoryScore;
  };
  recommendations: Recommendation[];
}

export interface CategoryScore {
  score: number;
  maxScore: number;
  details: any;
}

export interface Recommendation {
  id: string;
  category: 'SEO' | 'AdSense' | 'Monetization' | 'Performance' | 'Content';
  priority: 'Critical' | 'Important' | 'Nice to have';
  message: string;
}

export async function runAudit(url: string, html: string): Promise<AuditReport> {
  const $ = cheerio.load(html);
  const recommendations: Recommendation[] = [];
  
  // --- 1. SEO AUDIT (0-20 points) ---
  let seoScore = 0;
  const seoDetails: any = {};
  
  const title = $('title').text();
  seoDetails.title = title;
  if (title.length > 10 && title.length < 70) {
    seoScore += 5;
  } else {
    recommendations.push({ id: 'seo-title', category: 'SEO', priority: 'Critical', message: 'Optimize title tag length (between 10 and 70 characters).' });
  }

  const description = $('meta[name="description"]').attr('content') || '';
  seoDetails.description = description;
  if (description.length > 50 && description.length < 160) {
    seoScore += 5;
  } else {
    recommendations.push({ id: 'seo-desc', category: 'SEO', priority: 'Important', message: 'Add a meta description between 50 and 160 characters.' });
  }

  const h1s = $('h1').length;
  if (h1s === 1) {
    seoScore += 5;
  } else {
    recommendations.push({ id: 'seo-h1', category: 'SEO', priority: 'Critical', message: 'Page should have exactly one H1 tag.' });
  }

  const images = $('img');
  const imagesWithoutAlt = images.filter((i, el) => !$(el).attr('alt')).length;
  seoDetails.imagesTotal = images.length;
  seoDetails.imagesWithoutAlt = imagesWithoutAlt;
  if (images.length > 0 && imagesWithoutAlt === 0) {
    seoScore += 5;
  } else if (imagesWithoutAlt > 0) {
    recommendations.push({ id: 'seo-alt', category: 'SEO', priority: 'Important', message: `Add missing alt attributes to ${imagesWithoutAlt} images.` });
  } else {
    seoScore += 5; // no images, no penalty
  }

  // --- 2. AdSense Readiness (0-20 points) ---
  let adsenseScore = 0;
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText.split(' ').length;
  
  if (wordCount > 500) {
    adsenseScore += 10;
  } else {
    adsenseScore += Math.floor((wordCount / 500) * 10);
    recommendations.push({ id: 'ad-words', category: 'AdSense', priority: 'Critical', message: 'Increase content length to at least 500 words for AdSense readiness.' });
  }

  // Check for legal pages in links
  const links = $('a').map((i, el) => $(el).attr('href') || '').get();
  const hasPrivacy = links.some(l => l.toLowerCase().includes('privacy'));
  const hasTerms = links.some(l => l.toLowerCase().includes('terms'));
  const hasContact = links.some(l => l.toLowerCase().includes('contact'));
  
  if (hasPrivacy && hasContact) {
    adsenseScore += 10;
  } else {
    recommendations.push({ id: 'ad-legal', category: 'AdSense', priority: 'Critical', message: 'Ensure Privacy Policy and Contact pages are linked for AdSense approval.' });
  }

  // --- 3. Monetization Potential (0-20 points) ---
  let monScore = 0;
  // Detect affiliate links (amazon, booking, etc)
  const affiliateKeywords = ['amazon', 'booking', 'agoda', 'expedia', 'awin', 'shareasale'];
  const hasAffiliates = links.some(l => affiliateKeywords.some(k => l.toLowerCase().includes(k)));
  if (hasAffiliates) monScore += 5;
  else recommendations.push({ id: 'mon-aff', category: 'Monetization', priority: 'Nice to have', message: 'Consider adding affiliate links to monetize traffic.' });

  // CTAs
  const buttons = $('button, .btn, a.btn');
  if (buttons.length > 2) monScore += 10;
  else recommendations.push({ id: 'mon-cta', category: 'Monetization', priority: 'Important', message: 'Add more prominent Call-to-Action (CTA) buttons.' });

  // Forms / Email capture
  const forms = $('form input[type="email"]');
  if (forms.length > 0) monScore += 5;
  else recommendations.push({ id: 'mon-email', category: 'Monetization', priority: 'Important', message: 'Add an email capture form for newsletter monetization.' });

  // --- 4. Performance (0-20 points) - Simulated ---
  let perfScore = 20; // start perfect, deduct
  const scripts = $('script').length;
  if (scripts > 15) {
    perfScore -= 10;
    recommendations.push({ id: 'perf-scripts', category: 'Performance', priority: 'Important', message: `High number of scripts (${scripts}). Consider deferring or combining.` });
  }
  if (images.length > 20) {
    perfScore -= 5;
    recommendations.push({ id: 'perf-img', category: 'Performance', priority: 'Nice to have', message: 'Large number of images found. Ensure lazy loading is enabled.' });
  }

  // --- 5. Content Quality (0-20 points) ---
  let contentScore = 0;
  if (wordCount > 1000) contentScore += 10;
  else if (wordCount > 500) contentScore += 7;
  else contentScore += 3;

  const pTags = $('p').length;
  if (pTags > (wordCount / 100)) contentScore += 10; // good paragraph breaks
  else recommendations.push({ id: 'content-readability', category: 'Content', priority: 'Important', message: 'Break text into smaller paragraphs for better readability.' });


  // Calculate total
  const totalScore = seoScore + adsenseScore + monScore + perfScore + contentScore;
  
  let grade = 'F';
  if (totalScore >= 90) grade = 'A';
  else if (totalScore >= 80) grade = 'B';
  else if (totalScore >= 70) grade = 'C';
  else if (totalScore >= 60) grade = 'D';

  return {
    overallScore: totalScore,
    letterGrade: grade,
    categories: {
      seo: { score: seoScore, maxScore: 20, details: seoDetails },
      adsense: { score: adsenseScore, maxScore: 20, details: { wordCount, hasPrivacy, hasContact } },
      monetization: { score: monScore, maxScore: 20, details: { hasAffiliates, ctas: buttons.length, emailCaptured: forms.length > 0 } },
      performance: { score: perfScore, maxScore: 20, details: { scripts, images: images.length } },
      content: { score: contentScore, maxScore: 20, details: { paragraphs: pTags } },
    },
    recommendations
  };
}

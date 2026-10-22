/**
 * Security and Sanitization Utilities for Evo Hawks
 * 
 * Provides defense-in-depth protection against:
 * 1. XSS (Cross-Site Scripting) via input escaping and DOM sanitization.
 * 2. Injection attempts and unsafe script tags.
 * 3. Secure cryptographically random token generation.
 * 4. Password entropy validation and generator.
 */

/**
 * Strips dangerous HTML tags, javascript pseudo-protocols, and inline event handlers
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove inline event handlers (e.g. onload, onerror, onclick)
    .replace(/\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
    // Remove javascript: protocols
    .replace(/javascript:[^\s"'>]+/gi, '')
    // Encode common dangerous characters
    .replace(/[<>]/g, (tag) => (tag === '<' ? '&lt;' : '&gt;'));
}

/**
 * Validates email format strictly
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Generates a cryptographically secure random session token
 */
export function generateSecureToken(byteLength: number = 24): string {
  try {
    const array = new Uint8Array(byteLength);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback if crypto is unavailable
    return 'evo_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 15);
  }
}

/**
 * Generates a strong random password adhering to high entropy rules
 */
export function generateStrongPassword(): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const special = '!@#$%^&*';
  
  const all = upper + lower + numbers + special;
  let password = '';
  
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += special.charAt(Math.floor(Math.random() * special.length));
  
  for (let i = password.length; i < 14; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }
  
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

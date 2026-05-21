// Shared building blocks used across the 5 VSK Archery type contracts.
// These contracts are the SOURCE OF TRUTH; the backend Prisma schema is written
// to match them, and the backend maps DB rows -> these types at the API boundary.

// The 8 site locales. Croatian is the source language; every other locale is a
// derived, stored translation (Google-translated, admin-overridable).
// "2 firm (hr, en), 6 aspirational" — design scales to all 8 with no schema change.
export type Locale = 'hr' | 'en' | 'ko' | 'ar' | 'es' | 'de' | 'fr' | 'zh';

// A stored image reference (R2 URL + accessibility alt text).
export type ImageRef = {
	url: string;
	alt: string;
};

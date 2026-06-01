import type { ImageRef, Locale } from './common.ts';

// Club sponsor. No tiers (the club doesn't use them). Present or hard-deleted.

// Per-locale translatable text. The description is a multi-sentence paragraph
// honoring the sponsor (required). The brand name stays neutral.
export type SponsorTranslation = {
	locale: Locale;
	description: string;
};

export type Sponsor = {
	id: string;
	name: string; // brand proper noun — neutral
	logo: ImageRef;
	website: string | null;

	translations: SponsorTranslation[];
	sourceLocale: Locale;
};

// Resolved single-locale view returned by the public read API (?locale=…).
// Translatable fields are flattened to the requested locale (fallback to
// sourceLocale). `locale` reports which language the text is actually in.
export type SponsorResolved = {
	id: string;
	name: string;
	logo: ImageRef;
	website: string | null;

	locale: Locale;
	description: string;
};

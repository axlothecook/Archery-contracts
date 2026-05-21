import type { ImageRef, Locale } from './common';

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

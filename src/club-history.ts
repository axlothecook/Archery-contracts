import type { ImageRef, Locale } from './common.ts';

// Club history, FC Barcelona "decade-by-decade" style: a manually-ordered grid of
// PERIOD cards (foundation first), each clickable through to a detail page at
// /club/history/[slug] with a narrative + cover image. The sequence is editorial
// (`order`), NOT derived from years — the year span lives inside the (translatable)
// title text, like FCB's "1919-30 A Golden Age". No queryable year columns, no
// per-period photo gallery (cover image only), no achievement links (the narrative
// can reference them in prose). Present or hard-deleted.

// Per-locale translatable text. The card face shows title + subtitle; the detail
// page shows the narrative (Markdown).
export type ClubHistoryPeriodTranslation = {
	locale: Locale;
	title: string; // card/detail heading incl. the year span, e.g. "1919-30 A Golden Age"
	subtitle: string; // short teaser line under the title (card face / detail lead)
	narrative: string; // Markdown story for the detail page
};

export type ClubHistoryPeriod = {
	id: string;
	slug: string; // /club/history/[slug] URL, e.g. "1919-30-a-golden-age"
	order: number; // card sequence on the grid (foundation first)
	coverImage: ImageRef | null; // card + detail cover photo (null = front-end fallback)

	translations: ClubHistoryPeriodTranslation[];
	sourceLocale: Locale;
};

// Resolved single-locale view for the public history pages. Text flattened to the
// requested locale (fallback to sourceLocale).
export type ClubHistoryPeriodResolved = {
	id: string;
	slug: string;
	order: number;
	coverImage: ImageRef | null;

	locale: Locale;
	title: string;
	subtitle: string;
	narrative: string;
};

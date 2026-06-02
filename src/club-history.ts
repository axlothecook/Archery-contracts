import type { ImageRef, Locale } from './common.ts';

// Club history, FC Barcelona "decade-by-decade" style: a manually-ordered grid of
// PERIOD cards (foundation first), each clickable through to a detail page at
// /club/history/[slug] with a narrative + cover image. The sequence is editorial
// (`order`), NOT derived from years — the year span lives inside the (translatable)
// title text, like FCB's "1919-30 A Golden Age". No queryable year columns, no
// per-period photo gallery (cover image only), no achievement links (the narrative
// can reference them in prose). Present or hard-deleted.

// One narrative section of the detail page: an optional bold sub-heading followed
// by a Markdown body. The detail page renders the `lead` first, then these in order.
export type ClubHistoryParagraph = {
	header: string; // section sub-heading, e.g. "Osnivači i prvi streličari"
	body: string; // Markdown prose for the section
};

// Per-locale translatable text. The card face shows title + subtitle; the detail
// page shows the lead (intro) followed by the ordered structured paragraphs. The
// whole narrative is stored per-locale (history is static — translated at write
// time, not resolved on the fly), so it lives here as a JSON-friendly structure.
export type ClubHistoryPeriodTranslation = {
	locale: Locale;
	title: string; // card/detail heading incl. the year span, e.g. "1919-30 A Golden Age"
	subtitle: string; // short teaser line under the title (card face)
	lead: string; // intro paragraph shown above the structured sections (detail page)
	paragraphs: ClubHistoryParagraph[]; // ordered narrative sections (header + body)
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
	lead: string;
	paragraphs: ClubHistoryParagraph[];
};

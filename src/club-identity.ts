import type { ImageRef, Locale } from './common.ts';

// Club identity, FC Barcelona "Club > Identity" style: a small set of sub-pages
// (Values, The Crest, Jersey) reachable under /club/identity, with Values as the
// default landing page. The sequence is editorial (`order`). Like ClubHistory, the
// content is static and stored per-locale (translated at write time, not resolved
// on the fly), so each section's body lives here as a JSON-friendly structure.
//
// The three sub-pages have different shapes, so each section declares a `kind`
// that tells the front-end how to render its `content`:
//   - "blocks"  (Values): a list of named value blocks { header, body }.
//   - "single"  (Crest):  one image + a short body.
//   - "gallery" (Jersey): an ordered list of items, each an image + description + date.

export type ClubIdentityKind = 'blocks' | 'single' | 'gallery';

// kind "blocks" — one named value block (Values page).
export type ClubIdentityBlock = {
	header: string; // value name, e.g. "Sport je ljudsko pravo"
	body: string; // the value's description (Markdown)
};

// kind "gallery" — one item in a gallery (Jersey page): an image with a short
// description and the date that design/version was introduced.
export type ClubIdentityGalleryItem = {
	image: ImageRef;
	description: string; // short caption for this image
	date: string; // date/era of implementation, e.g. "2014" or "ožujak 2015."
};

// The per-locale content of a section, discriminated by the section's `kind`.
// Exactly one of these shapes is present, matching the section kind.
export type ClubIdentityContent =
	| { kind: 'blocks'; blocks: ClubIdentityBlock[] }
	| { kind: 'single'; image: ImageRef | null; body: string }
	| { kind: 'gallery'; items: ClubIdentityGalleryItem[] };

// Per-locale translatable content for a section: a title plus the kind-specific body.
export type ClubIdentitySectionTranslation = {
	locale: Locale;
	title: string; // page heading, e.g. "Grb kluba", "Dres kluba", "Vrijednosti"
	content: ClubIdentityContent; // shape matches the section `kind`
};

export type ClubIdentitySection = {
	id: string;
	slug: string; // /club/identity/[slug], e.g. "values" | "crest" | "jersey"
	order: number; // tab/nav sequence (values first = default landing)
	kind: ClubIdentityKind; // how the front-end renders `content`
	isDefault: boolean; // true for the section shown at /club/identity (Values)

	translations: ClubIdentitySectionTranslation[];
	sourceLocale: Locale;
};

// Resolved single-locale view for the public identity pages. Text flattened to the
// requested locale (fallback to sourceLocale).
export type ClubIdentitySectionResolved = {
	id: string;
	slug: string;
	order: number;
	kind: ClubIdentityKind;
	isDefault: boolean;

	locale: Locale;
	title: string;
	content: ClubIdentityContent;
};

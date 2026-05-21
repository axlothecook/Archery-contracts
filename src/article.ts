import type { Locale } from './common';

// News article. Serves BOTH Facebook-imported and manually-written posts.

export type ArticleImage = {
	url: string;
	alt: string; // auto-generated template; admin can edit
	order: number;
};

export type ArticleVideo = {
	url: string;
	posterUrl: string | null;
};

// External-article posts: short on-site post + a link out (admin-written body).
export type ExternalLink = {
	url: string;
	sourceName: string; // publication name, e.g. "Večernji list" — language-neutral
};

// Per-locale translatable text. excerpt is derived per-language from the
// translated body (~150 chars), admin-overridable.
export type ArticleTranslation = {
	locale: Locale;
	title: string;
	body: string; // Markdown, full fidelity, no truncation
	excerpt: string;
};

// Pending edits to an already-published article, saved half-done. The live
// version stays public until publish. Holds only the Croatian (source) text +
// editable neutral fields; the other locales regenerate from the edited
// Croatian on publish.
export type ArticleDraftRevision = {
	title: string;
	body: string;
	excerpt: string;
	images: ArticleImage[];
	video: ArticleVideo | null;
	externalLink: ExternalLink | null;
	mediaType: ArticleMediaType;
	mentionedArcherIds: string[];
};

export type ArticleMediaType =
	| 'text-rich'
	| 'photo-album'
	| 'video-link'
	| 'external-article';

export type Article = {
	// — Identity & source —
	id: string; // our backend PK (manual posts get one too)
	source: 'facebook' | 'manual';
	fbId: string | null; // FB Graph post id; null for manual
	fbPermalinkUrl: string | null; // public "view on Facebook" link; null for manual

	// — Content —
	mediaType: ArticleMediaType;

	// — Media (language-neutral) —
	images: ArticleImage[]; // 0–10 kept; news card uses images[0]
	video: ArticleVideo | null; // present only when a <=5MB video was kept
	externalLink: ExternalLink | null; // only for external-article; null otherwise

	// — Visibility & publish state —
	status: 'draft' | 'published'; // draft = brand-new never-published
	hidden: boolean; // true only when published; pulled from public display
	draftRevision: ArticleDraftRevision | null; // pending edits to a published post

	// — Timestamps (ISO) —
	publishedAt: string | null; // FB created_time / manual publish time; null while draft
	createdAt: string; // when OUR record was created
	updatedAt: string; // last change (edit or sync)

	// — Facebook sync tracking —
	// needsSync is COMPUTED at check time (freshHash !== fbContentHash && !== fbRefusedHash), not stored.
	fbContentHash: string | null; // FB content as of last pull/sync; null for manual
	fbRefusedHash: string | null; // hash the admin refused; null if never refused
	adminEdited: boolean; // display-only: warn that sync overwrites edits

	// — Cross-links —
	mentionedArcherIds: string[]; // archers tagged as mentioned in this article

	// — Translations —
	translations: ArticleTranslation[]; // 1 (hr) … 8 entries
	sourceLocale: Locale; // 'hr' — the human-authored source of truth
};

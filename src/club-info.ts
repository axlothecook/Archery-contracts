import type { ImageRef, Locale } from './common.ts';

// Singleton holding the club's identity/about/history content + canonical
// contact + socials (single source of truth — fixes vsk.hr's contradictory
// socials). Consolidates the earlier split SiteConfig + Identity.

// A club officer (e.g. president, secretary). Names are proper nouns (neutral);
// the role label is translatable.
export type ClubOfficer = {
	name: string; // neutral (proper noun)
	roleKey: string; // stable key (e.g. 'president'); the label is translated
};

// A social link. Platform + URL are both neutral.
export type ClubSocial = {
	platform: string; // 'facebook' | 'instagram' | … (lowercase key)
	url: string;
};

// A history-gallery photo (vsk.hr/o-klubu roots: founders, training shots).
// The image is neutral; the caption is translatable (see ClubInfoTranslation).
export type ClubHistoryPhoto = {
	id: string;
	image: ImageRef;
	order: number;
};

// One named value block on the /club/identity page (FC-Barcelona-identity style):
// a bold value name + its description. The set is the club's values statement,
// carved into titled blocks.
export type ClubValueBlock = {
	header: string; // value name, e.g. "Sport je ljudsko pravo"
	body: string; // the value's description (Markdown)
};

// Per-locale translatable text: the about/values blocks + history Markdown, the
// officer role labels (keyed by roleKey), and history-photo captions (keyed by
// photo id). Keying by stable ids/keys keeps captions/labels aligned per locale.
export type ClubInfoTranslation = {
	locale: Locale;
	valuesBlocks: ClubValueBlock[]; // /club/identity named value blocks (ordered)
	historyText: string; // Markdown
	officerRoleLabels: Record<string, string>; // roleKey -> label
	photoCaptions: Record<string, string>; // photo id -> caption
};

export type ClubInfo = {
	id: string; // singleton (one row)
	foundedDate: string | null; // ISO
	address: string | null;
	email: string | null; // canonical club email
	oib: string | null; // Croatian tax id

	officers: ClubOfficer[];
	socials: ClubSocial[];
	historyPhotos: ClubHistoryPhoto[];

	translations: ClubInfoTranslation[];
	sourceLocale: Locale;
};

// Resolved single-locale view for the public about/history pages. Officer role
// labels and photo captions are flattened (resolved from the per-locale maps).
export type ClubOfficerResolved = { name: string; role: string };
export type ClubHistoryPhotoResolved = { image: ImageRef; caption: string | null; order: number };

export type ClubInfoResolved = {
	foundedDate: string | null;
	address: string | null;
	email: string | null;
	oib: string | null;
	socials: ClubSocial[];

	officers: ClubOfficerResolved[];
	historyPhotos: ClubHistoryPhotoResolved[];

	locale: Locale;
	valuesBlocks: ClubValueBlock[];
	historyText: string;
};

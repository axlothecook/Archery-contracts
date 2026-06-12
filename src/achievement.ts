import type { ImageRef, Locale } from './common.ts';

// Club / archer achievement. Shown on the club history timeline and, when tied
// to an archer, on that archer's page. Present or hard-deleted.

// Per-locale translatable text. Only the title is translated.
export type AchievementTranslation = {
	locale: Locale;
	title: string;
};

export type Achievement = {
	id: string;
	year: number; // history groups year-by-year, reverse-chronological
	archerIds: string[]; // archers credited: one (individual), many (team), empty (club-level)
	scope: 'individual' | 'team' | 'club';
	level: 'world' | 'european' | 'state' | 'varazdin' | 'other'; // PRIMARY level
	// Extra levels this achievement ALSO counts toward (beyond `level`), for the
	// club-stats rollup. E.g. a record that is BOTH a world AND European record:
	// level='world', alsoLevels=['european']. Usually empty.
	alsoLevels: ('world' | 'european' | 'state' | 'varazdin' | 'other')[];
	type: 'title' | 'record' | 'other'; // independent of medal
	medal: 'gold' | 'silver' | 'bronze' | null; // optional; coexists with type
	image: ImageRef | null; // hover-image on the history page

	translations: AchievementTranslation[];
	sourceLocale: Locale;
};

// A credited archer as shown on the achievements PAGE: name + photo, NO link
// to the individual archer page (deliberate). `id` is a stable list key only.
export type AchievementArcher = {
	id: string;
	firstName: string;
	lastName: string;
	cardPhoto: ImageRef | null; // null = front-end shows a default stock image
};

// Resolved single-locale view for the public read API. `title` flattened to the
// requested locale (fallback to sourceLocale); `archers` empty for club-level.
export type AchievementResolved = {
	id: string;
	year: number;
	scope: 'individual' | 'team' | 'club';
	level: 'world' | 'european' | 'state' | 'varazdin' | 'other';
	type: 'title' | 'record' | 'other';
	medal: 'gold' | 'silver' | 'bronze' | null;
	image: ImageRef | null;

	locale: Locale;
	title: string;
	archers: AchievementArcher[];
};

import type { ImageRef, Locale } from './common';

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
	level: 'world' | 'european' | 'state' | 'other';
	type: 'title' | 'record' | 'other'; // independent of medal
	medal: 'gold' | 'silver' | 'bronze' | null; // optional; coexists with type
	image: ImageRef | null; // hover-image on the history page

	translations: AchievementTranslation[];
	sourceLocale: Locale;
};

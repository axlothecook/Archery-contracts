import type { ImageRef, Locale } from './common';

// Club archer / team-member profile.

export type Bow = 'recurve' | 'compound' | 'barebow';

// A year of summary results (snapshot; refreshed from World Archery on demand).
export type ArcherCareerStat = {
	year: number;
	discipline: string;
	averageScore: number | null;
	wins: number;
	losses: number;
	highestScore: number | null;
};

// A single competition result row.
export type ArcherPerformance = {
	date: string;
	competition: string;
	placing: string;
	distance: string | null;
	score: number | null;
};

// Per-locale translatable text. Only the bio is translated; disciplines render
// via enum-label i18n and competition names stay neutral proper nouns.
export type ArcherTranslation = {
	locale: Locale;
	bio: string;
};

export type Archer = {
	id: string;
	slug: string; // URL = /team/{id}/{slug}
	firstName: string;
	lastName: string;

	roles: ('archer' | 'coach')[]; // can be both
	bowType: Bow | null; // null for coach-only
	gender: 'male' | 'female' | null;
	competitionCategories: string[]; // World Archery codes (CW, RM, …) or FB-derived
	order: number; // manual drag-reorder within a bowType section

	cardPhoto: ImageRef;
	worldArcheryId: string | null; // WA profile link only (no live stats v1)

	isMinor: boolean;
	minorVisibleFields: string[]; // per-field visibility for minors; empty = none visible (default-hide)
	coachIds: string[]; // links to other Archer records; students derived by reverse-lookup
	hiddenSections: string[]; // admin force-hide: bio / stats / performance

	status: 'draft' | 'published'; // draft = profile being built before public
	hidden: boolean;

	careerStats: ArcherCareerStat[];
	performance: ArcherPerformance[];

	translations: ArcherTranslation[];
	sourceLocale: Locale;
};

import type { ImageRef, Locale } from './common.ts';

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

// A single competition result / appearance row. Shape matches the roster seed
// data (one row per event in a rolling window).
export type ArcherPerformance = {
	date: string; // 'MM/YYYY'
	name: string; // event/competition name
	scope: 'domestic' | 'global';
	type: 'outdoor' | 'indoor' | 'field' | '3d';
	categories: string[]; // WA category codes contested (CW, RM, …)
	meters: string | null; // distance, e.g. '50m'; null when not stated
	placing: string | null; // '1st' | 'silver' | … ; null when unknown
	points: number | null; // qualification points; null when unavailable
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
	bowType: Bow[]; // all styles they compete in; [] for coach-only. First entry = primary (drives grid section).
	gender: 'male' | 'female' | null;
	competitionCategories: string[]; // World Archery codes (CW, RM, …) or FB-derived
	order: number; // manual drag-reorder within a bowType section

	cardPhoto: ImageRef | null; // team-grid headshot (shoulders-up); null = front-end shows a default stock image
	profilePhoto: ImageRef | null; // bigger image for the individual profile page; null = front-end shows a placeholder
	worldArcheryId: string | null; // WA profile link only (no live stats v1)

	birthDate: string | null; // ISO; stored, never sent raw. Age derived; auto-hidden if <18 (minor).
	coachIds: string[]; // links to other Archer records; students derived by reverse-lookup
	hiddenSections: string[]; // admin force-hide: bio / stats / performance

	status: 'draft' | 'published'; // draft = profile being built before public
	hidden: boolean;

	careerStats: ArcherCareerStat[];
	performance: ArcherPerformance[];

	translations: ArcherTranslation[];
	sourceLocale: Locale;
};

// Lightweight view for the /team roster GRID. bowType + order are STRUCTURAL
// (group the grid into bow sections, ordered within) — the card itself shows
// name + photo + gender + categories. slug is for the profile link. An archer
// who competes in multiple styles is grouped by their PRIMARY bow (bowType[0]).
export type ArcherCard = {
	slug: string;
	firstName: string;
	lastName: string;
	cardPhoto: ImageRef | null; // null = front-end shows a default stock image
	gender: 'male' | 'female' | null;
	competitionCategories: string[];
	bowType: Bow[];
	roles: ('archer' | 'coach')[]; // lets the grid build a "Treneri" group from coaches
	order: number;
};

// A coach/student reference on a profile: name + slug (links to their profile).
export type ArcherRef = {
	slug: string;
	firstName: string;
	lastName: string;
};

// Full single-locale view for the /team/:slug PROFILE page. bio resolved to the
// requested locale; age derived (null when <18 = minor, or no birthDate, or
// admin-hidden). Sections in hiddenSections are omitted server-side.
export type ArcherProfile = {
	slug: string;
	firstName: string;
	lastName: string;
	cardPhoto: ImageRef | null; // null = front-end shows a default stock image
	profilePhoto: ImageRef | null; // bigger profile-page image; null = front-end shows a placeholder
	gender: 'male' | 'female' | null;
	bowType: Bow[];
	roles: ('archer' | 'coach')[];
	competitionCategories: string[];
	worldArcheryId: string | null;
	age: number | null; // derived; null if <18, no birthDate, or hidden

	coaches: ArcherRef[];
	students: ArcherRef[];

	careerStats: ArcherCareerStat[]; // [] if hidden or none
	performance: ArcherPerformance[]; // [] if hidden or none

	locale: Locale;
	bio: string | null; // resolved; null if the 'bio' section is hidden
};

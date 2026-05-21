import type { ImageRef, Locale } from './common';

// Tournament / club event. Source-agnostic (World Archery auto-fetch, admin-manual,
// or domestic from Facebook). The site only shows events the club attended.

export type Discipline = 'outdoor' | 'indoor' | 'field' | '3d';

// Admin-extensible event level (e.g. World Cup, European, Domestic). Drives the
// calendar legend. color = legend dot/legend color.
export type EventLevel = {
	id: string;
	color: string; // hex
	order: number; // legend display order
};

// Level labels are translatable so the calendar legend localizes.
export type EventLevelTranslation = {
	locale: Locale;
	name: string;
};

// Per-locale translatable text. Only the event name is translated (some domestic
// events have descriptive names); location/organizer stay neutral proper nouns.
export type ClubEventTranslation = {
	locale: Locale;
	name: string;
};

export type ClubEvent = {
	id: string;
	discipline: Discipline; // grouping + color
	format: string | null; // 'WA 720', 'WA 2x18', 'WA 3D', 'FIELD 12+12'
	level: string | null; // references an EventLevel id
	dateFrom: string; // ISO
	dateTo: string | null; // ISO; null = single-day event

	image: ImageRef | null; // event poster/photo; falls back to placeholder/discipline default
	attendingArcherIds: string[]; // roster archers; site only shows events where length > 0
	sourceUrl: string | null; // "view original" — WA page / FB post

	isCancelled: boolean;
	status: 'draft' | 'published'; // WA auto-fetch imports as published; draft = admin building
	hidden: boolean;

	// — Neutral, language-specific names live in location/organizer (proper nouns) —
	location: string | null;
	organizer: string | null; // VSK, Sisak, … (organize vs. attend)

	translations: ClubEventTranslation[];
	sourceLocale: Locale;
};

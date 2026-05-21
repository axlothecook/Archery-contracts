// Barrel for the 5 shared VSK Archery type contracts.
// Import as: import type { Article, Archer } from 'archery-contracts';

export type { Locale, ImageRef } from './common';
export type {
	Article,
	ArticleTranslation,
	ArticleDraftRevision,
	ArticleMediaType,
	ArticleImage,
	ArticleVideo,
	ExternalLink
} from './article';
export type { Archer, ArcherTranslation, Bow, ArcherCareerStat, ArcherPerformance } from './archer';
export type {
	ClubEvent,
	ClubEventTranslation,
	Discipline,
	EventLevel,
	EventLevelTranslation
} from './club-event';
export type { Sponsor, SponsorTranslation } from './sponsor';
export type { Achievement, AchievementTranslation } from './achievement';

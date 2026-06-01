// Barrel for the 5 shared VSK Archery type contracts.
// Import as: import type { Article, Archer } from 'archery-contracts';

export type { Locale, ImageRef } from './common.ts';
export type {
	Article,
	ArticleTranslation,
	ArticleDraftRevision,
	ArticleMediaType,
	ArticleImage,
	ArticleVideo,
	ExternalLink,
	ArticleArcherRef,
	ArticleCard,
	ArticleResolved
} from './article.ts';
export type {
	Archer,
	ArcherTranslation,
	Bow,
	ArcherCareerStat,
	ArcherPerformance,
	ArcherCard,
	ArcherRef,
	ArcherProfile
} from './archer.ts';
export type {
	ClubEvent,
	ClubEventTranslation,
	ClubEventResolved,
	Discipline,
	EventLevel,
	EventLevelTranslation,
	EventLevelResolved
} from './club-event.ts';
export type { Sponsor, SponsorTranslation, SponsorResolved } from './sponsor.ts';
export type {
	Achievement,
	AchievementTranslation,
	AchievementArcher,
	AchievementResolved
} from './achievement.ts';
export type { HeroImage } from './hero-image.ts';
export type {
	ClubInfo,
	ClubInfoTranslation,
	ClubOfficer,
	ClubSocial,
	ClubHistoryPhoto,
	ClubInfoResolved,
	ClubOfficerResolved,
	ClubHistoryPhotoResolved
} from './club-info.ts';
export type {
	ClubHistoryPeriod,
	ClubHistoryPeriodTranslation,
	ClubHistoryPeriodResolved
} from './club-history.ts';
export type {
	InquiryStatus,
	MembershipSubmission,
	SponsorInquiry,
	DonationInquiry
} from './inquiries.ts';

// Inbound public form submissions — admin-only inboxes (no public read, no i18n;
// user-submitted content isn't translated). All share an inbox workflow status.

export type InquiryStatus = 'new' | 'read' | 'archived';

// Membership join request.
export type MembershipSubmission = {
	id: string;
	salutation: string | null;
	fullName: string;
	email: string;
	phone: string | null;
	birthDate: string | null; // ISO
	experience: string | null; // free text: prior archery experience
	forMinor: boolean; // applying on behalf of a minor
	minorDetails: string | null; // present when forMinor
	message: string | null;
	consentAccepted: boolean; // GDPR consent
	status: InquiryStatus;
	responded: boolean; // an admin replied (via Brevo) from the dashboard
	submittedAt: string; // ISO
};

// Prospective-sponsor enquiry ("Join us").
export type SponsorInquiry = {
	id: string;
	companyName: string;
	contactName: string;
	email: string;
	phone: string | null;
	sponsorshipInterest: string | null; // free text
	message: string | null;
	consentAccepted: boolean;
	status: InquiryStatus;
	responded: boolean;
	submittedAt: string; // ISO
};

// Donation enquiry ("How to give").
export type DonationInquiry = {
	id: string;
	donorName: string;
	email: string;
	phone: string | null;
	message: string | null;
	consentAccepted: boolean;
	status: InquiryStatus;
	responded: boolean;
	submittedAt: string; // ISO
};

import type { ImageRef } from './common.ts';

// Homepage cursor-image hero (numbered.com style): as the mouse moves across the
// X axis, the image swaps per zone (zones = image count, ~15% each, cap ~10).
// Image-only — no translatable text. Admin-managed, ordered.
export type HeroImage = {
	id: string;
	image: ImageRef;
	order: number;
};

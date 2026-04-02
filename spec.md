# UrmiWellness

## Current State
Website has 8 products all branded as "PR Ayurveda" (e.g., "PR Ayurveda शिलाजीत कैप्सूल"). Testimonials and FAQs also reference "PR Ayurveda". The site is UrmiWellness branded in UI but product data still has old branding.

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- All 8 product names: remove "PR Ayurveda" prefix, replace with "UrmiWellness" branding
- Product descriptions: replace "PR Ayurveda" with "UrmiWellness"
- Testimonials: replace "PR Ayurveda" with "UrmiWellness"
- FAQs: replace "PR Ayurveda" with "UrmiWellness"
- ProductsSection.tsx: fallback image URL text update

### Remove
- All "PR Ayurveda" text from product data

## Implementation Plan
1. Update staticData.ts — rename all products and replace PR Ayurveda with UrmiWellness in names, descriptions, testimonials, FAQs
2. Update ProductsSection.tsx fallback image text
3. Validate and deploy

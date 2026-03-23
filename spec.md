# PR Ayurveda

## Current State
E-commerce Ayurvedic site in Hindi. Products shown in a grid. Images imported via absolute `/assets/generated/...` paths which Vite cannot resolve — causing broken images. No product detail page exists.

## Requested Changes (Diff)

### Add
- Product detail page/modal: clicking a product opens a full detail view showing product image, name, description, benefits, ingredients, rating, reviews, price, and "कार्ट में जोड़ें" button
- Detail view should feel like Flipkart product page (image on left, info on right, clear CTA)

### Modify
- Fix image imports in staticData.ts: change from absolute `/assets/generated/...` imports to string URL references (`/assets/generated/...`) directly in the data — Vite public folder files must be referenced as URL strings, not ES module imports
- ProductsSection: product cards should be clickable to open the detail view

### Remove
- Broken ES module imports of images from absolute paths

## Implementation Plan
1. Fix staticData.ts — remove all `import img... from "/assets/..."` and use string paths directly in the `image` field
2. Create ProductDetailModal.tsx — Flipkart-style product detail modal with image, info, add to cart
3. Update ProductsSection.tsx — make cards clickable, pass selected product to modal
4. Update App.tsx if needed

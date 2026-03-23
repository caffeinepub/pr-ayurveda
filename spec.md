# PR Ayurveda

## Current State
- Hindi-language Ayurveda e-commerce website
- Backend: products, cart, orders, consultations, testimonials, FAQs
- Frontend: Hero, Products, Cart sidebar, FAQ, Consultation form, Reviews, Footer
- No admin access control or dashboard

## Requested Changes (Diff)

### Add
- Admin dashboard page at `/admin` route
- Admin login (password-based via authorization component)
- Product management: add, edit, delete products (name, price, description, benefits, ingredients)
- View all consultations submitted by users
- View all orders
- Backend: updateProduct, deleteProduct endpoints

### Modify
- App.tsx: add routing so `/admin` renders AdminDashboard, default renders main site
- Backend: add updateProduct and deleteProduct functions

### Remove
- Nothing removed

## Implementation Plan
1. Add authorization component for admin login
2. Add updateProduct and deleteProduct to backend
3. Build AdminDashboard frontend page with tabs: Products, Consultations, Orders
4. Add routing in App.tsx (hash-based: #admin vs main site)
5. Admin login gate before showing dashboard

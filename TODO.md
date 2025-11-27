ParkRate TODO
------------

Images
- Replace placeholder park photos with real images (5 at a time); start with the first five parks and continue through the list.
- Document image sources/licensing for the chosen photos.

Data quality
- Remove the unused random-rating helper and confirm all park entries have consistent required fields (hours, phone, website, categoryRatings).
- Add a fallback/404 handling path for invalid park IDs and avoid crashes.

Quality & testing
- Run lint/format (`bun run lint`, `bun run format`) and ensure clean output.
- Add minimal render/smoke tests for key pages (home, map, compare, park detail) and a quick accessibility pass on critical flows.

SEO/Metadata
- Set proper site metadata (title/description) and consider schema.org structured data for parks.
- Decide on analytics/error tracking to include in production.

Deployment & ops
- Verify Netlify build settings and environment variables; add Next.js image domain config if needed for external photos.
- Plan caching/headers strategy for assets and pages.

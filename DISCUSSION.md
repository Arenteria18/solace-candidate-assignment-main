# Implementation plan
### Purpose 
This document is meant to describe my workflow and process of building out features for an app. I will note my thought process and document decisions made. After the requirements and project discovery, I will create detailed "tickets" that align with the PRs.

### Customer Privacy and Accessibility
Thinking about healthcare systems and this being a customer-facing product, two things come to mind as areas to focus on as we build this out. Customer data should be compliant with all HIPAA and other medical regulations. Customer data should be encrypted in transit, at rest, and in memory.

The project should also take into account best web practices for accessibility. Designing the application, we will focus on meeting WCAG 2.1 AA. This includes screen reader compatibility, keyboard navigation, and appropriate color contrast.

### Discovery
Here is a list of questions I would answer before I started on implementation.
- Medical and legal requirements?
  - What patient data and Personal Identification Information will we be handling?
  - What are our HIPAA requirements?
  - Protected Health Information?
- Define who our users are and create user stories
   - Patients
   - Advocates
- State of the codebase.

### Product requirements 
After the initial discovery phase, I will have a better understanding of the requirements. I will also know what questions I need to ask to fill in the missing requirements. Since this is a coding exercise, I will make some assumptions about requirements and add them to the decision log.


## Tickets 
These are going to be very rough for tickets, but helpful for me to keep track of everything

### Squash bugs and clean up anti-patterns.
List of bugs found:
- `<th> cannot be a child of <thead>` 
- Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.
  - SSR fun
- Warning: Each child in a list should have a unique "key" prop.
- Uncaught TypeError: advocate.yearsOfExperience.includes is not a function

### Security vulnerabilities
Need to do a quick security audit and make sure we are following best practices for protecting our users' data.

- Add auth to API endpoints
- PII data for advocates is being returned. No cache controls
- Logs print full advocate logs.
- Remove .env file from codebase or encrypt
- Missing HTTP headers
- API needs schema validation
- Need to rate limit API routes

### UI Cleanup
The AI-generated table is all in one page and needs to be broken up into smaller components. The page needs to have a basic design in place. Follow React best practices and WCAG 2.1 AA guidance. 
- Move components out of the page and into the Components folder.
- Mobile and desktop layouts
- Add a theme 


## Post-prototype roadmap
I am wrapping up here to not push too far past the recommended time. Here I will outline where I would go from here and what enhancements I would make to get this to production readiness.

## Immediate next steps (product + tech)

### Implement server-side query params
- Use params (q, sort, order, page, pageSize) for SearchBar. 
- This will help with performance at scale by sending only what is needed. 

### Add stable IDs and normalize data
- Introduce ID on Advocate; normalize specialties (IDs + join table) to support facets and counts.

### Basic auth and RBAC
- Gate PII and sensitive endpoints; issue JWT or session-based auth; add role scopes for admin vs. public.

### Input validation and error UX
- Validate query params with zod/valibot; show helpful client errors; keep 400s/422s consistent.

## Search and relevance evolution

### Phase 1 (fast win): Postgres indexing
- Case/accent-insensitive collation; keyset pagination for deep paging.

### Phase 2 (feature-rich): Dedicated search
- Meilisearch or OpenSearch for fuzzy search, typo tolerance, and ranking rules.

### Phase 3 (quality): Relevance tuning
- Boost exact matches, recency, proximity; synonyms; phonetic matching.

## API and performance

### Caching
- CDN cache for non-PII; consider TanStack Query or a similar library on the client for list pages.

### Rate limiting and quotas
- Per-IP/user/sec with sliding window; add Retry-After headers.

## DevEx and quality

### CI/CD
- PR checks (type, lint, test, build); ephemeral preview environments; canary deploys.

### Testing
- Contract tests for API, deterministic search fixtures, accessibility tests (axe), e2e (Playwright).

### Versioning
- API versioning strategy; deprecations with timelines.

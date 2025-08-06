## Implementation Approach

I approached this assignment with a systematic, iterative development process using three sequential branches that build upon each other. This mirrors real-world development where features are built incrementally rather than in isolated silos.

I've openend a new branch and make sequential PRs based off the three actions outlined in the Take Home Assignment description. IE the base branch is the assignment untouched, then the one PR and branch off of the base branch is the basic bug fixes. OFF The bug fix branch is the UI improvement branch etc. 

Thus we can see iteratively the effects my changes made to the app. 

I meant to update the DISCUSSION.md as we went, but forgot to, so I'm gonna summarize here what we did across all three branches

## Branch Strategy: Sequential Development

### 1. Bug Fixes Branch (`bug_fixes`)
**Purpose**: Fix errors and warnings to get the app to a 'clean' state where console errors aren't appearing and the app is de facto functional

**Key Changes:**
- Added TypeScript interfaces for proper type safety
- Fixed React key warnings in map operations
- convert numbers passed to `.includes()` to string
- Replaced direct DOM manipulation and opt for React states 
- Improved search by accountign for case sentivity
- Added some error handling for API calls
- Wrapped table in `<tr>`

### 2. UI/UX Improvements Branch (`ui_improvements`)
**Purpose**: Add some neatness to the app and give the table a more polished look.
Used AI to help with the tailwind classes etc 

**Key Changes:**
- Opt to use Tailwind 
- Added state for loading
- Little bit of coloring (blue)
- Phone number formatting

### 3. Performance Improvements Branch (`performance_improvements`)
**Purpose**: Optimize performance a little bit, mainly with search debouncing 

**Key Changes:**
- Basic search debouncing
- Put search logic into its own function

## Additional Improvements Given More Time

I would further implement:

- Server-side search and filtering with query parameters
- Pagination
- Database indexing for search fields (name, city, specialties)
- API response caching
- Virtual scrolling for large datasets
- Sorting (by experience, name, location)
- Search Autocomplete

- Unit tests for search logic and components
- End-to-end tests 
- Performance monitoring and metrics (grafana, sentry, etc)

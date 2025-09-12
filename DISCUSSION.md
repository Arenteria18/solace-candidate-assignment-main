 # Implemention plan
### Purpose 
This document is meant to describe my workflow and process of building out features for an app. I will notes my thought process and document decicions made. After the requirements and project discovery, I will create detailed "tickets" that align with the PRs

### Customer Privacy and Accessibility
Thinking about healtcare systems and the this being a customer facing product, two things come to mind on areas to focus on as we build this out. Customer data should be compliant with all HIPAA an other medical regulations. Customer data should be encrypted, in transit, at rest, and in memory. 

The project should also take into account best web practices for accesibility. Designing the application we will have focus on meeting the WCAG 2.1 AA compliance. This includes screen reader compatibility, keyboard navigation, and appropriate color contrast

### Discovery
Here is a list of question I would answer before I started on implementation. 
- Medical and legal requirements?
  - What patient data and Personal Idetitfication Information will we be handling?
  - what are our HIPAA requirements
  - Protected Health Information?
- Define who our users are and create user stories
   - Patients
   - Advocates
- State of the codebase.

### Product requirements 
After the intial discovery phase, I will have a better understanding of the requirements. I will also know what questions I need to ask to fill in the missing requirements. Since this is a coding exercise I will make some assumptions about requirements and add them to the decision log.


## Tickets 
These are going to be very rough for tickets, but helpful for me to keep track of everything

### squash bugs and clean up anti-patterns.
List of bugs found:
- `<th> cannot be a child of <thead>` 
- Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.
  - SSR fun
- Warning: Each child in a list should have a unique "key" prop.
- Uncaught TypeError: advocate.yearsOfExperience.includes is not a function

### Security vulnerabilities
need to do a quick security audit and make sure we are following best practices for protecting our users data.

- Add Auth to api endpoints
- PII data for advocates is being returned. No cache controls
- logs print full advocate logs.
- Remove .env file from codebase or encrypt
- missing http headers
- API need scheme validation
- Need to rate limit API routes

### UI Clean up
the AI generated table is all in one page and needs to be broken up into smaller components. The page needs to have a basic design in place. Follow best React Practices and WCAG 2.1 AA guidance. 
- move components out of page and into Components folder. 
- mobile and desktop layouts
- add a theme 
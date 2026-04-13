# Risk Assessment Guide

## Purpose

Surface the real threats to this business idea before they become expensive failures.
Do not minimize risks. Do not catastrophize. Rate them accurately.

---

## Risk Rating Scale

| Level | Meaning | Action Required |
|-------|---------|-----------------|
| **Low** | Unlikely or easily managed | Monitor only |
| **Medium** | Possible and could slow growth | Build mitigation plan |
| **High** | Likely and could derail the business | Resolve before scaling |
| **Critical** | Could kill the business entirely | Resolve before launch |

---

## Risk Category 1 — Market Risks

Threats originating from the external market environment.

### Checklist

- [ ] **Market size risk**: Is the total addressable market too small to build a sustainable business?
- [ ] **Competition risk**: Are well-funded incumbents already solving this problem?
- [ ] **Commoditization risk**: Is this product easily copied with no defensible moat?
- [ ] **Timing risk**: Is the market too early (customers not ready) or too late (market saturated)?
- [ ] **Regulatory risk**: Could new laws or regulations block the business model?
- [ ] **Customer concentration risk**: Does success depend on landing a small number of large customers?

### How to Evaluate

For each risk identified:
1. State the specific risk (not generic)
2. Provide evidence for why it is a risk
3. Assign a rating (Low / Medium / High / Critical)
4. Suggest a mitigation action

---

## Risk Category 2 — Technical Risks

Threats originating from the product or technology stack.

### Checklist

- [ ] **Build complexity risk**: Is the core technology unproven or extremely difficult to build?
- [ ] **Scalability risk**: Will the architecture break under real user load?
- [ ] **Data dependency risk**: Does the product require data that is difficult to acquire or license?
- [ ] **AI/ML reliability risk**: If AI is used, can it meet the accuracy bar required for production use?
- [ ] **Third-party dependency risk**: Does the product depend on an API or platform that could be discontinued or priced out?
- [ ] **Security/privacy risk**: Does the product handle sensitive data that creates liability if breached?

### How to Evaluate

- If the technical core has never been built before: **High** by default until proven.
- If the product depends on a single third-party API (e.g., OpenAI, Google Maps): always flag as **Medium** minimum.
- If the product handles financial, medical, or personal data: flag security/privacy risk as **High** minimum.

---

## Risk Category 3 — Execution Risks

Threats from the team's ability to build and scale the business.

### Checklist

- [ ] **Founding team risk**: Does the team have the skills needed to build and sell this product?
- [ ] **Go-to-market risk**: Is there a credible plan to reach the first 100 paying customers?
- [ ] **Capital risk**: Can the business reach profitability or next funding milestone before running out of money?
- [ ] **Hiring risk**: Does the business require specialized talent that is scarce or expensive?
- [ ] **Operational risk**: Are there complex operations (logistics, compliance, partnerships) required to function?
- [ ] **Founder-market fit risk**: Does the team deeply understand the problem they're solving?

### How to Evaluate

- Missing a critical skill on the founding team (e.g., no technical co-founder for a tech product): **High**.
- No clear GTM plan: **High** — distribution is harder than building.
- Runway < 12 months with no revenue: **High** capital risk.

---

## Output Format

```
### Risk Assessment

#### Market Risks
| Risk | Rating | Evidence | Mitigation |
|------|--------|----------|------------|
| [risk name] | High | [evidence] | [action] |

#### Technical Risks
| Risk | Rating | Evidence | Mitigation |
|------|--------|----------|------------|
| [risk name] | Medium | [evidence] | [action] |

#### Execution Risks
| Risk | Rating | Evidence | Mitigation |
|------|--------|----------|------------|
| [risk name] | Critical | [evidence] | [action] |

**Overall Risk Level**: Low / Medium / High / Critical
**Top 3 Risks to Address First**: [list]
```

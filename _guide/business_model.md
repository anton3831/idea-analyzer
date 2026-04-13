# Business Model Analysis Guide

## Purpose

Determine whether the business can generate sustainable revenue.
A great idea with a broken business model will always fail. Analyze with financial realism.

---

## Step 1 — Revenue Stream Identification

Identify ALL possible revenue streams. Then rank them by viability.

### Common Revenue Stream Types

| Type | Description | Example |
|------|------------|---------|
| **Subscription (SaaS)** | Recurring monthly/annual fee | Notion, Slack |
| **Transactional** | Fee per transaction or sale | Stripe, Shopify |
| **Marketplace** | Take-rate on buyer/seller volume | Airbnb, Fiverr |
| **Freemium → Paid** | Free tier upgrades to paid features | Spotify, Dropbox |
| **Advertising** | Revenue from showing ads | YouTube, Reddit |
| **Licensing** | Charge for IP or software usage rights | Adobe (legacy) |
| **Professional Services** | Implementation, consulting, support | Salesforce |
| **Data Monetization** | Sell aggregated/anonymized data | Bloomberg |

**Rules:**
- Identify which stream the idea is primarily using.
- Flag if the primary stream depends on advertising at early stage — ad revenue requires massive scale.
- Flag if there are zero recurring revenue mechanisms — one-time sales require constant new customer acquisition.

---

## Step 2 — Pricing Logic

Evaluate whether the pricing model makes sense for the target customer and market.

Answer these questions:

1. **What is the pricing model?** (per seat, per usage, flat rate, tiered, etc.)
2. **What is the price point?** (specific number or range)
3. **How does the price compare to alternatives?** (cheaper, parity, premium — and why)
4. **Can the target customer afford it?** (individual vs. SMB vs. enterprise has very different budget ranges)
5. **What is the perceived value vs. price ratio?** (high value / low price = underpriced; low value / high price = churn risk)

### Pricing Red Flags
- "We'll figure out pricing later" → fatal. Pricing IS the business model.
- Price set without customer validation → likely wrong.
- Price significantly below market with no structural cost advantage → unsustainable.

---

## Step 3 — Unit Economics

Estimate whether each customer generates profit, not just revenue.

| Metric | Definition | Target |
|--------|-----------|--------|
| **LTV** (Lifetime Value) | Revenue from one customer over their lifetime | LTV > 3× CAC |
| **CAC** (Customer Acquisition Cost) | Total spend to acquire one customer | As low as possible |
| **Gross Margin** | (Revenue - COGS) / Revenue | Software: >70%; Marketplace: >50% |
| **Payback Period** | Months to recover CAC from a customer | <12 months ideal |
| **Churn Rate** | % of customers lost per month | <5% monthly for SaaS |

If unit economics cannot be estimated, flag which assumptions are missing and why they matter.

---

## Step 4 — Monetization Strategy Assessment

Evaluate the path from zero revenue to sustainable revenue:

- **Early monetization**: Can the first 10 customers pay before the product is fully built? (signals real demand)
- **Scalability**: Does revenue grow without proportional cost growth?
- **Lock-in / switching cost**: Once a customer starts paying, is it hard to leave? (higher = better retention)
- **Network effects**: Does more usage make the product more valuable? (strongest moat)

---

## Output Format

```
### Business Model Analysis

**Primary Revenue Stream**: [type]
**Secondary Revenue Streams**: [list or "none"]

**Pricing Model**: [description]
**Price Point**: $[X] per [unit/month/transaction]
**Vs. Alternatives**: Cheaper / Parity / Premium — [reason]

**Unit Economics (Estimated)**:
- LTV: $[X]
- CAC: $[X]
- Gross Margin: [X]%
- Payback Period: [X] months

**Monetization Strength**: Strong / Moderate / Weak
**Key Issues**: [list any red flags]

**Business Model Verdict**: Viable / Needs Work / Broken — [1-sentence reason]
```

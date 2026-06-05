@AGENTS.md

# premedplan.ca — Project Guide

## Stack
- Next.js 16 (Turbopack), deployed on Vercel
- All data is hardcoded in `lib/` — no database, no API

## Key data files
- `lib/schools.ts` — school requirements, GPA, MCAT, seats, prereqs
- `lib/gpaCalculator.ts` — per-school GPA calculation methods and school definitions
- `lib/costCalculator.ts` — OMSAS fees, per-school designation fees, test flags
- `lib/policyChanges.ts` — policy change tracker entries (newest at top)
- `lib/applicationTimeline.ts` — 2026-27 cycle milestones
- `lib/types.ts` — shared TypeScript interfaces

## GPA methods per school
- UofT: cGPA (all years)
- McMaster: cGPA (all years)
- Western: best 2 years (3.7 min required in each)
- Queen's: cGPA (all years)
- uOttawa: most recent 3 years
- TMU: cGPA (all years)
- NOSM: cGPA (all years)

## Fee notes
- OMSAS base fee: $220
- OMSAS per-school designation fee: $135 (TMU is $130 — set via `designationFee` field)
- TMU: no MCAT, no CASPer (`mcatStatus: 'no'`, `requiresMCAT: false`, `requiresCasper: false`)
- McMaster: no Snapshot, no Duet — CASPer only (`requiresSnapshot: false`, `requiresDuet: false`)

## Tabs
1. School Requirements
2. GPA Calculator
3. Cost Calculator
4. Policy Change Tracker
5. Reference Letter Template (email generator + OMSAS guide only — tracker was removed)
6. Application Timeline
7. Creator's Personal Story

## Content update workflow
- School data changes: edit `lib/schools.ts`
- New policy change: prepend to `POLICY_CHANGES` array in `lib/policyChanges.ts`
- Timeline dates: update `lib/applicationTimeline.ts` each cycle
- Seats / header stats: update `lib/schools.ts` + `components/Header.tsx` manually (total seats and no-MCAT count)

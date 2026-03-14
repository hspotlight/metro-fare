# metro-fare Project Knowledge

## Overview
Bangkok mass transit fare calculator web app. Users pick origin/destination stations; app finds all routes and calculates fares across Bangkok's public transit lines.

## Tech Stack
- React 17 (CRA), TypeScript
- Material UI v5 (alpha) + Emotion
- Leaflet + react-leaflet (interactive map)
- react-router-dom v5
- i18next (Thai/English)
- Firebase Analytics
- Jest + React Testing Library + Cypress (E2E)
- SCSS (node-sass)

## Transit Lines
- BTS Sukhumvit + Silom (Sky Train)
- BTS Gold line
- MRT Blue (circular ring + linear tail)
- MRT Purple
- ARL (Airport Rail Link)
- BRT (Bus Rapid Transit)

## Core Architecture

### Key Files
- `src/services/navigation.service.ts` — BFS pathfinding (priority queue, fewest hops first)
- `src/services/fare.service.ts` — hop-based fare calculation per segment
- `src/services/graph.service.ts` — builds adjacency list from line/intersection data
- `src/services/btsFare.service.ts` — BTS-specific fare lookup table
- `src/common/fare.ts` — fare tables for all lines (METRO_FARE)
- `src/data/` — station definitions per line (MrtBlueLine, BtsSukhumvitLine, etc.)
- `src/data/MetroGraph.ts` — combined graph with intersections
- `src/types/LineType.ts` — LineType enum
- `src/config/featureToggle.ts` — feature flags
- `src/contexts/` — TripProvider, MapProvider, DrawerProvider (React context)

### Business Logic
1. Graph built as adjacency list; interchange stations linked as intersections
2. BFS finds ALL possible routes (not just shortest), split into RouteSegment[] per line
3. Fare per segment: hop count -> index into fare table
   - BTS: separate lookup table (btsFare.service)
   - MRT Blue: special circular logic (min of clockwise vs counterclockwise hops) + linear tail
   - Free transfer (0 fare) at interchange stations with 0 hops
4. Journey object returned: segments with individual fares + total fare

### Fare Tables (src/common/fare.ts)
- BRT: flat 15 THB
- ARL: 15-45 THB (8 tiers)
- BTS: 16-44 THB (14 tiers)
- MRT Blue: 17-42 THB (14 tiers)
- MRT Purple: 14-42 THB (14 tiers)
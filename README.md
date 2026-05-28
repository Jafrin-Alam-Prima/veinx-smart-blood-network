
<div align="center">

# 🩸 VeinX
### AI-Powered Emergency Blood Donation Intelligence Platform

#### *Transforming emergency blood response with intelligent donor orchestration, predictive matching, and real-time healthcare coordination.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs)
[![AI Matching](https://img.shields.io/badge/AI-Smart_Matching-red?style=for-the-badge)](#)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

<br/>

### 🚨 “In Bangladesh, finding blood during an emergency still depends on Facebook posts, random phone calls, and luck.”

### VeinX replaces chaos with intelligent, real-time donor coordination.

</div>

---

# 📌 Executive Summary

VeinX is an AI-native emergency blood donation ecosystem designed to modernize the fragmented blood request process in Bangladesh and other developing regions.

The platform combines:

- 🧠 AI-powered donor prioritization
- 📍 Real-time geospatial donor discovery
- ⚡ Emergency severity scoring
- 📊 Predictive donor availability modeling
- 🏥 Hospital coordination dashboards
- 🌐 Offline-first communication workflows
- 📡 SMS fallback dispatch systems

to create a next-generation healthcare logistics platform capable of reducing emergency response time during critical blood shortages.

Unlike traditional donor directories, VeinX acts as an **intelligent orchestration layer** between patients, hospitals, and volunteer donors.

---

# 🚨 Problem Statement

## Existing Crisis

In many developing countries, especially Bangladesh, emergency blood requests still rely on:

- Facebook groups
- Messenger broadcasts
- Random phone calls
- Unverified donor lists
- Manual coordination

This results in:

- ⏳ Delayed emergency response
- ❌ Unverified donor compatibility
- 📉 High donor dropout rate
- 🏥 Hospital coordination failure
- 📍 No location intelligence
- 🚫 No urgency prioritization
- 🤰 Maternal emergency neglect
- 🌐 Internet dependency during crises

During maternal emergencies, accident trauma, surgeries, or rare blood group shortages, these inefficiencies can directly cost lives.

---

# 💡 Proposed Solution

VeinX introduces a fully digital, AI-assisted emergency blood coordination platform that intelligently connects patients, hospitals, and nearby donors in real time.

The system uses:

- Intelligent compatibility ranking
- Geospatial proximity analysis
- AI urgency estimation
- Predictive donor responsiveness
- Real-time route simulation
- Hospital command analytics

to minimize response latency and maximize successful blood fulfillment.

---

# 🧠 Core AI Capabilities

## 1. Smart Match Engine

Every donor is ranked using a weighted multi-factor AI scoring system.

```text
Smart Match Score =
30 × Blood Compatibility
+ 28 × Distance Proximity
+ 20 × Availability
+ 12 × Reliability
+ 10 × Maternal Priority
````

The algorithm dynamically ranks eligible donors based on:

* Blood group compatibility
* Estimated arrival time (ETA)
* Live availability
* Historical response behavior
* Emergency criticality
* Maternal risk factor

---

## 2. AI Emergency Score

VeinX generates an Emergency Severity Score (0–100) using:

* Blood rarity
* Required units
* Hospital urgency
* Supply-demand imbalance
* Maternal emergency flag
* Time sensitivity

This allows intelligent triaging and prioritization.

---

## 3. Predictive Donor Availability

The platform estimates donor responsiveness probability using behavioral simulation factors such as:

* Previous response history
* Active availability status
* Recent donations
* Time-of-day likelihood
* Proximity movement pattern

---

## 4. Explainable AI Decisions

Unlike black-box systems, VeinX provides transparent reasoning behind donor selection.

Example:

```text
Matched because:
✓ O− compatible
✓ Only 2.1 km away
✓ Active within last 5 mins
✓ High reliability score
✓ Previous successful donations
```

---

# 🌍 Key Features

## 🗺️ Live Donor Intelligence Map

* Uber-style real-time donor visualization
* Dynamic location simulation
* Radius detection
* Route estimation
* Heatmap clustering

---

## ⚡ Emergency Dispatch Workflow

```text
Emergency Created
        ↓
AI Severity Analysis
        ↓
Smart Donor Ranking
        ↓
Nearest Compatible Donors
        ↓
Push / SMS Dispatch
        ↓
Live Tracking
        ↓
Hospital Confirmation
```

---

## 🏥 Hospital Command Center

Administrative healthcare dashboard featuring:

* Live emergency queue
* Blood demand heatmaps
* Supply analytics
* Donor activity metrics
* Real-time incident monitoring
* Regional shortage visualization

---

## 🤰 Maternal Emergency Prioritization

Maternal emergencies receive:

* Priority routing
* Elevated AI severity weighting
* Faster donor dispatch
* Dedicated visual indicators

---

## 📴 Offline + SMS Fallback

In low-connectivity regions:

* SMS-based donor dispatch activates automatically
* Emergency requests continue functioning
* Internet dependency is minimized

Designed specifically for infrastructure-constrained environments.



# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────────────┐
│                         VeinX Platform Architecture                 │
└─────────────────────────────────────────────────────────────────────┘

Frontend Layer
│
├── Next.js 16 App Router
├── React 19 Client Components
├── TailwindCSS v4 UI System
├── Motion Animation Engine
└── Responsive Mobile-First UX

Application Layer
│
├── AI Smart Matching Engine
├── Emergency Severity Analyzer
├── ETA Prediction Module
├── Geospatial Distance Engine
├── Mock Real-Time Simulation Engine
└── Offline Communication Manager

State & Data Layer
│
├── Zustand Global Stores
├── TanStack Query Cache
├── Mock Real-Time Streams
└── Event Synchronization Hooks

Visualization Layer
│
├── Interactive SVG Map Renderer
├── Animated Donor Nodes
├── Hospital Analytics Dashboard
├── Supply-Demand Heatmaps
└── Route Projection System
```

---

# 📂 Project Structure

```bash
src/
├── app/
│   ├── demo/
│   ├── donor/
│   ├── hospital/
│   ├── map/
│   ├── request/
│   └── present/
│
├── components/
│   ├── emergency/
│   ├── hospital/
│   ├── map/
│   ├── donor/
│   ├── ui/
│   └── shared/
│
├── hooks/
├── store/
├── data/
├── lib/
│   ├── matching/
│   ├── eta/
│   ├── simulation/
│   ├── geospatial/
│   └── ai/
│
└── types/
```

---

# ⚙️ Technical Highlights

## Frontend Engineering

* React Server Components (RSC)
* App Router architecture
* Client-side simulation engine
* Dynamic state synchronization
* Optimistic UI updates
* Responsive design system

---

## Geospatial Intelligence

VeinX uses:

* Haversine distance calculations
* Dynamic proximity scoring
* Radius filtering
* Route simulation
* Spatial clustering logic

to identify optimal donor candidates.

---

## AI/ML Design Philosophy

Although the current version operates using simulation logic and weighted intelligence models, the architecture is intentionally designed for future ML integration:

Future upgrades may include:

* Reinforcement learning
* Demand forecasting
* Time-series shortage prediction
* ML donor response prediction
* LLM-assisted emergency triage
* AI voice dispatch systems

---

# 🚀 Getting Started

## Installation

```bash
git clone https://github.com/your-username/veinx.git

cd veinx

npm install
```

---

## Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

Demo mode:

```bash
http://localhost:3000/demo
```

Presentation mode:

```bash
http://localhost:3000/present
```

---

# 🔧 Environment Variables

```env
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_APP_NAME=VeinX
NEXT_PUBLIC_DEMO_MODE=true
```

---

# 📦 Production Build

```bash
npm run build
npm run start
```

---

# ☁️ Deployment

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

or import directly into Vercel dashboard.

---

# 🧰 Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* TailwindCSS v4

## State & Data

* Zustand
* TanStack Query

## Visualization

* Recharts
* SVG Rendering Engine
* Motion / Framer Motion

## Simulation

* Real-time Mock Engine
* Event Tick Synchronization
* Offline Queue Simulation

---

# 📊 Scalability Vision

VeinX is architected as a scalable healthcare coordination platform.

Potential expansion includes:

* National blood bank integration
* Ambulance coordination
* Government hospital APIs
* AI demand forecasting
* Emergency drone routing
* Multi-country deployment
* Healthcare IoT integration

---

# 🔒 Ethical & Social Impact

VeinX focuses on:

* Healthcare accessibility
* Maternal emergency support
* Faster emergency response
* Community-driven donation
* Ethical AI transparency
* Inclusive low-connectivity design

---

# 📸 Screenshots

| Landing        | Emergency Match | Hospital Dashboard |
| -------------- | --------------- | ------------------ |
| Add Screenshot | Add Screenshot  | Add Screenshot     |

---

# 🧪 Research & Innovation Potential

This project demonstrates applied research in:

* AI for Healthcare
* Emergency Response Systems
* Human-Centered AI
* Geospatial Computing
* Smart Routing Systems
* Digital Health Infrastructure

---

# 📄 License

MIT License

---

# 👨‍💻 Authors

### Team VeinX

Built with the vision of making emergency blood access intelligent, fast, and accessible for everyone.

---

<div align="center">

## ❤️ Built for Bangladesh. Designed for Global Healthcare Innovation.

</div>

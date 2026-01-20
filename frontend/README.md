# PropAnalyze - AI Real Estate Investment Platform

A modern, high-performance web application for real estate market analysis, built with React and Vite. This platform features a premium dark-themed UI, interactive maps, bulk underwriting capabilities, and advanced financial calculators.

---

## 🚀 Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS Modules (Scoped, Performance-First)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Maps**: Fully Integrated **Interactive Map Dashboard** (Real-time API sync)
- **State Management**: React Hooks (useState, useEffect)

---

## 🛠 Installation & Setup

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 2. Setup Steps
```bash
# Clone the repository (or navigate to directory)
cd project-P1

# Install Dependencies
npm install

# Start Development Server
npm run dev
```
The application will launch at `http://localhost:5173`.

### 3. Building for Production
```bash
npm run build
# The optimized build will be generated in the /dist folder
```

---

## 📂 Project Structure

A production-grade, atomic folder structure designed for scalability.

```text
project-P1/
├── src/
│   ├── components/
│   │   ├── common/             # Reusable global components
│   │   │   └── MapBackground.jsx  # Shared map visualization
│   │   ├── layout/             # Structure components
│   │   │   ├── Sidebar.jsx        # Main Navigation
│   │   │   ├── MainLayout.jsx     # App Wrapper
│   │   │   └── TopBar.jsx         # (Optional) Top Navigation
│   │   └── specific/           # Page-specific components
│   │       ├── AdvancedCalculator.jsx  # Financial logic
│   │       ├── BulkAnalysisTable.jsx   # Data Grid for bulk view
│   │       ├── BulkUploadWidget.jsx    # Drag-drop file import
│   │       ├── CalculationParameters.jsx # Strategic inputs
│   │       ├── HistoryStats.jsx        # Dashboard metrics
│   │       ├── HistoryTable.jsx        # Past analysis log
│   │       ├── MapControls.jsx         # Zoom/Layer tools
│   │       ├── MapHeader.jsx           # Overlay search bar
│   │       └── PropertyCard.jsx        # Interactive property unit
│   ├── pages/                  # Main Route Views
│   │   ├── BulkUnderwriting.jsx    # Bulk analysis flow
│   │   ├── Dashboard.jsx           # Main Map Home
│   │   ├── History.jsx             # User history
│   │   ├── Login.jsx               # Authentication entry
│   │   ├── MarketSearch.jsx        # Split Map/List view
│   │   ├── PropertyAnalysis.jsx    # Component-Rich Analysis Detail
│   │   ├── Reports.jsx             # PDF Generation Hub
│   │   └── Settings.jsx            # User Preferences
│   ├── styles/                 # Global Styling
│   │   ├── global.css          # App-wide defaults
│   │   ├── reset.css           # CSS Reset
│   │   └── variables.css       # Design Tokens (Colors, Fonts)
│   ├── App.jsx                 # Routing Configuration
│   └── main.jsx                # Entry Point
├── public/                     # Static Assets
├── package.json
└── vite.config.js
```

---

## 🎨 Design System & Customization

The application uses a centered `variables.css` file for all design tokens.

**Key Colors:**
- `--primary-green`: `#4ade80` (Actions, Highlights, Positive ROI)
- `--bg-dark`: `#0f1110` (Main Background)
- `--bg-card`: `#181a19` (Panels, Cards)

**Typography:**
- Font Family: `Inter`, system-ui, sans-serif

**To Customize:**
1. Open `src/styles/variables.css`.
2. Edit the Hex codes to match your new brand.
3. All components will automatically update.

---

## 🧩 Key Features Breakdown

### 1. Dashboard (Interactive Map)
- **File**: `Dashboard.jsx`
- Features responsive map background with interactive pins.
- **Components**: `MapHeader` (Search), `MapControls` (Zoom).

### 2. Bulk Underwriting
- **File**: `BulkUnderwriting.jsx`
- Allows uploading datasets and applying global strategy parameters.
- **Logic**: Shows green/red text for Positive/Negative ROI based on thresholds.

### 3. Market Search (List + Map)
- **File**: `MarketSearch.jsx`
- Split-screen layout: Map on Left, Scrollable List on Right.
- **Cards**: Show badges for "Fixer Upper", "Cap Rate".

### 4. Property Analysis (The Core)
- **File**: `PropertyAnalysis.jsx`
- **Layout**: Verified "Pro" Vertical Split (Image 19 reference).
- **Features**:
  - **Tabs**: Cash, Conventional, Seller Finance.
  - **Calculator**: Real-time updates for Cash-on-Cash and Cap Rate.
  - **Max Offer**: Auto-calculates max offer based on target return.

---

## 📦 Deliverables Checklist (Phase 1-6)
- [x] Core Architecture & Sidebar
- [x] Dashboard Map View
- [x] Bulk Underwriting Engine
- [x] Market Search with Filters
- [x] Detailed "Pro" Property Analysis
- [x] History, Settings, Reports
- [x] Full Navigation Wiring

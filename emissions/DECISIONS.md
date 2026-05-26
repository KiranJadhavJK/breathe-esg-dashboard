# Architectural Decisions

## 1. Django Backend Selection

Django was selected because it provides:
- Rapid backend development
- Built-in admin panel
- ORM support
- REST API compatibility

Django REST Framework was used for API development.

---

# 2. React Frontend Selection

React was selected for:
- Component-based architecture
- Fast UI rendering
- Easy API integration
- Dashboard scalability

Axios was used for backend communication.

---

# 3. SQLite Database

SQLite was used because:
- Lightweight setup
- Fast local development
- No external database installation required

This decision accelerated prototype delivery.

---

# 4. CSV-Based Data Ingestion

CSV upload was implemented because:
- ESG datasets are commonly shared in CSV format
- Simple ingestion pipeline
- Easy testing and analyst workflows

---

# 5. Analyst Review Workflow

Records support:
- Pending status
- Approval workflow
- Flagging workflow

This simulates enterprise ESG validation pipelines.

---

# 6. Simplified Emission Calculation

The prototype currently uses simplified CO₂ values.

Reason:
- Focus on workflow demonstration
- Faster MVP delivery
- Easier frontend integration

Future versions can integrate:
- Real emission factors
- ESG standards databases
- AI-based anomaly detection

---

# 7. UI Design Decisions

A premium dark dashboard UI was selected to:
- Improve visual hierarchy
- Simulate enterprise ESG tools
- Enhance usability

Card-based analytics and status indicators improve analyst efficiency.

---

# 8. API-First Architecture

The backend was designed API-first:
- Frontend separated from backend
- Easy scalability
- Future mobile/web integrations possible

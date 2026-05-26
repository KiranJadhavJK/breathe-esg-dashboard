# ESG Intelligence Dashboard - Data Model

## Overview

This project is designed to ingest, normalize, review, and manage ESG emission records using a Django + React architecture.

The platform supports:
- CSV ingestion
- Analyst review workflow
- Approval / Flagging
- ESG emission tracking

---

# Core Models

## 1. Organization

Stores company or business information.

### Fields

| Field | Type |
|---|---|
| id | Integer |
| name | String |
| created_at | DateTime |

---

## 2. RawRecord

Represents uploaded source records.

### Fields

| Field | Type |
|---|---|
| id | Integer |
| source_name | String |
| uploaded_at | DateTime |

---

## 3. EmissionRecord

Stores normalized ESG emission data.

### Fields

| Field | Type |
|---|---|
| id | Integer |
| organization | ForeignKey |
| raw_record | ForeignKey |
| scope | String |
| category | String |
| raw_value | Float |
| normalized_value | Float |
| normalized_unit | String |
| activity_date | Date |
| status | String |
| created_at | DateTime |

---

# Workflow

1. User uploads CSV
2. Django backend processes records
3. Records stored in database
4. React dashboard displays records
5. Analyst can:
   - Approve records
   - Flag records

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite

## Frontend
- React
- Axios

---

# ESG Features

- Scope tracking
- Carbon activity normalization
- Analyst review workflow
- Emission status monitoring

---

# Status Values

| Status | Meaning |
|---|---|
| PENDING | Awaiting analyst review |
| APPROVED | Approved by analyst |
| FLAGGED | Requires investigation |

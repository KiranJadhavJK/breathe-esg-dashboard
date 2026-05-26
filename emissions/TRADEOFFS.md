# Tradeoffs & Limitations

## 1. SQLite vs Production Database

SQLite was used for faster local development.

### Tradeoff
- Easier setup
- Faster development

### Limitation
- Not ideal for enterprise-scale concurrent workloads

Future production systems should use:
- PostgreSQL
- MySQL

---

# 2. Simplified Emission Logic

The current system uses simplified emission values.

### Tradeoff
- Faster prototype development
- Easier debugging

### Limitation
- Does not calculate real-world emission factors

Future improvements:
- EPA datasets
- Automated carbon conversion engines
- ESG factor libraries

---

# 3. Minimal Authentication

Authentication was not implemented.

### Tradeoff
- Faster feature delivery
- Easier testing

### Limitation
- No user-level security or role management

Future improvements:
- JWT Authentication
- Role-based access
- Analyst permissions

---

# 4. CSV Upload Constraints

CSV ingestion assumes structured input.

### Tradeoff
- Simple ingestion workflow
- Faster parsing

### Limitation
- Invalid formats may fail
- No advanced validation pipeline

Future improvements:
- File validation
- AI-assisted mapping
- Data quality scoring

---

# 5. Manual Analyst Review

Approval and flagging are manual actions.

### Tradeoff
- Clear workflow visibility
- Easier prototype implementation

### Limitation
- No automated anomaly detection

Future improvements:
- ML-based ESG anomaly detection
- Risk scoring
- Intelligent recommendations

---

# 6. Frontend Styling

Inline React styling was used.

### Tradeoff
- Faster UI implementation
- Easy customization

### Limitation
- Less scalable for very large applications

Future improvements:
- Tailwind CSS
- Design systems
- Component libraries

---

# 7. Deployment Status

The application currently runs locally.

### Tradeoff
- Faster iteration
- Easier debugging

### Limitation
- Not publicly accessible

Future improvements:
- Vercel deployment
- Render/Railway backend hosting
- CI/CD pipeline

# BPOT — Price Optimization Tool

**BPOT** is a full-stack price optimization application. It lets users manage products, view demand forecasts, and see optimized prices. Access and actions depend on your **role** (admin, buyer, or supplier).

## Overview

- **Frontend** (React + Vite): Landing, login/register, product management, and pricing/demand views.
- **Backend** (Flask): REST API for auth (JWT, email verification) and product CRUD with role-based access.

| Role     | Products | Demand / Optimized prices |
|----------|----------|----------------------------|
| **Admin**   | Full CRUD (create, read, update, delete) | View |
| **Buyer**   | Read only                               | View |
| **Supplier** | Read only                             | View |

## Features

- **Auth**: Register, login, email verification; JWT for protected routes.
- **Product management**: List, filter, search; admins can add, edit, delete products.
- **Demand forecasts**: View demand forecast data per product.
- **Optimized prices**: View recommended prices from the optimization engine.
- **Role-based access**: Enforced via `has_role` decorator on backend routes.

## Project structure

```
BPOT/
├── README.md           # This file
├── frontend/           # React + Vite app
│   ├── src/
│   │   ├── api/        # authService, productService
│   │   ├── components/ # AddProductModal, DataTable, Login, Register, layout, charts…
│   │   ├── pages/      # Landing, ProductManagement, PricingOptimization
│   │   ├── hooks/      # useAuth
│   │   ├── theme/
│   │   └── App.jsx, main.jsx
│   └── package.json
└── backend/            # Flask API
    ├── app.py          # App factory, CORS, route registration
    ├── config.py       # Config from env (DB, JWT, mail)
    ├── extensions.py   # db, migrate, jwt
    ├── models/         # User, Product
    ├── routes/         # auth_routes, product_routes
    ├── utils/          # email, token, decorators (has_role)
    ├── migrations/     # Flask-Migrate
    └── seed_table.py
```

---

## Backend

### Tech stack

- **Flask** — web framework  
- **Flask-SQLAlchemy** + **Flask-Migrate** — ORM and migrations  
- **Flask-JWT-Extended** — JWT auth  
- **Flask-CORS** — CORS for `http://localhost:5173`  
- **Werkzeug** — password hashing (bundled with Flask)  
- Python 3.x

### Backend `requirements.txt`

Dependencies are listed in `backend/requirements.txt`:

| Package | Purpose |
|---------|---------|
| Flask | Web framework |
| Flask-SQLAlchemy | ORM and DB integration |
| Flask-Migrate | DB migrations (Alembic) |
| Flask-JWT-Extended | JWT auth for protected routes |
| Flask-CORS | CORS for frontend (`http://localhost:5173`) |
| requests | HTTP client (e.g. `seed_table.py`) |

Install with:

```bash
cd backend
pip install -r requirements.txt
```

### Environment variables

Create a `.env` (or set in the shell) in the backend root:

| Variable | Description |
|----------|-------------|
| `SQLALCHEMY_DATABASE_URI` | Database URL (e.g. `postgresql://user:pass@localhost/dbname` or SQLite for dev) |
| `JWT_SECRET_KEY` | Secret for signing JWTs |
| `MAIL_SERVER` | SMTP server for verification emails |
| `MAIL_PORT` | SMTP port (e.g. 587) |
| `MAIL_USERNAME` | SMTP username |
| `MAIL_PASSWORD` | SMTP password |

### Run backend

```bash
cd backend
pip install -r requirements.txt

# Apply migrations (if using Flask-Migrate)
flask db upgrade

# Run the app
python app.py
```

API runs at **http://127.0.0.1:5000**. All API routes are under **`/api`**.

### API summary

- **Auth** (`/api`): `POST /register`, `POST /login`, `GET /verify/<token>`  
- **Products** (`/api`): `POST /create`, `PATCH /update/<id>`, `GET /products`, `GET /products/<id>`, `DELETE /products/<id>`, `GET /products/<category>`, `GET /products/categories`, `GET /products/filter?category=...&search=...`  
- Product and most auth-protected routes require `Authorization: Bearer <access_token>` and the correct role. See `backend/routes/auth_routes.py` and `backend/routes/product_routes.py` for exact methods and roles.

---

## Frontend

### Tech stack

- **React 19** + **Vite 7**
- **MUI (Material UI) 7** + **MUI X Data Grid**
- **React Router 7**
- **Axios** — API calls
- **jwt-decode** — token parsing
- **Recharts** — charts

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Landing | Public; login / register |
| `/products` | Product Management | Products table, filters; admin CRUD |
| `/pricing` | Pricing Optimization | Demand forecasts & optimized prices |

Protected routes require a valid JWT; otherwise redirect to `/`.

### Run frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173** (or the port Vite shows). It expects the backend at **http://127.0.0.1:5000** (see `frontend/src/api/authService.js` and `frontend/src/api/productService.js`).

### Scripts

- `npm run dev` — development server  
- `npm run build` — production build  
- `npm run preview` — preview production build  
- `npm run lint` — ESLint  

---

## Quick start (full stack)

1. **Backend**
   - Set env vars (see [Environment variables](#environment-variables)).
   - From repo root: `cd backend && pip install -r requirements.txt`.
   - Run migrations if applicable: `flask db upgrade`.
   - Start API: `python app.py` (listens on port 5000).

2. **Frontend**
   - From repo root: `cd frontend && npm install && npm run dev`.
   - Open http://localhost:5173 and use Register/Login.

3. **Usage**
   - Register with a role (`admin`, `buyer`, or `supplier`). Verify email via the link if the backend sends it.
   - Log in to get a JWT; then use **Products** (and for admins, CRUD) and **Pricing** for demand and optimized prices.

---

## API reference (details)

- **Auth**: `backend/routes/auth_routes.py` — register (body: `first_name`, `last_name`, `email`, `password`, `role`), login (body: `email`, `password`), verify (GET `/verify/<token>`).  
- **Products**: `backend/routes/product_routes.py` — create (admin), update (admin), list/get/delete (delete admin-only), filter by category, list categories, filter by query params. Product fields include `name`, `description`, `cost_price`, `selling_price`, `category`, `stock_available`, `units_sold`, `customer_rating`, `demand_forecast`, `optimized_price`.

All product endpoints and most auth flows use the `/api` prefix and (where applicable) `Authorization: Bearer <access_token>` and role checks.

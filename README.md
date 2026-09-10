# FreshBite API

Express REST API for the FreshBite customer and admin experiences.

## Commands

- `npm install`
- `npm run seed` — verifies the local seed catalog and demo identities
- `npm test` — runs pricing/order snapshot smoke tests
- `npm start` — starts the API on `PORT` (4100 by default)
- `npm run dev` — starts with Node watch mode

The API uses a realistic in-memory adapter when `MONGODB_URI` is blank or MongoDB is unavailable. Configure MongoDB before expecting persistence between restarts.

## Route groups

- Public: `/api/categories`, `/api/dishes`, `/api/settings`
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- Customer: `/api/cart`, `/api/orders`, `/api/addresses`, `/api/favorites`, `/api/reviews`
- Admin: `/api/admin/stats`, `/api/admin/orders`, `/api/admin/dishes`, `/api/admin/customers`, `/api/admin/coupons`, `/api/admin/settings`

Admin access is checked on the server using the role in the signed HTTP-only JWT cookie. Order totals are recomputed from the server catalog, and order items store price/name/image snapshots.

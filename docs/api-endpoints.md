# API Endpoints

## HTML API

### Root

- `GET /` - loads SplashCarouselApp

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

### Explore

- `GET /explore` - loads BrowserApp
- `GET /explore/:id` - loads CompanyDetailApp

### Launch

- `GET /launch` - loads FormApp

### About

- `GET /about/`

## JSON API

### Companies

- `GET /api/companies`
  - accepts text param for search
- `POST /api/companies`
- `POST /api/companies/:id/investments`
- `GET /api/companies/:id`

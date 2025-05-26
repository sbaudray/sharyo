# Sharyo

A modern courier fleet management application

## Features

- [ ] Admin
  - [ ] As a Sharyo team member, I can see all organisations
- [ ] Organisations
  - [ ] As an organisation manager, I can create an organisation
  - [ ] As an organisation driver, I can join an organisation
- [ ] Authentication
  - [ ] As an organisation manager, I can sign up to Sharyo
  - [ ] As an organisation manager, I can log in to Sharyo
  - [ ] As an organisation driver, I can log in to Sharyo
- [ ] Drivers (scope: an organisation)
  - [ ] As an organisation manager, I can see all drivers
  - [ ] As an organisation manager, I can invite a driver
  - [ ] As an organisation manager, I can kick a driver
- [ ] Orders (scope: an organisation)
  - [ ] As an organisation manager, I can see all orders
  - [ ] As an organisation manager, I can create an order
  - [ ] As an organisation manager, I can assign an order to a driver
  - [ ] As an organisation manager, I can unassign an order
  - [ ] As an organisation manager, I can change an order status
  - [ ] As an organisation driver, I can see all orders assigned to me
  - [ ] As an organisation driver, I can change the order status to delivered
  - [ ] As an organisation driver, I can report an error for the order
  - [ ] As an organisation driver, I can open waze from Sharyo to see the itinerary for the order

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Start the database with docker:

```bash
docker compose up
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

# Enable Corepack and Setup Environment
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /usr/src/app

WORKDIR /usr/src/app

# Install Production with PNPM
FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build Production with PNPM
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build

# Copy files to "Deployment"
FROM base

WORKDIR /app

COPY --from=prod-deps /usr/src/app/package.json /package.json
COPY --from=prod-deps /usr/src/app/node_modules /node_modules

COPY --from=build /usr/src/app/dist /app/dist

CMD ["node", "dist/apps/gateways/api/main"]

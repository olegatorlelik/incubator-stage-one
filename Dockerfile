# Build Stage
FROM node:18.13.0 AS BUILD_IMAGE_INCUBATOR_STAGE_ONE
WORKDIR ./
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build


# Production Stage
FROM node:18.13.0 AS PRODUCTION_BUILD_IMAGE_INCUBATOR_STAGE_ONE
WORKDIR ./
COPY --from=BUILD_IMAGE_INCUBATOR_STAGE_ONE ./package*.json ./
COPY --from=BUILD_IMAGE_INCUBATOR_STAGE_ONE ./dist ./dist
COPY --from=BUILD_IMAGE_INCUBATOR_STAGE_ONE ./node_modules ./node_modules
EXPOSE 3005
CMD ["yarn", "start"]

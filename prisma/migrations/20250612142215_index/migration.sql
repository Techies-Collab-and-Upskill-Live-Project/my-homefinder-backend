CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX "idx_property_city_trgm" ON "Property" USING gin (city gin_trgm_ops);
CREATE INDEX "idx_property_area_trgm" ON "Property" USING gin (area gin_trgm_ops);

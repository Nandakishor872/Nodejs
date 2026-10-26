-- table for business.sql 
CREATE TABLE IF NOT EXISTS business (
  "id" TEXT NOT NULL PRIMARY KEY,
  "owner_profile_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT,
  "description" TEXT,
  "banner_url" TEXT,
  "location_text" TEXT,
  "zip" TEXT,
  "lat" NUMERIC(9, 6),
  "lng" NUMERIC(9, 6),
  "website" TEXT,
  "phone" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending'::text,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deleted_at" TIMESTAMPTZ,
  "created_by" TEXT,
  "updated_by" TEXT,
  CONSTRAINT fk_business_owner FOREIGN KEY ("owner_profile_id") REFERENCES profiles("id") ON DELETE RESTRICT,
  CONSTRAINT chk_business_status CHECK (status IN ('pending', 'active', 'inactive', 'suspended', 'rejected')),
  CONSTRAINT chk_business_name_not_empty CHECK (trim(name) <> ''),
  CONSTRAINT chk_business_lat CHECK (lat IS NULL OR (lat >= -90.0 AND lat <= 90.0)),
  CONSTRAINT chk_business_lng CHECK (lng IS NULL OR (lng >= -180.0 AND lng <= 180.0)),
  CONSTRAINT chk_business_timestamps CHECK (updated_at >= created_at)
);

CREATE INDEX IF NOT EXISTS idx_business_owner_profile_id ON business("owner_profile_id");
CREATE INDEX IF NOT EXISTS idx_business_status ON business("status");



-- tables/business_hour.sql
CREATE TABLE IF NOT EXISTS business_hour (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "day_of_week" INTEGER NOT NULL,
  "open_time" TEXT,
  "close_time" TEXT,
  "is_closed" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_business_hour_business FOREIGN KEY ("business_id") REFERENCES business("id") ON DELETE CASCADE,
  CONSTRAINT uq_business_hour_business_day UNIQUE ("business_id", "day_of_week"),
  CONSTRAINT chk_business_hour_day_of_week CHECK (day_of_week >= 0 AND day_of_week <= 6),
  CONSTRAINT chk_business_hour_open_time_format CHECK (open_time IS NULL OR open_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'),
  CONSTRAINT chk_business_hour_close_time_format CHECK (close_time IS NULL OR close_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'),
  CONSTRAINT chk_business_hour_status_and_times CHECK (
    (is_closed = true) OR 
    (open_time IS NOT NULL AND close_time IS NOT NULL)
  ),
  CONSTRAINT chk_business_hour_timestamps CHECK (updated_at >= created_at)
);

CREATE INDEX IF NOT EXISTS idx_business_hour_business_id ON business_hour("business_id");

-- tables/service.sql
CREATE TABLE IF NOT EXISTS service (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "duration_minutes" INTEGER NOT NULL DEFAULT 60,
  "price_cents" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL,
  "deleted_at" TIMESTAMPTZ
);




-- tables/portfolio_item.sql
CREATE TABLE IF NOT EXISTS portfolio_item (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "caption" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL
);

-- tables/users.sql
CREATE TABLE IF NOT EXISTS users (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'Client'::text,
  "status" TEXT NOT NULL DEFAULT 'Active'::text,
  "location" TEXT,
  "bookings" INTEGER NOT NULL DEFAULT 0,
  "revenue_cents" INTEGER NOT NULL DEFAULT 0,
  "joined_at" TIMESTAMPTZ NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL,
  "deleted_at" TIMESTAMPTZ
);



-- tables/otp_verifications.sql
CREATE TABLE IF NOT EXISTS otp_verifications (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "destination" VARCHAR(255) NOT NULL,
  "purpose" VARCHAR(100) NOT NULL,
  "otp_hash" VARCHAR(255) NOT NULL,
  "expires_at" TIMESTAMPTZ NOT NULL,
  "is_verified" BOOLEAN NOT NULL DEFAULT false,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- tables/mfa_users.sql
CREATE TABLE IF NOT EXISTS mfa_users (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "user_id" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(20),
  "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
  "totp_secret" TEXT,
  "is_totp_verified" BOOLEAN NOT NULL DEFAULT false,
  "backup_codes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "preferred_method" VARCHAR(20) NOT NULL DEFAULT 'sms',
  "is_mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tables/mfa_policy.sql
CREATE TABLE IF NOT EXISTS mfa_policy (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "role" VARCHAR(50) NOT NULL,
  "is_required" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- tables/profile_extension.sql

CREATE TABLE IF NOT EXISTS profile_extension (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "data" JSONB NOT NULL DEFAULT '{}'::jsonb,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- tables/booking.sql
CREATE TABLE IF NOT EXISTS booking (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "service_id" TEXT,
  "client_profile_id" TEXT,
  "client_name" TEXT NOT NULL,
  "client_email" TEXT,
  "client_phone" TEXT,
  "start_time" TIMESTAMPTZ NOT NULL,
  "end_time" TIMESTAMPTZ NOT NULL,
  "price_cents" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'pending'::text,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL,
  "deleted_at" TIMESTAMPTZ
);

-- tables/product.sql 

CREATE TABLE IF NOT EXISTS product (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "price_cents" INTEGER NOT NULL DEFAULT 0,
  "inventory_count" INTEGER NOT NULL DEFAULT 0,
  "sku" TEXT,
  "image_url" TEXT,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL,
  "deleted_at" TIMESTAMPTZ
);


-- tables/customer_order.sql
CREATE TABLE IF NOT EXISTS customer_order (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "customer_profile_id" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending'::text,
  "total_cents" INTEGER NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'usd'::text,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL
);

-- tables/order_item.sql

CREATE TABLE IF NOT EXISTS order_item (
  "id" TEXT NOT NULL PRIMARY KEY,
  "order_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "unit_price_cents" INTEGER NOT NULL DEFAULT 0,
  "total_price_cents" INTEGER NOT NULL DEFAULT 0
);


-- tables/cart_item.sql 

CREATE TABLE IF NOT EXISTS cart_item (
  "id" TEXT NOT NULL PRIMARY KEY,
  "profile_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL
);

-- tables/review.sql

CREATE TABLE IF NOT EXISTS review (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "reviewer_profile_id" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL
);

-- tables/chat_conversations.sql

CREATE TABLE IF NOT EXISTS chat_conversations (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "participant_ids" TEXT[] NOT NULL,
  "last_message" TEXT,
  "last_message_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- tables/chat_messages.sql
CREATE TABLE IF NOT EXISTS chats (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "conversation_id" VARCHAR(255) NOT NULL,
  "sender_id" VARCHAR(255) NOT NULL,
  "message" TEXT NOT NULL,
  "read_by" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- tables/notification.sql

CREATE TABLE IF NOT EXISTS notification (
  "id" TEXT NOT NULL PRIMARY KEY,
  "recipient_id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "is_read" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL
);


-- tables/job.sql & tables/job_application.sql

CREATE TABLE IF NOT EXISTS job (
  "id" TEXT NOT NULL PRIMARY KEY,
  "business_id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "salary_min" INTEGER,
  "salary_max" INTEGER,
  "type" TEXT NOT NULL DEFAULT 'full_time'::text,
  "status" TEXT NOT NULL DEFAULT 'open'::text,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS job_application (
  "id" TEXT NOT NULL PRIMARY KEY,
  "job_id" TEXT NOT NULL,
  "applicant_id" TEXT NOT NULL,
  "resume_url" TEXT,
  "cover_letter" TEXT,
  "status" TEXT NOT NULL DEFAULT 'submitted'::text,
  "created_at" TIMESTAMPTZ NOT NULL
);


-- Settings Tables (6 Tables)

-- tables/settings_address.sql
CREATE TABLE IF NOT EXISTS settings_address (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "street" TEXT, "city" TEXT, "state" TEXT, "zip" TEXT, "country" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tables/settings_appearance.sql
CREATE TABLE IF NOT EXISTS settings_appearance (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "theme" VARCHAR(50) NOT NULL DEFAULT 'system',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tables/settings_billing.sql
CREATE TABLE IF NOT EXISTS settings_billing (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "stripe_customer_id" VARCHAR(255), "currency" VARCHAR(10) DEFAULT 'usd',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tables/settings_notification.sql
CREATE TABLE IF NOT EXISTS settings_notification (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "email_alerts" BOOLEAN DEFAULT true, "sms_alerts" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tables/settings_privacy.sql
CREATE TABLE IF NOT EXISTS settings_privacy (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "is_profile_public" BOOLEAN DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tables/settings_security.sql
CREATE TABLE IF NOT EXISTS settings_security (
  "id" VARCHAR(255) NOT NULL PRIMARY KEY,
  "profile_id" VARCHAR(255) NOT NULL,
  "last_password_change" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);





















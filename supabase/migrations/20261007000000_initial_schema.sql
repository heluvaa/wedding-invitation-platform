-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'pro')),
  tier_expires_at TIMESTAMPTZ,
  subdomain TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended'))
);

-- Invitations table
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  event_location TEXT NOT NULL,
  event_address TEXT,
  event_lat DECIMAL(10, 8),
  event_lng DECIMAL(11, 8),
  cover_image_url TEXT,
  music_url TEXT,
  story_text TEXT,
  custom_message TEXT,
  bank_accounts JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests table
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  token TEXT UNIQUE NOT NULL,
  rsvp_status TEXT CHECK (rsvp_status IN ('pending', 'attending', 'not_attending')),
  rsvp_guest_count INTEGER DEFAULT 1,
  rsvp_submitted_at TIMESTAMPTZ,
  link_opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX idx_guests_token ON guests(token);

-- Guestbook messages table
CREATE TABLE guestbook_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_guestbook_invitation_id ON guestbook_messages(invitation_id);

-- Media table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_invitation_id ON media(invitation_id);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  midtrans_order_id TEXT UNIQUE NOT NULL,
  midtrans_transaction_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'expired')),
  payment_type TEXT,
  tier_purchased TEXT NOT NULL CHECK (tier_purchased IN ('premium', 'pro')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_midtrans_order_id ON transactions(midtrans_order_id);

-- Templates table
CREATE TABLE templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  tier_required TEXT NOT NULL DEFAULT 'free' CHECK (tier_required IN ('free', 'premium', 'pro')),
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY users_select_own ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY users_update_own ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for invitations
CREATE POLICY invitations_select_own ON invitations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY invitations_insert_own ON invitations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY invitations_update_own ON invitations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY invitations_delete_own ON invitations FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY invitations_select_published ON invitations FOR SELECT USING (published = TRUE);

-- RLS Policies for guests
CREATE POLICY guests_select_own ON guests FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = guests.invitation_id AND invitations.user_id = auth.uid())
);
CREATE POLICY guests_insert_own ON guests FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = guests.invitation_id AND invitations.user_id = auth.uid())
);
CREATE POLICY guests_update_own ON guests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = guests.invitation_id AND invitations.user_id = auth.uid())
);
CREATE POLICY guests_delete_own ON guests FOR DELETE USING (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = guests.invitation_id AND invitations.user_id = auth.uid())
);

-- RLS Policies for guestbook
CREATE POLICY guestbook_select_published ON guestbook_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = guestbook_messages.invitation_id AND invitations.published = TRUE)
);
CREATE POLICY guestbook_insert_published ON guestbook_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = guestbook_messages.invitation_id AND invitations.published = TRUE)
);

-- RLS Policies for media
CREATE POLICY media_select_own ON media FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = media.invitation_id AND invitations.user_id = auth.uid())
);
CREATE POLICY media_insert_own ON media FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = media.invitation_id AND invitations.user_id = auth.uid())
);
CREATE POLICY media_delete_own ON media FOR DELETE USING (
  EXISTS (SELECT 1 FROM invitations WHERE invitations.id = media.invitation_id AND invitations.user_id = auth.uid())
);

-- RLS Policies for transactions
CREATE POLICY transactions_select_own ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY transactions_insert_own ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Templates are publicly readable
CREATE POLICY templates_select_all ON templates FOR SELECT USING (active = TRUE);

-- Mode tanpa login: undangan dibuat anonim, dikelola lewat edit token rahasia.

ALTER TABLE invitations ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS maps_url TEXT;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS gallery_images TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- Hash edit token dipisah dari invitations supaya tidak ikut terbaca via REST anon.
CREATE TABLE IF NOT EXISTS invitation_secrets (
  invitation_id UUID PRIMARY KEY REFERENCES invitations(id) ON DELETE CASCADE,
  edit_token_hash TEXT NOT NULL UNIQUE
);
ALTER TABLE invitation_secrets ENABLE ROW LEVEL SECURITY;

-- Rate limit per key (hash IP + bucket). Hanya diakses service role.
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  window_start TIMESTAMPTZ NOT NULL
);
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION rate_limit_hit(p_key TEXT, p_max INT, p_window_secs INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  allowed BOOLEAN;
BEGIN
  INSERT INTO rate_limits AS r (key, count, window_start)
  VALUES (p_key, 1, now())
  ON CONFLICT (key) DO UPDATE SET
    count = CASE WHEN r.window_start < now() - make_interval(secs => p_window_secs) THEN 1 ELSE r.count + 1 END,
    window_start = CASE WHEN r.window_start < now() - make_interval(secs => p_window_secs) THEN now() ELSE r.window_start END
  RETURNING count <= p_max INTO allowed;
  RETURN allowed;
END;
$$;

REVOKE ALL ON FUNCTION rate_limit_hit(TEXT, INT, INT) FROM PUBLIC, anon, authenticated;

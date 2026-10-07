-- Create function to increment invitation view count
CREATE OR REPLACE FUNCTION increment_invitation_views(invitation_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE invitations
  SET view_count = view_count + 1
  WHERE id = invitation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

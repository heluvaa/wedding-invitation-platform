import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Verify ownership
    const { data: invitation } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single()
    
    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }
    
    // Validate completeness
    if (!invitation.bride_name || !invitation.groom_name || !invitation.event_date || !invitation.event_location) {
      return NextResponse.json({ error: 'Invitation incomplete' }, { status: 400 })
    }
    
    // Publish
    const { error } = await supabase
      .from('invitations')
      .update({ published: true, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.redirect(new URL(`/dashboard/invitations/${id}/publish`, request.url))
  } catch (error) {
    console.error('Publish error:', error)
    return NextResponse.json({ error: 'Failed to publish' }, { status: 500 })
  }
}

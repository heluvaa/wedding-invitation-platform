# Wedding Invitation Platform - Deployment Summary

## Production Deployment

**Status:** ✓ LIVE  
**Deployed:** 2026-10-07 12:03 WIB  
**Platform:** Vercel  

### URLs

- **Production:** https://wedding-invitation-platform-gules.vercel.app
- **Login:** https://wedding-invitation-platform-gules.vercel.app/login
- **Register:** https://wedding-invitation-platform-gules.vercel.app/register
- **Dashboard:** https://wedding-invitation-platform-gules.vercel.app/dashboard

### Infrastructure

- **Hosting:** Vercel (Washington DC - iad1)
- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (untuk media undangan)
- **Email:** Resend (untuk notifikasi)
- **Payment:** Midtrans Snap (untuk upgrade premium)

### Test Credentials

```
Email: test@weddingplatform.com
Password: TestPassword123!
```

### Environment Variables (Production)

Semua environment variables sudah ter-set di Vercel:

- ✓ `NEXT_PUBLIC_SUPABASE_URL`
- ✓ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✓ `SUPABASE_SERVICE_ROLE_KEY`
- ✓ `RESEND_API_KEY`
- ✓ `NEXT_PUBLIC_APP_URL`
- ✓ `NEXT_PUBLIC_MIDTRANS_SNAP_URL`

### Build Info

- Next.js: 16.4.0
- Node.js: 26.4.0
- Build Time: ~30s
- Build Machine: 2 cores, 8GB RAM

### Deployment Command

```bash
cd ~/wedding-invitation-platform
vercel --prod
```

### Features Live

1. **Authentication**
   - Login/Register via Supabase Auth
   - Session management
   - Protected dashboard routes

2. **Dashboard**
   - Create new invitation
   - Manage invitations
   - Edit invitation content
   - Upload media (photos/videos)
   - Publish invitation

3. **Public Invitation Pages**
   - Dynamic slug-based URLs (`/[slug]`)
   - Responsive design
   - Media gallery

4. **API Endpoints**
   - `/api/invitations/[id]/publish` - Publish invitation

### Next Steps

1. Test lengkap user flow (register → create invitation → publish)
2. Setup monitoring (Vercel Analytics)
3. Custom domain (opsional)
4. Email notification testing
5. Payment gateway testing (Midtrans sandbox)

### Rollback

Jika perlu rollback ke deployment sebelumnya:

```bash
vercel rollback
```

### Logs & Monitoring

- **Vercel Dashboard:** https://vercel.com/heluvaa/wedding-invitation-platform
- **Inspector:** https://vercel.com/heluvaa/wedding-invitation-platform/CPaqN15mEtWtCcAbBJGgxnJ9r99Y
- **Supabase Dashboard:** https://supabase.com/dashboard/project/xnriwdtjwwgddwramkpc

---

**Deployment ID:** dpl_CPaqN15mEtWtCcAbBJGgxnJ9r99Y  
**Git Commit:** [local deployment]

import { dbAll, dbGet, initDb } from '@/lib/db2';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return { title: `${username} | Schedulo` };
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  await initDb();
  
  // Fetch user details
  const user = await dbGet<{ id: number; name: string; avatar: string | null }>(
    'SELECT id, name, avatar FROM users WHERE username = ?',
    [username]
  );

  if (!user) {
    notFound();
  }

  // Fetch their active event types
  const events = await dbAll<{ title: string; slug: string; duration: number; description: string; color: string }>(
    'SELECT title, slug, duration, description, color FROM event_types WHERE user_id = ? AND is_active = 1',
    [user.id]
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80 }}>
      
      <div style={{ width: '100%', maxWidth: 640, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Profile Header */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#6366f1', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 500
          }}>
            {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : user.name[0].toUpperCase()}
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: 'white' }}>{user.name}</h1>
        </div>

        {/* Event List */}
        {events.length === 0 ? (
          <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>This user doesn't have any active event types.</p>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {events.map((ev, i) => (
              <Link key={ev.slug} href={`/book/${ev.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ padding: '20px 24px', borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', transition: 'background 0.15s' }} className="event-row">
                  <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>{ev.title}</h2>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#e5e7eb', fontSize: 11, fontWeight: 600, background: 'var(--bg)', padding: '4px 8px', borderRadius: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {ev.duration}m
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .event-row:hover {
          background: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </div>
  );
}

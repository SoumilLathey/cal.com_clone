import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      minHeight: '100vh', background: '#f9fafb',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', textAlign: 'center', padding: 24,
    }}>
      <div style={{ fontSize: 72, fontWeight: 900, color: '#e5e7eb', lineHeight: 1 }}>404</div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 8, marginBottom: 8, color: '#111827' }}>
        Page not found
      </h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24, maxWidth: 320 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          padding: '8px 20px', background: '#111827', color: 'white',
          borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600,
        }}>
          Go home
        </Link>
        <Link href="/dashboard" style={{
          padding: '8px 20px', background: 'white', color: '#374151',
          border: '1px solid #d1d5db',
          borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600,
        }}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}

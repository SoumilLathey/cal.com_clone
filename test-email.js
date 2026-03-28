const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8');
const keyMatch = env.match(/RESEND_API_KEY=(.+)/);
if (!keyMatch) { console.log('No RESEND_API_KEY found'); process.exit(0); }
const key = keyMatch[1].trim();
fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    from: 'Schedulo <onboarding@resend.dev>',
    to: ['test@example.com'],
    subject: 'Test email',
    html: '<p>Test</p>'
  })
}).then(r => r.text()).then(r => console.log('RESEND RESPONSE:', r));

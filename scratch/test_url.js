const https = require('https');
const url = 'https://res.cloudinary.com/dsn0ks2hl/video/upload/sp_auto/upscaled-video_2_mquuhp.m3u8';

console.log('Sending request to', url);
const req = https.request(url, { method: 'HEAD' }, (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', JSON.stringify(res.headers, null, 2));
  process.exit(0);
});

req.on('error', (e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});

req.end();

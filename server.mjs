import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { join, extname } from 'node:path';

const PORT = 3005; // Using 3005 to avoid common port conflicts

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = createServer((req, res) => {
  // Prevent directory traversal attacks and serve only local files
  let safeUrl = req.url === '/' ? '/index.html' : req.url;
  safeUrl = safeUrl.split('?')[0]; // strip query parameters
  
  const filePath = join(process.cwd(), safeUrl);
  const ext = extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found\n');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});

# Redirect-To Cloudflare Worker

A simple Cloudflare Worker that redirects to URLs passed in the request path.

## Usage

Once deployed, you can use it like this:

```
https://your-worker.dev/https://example.com/path?query=value#hash
```

The worker will redirect (302) to exactly:

```
https://example.com/path?query=value#hash
```

## Features

- Simple and lightweight
- Preserves query parameters and hash fragments
- Validates URL format
- Handles edge cases:
  - Missing URL (shows usage instructions)
  - Invalid URL format (returns error)
  - Non-HTTP/HTTPS protocols (returns error)
  - Query parameters in both worker URL and target URL
  - Hash fragments

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Deploy to Cloudflare:
   ```bash
   npm run deploy
   ```

## Examples

### Basic redirect
```
https://worker.dev/https://example.com
→ Redirects to: https://example.com
```

### With path
```
https://worker.dev/https://example.com/path/to/page
→ Redirects to: https://example.com/path/to/page
```

### With query parameters
```
https://worker.dev/https://example.com/url?query=fdafksfla&dd=dfaa
→ Redirects to: https://example.com/url?query=fdafksfla&dd=dfaa
```

### With hash fragment
```
https://worker.dev/https://example.com/url?query=fdafksfla&dd=dfaa#section
→ Redirects to: https://example.com/url?query=fdafksfla&dd=dfaa#section
```

## License

MIT

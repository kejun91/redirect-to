/**
 * Cloudflare Worker to redirect to URLs passed in the path
 * Usage: https://worker.dev/https://example.com/path?query=value#hash
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Extract the target URL from the pathname
      // Remove the leading slash
      const targetUrl = url.pathname.substring(1);
      
      // If no URL is provided, return usage instructions
      if (!targetUrl) {
        return new Response(
          'Usage: https://your-worker.dev/https://example.com/path?query=value#hash\n\n' +
          'The worker will redirect to the URL you provide after the domain.',
          {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          }
        );
      }
      
      // Validate that the target starts with http:// or https://
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        return new Response(
          'Error: URL must start with http:// or https://',
          {
            status: 400,
            headers: { 'Content-Type': 'text/plain' }
          }
        );
      }
      
      // Append any query parameters and hash from the worker URL to the target URL
      let redirectUrl = targetUrl;
      
      // Add query parameters if they exist on the worker URL
      if (url.search) {
        // Check if target URL already has query parameters
        const separator = targetUrl.includes('?') ? '&' : '?';
        redirectUrl += separator + url.search.substring(1);
      }
      
      // Add hash if it exists on the worker URL
      if (url.hash) {
        redirectUrl += url.hash;
      }
      
      // Validate the final URL
      try {
        new URL(redirectUrl);
      } catch (e) {
        return new Response(
          `Error: Invalid URL format: ${redirectUrl}`,
          {
            status: 400,
            headers: { 'Content-Type': 'text/plain' }
          }
        );
      }
      
      // Perform the redirect
      return Response.redirect(redirectUrl, 302);
      
    } catch (error) {
      return new Response(
        `Error: ${error.message}`,
        {
          status: 500,
          headers: { 'Content-Type': 'text/plain' }
        }
      );
    }
  }
};

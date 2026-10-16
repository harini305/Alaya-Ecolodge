import site from '@/content/site.json';

// Only the five live public pages. /blog and /home-1-3-1-2 redirect to /.
export default function sitemap() {
  const routes = ['/', '/accommodation', '/retreats', '/activities', '/about-us'];
  return routes.map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    changeFrequency: path === '/retreats' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}

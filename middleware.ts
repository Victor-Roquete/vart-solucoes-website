import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Tudo, exceto /api, /trpc, /_next, /_vercel e ficheiros com ponto (ex.: robots.txt)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

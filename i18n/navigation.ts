import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/** Wrappers de Link/redirect/usePathname que respeitam o idioma atual. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

import { notFound } from 'next/navigation';

/** Apanha rotas desconhecidas dentro de /<idioma>/ e mostra o 404 traduzido. */
export default function CatchAllPage() {
  notFound();
}

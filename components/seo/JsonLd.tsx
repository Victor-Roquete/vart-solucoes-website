/**
 * Dados estruturados (JSON-LD) como <script> do servidor, como recomenda a
 * documentação do Next.js. JSON.stringify não escapa `<`, por isso troca-se
 * por \u003c para impedir que um texto feche a tag (XSS).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

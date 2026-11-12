#!/usr/bin/env python3
"""
Auditoria das traduções (en/es/fr) com o site a correr em localhost:3007.
Falha (código 1) se houver: chaves em falta/a mais, marcadores diferentes,
texto português do código nas páginas, letras de outra língua ou SVG com texto.
"""
import glob, html, json, os, re, sys, urllib.request
from urllib.parse import urlparse

BASE = 'http://localhost:3007'
LOCALES = ['en', 'es', 'fr']
BRAND = re.compile('soluções', re.I)  # nome da marca, igual em todas as línguas
ALLOWED = {  # letras não-ASCII legítimas em cada idioma
    'en': '',
    'es': 'áéíóúüñÁÉÍÓÚÜÑ',
    'fr': 'àâçéèêëîïôœùûüÿÀÂÇÉÈÊËÎÏÔŒÙÛÜŸ',
}
problems = 0


def load(p):
    return json.load(open(p, encoding='utf-8'))


def flat(d, prefix=''):
    out = {}
    for k, v in d.items():
        key = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            out.update(flat(v, key))
        elif isinstance(v, list):
            for i, x in enumerate(v):
                out[f'{key}[{i}]'] = x
        else:
            out[key] = v
    return out


def get(path):
    with urllib.request.urlopen(BASE + path, timeout=30) as r:
        return r.read().decode('utf-8')


def rendered(raw):
    """HTML visível: sem scripts de dados do Next (ficam os JSON-LD), sem estilos."""
    t = re.sub(r'<script(?![^>]*ld\+json)[^>]*>.*?</script>', '', raw, flags=re.S)
    t = re.sub(r'<style[^>]*>.*?</style>', '', t, flags=re.S)
    return html.unescape(t.replace('<!-- -->', ''))


# ---------- 1 e 2: mensagens ----------
print('== 1. Mensagens: chaves e marcadores')
same = {loc: [] for loc in LOCALES}
for f in sorted(glob.glob('messages/pt/*.json')):
    name = os.path.basename(f)
    pt = flat(load(f))
    for loc in LOCALES:
        lp = f'messages/{loc}/{name}'
        if not os.path.exists(lp):
            print(f'FALTA ficheiro  {lp}'); problems += 1; continue
        tr = flat(load(lp))
        for k in sorted(set(pt) - set(tr)):
            print(f'FALTA   {loc}/{name}: {k}'); problems += 1
        for k in sorted(set(tr) - set(pt)):
            print(f'A MAIS  {loc}/{name}: {k}'); problems += 1
        for k in sorted(set(pt) & set(tr)):
            a, b = pt[k], tr[k]
            if not (isinstance(a, str) and isinstance(b, str)):
                continue
            if set(re.findall(r'\{(\w+)\}', a)) != set(re.findall(r'\{(\w+)\}', b)):
                print(f'MARCADOR {loc}/{name}: {k}'); problems += 1
            elif a == b and re.search(r'[^\W\d_]{4}', a):
                same[loc].append(f'{name}: {k} = {a[:60]!r}')

# ---------- texto visível (para comparar com o português) ----------
ALLOW_SAME = {  # iguais ao pt por coincidência legítima (cognatos)
    'Obra Golfo · Luanda',                    # es: igual, nome de obra
    'Patriota Vias Express · Luanda',         # nome próprio, igual em todos
    'Mapa — VART Soluções, Luanda, Angola',  # es: 'Mapa' é igual
    'width=device-width, initial-scale=1',   # meta viewport (técnico)
    'index, follow',                          # meta robots (técnico)
    'vartsolucoes@gmail.com',                 # email, igual em todos os idiomas
    'Talatona, Luanda, Angola',               # morada
    'Luanda · Angola',                        # rodapé
    'Obra Onga · Luanda',                     # es: igual, nome de obra
    'Residencial · Luanda',                   # es: igual
    '+244 9XX XXX XXX',                       # exemplo de telefone no formulário
    'Contacto | VART',                        # es: título da página, 'Contacto' é igual
}
PT_CACHE = {}


def segments(raw):
    """Frases (>= 4 palavras) do texto visível e dos atributos de uma página."""
    t = BRAND.sub('', rendered(raw))
    segs = set(re.findall(r'(?:alt|aria-label|title|placeholder)="([^"]+)"', t))
    segs |= set(re.findall(r'<meta (?:name|property)="(?:description|keywords|og:title|og:description|twitter:title|twitter:description)" content="([^"]*)"', t))
    segs |= {l.strip() for l in re.sub(r'<[^>]+>', '\n', t).split('\n')}
    return {x for x in segs if len(re.findall(r'[^\W\d_]+', x)) >= 2}


# ---------- páginas do sitemap ----------
sitemap = get('/sitemap.xml')
paths = sorted({urlparse(u).path or '/' for u in re.findall(r'<loc>([^<]+)</loc>', sitemap)})
paths = [p for p in paths if p.split('/')[1:2] and p.split('/')[1] in LOCALES]
print(f'\n== 2. Páginas renderizadas ({len(paths)} em en/es/fr)')

# strings portuguesas do código (data/*.ts, constantes)
STR = re.compile(r"'((?:[^'\\\n]|\\.)+)'")
PT_HINT = re.compile(r'[ãõçáéíóúâêô]|\b(?:de|da|do|dos|das|para|com|uma|em|na|no|ao)\b', re.I)
cands = []
for f in glob.glob('data/*.ts') + ['lib/constants.ts']:
    src = open(f, encoding='utf-8').read()
    for m in STR.finditer(src):
        s = m.group(1).replace("\\'", "'")
        if len(s) >= 14 and ' ' in s and PT_HINT.search(s) and not s.startswith(('/', 'http', '@', '.')):
            cands.append((f, s))

svg_seen = {}
for path in paths:
    loc = path.split('/')[1]
    raw = get(path)
    text = rendered(raw)
    for f, s in cands:
        if s in text:
            print(f'PT NO CÓDIGO  {path}: {s[:70]!r}  ({f})'); problems += 1
    bare = BRAND.sub('', text)
    bad = sorted({w for w in re.findall(r"[^\s<>\"'=/]+", bare)
                  if any(ord(c) > 127 and c.isalpha() and c not in ALLOWED[loc] for c in w)})
    for w in bad[:8]:
        print(f'LETRA ESTRANHA  {path}: {w[:60]!r}'); problems += 1
    pt_path = '/' + '/'.join(path.split('/')[2:])
    if pt_path not in PT_CACHE:
        PT_CACHE[pt_path] = segments(get(pt_path))
    for seg in sorted(segments(raw) & PT_CACHE[pt_path] - {BRAND.sub('', a).strip() for a in ALLOW_SAME}):
        print(f'IGUAL AO PT  {path}: {seg[:80]!r}'); problems += 1
    for svg in re.findall(r'(/assets/[^"\'\s)<>]+\.svg)', text):
        svg_seen.setdefault(svg, path)

print('\n== 3. SVG referenciados')
for svg, path in sorted(svg_seen.items()):
    if '<text' in get(svg):
        print(f'SVG COM TEXTO FIXO  {svg}  (usado em {path})'); problems += 1
print(f'{len(svg_seen)} SVG verificados')

print('\n== PARA REVER (valor igual ao pt; legítimo se for cognato ou nome próprio)')
for loc in LOCALES:
    for line in same[loc]:
        print(f'  {loc}/{line}')

print('\nRESULTADO:', 'FALHAS: %d' % problems if problems else 'sem falhas')
sys.exit(1 if problems else 0)

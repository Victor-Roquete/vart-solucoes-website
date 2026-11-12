#!/usr/bin/env python3
"""
Publica os serviços pendentes (textos em scripts/servicos-pendentes.py):
  - com fotografias reais na pasta -> usa as fotografias;
  - sem fotografias -> usa um cartão gráfico da marca (SVG, claramente não é
    fotografia de obra) e NÃO destaca o serviço na Home.
Quando as fotografias chegarem, volta a correr: o cartão é substituído.

Uso: python3 scripts/publicar-pendentes.py
"""
import importlib.util
import os
import re
import sys
import textwrap
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location(
    'pendentes', os.path.join(HERE, 'servicos-pendentes.py')
)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


def make_card(sv):
    """Cartão gráfico da marca (não é fotografia) em public/assets/services/cartoes/."""
    d = os.path.join(base.ASSETS, 'cartoes')
    os.makedirs(d, exist_ok=True)
    lines = textwrap.wrap(sv['title'], 22)[:2]
    title = ''.join(
        f"<text x='100' y='{780 + i * 84}' font-size='70' font-weight='700' fill='#fff'>{escape(t)}</text>"
        for i, t in enumerate(lines)
    )
    footer_y = 780 + len(lines) * 84 + 60
    svg = f"""<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1600' font-family='Arial, Helvetica, sans-serif'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#0b4b73'/><stop offset='1' stop-color='#041d30'/>
    </linearGradient>
    <pattern id='p' width='56' height='56' patternUnits='userSpaceOnUse'>
      <path d='M56 0H0V56' fill='none' stroke='#fff' stroke-opacity='0.06'/>
    </pattern>
    <mask id='m'><rect width='100' height='100' fill='#fff'/><polygon points='50,29 81,60 50,91 19,60' fill='#000'/></mask>
  </defs>
  <rect width='1200' height='1600' fill='url(#g)'/>
  <rect width='1200' height='1600' fill='url(#p)'/>
  <g transform='translate(150 350) scale(9)' opacity='0.12'>
    <polygon points='50,6 94,50 50,94 6,50' fill='none' stroke='#fff' stroke-width='13' mask='url(#m)'/>
    <polygon points='50,38 72,60 50,82 28,60' fill='#fff'/>
  </g>
  <text x='100' y='690' font-size='30' font-weight='700' letter-spacing='8' fill='#83b8da'>{escape(sv['category'].upper())}</text>
  {title}
  <text x='100' y='{footer_y}' font-size='26' letter-spacing='10' fill='#fff' fill-opacity='0.6'>VART SOLUÇÕES</text>
</svg>
"""
    with open(os.path.join(d, sv['id'] + '.svg'), 'w', encoding='utf-8') as f:
        f.write(svg)


def render(sv, files):
    if files:
        return base.render(sv, files)
    card = {
        **sv,
        'folder': 'cartoes',
        'alt': f"Cartão gráfico do serviço {sv['title']} (ilustração da marca, não é fotografia de obra)",
        'featured': False,
    }
    return base.render(card, [sv['id'] + '.svg'])


def main():
    s = open(base.SERVICES_TS, encoding='utf-8').read()
    if base.MARKER not in s:
        sys.exit('Fim da lista de serviços não encontrado em data/services.ts')
    changed = False
    for sv in base.PENDING:
        files, bad = base.photos(sv['folder'])
        for b in bad:
            print(f"!  ignorado (nome fora do padrão ASCII/minúsculas): {sv['folder']}/{b}")
        block = re.compile(
            r"  \{\n    id: '" + re.escape(sv['id']) + r"',.*?\n  \},\n", re.S
        )
        m = block.search(s)
        if m:
            if not ('/cartoes/' in m.group(0) and files):
                print(f"=  {sv['title']}: já existe em services.ts")
                continue
            s = s[: m.start()] + s[m.end():]
            print(f"↻  {sv['title']}: cartão substituído por {len(files)} fotografia(s) real(is)")
        elif files:
            print(f"+  {sv['title']}: adicionado com {len(files)} fotografia(s)")
        else:
            print(f"+  {sv['title']}: adicionado com cartão gráfico (sem fotografias)")
        if not files:
            make_card(sv)
        s = s.replace(base.MARKER, render(sv, files) + base.MARKER, 1)
        changed = True
    if changed:
        open(base.SERVICES_TS, 'w', encoding='utf-8').write(s)


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Acrescenta a data/services.ts os serviços cujo conteúdo já está escrito mas que
só se publicam com fotografias REAIS (dossiê: nunca usar imagens ilustrativas
como se fossem trabalhos reais).

Uso:
  1. Coloca as fotografias em public/assets/services/<pasta>/ (nomes ASCII,
     minúsculas, sem espaços).
  2. python3 scripts/servicos-pendentes.py
É idempotente: pode ser corrido as vezes que for preciso.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVICES_TS = os.path.join(ROOT, 'data', 'services.ts')
ASSETS = os.path.join(ROOT, 'public', 'assets', 'services')
EXTS = ('.webp', '.jpg', '.jpeg', '.png', '.avif')
ASCII_NAME = re.compile(r'^[a-z0-9][a-z0-9._-]*$')
MARKER = '];\n\n/** Serviços em destaque na Home'

PENDING = [
    {
        'id': 'termo-acumuladores',
        'folder': 'termo-acumuladores',
        'title': 'Termo-acumuladores',
        'category': 'Hidráulica',
        'tagline': 'Instalação, reparação e manutenção.',
        'description': 'Instalação, substituição, verificação e manutenção de termo-acumuladores, seguindo as instruções do fabricante e com atenção às ligações hidráulicas e aos dispositivos de segurança.',
        'bullets': [
            'Instalação e substituição de termo-acumuladores',
            'Montagem do grupo de segurança hidráulico',
            'Reparação de fugas e de válvulas',
            'Manutenção periódica conforme o fabricante',
        ],
        'checks': [
            'Modelo, capacidade e condições do local: suporte, espaço e acessibilidade',
            'Grupo de segurança: válvula de corte, de segurança, vaso de expansão, antirretorno e redutora de pressão',
            'Descarga da válvula de segurança livre, orientada para baixo e ligada a um escoamento',
            'Funcionamento da válvula de segurança, pelo manípulo de teste',
            'Estado do ânodo de proteção, nos modelos que o têm, segundo o fabricante',
            'Pressão da rede à entrada do equipamento',
            'Estanqueidade das ligações hidráulicas',
        ],
        'limits': 'Qualquer intervenção é feita com a alimentação elétrica desligada, e a parte elétrica só por profissional habilitado. A descarga da válvula de segurança nunca deve ser obstruída; pingar durante o aquecimento pode ser normal. Em equipamentos abrangidos por garantia seguem-se as condições do fabricante.',
        'alt': 'Termo-acumulador instalado pela VART Soluções',
        'featured': True,
    },
    {
        'id': 'montagem-de-filtros',
        'folder': 'filtros',
        'title': 'Montagem e manutenção de filtros',
        'category': 'Hidráulica',
        'tagline': 'Filtros de piscina: montagem, arranque e manutenção.',
        'description': 'Montagem de filtros de piscina com bomba, válvula seletora e tubagens, e manutenção do conjunto de filtração, para que a água circule e seja filtrada como o equipamento prevê.',
        'bullets': [
            'Instalação do filtro sobre base estável e nivelada',
            'Ligação da bomba, da válvula seletora e do retorno',
            'Carregamento de areia, quando aplicável',
            'Arranque e verificação da pressão no manómetro',
            'Manutenção e substituição de componentes',
        ],
        'checks': [
            'Base do filtro estável, sólida e nivelada',
            'Válvula antirretorno, se o filtro ficar acima do nível da água',
            'Válvula seletora: filtragem, retrolavagem, enxaguamento, recirculação, esvaziamento e fecho',
            'Manobras da válvula sempre com a bomba desligada',
            'Areia colocada antes de ligar as tubagens à válvula',
            'Pressão inicial com o filtro limpo, registada como referência',
            'Estanqueidade das ligações e funcionamento da bomba',
        ],
        'limits': 'A pressão máxima de funcionamento e a carga de areia seguem as indicações do fabricante do filtro. As ligações elétricas do equipamento de piscina são feitas por profissional habilitado.',
        'alt': 'Filtro de piscina montado pela VART Soluções',
        'featured': True,
    },
    {
        'id': 'pintura',
        'folder': 'pintura',
        'title': 'Pintura',
        'category': 'Acabamentos',
        'tagline': 'Pintura com acabamento limpo.',
        'description': 'Execução de pinturas com acabamento limpo, proteção da área de trabalho e orçamento com âmbito definido antes da obra.',
        'bullets': [
            'Avaliação no local antes do orçamento',
            'Proteção da área de trabalho',
            'Área limpa e entrega no fim',
        ],
        'checks': [
            'Estado das superfícies e necessidade de preparação',
            'Materiais adequados ao tipo de superfície',
            'Proteção de pavimentos, mobiliário e áreas de circulação',
        ],
        'limits': 'O tipo de tinta, o número de demãos e o prazo dependem da avaliação no local e ficam definidos no orçamento.',
        'alt': 'Trabalho de pintura executado pela VART Soluções',
        'featured': True,
    },
]


def q(text):
    return "'" + text.replace('\\', '\\\\').replace("'", "\\'") + "'"


def render(sv, files):
    main, gallery = files[0], files[1:4]
    out = [
        '  {',
        f"    id: {q(sv['id'])},",
        f"    title: {q(sv['title'])},",
        f"    slug: {q(sv['id'])},",
        f"    category: {q(sv['category'])},",
        f"    tagline: {q(sv['tagline'])},",
        '    description:',
        f"      {q(sv['description'])},",
        '    bullets: [',
        *[f'      {q(b)},' for b in sv['bullets']],
        '    ],',
        '    checks: [',
        *[f'      {q(c)},' for c in sv['checks']],
        '    ],',
        '    limits:',
        f"      {q(sv['limits'])},",
        f"    image: `${{S}}/{sv['folder']}/{main}`,",
        f"    imageAlt: {q(sv['alt'])},",
    ]
    if gallery:
        out.append('    gallery: [')
        out += [f"      `${{S}}/{sv['folder']}/{g}`," for g in gallery]
        out.append('    ],')
    out += [
        f"    href: '/servicos#{sv['id']}',",
        f"    featured: {'true' if sv['featured'] else 'false'},",
        '  },',
        '',
    ]
    return '\n'.join(out)


def photos(folder):
    d = os.path.join(ASSETS, folder)
    os.makedirs(d, exist_ok=True)
    ok, bad = [], []
    for f in sorted(os.listdir(d)):
        if f.lower().endswith(EXTS):
            (ok if ASCII_NAME.match(f) else bad).append(f)
    return ok, bad


def main():
    s = open(SERVICES_TS, encoding='utf-8').read()
    if MARKER not in s:
        sys.exit('Fim da lista de serviços não encontrado em data/services.ts')
    changed = False
    for sv in PENDING:
        if f"id: '{sv['id']}'" in s:
            print(f"=  {sv['title']}: já existe em services.ts")
            continue
        files, bad = photos(sv['folder'])
        for b in bad:
            print(f"!  ignorado (nome fora do padrão ASCII/minúsculas): {sv['folder']}/{b}")
        if not files:
            print(f"…  {sv['title']}: à espera de fotografias em public/assets/services/{sv['folder']}/")
            continue
        s = s.replace(MARKER, render(sv, files) + MARKER, 1)
        changed = True
        print(f"+  {sv['title']}: adicionado com {len(files)} fotografia(s)")
    if changed:
        open(SERVICES_TS, 'w', encoding='utf-8').write(s)


if __name__ == '__main__':
    main()

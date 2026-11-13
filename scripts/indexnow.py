#!/usr/bin/env python3
"""Envia os URLs do sitemap ao IndexNow (Bing e motores participantes).
A chave é o ficheiro public/<32 hex>.txt, que tem de estar acessível no site."""
import glob, json, os, re, sys, urllib.error, urllib.request
from urllib.parse import urlparse

SITE = 'https://vart-solucoes.vercel.app'
keys = [os.path.basename(f)[:-4] for f in glob.glob('public/*.txt')
        if re.fullmatch(r'[0-9a-f]{32}', os.path.basename(f)[:-4])]
assert len(keys) == 1, 'esperava exatamente 1 ficheiro de chave em public/'
key = keys[0]
live = urllib.request.urlopen(f'{SITE}/{key}.txt', timeout=30).read().decode().strip()
assert live == key, 'o ficheiro de chave publicado não corresponde à chave'
sitemap = urllib.request.urlopen(f'{SITE}/sitemap.xml', timeout=30).read().decode()
urls = re.findall(r'<loc>([^<]+)</loc>', sitemap)
body = json.dumps({'host': urlparse(SITE).netloc, 'key': key,
                   'keyLocation': f'{SITE}/{key}.txt', 'urlList': urls}).encode()
req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body,
                             headers={'Content-Type': 'application/json; charset=utf-8'})
try:
    r = urllib.request.urlopen(req, timeout=30)
    print('HTTP', r.status, f'- {len(urls)} URLs enviados')
except urllib.error.HTTPError as e:
    print('HTTP', e.code, e.read().decode()[:200]); sys.exit(1)

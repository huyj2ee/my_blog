#!/usr/bin/python3
import time
from urllib.request import Request, urlopen
import sqlite3
import json

WAIT_SECONDS=20
BLOG_ID = '904737282308882794'
access_token = input('Enter access token: ')

#Clean post
req = Request('https://www.googleapis.com/blogger/v3/blogs/' + BLOG_ID + '/posts')
req.add_header('Authorization', 'Bearer ' + access_token)
print('\n')
try:
  content = urlopen(req).read()
  obj = json.loads(content)
except:
  print('Access denied')
  exit()
try:
  ids = [item['id'] for item in obj['items']]
  print('Clean posts...')
  for id in ids:
    print('Post: ' + id)
    req = Request('https://www.googleapis.com/blogger/v3/blogs/' + BLOG_ID + '/posts/'+id, method='DELETE')
    req.add_header('Authorization', 'Bearer ' + access_token)
    content = urlopen(req).read()
    time.sleep(WAIT_SECONDS)
except:
  print('No post found')

#!/usr/bin/python3
import time
from urllib.request import Request, urlopen
import sqlite3
import json

WAIT_SECONDS=20
WAIT_FACTOR=3600 #2400 #1200 #600 #300  #60
WAIT_BUFFER=18   #10
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

#Connect database
DB_FILE_NAME = 'blog.db'
connection = sqlite3.connect(DB_FILE_NAME)
#cursor = connection.execute("PRAGMA table_info(Homes)")
#for row in cursor:
#  print(row[1])

#Root object
root = {}

def post(title, content):
  blog = {}
  blog['kind'] = 'blogger#post'
  blog['blog'] = {}
  blog['blog']['id'] = BLOG_ID
  blog['title'] = title
  blog['content'] = content
  payload=json.dumps(blog).encode('utf-8')
  try:
    req = Request('https://www.googleapis.com/blogger/v3/blogs/' + BLOG_ID + '/posts/', method='POST')
    req.add_header('Authorization', 'Bearer ' + access_token)
    req.add_header('Content-Type', 'application/json')
    req.add_header('Content-Length', len(payload))
    content = urlopen(req, payload).read()
  except:
    print('Access denied')
    exit()
  obj = json.loads(content)
  time.sleep(int(len(payload)/WAIT_FACTOR) + WAIT_BUFFER)
  return obj['id']


#Publish Home page
home = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'name, quote, img, content ',
  'FROM Homes'
]))
for row in cursor:
  home['name'] = row[0]
  home['quote'] = row[1]
  home['img'] = row[2]
  home['content'] = row[3]
print('\nPublish Home page')
homejson = json.dumps(home)
root['homePageId'] = post('Home page', homejson)
cursor = connection.execute(''.join([
  'UPDATE Homes ',
  'SET state=2'
]))
connection.commit()
print('')


#Publish projects page
projects = []
project = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'img, name, brief, document, slug ',
  'FROM Projects ',
  'ORDER BY createdAt'
]))
for row in cursor:
  project['img'] = row[0]
  project['name'] = row[1]
  project['brief'] = row[2]
  project['document'] = row[3]
  oldKey = row[4]
  projectJson = json.dumps(project['document'])
  print('Publish project ' + project['name'])
  project['slug'] = post('[project] ' + project['name'], projectJson)
  project.pop('document', None)
  projects.append(dict(project))
  cursor = connection.execute(''.join([
    'UPDATE Projects ',
    'SET state=2, slug=\'' + project['slug'] + '\' ',
    'WHERE slug=\'', oldKey, '\''
  ]))
  connection.commit()

print('Publish projects list')
projectListJson = json.dumps(projects)
root['projectsListId'] = post('Projects list', projectListJson)
print('')


#Publish Blogs page
blogs = []
blog = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'title, brief, content, slug ',
  'FROM Blogs ',
  'ORDER BY createdAt'
]))
for row in cursor:
  blog['title'] = row[0]
  blog['brief'] = row[1]
  blog['content'] = row[2]
  oldKey = row[3]
  print('Publish blog ' + blog['title'])
  blogObj = [blog['brief'], blog['content']]
  blogJson = json.dumps(blogObj)
  blog['slug'] = post('[] ' + blog['title'], blogJson)
  blog.pop('content', None)
  blogs.append(dict(blog))
  cursor = connection.execute(''.join([
    'UPDATE Blogs ',
    'SET state=2, slug=\'' + blog['slug'] + '\' ',
    'WHERE slug=\'', oldKey, '\''
  ]))
  connection.commit()

print('Publish blogs list')
blogListJson = json.dumps(blogs)
root['blogsListId'] = post('Blogs list', blogListJson)
print('')


#Publish CV page
cv = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'content ',
  'FROM CVs'
]))
for row in cursor:
  cv['content'] = row[0]
print('Publish CV page')
cvJson = json.dumps(cv['content'])
root['cvPageId'] = post('CV page', cvJson)
print('')
cursor = connection.execute(''.join([
  'UPDATE CVs ',
  'SET state=2'
]))
connection.commit()


#Clean orphan posts
print('Clean orphan posts');
cursor = connection.execute(''.join([
  'DELETE FROM OrphanPosts'
]))
connection.commit()
print('')


#Publish root page
print('Publish Root page')
rootJson = json.dumps(root)
rootPageId = post('\nRoot page', rootJson)
print('Root page id: ' + rootPageId)
print('Root object:')
print(root)
cursor = connection.execute(''.join([
  'CREATE TABLE IF NOT EXISTS root ( ',
    'rootPageId TEXT,',
    'homePageId TEXT,',
    'projectsListId TEXT,',
    'blogsListId TEXT,',
    'cvPageId TEXT',
  ')'
]))
connection.commit()
cursor = connection.execute(''.join([
  'DELETE FROM root',
]))
connection.commit()
cursor = connection.execute(''.join([
  'INSERT INTO root(rootPageId, homePageId, projectsListId, blogsListId, cvPageId) ',
  'VALUES (',
    '\'' + rootPageId + '\', '
    '\'' + root['homePageId'] + '\', '
    '\'' + root['projectsListId'] + '\', '
    '\'' + root['blogsListId'] + '\', '
    '\'' + root['cvPageId'] + '\' '
  ')'
]))
connection.commit()

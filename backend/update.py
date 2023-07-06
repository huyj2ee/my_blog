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
DB_FILE_NAME = 'blog.db'

def put(postId, title, content):
  blog = {}
  blog['kind'] = 'blogger#post'
  blog['id'] = postId
  blog['blog'] = {}
  blog['blog']['id'] = BLOG_ID
  blog['title'] = title
  blog['content'] = content
  payload=json.dumps(blog).encode('utf-8')
  try:
    req = Request('https://www.googleapis.com/blogger/v3/blogs/' + BLOG_ID + '/posts/' + postId, method='PUT')
    req.add_header('Authorization', 'Bearer ' + access_token)
    req.add_header('Content-Type', 'application/json')
    req.add_header('Content-Length', len(payload))
    content = urlopen(req, payload).read()
  except:
    print('Access denied')
    exit()
  #obj = json.loads(content)
  time.sleep(int(len(payload)/WAIT_FACTOR) + WAIT_BUFFER)

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


# Load root
connection = sqlite3.connect(DB_FILE_NAME)
cursor = connection.execute(''.join([
  'SELECT ',
    'rootPageId, homePageId, projectsListId, blogsListId, cvPageId ',
  'FROM root'
]))
rootPageId = ''
homePageId = ''
projectsListId = ''
blogsListId = ''
cvPageId = ''
for row in cursor:
  rootPageId = row[0]
  homePageId = row[1]
  projectsListId = row[2]
  blogsListId = row[3]
  cvPageId = row[4]


#Publish Home page
home = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'name, quote, img, content, state ',
  'FROM Homes'
]))
for row in cursor:
  home['name'] = row[0]
  home['quote'] = row[1]
  home['img'] = row[2]
  home['content'] = row[3]
  homeState = row[4]
print('\nHome page:')
if (homeState == 0):
  print('State of home page is new. Please use the export command.')
  exit()
elif (homeState == 1):
  print('    State outdated, update home page...')
  homejson = json.dumps(home)
  put(homePageId, 'Home page', homejson)
  cursor = connection.execute(''.join([
    'UPDATE Homes ',
    'SET state=2'
  ]))
  connection.commit()
elif (homeState == 2):
  print('    State updated, skip')
print('')


#Publish projects page
projects = []
project = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'img, name, brief, document, slug, state ',
  'FROM Projects ',
  'ORDER BY createdAt'
]))
for row in cursor:
  project['img'] = row[0]
  project['name'] = row[1]
  project['brief'] = row[2]
  project['document'] = row[3]
  oldKey = row[4]
  projectState = row[5]
  projectJson = json.dumps(project['document'])
  print('Project ' + project['name'] + ':')
  if projectState == 0:
    print('    State new, post new project...')
    project['slug'] = post('[project] ' + project['name'], projectJson)
    project.pop('document', None)
    projects.append(dict(project))
    cursor = connection.execute(''.join([
      'UPDATE Projects ',
      'SET state=2, slug=\'' + project['slug'] + '\' ',
      'WHERE slug=\'', oldKey, '\''
    ]))
    connection.commit()
  elif projectState == 1:
    print('    State outdated, put updated project...')
    put(oldKey, '[project] ' + project['name'], projectJson)
    project['slug'] = oldKey
    project.pop('document', None)
    projects.append(dict(project))
    cursor = connection.execute(''.join([
      'UPDATE Projects ',
      'SET state=2 ',
      'WHERE slug=\'', oldKey, '\''
    ]))
    connection.commit()
  elif projectState == 2:
    print('    State updated, skip')
    project['slug'] = oldKey
    project.pop('document', None)
    projects.append(dict(project))

print('Update projects list')
projectListJson = json.dumps(projects)
put(projectsListId, 'Projects list', projectListJson)
print('')


#Publish Blogs page
blogs = []
blog = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'title, brief, content, slug ,state ',
  'FROM Blogs ',
  'ORDER BY createdAt'
]))
for row in cursor:
  blog['title'] = row[0]
  blog['brief'] = row[1]
  blog['content'] = row[2]
  oldKey = row[3]
  blogState = row[4]
  print('Blog ' + blog['title'] +':')
  blogObj = [blog['brief'], blog['content']]
  blogJson = json.dumps(blogObj)
  if blogState == 0:
    print('    State new, post new blog...')
    blog['slug'] = post('[] ' + blog['title'], blogJson)
    blog.pop('content', None)
    blogs.append(dict(blog))
    cursor = connection.execute(''.join([
      'UPDATE Blogs ',
      'SET state=2, slug=\'' + blog['slug'] + '\' ',
      'WHERE slug=\'', oldKey, '\''
    ]))
    connection.commit()
  elif blogState == 1:
    print('    State outdated, put updated blog...')
    put(oldKey, '[] ' + blog['title'], blogJson)
    blog['slug'] = oldKey
    blog.pop('content', None)
    blogs.append(dict(blog))
    cursor = connection.execute(''.join([
      'UPDATE Blogs ',
      'SET state=2 ',
      'WHERE slug=\'', oldKey, '\''
    ]))
    connection.commit()
  elif blogState == 2:
    print('    State updated, skip')
    blog['slug'] = oldKey
    blog.pop('content', None)
    blogs.append(dict(blog))

print('Update blogs list')
blogListJson = json.dumps(blogs)
put(blogsListId, 'Blogs list', blogListJson)
print('')


#Publish CV page
cv = {}
cursor = connection.execute(''.join([
  'SELECT ',
    'content, state ',
  'FROM CVs'
]))
for row in cursor:
  cv['content'] = row[0]
  cvState = row[1]
print('\nCV page:')
if (cvState == 0):
  print('State of CV page is new. Please use the export command.')
  exit()
elif (cvState == 1):
  print('    State outdated, update CV page...')
  cvJson = json.dumps(cv['content'])
  put(cvPageId, 'CV page', cvJson)
  cursor = connection.execute(''.join([
    'UPDATE CVs ',
    'SET state=2'
  ]))
  connection.commit()
elif (cvState == 2):
  print('    State updated, skip')
print('')


#Clean orphan post
print('Clean orphan posts...')
cursor = connection.execute(''.join([
  'SELECT ',
    'slug ',
  'FROM OrphanPosts'
]))
for row in cursor:
  print('    Post: ' + row[0])
  req = Request('https://www.googleapis.com/blogger/v3/blogs/' + BLOG_ID + '/posts/'+ row[0], method='DELETE')
  req.add_header('Authorization', 'Bearer ' + access_token)
  content = urlopen(req).read()
  time.sleep(WAIT_SECONDS)

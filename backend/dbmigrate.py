#!/usr/bin/python3
import sqlite3
import sys

if len(sys.argv) <= 1:
  sys.exit(0)

SRC_DB_FILE_NAME = sys.argv[1]
DB_FILE_NAME = 'blog.db'
srcConnection = sqlite3.connect(SRC_DB_FILE_NAME)
connection = sqlite3.connect(DB_FILE_NAME)

# Migrate Home
srcCursor = srcConnection.execute(''.join([
  'SELECT ',
    'name, quote, img, content, createdAt, updatedAt ',
  'FROM Homes'
]))

home = {}
for row in srcCursor:
  home['name'] = row[0]
  home['quote'] = row[1]
  home['img'] = row[2]
  home['content'] = row[3]
  home['createdAt'] = row[4]
  home['updatedAt'] = row[5]

cursor = connection.execute(''.join([
  'DELETE ',
  'FROM Homes'
]))
connection.commit()

cursor = connection.execute(''.join([
  "INSERT INTO Homes(name, quote, img, content, createdAt, updatedAt) ",
  "VALUES(?, ?, ?, ?, ?, ?)"
]), (home['name'], home['quote'], home['img'], home['content'], home['createdAt'], home['updatedAt']))
connection.commit()


# Migrate Projects
cursor = connection.execute(''.join([
  'DELETE ',
  'FROM Projects'
]))
connection.commit()

srcCursor = srcConnection.execute(''.join([
  'SELECT ',
    'slug, img, name, brief, document, createdAt, updatedAt ',
  'FROM Projects ',
  'ORDER BY createdAt ASC'
]))

project = {}
for row in srcCursor:
  project['slug'] = row[0]
  project['img'] = row[1]
  project['name'] = row[2]
  project['brief'] = row[3]
  project['document'] = row[4]
  project['createdAt'] = row[5]
  project['updatedAt'] = row[6]
  cursor = connection.execute(''.join([
    "INSERT INTO Projects(img, name, brief, document, createdAt, updatedAt) ",
    "VALUES(?, ?, ?, ?, ?, ?)"
  ]), (project['img'], project['name'], project['brief'], project['document'], project['createdAt'], project['updatedAt']))
  connection.commit()


# Migrate Blogs
cursor = connection.execute(''.join([
  'DELETE ',
  'FROM Blogs'
]))
connection.commit()

srcCursor = srcConnection.execute(''.join([
  'SELECT ',
    'title, brief, content, createdAt, updatedAt ',
  'FROM Blogs ',
  'ORDER BY createdAt ASC'
]))

blog = {}
for row in srcCursor:
  blog['title'] = row[0]
  blog['brief'] = row[1]
  blog['content'] = row[2]
  blog['createdAt'] = row[3]
  blog['updatedAt'] = row[4]
  cursor = connection.execute(''.join([
    "INSERT INTO Blogs(title, brief, content, createdAt, updatedAt, baseTitle, baseBrief, baseContent) ",
    "VALUES(?, ?, ?, ?, ?, '', '', '')"
  ]), (blog['title'], blog['brief'], blog['content'], blog['createdAt'], blog['updatedAt']))
  connection.commit()


# Migrate CV
# Migrate Home
srcCursor = srcConnection.execute(''.join([
  'SELECT ',
    'content, createdAt, updatedAt ',
  'FROM CVs'
]))

cv = {}
for row in srcCursor:
  cv['content'] = row[0]
  cv['createdAt'] = row[1]
  cv['updatedAt'] = row[2]

cursor = connection.execute(''.join([
  'DELETE ',
  'FROM CVs'
]))
connection.commit()

cursor = connection.execute(''.join([
  "INSERT INTO CVs(content, createdAt, updatedAt) ",
  "VALUES(?, ?, ?)"
]), (cv['content'], cv['createdAt'], cv['updatedAt']))
connection.commit()


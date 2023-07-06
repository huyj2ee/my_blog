#!/usr/bin/python3
import sqlite3

#Connect database
DB_FILE_NAME = 'blog.db'
connection = sqlite3.connect(DB_FILE_NAME)
cursor = connection.execute(''.join([
  'SELECT ',
    'slug ',
  'FROM OrphanPosts'
]))
for row in cursor:
  print('slug:', row[0])


#!/usr/bin/python3
import sqlite3

#Connect database
DB_FILE_NAME = 'blog.db'
connection = sqlite3.connect(DB_FILE_NAME)
cursor = connection.execute(''.join([
  'SELECT ',
    'rootPageId, homePageId, projectsListId, blogsListId, cvPageId ',
  'FROM root'
]))
for row in cursor:
  print('rootPageId:', row[0])
  print('homePageId:', row[1])
  print('projectsListId:', row[2])
  print('blogsListId:', row[3])
  print('cvPageId:', row[4])


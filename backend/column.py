#!/usr/bin/python3
import sqlite3

DB_FILE_NAME = 'blog.db'
connection = sqlite3.connect(DB_FILE_NAME)
cursor = connection.execute("PRAGMA table_info(Homes)")
for row in cursor:
  print(row[1])


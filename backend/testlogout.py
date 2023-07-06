#!/usr/bin/python3

from urllib.request import Request, urlopen
import json

access_token = input("Enter access token: ")
req = Request('https://www.googleapis.com/blogger/v3/users/self/blogs')
#req = Request('https://www.googleapis.com/blogger/v3/blogs/904737282308882794/posts?key=AIzaSyB5CZwXfgiCC42eF940dtwATc6oOk5hSCo')

# Search blogs
#req = Request('https://www.googleapis.com/blogger/v3/blogs/904737282308882794/posts/search?key=AIzaSyB5CZwXfgiCC42eF940dtwATc6oOk5hSCo&q=hello')

req.add_header('Authorization', 'Bearer ' + access_token)

#req = Request('https://www.googleapis.com/blogger/v3/blogs/904737282308882794/posts/313505487644316568?key=AIzaSyB5CZwXfgiCC42eF940dtwATc6oOk5hSCo')
try:
  content = urlopen(req).read()
  obj = json.loads(content)
  print(obj)
  print('\n')
except:
  print('Invalid access token')

#print(len(obj["items"]))
#print(obj["items"][0]["id"])

#for x in obj["items"]:
#  print("---")
#  print (x["id"])
#  print("---")

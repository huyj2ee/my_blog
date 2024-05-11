#!/usr/bin/python3
from xml.dom.minidom import getDOMImplementation


f = open("./build/index.html")
html = f.read()
f.close()


BEGIN_TEMPLATE = """<?xml version="1.0" encoding="UTF-8" ?>
<html b:css='false' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
    <head>
        <b:skin version='1.3.0'><![CDATA[]]></b:skin>
    </head>
    <body>
        <style>
            * {
              margin: 0px;
              padding: 0px;
              border: none;
            }
        </style>
        <input id="rootId" type="hidden" value="5296496006416203993" />
        <div id="root"></div>
        <b:section id='page_body'/>
"""

END_TEMPLATE = """

    </body>
</html>
"""

print(BEGIN_TEMPLATE)

impl = getDOMImplementation()

preIdx = 0
idx = html.find("<link href=\"/static/css/", preIdx)
if idx >= 0:
	preIdx = idx
	idx=html.find(".css", preIdx)
	if idx >= 0:
		fileName = html[preIdx+len("<link href=\""):idx+4]
		fileName = "./build" + fileName
		cssFile = open(fileName)
		cssString = cssFile.read()
		cssFile.close()
		print("<style>")
		print(cssString)
		print("</style>")

scripts = []
preIdx = 0
idx = -1
while True:
    idx = html.find("<script", preIdx)
    if idx >= 0:
        if html[idx + len("<script")] == '>':
            endIdx = html.find("</script>", preIdx)
            if endIdx < 0:
                break
            preIdx = endIdx + len("</script>")
            #scripts.append(html[idx:preIdx] + "\n")
            sss = idx + len("<script>")
            eee = preIdx - len("</script>")
            scripts.append(html[sss:eee] + "\n")
            newdoc = impl.createDocument(None, "script", None)
            text = newdoc.createTextNode("\n".join(scripts))
            newdoc.documentElement.appendChild(text)
            print(newdoc.toxml()[22:])
            scripts=[]
        else:
            idx = html.find("src=\"", idx)
            if idx < 0:
                break
            endIdx = html.find("\">", idx)
            if endIdx < 0:
                break
            path = html[(idx + len("src=\"")):endIdx]
            if (path.find("/static/") == 0):
                f = open("./build" + path)
                #script = "<script>" + f.read() + "</script>\n"
                script = f.read() + "\n"
                scripts.append(script)
                f.close()
                newdoc = impl.createDocument(None, "script", None)
                text = newdoc.createTextNode("\n".join(scripts))
                newdoc.documentElement.appendChild(text)
                print(newdoc.toxml()[22:])
                scripts=[]
            preIdx = endIdx + len("\">")
    else:
        break

print(END_TEMPLATE)

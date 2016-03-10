#!/usr/bin/python

# PRE-RUN
#     pip install requests

from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep, popen
import requests
import urllib
import urlparse
import random
import os.path

PORT_NUMBER = 8080
DO_PULL = True

#This class will handles any incoming request from
#the browser
class mmirrorServer(BaseHTTPRequestHandler):

	#Handler for the GET requests
	def do_GET(self):
		if self.path == "/":
			self.path = "/index.html"

		# Dictionary of mime types to send for requests
		mime_types = {
		    'html': 'text/html',
		    'jpg':'image/jpg',
		    'gif': 'image/gif',
		    'js': 'application/javascript',
		    '.css': 'text/css',
		}

		try:
			sendReply = True
			extension = os.path.splitext(self.path)[-1]
			mimetype = mime_types.get(extension)

			if self.path.startswith('/calendar'):
				# Parse the query args we were given
				query_dict = urlparse.parse_qs(self.path)
				query_url = query_dict['url'][0]
				remote_url = urllib.unquote(query_url).decode('utf8')
				if query_url.find('calendar.google.com') > -1:
					# Special case for google cal urls since they already have html encoded data
					remote_url = query_url.replace('#','%23').replace('@', '%40')
				# Do the remote GET of the ical
				remote_ics = requests.get(remote_url)
				# Serve at up the response (basically send exactly what we got)
				self.send_response(remote_ics.status_code)
				self.send_header('Content-Type', remote_ics.headers['content-type'])
				self.end_headers()
				self.wfile.write(remote_ics.text)
				return

			if self.path.startswith('/quote'):
				params = {
					'method': 'getQuote',
					'format': 'json',
					'key': str(random.randrange(1000, 900000)),
					'lang': 'en'
				}
				# Do the remote GET of the quote api
				remote_url = 'http://api.forismatic.com/api/1.0/'
				remote_ics = requests.get(remote_url, params=params)
				# Serve at up the response (basically send exactly what we got)
				self.send_response(remote_ics.status_code)
				self.send_header('Content-Type', remote_ics.headers['content-type'])
				self.end_headers()
				self.wfile.write(remote_ics.text)
				return

			if self.path.startswith('/hash'):
				# Do a git pull if necessary
				if DO_PULL == True:
					popen('git pull')
				# Call down to the system to get the latest hash
				githash = popen('git rev-parse HEAD').read()
				# Serve at up the response (basically send exactly what we got)
				self.send_response(200)
				self.send_header('Content-Type', 'text/plain')
				self.end_headers()
				self.wfile.write(githash)
				return

			if sendReply == True:
				# Open the static file requested and send it
				f = open(curdir + sep + self.path)
				self.send_response(200)
				self.send_header('Content-type', mimetype)
				self.end_headers()
				self.wfile.write(f.read())
				f.close()
			return


		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

try:
	# Create a web server and define the handler to manage the
	# incoming request
	server = HTTPServer(('', PORT_NUMBER), mmirrorServer)
	print 'Started httpserver on port ' , PORT_NUMBER

	#Wait forever for incoming http requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()

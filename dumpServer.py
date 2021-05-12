#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys

class CORSRequestHandler (SimpleHTTPRequestHandler):
    extensions_map = {
        '.trig': 'application/trig',
        '': 'application/octet-stream'
    }

    def __init__(self, *args, **kwargs):
        kwargs['directory'] = 'dump/'
        super().__init__(*args, **kwargs)

    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    test(CORSRequestHandler, HTTPServer, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000)

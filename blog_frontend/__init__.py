
import mimetypes
import os.path
from pyramid.response import FileResponse
from pyramid.request import Request
HERE = os.path.dirname(os.path.abspath(__file__))


class FrontendFilter(object):
    def __init__(self, app, global_conf, document_root):
        self.app = app
        if ':' in document_root:
            document_root = os.path.join(HERE, document_root.split(':', 1)[1])
        self.document_root = document_root

    def __call__(self, environ, start_response):
        path = environ.get('PATH_INFO').strip('/') or 'index.html'
        filename = os.path.join(self.document_root, path)
        if os.path.isfile(filename):
            file_type, _ = mimetypes.guess_type(filename)
            response = FileResponse(
                filename,
                request=Request(environ=environ),
                content_type=file_type,
                )
            return response(environ, start_response)
        return self.app(environ, start_response)

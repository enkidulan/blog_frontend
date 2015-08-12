
from setuptools import setup, find_packages


setup(name='blog_frontend',
      version='v1.0.201508122127',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          # -*- Extra requirements: -*-
          'pyramid',
      ],
      entry_points="""
        # -*- Entry points: -*-
        [paste.filter_app_factory]
        blog_frontend = blog_frontend:FrontendFilter
      """,
)

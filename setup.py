
from setuptools import setup, find_packages


setup(name='blog_frontend',
      version='1.0.201508242126',
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

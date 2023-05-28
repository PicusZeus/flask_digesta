import os
import multiprocessing


bind = os.getenv('WEB_BIND', '0.0.0.0:5000')

workers = int(os.getenv("WEB_CONCURRENCY", multiprocessing.cpu_count()) * 2)

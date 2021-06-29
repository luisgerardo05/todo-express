#!/bin/bash

locust -f control.py --host http://localhost.com:80 --headless -u 5 -r 5 --run-time 10s --stop-timeout 10 --exit-code-on-error 1

locust -f create.py --host http://localhost.com:80 --headless -u 5 -r 5 --run-time 10s --stop-timeout 10 --exit-code-on-error 1

locust -f update.py --host http://localhost.com:80 --headless -u 5 -r 5 --run-time 10s --stop-timeout 10 --exit-code-on-error 1

locust -f delete.py --host http://localhost.com:80 --headless -u 5 -r 5 --run-time 10s --stop-timeout 10 --exit-code-on-error 1

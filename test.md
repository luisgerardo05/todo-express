# Todo Express API Locust Load Testing

## Test
First of all you must have installed locust, to do that you must run the following command:
```
pip install locust
```
*For more information you can go to the official documentation locust web page <https://docs.locust.io/en/stable/>*

Then you must have a folder in your main working directory called test in which you will have your locust file(s) with all your tests and one `.sh` file for the locust running command.

Once you set the folder with the python script with your tests you are ready to run them. 

*Note: For this example the name of the python file is `locustfile.py` and the `.sh` file name is `run.sh`.*

There are two ways to run locust tests:

### 1. With web interface
If you want to use web interface to see in realtime how locust manage the request you can use the next command:
```
locust -f locustfile.py
```
being `locustfile.py` my test locust file, if you have a different file name in your project, you must changed it in the command as well.

By running this command you have to type on your browser this direction <http://0.0.0.0:8089> or just look fot it in your terminal and click it.
Once you go to that web page you will see a form where you must type the total number of users to simulate, the spawn rate (which is the users spawned / second) and the host.

In case you don't want to type these, you can pass that data as arguments in your command as in the example below:
```
locust -f locustfile.py --host http://localhost.com:80 -u 1 -r 1
```
being `--host` your host, `-u` the total number of users to simulate and `-r` the spawn rate. 

### 2. Withot web interface
In case you don't want to see the web interface you must add the `--headless` argument between the host and the user to simulate as the exmaple below:
```
locust -f locustfile.py --host http://localhost.com:80 --headless -u 1 -r 1
```
If you want to run the locust load test in a certain time quantity you can add `--run-time` at the end od your command followed by the time you want to run it.
```
locust -f locustfile.py --host http://localhost.com:80 --headless -u 1 -r 1 --run-time 1m
```
The run time must be specified by a number followed by `h` in case of hours, `m` in case of minutes and `s` in case of seconds necessarily in that order without typing spaces between them.

If you set the run time I recommend you to set the `--stop-timeout` argument because at the end of the run time locust will cut every request process and with this argument you are telling to locust to wait *n* number of seconds until the simulated user complete any executing task before exiting.
```
locust -f locustfile.py --host http://localhost.com:80 --headless -u 1 -r 1 --run-time 1m --stop-timeout 30
```

At the end of your command you must add `--exit-code-on-error 1` (as in the example below) to sets the process exit code to use when a test result contain any failure or error.
```
locust -f locustfile.py --host http://localhost.com:80 --headless -u 1 -r 1 --run-time 1m --stop-timeout 30 --exit-code-on-error 1
```
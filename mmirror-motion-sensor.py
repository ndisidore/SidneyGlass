# PRE-RUN SETUP
#   sudo apt-get update
#   sudo apt-get install python-dev python-pip
#   -- Reinstall python with subprocess module by doing python2.7-minimal --
#   sudo apt-get install --reinstall python2.7-minimal
#   sudo pip install --upgrade distribute
#   sudo pip install ipython
#   sudo pip install --upgrade RPi.GPIO

# RESOURCES
# Tutorial: http://raspberry.io/projects/view/reading-and-writing-from-gpio-ports-from-python/
#      AND: http://pimylifeup.com/raspberry-pi-motion-sensor/
#      AND: http://www.raspberrypi-spy.co.uk/2013/02/cheap-pir-sensors-and-the-raspberry-pi-part-2/

# Package import
import RPi.GPIO as GPIO
import time
import subprocess

# VARIABLES
HDMI_ON = True          # State of the HDMI output
SCREEN_TIMEOUT = 10     # Time between last motion detected and screen off (in s)
PIR_PIN = 7             # PIR GPIO Signal Pin (Default GPIO7/PIN26)
SLEEP_TIME = 150        # Sleep interval (in ms)
LOST_TIME = 0           # Last time we lost the motion detection
BOUNCE_TIME = 100       # Software debouncing time (in ms)

# PIN SETUP
GPIO.setmode(GPIO.BCM)  # Use BCM GPIO references
GPIO.setup(PIR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

###############################
# FUNCTIONS / CALLBACKS
###############################
# GPIO change event
def PIR_EVENT(channel):
    global PIR_PIN
    # Read PIR state
    current_state = GPIO.input(PIR_PIN)
    if current_state == 1:
        # Pin switched HIGH, motion detected
        MOTION_DETECTED()
    else:
        # Pin switched LOW, motion lost
        NO_MOTION_DETECTED()

# Motion detected
def MOTION_DETECTED():
    global HDMI_ON
    global LOST_TIME
    if HDMI_ON == False:
        # Turn on the screen
        do_monitor_on()
        HDMI_ON = True
    # Reset timeout counter
    LOST_TIME = 0

# Motion detection loss
def NO_MOTION_DETECTED():
    global HDMI_ON
    global LOST_TIME
    if HDMI_ON == True:
        LOST_TIME = time.time()

# Check times and see if need to turn screen off
def check_off_time():
    global HDMI_ON
    global LOST_TIME
    global SCREEN_TIMEOUT
    if HDMI_ON == True and LOST_TIME > 0:
        elapsed_time = int(time.time() - LOST_TIME)
        if elapsed_time > SCREEN_TIMEOUT:
            # If timeout threshold reached, turn off screen
            return_code = subprocess.call("sudo tvservice --off", shell=True)
            HDMI_ON = False
            LOST_TIME = 0

# Terminal commands to run to turn screen on
def do_monitor_on():
    subprocess.call("sudo tvservice --preferred", shell=True)
    subprocess.call("sudo chvt 9", shell=True)
    subprocess.call("sudo chvt 7", shell=True)

# Check the monitor status
def check_monitor_status():
    global HDMI_ON
    # Get current state by calling down to the system
    tv_status = subprocess.Popen('sudo tvservice -s'.split(), stdout=subprocess.PIPE)
    tv_status_str = tv_status.communicate()[0]
    is_off = tv_status_str.find('off')
    if is_off > 0:
        HDMI_ON = False
    else:
        HDMI_ON = True

###############################
# MAIN PROGRAM
###############################
GPIO.add_event_detect(PIR_PIN, GPIO.BOTH, bouncetime=BOUNCE_TIME)

try:
    # Check the current monitor status
    check_monitor_status()
    # Add event listener callbacks
    GPIO.add_event_callback(PIR_PIN, PIR_EVENT)

    # Do listen loop
    while 1:
        # Sleep SLEEP_TIME(ms)
        time.sleep(SLEEP_TIME/1000)
        check_off_time()

except KeyboardInterrupt:
    print 'Quit'

finally:
    # Cleanup our mess
    GPIO.cleanup()

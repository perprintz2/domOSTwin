import json
import random
import time
import paho.mqtt.client as MQTT

broker = "deis-mqtt01.cs.aau.dk"
tempData = {"apartmentID": 2495,
            "LocationId": 2495,
            "Time": 1.656574220434E+12,
            "Rooms": {"Room1": {"temperatureODE": 24.824338313489228},
                      }}


client = MQTT.Client("IoTsim")

def sendData(temp):
    client.connect(broker)              # connect
    # client.loop_start() #start the loop
   

    tempData["Time"] = int(round(time.time() * 1000))
    tempData["Rooms"]["Room1"]["temperatureODE"] = temp
    client.publish("domOS/2495/HouseModel", json.dumps(tempData))

 

sendData(22.0)


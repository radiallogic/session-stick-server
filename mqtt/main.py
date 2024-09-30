import paho.mqtt.client as mqtt
import pymongo
from datetime import datetime

def process_message(message):
    b'333.37,93.43,93.43,15:46:39+08,3527,16,2,27.73,50.53'
    str = message.payload.decode('utf-8')
    print(str) 
    array = str.split(',')

    dict = {
        "heading": array[0],
        "average_speed": array[1],
        "gust_speed": array[2],
        "time": datetime.strptime( array[3], "%H:%M:%S%z"),
        "battery_voltage":array[4],
        "battery_percent": array[5],
        "modem_signal_quality": array[6],
        "temp": array[7],
        "humidity": array[8],
        }
    return dict

def write_message(dict):
    db.mqtt_messages.insert_one(dict)

def on_subscribe(client, userdata, mid, reason_code_list, properties):
    # Since we subscribed only for a single channel, reason_code_list contains
    # a single entry
    if reason_code_list[0].is_failure:
        print(f"Broker rejected you subscription: {reason_code_list[0]}")
    else:
        print(f"Broker granted the following QoS: {reason_code_list[0].value}")

def on_unsubscribe(client, userdata, mid, reason_code_list, properties):
    # Be careful, the reason_code_list is only present in MQTTv5.
    # In MQTTv3 it will always be empty
    if len(reason_code_list) == 0 or not reason_code_list[0].is_failure:
        print("unsubscribe succeeded (if SUBACK is received in MQTTv3 it success)")
    else:
        print(f"Broker replied with failure: {reason_code_list[0]}")
    client.disconnect()

def on_message(client, userdata, message):
    msg_array  = process_message(message)
    write_message(msg_array)
    print(msg_array)

def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code.is_failure:
        print(f"Failed to connect: {reason_code}. loop_forever() will retry connection")
    else:
        # we should always subscribe from on_connect callback to be sure
        # our subscribed is persisted across reconnections.
        client.subscribe(channel)


mongo_client = pymongo.MongoClient("stick-mongodb", 27017)
db = mongo_client.testdb
collection = db.mqtt_messages

server = 'mqtt.eclipseprojects.io';
channel = 'SessionStickTest/stick1/things/stickID1/combineddata/0'; 

mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe
mqttc.on_unsubscribe = on_unsubscribe

mqttc.user_data_set([])
mqttc.connect(server)
mqttc.loop_forever()
#print(f"Received the following message: {mqttc.user_data_get()}")


x=3

if (x == 3)
{
  print("kjAGDS")
}

fff<-function()
{
  print("agkjdsgfgdsakjh")
}
fff2<-function()
{
  print("agkjdsgfgdsakjh")
}

rmqtt::mqtt_topic_publish( topic = 'ppmtst/demo1', 
                           message_to_send = "Hallo MQTT.",
                           host = "deis-mqtt01.cs.aau.dk",
                           port = 1883,
                           username = "Midtvask",
                           password = "Xtel#PW1")


timeST<- as.numeric(Sys.time())*1000

data<- '{""address"":""Ravnkildevej13"",
""time"":234152,
""livingRoom"":{
  ""temperature"":21.9,
  ""estimated"":true},
""kitchen"":{
  ""temperature"": 21.9,
  ""estimated"":  true},
""bedRoom1"": {
  ""temperature"": 21.9,
  ""estimated"":  true},
""Room1"":{
  ""temperature"":21.9,
  ""estimated"":true},
""Room2"": {
  ""temperature"": 21.9,
  ""estimated"":  true},
""shower"": {
  ""temperature"": 21.9,
  ""estimated"":  true}
}'

rmqtt::mqtt_topic_publish( topic = 'domOS/Ravnkildevej13/HouseModel',
                           message_to_send = data,
                           host = "deis-mqtt01.cs.aau.dk")
Sys.time()


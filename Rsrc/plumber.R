# plumber.R
# plumber::plumb(file='plumber.R')$run(port=8085)


#* @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg="") {
  list(msg = paste0("The message is: ", msg))
}

#* Plot a histogram
#* @serializer png
#* @get /plot
function() {
  rand <- rnorm(100)
  hist(rand)
}

#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @post /sum
function(a, b) {
list(a,b,as.numeric(a) + as.numeric(b),matrix(c(3:14), nrow = 4, byrow = TRUE))
}


#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @serializer json
#* @post /sum2
function(a, b) {
  as.numeric(a) + as.numeric(b)
}

#* Return a list with the next tepmeratures
#* @param t1 Room1 temp8085
#* @param t2 Room2 temp
#* @param t4 Room4 temp
#* @param tKitchen RoomKitchen temp
#* @param tCorridor RoomCorridor temp
#* @param tInlet InLet temp
#* @param tOutlet OutLet temp
#* @param fInlet InLet flow
#* @serializer json
#* @get /EnergyRoad1Sim
function(t1,t2,t4,tKitchen,tCorridor, tInlet, tOutlet, fInlet) {
 a<-list(1,2,3,4,5)
 w= as.numeric(t2) + as.numeric(t4)
 #list(t1,t2,t4,tKitchen,tCorridor, tInlet, tOutlet, fInlet) 
 #f1tst(a)
}
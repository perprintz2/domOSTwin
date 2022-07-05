# plumber.R
# xstart <- c(Ti=2.9215e+02,Th=2.9545e+02,Te=2.9508e+02)
# library(deSolve)
# library(tidyverse)
# plumber::plumb(file='C:/Users/SZ33IZ/OneDrive - Aalborg Universitet/Dokumenter/Demos/domOS/Rsrc/DTsim.R')$run(port=8085)


#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods", "*")
    res$setHeader("Access-Control-Allow-Headers",
                  req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
  
}
OneRoom.model <- function (t, x, params) {
  ## first extract the state variables
  Ti <- x[1]
  Th <- x[2]
  Te <- x[3]
  ## now extract the parameters
  Rih <- params["Rih"]
  Rie <- params["Rie"]
  Aw <- params["Aw"]
  Ch <- params["Ch"]
  Mf <- params["Mf"]
  Ce <- params["Ce"]
  Qsun4 <- params["Qsun4"]
  Tdiff4 <- params["Tdiff4"]
  massflow4 <- params["massflow4"]
  Tambient <- params["Tambient"]
  Troom1 <- params["Troom1"]
  Troom3 <- params["Troom3"]
  Rea30 <- params["Rea30"]
  Rea32 <- params["Rea32"]
  Rea34 <- params["Rea34"]
  ## now code the model equations
  dTidt <- Rih * (Th - Ti) + Rie * (Te - Ti) + Aw * Qsun4
  dThdt <- (Rih / Ch) * (Ti - Th) + Mf * (Tdiff4 * massflow4)
  dTedt <-
    (Rie / Ce) * (Ti - Te) + Rea30 * (Tambient - Te) + Rea32 * (Troom1 - Te) + Rea34 *
    (Troom3 - Te)
  ## combine results into a single vector
  dxdt <- c(dTidt, dThdt, dTedt)
  ## return result as a list!
  list(dxdt)
}


#* Return a list with the next tepmeratures
#* @param t1 Room1 temp8085
#* @param t2 Room2 temp
#* @param t4 Room4 temp
#* @param tKitchen RoomKitchen temp
#* @param tCorridor RoomCorridor temp
#* @param tInlet InLet temp
#* @param tOutlet OutLet temp
#* @param fInlet IndLet flow
#* @param outTemp Outside temp
#* @param outRad Sum radiation
#* @serializer json
#* @get /EnergyRoad1Sim
function(t1,
         t2,
         t4,
         tKitchen,
         tCorridor,
         tInlet,
         tOutlet,
         fInlet,
         outTemp,
         outRad) {
  print(.GlobalEnv$xstart)
  HouseArea = 20
  parms <-
    c(
      Rih = 2.6110e+00,
      Rie = 1.2048e+00,
      Aw = 8.5950e-03,
      Ch = 3.0574e+00,
      Mf = 1.7252e+01,
      Ce = 1.0343e+02,
      Rea30 = 8.0429e+00,
      Rea32 = 2.1611e+00,
      Rea34 = 1.7462e+01,
      Qsun4 = as.numeric(outRad) * HouseArea,
      Tdiff4 = as.numeric(tInlet) - as.numeric(tOutlet),
      massflow4 = as.numeric(fInlet) / 8,
      Tambient = as.numeric(outTemp) + 273.15,
      Troom1 = as.numeric(t2) + 273.15,
      Troom3 = as.numeric(tCorridor) + 273.15
    )
  times <- seq(from = 0, to = 5, by = 1)
  .GlobalEnv$xstart["Ti"]= as.numeric(t1)+273.15
  
  
 
  ode(
    func = OneRoom.model,
    y = .GlobalEnv$xstart,
    times = times,
    parms = parms
  ) %>%
    as.data.frame() -> out
  print(out)
  print(parms)
  a <- out["Ti"]
  
  .GlobalEnv$xstart["Th"]= out[1, "Th"]
  .GlobalEnv$xstart["Te"]= out[1, "Te"]
  
  print(.GlobalEnv$xstart)
  return(a)
}
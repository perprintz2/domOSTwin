library(deSolve)
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
  dTidt <- Rih*(Th-Ti) + Rie*(Te-Ti) + Aw*Qsun4 
  dThdt <- (Rih/Ch)*(Ti-Th) + Mf*(Tdiff4*massflow4) 
  dTedt <- (Rie/Ce)*(Ti-Te) + Rea30*(Tambient-Te) + Rea32*(Troom1-Te) + Rea34*(Troom3-Te)
  ## combine results into a single vector
  dxdt <- c(dTidt,dThdt,dTedt)
  ## return result as a list!
  list(dxdt)
}
parms <- c(Rih=2.6110e+00,Rie=1.2048e+00,Aw=8.5950e-03,Ch=3.0574e+00,Mf=1.7252e+01,Ce=1.0343e+02,
Rea30=8.0429e+00,Rea32=2.1611e+00,Rea34=1.7462e+01,
Qsun4=0,Tdiff4=3.96418,massflow4=0.04202331,Tambient=273.55,Troom1=292.15,Troom3=292.15 )
times <- seq(from=0,to=30,by=1)
xstart <- c(Ti=2.9215e+02,Th=2.9545e+02,Te=2.9508e+02)

library(tidyverse)
ode(
  func=OneRoom.model,
  y=xstart,
  times=times,
  parms=parms
) %>%
  as.data.frame() -> out
xstart <- c(Ti=out[6,"Ti"],Th=out[6,"Th"],Te=out[6,"Te"])


out %>%
  gather(variable,value,-time) %>%
  ggplot(aes(x=time,y=value,color=variable))+
  geom_line(size=2)+
  theme_classic()+
  labs(x='Time (Seconds)',y='Temperature (K)')

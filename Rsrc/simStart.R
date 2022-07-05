xstart <- c(Ti=2.9215e+02,Th=2.9545e+02,Te=2.9508e+02)
oldtime= as.numeric(Sys.time())-300
library(deSolve)
library(tidyverse)
library(reticulate)
library(httr, lib.loc = "/usr/lib/R/site-library")
#source_python('/home/ppm/Documents/demos/domOS/Rsrc/Python/ODESaver.py')
plumber::plumb(file='/home/ppm/Documents/demos/domOS/Rsrc/DTsim.R')$run(host='172.25.12.11', port=8085)



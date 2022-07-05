## Init by deleting all variables and functions
rm(list=ls())

## Set the working directory
setwd("C:/Users/SZ33IZ/OneDrive - Aalborg Universitet/Dokumenter/Demos/domOS/Rsrc/CTSM Room 1-Living Room/CTSM Room 1-Living Room")

## Use the CTSM-R package, note that first the package must be installed, 
## see the Installation section in the CTSM-R Userguide
library(ctsmr)

## List with global parameters
prm <- list()

## Number of threads used by CTSM-R for the estimation computations
prm$threads <- 4

## Source the scripts with functions in the "functions" folder
## Just a neat way of arranging helping functions in R
files <- dir("functions", full.names=TRUE)
for(i in 1:length(files)) source(files[i])

## Read the data into a data.frame
X <- read.csv("data DT.csv", sep=",", header=TRUE)

## Set the names of the columns in X
## X$t is now hours since start of the experiment
## Create a column in the POSIXct format for plotting etc.
X$timedate <- asP("2009-02-05 14:26:00)") + X$Time
X$t <- X$Time / 3600
X$Tdiff <- X$Tforward-X$Treturn
X <- subset(X, Time <= 60*60*24*4)

## Fit the TiThTe model, see "functions/TiThTe.R"
roomModel <- TiThTe(X)
tmp <- simulate(roomModel, X.frame)[[1]]
X$Th1 <- tmp$state$sim$Th
X$Ti1 <- tmp$state$sim$Ti
plot(X$timedate, X$Th1, type='l', xlab='', ylab='Th3')
lines(X$timedate, X$Tfloormid1, type='l', xlab='', ylab='Tfloor')

analyzeFitSim(roomModel, plotACF=FALSE, plotSeries=FALSE, newdev=FALSE)

## Analyze the fit, just the summary
analyzeFit(roomModel, plotACF=FALSE, plotSeries=FALSE, newdev=FALSE)

## Analyze the fit, just the ACF and cpgram
analyzeFitSim(roomModel, plotSeries=FALSE, newdev=FALSE)

## Analyze the fit, just the time series plot
analyzeFitSim(roomModel, plotACF=FALSE, newdev=FALSE)


##Write the final predicted indoor temperature into CSV format
write.table(X$yTi, file="Ti1Hat.csv", sep=",")
print(Dat$residuals)
setwd("C:/Users/SZ33IZ/OneDrive - Aalborg Universitet/Dokumenter/Demos/domOS/Rsrc")
save(roomModel, file = "roomModel.rda")

analyzeFit <- function(fit, tPer=NA, plotACF=TRUE, plotSeries=TRUE, newdev=TRUE)
  {
    ## Take out the model,fit, and data from the list modelAndFit
    model <- fit$model
    Dat   <- fit$data[[1]]

    ## See the summary of the estimation result
    print(summary(fit,extended=TRUE))

    ##----------------------------------------------------------------
    ## Calculate the one-step predictions of the state (i.e. the residuals)
    tmp <- predict(fit)[[1]]

    ## Calculate the residuals and put them with the data in a data.frame X
    Dat$residuals <- Dat$Tlivingroom - tmp$output$pred$Tlivingroom
    Dat$yTiHat <- tmp$output$pred$Tlivingroom
    
    ## CTSM-R only keeps the data required for the fit. Get the timedate from X in the parent frame.
    Dat$timedate <- get("X", env=parent.frame())$timedate

    ## Cut out a period if specified
    if(is.na(tPer[1])) 
      X <- Dat
    else
      X <- Dat[per(tPer[1],Dat$timedate,tPer[2]),]
    ##----------------------------------------------------------------
    
    if(plotACF)
      {
        ##----------------------------------------------------------------
        ## Plot the auto-correlation function and cumulated periodogram
        ## Open a new plot window?
        if(newdev) dev.new()
        ##
        par(mfrow=c(1,3))
        ## The blue lines indicates the 95% confidence interval, meaning that if it is
        ##  white noise, then approximately 19 out of 20 lag correlations will be inside.
        acf(Dat$residuals, lag.max=8*24, main="ACF of residuals")
        title(main=as.character(match.call())[2],line=-2,cex.main=2)
        ## The periodogram is the estimated energy spectrum in the signal
        spec.pgram(Dat$residuals, main="Raw periodogram")
        ## The cumulated periodogram 
        cpgram(Dat$residuals, main="Cumulated periodogram")
        ##----------------------------------------------------------------
      }

    if(plotSeries)
      {
        ##----------------------------------------------------------------
        ## Time series plots of the inputs and residuals
        ## A new plotting window?
        if(newdev) dev.new()
        ## Plot the time series (see "functions/plotTSBeg.R" to see the plot setup function)
        plotTSBeg(5)
        gridSeq <- seq(asP("2009-01-01"),by="days",len=365)
        ## 
        plot(X$timedate,X$residuals,ylab="Residuals ($^{\\circ}$C)",type="n",xlab="",yaxt="n")
        axis(2,pretty(scalerange(X$residuals,0.2)))
        abline(v=gridSeq,h=0,col="grey92")
        lines(X$timedate,X$residuals)
        ##
        plot(X$timedate,X$Tlivingroom,ylim=range(X[,c("yTi","yTiHat")]),type="n",xlab="",ylab="yTi, yTiHat ($^{\\circ}$C)",yaxt="n")
        axis(2,pretty(scalerange(X[,c("yTi","yTiHat")],0.2)))
        abline(v=gridSeq,h=0,col="grey85",lty=3)
        lines(X$timedate,X$Tlivingroom)
        lines(X$timedate,X$yTiHat,col=2)
        legend("bottomright",c("Measured","Predicted"),lty=1,col=1:2,bg="grey95")
        ## 
        plot(X$timedate,X$yTiHat,ylab="yTiHat ($^{\\circ}$C)",type="n",xlab="",yaxt="n")
        axis(2,pretty(scalerange(X$yTiHat,0.2)))
        abline(v=gridSeq,h=0,col="grey92")
        lines(X$timedate,X$yTiHat)
        ##
        plotTSXAxis(X$timedate,format="%Y-%m-%d")
      }
    
    ##----------------------------------------------------------------
    ## Calculate the loglikelihood value
    print(paste("Loglikelihood", fit$loglik))
    write.table(X$yTiHat, file="TiHat.csv", sep=",")
    ##----------------------------------------------------------------

    invisible(Dat$residuals)
  }


analyzeFitSim <- function(fit, tPer=NA, plotACF=TRUE, plotSeries=TRUE, newdev=TRUE)
{
  ## Take out the model,fit, and data from the list modelAndFit
  model <- fit$model
  Dat   <- fit$data[[1]]
  
  ## See the summary of the estimation result
  print(summary(fit,extended=TRUE))
  
  ##----------------------------------------------------------------
  ## Calculate the one-step predictions of the state (i.e. the residuals)
  tmp <- simulate(fit, Dat.frame)[[1]]
  
  ## Calculate the residuals and put them with the data in a data.frame X
  Dat$residuals <- Dat$Tlivingroom - tmp$output$sim$Tlivingroom

  Dat$yTiHat <- tmp$output$sim$Tlivingroom
  
  ## CTSM-R only keeps the data required for the fit. Get the timedate from X in the parent frame.
  Dat$timedate <- get("X", env=parent.frame())$timedate
  
  ## Cut out a period if specified
  if(is.na(tPer[1])) 
    X <- Dat
  else
    X <- Dat[per(tPer[1],Dat$timedate,tPer[2]),]
  ##----------------------------------------------------------------
  
  if(plotACF)
  {
    ##----------------------------------------------------------------
    ## Plot the auto-correlation function and cumulated periodogram
    ## Open a new plot window?
    if(newdev) dev.new()
    ##
    par(mfrow=c(1,3))
    ## The blue lines indicates the 95% confidence interval, meaning that if it is
    ##  white noise, then approximately 19 out of 20 lag correlations will be inside.
    acf(Dat$residuals, lag.max=8*24, main="ACF of residuals")
    title(main=as.character(match.call())[2],line=-2,cex.main=2)
    ## The periodogram is the estimated energy spectrum in the signal
    spec.pgram(Dat$residuals, main="Raw periodogram")
    ## The cumulated periodogram 
    cpgram(Dat$residuals, main="Cumulated periodogram")
    ##----------------------------------------------------------------
  }
  
  if(plotSeries)
  {
    ##----------------------------------------------------------------
    ## Time series plots of the inputs and residuals
    ## A new plotting window?
    if(newdev) dev.new()
    ## Plot the time series (see "functions/plotTSBeg.R" to see the plot setup function)
    plotTSBeg(5)
    gridSeq <- seq(asP("2009-01-01"),by="days",len=365)
    ## 
    plot(X$timedate,X$residuals,ylab="Residuals ($^{\\circ}$C)",type="n",xlab="",yaxt="n")
    axis(2,pretty(scalerange(X$residuals,0.2)))
    abline(v=gridSeq,h=0,col="grey92")
    lines(X$timedate,X$residuals)
    ##
    plot(X$timedate,X$Tlivingroom,ylim=range(X[,c("Tlivingroom","yTiHat")]),
         type="n",xlab="",ylab="yTi, yTiHat ($^{\\circ}$C)",yaxt="n")
    axis(2,pretty(scalerange(X[,c("Tlivingroom","yTiHat")],0.2)))
    abline(v=gridSeq,h=0,col="grey85",lty=3)
    lines(X$timedate,X$Tlivingroom)
    lines(X$timedate,X$yTiHat,col=2)
    legend("bottomright",c("Measured","Predicted"),lty=1,col=1:2,bg="grey95")
    ## 
    plot(X$timedate,X$yTiHat,ylab="yTiHat ($^{\\circ}$C)",type="n",xlab="",yaxt="n")
    axis(2,pretty(scalerange(X$yTiHat,0.2)))
    abline(v=gridSeq,h=0,col="grey92")
    lines(X$timedate,X$yTiHat)
    ##
    plotTSXAxis(X$timedate,format="%Y-%m-%d")
  }
  
  ##----------------------------------------------------------------
  ## Calculate the loglikelihood value
  print(paste("Loglikelihood", fit$loglik))
  write.table(X$yTiHat, file="TiHat.csv", sep=",")
  ##----------------------------------------------------------------
  
  invisible(Dat$residuals)
}



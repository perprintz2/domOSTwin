TiTe <- function(Dat)
  {
    ## Generate a new object of class ctsm
    model <- ctsm$new()
    ## Add a system equation and thereby also a state
    model$addSystem(dTi ~ ((1/Ci)*((1/Rie30)+(1/Rie32)+(1/Rie34))*(Te-Ti) + Aw/Ci*Ps + 1/Ci*Ph + 1/Ci*Pres)*dt + exp(p11)*dw1)
    model$addSystem(dTe ~ (((1/(Ce30*Rie30))+(1/(Ce32*Rie32))+(1/(Ce34*Rie34)))*(Ti-Te)+((Ta0-Te)/(Ce30*Rea30))+((Ta2-Te)/(Ce32*Rea32))+((Ta4-Te)/(Ce34*Rea34)))*dt + exp(p22)*dw2)

    ## Set the names of the inputs
    model$addInput(Ta0, Ta2, Ta4, Ps, Ph, Pres)

    ## Set the observation equation: Ti is the state, yTi is the measured output
    model$addObs(yTi ~ Ti)
    ## Set the variance of the measurement error
    model$setVariance(yTi ~ exp(e11))

    ## Set the initial value (for the optimization) of the states at the init time point
    model$setParameter(  Ti = c(init=15  ,lb=0     ,ub=25) )
    model$setParameter(  Te = c(init=5   ,lb=-20   ,ub=25) )
    ## Set the initial value of the parameters for the optimization
    model$setParameter(  Ci = c(init=1   ,lb=1E-5  ,ub=20) )
    model$setParameter(  Ce30 = c(init=2   ,lb=1E-5  ,ub=20) )
    model$setParameter(  Ce32 = c(init=2   ,lb=1E-5  ,ub=20) )
    model$setParameter(  Ce34 = c(init=2   ,lb=1E-5  ,ub=20) )
    model$setParameter( Rie30 = c(init=10  ,lb=1E-5  ,ub=50) )
    model$setParameter( Rie32 = c(init=10  ,lb=1E-5  ,ub=50) )
    model$setParameter( Rie34 = c(init=10  ,lb=1E-5  ,ub=50) )
    model$setParameter( Rea30 = c(init=10  ,lb=1E-5  ,ub=50) )
    model$setParameter( Rea32 = c(init=10  ,lb=1E-5  ,ub=50) )
    model$setParameter( Rea34 = c(init=10  ,lb=1E-5  ,ub=50) )
    model$setParameter(  Aw = c(init=20  ,lb=0.1   ,ub=200))
    model$setParameter( p11 = c(init=1   ,lb=-50   ,ub=10) )
    model$setParameter( p22 = c(init=1   ,lb=-50   ,ub=10) )
    model$setParameter( e11 = c(init=-1  ,lb=-50   ,ub=10) )

    ## Run the parameter optimization
    fit <- model$estimate(Dat,threads=prm$threads)

    ## Replace the data to have all series available for analysis
    fit$data[[1]] <- Dat
    ## Return the fit
    return(fit)
  }

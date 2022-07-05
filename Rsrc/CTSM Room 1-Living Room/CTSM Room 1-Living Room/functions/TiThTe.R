TiThTe <- function(Dat)
{
  ## Generate a new object of class ctsm
  model <- ctsm$new()
  ## Add a system equation and thereby also a state
  model$addSystem(dTi ~ (   (Rih/1)*(Th-Ti) + 
                              (Rie/1)*(Te-Ti)  
                              #                              (Rie32/1)*(Te2-Ti) + 
                              #                              (Rie34/1)*(Te4-Ti) + 
                              #Aw*Qsun1
                               )*dt + exp(p11)*dw1 )
  
  model$addSystem(dTh ~ ( # Th = floor temperature
    (Rih/Ch)*(Ti-Th) +  # heat from floor to room
      Mf*(Tdiff*massflow) # energy from pipes to floor.
  )*dt + exp(p22)*dw2 )
  
  model$addSystem(dTe ~ ( (Rie/Ce)*(Ti-Te) + 
                            Rea10*(Tambient-Te) +
                           Rea12*(Tbedroom-Te) 
                           # +Rea14*(Troom4-Te)
  )*dt + exp(p33)*dw3 )
  
  #    model$addSystem(dTe2 ~ ( (Rie32/Ce32)*(Ti-Te2) + 
  #                              Rea32*(Troom2-Te2)
  #    )*dt + exp(p44)*dw4 )
  
  #    model$addSystem(dTe4 ~ ( (Rie34/Ce34)*(Ti-Te4) + 
  #                              Rea34*(Troom4-Te4)
  #    )*dt + exp(p55)*dw5 )
  
  ## Set the names of the inputs
  model$addInput(Tambient, Tbedroom, massflow, Tdiff)
  ## Set the observation equation: Ti is the state, yTi is the measured output
  model$addObs(Tlivingroom ~ Ti)
  ## Set the variance of the measurement error
  model$setVariance(Tlivingroom ~ exp(e11))
  ## Set the initial value (for the optimization) of the value of the state at the starting time point
  model$setParameter(  Ti = c(init=2.9215e+02  ,lb=250   ,ub=310) )
  model$setParameter(  Th = c(init=2.9295e+02  ,lb=250   ,ub=310) )
  model$setParameter(  Te = c(init=2.9299e+02  ,lb=250   ,ub=310) )
  #   model$setParameter(  Te2 = c(init=2.9397e+02  ,lb=250   ,ub=310) )
  #    model$setParameter(  Te4 = c(init=2.9115e+02  ,lb=250   ,ub=310) )
  #model$setParameter( Aw =  c(init=1  ,lb=0  ,ub=300))
  model$setParameter(  Ce = c(init=4.3489e+01  ,lb=0  ,ub=300))
  model$setParameter(  Ch = c(init=2.1768e+01   ,lb=0  ,ub=100) )
  #model$setParameter(  Ci = c(init=4.2651e+01,lb=-10  ,ub=100) )
  model$setParameter( e11 = c(init=0  ,lb=-100   ,ub=100) )
  model$setParameter( Mf =  c(init=1  ,lb=0  ,ub=300))
  model$setParameter( p11 = c(init=0   ,lb=-100   ,ub=100) )
  model$setParameter( p22 = c(init=0  ,lb=-100   ,ub=100) )
  model$setParameter( p33 = c(init=0   ,lb=-100   ,ub=100) )
  model$setParameter( Pr =  c(init=1  ,lb=-10  ,ub=300))
  ## Set the initial value for the optimization
  
  
  
  #    model$setParameter(  Ce34 = c(init=2.9612e+02  ,lb=0  ,ub=300))   
  #    model$setParameter(  Ce32 = c(init=1.1649e+02  ,lb=0  ,ub=300))    
  model$setParameter( Rea10 = c(init=1.6056e+00  ,lb=0  ,ub=1E3))
  model$setParameter( Rea12 = c(init=1.2544e-02  ,lb=0  ,ub=1E3))
  #model$setParameter( Rea14 = c(init=2.6387e+01  ,lb=0  ,ub=1E3))
  model$setParameter( Rie = c(init=4.1218e+00   ,lb=0  ,ub=100))
  model$setParameter( Rih = c(init=4.1218e+00  ,lb=0  ,ub=1E3))
  #    model$setParameter( Rie34 = c(init=5.0251e+00   ,lb=0  ,ub=100))
  #    model$setParameter( Rie32 = c(init=1.4958e-01  ,lb=0  ,ub=100))
  
  
  #    model$setParameter( p44 = c(init=0   ,lb=-100   ,ub=100) )
  #    model$setParameter( p55 = c(init=0   ,lb=-100   ,ub=100) )
  
  
  ## Run the parameter optimization
  fit <- model$estimate(Dat, threads = prm$threads)
  ## Replace the data to have all series available for analysis
  fit$data[[1]] <- Dat
  ## Return the model, the fit, and the data
  return(fit)
}

TiThTe2 <- function(Dat)
{
  ## Generate a new object of class ctsm
  model <- ctsm$new()
  ## Add a system equation and thereby also a state
  model$addSystem(dTi ~ (   (Rih/1)*(Th-Ti) + 
                              (Rie/1)*(Te-Ti) + 
                              #                              (Rie32/1)*(Te2-Ti) + 
                              #                              (Rie34/1)*(Te4-Ti) + 
                              Aw*Qsun1  
                           )*dt + exp(p11)*dw1 )
  
  model$addSystem(dTh ~ ( # Th = floor temperature
    (Rih/Ch)*(Ti-Th) +  # heat from floor to room
      Mf*((Tforward - Th)*massflow1) # energy from pipes to floor.
  )*dt + exp(p22)*dw2 )
  
  model$addSystem(dTe ~ ( (Rie/Ce)*(Ti-Te) + 
                            Rea30*(Tambient-Te) +
                            Rea32*(Troom2-Te) +
                            Rea34*(Troom4-Te)
  )*dt + exp(p33)*dw3 )
  
  #    model$addSystem(dTe2 ~ ( (Rie32/Ce32)*(Ti-Te2) + 
  #                              Rea32*(Troom2-Te2)
  #    )*dt + exp(p44)*dw4 )
  
  #    model$addSystem(dTe4 ~ ( (Rie34/Ce34)*(Ti-Te4) + 
  #                              Rea34*(Troom4-Te4)
  #    )*dt + exp(p55)*dw5 )
  
  ## Set the names of the inputs
  model$addInput(Tambient, Troom2, Troom4, massflow1, Tforward, Qsun1)
  ## Set the observation equation: Ti is the state, yTi is the measured output
  model$addObs(Troom1 ~ Ti)
  ## Set the variance of the measurement error
  model$setVariance(Troom1 ~ exp(e11))
  ## Set the initial value (for the optimization) of the value of the state at the starting time point
  model$setParameter(  Ti = c(init=2.9215e+02  ,lb=250   ,ub=310) )
  model$setParameter(  Th = c(init=2.9295e+02  ,lb=250   ,ub=310) )
  model$setParameter(  Te = c(init=2.9299e+02  ,lb=250   ,ub=310) )
  #    model$setParameter(  Te2 = c(init=2.9397e+02  ,lb=250   ,ub=310) )
  #    model$setParameter(  Te4 = c(init=2.9115e+02  ,lb=250   ,ub=310) )
  model$setParameter( Aw =  c(init=1  ,lb=0  ,ub=300))
  model$setParameter(  Ce = c(init=4.3489e+01  ,lb=0  ,ub=300))
  model$setParameter(  Ch = c(init=2.1768e+01   ,lb=0  ,ub=100) )
  #model$setParameter(  Ci = c(init=4.2651e+01,lb=-10  ,ub=100) )
  model$setParameter( e11 = c(init=0  ,lb=-100   ,ub=100) )
  model$setParameter( Mf =  c(init=1  ,lb=0  ,ub=300))
  model$setParameter( p11 = c(init=0   ,lb=-100   ,ub=100) )
  model$setParameter( p22 = c(init=0  ,lb=-100   ,ub=100) )
  model$setParameter( p33 = c(init=0   ,lb=-100   ,ub=100) )
  model$setParameter( Pr =  c(init=1  ,lb=-10  ,ub=300))
  ## Set the initial value for the optimization
  
  
  
  #    model$setParameter(  Ce34 = c(init=2.9612e+02  ,lb=0  ,ub=300))   
  #    model$setParameter(  Ce32 = c(init=1.1649e+02  ,lb=0  ,ub=300))    
  model$setParameter( Rea30 = c(init=1.6056e+00  ,lb=0  ,ub=1E3))
  model$setParameter( Rea32 = c(init=1.2544e-02  ,lb=0  ,ub=1E3))
  model$setParameter( Rea34 = c(init=2.6387e+01  ,lb=0  ,ub=1E3))
  model$setParameter( Rie = c(init=4.1218e+00   ,lb=0  ,ub=100))
  model$setParameter( Rih = c(init=4.1218e+00  ,lb=0  ,ub=1E3))
  #    model$setParameter( Rie34 = c(init=5.0251e+00   ,lb=0  ,ub=100))
  #    model$setParameter( Rie32 = c(init=1.4958e-01  ,lb=0  ,ub=100))
  
  
  #    model$setParameter( p44 = c(init=0   ,lb=-100   ,ub=100) )
  #    model$setParameter( p55 = c(init=0   ,lb=-100   ,ub=100) )
  
  
  ## Run the parameter optimization
  fit <- model$estimate(Dat, threads = prm$threads)
  ## Replace the data to have all series available for analysis
  fit$data[[1]] <- Dat
  ## Return the model, the fit, and the data
  return(fit)
}




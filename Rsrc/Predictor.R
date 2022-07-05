rm(list = ls())
load(file = "model1.rda")


TiAhead <- function(input)
{
  Pred <- predict(roomModel, n.ahead = 1)
  
  return(TiPred)
}

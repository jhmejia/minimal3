## ---------------------------
## Script Name: MM Interactive Plot
## Author: Tomas Miskov
## Date Created: 2022-11-03
## Purpose: Create an Interactive Plot for the MM algorithm
## ---------------------------

#--------
# SET UP |
#--------
rm(list=ls())                                         # clean the environment
if (!require("pacman")) install.packages("pacman")    # install pacman
pacman::p_load(plotly, htmlwidgets)                   # pre-load packages
# source("functions/packages.R")                      # load local libraries

options(scipen = 6, digits = 4)                       # clean numerical notation
# setwd("C:/Users/misko/")                            # set working directory


#-------------------------
# RSS as function of Beta |
#-------------------------
rss <- function(b) {
  return(t(b*x - y) %*% (b*x - y))
}

#---------------------
# Majorizing function |
#---------------------
mm <- function(b, b0, lambda) {
  return(lambda * b * b - 
           2 * lambda * b %*% (b0 - 1/lambda * t(x) %*% x * b0 + 
                                 1/lambda * t(x) %*% y)
         + lambda * b0 * (1 - 1/lambda * t(x) %*% x) * b0 
         + t(y) %*% y)
}

#-------------------
# Data for Plotting |
#-------------------
set.seed(1001001)
x <- seq(0,1, length.out = 1000)
y <- x
lambda <- eigen(t(x)%*%x)$values[1] * 5
betas <- seq(-1, 3, length.out = 1000)

aval <- list()
for(step in 1:21){
  aval[[step]] <-list(visible = FALSE,
                      x = betas,
                      y = mapply(mm, betas, step/21, lambda))
}
aval[1][[1]]$visible = TRUE

#----------------------------------
# Create Steps and Plot All Traces |
#----------------------------------
steps <- list()
rss_y <- mapply(rss, betas)
fig <- plot_ly()
fig <- add_lines(fig, x = betas, y = rss_y, visible = TRUE, name = 'RSS',
                 type = 'scatter', mode = 'lines', hoverinfo = 'name',
                 line = list(color = '457b9d'), showlegend = FALSE)
for (i in 1:21) {
  fig <- add_lines(fig, x = aval[i][[1]]$x,  
                   y = aval[i][[1]]$y, visible = aval[i][[1]]$visible, 
                   name = paste('Beta: ', round(i/21, 2)), type = 'scatter', 
                   mode = 'lines', hoverinfo = 'name', 
                   line = list(color = 'e63946'), showlegend = FALSE)
  
  step <- list(args = list('visible', c(TRUE, rep(FALSE, length(aval)))),
               method = 'restyle', label = i - 1)
  step$args[[2]][i + 1] = TRUE  
  steps[[i]] = step 
}  

#------------
# Add Slider |
#------------
fig <- fig %>%
  layout(sliders = list(list(active = 0,
                             currentvalue = list(prefix = "Step: "),
                             steps = steps)),
         yaxis = list(fixedrange = TRUE, range = c(0, 4000)),
         xaxis = list(fixedrange = TRUE))
fig <- fig %>% config(displayModeBar = FALSE)

saveWidget(fig, 'MM_interactive_plot.html')


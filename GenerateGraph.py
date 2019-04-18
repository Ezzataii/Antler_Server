import numpy as np
import matplotlib
matplotlib.use('Agg')
import os
import matplotlib.pyplot as plt
import sys

def readFileContent(filename):
    file = open(filename,"r")
    content = file.read().split("\n")
    
    xCoords = []
    yCoords = []

    for point in content:
        point = point.split(",")
        xCoords.append(point[0])
        yCoords.append(point[1])
    return (xCoords,yCoords)

csvfilename = sys.argv[1]
nameWithoutExtension = csvfilename.split(".")[0] #subject to variable namechange
pngfilename = nameWithoutExtension + ".png"


x,y = readFileContent('./csv/' + csvfilename)
plt.xlabel(x[0])
plt.ylabel(y[0])
plt.title(nameWithoutExtension)
plt.scatter(x[1:],y[1:])
plt.plot(x[1:],y[1:])
plt.savefig('./graphs/' + pngfilename)
os.remove('./csv/' + csvfilename)
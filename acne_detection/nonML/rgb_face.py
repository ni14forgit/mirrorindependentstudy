import os
import sys
from os import listdir
import shutil
from os.path import join, isfile
from PIL import Image
import random
import base64
from microsoft import skin_retrieve
import math 



def convertbase64_store(base64string, filename, folder = "data/demo_images/"):
    base64string = base64string[len("data:image/jpeg;base64,"):]
    base64string = base64string.replace(" ","+")
    imgdata = base64.urlsafe_b64decode(base64string)
    filename = folder + filename+".jpg"  
    with open(filename, 'wb') as f:
        f.write(imgdata)

#convertbase64_store(x, "nishant")

def pixequal(pixel1, pixel2, barrier):
    if abs(pixel1[0]-pixel2[0]) < barrier and abs(pixel1[1]-pixel2[1]) < barrier and abs(pixel1[2]-pixel2[2]) < barrier:
        return True
    else:
        return False

def clearfolder(path="data/"):
    directories = [i for i in os.listdir(path) if "DS" not in i]
    datafolders = [join(path, f) for f in directories]
    for folder in datafolders:
        for myfile in os.listdir(folder):
            file_path = os.path.join(folder, myfile)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                    print(file_path)
                elif os.path.isdir(file_path):
                    print(file_path)
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))

def avgequal(avg_rgb_pimple, avg_rgb_face, rate=3):
    if abs(avg_rgb_face[0] - avg_rgb_pimple[0]) < rate and abs(avg_rgb_face[1] - avg_rgb_pimple[1]) < rate and (avg_rgb_face[2] - avg_rgb_pimple[2]) < rate:
        return True
    return False


def calculate_avg_rgb(pix, sizex, sizey, startx=0, starty=0):
    divisor = sizex*sizey
    summer = [0, 0, 0]
    for i in range(startx, startx+sizex):
        for j in range(starty, starty+sizey):
            summer[0] += pix[i, j][0]
            summer[1] += pix[i, j][1]
            summer[2] += pix[i, j][2]
    summer = [x/divisor for x in summer]
    return summer


def title_extract(face, acne):
    #facetitle = face.replace("../microsoft/data/demo_images_patches/", "")
    facetitle = face.replace("nonML/data/demo_images_patches/", "")
    facetitle = facetitle.lower().replace(".jpg", "")
    #pimpletitle = acne.replace("pimple/nishant/", "")
    pimpletitle = acne.replace("nonML/pimple/nishant/", "")
    pimpletitle = pimpletitle.lower().replace(".jpg", "")
    return(facetitle, pimpletitle)


def convolution_manager(directpath = "nonML/data/"):
    ## FIX TITLE EXTRACT, the path will be different make dynamic
    ## change size of pimple dimensions 

    filePimplePath = "nonML/pimple/nishant"
    pimpleFiles = [join(filePimplePath, f) for f in listdir(filePimplePath) if isfile(join(filePimplePath, f))]
    pimpleFiles = [i for i in pimpleFiles if "DS" not in i]

    fileImagePath = directpath + "demo_images_patches"
    imageFiles = [join(fileImagePath, f) for f in listdir(fileImagePath) if isfile(join(fileImagePath, f))]
    imageFiles = [i for i in imageFiles if "DS" not in i]
    imageFiles = [directpath + "demo_images_patches/test.jpg"]

    print(imageFiles)
    print(pimpleFiles)

    for pimple in pimpleFiles:
        for face in imageFiles: 
            convolution(pimple,face)
            print(pimple)
            print(face)

    

def convolution(pimplepath, skinpath):

    pimple = Image.open(pimplepath)
    skin = Image.open(skinpath)
    pimple_x, pimple_y = pimple.size
    skin_x, skin_y = skin.size
    max_score = pimple_x*pimple_y
    pimplepix = pimple.load()
    skinpix = skin.load()
    facetitle, pimpletitle = title_extract(skinpath, pimplepath)
    print(facetitle)
    print(pimpletitle)
    pimple_location_tracker = []

    pimple_avg_rgb = calculate_avg_rgb(pimplepix, pimple_x, pimple_y, 0, 0)

    # Tinker to see what increment, 1,2,5,10 to be iterating over?
    # Should we be downsampling the image?
    # what barrier for entry full image? 1/2, 1/4?
    # what is the barrier for pixequal function?

    # NEXT STEPS:
    # Downsample each lc, rc, and fh pic to a certan size ratio, crop and extract those images for pimples,acne
    # Don't mess with the aspect ratio, but also pick a certain area of pixels that each should match to
    # Make sure to include acne from all three skin types
    # Build an averge RBG sampler to categorize skin into different types

    for i in range(0, skin_x - pimple_x + 1, 3):
        for j in range(0, skin_y - pimple_y + 1, 3):
            score = 0
            xcounter = 0

            # print(str(i) + " " + str(j))
            # myset = set()
            # for iskin in range(i, i+pimple_x):
            #     ycounter = 0
            #     for jskin in range(j, j+pimple_y):
            #         if pixequal(skinpix[iskin, jskin], pimplepix[xcounter, ycounter], 5):
            #             score += 1
            #             myset.add((iskin, jskin))

            #     ycounter += 1
            # xcounter += 1

            skin_avg_rgb = calculate_avg_rgb(skinpix, pimple_x, pimple_y, i, j)
            if avgequal(pimple_avg_rgb, skin_avg_rgb):
                pimple_location_tracker.append((i,j))
                # print("YES")
                # for iskin in range(i, i+pimple_x):
                #     for jskin in range(j, j+pimple_y):
                #         skinpix[iskin, jskin] = (0, 0, 0)

            
            #skinpix = boxdrawer(skinpix, [coordinates of all the matches])

            # print("PIMPLE")
            # print(pimple_avg_rgb)
            # print("SKIN")
            # print(skin_avg_rgb)

            # if score >= max_score/2:
            #     print("hi")
            #     for pixel in myset:
            #         skinpix[pixel[0], pixel[1]] = (0, 0, 0)
            #     skin.save("results/" + facetitle+"_"+pimpletitle+".jpg")
    skinpix = boxdrawer(skinpix, pimple_location_tracker, [skin_x,skin_y])
    #skin.save("results/nishant/" + facetitle+"_"+pimpletitle+".jpg")

    #USUAL DEAL
    #skin.save("nonML/data/results/" + facetitle+"_"+pimpletitle+".jpg")
    skin.save("../smartscreen/acne/src/Results/" + facetitle+"_"+pimpletitle+".jpg")


    # print(score)
    # print("\n")

def send_to_react():
    pass
    #"nonML/data/results/test_nishant.jpg to ../smartscreen/src/Results


def convert_aspect_ratio():
    pass
    #


def rgb_skin_categorizer():
    pass
    #caucasian: (255,224,189)
    #brown: (141, 85, 36)
    #tan: 	(241,194,125)

def boxdrawer(imagepix, listofcoordinates, sizetupleofimage): 
    #setofcoorindates = set(listofcoordinates)
    #listofcoordinates = [tuple(x) for x in listofcoordinates]
    build = set()
    clusters = []
    mastermap = {}
    against = max(sizetupleofimage) / 8 
    #print(against)

    def within(dot, square): 
        print("against" + str(against))
        horizontal = dot[0] >= square[0] - against and dot[0] <= square[1] + against
        vertical = dot[1] >= square[2] - against and dot[1] <= square[3] + against
        if horizontal and vertical: 
            return True 
        return False 

    def distance(point1, point2):
        return math.sqrt((point1[0]-point2[0])**2 + (point1[1]-point2[1])**2)

    def draw():
        print(clusters)
        print(listofcoordinates)
        print(against)
        for cluster in clusters:
            for i in range(cluster[0], cluster[1]):
                imagepix[i,cluster[2]] = (0,0,0)
                imagepix[i,cluster[3]] = (0,0,0)
            for i in range(cluster[2], cluster[3]):
                imagepix[cluster[0],i] = (0,0,0)
                imagepix[cluster[1],i] = (0,0,0)

    for i in listofcoordinates: 
        temp = [x for x in listofcoordinates if x != i]
        mastermap[i] = sorted(temp, key = lambda coordinate: distance(coordinate, i))
    
    #print(mastermap)

    for oldmark in listofcoordinates: 
        if oldmark not in build: 
            build.add(oldmark)
            newcluster = [oldmark[0],oldmark[0]+5,oldmark[1],oldmark[1]+5]
            for mark in mastermap[oldmark]:
                if mark not in build: 
                    if within(mark, newcluster):
                        build.add(mark)
                        newcluster = [min(mark[0], newcluster[0]), max(mark[0]+10, newcluster[1]), min(mark[1], newcluster[2]), max(mark[1]+10, newcluster[3])]
                    else:
                        print(mark)
                        print(newcluster)
                        break 
            newcluster = [int(x + (3*((-1)**(i-1)))) for i,x in enumerate(newcluster)]
            newcluster = [max(0,newcluster[0]), min(sizetupleofimage[0], newcluster[1]),max(0,newcluster[2]), min(sizetupleofimage[1], newcluster[3])]
            clusters.append(newcluster)

    draw()
    return(imagepix)




# fileImagePath = "../microsoft/data/demo_images_patches"
# imageFiles = [join(fileImagePath, f) for f in listdir(
#     fileImagePath) if isfile(join(fileImagePath, f))]
# imageFiles = [i for i in imageFiles if "DS" not in i]
# # CHANGE
# imageFiles = ["../microsoft/data/demo_images_patches/nishantnew.jpg"]
# # CHANGE LATER!
# #imageFiles = imageFiles[0:len(imageFiles)//2]

# filePimplePath = "pimple/nishant"
# pimpleFiles = [join(filePimplePath, f) for f in listdir(
#     filePimplePath) if isfile(join(filePimplePath, f))]
# pimpleFiles = [i for i in pimpleFiles if "DS" not in i]


# # print(imageFiles)
# # print(pimpleFiles)

# for image in imageFiles:
#     for pimple in pimpleFiles:
#         print(pimple)
#         print(image)
#         convolution(pimple, image)

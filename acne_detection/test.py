import math 
def boxdrawer(imagepix, listofcoordinates, sizetupleofimage): 
    #setofcoorindates = set(listofcoordinates)
    listofcoordinates = [tuple(x) for x in listofcoordinates]
    build = set()
    clusters = []
    mastermap = {}
    against = max(sizetupleofimage) / 8 
    print(against)

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
                        newcluster = [min(mark[0], newcluster[0]), max(mark[0], newcluster[1]), min(mark[1], newcluster[2]), max(mark[1], newcluster[3])]
                    else:
                        print(mark)
                        print(newcluster)
                        break 
            newcluster = [int(x + (3*((-1)**(i-1)))) for i,x in enumerate(newcluster)]
            clusters.append(newcluster)

    
    draw()
    #print(clusters)





mylist = [[25,25], [28,40], [50,50], [320,45], [344,80]]

boxdrawer("image", mylist, [500,500])
                
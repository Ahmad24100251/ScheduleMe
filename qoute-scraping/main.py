
enc = 'utf-8'
lines = open("qoutes.txt", mode="r", encoding=enc).readlines()
# print(lines[5])

#Creating a dict of qoutes which will make a qoutes table in mongodb

qoutes = {}
for i in range(len(lines)):
    qoutes[i] = lines[i]
    




for x,y in qoutes.items():
    print('The qoute at position',x,' is ',y)


#---------------------MongoDB---------------------

# #Connecting to MongoDB

# client = MongoClient('localhost', 27017)
# db = client['qoutes']
# collection = db['qoutes']

# #Inserting data into MongoDB

# for x,y in qoutes.items():

#     collection.insert_one(
#         {
#             'qoute':y
#         }
#     )


#For wajeeh, upar wala code dekhlein
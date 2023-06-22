import pymongo
from bson.objectid import ObjectId
import tensorflow as tf
import os
import re
import sys
from datetime import datetime
import urllib.request
import json
import time
import nltk
import string
import spacy
import numpy as np 
import pandas as pd
from spacy import displacy
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from keras.utils import pad_sequences
from keras.callbacks import EarlyStopping
from keras.preprocessing.text import Tokenizer
from keras.optimizers import Adam
from keras.optimizers import SGD
from keras.metrics import Precision, Recall
from keras.layers import Dense
from keras.layers import Conv1D, MaxPooling1D
from keras.layers import Flatten
from keras.layers import LSTM
from keras.layers import Dropout
from keras.layers import Embedding
from keras.layers import Bidirectional
from keras.layers import BatchNormalization
from keras.layers import Attention
from keras.layers import Concatenate, Dense, Input
from keras.models import Sequential
from keras.preprocessing.text import Tokenizer
from keras import Model
from keras.layers import Layer
from keras.utils import plot_model
import keras.backend as K
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS
from sklearn.model_selection import train_test_split

# This is transformer Method for input data: Text
def fit_transform(tokenizer, text):
    max_len, max_features = 628, 1000
    return pad_sequences(tokenizer.texts_to_sequences(text), padding='post', maxlen=max_len)

# Nomalizing the text and removing special character to avoid overfitting the data
# Which might affect the model accuracy.
def normalize_text(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\w\s]', '', text) # Remove special char
    text = re.sub(r'<.*?>', '', text) # Remove html tags
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(token) for token in tokens]
    text = ' '.join(tokens)
    return text

# Model prediction method
def get_predict(model, tokenizer, sample):
    m_proba = model.predict(fit_transform(tokenizer, [sample]))[0][0]
    if m_proba >= 0.5:
        return "Positive"
    return "Negative"

# Caller Method for Saved(Stored) Model which is already trained with Twitter Game Review Dataset
def modelCaller():
    # Load the saved model as below
    new_model = tf.keras.models.load_model('saved_model/my_modelC')
    # Model Summary
    new_model.summary()
    return new_model

# Getting the components for tokens and loaded model
def get_components():
    twitter_training = pd.read_csv("twitter_training.csv", names=["_id", "game", "sentiment", "text"])
    twitter_validation = pd.read_csv("twitter_validation.csv", names=["_id", "game", "sentiment", "text"])
    twitter_original = twitter_training.copy()
    twitter_training['text'] = twitter_training['text'].astype(str)
    twitter_validation['text'] = twitter_validation['text'].astype(str)
    twitter_training['text'] = twitter_training['text'].apply(normalize_text)
    twitter_validation['text'] = twitter_validation['text'].apply(normalize_text)
    twitter_training = twitter_training[(twitter_training["sentiment"] == "Positive") | 
                                        (twitter_training["sentiment"] == "Negative")]
    twitter_validation = twitter_validation[(twitter_validation["sentiment"] == "Positive") | 
                                        (twitter_validation["sentiment"] == "Negative")]
    sample_original = twitter_original["text"][20]
    twitter_training["sentiment"].replace("Positive", 1, inplace=True)
    twitter_training["sentiment"].replace("Negative", 0, inplace=True)
    twitter_validation["sentiment"].replace("Positive", 1, inplace=True)
    twitter_validation["sentiment"].replace("Negative", 0, inplace=True)
    max_len, max_features = 628, 1000
    tokenizer = Tokenizer(num_words=max_features, split=" ")
    tokenizer.fit_on_texts(twitter_training["text"])
    model = modelCaller()
    return model, tokenizer

# Calculating the overall rate for program or education giver
# When get_predict is positive, add +1 for overall score
# When get_predict is negative, return nothing
# Calculated Scored is divided by the number of overall comment for specific giver(user)
def calOverRate(model, tok, arr):
    arrx = []
    nmn = 0
    nmp = 0
    for i in range(0, len(arr)):
        arrx.append(get_predict(model, tok, normalize_text(arr[i])))
        #print(arr[i])
        if get_predict(model, tok, normalize_text(arr[i])) == "Positive":
            nmn +=1
            #print("Positive")
        elif get_predict(model, tok, normalize_text(arr[i])) == "Negative":
            pass
            #print("Negative")
    return (nmn / len(arr)) * (10 / 2)

# MongoDB Connection
# Getting the comments data from Mongo DB
# Collect the data and return list
def updateRateUser(val, user):
    connection_string = "mongodb://rootacc:wWhvL2SzqSnYd3qIZXoqTM1ig5J8lMYhZlBRFddzEyrIJvALQW132oylqJdDvMv2hVb2tIsaKpnbACDblvcr3Q==@rootacc.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rootacc@"
    database_name = "db"
    collection_name = "restaurant"

    # Create a MongoClient object and connect to the MongoDB cluster
    client = pymongo.MongoClient(connection_string)
    print(client)
    # Get the specified database
    db = client[database_name]

    # Get the specified collection
    collection = db[collection_name]
    
    # Define the user ID to be modified
    user_id = user
    
    # Update the email field of the specified user
    result = collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"star": val}}
    )
    print("DONE")

def getCommentsFromMongo():
    userData = []
    
    comments = []
    connection_string = "mongodb://rootacc:wWhvL2SzqSnYd3qIZXoqTM1ig5J8lMYhZlBRFddzEyrIJvALQW132oylqJdDvMv2hVb2tIsaKpnbACDblvcr3Q==@rootacc.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rootacc@"
    database_name = "db"
    collection_name = "restaurant"
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]
    for document in collection.find():
        try:
            userData.append([str(document['_id']), document['comments'], document['star']])
        except:
            pass
    client.close()
    return userData

def papago_api(dat):
    client_id = "NJ75xiiCKkJtYI7ICZdx" 
    client_secret = "5_dbMKY0lH" 
    encText = urllib.parse.quote(dat)
    data = "source=ko&target=en&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        # Decode the response body
        response_decoded = response_body.decode('utf-8')
        # Parse the decoded response body as JSON
        response_json = json.loads(response_decoded)
        # Print the translated text
        return response_json['message']['result']['translatedText']
    else:
        return "NAN"

def autodetector(arr):
    count = 0
    bad_words = ['really bad', 'very bad', 'not good', 'so bad',
                 'bad', 'suck', 'hate', 'horrible', 'so suck',
                 'awful', 'terrible', 'disgusting',
                 'mediocre', 'disappointing', 'horrible', 
                 'abysmal', 'pathetic', 'atrocious', 
                 'lousy', 'dreadful', 'woeful']
    
    for element in arr:
        if any(word in element for word in bad_words):
            pass
        else:
            count += 1
    return count / len(arr) * 5

def overallscore(model, tok, arr):
    x1 = calOverRate(model, tok, arr)
    x2 = autodetector(arr)
    return (x1 + x2) / 2 


def updateRateUserList(val, user):
    connection_string = "mongodb://rootacc:wWhvL2SzqSnYd3qIZXoqTM1ig5J8lMYhZlBRFddzEyrIJvALQW132oylqJdDvMv2hVb2tIsaKpnbACDblvcr3Q==@rootacc.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rootacc@"
    database_name = "db"
    collection_name = "accounts"
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]
    user_id = user
    
    result = collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"flavor": val}}
    )

def getCommentsFromMongoUserRate():
    userData = []
    userList = []
    comments = []
    connection_string = "mongodb://rootacc:wWhvL2SzqSnYd3qIZXoqTM1ig5J8lMYhZlBRFddzEyrIJvALQW132oylqJdDvMv2hVb2tIsaKpnbACDblvcr3Q==@rootacc.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rootacc@"
    database_name = "db"
    collection_name = "restaurant"
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]
    for document in collection.find():
        try:
            for i in range(len(document['comments'])):
                userData.append([document['comments'][i]['user_id'], document['comments'][i]['comment']])
                if document['comments'][i]['user_id'] not in userList:
                    userList.append(document['comments'][i]['user_id'])
        except:
            pass
    client.close()
    return [userList, userData]
                
def dataloaderll():
    userData = []
    userList = []
    comments = []
    connection_string = "mongodb://rootacc:wWhvL2SzqSnYd3qIZXoqTM1ig5J8lMYhZlBRFddzEyrIJvALQW132oylqJdDvMv2hVb2tIsaKpnbACDblvcr3Q==@rootacc.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rootacc@"
    database_name = "db"
    collection_name = "accounts"
    client = pymongo.MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]
    
    for document in collection.find():
        try:
            userData.append([document['user_id'], document['_id']])
        except:
            pass
    client.close()
    return userData

def updateMod(arr1, arr2):
    for i in range(len(arr1)):
        for j in range(len(arr2)):
            if arr1[i][0] == arr2[j][0]:
                updateRateUserList(arr1[i][1], arr2[j][1])

def calRateForUser(arr, arr2, model, tok):
    rateUser = []
    for i in range(len(arr)):
        rate = 0
        count = 0
        for j in range(len(arr2)):
            if arr[i] == arr2[j][0]:
                rate += overallscore(model, tok, [papago_api(arr2[j][1])])
                count += 1
        rateUser.append([arr[i], rate/count])
        print(arr[i], rate/count)
    return rateUser
                
def dataloader():
    # Usage
    print('\033[96m' + 'Natural Language Model Setting ---------------------- ' + '\033[0m') 
    model, tok = get_components()
    print('\033[96m' + 'Natural Language Model Setting ---------------------- Complete ' + '\033[0m') 
    copied_comment_list = []
    print('\033[96m' + 'Checking the user data -- Connected to Mongo DB ----- Complete ' + '\033[0m') 
    print('\033[96m' + 'Start Updating --------------------------------------' + '\033[0m')  

    while True:
        try:
            
            comment_list = getCommentsFromMongo()
            if copied_comment_list != comment_list:
                
                arr1, arr2 = getCommentsFromMongoUserRate()
                updateMod(calRateForUser(arr1, arr2, model, tok), dataloaderll())
                print("UPDATE USER FLAVOR DATA ------------------------- []")
                
                for i in range(len(comment_list)):
                    arrs = []
                    for j in range(len(comment_list[i][1])):
                        arrs.append(papago_api(comment_list[i][1][j]['comment']))
                        print("CONVERTING: ", papago_api(comment_list[i][1][j]['comment']), " ------------------------- []")
                    score = overallscore(model, tok, arrs)
                    updateRateUser(score, comment_list[i][0])
                    print('\033[96m' + 'Updating --------------------------------------------' + str(comment_list[i][0]) + '\033[0m')
                    print('\033[96m' + 'Updating --------------------------------------- Star' + str(comment_list[i][2]) + '\033[0m')
                    
                    now = str(datetime.now())
                    print('\033[96m' + 'TIME: '+ now + str(comment_list[i][2]) + '\033[0m')
                    
            else:
                print('\033[96m' + 'No Change Found ----------------------------------- [PASS]' + str(comment_list[i][2]) + '\033[0m')
                now = str(datetime.now())
                print('\033[96m' + 'TIME: '+ now + str(comment_list[i][2]) + '\033[0m')
            time.sleep(1)
            copied_comment_list = comment_list
        except:
            print()
            print("---------------------------------------------------------------------")
            print("DB --- CONNECTION FAILED ***")
            print("Please Check Network Status")
            print("---------------------------------------------------------------------")
            print()
            
def main():
    dataloader()
    print("DONE")
    

if __name__ == "__main__":
    main()
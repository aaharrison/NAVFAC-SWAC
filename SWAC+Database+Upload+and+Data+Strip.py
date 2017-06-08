
# coding: utf-8

# In[445]:

import os
import math
import requests
import datetime
from datetime import date, timedelta
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
get_ipython().magic('matplotlib inline')

import cufflinks as cf
import plotly.plotly as py
import plotly.graph_objs as go
from plotly.offline import download_plotlyjs,init_notebook_mode,plot,iplot
init_notebook_mode(connected = True)
cf.go_offline()

import psycopg2
connect = "user='rh1' password='Anal1st-R0undH0use' host='rds-rh1.4dapt.com' dbname='rh1'"
conn = psycopg2.connect(connect)
cursor = conn.cursor()


# In[4]:

df = pd.read_excel("NAVFAC SWAC PMV Model Bare.xlsm", 
              sheetname = "Data Building 23", 
              usecols = np.arange(0,9,1),
             header = 3)


# In[9]:

df.head()
df.set_index("HI Date and Time", inplace = True)


# In[29]:

for x in df["Water Temperature"].unique().tolist():
    print(
        str(x), df[df["Water Temperature"] == x]["HI Date"].unique()
        )
    print("-----------------------")

dates = [datetime.date(2013, 7, 1), datetime.date(2013, 7, 6), datetime.date(2013, 7, 11), 
         datetime.date(2013, 7, 16), datetime.date(2013, 7, 21), datetime.date(2013, 7, 26)]


# In[70]:

def locationStrip(loc):
    strip = df[df["Location"] == loc].groupby(pd.TimeGrouper(freq = "1H")).mean()

    dateList = []
    timeList = []
    for x in strip.reset_index()["HI Date and Time"]:
        dateList.append(x.date())
        timeList.append(x.time())

    strip["HI Date"] = dateList
    strip["HI Time"] = timeList

#     strip = strip[(strip["HI Date"] == dates[0]) | (strip["HI Date"] == dates[1]) | 
#           (strip["HI Date"] == dates[2]) | (strip["HI Date"] == dates[3]) | 
#           (strip["HI Date"] == dates[4]) | (strip["HI Date"] == dates[5])]
    
    strip["Location"] = loc
    strip.reset_index(inplace = True)
    cols = ["Building", "Location", "% of SF", "HI Date and Time", "HI Date", "HI Time", 
            "Water Temperature", "Air Temperature", "Relative Humidity"]
    
    strip = strip[cols]
    return(strip)

B104 = locationStrip("B23-104B")
B210 = locationStrip("B23-210B")
BLC = locationStrip("B23-LC")
strip = pd.concat([B104, B210, BLC], axis = 0)


# In[73]:

strip.set_index("HI Date and Time")["Air Temperature"].plot()


# In[74]:

strip.to_excel("Stripped Building 23 Date.xlsx")


# In[75]:

df.head()


# ### Database Creation and Upload

# In[128]:

db = pd.read_excel("NAVFAC SWAC PMV Model 5.0.xlsm", 
              sheetname = "Data Building 23", 
              usecols = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,24,25,26,27],
             header = 3)

db.drop(["Humidity Ratio", "PMV", "HI Date", "HI Time"], axis = 1, inplace = True)

db.columns = ['Building', 'Location', 'Sqft Percent', 'HI Date and Time',
              'Water Temperature', 'Air Temperature', 'Relative Humidity',
              'kWh', 'Energy Cost', ' Base MRT', 'Base Air Speed','Base Metabolic', 
              'Base Clo','Advanced MRT', 'Advanced Air Speed', 'Advanced Metabolic','Advanced Clo']

cols = ['HI Date and Time', 'Building', 'Location', 'Sqft Percent', 'Water Temperature', 
 'Air Temperature', 'Relative Humidity','kWh', 'Energy Cost', ' Base MRT', 'Base Air Speed','Base Metabolic', 
 'Base Clo','Advanced MRT', 'Advanced Air Speed', 'Advanced Metabolic','Advanced Clo']

db = db[cols]

db.set_index("HI Date and Time", inplace = True)


# In[135]:

dateTime = []
for x in db.reset_index()["HI Date and Time"]:
    hold = datetime.datetime.strftime(x, "%Y-%m-%d %H:%M")
    dateTime.append(datetime.datetime.strptime(hold, "%Y-%m-%d %H:%M"))
    
db.reset_index(inplace = True)
db["HI Date and Time"] = dateTime
db.set_index("HI Date and Time", inplace = True)


# In[138]:

cursor.execute("CREATE TABLE mock_swac (Date_Time timestamp, Building int, Location varchar(25), Sqft_Percent varchar(25), Water_Temperature int, Air_Temperature varchar(25), Relative_Humidity varchar(25), kWh varchar(25), Energy_Cost varchar(25), Base_MRT varchar(25), Base_Air_Speed varchar(25), Base_Metabolic varchar(25), Base_Clo varchar(25), Advanced_MRT varchar(25), Advanced_Air_Speed varchar(25), Advanced_Metabolic varchar(25), Advanced_Clo varchar(25))")
conn.commit()

db.reset_index().to_csv("SWAC Database.csv", header = False, index = False)
csv = open("SWAC Database.csv", "r")

cursor.copy_from(csv, 'mock_swac', sep=',')
conn.commit()


# In[140]:

cursor.execute("SELECT * FROM mock_swac WHERE Water_Temperature = 52 AND LOCATION = 'B23-104B'")
pd.DataFrame(cursor.fetchall())


# ## April 13th Fix and Reupload

# In[1]:

os.chdir("/Users/adeniyiharrison/Desktop/723 NAVFAC SWAC")
db = pd.read_excel("NAVFAC SWAC PMV Model 5.0.xlsm", 
              sheetname = "Data Building 23", 
              usecols = [0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,17,18,19,20,21],
             header = 3)

db.drop(["HI Date", "HI Time", "PMV.1"], axis = 1, inplace = True)

db.columns = ['Building', 'Location', 'Sqft Percent', 'HI Date and Time',
              'Water Temperature', 'Air Temperature', 'Relative Humidity',
              'kWh', 'Energy Cost', ' Base MRT', 'Base Air Speed','Base Metabolic', 
              'Base Clo','Advanced MRT', 'Advanced Air Speed', 'Advanced Metabolic','Advanced Clo']

cols = ['HI Date and Time', 'Building', 'Location', 'Sqft Percent', 'Water Temperature', 
 'Air Temperature', 'Relative Humidity','kWh', 'Energy Cost', ' Base MRT', 'Base Air Speed','Base Metabolic', 
 'Base Clo','Advanced MRT', 'Advanced Air Speed', 'Advanced Metabolic','Advanced Clo']

db = db[cols]

db.set_index("HI Date and Time", inplace = True)


# In[49]:

cloChange = {
    1.065: .64,
    2.13: 1.07,
    1.278: .64,
    1.42: .71,
    1.92: .96,
    1.1520000000000001: .58,
    1.28: .64
}

db["Advanced Clo"] = db["Advanced Clo"].apply(lambda x: cloChange[x])


# In[9]:

dateTime = []
for x in db.reset_index()["HI Date and Time"]:
    hold = datetime.datetime.strftime(x, "%Y-%m-%d %H:%M")
    dateTime.append(datetime.datetime.strptime(hold, "%Y-%m-%d %H:%M"))
    
db.reset_index(inplace = True)
db["HI Date and Time"] = dateTime
db.set_index("HI Date and Time", inplace = True)


# In[50]:

# cursor.execute("DROP TABLE mock_swac;")
# cursor.execute("CREATE TABLE mock_swac (Date_Time timestamp, Building int, Location varchar(25), Sqft_Percent varchar(25), Water_Temperature int, Air_Temperature varchar(25), Relative_Humidity varchar(25), kWh varchar(25), Energy_Cost varchar(25), Base_MRT varchar(25), Base_Air_Speed varchar(25), Base_Metabolic varchar(25), Base_Clo varchar(25), Advanced_MRT varchar(25), Advanced_Air_Speed varchar(25), Advanced_Metabolic varchar(25), Advanced_Clo varchar(25))")
# conn.commit()

# os.chdir("/Users/adeniyiharrison/Desktop/723 NAVFAC SWAC")
# db.reset_index().to_csv("SWAC Database.csv", header = False, index = False)
# csv = open("SWAC Database.csv", "r")

# cursor.copy_from(csv, 'mock_swac', sep=',')
# conn.commit()


# ## April 27th Reopen

# In[3]:

os.chdir("/Users/adeniyiharrison/Desktop/723 NAVFAC SWAC")
db = pd.read_excel("NAVFAC SWAC PMV Model 5.0.xlsm", 
              sheetname = "Data Building 23", 
              usecols = [0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,17,18,19,20,21],
             header = 3)

db.drop(["HI Date", "HI Time", "PMV.1"], axis = 1, inplace = True)

db.columns = ['Building', 'Location', 'Sqft Percent', 'HI Date and Time',
              'Water Temperature', 'Air Temperature', 'Relative Humidity',
              'kWh', 'Energy Cost', ' Base MRT', 'Base Air Speed','Base Metabolic', 
              'Base Clo','Advanced MRT', 'Advanced Air Speed', 'Advanced Metabolic','Advanced Clo']

cols = ['HI Date and Time', 'Building', 'Location', 'Sqft Percent', 'Water Temperature', 
 'Air Temperature', 'Relative Humidity','kWh', 'Energy Cost', ' Base MRT', 'Base Air Speed','Base Metabolic', 
 'Base Clo','Advanced MRT', 'Advanced Air Speed', 'Advanced Metabolic','Advanced Clo']

db = db[cols]

db.set_index("HI Date and Time", inplace = True)

cloChange = {
    1.065: .64,
    2.13: 1.07,
    1.278: .64,
    1.42: .71,
    1.92: .96,
    1.1520000000000001: .58,
    1.28: .64
}

db["Advanced Clo"] = db["Advanced Clo"].apply(lambda x: cloChange[x])

dateTime = []
for x in db.reset_index()["HI Date and Time"]:
    hold = datetime.datetime.strftime(x, "%Y-%m-%d %H:%M")
    dateTime.append(datetime.datetime.strptime(hold, "%Y-%m-%d %H:%M"))
    
db.reset_index(inplace = True)
db["HI Date and Time"] = dateTime
db.set_index("HI Date and Time", inplace = True)


# #### Weather Underground API Call

# In[327]:

from datetime import date, timedelta
key = "0bfa64942618d5ec"
site = "IGUAM5"
    
def dateRange(start, end):
    dateRange = []
    date1 = start
    date2 = end

    delta = date2 - date1

    for x in range(delta.days + 1):
        dateRange.append((date1 + timedelta(days = x)).strftime("%Y%m%d"))
    
#     print(list(dateRange))
    

#enter start and end dates in date(Year, Month, Day) format, make sure key and site variables are set
def weatherData(start, end):
    dateRange = []
    date1 = start
    date2 = end

    delta = date2 - date1

    for x in range(delta.days + 1):
        dateRange.append((date1 + timedelta(days = x)).strftime("%Y%m%d"))
        
    data = {}
    
    for date in dateRange:
#         print(date)
        urlstart = "http://api.wunderground.com/api/" + str(key) + "/history_"
        urlend = "/q/pws:" + str(site) + ".json"

        url = urlstart + date + urlend

        data[date] = requests.get(url).json()

        
    weatherPretty = []
    weatherYear = []
    weatherMonth = []
    weatherDay = []
    weatherHour = []
    weatherMinute = []
    weatherTemp = []
    weatherHum = []
    weatherRainRate = []

    for x in dateRange:
        for y in range(400):
            try:
                weatherPretty.append(data[x]["history"]["observations"][y]["date"]["pretty"])
                weatherYear.append(data[x]["history"]["observations"][y]["date"]["year"])
                weatherMonth.append(data[x]["history"]["observations"][y]["date"]["mon"])
                weatherDay.append(data[x]["history"]["observations"][y]["date"]["mday"])
                weatherHour.append(data[x]["history"]["observations"][y]["date"]["hour"])
                weatherMinute.append(data[x]["history"]["observations"][y]["date"]["min"])
                weatherTemp.append(data[x]["history"]["observations"][y]["tempi"])
                weatherHum.append(data[x]["history"]["observations"][y]["hum"])
                weatherRainRate.append(data[x]["history"]["observations"][y]["precip_ratei"])
            except:
                break


# In[71]:

weather = weatherData(date(2016, 7, 1), date(2016, 7, 30))

guamWeather = weather.groupby(pd.TimeGrouper(freq = "5 Min"))[["Temp", "RH%"]].mean().fillna(method = "ffill")
guamWeather.columns = ["Outdoor Air Temperature", "Outdoor Relative Humidity"]
guamWeather.drop(guamWeather[guamWeather["Outdoor Air Temperature"] < 0].index, inplace = True)
guamWeather["Outdoor Air Temperature"] = guamWeather["Outdoor Air Temperature"].apply(lambda x: x + 4)

plt.figure(figsize = (20,12))
db[db["Location"] == "B23-104B"]["Air Temperature"].plot()
guamWeather["Outdoor Air Temperature"].plot()
plt.legend(loc = 0)


# In[73]:

db = db.join(guamWeather, how = "left")


# In[80]:

len(db)


# In[85]:

db["Outdoor Air Temperature"].fillna(method = 'ffill', inplace = True)
db["Outdoor Relative Humidity"].fillna(method = 'ffill', inplace = True)


# In[88]:

# cursor.execute("DROP TABLE mock_swac;")
# cursor.execute("CREATE TABLE mock_swac (Date_Time timestamp, Building int, Location varchar(25), Sqft_Percent varchar(25), Water_Temperature int, Air_Temperature varchar(25), Relative_Humidity varchar(25), kWh varchar(25), Energy_Cost varchar(25), Base_MRT varchar(25), Base_Air_Speed varchar(25), Base_Metabolic varchar(25), Base_Clo varchar(25), Advanced_MRT varchar(25), Advanced_Air_Speed varchar(25), Advanced_Metabolic varchar(25), Advanced_Clo varchar(25), Outdoor_Temp varchar(25), Outdoor_RH varchar(25))")
# conn.commit()

# os.chdir("/Users/adeniyiharrison/Desktop/723 NAVFAC SWAC")
# db.reset_index().to_csv("SWAC Database.csv", header = False, index = False)
# db.to_excel("SWAC Database Clean.xlsx")
# csv = open("SWAC Database.csv", "r")

# cursor.copy_from(csv, 'mock_swac', sep=',')
# conn.commit()


# ### PMV

# In[105]:

#Input Unit of Measure

    # airTemp = Fahrenheit
    # relativeHumidity = Whole Number (eg. 85)
    # Mean Radiant Temp = Fahrenheit
    # airSpeed = Miles per Hour
    # cloValue = Clo
    # metRate = Met

def PMV(airTemp, relativeHum, MRT, airSpeed, cloValue, metRate):
    
    # Returns PMV
    # ta, airTemp, Celcius
    # tr, mean radiant temperature, Celcius
    # vel, relative air velocity, (m/s)
    # rh, relative humidity (%) Used only this way to input humidity level
    # met, metabolic rate, (met)
    # clo, clothing (clo)
    # wme, external work, normally around 0
    
    
    #Conversion of units of measure
    
    ta = (airTemp - 32)/1.8
    tr = (MRT - 32)/1.8
    vel = airSpeed * .44704   
    pa = relativeHum * 10 * math.exp(16.6536 - 4030.183 / (ta + 235))
    
    #Thermal Insulation of the clothing in M2K/W
    
    icl = 0.155 * cloValue
    
    #Metabolic Rate in W/M2
    
    m = metRate * 58.15
    
    #External Work in W/M2
    
    w = .001 * 58.15
    
    #Internal heat production of the human body
    
    mw = m - w
    if icl <= .078:
        fcl = 1 + (1.29 * icl)
    else:
        fcl = 1.05 + (.645 * icl)
    
    #Heat transfer coefficient by forced convection
    
    hcf = 12.1 * np.sqrt(vel)
    taa = ta + 273
    tra = tr + 273
    tcla = taa + (35.5 - ta) / (3.5 * icl + 0.1)
    p1 = icl * fcl
    p2 = p1 * 3.96
    p3 = p1 * 100
    p4 = p1 * taa
    p5 = 308.7 - .028 * mw + p2 * math.pow(tra/100,4)
    xn = tcla / 100
    xf = tcla / 50
    eps = .00015
    
    n = 0
    while (np.abs(xn - xf) > eps):
        xf = (xf + xn) / 2
        hcn = 2.38 * math.pow(np.abs(100 * xf - taa), .25)
        if hcf > hcn:
            hc = hcf
        else:
            hc = hcn
        
        xn = (p5 + p4 * hc - p2 * math.pow(xf,4)) / (100 + p3 * hc)
        
        n+=1
        
        if n > 150:
            print("Max iterations exceeded")
            return 1
    
    tcl = 100 * xn - 273
    
    # Heat loss diff through skin
    
    hl1 = 3.05 * .001 * (5733 - (6.99 * mw) - pa)
    
    # Heat loss by sweating
    
    if mw > 58.15:
        hl2 = .42 * (mw - 58.15)
    else:
        hl2 = 0
    
    # Latent respiration heat loss
    
    hl3 = 1.7 * .00001 * m * (5867 - pa)
    
    # Dry respiration heat loss
    
    hl4 = .0014 * m * (34 - ta)
    
    # Heat loss by radiation
    
    hl5 = 3.96 * fcl * (math.pow(xn, 4) - math.pow(tra/100, 4))
    
    # Heat loss by convection
    
    hl6 = fcl * hc * (tcl - ta)
    
    ts = .303 * np.exp(-0.036 * m) + .028

    pmv = ts * (mw - hl1 - hl2 - hl3 - hl4 - hl5 - hl6)    
    
#     pmv = round(pmv,1)
    
    return(np.round(a = pmv, decimals = 1))


# In[108]:

db.head()


# In[115]:

for x,y in zip(test["Air Temperature"][:10], test["Relative Humidity"][:10]):
    print(x)
    print(y)


# In[156]:

def plotPMV(Location, Water):
    test = db[(db["Location"] == Location) & (db["Water Temperature"] == Water)]
    pmv = []
    for temp, rh, mrt, air, clo, met in zip(test["Air Temperature"], test["Relative Humidity"], test[" Base MRT"], 
                                            test["Base Air Speed"], test["Base Clo"], test["Base Metabolic"]):
        pmv.append(PMV(temp, rh, mrt, air, clo, met))

    holder = pd.DataFrame(test.index.tolist(),
                          columns = ["Date/Time"]).join(pd.DataFrame(pmv, columns = ["PMV"]))

    holder.set_index("Date/Time", inplace = True)

    holder.plot(figsize = (20,12))


# In[159]:

plotPMV("B23-LC", 46)


# ## May 19th Reopen

# In[3]:

os.chdir("/Users/adeniyiharrison/Desktop/723 NAVFAC SWAC")
db = pd.read_excel("SWAC Database Clean.xlsx", index_col = 0)


# #### Mock Solar Radiation Data From TMY3

# In[295]:

solar = pd.read_csv("912180TY.csv", header =1, usecols = [0,1,2])
solar.columns = ["Date", "Time", "Solar Rad"]

solar = solar[solar["Time"] != '24:00']

dateList = []
timeList = []
dateTimeList = []
for date, time in zip(solar["Date"], solar["Time"]):
    dateList.append(datetime.datetime.strptime(date, "%m/%d/%Y"))
    timeList.append(datetime.datetime.strptime(time, "%H:%M").time())
    dateTimeList.append(datetime.datetime.combine(
        datetime.datetime.strptime(date, "%m/%d/%Y"),
        datetime.datetime.strptime(time, "%H:%M").time()
    ))
    
solar["Date"] = dateList
solar["Time"] = timeList
solar["Date/Time"] = dateTimeList
solar.set_index("Date/Time", inplace = True)

solar["Year"] = solar["Date"].apply(lambda x: x.year)
solar["Month"] = solar["Date"].apply(lambda x: x.month)
solar["Day"] = solar["Date"].apply(lambda x: x.day)

solar = pd.DataFrame(solar.groupby(["Month", "Day", "Time"])["Solar Rad"].mean()).reset_index()

newDateTime = []
for month, day, time in zip(solar["Month"], solar["Day"], solar["Time"]):
    holder = str(month) + "/" + str(day) + "/" + '2013' + " " + str(time)
    newDateTime.append(datetime.datetime.strptime(holder, "%m/%d/%Y %H:%M:%S"))

solar["Date/Time"] = newDateTime
solar.set_index("Date/Time", inplace = True)

solar = solar.groupby(pd.TimeGrouper(freq = "5 Min"))["Solar Rad"].mean().fillna(method = "ffill")

plt.figure(figsize = (20,12))
solar.plot()

solar = pd.DataFrame(solar)


# In[321]:

print(db["Solar Rad"].describe())

# plt.figure(figsize = (20,12))
# sns.distplot(db["Solar Rad"], bins = 50)


# #### Solar Radiation From Weather Underground API

# In[403]:

from datetime import date, timedelta
key = "0bfa64942618d5ec"
site = "IGUAM5"
    
#enter start and end dates in date(Year, Month, Day) format, make sure key and site variables are set
def weatherData(start, end):
    dateRange = []
    date1 = start
    date2 = end

    delta = date2 - date1

    for x in range(delta.days + 1):
        dateRange.append((date1 + timedelta(days = x)).strftime("%Y%m%d"))
                
    data = {}
    
    for date in dateRange:
#         print(date)
        urlstart = "http://api.wunderground.com/api/" + str(key) + "/history_"
        urlend = "/q/pws:" + str(site) + ".json"

        url = urlstart + date + urlend

        data[date] = requests.get(url).json()
        
        weatherPretty = []
        weatherYear = []
        weatherMonth = []
        weatherDay = []
        weatherHour = []
        weatherMinute = []
        weatherSolar = []

        for x in dateRange:
            for y in range(400):
                try:
                    weatherPretty.append(data[x]["history"]["observations"][y]["date"]["pretty"])
                    weatherYear.append(data[x]["history"]["observations"][y]["date"]["year"])
                    weatherMonth.append(data[x]["history"]["observations"][y]["date"]["mon"])
                    weatherDay.append(data[x]["history"]["observations"][y]["date"]["mday"])
                    weatherHour.append(data[x]["history"]["observations"][y]["date"]["hour"])
                    weatherMinute.append(data[x]["history"]["observations"][y]["date"]["min"])
                    weatherSolar.append(data[date]["history"]["observations"][y]["solarradiation"])
                except:
                    pass
        
    holder = pd.DataFrame(data = [weatherPretty, weatherYear, weatherMonth, weatherDay, 
                                weatherHour, weatherMinute, weatherSolar]).T

    holder.columns = ["Date/Time", "Year", "Month", "Day", "Hour", "Minute", "Solar Rad"]

    return(holder)


# In[437]:

solarWU = weatherData(date(2016,7,1), date(2016,7,30))
solarWU.dropna(inplace = True)
solarWU["Date/Time"] = solarWU["Date/Time"].apply(lambda x: x.replace("ChST on ", ""))

date = []
for y, M, d, h, m in zip(solarWU["Year"], solarWU["Month"], solarWU["Day"], solarWU["Hour"], solarWU["Minute"]):
    holder = str(M) + "/" + str(d) + "/" + str(2013) + " " + str(h) + ":" + str(m)
    date.append(datetime.datetime.strptime(holder, "%m/%d/%Y %H:%M"))

solarWU["Date/Time"] = date

solarWU.set_index("Date/Time", inplace = True)
solarWU["Solar Rad"] = solarWU["Solar Rad"].apply(lambda x: float(x))
solarWU.sort_index(ascending = True, inplace = True)
solarWU = pd.DataFrame(solarWU.groupby(pd.TimeGrouper(freq = "5 Min"))["Solar Rad"].mean().fillna( method = 'ffill'))

db = db.drop("Solar Rad", axis = 1).join(solarWU)


# In[463]:

db["2013-07-26" : "2013-07-30"]["Solar Rad"].iplot()


# In[465]:

# cursor.execute("DROP TABLE mock_swac;")
# cursor.execute("CREATE TABLE mock_swac (Date_Time timestamp, Building int, Location varchar(25), Sqft_Percent varchar(25), Water_Temperature int, Air_Temperature varchar(25), Relative_Humidity varchar(25), kWh varchar(25), Energy_Cost varchar(25), Base_MRT varchar(25), Base_Air_Speed varchar(25), Base_Metabolic varchar(25), Base_Clo varchar(25), Advanced_MRT varchar(25), Advanced_Air_Speed varchar(25), Advanced_Metabolic varchar(25), Advanced_Clo varchar(25), Outdoor_Temp varchar(25), Outdoor_RH varchar(25), Solar_Rad varchar(25))")
# conn.commit()

# os.chdir("/Users/adeniyiharrison/Desktop/723 NAVFAC SWAC")
# db.reset_index().to_csv("SWAC Database.csv", header = False, index = False)
# db.to_excel("SWAC Database Clean.xlsx")
# csv = open("SWAC Database.csv", "r")

# cursor.copy_from(csv, 'mock_swac', sep=',')
# conn.commit()


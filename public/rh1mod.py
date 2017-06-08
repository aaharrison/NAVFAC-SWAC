import psycopg2 as pq
import pandas as pd
import datetime
import numpy as np

def getData(args):
    room = str(args.get('room'))
    water = str(args.get('water_temp'))
    mrt = str(args.get('mrt'))
    wind = str(args.get('wind'))
    met = str(args.get('met'))
    clo = str(args.get('clo'))
    window = str(args.get('window'))
    ceiling = str(args.get('ceiling'))
    hvac = str(args.get('hvac'))
    roof = str(args.get('roof'))
    motion = str(args.get('motion'))
    ac = str(args.get('ac'))
    setpoint = str(args.get('setpoint'))
    
    # change javascript variable values to database column names
    if mrt == "Base":
        mrt = "base_mrt"
    else:
        mrt = "advanced_mrt"

    if wind == "Base":
        wind = "base_air_speed"
    else:
        wind = "advanced_air_speed"

    if met == "Base":
        met = "base_metabolic"
    else:
        met = "advanced_metabolic"

    if clo == "Base":
        clo = "base_clo"
    else:
        clo = "advanced_clo"
    
    try:
        connect_str = "dbname='rh1' user='rh1' host='rds-rh1.4dapt.com' " + \
                      "password='Anal1st-R0undH0use'"
        conn = pq.connect(connect_str)
        cursor = conn.cursor()
        print("CONNECTION ESTABLISHED")
    except Exception as e:
        print("can't connect - invalid dbname, user or password (probably)")
        print(e)

    print("Room: ", room)
    print("Water Temperature: ", water)
    print("Mean Radiant Temp: ", mrt)
    print("Air Speed: ", wind)
    print("Metabolic Rate: ", met)
    print("Clothing Insulation: ", clo)
    print("Windows? ", window)
    print("Ceiling Fan? ", ceiling)
    print("HVAC Controls? ", hvac)
    print("Cool Roofs? ", roof)
    print("Motion Controls? ", motion)
    print("Passive A/C Usage?" , ac)
    print("Set Point Changes?", setpoint)

    location = str(args.get('location'))

    # Create SQL query text
    query = """SELECT * FROM mock_swac WHERE water_temperature = '{}' AND location = '{}'"""

    # Run query 
    cursor.execute(query.format(water, room))

    # Fetch the data from query
    records = cursor.fetchall()

    # Create dataframe from the fetched data
    df = pd.DataFrame(records, columns=['date_time', "building", "location", "sqft_percent", "water_temperature", "air_temperature", "relative_humidity", "kwh", "energy_cost", "base_mrt", "base_air_speed", "base_metabolic", "base_clo", "advanced_mrt", "advanced_air_speed", "advanced_metabolic", "advanced_clo", "outdoor_temp", "outdoor_rh", "solar_rad"])

    # Close the connection
    conn.close()

    df = df[["date_time", "building", "location", "sqft_percent", "water_temperature", "air_temperature", "relative_humidity", "kwh", "energy_cost", mrt, wind, met, clo, "outdoor_temp", "outdoor_rh", "solar_rad"]]
    df.columns = ["date_time", "building", "location", "sqft_percent", "water_temperature", "air_temperature", "relative_humidity", "kwh", "energy_cost", "mrt", "air_speed", "metabolic_rate", "clo_value", "outdoor_temp", "outdoor_rh", "solar_rad"]

    df["base_air_temp"] = df["air_temperature"].copy()
    df["base_rh"] = df["relative_humidity"].copy()

    # Total Energy Used to cool the space increases incrementally when the input water temperature increases

    if water == "44":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * .98)
    elif water == "46":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * .96)
    elif water == "48":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * .94)
    elif water == "50":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * .92)
    elif water == "52":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * .90)
    else:
        df["kwh"] = df["kwh"].apply(lambda x: float(x))

    df["base_kwh"] = df["kwh"].copy()

    energyMultiplier = 1


    # Variable Selection with logic but if passive conditioning selected we will use outdoor conditions for PMV calculation

    if ac == "Yes" and roof == "No":

        df["air_temperature"] = df["outdoor_temp"].copy()
        df["relative_humidity"] = df["outdoor_rh"].copy()

        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x))
        df["air_speed"] = df["air_speed"].apply(lambda x: float(x))
        df["solar_rad"] = df["solar_rad"].apply(lambda x: float(x))

        newAirTemp = []
        newAirSpeed = []
        newKWH = []

        # Open Windows = 3% Energy Savings (8% of 35%)
        # Ceiling Fans = 4% Energy Savings (12% of 35%)
        # Cool Roofs = 2% Energy Savings (6% of 35%)
        # Passive Conditioning = 35% Energy Savings (100% of 35%)
        # Dynamic Setpoints Cooling = 1.5% per degree increase (Refer to SWAC Tool Reference.xlsx)
        # Dynamic Setpoints Heating = .5% per degree decrease (Refer to SWAC Tool Reference.xlsx)

        for temp, wind, kwh in zip(df["air_temperature"], df["air_speed"], df["kwh"]):
            if temp >= 82 and ceiling == "Off" and window == "Closed":
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh * .65)
            elif temp >= 82 and ceiling == "On" and window == "Open":
                newAirTemp.append(temp - 8)
                newAirSpeed.append(wind + 1.5)
                newKWH.append(kwh * 0.58)
            elif temp >= 82 and ceiling == "On" and window == "Closed":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * 0.61)
            elif temp >= 82 and ceiling == "Off" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + .5)            
                newKWH.append(kwh * 0.62)
            elif temp < 82 and temp >= 78 and ceiling == "Off" and window == "Closed":
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh * .65)
            elif temp < 82 and temp >= 78 and ceiling == "On" and window == "Closed":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * 0.61)
            elif temp < 82 and temp >= 78 and ceiling == "Off" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + .5)
                newKWH.append(kwh * 0.62)
            elif temp < 82 and temp >= 78 and ceiling == "On" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * 0.61)
            else:
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh * 0.65)

        df["air_temperature"] = newAirTemp
        df["air_speed"] = newAirSpeed
        df["kwh"] = newKWH


    elif ac == "Yes" and roof == "Yes":

        df["air_temperature"] = df["outdoor_temp"].copy()
        df["relative_humidity"] = df["outdoor_rh"].copy()

        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x))
        df["air_speed"] = df["air_speed"].apply(lambda x: float(x))
        df["solar_rad"] = df["solar_rad"].apply(lambda x: float(x))

        newAirTemp = []
        newKWH = []

        # Open Windows = 3% Energy Savings (8% of 35%)
        # Ceiling Fans = 4% Energy Savings (12% of 35%)
        # Cool Roofs = 2% Energy Savings (6% of 35%)
        # Passive Conditioning = 35% Energy Savings (100% of 35%)
        # Dynamic Setpoints Cooling = 1.5% per degree increase (Refer to SWAC Tool Reference.xlsx)
        # Dynamic Setpoints Heating = .5% per degree decrease (Refer to SWAC Tool Reference.xlsx)

        for solar, temp, kwh in zip(df["solar_rad"], df["air_temperature"], df["kwh"]):
            if solar >= 100:
                newAirTemp.append(temp - 3)             
                newKWH.append(kwh * .98)
            else:
                newAirTemp.append(temp)
                newKWH.append(kwh)

        df["air_temperature"] = newAirTemp
        df["kwh"] = newKWH

        newAirTemp = []
        newAirSpeed = []
        newKWH = []

        for temp, wind, kwh in zip(df["air_temperature"], df["air_speed"], df["kwh"]):
            if temp >= 82 and ceiling == "Off" and window == "Closed":
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh * 0.65)
            elif temp >= 82 and ceiling == "On" and window == "Open":
                newAirTemp.append(temp - 8)
                newAirSpeed.append(wind + 1.5)
                newKWH.append(kwh * 0.58)
            elif temp >= 82 and ceiling == "On" and window == "Closed":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * 0.61)
            elif temp >= 82 and ceiling == "Off" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + .5)            
                newKWH.append(kwh * 0.62)
            elif temp < 82 and temp >= 78 and ceiling == "Off" and window == "Closed":
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh * 0.65)
            elif temp < 82 and temp >= 78 and ceiling == "On" and window == "Closed":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * 0.61)
            elif temp < 82 and temp >= 78 and ceiling == "Off" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + .5)
                newKWH.append(kwh * 0.62)
            elif temp < 82 and temp >= 78 and ceiling == "On" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * 0.61)
            else:
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh * 0.65)

        df["air_temperature"] = newAirTemp
        df["air_speed"] = newAirSpeed
        df["kwh"] = newKWH

    elif ac == "No":
        
        newAirTemp = []
        newAirSpeed = []
        newKWH = []

        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x))
        df["air_speed"] = df["air_speed"].apply(lambda x: float(x))
        df["solar_rad"] = df["solar_rad"].apply(lambda x: float(x))

        # Open Windows = 3% Energy Savings (8% of 35%)
        # Ceiling Fans = 4% Energy Savings (12% of 35%)
        # Cool Roofs = 2% Energy Savings (6% of 35%)
        # Passive Conditioning = 35% Energy Savings (100% of 35%)
        # Dynamic Setpoints Cooling = 1.5% per degree increase (Refer to SWAC Tool Reference.xlsx)
        # Dynamic Setpoints Heating = .5% per degree decrease (Refer to SWAC Tool Reference.xlsx)

        for temp, wind, kwh in zip(df["air_temperature"], df["air_speed"], df["kwh"]):
            if temp >= 82 and ceiling == "Off" and window == "Closed":
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh)
            elif temp >= 82 and ceiling == "On" and window == "Open":
                newAirTemp.append(temp - 8)
                newAirSpeed.append(wind + 1.5)
                newKWH.append(kwh * .93)
            elif temp >= 82 and ceiling == "On" and window == "Closed":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * .96)
            elif temp >= 82 and ceiling == "Off" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + .5)            
                newKWH.append(kwh * .97)
            elif temp < 82 and temp >= 78 and ceiling == "Off" and window == "Closed":
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh)
            elif temp < 82 and temp >= 78 and ceiling == "On" and window == "Closed":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * .96)
            elif temp < 82 and temp >= 78 and ceiling == "Off" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + .5)
                newKWH.append(kwh * .97)
            elif temp < 82 and temp >= 78 and ceiling == "On" and window == "Open":
                newAirTemp.append(temp - 4)
                newAirSpeed.append(wind + 1)
                newKWH.append(kwh * .96)
            else:
                newAirTemp.append(temp)
                newAirSpeed.append(wind)
                newKWH.append(kwh)

        df["air_temperature"] = newAirTemp
        df["air_speed"] = newAirSpeed
        df["kwh"] = newKWH

        if roof == "Yes":

            newAirTemp = []
            newKWH = []

            for solar, temp, kwh in zip(df["solar_rad"], df["air_temperature"], df["kwh"]):
                if solar >= 100:
                    newAirTemp.append(temp - 3)                
                    newKWH.append(kwh * .98)
                else:
                    newAirTemp.append(temp)
                    newKWH.append(kwh)

        df["air_temperature"] = newAirTemp
        df["air_speed"] = newAirSpeed
        df["kwh"] = newKWH

    else:
        pass

    # Addition or subtraction from Set Point Slider

    df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) + float(setpoint))

    # Advanced Relative Humidity if mrt is adv

    if mrt == "advanced_mrt":
        df["mrt"] = df["air_temperature"].apply(lambda x: .9627 * float(x) + 2.54)
    else:
        pass

    # Set point affects on energy consumption

    # Dynamic Setpoints Cooling = 1.5% per degree increase (Refer to SWAC Tool Reference.xlsx)
    # Dynamic Setpoints Heating = .5% per degree decrease (Refer to SWAC Tool Reference.xlsx)

    if float(setpoint) < 0:
        energyMultiplier -= abs(float(setpoint) * .015)
    elif float(setpoint) > 0:
        energyMultiplier -= abs(float(setpoint) * .005)
    else:
        pass

    print("Energy Multiplier: ", energyMultiplier)

    df["kwh"] = df["kwh"].apply(lambda x: float(x) * energyMultiplier)

    for column in ["base_air_temp", "base_rh","sqft_percent", "relative_humidity", "energy_cost", "mrt", "metabolic_rate", "clo_value", "outdoor_temp", "outdoor_rh"]:
        df[column] = df[column].apply(lambda x: float(x))

    df = df.set_index("date_time").groupby(pd.TimeGrouper(freq = "10 Min")).mean()
    df.dropna(inplace = True)
    df.drop_duplicates(keep = "first", inplace = True)
    df.sort_index(ascending = True, inplace = True)
    df.reset_index(inplace = True)

    return(df.to_csv(sep=',', index=False))

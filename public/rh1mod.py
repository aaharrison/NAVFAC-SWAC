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
    setpoint = str(args.get('setpoint'))
    

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
    print("Set Points Used?" , setpoint)

    location = str(args.get('location'))

    query = """SELECT * FROM mock_swac WHERE water_temperature = '{}' AND location = '{}'"""
    cursor.execute(query.format(water, room))
    records = cursor.fetchall()

    df = pd.DataFrame(records, columns=['date_time', "building", "location", "sqft_percent", "water_temperature", "air_temperature", "relative_humidity", "kwh", "energy_cost", "base_mrt", "base_air_speed", "base_metabolic", "base_clo", "advanced_mrt", "advanced_air_speed", "advanced_metabolic", "advanced_clo"])

    conn.close()

    df = df[["date_time", "building", "location", "sqft_percent", "water_temperature", "air_temperature", "relative_humidity", "kwh", "energy_cost", mrt, wind, met, clo]]
    df.columns = ["date_time", "building", "location", "sqft_percent", "water_temperature", "air_temperature", "relative_humidity", "kwh", "energy_cost", "mrt", "air_speed", "metabolic_rate", "clo_value"]

    df["base_air_temp"] = df["air_temperature"].copy()
    df["base_rh"] = df["relative_humidity"].copy()

    if water == "44":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * 1.04)
    elif water == "46":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * 1.08)
    elif water == "48":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * 1.12)
    elif water == "50":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * 1.16)
    elif water == "52":
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * 1.20)
    else:
        df["kwh"] = df["kwh"].apply(lambda x: float(x))

    df["base_kwh"] = df["kwh"].copy()

    if setpoint == "Yes":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) + 4)
        df["kwh"] = df["kwh"].apply(lambda x: float(x) * .10)
    else:
        pass


    # Energy Reduction Measures Related to Air Speed (Opening Windows / Using Ceiling Fans)
    if window == "Open" and ceiling == "On":
        df["air_speed"] = df["air_speed"].apply(lambda x: float(x) + 1.5)
    elif window == "Open" and ceiling == "Off":
        df["air_speed"] = df["air_speed"].apply(lambda x: float(x) + .5)
    elif window == "Closed" and ceiling == "On":
        df["air_speed"] = df["air_speed"].apply(lambda x: float(x) + 1.0)
    else:
        df["air_spped"] = df["air_speed"].apply(lambda x: float(x))

    # Energy Reduction Measures Related to Air Temperature (HVAC Controls / Cool Roofs / Motion Light Sensors)
    if hvac == "Yes" and roof == "Yes" and motion == "Yes":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 7)
    elif hvac == "Yes" and roof == "Yes" and motion == "No":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 5)
    elif hvac == "Yes" and roof == "No" and motion == "Yes":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 4)
    elif hvac == "Yes" and roof == "No" and motion == "No":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 2)
    elif roof == "Yes" and hvac == "No" and motion == "Yes":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 5)
    elif roof == "Yes" and hvac == "No" and motion == "No":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 3)
    elif motion == "Yes" and hvac == "No" and roof == "No":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x) - 2)
    elif motion == "No" and hvac == "No" and roof == "No":
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x))
    else:
        df["air_temperature"] = df["air_temperature"].apply(lambda x: float(x))

    # Energy Reduction Measures effect on Energy Usage
    energyMultiplier = 1

    if window == "Open":
        energyMultiplier -= .08
    else:
        pass

    if ceiling == "On":
        energyMultiplier -= .12
    else:
        pass

    if hvac  == "Yes":
        energyMultiplier -= .05
    else:
        pass

    if roof == "Yes":
        energyMultiplier -= .06
    else:
        pass

    if motion == "Yes":
        energyMultiplier -= .02
    else:
        pass

    print("Energy Multiplier: ", energyMultiplier)

    df["kwh"] = df["kwh"].apply(lambda x: float(x) * energyMultiplier)


    return(df.to_csv(sep=',', index=False))

const IPadd = "172.25.12.11";

const ER1SimInputTherm = ["Room1 thermSP1",
    "Room1 thermSP2",
    "Kitchen thermSP1",
    "Kitchen thermSP2",
    "Room4 thermSP1",
    "Room2 thermSP1",
    "Corridor thermSP1",
    "Corridor thermSP2"
];

const ThermSetup = { min: 15, max: 30, stepSize: 2, timeStep: 36 };

const ER1SimInputTemp = ["Room1 Temp",
    "Room2 Temp",
    "Room4 Temp",
    "Corridor Temp",
    "Kitchen Temp",
];

const TempSetup = { min: 18, max: 26, stepSize: 2, timeStep: 36 };

const ER1SimInputHumi = ["Room1 Humi",
    "Room2 Humi",
    "Room4 Humi",
    "Corridor Humi",
    "Kitchen Humi",
];

const HumiSetup = { min: 40, max: 90, stepSize: 5, timeStep: 36 };

const ER1SimInputCO2 = ["Room1 CO2",
    "Room2 CO2",
    "Room4 CO2",
    "Corridor CO2",
    "Kitchen CO2"
];

const CO2Setup = { min: 300, max: 2000, stepSize: 100, timeStep: 36 };

const DHeatingData = ["Inlet Flow", "Inlet Temperature", "Outlet Temperature"];

const DHeatingSetup = { min: 0, max: 100, stepSize: 10, timeStep: 36 };

const OutsideData = ["OutTemp", "WindSpeed", "DirectSunPowerVertical"];

const OutsideSetup = { min: -10, max: 30, stepSize: 5, timeStep: 36 };

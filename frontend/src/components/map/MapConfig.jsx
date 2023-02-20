export const mapGeoConfig = {
  world: {
    name: "World",
    namePl: "Świat",
    geoUrl:
      "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json",
    scale: 100,
  },
  continents: [
    {
      name: "Africa",
      namePl: "Afryka",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json",
      scale: 400,
      center: [15, 0],
    },
    {
      name: "Asia",
      namePl: "Azja",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/asia.json",
      scale: 300,
      center: [85, 0],
    },
    {
      name: "Europe",
      namePl: "Europa",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json",
      scale: 400,
      center: [20, 410],
    },
    {
      name: "Center Europe",
      namePl: "Europa (środek)",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json",
      scale: 1100,
      center: [20, 410],
    },
    {
      name: "North America",
      namePl: "Ameryka Północna",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/north-america.json",
      scale: 300,
      center: [-100, 40],
    },
    {
      name: "South America",
      namePl: "Ameryka Południowa",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json",
      scale: 350,
      center: [-70, -30],
    },
    {
      name: "Oceania",
      namePl: "Oceania",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/oceania.json",
      scale: 400,
      center: [150, -35],
    },
  ],
  countries: [
    {
      name: "Germany",
      namePl: "Niemcy",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/germany/germany-regions.json",
      scale: 2000,
      center: [10, 50],
    },

    {
      name: "Italy",
      namePl: "Włochy",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/italy/italy-regions.json",
      scale: 2000,
      center: [10, 42],
    },
    {
      name: "Poland",
      namePl: "Polska",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/poland/poland-provinces.json",
      scale: 3000,
      center: [18, 52],
    },
    {
      name: "Spain",
      namePl: "Hiszpania",
      geoUrl:
        "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/spain/spain-province.json",
      scale: 2000,
      center: [-5, 38],
    },
  ],
};

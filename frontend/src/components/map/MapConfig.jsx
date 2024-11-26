export const mapGeoConfig = {
  world: {
    name: "World",
    namePl: "Świat",
    geoUrl:
      "https://code.highcharts.com/mapdata/custom/world-continents.topo.json",
    scale: 100,
  },
  continents: [
    {
      name: "Africa",
      namePl: "Afryka",
      geoUrl: "https://code.highcharts.com/mapdata/custom/africa.topo.json",
      scale: 400,
      center: [15, 0],
    },
    {
      name: "Asia",
      namePl: "Azja",
      geoUrl: "https://code.highcharts.com/mapdata/custom/asia.topo.json",
      scale: 300,
      center: [85, 0],
    },
    {
      name: "Europe",
      namePl: "Europa",
      geoUrl: "https://code.highcharts.com/mapdata/custom/europe.topo.json",
      scale: 400,
      center: [20, 410],
    },
    {
      name: "Center Europe",
      namePl: "Europa (środek)",
      geoUrl: "https://code.highcharts.com/mapdata/custom/europe.topo.json",
      scale: 1100,
      center: [20, 410],
    },
    {
      name: "North America",
      namePl: "Ameryka Północna",
      geoUrl:
        "https://code.highcharts.com/mapdata/custom/usa-and-canada.topo.json",
      scale: 300,
      center: [-100, 40],
    },
    {
      name: "South America",
      namePl: "Ameryka Południowa",
      geoUrl:
        "https://code.highcharts.com/mapdata/custom/south-america.topo.json",
      scale: 350,
      center: [-70, -30],
    },
    {
      name: "Oceania",
      namePl: "Oceania",
      geoUrl: "https://code.highcharts.com/mapdata/custom/oceania.topo.json",
      scale: 400,
      center: [150, -35],
    },
  ],
  countries: [
    {
      name: "Germany",
      namePl: "Niemcy",
      geoUrl:
        "https://code.highcharts.com/mapdata/countries/de/de-all.topo.json",
      scale: 2000,
      center: [10, 50],
    },

    {
      name: "Italy",
      namePl: "Włochy",
      geoUrl:
        "https://code.highcharts.com/mapdata/countries/it/it-all.topo.json",
      scale: 2000,
      center: [10, 42],
    },
    {
      name: "Poland",
      namePl: "Polska",
      geoUrl:
        "https://code.highcharts.com/mapdata/countries/pl/pl-all.topo.json",
      scale: 3000,
      center: [18, 52],
    },
    {
      name: "Spain",
      namePl: "Hiszpania",
      geoUrl:
        "https://code.highcharts.com/mapdata/countries/es/es-all.topo.json",
      scale: 2000,
      center: [-5, 38],
    },
  ],
};

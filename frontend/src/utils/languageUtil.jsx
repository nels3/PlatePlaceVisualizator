export const getDisplayText = (language, text) => {
  return language === "en" ? text.en : text.pl;
};
export const getDisplayTextFromChoices = (language, en, pl) => {
  return language === "en" ? en : pl;
};

export const dictionary = {
  common: {
    update: { en: "Update", pl: "Aktualizuj" },
    add: { en: "Add", pl: "Dodaj" },
    cancel: { en: "Cancel", pl: "Cofnij" },
    choose: { en: "Choose", pl: "Wybierz" },
    delete: { en: "Delete", pl: "Usuń" },
    confirm: { en: "Confirm", pl: "Potwierdź" },
    back: { en: "Back", pl: "Wyjdź" },
    confirmDeleteText: {
      en: "Are you sure you want to delete it?",
      pl: "Czy na pewno chcesz usunąć ten element?",
    },
    confirmButtonLabel: {
      en: "Confirm",
      pl: "Potwierdzam",
    },
  },
  navbar: {
    plates: { en: "Plates", pl: "Talerzyki" },
    map: { en: "Map", pl: "Mapa" },
    statistics: { en: "Statistics", pl: "Statystyki" },
    world: { en: "Your World", pl: "Twój świat" },
  },
  map: {
    filters: { en: "Filters", pl: "Filtry" },
    world: { en: "World:", pl: "Świat:" },
    continent: { en: "Continent:", pl: "Kontynent:" },
    continentLabel: { en: "name", pl: "namePl" },
    country: { en: "Country:", pl: "Kraj:" },
    countryLabel: { en: "name", pl: "namePl" },
    selected: { en: "Selected:", pl: "Wybrane:" },
  },
  world: {
    cities: {
      title: { en: "Cities:", pl: "Miasta:" },
      city: { en: "City:", pl: "Miasto" },
      cityAccessor: { en: "name", pl: "name_pl" },
      country: { en: "Country:", pl: "Kraj" },
      countryAccessor: { en: "country", pl: "country_pl" },
      region: { en: "Region:", pl: "Region" },
      regionAccessor: { en: "region", pl: "region" },
      population: { en: "Population:", pl: "Populacja" },
      populationAccessor: { en: "population", pl: "population" },
    },
    citiesDetails: {
      title: { en: "City details", pl: "Dane miasta" },
      newTitle: { en: "New city details", pl: "Dane nowego miasta" },
      cityEn: { en: "City(en)", pl: "Miasto(ang)" },
      cityPl: { en: "City(pl)", pl: "Miasto(pl)" },
      countryEn: { en: "Country(en)", pl: "Kraj(ang)" },
      countryPl: { en: "Country(pl)", pl: "Kraj(pl)" },
      region: { en: "Region", pl: "Region" },
      population: { en: "Population", pl: "Populacja" },
      latitude: { en: "Latitude", pl: "Latitude" },
      longitude: { en: "Longitude", pl: "Longitude" },
    },
    countries: {
      title: { en: "Countries:", pl: "Kraje:" },
      country: { en: "Country:", pl: "Kraj" },
      countryAccessor: { en: "name", pl: "name_pl" },
      capital: { en: "Capital:", pl: "Stolica" },
      region: { en: "Region:", pl: "Region" },
      subregion: { en: "Subregion:", pl: "Subregion" },
    },
    countriesDetails: {
      title: { en: "Country details", pl: "Dane kraju" },
      newTitle: { en: "New country details", pl: "Dane nowego kraju" },
      countryEn: { en: "Country(en)", pl: "Kraj(ang)" },
      countryPl: { en: "Country(pl)", pl: "Kraj(pl)" },
      capital: { en: "Capital", pl: "Stolica" },
      region: { en: "Region", pl: "Region" },
      subregion: { en: "Subregion:", pl: "Subregion" },
    },
  },
  plateDetails: {
    title: { en: "Plate details", pl: "Dane talerzyka" },
    newTitle: { en: "New plate details", pl: "Dane nowego talerzyka" },
    countryEn: { en: "Country(en)", pl: "Kraj(ang)" },
    countryPl: { en: "Country(pl)", pl: "Kraj(pl)" },
    cityEn: { en: "City(en)", pl: "Miasto(ang)" },
    cityPl: { en: "City(pl)", pl: "Miasto(pl)" },
    latitude: { en: "Latitude", pl: "Latitude" },
    longitude: { en: "Longitude", pl: "Longitude" },
    info: { en: "Info", pl: "Info" },
    image: { en: "Image", pl: "Zdjęcie" },
  },
  plateList: {
    country: { en: "Country", pl: "Kraj" },
    countryAccessor: { en: "country", pl: "country_pl" },
    city: { en: "City", pl: "Miasto" },
    cityAccessor: { en: "city", pl: "city_pl" },
    image: { en: "Image?", pl: "Zdjęcie?" },
  },
  statistics: {
    country: { en: "Country", pl: "Kraj" },
    count: { en: "Count", pl: "Liczba" },
    cities: { en: "Cities", pl: "Kraje" },
  },
};

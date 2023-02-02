import UserCountries from "src/components/world/UserCountries";
import UserCountryDetail from "src/components/world/UserCountryDetail";
import UserCities from "src/components/world/UserCities";
import UserCityDetail from "src/components/world/UserCityDetail";

export default function World() {
  return (
    <div style={{ padding: "5px" }}>
      <UserCountries />
      <UserCountryDetail />
      <UserCities />
      <UserCityDetail />
    </div>
  );
}

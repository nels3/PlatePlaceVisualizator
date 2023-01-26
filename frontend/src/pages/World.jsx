import UserCountries from "src/components/world/UserCountries";
import UserCities from "src/components/world/UserCities";

export default function World() {
  return (
    <div style={{ padding: "5px" }}>
      <UserCountries />
      <UserCities />
    </div>
  );
}

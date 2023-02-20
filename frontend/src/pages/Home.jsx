import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BiMessageSquareAdd } from "react-icons/bi";

import { getAllStatistics } from "src/store/slices/home/homeThunk";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

export default function Home() {
  const language = useSelector((state: RootState) => state.language.language);
  const platesCount = useSelector((state) => state.home.platesCount);
  const countryCount = useSelector((state) => state.home.countryCount);
  const cityCount = useSelector((state) => state.home.cityCount);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `Home`;
    dispatch(getAllStatistics());
  }, []);

  return (
    <div style={{ padding: "5px" }}>
      <h9 style={{ fontSize: "20px" }}>
        {getDisplayText(language, dict.home.welcome)}
      </h9>
      <h6 style={{ fontSize: "16px" }}>
        {getDisplayText(language, dict.home.have)}
        {platesCount}
        {getDisplayText(language, dict.home.plates)}
        {countryCount}
        {getDisplayText(language, dict.home.countries)}
        {cityCount}
        {getDisplayText(language, dict.home.cities)}
      </h6>
    </div>
  );
}

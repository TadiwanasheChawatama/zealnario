import { useEffect, useState } from "react";

const HamburgerMenu = ({ hamClicked, nav }) => {
  const [active, SetActive] = useState("toggle");

  useEffect(
    () => (nav == "menu" ? SetActive("toggle") : SetActive("toggle active")),
    [active, nav]
  );

  const onClicked = () => {
    active == "toggle" ? SetActive("toggle active") : SetActive("toggle");
    hamClicked();
  };
  return <div className={active} onClick={onClicked}></div>;
};

export default HamburgerMenu;

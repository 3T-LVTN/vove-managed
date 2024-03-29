import { Image } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigator = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseHover = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const cursor = isHovered ? 'pointer' : 'default';

  const style = { display: "flex", alignItems: "center", gap: "16px", cursor: `${cursor}` };

  return (
    <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave} onClick={() => navigator(`/`)} style={style}>
      <Image width={132} height={40} src={"https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/HorizontalLogo.png"} />
    </div>
  );
}

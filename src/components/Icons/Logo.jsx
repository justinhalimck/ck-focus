import { useId } from "react";

const Logo = () => {
  const clipPathId = useId();

  return (
    <svg
      width="136"
      height="136"
      viewBox="0 0 136 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Logo</title>
      <g clip-path={`url(#${clipPathId})`} data-figma-skip-parse="true">
        <g transform="matrix(0.0301136 0.0378864 -0.0378864 0.0301136 68 68)">
          <foreignObject
            x="-1020.66"
            y="-1020.66"
            width="2041.33"
            height="2041.33"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                background:
                  "conic-gradient(from 90deg,rgba(255, 255, 255, 1) 0deg,rgba(0, 116, 217, 1) 360deg)",
                height: "100%",
                width: "100%",
                opacity: "1",
              }}
            ></div>
          </foreignObject>
        </g>
      </g>
      <circle
        cx="68"
        cy="68"
        r="48.3964"
        transform="rotate(-38.4791 68 68)"
        data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_ANGULAR&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.45490196347236633,&quot;b&quot;:0.85098040103912354,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.45490196347236633,&quot;b&quot;:0.85098040103912354,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:60.227199554443359,&quot;m01&quot;:-75.772819519042969,&quot;m02&quot;:75.772819519042969,&quot;m10&quot;:75.772819519042969,&quot;m11&quot;:60.227199554443359,&quot;m12&quot;:-2.7777798095485196e-05},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}"
      />
      <circle cx="68" cy="68" r="8.65455" fill="white" />
      <defs>
        <clipPath id={clipPathId}>
          <circle
            cx="68"
            cy="68"
            r="48.3964"
            transform="rotate(-38.4791 68 68)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;

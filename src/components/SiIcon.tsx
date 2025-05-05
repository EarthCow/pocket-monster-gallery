import {SimpleIcon} from "simple-icons";

interface props {
  icon: SimpleIcon;
}

export default function SiIcon({icon}: props) {
  return (
      <svg
          role="img"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
  );
}
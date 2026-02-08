import { Oval } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <Oval
      height={80}
      width={80}
      color="#689bb5"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#2d2d2d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}

import HashLoader from "react-spinners/HashLoader";

export default function Loading() {
  return (
    <HashLoader
      color={"#000000"}
      loading={true}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

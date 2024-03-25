import NImage from "./next-image";

const PageLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/5">
      <div className="flex flex-col items-center justify-center">
        {/* <Loading01Svg width={164} height={164} /> */}
        <NImage src={"/assets/logo-with-text.png"} alt="LoaderStyled" width={240} height={240} />
      </div>
    </div>
  );
};

export default PageLoading;

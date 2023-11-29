const ShimmerProfile = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-11/12 p-4 bg-white rounded-lg shadow-md">
        <div className="relative mb-4">
          <div className="h-48 rounded-t-lg animate-pulse bg-theme-color bg-gradient-to-r from-teal-100 to-teal-300">
            <div className="w-full h-48 shimmer-cover-image animate-pulse"></div>
          </div>
          <div className="absolute bottom-0 w-20 h-20 transform -translate-x-1/2 translate-y-1/2 border-4 border-white rounded-full left-1/2">
            <div className="w-full h-full rounded-full bg-slate-200 animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-20 mb-10">
          <div className="w-32 h-4 mb-4 bg-slate-200 shimmer-info animate-pulse"></div>
          <div className="w-64 h-4 mb-4 bg-slate-200 shimmer-info animate-pulse"></div>
          <div className="w-32 h-4 mb-4 bg-slate-200 shimmer-info animate-pulse"></div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row flex-wrap w-full gap-4 md:flex-col md:w-2/12 md:border-r-slate-100 md:border-r ">
            <div className="w-32 h-8 mb-4 bg-gradient-to-r from-teal-100 to-teal-200 shimmer-links animate-pulse"></div>
            <div className="w-32 h-8 mb-4 bg-gradient-to-r from-teal-100 to-teal-200 shimmer-links animate-pulse"></div>
            <div className="w-32 h-8 mb-4 bg-gradient-to-r from-teal-100 to-teal-200 shimmer-links animate-pulse"></div>
          </div>
          <div className="w-full md:w-10/12">
            <div className="py-3 md:px-9">
              <div className="flex justify-between mt-4 mb-5">
                <div className="flex items-end w-24 h-12 rounded-lg bg-slate-200 animate-pulse">
                  <div className="w-16 h-2 mx-auto my-2 mt-2 bg-slate-300"></div>
                </div>
                <div className="flex items-end w-24 h-12 rounded-lg bg-slate-200 animate-pulse">
                  <div className="w-16 h-2 mx-auto my-2 mt-2 bg-slate-300"></div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-10 fmt-4">
                <div className="w-64 h-6 rounded-lg bg-slate-200 animate-pulse"></div>
                <div className="w-64 h-6 rounded-lg bg-slate-200 animate-pulse"></div>
                <div className="w-64 h-6 rounded-lg bg-slate-200 animate-pulse"></div>
                <div className="w-64 h-6 rounded-lg bg-slate-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerProfile;

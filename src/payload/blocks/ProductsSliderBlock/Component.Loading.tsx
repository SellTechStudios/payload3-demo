export const ProductsSliderSkeleton = () => {
  // const currentViewBreakpoint = window.innerWidth
  // const slidesPerView =
  //   currentViewBreakpoint < 768
  //     ? 1
  //     : currentViewBreakpoint < 1024
  //       ? 2
  //       : currentViewBreakpoint < 1280
  //         ? 3
  //         : 4
  return (
    <div className="relative">
      <div className="flex space-x-6 lg:space-x-9 overflow-hidden">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full">
            <div className="relative h-full bg-white rounded-lg overflow-hidden">
              <div className="animate-pulse">
                <div className="h-[350px] bg-gray-300"></div>
                <div className="p-4 h-24">
                  <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ProductsSliderSkeleton = () => {
  return (
    <div className="relative">
      <div className="flex space-x-6 lg:space-x-9 overflow-hidden">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full">
            <div className="relative bg-white rounded-lg h-full overflow-hidden">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-[350px]"></div>
                <div className="p-4 h-24">
                  <div className="bg-gray-300 mb-2 w-3/4 h-4"></div>
                  <div className="bg-gray-300 w-1/2 h-4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

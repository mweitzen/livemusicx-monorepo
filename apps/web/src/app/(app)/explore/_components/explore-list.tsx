import { Button } from "@repo/ui/components/button";
import { ChevronDown } from "@repo/ui/icons";

export function ExploreList() {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8'>
        {/* {dummyItems.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg'
          >
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
              <p className='text-sm text-gray-600 mb-2'>
                {item.date} • {item.location}
              </p>
              <p className='text-sm text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        ))} */}
      </div>

      <div className='mt-8 flex justify-center'>
        <Button
          variant='outline'
          className='text-lg px-6 py-3'
        >
          Load More <ChevronDown className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </>
  );
}

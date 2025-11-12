export default function Events() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">🎫 Events</h1>
      <p className="text-gray-700 max-w-xl mx-auto">
        Explore the latest live events, concerts, workshops, and stand-up shows happening near you!
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { name: "Arijit Singh Live", img: "https://i.imgur.com/WX1FyWj.jpg" },
          { name: "Comedy Night with Zakir Khan", img: "https://i.imgur.com/KjVm0X1.jpg" },
          { name: "Tech Fest 2025", img: "https://i.imgur.com/DRplpTp.jpg" },
        ].map((e) => (
          <div key={e.name} className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
            <img src={e.img} alt={e.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{e.name}</h3>
              <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

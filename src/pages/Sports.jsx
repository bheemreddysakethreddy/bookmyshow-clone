export default function Sports() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">🏏 Sports</h1>
      <p className="text-gray-700 max-w-xl mx-auto">
        Catch your favorite sports live — cricket, football, kabaddi, and more!
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { name: "IPL 2025 - Hyderabad vs Chennai", img: "https://i.imgur.com/NCdU4rH.jpg" },
          { name: "India vs Australia (Test Match)", img: "https://i.imgur.com/f6hh2qs.jpg" },
          { name: "ISL Final - Bengaluru FC vs Kerala Blasters", img: "https://i.imgur.com/LT9nQMb.jpg" },
        ].map((s) => (
          <div key={s.name} className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
            <img src={s.img} alt={s.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{s.name}</h3>
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

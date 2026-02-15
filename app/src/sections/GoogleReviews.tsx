import { Star } from 'lucide-react';

const GoogleReviews = () => {
  const reviews = [
    {
      name: 'Lebron James',
      time: '1 anno fa',
      rating: 5,
      text: 'La receptionist è davvero gentilissima e in generale offrono un servizio eccellente. Il centro è accogliente e supera le aspettative. I gruppi sono ridotti, il che facilita un lavoro personalizzato e adattato alle esigenze...',
    },
    {
      name: 'Mario Innocente',
      time: '1 anno fa',
      rating: 5,
      text: 'Molto soddisfatta del servizio ricevuto sia a livello organizzativo che professionale da parte della fisioterapista. Un grande team!',
    },
    {
      name: 'La mamma di Abadia',
      time: '1 anno fa',
      rating: 5,
      text: 'Sono in trattamento da un mese e mi sento ben seguita sia dal centro che dalla professionista che mi assiste. Il centro mantiene un eccellente protocollo di salute con i suoi professionisti. Grazie...',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-800">ECCELLENTE</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-[#C9A962] text-[#C9A962]"
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">La mamma di Abadia</span>
          </p>
          <p className="text-xs text-gray-500">Basato su 377 recensioni</p>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-700">Google</span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">
                    {review.name.charAt(0).toLowerCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">{review.time}</p>
                  </div>
                </div>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#C9A962] text-[#C9A962]"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 line-clamp-4">{review.text}</p>
              <button className="text-xs text-gray-500 mt-3 hover:text-[#C9A962] transition-colors">
                Leggi di più
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;

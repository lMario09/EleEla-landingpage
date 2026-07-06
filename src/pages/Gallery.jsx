import img1 from '../assets/image/image1.jpg'
import img2 from '../assets/image/image2.jpg'
import img3 from '../assets/image/image3.jpg'
import img4 from '../assets/image/image4.jpg'

const photos = [
  { id: 1, src: img1, alt: 'Piscina' },
  { id: 2, src: img2, alt: 'Suíte' },
  { id: 3, src: img3, alt: 'Área gourmet' },
  { id: 4, src: img4, alt: 'Sauna' },
]

function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
          <span className="text-gold">Galeria</span>
        </h1>
        <p className="text-lg text-slate-500">Conheça nosso espaço</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-sm border border-slate-100">
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent p-4">
              <span className="text-white font-semibold text-sm">{photo.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery

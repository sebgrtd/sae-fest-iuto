import React from 'react'
import MarqueeScroll from '../../components/bandeau-effet-scroll-infini/MarqueeScroll'

export default function () {
  const lesArtistes = ["VLADIMIR CAUCHEMAR", "BOOBA", "FREEZE CORLEONE", "DAMSO", "ASHE 22", "HEUSS L'ENFOIRE", "ZOLA", "SCH", "H JEUNECRACK", "LUTHER"];

  return (
    <main id="Accueil">
        <div className="img-container">
            <img src="/images/bg.png" alt="background" />
        </div>

        <MarqueeScroll artistes={lesArtistes} />
    </main>
  )
}

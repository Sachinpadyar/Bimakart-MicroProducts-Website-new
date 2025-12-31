import "./Products.css"
export function ProductHero() {
  return (
    <>
      <section id="ProdutImageRelativeContainer">
        <div className="ProductsBackgroundImagesContainer">
          <img src="/product-hero-bg.jpg" alt="" />
        </div>
        <div className="Container">

        </div>
        {/* <div className="absolute inset-0 bg-black/10" /> */}

        <div className="ImageOverContentContainer">
          <div>
            <div className="SectionMainHeading ColorWhite">
              Simple. Trusted. Safety-First Policies
            </div>
            <br />

            <p className="ColorWhite">
              Explore curated insurance plans designed to protect you and your
              family, with clear coverage details and no hidden confusion.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

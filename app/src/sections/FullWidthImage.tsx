const FullWidthImage = () => {
  return (
    <section className="relative h-[400px] md:h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/ankle-treatment.jpg)',
        }}
      />
    </section>
  );
};

export default FullWidthImage;

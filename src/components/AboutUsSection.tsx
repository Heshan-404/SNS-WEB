import Image from 'next/image';

const AboutUsSection = () => {
  return (
    <section id="about" className="container mx-auto py-16 px-6 bg-white">
      <div className="flex flex-col md:flex-row items-start md:space-x-12">
        {/* Text Column */}
        <div className="md:w-2/3 order-1 md:order-none h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            About Us
          </h2>
          {/* Summarized Description for Mobile */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4 md:hidden">
            S N S PIPES & FITTINGS has been a leading retailer of high-quality PP-R, CPVC, uPVC, and
            Polybutylene pipes and fittings, along with lighting items, since 2022. Our success is
            built on a strong commitment to excellence, reliability, and customer satisfaction.
          </p>
          {/* Full Description for Desktop */}
          <div className="hidden md:block">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              S N S PIPES & FITTINGS has been a leading retailer of high-quality plumbing pipes,
              fittings, and lighting solutions since 2022. Founded in 2022, our company has grown
              from a local supplier to a trusted national distributor, serving everyone from
              homeowners to large-scale construction projects. We specialize in PP-R, CPVC, uPVC,
              and Polybutylene pipes, offering leading brands like ERA, IFAN, PHOENIX, ANTON, PLUMB
              FAST, SLON, and NATIONAL. Our success is built on a strong commitment to excellence,
              reliability, and customer satisfaction. We pride ourselves on offering a comprehensive
              selection of products, all sourced from reputable manufacturers, to meet the diverse
              needs of our customers.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We are dedicated to helping you select the right products for your plumbing and
              lighting needs. At S N S PIPES & FITTINGS, we are driven by a mission to deliver
              superior products and exceptional service, fostering long-term partnerships built on
              trust and integrity. Our core values include quality, innovation, and
              customer-centricity, guiding us in every aspect of our operations. We continuously
              strive to enhance our product offerings and services, adapting to the evolving demands
              of the industry while upholding our unwavering commitment to quality and reliability.
            </p>
          </div>
        </div>
        {/* Image Column */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 order-2 md:order-none h-full">
          <div className="rounded-lg shadow-lg overflow-hidden aspect-w-1 aspect-h-1">
            <Image
              src="/images/props/AboutUs.png" // Using the provided image
              alt="Brass Fittings"
              width={400}
              height={400}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

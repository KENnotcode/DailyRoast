import Image from "next/image";
import { RunningText, TitlePage } from "@/components/TypingText";
import Section from "@/components/Section";

const About = () => {
  return (
    <Section id="about">
      {/* Adjusted top margin to prevent overlapping with the  */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative gap-8 mt-20">
        {/* Left: Image */}
        <div className="flex justify-center items-center">
          <Image
            src="/image/coffee-shop.jpg"
            alt="coffee-shop"
            width={600}
            height={750}
            className="rounded-xl shadow-xl object-cover"
          />
        </div>

        {/* Right: Text Content */}
        <div className="relative z-0 flex flex-col justify-center items-start p-8 lg:p-12 bg-[#333131] rounded-xl shadow-md">
          <div className="flex justify-center items-center gap-4">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white opacity-5">
              Daily Roast
            </h1>
            <div className="">
              <Image
                src="/transparentGIF.gif"
                alt="logo"
                width={135}
                height={135}
                className="opacity-5"
              />
            </div>
          </div>
          <RunningText color="#7d7d7d" align="left" />
          <TitlePage title="About Us" color="#e8e8e8" align="left" />

          <div className="mt-6 text-[#e8e8e8] text-lg font-light leading-relaxed">
            <p className="opacity-90">
              At <strong>Daily Roast</strong>, we believe in crafting the
              perfect cup of coffee for every moment. Rooted in Calbayog City,
              we are passionate about bringing our customers not only the finest
              selection of brews but also a unique and convenient coffee
              shopping experience.
            </p>

            <p className="opacity-90 mt-4">
              Whether you're looking for your morning pick-me-up, an afternoon
              indulgence, or a special gift for a loved one,{" "}
              <strong>Daily Roast</strong> is your go-to online coffee shop. We
              pride ourselves on using premium beans, meticulously sourced from
              local farms and roasted to perfection.
            </p>

            <p className="opacity-90 mt-4">
              Our diverse menu offers something for every coffee lover, from
              bold espressos to smooth, creamy lattes. Explore our wide range of
              products and enjoy the seamless shopping experience tailored just
              for you.
            </p>

            <p className="opacity-90 mt-4">
              At <strong>Daily Roast</strong>, your satisfaction is our
              priority, and we are committed to delivering quality coffee
              directly to your doorstep — fresh, fast, and delicious.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#f0f0f0]">Our Vision</h3>
              <p className="opacity-90">
                To become the leading online platform for premium coffee,
                elevating every coffee moment and experience for our customers.
              </p>

              <h3 className="text-xl font-bold text-[#f0f0f0] mt-6">
                Our Mission
              </h3>
              <p className="opacity-90">
                To bring the finest coffee blends to your home, ensuring an
                exceptional brew in every cup.
              </p>
            </div>
          </div>
        </div>

        {/* Background Layer */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#333131] -z-50"></div>
      </div>
    </Section>
  );
};

export default About;

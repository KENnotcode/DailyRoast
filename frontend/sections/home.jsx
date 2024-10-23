import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRouter } from "next/router";

const Home = ({ cardLength }) => {
  const [text] = useTypewriter({
    words: [
      "Ginhahala ka na ba?",
      "Providing best user experience for customers.",
      "Delivery on time in demand.",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  const router = useRouter();

  return (
    <Section id="home">
      <div className="top-0 left-0 h-{100} w-{100}">
        <Image
          src="/image/background.jpg"
          alt="background"
          fill
          className="object-cover w-{150}"
        />
      </div>
      <Navbar cardLength={cardLength} />
      {/* <bastaNavbar/> */}

      <div className="relative h-[70vh] z-[1] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center text-tahiti">
          <Image
            src="/transparentGIF.gif"
            alt="logo"
            width={200}
            height={200}
          />
          <h1 className="text-5xl">DAILY ROAST - CALBAYOG</h1>
          <p className="text-base fp mt-2">
            {text}{" "}
            <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
          </p>
          <div
            className="font-semibold tracking-wider mt-5 bg-[#333131] px-[2rem] py-[8px] rounded-xl cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); // Prevent any default behavior
              router.push("/SignupLogin"); // Navigate to the SignupLogin page
            }}
          >
            <p>Login Now!</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Home;

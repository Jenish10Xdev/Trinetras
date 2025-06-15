import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.logo2} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Trinetras Stones was founded with a deep passion for natural
            healing, aesthetics, and spiritual wellness. Our journey began with
            a simple yet powerful goal — to create a trusted online destination
            where individuals can easily discover, explore, and purchase a wide
            range of natural stones and handcrafted spiritual accessories from
            the comfort of their homes.
          </p>
          <p>
            Since our inception, we have committed ourselves to offering a
            handpicked selection of premium products that resonate with every
            taste and purpose — whether it's for spiritual balance, gifting, or
            personal adornment. Our product range includes bracelets, stone
            malas, crystal balls, raw stones, stone trees, and carefully crafted
            jewelry. Each piece in our collection is offered in versatile styles
            and sizes to suit every customer's need.
          </p>
          <p>
          Our primary focus lies in promoting authentic, high-quality products that are ethically sourced and spiritually meaningful. We work closely with experienced artisans and trusted suppliers to ensure quality, originality, and positive energy in every item we offer.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
          Our mission at Trinetras Stones is to empower individuals by providing access to products that promote wellness, beauty, and spiritual growth. We aim to make your shopping experience seamless and trustworthy — from the moment you land on our site to the moment our product reaches your hands.
          </p>
          <p>
          We are committed to delivering not only unique products but also the confidence and convenience that elevate your journey of self-care and personal discovery.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"CUSTOMIZED"} text2={"BRACELETS"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 w-full">
          <b>Personalized for You:</b>
          <p className=" text-gray-600">
            At Trinetras Stones, we offer a unique service to create custom bracelets tailored to your birthdate. We believe in the power of personalized spiritual accessories, and our skilled artisans meticulously craft each bracelet to resonate with your individual energy and astrological alignments. Simply provide us with your birthdate, and we will design a beautiful and meaningful bracelet just for you, enhancing your well-being and spiritual journey.
          </p>
        </div>
      </div>

      <div className=" text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=" text-gray-600">
          We take quality seriously. Each product is meticulously vetted to ensure it meets our rigorous standards. Our items are hand-selected for their authenticity, craftsmanship, and energetic properties.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=" text-gray-600">
          With a clean, user-friendly interface and a hassle-free ordering process, shopping with us is simple and enjoyable. We make sure you can find what you're looking for with ease.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">
          Our team of dedicated professionals is here to assist you every step of the way — from product inquiries to post-purchase support. Your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

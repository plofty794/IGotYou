import ImageCard from "@/partials/components/ImageCard";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "IGotYou - About us";
  }, []);

  return (
    <div className="text-[#222222] pt-2">
      <div className="flex flex-col justify-center min-h-[420px] gap-6 px-12 my-16">
        <h1 className="font-bold text-4xl text-[#222222]">About us,</h1>
        <div className="text-sm font-medium flex flex-col gap-3 w-[820px]">
          <p>
            At IGotYou, we believe that creativity knows no bounds, and artistic
            expression should be accessible to all. Our platform was born out of
            a passion for connecting people with talented multimedia artists and
            making the extraordinary achievable.
          </p>
          <p>
            {" "}
            Our mission is simple: to bridge the gap between customers seeking
            top-notch multimedia services and the artists who bring those
            visions to life. We've curated a diverse and dynamic community of
            photographers, videographers, graphic designers, and more, all
            sharing a common dedication to their craft and a commitment to
            turning your ideas into reality.
          </p>
          <p>
            What sets IGotYou apart is our belief in collaboration. We don't
            just facilitate transactions; we foster connections that inspire and
            create unforgettable moments. Whether you're a customer with a
            vision or an artist with a passion, IGotYou is the place where
            dreams become art and art becomes reality. Join us on this creative
            journey, and together, we'll redefine what's possible. Welcome to
            IGotYou, where innovation meets imagination.
          </p>
        </div>
      </div>
      <div className="text-[#222222] min-h-screen bg-[#F2F2F2] px-12 pt-16 mt-10">
        <h3 className="text-3xl text-[#] font-semibold mb-10">Founders</h3>
        <div className="flex item-center justify-center gap-4">
          <ImageCard
            name="Ace Guevarra"
            photoUrl="https://scontent.fmnl8-2.fna.fbcdn.net/v/t1.6435-9/204908282_4001014596642605_2533750250073957095_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_eui2=AeE_qU0BAB70lt8etlbS72uYMTEBpWvIEFAxMQGla8gQUFDU-Nr-KzBaOH2KB0ynrzAWnj0GjbWY04iN_oAUq0CO&_nc_ohc=7mbOdE88-PoAX-hv7oa&_nc_ht=scontent.fmnl8-2.fna&oh=00_AfDAexts5nSb2AZgdJG9RVs9yky1EQjWnTThSXRed2aqsA&oe=652CF841"
          />
          <ImageCard
            name="Romeo Bonifacio"
            photoUrl="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/281455949_1976878979186720_4039918151550893059_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=1b51e3&_nc_eui2=AeGOQGPA3G59iu63NJ4P44mC2aBCFULI1bHZoEIVQsjVsQw53XqgxomFiBE5e73KSY2lVLQ4FM8c51nvp8z4a4Hz&_nc_ohc=VlenqvMyNikAX9hoXPq&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfCnh_3rQywT0B74da0lO4TvhlwYB06spgGi1OHzztnvKQ&oe=650A07C3"
          />
          <ImageCard
            name="John Rizbert Miras"
            photoUrl="https://scontent.fmnl13-2.fna.fbcdn.net/v/t1.6435-9/83192389_3106836926208432_7955476375152885760_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFbd_bVxypbiqSQzxmb-QnCl6wamGo29NmXrBqYajb02f8kmV3N5AWhCk5NMN0CJx_6nCCJ84ppMS7vwOlt_NfK&_nc_ohc=8B2RXZLiYlwAX82oIz5&_nc_ht=scontent.fmnl13-2.fna&oh=00_AfCcqQiJBDPkWJyLz_gQovZKgX_2TKxwdRm9zYH7Y0zXDw&oe=652CC88F"
          />
          <ImageCard
            name="Keith Howell Naz"
            photoUrl="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/344361660_1944431789267004_115854520176451419_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeHqOL31KhtdxK0vxivftHtQ0zbcNRfZrh7TNtw1F9muHt3N2MdTuQHsqVuImMCXXVwWERcLTXmiCt8nNcJIbSwB&_nc_ohc=0FO54Sezts0AX9K5hUt&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDrbYIHPHJ7MVVEPdz6hIIzIJiKnc4cvzIJ5Lbt5CPzUQ&oe=6509CCCE"
          />
        </div>
      </div>
    </div>
  );
}

export default About;

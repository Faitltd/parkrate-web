import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ParkDetails } from "@/components/park/park-details";
import { themeParks } from "@/lib/data";
import { findParkById } from "@/lib/parks";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://parkrate.com").replace(/\/$/, "");

type ParkPageProps = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = () =>
  themeParks.map((park) => ({
    id: park.id,
  }));

export const generateMetadata = async ({ params }: ParkPageProps): Promise<Metadata> => {
  const { id } = await params;
  const park = findParkById(themeParks, id);
  if (!park) {
    return {
      title: "Park not found | ParkRate",
      description: "The requested park could not be located.",
    };
  }

  const canonical = `${siteUrl}/park/${park.id}`;
  const title = `${park.name} | ParkRate`;
  const description = park.description;

  return {
    title,
    description,
    alternates: {
      canonical: canonical.replace(siteUrl, "") || `/park/${park.id}`,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "ParkRate",
      images: [
        {
          url: park.image,
          alt: park.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [park.image],
    },
  };
};

export default async function ParkPage({ params }: ParkPageProps) {
  const { id } = await params;
  const park = findParkById(themeParks, id);
  if (!park) {
    return notFound();
  }

  return <ParkDetails park={park} />;
}

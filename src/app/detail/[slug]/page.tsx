import { DetailsCard } from "./components/DetailsCard";

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <DetailsCard symbol={slug} />
    </div>
  );
}

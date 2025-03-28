import { DetailsCard } from "./components/DetailsCard";

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <DetailsCard symbol={slug} />
      </div>
    </main>
  );
}

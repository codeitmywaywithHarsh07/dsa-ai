import Container from "@/components/Container";
import BadgesEmptyState from "./_components/empty-state";

export default function BadgesPage() {
  const badges = [];

  return (
    <Container>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Badges
        </h1>
      </div>

      {badges.length === 0 ? (
        <BadgesEmptyState />
      ) : (
        <div>{/* Your badges grid will go here when implemented */}</div>
      )}
    </Container>
  );
}

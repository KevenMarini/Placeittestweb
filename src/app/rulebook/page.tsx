import RuleBooks from "@/components/RuleBooks";

export const metadata = {
  title: 'Rulebook - PlaceIT',
  description: 'Official rules and guidelines for PlaceIT.',
};

export default function RulebookPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <RuleBooks />
    </div>
  );
}

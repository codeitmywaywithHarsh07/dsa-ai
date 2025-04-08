import Container from "@/components/Container"

export default function DashboardPage() {
    return (
      <Container>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add dashboard widgets here */}
        </div>
      </Container>
    )
  }
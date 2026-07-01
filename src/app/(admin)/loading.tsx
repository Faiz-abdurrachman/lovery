export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-gray-200 rounded-xl animate-pulse" />
      <div className="h-4 w-64 bg-gray-200 rounded-xl animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
      <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  )
}

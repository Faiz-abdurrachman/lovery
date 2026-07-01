export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-lovery-pink/30 border-t-lovery-pink rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm">Memuat...</p>
      </div>
    </div>
  )
}

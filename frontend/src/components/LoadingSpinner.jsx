export default function LoadingSpinner({ message = "Generating your plan..." }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-10 max-w-sm w-full mx-4 text-center shadow-2xl">
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-green-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">🏋️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">AI is working...</h3>
        <p className="text-gray-500 text-sm">{message}</p>
        <p className="text-gray-400 text-xs mt-3">This may take 15-30 seconds</p>
      </div>
    </div>
  );
}

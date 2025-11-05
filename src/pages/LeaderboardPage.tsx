const LeaderboardPage = () => {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(to bottom, #ff00ff 0%, #8000ff 25%, #0080ff 50%, #00ff00 100%)'
    }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto" style={{
          border: '8px dotted white',
          background: 'linear-gradient(to bottom, #ff00ff 0%, #8000ff 25%, #0080ff 50%, #00ff00 100%)',
          padding: '40px'
        }}>
          <div className="text-center">
            <div className="bg-yellow-400 border-4 border-black p-6 mb-8 inline-block">
              <h1 className="text-5xl font-bold text-black">LEADERBOARD</h1>
            </div>
            <div className="bg-white border-8 border-black p-8">
              <p className="text-2xl font-bold text-black mb-4">
                🚧 UNDER CONSTRUCTION 🚧
              </p>
              <p className="text-xl text-black">
                Please check back later!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage


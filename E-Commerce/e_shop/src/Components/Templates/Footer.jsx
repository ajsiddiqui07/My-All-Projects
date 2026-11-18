import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-slate-400 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} LuxeMarket Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer

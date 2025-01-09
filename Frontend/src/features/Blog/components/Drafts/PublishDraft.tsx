import React from 'react'

const PublishDraft: React.FC = () => {
  return (
    <dialog className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Publish Draft</h2>
        <p className="mb-4">Are you sure you want to publish this draft?</p>
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded" onClick={() => {/* handle cancel */}}>Cancel</button>
          <button className="px-4 py-2 text-white bg-blue-500 rounded" onClick={() => {/* handle publish */}}>Publish</button>
        </div>
      </div>
    </dialog>
  )
}

export default PublishDraft

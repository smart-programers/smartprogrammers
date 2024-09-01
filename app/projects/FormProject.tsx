"use client"


export default function FormProject(){
    const handleAddProject = () => {
        //TODO: Handle adding project logic here
      };
    
    return(
        <form className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 
            rounded-lg dark:bg-gray-700 mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Visibility</label>
          <div className="space-x-4">
            <label>
              <input type="radio" name="visibility" value="Public" className="mr-2 " /> Public
            </label>
            <label>
              <input type="radio" name="visibility" value="Private" className="mr-2 " /> Private
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleAddProject}
        >
          Create New Project
        </button>
      </form> 
    )
}
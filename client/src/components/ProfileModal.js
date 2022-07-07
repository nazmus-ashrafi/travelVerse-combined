import React from 'react'

const ProfileModal = () => {
  return (
    <div>
      <input type="checkbox" id="profile-modal" class="modal-toggle" />
      <div class="modal">


        <div class="modal-box relative bg-base-100">


          <label for="profile-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>


          <div class="mt-10 sm:mt-0 ">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              
              <div class="mt-5 md:mt-0 md:col-span-3">
                <form action="#" method="POST">
                  <div class=" overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-base-100 sm:p-6">

                      <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium text-zinc-300">First name</label>
                          <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-zinc-300">Last name</label>
                          <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div class="col-span-6 sm:col-span-4">
                          <label for="email-address" class="block text-sm font-medium text-zinc-300">Email address</label>
                          <input type="text" name="email-address" id="email-address" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        {/* <div class="col-span-6 sm:col-span-3">
                          <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                          <select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div> */}

                        <div class="col-span-6">
                          <label for="street-address" class="block text-sm font-medium text-zinc-300">Street address</label>
                          <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label for="city" class="block text-sm font-medium text-zinc-300">City</label>
                          <input type="text" name="city" id="city" autocomplete="address-level2" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label for="region" class="block text-sm font-medium text-zinc-300">State / Province</label>
                          <input type="text" name="region" id="region" autocomplete="address-level1" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label for="postal-code" class="block text-sm font-medium text-zinc-300">ZIP / Postal code</label>
                          <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                      </div>
                    </div>


                    <div class="ml-6">
                        <label class="block text-sm font-medium text-zinc-300"> Photo </label>
                        <div class="mt-1 flex items-center ">
                          <span class="md:inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 hidden">
                            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>

                          <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><input type="file" name='profileImg'/></button>

                          {/* <div>
                            Profile Image 
                            <input type="file" name='profileImg'/>
                            Cover Image
                            <input type="file" name="coverImg" />
                          </div> */}
                        </div>
                    </div>


                    <div class="px-4 py-3 bg-base-100 text-right sm:px-6">
                      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">Save</button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        
      </div>
    </div>
  )
}

export default ProfileModal
<template>

    <div class="px-5 py-4">
    <div class="overflow-x-auto rounded-lg border shadow">
        <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50 uppercase">
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            </th>

                            <th scope="col" class="relative px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr >
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                          </tr>
                          <!-- row 2 -->
                          <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                          </tr>
                          <!-- row 3 -->
                          <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                          </tr>
                        <slot></slot>
                    </tbody>
                </table>

                <slot name="pagination"></slot>
            </div>
        </div>
    </div>
    </div>
</template>
<template>
    <tr v-if="!isBigDevice"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
        <!-- Checkbox for the row -->
        <td class="w-4 pl-4 pr-1">
            <div class="flex items-center">
                <input :id="'checkbox-table-search-' + item.id" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :for="'checkbox-table-search-' + item.id" class="sr-only">checkbox</label>
            </div>
        </td>
        <!-- Star checkbox -->
        <td class="w-4 p-1">
            <div class="flex items-center">
                <input :id="'star-checkbox-' + item._id" type="checkbox" class="hidden-checkbox">
                <label :for="'star-checkbox-' + item._id" class="star-checkbox-label">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 star-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </label>
            </div>
        </td>
        <!-- Item details -->
        <NuxtLink :to="`/inbox/${item._id}`" class="flex w-full">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white md:w-[14vw]">
                {{ item.name }}
            </th>
            <td class="px-6 py-4 md:w-[55vw] whitespace-nowrap">
                <div class="flex items-center justify-start">
                    <h6 class="font-bold whitespace-nowrap">{{ item.subject.length <= 15 ? item.subject :
        item.subject.slice(0, 100) }}</h6>
                            <span class="px-1">-</span>
                            <p class="whitespace-nowrap">{{ item.details.length <= 15 ? item.details :
        item.details.slice(0, 100) + '...' }}</p>
                </div>
            </td>
            <td class="px-2 py-4 justify-end">
                {{ item.time }}
            </td>
        </NuxtLink>
        <!-- Some action -->
        <td class="px-2 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </td>
    </tr>
    <tr v-else>
        <NuxtLink :to="`/inbox/${item._id}`"  class="flex py-2 justify-between">
            <div class="flex">
                <img class="w-12 h-12 rounded-full mr-1" :src="item.image"
                    alt="Rounded avatar">
                <div>
                    <h6 class="font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                        {{ item.name }}
                    </h6>
                    <p class=" whitespace-nowrap dark:text-white">
                        {{ item.subject.slice(0, 28) }}
                    </p>
                    <p class="text-gray-600 whitespace-nowrap dark:text-white">
                        {{ item.details.slice(0, 30) + '...' }}
                    </p>
                </div>    
            </div>
            <div class="flex flex-col justify-between items-end">
                <p>{{ item.date.slice(0,7) }}</p>
                <div class="flex items-center">
                <input :id="'star-checkbox-' + item._id" type="checkbox" class="hidden-checkbox">
                <label :for="'star-checkbox-' + item._id" class="star-checkbox-label">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 star-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </label>
            </div>
            </div>
        </NuxtLink>
    </tr>
</template>

<script setup>
const { item, isBigDevice } = defineProps(["item", "isBigDevice"]);


</script>

<style lang="scss" scoped>
.hidden-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.star-checkbox-label {
    cursor: pointer;
}

.star-icon {
    fill: none;
    stroke: #6b7280;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.3s ease;
}

.hidden-checkbox:checked+.star-checkbox-label .star-icon {
    stroke: #F4B400;
    /* Checked color */
    fill: #F4B400;
}
</style>

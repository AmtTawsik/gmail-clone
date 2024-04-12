<template>
    <div>
        <div v-if="isLoading" class="flex justify-center items-center w-full h-screen">
            <Loading />
        </div>
        <div v-else class="relative overflow-x-auto">
            <nav v-if="!isBigDevice" class="md:flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
                aria-label="Table navigation">
                <div class="flex items-center mb-2">
                    <div class="flex items-center mr-10">
                        <input id="checkbox-table-search-1" type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                    <span
                        class="text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 block w-full md:inline md:w-auto -ml-8">
                        <!-- Showing items information based on current page and total items -->
                        Showing
                        <span class="font-semibold text-gray-900 dark:text-white">{{ startIndex }}</span>
                        -
                        <span class="font-semibold text-gray-900 dark:text-white">{{ endIndex }}</span>
                        of
                        <span class="font-semibold text-gray-900 dark:text-white">{{ Inbox.length }}</span>
                    </span>
                </div>
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <!-- Previous page -->
                    <li>
                        <button :disabled="currentPage === 1" @click.prevent="previousPage"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </li>
                    <!-- Show page numbers -->
                    <template v-for="pageNumber in displayedPageNumbers" :key="pageNumber">
                        <li>
                            <a @click.prevent="changePage(pageNumber)"
                                :class="['flex', 'items-center', 'justify-center', 'px-3', 'h-8', 'leading-tight', 'border', 'border-gray-300', 'hover:bg-gray-100', 'hover:text-gray-700', 'dark:bg-gray-800', 'dark:border-gray-700', 'dark:text-gray-400', 'dark:hover:bg-gray-700', 'dark:hover:text-white', { 'text-blue-600': pageNumber === currentPage, 'bg-blue-50': pageNumber === currentPage }]">
                                {{ pageNumber }}
                            </a>
                        </li>
                    </template>
                    <!-- Next page -->
                    <li>
                        <button @click.prevent="nextPage" :disabled="currentPage === totalPages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
            <nav v-else>
                <h6 class="text-xl font-semibold ml-1 mb-1">Inbox</h6>
            </nav>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    <template v-for="(item, index) in !isBigDevice ? paginatedItems : Inbox" :key="index">
                        <TableRow :item="item" :isBigDevice="isBigDevice" />
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const itemsPerPage = 10;
const currentPage = ref(1);
const isLoading = ref(true);
const Inbox = ref([])
fetch('/data/inbox.json')
    .then(response => response.json())
    .then(data => {
        Inbox.value = data
        isLoading.value = false;
    })
    .catch(error => console.error('Error fetching Inbox data:', error));

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1);


const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage, Inbox.value.length));


const totalPages = computed(() => Math.ceil(Inbox.value.length / itemsPerPage));


const paginatedItems = computed(() => {
    isLoading.value = false;
    const start = (currentPage.value - 1) * itemsPerPage;
    isLoading.value = false;
    return Inbox.value.slice(start, start + itemsPerPage);
});


const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};


const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};


const changePage = (pageNumber) => {
    currentPage.value = pageNumber;
};

const displayedPageNumbers = computed(() => {
    const range = 1; // Number of page numbers to show
    const currentPageIndex = currentPage.value - 1;
    const firstPage = Math.max(1, currentPageIndex - range);
    const lastPage = Math.min(totalPages.value, currentPageIndex + range * 2); // Show range * 2 numbers

    const result = [];
    for (let i = firstPage; i <= lastPage; i++) {
        result.push(i);
    }
    return result;
});

const isBigDevice = computed(() => {
    if (window.innerWidth < 768) {
        return true;
    } else {
        return false;
    }
});
</script>

<style lang="scss" scoped></style>
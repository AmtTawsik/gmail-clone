<template>
  <div v-if="item" class="md:ml-16 ml-5 mr-5 pb-5">
    <div class="flex md:items-center -ml-16 mt-3 mb-5">
      <NuxtLink to="/inbox">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 md:mx-5 ml-12 md:ml-0 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </NuxtLink>
      <h4 class="text-2xl -mt-1 md:mt-0">{{ item.subject }}</h4>
    </div>
    <section class="md:flex justify-between items-start">
      <div class="md:flex items-center md:-ml-14">
        <img class="w-12 h-12 rounded-full mr-2" :src="item.image" alt="Rounded avatar">
        <div>
          <h6 class="font-bold">{{ item.name }} <span class="font-normal text-gray-600 text-sm">&lt;{{ item.email
              }}&gt;</span></h6>
          <p>to me</p>
        </div>
      </div>
      <p class="text-gray-600">
        {{ item.date }}, {{ item.time }}
      </p>
    </section>
    <div class="mt-5">
      <p>Hello Abdullah,</p>
      <br>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium voluptates, sapiente tempore odio sed
        ducimus
        harum quo voluptatem consequuntur cumque officiis, nulla repellat cupiditate accusamus fugiat soluta fuga
        voluptate. Error eos rerum tem ad
        <br>
        Voluptates eligendi quibusdam deserunt quod, praesentium repudiandae facilis vero
        explicabo aperiam. Nulla saepe obcaecati non distinctio nesciunt Culpa tempora sed.
      </p>
      <br>
      <p>Thank you so much for your time.</p>
      <br>
      <p>Thank you,</p>
      <p class="font-semibold">{{ item.name }}</p>
    </div>
    <hr class="my-5">
    <section v-if="!isReply">
      <p class="font-bold"> 2 attachments </p>
      <ul class="max-w-md space-y-1 list-disc list-inside dark:text-gray-400">
        <li>
          Abdullah_Al_Mubin.pdf
        </li>
        <li>
          Gift_Vauter.pdf
        </li>
      </ul>

      <div class="flex mt-5">
        <button type="button" @click="isReply = true"
          class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Reply
        </button>
        <button type="button"
          class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Forward
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
          </svg>
        </button>
      </div>
    </section>
    <section v-else class="-mt-36">
      <ReplyCompose @sendMail="handelSendMail" :item="item" :isReply="isReply" @isSendingMail="handelSending" @isShowToast="handelShowToast" />
    </section>
    <div v-if="isShowToast" class="flex justify-center">
      <div id="alert-border-1"
        class="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800 w-96 md:w-1/4 fixed md:bottom-2 bottom-16">
        <div class="text-sm font-medium">
          <span v-if="isSending">Sending...</span>
          <span v-else>Message Sent</span>
        </div>
        <button v-if="!isSending" type="button" @click="handelCloseToast"
          class="ms-auto -my-1.5 bg-blue-50 text-blue-500 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
          Undo
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading/>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const itemId = route.params.id;
const Inbox = ref([]);
const item = ref(null);
const isReply = ref(false);

const isSending = ref(false);
const isShowToast = ref(false);

const handelSending = (data) => {
    isSending.value = data
    setTimeout(() => {
        isSending.value = false;
    }, 1500);
}
const handelShowToast = (data) => {
    isShowToast.value = data
    setTimeout(() => {
        isShowToast.value = false;
    }, 5000);
}

const handelCloseToast = () => {
    isShowToast.value = false
}

// Fetch Inbox data
fetch('/data/inbox.json')
  .then(response => response.json())
  .then(data => {
    Inbox.value = data;
    fetchItem(itemId);
  })
  .catch(error => console.error('Error fetching Inbox data:', error));

const fetchItem = async (itemId) => {
  const selectedItem = Inbox.value.filter(item => item._id === parseInt(itemId))[0];
  item.value = selectedItem;
  console.log(item.value)
};

const handelSendMail = (data) => {
  isReply.value = data
}
</script>
